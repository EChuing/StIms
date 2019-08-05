package com.zz.service.journal;

import com.zz.po.journal.JourSmsTemplate;

import java.util.List;

public interface JourSmsTemplateService {
    int deleteByPrimaryKey(Integer jstId) throws Exception;

    int insertSelective(JourSmsTemplate record) throws Exception;

    JourSmsTemplate selectByPrimaryKey(Integer jstId) throws Exception;

    int updateByPrimaryKeySelective(JourSmsTemplate record) throws Exception;

    List<JourSmsTemplate> queryShortMessageTemplate(JourSmsTemplate record) throws Exception;
}
