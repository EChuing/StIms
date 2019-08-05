package com.zz.service.stat;

import java.util.List;

import com.zz.po.stat.StatFinancialEcology;

public interface StatFinancialEcologyService {
    
    List<StatFinancialEcology> selectAll(StatFinancialEcology record) throws Exception;
    
    List<StatFinancialEcology> selectFeByDate(StatFinancialEcology record) throws Exception;
    
    StatFinancialEcology selectTotalFeByDate(StatFinancialEcology record) throws Exception;

}
