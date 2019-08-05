package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.DailyFuture;

public interface DailyFutureService {
	List<DailyFuture> selectByDate(DailyFuture record);
}
