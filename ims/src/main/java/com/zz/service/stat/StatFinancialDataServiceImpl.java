package com.zz.service.stat;

import java.util.List;

import com.zz.mapper.stat.StatFinancialDataMapper;
import com.zz.po.stat.StatFinancialData;

public class StatFinancialDataServiceImpl implements StatFinancialDataService {
    
    private StatFinancialDataMapper statFinancialDataMapper;

    public void setStatFinancialDataMapper(
            StatFinancialDataMapper statFinancialDataMapper) {
        this.statFinancialDataMapper = statFinancialDataMapper;
    }

    @Override
    public List<StatFinancialData> selectByDate(Integer year, Integer month) throws Exception {
        return statFinancialDataMapper.selectByDate(year, month);
    }

}
