package com.zz.service.cs;

import java.util.List;

import com.zz.mapper.cs.CsGoodsInventoryMapper;
import com.zz.po.cs.CsGoodsInventory;

public class CsGoodsInventoryServiceImpl implements CsGoodsInventoryService{

	private CsGoodsInventoryMapper csGoodsInventoryMapper;
	
	public void setCsGoodsInventoryMapper(CsGoodsInventoryMapper csGoodsInventoryMapper) {
		this.csGoodsInventoryMapper = csGoodsInventoryMapper;
	}

	@Override
	public List<CsGoodsInventory> listCsGoodsInventory(CsGoodsInventory csGoodsInventory) throws Exception {
		return csGoodsInventoryMapper.listCsGoodsInventory(csGoodsInventory);
	}

}
