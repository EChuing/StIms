package com.zz.actions.cs;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.cs.CsGoodsPurchase;
import com.zz.service.cs.CsGoodsPurchaseService;

public class CsGoodsPurchaseAction extends BaseAction implements ModelDriven<CsGoodsPurchase>{
	private CsGoodsPurchase csGoodsPurchase;
	
	private CsGoodsPurchaseService csGoodsPurchaseService;
	
	public void setCsGoodsPurchaseService(CsGoodsPurchaseService csGoodsPurchaseService) {
		this.csGoodsPurchaseService = csGoodsPurchaseService;
	}

	@Override
	public CsGoodsPurchase getModel() {
		if(csGoodsPurchase==null){
			csGoodsPurchase = new CsGoodsPurchase();
		}
		return csGoodsPurchase;
	}
	
	public void listPurchaseOrder(){
		try {
			List<CsGoodsPurchase> list = csGoodsPurchaseService.listGoodsPurchase(csGoodsPurchase);
			if(list.size() > 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void getPurchaseMoney(){
		try {
			CsGoodsPurchase result = csGoodsPurchaseService.getPurchaseMoney(csGoodsPurchase);
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
}
