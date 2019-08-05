package com.zz.service.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsInventory;

public interface CsGoodsInventoryService {
	List<CsGoodsInventory> listCsGoodsInventory(CsGoodsInventory csGoodsInventory) throws Exception;
}
