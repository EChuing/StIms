package com.zz.service.journal;

import com.zz.po.journal.JourTemporaryOrder;

import java.util.List;

public interface JourTemporaryOrderService {

    int insertSelective(JourTemporaryOrder jourTemporaryOrder)throws Exception;

    JourTemporaryOrder selectByOrderId(JourTemporaryOrder jourTemporaryOrder)throws Exception;

    int updateTemporaryOrderById(JourTemporaryOrder jourTemporaryOrder)throws Exception;

    List<JourTemporaryOrder> selectAll(JourTemporaryOrder jourTemporaryOrder)throws Exception;

    int deleteTemporaryOrderById(JourTemporaryOrder jourTemporaryOrder)throws Exception;

    List<JourTemporaryOrder> selectBySelective(JourTemporaryOrder jourTemporaryOrder)throws Exception;

}
