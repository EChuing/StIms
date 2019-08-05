package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JournalEventApproval;

public interface EventApprovalService {
	//删除
    int deleteByPrimaryKey(Integer eaId)throws Exception;
    
    //新增
    int insertSelective(JournalEventApproval record)throws Exception;
    
    //查询所有
    List<JournalEventApproval> selectAll(JournalEventApproval record)throws Exception;
    
    //查询所有-数据和统计分开
    List<JournalEventApproval> selectAllEvent(JournalEventApproval record)throws Exception;
    
    //修改
    int updateByPrimaryKeySelective(JournalEventApproval record)throws Exception;
    
    List<JournalEventApproval> selectById(Integer eaId)throws Exception;
    
    //处理事务
    int handleEvent(JournalEventApproval record)throws Exception;
}
