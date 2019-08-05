package com.zz.service.sys;

import com.zz.mapper.sys.SysPurviewMapper;
import com.zz.po.sys.SysPurview;
import com.zz.po.sys.SysPurviewExpand;

import java.util.List;

public class PurviewServiceImpl implements PurviewService {

	private SysPurviewMapper purviewMapper;
	public void setPurviewMapper(SysPurviewMapper purviewMapper) throws Exception{
		this.purviewMapper = purviewMapper;
	}

	@Override
	public int deleteByPrimaryKey(SysPurviewExpand id) throws Exception{
		return purviewMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelective(SysPurview record) throws Exception{
		return purviewMapper.insertSelective(record);
	}

	@Override
	public List<SysPurview> selectByPrimaryKey(SysPurview id) throws Exception{
		return purviewMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(SysPurview record) throws Exception{
		return purviewMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateSpUserId(SysPurviewExpand record) throws Exception {
		return purviewMapper.updateSpUserId(record);
	}

	@Override
	public List<SysPurview> authorityToJudge(SysPurview userid) throws Exception {
		return purviewMapper.authorityToJudge(userid);
	}

	@Override
	public List<SysPurviewExpand> selectIfUsed(SysPurviewExpand spId) throws Exception {
		return purviewMapper.selectIfUsed(spId);
	}

}
