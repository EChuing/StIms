package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsDeviceRelation;

public interface CsGoodsDeviceRelationMapper {

	int insertList(List<CsGoodsDeviceRelation> list) throws Exception;

    int insertSelective(CsGoodsDeviceRelation record) throws Exception;

    List<CsGoodsDeviceRelation> selectByPrimaryKey(Integer cgdrId) throws Exception;

    int updateByPrimaryKeySelective(CsGoodsDeviceRelation record) throws Exception;
    
    int updateState(CsGoodsDeviceRelation record) throws Exception;
    
    List<CsGoodsDeviceRelation> selectSn(CsGoodsDeviceRelation record) throws Exception;

}