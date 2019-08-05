package com.zz.service.info;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.info.InfoHouseReleaseMapper;
import com.zz.po.info.InfoHouseRelease;

public class HouseReleaseServiceImpl implements HouseReleaseService {
	private InfoHouseReleaseMapper infoHouseReleaseMapper;
	public void setInfoHouseReleaseMapper(
			InfoHouseReleaseMapper infoHouseReleaseMapper) {
		this.infoHouseReleaseMapper = infoHouseReleaseMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer hreId) throws Exception {
		// TODO Auto-generated method stub
		return infoHouseReleaseMapper.deleteByPrimaryKey(hreId);
	}
	
	/**
	 * 新增（需要传入所有数据）
	 */
	@Override
	public int insert(InfoHouseRelease record) throws Exception {
		// TODO Auto-generated method stub
		return infoHouseReleaseMapper.insert(record);
	}
	
	/**
	 *  新增招租房源数据
	 *  未租房发布到591MY 免佣网
	 */
	@Override
	public int insertSelective(InfoHouseRelease record) throws Exception {
		// TODO Auto-generated method stub
		return noRentalRelease(record);
	}
	
	/*
	 * 处理未租房发布新增
	 * (non-Javadoc)
	 * @see com.zz.service.info.HouseReleaseService#selectByPrimaryKey(com.zz.po.info.InfoHouseRelease)
	 */
	private int noRentalRelease(InfoHouseRelease infoHouseRelease) throws Exception{
		Integer hreId = null;
		//添加发布的未租房
		int result = infoHouseReleaseMapper.insertSelective(infoHouseRelease);
		if(result == 0){
			throw new Exception("添加发布的未租房失败");
		}
		hreId = infoHouseRelease.getHreId();
		return hreId;
	}

	@Override
	public List<InfoHouseRelease> selectByPrimaryKey(InfoHouseRelease record)
			throws Exception {
		// TODO Auto-generated method stub
		return infoHouseReleaseMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoHouseRelease record)
			throws Exception {
		// TODO Auto-generated method stub
		return infoHouseReleaseMapper.updateByPrimaryKeySelective(record);
	}

}
