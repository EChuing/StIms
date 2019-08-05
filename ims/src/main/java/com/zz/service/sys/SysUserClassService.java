package com.zz.service.sys;

import com.zz.po.commons.Result;
import com.zz.po.sys.SysUserClass;

import java.util.List;

public interface SysUserClassService {
    //查询教师所管班级的所有学生
    List<SysUserClass> queryAllStudent(SysUserClass sysUserClass)throws Exception;

    List<SysUserClass> queryClassRoom(SysUserClass sysUserClass) throws Exception;

    int deleteByPrimaryKey(SysUserClass sysUserClass) throws Exception;

    Result<String> insertUserClass(SysUserClass sysUserClass) throws Exception;

    int updateBySucUserId(SysUserClass sysUserClass) throws Exception;
}
