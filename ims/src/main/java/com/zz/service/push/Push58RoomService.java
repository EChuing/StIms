package com.zz.service.push;

import java.util.List;

import com.zz.po.push.Push58Room;

public interface Push58RoomService {

    int insertSelective(Push58Room record) throws Exception;

    List<Push58Room> selectByPrimaryKey(Integer p5rId) throws Exception;

    int updateByPrimaryKeySelective(Push58Room record) throws Exception;
    
    //添加房型
    String add58Room(Push58Room record) throws Exception;
    //查询房型
    List<Push58Room> query58Room(Push58Room record) throws Exception;
    //修改房型
    String update58Room(Push58Room record) throws Exception;
}
