package com.zz.service.info;


import com.zz.actions.commons.HttpRequestUtil;
import com.zz.mapper.info.*;
import com.zz.mapper.journal.*;
import com.zz.mapper.sys.SysVariablesMapper;
import com.zz.po.commons.Result;
import com.zz.po.info.*;
import com.zz.po.journal.*;
import com.zz.po.sys.SysAssetsExpand;
import com.zz.po.sys.SysVariables;
import com.zz.service.journal.JourDoorCardService;
import com.zz.service.sys.SendShortMessageService;
import com.zz.service.sys.SysAssetsService;
import com.zz.util.DateUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.*;


public class HouseForRentServiceImpl implements HouseForRentService{
	private final static String POSTURL = "http://www.fangzhizun.com/device/api";
	private InfoHouse4rentMapper infoHouse4rentMapper;
	private InfoHouse4storeMapper infoHouse4storeMapper;
	private JournalWegReadingMapper journalWegReadingMapper;
	private InfoPopulationMapper infoPopulationMapper;
	private InfoRenterMapper infoRenterMapper;
	private InfoRenewalRenterMapper infoRenewalRenterMapper;
	private JournalContractDatabaseMapper journalContractDatabaseMapper;
	private InfoIntendedPersonMapper infoIntendedPersonMapper;
	private InfoTransactionAssistanceMapper itamMapper;
	private InfoContractInstallmentMapper infoContractInstallmentMapper;
	private SysAssetsService sysAssetsService;
	private JournalAttachmentMapper journalAttachmentMapper;
	private SysVariablesMapper sysVariablesMapper;
	private JournalHousingFollowMapper journalHousingFollowMapper;
	@Autowired
	private JourDeviceMapper jourDeviceMapper;
	@Autowired
	private SendShortMessageService sendShortMessageService;
	@Autowired
	private JourDoorCardService jourDoorCardService;


	public void setJournalHousingFollowMapper(JournalHousingFollowMapper journalHousingFollowMapper) {
		this.journalHousingFollowMapper = journalHousingFollowMapper;
	}
	public void setSysVariablesMapper(SysVariablesMapper sysVariablesMapper) {
        this.sysVariablesMapper = sysVariablesMapper;
    }
    public void setJournalAttachmentMapper(
            JournalAttachmentMapper journalAttachmentMapper) {
        this.journalAttachmentMapper = journalAttachmentMapper;
    }
    public void setSysAssetsService(SysAssetsService sysAssetsService) {
        this.sysAssetsService = sysAssetsService;
    }
    public void setInfoContractInstallmentMapper(
			InfoContractInstallmentMapper infoContractInstallmentMapper) {
		this.infoContractInstallmentMapper = infoContractInstallmentMapper;
	}
	public void setItamMapper(InfoTransactionAssistanceMapper itamMapper) {
		this.itamMapper = itamMapper;
	}
	public void setInfoIntendedPersonMapper(
			InfoIntendedPersonMapper infoIntendedPersonMapper) {
		this.infoIntendedPersonMapper = infoIntendedPersonMapper;
	}
	public void setJournalContractDatabaseMapper(
			JournalContractDatabaseMapper journalContractDatabaseMapper) {
		this.journalContractDatabaseMapper = journalContractDatabaseMapper;
	}
	public void setInfoRenewalRenterMapper(
			InfoRenewalRenterMapper infoRenewalRenterMapper) {
		this.infoRenewalRenterMapper = infoRenewalRenterMapper;
	}
	public void setInfoRenterMapper(InfoRenterMapper infoRenterMapper) {
		this.infoRenterMapper = infoRenterMapper;
	}
	public void setInfoPopulationMapper(InfoPopulationMapper infoPopulationMapper) {
		this.infoPopulationMapper = infoPopulationMapper;
	}
	public void setJournalWegReadingMapper(
			JournalWegReadingMapper journalWegReadingMapper) {
		this.journalWegReadingMapper = journalWegReadingMapper;
	}
	public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}
	public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
		this.infoHouse4rentMapper = infoHouse4rentMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer id) throws Exception {
		return infoHouse4rentMapper.deleteByPrimaryKey(id);
	}
	@Override
	public int insertSelective(InfoHouse4rentExpand record) throws Exception {
		return infoHouse4rentMapper.insertSelective(record);
	}
	
	@Override
	public int updateByPrimaryKeySelective(InfoHouse4rentExpand record)
			throws Exception {
		return infoHouse4rentMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateHouse4renrManager(InfoHouse4rentExpand record)
			throws Exception {
		return infoHouse4rentMapper.updateHouse4renrManager(record);
	}
	@Override
	public int updateHouse4storeManager(InfoHouse4rentExpand record)
			throws Exception {
		return infoHouse4rentMapper.updateHouse4storeManager(record);
	}

	@Override
	public List<InfoHouse4rent> selectByPrimaryKey(Integer id) throws Exception {
		return infoHouse4rentMapper.selectByPrimaryKey(id);
	}

	@Override
	public String selectOfMaxNumber() throws Exception {
		return infoHouse4rentMapper.selectOfMaxNumber();
	}

	@Override
	public List<String> selectForAddress(InfoHouse4rentExpand conditions)
			throws Exception {
		return infoHouse4rentMapper.selectForAddress(conditions);
	}

	@Override
	public int arithmetic(InfoHouse4rentExpand record) throws Exception {
		return infoHouse4rentMapper.arithmetic(record);
	}

	@Override
	public List<InfoHouse4rentExpand> selectNoAssist(
			InfoHouse4rentExpand conditions) throws Exception {
		return infoHouse4rentMapper.selectNoAssist(conditions);
	}

	@Override
	public List<InfoHouse4rentExpand> getrentiuserId(
			InfoHouse4rentExpand conditions) throws Exception {
		return infoHouse4rentMapper.getrentiuserId(conditions);
	}

	@Override
	public List<InfoHouse4rentExpand> selectRentOutOfTheRoom(
			InfoHouse4rentExpand conditions) throws Exception {
		return infoHouse4rentMapper.selectRentOutOfTheRoom(conditions);
	}
	
	@Override
	public List<InfoHouse4rentExpand> getMeterReadingScheme(
			InfoHouse4rentExpand conditions) throws Exception {
		return infoHouse4rentMapper.getMeterReadingScheme(conditions);
	}
	
	@Override
	public String insertHouse4rentWed(InfoHouse4rentExpand conditions)throws Exception {
		return insertHouse4rent(conditions);
	}
	
	//处理新增已租房与抄表
	private String insertHouse4rent(InfoHouse4rentExpand infoHouse4rentExpand) throws Exception{
		//水电气json存储
		String meterReadingRecord = "";
		Integer hrId = null;
		/*
		 * 添加租客
		 */
		//接收传入的IC
		String ic = infoHouse4rentExpand.getRenterPopIdcard();
		Integer popID = null; //人口id
		Integer renterid = null; //租客id
		//查询人口表IC
		InfoPopulation ip = new InfoPopulation();
		ip.setPopIdcard(ic);
		List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(ip);
		//判断是否存在此人
		if(list.size()==0){
			//用传入的IC去人头表查，没有相应的数据则新增一条人头数据，并返回插入的ID
			ip.setPopName(infoHouse4rentExpand.getRenterPopName());
			ip.setPopIdcard(infoHouse4rentExpand.getRenterPopIdcard());
			ip.setPopTelephone(infoHouse4rentExpand.getRenterPopTelephone());
			ip.setPopUser(infoHouse4rentExpand.getRenterUserId());
			ip.setPopNameRemark(infoHouse4rentExpand.getPopNameRemark());
			ip.setPopInnerCreditLevel(80);
			ip.setPopOuterCreditLevel(80);
			ip.setPopRenter(1);
			ip.setPopPassword(infoHouse4rentExpand.getRenterPopTelephone());
			ip.setPopIdcardJson(infoHouse4rentExpand.getPopIdcardJson());
			ip.setPopBirth(infoHouse4rentExpand.getPopBirth());
			ip.setPopNation(infoHouse4rentExpand.getPopNation());
			ip.setPopIdcardAddress(infoHouse4rentExpand.getPopIdcardAddress());
			ip.setPopSex(infoHouse4rentExpand.getPopSex());
			int result = infoPopulationMapper.insertSelective(ip);
			if(result == 0){
				throw new Exception("人口表添加失败-------------------------------");
			}
			popID = ip.getPopId();
			
			//添加租客
			InfoRenterExpand  ire = new InfoRenterExpand();
			ire.setRenterPopulationId(popID);
			ire.setRenterPopName(infoHouse4rentExpand.getRenterPopName());
			ire.setRenterPopTelephone(infoHouse4rentExpand.getRenterPopTelephone());
			ire.setRenterPopIdcard(infoHouse4rentExpand.getRenterPopIdcard());
			ire.setRenterSecondContacts(infoHouse4rentExpand.getRenterSecondContacts());
			ire.setRenterSecondPhone(infoHouse4rentExpand.getRenterSecondPhone());
			ire.setRenterUserId(infoHouse4rentExpand.getRenterUserId());
			ire.setRenterDepartment(infoHouse4rentExpand.getRenterDepartment());
			ire.setRenterStorefront(infoHouse4rentExpand.getRenterStorefront());
			int result1 = infoRenterMapper.insertSelective(ire);
			if (result1 == 0) {
				throw new Exception("添加租客失败-------------------------------111");
			}
			renterid = ire.getRenterId();
		}else{
			//用传入的IC去人头表查，如果有则取出查询的ID
			popID = list.get(0).getPopId();
			String name = infoHouse4rentExpand.getRenterPopName();
			String popname = list.get(0).getPopName();
			if(name.equals(popname)){
				InfoRenterExpand re = new InfoRenterExpand();
				re.setRenterPopulationId(popID);
				List<InfoRenterExpand> relist = infoRenterMapper.selectAll(re);
				if(relist.size() == 0){
					re.setRenterPopulationId(popID);
					re.setRenterPopName(infoHouse4rentExpand.getRenterPopName());
					re.setRenterPopTelephone(infoHouse4rentExpand.getRenterPopTelephone());
					re.setRenterPopIdcard(infoHouse4rentExpand.getRenterPopIdcard());
					re.setRenterSecondContacts(infoHouse4rentExpand.getRenterSecondContacts());
					re.setRenterSecondPhone(infoHouse4rentExpand.getRenterSecondPhone());
					re.setRenterUserId(infoHouse4rentExpand.getRenterUserId());
					re.setRenterDepartment(infoHouse4rentExpand.getRenterDepartment());
					re.setRenterStorefront(infoHouse4rentExpand.getRenterStorefront());
					int result = infoRenterMapper.insertSelective(re);
					if (result == 0) {
						throw new Exception("添加租客失败------------------------------222");
					} else {
						renterid = re.getRenterId();
					}
		            //修改人口表租客标识
		            InfoPopulation ip2 = new InfoPopulation();
		            ip2.setPopId(popID);
		            ip2.setPopRenter(1);
		            int result4 = infoPopulationMapper.updateByPrimaryKeySelective(ip2);
		            if(result4==0){
		                throw new Exception("修改人口表租客标识出错");
		            }
				}else{
					renterid = relist.get(0).getRenterId();
				}
			}else{
				JSONObject jsonObj = new JSONObject();
		        jsonObj.accumulate("name", list.get(0).getPopName());
		        jsonObj.accumulate("tel", list.get(0).getPopTelephone());
		        jsonObj.accumulate("ID", list.get(0).getPopIdcard());
		        String json = jsonObj.toString();
				return "-1###"+json;
			}
		}
		//查询门锁信息
		int jhdHsId=infoHouse4rentExpand.getHrHouse4storeId();			//未租ID
		System.out.println("jhdHsId********"+jhdHsId);
		SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		String startTime=dfs.format(new Date());
		String endTime=infoHouse4rentExpand.getHrEndTime()+" "+"00:00:00";
		String name=infoHouse4rentExpand.getRenterPopName();
		List<JourDevice> devices=jourDeviceMapper.selectDeviceStatus(jhdHsId);
		Integer jdcDevcieId=null;
		Integer devFirstType;
		Integer devSecondType;
		for (int l=0;l<devices.size();l++) {
			jdcDevcieId=devices.get(l).getId();
			devFirstType=devices.get(l).getDevFirstType();
			devSecondType=devices.get(l).getDevSecondType();
			if ("".equals(devSecondType) || devSecondType==null){
				System.out.println("000000000065423453454542532");
				System.out.println("0000000000sdfsdf"+devSecondType);
				continue;
			}
			String sn = devices.get(l).getDevAuthId();
			String mac = devices.get(l).getDevAuthSecret();
			int devBrandId = devices.get(l).getDevBrandId();
			Map<String, String> map = new HashMap<String, String>();
			String messageStr = "";
			String password="";
			//电易门锁
			if (devBrandId == 10) {
				String devSpare2 = devices.get(l).getDevSpare2();
				String devUsername=devices.get(l).getDevUsername();
				System.out.println("00000000000000devUsername"+devUsername);
				String devPassword=devices.get(l).getDevPassword();
				System.out.println("00000000000000devUsername"+devPassword);
				map.put("brandId", "10");
				map.put("instruction", "单临密码");
				map.put("appKey", sn);
				map.put("secret", mac);
				map.put("pwdType", "1");
				map.put("startTime", startTime);
				map.put("endTime", endTime);
				map.put("code", devSpare2);
				map.put("mobile",devUsername);
				map.put("password",devPassword);
				System.out.println("map*************************: " + map);
				String responseText = HttpRequestUtil.post(POSTURL, map);
				JSONObject jsonObj = new JSONObject();
				jsonObj = JSONObject.fromObject(responseText);
				System.out.println("jsonObj:************ " + jsonObj);
				if (jsonObj.getInt("code") == 1) {
					password = (String) jsonObj.get("body");
					messageStr="系统自动向客户:"+name+"+授权开门固定密码为:"+password+",密码有效期至"+endTime;
				}
			}
			if (devBrandId==20){
				if (devFirstType==3 && devSecondType==22){
					password = getCard();
					messageStr="系统自动向客户:"+name+"+授权开门固定密码为:"+password+",密码有效期至"+endTime;
				}
				else if (devFirstType==3 && devSecondType==23) {
					password = getPwd();
					messageStr="系统自动向客户:"+name+"+授权开门固定密码为:"+password+",密码有效期至"+endTime;
				}
			}
			if(!"".equals(messageStr)){
				//插入门卡密码表
				JourDoorCard jourDoorCard = new JourDoorCard();
				jourDoorCard.setJdcHsId(jhdHsId);
				jourDoorCard.setJdcDeviceId(jdcDevcieId);
				jourDoorCard.setJdcState("未使用");
				jourDoorCard.setJdcPassword(password);
				jourDoorCard.setJdcDeadlineTime(endTime);
				int numb = jourDoorCardService.insertOneDoorCard(jourDoorCard);
				if(numb==1){
					//短信发送
					String message="系统自动向客户:"+name+"授权开门固定密码,密码有效期至"+endTime;
					String phone=infoHouse4rentExpand.getRenterPopTelephone();
					JournalShortMessage js = new JournalShortMessage();
					js.setSmNotRentId(jhdHsId);
					js.setSmState("推送成功");
					js.setSmType("发送");
					js.setSmNote(message);
					js.setSmReceiveNumber(phone);
					Result<String> result = sendShortMessageService.sendMessage(phone, messageStr, js, 2);
					JSONObject jsonObj1 = new JSONObject();
				}
			}
		}

		/*
		 * 新增已租房
		 */
		infoHouse4rentExpand.setHrSignTime(infoHouse4rentExpand.getJrrBeginTime());
		int value = infoHouse4rentMapper.insertSelective(infoHouse4rentExpand);
		hrId = infoHouse4rentExpand.getHrId(); //已租房id
		String billJson = infoHouse4rentExpand.getJciBillJson();
		//拼接jciBillJson
		JSONArray jciBillJson= JSONArray.fromObject(billJson);
		System.out.println(jciBillJson);
		for(int i=0;i<jciBillJson.size();i++){
			jciBillJson.getJSONObject(i).put("jciHouse4rentId",'"'+hrId+'"');
		}
		infoHouse4rentExpand.setJciBillJson(jciBillJson.toString());

		System.out.println(jciBillJson);
		//水电气读数
		Double waterVolFirst = infoHouse4rentExpand.getHrWaterVolFirst();
		Double electritVolFirst = infoHouse4rentExpand.getHrElectritVolFirst();
		Double gasVolFirst = infoHouse4rentExpand.getHrGasVolFirst();
		//tzl
		Double hotWaterVolFirst = infoHouse4rentExpand.getHrHotWaterVolFirst();
		Double hotAirVolFirst = infoHouse4rentExpand.getHrHotAirVolFirst();

		//拼接json字段
		meterReadingRecord = "{'water':{'lastReading':'"+waterVolFirst+"','thisReading':[]},"
								+"'electrit':{'lastReading':'"+electritVolFirst+"','thisReading':[]},"
								+ "'gas':{'lastReading':'"+gasVolFirst+"','thisReading':[]},"
										+ "'hotwater':{'lastReading':'"+hotWaterVolFirst+"','thisReading':[]},"
										+"'hotair':{'lastReading':'"+hotAirVolFirst+"','thisReading':[]}}";
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
		//tzl
		if(hotWaterVolFirst != null && hotWaterVolFirst != 0 && !"".equals(hotWaterVolFirst)){
			numType = true;
		}
		if(hotAirVolFirst != null && hotAirVolFirst != 0 && !"".equals(hotAirVolFirst)){
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
			InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
			hs.setHsMeterReadingRecord(meterReadingRecord);
			hs.setHsId(infoHouse4rentExpand.getHrHouse4storeId());
			hs.setHsLeaseState("已租");
			hs.setHsMicronetIdentification(1);
			hs.setHsTransactionPrice(infoHouse4rentExpand.getJrrMoney());
			int value1 = infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
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
					jwr.setWegrdRenterId(infoHouse4rentExpand.getHrRenterId());
					jwr.setWegrdHouse4rentId(hrId);
					jwr.setWegrdHouse4storeId(infoHouse4rentExpand.getHrHouse4storeId());
					jwr.setWegrdUserId(infoHouse4rentExpand.getHrUserId());
					jwr.setWegrdDoUserId(infoHouse4rentExpand.getHrUserId());
					jwr.setWegrdDepartment(infoHouse4rentExpand.getHrDepartment());
					jwr.setWegrdStorefront(infoHouse4rentExpand.getHrStorefront());
					jwr.setWegrdNature("交房抄表");
					if(i == 0){
						jwr.setWegrdNums(waterVolFirst);
						jwr.setWegrdCostWays(infoHouse4rentExpand.getHrWaterPlan());
						jwr.setWegrdType("水表");
					}else if(i == 1){
						jwr.setWegrdNums(electritVolFirst);
						jwr.setWegrdCostWays(infoHouse4rentExpand.getHrElectritPlan());
						jwr.setWegrdType("电表");
					}else if(i == 2){
						jwr.setWegrdNums(gasVolFirst);
						jwr.setWegrdCostWays(infoHouse4rentExpand.getHrGasPlan());
						jwr.setWegrdType("燃气表");
					}else if(i == 3){//tzl
						jwr.setWegrdNums(hotWaterVolFirst);
						jwr.setWegrdCostWays(infoHouse4rentExpand.getHrHotwaterPlan());
						jwr.setWegrdType("热水表");
					}else {
						jwr.setWegrdNums(hotAirVolFirst);
						jwr.setWegrdCostWays(infoHouse4rentExpand.getHrHotairPlan());
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
		 * 把租客ID写到已租房
		 */
		InfoHouse4rentExpand hr = new InfoHouse4rentExpand();
		hr.setHrId(hrId);
		hr.setHrRenterId(renterid);
		int result = infoHouse4rentMapper.updateByPrimaryKeySelective(hr);
		if(result == 0){
			throw new Exception("把租客ID写到已租房失败------------------------------");
		}
		
		/*
		 * 添加租客合约
		 */
		String att = infoHouse4rentExpand.getAtt();
		String path = null;
        String num = null;
        if(att != null){
            JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
            if(attachment != null){
                path = attachment.getPath();
                num = attachment.getNum();
                int result6 = journalAttachmentMapper.deleteByAtt(att);
                if(result6 == 0){
                    throw new Exception("从附件表删除记录失败");
                }
            }
        }
		InfoRenewalRenterExpand rre = new InfoRenewalRenterExpand();
		rre.setJrrHouse4rentId(hrId);
		rre.setJrrHouse4storeId(infoHouse4rentExpand.getJrrHouse4storeId());
		rre.setJrrLandlordId(infoHouse4rentExpand.getJrrLandlordId());
		rre.setJrrRenterId(renterid);
		rre.setJrrSignedTime(infoHouse4rentExpand.getJrrSignedTime());
		rre.setJrrBeginTime(infoHouse4rentExpand.getJrrBeginTime());
		rre.setJrrEndTime(infoHouse4rentExpand.getJrrEndTime());
		rre.setJrrUserId(infoHouse4rentExpand.getJrrUserId());
		rre.setJrrDepartment(infoHouse4rentExpand.getJrrDepartment());
		rre.setJrrStorefront(infoHouse4rentExpand.getJrrStorefront());
		rre.setJrrContractType(infoHouse4rentExpand.getJrrContractType());
		rre.setJrrTheTerm(infoHouse4rentExpand.getJrrTheTerm());
		rre.setJrrInAdvancePay(infoHouse4rentExpand.getJrrInAdvancePay());
		rre.setJrrPaymentMethod(infoHouse4rentExpand.getJrrPaymentMethod());
		rre.setJrrMoney(infoHouse4rentExpand.getJrrMoney());
		rre.setJrrRenewalCoding(infoHouse4rentExpand.getJrrRenewalCoding());
		rre.setJrrManageCost(infoHouse4rentExpand.getJrrManageCost());
		rre.setJrrManagePayment(infoHouse4rentExpand.getJrrManagePayment());
		rre.setJrrServerCost(infoHouse4rentExpand.getJrrServerCost());
		rre.setJrrServerPayment(infoHouse4rentExpand.getJrrServerPayment());
		rre.setJrrImgPath(path);
		rre.setJrrImgNum(num);
		rre.setAdvanceMode(infoHouse4rentExpand.getAdvanceMode());
		rre.setJrrTypeOfContract(infoHouse4rentExpand.getJrrTypeOfContract());
		//rre.setJrrTypeOfContract(1);
		
		int result2 = infoRenewalRenterMapper.insertSelective(rre);
		if(result2 == 0){
			throw new Exception("添加租客合约失败------------------------------");
		}
		Integer jrrId = rre.getJrrId();
		//新增分期账单
		List<InfoContractInstallment> ici = new ArrayList<InfoContractInstallment>();
		String taskTimeConsumingJson = infoHouse4rentExpand.getTaskTimeConsumingJson();
		JSONArray tcJson =JSONArray.fromObject(taskTimeConsumingJson);
		for (Object a : tcJson) {
			JSONObject jsonObj = (JSONObject)a;
			InfoContractInstallment jf = (InfoContractInstallment) JSONObject.toBean(jsonObj, InfoContractInstallment.class);
			jf.setJciHouse4rentId(hrId);
			jf.setJciRenterId(renterid);
			jf.setJciRentContId(jrrId);
			jf.setJciType("租客租金");
			System.out.println("aaaaaaaaaaaaaaaaaaaa"+infoHouse4rentExpand.getJciMessageNote());
			if(jf.getJciPeriods() == 1){
				jf.setJciLabelType(3);
				jf.setJciBillJson(infoHouse4rentExpand.getJciBillJson());
//				jf.setJciMessageNote(infoHouse4rentExpand.getJciMessageNote());
			}
			ici.add(jf);
		}
		System.out.println(ici+"ici来了老弟===============================================");
		int result6 = infoContractInstallmentMapper.insertList(ici);
		if(result6 == 0){
			throw new Exception("新增分期账单失败--------------------");
		}

        //修改合约编号状态
		SysVariables sysVar = new SysVariables();
		sysVar.setVariablesId(1);
		List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
		if(!sysVarList.isEmpty()){
		    sysVar = sysVarList.get(0);
		}
		System.out.println("asasss"+infoHouse4rentExpand.getJcdId());
		if (sysVar.getContractNums() == 1) {
	        String renewalCoding = infoHouse4rentExpand.getJrrRenewalCoding();
	        String jcdHouseAddress =  infoHouse4rentExpand.getHrAddCommunity()+" "+infoHouse4rentExpand.getHrAddBuilding()+" "+infoHouse4rentExpand.getHrAddDoorplateno();
	        if(renewalCoding != null && !renewalCoding.equals("") && jcdHouseAddress!= null && !jcdHouseAddress.equals("")){
	            JournalContractDatabase jcd = new JournalContractDatabase();
	            jcd.setJcdId(infoHouse4rentExpand.getJcdId());
	            jcd.setJcdUseState("已签约");
	            jcd.setJcdUsedType("出租");
	            jcd.setJcdHouseAddress(jcdHouseAddress);
	            jcd.setJcdContractPerson(infoHouse4rentExpand.getAdminUser());
	            jcd.setJcdSigningTime(infoHouse4rentExpand.getJrrSignedTime());
	            int result3 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
	            if(result3 == 0){
	                throw new Exception("修改合约编号状态失败------------------------------");
	            }
	        }
		}
		
		//是否有租客意向人id传入
		Integer ipId = infoHouse4rentExpand.getIpId();
		if(ipId != null && !ipId.equals("")){
			InfoIntendedPerson infoIntended = new InfoIntendedPerson();
			infoIntended.setIpId(ipId);
			infoIntended.setIpState("我租");
			int result4 = infoIntendedPersonMapper.updateByPrimaryKeySelective(infoIntended);
			if(result4 == 0){
				throw new Exception("是否有租客意向人id传入失败------------------------------");
			}
		}
		
		/*
		 * 添加业绩受益人
		 */
		List<InfoTransactionAssistance> recordList = new ArrayList<InfoTransactionAssistance>();
		String jsonArray = infoHouse4rentExpand.getJsonArray();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			InfoTransactionExpand jf = (InfoTransactionExpand) JSONObject.toBean(jsonObj, InfoTransactionExpand.class);
			jf.setAssistHouse4rent(hrId);
			jf.setAssistHouse4store(infoHouse4rentExpand.getJrrHouse4storeId());
			recordList.add(jf);
		}
		if (recordList.size() > 0) {
	        int result5 = itamMapper.insertTAList(recordList);
	        if(result5 == 0){
	            throw new Exception("添加业绩受益人失败--------------------");
	        }
		}
		//迁移资产
		SysAssetsExpand sysAssetsExpand = new SysAssetsExpand();
		sysAssetsExpand.setJsonArray(infoHouse4rentExpand.getMoveAsset());
		sysAssetsService.moveById(sysAssetsExpand);
		
		JSONObject jsonObj = new JSONObject();
        jsonObj.accumulate("hrId", hrId);
        String str = jsonObj.toString();
		return "1###"+str;
	}
	
	@Override
	public List<InfoHouse4rentExpand> tenantMonthlyInspection(InfoHouse4rentExpand conditions) throws Exception {
		return infoHouse4rentMapper.tenantMonthlyInspection(conditions);
	}
	@Override
	public List<InfoHouse4rentExpand> queryRenterCheckOut(
			InfoHouse4rentExpand conditions) throws Exception {
		return infoHouse4rentMapper.queryRenterCheckOut(conditions);
	}
	@Override
	public int queryHouseRentNum(InfoHouse4rentExpand conditions)
			throws Exception {
		return infoHouse4rentMapper.queryHouseRentNum(conditions);
	}
	@Override
	public List<InfoHouse4rentExpand> getMonthTotalMoney(InfoHouse4rentExpand conditions) throws Exception {
		return infoHouse4rentMapper.getMonthTotalMoney(conditions);
	}
    @Override
    public List<InfoHouse4rentExpand> getRenterBillNum() throws Exception {
        return infoHouse4rentMapper.getRenterBillNum();
    }
	@Override
	public List<InfoHouse4rentExpand> selectRepairOrOverdueAll(InfoHouse4rentExpand conditions) throws Exception {
		if(!"".equals(conditions.getSearchButtonState()) &&  conditions.getSearchButtonState()!=null){
			if("正在维保".equals(conditions.getSearchButtonState())){
				return infoHouse4rentMapper.selectRepairAll(conditions);
			}else if("逾期房间".equals(conditions.getSearchButtonState())){
				return infoHouse4rentMapper.selectOverdueAll(conditions);
			}
		}else{
			throw new Exception("异常 ：传过来的状态为空");
		}
		return null;
	}
	@Override
	public List<InfoHouse4rentExpand> selectButtonNumAll() throws Exception {
		return infoHouse4rentMapper.selectButtonNumAll();
	}
	@Override
	public Integer selectopenid(InfoHouse4rentExpand conditions) throws Exception {
		Integer i =infoHouse4rentMapper.selectopenid(conditions);
		return i;
	} 
	
	//临时账单生成，查询已租房源数据
	@Override
	public List<InfoHouse4rentExpand> queryRentingSourceData(InfoHouse4rentExpand conditions) throws Exception {
		return infoHouse4rentMapper.queryRentingSourceData(conditions);
	}
    @Override
    public List<InfoHouse4rentExpand> queryHouseRent(
            InfoHouse4rentExpand conditions) throws Exception {
        return infoHouse4rentMapper.queryHouseRent(conditions);
    }
    @Override
    public List<InfoHouse4rentExpand> queryHouseRentCommon(
            InfoHouse4rentExpand conditions) throws Exception {
        return infoHouse4rentMapper.queryHouseRentCommon(conditions);
    }
    /**
     * 更换已租房租客
     * @param
     * @return 
     * @throws Exception
     */
	@Override
	public int changeRenter(InfoHouse4rentExpand infoHouse4rentExpand) throws Exception {
		int newRenterId = -1;
		
		if(infoHouse4rentExpand.getPopResident() == 0){
			System.out.println("这人不是租客");
			//添加租客
			InfoRenterExpand  ire = new InfoRenterExpand();
			ire.setRenterPopulationId(infoHouse4rentExpand.getPopId());
			ire.setRenterPopName(infoHouse4rentExpand.getRenterPopName());
			ire.setRenterPopTelephone(infoHouse4rentExpand.getRenterPopTelephone());
			ire.setRenterPopIdcard(infoHouse4rentExpand.getRenterPopIdcard());
			ire.setRenterSecondContacts(infoHouse4rentExpand.getRenterSecondContacts());
			ire.setRenterSecondPhone(infoHouse4rentExpand.getRenterSecondPhone());
			ire.setRenterUserId(infoHouse4rentExpand.getRenterUserId());
			ire.setRenterDepartment(infoHouse4rentExpand.getRenterDepartment());
			ire.setRenterStorefront(infoHouse4rentExpand.getRenterStorefront());
			int result1 = infoRenterMapper.insertSelective(ire);
			if (result1 == 0) {
				throw new Exception("添加租客失败-------------------------------111");
			}
			newRenterId = ire.getRenterId();
		}else{
			System.out.println("这人是租客");
			List<InfoRenter> list = infoRenterMapper.tenantDataImportQuery(infoHouse4rentExpand.getPopId());
			System.out.println("list数量" +list.size());
			System.out.println("list 的值 ： " +list);
			if(list.size() == 1){
				newRenterId = list.get(0).getRenterId();
			}else{
				throw new Exception("没查到新租客在租客表中的信息");
			}
		}
		infoHouse4rentExpand.setHrRenterId(newRenterId);
		
		changeRenterUpdateData(infoHouse4rentExpand);
		
		return 1;
	}

	public InfoHouse4rentExpand selectRentByTJ(InfoHouse4rentExpand infoHouse4rentExpand) {
		return infoHouse4rentMapper.selectRentByTJ(infoHouse4rentExpand);
	}

	/**
	 * 处理更换租客时的数据 
	 * @param
	 * @return
	 * @throws
	 */
	private int changeRenterUpdateData(InfoHouse4rentExpand infoHouse4rentExpand) throws Exception{
		Integer oldRenterPopId = infoHouse4rentExpand.getJciId();
		//修改已租房
		InfoHouse4rentExpand infoHouse4rentExpand2 = new InfoHouse4rentExpand();
		infoHouse4rentExpand2.setHrId(infoHouse4rentExpand.getHrId());
		infoHouse4rentExpand2.setHrRenterId(infoHouse4rentExpand.getHrRenterId());
		infoHouse4rentMapper.updateByPrimaryKeySelective(infoHouse4rentExpand2);
		
		//修改合约表
		InfoRenewalRenterExpand irre = new InfoRenewalRenterExpand();
		irre.setJrrHouse4rentId(infoHouse4rentExpand.getHrId());
		irre.setJrrRenterId(infoHouse4rentExpand.getJrrRenterId());
		
		List<InfoRenewalRenterExpand> list = infoRenewalRenterMapper.selectrenterAll(irre);
		for(InfoRenewalRenterExpand irreItem : list){
			if("正常".equals(irreItem.getJrrRentalType())){
				InfoRenewalRenterExpand irre2 = new InfoRenewalRenterExpand();
				irre2.setJrrRenterId(infoHouse4rentExpand.getHrRenterId());
				irre2.setJrrId(irreItem.getJrrId());
				infoRenewalRenterMapper.updateByPrimaryKeySelective(irre2);
			}
		}
		
		//修改合约分期账单表
		InfoContractInstallmentExpand icie = new InfoContractInstallmentExpand();
		icie.setContractType("renter");
		icie.setJciHouse4rentId(infoHouse4rentExpand.getHrId());
		icie.setJciRenterId(infoHouse4rentExpand.getJrrRenterId());
		icie.setJciState("待收");
		List<InfoContractInstallmentExpand> list2 = infoContractInstallmentMapper.selectAll(icie);
		for(InfoContractInstallmentExpand icieItem : list2){
			InfoContractInstallmentExpand icie2 = new InfoContractInstallmentExpand();
			icie2.setJciId(icieItem.getJciId());
			icie2.setJciRenterId(infoHouse4rentExpand.getHrRenterId());
			infoContractInstallmentMapper.updateByPrimaryKeySelective(icie2);
		}
		
		//已租房写跟进
		JournalHousingFollowExpand jhfe = new JournalHousingFollowExpand();
		jhfe.setJhfHouseId(infoHouse4rentExpand.getHrHouseId());
		jhfe.setJhfHouse4rentId(infoHouse4rentExpand.getHrId());
		jhfe.setJhfHouse4storeId(infoHouse4rentExpand.getHrHouse4storeId());
		jhfe.setJhfUserId(infoHouse4rentExpand.getRenterUserId());
		jhfe.setJhfDepartment(infoHouse4rentExpand.getRenterDepartment());
		jhfe.setJhfStorefront(infoHouse4rentExpand.getRenterStorefront());
		
		String jhfFollowRemark = "将编号"+infoHouse4rentExpand.getJrrRenterId()+"的原租客  "+infoHouse4rentExpand.getRenterPopNameRemark() +" 更换成 编号为"+infoHouse4rentExpand.getHrRenterId() +"的"+ infoHouse4rentExpand.getRenterPopName();
		jhfe.setJhfFollowRemark(jhfFollowRemark);
		
		jhfe.setJhfPaymentWay("系统跟进");
		jhfe.setJhfFollowResult("跟进成功");
		jhfe.setJhfFollowBelong("租客");
		jhfe.setJhfRemind("否");
		
		journalHousingFollowMapper.insertSelective(jhfe);
		
		//原租客写跟进
		InfoPopulation infoPopulation = new InfoPopulation();
	    infoPopulation.setPopId(oldRenterPopId);
        List<InfoPopulation> list3 = infoPopulationMapper.newModifiedJudgmentQuery(infoPopulation);
        String followUp = "将 "+infoHouse4rentExpand.getJcdHouseAddress() + " 转给 " +infoHouse4rentExpand.getRenterPopName();
        JSONArray jsonArray = JSONArray.fromObject(list3.get(0).getPopModifyTheRecord() != null ? list3.get(0).getPopModifyTheRecord() : "[]");
        JSONObject obj = new JSONObject();
        obj.accumulate("type", "系统跟进");
        obj.accumulate("registrantName", infoHouse4rentExpand.getUserName());
        obj.accumulate("text", followUp);
        obj.accumulate("time", DateUtil.getCurDateTime());
        jsonArray.add(obj);
        
        InfoPopulation record = new InfoPopulation();
        record.setPopModifyTheRecord(jsonArray.toString());
        record.setPopId(oldRenterPopId);
        infoPopulationMapper.updateByPrimaryKeySelective(record);
        
        //新租客写跟进
        InfoPopulation infoPopulation2 = new InfoPopulation();
		infoPopulation2.setPopId(infoHouse4rentExpand.getPopId());
		List<InfoPopulation> list4 = infoPopulationMapper.newModifiedJudgmentQuery(infoPopulation2);
		String followUp2 = "接手 " +infoHouse4rentExpand.getRenterPopNameRemark() +" 的 "+infoHouse4rentExpand.getJcdHouseAddress();
		JSONArray jsonArray2 = JSONArray.fromObject(list4.get(0).getPopModifyTheRecord() != null ? list4.get(0).getPopModifyTheRecord() : "[]");
		JSONObject obj2 = new JSONObject();
		obj2.accumulate("type", "系统跟进");
		obj2.accumulate("registrantName", infoHouse4rentExpand.getUserName());
		obj2.accumulate("text", followUp2);
		obj2.accumulate("time", DateUtil.getCurDateTime());
		jsonArray2.add(obj2);
  
		InfoPopulation record2 = new InfoPopulation();
		record2.setPopModifyTheRecord(jsonArray2.toString());
		record2.setPopId(infoHouse4rentExpand.getPopId());
		record2.setPopRenter(1);
		infoPopulationMapper.updateByPrimaryKeySelective(record2);
		
		return 0;
	}

	public static String getCard(){
		Random rand=new Random();//生成随机数
		String cardNnumer="";
		for(int a=0;a<8;a++){
			cardNnumer+=rand.nextInt(10);//生成8位数字
		}
		return cardNnumer;
	}
	
	public static String getPwd() {
		String password = getCard().substring(0,6);
		String arr[] = password.split("");
		String newpwd ="";
		for (int i = 0; i < arr.length; i++) {
			newpwd += Integer.parseInt(arr[i]) + 30;
		}
		return newpwd;
	}

	@Override
	public List<InfoHouse4rentExpand> selecttenantAuthorization(InfoHouse4rentExpand infoHouse4rentExpand) throws Exception {
		return infoHouse4rentMapper.selecttenantAuthorization(infoHouse4rentExpand);
	}
}
