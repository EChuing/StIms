package com.zz.actions.journal;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourShortRentSetUp;
import com.zz.service.journal.JourShortRentSetUpService;

public class JourShortRentSetUpAction extends BaseAction implements ModelDriven<JourShortRentSetUp>{

	private JourShortRentSetUp jourShortRentSetUp;
	
	private JourShortRentSetUpService jourShortRentSetUpService;
	
	
	public void setJourShortRentSetUpService(JourShortRentSetUpService jourShortRentSetUpService) {
		this.jourShortRentSetUpService = jourShortRentSetUpService;
	}

	
	public void updateSetUp(){
		try {
			Result<String> result = jourShortRentSetUpService.updateSetUp(jourShortRentSetUp);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			System.out.println(result);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}

	public void getSetUpInfo(){
		try {
			Result<String> result = jourShortRentSetUpService.getSetUpInfo(jourShortRentSetUp);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void deleteShortRentAdImg(){
		try {
			Result<String> result = jourShortRentSetUpService.deleteAdImg(jourShortRentSetUp);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	@Override
	public JourShortRentSetUp getModel() {
		if (jourShortRentSetUp==null){
			jourShortRentSetUp = new JourShortRentSetUp();
		}
		return jourShortRentSetUp;
	}

}
