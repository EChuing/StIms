package com.zz.service.sys;

import java.util.List;

import com.zz.po.sys.SysSuppliesExpand;

public interface SysSuppliesService {
    
    List<SysSuppliesExpand> selectAll(SysSuppliesExpand record) throws Exception;
    
    int insertSelective(SysSuppliesExpand record) throws Exception;
    
    int updateById(SysSuppliesExpand record) throws Exception;
    
    int moveById(SysSuppliesExpand record) throws Exception;
    
    int useById(SysSuppliesExpand record) throws Exception;
    
    int repairUseById(SysSuppliesExpand record) throws Exception;
    
    int purchaseById(SysSuppliesExpand record) throws Exception;
    
}
