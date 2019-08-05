package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoTransactionAssistance;
import com.zz.po.info.InfoTransactionExpand;

public interface InfoTransactionAssistanceMapper {

    int insertSelective(InfoTransactionAssistance record) throws Exception;
    
    int insertTAList(List<InfoTransactionAssistance> recordList) throws Exception;
    
    List<InfoTransactionExpand> selectAll(InfoTransactionExpand conditions) throws Exception;

    int updateByPrimaryKeySelective(InfoTransactionAssistance record) throws Exception;
    
    int deleteAssist(InfoTransactionAssistance record) throws Exception;
    
    int performanceModificationInterface(InfoTransactionAssistance record)throws Exception;
}