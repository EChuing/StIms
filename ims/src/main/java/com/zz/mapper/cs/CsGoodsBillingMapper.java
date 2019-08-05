package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsBilling;

public interface CsGoodsBillingMapper {


    int insertSelective(CsGoodsBilling record) throws Exception;

    List<CsGoodsBilling> selectByPrimaryKey(Integer id) throws Exception;

    int updateByPrimaryKeySelective(CsGoodsBilling record) throws Exception;
    
    List<CsGoodsBilling> listCsGoodsBilling(CsGoodsBilling record) throws Exception;
    
    CsGoodsBilling getOrderCount(CsGoodsBilling csGoodsBilling) throws Exception;

    CsGoodsBilling getMoney(CsGoodsBilling csGoodsBilling) throws Exception;
    
    CsGoodsBilling getProfit(CsGoodsBilling csGoodsBilling) throws Exception;
}