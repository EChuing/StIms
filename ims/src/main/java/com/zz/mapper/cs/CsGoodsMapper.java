package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsGoods;

public interface CsGoodsMapper {

    int insertSelective(CsGoods record) throws Exception;

    List<CsGoods> selectByPrimaryKey(Integer id) throws Exception;

    int updateByPrimaryKeySelective(CsGoods record) throws Exception;
    
    List<CsGoods> listCsGoods(CsGoods record) throws Exception;
    
    List<CsGoods> SNListCsGoods(CsGoods record) throws Exception;
    
    int updateList(List<CsGoods> record) throws Exception;

}