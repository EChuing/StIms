package com.zz.service.journal;

import java.util.List;

import com.zz.mapper.journal.DashMonthlyPerformanceStatisticsMapper;
import com.zz.po.journal.DashMonthlyPerformanceStatistics;

public class MonthlyPerformanceStatisticsServiceImpl implements MonthlyPerformanceStatisticsService {
	private DashMonthlyPerformanceStatisticsMapper dashMonthlyPerformanceStatisticsMapper;
	public void setDashMonthlyPerformanceStatisticsMapper(
			DashMonthlyPerformanceStatisticsMapper dashMonthlyPerformanceStatisticsMapper) {
		this.dashMonthlyPerformanceStatisticsMapper = dashMonthlyPerformanceStatisticsMapper;
	}

	@Override
	public List<DashMonthlyPerformanceStatistics> listPerformance(DashMonthlyPerformanceStatistics record){
		return dashMonthlyPerformanceStatisticsMapper.listPerformance(record);
	}

}
