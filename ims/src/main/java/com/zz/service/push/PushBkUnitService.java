package com.zz.service.push;

import java.util.List;

import com.zz.po.push.PushBkUnit;

public interface PushBkUnitService {
	
	List<PushBkUnit> queryBkUnit(PushBkUnit record) throws Exception;

    int insertSelective(PushBkUnit record) throws Exception;

    PushBkUnit selectByPrimaryKey(Integer pbuId) throws Exception;

    int updateByPrimaryKeySelective(PushBkUnit record) throws Exception;
}
