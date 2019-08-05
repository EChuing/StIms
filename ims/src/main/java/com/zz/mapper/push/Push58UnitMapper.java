package com.zz.mapper.push;

import java.util.List;

import com.zz.po.push.Push58Unit;

public interface Push58UnitMapper {

    int insertSelective(Push58Unit record) throws Exception;

    List<Push58Unit> selectByPrimaryKey(Integer p5uId) throws Exception;

    int updateByPrimaryKeySelective(Push58Unit record) throws Exception;
    
}