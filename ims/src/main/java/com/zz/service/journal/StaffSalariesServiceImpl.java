package com.zz.service.journal;

import java.util.List;

import com.zz.mapper.journal.JournalStaffSalariesMapper;
import com.zz.po.journal.JournalStaffSalaries;

public class StaffSalariesServiceImpl implements StaffSalariesService {
	private JournalStaffSalariesMapper journalStaffSalariesMapper;
	public void setJournalStaffSalariesMapper(
			JournalStaffSalariesMapper journalStaffSalariesMapper) {
		this.journalStaffSalariesMapper = journalStaffSalariesMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer ssaId) throws Exception {
		// TODO Auto-generated method stub
		return journalStaffSalariesMapper.deleteByPrimaryKey(ssaId);
	}

	@Override
	public int insertSelective(JournalStaffSalaries record) throws Exception {
		// TODO Auto-generated method stub
		return journalStaffSalariesMapper.insertSelective(record);
	}

	@Override
	public List<JournalStaffSalaries> selectByPrimaryKey(JournalStaffSalaries record)
			throws Exception {
		// TODO Auto-generated method stub
		return journalStaffSalariesMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalStaffSalaries record)
			throws Exception {
		// TODO Auto-generated method stub
		return journalStaffSalariesMapper.updateByPrimaryKeySelective(record);
	}
}
