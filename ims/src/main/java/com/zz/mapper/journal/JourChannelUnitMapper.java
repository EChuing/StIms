package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourChannelUnit;

public interface JourChannelUnitMapper {
	
	List<JourChannelUnit> queryJourChannelUnit(JourChannelUnit record) throws Exception;
	
	//查询对应方案优秀级最高的渠道单位
	List<JourChannelUnit> queryHighestLevelPlan(JourChannelUnit record) throws Exception;
	
	int insertSelective(JourChannelUnit record) throws Exception;
	
	int updateByPrimaryKeySelective(JourChannelUnit record) throws Exception;
	
	
	//签单人表
	List<JourChannelUnit> queryJourSigningPeople(JourChannelUnit record) throws Exception;
	int insertJourSigningPeople(JourChannelUnit record) throws Exception;
	int updateByJspId(JourChannelUnit record) throws Exception;
}
