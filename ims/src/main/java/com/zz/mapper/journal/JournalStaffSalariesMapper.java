package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JournalStaffSalaries;

public interface JournalStaffSalariesMapper {
	
    int deleteByPrimaryKey(Integer ssaId) throws Exception;

    int insertSelective(JournalStaffSalaries record) throws Exception;

    List<JournalStaffSalaries> selectByPrimaryKey(JournalStaffSalaries record) throws Exception;

    int updateByPrimaryKeySelective(JournalStaffSalaries record) throws Exception;

}