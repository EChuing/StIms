package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JourAttendanceRecord;

//用户考勤记录表
public interface JourAttendanceRecordService {
	
	//添加考勤
	int insertSelective(JourAttendanceRecord record) throws Exception;
	//查询考勤
    List<JourAttendanceRecord> selectJourAttendanceRecord(JourAttendanceRecord record) throws Exception;
    //修改考勤
    int updateByPrimaryKeySelective(JourAttendanceRecord record) throws Exception;
    //添加考勤备注
    int addAttendanceNote(JourAttendanceRecord record) throws Exception;
	
}