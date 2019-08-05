package com.zz.service.journal;

import java.util.List;

import com.zz.mapper.journal.JournalRepairReturningMapper;
import com.zz.po.journal.JournalRepairReturning;
import com.zz.po.journal.JournalRepairReturningExpand;

public class RepairReturningServiceImpl implements RepairReturningService{
	
	private JournalRepairReturningMapper journalRepairReturningMapper;
	
	public void setJournalRepairReturningMapper(
			JournalRepairReturningMapper journalRepairReturningMapper) {
		this.journalRepairReturningMapper = journalRepairReturningMapper;
	}

	@Override
	public int insertSelective(JournalRepairReturningExpand record)
			throws Exception {
		return journalRepairReturningMapper.insertSelective(record);
	}

	@Override
	public List<JournalRepairReturningExpand> selectAll(
			JournalRepairReturningExpand conditions) throws Exception {
		return journalRepairReturningMapper.selectAll(conditions);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalRepairReturningExpand record)
			throws Exception {
		return journalRepairReturningMapper.updateByPrimaryKeySelective(record);
	}

}
