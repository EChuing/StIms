package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsOutsideCustomerExpansion;
import com.zz.po.cs.CsSalesClientContract;
public interface CsSalesClientContractMapper {
	int insertSelective(CsSalesClientContract record)throws Exception;
	int updateCsSalesClientContract(CsOutsideCustomerExpansion record)throws Exception;
	int updateCsSalesClientContract2(CsSalesClientContract csSalesClientContract)throws Exception;
	List<CsSalesClientContract> selectCsSalesClientContract(CsSalesClientContract csSalesClientContract)throws Exception;
	CsOutsideCustomerExpansion queryCsSalesClientContract(CsOutsideCustomerExpansion csOutsideCustomerExpansion)throws Exception ;
	CsSalesClientContract queryCsSalesClientContract2(CsSalesClientContract csSalesClientContract)throws Exception ;
	

}
