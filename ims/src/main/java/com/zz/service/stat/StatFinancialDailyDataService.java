package com.zz.service.stat;

import java.util.List;

import com.zz.po.stat.StatFinancialDailyData;

public interface StatFinancialDailyDataService {
    
    List<StatFinancialDailyData> selectAll(StatFinancialDailyData record) throws Exception;

}
