package com.zz.service.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourChannelUnit;

public interface JourChannelUnitService {
	
	Result<String> saveChannelUnit(JourChannelUnit record) throws Exception;
	
	Result<List<JourChannelUnit>> queryJourChannelUnit(JourChannelUnit record) throws Exception;

	//查询对应方案优先级最高的渠道单位
	Result<List<JourChannelUnit>> queryHighestLevelPlan(JourChannelUnit record) throws Exception;
	
	//添加或者修改签单人
	Result<String> saveSigningPeople(JourChannelUnit record)  throws Exception;
	
	//查询签单人表
	Result<List<JourChannelUnit>> queryJourSigningPeople(JourChannelUnit record) throws Exception;
}
