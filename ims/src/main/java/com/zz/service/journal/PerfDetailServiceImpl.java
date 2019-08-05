package com.zz.service.journal;

import java.util.List;

import com.zz.mapper.journal.JournalPerfDetailMapper;
import com.zz.po.journal.JournalPerfDetail;

public class PerfDetailServiceImpl implements PerfDetailService {
private JournalPerfDetailMapper journalPerfDetailMapper;
	
	public void setJournalPerfDetailMapper(JournalPerfDetailMapper journalPerfDetailMapper) {
		this.journalPerfDetailMapper = journalPerfDetailMapper;
	}
	@Override
	public List<JournalPerfDetail> selectByJP(JournalPerfDetail record) {
		// TODO Auto-generated method stub
		return journalPerfDetailMapper.selectByJP(record);
	}

}
