package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JournalContractDatabase;

public interface ContractDatabaseService {
	//数据导入合约编号新增
	int contractDatabaseInsert(JournalContractDatabase record)throws Exception;
	
	int deleteByPrimaryKey(Integer jcdId)throws Exception;

    String insertSelective(JournalContractDatabase record)throws Exception;

    List<JournalContractDatabase> selectByPrimaryKey(JournalContractDatabase record)throws Exception;

    int updateByPrimaryKeySelective(JournalContractDatabase record)throws Exception;
    
    //领取
    String updataReceiveAContract(JournalContractDatabase record)throws Exception;
    
  //前缀编号查询
    List<JournalContractDatabase> selectPrefixNum(JournalContractDatabase record)throws Exception;
    
    //合约编号的检测
    int contractNumberdetection(JournalContractDatabase journalContractDatabase)throws Exception;
    
    public int getJcdId(String billNum) throws Exception;
    
}
