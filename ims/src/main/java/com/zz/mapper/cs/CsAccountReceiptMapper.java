package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsAccountReceipt;

public interface CsAccountReceiptMapper {
	
	int insertSelective(CsAccountReceipt record)throws Exception;
	
	List<CsAccountReceipt> queryCsAccountReceipt(CsAccountReceipt csAccountReceipt)throws Exception ;
	
}
