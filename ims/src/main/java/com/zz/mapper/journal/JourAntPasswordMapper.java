package com.zz.mapper.journal;

import com.zz.po.journal.JourAntPassword;

import java.util.List;

public interface JourAntPasswordMapper {
    int deleteByPrimaryKey(Integer japId) throws Exception;

    int insertSelective(JourAntPassword record) throws Exception;

    JourAntPassword selectByPrimaryKey(Integer japId) throws Exception;

    int updateByPrimaryKeySelective(JourAntPassword record) throws Exception;

    List<JourAntPassword> selectPassword(JourAntPassword record) throws Exception;
}