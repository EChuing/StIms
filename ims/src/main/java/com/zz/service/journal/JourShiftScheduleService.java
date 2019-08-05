package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JourShiftSchedule;

//用户考勤班次表
public interface JourShiftScheduleService {
	
	int insertSelective(JourShiftSchedule record) throws Exception;
	//查询班次
    List<JourShiftSchedule> selectJourShiftSchedule(JourShiftSchedule record)throws Exception;
    //更新班次
    int updateByPrimaryKeySelective(JourShiftSchedule record)throws Exception;
}
