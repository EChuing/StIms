package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JournalShortMessageAdministrative;

public interface ShortMessageAdministrativeService {
	//查询所有-数据和统计分开
	List<JournalShortMessageAdministrative> selectAllShortMessage(JournalShortMessageAdministrative record) throws Exception;
	//查询用户的信息
    List<JournalShortMessageAdministrative> getUser(Integer Id) throws Exception;
	
	int deleteByPrimaryKey(Integer smId) throws Exception;

    int insertSelective(JournalShortMessageAdministrative record) throws Exception;

    List<JournalShortMessageAdministrative> selectByPrimaryKey(JournalShortMessageAdministrative record) throws Exception;

    int updateByPrimaryKeySelective(JournalShortMessageAdministrative record) throws Exception;

    int goToDoorPsw(JournalShortMessageAdministrative record) throws Exception;
}
