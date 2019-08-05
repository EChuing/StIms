package com.zz.mapper.journal;

import com.zz.po.journal.JourEwsFollow;

import java.util.List;

public interface JourEwsFollowMapper {
    int deleteByPrimaryKey(Integer id) throws Exception;

    int insertSelective(JourEwsFollow record) throws Exception;

    List<JourEwsFollow> selectByPrimaryKey(JourEwsFollow record) throws Exception;

    int updateByPrimaryKeySelective(JourEwsFollow record) throws Exception;

}