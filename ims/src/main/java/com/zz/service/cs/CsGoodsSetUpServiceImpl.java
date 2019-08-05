package com.zz.service.cs;

import java.util.List;

import com.zz.mapper.cs.CsGoodsSetUpMapper;
import com.zz.po.cs.CsGoodsSetUp;

public class CsGoodsSetUpServiceImpl implements CsGoodsSetUpService {

	private CsGoodsSetUpMapper csGoodsSetUpMapper;
	
	public void setCsGoodsSetUpMapper(CsGoodsSetUpMapper csGoodsSetUpMapper) {
		this.csGoodsSetUpMapper = csGoodsSetUpMapper;
	}



	@Override
	public List<CsGoodsSetUp> selectCsGoodsSetUp(CsGoodsSetUp cgsu) throws Exception{
		return csGoodsSetUpMapper.selectByPrimaryKey(cgsu);
	}



	@Override
	public int updateCsGoodsSetUp(CsGoodsSetUp cgsu) throws Exception {
		return csGoodsSetUpMapper.updateByPrimaryKeySelective(cgsu);
	}

}
