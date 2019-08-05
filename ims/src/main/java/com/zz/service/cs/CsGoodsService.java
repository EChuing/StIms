package com.zz.service.cs;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.cs.CsGoods;
import com.zz.po.cs.CsGoodsDeviceRelation;

public interface CsGoodsService {
	List<CsGoods> listCsGoods(CsGoods record) throws Exception;
	int insertCsGoods(CsGoods record) throws Exception;
	CsGoods updateCsGoods(CsGoods record) throws Exception;
	String purchaseGoods(CsGoods record) throws Exception;
	String inventoryGoods(CsGoods record) throws Exception;
	List<CsGoods> SNListCsGoods(CsGoods record) throws Exception;
}
