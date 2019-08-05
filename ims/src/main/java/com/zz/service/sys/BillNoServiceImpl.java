package com.zz.service.sys;

import java.util.List;

import com.zz.mapper.sys.SysBillNoMapper;
import com.zz.po.sys.SysBillNo;

public class BillNoServiceImpl implements BillNoService {
	private SysBillNoMapper sysBillNoMapper;
	public void setSysBillNoMapper(SysBillNoMapper sysBillNoMapper) {
		this.sysBillNoMapper = sysBillNoMapper;
	}

	@Override
	public List<SysBillNo> selectAll(SysBillNo record)
			throws Exception {
		return sysBillNoMapper.selectAll(record);
	}

	@Override
	public int insert(SysBillNo record) throws Exception {
		return sysBillNoMapper.insert(record);
	}

	@Override
	public int insertSelective(SysBillNo record) throws Exception {
		return sysBillNoMapper.insertSelective(record);
	}

	

}
