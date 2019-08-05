package com.zz.service.cs;

import java.math.BigDecimal;
import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zz.mapper.cs.CsGoodsSellMapper;
import com.zz.po.cs.CsGoodsSell;

public class CsGoodsSellServiceImpl implements CsGoodsSellService {
	
	private CsGoodsSellMapper csGoodsSellMapper;
	
	public void setCsGoodsSellMapper(CsGoodsSellMapper csGoodsSellMapper) {
		this.csGoodsSellMapper = csGoodsSellMapper;
	}

	@Override
	public List<CsGoodsSell> listCsGoodsSell(CsGoodsSell csGoodsSell) throws Exception {
		return csGoodsSellMapper.listGoodsSell(csGoodsSell);
	}

	@Override
	public JSONArray getPieNum(CsGoodsSell csGoodsSell) throws Exception {
		
		List<CsGoodsSell> list = csGoodsSellMapper.getPieNum(csGoodsSell);
		if(list.size() < 1){
			return null;
		}
		CsGoodsSell csGoodsSell2 = csGoodsSellMapper.getSellAllNum(csGoodsSell);
		if(csGoodsSell2 == null){
			return null;
		}
		Integer totalNum = csGoodsSell2.getSellNum();
		JSONArray ary = new JSONArray();
		
		//用来统计排列最前的5类商品 统计出数量来求出剩余所有商品的销量
		Integer TopFiveNum = 0;
		for(CsGoodsSell a : list){
			JSONObject obj = new JSONObject();
			obj.put("name", a.getCgsGoodsName());
			Integer num = a.getSellNum();
			
			Double bili = computeBiLi(num,totalNum);

			obj.put("bili", bili);
			ary.add(obj);
			
			TopFiveNum += num;
		}
		JSONObject otherObj = new JSONObject();
		otherObj.put("name", "其他");
		
		
		Integer otherGoodsNum = totalNum - TopFiveNum;
		Double otherBiLi = computeBiLi(otherGoodsNum,totalNum);
		otherObj.put("bili", otherBiLi);
		ary.add(otherObj);
		return ary;
		
	}
	
	private Double computeBiLi(Integer num,Integer totalNum){
		Double bili = num * 1.0 / totalNum * 100.0;
		BigDecimal b = new BigDecimal(bili);  
		bili = b.setScale(2,   BigDecimal.ROUND_HALF_UP).doubleValue(); 
		return bili;
	}

	@Override
	public JSONArray getCategoryNum(CsGoodsSell csGoodsSell) throws Exception {
		List<CsGoodsSell> list = csGoodsSellMapper.getCategoryNum(csGoodsSell);
		if(list.size() < 1){
			return null;
		}
		CsGoodsSell csGoodsSell2 = csGoodsSellMapper.getSellAllNum(csGoodsSell);
		if(csGoodsSell2 == null){
			return null;
		}
		Integer totalNum = csGoodsSell2.getSellNum();
		JSONArray ary = new JSONArray();
		
		//用来统计排列最前的5类商品 统计出数量来求出剩余所有商品的销量
		Integer TopFiveNum = 0;
		for(CsGoodsSell a : list){
			JSONObject obj = new JSONObject();
			obj.put("name", a.getCgsCategory());
			Integer num = a.getSellNum();
			
			Double bili = computeBiLi(num,totalNum);

			obj.put("bili", bili);
			ary.add(obj);
			
			TopFiveNum += num;
		}
		JSONObject otherObj = new JSONObject();
		otherObj.put("name", "其他");
		
		
		Integer otherGoodsNum = totalNum - TopFiveNum;
		Double otherBiLi = computeBiLi(otherGoodsNum,totalNum);
		otherObj.put("bili", otherBiLi);
		ary.add(otherObj);
		return ary;
	}

	@Override
	public JSONArray getGoodsProfitNum(CsGoodsSell csGoodsSell) throws Exception {
		List<CsGoodsSell> list = csGoodsSellMapper.getGoodsProfitNum(csGoodsSell);
		if(list.size() < 1){
			return null;
		}
		CsGoodsSell csGoodsSell2 = csGoodsSellMapper.getSellAllNum(csGoodsSell);
		if(csGoodsSell2 == null){
			return null;
		}
		CsGoodsSell goodsProfit = csGoodsSellMapper.getSellAllProfitNum(csGoodsSell);
		Double totalProfit =  goodsProfit.getGoodsProfit();
		JSONArray ary = new JSONArray();
		
		//用来统计排列最前的5类商品 统计出数量来求出剩余所有商品的销量
		Double TopFiveProfit = 0.0;
		for(CsGoodsSell a : list){
			JSONObject obj = new JSONObject();
			obj.put("name", a.getCgsGoodsName());
			
			Double profit = a.getGoodsProfit();
			
			Double bili = profit / totalProfit * 100;
			BigDecimal b = new BigDecimal(bili);  
			bili = b.setScale(2,   BigDecimal.ROUND_HALF_UP).doubleValue(); 

			obj.put("bili", bili);
			ary.add(obj);
			
			TopFiveProfit += a.getGoodsProfit();
		}
		JSONObject otherObj = new JSONObject();
		otherObj.put("name", "其他");
		
		
		Double otherGoodsProfit = totalProfit - TopFiveProfit;
		
		Double otherBiLi = otherGoodsProfit / totalProfit * 100;
		BigDecimal b = new BigDecimal(otherBiLi);  
		otherBiLi = b.setScale(2,   BigDecimal.ROUND_HALF_UP).doubleValue(); 
		
		otherObj.put("bili", otherBiLi);
		ary.add(otherObj);
		return ary;
	}

}
