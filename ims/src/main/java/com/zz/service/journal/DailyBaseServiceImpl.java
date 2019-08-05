package com.zz.service.journal;

import java.util.List;

import com.zz.mapper.journal.DailyBaseMapper;
import com.zz.po.journal.DailyBase;

public class DailyBaseServiceImpl implements DailyBaseService {
	private DailyBaseMapper dailyBaseMapper;
	
	public void setDailyBaseMapper(DailyBaseMapper dailyBaseMapper) {
		this.dailyBaseMapper = dailyBaseMapper;
	}

	@Override
	public List<DailyBase> selectAll(DailyBase record) {
		// TODO Auto-generated method stub
		return dailyBaseMapper.selectAll(record);
	}

	@Override
	public List<DailyBase> selectByDate(DailyBase record) {
		// TODO Auto-generated method stub
		return dailyBaseMapper.selectByDate(record);
	}

}
