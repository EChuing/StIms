package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourAttendanceRecord;

public interface JourAttendanceRecordMapper {

    int insertSelective(JourAttendanceRecord record)throws Exception;

    List<JourAttendanceRecord> selectJourAttendanceRecord(JourAttendanceRecord record)throws Exception;

    int updateByPrimaryKeySelective(JourAttendanceRecord record)throws Exception;
    
    int addAttendanceNote(JourAttendanceRecord record)throws Exception;

}