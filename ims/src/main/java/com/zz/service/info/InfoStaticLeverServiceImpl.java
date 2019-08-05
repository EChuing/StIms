package com.zz.service.info;

import java.util.List;

import com.zz.mapper.info.InfoStaticLeverMapper;
import com.zz.po.info.InfoStaticLever;

public class InfoStaticLeverServiceImpl implements InfoStaticLeverService {
	private InfoStaticLeverMapper infoStaticLeverMapper;
	public void setInfoStaticLeverMapper(
			InfoStaticLeverMapper infoStaticLeverMapper) {
		this.infoStaticLeverMapper = infoStaticLeverMapper;
	}
	@Override
	public List<InfoStaticLever> selectAll(InfoStaticLever record) {
		// TODO Auto-generated method stub
		return infoStaticLeverMapper.selectAll(record);
	}

}
