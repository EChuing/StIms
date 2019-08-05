package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JournalPerfDetail;

public interface PerfDetailService {
	List<JournalPerfDetail> selectByJP(JournalPerfDetail record);
}
