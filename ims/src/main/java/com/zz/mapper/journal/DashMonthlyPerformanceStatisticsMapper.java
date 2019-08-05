package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.DashMonthlyPerformanceStatistics;

public interface DashMonthlyPerformanceStatisticsMapper {

    List<DashMonthlyPerformanceStatistics> listPerformance(DashMonthlyPerformanceStatistics record);

}