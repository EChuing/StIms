package com.zz.actions.cs;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.cs.CsGoodsBilling;
import com.zz.service.cs.CsGoodsBillingService;

public class CsGoodsBillingAction extends BaseAction implements ModelDriven<CsGoodsBilling>{
	private CsGoodsBilling csGoodsBilling;
	@Override
	public CsGoodsBilling getModel() {
		if(csGoodsBilling==null){
			csGoodsBilling = new CsGoodsBilling();
		}
		return csGoodsBilling;
	}
	
	public void setCsGoodsBillingService(CsGoodsBillingService csGoodsBillingService) {
		this.csGoodsBillingService = csGoodsBillingService;
	}
	
	private CsGoodsBillingService csGoodsBillingService;
	
	public void listOrder(){
		try {
			List<CsGoodsBilling> list = csGoodsBillingService.listOrder(csGoodsBilling);
			if(list.size() > 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void operatingOrder(){
		try {
			List<CsGoodsBilling> list = csGoodsBillingService.operatingOrder(csGoodsBilling);
			if(list.size() > 0){
				String msg = "";
				if(csGoodsBilling.getType() == 1){
					msg = "接单成功";
				}else if(csGoodsBilling.getType() == 2){
					msg = "开始配送";
				}else if(csGoodsBilling.getType() == 3){
					msg = "退单成功";
				}else if(csGoodsBilling.getType() == 4){
					msg = "结单成功";
				}else if(csGoodsBilling.getType() == 5){
					msg = "发货成功";
				}
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, msg, json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void createBill(){
		try {
			String key = CommonMethodClass.getSessionByKey("wxKey");
			String mch_id = CommonMethodClass.getSessionByKey("wxMerchantNumber");
			csGoodsBilling.setKey(key);
			csGoodsBilling.setMch_id(mch_id);
			Result<String> result = csGoodsBillingService.createBilling(csGoodsBilling);
			printlnOfJson(CommonMethodClass.jsonData(result.getCode(), result.getMsg(), result.getBody()));
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "支付失败", null));
		}
	}
	
	public void getOrderCount(){
		try {
			CsGoodsBilling result = csGoodsBillingService.getOrderCount(csGoodsBilling);
			if(result != null){
				String json = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "查询失败", null));
			} 
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void getShopMoney(){
		try {
			CsGoodsBilling result = csGoodsBillingService.getMoneyTotal(csGoodsBilling);
			if(result != null){
				String json = JSON.toJSONString(result);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "查询失败", null));
			} 
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void getProfit(){
		try {
			CsGoodsBilling result = csGoodsBillingService.getProfit(csGoodsBilling);
			if(result != null){
				String json = JSON.toJSONString(result);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "查询失败", null));
			} 
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void createPurchaseBill(){
		try {
			Result<String> result = csGoodsBillingService.createPurchaseBilling(csGoodsBilling);
			printlnOfJson(CommonMethodClass.jsonData(result.getCode(), result.getMsg(), result.getBody()));
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "支付失败", null));
		}
	}
	
	public void updatePurchaseBill(){
		try {
			int result = csGoodsBillingService.updateByPrimaryKeySelective(csGoodsBilling);
			if(result == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改订单失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}

	public void exchangeGoods(){
		try {
			Result<String> result = csGoodsBillingService.exchangeGoods(csGoodsBilling);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
}
