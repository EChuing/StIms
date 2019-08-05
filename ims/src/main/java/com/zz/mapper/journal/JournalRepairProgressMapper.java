package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JournalRepairProgress;
import com.zz.po.journal.JournalRepairProgressExpand;

public interface JournalRepairProgressMapper {
	
    int insertSelective(JournalRepairProgressExpand record) throws Exception;

    List<JournalRepairProgressExpand> selectAll(JournalRepairProgressExpand conditions) throws Exception;

    int updateByPrimaryKeySelective(JournalRepairProgressExpand record) throws Exception;
}