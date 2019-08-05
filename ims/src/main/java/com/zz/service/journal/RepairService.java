package com.zz.service.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.journal.JournalRepairExpand;

public interface RepairService {
	//查询所有-数据和统计分开
	List<JournalRepairExpand> selectAllRepair(JournalRepairExpand conditions) throws Exception;
	
	List<JournalRepairExpand> selectAllTask(JournalRepairExpand conditions) throws Exception;
	
    int insertSelective(JournalRepairExpand record) throws Exception;
    
    //批量插入维保
    Result<String> insertListRepair(JournalRepairExpand record) throws Exception;
    
    List<JournalRepairExpand> selectByPrimaryKey(Integer id) throws Exception;

    int updateByPrimaryKeySelective(JournalRepairExpand record) throws Exception;
    
    //退房查维修
    List<JournalRepairExpand> selectRepairByAnyCondition(JournalRepairExpand conditions) throws Exception;

}
