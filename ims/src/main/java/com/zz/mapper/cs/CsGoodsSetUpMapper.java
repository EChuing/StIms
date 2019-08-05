package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsSetUp;

public interface CsGoodsSetUpMapper {

    int insertSelective(CsGoodsSetUp record) throws Exception;

    List<CsGoodsSetUp> selectByPrimaryKey(CsGoodsSetUp record) throws Exception;

    int updateByPrimaryKeySelective(CsGoodsSetUp record) throws Exception;

}