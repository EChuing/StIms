package com.zz.mapper.sys;

import com.zz.po.sys.SysUserClass;

import java.util.List;

public interface SysUserClassMapper {

//查询老师所管班级的所有学生
    List<SysUserClass> queryAllStudent(SysUserClass sysUserClass) throws Exception;

    List<SysUserClass> queryClassRoom(SysUserClass sysUserClass) throws Exception;

    int deleteByPrimaryKey(List<SysUserClass> list) throws Exception;

    int insertUserClass(List<SysUserClass> list) throws Exception;

    int updateBySucUserId(SysUserClass sysUserClass) throws Exception;
}
