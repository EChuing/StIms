package com.zz.service.cs;

import java.util.List;

import com.zz.po.cs.CsAccountReceipt;

public interface CsAccountReceiptService {
	  int insertCsAccountReceipt(CsAccountReceipt record) throws Exception;

	  List<CsAccountReceipt> queryCsAccountReceipt(CsAccountReceipt csAccountReceipt) throws Exception;
}
