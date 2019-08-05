package com.zz.service.sys;

import com.zz.po.sys.SysSystemSetting;

public interface SysSystemSettingService {
    int insertSelective(SysSystemSetting record)throws Exception;

    SysSystemSetting selectByPrimaryKey(Integer ssitId)throws Exception;
    
    SysSystemSetting querySystemSetting(Integer ssitId)throws Exception;

    int updateByPrimaryKeySelective(SysSystemSetting record)throws Exception;
}
