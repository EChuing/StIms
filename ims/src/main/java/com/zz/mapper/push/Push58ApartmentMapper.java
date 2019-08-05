package com.zz.mapper.push;

import java.util.List;

import com.zz.po.push.Push58Apartment;

public interface Push58ApartmentMapper {

    int insertSelective(Push58Apartment record) throws Exception;

    List<Push58Apartment> selectByPrimaryKey(Integer p5aId) throws Exception;

    int updateByPrimaryKeySelective(Push58Apartment record) throws Exception;
    
    //查询房源
    List<Push58Apartment> query58Apartment(Push58Apartment record) throws Exception;
}