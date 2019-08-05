package com.zz.service.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsDiscount;

public interface CsGoodsDiscountService {
	int insertSelective(CsGoodsDiscount record);

    List<CsGoodsDiscount> selectByPrimaryKey(CsGoodsDiscount record);

    int updateByPrimaryKeySelective(CsGoodsDiscount record);

}
