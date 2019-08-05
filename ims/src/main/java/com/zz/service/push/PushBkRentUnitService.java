package com.zz.service.push;

import java.util.List;

import com.zz.po.push.PushBkRentUnit;

public interface PushBkRentUnitService {
	
    int insertSelective(PushBkRentUnit record) throws Exception;

    PushBkRentUnit selectByPrimaryKey(Integer pbruId) throws Exception;

    int updateByPrimaryKeySelective(PushBkRentUnit record) throws Exception;
    
    //发布出租单元
    String publishBkRentUnit(PushBkRentUnit record) throws Exception;
    
    //更新出租单元
    String editBkRentUnit(PushBkRentUnit record) throws Exception;
    
    //更新价格
    String editBkRentUnitPayment(PushBkRentUnit record) throws Exception;
    
    //查询出租单元
    List<PushBkRentUnit> queryBkRentUnit(PushBkRentUnit record) throws Exception;
}
