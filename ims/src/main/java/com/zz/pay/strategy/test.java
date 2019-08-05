package com.zz.pay.strategy;

import java.util.HashMap;
import java.util.Map;

import com.zz.po.commons.Result;

public class test {
	public static void main(String[] args) throws Exception {
		
		Map<String,String> sendMap = new HashMap<>();
		//商户号
		sendMap.put("mch_id", "44600000146151");
		//订单号
		sendMap.put("out_trade_no", "20181123215215399");
		//微信支付key
		sendMap.put("key", "34AC1A17C95B65640C8914AFC5BF5B03");
		
		WxPay wxPay = new WxPay();
		wxPay.setCheckOrderStrategy(new OrangeCheckOrder());
		Result<String> result = wxPay.checkOrder(sendMap);
		System.out.println(result);
	}
}
