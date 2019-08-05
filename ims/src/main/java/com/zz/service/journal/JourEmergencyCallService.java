package com.zz.service.journal;

import com.zz.po.journal.JourEmergencyCall;

public interface JourEmergencyCallService {

    JourEmergencyCall selectJourCall(JourEmergencyCall jourEmergencyCall) throws Exception;

    int insertJourCall(JourEmergencyCall jourEmergencyCall)throws Exception;

    int updataJourCall(JourEmergencyCall jourEmergencyCall)throws Exception;
}
