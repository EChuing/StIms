package com.zz.mapper.cs;

import java.util.List;

import com.zz.po.cs.CsGoodsSell;

public interface CsGoodsSellMapper {

    int insertSelective(CsGoodsSell record) throws Exception;

    List<CsGoodsSell> selectByPrimaryKey(Integer id) throws Exception;

    int updateByPrimaryKeySelective(CsGoodsSell record) throws Exception;
    
    List<CsGoodsSell> listGoodsSell(CsGoodsSell record) throws Exception;
    
    int insertList(List<CsGoodsSell> list) throws Exception;
    
    List<CsGoodsSell> getPieNum(CsGoodsSell csGoodsSell) throws Exception;
    
    CsGoodsSell getSellAllNum(CsGoodsSell csGoodsSell) throws Exception;
    
    List<CsGoodsSell> getCategoryNum(CsGoodsSell csGoodsSell) throws Exception;
    
    List<CsGoodsSell> getGoodsProfitNum(CsGoodsSell csGoodsSell) throws Exception;

    CsGoodsSell getSellAllProfitNum(CsGoodsSell csGoodsSell) throws Exception;

    int deleteByPrimaryKey(Integer id) throws Exception;

}