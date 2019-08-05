package com.zz.mapper.info;

import com.zz.po.info.InfoFacePerson;

public interface InfoFacePersonMapper {
    int deleteByPrimaryKey(Integer ifpId);

    int insert(InfoFacePerson record);

    int insertSelective(InfoFacePerson record);

    InfoFacePerson selectByPrimaryKey(Integer popId);

    InfoFacePerson selectByPrimaryTag(Integer userId);

    int updateByPrimaryKeySelective(InfoFacePerson record);

    int updateByPrimaryKey(InfoFacePerson record);
}