package com.zz.mapper.stat;

import java.util.List;

import com.zz.po.stat.StatFinancialEcology;

public interface StatFinancialEcologyMapper {

    List<StatFinancialEcology> selectAll(StatFinancialEcology record);

    List<StatFinancialEcology> selectFeByDate(StatFinancialEcology record);
    
    StatFinancialEcology selectTotalFeByDate(StatFinancialEcology record);
    
}
