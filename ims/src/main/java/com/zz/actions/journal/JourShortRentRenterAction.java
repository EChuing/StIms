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
import com.zz.po.journal.JourShortRentContract;
import com.zz.po.journal.JourShortRentRenter;
import com.zz.service.journal.JourShortRentRenterService;

public class JourShortRentRenterAction extends BaseAction implements ModelDriven<JourShortRentRenter>{
	private JourShortRentRenter jourShortRentRenter;
	@Autowired
	private JourShortRentRenterService jourShortRentRenterService;
	
	@Override
	public JourShortRentRenter getModel() {
		if (jourShortRentRenter==null){
			jourShortRentRenter = new JourShortRentRenter();
		}
		return jourShortRentRenter;
	}
	//查询短租所有顾客
	public void listLivingCustomer(){
		try {
			List<JourShortRentRenter> list = jourShortRentRenterService.listLivingCustomer(jourShortRentRenter);
			System.out.println("list . size ==========" + list.size());
			if(list.size() > 0){
				String json = JSON.toJSONString(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "查询不到数据", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//查询短租所有顾客
	public void customerOrder(){
		try {
			Result<List<JourShortRentRenter>> result = jourShortRentRenterService.customerOrder(jourShortRentRenter);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	//查询短租的合约
	public void customerContractOrder(){
		try {
			Result<List<JourShortRentRenter>> result = jourShortRentRenterService.customerContractOrder(jourShortRentRenter);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}



}
