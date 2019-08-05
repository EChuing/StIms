package com.zz.mapper.cs;

import java.util.List;


import com.zz.po.cs.CsGoodsCategory;

public interface CsGoodsCategoryMapper {

	List<CsGoodsCategory> listCsGoodsCategory(CsGoodsCategory record) throws Exception;

    int insertSelective(CsGoodsCategory record) throws Exception;

    List<CsGoodsCategory> selectByPrimaryKey(Integer id) throws Exception;

    int updateByPrimaryKeySelective(CsGoodsCategory record) throws Exception;
    
    int updateCgcList(List<CsGoodsCategory> list) throws Exception;
}