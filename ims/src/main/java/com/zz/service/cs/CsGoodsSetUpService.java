package com.zz.service.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsSetUp;

public interface CsGoodsSetUpService {
	List<CsGoodsSetUp> selectCsGoodsSetUp(CsGoodsSetUp cgsu) throws Exception;
	int updateCsGoodsSetUp(CsGoodsSetUp cgsu) throws Exception;
}
