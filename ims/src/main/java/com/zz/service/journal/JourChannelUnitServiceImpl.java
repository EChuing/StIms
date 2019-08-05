package com.zz.service.journal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.zz.mapper.journal.JourChannelUnitMapper;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourChannelUnit;

public class JourChannelUnitServiceImpl implements JourChannelUnitService{
	
	@Autowired
	private JourChannelUnitMapper jourChannelUnitMapper;
	
	@Override
	//查询渠道单位表
	public Result<List<JourChannelUnit>> queryJourChannelUnit(JourChannelUnit jourChannelUnit) throws Exception {
		List<JourChannelUnit> list = jourChannelUnitMapper.queryJourChannelUnit(jourChannelUnit);
		if(list.size() > 0){
			return new Result<>(1,"成功",list);
		}else{
			return new Result<>(-1,"未查询到该类型的渠道",null);
		}
	}
	
	@Override
	public Result<List<JourChannelUnit>> queryHighestLevelPlan(JourChannelUnit jourChannelUnit) throws Exception {
		List<JourChannelUnit> list = jourChannelUnitMapper.queryHighestLevelPlan(jourChannelUnit);
		if(list.size() > 0){
			return new Result<>(1,"成功",list);
		}else{
			return new Result<>(-1,"未查询到该类型的渠道",null);
		}
	}
	
	@Override
	//新增或者修改渠道单位表
	public Result<String> saveChannelUnit(JourChannelUnit jourChannelUnit) throws Exception {
		if(jourChannelUnit.getType() == 0){
			int result = jourChannelUnitMapper.insertSelective(jourChannelUnit);
			if(result > 0){
				return new Result<>(1,"添加成功",null);
			}else{
				return new Result<>(-1,"添加失败",null);
			}
		}else{
			System.out.println("数据========================="+jourChannelUnit);
			int result = jourChannelUnitMapper.updateByPrimaryKeySelective(jourChannelUnit);
			if(result > 0){
				return new Result<>(1,"修改成功",null);
			}else{
				return new Result<>(-1,"修改失败",null);
			}
		}
	}

	@Override
	//新增或者修改签单人
	public Result<String> saveSigningPeople(JourChannelUnit jourChannelUnit) throws Exception {
		if(jourChannelUnit.getType() == 0){
			int result = jourChannelUnitMapper.insertJourSigningPeople(jourChannelUnit);
			if(result > 0){
				return new Result<>(1,"添加成功",null);
			}else{
				return new Result<>(1,"添加失败",null);
			}
		}else{
			int result = jourChannelUnitMapper.updateByJspId(jourChannelUnit);
			if(result > 0){
				return new Result<>(1,"修改成功",null);
			}else{
				return new Result<>(1,"修改失败",null);
			}
		}
	}

	@Override
	//查询签单人表
	public Result<List<JourChannelUnit>> queryJourSigningPeople(JourChannelUnit jourChannelUnit) throws Exception {
		List<JourChannelUnit> list = jourChannelUnitMapper.queryJourSigningPeople(jourChannelUnit);
		if(list.size()>0){
			return new Result<>(1,"成功",list);
		}else{
			return new Result<>(-1,"未查询到数据",list);
		}
		
	}
}
