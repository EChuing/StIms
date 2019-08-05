package com.zz.service.cs;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.cs.CsGoodsBilling;

public interface CsGoodsBillingService {
	List<CsGoodsBilling> listOrder(CsGoodsBilling csGoodsBilling) throws Exception;
	
	List<CsGoodsBilling> operatingOrder(CsGoodsBilling csGoodsBilling) throws Exception;
	
	Result<String> createBilling(CsGoodsBilling csGoodsBilling) throws Exception;
	
	Result<String> createPurchaseBilling(CsGoodsBilling csGoodsBilling) throws Exception;
	
	CsGoodsBilling getOrderCount(CsGoodsBilling csGoodsBilling) throws Exception;
	
	CsGoodsBilling getMoneyTotal(CsGoodsBilling csGoodsBilling) throws Exception;
	
	CsGoodsBilling getProfit(CsGoodsBilling csGoodsBilling) throws Exception;
	
	int updateByPrimaryKeySelective(CsGoodsBilling record) throws Exception;

	Result<String> exchangeGoods(CsGoodsBilling record) throws Exception;
}
