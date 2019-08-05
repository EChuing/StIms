package com.zz.mapper.sys;

import java.util.List;

import com.zz.po.sys.SysStorefront;
import com.zz.po.sys.SysStudent;
import com.zz.po.sys.SysUserExpand;

public interface SysStorefrontMapper {
    int deleteByPrimaryKey(Integer storefrontId) throws Exception;

    int insertSelective(SysStorefront record) throws Exception;

    List<SysStorefront> selectByPrimaryKey(SysStorefront storefrontId) throws Exception;

    int updateByPrimaryKeySelective(SysStorefront record) throws Exception;

    List<SysStudent> selectSchool(SysStudent sysStudent ) throws Exception;
  

}