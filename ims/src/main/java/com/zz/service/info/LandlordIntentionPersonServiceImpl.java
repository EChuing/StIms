package com.zz.service.info;

import java.util.List;

import com.zz.mapper.info.InfoLandlordIntentionPersonMapper;
import com.zz.po.info.InfoLandlordIntentionPerson;

public class LandlordIntentionPersonServiceImpl implements
	LandlordIntentionPersonService {
	private InfoLandlordIntentionPersonMapper infoLandlordIntentionPersonMapper;
	
	
	public void setInfoLandlordIntentionPersonMapper(
			InfoLandlordIntentionPersonMapper infoLandlordIntentionPersonMapper) {
		this.infoLandlordIntentionPersonMapper = infoLandlordIntentionPersonMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer ipId) throws Exception {
		// TODO Auto-generated method stub
		return infoLandlordIntentionPersonMapper.deleteByPrimaryKey(ipId);
	}

	@Override
	public int insertSelective(InfoLandlordIntentionPerson record) throws Exception {
		// TODO Auto-generated method stub
		return infoLandlordIntentionPersonMapper.insertSelective(record);
	}

	@Override
	public List<InfoLandlordIntentionPerson> selectByPrimaryKey(InfoLandlordIntentionPerson record)
			throws Exception {
		// TODO Auto-generated method stub
		return infoLandlordIntentionPersonMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoLandlordIntentionPerson record)
			throws Exception {
		// TODO Auto-generated method stub
		return infoLandlordIntentionPersonMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<InfoLandlordIntentionPerson> getpersonUserId(
			InfoLandlordIntentionPerson record) throws Exception {
		// TODO Auto-generated method stub
		return infoLandlordIntentionPersonMapper.getpersonUserId(record);
	}

}
