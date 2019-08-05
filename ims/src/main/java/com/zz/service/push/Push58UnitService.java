package com.zz.service.push;

import java.util.List;

import com.zz.po.push.Push58Unit;

public interface Push58UnitService {

    int insertSelective(Push58Unit record) throws Exception;

    List<Push58Unit> selectByPrimaryKey(Integer p5uId) throws Exception;

    int updateByPrimaryKeySelective(Push58Unit record) throws Exception;
    
}
