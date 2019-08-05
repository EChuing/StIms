package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JournalMonthlyAccountReceivable;

public interface JournalMonthlyAccountReceivableMapper {
    int deleteByPrimaryKey(Integer jmarId)throws Exception;

    int insertSelective(JournalMonthlyAccountReceivable record)throws Exception;

    JournalMonthlyAccountReceivable selectByPrimaryKey(Integer jmarId)throws Exception;

    int updateByPrimaryKeySelective(JournalMonthlyAccountReceivable record)throws Exception;
    
    List<JournalMonthlyAccountReceivable> selectByHrId(JournalMonthlyAccountReceivable record)throws Exception;

}