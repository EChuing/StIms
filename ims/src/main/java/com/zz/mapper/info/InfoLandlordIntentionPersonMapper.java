package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoLandlordIntentionPerson;

public interface InfoLandlordIntentionPersonMapper {
	
	List<InfoLandlordIntentionPerson> getpersonUserId(InfoLandlordIntentionPerson record)throws Exception;
	
	int deleteByPrimaryKey(Integer lipId)throws Exception;

    int insertSelective(InfoLandlordIntentionPerson record)throws Exception;

    List<InfoLandlordIntentionPerson> selectByPrimaryKey(InfoLandlordIntentionPerson record)throws Exception;

    int updateByPrimaryKeySelective(InfoLandlordIntentionPerson record)throws Exception;
}