package com.zz.mapper.journal;

import com.zz.po.journal.JourCare;

import java.util.List;

public interface JourCareMapper {
    int deleteByPrimaryKey(Integer jcId) throws Exception;

    int insertSelective(JourCare record) throws Exception;

    JourCare selectByPrimaryKey(Integer jcId) throws Exception;

    int updateByPrimaryKeySelective(JourCare record) throws Exception;

    List<JourCare> selectCare(JourCare record) throws Exception;
}