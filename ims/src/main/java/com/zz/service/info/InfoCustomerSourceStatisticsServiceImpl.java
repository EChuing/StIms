package com.zz.service.info;

import java.util.List;

import com.zz.mapper.info.InfoCustomerSourceStatisticsMapper;
import com.zz.po.info.InfoCustomerSourceStatistics;

public class InfoCustomerSourceStatisticsServiceImpl implements
		InfoCustomerSourceStatisticsService {
	private InfoCustomerSourceStatisticsMapper infoCustomerSourceStatisticsMapper;
	public void setInfoCustomerSourceStatisticsMapper(
			InfoCustomerSourceStatisticsMapper infoCustomerSourceStatisticsMapper) {
		this.infoCustomerSourceStatisticsMapper = infoCustomerSourceStatisticsMapper;
	}
	@Override
	public List<InfoCustomerSourceStatistics> selectAll(
			InfoCustomerSourceStatistics record) {
		// TODO Auto-generated method stub
		return infoCustomerSourceStatisticsMapper.selectAll(record);
	}

}
