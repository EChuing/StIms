package com.zz.actions.cs;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.cs.CsGoodsDiscount;
import com.zz.service.cs.CsGoodsDiscountService;

public class CsGoodsDiscountAction extends BaseAction implements ModelDriven<CsGoodsDiscount>{
	
	private CsGoodsDiscount csGoodsDiscount;
	
	private CsGoodsDiscountService csGoodsDiscountService;
	
	public void setCsGoodsDiscountService(CsGoodsDiscountService csGoodsDiscountService) {
		this.csGoodsDiscountService = csGoodsDiscountService;
	}


	@Override
	public CsGoodsDiscount getModel() {
		if(csGoodsDiscount==null){
			csGoodsDiscount = new CsGoodsDiscount();
		}
		return csGoodsDiscount;
	}
	
	public void insertCsGoodsDiscount(){
		try {
			int result = csGoodsDiscountService.insertSelective(csGoodsDiscount);
			if(result > 0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
			}
			
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void listCsGoodsDiscount(){
		try {
			List<CsGoodsDiscount> list = csGoodsDiscountService.selectByPrimaryKey(csGoodsDiscount);
			if(list.size() > 0){
				String json = JSON.toJSONString(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void updateDiscount(){
		try {
			int result = csGoodsDiscountService.updateByPrimaryKeySelective(csGoodsDiscount);
			if(result > 0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else if(result == -1){
				printlnOfJson(CommonMethodClass.jsonData(-1, "启用失败，已经有相同种类的优惠启用", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-2, "修改失败", null));
			}
			
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	

}
