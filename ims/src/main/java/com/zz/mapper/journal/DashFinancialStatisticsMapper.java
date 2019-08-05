package com.zz.mapper.journal;

import org.apache.ibatis.annotations.Param;

import com.zz.po.journal.DashFinancialStatistics;

public interface DashFinancialStatisticsMapper {

    DashFinancialStatistics selectByPrimaryKey(@Param("fsId") Integer fsId)throws Exception;

}