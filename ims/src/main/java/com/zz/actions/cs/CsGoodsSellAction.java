package com.zz.actions.cs;

import java.util.List;

import com.zz.other.Syslog;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.cs.CsGoodsDeviceRelationMapper;
import com.zz.po.cs.CsGoodsDeviceRelation;
import com.zz.po.cs.CsGoodsSell;
import com.zz.service.cs.CsGoodsSellService;

public class CsGoodsSellAction extends BaseAction implements ModelDriven<CsGoodsSell>{
	private CsGoodsSell csGoodsSell;
	
	private CsGoodsSellService csGoodsSellService;
	
	@Autowired
	private CsGoodsDeviceRelationMapper csGoodsDeviceRelationMapper;
	
	public void setCsGoodsSellService(CsGoodsSellService csGoodsSellService) {
		this.csGoodsSellService = csGoodsSellService;
	}


	public void listCsGoodsSell(){
		try {
			List<CsGoodsSell> list = csGoodsSellService.listCsGoodsSell(csGoodsSell);
			for(int i=0;i<list.size();i++){
				JSONArray snList = new JSONArray();
				CsGoodsDeviceRelation csGoodsDeviceRelation = new CsGoodsDeviceRelation();
				csGoodsDeviceRelation.setCgdrGoodsSellId(list.get(i).getId());
				List<CsGoodsDeviceRelation> list2 = csGoodsDeviceRelationMapper.selectSn(csGoodsDeviceRelation);
				for(int j=0 ;j<list2.size();j++){
					JSONObject sn = new JSONObject();
					
					sn.put("sn", list2.get(j).getCgdrSn());
					snList.add(sn);
				}
				list.get(i).setCgsGoodsSn(snList.toString());
			}
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
	
	@Override
	public CsGoodsSell getModel() {
		if(csGoodsSell==null){
			csGoodsSell = new CsGoodsSell();
		}
		return csGoodsSell;
	}
	
	public void getPieNum(){
		try {
			JSONArray result = csGoodsSellService.getPieNum(csGoodsSell);
			if(result == null){
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有数据", null));
			}else{
				String json = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void getCategoryNum(){
		try {
			JSONArray result = csGoodsSellService.getCategoryNum(csGoodsSell);
			if(result == null){
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有数据", null));
			}else{
				String json = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void getGoodsProfitNum(){
		try {
			JSONArray result = csGoodsSellService.getGoodsProfitNum(csGoodsSell);
			if(result == null){
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有数据", null));
			}else{
				String json = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
}
