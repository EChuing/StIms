package com.zz.mapper.stat;

import java.util.List;

import com.zz.po.stat.StatFinancialDailyData;

public interface StatFinancialDailyDataMapper {

    List<StatFinancialDailyData> selectAll(StatFinancialDailyData record);
    
}