package com.zz.service.push;

import java.util.List;

import com.zz.po.push.Push58Apartment;

public interface Push58ApartmentService {

    int insertSelective(Push58Apartment record) throws Exception;

    List<Push58Apartment> selectByPrimaryKey(Integer p5aId) throws Exception;

    int updateByPrimaryKeySelective(Push58Apartment record) throws Exception;
    
    //添加门店
    String add58Apartment(Push58Apartment record) throws Exception;
    //查询门店
    List<Push58Apartment> query58Apartment(Push58Apartment record) throws Exception;
    //修改门店
    String update58Apartment(Push58Apartment record) throws Exception;

}
