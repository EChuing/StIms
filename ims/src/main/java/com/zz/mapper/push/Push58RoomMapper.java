package com.zz.mapper.push;

import java.util.List;

import com.zz.po.push.Push58Room;

public interface Push58RoomMapper {

    int insertSelective(Push58Room record) throws Exception;

    List<Push58Room> selectByPrimaryKey(Integer p5rId) throws Exception;

    int updateByPrimaryKeySelective(Push58Room record) throws Exception;
    
    //查询房间
    List<Push58Room> query58Room(Push58Room record) throws Exception;
}