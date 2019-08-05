package com.zz.service.cs;

import java.util.List;

import com.zz.po.cs.CsOutsideCustomer;

public interface CsOutsideCustomerService {
	//查询商超外部顾客表
	List<CsOutsideCustomer> queryCustomer(CsOutsideCustomer csOutsideCustomer) throws Exception;
	//添加商超外部顾客
	int insertSelective(CsOutsideCustomer record) throws Exception;

    List<CsOutsideCustomer> selectByPrimaryKey(Integer cocId) throws Exception;
    
    int updateByPrimaryKeySelective(CsOutsideCustomer record) throws Exception;
}
