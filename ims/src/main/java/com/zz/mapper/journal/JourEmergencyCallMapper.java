package com.zz.mapper.journal;

import com.zz.po.journal.JourEmergencyCall;

public interface JourEmergencyCallMapper {

    int insertSelective(JourEmergencyCall record);

    JourEmergencyCall selectByPrimaryKey(JourEmergencyCall record);

    int updateByPrimaryKeySelective(JourEmergencyCall record);
}