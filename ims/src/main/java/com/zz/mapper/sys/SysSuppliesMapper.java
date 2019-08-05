package com.zz.mapper.sys;

import java.util.List;

import com.zz.po.sys.SysSuppliesExpand;

public interface SysSuppliesMapper {
    
    List<SysSuppliesExpand> selectAll(SysSuppliesExpand record);
    
    int insertSelective(SysSuppliesExpand record);
    
    int updateById(SysSuppliesExpand record);
    
}
