package com.zz.service.sys;

import java.util.List;

import com.zz.po.sys.SysDepartment;

public interface DepartmentService {
    int deleteByPrimaryKey(Integer departmentId) throws Exception;

    int insertSelective(SysDepartment record) throws Exception;

    List<SysDepartment> selectByPrimaryKey(SysDepartment departmentId) throws Exception;
    
    int updateByPrimaryKeySelective(SysDepartment record) throws Exception;

}
