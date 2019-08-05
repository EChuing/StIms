package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsDiscount;

public interface CsGoodsDiscountMapper {

    int insertSelective(CsGoodsDiscount record);

    List<CsGoodsDiscount> selectByPrimaryKey(CsGoodsDiscount record);

    int updateByPrimaryKeySelective(CsGoodsDiscount record);
}