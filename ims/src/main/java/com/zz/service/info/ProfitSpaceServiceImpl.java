package com.zz.service.info;

import java.util.List;

import com.zz.mapper.info.InfoProfitSpaceMapper;
import com.zz.po.info.InfoProfitSpace;

public class ProfitSpaceServiceImpl implements ProfitSpaceService {
	private InfoProfitSpaceMapper infoProfitSpaceMapper;
	public void setInfoProfitSpaceMapper(
			InfoProfitSpaceMapper infoProfitSpaceMapper) {
		this.infoProfitSpaceMapper = infoProfitSpaceMapper;
	}
	@Override
	public List<InfoProfitSpace> selectAll(InfoProfitSpace record) {
		// TODO Auto-generated method stub
		return infoProfitSpaceMapper.selectAll(record);
	}

}
