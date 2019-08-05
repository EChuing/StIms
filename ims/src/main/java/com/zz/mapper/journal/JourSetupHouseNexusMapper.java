package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourSetupHouseNexus;

public interface JourSetupHouseNexusMapper {
	List<JourSetupHouseNexus> selectByPrimaryKey(JourSetupHouseNexus record) throws Exception;
	
	
	int insertSelective(JourSetupHouseNexus record) throws Exception;
}
