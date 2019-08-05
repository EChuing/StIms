package com.zz.service.cs;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.zz.mapper.cs.CsOutsideCustomerMapper;
import com.zz.po.cs.CsOutsideCustomer;

public class CsOutsideCustomerServiceImpl implements CsOutsideCustomerService {
	@Autowired
	private CsOutsideCustomerMapper csOutsideCustomerMapper;

	@Override
	public List<CsOutsideCustomer> queryCustomer(CsOutsideCustomer csOutsideCustomer) throws Exception {
		return csOutsideCustomerMapper.queryCustomer(csOutsideCustomer);
	}

	@Override
	public int insertSelective(CsOutsideCustomer record) throws Exception {
		return csOutsideCustomerMapper.insertSelective(record);
	}

	@Override
	public List<CsOutsideCustomer> selectByPrimaryKey(Integer cocId) throws Exception {
		return csOutsideCustomerMapper.selectByPrimaryKey(cocId);
	}

	@Override
	public int updateByPrimaryKeySelective(CsOutsideCustomer record) throws Exception {
		return csOutsideCustomerMapper.updateByPrimaryKeySelective(record);
	}


}
