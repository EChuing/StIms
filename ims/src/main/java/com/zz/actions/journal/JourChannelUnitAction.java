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
import com.zz.po.journal.JourChannelUnit;
import com.zz.service.journal.JourChannelUnitService;

public class JourChannelUnitAction extends BaseAction implements ModelDriven<JourChannelUnit>{
	private JourChannelUnit jourChannelUnit;
	
	@Autowired
	private JourChannelUnitService jourChannelUnitService;
	
	public void queryJourChannelUnit(){
		try {
			Result<List<JourChannelUnit>> result = jourChannelUnitService.queryJourChannelUnit(jourChannelUnit);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//查询对应方案优秀级最高的渠道单位
	public void queryHighestLevelPlan(){
		try {
			Result<List<JourChannelUnit>> result = jourChannelUnitService.queryHighestLevelPlan(jourChannelUnit);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//修改或者添加渠道单位
	public void saveChannelUnit(){
		try {
			Result<String> result = jourChannelUnitService.saveChannelUnit(jourChannelUnit);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//查询签单人表
	public void queryJourSigningPeople(){
		try {
			Result<List<JourChannelUnit>> result = jourChannelUnitService.queryJourSigningPeople(jourChannelUnit);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//修改或者添加签单人
	public void saveSigningPeople(){
		try {
			Result<String> result = jourChannelUnitService.saveSigningPeople(jourChannelUnit);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	@Override
	public JourChannelUnit getModel() {
		if (jourChannelUnit==null){
			jourChannelUnit = new JourChannelUnit();
		}
		return jourChannelUnit;
	}
}
