package com.zz.actions.cs;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.cs.CsGoodsInventory;
import com.zz.service.cs.CsGoodsInventoryService;

public class CsGoodsInventoryAction extends BaseAction implements ModelDriven<CsGoodsInventory>{
	
	private CsGoodsInventory csGoodsInventory;
	
	private CsGoodsInventoryService csGoodsInventoryService;
	
	public void setCsGoodsInventoryService(CsGoodsInventoryService csGoodsInventoryService) {
		this.csGoodsInventoryService = csGoodsInventoryService;
	}
	
	public void listCsGoodsInventory(){
		try {
			List<CsGoodsInventory> list =  csGoodsInventoryService.listCsGoodsInventory(csGoodsInventory);
			if(list.size() > 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有盘点记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}

	@Override
	public CsGoodsInventory getModel() {
		if(csGoodsInventory==null){
			csGoodsInventory = new CsGoodsInventory();
		}
		return csGoodsInventory;
	}

}
