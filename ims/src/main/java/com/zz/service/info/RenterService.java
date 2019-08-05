package com.zz.service.info;


import java.util.List;

import com.zz.po.info.InfoRenter;
import com.zz.po.info.InfoRenterExpand;

public interface RenterService {
	//专用查询租客姓名
	List<InfoRenterExpand> selectHouseRentName(InfoRenterExpand conditions) throws Exception;
	
	int deleteByPrimaryKey(Integer id) throws Exception;

    int insertSelective(InfoRenterExpand record) throws Exception;
    
    Integer isExist(String idcard) throws Exception;
    
    List<InfoRenterExpand> selectByHouse4rentId(Integer id) throws Exception;
    
    List<InfoRenter> selectByPrimaryKey(Integer id) throws Exception;
    
    List<InfoRenterExpand> selectAll(InfoRenterExpand conditions) throws Exception;

    int updateByPrimaryKeySelective(InfoRenterExpand record) throws Exception;

    int updateByHouse4rentId(InfoRenterExpand record) throws Exception;
    
    //增加记录
    int insertRenter(InfoRenterExpand record) throws Exception;
	
    //根据主键更新记录
    String updateRenter (InfoRenterExpand record) throws Exception;
    
  //租客数据导入查询
  List<InfoRenter> tenantDataImportQuery(Integer renterPopulationId) throws Exception;
    
}
