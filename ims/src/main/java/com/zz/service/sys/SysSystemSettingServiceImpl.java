package com.zz.service.sys;

import com.zz.mapper.sys.SysSystemSettingMapper;
import com.zz.po.sys.SysSystemSetting;


public class SysSystemSettingServiceImpl implements SysSystemSettingService {
	private SysSystemSettingMapper sysSystemSettingMapper;
	
	

	public void setSysSystemSettingMapper(SysSystemSettingMapper sysSystemSettingMapper) {
		this.sysSystemSettingMapper = sysSystemSettingMapper;
	}

	@Override
	public int insertSelective(SysSystemSetting record)
			throws Exception {
		return sysSystemSettingMapper.insertSelective(record);
	}

	@Override
	public SysSystemSetting selectByPrimaryKey(Integer ssitId)
			throws Exception {
		return sysSystemSettingMapper.selectByPrimaryKey(ssitId);
	}

	@Override
	public int updateByPrimaryKeySelective(SysSystemSetting record)
			throws Exception {
		return sysSystemSettingMapper.updateByPrimaryKeySelective(record);
	}

    @Override
    public SysSystemSetting querySystemSetting(Integer ssitId)
            throws Exception {
        return sysSystemSettingMapper.querySystemSetting(ssitId);
    }
}
