package com.zz.actions.info;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.info.InfoHaveRentCheckOut;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoRenewalRenterExpand;
import com.zz.service.info.ExchangeHousesService;
import com.zz.service.info.HouseForRentService;
import com.zz.service.info.RenewalRenterService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ExchangeHousesAction extends BaseAction implements ModelDriven<InfoHaveRentCheckOut> {
	private InfoHaveRentCheckOut infoHaveRentCheckOut;
	@Autowired
	private RenewalRenterService renewalRenterService;
	@Autowired
	private HouseForRentService infoHouse4rentService;
	@Autowired
	private ExchangeHousesService exchangeHousesService;

	@Override
	public InfoHaveRentCheckOut getModel() {
		if (infoHaveRentCheckOut == null) {
			infoHaveRentCheckOut = new InfoHaveRentCheckOut();
		}
		return infoHaveRentCheckOut;
	}

	public String queryExchangeHouses() {
		try {
			InfoRenewalRenterExpand infoRenewalRenterExpand = new InfoRenewalRenterExpand();
			System.out.println(infoHaveRentCheckOut.getHrId()+","+infoHaveRentCheckOut.getHrRenterId());
			infoRenewalRenterExpand.setJrrHouse4rentId(infoHaveRentCheckOut.getHrId());
			infoRenewalRenterExpand.setJrrRenterId(infoHaveRentCheckOut.getHrRenterId());
			List<InfoRenewalRenterExpand> list = renewalRenterService.selectAll(infoRenewalRenterExpand);
			JSONArray json = (JSONArray) JSON.toJSON(list);
			if (list.size() != 0) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json.toString()));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的信息！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
	
	public void queryMeterReadingScheme(){
		try {
			InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
			infoHouse4rentExpand.setHrId(infoHaveRentCheckOut.getHrId());
			List<InfoHouse4rentExpand> list = infoHouse4rentService.getMeterReadingScheme(infoHouse4rentExpand);
			String json = JSONObject.toJSONString(list,SerializerFeature.WriteNullStringAsEmpty);
			if (list.size() != 0) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的信息！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
	}
	
	public void doExchangeHouses(){
		try{
			int result = exchangeHousesService.exchangeHouses(infoHaveRentCheckOut);
			if(result==1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "换房失败 ！", null));
			}
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
	}
}
