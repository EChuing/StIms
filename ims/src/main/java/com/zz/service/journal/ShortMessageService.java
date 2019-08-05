package com.zz.service.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.journal.JournalShortMessage;

public interface ShortMessageService {
	//查询所有-数据和统计分开
	List<JournalShortMessage> selectAllShortMessage(JournalShortMessage record) throws Exception;
	
	JournalShortMessage populationNumber(JournalShortMessage record) throws Exception;
	
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
   
   //综合短信发送
   int integratedSmsSending (JournalShortMessage journalShortMessage) throws Exception;
   
   //发送外部短信（新版本）
   Result<String> sendOutsideMessage(JournalShortMessage journalShortMessage) throws Exception;
}
