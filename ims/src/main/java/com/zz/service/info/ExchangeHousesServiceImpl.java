package com.zz.service.info;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.*;
import com.zz.mapper.journal.*;
import com.zz.mapper.sys.SysVariablesMapper;
import com.zz.other.Syslog;
import com.zz.po.info.*;
import com.zz.po.journal.*;
import com.zz.po.sys.SysAssetsExpand;
import com.zz.po.sys.SysVariables;
import com.zz.service.journal.ContractDatabaseService;
import com.zz.service.journal.FinancialService;
import com.zz.service.sys.SysAssetsService;
import com.zz.service.sys.SysVariablesService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class ExchangeHousesServiceImpl implements ExchangeHousesService {
	@Resource
	private InfoHaveRentCheckOutMapper infoHaveRentCheckOutMapper;
	@Resource
	private InfoHouse4storeMapper infoHouse4storeMapper;
	@Resource
	private InfoHouse4rentMapper infoHouse4rentMapper;
	@Resource
	private InfoResidentTableMapper infoResidentTableMapper;
	@Resource
	private InfoRenewalRenterMapper infoRenewalRenterMapper;
	@Resource
	private InfoContractInstallmentMapper infoContractInstallmentMapper;
	@Resource
	private InfoTransactionAssistanceMapper itamMapper;
	@Resource
	private JournalWegReadingMapper journalWegReadingMapper;
	@Resource
	private JournalAttachmentMapper journalAttachmentMapper;
	@Resource
	private JournalContractDatabaseMapper journalContractDatabaseMapper;
	@Resource
	private SysVariablesMapper sysVariablesMapper;
	@Autowired
	private SysAssetsService sysAssetsService;
	@Resource
	private JournalHousingFollowMapper journalHousingFollowMapper;
	@Autowired
	private FinancialService financialService;
	@Resource
	private InfoFinancialAccountMapper infoFinancialAccountMapper;
	@Resource
	private JournalFinancialMapper journalFinancialMapper;
	@Autowired
	private SysVariablesService sysVariablesService;
	@Resource
	private ContractDatabaseService contractDatabaseService;

	@Override
	public int exchangeHouses(InfoHaveRentCheckOut infoHaveRentCheckOut) throws Exception {
		if (infoHaveRentCheckOut.getRcoStoreId() == null) {
	        throw new Exception("添加租客退房出错， 无未租id");
	    }
		//修改已租房状态（退租、正办理退房），已租房退房读数
		InfoHouse4rentExpand hr = new InfoHouse4rentExpand();
		hr.setHrId(infoHaveRentCheckOut.getRcoRentId());
		hr.setHrLeaseState("退租");
		hr.setHrState("退房完成");
		//到未租房查最新读数
		List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.selectByPrimaryKey(infoHaveRentCheckOut.getRcoStoreId());
		if(hsList.size()==0){
		    throw new Exception("添加租客退房出错，查不到未租房");
		}
		hr.setHrMeterReadingRecord(hsList.get(0).getHsMeterReadingRecord());
		int result2 = infoHouse4rentMapper.updateByPrimaryKeySelective(hr);
		if(result2 == 0){
			throw new Exception("添加租客退房出错，修改已租出错");
		}	
		//修改未租房状态
		InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
		hs.setHsId(infoHaveRentCheckOut.getRcoStoreId());
		hs.setHsLeaseState("空置未租");
		InfoHouse4rentExpand hr2 = new InfoHouse4rentExpand();
		hr2.setHrHouse4storeId(infoHaveRentCheckOut.getRcoStoreId());
		hr2.setHrState("正常");
		List<InfoHouse4rentExpand> hrList = infoHouse4rentMapper.selectById(hr2);
		if(hrList.size()==0){
		    //只有在这个未租房下，所有的已租房状态都是退租时才去改未租房的状态
			int result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
			if(result3 == 0){
				throw new Exception("未租退房修改失败");
			}
		}
		
		String att2 = infoHaveRentCheckOut.getAtt2();
		System.out.println("att2===="+att2);
		String rcoPath = null;
        String rcoNum = null;
        if(att2 != null){
            JournalAttachment attachment = journalAttachmentMapper.selectByAtt2(att2);
            if(attachment != null){
            	rcoPath = attachment.getPath();
            	rcoNum = attachment.getNum();
                int result7 = journalAttachmentMapper.deleteByAtt2(att2);
                if(result7 == 0){
                    throw new Exception("从附件表删除记录失败");
                }
            }
        }
        System.out.println("rocpath==="+rcoPath);
        //退房照片
  		infoHaveRentCheckOut.setRcoImgPath(rcoPath);
  	    infoHaveRentCheckOut.setRcoImgNum(rcoNum);
  		int insertResult= infoHaveRentCheckOutMapper.insertSelective(infoHaveRentCheckOut);
  		if (insertResult<=0) {
  			throw new Exception("换房增加退房照片失败");
  		}
  		
  		String exchangeHousesFollowRemark = "租客换房。";
		String exchangeHousesFollowResult = "跟进成功";
		JournalHousingFollowExpand record2 = new JournalHousingFollowExpand();
		record2.setJhfDepartment(infoHaveRentCheckOut.getJhfDepartment());
		record2.setJhfStorefront(infoHaveRentCheckOut.getJhfStorefront());
		record2.setJhfHouse4rentId(infoHaveRentCheckOut.getRcoRentId());
		record2.setJhfHouse4storeId(infoHaveRentCheckOut.getRcoStoreId());
		record2.setJhfHouseId(infoHaveRentCheckOut.getRcohouseId());
		record2.setJhfFollowRemark(exchangeHousesFollowRemark);
		record2.setJhfFollowResult(exchangeHousesFollowResult);
		record2.setJhfPaymentWay(infoHaveRentCheckOut.getJhfPaymentWay());
		record2.setJhfUserId(infoHaveRentCheckOut.getJhfUserId());
		record2.setJhfImgPath(rcoPath);
		record2.setJhfImgNum(rcoNum);
		
		//修改退房已租房最新跟进时间
		if (infoHaveRentCheckOut.getJhfHouse4rentId() != null) {
		    InfoHouse4rentExpand infoHr = new InfoHouse4rentExpand();
		    infoHr.setHrId(infoHaveRentCheckOut.getRcoRentId());
		    infoHr.setHrFollowTime(CommonMethodClass.getCurrentDate());
		    infoHouse4rentMapper.updateByPrimaryKeySelective(infoHr);
		}
		
		
		
		int result15 = journalHousingFollowMapper.insertSelective(record2);
		if(result15 == 0){
			throw new Exception("增加失败");
		}
		//出账
        int rentId = infoHaveRentCheckOut.getRcoRentId();
        int storeId = infoHaveRentCheckOut.getRcoStoreId();
        int renterId = infoHaveRentCheckOut.getRcoRenterId();
      //处理租客合约及分期账单
		InfoRenewalRenterExpand rre = new InfoRenewalRenterExpand();
		InfoRenewalRenterExpand ire = new InfoRenewalRenterExpand();
		rre.setJrrHouse4rentId(rentId);
		rre.setJrrHouse4storeId(storeId);
		rre.setJrrRenterId(renterId);
		List<InfoRenewalRenterExpand> rrList = infoRenewalRenterMapper.houseRent(rre);
		for(int i=0;i<rrList.size();++i){
			int jrrId = rrList.get(i).getJrrId();
			//修改租客合约的状态为退房
			ire.setJrrId(jrrId);
			ire.setJrrRentalType("退房");
			int result3 = infoRenewalRenterMapper.updateByPrimaryKeySelective(ire);
			if(result3 == 0){
				throw new Exception("修改租客合约的状态为退房失败");
			}
			//修改分期账单状态，修改合约时查询待收的第一条，把剩余所有待收的状态都改了
			InfoContractInstallmentExpand  ice = new InfoContractInstallmentExpand();
			ice.setJciRentContId(jrrId);
			ice.setJciState("待收");
			List<InfoContractInstallmentExpand> ccaList = infoContractInstallmentMapper.selectBeginPeriods(ice);
			if(ccaList.size() != 0){
				String periods = ccaList.get(0).getJciBeginPeriods();
				ice.setJciRentContId(jrrId);
				ice.setByTheTime(periods);
				ice.setJciNature("应收");
				ice.setJciState(infoHaveRentCheckOut.getRcoCheckOutNature());
				int result4 = infoContractInstallmentMapper.checkoutthestate(ice);	
				if(result4 == 0){
					throw new Exception("修改分期账单状态失败");
				}
			}
		}
		//退房完成将住户状态变为搬离
		InfoResidentTable irt = new InfoResidentTable();
		InfoResidentTable irta = new InfoResidentTable();
		irt.setRtHrId(rentId);
		List<InfoResidentTable> irtList = infoResidentTableMapper.selectByPrimaryKey(irt);
		if(irtList.size()>0){
			for(int i=0;i<irtList.size();++i){
				int rtId = irtList.get(i).getRtId();
				irta.setRtId(rtId);
				irta.setRtType("搬离");
				int result5 = infoResidentTableMapper.updateByPrimaryKeySelective(irta);
			}
		}
		//修改业绩受益人状态
		InfoTransactionExpand assistModel = new InfoTransactionExpand();
		assistModel.setAssistHouse4rent(infoHaveRentCheckOut.getRcoRentId());
		assistModel.setAssistHouse4store(infoHaveRentCheckOut.getRcoStoreId());
		assistModel.setAssistState("失效");
		int result6 = itamMapper.performanceModificationInterface(assistModel);
		if(result6 == 0){
			throw new Exception("修改业绩受益人状态失败");
		}
		
		//水电气json存储
		String meterReadingRecord = "";
		Integer hrId = null;
		/*
		 * 新增已租房
		 */
		InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
		infoHouse4rentExpand.setHrHouseId(infoHaveRentCheckOut.getHrHouseId());
		infoHouse4rentExpand.setHrHouseDictId(infoHaveRentCheckOut.getHrHouseDictId());
		infoHouse4rentExpand.setHrLandlordId(infoHaveRentCheckOut.getHrLandlordId());
		infoHouse4rentExpand.setHrRenterId(infoHaveRentCheckOut.getRcoRenterId());
		infoHouse4rentExpand.setHrHouse4storeId(infoHaveRentCheckOut.getHrHouse4storeId());
		infoHouse4rentExpand.setHrUserId(infoHaveRentCheckOut.getHrUserId());
		infoHouse4rentExpand.setHrAdminUserId(infoHaveRentCheckOut.getHrAdminUserId());
		infoHouse4rentExpand.setHrWaterPlan(infoHaveRentCheckOut.getHrWaterPlan());
		infoHouse4rentExpand.setHrElectritPlan(infoHaveRentCheckOut.getHrElectritPlan());
		infoHouse4rentExpand.setHrGasPlan(infoHaveRentCheckOut.getHrGasPlan());
		
		infoHouse4rentExpand.setHrHotwaterPlan(infoHaveRentCheckOut.getHrHotWaterPlan());
		infoHouse4rentExpand.setHrHotairPlan(infoHaveRentCheckOut.getHrHotAirPlan());
		
		
		
		infoHouse4rentExpand.setHrSectionType(infoHaveRentCheckOut.getHrSectionType());
		infoHouse4rentExpand.setHrHouseOwner(infoHaveRentCheckOut.getHrHouseOwner());
		infoHouse4rentExpand.setHrHouseSquare(infoHaveRentCheckOut.getHrHouseSquare());
		infoHouse4rentExpand.setHrHouseDirection(infoHaveRentCheckOut.getHrHouseDirection());
		infoHouse4rentExpand.setHrSplitIdentifier(infoHaveRentCheckOut.getHrSplitIdentifier());
		infoHouse4rentExpand.setHrAddCity(infoHaveRentCheckOut.getHrAddCity());
		infoHouse4rentExpand.setHrAddDistrict(infoHaveRentCheckOut.getHrAddDistrict());
		infoHouse4rentExpand.setHrAddZone(infoHaveRentCheckOut.getHrAddZone());
		infoHouse4rentExpand.setHrAddStreet(infoHaveRentCheckOut.getHrAddStreet());
		infoHouse4rentExpand.setHrAddCommunity(infoHaveRentCheckOut.getHrAddCommunity());
		infoHouse4rentExpand.setHrAddBuilding(infoHaveRentCheckOut.getHrAddBuilding());
		infoHouse4rentExpand.setHrAddDoorplateno(infoHaveRentCheckOut.getHrAddDoorplateno());
		infoHouse4rentExpand.setHrWaterVolFirst(infoHaveRentCheckOut.getHrWaterVolFirst());
		infoHouse4rentExpand.setHrElectritVolFirst(infoHaveRentCheckOut.getHrElectritVolFirst());
		infoHouse4rentExpand.setHrGasVolFirst(infoHaveRentCheckOut.getHrGasVolFirst());
		
		infoHouse4rentExpand.setHrHotWaterVolFirst(infoHaveRentCheckOut.getHrHotWaterVolFirst());
		infoHouse4rentExpand.setHrHotAirVolFirst(infoHaveRentCheckOut.getHrHotAirVolFirst());
		
		
		infoHouse4rentExpand.setHrBeginTime(infoHaveRentCheckOut.getHrBeginTime());
		infoHouse4rentExpand.setHrTheTerm(infoHaveRentCheckOut.getHrTheTerm());
		infoHouse4rentExpand.setHrEndTime(infoHaveRentCheckOut.getHrEndTime());
		infoHouse4rentExpand.setHrHousePrice(infoHaveRentCheckOut.getHrHousePrice());
		infoHouse4rentExpand.setHrHouseDeposit(infoHaveRentCheckOut.getHrHouseDeposit());
		infoHouse4rentExpand.setHrDoorDeposit(infoHaveRentCheckOut.getHrDoorDeposit());
		infoHouse4rentExpand.setHrPowerDeposit(infoHaveRentCheckOut.getHrPowerDeposit());
		infoHouse4rentExpand.setHrOtherDeposit(infoHaveRentCheckOut.getHrOtherDeposit());
		infoHouse4rentExpand.setHrPaymentType(infoHaveRentCheckOut.getHrPaymentType());
		infoHouse4rentExpand.setHrHouseNote(infoHaveRentCheckOut.getHrHouseNote());
		infoHouse4rentExpand.setHrStorefront(infoHaveRentCheckOut.getHrStorefront());
		infoHouse4rentExpand.setHrDepartment(infoHaveRentCheckOut.getHrDepartment());
		infoHouse4rentExpand.setHrWifiCharge(infoHaveRentCheckOut.getHrWifiCharge());
		infoHouse4rentExpand.setHrTvCharge(infoHaveRentCheckOut.getHrTvCharge());
		infoHouse4rentExpand.setHrOtherPay(infoHaveRentCheckOut.getHrOtherPay());
		infoHouse4rentExpand.setHrManagerUserId(infoHaveRentCheckOut.getHrManagerUserId());
		infoHouse4rentExpand.setHrFlatShareLogo(infoHaveRentCheckOut.getHrFlatShareLogo());
		infoHouse4rentExpand.setJciBillJson(infoHaveRentCheckOut.getJciBillJson());//传入jciBillJson
		infoHouse4rentExpand.setHrSignTime(infoHaveRentCheckOut.getJrrBeginTime());
		int value = infoHouse4rentMapper.insertSelective(infoHouse4rentExpand);
		hrId = infoHouse4rentExpand.getHrId(); //已租房id
		
		//水电气读数
		Double waterVolFirst = infoHaveRentCheckOut.getHrWaterVolFirst();
		Double electritVolFirst = infoHaveRentCheckOut.getHrElectritVolFirst();
		Double gasVolFirst = infoHaveRentCheckOut.getHrGasVolFirst();
		
		Double hotwaterVolFirst = infoHaveRentCheckOut.getHrHotWaterVolFirst();
		Double hotairVolFirst = infoHaveRentCheckOut.getHrHotAirVolFirst();
		
		
		//拼接json字段
		meterReadingRecord = "{'water':{'lastReading':'"+waterVolFirst+"','thisReading':[]},"
								+"'electrit':{'lastReading':'"+electritVolFirst+"','thisReading':[]},"
								+ "'gas':{'lastReading':'"+gasVolFirst+"','thisReading':[]},"
								+ "'hotwater':{'lastReading':'"+hotwaterVolFirst+"','thisReading':[]},"
								+ "'hotair':{'lastReading':'"+hotairVolFirst+"','thisReading':[]}"
								+ "}";
		boolean numType = false;
		if(waterVolFirst != null && waterVolFirst != 0 && !"".equals(waterVolFirst)){
			numType = true;
		}
		if(electritVolFirst != null && electritVolFirst != 0 && !"".equals(electritVolFirst)){
			numType = true;
		}
		
		if(gasVolFirst != null && gasVolFirst != 0 && !"".equals(gasVolFirst)){
			numType = true;
		}
		
		if(hotwaterVolFirst != null && hotwaterVolFirst != 0 && !"".equals(hotwaterVolFirst)){
			numType = true;
		}
		if(hotairVolFirst != null && hotairVolFirst != 0 && !"".equals(hotairVolFirst)){
			numType = true;
		}
		
		if(value==0){
			 throw new Exception("新增已租房失败-------------------------------");
		}else{
			/*
			 * 未租房修改   
			 */
			if(numType == false){
				meterReadingRecord = null;
			}
			InfoHouse4storeExpand hs2 = new InfoHouse4storeExpand();
			hs2.setHsMeterReadingRecord(meterReadingRecord);
			hs2.setHsId(infoHaveRentCheckOut.getHrHouse4storeId());
			hs2.setHsLeaseState("已租");
			hs2.setHsTransactionPrice(infoHaveRentCheckOut.getJrrMoney());
			int value1 = infoHouse4storeMapper.updateByPrimaryKeySelective(hs2);
			if(value1 == 0){
				throw new Exception("未租房水电气存储字段数据添加失败--------------------------");
			}
			if(numType){
				List<JournalWegReading> wegList = new ArrayList<>();
		        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
				String today = df.format(new Date());
				System.out.println(today+"**********************");
				for(int i = 0; i<5;++i){
					JournalWegReading jwr = new JournalWegReading();
					//获取下已租单时的当前时间 存到抄表时间里
					jwr.setWegrdMonth(today);
					jwr.setWegrdRenterId(infoHaveRentCheckOut.getHrRenterId());
					jwr.setWegrdHouse4rentId(hrId);
					jwr.setWegrdHouse4storeId(infoHaveRentCheckOut.getHrHouse4storeId());
					jwr.setWegrdUserId(infoHaveRentCheckOut.getHrUserId());
					jwr.setWegrdDepartment(infoHaveRentCheckOut.getHrDepartment());
					jwr.setWegrdStorefront(infoHaveRentCheckOut.getHrStorefront());
//					jwr.setWegrdMonth(infoHouse4rentExpand.getWegrd_month());
					jwr.setWegrdNature("交房抄表");
					if(i == 0){
						jwr.setWegrdNums(waterVolFirst);
						jwr.setWegrdCostWays(infoHaveRentCheckOut.getHrWaterPlan());
						jwr.setWegrdType("水表");
					}else if(i == 1){
						jwr.setWegrdNums(electritVolFirst);
						jwr.setWegrdCostWays(infoHaveRentCheckOut.getHrElectritPlan());
						jwr.setWegrdType("电表");
					}else if(i == 2){
						jwr.setWegrdNums(gasVolFirst);
						jwr.setWegrdCostWays(infoHaveRentCheckOut.getHrGasPlan());
						jwr.setWegrdType("燃气表");
					}else if(i == 3){
						jwr.setWegrdNums(hotwaterVolFirst);
						jwr.setWegrdCostWays(infoHaveRentCheckOut.getHrHotWaterPlan());
						jwr.setWegrdType("热水表");
					}else if(i == 4){
						jwr.setWegrdNums(hotairVolFirst);
						jwr.setWegrdCostWays(infoHaveRentCheckOut.getHrHotAirPlan());
						jwr.setWegrdType("暖气表");
					}
					wegList.add(jwr);
				}
				//未租房水电气存储字段数据添加
				int result = journalWegReadingMapper.signingRentWegReading(wegList);
				if(result == 0){
					throw new Exception("抄表水电气数据添加失败-------------------------------");
				}
			}
		}
		/*
		 * 添加租客合约
		 */
		String att = infoHaveRentCheckOut.getAtt();
		System.out.println("att===="+att);
		String path = null;
        String num = null;
        if(att != null){
            JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
            if(attachment != null){
                path = attachment.getPath();
                num = attachment.getNum();
                int result7 = journalAttachmentMapper.deleteByAtt(att);
                if(result7 == 0){
                    throw new Exception("从附件表删除记录失败");
                }
            }
        }
        InfoRenewalRenterExpand rre2 = new InfoRenewalRenterExpand();
		rre2.setJrrHouse4rentId(hrId);
		rre2.setJrrHouse4storeId(infoHaveRentCheckOut.getJrrHouse4storeId());
		rre2.setJrrLandlordId(infoHaveRentCheckOut.getJrrLandlordId());
		rre2.setJrrRenterId(infoHaveRentCheckOut.getRcoRenterId());
		rre2.setJrrSignedTime(infoHaveRentCheckOut.getJrrSignedTime());
		rre2.setJrrBeginTime(infoHaveRentCheckOut.getJrrBeginTime());
		rre2.setJrrEndTime(infoHaveRentCheckOut.getJrrEndTime());
		rre2.setJrrUserId(infoHaveRentCheckOut.getJrrUserId());
		rre2.setJrrDepartment(infoHaveRentCheckOut.getJrrDepartment());
		rre2.setJrrStorefront(infoHaveRentCheckOut.getJrrStorefront());
		rre2.setJrrContractType(infoHaveRentCheckOut.getJrrContractType());
		rre2.setJrrTheTerm(infoHaveRentCheckOut.getJrrTheTerm());
		rre2.setJrrInAdvancePay(infoHaveRentCheckOut.getJrrInAdvancePay());
		rre2.setJrrPaymentMethod(infoHaveRentCheckOut.getJrrPaymentMethod());
		rre2.setJrrMoney(infoHaveRentCheckOut.getJrrMoney());
		rre2.setJrrRenewalCoding(infoHaveRentCheckOut.getJrrRenewalCoding());
		rre2.setJrrManageCost(infoHaveRentCheckOut.getJrrManageCost());
		rre2.setJrrManagePayment(infoHaveRentCheckOut.getJrrManagePayment());
		rre2.setJrrServerCost(infoHaveRentCheckOut.getJrrServerCost());
		rre2.setJrrServerPayment(infoHaveRentCheckOut.getJrrServerPayment());
		rre2.setJrrImgPath(path);
		rre2.setJrrImgNum(num);
		rre2.setAdvanceMode(infoHaveRentCheckOut.getAdvanceMode());
		rre2.setJrrTypeOfContract(infoHaveRentCheckOut.getJrrTypeOfContract());
		//rre.setJrrTypeOfContract(1);
		
		int result8 = infoRenewalRenterMapper.insertSelective(rre2);
		if(result8 == 0){
			throw new Exception("添加租客合约失败------------------------------");
		}
		Integer jrrId = rre2.getJrrId();
		//新增分期账单
		List<InfoContractInstallment> ici = new ArrayList<InfoContractInstallment>();
		String taskTimeConsumingJson = infoHaveRentCheckOut.getTaskTimeConsumingJson();
		JSONArray tcJson =JSONArray.fromObject(taskTimeConsumingJson);
		for (Object a : tcJson) {
			JSONObject jsonObj = (JSONObject)a;
			InfoContractInstallment jf = (InfoContractInstallment) JSONObject.toBean(jsonObj, InfoContractInstallment.class);
			jf.setJciHouse4rentId(hrId);
			jf.setJciRenterId(infoHaveRentCheckOut.getRcoRenterId());
			jf.setJciRentContId(jrrId);
			jf.setJciMessageTime(null);
			jf.setJciType("租客租金");
			jf.setJciDepartment(infoHaveRentCheckOut.getHrDepartment());
			jf.setJciStorefront(infoHaveRentCheckOut.getHrStorefront());
			jf.setJciRegisterPeople(infoHaveRentCheckOut.getHrUserId());
			if(jf.getJciPeriods() == 1){
				jf.setJciLabelType(3);
				jf.setJciBillJson(infoHouse4rentExpand.getJciBillJson());
			}
			ici.add(jf);
		}
		int result9 = infoContractInstallmentMapper.insertList(ici);
		if(result9 == 0){
			throw new Exception("新增分期账单失败--------------------");
		}

        //修改合约编号状态
		SysVariables sysVar = new SysVariables();
		sysVar.setVariablesId(1);
		List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
		if(!sysVarList.isEmpty()){
		    sysVar = sysVarList.get(0);
		}
		if (sysVar.getContractNums() == 1) {
	        String renewalCoding = infoHaveRentCheckOut.getJrrRenewalCoding();
	        String jcdHouseAddress =  infoHaveRentCheckOut.getHrAddCommunity()+" "+infoHaveRentCheckOut.getHrAddBuilding()+" "+infoHaveRentCheckOut.getHrAddDoorplateno();
	        if(renewalCoding != null && !renewalCoding.equals("") && jcdHouseAddress!= null && !jcdHouseAddress.equals("")){
	            JournalContractDatabase jcd = new JournalContractDatabase();
	            jcd.setJcdId(infoHaveRentCheckOut.getJcdId());
	            jcd.setJcdUseState("已签约");
	            jcd.setJcdUsedType("出租");
	            jcd.setJcdHouseAddress(jcdHouseAddress);
	            jcd.setJcdContractPerson(infoHaveRentCheckOut.getAdminUser());
	            jcd.setJcdSigningTime(infoHaveRentCheckOut.getJrrSignedTime());
	            int result10 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
	            if(result10 == 0){
	                throw new Exception("修改合约编号状态失败------------------------------");
	            }
	        }
		}
		/*
		 * 添加业绩受益人
		 */
		List<InfoTransactionAssistance> recordList = new ArrayList<InfoTransactionAssistance>();
		String jsonArray = infoHaveRentCheckOut.getJsonArray();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			InfoTransactionExpand jf = (InfoTransactionExpand) JSONObject.toBean(jsonObj, InfoTransactionExpand.class);
			jf.setAssistHouse4rent(hrId);
			jf.setAssistHouse4store(infoHaveRentCheckOut.getJrrHouse4storeId());
			recordList.add(jf);
		}
		if (recordList.size() > 0) {
	        int result11 = itamMapper.insertTAList(recordList);
	        if(result11 == 0){
	            throw new Exception("添加业绩受益人失败--------------------");
	        }
		}
		//迁移资产
		SysAssetsExpand sysAssetsExpand = new SysAssetsExpand();
		sysAssetsExpand.setJsonArray(infoHaveRentCheckOut.getMoveAsset());
		sysAssetsService.moveById(sysAssetsExpand);
		
		JSONObject jsonObj = new JSONObject();
        jsonObj.accumulate("hrId", hrId);
        String str = jsonObj.toString();
        
        String att1 = infoHaveRentCheckOut.getAtt();
		String path1 = null;
		String num1 = null;
		if(att != null){
			JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att1);
			if(attachment != null){
				path1 = attachment.getPath();
				num1 = attachment.getNum();
				int result12 = journalAttachmentMapper.deleteByAtt(att);
				if(result12 == 0){
					throw new Exception("从附件表删除记录失败");
				}
			}
		}
		
		String houseforRentFollowRemark = "（租客换房）普通签约：已租房" + hrId+ "签约成功。";
		JournalHousingFollowExpand record = new JournalHousingFollowExpand();
		record.setJhfImgPath(path);
		record.setJhfImgNum(num);
		record.setJhfDepartment(infoHaveRentCheckOut.getJhfDepartment());
		record.setJhfStorefront(infoHaveRentCheckOut.getJhfStorefront());
		record.setJhfHouse4rentId(hrId);
		record.setJhfHouse4storeId(infoHaveRentCheckOut.getJhfHouse4storeId());
		record.setJhfHouseId(infoHaveRentCheckOut.getJhfHouseId());
		record.setJhfFollowRemark(houseforRentFollowRemark);
		record.setJhfFollowResult(infoHaveRentCheckOut.getJhfFollowResult());
		record.setJhfPaymentWay(infoHaveRentCheckOut.getJhfPaymentWay());
		record.setJhfUserId(infoHaveRentCheckOut.getJhfUserId());
		//修改已租房最新跟进时间
		if (infoHaveRentCheckOut.getJhfHouse4rentId() != null) {
		    InfoHouse4rentExpand infoHr = new InfoHouse4rentExpand();
		    infoHr.setHrId(hrId);
		    infoHr.setHrFollowTime(CommonMethodClass.getCurrentDate());
		    infoHouse4rentMapper.updateByPrimaryKeySelective(infoHr);
		}
		int result13 = journalHousingFollowMapper.insertSelective(record);
		if(result13 == 0){
			throw new Exception("增加失败");
		}
		//生成收支
        String jsonStrArry = infoHaveRentCheckOut.getJsonStrArry();
        if (!"[]".equals(jsonStrArry)) {
            List<JournalFinancial> list3 = new ArrayList<JournalFinancial>();
            JSONArray jsa =JSONArray.fromObject(jsonStrArry);
            String strid = "";
            for (Object a : jsa) {
                JSONObject jsonObj2 = (JSONObject)a;
                JournalFinancial jf2 = (JournalFinancial) JSONObject.toBean(jsonObj2,JournalFinancial.class);
                if(jf2.getJfHouseId() != null){
                	if (jf2.getJfHouseId() == 0) {
                		jf2.setJfHouseId(null);
                	}
                }
                if("".equals(jf2.getJfStartCycle())){
                    jf2.setJfStartCycle(CommonMethodClass.getCurrentDate());
                }
                if("".equals(jf2.getJfEndCycle())){
                    jf2.setJfEndCycle(CommonMethodClass.getCurrentDate());
                }
                if("".equals(jf2.getJfHouse4rentId()) || jf2.getJfHouse4rentId() == null){
                	jf2.setJfHouse4rentId(hrId);
                }
                list3.add(jf2);
            }
            
            int result14 = insertList(list3, 0);
            if(result14 == 0){
    			throw new Exception("生成收支失败");
    		}
        }
		return 1;
	}

	public int insertList(List<JournalFinancial> recordList, int number) throws Exception {
		//获取传入的银行账户id，金额
		Integer faId = null; //账户id
		Double expenditure = 0.0; //支出
		Double income = 0.0; //收入
		String jfNatureOfThe = null; //收支性质
		String jfBigType = null;//收支类别
		String jfAccountingSpecies = null; //收支种类（只用于判断欠结）

		Double tempMoney = 0.0; //租客欠结金额
		Double supplementAmount = 0.0; //租客补结金额

		Double landlordTempMoney = 0.0; //房东欠结金额
		Double landlordSupplementAmount = 0.0; //房东补结金额

		Integer hrId = recordList.get(0).getJfHouse4rentId();//已租id
		Integer hsId = recordList.get(0).getJfHouse4storeId();//未租id
		int temp = -1;
		recordList = setManagerUserId(recordList);
		System.out.println(recordList);
		for(int i = 0; i < recordList.size(); ++i){
			if(recordList.get(i).getJfFinanNote().indexOf("退房结算") == -1){
				recordList.remove(recordList.get(i));
				i--;
				continue;
			}
			jfNatureOfThe = recordList.get(i).getJfNatureOfThe();
			jfBigType = recordList.get(i).getJfBigType();
			jfAccountingSpecies = recordList.get(i).getJfAccountingSpecies();
			Double money = recordList.get(i).getJfSumMoney(); //金额
			faId = recordList.get(i).getJfAccountId(); //账户id
			income = 0.00;
			expenditure = 0.00;
			//判断收支性质
			if("收入".equals(jfNatureOfThe)){
				if("欠结类".equals(jfBigType)){

					if("租客预存款".equals(jfAccountingSpecies)){
						income += money;
						supplementAmount += money;
					}
					if("租客还欠结款".equals(jfAccountingSpecies)){
						income += money;
						supplementAmount += money;
					}
					if("租客优惠金".equals(jfAccountingSpecies)){
						//不动账
						supplementAmount += money;
					}
					if("待付房东款".equals(jfAccountingSpecies)){
						//不动账
						landlordSupplementAmount += money;
					}
					if("房东还欠结款".equals(jfAccountingSpecies)){
						income += money;
						landlordSupplementAmount += money;
					}
				}else{
					income += money;
				}
			}else if("支出".equals(jfNatureOfThe)){
				if("欠结类".equals(jfBigType)){
					if("租客欠结款".equals(jfAccountingSpecies)){
						//不动账
						tempMoney += money;
					}
					if("还租客预存款".equals(jfAccountingSpecies)){
						expenditure += money;
						tempMoney += money;
					}
					if("支付房东待付款".equals(jfAccountingSpecies)){
						expenditure += money;
						landlordTempMoney += money;
					}
					if("房东欠结款".equals(jfAccountingSpecies)){
						//不动账
						landlordTempMoney += money;
					}
					if("充值优惠券".equals(jfAccountingSpecies)){
						//不动账
						supplementAmount += money;
					}
				}else{
					expenditure += money;
				}
			}
			//结算余额
			Double faTheBalanceOf = income - expenditure;
			InfoFinancialAccount fa = new InfoFinancialAccount();
			fa.setFaId(faId);
			fa.setFaTheBalanceOf(faTheBalanceOf);
			int result1 = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
			if(result1 == 0){
				throw new Exception("结算余额失败");
			}
			//查询最新余额
			List<InfoFinancialAccount> getJfNowBalance = infoFinancialAccountMapper.selectByPrimaryKey(fa);
			Double jfNowBalance = getJfNowBalance.get(0).getFaTheBalanceOf();
			//将最新余额设置到每一条收支的jfNowBalance(银行账户余额)里
			recordList.get(i).setJfNowBalance(jfNowBalance);
		}
		//新增收支记录
		int result = journalFinancialMapper.insertList(recordList);
		if(result == 0){
			throw new Exception("新增收支记录失败");
		}

		//租客欠结金额增减
		System.out.println("555555555:::::::"+hrId);
		if(tempMoney != 0 || supplementAmount != 0){
			InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
			infoHouse4rentExpand.setHrId(hrId);
			infoHouse4rentExpand.setArithmeticBase(tempMoney - supplementAmount);
			int result2 = infoHouse4rentMapper.arithmetic(infoHouse4rentExpand);
			if(result2 == 0){
				throw new Exception("租客欠结金额增减失败");
			}
			temp = 1;
		}
		//房东欠结金额增减
		if(landlordTempMoney != 0 || landlordSupplementAmount != 0){
			InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
			infoHouse4storeExpand.setHsId(hsId);
			infoHouse4storeExpand.setTempBase(landlordTempMoney - landlordSupplementAmount);
			int result3 = infoHouse4storeMapper.modifyTheBase(infoHouse4storeExpand);
			if(result3 == 0){
				throw new Exception("房东欠结金额增减失败");
			}
			temp = 1;
		}

		if(number == 1){
			//修改分期账单
			InfoContractInstallmentExpand ici = new InfoContractInstallmentExpand();
			ici.setJciHouse4rentId(recordList.get(0).getJfHouse4rentId());
			ici.setJciPeriods(1);
			List<InfoContractInstallmentExpand> listJci = infoContractInstallmentMapper.rentIdAll(ici);
			//取出第一期的分期账单id
			if(listJci.size() != 0){
				Integer jciId = listJci.get(0).getJciId();
				InfoContractInstallmentExpand ici1 = new InfoContractInstallmentExpand();
				ici1.setJciId(jciId);
				ici1.setJciState("已收");
				int reslut = infoContractInstallmentMapper.updateByPrimaryKeySelective(ici1);
			}
		}

		//修改票据编号信息
		if (sysVariablesService.checkBillNum()) {
			for (int i = 0; i < recordList.size(); i++) {
				if("收入".equals(recordList.get(i).getJfNatureOfThe())
						&& !("欠结类".equals(recordList.get(i).getJfBigType()) && "待付房东款".equals(recordList.get(i).getJfAccountingSpecies()))
						&& !("欠结类".equals(recordList.get(i).getJfBigType()) && "房东还欠结款".equals(recordList.get(i).getJfAccountingSpecies()))
						&& !("财务类".equals(recordList.get(i).getJfBigType()) && "资金调配".equals(recordList.get(i).getJfAccountingSpecies()))){
					if(recordList.get(i).getJfTicketNumber() != null){
						int jcdId = contractDatabaseService.getJcdId(recordList.get(i).getJfTicketNumber());
						JournalContractDatabase jcd = new JournalContractDatabase();
						jcd.setJcdId(jcdId);
						jcd.setJcdUseState("已使用");
						jcd.setJcdUsedType("票据");
						jcd.setJcdHouseAddress(recordList.get(i).getJfAccountingWhy());
						jcd.setJcdContractPerson(recordList.get(i).getJfTheCashierPeople());
						jcd.setJcdSigningTime(recordList.get(i).getJfBillingDate());
						int result3 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
					}
				}
			}
		}
		return 1;
	}

	/**
	 * 给每条收支绑定房管员，有已租id的绑已租房管员，有未租id的绑未租房管员
	 * @param list
	 * @return
	 */
	private List<JournalFinancial> setManagerUserId(List<JournalFinancial> list){
		try {
			for (JournalFinancial item: list) {
				if (item.getJfHouse4rentId() != null) {
					InfoHouse4rentExpand hr = new InfoHouse4rentExpand();
					hr.setHrId(item.getJfHouse4rentId());
					List<InfoHouse4rentExpand> hrList = infoHouse4rentMapper.selectById(hr);
					item.setJfManagerUserId(hrList.get(0).getHrManagerUserId());
				} else if (item.getJfHouse4storeId() != null) {
					List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.selectByPrimaryKey(item.getJfHouse4storeId());
					item.setJfManagerUserId(hsList.get(0).getHsManagerUserId());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
		}
		return list;
	}
}
