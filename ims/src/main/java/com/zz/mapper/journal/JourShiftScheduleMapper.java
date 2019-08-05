package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourShiftSchedule;
//班次得
public interface JourShiftScheduleMapper {

    int insertSelective(JourShiftSchedule record)throws Exception;

    List<JourShiftSchedule> selectJourShiftSchedule(JourShiftSchedule record)throws Exception;

    int updateByPrimaryKeySelective(JourShiftSchedule record)throws Exception;

}