package com.zz.mapper.push;

import java.util.List;

import com.zz.po.push.PushBkHouse;

public interface PushBkHouseMapper {
    
	List<PushBkHouse> queryBkHouse(PushBkHouse record) throws Exception;

    int insertSelective(PushBkHouse record) throws Exception;

    PushBkHouse selectByPrimaryKey(Integer pbhId) throws Exception;

    int updateByPrimaryKeySelective(PushBkHouse record) throws Exception;

}