package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoProfitSpace;

public interface InfoProfitSpaceMapper {
    int deleteByPrimaryKey(Integer ipsId);

    int insert(InfoProfitSpace record);

    int insertSelective(InfoProfitSpace record);

    InfoProfitSpace selectByPrimaryKey(Integer ipsId);

    int updateByPrimaryKeySelective(InfoProfitSpace record);

    int updateByPrimaryKey(InfoProfitSpace record);
    
    List<InfoProfitSpace> selectAll(InfoProfitSpace record);
}