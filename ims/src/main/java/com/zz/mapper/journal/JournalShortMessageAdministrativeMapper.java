package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JournalShortMessageAdministrative;

public interface JournalShortMessageAdministrativeMapper {
	
	//查询所有-数据和统计分开
	List<JournalShortMessageAdministrative> selectAllShortMessage(JournalShortMessageAdministrative record) throws Exception;
	
	//查询用户的信息
    List<JournalShortMessageAdministrative> getUser(Integer Id) throws Exception;
	
    int deleteByPrimaryKey(Integer smId) throws Exception;

    int insertSelective(JournalShortMessageAdministrative record) throws Exception;

    List<JournalShortMessageAdministrative> selectByPrimaryKey(JournalShortMessageAdministrative record) throws Exception;

    int updateByPrimaryKeySelective(JournalShortMessageAdministrative record) throws Exception;
    
}
