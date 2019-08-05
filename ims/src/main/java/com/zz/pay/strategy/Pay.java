package com.zz.pay.strategy;

import java.util.Map;

import com.zz.po.commons.Result;

public class Pay {

	QRCodePayStrategy qrCodePayStrategy;
	OnlinePayStrategy onlinePayStrategy;
	CheckOrderStrategy checkOrderStrategy;
	RefundOrderStrategy refundOrderStrategy;
	
	public Result<String> qrCodePay(Map<String,String> map) throws Exception{
		return qrCodePayStrategy.pay(map);
	}
	
	public Result<String> onlinePay(Map<String,String> map) throws Exception{
		return onlinePayStrategy.pay(map);
	}
	
	public Result<String> checkOrder(Map<String,String> map) throws Exception{
		return checkOrderStrategy.checkOrder(map);
	}
	
	public Result<String> refundOrder(Map<String,String> map) throws Exception{
		return refundOrderStrategy.refundOrder(map);
	}
	public void setRefundOrderStrategy(RefundOrderStrategy refundOrderStrategy) {
		this.refundOrderStrategy = refundOrderStrategy;
	}

	public void setCheckOrderStrategy(CheckOrderStrategy checkOrderStrategy) {
		this.checkOrderStrategy = checkOrderStrategy;
	}

	public void setQrCodePay(QRCodePayStrategy qrCodePayStrategy) {
		this.qrCodePayStrategy = qrCodePayStrategy;
	}

	public void setOnlinePay(OnlinePayStrategy onlinePayStrategy) {
		this.onlinePayStrategy = onlinePayStrategy;
	} 
	
	
	
}
