package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsOutsideCustomer;

public interface CsOutsideCustomerMapper {
    int insertSelective(CsOutsideCustomer record) throws Exception;

    List<CsOutsideCustomer> selectByPrimaryKey(Integer cocId) throws Exception;
    
    List<CsOutsideCustomer> queryCustomer(CsOutsideCustomer csOutsideCustomer) throws Exception;

    int updateByPrimaryKeySelective(CsOutsideCustomer record) throws Exception;

}