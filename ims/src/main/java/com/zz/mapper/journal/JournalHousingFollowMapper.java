package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JournalHousingFollow;
import com.zz.po.journal.JournalHousingFollowExpand;

public interface JournalHousingFollowMapper {
  
	List<JournalHousingFollowExpand> selectAllHouseFollow(JournalHousingFollow record) throws Exception;
	
    int deleteByPrimaryKey(Integer id) throws Exception;

    int insertSelective(JournalHousingFollowExpand record) throws Exception;

    List<JournalHousingFollowExpand> selectByPrimaryKey(Integer id) throws Exception;
    
    List<JournalHousingFollowExpand> selectByHouse4rentId(Integer houseId) throws Exception;
    
    List<JournalHousingFollowExpand> selectAll(JournalHousingFollowExpand conditions) throws Exception;

    int updateByPrimaryKeySelective(JournalHousingFollow record) throws Exception;
    
    int updateByHouse4rentId(JournalHousingFollow record) throws Exception;

	int insertFollowList(List<JournalHousingFollowExpand> record)throws Exception;
	
	int financialInsertHousingFollow(List<JournalHousingFollowExpand> record)throws Exception;
}