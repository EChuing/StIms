package com.zz.service.journal;

import com.zz.mapper.journal.DashFinancialStatisticsMapper;
import com.zz.po.journal.DashFinancialStatistics;

public class DashFinancialStatisticsServiceImpl implements DashFinancialStatisticsService {
	private DashFinancialStatisticsMapper dashFinancialStatisticsMapper;

	public void setDashFinancialStatisticsMapper(
			DashFinancialStatisticsMapper dashFinancialStatisticsMapper) {
		this.dashFinancialStatisticsMapper = dashFinancialStatisticsMapper;
	}

	@Override
	public DashFinancialStatistics selectByPrimaryKey(Integer fsId) throws Exception {
		return dashFinancialStatisticsMapper.selectByPrimaryKey(fsId);
	}

}
