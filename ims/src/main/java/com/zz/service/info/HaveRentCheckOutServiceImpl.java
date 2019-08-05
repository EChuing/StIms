package com.zz.service.info;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoContractInstallmentMapper;
import com.zz.mapper.info.InfoHaveRentCheckOutMapper;
import com.zz.mapper.info.InfoHouse4rentMapper;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.info.InfoRenewalRenterMapper;
import com.zz.mapper.info.InfoResidentTableMapper;
import com.zz.mapper.info.InfoTransactionAssistanceMapper;
import com.zz.mapper.journal.JournalRepairMapper;
import com.zz.mapper.sys.SysUserMapper;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.info.InfoCustomerSourceStatistics;
import com.zz.po.info.InfoHaveRentCheckOut;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoRenewalRenterExpand;
import com.zz.po.info.InfoResidentTable;
import com.zz.po.info.InfoTransactionExpand;
import com.zz.po.journal.JournalFinancial;
import com.zz.po.journal.JournalRepairExpand;
import com.zz.po.journal.JournalShortMessageAdministrative;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.journal.FinancialService;
import com.zz.service.journal.ShortMessageAdministrativeService;
import com.zz.service.sys.SendShortMessageService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class HaveRentCheckOutServiceImpl implements HaveRentCheckOutService {
	private InfoHaveRentCheckOutMapper infoHaveRentCheckOutMapper;
	private InfoRenewalRenterMapper infoRenewalRenterMapper;
	private InfoResidentTableMapper infoResidentTableMapper;
	private InfoContractInstallmentMapper infoContractInstallmentMapper;
	private InfoHouse4rentMapper infoHouse4rentMapper;
	private InfoHouse4storeMapper infoHouse4storeMapper;
	private InfoTransactionAssistanceMapper itamMapper;
	private JournalRepairMapper journalRepairMapper;
	private FinancialService financialService;
	@Autowired
	private SysUserMapper sysUserMaper;
	@Autowired
	private SendShortMessageService sendShortMessageService;
	@Autowired
	private ShortMessageAdministrativeService shortMessageAdministrativeService;

	public void setFinancialService(FinancialService financialService) {
        this.financialService = financialService;
    }
    public void setJournalRepairMapper(JournalRepairMapper journalRepairMapper) {
        this.journalRepairMapper = journalRepairMapper;
    }
    public void setItamMapper(InfoTransactionAssistanceMapper itamMapper) {
		this.itamMapper = itamMapper;
	}
	public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}
	public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
		this.infoHouse4rentMapper = infoHouse4rentMapper;
	}
	public void setInfoContractInstallmentMapper(
			InfoContractInstallmentMapper infoContractInstallmentMapper) {
		this.infoContractInstallmentMapper = infoContractInstallmentMapper;
	}
	public void setInfoRenewalRenterMapper(
			InfoRenewalRenterMapper infoRenewalRenterMapper) {
		this.infoRenewalRenterMapper = infoRenewalRenterMapper;
	}
	public void setInfoHaveRentCheckOutMapper(
			InfoHaveRentCheckOutMapper infoHaveRentCheckOutMapper) {
		this.infoHaveRentCheckOutMapper = infoHaveRentCheckOutMapper;
	}
	public void setInfoResidentTableMapper(
			InfoResidentTableMapper infoResidentTableMapper) {
		this.infoResidentTableMapper = infoResidentTableMapper;
	}

	@Override
	public int deleteByPrimaryKey(InfoHaveRentCheckOut record) throws Exception {
		// TODO Auto-generated method stub
		return infoHaveRentCheckOutMapper.deleteByPrimaryKey(record);
	}

	@Override
	public int insertSelective(InfoHaveRentCheckOut record) throws Exception {
		// TODO Auto-generated method stub
		System.out.println(infoHaveRentCheckOutMapper);
		System.out.println(record);
		return infoHaveRentCheckOutMapper.insertSelective(record);
	}

	@Override
	public List<InfoHaveRentCheckOut> selectByPrimaryKey(
			InfoHaveRentCheckOut record) throws Exception {
		// TODO Auto-generated method stub
		return infoHaveRentCheckOutMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoHaveRentCheckOut record)
			throws Exception {
		// TODO Auto-generated method stub
		return infoHaveRentCheckOutMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<InfoHaveRentCheckOut> queryDeposit(
			InfoHaveRentCheckOut record) throws Exception {
		// TODO Auto-generated method stub
		return infoHaveRentCheckOutMapper.queryDeposit(record);
	}

	@Override
	public int updateHrState(InfoHaveRentCheckOut record) throws Exception {
		// TODO Auto-generated method stub
		return infoHaveRentCheckOutMapper.updateHrState(record);
	}

	@Override
	public int updateHsState(InfoHaveRentCheckOut record) throws Exception {
		// TODO Auto-generated method stub
		return infoHaveRentCheckOutMapper.updateHsState(record);
	}

	@Override
	public int checkOutHandling(InfoHaveRentCheckOut record) throws Exception {
		return upcheckOutHandling(record);
	}
	
	//处理已租房退房合约、分期账单、生成收支
	private int upcheckOutHandling(InfoHaveRentCheckOut infoHaveRentCheckOut) throws Exception{
	    InfoHaveRentCheckOut param = new InfoHaveRentCheckOut();
        param.setRcoId(infoHaveRentCheckOut.getRcoId());
        List<InfoHaveRentCheckOut> list = infoHaveRentCheckOutMapper.selectByPrimaryKey(param);
        if (list.isEmpty()) {
            throw new Exception("查询不到退房记录");
        }
        //增加操作记录
        if (list.get(0).getRcoOperationRecords() != null && !list.get(0).getRcoOperationRecords().equals("")) {
            infoHaveRentCheckOut.setRcoOperationRecords(list.get(0).getRcoOperationRecords() + "," + infoHaveRentCheckOut.getRcoOperationRecords());
        } else {
            infoHaveRentCheckOut.setRcoOperationRecords(infoHaveRentCheckOut.getRcoOperationRecords());
        }
		//修改退房表
		int result = infoHaveRentCheckOutMapper.updateByPrimaryKeySelective(infoHaveRentCheckOut);
		if(result == 0){
			throw new Exception();
		}
        //修改已租房状态
        InfoHouse4rentExpand ir = new InfoHouse4rentExpand();
        ir.setHrId(infoHaveRentCheckOut.getRcoRentId());
        ir.setHrState(infoHaveRentCheckOut.getRcoCheckOutTheState());
        infoHouse4rentMapper.updateByPrimaryKeySelective(ir);

        //出账
        int rentId = infoHaveRentCheckOut.getRcoRentId();
        int storeId = infoHaveRentCheckOut.getRcoStoreId();
        int renterId = infoHaveRentCheckOut.getRcoRenterId();
        String checkOutTheState = infoHaveRentCheckOut.getRcoCheckOutTheState();
		if(checkOutTheState.equals("退房完成")){
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
				int result1 = infoRenewalRenterMapper.updateByPrimaryKeySelective(ire);
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
					int result2 = infoContractInstallmentMapper.checkoutthestate(ice);	
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
					int result1 = infoResidentTableMapper.updateByPrimaryKeySelective(irta);
				}
			}
			//退房完成时如果未租房状态不是已租的话改为空置未租
			InfoHouse4storeExpand is = new InfoHouse4storeExpand();
			is.setHsId(infoHaveRentCheckOut.getRcoStoreId());
			List<InfoHouse4storeExpand> hs = infoHouse4storeMapper.selectByPrimaryKey(infoHaveRentCheckOut.getRcoStoreId());
			if(!hs.get(0).getHsLeaseState().equals("已租")){
				is.setHsLeaseState("空置未租");
				int result1 = infoHouse4storeMapper.updateByPrimaryKeySelective(is);
			}
			//修改业绩受益人状态
			InfoTransactionExpand assistModel = new InfoTransactionExpand();
			assistModel.setAssistHouse4rent(infoHaveRentCheckOut.getRcoRentId());
			assistModel.setAssistHouse4store(infoHaveRentCheckOut.getRcoStoreId());
			assistModel.setAssistState("失效");
			int result3 = itamMapper.performanceModificationInterface(assistModel);
	        //生成收支
	        String jsonArray = infoHaveRentCheckOut.getJsonArray();
	        if (!"[]".equals(jsonArray)) {
	            List<JournalFinancial> list3 = new ArrayList<JournalFinancial>();
	            JSONArray ja =JSONArray.fromObject(jsonArray);
	            String strid = "";
	            for (Object a : ja) {
	                JSONObject jsonObj = (JSONObject)a;
	                JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
	                if("".equals(jf.getJfStartCycle())){
	                    jf.setJfStartCycle(CommonMethodClass.getCurrentDate());
	                }
	                if("".equals(jf.getJfEndCycle())){
	                    jf.setJfEndCycle(CommonMethodClass.getCurrentDate());
	                }
	                list3.add(jf);
	            }
	            financialService.insertList(list3, 0);
	        }
		}
		return 1;
	}

	@Override
	public int recoveryHaveRentCheckOut(InfoHaveRentCheckOut record)
			throws Exception {
	    InfoHaveRentCheckOut param = new InfoHaveRentCheckOut();
        param.setRcoId(record.getRcoId());
        List<InfoHaveRentCheckOut> list = infoHaveRentCheckOutMapper.selectByPrimaryKey(param);
        if (list.isEmpty()) {
            throw new Exception("查询不到退房记录");
        }
        if (list.get(0).getRcoOperationRecords() != null && !list.get(0).getRcoOperationRecords().equals("")) {
            record.setRcoOperationRecords(list.get(0).getRcoOperationRecords() + "," + record.getRcoOperationRecords());
        } else {
            record.setRcoOperationRecords(record.getRcoOperationRecords());
        }
		return infoHaveRentCheckOutMapper.recoveryHaveRentCheckOut(record);
	}

	@Override
	public int recoveryHaveRent(InfoHaveRentCheckOut record) throws Exception {
		return infoHaveRentCheckOutMapper.recoveryHaveRent(record);
	}
	
	/*
	租客退房计算退补租金（多退少补，正数为补，负数为退）
	逻辑图：http://pic-static.fangzhizun.com/%E9%80%80%E6%88%BF%E7%A7%9F%E9%87%91%E8%AE%A1%E7%AE%97%E9%80%BB%E8%BE%91%E5%9B%BE.png
	办理退房时间是否超过合约结束日期
	超期：
	    1.计算超期租金：超期租金 = 超期天数 / 办理退房时间所在月的天数 * 月租金 
	    2.计算合约期内待收账单总金额
	    
	不超期：
                           判断办理退房时间所在那期有金额的账单是否待收
                                        待收：一天的租金 = 当期（总）租金/（下一期有金额的账单的开始时间-最近一期有金额的账单的开始时间）
                                                    待收的天数 = 退房办理时间-最近一期有金额的账单的开始时间 + 1
                                                    合约期内未缴 = 一天的租金 * 待收的天数
                                                    查询最近一期有金额的账单的开始时间之前的账单是否存在待收的账单，有的话也是要补交的
                                        已收：一天的租金 = 当期（总）租金/（后一期租金有金额开始时间-最近一期账单租金有金额开始时间）
                                                    应退的天数 = 后一期租金有金额开始时间-退房办理时间 - 1
                                                    合约期内应退 = 一天的租金 * 应退的天数
                                                    查询最近一期有金额的账单的开始时间之后的账单是否存在已收的账单，有的话也是要退的
	*/
	@Override
	public InfoHaveRentCheckOut selectBasicData(InfoHaveRentCheckOut infoHaveRentCheckOut) throws Exception {
	    Double money = 0.00;//最终退补租金
		int hrId = infoHaveRentCheckOut.getRcoRentId();
		String rcoCheckOutActualTime = infoHaveRentCheckOut.getRcoCheckOutActualTime();//办理退房时间
		String rcoJrrEndTime = infoHaveRentCheckOut.getRcoJrrEndTime();//合约结束日期
        Double rcoJrrMoney = infoHaveRentCheckOut.getRcoJrrMoney();//月租金
		int chaoqitianshu = CommonMethodClass.countDay(rcoJrrEndTime, rcoCheckOutActualTime);
		if (chaoqitianshu > 0) {//办理时间-合约结束>0   办理时间>合约结束   超期
		    //1.计算超期租金：超期租金 = 超期天数 / 办理退房时间所在月的天数 * 月租金
		    int thisMonthDays = CommonMethodClass.getMonthDays(CommonMethodClass.getToday());
		    Double chaoqizujin = (double)chaoqitianshu / thisMonthDays * rcoJrrMoney;
		    //2.计算合约期内待收账单总金额
            Double daishouzujin = 0.00;
		    InfoContractInstallmentExpand ins = new InfoContractInstallmentExpand();
		    ins.setJciHouse4rentId(hrId);
		    ins.setJciType("租客租金");
		    ins.setJciState("待收");
		    List<InfoContractInstallmentExpand> ins2 = infoContractInstallmentMapper.countJciMoney(ins);
		    if (ins2.size() > 0 && ins2.get(0) != null) {
		        daishouzujin = ins2.get(0).getJciMoney();
		    }
	        System.out.println("chaoqitianshu:"+chaoqitianshu);
	        System.out.println("thisMonthDays:"+thisMonthDays);
	        System.out.println("chaoqizujin:"+chaoqizujin);
		    System.out.println("daishouzujin:"+daishouzujin);
		    money = chaoqizujin + daishouzujin;
		} else {//不超期
            //查询退房所在的那期有金额的账单
		    InfoContractInstallmentExpand ins = new InfoContractInstallmentExpand();
		    ins.setJciHouse4rentId(hrId);
            ins.setLessThan(1);
		    ins.setByTheTime(rcoCheckOutActualTime);
		    ins.setSort("1");
		    ins.setLimitNum(1);
		    ins.setJciType("租客租金");
		    List<InfoContractInstallmentExpand> ins2 = infoContractInstallmentMapper.queryByTheTime(ins);
		    if (ins2.isEmpty()) {
		        throw new Exception("没有查询到退房所在的那期有金额的账单");
		    }
		    //最近一期有金额的账单的开始时间
            String thisBegin = ins2.get(0).getJciBeginPeriods();
            //下一期有金额的账单的开始时间
            String nextBegin = "";
            ins = new InfoContractInstallmentExpand();
            ins.setJciHouse4rentId(hrId);
            ins.setGreaterThan(2);
            ins.setByTheTime(thisBegin);
            ins.setSort("2");
            ins.setLimitNum(1);
            ins.setJciType("租客租金");
            List<InfoContractInstallmentExpand> ins3 = infoContractInstallmentMapper.queryByTheTime(ins);
            if (!ins3.isEmpty()) {
                nextBegin = ins3.get(0).getJciBeginPeriods();
            } else {
                nextBegin = CommonMethodClass.dateAddSub(thisBegin, 1);//没有下一期有金额的账单，月份+1
            }
            System.out.println("最近一期有金额的账单的开始时间:"+thisBegin);
            System.out.println("下一期有金额的账单的开始时间:"+nextBegin);
            
		    if ("待收".equals(ins2.get(0).getJciState())) {
		        //一天的租金
		        Double oneDayMoney = ins2.get(0).getJciMoney() / CommonMethodClass.countDay(thisBegin, nextBegin);
		        //待收的天数
		        int daishoutianshu = CommonMethodClass.countDay(thisBegin, rcoCheckOutActualTime) + 1;
		        //合约期内未缴
		        money = oneDayMoney * daishoutianshu;//正数为补
		        System.out.println("oneDayMoney:"+oneDayMoney);
	            System.out.println("daishoutianshu:"+daishoutianshu);
	            //查询最近一期有金额的账单的开始时间之前的账单是否存在待收的账单，有的话也是要补交的
	            ins = new InfoContractInstallmentExpand();
	            ins.setJciHouse4rentId(hrId);
	            ins.setJciState("待收");
	            ins.setLessThan(2);
	            ins.setByTheTime(thisBegin);
	            ins.setJciType("租客租金");
	            List<InfoContractInstallmentExpand> ins4 = infoContractInstallmentMapper.queryByTheTime(ins);
                for (InfoContractInstallmentExpand item : ins4) {
                    money += item.getJciMoney();
                    System.out.println("额外补交:"+item.getJciMoney());
                }
		    } else {//已收
		        //一天的租金
                Double oneDayMoney = ins2.get(0).getJciMoney() / CommonMethodClass.countDay(thisBegin, nextBegin);
                //应退的天数
                int yingtuitianshu = CommonMethodClass.countDay(rcoCheckOutActualTime, nextBegin) - 1;
                //合约期内应退
                money = oneDayMoney * yingtuitianshu;
                System.out.println("oneDayMoney:"+oneDayMoney);
                System.out.println("yingtuitianshu:"+yingtuitianshu);
                //查询最近一期有金额的账单的开始时间之后的账单是否存在已收的账单，有的话也是要退的
                ins = new InfoContractInstallmentExpand();
                ins.setJciHouse4rentId(hrId);
                ins.setJciState("已收");
                ins.setGreaterThan(2);
                ins.setByTheTime(thisBegin);
                ins.setJciType("租客租金");
                List<InfoContractInstallmentExpand> ins4 = infoContractInstallmentMapper.queryByTheTime(ins);
                for (InfoContractInstallmentExpand item : ins4) {
                    money += item.getJciMoney();
                    System.out.println("额外要退:"+item.getJciMoney());
                }
                money = -money;//负数为退
		    }
		}
		//保留两位小数
		money = new BigDecimal(money).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
        System.out.println("money:"+money);
        infoHaveRentCheckOut.setRcoBeyondTheRent(money);
        return infoHaveRentCheckOut;
	}
	
	//添加租客退房
	@Override
	public int insertInfoHaveRentCheckOut(InfoHaveRentCheckOut infoHaveRentCheckOut) throws Exception {
	    if (infoHaveRentCheckOut.getRcoStoreId() == null) {
	        throw new Exception("添加租客退房出错， 无未租id");
	    }
	    //退房表加一条记录
		int result1 = infoHaveRentCheckOutMapper.insertSelective(infoHaveRentCheckOut);
		if(result1 == 0){
			throw new Exception("添加租客退房出错");
		}
		//修改已租房状态（退租、正办理退房），已租房退房读数
		InfoHouse4rentExpand hr = new InfoHouse4rentExpand();
		hr.setHrId(infoHaveRentCheckOut.getRcoRentId());
		hr.setHrLeaseState("退租");
		hr.setHrState("正办理退房");
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
		if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("到期不续")){
			hs.setHsLeaseState("到期不续");
		}else if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("租客转租")){
			hs.setHsLeaseState("正在转租");
		}else if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("租客毁约")){
			hs.setHsLeaseState("毁约待租");
		}else if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("公司毁约")){
			hs.setHsLeaseState("空置未租");
		}
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
		return 1;
	}
	
	//申请退房、保存、提交修改
	@Override
	public int updataInfoHaveRentCheckOut(InfoHaveRentCheckOut infoHaveRentCheckOut) throws Exception {
		int result =0;
		int result2 = 0;
		int result3 = 0;
		int result4 = 0;
		if(infoHaveRentCheckOut.getRcoCheckOutTheState().equals("正办理退房")){
		    //保存退房数据
			result = infoHaveRentCheckOutMapper.updateByPrimaryKeySelective(infoHaveRentCheckOut);
			if(result == 0){
				throw new Exception("申请退房修改失败");
			}
			//修改未租房状态
			if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("到期不续")){
                InfoHouse4storeExpand is = new InfoHouse4storeExpand();
                is.setHsId(infoHaveRentCheckOut.getRcoStoreId());
                List<InfoHouse4storeExpand> hs = infoHouse4storeMapper.selectByPrimaryKey(infoHaveRentCheckOut.getRcoStoreId());
                if(!hs.get(0).getHsLeaseState().equals("已租") && "未办手续".equals(infoHaveRentCheckOut.getRcoProcedures())){
                    is.setHsLeaseState("空置未租");
                    result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(is);
                    if(result3 == 0){
                        throw new Exception("未租退房修改失败");
                    }
                }else if(!hs.get(0).getHsLeaseState().equals("已租") && !hs.get(0).getHsLeaseState().equals("到期不续")){
                    is.setHsLeaseState("到期不续");
                    result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(is);
                    if(result3 == 0){
                        throw new Exception("未租退房修改失败");
                    }
                }
            }else if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("租客转租")){
                InfoHouse4storeExpand is = new InfoHouse4storeExpand();
                is.setHsId(infoHaveRentCheckOut.getRcoStoreId());
                List<InfoHouse4storeExpand> hs = infoHouse4storeMapper.selectByPrimaryKey(infoHaveRentCheckOut.getRcoStoreId());
                if(!hs.get(0).getHsLeaseState().equals("已租") && !hs.get(0).getHsLeaseState().equals("正在转租")){
                    is.setHsLeaseState("正在转租");
                    result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(is);
                    if(result3 == 0){
                        throw new Exception("未租退房修改失败");
                    }
                }
            }else if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("租客毁约")){
                InfoHouse4storeExpand is = new InfoHouse4storeExpand();
                is.setHsId(infoHaveRentCheckOut.getRcoStoreId());
                List<InfoHouse4storeExpand> hs = infoHouse4storeMapper.selectByPrimaryKey(infoHaveRentCheckOut.getRcoStoreId());
                if(!hs.get(0).getHsLeaseState().equals("已租") && !hs.get(0).getHsLeaseState().equals("毁约待租")){
                    is.setHsLeaseState("毁约待租");
                    result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(is);
                    if(result3 == 0){
                        throw new Exception("未租退房修改失败");
                    }
                }
            }else if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("公司毁约")){
                InfoHouse4storeExpand is = new InfoHouse4storeExpand();
                is.setHsId(infoHaveRentCheckOut.getRcoStoreId());
                List<InfoHouse4storeExpand> hs = infoHouse4storeMapper.selectByPrimaryKey(infoHaveRentCheckOut.getRcoStoreId());
                if(!hs.get(0).getHsLeaseState().equals("已租") && !hs.get(0).getHsLeaseState().equals("空置未租")){
                    is.setHsLeaseState("空置未租");
                    result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(is);
                    if(result3 == 0){
                        throw new Exception("未租退房修改失败");
                    }
                }
            }
		} else if(infoHaveRentCheckOut.getRcoCheckOutTheState().equals("退房待审核")){
			result = infoHaveRentCheckOutMapper.updateByPrimaryKeySelective(infoHaveRentCheckOut);
			if(result == 0){
				throw new Exception("申请退房修改失败");
			}
			//修改已租房状态
			InfoHouse4rentExpand ir = new InfoHouse4rentExpand();
			ir.setHrId(infoHaveRentCheckOut.getRcoRentId());
			ir.setHrState("退房待审核");
			result2 = infoHouse4rentMapper.updateByPrimaryKeySelective(ir);
			System.out.println(infoHaveRentCheckOut.getRenterPopTelephone());
			if(result2 == 0){
				throw new Exception("已租退房修改失败");
			}
			//修改未租房状态
			InfoHouse4storeExpand is = new InfoHouse4storeExpand();
			is.setHsId(infoHaveRentCheckOut.getRcoStoreId());
			List<InfoHouse4storeExpand> hs = infoHouse4storeMapper.selectByPrimaryKey(infoHaveRentCheckOut.getRcoStoreId());
			if(!hs.get(0).getHsLeaseState().equals("已租") && !hs.get(0).getHsLeaseState().equals("空置未租")){
				is.setHsLeaseState("空置未租");
				result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(is);
				if(result3 == 0){
					throw new Exception("修改未租房状态失败");
				}
			}
			//添加维修
			String rcoRepairNote = infoHaveRentCheckOut.getRcoRepairNote();
			JSONArray array = JSONArray.fromObject(rcoRepairNote);
			System.out.println("维修条数："+array.size());
			for (Object obj : array) {
			    JSONObject jsonObj = (JSONObject) obj;
			    JournalRepairExpand repair = (JournalRepairExpand) JSONObject.toBean(jsonObj, JournalRepairExpand.class);
			    List<JournalRepairExpand> list = journalRepairMapper.selectRepairByAnyCondition(repair);
			    if (list.isEmpty()) {
			        System.out.println("添加维修："+repair.toString());
			        result4 = journalRepairMapper.insertSelective(repair);
			        if(result4 == 0){
	                    throw new Exception("添加维修失败");
	                }
			        System.out.println("SendMsg:=="+repair.isSendMsg());
			        if(repair.isSendMsg()){
			        	//设置维修用户
			        	SysUserExpand repairUser=new SysUserExpand(); 
			        	repairUser.setUserId(repair.getRepRepairPeopleId());
			        	List<SysUserExpand>userList= sysUserMaper.selectByPrimaryKey(repairUser);
						String smUserContacts = userList.get(0).getSuContact();
			        	JournalShortMessageAdministrative journalShortMessageAdministrative=new JournalShortMessageAdministrative();
			        	
			        	journalShortMessageAdministrative.setSmType("发送");
						journalShortMessageAdministrative.setSmUserId(repair.getRepRepairPeopleId());
						journalShortMessageAdministrative.setSmUserContacts(smUserContacts);
						journalShortMessageAdministrative.setSmRentId(repair.getRepHouse4rentId());
						journalShortMessageAdministrative.setSmNotRentId(repair.getRepHouse4storeId());
//						System.out.println("==detail1==  "+"hrId:"+repair.getRepHouse4rentId()+" hsId:"+repair.getRepHouse4rentId()+" smUserContacts:"+repair.getRepUserId());
			        	String message=
			        			"您有一个新的"+repair.getRepTypeRp()+"需要处理："+repair.getRepEventRp()+"，类型："+repair.getRepResponsibility()+"，金额："+repair.getRepTollRp()+"。";
			        	journalShortMessageAdministrative.setSmContent(message);
			        	System.out.println(journalShortMessageAdministrative);
			        	
			        	Result<String>result5= sendShortMessageService.sendMessage(smUserContacts, message, journalShortMessageAdministrative, 1);
			        }
			    }
			}
		}
		return 1;
	}
	
	//审核退房
	@Override
	public int updateChecOutAudit(InfoHaveRentCheckOut infoHaveRentCheckOut) throws Exception {
	    InfoHaveRentCheckOut param = new InfoHaveRentCheckOut();
	    param.setRcoId(infoHaveRentCheckOut.getRcoId());
	    List<InfoHaveRentCheckOut> list = infoHaveRentCheckOutMapper.selectByPrimaryKey(param);
	    if (list.isEmpty()) {
            throw new Exception("查询不到退房记录");
        }
	    //增加操作记录及修改退房状态
	    if (list.get(0).getRcoOperationRecords() != null && !list.get(0).getRcoOperationRecords().equals("")) {
	        infoHaveRentCheckOut.setRcoOperationRecords(list.get(0).getRcoOperationRecords() + "," + infoHaveRentCheckOut.getRcoOperationRecords());
	    } else {
	        infoHaveRentCheckOut.setRcoOperationRecords(infoHaveRentCheckOut.getRcoOperationRecords());
	    }
		int result = infoHaveRentCheckOutMapper.updateByPrimaryKeySelective(infoHaveRentCheckOut);
		if(result == 0){
			throw new Exception("审核退房修改失败");
		}
		//修改已租房状态
		InfoHouse4rentExpand ir = new InfoHouse4rentExpand();
		ir.setHrId(infoHaveRentCheckOut.getRcoRentId());
		ir.setHrState(infoHaveRentCheckOut.getRcoCheckOutTheState());
		int result2 = infoHouse4rentMapper.updateByPrimaryKeySelective(ir);
		if(result2 == 0){
			throw new Exception("已租审核退房修改失败");
		}
		//审核/复核不通过时，改未租房状态
		if("重置".equals(infoHaveRentCheckOut.getReflashStore())){
			InfoHouse4storeExpand is = new InfoHouse4storeExpand();
			is.setHsId(infoHaveRentCheckOut.getRcoStoreId());
			List<InfoHouse4storeExpand> hs = infoHouse4storeMapper.selectByPrimaryKey(infoHaveRentCheckOut.getRcoStoreId());
			if(!hs.get(0).getHsLeaseState().equals("已租")){
				if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("到期不续")){
					is.setHsLeaseState("到期不续");
				}
				if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("租客转租")){
					is.setHsLeaseState("正在转租");
				}
				if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("租客毁约")){
					is.setHsLeaseState("毁约待租");
				}
				if(infoHaveRentCheckOut.getRcoCheckOutNature().equals("公司毁约")){
					is.setHsLeaseState("空置未租");
				}
				int result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(is);
				if(result3 == 0){
					throw new Exception("未租审核退房修改失败");
				}
			}
		}
		return 1;
	}
    @Override
    public List<InfoHaveRentCheckOut> queryHouseRentNum() throws Exception {
        return infoHaveRentCheckOutMapper.queryHouseRentNum();
    }
}
