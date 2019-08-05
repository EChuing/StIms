package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourShortRentContract;
import com.zz.po.journal.JourShortRentSetUp;

public interface JourShortRentSetUpMapper {

    int insertSelective(JourShortRentSetUp record) throws Exception;

    List<JourShortRentSetUp> selectByPrimaryKey(JourShortRentSetUp record) throws Exception;

    int updateByPrimaryKeySelective(JourShortRentSetUp record) throws Exception;
    
}