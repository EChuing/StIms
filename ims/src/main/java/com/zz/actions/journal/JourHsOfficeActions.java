package com.zz.actions.journal;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.datasource.Brand;
import com.zz.other.Syslog;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourHsDevice;
import com.zz.po.journal.JourHsOffice;
import com.zz.po.journal.JourHsOfficeExpand;
import com.zz.service.info.HouseForRentService;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.journal.JourHsOfficeService;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JourHsOfficeActions extends BaseAction implements ModelDriven<JourHsOfficeExpand> {
	private JourHsOfficeExpand jourHsOfficeExpand;
	@Autowired
	private JourHsOfficeService jourHsOfficeService;

    
	@Override
    public JourHsOfficeExpand getModel() {
        if( jourHsOfficeExpand==null){
        	jourHsOfficeExpand = new JourHsOfficeExpand();
        }
        return jourHsOfficeExpand;
    }

	//添加未租和办公区关联
	public String updateJourHsOffice(){
		List<JourHsOfficeExpand> list = new ArrayList<JourHsOfficeExpand>();
		try{
			String jhoJson = jourHsOfficeExpand.getJhoIdJson();
			JSONArray jsa =JSONArray.fromObject(jhoJson);
			for(Object a : jsa){
				JSONObject jsonObj = (JSONObject)a;
				JourHsOfficeExpand jho = (JourHsOfficeExpand) JSONObject.toBean(jsonObj, JourHsOfficeExpand.class);
				list.add(jho);
			}
			System.out.println(list);
			int result = jourHsOfficeService.updateList(list);
			if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "更新成功", null));
            }
		}catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
	
	//查询办公区已关联房
	public String selectRelatedHs(){
		try {
			List<InfoHouse4storeExpand>list=jourHsOfficeService.selectRelatedInfoHouse4storeExpand(jourHsOfficeExpand);
			if(list.size()==0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else if (list.size()>0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
			}
		} catch (Exception e) {
			 printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return "";
	}
	
	//查询办公区未关联房
	public String selectNoRelationHs(){
		try {
//			System.out.println("----jourToString-- :"+jourHsOfficeExpand.toString());
			List<InfoHouse4storeExpand> hsList=jourHsOfficeService.AllInfoHouse4storeExpand(jourHsOfficeExpand);
			System.out.println("size:"+hsList.size());
			if(hsList.size()>=0){
				String json = JSONUtil.serialize(hsList);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
			}
		} catch (Exception e) {
			 printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	//查询办公区已关联设备
	public String selectRelatedDevice(){
		try {
			System.out.println("==-----====");
			List<JourDevice>list=jourHsOfficeService.selectRelatedDeviceExpand(jourHsOfficeExpand);
			System.out.println("relatedDevSize--------"+list.size());
			if(list.size()==0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else if (list.size()>0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
			}
		} catch (Exception e) {
			 printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return "";
	}
	
	//查询办公区未关联房
	public String selectNoRelationDevice(){
		try {
//				System.out.println("----jourToString-- :"+jourHsOfficeExpand.toString());
			List<JourDevice> DeviceList=jourHsOfficeService.AllDeviceExpand(jourHsOfficeExpand);
			System.out.println("size:"+DeviceList.size());
			if(DeviceList.size()>=0){
				String json = JSONUtil.serialize(DeviceList);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
			}
		} catch (Exception e) {
			 printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
	
}
