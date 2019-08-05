package com.zz.service.sys;

import java.util.List;

import com.zz.po.sys.SysVariables;

public interface SysVariablesService {
	List<SysVariables> selectByPrimaryKey(SysVariables record) throws Exception;

    int updateByPrimaryKeySelective(SysVariables record) throws Exception;
    int recoveryFirst(SysVariables record) throws Exception;

    boolean checkBillNum() throws Exception;
}