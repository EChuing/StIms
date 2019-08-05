package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoHaveRentCheckOut;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoNotRentCheckOut;

public interface InfoNotRentCheckOutMapper {
	//删除
    int deleteByPrimaryKey(Integer nrcId)throws Exception;
    
    //新增
    int insertSelective(InfoNotRentCheckOut record)throws Exception;
    
    //查询
    List<InfoNotRentCheckOut> selectByPrimaryKey(InfoNotRentCheckOut record)throws Exception;
    
    //修改
    int updateByPrimaryKeySelective(InfoNotRentCheckOut record)throws Exception;
    
    //撤销退房 修改未租房和盘源的的状态
    int updateHouseState(InfoNotRentCheckOut record) throws Exception;
   
    int updateHsState(InfoNotRentCheckOut record) throws Exception;

    //查退房总数量
    List<InfoNotRentCheckOut> queryHouseStoreNum() throws Exception;
}