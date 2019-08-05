package com.zz.service.cs;

import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.zz.po.cs.CsGoodsSell;

public interface CsGoodsSellService {
	List<CsGoodsSell> listCsGoodsSell(CsGoodsSell csGoodsSell) throws Exception;
	
	JSONArray getPieNum(CsGoodsSell csGoodsSell) throws Exception;
	
	JSONArray getCategoryNum(CsGoodsSell csGoodsSell) throws Exception;
	
	JSONArray getGoodsProfitNum(CsGoodsSell csGoodsSell) throws Exception;
}
