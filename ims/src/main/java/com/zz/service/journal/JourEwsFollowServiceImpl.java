package com.zz.service.journal;

import com.zz.mapper.journal.JourEwsFollowMapper;
import com.zz.po.journal.JourEwsFollow;

import javax.annotation.Resource;
import java.util.List;

public class JourEwsFollowServiceImpl implements JourEwsFollowService{
    @Resource
    private JourEwsFollowMapper jourEwsFollowMapper;
    @Override
    public int deleteByPrimaryKey(Integer id)throws Exception {
        return jourEwsFollowMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insertSelective(JourEwsFollow record)throws Exception {
        return jourEwsFollowMapper.insertSelective(record);
    }

    @Override
    public List<JourEwsFollow> selectByPrimaryKey(JourEwsFollow record) throws Exception{
        return jourEwsFollowMapper.selectByPrimaryKey(record);
    }

    @Override
    public int updateByPrimaryKeySelective(JourEwsFollow record)throws Exception {
        return jourEwsFollowMapper.updateByPrimaryKeySelective(record);
    }
}
