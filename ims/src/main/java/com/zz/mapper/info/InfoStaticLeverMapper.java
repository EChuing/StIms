package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoStaticLever;

public interface InfoStaticLeverMapper {
    int deleteByPrimaryKey(Integer islId);

    int insert(InfoStaticLever record);

    int insertSelective(InfoStaticLever record);

    InfoStaticLever selectByPrimaryKey(Integer islId);

    int updateByPrimaryKeySelective(InfoStaticLever record);

    int updateByPrimaryKey(InfoStaticLever record);
    
    List<InfoStaticLever> selectAll(InfoStaticLever record);
}