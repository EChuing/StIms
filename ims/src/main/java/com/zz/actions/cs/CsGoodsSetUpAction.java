package com.zz.actions.cs;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.PubUploadUtil;
import com.zz.other.Syslog;
import com.zz.po.cs.CsGoodsSetUp;
import com.zz.service.cs.CsGoodsSetUpService;

public class CsGoodsSetUpAction extends BaseAction implements ModelDriven<CsGoodsSetUp>{
	private CsGoodsSetUp csGoodsSetUp;
	
	private CsGoodsSetUpService csGoodsSetUpService;
	
	public void setCsGoodsSetUpService(CsGoodsSetUpService csGoodsSetUpService) {
		this.csGoodsSetUpService = csGoodsSetUpService;
	}

	@Override
	public CsGoodsSetUp getModel() {
		if(csGoodsSetUp==null){
			csGoodsSetUp = new CsGoodsSetUp();
		}
		return csGoodsSetUp;
	}
	
	public void selectShopSetUp(){
		try {
			List<CsGoodsSetUp> list = csGoodsSetUpService.selectCsGoodsSetUp(csGoodsSetUp);
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
	
	public void updateShopSetUp(){
		try {
			csGoodsSetUpService.updateCsGoodsSetUp(csGoodsSetUp);
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void deleteShopAdImg(){
		try {
			List<CsGoodsSetUp> list = csGoodsSetUpService.selectCsGoodsSetUp(csGoodsSetUp);
			if(list.size() > 0){
				String oldPath = "";
				String delPath = "";
				if(csGoodsSetUp.getCgsuAdImgPath() != null){
					oldPath = list.get(0).getCgsuAdImgPath();
					delPath = csGoodsSetUp.getCgsuAdImgPath();
					String newPath = PubUploadUtil.getNewPath(oldPath, delPath);
					csGoodsSetUp.setCgsuAdImgPath(newPath);
				}else if(csGoodsSetUp.getCgsuLicenseImg() != null ){
					oldPath = list.get(0).getCgsuLicenseImg();
					delPath = csGoodsSetUp.getCgsuLicenseImg();
					String newPath = PubUploadUtil.getNewPath(oldPath, delPath);
					csGoodsSetUp.setCgsuLicenseImg(newPath);
				}
	           
	            int result = csGoodsSetUpService.updateCsGoodsSetUp(csGoodsSetUp);
				if(result == 1){
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
				}else{
					printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
				}
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
			
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
}
