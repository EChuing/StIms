package com.zz.service.sys;

import java.util.List;

import com.zz.po.sys.SysPurview;
import com.zz.po.sys.SysPurviewExpand;

public interface PurviewService {
	
	//用户权限判断
	List<SysPurview> authorityToJudge(SysPurview str)throws Exception;
	//查询该权限是否使用中
	List<SysPurviewExpand> selectIfUsed(SysPurviewExpand spId)throws Exception;
	//根据权限ID删除用户权限
	int deleteByPrimaryKey(SysPurviewExpand id) throws Exception;
	
	//新增用户权限
	int insertSelective(SysPurview record) throws Exception;
	
	//根据权限ID、用户ID查询用户权限, 或查询所有的
	List<SysPurview> selectByPrimaryKey(SysPurview id) throws Exception;
	
	//根据权限ID修改
	int updateByPrimaryKeySelective(SysPurview record) throws Exception;
	
	//根据用户ID修改
    int updateSpUserId (SysPurviewExpand record) throws Exception;
}
