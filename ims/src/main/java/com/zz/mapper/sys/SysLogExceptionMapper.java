package com.zz.mapper.sys;

import com.zz.po.sys.SysLogException;

public interface SysLogExceptionMapper {

    int insertSelective(SysLogException record) throws Exception;

    SysLogException selectByPrimaryKey(Long sleId) throws Exception;

}