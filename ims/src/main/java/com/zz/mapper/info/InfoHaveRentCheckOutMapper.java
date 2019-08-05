package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoHaveRentCheckOut;
import com.zz.po.info.InfoHouse4rentExpand;

public interface InfoHaveRentCheckOutMapper {
	//押金查询 
	List<InfoHaveRentCheckOut> queryDeposit(InfoHaveRentCheckOut record)throws Exception;
	
	//删除
    int deleteByPrimaryKey(InfoHaveRentCheckOut record) throws Exception;
    
    //新增
    int insertSelective(InfoHaveRentCheckOut record) throws Exception;
    
    //查询所有与条件查询
    List<InfoHaveRentCheckOut> selectByPrimaryKey(InfoHaveRentCheckOut record) throws Exception;
    
    //修改
    int updateByPrimaryKeySelective(InfoHaveRentCheckOut record) throws Exception;
    
    //撤销退房 修改已租未租的状态
    int updateHrState(InfoHaveRentCheckOut record) throws Exception;
   
    int updateHsState(InfoHaveRentCheckOut record) throws Exception;
    
    //将租客退房打回正办理退房
    int recoveryHaveRentCheckOut(InfoHaveRentCheckOut record) throws Exception;
   
    int recoveryHaveRent(InfoHaveRentCheckOut record) throws Exception;

    //查退房总数量
    List<InfoHaveRentCheckOut> queryHouseRentNum() throws Exception;
}