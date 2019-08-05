package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoCustomerSourceStatistics;

public interface InfoCustomerSourceStatisticsService {
	List<InfoCustomerSourceStatistics> selectAll(InfoCustomerSourceStatistics record);
}
