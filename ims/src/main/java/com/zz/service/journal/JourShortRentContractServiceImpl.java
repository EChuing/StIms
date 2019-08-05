package com.zz.service.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ActionContext;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.info.InfoPopulationMapper;
import com.zz.mapper.info.InfoRenterMapper;
import com.zz.mapper.journal.*;
import com.zz.pay.strategy.*;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoHouse4rent;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoPopulation;
import com.zz.po.info.InfoRenterExpand;
import com.zz.po.journal.*;
import com.zz.po.sys.SysUserExpand;
import com.zz.po.sys.SysVariables;
import com.zz.service.info.HouseForRentService;
import com.zz.service.sys.SendShortMessageService;
import com.zz.service.sys.SysVariablesService;

import org.json.JSONString;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;


public class JourShortRentContractServiceImpl implements JourShortRentContractService{

	@Resource
	private JourShortRentContractMapper jourShortRentContractMapper;

	@Resource
	private JourShortRentSetUpMapper jourShortRentSetUpMapper;

	@Resource
	private InfoRenterMapper infoRenterMapper;
	
	@Resource
	private InfoPopulationMapper infoPopulationMapper;

	@Resource
	private InfoHouse4storeMapper infoHouse4storeMapper;	
	
	@Resource
	private JournalFinancialMapper journalFinancialMapper;
	
	@Autowired
	private SendShortMessageService sendShortMessageService;
	
 	@Autowired
	private JourDoorCardMapper jourDoorCardMapper;
	
	@Autowired
	private JourDeviceMapper jourDeviceMapper;
	
	@Autowired
	private JourHsDeviceMapper jourHsDeviceMapper;
	
	@Autowired
	private JourShortRentNexusMapper jourShortRentNexusMapper;
	
	@Autowired
	private JourShortRentRenterMapper jourShortRentRenterMapper;
	
	@Autowired
	private JournalRepairMapper journalRepairMapper;
	
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;
	
	@Autowired
	private RepairService repairService;
	
	@Autowired
	private FinancialService financialService;
	
	@Autowired
	private SysVariablesService sysVariablesService;
	
	@Autowired
	private JourDoorCardService jourDoorCardService;
	

	public void setJourShortRentContractMapper(JourShortRentContractMapper jourShortRentContractMapper) {
		this.jourShortRentContractMapper = jourShortRentContractMapper;
	}

	private final static String POSTURL = "http://www.fangzhizun.com/device/api";

	@Override
	public List<JourShortRentContract> listJourShortRentContractByHsIdList(JourShortRentContract jourShortRentContract) throws Exception {
		List<Integer> hsIdlist = JSON.parseArray(jourShortRentContract.getHsIdListStr(), Integer.class);
		jourShortRentContract.setHsIdList(hsIdlist);
		List<JourShortRentContract> list = jourShortRentContractMapper.listJourShortRentContractByHsIdList(jourShortRentContract);
		System.out.println("list的数据：                  "+list.get(0));
		//获取所有的订单里面住的人  把这些信息放到每个订单的popJson
		for(JourShortRentContract jsrc :list){
			JourShortRentNexus jsrn =  new JourShortRentNexus();
			jsrn.setJsrnJsrcId(jsrc.getJsrcId());
			List<JourShortRentNexus> list1 = jourShortRentNexusMapper.selectByPrimaryKey(jsrn);
			List<Integer> idList = new ArrayList<>();
			
			for(int i=0;i<list1.size();i++){
				idList.add(list1.get(i).getJsrnJsrrId());
			}
			if(idList.size()>0){
				List<InfoPopulation> list2 = infoPopulationMapper.listPopByList(idList);
				//删除List里面为空的对象
				while (list2.remove(null));
				String popJsonStr = JSON.toJSONString(list2,SerializerFeature.WriteMapNullValue);
				jsrc.setPopJson(popJsonStr);
			}
		}
		System.out.println("返回的数据：                  "+list.get(0));
		return list;
	}
	

	/**
	 * @return -1 为人口表插入失败 
	 */
	@Override
	public Result<String> insertShortRent(JourShortRentContract jourShortRentContract) throws Exception {
		Result<String> result = new Result<String>();
		result = reservation(jourShortRentContract);
		return result;
	}
	


	
	private Result<String> reservation(JourShortRentContract jourShortRentContract) throws Exception{
		jourShortRentContract.setJsrcPeople(jourShortRentContract.getRentJson());
		jourShortRentContractMapper.insertSelective(jourShortRentContract);
		return new Result<String>(1,"成功","");
	}
	
	/**
	 * 获得popid 如果人口表不存在则新增 
	 * @param infoPopulation
	 * @return 正常为popid 数据库里面跟外部的身份证信息不一致返回-1
	 * @throws Exception
	 */
	private JSONObject createPop(InfoPopulation infoPopulation) throws Exception{
		Integer popId = -1;
		String popIdcard = infoPopulation.getPopIdcard();
		InfoPopulation ip = new InfoPopulation();
        ip.setPopIdcard(popIdcard);
        List<InfoPopulation> list2 = infoPopulationMapper.newModifiedJudgmentQuery(ip);
        
        if(list2.size()==0){
            infoPopulation.setPopPassword(infoPopulation.getPopTelephone());
            int result = infoPopulationMapper.insertSelective(infoPopulation);
            popId = infoPopulation.getPopId();
        }else{
            if(list2.get(0).getPopName().equals(infoPopulation.getPopName())){
           	 	popId = list2.get(0).getPopId();
            }else{
           	 	return null;
            }
        }
        
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("popId", popId);
        jsonObj.put("popIdCard", popIdcard);
        
		return jsonObj;
	}
	/**
	 * 获得jsrrid 如果顾客表不存在则新增
	 * @param popId
	 * @return
	 * @throws Exception
	 */
	private Integer createCustomer(InfoPopulation infoPopulation,Integer popId) throws Exception{
		 Integer jsrrId = 0;
         JourShortRentRenter jsrr = new JourShortRentRenter();
         jsrr.setJsrrPopId(popId);
         System.out.println(popId+"***");
         List<JourShortRentRenter> jsrrList = jourShortRentRenterMapper.selectByJsrrPopId(jsrr);
         jsrr.setJsrrCustomerType(infoPopulation.getJsrrCustomerType());
         System.out.println(jsrrList.size()+"**");
         if(jsrrList.size() > 0){
        	 JourShortRentRenter jsrr2 = jsrrList.get(0);
        	 jsrrId = jsrr2.getJsrrId();
        	 jsrr2.setJsrrCheckInNum(jsrr2.getJsrrCheckInNum() + 1);
        	 jsrr2.setJsrrChannelId(infoPopulation.getJsrrChannelId());
        	 jsrr2.setJsrrVipLevel(infoPopulation.getJsrrVipLevel());
			 System.out.println("短租顾客信息 =======      "+jsrr2);
        	 jourShortRentRenterMapper.updateByPrimaryKeySelective(jsrr2);
         }else{
        	 jsrr.setJsrrCheckInNum(1);
        	 jsrr.setJsrrChannelId(infoPopulation.getJsrrChannelId());
        	 jsrr.setJsrrVipLevel(infoPopulation.getJsrrVipLevel());
        	 jourShortRentRenterMapper.insertSelective(jsrr);
        	 jsrrId = jsrr.getJsrrId();
         }
		return jsrrId;
	}
	
	/**
	 * 获得租客id 如果不存在则新增
	 * @param jourShortRentContract
	 * @param popId
	 * @return
	 * @throws Exception
	 */
	private Integer createRenter(JourShortRentContract jourShortRentContract,Integer popId) throws Exception{
		//租客
 		int renterId = 0;
		InfoRenterExpand infoRenterExpand1 = new InfoRenterExpand();
 		infoRenterExpand1.setRenterPopulationId(popId);
 		
 		List<InfoRenterExpand> list3 = infoRenterMapper.selectAll(infoRenterExpand1);
 		if(list3.size() == 0){
 			//租客
 			InfoRenterExpand infoRenterExpand = new InfoRenterExpand();
 			infoRenterExpand.setRenterUserId(jourShortRentContract.getJsrcUserId());
 			infoRenterExpand.setRenterDepartment(jourShortRentContract.getDepartmentId());
 			infoRenterExpand.setRenterStorefront(jourShortRentContract.getStoreId());
 			infoRenterExpand.setRenterPopulationId(popId);
 			infoRenterMapper.insertSelective(infoRenterExpand);
 			renterId = infoRenterExpand.getRenterId();
 		}else{
 			renterId = list3.get(0).getRenterId();
 		}
 		return renterId;
	}
	
	
	/**
	 * 办理入住 
	 * 主要传入值是jourShortRentContract.getRentJson() 这是前台传过来的人口表数组字符串
	 * 由type 来判断类型
	 * type = 0时 是现场直接入住 会新增合约表 调发送短信接口 返回值是 短租合约表id和租客id 由逗号隔开
	 * type = 2时 是保留单子入住  返回值是 租客id
	 * @param jourShortRentContract
	 * @return
	 * @throws Exception
	 */
	private Result<String> checkIn(JourShortRentContract jourShortRentContract,Integer type) throws Exception{
		//人口表
//		Integer coId = Integer.parseInt(jourShortRentContract.getCoId());
//		System.out.println(coId);
		List<InfoPopulation> list = JSON.parseArray(jourShortRentContract.getRentJson(),InfoPopulation.class);
		JourShortRentRenter jsrr = new JourShortRentRenter();
		if(jourShortRentContract.getJsrcCustomerId() != null){
			jsrr.setJsrrId(jourShortRentContract.getJsrcCustomerId());
			List<JourShortRentRenter> jsrrList = jourShortRentRenterMapper.selectByPrimaryKey(jsrr);
			jsrr = jsrrList.get(0);
		}
		
		String resultStr = "";
		
		Integer renterId = 0;
 		int jsrcId = 0;
 		System.out.println("数据==========================="+list);
		for(int i = 0;i < list.size();i++){
			
			 InfoPopulation infoPopulation = list.get(i);
			 infoPopulation.setPopPassword(infoPopulation.getPopTelephone());
			 Integer popId = 0;
			 Integer jsrrId = 0;
			 
			 JSONObject jsonObj = createPop(infoPopulation);
			 popId = jsonObj.getInteger("popId");

			 if(popId == -1){
				 return new Result<String>(-1,infoPopulation.getPopName() + "的身份证与姓名不符",null);
			 }
			 
			 infoPopulation.setJsrrCustomerType(jourShortRentContract.getJsrrCustomerType());
			 
			 if(jourShortRentContract.getJsrcCustomerId() == null){
				 jsrrId = createCustomer(infoPopulation,popId);
			 }else{
				 if(jsrr.getJsrrIdcard().equals(infoPopulation.getPopIdcard())){
					 //预定单并且是下单人  因为微信下单是已经生产顾客数据了
					 jsrrId = jsrr.getJsrrId();
					 jsrr.setJsrrPopId(popId);
					 jsrr.setJsrrCheckInNum(jsrr.getJsrrCheckInNum() + 1);
					 jsrr.setJsrrChannelId(infoPopulation.getJsrrChannelId());
		        	 jsrr.setJsrrVipLevel(infoPopulation.getJsrrVipLevel());
					 jourShortRentRenterMapper.updateByPrimaryKeySelective(jsrr);
				 }else{
					 //预订单的同住人
					 jsrrId = createCustomer(infoPopulation,popId);
				 }
			 }
	         
	         //默认第一位顾客是租客
	         if(i == 0){
	        	
	        	renterId = createRenter(jourShortRentContract,popId);
	        	 
	     		//短租合约表
	    		jourShortRentContract.setJsrcRenterId(renterId);
	    		
	    		int jsrcResult = 0;
	    		if(type == 0){
	    			//这是处理直接入住的
	    			jsrcResult = jourShortRentContractMapper.insertSelective(jourShortRentContract);

	    			resultStr = renterId+","+jourShortRentContract.getJsrcId();
	    			jsrcId = jourShortRentContract.getJsrcId();
	    		}else if(type == 2){
	    			jsrcId = jourShortRentContract.getJsrcId();
	    			//这是处理预约后再来办理入住的
	    			jsrcResult = jourShortRentContractMapper.updateByPrimaryKeySelective(jourShortRentContract);
	    			resultStr = renterId +"";
	    		}
	    	
	    		//办理入住成功时,执行发卡，以及发送门锁密码和短信
	    		if(jsrcResult > 0){
					JSONArray doorCardJsonArray = new JSONArray();
					JSONArray array = JSON.parseArray(jourShortRentContract.getDoorCardJson());
					if(!"".equals(jourShortRentContract.getDoorCardJson())){
						//给需要发卡的数据添加属性 popId
						String popIdCard = jsonObj.getString("popIdCard");
						for(int j=0;j<array.size();j++){
							JSONObject dcObj = (JSONObject) array.get(j);
							if(popIdCard.equals(dcObj.getString("popIdCard"))){
								dcObj.put("popId", popId);
								dcObj.put("jdcPopId", popId);
								doorCardJsonArray.add(dcObj);
							}
						}

						//执行门卡授权
						JourDoorCard jourDoorCard = new JourDoorCard();
						String doorCardJson = JSON.toJSONString(doorCardJsonArray);
						jourDoorCard.setDoorCardJson(doorCardJson);
						System.out.println("门卡的数据===========   "+doorCardJson);
						jourDoorCardService.insertDoorCard(jourDoorCard);
					}

					Integer hsId = jourShortRentContract.getJsrcHsId();
					String phone = infoPopulation.getPopTelephone();
					//执行发送密码和短信
					sendPasswordOrMessage(hsId,phone,popId,jourShortRentContract.getJsrcBeginTime(),jourShortRentContract.getJsrcEndTime(),infoPopulation.getPopName(),jourShortRentContract.getCoId());
				}
	         }
	         
	         JourShortRentNexus jsrn = new JourShortRentNexus();
	         jsrn.setJsrnJsrcId(jsrcId);
	         jsrn.setJsrnJsrrId(jsrrId);
	         jourShortRentNexusMapper.insertSelective(jsrn);
		}

		return new Result<String>(1,"成功",resultStr);
	}
	
	/**
	 * 用来发送短信 如果存在智能门锁则顺带发送门锁密码
	 * @param hsId
	 * @param phone
	 * @param popId
	 * @return
	 * @throws Exception
	 */
	private void sendPasswordOrMessage(Integer hsId,String phone,Integer popId,String beginTime,String endTime,String popName,String coId) throws Exception{
		InfoHouse4storeExpand ihs = new InfoHouse4storeExpand();
		ihs.setHsId(hsId);
		List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.queryHouseStoreCommon(ihs);

		List<JourHsDevice> list = jourHsDeviceMapper.selectThisHouseDeviceID(hsId);
	
		
		List<InfoHouse4storeExpand> hsIdList =infoHouse4storeMapper.selectByPrimaryKey(hsId);
		String HsAddCommunity=hsIdList.get(0).getHsAddCommunity();
		String HsAddDoorplateno=hsIdList.get(0).getHsAddDoorplateno();
		JourShortRentSetUp jourShortRentSetUp =new JourShortRentSetUp();
		jourShortRentSetUp.setJsrsuId(1);
		List<JourShortRentSetUp> jsrsuList = jourShortRentSetUpMapper.selectByPrimaryKey(jourShortRentSetUp);
 		String customerServiceTel=jsrsuList.get(0).getJsrsuTelphone();
 		String msg = "";
		if(list.size() < 1){
			msg= popName+"欢迎您入住，"+HsAddCommunity+"的"+HsAddDoorplateno+"号房，预退房时间为"+endTime+"，入住期间如需帮助请致电"+customerServiceTel+"。祝您旅途愉快！";
			System.out.println(msg);
			JournalShortMessage journalShortMessage = new JournalShortMessage();
	        journalShortMessage.setSmReceiveNumber(phone);
			journalShortMessage.setSmType("发送");
			journalShortMessage.setSmNotRentId(hsId);
			journalShortMessage.setSmPopId(popId);
			journalShortMessage.setSmNote(msg);
			Result<String> result = sendShortMessageService.sendMessage(phone, msg, journalShortMessage,2);
			if(!result.getCode().equals(1)){
				throw new Exception(result.getMsg());
			}
			return;
		}
		
		List<Integer> deviceIdList = new ArrayList<>();
		for(JourHsDevice jhd : list){
			deviceIdList.add(jhd.getJhdDeviceId());
		}

		//查询该房是否门锁设备
		String add = ihs.getHsAddCommunity() + ihs.getHsAddBuilding() + ihs.getHsAddDoorplateno();
		List<JourDevice> jdList = jourDeviceMapper.selectThisHouseDevice(deviceIdList);
		//List<JourDevice> jdList = jourDeviceMapper.selectDeviceStatus(jourShortRentContract.getJsrcHsId());
		
		Integer devId = 0;
		
		for(JourDevice jd : jdList){
			if(jd.getDevBrandId() == 20 && (jd.getDevSecondType() == 23 || jd.getDevSecondType() == 40)){
				//查询该房间是否还存在已住的房
				JourShortRentContract jsrc = new JourShortRentContract();
				jsrc.setJsrcHsId(hsId);
				jsrc.setJsrcBeginTime(beginTime);
				List<JourShortRentContract> jsrcList = jourShortRentContractMapper.selectByJsrcHsId(jsrc);
				String password = getPassword(); //四位密码
				System.out.println("我要看的输出====="+jsrcList.size());
				if(jsrcList.size() == 0){//该房间已不存在已住订单，执行发密码
					//执行发送门锁密码
					Map<String, String> map = new HashMap<String, String>();
					map.put("brandId",jd.getDevBrandId().toString());
					map.put("instruction","控制设备-门锁");
					map.put("coId",coId);
					map.put("devId",jd.getId().toString());
					map.put("password",password);
					map.put("status","用户密码注册");

					System.out.println("map的数据======"+map);
					String responseText = HttpRequestUtil.post(POSTURL, map);
					JSONObject job = JSONObject.parseObject(responseText);
					if (job.getInteger("code") == 0) {
						msg = popName+" 欢迎您入住 "+HsAddCommunity+ "的"+HsAddDoorplateno+"号房，您的密码是"+password+",预退时间"+endTime+"，入住期间如需帮助请致电 "+customerServiceTel+"。祝您旅途愉快！";
					}
				}
				devId = jd.getId();
				JourDoorCard jdc = new JourDoorCard();
				jdc.setJdcHsId(hsId);
				jdc.setJdcPassword(password);
				jdc.setJdcState("未使用");
				jdc.setJdcDeviceId(devId);
				jourDoorCardMapper.insertSelective(jdc);
				break;
			}
		}

		if("".equals(msg)){
			msg = "欢迎入住，祝您住的愉快！";
		}
		
		JournalShortMessage journalShortMessage = new JournalShortMessage();
        journalShortMessage.setSmReceiveNumber(phone);
		journalShortMessage.setSmType("发送");
		journalShortMessage.setSmNotRentId(hsId);
		journalShortMessage.setSmPopId(popId);
		journalShortMessage.setSmNote(msg);
		
		Result<String> result = sendShortMessageService.sendMessage(phone, msg, journalShortMessage,2);
		
		if(!result.getCode().equals(1)){
			throw new Exception(result.getMsg());
		}
		
	}
	
	/**
	 * 生成4位数的随机密码
	 * @return
	 */
	private String getPassword(){
		Double password = (Math.random()*9+1) * 100000;
		return password.toString().substring(0, 6);
	}

	@Override
	public String checkOutShortRent(JourShortRentContract jourShortRentContract) throws Exception {
		if(jourShortRentContract.getType() == 2){
			String orderNum = createOrderNum();
			jourShortRentContract.setJsrcOrderNum(orderNum);
			Result<String> payResult = qrCodePay(jourShortRentContract);
			if(payResult.getCode() == -3){
				Result<String> checkOrderResult =  checkOrderThree(jourShortRentContract);
				if(checkOrderResult.getCode() != 1){
					throw new Exception("查询订单6次仍未支付");
				}
			}else if(payResult.getCode() != 1){
				throw new Exception(payResult.getMsg());
			}
		}
		
		Double refundPrice = jourShortRentContract.getRefundPrice();
		//桔橙退款
		if(jourShortRentContract.getType() == 4){
			if(refundPrice > 0 && !"".equals(jourShortRentContract.getJsrcOrderNum())){
				String refundNum = createOrderNum();
				jourShortRentContract.setJsrcRefundNum(refundNum);
				Result<String> refundResult = refundOrder(jourShortRentContract);
				if(refundResult.getCode() != 1){
					throw new Exception(refundResult.getMsg());
				}
			}
		}
		
		int checkOutResult = jourShortRentContractMapper.updateByPrimaryKeySelective(jourShortRentContract);

		//退房注销授权
		if(checkOutResult > 0){
			JourDoorCard jdc = new JourDoorCard();
			System.out.println();
			jdc.setJdcPopId(jourShortRentContract.getJsrrPopId());
			jdc.setPopId(jourShortRentContract.getJsrrPopId());
			List<JourDoorCard> jdcList = jourDoorCardService.listDoorCard(jdc);
			System.out.println("jdcList===============              "+jdcList);
			for(int i=0;i<jdcList.size();i++){
				jdc.setJdcDeviceId(jdcList.get(i).getJdcDeviceId());
				jdc.setJdcCardId(jdcList.get(i).getJdcCardId());
				jdc.setJdcEquipmentType(jdcList.get(i).getJdcEquipmentType());
				jdc.setId(jdcList.get(i).getId());
				jdc.setJdcState("注销");
				String jdcOperatingRecording = jdcList.get(i).getJdcOperatingRecording();
				JSONArray jdcArray = JSON.parseArray(jdcOperatingRecording);
				//操作记录
				JSONObject operatingRecording = new JSONObject();
				operatingRecording.put("text","门卡注销：为客户注销智能门锁-2E0的门卡,卡号为"+jdcList.get(i).getJdcCardId());
				operatingRecording.put("time",jourShortRentContract.getJsrcActualDepartureTime());
				operatingRecording.put("type","系统跟进");
				operatingRecording.put("registrantName",jourShortRentContract.getUserName());
				jdcArray.add(operatingRecording);
				jdcOperatingRecording = jdcArray.toString();
				jdc.setJdcOperatingRecording(jdcOperatingRecording);

				jourDoorCardService.updateDoorCard(jdc);
			}
		}

		InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
		infoHouse4storeExpand.setHsId(jourShortRentContract.getJsrcHsId());
		infoHouse4storeExpand.setHsDirtyHouse(1);
		infoHouse4storeMapper.updateByPrimaryKeySelective(infoHouse4storeExpand);
		
		//收支 
		if(jourShortRentContract.getJsonArray() != null){
			financialService.insertFinancialList(jourShortRentContract.getJsonArray());
		}
		
		//添加任务
		JournalRepairExpand obj = JSON.parseObject(jourShortRentContract.getAddTaskObj(), JournalRepairExpand.class);
		/*JournalRepairExpand addTaskObj = new JournalRepairExpand();
		addTaskObj.setAtt(obj.toString());*/
		System.out.println("1***"+obj);
		int results= journalRepairMapper.insertSelective(obj);
		if(results==1) {
			SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
			JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
			jhf.setJhfHouseId(obj.getRepHouseId());
			jhf.setJhfHouse4rentId(obj.getRepHouse4rentId());
			jhf.setJhfHouse4storeId(obj.getRepHouse4storeId());
			jhf.setJhfUserId(userInfo.getUserId());
			jhf.setJhfUserName(userInfo.getSuStaffName());
			jhf.setJhfStorefront(userInfo.getSuStoreId());
			jhf.setJhfDepartment(userInfo.getSuDepartmentId());
			jhf.setJhfPaymentWay("系统跟进");
			jhf.setJhfFollowResult("跟进成功");
			
			jhf.setJhfFollowRemark("新增维保："+"维保类型："+obj.getRepTypeRp()+",费用归属："+obj.getRepResponsibility()
			+",客户姓名："+obj.getRepContacts()+",客户电话："+obj.getRepContactsPhone()+",负责人："+userInfo.getSuStaffName()
			+",期望时间："+obj.getRepHopeTime()+",维保描述："+obj.getRepEventRp());
			
			int result1 = journalHousingFollowMapper.insertSelective(jhf);
			return "1";
		}
		return "-1";
	}

	@Override
	public Result<List<JourShortRentContract>> updateShortRent(JourShortRentContract jourShortRentContract) throws Exception {
		if(jourShortRentContract.getType() != null){
			if(jourShortRentContract.getType() == 2){
				String orderNum = createOrderNum();
				jourShortRentContract.setJsrcOrderNum(orderNum);
				Result<String> payResult = qrCodePay(jourShortRentContract);
				if(payResult.getCode() == -3){
					Result<String> checkOrderResult =  checkOrderThree(jourShortRentContract);
					if(checkOrderResult.getCode() != 1){
						throw new Exception("查询订单6次仍未支付");
					}
				}else if(payResult.getCode() != 1){
					throw new Exception(payResult.getMsg());
				}
			}
			if(jourShortRentContract.getType() == 4 && !"".equals(jourShortRentContract.getJsrcOrderNum()) 
				&& jourShortRentContract.getTotalPrice() != 0){
				String refundNum = createOrderNum();
				jourShortRentContract.setJsrcRefundNum(refundNum);
				Result<String> refundResult = refundOrder(jourShortRentContract);
				if(refundResult.getCode() != 1){
					throw new Exception(refundResult.getMsg());
				}
			}
		}
		
		int result = jourShortRentContractMapper.updateByPrimaryKeySelective(jourShortRentContract);
		
		if(jourShortRentContract.getLaoHsId() != null && "已住".equals(jourShortRentContract.getJsrcState())){
			InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
			infoHouse4storeExpand.setHsId(jourShortRentContract.getLaoHsId());
			infoHouse4storeExpand.setHsDirtyHouse(1);
			infoHouse4storeMapper.updateByPrimaryKeySelective(infoHouse4storeExpand);
		}
		
		//收支 
		if(jourShortRentContract.getJsonArray() != null){
			financialService.insertFinancialList(jourShortRentContract.getJsonArray());
		}
		
		if(result > 0){
			JourShortRentContract jsrc2 = new JourShortRentContract();
			jsrc2.setJsrcId(jourShortRentContract.getJsrcId());
			List<JourShortRentContract> newList = jourShortRentContractMapper.selectJourShortRentContract(jsrc2);
			return new Result<List<JourShortRentContract>>(1,"成功",newList);
		}else{
			return new Result<List<JourShortRentContract>>(-1,"失败",null);
		}
	}
	
	@Override
	public Result<List<JourShortRentContract>> updateRoom(JourShortRentContract jourShortRentContract) throws Exception{
		List<JourShortRentContract> repairList = JSON.parseArray(jourShortRentContract.getJsonArray(),JourShortRentContract.class);
		int result = jourShortRentContractMapper.updateShortRoom(repairList);
		if(result > 0){
			JourShortRentContract jsrc2 = new JourShortRentContract();
			jsrc2.setJsrcId(jourShortRentContract.getJsrcId());
			List<JourShortRentContract> newList = jourShortRentContractMapper.selectJourShortRentContract(jsrc2);
			return new Result<List<JourShortRentContract>>(1,"成功",newList);
		}else{
			return new Result<List<JourShortRentContract>>(-1,"失败",null);
		}
	}
	
	
	/**
	 * 将传入来的钱单位转化为分 
	 * @param money
	 * @return
	 */
	public String computeMoney(Double money){
		String total_fee = String.valueOf(money * 100);
		total_fee = total_fee.substring(0,total_fee.indexOf("."));
		return total_fee;
	}

	@Override
	public String checkInShortRent(JourShortRentContract jourShortRentContract) throws Exception {
		Result<String> result = checkIn(jourShortRentContract,2);
		String renterId = result.getBody();
		return renterId;
	}

	@Override
	public Result<List<JourShortRentContract>> selectJourShortRentContract(JourShortRentContract jourShortRentContract) throws Exception {
		System.out.println(jourShortRentContract.getJsrrId()+"---------");
		List<JourShortRentContract> list = jourShortRentContractMapper.selectJourShortRentContract(jourShortRentContract);
		List<JourShortRentContract> newList=new ArrayList<>();
		
		for(JourShortRentContract jsrc : list){
			JourShortRentNexus jsrn =  new JourShortRentNexus();
			jsrn.setJsrnJsrcId(jsrc.getJsrcId());
			List<JourShortRentNexus> list1 = jourShortRentNexusMapper.selectByPrimaryKey(jsrn);
			List<Integer> idList = new ArrayList<>();
			if(!list1.isEmpty()){
				for(int i=0;i<list1.size();i++){
					idList.add(list1.get(i).getJsrnJsrrId());
				}
				
				List<InfoPopulation> list2 = infoPopulationMapper.listPopByList(idList);
				
				String popJsonStr = JSON.toJSONString(list2,SerializerFeature.WriteMapNullValue);
				jsrc.setPopJson(popJsonStr);
			}
			if(jourShortRentContract.getJsrrId()!=null){
				if(idList.indexOf(jourShortRentContract.getJsrrId())!=-1){
					newList.add(jsrc);
				}
			}
		}
		if(jourShortRentContract.getJsrrId()!=null){
			list = newList;
		}
		if(list.size() > 0 ){
			return new Result<List<JourShortRentContract>>(1,"成功",list);
		}else{
			return new Result<List<JourShortRentContract>>(-1,"查询不到数据",null);
		}
	}

	@Override
	public Result<String> sceneCheckIn(JourShortRentContract jourShortRentContract) throws Exception {
		
		Result<String> result = new Result<String>();
		if(jourShortRentContract.getType() == 1){
			jourShortRentContract.setJsrcPaymentMethod("现金收款");
		}else if(jourShortRentContract.getType() == 2){
			String orderNum = createOrderNum();
			jourShortRentContract.setJsrcOrderNum(orderNum);
			Result<String> payResult = qrCodePay(jourShortRentContract);
			if(payResult.getCode() == -3){
				Result<String> checkOrderResult =  checkOrderThree(jourShortRentContract);
				if(checkOrderResult.getCode() != 1){
					throw new Exception("查询订单6次仍未支付");
				}
			}else if(payResult.getCode() != 1){
				throw new Exception(payResult.getMsg());
			}
			jourShortRentContract.setJsrcPaymentMethod("扫码收款");
		}else if(jourShortRentContract.getType() == 3){
			jourShortRentContract.setJsrcPaymentMethod("台卡收款");
		}
		
		result = checkIn(jourShortRentContract,0);
		
		return result;
	}

	@Override
	public Result<String> retainCheckIn(JourShortRentContract jourShortRentContract) throws Exception {
		if(jourShortRentContract.getType() == 1){
			jourShortRentContract.setJsrcPaymentMethod("现金收款");
		}else if(jourShortRentContract.getType() == 2){
			String orderNum = createOrderNum();
			jourShortRentContract.setJsrcOrderNum(orderNum);
			Result<String> payResult = qrCodePay(jourShortRentContract);
			if(payResult.getCode() == -3){
				Result<String> checkOrderResult =  checkOrderThree(jourShortRentContract);
				if(checkOrderResult.getCode() != 1){
					throw new Exception("查询订单6次仍未支付");
				}
			}else if(payResult.getCode() != 1){
				throw new Exception(payResult.getMsg());
			}
			jourShortRentContract.setJsrcPaymentMethod("扫码收款");
		}else if(jourShortRentContract.getType() == 3){
			jourShortRentContract.setJsrcPaymentMethod("台卡收款");
		}
		
		return checkIn(jourShortRentContract,2);
	}
	
	//批量插入保留办理订单
	@Override
	public Result<String> insertList(JourShortRentContract jsrc) throws Exception {
		List<JourShortRentContract> handlList= JSON.parseArray(jsrc.getHandle(),JourShortRentContract.class);
		int result = jourShortRentContractMapper.insertList(handlList);
		if(result>0){
			return new Result<String>(1,"保留成功",null);
		}else{
			return new Result<String>(1,"保留失败",null);
		}
	}
	
	private Result<String> checkOrderThree(JourShortRentContract jsrc) throws Exception{
			
			Integer cacheTime = 1000 * 10;
			Timer timer = new Timer();
			// (TimerTask task, long delay, long period)任务，延迟时间，多久执行
			
			boolean flag = false;
			for(int i = 0; i < 10;i++){
				Result<String> result = checkOrder(jsrc);
				if(result.getCode() == 1){
					flag = true;
					break;
				}
				Thread.sleep(1000 * 3);
			}
			
			if(flag){
				return new Result<String>(1,"成功","");
			}else{
				return new Result<String>(-1,"付款失败","");
			}
	}
	
	private Result<String> checkOrder(JourShortRentContract jsrc) throws Exception{
		
		String key = CommonMethodClass.getSessionByKey("wxKey");
		String mch_id = CommonMethodClass.getSessionByKey("wxMerchantNumber");
		
		Map<String,String> sendMap = new HashMap<>();
		//商户号
		sendMap.put("mch_id", mch_id);
		//订单号
		sendMap.put("out_trade_no", jsrc.getJsrcOrderNum());
		//微信支付key
		sendMap.put("key", key);
		
		WxPay wxPay = new WxPay();
		wxPay.setCheckOrderStrategy(new OrangeCheckOrder());
		Result<String> result = wxPay.checkOrder(sendMap);
		return result;
	}
	
	
	/**
	 * 调起微信二维码支付
	 * @param csGoodsBilling
	 * @throws Exception
	 */
	private Result<String> qrCodePay(JourShortRentContract jsrc) throws Exception{
		
		String key = CommonMethodClass.getSessionByKey("wxKey");
		String mch_id = CommonMethodClass.getSessionByKey("wxMerchantNumber");
		String total_fee = computeMoney(Math.abs(jsrc.getTotalPrice()));
		
		Map<String,String> sendMap = new HashMap<>();
		//商户号
		sendMap.put("mch_id", mch_id);
		//商品描述
		sendMap.put("body", jsrc.getWxpayBody());
		//总金额
		sendMap.put("total_fee", total_fee);
		//授权码
		sendMap.put("auth_code", jsrc.getAuthCode());
		//订单号
		sendMap.put("out_trade_no", jsrc.getJsrcOrderNum());
		//微信支付key
		sendMap.put("key", key);
		
		WxPay wxPay = new WxPay();
		//由桔橙二维码支付来实现二维码支付的接口
		wxPay.setQrCodePay(new OrangeQRCodePay());
		Result<String> result = wxPay.qrCodePay(sendMap);
		return result;
	}
	
	private Result<String> refundOrder(JourShortRentContract jsrc) throws Exception{
		
		String key = CommonMethodClass.getSessionByKey("wxKey");
		String mch_id = CommonMethodClass.getSessionByKey("wxMerchantNumber");
		String refund_fee = computeMoney(jsrc.getRefundPrice());
		String totalPrice = computeMoney(jsrc.getTotalPrice());
		System.out.println("************111111*********  "+jsrc);
		Map<String,String> sendMap = new HashMap<>();
		//商户号
		sendMap.put("mch_id", mch_id);
		//订单号
		sendMap.put("out_trade_no", jsrc.getJsrcOrderNum());
		//总金额
		sendMap.put("total_fee", totalPrice);
		//退单金额
		sendMap.put("refund_fee", refund_fee);
		//退单单号
		sendMap.put("out_refund_no", jsrc.getJsrcRefundNum());
		//微信支付key
		sendMap.put("key", key);
		
		WxPay wxPay = new WxPay();
		//由桔橙二维码支付来实现二维码支付的接口
		if("扫码收款".equals(jsrc.getJsrcPaymentMethod())){
			wxPay.setRefundOrderStrategy(new OrangeRefundOrder());
		}
		//由桔橙微信支付来实现微信支付的接口
		if("在线支付".equals(jsrc.getJsrcPaymentMethod())){
			System.out.println("微信支付！！！！！！！！！！！！！！！！");
			wxPay.setRefundOrderStrategy(new OrangeWxRefundOrder());
		}
		Result<String> result = wxPay.refundOrder(sendMap);
		return result;
	}
	
	/**
	 * 生成时间戳加上3位随机数的字符串
	 * @return
	 */
	private String createOrderNum(){
		//生成订单
		Date date = new Date();
		SimpleDateFormat sdf4 = new SimpleDateFormat("yyyyMMddHHmmss");
		String orderNum = sdf4.format(date)+(int) (Math.random() * 10) + (int) (Math.random() * 10)+(int) (Math.random() * 10);
		return orderNum;
		
	}

	@Override
	public Result<String> changeShortRentHouse(JourShortRentContract jourShortRentContract) throws Exception {
		if (jourShortRentContract.getAuthCode() != null) {
			String orderNum = createOrderNum();
			jourShortRentContract.setJsrcOrderNum(orderNum);
			Result<String> payResult = qrCodePay(jourShortRentContract);
			if (payResult.getCode() == -3) {
				Result<String> checkOrderResult = checkOrderThree(jourShortRentContract);
				if (checkOrderResult.getCode() != 1) {
					throw new Exception("查询订单6次仍未支付");
				}
			} else if (payResult.getCode() != 1) {
				throw new Exception(payResult.getMsg());
			}
		}

		int result = jourShortRentContractMapper.updateByPrimaryKeySelective(jourShortRentContract);


		if ("已住".equals(jourShortRentContract.getJsrcState())) {
			//修改成脏房
			InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
			infoHouse4storeExpand.setHsId(jourShortRentContract.getLaoHsId());
			infoHouse4storeExpand.setHsDirtyHouse(1);
			infoHouse4storeMapper.updateByPrimaryKeySelective(infoHouse4storeExpand);

			//生成维保
			JournalRepairExpand jre = JSON.parseObject(jourShortRentContract.getAddTaskObj(), JournalRepairExpand.class);
			repairService.insertSelective(jre);
		}

		if (jourShortRentContract.getJsonArray() != null) {
			financialService.insertFinancialList(jourShortRentContract.getJsonArray());
		}


		if (result > 0) {
			return new Result<String>(1, "成功", null);
		} else {
			return new Result<String>(-1, "失败", null);
		}
	}
	@Override
	public List<JourShortRentContract> selectRenter(JourShortRentContract jourShortRentContract) throws Exception {
		return jourShortRentContractMapper.selectRenter(jourShortRentContract);
	}

	@Override
	public List<JourShortRentContract> queryNewOrder(JourShortRentContract jourShortRentContract) throws Exception {
		return jourShortRentContractMapper.queryNewOrder(jourShortRentContract);
	}

	@Override
	public int updateShortRentContract(JourShortRentContract jourShortRentContract) throws Exception {
		return jourShortRentContractMapper.updateByPrimaryKeySelective(jourShortRentContract);
	}



    @Override
	public String housingCleaning(JourShortRentContract jourShortRentContract) throws Exception{
		//添加任务
		JournalRepairExpand obj = JSON.parseObject(jourShortRentContract.getAddTaskObj(), JournalRepairExpand.class);
		/*JournalRepairExpand addTaskObj = new JournalRepairExpand();
		addTaskObj.setAtt(obj.toString());*/
		System.out.println("1***"+obj);
		int results= journalRepairMapper.insertSelective(obj);
		if(results==1) {
			SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
			JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
			jhf.setJhfHouseId(obj.getRepHouseId());
			jhf.setJhfHouse4rentId(obj.getRepHouse4rentId());
			jhf.setJhfHouse4storeId(obj.getRepHouse4storeId());
			jhf.setJhfUserId(userInfo.getUserId());
			jhf.setJhfUserName(userInfo.getSuStaffName());
			jhf.setJhfStorefront(userInfo.getSuStoreId());
			jhf.setJhfDepartment(userInfo.getSuDepartmentId());
			jhf.setJhfPaymentWay("系统跟进");
			jhf.setJhfFollowResult("跟进成功");
			
			jhf.setJhfFollowRemark("新增维保："+"维保类型："+obj.getRepTypeRp()+",费用归属："+obj.getRepResponsibility()
			+",客户姓名："+obj.getRepContacts()+",客户电话："+obj.getRepContactsPhone()+",负责人："+userInfo.getSuStaffName()
			+",期望时间："+obj.getRepHopeTime()+",维保描述："+obj.getRepEventRp());
			
			int result1 = journalHousingFollowMapper.insertSelective(jhf);
			return "1";
		}
		return "-1";
	}

}
