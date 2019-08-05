package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.DailyBase;

public interface DailyBaseService {
	List<DailyBase> selectAll(DailyBase record);
	
	List<DailyBase> selectByDate(DailyBase record);
}
