package com.zz.service.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsCategory;

public interface CsGoodsCategoryService {
	List<CsGoodsCategory> listGoodsCategory(CsGoodsCategory csGoodsCategory) throws Exception;
	
	String insertGoodsCategory(CsGoodsCategory csGoodsCategory) throws Exception;
	
	String updateGoodsCategory(CsGoodsCategory csGoodsCategory) throws Exception;
}
