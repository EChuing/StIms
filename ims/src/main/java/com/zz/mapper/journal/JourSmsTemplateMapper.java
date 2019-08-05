package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourSmsTemplate;

public interface JourSmsTemplateMapper {
    int deleteByPrimaryKey(Integer jstId) throws Exception;

    int insertSelective(JourSmsTemplate record) throws Exception;

    JourSmsTemplate selectByPrimaryKey(Integer jstId) throws Exception;

    int updateByPrimaryKeySelective(JourSmsTemplate record) throws Exception;

    List<JourSmsTemplate> queryShortMessageTemplate(JourSmsTemplate record) throws Exception;
}