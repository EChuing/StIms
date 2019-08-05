package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JournalStaffSalaries;

public interface StaffSalariesService {
	
	 int deleteByPrimaryKey(Integer ssaId) throws Exception;

	 int insertSelective(JournalStaffSalaries record) throws Exception;

	 List<JournalStaffSalaries> selectByPrimaryKey(JournalStaffSalaries record) throws Exception;

	 int updateByPrimaryKeySelective(JournalStaffSalaries record) throws Exception;
}
