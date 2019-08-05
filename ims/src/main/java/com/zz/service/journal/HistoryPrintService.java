package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JournalHistoryPrintExpand;


public interface HistoryPrintService {
	//查询所有-数据和统计分开
	List<JournalHistoryPrintExpand> selectAllPrint(JournalHistoryPrintExpand record) throws Exception;
	List<JournalHistoryPrintExpand> selectAll(JournalHistoryPrintExpand record) throws Exception;
	int insertSelective(JournalHistoryPrintExpand record) throws Exception;
}
