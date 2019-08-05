package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JournalRepairReturning;
import com.zz.po.journal.JournalRepairReturningExpand;

public interface JournalRepairReturningMapper {
	
    int insertSelective(JournalRepairReturningExpand record) throws Exception;

    List<JournalRepairReturningExpand> selectAll(JournalRepairReturningExpand conditions) throws Exception;

    int updateByPrimaryKeySelective(JournalRepairReturningExpand record) throws Exception;
}