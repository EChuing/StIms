package com.zz.pay.strategy;


import java.util.HashMap;
import java.util.Map;

import com.github.wxpay.sdk.WXPayUtil;
import com.zz.po.commons.Result;
import com.zz.util.PayManage;
import com.zz.util.WXPayUtilNew;

public class OrangeQRCodePay implements QRCodePayStrategy{
	
	@Override
	public Result<String> pay(Map<String,String> map) throws Exception {
		String url = PayManage.OrangePay.QRCODEURL;
		
		Map<String,String> sendMap = new HashMap<>();
		
		//不用传的参数
		//接口类型
		sendMap.put("service",  PayManage.OrangePay.QRCODESERVICE);
		//终端IP
		sendMap.put("mch_create_ip", PayManage.OrangePay.ONLINEMCHCREATEIP);
		//随机字符串 
		sendMap.put("nonce_str", WXPayUtil.generateNonceStr());
		
		
		//需要传的参数
		//商户号
		sendMap.put("mch_id", map.get("mch_id"));
		//商品描述
		sendMap.put("body", map.get("body"));
		//总金额
		sendMap.put("total_fee", map.get("total_fee"));
		//授权码
		sendMap.put("auth_code", map.get("auth_code"));
		//订单号
		sendMap.put("out_trade_no", map.get("out_trade_no"));
		//微信支付key
		String key = map.get("key");
		//签名
		sendMap.put("sign", WXPayUtil.generateSignature(sendMap, key));
		
		System.out.println("桔橙二维码支付前的数据  = "+sendMap.toString());
		
		String sendMapStr = WXPayUtil.mapToXml(sendMap);
		String postResult = WXPayUtilNew.post(sendMapStr, url);
		Map<String,String> resultMap = WXPayUtil.xmlToMap(postResult);
		System.out.println("桔橙二维码支付返回的结果  = "+resultMap);
		
		String status = resultMap.get("status");
		String result_code = resultMap.get("result_code");
		String trade_state = resultMap.get("trade_state");
		if("0".equals(status)){
			if("0".equals(result_code)){
				if("SUCCESS".equals(trade_state)){
					return new Result<String>(1,"支付成功",null);
				}else{
					return new Result<String>(-3,"支付失败","交易状态不是success");
				}
			}else{
				if("2068".equals(resultMap.get("err_code"))){
					return new Result<String>(-3,"还没支付好","用户正在输入密码");
				}else{
					return new Result<String>(-2,"支付失败",resultMap.get("err_msg"));
				}
			}
		}else{
			return new Result<String>(-1,resultMap.get("message"),null);
		}
	}
	
}
