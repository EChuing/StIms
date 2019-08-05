package com.zz.service.sys;

import com.zz.po.sys.SysLogException;

public interface SysLogExceptionService {

    int insertSelective(SysLogException record) throws Exception;

    SysLogException selectByPrimaryKey(Long sleId) throws Exception;

}