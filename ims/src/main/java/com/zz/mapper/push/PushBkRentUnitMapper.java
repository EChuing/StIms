package com.zz.mapper.push;

import java.util.List;

import com.zz.po.push.PushBkRentUnit;

public interface PushBkRentUnitMapper {
   
	List<PushBkRentUnit> queryBkRentUnit(PushBkRentUnit record) throws Exception;
	
    int insertSelective(PushBkRentUnit record) throws Exception;

    PushBkRentUnit selectByPrimaryKey(Integer pbruId) throws Exception;

    int updateByPrimaryKeySelective(PushBkRentUnit record) throws Exception;
}