package com.zz.service.push;

import java.util.List;

import com.zz.mapper.push.Push58UnitMapper;
import com.zz.po.push.Push58Unit;

public class Push58UnitServiceImpl implements Push58UnitService {
    private Push58UnitMapper push58UnitMapper;

    public void setPush58UnitMapper(Push58UnitMapper push58UnitMapper) {
        this.push58UnitMapper = push58UnitMapper;
    }

    @Override
    public int insertSelective(Push58Unit record) throws Exception {
        return push58UnitMapper.insertSelective(record);
    }

    @Override
    public List<Push58Unit> selectByPrimaryKey(Integer p5uId) throws Exception {
        return push58UnitMapper.selectByPrimaryKey(p5uId);
    }

    @Override
    public int updateByPrimaryKeySelective(Push58Unit record) throws Exception {
        return push58UnitMapper.updateByPrimaryKeySelective(record);
    }

}
