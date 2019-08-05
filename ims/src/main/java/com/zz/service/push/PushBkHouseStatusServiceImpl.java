package com.zz.service.push;

import java.util.List;

import com.zz.mapper.push.PushBkHouseStatusMapper;
import com.zz.po.push.PushBkHouseStatus;

public class PushBkHouseStatusServiceImpl implements PushBkHouseStatusService {

	private PushBkHouseStatusMapper pushBkHouseStatusMapper;
	
	public void setPushBkHouseStatusMapper(PushBkHouseStatusMapper pushBkHouseStatusMapper) {
		this.pushBkHouseStatusMapper = pushBkHouseStatusMapper;
	}
	
	@Override
	public  List<PushBkHouseStatus> queryBkHouseStatus(PushBkHouseStatus record) throws Exception{
		return pushBkHouseStatusMapper.queryBkHouseStatus(record);
	}
}