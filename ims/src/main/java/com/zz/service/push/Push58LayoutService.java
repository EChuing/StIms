package com.zz.service.push;

import java.util.List;

import com.zz.po.push.Push58Layout;

public interface Push58LayoutService {

    int insertSelective(Push58Layout record) throws Exception;

    List<Push58Layout> selectByPrimaryKey(Integer p5lId) throws Exception;

    int updateByPrimaryKeySelective(Push58Layout record) throws Exception;
    
    //添加房型
    String add58Layout(Push58Layout record) throws Exception;
    //查询房型
    List<Push58Layout> query58Layout(Push58Layout record) throws Exception;
    //修改房型
    String update58Layout(Push58Layout record) throws Exception;
}
