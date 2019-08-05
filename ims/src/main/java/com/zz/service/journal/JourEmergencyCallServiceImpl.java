package com.zz.service.journal;

import com.zz.mapper.journal.JourEmergencyCallMapper;
import com.zz.po.journal.JourEmergencyCall;
import org.springframework.beans.factory.annotation.Autowired;

public class JourEmergencyCallServiceImpl implements JourEmergencyCallService{
    @Autowired
    private JourEmergencyCallMapper jourEmergencyCallMapper;
    @Override
    public JourEmergencyCall selectJourCall(JourEmergencyCall jourEmergencyCall) throws Exception {
        return jourEmergencyCallMapper.selectByPrimaryKey(jourEmergencyCall);
    }

    @Override
    public int insertJourCall(JourEmergencyCall jourEmergencyCall) throws Exception {
        return jourEmergencyCallMapper.insertSelective(jourEmergencyCall);
    }

    @Override
    public int updataJourCall(JourEmergencyCall jourEmergencyCall) throws Exception {
        return jourEmergencyCallMapper.updateByPrimaryKeySelective(jourEmergencyCall);
    }
}
