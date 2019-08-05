package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsInventory;

public interface CsGoodsInventoryMapper {


    int insertSelective(CsGoodsInventory record) throws Exception;

    List<CsGoodsInventory> selectByPrimaryKey(CsGoodsInventory record) throws Exception;

    int updateByPrimaryKeySelective(CsGoodsInventory record) throws Exception;
    
    List<CsGoodsInventory> listCsGoodsInventory(CsGoodsInventory record) throws Exception;

}