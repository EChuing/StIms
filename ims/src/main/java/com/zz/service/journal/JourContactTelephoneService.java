package com.zz.service.journal;

import com.zz.po.journal.JourContactTelephone;

import java.util.List;

public interface JourContactTelephoneService {

    List<JourContactTelephone> selectJourCall(JourContactTelephone jourContactTelephone) throws Exception;

    int insertJourCall(JourContactTelephone jourContactTelephone)throws Exception;

    int updataJourCall(JourContactTelephone jourContactTelephone)throws Exception;

    int deleteJourTellphone(JourContactTelephone jourContactTelephone) throws Exception;
}
