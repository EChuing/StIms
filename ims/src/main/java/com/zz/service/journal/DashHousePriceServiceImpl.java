package com.zz.service.journal;

import com.zz.mapper.journal.DashHousePriceMapper;
import com.zz.po.journal.DashHousePrice;

public class DashHousePriceServiceImpl implements DashHousePriceService {

	private DashHousePriceMapper dashHousePriceMapper;

	public void setDashHousePriceMapper(
			DashHousePriceMapper dashHousePriceMapper) {
		this.dashHousePriceMapper = dashHousePriceMapper;
	}
	
	@Override
	public DashHousePrice selectByPrimaryKey(Integer dhpId) {
		return dashHousePriceMapper.selectByPrimaryKey(dhpId);
	}

}
