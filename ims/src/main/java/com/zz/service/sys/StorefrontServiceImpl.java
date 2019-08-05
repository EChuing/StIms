package com.zz.service.sys;

import com.zz.mapper.sys.SysStorefrontMapper;
import com.zz.po.sys.SysStorefront;
import com.zz.po.sys.SysStudent;

import java.util.List;

public class StorefrontServiceImpl implements StorefrontService {
	
	private SysStorefrontMapper sysStorefrontMapper;
	
	

	public void setSysStorefrontMapper(SysStorefrontMapper sysStorefrontMapper) {
		this.sysStorefrontMapper = sysStorefrontMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer storefrontId) throws Exception {
		return sysStorefrontMapper.deleteByPrimaryKey(storefrontId);
	}

	@Override
	public int insertSelective(SysStorefront record) throws Exception {
		return sysStorefrontMapper.insertSelective(record);
	}

	@Override
	public List<SysStorefront> selectByPrimaryKey(SysStorefront storefrontId)
			throws Exception {
		return sysStorefrontMapper.selectByPrimaryKey(storefrontId);
	}
	 
	@Override
	public int updateByPrimaryKeySelective(SysStorefront record)
			throws Exception {
		return sysStorefrontMapper.updateByPrimaryKeySelective(record);
	}
	@Override
	public List<SysStudent> selectSchool(SysStudent sysStudent)
			throws Exception {
		return sysStorefrontMapper.selectSchool(sysStudent);
	}
}
