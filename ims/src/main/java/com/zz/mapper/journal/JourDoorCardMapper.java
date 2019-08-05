package com.zz.mapper.journal;

import com.zz.po.journal.JourDoorCard;

import java.util.List;
import java.util.Map;

public interface JourDoorCardMapper {

    int insertSelective(JourDoorCard record) throws Exception;
    
    int insertList(Map<String, Object> map) throws Exception;
    
    List<JourDoorCard> selectByPrimaryKey(JourDoorCard record) throws Exception;

    List<JourDoorCard> selectByPrimaryUserId(JourDoorCard record) throws Exception;

    int updateDoorCard(JourDoorCard record) throws Exception;

    int updateDoorCard1(JourDoorCard record) throws Exception;

    List<JourDoorCard> checkLockPassword(JourDoorCard record) throws Exception;

}