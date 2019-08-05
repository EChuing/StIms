package com.zz.util;

public class PayManage {
	//桔橙的支付
	public class OrangePay{
		//二维码统一支付接口 
		public static final String QRCODEURL = "https://open.orange666.com/bycardreq.do";
		//二维码支付service接口类型
		public static final String QRCODESERVICE = "unified.trade.micropay";
		
		//统一退单接口
		public static final String REFUNDORDERURL = "https://open.orange666.com/bycardrefund.do"; 
		//统一退单service接口类型
		public static final String REFUNDORDERSERVICE = "unified.trade.refund"; 
		
		//微信退单接口
		public static final String WXREFUNDORDERURL = "https://open.orange666.com/wxpubrefund.do"; 
		//微信退单service接口类型
		public static final String WXREFUNDORDERSERVICE = "unified.trade.refund"; 		
		
		//在线支付接口 
		public static final String ONLINEURL = "https://open.orange666.com/wxpubpay.do";
		//在线支付service接口类型
		public static final String ONLINESERVICE = "pay.weixin.jspay";
		//是否调原生态接口 1为是
		public static final String ONLINEISRAW = "1";
		
		//查询订单接口
		public static final String CHECKORDERURL = "https://open.orange666.com/bycardcheck.do";
		//查询订单接口service接口类型
		public static final String CHECKORDERSERVICE = "unified.trade.query";
		
		
		
		//没实现的ip地址 暂时用个假的
		public static final String ONLINEMCHCREATEIP = "112.74.84.120";
	}
}
