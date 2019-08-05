package com.zz.service.journal;

import com.zz.mapper.journal.JourAttendanceinformationrecordMapper;
import com.zz.po.journal.JourAttendanceinformationrecord;

public class JourAttendanceinformationrecordServiceImpl implements JourAttendanceinformationrecordService{
	
	private JourAttendanceinformationrecordMapper jourAttendanceinformationrecordMapper;
	public JourAttendanceinformationrecordMapper getJourAttendanceinformationrecordMapper() {
		return jourAttendanceinformationrecordMapper;
	}
	public void setJourAttendanceinformationrecordMapper(
			JourAttendanceinformationrecordMapper jourAttendanceinformationrecordMapper) {
		this.jourAttendanceinformationrecordMapper = jourAttendanceinformationrecordMapper;
	}

	@Override
	public int insertJourAttendanceInformationRecord(JourAttendanceinformationrecord record)throws Exception {
		
		return jourAttendanceinformationrecordMapper.insertJourAttendanceInformationRecord(record);
	}
	
}