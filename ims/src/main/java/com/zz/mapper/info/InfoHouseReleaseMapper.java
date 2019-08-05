package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoHouseRelease;

public interface InfoHouseReleaseMapper {
    int deleteByPrimaryKey(Integer hreId)throws Exception;

    int insert(InfoHouseRelease record)throws Exception;

    int insertSelective(InfoHouseRelease record)throws Exception;

    List<InfoHouseRelease> selectByPrimaryKey(InfoHouseRelease record)throws Exception;

    int updateByPrimaryKeySelective(InfoHouseRelease record)throws Exception;

}