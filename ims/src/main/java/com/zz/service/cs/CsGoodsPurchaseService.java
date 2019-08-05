package com.zz.service.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsPurchase;

public interface CsGoodsPurchaseService {
	List<CsGoodsPurchase> listGoodsPurchase(CsGoodsPurchase csGoodsPurchase) throws Exception;
	
	CsGoodsPurchase getPurchaseMoney(CsGoodsPurchase record) throws Exception;
}
