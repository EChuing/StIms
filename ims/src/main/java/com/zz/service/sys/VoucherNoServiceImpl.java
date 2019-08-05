package com.zz.service.sys;

import com.zz.mapper.sys.SysVoucherNoMapper;
import com.zz.po.sys.SysVoucherNo;

import java.util.List;

public class VoucherNoServiceImpl implements VoucherNoService {
	private SysVoucherNoMapper sysVoucherNoMapper;
	public void setSysVoucherNoMapper(SysVoucherNoMapper sysVoucherNoMapper) {
		this.sysVoucherNoMapper = sysVoucherNoMapper;
	}

	@Override
	public List<SysVoucherNo> selectVoucherNo(SysVoucherNo record)
			throws Exception {
		return sysVoucherNoMapper.selectVoucherNo(record);
	}

	@Override
	public int insert(SysVoucherNo record) throws Exception {
		// TODO Auto-generated method stub
		return sysVoucherNoMapper.insert(record);
	}

	@Override
	public int insertSelective(SysVoucherNo record) throws Exception {
		// TODO Auto-generated method stub
		return sysVoucherNoMapper.insertSelective(record);
	}

}
