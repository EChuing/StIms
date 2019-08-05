package com.zz.pay.strategy;

import java.util.Map;

import com.zz.po.commons.Result;

public interface CheckOrderStrategy {
	Result<String> checkOrder(Map<String,String> map) throws Exception;
}
