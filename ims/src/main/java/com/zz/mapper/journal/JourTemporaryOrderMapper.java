package com.zz.mapper.journal;

import com.zz.po.journal.JourTemporaryOrder;

import java.util.List;

public interface JourTemporaryOrderMapper {
    int deleteByPrimaryKey(Integer jtoId);

    int insert(JourTemporaryOrder record);

    int insertSelective(JourTemporaryOrder record)throws Exception;

    JourTemporaryOrder selectByPrimaryKey(JourTemporaryOrder record)throws Exception;

    int updateByPrimaryKeySelective(JourTemporaryOrder record)throws Exception;


    int updateByPrimaryKey(JourTemporaryOrder record)throws Exception;

    List<JourTemporaryOrder> selectAll(JourTemporaryOrder jourTemporaryOrder)throws Exception;

    List<JourTemporaryOrder> selectBySelective(JourTemporaryOrder jourTemporaryOrder)throws Exception;


}