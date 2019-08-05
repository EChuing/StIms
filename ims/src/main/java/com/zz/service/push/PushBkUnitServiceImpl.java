package com.zz.service.push;

import java.util.List;

import com.zz.mapper.push.PushBkUnitMapper;
import com.zz.po.push.PushBkUnit;

public class PushBkUnitServiceImpl implements PushBkUnitService {
	
	private PushBkUnitMapper pushBkUnitMapper;
	
	public void setPushBkUnitMapper(PushBkUnitMapper pushBkUnitMapper) {
		this.pushBkUnitMapper = pushBkUnitMapper;
	}

	@Override
	public List<PushBkUnit> queryBkUnit(PushBkUnit record) throws Exception {
		
		return pushBkUnitMapper.queryBkUnit(record);
	}

	@Override
	public int insertSelective(PushBkUnit record) throws Exception {
		
		return pushBkUnitMapper.insertSelective(record);
	}

	@Override
	public PushBkUnit selectByPrimaryKey(Integer pbuId) throws Exception {
		
		return pushBkUnitMapper.selectByPrimaryKey(pbuId);
	}

	@Override
	public int updateByPrimaryKeySelective(PushBkUnit record) throws Exception {
		
		return pushBkUnitMapper.updateByPrimaryKeySelective(record);
	}

}
