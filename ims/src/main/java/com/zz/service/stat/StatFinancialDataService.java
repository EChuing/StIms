package com.zz.service.stat;

import java.util.List;

import com.zz.po.stat.StatFinancialData;

public interface StatFinancialDataService {
    
    List<StatFinancialData> selectByDate(Integer year, Integer month) throws Exception;

}
