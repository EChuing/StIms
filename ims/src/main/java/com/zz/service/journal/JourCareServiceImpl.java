package com.zz.service.journal;

import com.zz.mapper.journal.JourCareMapper;
import com.zz.po.journal.JourCare;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


public class JourCareServiceImpl implements JourCareService {
    @Autowired
    private JourCareMapper jourCareMapper;

    @Override
    public int deleteByPrimaryKey(Integer jcId) throws Exception {
        return jourCareMapper.deleteByPrimaryKey(jcId);
    }

    @Override
    public int insertSelective(JourCare record) throws Exception {
        return jourCareMapper.insertSelective(record);
    }

    @Override
    public JourCare selectByPrimaryKey(Integer jcId) throws Exception {
        return jourCareMapper.selectByPrimaryKey(jcId);
    }

    @Override
    public int updateByPrimaryKeySelective(JourCare record) throws Exception {
        return jourCareMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<JourCare> selectCare(JourCare record) throws Exception {
        return jourCareMapper.selectCare(record);
    }
}
