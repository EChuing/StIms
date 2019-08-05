package com.zz.service.cs;

import java.util.List;

import com.zz.mapper.cs.CsGoodsPurchaseMapper;
import com.zz.po.cs.CsGoodsPurchase;

public class CsGoodsPurchaseServiceImpl implements CsGoodsPurchaseService {
	
	private CsGoodsPurchaseMapper csGoodsPurchaseMapper;
	
	public void setCsGoodsPurchaseMapper(CsGoodsPurchaseMapper csGoodsPurchaseMapper) {
		this.csGoodsPurchaseMapper = csGoodsPurchaseMapper;
	}

	@Override
	public List<CsGoodsPurchase> listGoodsPurchase(CsGoodsPurchase csGoodsPurchase) throws Exception {
		return csGoodsPurchaseMapper.listPurchaseOrder(csGoodsPurchase);
	}

	@Override
	public CsGoodsPurchase getPurchaseMoney(CsGoodsPurchase record) throws Exception {
		return csGoodsPurchaseMapper.getPurchaseMoney(record);
	}

}
