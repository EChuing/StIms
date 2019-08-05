package com.zz.service.info;

import java.util.List;

import com.zz.mapper.info.InfoPlanTableMapper;
import com.zz.po.info.InfoPlanTable;

public class PlanTableServiceImpl implements PlanTableService {
	private InfoPlanTableMapper infoPlanTableMapper;
	public void setInfoPlanTableMapper(
			InfoPlanTableMapper infoPlanTableMapper) {
		this.infoPlanTableMapper = infoPlanTableMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer planId) throws Exception {
		// TODO Auto-generated method stub
		return infoPlanTableMapper.deleteByPrimaryKey(planId);
	}

	@Override
	public int insertSelective(InfoPlanTable record) throws Exception {
		// TODO Auto-generated method stub
		return infoPlanTableMapper.insertSelective(record);
	}

	@Override
	public List<InfoPlanTable> selectByPrimaryKey(InfoPlanTable record)
			throws Exception {
		// TODO Auto-generated method stub 
		return infoPlanTableMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoPlanTable record)
			throws Exception {
		// TODO Auto-generated method stub
		return infoPlanTableMapper.updateByPrimaryKeySelective(record);
	}

}
