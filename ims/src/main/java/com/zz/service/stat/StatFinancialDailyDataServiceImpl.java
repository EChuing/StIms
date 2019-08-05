package com.zz.service.stat;

import java.util.List;

import com.zz.mapper.stat.StatFinancialDailyDataMapper;
import com.zz.po.stat.StatFinancialDailyData;

public class StatFinancialDailyDataServiceImpl implements StatFinancialDailyDataService {
    
    private StatFinancialDailyDataMapper statFinancialDailyDataMapper;

    public void setStatFinancialDailyDataMapper(
            StatFinancialDailyDataMapper statFinancialDailyDataMapper) {
        this.statFinancialDailyDataMapper = statFinancialDailyDataMapper;
    }

    @Override
    public List<StatFinancialDailyData> selectAll(StatFinancialDailyData record) throws Exception {
        return statFinancialDailyDataMapper.selectAll(record);
    }

}
