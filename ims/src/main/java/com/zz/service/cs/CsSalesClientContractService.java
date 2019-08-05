package com.zz.service.cs;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.cs.CsOutsideCustomerExpansion;
import com.zz.po.cs.CsSalesClientContract;


public interface CsSalesClientContractService {
	String dealWithSign(CsOutsideCustomerExpansion jece) throws Exception;
	int insertCsSalesClientContract(CsSalesClientContract record) throws Exception;
	int updateCsSalesClientContract2(CsSalesClientContract record) throws Exception;
	List<CsSalesClientContract> selectCsSalesClientContract(CsSalesClientContract csSalesClientContract)throws Exception;
	CsSalesClientContract queryCsSalesClientContract2(CsSalesClientContract csSalesClientContract)throws Exception;
	String signShow(CsOutsideCustomerExpansion jece) throws Exception;
	String syncAddNoRent(CsOutsideCustomerExpansion jece) throws Exception;
	String asynAddNoRent(CsOutsideCustomerExpansion jece) throws Exception;
	Result<String> getCustomerImg(CsOutsideCustomerExpansion jece) throws Exception;
}
