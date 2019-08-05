package com.zz.pay.strategy;

import java.util.HashMap;
import java.util.Map;

import com.github.wxpay.sdk.WXPayUtil;
import com.zz.po.commons.Result;
import com.zz.util.PayManage;
import com.zz.util.WXPayUtilNew;

public class OrangeCheckOrder implements CheckOrderStrategy{

	@Override
	public Result<String> checkOrder(Map<String, String> map) throws Exception {
		String url = PayManage.OrangePay.CHECKORDERURL;
		
		System.out.println("检查订单传进来的数据  = "+map.toString());
		
		Map<String,String> sendMap = new HashMap<>();
		
//		//接口类型
		sendMap.put("service", PayManage.OrangePay.CHECKORDERSERVICE);
//		//随机字符串
		sendMap.put("nonce_str", WXPayUtil.generateNonceStr());
		
		
		//订单号
		sendMap.put("out_trade_no", map.get("out_trade_no"));
//		//商户号
		sendMap.put("mch_id", map.get("mch_id"));
		//微信支付key
		String key = map.get("key");
		sendMap.put("sign", WXPayUtil.generateSignature(sendMap, key));
		
		System.out.println("桔橙二维码支付前的数据  = "+sendMap.toString());
		
		String sendMapStr = WXPayUtil.mapToXml(sendMap);
		String postResult = WXPayUtilNew.post(sendMapStr, url);
		Map<String,String> resultMap = WXPayUtil.xmlToMap(postResult);
		System.out.println("桔橙二维码支付返回的结果  = "+resultMap);
		
		String status = resultMap.get("status");
		
		if("0".equals(status)){
			String result_code = resultMap.get("result_code");
			if("0".equals(result_code)){
				String trade_state = resultMap.get("trade_state");
				if("SUCCESS".equals(trade_state)){
					return new Result<String>(1,"支付成功","");
				}else{
					return new Result<String>(-3,"支付失败","交易状态没有成功");
				}
			}else{
				return new Result<String>(-2,"支付失败",resultMap.get("err_msg"));
			}
		}else{
			return new Result<String>(-1,"支付失败",resultMap.get("message"));
		}
	}

}
