package com.zz.pay.strategy;

import java.util.Map;

import com.zz.po.commons.Result;

public interface OnlinePayStrategy {
	Result<String> pay(Map<String,String> map) throws Exception;
}
