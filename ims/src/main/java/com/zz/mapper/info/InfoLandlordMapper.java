package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoLandlord;
import com.zz.po.info.InfoLandlordExpand;

public interface InfoLandlordMapper {
	//专用查询业主姓名与联系方式
	List<InfoLandlordExpand> landlordName(InfoLandlordExpand conditions) throws Exception;

    int deleteByPrimaryKey(Integer id) throws Exception;

    int insertSelective(InfoLandlordExpand record) throws Exception;
    
    Integer isExist(Integer idcard) throws Exception;

    List<InfoLandlord> selectByPrimaryKey(Integer id) throws Exception;
    
    //房东明细查询 
    List<InfoLandlordExpand> selectAll(InfoLandlordExpand conditions) throws Exception;
    
    List<InfoLandlordExpand> selectByHouse4rentOfLandlordId(Integer landlordId) throws Exception;

    String selectOfMaxNumber() throws Exception;
  
    int updateByPrimaryKeySelective(InfoLandlordExpand record) throws Exception;
    
    //房东分组查询
    List<InfoLandlordExpand> landlordGroupQuery(InfoLandlordExpand conditions) throws Exception;
    
    //房东的房屋数量    
    InfoLandlordExpand housingQuantity(InfoLandlordExpand conditions) throws Exception;
    
    //查询房东信息以及房屋数量
    InfoLandlordExpand queryQuantityInformation(InfoLandlordExpand conditions) throws Exception;
}