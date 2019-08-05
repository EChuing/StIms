package com.zz.service.journal;

import com.zz.mapper.journal.JourSmsTemplateMapper;
import com.zz.po.journal.JourSmsTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourSmsTemplateServiceImpl implements JourSmsTemplateService {
    @Autowired
    private JourSmsTemplateMapper jourSmsTemplateMapper;

    @Override
    public int deleteByPrimaryKey(Integer jstId) throws Exception {
        return jourSmsTemplateMapper.deleteByPrimaryKey(jstId);
    }

    @Override
    public int insertSelective(JourSmsTemplate record) throws Exception {
        return jourSmsTemplateMapper.insertSelective(record);
    }

    @Override
    public JourSmsTemplate selectByPrimaryKey(Integer jstId) throws Exception {
        return jourSmsTemplateMapper.selectByPrimaryKey(jstId);
    }

    @Override
    public int updateByPrimaryKeySelective(JourSmsTemplate record) throws Exception {
        return jourSmsTemplateMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<JourSmsTemplate> queryShortMessageTemplate(JourSmsTemplate record) throws Exception {
        return jourSmsTemplateMapper.queryShortMessageTemplate(record);
    }
}
