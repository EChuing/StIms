package com.zz.service.journal;

import com.zz.mapper.journal.JourContactTelephoneMapper;
import com.zz.po.journal.JourContactTelephone;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourContactTelephoneServiceImpl implements JourContactTelephoneService{
    @Autowired
    private JourContactTelephoneMapper jourContactTelephoneMapper;
    @Override
    public List<JourContactTelephone> selectJourCall(JourContactTelephone jourContactTelephone) throws Exception {
        return jourContactTelephoneMapper.selectByPrimaryKey(jourContactTelephone);
    }

    @Override
    public int insertJourCall(JourContactTelephone jourContactTelephone) throws Exception {
        return jourContactTelephoneMapper.insertSelective(jourContactTelephone);
    }

    @Override
    public int updataJourCall(JourContactTelephone jourContactTelephone) throws Exception {
        return jourContactTelephoneMapper.deleteByPrimaryKey(jourContactTelephone);
    }

    @Override
    public int deleteJourTellphone(JourContactTelephone jourContactTelephone) throws Exception {
        return jourContactTelephoneMapper.deleteByPrimaryKey(jourContactTelephone);
    }


}
