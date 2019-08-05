package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoHaveRentCheckOut;

public interface HaveRentCheckOutService {
	
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
    
    //已租房退房合约、分期账单处理
    int checkOutHandling(InfoHaveRentCheckOut record) throws Exception;
    
    //将租客退房打回正办理退房
    int recoveryHaveRentCheckOut(InfoHaveRentCheckOut record) throws Exception;
   
    int recoveryHaveRent(InfoHaveRentCheckOut record) throws Exception;
    
    //租客退房查询
    InfoHaveRentCheckOut selectBasicData (InfoHaveRentCheckOut record) throws Exception;
    
    //新增-业务处理接口
    int insertInfoHaveRentCheckOut(InfoHaveRentCheckOut record) throws Exception;
    
    //申请退房、保存、提交修改
    int updataInfoHaveRentCheckOut(InfoHaveRentCheckOut record) throws Exception;
    
    //审核退房
    int updateChecOutAudit(InfoHaveRentCheckOut record) throws Exception;
	  
    //查退房总数量
    List<InfoHaveRentCheckOut> queryHouseRentNum() throws Exception;
}
