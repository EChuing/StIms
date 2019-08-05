package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsPurchase;

public interface CsGoodsPurchaseMapper {

    int insertSelective(CsGoodsPurchase record) throws Exception;

    List<CsGoodsPurchase> selectByPrimaryKey(Integer cgpId) throws Exception;

    int updateByPrimaryKeySelective(CsGoodsPurchase record) throws Exception;
    
    List<CsGoodsPurchase> listPurchaseOrder (CsGoodsPurchase record) throws Exception;
    
    CsGoodsPurchase getPurchaseMoney(CsGoodsPurchase record) throws Exception;

}