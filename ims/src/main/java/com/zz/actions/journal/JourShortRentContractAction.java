package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourShortRentContract;
import com.zz.service.journal.DeviceService;
import com.zz.service.journal.JourShortRentContractService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;



public class JourShortRentContractAction extends BaseAction implements ModelDriven<JourShortRentContract>{

	private final static String POSTURL = "http://www.fangzhizun.com/device/Interface/QueryDeviceStatus2";
	
	private JourShortRentContract jourShortRentContract;


	private JourShortRentContractService jourShortRentContractService;
	
	
	@Autowired
	private DeviceService deviceService;
	
	public void setJourShortRentContractService(JourShortRentContractService jourShortRentContractService) {
		this.jourShortRentContractService = jourShortRentContractService;
	}
	
	@Override
	public JourShortRentContract getModel() {
		if (jourShortRentContract==null){
			jourShortRentContract = new JourShortRentContract();
		}
		return jourShortRentContract;
	}
	

	public void insertShortRent(){
		try {
			Result<String> result = jourShortRentContractService.insertShortRent(jourShortRentContract);
			if(result.getCode() == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(result.getCode(), result.getMsg(), null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	
	//查询设备
	public void selectDeviceStatus(){
		String responseText="";
		try {
			int jhdHsId = jourShortRentContract.getJsrcHsId();
			System.out.println("+++++++++++++++++++++++++++++++++++++"+jhdHsId);
			List<JourDevice> result = deviceService.selectDeviceStatus(jhdHsId);
			System.out.println(result);
			if(!"".equals(result)){
				JSONArray jsonArray = new JSONArray();
				for(int i=0;i<result.size();i++){
					String devAuthId =result.get(i).getDevAuthId();
					System.out.println(devAuthId);
					
					//SN码查询设备状态
					Map<String, String> map = new HashMap<String, String>();
					map.put("sns",devAuthId);
					responseText = HttpRequestUtil.post(POSTURL, map);
					System.out.println("****"+responseText);
					JSONObject jsonObject = JSONObject.fromObject(responseText);
					JSONArray body= JSONArray.parseArray(jsonObject.get("body").toString());
					
					System.out.println("--------"+body);
					
					if(body.size()!=0){
						jsonArray.add(body.get(0));
					}
				}
				String resultStr = JSON.toJSONString(jsonArray,SerializerFeature.WriteMapNullValue);
				printlnOfJson(resultStr);
			}
		}catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
			
	}
	

	public void sceneCheckIn(){
		try {
			Result<String> result = jourShortRentContractService.sceneCheckIn(jourShortRentContract);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	
	public void retainCheckIn(){
		try {
			Result<String> result = jourShortRentContractService.retainCheckIn(jourShortRentContract);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	
	public void listShortRentContract(){
		try {
			List<JourShortRentContract> list = jourShortRentContractService.listJourShortRentContractByHsIdList(jourShortRentContract);
			if(list.size() > 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到数据", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2,"系统异常", null));
		}
	}
	//住房生成维保任务
	public void housingCleaning(){
		try {
			String result = jourShortRentContractService.housingCleaning(jourShortRentContract);
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1,"添加维保失败",null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	
		
	}
	//退房
	public void checkOutShortRent(){
		try {
			String result = jourShortRentContractService.checkOutShortRent(jourShortRentContract);
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1,"退房失败",null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	
	public void updateShortRent(){
		try {
			Result<List<JourShortRentContract>> result = jourShortRentContractService.updateShortRent(jourShortRentContract);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	
	public void changeShortRentHouse(){
		try {
			Result<String> result = jourShortRentContractService.changeShortRentHouse(jourShortRentContract);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	
	//批量换房
	public void updateRoom(){
		try {
			Result<List<JourShortRentContract>> result = jourShortRentContractService.updateRoom(jourShortRentContract);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}

	public void checkInShortRent(){
		try {
			String result = jourShortRentContractService.checkInShortRent(jourShortRentContract);
			if("-1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(-1,"退房失败",null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", result));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	public void selectJourShortRentContract(){
		try {
			Result<List<JourShortRentContract>> result = jourShortRentContractService.selectJourShortRentContract(jourShortRentContract);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	
	//批量插入保留订单
	public void inserRetainHandle(){
		try {
			Result<String> result = jourShortRentContractService.insertList(jourShortRentContract);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	//获取微信新下单
	public void queryNewOrder(){
		try {
			List<JourShortRentContract> list = jourShortRentContractService.queryNewOrder(jourShortRentContract);
			if(list.size() > 0){
				String json = JSON.toJSONString(list.get(0),SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有新的微信订单", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	//修改微信订单状态
	public void orderTakingShortRent(){
		try {
			jourShortRentContract.setJsrcOrderState(1);
			int result = jourShortRentContractService.updateShortRentContract(jourShortRentContract);
			if(result > 0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改微信订单状态失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}

}