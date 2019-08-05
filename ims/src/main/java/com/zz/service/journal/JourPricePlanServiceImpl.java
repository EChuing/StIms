package com.zz.service.journal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.zz.mapper.journal.JourPricePlanMapper;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourPricePlan;

public class JourPricePlanServiceImpl implements JourPricePlanService{
	@Autowired
	private JourPricePlanMapper jourPricePlanMapper;
	
	@Override
	//查询价格方案表
	public Result<List<JourPricePlan>> queryJourPricePlan(JourPricePlan jourPricePlan) throws Exception {
		System.out.println("前端传过来的数据：   "+jourPricePlan);
		List<JourPricePlan> list = jourPricePlanMapper.queryJourPricePlan(jourPricePlan);
		if(list.size() > 0){
			return new Result<>(1,"成功",list);
		}else{
			return new Result<>(-1,"未查询到数据",null);
		}
	}
	
	
	@Override
	//新增或者修改方案
	public Result<String> savePricePlan(JourPricePlan jourPricePlan) throws Exception {
		System.out.println("前端传值=========="+jourPricePlan);
		List<JourPricePlan> list = jourPricePlanMapper.selectByPrimaryKeySelective(jourPricePlan);
		
		if(list.size() > 0 ){
			int result = jourPricePlanMapper.updateByPrimaryKeySelective(jourPricePlan);
			if(result > 0){
				return new Result<>(1,"修改方案成功",null);
			}else{
				return new Result<>(-1,"修改失败",null);
			}
		}else{
			int result = jourPricePlanMapper.insertSelective(jourPricePlan);
			if(result > 0){
				return new Result<>(1,"添加方案成功",null);
			}else{
				return new Result<>(-1,"添加失败",null);
			}
		}
	}


	@Override
	public Result<String> batchUpdateJppState(JourPricePlan jourPricePlan) throws Exception {
		List<JourPricePlan> jppList = JSON.parseArray(jourPricePlan.getJsonArray(),JourPricePlan.class);
		int result = jourPricePlanMapper.updateJppState(jppList);
		if(result > 0){
			return new Result<>(1,"修改成功",null);
		}else{
			return new Result<>(-1,"修改失败",null);
		}
	}

}
