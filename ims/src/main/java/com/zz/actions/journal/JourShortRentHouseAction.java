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
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.service.journal.JourShortRentHouseService;

public class JourShortRentHouseAction extends BaseAction implements ModelDriven<InfoHouse4storeExpand> {
	@Autowired
	private JourShortRentHouseService jourShortRentHouseService;
	private InfoHouse4storeExpand infoHouse4storeExpand;
	
	@Override
	public InfoHouse4storeExpand getModel() {
		if (infoHouse4storeExpand == null) {
			infoHouse4storeExpand = new InfoHouse4storeExpand();
		}
		return infoHouse4storeExpand;
	}
	
	//添加短租房
	public String shortRentHouse(){
		try {
			int result = jourShortRentHouseService.insertShortRent(infoHouse4storeExpand);
			if (result == 1) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "楼盘名称、楼栋、门牌号不能相同", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
	
	//批量添加短租房
	public String insertHouseList(){
		try {
			Result<String> result = jourShortRentHouseService.insertHouseList(infoHouse4storeExpand);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 更新短租
	public String updateshortRent1() {
		try {
			String result = jourShortRentHouseService.updateshortRent(infoHouse4storeExpand);
			System.out.println(infoHouse4storeExpand);
			if (result == null) {
				printlnOfJson(CommonMethodClass.jsonData(-1, "更新失败", null));
			} else if ("1".equals(result)) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, result, null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	//设置脏房
	public String updateDirtyHouse() {
		try {
			System.out.println("--+546556+--"+infoHouse4storeExpand);
			System.out.println("-----End---------------");
			Result<String> result = jourShortRentHouseService.updateDirtyRoomList(infoHouse4storeExpand);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//营业房态专用查询短租房
	public String selectShortRentHouse() {
		try {
			Result<List<InfoHouse4storeExpand>> result = jourShortRentHouseService.selectShortRentHouse(infoHouse4storeExpand);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//批量添加短租房(新)
	public String batchAddition(){
		try {
			Result<String> result = jourShortRentHouseService.batchAddition(infoHouse4storeExpand);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
}
