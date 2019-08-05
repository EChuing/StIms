package com.zz.mapper.info;

import com.zz.po.info.InfoRenter;
import com.zz.po.info.InfoRenterExpand;

import java.util.List;

public interface InfoRenterMapper {
	//专用查询租客姓名
	List<InfoRenterExpand> selectHouseRentName(InfoRenterExpand conditions) throws Exception;
   
    int deleteByPrimaryKey(Integer id) throws Exception;

    int insertSelective(InfoRenterExpand record) throws Exception;

    List<InfoRenterExpand> selectByHouse4rentId(Integer id) throws Exception;
    
    Integer isExist(String idcard) throws Exception;
    
    List<InfoRenterExpand> selectAll(InfoRenterExpand conditions) throws Exception;

    InfoRenterExpand selectIdCard(InfoRenterExpand conditions) throws Exception;
    
    List<InfoRenter> selectByPrimaryKey(Integer id) throws Exception;

    int updateByPrimaryKeySelective(InfoRenterExpand record) throws Exception;

    int updateByHouse4rentId(InfoRenterExpand record) throws Exception;
    
    //租客数据导入查询
    List<InfoRenter> tenantDataImportQuery(Integer renterPopulationId) throws Exception;
    
}