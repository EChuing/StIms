package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JournalDailyCardNumber;

public interface DailyCardNumberService {
	int deleteByPrimaryKey(Integer jdcnId) throws Exception;

    int insertSelective(JournalDailyCardNumber record) throws Exception;

    List<JournalDailyCardNumber> selectByPrimaryKey(JournalDailyCardNumber record) throws Exception;

    int updateByPrimaryKeySelective(JournalDailyCardNumber record) throws Exception;
}
