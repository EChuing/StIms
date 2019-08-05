package com.zz.service.journal;

import com.zz.mapper.journal.JourAntPasswordMapper;
import com.zz.po.journal.JourAntPassword;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourAntPasswordServiceImpl implements JourAntPasswordService {
    @Autowired
    private JourAntPasswordMapper jourAntPasswordMapper;

    @Override
    public int deleteByPrimaryKey(Integer japId) throws Exception {
        return jourAntPasswordMapper.deleteByPrimaryKey(japId);
    }

    @Override
    public int insertSelective(JourAntPassword record) throws Exception {
        return jourAntPasswordMapper.insertSelective(record);
    }

    @Override
    public JourAntPassword selectByPrimaryKey(Integer japId) throws Exception {
        return jourAntPasswordMapper.selectByPrimaryKey(japId);
    }

    @Override
    public int updateByPrimaryKeySelective(JourAntPassword record) throws Exception {
        return jourAntPasswordMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<JourAntPassword> selectPassword(JourAntPassword record) throws Exception {
        return jourAntPasswordMapper.selectPassword(record);
    }
}
