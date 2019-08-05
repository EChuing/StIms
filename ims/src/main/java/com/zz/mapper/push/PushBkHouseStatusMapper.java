package com.zz.mapper.push;

import java.util.List;

import com.zz.po.push.PushBkHouseStatus;

public interface PushBkHouseStatusMapper {

    int insertSelective(PushBkHouseStatus record);
    
    List<PushBkHouseStatus> queryBkHouseStatus(PushBkHouseStatus record);
    
    PushBkHouseStatus selectByPrimaryKey(Integer pbhsId);

    int updateByPrimaryKeySelective(PushBkHouseStatus record);

}