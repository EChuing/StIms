package com.zz.mapper.journal;

import com.zz.po.journal.JournalRepairExpand;

import java.util.List;

public interface JournalRepairMapper {
	//查询所有-数据和统计分开
	List<JournalRepairExpand> selectAllRepair(JournalRepairExpand conditions) throws Exception;
	
	List<JournalRepairExpand> selectAllTask(JournalRepairExpand conditions) throws Exception;

    int insertSelective(JournalRepairExpand record) throws Exception;

    List<JournalRepairExpand> selectByPrimaryKey(Integer id) throws Exception;
    
    int updateByPrimaryKeySelective(JournalRepairExpand record) throws Exception;
    
    //退房查维修
    List<JournalRepairExpand> selectRepairByAnyCondition(JournalRepairExpand conditions) throws Exception;
    //批量添加保洁
    int insertListRepair(List<JournalRepairExpand> list) throws Exception;
    
    
}