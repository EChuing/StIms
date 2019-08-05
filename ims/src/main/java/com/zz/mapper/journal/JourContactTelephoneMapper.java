package com.zz.mapper.journal;


import com.zz.po.journal.JourContactTelephone;

import java.util.List;

public interface JourContactTelephoneMapper {
    int deleteByPrimaryKey(JourContactTelephone jourId);

    int insertSelective(JourContactTelephone record);

    List<JourContactTelephone> selectByPrimaryKey(JourContactTelephone jourId);

    int updateByPrimaryKeySelective(JourContactTelephone record);

}