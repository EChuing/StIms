package com.zz.service.journal;

import com.zz.po.journal.DashFinancialStatistics;

public interface DashFinancialStatisticsService {

    DashFinancialStatistics selectByPrimaryKey(Integer fsId)throws Exception;

}
