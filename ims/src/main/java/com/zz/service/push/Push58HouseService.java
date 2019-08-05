package com.zz.service.push;

import java.util.List;

import com.zz.po.push.Push58House;

public interface Push58HouseService {

    int insertSelective(Push58House record) throws Exception;

    List<Push58House> selectByPrimaryKey(Integer p5hId) throws Exception;

    int updateByPrimaryKeySelective(Push58House record) throws Exception;
    
    //发布房源
    String push58House(Push58House record) throws Exception;
    //查询房源
    List<Push58House> query58House(Push58House record) throws Exception;
    //修改房源重新发布
    String update58House(Push58House record) throws Exception;
}
