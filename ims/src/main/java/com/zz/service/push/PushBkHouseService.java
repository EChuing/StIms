package com.zz.service.push;

import java.util.List;

import com.zz.po.push.PushBkHouse;

public interface PushBkHouseService {
	
	List<PushBkHouse> queryBkHouse(PushBkHouse record) throws Exception;

    int insertSelective(PushBkHouse record) throws Exception;

    PushBkHouse selectByPrimaryKey(Integer pbhId) throws Exception;

    int updateByPrimaryKeySelective(PushBkHouse record) throws Exception;
    
    //发布房屋
    String publishBkHouse(PushBkHouse record) throws Exception;
    
    //更新房屋
    String editBkHouse(PushBkHouse record) throws Exception;
}
