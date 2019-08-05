package com.zz.mapper.sys;

import com.zz.po.sys.SysVariables;

import java.util.List;

public interface SysVariablesMapper {
	List<SysVariables> selectByPrimaryKey(SysVariables record) throws Exception;
	//查询变量中的门卡进制
	SysVariables selectDoorCardSystem() throws Exception;

    int updateByPrimaryKeySelective(SysVariables record) throws Exception;

    int recoveryFirst(SysVariables record) throws Exception;

    //添加公司名客服电话
    int insertCompany(SysVariables sysVariables) throws Exception;
}