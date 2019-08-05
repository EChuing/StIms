package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JournalWegReading;

public interface JournalWegReadingMapper {
	
	//查询所有-数据和统计分开
	List<JournalWegReading> selectAllWegReading(JournalWegReading conditions)throws Exception;
	
	//查询出 已租房 最新的已算水电气读数
	List<JournalWegReading> isReading(JournalWegReading conditions)throws Exception;
	
	//删除
    int deleteByPrimaryKey(Integer wegrdId) throws Exception;
    
    //新增一条记录
    int insert(JournalWegReading record) throws Exception;
    
    //根据ID查询 
    List<JournalWegReading> selectByPrimaryKey(Integer wegrdId) throws Exception;
    
    JournalWegReading selectLast(JournalWegReading conditions) throws Exception;
    
    int updateState(JournalWegReading record) throws Exception;
    
    //查询所有，给条件则为条件查询
    List<JournalWegReading> selectWegReadingAll(JournalWegReading record) throws Exception;
     
    //修改
    int updateByPrimaryKey(JournalWegReading record) throws Exception;
    
    int signingRentWegReading(List<JournalWegReading> record) throws Exception;
    
    //根据抄表读数查抄表日期
    List<JournalWegReading> selectWegDate(JournalWegReading record) throws Exception;
    
  //智能设备抄表
  	List<JourDevice> queryDevice(int id);
}