package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JournalDailyCardNumber;

public interface JournalDailyCardNumberMapper {
    int deleteByPrimaryKey(Integer jdcnId) throws Exception;

    int insertSelective(JournalDailyCardNumber record) throws Exception;

    List<JournalDailyCardNumber> selectByPrimaryKey(JournalDailyCardNumber record) throws Exception;
    
   // List<JournalDailyCardNumber> selectAll(JournalDailyCardNumber record) throws Exception;

    int updateByPrimaryKeySelective(JournalDailyCardNumber record) throws Exception;

}