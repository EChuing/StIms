package com.zz.actions.cs;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.PubUploadUtil;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.cs.CsGoods;
import com.zz.service.cs.CsGoodsService;

public class CsGoodsAction extends BaseAction implements ModelDriven<CsGoods>{
	private CsGoods csGoods;
	private CsGoodsService csGoodsService;
	
	
	public void setCsGoodsService(CsGoodsService csGoodsService) {
		this.csGoodsService = csGoodsService;
	}

	@Override
	public CsGoods getModel() {
		if(csGoods==null){
			csGoods = new CsGoods();
		}
		return csGoods;
	}
	
	public void listGoods(){
		try {
			List<CsGoods> list = csGoodsService.listCsGoods(csGoods);
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
	public void snListGoods(){
		try {
			List<CsGoods> list = csGoodsService.SNListCsGoods(csGoods);
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
	
	public void insertGoods(){
		try {
			int result  = csGoodsService.insertCsGoods(csGoods);
			if(result > 0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "插入失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void updateGoods(){
		try {
			CsGoods result  = csGoodsService.updateCsGoods(csGoods);
			if(result != null){
				String json = JSON.toJSONString(result);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
			
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void purchaseGoods(){
		try {
			String result  = csGoodsService.purchaseGoods(csGoods);
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", result));
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void inventoryGoods(){
		try {
			String result  = csGoodsService.inventoryGoods(csGoods);
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void deleteImg(){
		try {
			List<CsGoods> list = csGoodsService.listCsGoods(csGoods);
			if (list.size() == 0) {
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
                return;
            }
			String oldPath = list.get(0).getCgImgPath();
            String delPath = csGoods.getCgImgPath();
            String newPath = PubUploadUtil.getNewPath(oldPath, delPath);
            csGoods.setCgImgPath(newPath);
            csGoodsService.updateCsGoods(csGoods);
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
}
