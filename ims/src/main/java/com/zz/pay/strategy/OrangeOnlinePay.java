package com.zz.pay.strategy;

import java.util.Map;

import com.zz.po.commons.Result;

public class OrangeOnlinePay implements OnlinePayStrategy{

	@Override
	public Result<String> pay(Map<String,String> map) throws Exception {
		return new Result<String>(1,"成功","这里是橘子在线支付");
	}

}
