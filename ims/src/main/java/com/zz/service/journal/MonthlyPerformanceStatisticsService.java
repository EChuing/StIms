package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.DashMonthlyPerformanceStatistics;

public interface MonthlyPerformanceStatisticsService {

    /**
     * 业绩统计查询
     * @param record 可按时间段近7天、本月、上月、本季、本年或用户id查询
     * @return
     */
    List<DashMonthlyPerformanceStatistics> listPerformance(DashMonthlyPerformanceStatistics record);

}
