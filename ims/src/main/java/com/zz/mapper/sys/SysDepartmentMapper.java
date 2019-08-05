package com.zz.mapper.sys;

import java.util.List;

import com.zz.po.sys.SysDepartment;

public interface SysDepartmentMapper {
    int deleteByPrimaryKey(Integer departmentId) throws Exception;

    int insertSelective(SysDepartment record) throws Exception;

    List<SysDepartment> selectByPrimaryKey(SysDepartment departmentId) throws Exception;
    
    int updateByPrimaryKeySelective(SysDepartment record) throws Exception;
}