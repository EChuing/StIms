package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourShortRentNexus;

public interface JourShortRentNexusMapper {


    int insertSelective(JourShortRentNexus record) throws Exception;

    List<JourShortRentNexus> selectByPrimaryKey(JourShortRentNexus record) throws Exception;

    int updateByPrimaryKeySelective(JourShortRentNexus record) throws Exception;

}