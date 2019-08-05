package com.zz.service.sys;

import java.util.List;

import com.zz.po.sys.SysHouseDictExpand;

public interface HouseDictService {
		
	 	int deleteByPrimaryKey(Integer hdId) throws Exception;

	    int insertSelective(SysHouseDictExpand record) throws Exception;
	    
	    List<SysHouseDictExpand> selectAll(SysHouseDictExpand conditions) throws Exception;
	    
	    List<SysHouseDictExpand> selectAddDict(SysHouseDictExpand conditions) throws Exception;
	    
	    List<String> selectForAddress(SysHouseDictExpand conditions) throws Exception;

	    List<SysHouseDictExpand> selectByPrimaryKey(Integer hdId) throws Exception;

	    int updateByPrimaryKeySelective(SysHouseDictExpand record) throws Exception;

		List<SysHouseDictExpand> selectAddress(SysHouseDictExpand conditions) throws Exception;
	    
}
