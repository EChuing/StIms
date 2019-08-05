package com.zz.mapper.sys;

import java.util.List;

import com.zz.po.sys.SysHouseDict;
import com.zz.po.sys.SysHouseDictExpand;

public interface SysHouseDictMapper {
    int deleteByPrimaryKey(Integer hdId) throws Exception;

    int insertSelective(SysHouseDictExpand record) throws Exception;

    List<SysHouseDictExpand> selectAll(SysHouseDictExpand conditions) throws Exception;

    List<SysHouseDictExpand> selectAddDict(SysHouseDictExpand conditions) throws Exception;

    List<SysHouseDictExpand> selectByPrimaryKey(Integer hdId) throws Exception;

    List<String> selectForAddress(SysHouseDictExpand conditions) throws Exception;

    int updateByPrimaryKeySelective(SysHouseDictExpand record) throws Exception;

    SysHouseDict select(SysHouseDict dict);

    List<SysHouseDictExpand> selectAddress(SysHouseDictExpand conditions) throws Exception;

}