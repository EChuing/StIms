package com.zz.deviceevents;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.datasource.DevFirstType;
import com.zz.datasource.DevFirstTypeMapper;
import com.zz.other.Syslog;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoRenterExpand;
import com.zz.po.info.InfoResidentTable;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourDeviceWarning;
import com.zz.po.journal.JourShortRentContract;
import com.zz.po.stat.StatDeviceWarning;
import com.zz.po.sys.SysVariables;
import com.zz.service.info.HouseForRentService;
import com.zz.service.info.RenterService;
import com.zz.service.info.ResidentTableService;
import com.zz.service.journal.DeviceService;
import com.zz.service.journal.JourDeviceWarningService;
import com.zz.service.journal.JourShortRentContractService;
import com.zz.service.stat.StatDeviceWarningService;
import com.zz.service.sys.SysVariablesService;
import com.zz.util.MySqlSessionFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;


public class SmokeAlertEventsAction extends BaseAction implements ModelDriven<JourDevice> {
	private final static String POSTURL = "http://www.fangzhizun.com/device/Interface/QueryDeviceStatus2";
	private JourDevice jourDevice;
	@Autowired
	private HouseForRentService houseForRentService;
	@Autowired
	private RenterService renterService;
	@Autowired
	private ResidentTableService residentTableService;
	@Autowired
	private StatDeviceWarningService statDeviceWarningService;
	@Autowired
	private DeviceService deviceService;
	@Autowired
	private SysVariablesService sysVariablesService;
	@Autowired
	private JourDeviceWarningService jourDeviceWarningService;
	@Autowired
	private JourShortRentContractService jourShortRentContractService;
	@Override
	public JourDevice getModel() {
		if(jourDevice == null){
			jourDevice = new JourDevice();
		}
		return jourDevice;
	}
	
	public void acsQueryAlarmRecord(){
		try{
			jourDevice.setDevBrandId(20);
			List<JourDevice> list = deviceService.selectDeviceSN(jourDevice);
			if(list.size() != 0){
				for(int i=0;i<list.size();i++){
					String devSn = list.get(i).getDevAuthId();
					Date date = new Date();
					SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(date);
					calendar.add(Calendar.MINUTE, -10);
					date = calendar.getTime();
					
					JourDeviceWarning jourDeviceWarning = new JourDeviceWarning();
					jourDeviceWarning.setJdwSn(devSn);
					jourDeviceWarning.setJdwTime(simpleDateFormat.format(date));
					List<JourDeviceWarning> jdwList = jourDeviceWarningService.selectToDayDetails(jourDeviceWarning);
					boolean state = true;
					boolean emState = true;
					if(jdwList.size() != 0){
						for(int j = 0; j<jdwList.size();j++){
							if(jdwList.get(j).getJdwHandleStatus().equals("未处理")){
								if ("2E525300000001-123".equals(jdwList.get(j).getJdwSn())){
									emState =false;
								}else{
									state = false;
								}
							}
						}
					}
					//转库查警情记录
					SqlSession sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession();

					ElectricMeterEventsMapper sessionMapper = sqlSession.getMapper(ElectricMeterEventsMapper.class);
					ElectricMeterEvents electricMeterEvents = new ElectricMeterEvents();
					electricMeterEvents.setEmWarningStatus("报警");
					electricMeterEvents.setEmHandleStatus("未处理");
					List<ElectricMeterEvents> emAlarmList = sessionMapper.selectEmAlarmRecord(electricMeterEvents);
					SmokeAlertEventsMapper mapper = sqlSession.getMapper(SmokeAlertEventsMapper.class);
					SmokeAlertEvents smokeAlertEvents = new SmokeAlertEvents();
					smokeAlertEvents.setSaDeviceSn(devSn);
					smokeAlertEvents.setSaHandleStatus("未处理");
					List<SmokeAlertEvents> list2 = mapper.selectAlarmRecord(smokeAlertEvents);
                    System.out.println("99999999:::"+list2);
                    System.out.println("888888888:::"+devSn);

					if (emAlarmList.size()!=0){
						ElectricMeterEvents electricMeterEvents2 = new ElectricMeterEvents();
						electricMeterEvents2.setEmDeviceSn(devSn);
						electricMeterEvents2.setEmHandleStatus("已知晓");
						electricMeterEvents2.setEmWarningStatus("报警");
						Integer emResult = sessionMapper.updateEmAlarmRecord(electricMeterEvents2);

						if(emState){
							jourDeviceWarning.setJdwDevId(list.get(i).getId());
							jourDeviceWarning.setJdwBrand(emAlarmList.get(0).getEmBrand());
							jourDeviceWarning.setJdwSn(emAlarmList.get(0).getEmDeviceSn());
							jourDeviceWarning.setJdwType(3);
							jourDeviceWarning.setJdwHandleStatus("未处理");
							jourDeviceWarning.setJdwWarningTime(emAlarmList.get(0).getEmTime());
							Integer num = jourDeviceWarningService.insertDeviceWarning(jourDeviceWarning);
						}

					}

					if(list2.size() != 0 ){
                        for (int j = 0; j < list2.size(); j++) {
                            SmokeAlertEvents smokeAlertEvents2 = new SmokeAlertEvents();
                            smokeAlertEvents2.setSaDeviceSn(devSn);
                            smokeAlertEvents2.setSaWarningStatus(list2.get(j).getSaWarningStatus());
                            smokeAlertEvents2.setSaHandleStatus("已知晓");
                            Integer result1 = mapper.updateAlarmRecord(smokeAlertEvents2);
                            sqlSession.commit();
                            sqlSession.close();

                            if(state){
                                jourDeviceWarning.setJdwDevId(list.get(i).getId());
                                jourDeviceWarning.setJdwBrand(list2.get(0).getSaBrand());
                                jourDeviceWarning.setJdwSn(list2.get(0).getSaDeviceSn());
                                jourDeviceWarning.setJdwType(0);
                                jourDeviceWarning.setJdwHandleStatus("未处理");
                                jourDeviceWarning.setJdwWarningTime(list2.get(0).getSaTime());
                                jourDeviceWarning.setJdwFailureCause(list2.get(j).getSaWarningStatus());
                                Integer result2 = jourDeviceWarningService.insertDeviceWarning(jourDeviceWarning);
                            }
                        }
					}
					sqlSession.close();
				}
			}
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "获取预警记录系统异常 ！", null));
		}
	}


	public String queryAlarmRecord(){
		try{
			List<JourDevice> list = jourDeviceWarningService.selectAlarmRecord(jourDevice);
			if(list.size() != 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的设备！", null));
			}
		}catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
		
	}
	public String queryAlarmRecordCount(){
		try{
			List<JourDevice> list = jourDeviceWarningService.queryAlarmRecordCount(jourDevice);
			if(list.size() != 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的设备！", null));
			}
		}catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	public static JSONObject deepMerge(JSONObject source, JSONObject target) throws JSONException {
        for (String key: source.keySet()) {
        }
        for (String key: source.keySet()) {
            Object value = source.get(key);
            if (!target.containsKey(key)) {
                // new value for "key":
                target.put(key, value);
            } else {
                // existing value for "key" - recursively deep merge:
                if (value instanceof JSONObject) {
                    JSONObject valueJson = (JSONObject)value;
                    deepMerge(valueJson, target.getJSONObject(key));
                } else {
                    target.put(key, value);
                }
            }
        }
        return target;
    }

	public String unprocessedAlarm(){
		try{
			List<JourDevice> list = jourDeviceWarningService.selectDevice(jourDevice);
			JSONArray jsonlist2 = (JSONArray) JSON.toJSON(list);
            if(list.size() != 0){
                JSONArray jsonlist = new JSONArray();
                SysVariables record = new SysVariables();
                record.setVariablesId(1);
                List<SysVariables> variables = sysVariablesService.selectByPrimaryKey(record);
                Integer waterDailyVariable = variables.get(0).getWaterDailyVariable();//水日用量差距变量
                for (int i = 0; i < list.size(); i++) {
//                    String devSn = list.get(i).getJdwSn();
					JourDeviceWarning jourDeviceWarning = new JourDeviceWarning();
					jourDeviceWarning.setJdwSn(list.get(i).getJdwSn());
					int count = jourDeviceWarningService.selectCountAlarmRecord(jourDeviceWarning);//当天预警次数
					InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
					infoHouse4rentExpand.setHrHouse4storeId(list.get(i).getHsId());
					infoHouse4rentExpand.setHrState("正常和正办理退房");
					//查询已租房
					List<InfoHouse4rentExpand> list3 = houseForRentService.queryHouseRentCommon(infoHouse4rentExpand);
					if (list3.size() != 0){
						InfoRenterExpand infoRenterExpand = new InfoRenterExpand();
						infoRenterExpand.setRenterId(list3.get(0).getHrRenterId());
						//查询租客姓名，电话
						List<InfoRenterExpand> renterList= renterService.selectHouseRentName(infoRenterExpand);
						JSONArray jsonrenterList = (JSONArray) JSON.toJSON(renterList);
						
						//查询住户
						InfoResidentTable infoResidentTable = new InfoResidentTable();
						infoResidentTable.setRtHrId(list3.get(0).getHrId());
						infoResidentTable.setRtType("在住");
						List<InfoResidentTable> residentList = residentTableService.selectByPrimaryKey(infoResidentTable);
						
						jsonrenterList.getJSONObject(0).put("residentCount", residentList.size());
						jsonrenterList.getJSONObject(0).put("count", count);
						jsonrenterList.getJSONObject(0).put("waterDailyVariable", waterDailyVariable);
//						jsonlist.add(deepMerge(jsonlist2.getJSONObject(i),jsonrenterList.getJSONObject(0)));
						jsonlist.add(deepMerge(jsonrenterList.getJSONObject(0),jsonlist2.getJSONObject(i)));
					}else if(list.get(i).getHsLeaseState().equals("短租房")){
						//查住户数量
						JourShortRentContract jourShortRentContract = new JourShortRentContract();
						jourShortRentContract.setJsrcHsId(list.get(i).getHsId());
						jourShortRentContract.setJsrcState("已住");
						List<JourShortRentContract> jsrc = jourShortRentContractService.selectRenter(jourShortRentContract);
						if(jsrc.size() == 0){
							jsonlist2.getJSONObject(i).put("count", count);
							jsonlist2.getJSONObject(i).put("waterDailyVariable", waterDailyVariable);
							jsonlist.add(jsonlist2.getJSONObject(i));
						}else{
							//查短租客
							InfoRenterExpand infoRenterExpand = new InfoRenterExpand();
							infoRenterExpand.setRenterId(jsrc.get(0).getJsrcRenterId());
							//查询租客姓名，电话
							List<InfoRenterExpand> renterList= renterService.selectHouseRentName(infoRenterExpand);
							JSONArray jsonrenterList = (JSONArray) JSON.toJSON(renterList);

							jsonrenterList.getJSONObject(0).put("residentCount", jsrc.size());
							jsonrenterList.getJSONObject(0).put("count", count);
							jsonrenterList.getJSONObject(0).put("waterDailyVariable", waterDailyVariable);
                            jsonlist.add(deepMerge(jsonrenterList.getJSONObject(0),jsonlist2.getJSONObject(i)));
						}
					}else{
						jsonlist2.getJSONObject(i).put("count", count);
						jsonlist2.getJSONObject(i).put("waterDailyVariable", waterDailyVariable);
						jsonlist.add(jsonlist2.getJSONObject(i));
					}
					
				}
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", jsonlist.toString()));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无警情！", null));
			}
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
		
	}
	
	public String handleAlarm(){
		try{
			HttpSession session = ServletActionContext.getRequest().getSession();
			String coId= (String)session.getAttribute("coId");
			JourDeviceWarning jourDeviceWarning = new JourDeviceWarning();
			jourDeviceWarning.setCoId(coId);
			jourDeviceWarning.setId(jourDevice.getJdwId());
			jourDeviceWarning.setJdwHandleStatus("已处理");
			int result = jourDeviceWarningService.updateByPrimaryKeySelective(jourDeviceWarning);
			if(result==-1){
                printlnOfJson(CommonMethodClass.jsonData(-1, "请检查安防网关是否在线", null));
            }else if(result==-2){
                printlnOfJson(CommonMethodClass.jsonData(-1, "请检查设备是否在线", null));
            }else if(result>0){
				printlnOfJson(CommonMethodClass.jsonData(0, "修改成功", null));
			}
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
	
	public String getDeviceWarning() {
		try{
			StatDeviceWarning statDeviceWarning = new StatDeviceWarning();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.DATE, 1);//-1.昨天时间 0.当前时间 1.明天时间 *以此类推
			String time1 = sdf.format(c.getTime());
			statDeviceWarning.setEndTime(time1);
			c.add(Calendar.DATE, -6);//-1.昨天时间 0.当前时间 1.明天时间 *以此类推
			String time2 = sdf.format(c.getTime());
			statDeviceWarning.setStartTime(time2);
			List<StatDeviceWarning> stats = statDeviceWarningService.selectDeviceWarning(statDeviceWarning);
			if(stats != null){
				String json = JSONUtil.serialize(stats);
	            printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
	public String getDeviceWarning2() {
		try{
			StatDeviceWarning statDeviceWarning = new StatDeviceWarning();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.DATE, 1);//-1.昨天时间 0.当前时间 1.明天时间 *以此类推
			String time1 = sdf.format(c.getTime());
			statDeviceWarning.setEndTime(time1);
			c.add(Calendar.DATE, -29);//-1.昨天时间 0.当前时间 1.明天时间 *以此类推
			String time2 = sdf.format(c.getTime());
			statDeviceWarning.setStartTime(time2);
			List<StatDeviceWarning> stats = statDeviceWarningService.selectDeviceWarning2(statDeviceWarning);
			if(stats != null){
				String json = JSONUtil.serialize(stats);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
	
	public void addProgress(){
		try {
			JourDeviceWarning jourDeviceWarning = new JourDeviceWarning();
			jourDeviceWarning.setId(jourDevice.getJdwId());
			List<JourDeviceWarning> jdwList = jourDeviceWarningService.selectToDayDetails(jourDeviceWarning);
			String jdwHandleResult = jdwList.get(0).getJdwHandleResult();
			
			JSONArray jsonList = new JSONArray();
			if(jdwHandleResult == null || jdwHandleResult == ""){
				jsonList.add(JSON.parse(jourDevice.getJson()));
			}else{
				jsonList = JSON.parseArray(jdwHandleResult);
				jsonList.add(JSON.parse(jourDevice.getJson()));
			}
			jourDeviceWarning.setJdwHandleResult(jsonList.toJSONString());
			int result = jourDeviceWarningService.updateByPrimaryKeySelective(jourDeviceWarning);
			if(result == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "添加进展失败！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
	}
	
	public void selectProgress(){
		try {
			JourDeviceWarning jourDeviceWarning = new JourDeviceWarning();
			jourDeviceWarning.setId(jourDevice.getJdwId());
			List<JourDeviceWarning> jdwList = jourDeviceWarningService.selectToDayDetails(jourDeviceWarning);
			if(jdwList.size() != 0){
				String json = JSONUtil.serialize(jdwList);
	            printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到跟进记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
	}
	public String queryAlarmFrequency(){
		try{
			List<JourDevice> list = jourDeviceWarningService.queryAlarmFrequency();
			if(list.size() != 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的设备！", null));
			}
		}catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
	/*查询设备在线情况*/
	public String equipmentCondition(){

        try {
			SqlSession sqlSession1 = MySqlSessionFactory.newSqlSessionFactory().openSession();
			DevFirstTypeMapper mapper1 = sqlSession1.getMapper(DevFirstTypeMapper.class);
			List<DevFirstType> devFirstTypes = mapper1.selectPolice();
			JSONArray jsonArray = new JSONArray();
			for (int i=0;i<devFirstTypes.size();i++){

				int dft_id = devFirstTypes.get(i).getDft_id();
				JourDevice jourDevice = new JourDevice();
				jourDevice.setDevFirstType(dft_id);
				List<JourDevice> jourDevices = jourDeviceWarningService.selectPolice(jourDevice);
				System.out.println("设备信息");
				System.out.println(jourDevices.size());
				System.out.println(jourDevices);
				int sdwOnline = 0;//设备在线数量
				int sdwOffline = 0;//设备离线数量
				int sdwWarning = 0;//设备报警数量
				int sumJourDevice = 0;//设备总数
				JSONObject object = new JSONObject();
				if(null != jourDevices && jourDevices.size()>0){
					//查询电表电箱
                    if(devFirstTypes.get(i).getDft_id() ==15){
                        for(int j=0;j<jourDevices.size();j++){
                            //转库查警情记录
                            SqlSession sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession();
                            ElectricMeterEventsMapper mapper = sqlSession.getMapper(ElectricMeterEventsMapper.class);
                            ElectricMeterEvents electricMeterEvents = new ElectricMeterEvents();
                            electricMeterEvents.setEmDeviceSn(jourDevices.get(j).getDevSn());
                            List<ElectricMeterEvents> list2 = mapper.queryDeviceMessage(electricMeterEvents);
                            if(null != list2){
                                for (int m = 0 ; m < list2.size(); m++){
                                    if("在线".equals(list2.get(m).getEmOnline())){
                                        sdwOnline += 1;
                                    }else if ("离线".equals(list2.get(m).getEmOnline())){
                                        sdwOffline += 1;
                                    }
//                                    if(list2.get(m).getEmWarningStatus().equals("报警")){
//                                        sdwWarning += 1;
//                                    }
                                }
                            }
                            sqlSession.close();
                        }
                        sumJourDevice = Integer.parseInt(jourDevices.get(0).getCount()) - sdwOnline;
                        object.put("deviceName",devFirstTypes.get(i).getDft_name());
                        object.put("sdwOnline",sdwOnline);
                        object.put("sdwOffline",sdwOffline);
                        object.put("sdwWarning",sdwWarning);
                        object.put("count",jourDevices.get(0).getCount());
                        object.put("sumJourDevice",sumJourDevice);
                        jsonArray.add(object);
                    }else if(devFirstTypes.get(i).getDft_id() ==16){
						for(int j=0;j<jourDevices.size();j++){
							if(23 == jourDevices.get(j).getDevBrandId()){
								Map<String, String> map = new HashMap<String, String>();
								map.put("mac", jourDevices.get(j).getDevSn());
								map.put("projectCode",jourDevices.get(j).getDevId());
								String responseText = HttpRequestUtil.post("http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus", map);
								net.sf.json.JSONObject jsonObject = net.sf.json.JSONObject.fromObject(responseText);
								String body = jsonObject.getString("body");
								net.sf.json.JSONArray jsonArray1 = net.sf.json.JSONArray.fromObject(body);
								if(jsonArray1.size()>0){
									net.sf.json.JSONObject object1 = jsonArray1.getJSONObject(0);
									boolean online = object1.getBoolean("online");
									String alarm = object1.getString("alarm");
									if(online){
										sdwOnline += 1;
									}else{
										sdwOffline += 1;
									}
									if(!"0".equals(alarm)){
										sdwWarning += 1;
									}
								}else{
									sdwOffline += 1;
								}
							}
						}
						sumJourDevice = Integer.parseInt(jourDevices.get(0).getCount()) - sdwOnline;
						object.put("deviceName",devFirstTypes.get(i).getDft_name());
						object.put("sdwOnline",sdwOnline);
						object.put("sdwOffline",sdwOffline);
						object.put("sdwWarning",sdwWarning);
						object.put("count",jourDevices.get(0).getCount());
						object.put("sumJourDevice",sumJourDevice);
						jsonArray.add(object);
						//查询水表
					}else if(devFirstTypes.get(i).getDft_id() ==14){
                        for(int j=0;j<jourDevices.size();j++){
                            //转库查警情记录
                            SqlSession sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession();
                            WaterElectricMeterMapper mapper = sqlSession.getMapper(WaterElectricMeterMapper.class);
                            WaterMeterEvents waterMeterEvents = new WaterMeterEvents();
                            waterMeterEvents.setWmDeviceSn(jourDevices.get(j).getDevSn());
                            List<WaterMeterEvents> list2 = mapper.queryDeviceMessage(waterMeterEvents);
                            if(null != list2){
                                for (int m = 0 ; m < list2.size(); m++){
                                    if("在线".equals(list2.get(m).getWmOnline())){
                                        sdwOnline += 1;
                                    }else if ("离线".equals(list2.get(m).getWmOnline())){
                                        sdwOffline += 1;
                                    }
                                    if("报警".equals(list2.get(m).getWmWarningContent())){
                                        sdwWarning += 1;
                                    }
                                }
                            }
                            sqlSession.close();
                        }
                        sumJourDevice = Integer.parseInt(jourDevices.get(0).getCount()) - sdwOnline;
                        object.put("deviceName",devFirstTypes.get(i).getDft_name());
                        object.put("sdwOnline",sdwOnline);
                        object.put("sdwOffline",sdwOffline);
                        object.put("sdwWarning",sdwWarning);
                        object.put("count",jourDevices.get(0).getCount());
                        object.put("sumJourDevice",sumJourDevice);
                        jsonArray.add(object);
                        //得到智慧公寓锁的设备情况
                    }else if(devFirstTypes.get(i).getDft_id() ==24){
                    	for (int j=0;j<jourDevices.size();j++){
							String sn = jourDevices.get(j).getDevSn();
							Map<String, String> map = new HashMap<String, String>();
							map.put("sns", sn);
							String responseText = HttpRequestUtil.post(POSTURL, map);
							net.sf.json.JSONObject jsonObject = net.sf.json.JSONObject.fromObject(responseText);
							String body = jsonObject.getString("body");
							net.sf.json.JSONArray jsonArray1 = net.sf.json.JSONArray.fromObject(body);
							if(jsonArray1.size()>0){
								net.sf.json.JSONObject object1 = jsonArray1.getJSONObject(0);
								boolean online = object1.getBoolean("online");
								String status = object1.getString("status");
								String substring = status.substring(4, 6);
								if(online){
									sdwOnline += 1;
								}else{
									sdwOffline += 1;
								}
								if("06".equals(substring)||"07".equals(substring)||"08".equals(substring)){
									sdwWarning += 1;
								}
							}else{
								sdwOffline += 1;
							}
						}
						sumJourDevice = Integer.parseInt(jourDevices.get(0).getCount()) - sdwOnline;
						object.put("deviceName",devFirstTypes.get(i).getDft_name());
						object.put("sdwOnline",sdwOnline);
						object.put("sdwOffline",sdwOffline);
						object.put("sdwWarning",sdwWarning);
						object.put("count",jourDevices.get(0).getCount());
						object.put("sumJourDevice",sumJourDevice);
						jsonArray.add(object);

					}else{
                        for(int j=0;j<jourDevices.size();j++){
                            //转库查警情记录
                            /*SqlSession sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession();
                            SmokeAlertEventsMapper mapper = sqlSession.getMapper(SmokeAlertEventsMapper.class);
                            SmokeAlertEvents smokeAlertEvents = new SmokeAlertEvents();
                            smokeAlertEvents.setSaDeviceSn(jourDevices.get(j).getDevSn());*/

							String sn = jourDevices.get(j).getDevSn();
							Map<String, String> map = new HashMap<String, String>();
							map.put("sns", sn);
							String responseText = HttpRequestUtil.post(POSTURL, map);
							net.sf.json.JSONObject jsonObject = net.sf.json.JSONObject.fromObject(responseText);
							String body = jsonObject.getString("body");
							net.sf.json.JSONArray jsonArray1 = net.sf.json.JSONArray.fromObject(body);
							if(jsonArray1.size()>0){
								net.sf.json.JSONObject object1 = jsonArray1.getJSONObject(0);
								boolean online = object1.getBoolean("online");
								String status = object1.getString("status");
								if("0001".equals(status)){
									sdwOffline += 1;
								}else{
									String substring = status.substring(12, 16);
									String substring2 = status.substring(0, 4);
									System.out.println(sn.substring(0,6));
									if("2C5253".equals(sn.substring(0,6))){
										if(online){
											sdwOnline += 1;
										}else{
											sdwOffline += 1;
										}
										if("4040".equals(substring)||"2020".equals(substring)){
											sdwWarning += 1;
										}
									}else if("155253".equals(sn.substring(0,6))){
										if(online){
											sdwOnline += 1;
										}else{
											sdwOffline += 1;
										}
										if("4040".equals(substring)||"2020".equals(substring)){
											sdwWarning += 1;
										}
									}else{
										if("0004".equals(substring2)){
											if(online){
												sdwOnline += 1;
											}else{
												sdwOffline += 1;
											}
											if("4040".equals(substring)||"2020".equals(substring)|| "8080".equals(substring)){
												sdwWarning += 1;
											}
										}else{
											if(online){
												sdwOnline += 1;
											}else{
												sdwOffline += 1;
											}
											if("4040".equals(substring)||"2020".equals(substring)|| "8080".equals(substring)){
												sdwWarning += 1;
											}
										}

									}
								}
							}else{
								sdwOffline += 1;
							}
                            /*List<SmokeAlertEvents> list2 = mapper.queryDeviceMessage(smokeAlertEvents);
                            for (int m = 0 ; m < list2.size(); m++){
                                if("在线".equals(list2.get(m).getSaDeviceStatus())){
                                    sdwOnline += 1;
                                }else if ("离线".equals(list2.get(m).getSaDeviceStatus())){
                                    sdwOffline += 1;
                                }
                                if(("报警").equals(list2.get(m).getSaDeviceStatus())){
                                    sdwWarning += 1;
                                }
                            }*/
//                            sqlSession.close();
                        }
						sumJourDevice = Integer.parseInt(jourDevices.get(0).getCount()) - sdwOnline;
						object.put("deviceName",devFirstTypes.get(i).getDft_name());
						object.put("sdwOnline",sdwOnline);
						object.put("sdwOffline",sdwOffline);
						object.put("sdwWarning",sdwWarning);
						object.put("count",jourDevices.get(0).getCount());
						object.put("sumJourDevice",sumJourDevice);
						jsonArray.add(object);
                    }
				}

			}
            sqlSession1.close();
            printlnOfJson(CommonMethodClass.jsonData(1, "成功", jsonArray.toString()));

        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
        return null;
    }
}
