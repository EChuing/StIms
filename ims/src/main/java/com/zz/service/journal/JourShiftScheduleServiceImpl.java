package com.zz.service.journal;

import java.util.List;

import com.zz.mapper.journal.JourShiftScheduleMapper;
import com.zz.po.journal.JourShiftSchedule;

//用户考勤班次表
public class JourShiftScheduleServiceImpl implements JourShiftScheduleService{
	
	private JourShiftScheduleMapper jourShiftScheduleMapper;
	public JourShiftScheduleMapper getJourShiftScheduleMapper() {
		return jourShiftScheduleMapper;
	}
	public void setJourShiftScheduleMapper(JourShiftScheduleMapper jourShiftScheduleMapper) {
		this.jourShiftScheduleMapper = jourShiftScheduleMapper;
	}

	@Override
	public int insertSelective(JourShiftSchedule record) throws Exception {
		return jourShiftScheduleMapper.insertSelective(record);
	}

	@Override
	public List<JourShiftSchedule> selectJourShiftSchedule(JourShiftSchedule record) throws Exception {
		List<JourShiftSchedule> jourShiftScheduleList = jourShiftScheduleMapper.selectJourShiftSchedule(record);
		return jourShiftScheduleList; 
	}

	@Override
	public int updateByPrimaryKeySelective(JourShiftSchedule record) throws Exception {
		System.out.println("JourShiftSchedule record   : "+record.toString());
		return jourShiftScheduleMapper.updateByPrimaryKeySelective(record);
	}

}