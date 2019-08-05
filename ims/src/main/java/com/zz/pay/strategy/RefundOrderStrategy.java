package com.zz.pay.strategy;

import java.util.Map;

import com.zz.po.commons.Result;

public interface RefundOrderStrategy {
	Result<String> refundOrder(Map<String,String> map) throws Exception;
}
