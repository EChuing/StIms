package com.zz.service.sys;

import com.zz.mapper.sys.SysHouseDictMapper;
import com.zz.po.sys.SysHouseDictExpand;

import java.util.List;

public class HouseDictServiceImpl implements HouseDictService{
	private SysHouseDictMapper sysHouseDictMapper;
	
	public void setSysHouseDictMapper(SysHouseDictMapper sysHouseDictMapper) {
		this.sysHouseDictMapper = sysHouseDictMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer hdId) throws Exception {
		return sysHouseDictMapper.deleteByPrimaryKey(hdId);
	}

	@Override
	public int insertSelective(SysHouseDictExpand record) throws Exception {
		
		String city = record.getHdCity(); //市
		String district = record.getHdDistrict();// 城区
		String zone = record.getHdZone() ;// 街区
		String community = record.getHdCommunity(); //小区
		SysHouseDictExpand hd=new SysHouseDictExpand();
		hd.setHdCommunity(community);
		hd.setHdCity(city);
		hd.setHdDistrict(district);
		hd.setHdZone(zone);
		//查询字典的房源
		List<SysHouseDictExpand> hdList = sysHouseDictMapper.selectAddress(record);
		if(hdList.size() > 0) {
			//数据已有，不能新增
			return -1;
		}else {
			sysHouseDictMapper.insertSelective(record);
			return 1;
		}
		
		
		
	}

	@Override
	public List<SysHouseDictExpand> selectAll(SysHouseDictExpand conditions)
			throws Exception {
		return sysHouseDictMapper.selectAll(conditions);
	}
	
	@Override
	public List<SysHouseDictExpand> selectAddDict(SysHouseDictExpand conditions)
			throws Exception {
		return sysHouseDictMapper.selectAddDict(conditions);
	}

	@Override
	public List<SysHouseDictExpand> selectByPrimaryKey(Integer hdId) throws Exception {
		return sysHouseDictMapper.selectByPrimaryKey(hdId);
	}

	@Override
	public int updateByPrimaryKeySelective(SysHouseDictExpand record)
			throws Exception {
		return sysHouseDictMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<String> selectForAddress(SysHouseDictExpand conditions)
			throws Exception {
		return sysHouseDictMapper.selectForAddress(conditions);
	}

	@Override
	public List<SysHouseDictExpand> selectAddress(SysHouseDictExpand conditions) throws Exception {
		return null;
	}
}
