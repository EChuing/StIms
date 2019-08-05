package com.zz.actions.cs;

import java.util.List;

import com.zz.other.Syslog;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.cs.CsAccountReceipt;
import com.zz.service.cs.CsAccountReceiptService;

public class CsAccountReceiptAction extends BaseAction implements ModelDriven<CsAccountReceipt>{
	private CsAccountReceipt csAccountReceipt;
	@Autowired
	private CsAccountReceiptService csAccountReceiptService;
	
	@Override
	public CsAccountReceipt getModel() {
		if(csAccountReceipt==null){
			csAccountReceipt = new CsAccountReceipt();
		}
		return csAccountReceipt;
	}
	public void insertCsAccountReceipt(){
		try {
			int result  = csAccountReceiptService.insertCsAccountReceipt(csAccountReceipt);
			if(result > 0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "插入失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	public void queryCsAccountReceipt(){
		try {
			List<CsAccountReceipt> list = csAccountReceiptService.queryCsAccountReceipt(csAccountReceipt);
			if(list.size() != 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的客户", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	

}
