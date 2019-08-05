package com.zz.mapper.info;

import com.zz.po.info.InfoHouse4rent;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.integrated.InfoNotRenting;

import java.util.List;

public interface InfoHouse4rentMapper {
	
	Integer selectopenid(InfoHouse4rentExpand conditions) throws Exception;
	//退房查询 
	List<InfoHouse4rentExpand>queryRenterCheckOut(InfoHouse4rentExpand conditions) throws Exception;
	
	List<InfoHouse4rentExpand> getrentiuserId(InfoHouse4rentExpand conditions) throws Exception;
	//增减基数修改
	int arithmetic(InfoHouse4rentExpand record) throws Exception;

    int deleteByPrimaryKey(Integer id) throws Exception;

    int insertSelective(InfoHouse4rentExpand record) throws Exception;
    
    List<InfoHouse4rentExpand> queryHouseRent(InfoHouse4rentExpand conditions) throws Exception;
    
    List<InfoHouse4rentExpand> queryHouseRentCommon(InfoHouse4rentExpand conditions) throws Exception;
    
    List<InfoHouse4rentExpand> selectById(InfoHouse4rentExpand conditions) throws Exception;
    
    List<InfoHouse4rent> selectByPrimaryKey(Integer id) throws Exception;
    
    List<InfoHouse4rent> selectByPrimaryKey1(InfoNotRenting infoNotRenting) throws Exception;
    
    List<String> selectForAddress(InfoHouse4rentExpand conditions) throws Exception;
    
    String selectOfMaxNumber() throws Exception;
   
    int updateByPrimaryKeySelective(InfoHouse4rentExpand record) throws Exception;
    
    int updateHouse4renrManager(InfoHouse4rentExpand record) throws Exception;
    
    int updateHouse4storeManager(InfoHouse4rentExpand record) throws Exception;
    
    //业绩受益人管理：查当前正在出租的房中还没添加业绩受益人的房
    List<InfoHouse4rentExpand> selectNoAssist(InfoHouse4rentExpand conditions) throws Exception;
    
    //出房人修改已租房查询
    List<InfoHouse4rentExpand>selectRentOutOfTheRoom(InfoHouse4rentExpand conditions) throws Exception;
    
    //水电气计费结算查询
    List<InfoHouse4rentExpand> getMeterReadingScheme(InfoHouse4rentExpand conditions) throws Exception;
    
    //租客月度巡查查询-总金额
    List<InfoHouse4rentExpand> getMonthTotalMoney(InfoHouse4rentExpand conditions) throws Exception;
    
    //租客月度巡查查询
    List<InfoHouse4rentExpand> tenantMonthlyInspection(InfoHouse4rentExpand conditions) throws Exception;
    
    //统计已租房源
    int queryHouseRentNum(InfoHouse4rentExpand conditions) throws Exception;
    
    //抄表查询已租房
    List<InfoHouse4rentExpand> meterReadingHasBeenRented(InfoHouse4rentExpand conditions) throws Exception;
    
    int updateSplitIdentifier(InfoHouse4rentExpand record) throws Exception;
    
    //租客账单查询数量
    List<InfoHouse4rentExpand> getRenterBillNum() throws Exception;
    
    //查询逾期房间
    List<InfoHouse4rentExpand> selectOverdueAll(InfoHouse4rentExpand conditions) throws Exception;
    
    //查询正在维保
    List<InfoHouse4rentExpand> selectRepairAll(InfoHouse4rentExpand conditions) throws Exception;
    
    List<InfoHouse4rentExpand> selectButtonNumAll() throws Exception;
    
    //临时账单生成，查询已租房源数据
    List<InfoHouse4rentExpand> queryRentingSourceData(InfoHouse4rentExpand conditions) throws Exception;

    InfoHouse4rentExpand selectRentByTJ(InfoHouse4rentExpand conditions);

    List<InfoHouse4rentExpand> selecttenantAuthorization(InfoHouse4rentExpand infoHouse4rentExpand) throws Exception;
}