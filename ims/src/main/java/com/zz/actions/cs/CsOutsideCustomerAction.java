package com.zz.actions.cs;

import java.util.List;

import com.zz.other.Syslog;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.cs.CsOutsideCustomer;
import com.zz.service.cs.CsOutsideCustomerService;

public class CsOutsideCustomerAction extends BaseAction implements ModelDriven<CsOutsideCustomer>{
	private CsOutsideCustomer csOutsideCustomer;
	@Autowired
	private CsOutsideCustomerService csOutsideCustomerService;
	
	@Override
	public CsOutsideCustomer getModel() {
		if(csOutsideCustomer==null){
			csOutsideCustomer = new CsOutsideCustomer();
		}
		return csOutsideCustomer;
	}
	
	public void queryCustomer(){
		try{
			List<CsOutsideCustomer> list = csOutsideCustomerService.queryCustomer(csOutsideCustomer);
			/*for (int i = 0; i < list.size(); i++) {
				if (list.get(i).getCocContacts() == null || list.get(i).getCocContacts() == "" || list.get(i).getCocPhone() == null || list.get(i).getCocPhone() == ""){
					list.remove(i);
					i--;
				}
			}*/
			if(list.size() != 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的客户", null));
			}
		}catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void insertSelectiveCustomer(){
		try{
			int result = csOutsideCustomerService.insertSelective(csOutsideCustomer);
			if(result > 0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "添加客户失败", null));
			}
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	public void addProgressCustomer(){
		try {
			Integer cocId = csOutsideCustomer.getCocId();
			System.out.println(cocId);
			List<CsOutsideCustomer> cocList = csOutsideCustomerService.selectByPrimaryKey(cocId);
			System.out.println(cocList);
			String cocFollowUp2 = cocList.get(0).getCocFollowUp();
			System.out.println("cccccccccccc::::"+cocFollowUp2);
			JSONArray jsonList = new JSONArray();
			if(cocFollowUp2 == null || cocFollowUp2 == ""){
				jsonList.add(JSON.parse(csOutsideCustomer.getCsOutsideCustomerJson()));
			}else{
				jsonList = JSON.parseArray(cocFollowUp2);
				System.out.println(jsonList);
				jsonList.add(JSON.parse(csOutsideCustomer.getCsOutsideCustomerJson()));
				System.out.println(jsonList);
			}
			
			csOutsideCustomer.setCocFollowUp(jsonList.toJSONString());
//			System.out.println(csOutsideCustomer.getCocFollowUp());
			int result = csOutsideCustomerService.updateByPrimaryKeySelective(csOutsideCustomer);
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

	public void updateByPrimaryKeySelective(){
		try {
			int result = csOutsideCustomerService.updateByPrimaryKeySelective(csOutsideCustomer);
			if(result == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改campusMessageSwitch失败！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
	}
}
