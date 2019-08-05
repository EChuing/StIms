package com.zz.actions.cs;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.cs.CsGoodsCategory;
import com.zz.service.cs.CsGoodsCategoryService;

public class CsGoodsCategoryAction extends BaseAction implements ModelDriven<CsGoodsCategory>{
	private CsGoodsCategory csGoodsCategory;
	private CsGoodsCategoryService csGoodsCategoryService;
	
	public void setCsGoodsCategoryService(CsGoodsCategoryService csGoodsCategoryService) {
		this.csGoodsCategoryService = csGoodsCategoryService;
	}

	@Override
	public CsGoodsCategory getModel() {
		if(csGoodsCategory==null){
			csGoodsCategory = new CsGoodsCategory();
		}
		return csGoodsCategory;
	}
	
	public void listCsGoodsCategory(){
		try {
			List<CsGoodsCategory> list = csGoodsCategoryService.listGoodsCategory(csGoodsCategory);
			if(list.size() > 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有商品类别！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void insertCsGoodsCategory(){
		try {
			String result = csGoodsCategoryService.insertGoodsCategory(csGoodsCategory);
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, result, null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void updateCsGoodsCategory(){
		try {
			String result = csGoodsCategoryService.updateGoodsCategory(csGoodsCategory);
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, result, null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
}
