package com.zz.mapper.stat;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zz.po.stat.StatFinancialData;

public interface StatFinancialDataMapper {
    
    List<StatFinancialData> selectByDate(@Param("year") Integer year, @Param("month") Integer month);
    
}