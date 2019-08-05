package com.zz.mapper.sys;

import com.zz.po.sys.SysSystemSetting;

public interface SysSystemSettingMapper {
	
    int insertSelective(SysSystemSetting record)throws Exception;

    SysSystemSetting selectByPrimaryKey(Integer ssitId)throws Exception;

    SysSystemSetting querySystemSetting(Integer ssitId)throws Exception;

    int updateByPrimaryKeySelective(SysSystemSetting record)throws Exception;

}