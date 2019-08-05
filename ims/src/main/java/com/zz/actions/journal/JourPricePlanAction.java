package com.zz.actions.journal;

import java.util.List;

import com.zz.other.Syslog;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourPricePlan;
import com.zz.service.journal.JourPricePlanService;

public class JourPricePlanAction extends BaseAction implements ModelDriven<JourPricePlan>{
	private JourPricePlan jourPricePlan;
	
	@Autowired
	private JourPricePlanService jourPricePlanService;
	
	public void queryJourPricePlan(){
		try {
			Result<List<JourPricePlan>> result = jourPricePlanService.queryJourPricePlan(jourPricePlan);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void savePricePlan(){
		try {
			Result<String> result = jourPricePlanService.savePricePlan(jourPricePlan);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//批量修改方案状态
	public void batchUpdateJppState(){
		try {
			Result<String> result = jourPricePlanService.batchUpdateJppState(jourPricePlan);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	@Override
	public JourPricePlan getModel() {
		if (jourPricePlan==null){
			jourPricePlan = new JourPricePlan();
		}
		return jourPricePlan;
	}
}
