package com.zz.pay.strategy;

import java.util.HashMap;
import java.util.Map;

import com.github.wxpay.sdk.WXPayUtil;
import com.zz.po.commons.Result;
import com.zz.util.PayManage;
import com.zz.util.WXPayUtilNew;

//桔橙统一支付接口退单
public class OrangeRefundOrder implements RefundOrderStrategy{
 
	@Override
	public Result<String> refundOrder(Map<String, String> map) throws Exception {
		String url = PayManage.OrangePay.REFUNDORDERURL;
		
		System.out.println("退单传进来的数据  = "+map.toString());
		
		Map<String,String> sendMap = new HashMap<>();
		
		//接口类型
		sendMap.put("service", PayManage.OrangePay.REFUNDORDERSERVICE);
		//随机字符串
		sendMap.put("nonce_str", WXPayUtil.generateNonceStr());
		
		
		//订单号
		sendMap.put("out_trade_no", map.get("out_trade_no"));
		//退单单号
		sendMap.put("out_refund_no", map.get("out_refund_no"));
		//订单总金额  
		sendMap.put("total_fee", map.get("total_fee"));
		//退单金额
		sendMap.put("refund_fee", map.get("refund_fee"));
		//操作员账号 一般默认为商户号
		sendMap.put("op_user_id", map.get("mch_id"));
		//商户号
		sendMap.put("mch_id", map.get("mch_id"));
		//微信支付key
		String key = map.get("key");
		sendMap.put("sign", WXPayUtil.generateSignature(sendMap, key));
		
		System.out.println("桔橙二维码退单前的数据  = "+sendMap.toString());
		
		String sendMapStr = WXPayUtil.mapToXml(sendMap);
		String postResult = WXPayUtilNew.post(sendMapStr, url);
		Map<String,String> resultMap = WXPayUtil.xmlToMap(postResult);
		System.out.println("桔橙二维码退单返回的结果  = "+resultMap);
		
		String status = resultMap.get("status");
		String result_code = resultMap.get("result_code");
		if("0".equals(status)){
			if("0".equals(result_code)){
				return new Result<String>(1,"退单成功","");
			}else{
				return new Result<String>(-2,resultMap.get("err_code"),"");
			}
		}else{
			return new Result<String>(-1,resultMap.get("message"),"");
		}
	}

}
