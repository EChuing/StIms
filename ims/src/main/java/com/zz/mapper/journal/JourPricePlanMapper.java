package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourPricePlan;

public interface JourPricePlanMapper {

	List<JourPricePlan> queryJourPricePlan(JourPricePlan record) throws Exception;
	
	List<JourPricePlan> selectByPrimaryKeySelective(JourPricePlan record) throws Exception;

	int insertSelective(JourPricePlan record) throws Exception;
	
	int updateByPrimaryKeySelective(JourPricePlan record) throws Exception;

	int updateJppState(List<JourPricePlan> jppList) throws Exception;
}
