package com.zz.service.cs;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.zz.mapper.cs.CsAccountReceiptMapper;
import com.zz.po.cs.CsAccountReceipt;

public class CsAccountReceiptServiceImpl implements CsAccountReceiptService {
	@Autowired
	private CsAccountReceiptMapper csAccountReceiptMapper;
	
	@Override
	public int insertCsAccountReceipt(CsAccountReceipt record) throws Exception {
		return csAccountReceiptMapper.insertSelective(record);
	}
	@Override
	public List<CsAccountReceipt> queryCsAccountReceipt(CsAccountReceipt csAccountReceipt) throws Exception {
		
		return csAccountReceiptMapper.queryCsAccountReceipt(csAccountReceipt);
	}

	

}
