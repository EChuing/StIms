package com.zz.service.journal;

import java.util.List;

import com.zz.mapper.journal.DailyFutureMapper;
import com.zz.po.journal.DailyFuture;

public class DailyFutureServiceImpl implements DailyFutureService {
	private DailyFutureMapper dailyFutureMapper;

	public void setDailyFutureMapper(DailyFutureMapper dailyFutureMapper) {
		this.dailyFutureMapper = dailyFutureMapper;
	}

	@Override
	public List<DailyFuture> selectByDate(DailyFuture record) {
		// TODO Auto-generated method stub
		return dailyFutureMapper.selectByDate(record);
	}

}
