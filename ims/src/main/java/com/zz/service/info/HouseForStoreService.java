package com.zz.service.info;


import java.util.List;

import com.zz.po.commons.Result;
import org.apache.ibatis.annotations.Param;

import com.zz.po.info.InfoHouse4storeExpand;

public interface HouseForStoreService {
	//查询房管员，默认联系人的姓名电话；
	
	
	//没有盘源资料，添加未租房
	String insertNoRoomAdditions(InfoHouse4storeExpand conditions) throws Exception;

	String oneToManyAddTrusteeship(InfoHouse4storeExpand conditions) throws Exception;

	//合租房还原未租房
	int reductionOfRent(InfoHouse4storeExpand conditions) throws Exception;
	
	//根据母房id查询子房
	List<InfoHouse4storeExpand>flatShareRealQuery(InfoHouse4storeExpand conditions) throws Exception;
	
	//合租房/集散房 子房修改
	int flatShareRealChange(InfoHouse4storeExpand conditions, int houseType) throws Exception;
	
	//分租房拆分SplitRent
	int splitRentHouse(InfoHouse4storeExpand conditions, int houseType) throws Exception;
	
	//未租房综合新增
	String notRentAComprehensiveNew(InfoHouse4storeExpand conditions) throws Exception;
	
	//添加集中房
	String insertSplitHouseForStore(InfoHouse4storeExpand conditions) throws Exception;
	
	//未租退房查询
	List<InfoHouse4storeExpand>queryLandlordCheckOut(InfoHouse4storeExpand conditions) throws Exception;
	
	List<InfoHouse4storeExpand> getAllHouseForStoreInCard (InfoHouse4storeExpand conditions) throws Exception;
	
	List<InfoHouse4storeExpand> getStoreUserId (InfoHouse4storeExpand conditions) throws Exception;
	//清空定金
	int clearDeposit(InfoHouse4storeExpand conditions)throws Exception;
	
	//数据导入查询
	List<InfoHouse4storeExpand> selectStoreData (InfoHouse4storeExpand conditions) throws Exception;
	
	List<InfoHouse4storeExpand> huosestoreWeg(InfoHouse4storeExpand conditions) throws Exception;

	List<InfoHouse4storeExpand> remoteMeterReading(InfoHouse4storeExpand conditions) throws Exception;
	
	//修改基数
	int modifyTheBase(InfoHouse4storeExpand record) throws Exception;
	
	int deleteByPrimaryKey(Integer id) throws Exception;

    int insertSelective(InfoHouse4storeExpand record) throws Exception;

    List<InfoHouse4storeExpand> selectByPrimaryKey(Integer id) throws Exception;
    
    String selectOfMaxNumber() throws Exception;

    int updateByPrimaryKeySelective(InfoHouse4storeExpand record) throws Exception;
    
    //业绩受益人管理：查当前正在托管的房中还没添加业绩受益人的房 
    List<InfoHouse4storeExpand> selectNoAssist(InfoHouse4storeExpand conditions) throws Exception;
    
    //已租房修改托管信息查询
  	List<InfoHouse4storeExpand>selectModifiedHosting(InfoHouse4storeExpand conditions) throws Exception;
  	
  	//统计未租房源
    int queryHouseStoreNum(InfoHouse4storeExpand conditions) throws Exception;
    
    /**
     * 统计不同状态的未租房数量
     * @param state 未租房的租赁状态
     * @return 未租房数量
     */
    int countVacantHouse(@Param("state") String state);
    
    //房管员、默认联系人的姓名联系方式
    InfoHouse4storeExpand publishAContact(InfoHouse4storeExpand conditions) throws Exception;
    
    //未租房查询数量
    List<InfoHouse4storeExpand> getInfoHouse4storeNum(InfoHouse4storeExpand conditions) throws Exception;
    
    //未租查询维保的
  	List<InfoHouse4storeExpand> queryMaintenance(InfoHouse4storeExpand conditions) throws Exception;
    //查询未租房间
    List<InfoHouse4storeExpand> queryHouseStore(InfoHouse4storeExpand conditions) throws Exception;
    //查询未租房间
    List<InfoHouse4storeExpand> queryHouseStoreCommon(InfoHouse4storeExpand conditions) throws Exception;
    
    int updateCentralizedApartment(InfoHouse4storeExpand conditions) throws Exception;

	int centralizedReduction(InfoHouse4storeExpand conditions) throws Exception;

	List<InfoHouse4storeExpand> selectHsHouse(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception;
	//批量添加集中房
	String insertBatchHouseForStore(InfoHouse4storeExpand conditions) throws Exception;

	List<InfoHouse4storeExpand> selectHouse(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception;

	//批量修改上下架房源
	int updateBatchHouseForStore(List<InfoHouse4storeExpand> jsonArray) throws Exception;
	//查已住短租房
	List<InfoHouse4storeExpand> selectHotel(List<InfoHouse4storeExpand> list) throws Exception;

	Result<String> batchAddHouseRoom(InfoHouse4storeExpand conditions) throws Exception;

    Integer dealExpiredOrders();
}
