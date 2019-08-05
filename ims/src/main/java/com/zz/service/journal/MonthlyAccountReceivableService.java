package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JournalMonthlyAccountReceivable;

public interface MonthlyAccountReceivableService {
	int deleteByPrimaryKey(Integer jmarId)throws Exception;

    int insertSelective(JournalMonthlyAccountReceivable record)throws Exception;

    JournalMonthlyAccountReceivable selectByPrimaryKey(Integer jmarId)throws Exception;

    int updateByPrimaryKeySelective(JournalMonthlyAccountReceivable record)throws Exception;
    
    List<JournalMonthlyAccountReceivable> selectByHrId(JournalMonthlyAccountReceivable record)throws Exception;
    
    //新增财务收支与历史能源账单、更新未租房能源字段
    int insertFinancialEnergyBill(JournalMonthlyAccountReceivable record)throws Exception;

}
