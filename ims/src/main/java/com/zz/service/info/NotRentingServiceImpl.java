package com.zz.service.info;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.info.InfoHouse4rentMapper;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.integratedmapper.InfoNotRentingMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.mapper.sys.SysUserMapper;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.integrated.InfoNotRenting;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.util.DateUtil;

public class NotRentingServiceImpl implements NotRentingService {
	private InfoNotRentingMapper infoNotRentingMapper;
	@Autowired
	private InfoHouse4storeMapper infoHouse4storeMapper;
	@Autowired
	private InfoHouse4rentMapper infoHouse4rentMapper;
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;
	@Autowired
	private SysUserMapper sysUserMapper;

	public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}

	public void setInfoNotRentingMapper(InfoNotRentingMapper infoNotRentingMapper) {
		this.infoNotRentingMapper = infoNotRentingMapper;
	}

	@Override
	public List<InfoNotRenting> integratedQuery(InfoNotRenting infoNotRenting) throws Exception {
		
		
		
		return infoNotRentingMapper.integratedQuery(infoNotRenting);
	}

	@Override
	public int infoNotRenting2(InfoNotRenting infoNotRenting) throws Exception {
	  //修改未租信息跟进
	  InfoHouse4storeExpand infoStore=new InfoHouse4storeExpand();
	  infoStore.setHsId(infoNotRenting.getHsId());
	  List<InfoHouse4storeExpand> list=infoHouse4storeMapper.queryHouseStore(infoStore);
	  
	  if (list.isEmpty()) {
			return 0;
	  }
	  infoStore.setHsHotAirVolFirst(infoNotRenting.getHrHotAirVolFirst());
	  infoStore.setHsElectritVolFirst(infoNotRenting.getHrElectritVolFirst());
	  infoStore.setHsHotWaterVolFirst(infoNotRenting.getHrHotWaterVolFirst());
	  infoStore.setHsGasVolFirst(infoNotRenting.getHsGasVolFirst());
	  infoStore.setHsSectionType(infoNotRenting.getHsSectionType());
	  infoStore.setHsHouseSquare(infoNotRenting.getHsHouseSquare());
	  infoStore.setHsHouseOwner(infoNotRenting.getHsHouseOwner());
	  infoStore.setHsHouseDirection(infoNotRenting.getHsHouseDirection());
	  infoStore.setHsGuidePrice(infoNotRenting.getHsGuidePrice());
	  infoStore.setHsHouseDeposit(infoNotRenting.getHsHouseDeposit());
	  infoStore.setHsBase(infoNotRenting.getHsBase());
	  infoStore.setHsAdminUserId(infoNotRenting.getHsAdminUserId());
	  infoStore.setHsAdminUserName(infoNotRenting.getHsAdminUserName());
	  infoStore.setHrId(infoNotRenting.getHrId());
	  infoStore.setHsDecorationHoliday(infoNotRenting.getHsDecorationHoliday());
	  infoStore.setHsBankName(infoNotRenting.getHsBankName());
	  infoStore.setHsBankType(infoNotRenting.getHsBankType());
	  infoStore.setHsBankNum(infoNotRenting.getHsBankNum());
	  infoStore.setHsHouseNote(infoNotRenting.getHsHouseNote());
	  infoStore.setHsWaterVolFirst(infoNotRenting.getHsWaterVolFirst());
	  infoStore.setHsElectritVolFirst(infoNotRenting.getHsElectritVolFirst());
	  infoStore.setHsGasVolFirst(infoNotRenting.getHsGasVolFirst());
	  
		 Map<String, String> map = new HashMap<String, String>();
		 map.put("hsHouseSquare", "面积");
		 map.put("hsSectionType", "户型");
		 map.put("hsHouseOwner", "用途");
		 map.put("hsHouseDirection", "朝向");
		 map.put("hsBase", "欠结金额");
		 map.put("hsDecorationHoliday", "外置装修/免租期");
		 map.put("hsBankName", "银行户主");
		 map.put("hsBankType", "银行名称");
		 map.put("hsBankNum", "银行卡号");
		 map.put("hsAdminUserId", "业务员");
		 map.put("hsWaterVolFirst", "水底数");
		 map.put("hsElectritVolFirst", "电底数");
		 map.put("hsGasVolFirst", "气底数");
		 map.put("hsHouseDeposit", "房源押金");
		 map.put("hsHouseNote", "房间备注");
		 map.put("hsGuidePrice", "出房指导价");
		 StringBuffer followUp = new StringBuffer();
		 followUp.append("综合修改，修改未租房信息：");
		 Field[] newNotRent = infoStore.getClass().getSuperclass().getDeclaredFields();
			for (Field field : newNotRent) {
				field.setAccessible(true);
				if (map.containsKey(field.getName()) && field.get(infoStore) != null
					&& !field.get(infoStore).equals(field.get(list.get(0)))
					&& !(field.get(infoStore).equals("") && field.get(list.get(0)) == null)) {
				    if ("hsAdminUserId".equals(field.getName())) {
	                    String oldhsAdminUserName = list.get(0).getAdminName() != null ? list.get(0).getAdminName() : "";
	                    followUp.append(map.get(field.getName()) + "：" + oldhsAdminUserName + " → " + infoStore.getHsAdminUserName() + ";");
	                    }
	                else {
	                    Object old = field.get(list.get(0)) != null ? field.get(list.get(0)) : "";
	                    followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(infoStore) + ";");
	                }
				  }
			  }
		  SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
	      JournalHousingFollowExpand nalHousingFollow = new JournalHousingFollowExpand();
			nalHousingFollow.setJhfHouse4rentId(infoNotRenting.getHrId());
			nalHousingFollow.setJhfHouse4storeId(infoNotRenting.getHsId());
			nalHousingFollow.setJhfFollowRemark(followUp.toString());
			nalHousingFollow.setJhfFollowResult("跟进成功");
			nalHousingFollow.setJhfFollowTime(DateUtil.getCurDateTime());
			nalHousingFollow.setJhfFollowBelong("其他");
			nalHousingFollow.setJhfRemind("否");
			nalHousingFollow.setJhfUserId(userInfo.getUserId());
			nalHousingFollow.setJhfDepartment(userInfo.getSuDepartmentId());
			nalHousingFollow.setJhfPaymentWay("系统跟进");
			nalHousingFollow.setJhfStorefront(userInfo.getSuStoreId());
			nalHousingFollow.setJhfHouseId(infoNotRenting.getHsHouseId());
		
			int result = journalHousingFollowMapper.insertSelective(nalHousingFollow);
			System.out.println("------result-----------:"+result);
			infoHouse4storeMapper.updateByPrimaryKeySelective(infoStore);
			return result;
		 
	}
	@Override
	public int updateRentHoues(InfoNotRenting infoNotRenting) throws Exception {
	    //修改已租信息跟进
	  InfoHouse4rentExpand infoRent = new InfoHouse4rentExpand();
      infoRent.setHrId(infoNotRenting.getHrId());
      infoRent.setSplitFlag("1");
      List<InfoHouse4rentExpand> list = infoHouse4rentMapper.queryHouseRent(infoRent);
	  if (list.isEmpty()) {
		return 0;
	  }
	  infoRent.setHrHouseSquare(infoNotRenting.getHrHouseSquare());
	  infoRent.setHrSectionType(infoNotRenting.getHrSectionType());
	  infoRent.setHrHouseOwner(infoNotRenting.getHrHouseOwner());
	  infoRent.setHrHouseDirection(infoNotRenting.getHrHouseDirection());
	  infoRent.setHrManagerUserName(infoNotRenting.getHrManagerUserName());
	  infoRent.setHrManagerUserId(infoNotRenting.getHrManagerUserId());
	  infoRent.setHrBase(infoNotRenting.getHrBase());
	  infoRent.setHrAdminUserId(infoNotRenting.getHrAdminUserId());
	  infoRent.setHrAdminUserName(infoNotRenting.getHrAdminUserName());
	  infoRent.setHrWaterVolFirst(infoNotRenting.getHrWaterVolFirst());
	  infoRent.setHrElectritVolFirst(infoNotRenting.getHrElectritVolFirst());
	  infoRent.setHrGasVolFirst(infoNotRenting.getHrGasVolFirst());
	  infoRent.setHrHouseDeposit(infoNotRenting.getHrHouseDeposit());
	  infoRent.setHrPowerDeposit(infoNotRenting.getHrPowerDeposit());
	  infoRent.setHrDoorDeposit(infoNotRenting.getHrDoorDeposit());
	  infoRent.setHrOtherDeposit(infoNotRenting.getHrOtherDeposit());
	  infoRent.setHrWifiCharge(infoNotRenting.getHrWifiCharge());
	  infoRent.setHrTvCharge(infoNotRenting.getHrTvCharge());
	  infoRent.setHrOtherPay(infoNotRenting.getHrOtherPay());
	  infoRent.setHrHouseNote(infoNotRenting.getHrHouseNote());
	  infoRent.setHrHouse4storeId(infoNotRenting.getHrHouse4storeId());
	  infoRent.setHrHouseId(infoNotRenting.getHrHouseId());

	  //水电费计费方案
	  infoRent.setHrWaterPlan(infoNotRenting.getHrWaterPlan());
	  infoRent.setHrElectritPlan(infoNotRenting.getHrElectritPlan());
	  infoRent.setHrGasPlan(infoNotRenting.getHrGasPlan());
	  infoRent.setHrHotwaterPlan(infoNotRenting.getHrHotWaterPlan());
	  infoRent.setHrHotairPlan(infoNotRenting.getHrHotAirPlan());
	
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("hrHouseSquare", "面积");
		map.put("hrSectionType", "户型");
		map.put("hrHouseOwner", "用途");
		map.put("hrHouseDirection", "朝向");
		map.put("hrManagerUserId", "房管员");
		map.put("hrBase", "欠结金额");
		map.put("hrAdminUserId", "业务员");
		map.put("hrWaterVolFirst", "水底数");
		map.put("hrElectritVolFirst", "电底数");
		map.put("hrGasVolFirst", "气底数");
		map.put("hrHouseDeposit", "房源押金");
		map.put("hrPowerDeposit", "水电押金");
		map.put("hrDoorDeposit", "门卡押金");
		map.put("hrOtherDeposit", "其他押金");
		map.put("hrWifiCharge", "网费");
		map.put("hrTvCharge", "电视费");
		map.put("hrOtherPay", "其他付费金额（每月）");
		map.put("hrHouseNote", "备注/请注意");
		StringBuffer followUp = new StringBuffer();
		followUp.append("综合修改，修改已租房信息：");
		Field[] newNotRent = infoRent.getClass().getSuperclass().getDeclaredFields();
		for (Field field : newNotRent) {
			field.setAccessible(true);
			if (map.containsKey(field.getName()) && field.get(infoRent) != null
				&& !field.get(infoRent).equals(field.get(list.get(0)))
				&& !(field.get(infoRent).equals("") && field.get(list.get(0)) == null)) {
				if ("hrManagerUserId".equals(field.getName())) {
                       String oldhrManagerUserName = list.get(0).getHrManagerUserName() != null ? list.get(0).getHrManagerUserName() : "";
                       followUp.append(map.get(field.getName()) + "：" + oldhrManagerUserName + " → " + infoRent.getHrManagerUserName() + ";");
                } else if ("hrAdminUserId".equals(field.getName())) {
                    String oldhrAdminUserName = list.get(0).getAdminName() != null ? list.get(0).getAdminName() : "";
                    followUp.append(map.get(field.getName()) + "：" + oldhrAdminUserName + " → " + infoRent.getHrAdminUserName() + ";");
                    }
                else {
                    Object old = field.get(list.get(0)) != null ? field.get(list.get(0)) : "";
                    followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(infoRent) + ";");
                }
			}
		}
		SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
		JournalHousingFollowExpand nalHousingFollow = new JournalHousingFollowExpand();
		nalHousingFollow.setJhfHouse4rentId(infoNotRenting.getHrId());
		nalHousingFollow.setJhfHouse4storeId(infoNotRenting.getHrHouse4storeId());
		nalHousingFollow.setJhfFollowRemark(followUp.toString());
		nalHousingFollow.setJhfFollowResult("跟进成功");
		nalHousingFollow.setJhfFollowTime(DateUtil.getCurDateTime());
		nalHousingFollow.setJhfFollowBelong("其他");
		nalHousingFollow.setJhfRemind("否");
		nalHousingFollow.setJhfUserId(userInfo.getUserId());
		nalHousingFollow.setJhfDepartment(userInfo.getSuDepartmentId());
		nalHousingFollow.setJhfPaymentWay("系统跟进");
		nalHousingFollow.setJhfStorefront(userInfo.getSuStoreId());
		nalHousingFollow.setJhfHouseId(infoNotRenting.getHrHouseId());
	
		int result = journalHousingFollowMapper.insertSelective(nalHousingFollow);
		infoHouse4rentMapper.updateByPrimaryKeySelective(infoRent);
		return result;
	
	}

	@Override
	public int updateLand(InfoNotRenting infoNotRenting) throws Exception {
		// TODO Auto-generated method stub
		return infoNotRentingMapper.updateLand(infoNotRenting);
	}

	@Override
	public int updatePop(InfoNotRenting infoNotRenting) throws Exception {
		// TODO Auto-generated method stub
		return infoNotRentingMapper.updatePop(infoNotRenting);
	}

	@Override
	public int updateLandjrl(InfoNotRenting infoNotRenting) throws Exception {
		// TODO Auto-generated method stub
		return infoNotRentingMapper.updateLandjrl(infoNotRenting);
	}

	@Override
	public int updataRentJrr(InfoNotRenting infoNotRenting) throws Exception {
		// TODO Auto-generated method stub
		return infoNotRentingMapper.updataRentJrr(infoNotRenting);
	}

	@Override
	public int updataRenter(InfoNotRenting infoNotRenting) throws Exception {
		// TODO Auto-generated method stub
		return infoNotRentingMapper.updataRenter(infoNotRenting);
	}

	// 水电气读数修改
	@Override
	public int upWaterElectricalModification(InfoNotRenting infoNotRenting) throws Exception {
		Double incomingWater = infoNotRenting.getIncomingWater(); // 传入的水读数
		System.out.println("11111111111111111111111111111incomingWater =" + incomingWater);
		Double incomingElectric = infoNotRenting.getIncomingElectric(); // 传入的电读数
		System.out.println("111111111111111111111111111111incomingElectric =" + incomingElectric);
		Double incomingGas = infoNotRenting.getIncomingGas(); // 传入的气读数
		System.out.println("111111111111111111111111111111incomingGas =" + incomingGas);
		
		Double incomingHotWater = infoNotRenting.getIncomingHotWater();//传入的热水读数
		Double incomingHotAir = infoNotRenting.getIncomingHotAir();//传入的暖气读数
		
		
		Double newWaterReadings = infoNotRenting.getNewWaterReadings(); // 最新水读数
		Double latestElectricalReadings = infoNotRenting.getLatestElectricalReadings(); // 最新电读数
		Double latestGasReading = infoNotRenting.getLatestGasReading(); // 最新气读数
		
		Double latestHotWaterReading = infoNotRenting.getLatestHotWaterReading();//最新热水读数
		Double latestHotAirReading = infoNotRenting.getLatestHotAirReading();//最新暖气读数
		System.out.println("tzl:"+incomingHotWater+","+incomingHotAir+","+latestHotWaterReading+","+latestHotAirReading+",");
		
		String meterReadingRecord = ""; // 储存字段
		Integer hsId = infoNotRenting.getHsId(); // 未租房id

		System.out.println("未租房数据获取----------------------------------");
		InfoHouse4storeExpand ihs = new InfoHouse4storeExpand();
		ihs.setHsId(hsId);
		List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.selectStoreData(ihs);
		System.out.println("未租房 : " + hsList.size());
		if (hsList.size() == 0) {
			throw new Exception("查找不到未租房");
		}
		meterReadingRecord = hsList.get(0).getHsMeterReadingRecord();
		System.out.println("有没有啊" + meterReadingRecord);
		// 第一次json转换
		JSONObject json = JSONObject.fromObject(meterReadingRecord);
		String waterData = json.getString("water");
		String electritData = json.getString("electrit");
		String gasData = json.getString("gas");
		
		String hotwaterData = json.getString("hotwater");
		String hotairData = json.getString("hotair");
	
		
		System.out.println("第一次的json数据：" + waterData + "-----" + electritData + "-----" + gasData+ "-----" + hotwaterData+ "-----" + hotairData);
		// 第二次json转换
		JSONObject waterjson = JSONObject.fromObject(waterData);
		JSONObject electritjson = JSONObject.fromObject(electritData);
		JSONObject gasjson = JSONObject.fromObject(gasData);
		
		JSONObject hotwaterjson = JSONObject.fromObject(hotwaterData);
		JSONObject hotairjson = JSONObject.fromObject(hotairData);
		
		System.out.println("第二次的json数据：" + waterjson + "-----" + electritjson + "-----" + gasjson+ "-----" + hotwaterjson+ "-----" + hotairjson);
		// 第三次转为数组
		String waterThis = waterjson.getString("thisReading");
		String electritThis = electritjson.getString("thisReading");
		String gasThis = gasjson.getString("thisReading");
		
		String hotwaterThis = hotwaterjson.getString("thisReading");
		String hotairThis = hotairjson.getString("thisReading");
		
		System.out.println("第三次的数组数据：" + waterThis + "-----" + electritThis + "-----" + gasThis+ "-----" + hotwaterThis+ "-----" + hotairThis);
		JSONArray waterlist = JSONArray.fromObject(waterThis);
		JSONArray electritlist = JSONArray.fromObject(electritThis);
		JSONArray gaslist = JSONArray.fromObject(gasThis);
		
		JSONArray hotwaterlist = JSONArray.fromObject(hotwaterThis);
		JSONArray hotairlist = JSONArray.fromObject(hotairThis);
		
		System.out.println("第三次的数组数据：" + waterlist + "-----" + electritlist + "-----" + gaslist+ "-----" + hotwaterlist+ "-----" + hotairlist);

		/*
		 * //判断传入的上次读数是否为0 if(incomingWater == 0){ incomingWater
		 * =Double.parseDouble(waterjson.getString("lastReading")); }
		 * if(incomingElectric == 0){ incomingElectric =
		 * Double.parseDouble(electritjson.getString("lastReading")); } if(incomingGas
		 * == 0){ incomingGas = Double.parseDouble(gasjson.getString("lastReading")); }
		 */

		// 判断传入的最新读数是否为 null
		if (newWaterReadings != null) {
			waterlist.add(newWaterReadings);
		}
		if (latestElectricalReadings != null) {
			electritlist.add(latestElectricalReadings);
		}
		if (latestGasReading != null) {
			gaslist.add(latestGasReading);
		}
		
		if (latestHotWaterReading != null) {
			hotwaterlist.add(latestHotWaterReading);
		}
		if (latestHotAirReading != null) {
			hotairlist.add(latestHotAirReading);
		}

		// 接字段
		String water = "{'lastReading':" + incomingWater + ",'thisReading':" + waterlist + "}";
		String electrit = "{'lastReading':" + incomingElectric + ",'thisReading':" + electritlist + "}";
		String gas = "{'lastReading':" + incomingGas + ",'thisReading':" + gaslist + "}";
		
		String hotwater = "{'lastReading':" + incomingHotWater + ",'thisReading':" + hotwaterlist + "}";
		String hotair = "{'lastReading':" + incomingHotAir + ",'thisReading':" + hotairlist + "}";
		
		
		System.out.println("拼接的字符串：" + water + "\n" + electrit + "\n" + gas+ "\n" + hotwater+ "\n" + hotair);
		String mrr = "{'water':" + water + ",'electrit':" + electrit + ",'gas':" + gas +",'hotwater':" + hotwater + ",'hotair':" + hotair + "}";
		System.out.println("存储字段：" + mrr);

		System.out.println("未租房修改开始--------------");
		infoNotRenting.setHsId(hsId);
		infoNotRenting.setHsMeterReadingRecord(mrr);
		System.out.println("未租房修改开始--------------");
		int result1 = infoNotRentingMapper.infoNotRenting(infoNotRenting);
		System.out.println("未租房修改成功");
		if (result1 == 0) {
			throw new Exception("未租房修改失败");
		}
		System.out.println("结束--------------------------");
		return 1;
	}

	@Override
	public int updateNotRenting(InfoNotRenting infoNotRenting) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

}
