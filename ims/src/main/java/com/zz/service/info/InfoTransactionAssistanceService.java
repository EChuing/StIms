package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoTransactionAssistance;
import com.zz.po.info.InfoTransactionExpand;

public interface InfoTransactionAssistanceService {
	
	int insertSelective(InfoTransactionAssistance record) throws Exception;
	
	int insertTAList(List<InfoTransactionAssistance> recordList) throws Exception;
    
    List<InfoTransactionExpand> selectAll(InfoTransactionExpand conditions) throws Exception;

    int updateByPrimaryKeySelective(InfoTransactionAssistance record) throws Exception;

	int deleteAssist(InfoTransactionAssistance record) throws Exception;
	
	//修改业绩受益人：先删除再增加
	String updateAssistance(InfoTransactionExpand conditions) throws Exception;
}
