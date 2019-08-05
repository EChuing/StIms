package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoCustomerSourceStatistics;

public interface InfoCustomerSourceStatisticsMapper {
    
    List<InfoCustomerSourceStatistics> selectAll(InfoCustomerSourceStatistics record);
}