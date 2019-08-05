package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoHaveRentCheckOut;
import com.zz.po.info.InfoNotRentCheckOut;

public interface NotRentCheckOutService {
	//删除
    int deleteByPrimaryKey(Integer nrcId)throws Exception;
    
    //新增
    int insertSelective(InfoNotRentCheckOut record)throws Exception;
    
    //查询
    List<InfoNotRentCheckOut> selectByPrimaryKey(InfoNotRentCheckOut record)throws Exception;
    
    //修改
    int updateByPrimaryKeySelective(InfoNotRentCheckOut record)throws Exception;
    
    //暂存、提交
    int saveNotRentCheckOut(InfoNotRentCheckOut record)throws Exception;
    
    //审核、复核、出账
    int noRentModification(InfoNotRentCheckOut record)throws Exception;
    
    //撤销退房 修改盘源状态
    int updateHouseState(InfoNotRentCheckOut record) throws Exception;
    
    //撤销退房 修改未租房状态
    int updateHsState(InfoNotRentCheckOut record) throws Exception;
    
    //业主退房计算退补租金
    InfoNotRentCheckOut selectLandlordCheckoutRent(InfoNotRentCheckOut record) throws Exception;
    
    //查退房总数量
    List<InfoNotRentCheckOut> queryHouseStoreNum() throws Exception;
}
