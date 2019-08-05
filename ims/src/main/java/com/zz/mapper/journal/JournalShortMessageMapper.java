package com.zz.mapper.journal;

import java.util.List;
import com.zz.po.journal.JournalShortMessage;

public interface JournalShortMessageMapper {
	//查询所有-数据和统计分开
	List<JournalShortMessage> selectAllShortMessage(JournalShortMessage record) throws Exception;
	
	JournalShortMessage populationNumber(JournalShortMessage record) throws Exception;
	
	JournalShortMessage getIntendedRenter(JournalShortMessage record) throws Exception;
	
    int deleteByPrimaryKey(Integer smId) throws Exception;

    int insertSelective(JournalShortMessage record) throws Exception;

    List<JournalShortMessage> selectByPrimaryKey(JournalShortMessage record) throws Exception;

    int updateByPrimaryKeySelective(JournalShortMessage record) throws Exception;
    
    JournalShortMessage getPopName(JournalShortMessage record) throws Exception;
    
    JournalShortMessage getNotrentAddress(JournalShortMessage record)throws Exception;
    
    JournalShortMessage getrentAddress(JournalShortMessage record)throws Exception;
    
    List<JournalShortMessage> getDatePeriods(JournalShortMessage record)throws Exception;
    
    List<JournalShortMessage> renewalLandlord(JournalShortMessage record)throws Exception;
    
    List<JournalShortMessage> rentRenewal(JournalShortMessage record)throws Exception;
    
    JournalShortMessage getDepositTime(JournalShortMessage record)throws Exception;
    
    List<JournalShortMessage> selectBatchSend(JournalShortMessage record)throws Exception;
    
    int insertList(List<JournalShortMessage> srelist)throws Exception;
    
    JournalShortMessage getPopulationId (String tel) throws Exception;
    
    JournalShortMessage getLandInfo (JournalShortMessage record) throws Exception;
}