package com.zz.mapper.journal;

import com.zz.po.journal.JournalContractDatabase;

import java.util.List;

public interface JournalContractDatabaseMapper {
    int deleteByPrimaryKey(Integer jcdId)throws Exception;

    int insertSelective(JournalContractDatabase record)throws Exception;

    List<JournalContractDatabase> selectByPrimaryKey(JournalContractDatabase record)throws Exception;

    int updateByPrimaryKeySelective(JournalContractDatabase record)throws Exception;
    
    //批量生成合约编号
    int batchGenerationContractNumber(List<JournalContractDatabase> list)throws Exception;
    
    //批量修改合约
    int batchUpdateContract(List<JournalContractDatabase> jcdlist)throws Exception;
    
    //单独查询 
    List<JournalContractDatabase> selectcontractDatabase(List<JournalContractDatabase> record)throws Exception;
    
    //前缀编号查询
    List<JournalContractDatabase> selectPrefixNum(JournalContractDatabase record)throws Exception;
    //根据合同编号修改
    int updatePrefixNum(JournalContractDatabase record)throws Exception;

    //清除票据编号使用信息
    int clearBillNum(JournalContractDatabase record)throws Exception;
    
}