package com.zz.service.journal;

import com.zz.mapper.journal.DashLandFreeEarningsMapper;
import com.zz.po.journal.DashLandFreeEarnings;

public class DashLandFreeEarningsServiceImpl implements DashLandFreeEarningsService {
	private DashLandFreeEarningsMapper dashLandFreeEarningsMapper;

	public void setDashLandFreeEarningsMapper(
			DashLandFreeEarningsMapper dashLandFreeEarningsMapper) {
		this.dashLandFreeEarningsMapper = dashLandFreeEarningsMapper;
	}
	
	@Override
	public DashLandFreeEarnings selectByPrimaryKey(Integer dlfeId) {
		return dashLandFreeEarningsMapper.selectByPrimaryKey(dlfeId);
	}
}
