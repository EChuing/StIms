package com.zz.mapper.sys;
import java.util.List;
import com.zz.po.sys.SysAssetsExpand;

public interface SysAssetsMapper {
	
	//查询所有资产
    List<SysAssetsExpand> selectAll(SysAssetsExpand record);
    
    
    //添加资产，同时在未租房或项目添加一条跟进
    int insertList(List<SysAssetsExpand> recordList);
    
    //修改资产
    int updateById(SysAssetsExpand record);
    
    //迁移资产
    int moveById(SysAssetsExpand record);
    
    //写资产跟进
    int followById(SysAssetsExpand record);
    
}