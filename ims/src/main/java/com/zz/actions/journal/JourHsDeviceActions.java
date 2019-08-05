package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.datasource.Brand;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourHsDevice;
import com.zz.service.journal.DeviceService;
import com.zz.service.journal.JourHsDeviceService;
import com.zz.service.journal.JourHsOfficeService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JourHsDeviceActions extends BaseAction implements ModelDriven<JourHsDevice> {
	private final static String POSTURL = "http://www.fangzhizun.com/device/Interface/QueryDeviceStatus2";

	private JourHsDevice jourHsDevice;
	private JourHsDeviceService jourHsDeviceService;
	private DeviceService deviceService;
	@Autowired
	private JourHsOfficeService jourHsOfficeService;
	
	public void setDeviceService(DeviceService deviceService) {
		this.deviceService = deviceService;
	}

	public void setJourHsDevice(JourHsDevice jourHsDevice) {
		this.jourHsDevice = jourHsDevice;
	}

	public void setJourHsDeviceService(JourHsDeviceService jourHsDeviceService) {
		this.jourHsDeviceService = jourHsDeviceService;
	}

	@Override
	public JourHsDevice getModel() {
		if(jourHsDevice == null){
			jourHsDevice = new JourHsDevice();
		}
		return jourHsDevice;
	}
	//通过未租id查询租客的Guid
	public void  seleceGuidByHsId(){
		try{
			jourHsDevice.getJhdHsId();
			jourHsDevice.getDevId();
			List<JourDevice> list =jourHsDeviceService.seleceGuidByHsId(jourHsDevice);
			if(list!=null){
			String json = JSONUtil.serialize(list);
			printlnOfJson(CommonMethodClass.jsonData(1, "查询成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "无数据", null));
			}
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
	}

    //删除未租与设备对应关系
	public void deletetHsDevice(){
		try{
		Integer delresult=jourHsDeviceService.delHsDevice(jourHsDevice);
		jourHsDevice.getJhdHsId();
		jourHsDevice.getDevId();
			if(delresult==1){
				printlnOfJson(CommonMethodClass.jsonData(1, "删除成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(0, "删除失败", null));
			}
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}

	}
	//添加未租与设备ID
	public String insertHsDevice(){
		List<JourHsDevice> list = new ArrayList<JourHsDevice>();
		try{
			String jhdDeviceIdJson = jourHsDevice.getJhdDeviceIdJson();
			JSONArray jsa =JSONArray.fromObject(jhdDeviceIdJson);
			for(Object a : jsa){
				JSONObject jsonObj = (JSONObject)a;
				JourHsDevice jf = (JourHsDevice) JSONObject.toBean(jsonObj, JourHsDevice.class);
				list.add(jf);
			}
			JourDevice jd=new JourDevice();
			jd.setJhdDeviceId(Integer.parseInt(jsa.getJSONObject(0).getString("jhdDeviceId")));
			List<JourDevice> jourDeviceList=deviceService.selectDeviceIdData(jd);//判断设备是否已绑定房间
			int result=0;
			if (jourDeviceList.size()>0){//存在绑定关系
				printlnOfJson(CommonMethodClass.jsonData(-3, "该设备已绑定其他房间", null));
			}else{//不存在绑定关系，新增绑定关系
				result = jourHsDeviceService.insertList(list);
			}
			String company =  (String) ActionContext.getContext().getSession().get("company");
			if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }else{
				for (int i = 0; i < jsa.size(); i++) {
					JSONObject jsonObj = JSONObject.fromObject(jsa.get(i));
					JourDevice jourDevice = new JourDevice();
					jourDevice.setId(jsonObj.getInt("jhdDeviceId"));
					jourDevice.setDevSpare2(jourHsDevice.getCo()+jsonObj.getInt("jhdHsId"));
					int result2 = deviceService.updateById(jourDevice);
				}
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
		}catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	//添加未租与设备ID
	public String insertHsdevice(){
		try{
			int result = jourHsDeviceService.insertHsDevice(jourHsDevice);
			if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	public void delDeviceHouse() {

	}

	public String selectThisHouseDeviceID(){
		try{
			List<JourDevice> list = deviceService.selectDeviceStatus(jourHsDevice.getJhdHsId());
			List<JourDevice> jourDevices = deviceService.selectCommon(jourHsDevice.getJhdHsId());
			List<JourDevice> list2 = null;
			if(jourDevices.size()>0){
				for (JourDevice jd1: jourDevices){
					for(JourDevice jd2 : list){
						if(jd1.getId().equals(jd2.getId())){
						}else{
							list.add(jd1);
							break;
						}
					}
				}
			}
			if (list.size()!=0) {
				JSONArray allBrand=JSONArray.fromObject(CommonMethodClass.getSessionBrandInfo());
				for(int i = 0; i < list.size(); i++ ){
					for(int j = 0; j < allBrand.size(); j++) {
						Object obj = allBrand.get(j);
						JSONObject jsonObject = JSONObject.fromObject(obj);
						Brand brand = (Brand) JSONObject.toBean(jsonObject, Brand.class);
						if(brand.getBrandId().equals(list.get(i).getDevBrandId())){
							list.get(i).setBrandModel(brand.getBrandModel());
							list.get(i).setBrandType(brand.getBrandType());
							list.get(i).setBrandName(brand.getBrandName());
						}
					}
				}
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到设备信息！", null));
			}

			//List<JourHsDevice> list = jourHsDeviceService.selectThisHouseDeviceID(jourHsDevice.getJhdHsId());
			/*System.out.println(list);
			List<String> idArray = new ArrayList<String>();
			if (list.size()!=0) {
				for (int i = 0; i < list.size(); i++){
					idArray.add(String.valueOf(list.get(i).getJhdDeviceId()));
				}

				List<JourDevice> list2 = deviceService.selectThisHouseDevice(idArray);
				JSONArray allBrand=JSONArray.fromObject(CommonMethodClass.getSessionBrandInfo());
				if (list2.size()!=0) {
					for(int i = 0; i < list2.size(); i++ ){
						for(int j = 0; j < allBrand.size(); j++) {
							Object obj = allBrand.get(j);
					        JSONObject jsonObject = JSONObject.fromObject(obj);
					        Brand brand = (Brand) JSONObject.toBean(jsonObject, Brand.class);
					        if(brand.getBrandId().equals(list2.get(i).getDevBrandId())){
								list2.get(i).setBrandModel(brand.getBrandModel());
								list2.get(i).setBrandType(brand.getBrandType());
								list2.get(i).setBrandName(brand.getBrandName());
							}
						}
					}
					String json = JSONUtil.serialize(list2);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
				}else{
					printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到设备信息！", null));
				}
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到设备信息！", null));
			}*/
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	public String queryOfficeDevice() {
		try {
			List<Integer> devIds = jourHsOfficeService.selectDevIdByHsId(jourHsDevice.getJhdHsId());
			if (devIds.size() == 0) {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到设备信息！", null));
			}else{
				List<JourDevice> list2 = deviceService.selectThisHouseDevice(devIds);
				JSONArray allBrand = JSONArray.fromObject(CommonMethodClass.getSessionBrandInfo());
				if (list2.size() != 0) {
					for (int i = 0; i < list2.size(); i++) {
						for (int j = 0; j < allBrand.size(); j++) {
							Object obj = allBrand.get(j);
							JSONObject jsonObject = JSONObject.fromObject(obj);
							Brand brand = (Brand) JSONObject.toBean(jsonObject, Brand.class);
							if (brand.getBrandId().equals(list2.get(i).getDevBrandId())) {
								list2.get(i).setBrandModel(brand.getBrandModel());
								list2.get(i).setBrandType(brand.getBrandType());
								list2.get(i).setBrandName(brand.getBrandName());
							}
						}
					}
					String json = JSONUtil.serialize(list2);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
				}
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到设备信息！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	//获取云海设备状态
	public void queryDeviceStatus () {
		try {
			//SN码查询设备状态
			Map<String, String> map = new HashMap<String, String>();
			map.put("sns", jourHsDevice.getDevAuthId());
			String responseText = HttpRequestUtil.post(POSTURL, map);
			for (String key:map.keySet()) {
				System.out.println("key="+key+" value="+map.get(key) );
			}
			if(responseText==null||responseText==""){
				return;
			}
			JSONObject jsonObject = JSONObject.fromObject(responseText);
			if (jsonObject.get("body") == null) {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到设备信息！", null));
				return;
			}else if (jsonObject.getJSONArray("body").size() == 0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "设备没绑定！", null));
				return;
			}
			JourDevice jourDevice=deviceService.selectSingle(Integer.valueOf(jourHsDevice.getDevId()));
			if(jourDevice.getDevFirstType()!=null&&(jourDevice.getDevSecondType()==null||jourDevice.getDevSecondType()==0)){//修改设备二级类型
				JSONObject obj= JSONArray.fromObject(jsonObject.get("body")).getJSONObject(0);
				if(obj.getString("online")=="true"){
					Integer devSecondeType= deviceService.getDevSecondType(obj);
					jourDevice.setId(Integer.valueOf(jourHsDevice.getDevId()));
					jourDevice.setDevSecondType(devSecondeType);
					deviceService.updateById(jourDevice);
				}
			}
			com.alibaba.fastjson.JSONArray body = com.alibaba.fastjson.JSONArray.parseArray(jsonObject.get("body").toString());

			if (body.size() != 0) {
				String json = JSONUtil.serialize(body.get(0));
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到设备信息！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
	}




	//查询所有设备
	public void queryAllDevice(){
		try {
			Result<List<JourHsDevice>> result = jourHsDeviceService.queryAllDevice(jourHsDevice);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	//查询设备绑定房
	public void queryThisDeviceHouse(){
		try {
			JourDevice jourDevice = jourHsDeviceService.queryThisDeviceHouse(jourHsDevice);
			if (jourDevice != null) {
				String json = JSONUtil.serialize(jourDevice);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有绑定房屋信息！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
}
