package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoFinancialAccount;

public interface InfoFinancialAccountMapper {
	//账户余额的修改累加
	int updateFaTheBalanceOf(InfoFinancialAccount record) throws Exception;
	//删除
    int deleteByPrimaryKey(Integer faId) throws Exception;

    //新增
    int insertSelective(InfoFinancialAccount record) throws Exception;
    
    //查询 
    List<InfoFinancialAccount> selectByPrimaryKey(InfoFinancialAccount record) throws Exception;

    //查询全部账户
    List<InfoFinancialAccount> selectAllName() throws Exception;
    
    //公告接口查询账户部分信息
    List<InfoFinancialAccount> selectNamePublic(InfoFinancialAccount record) throws Exception;
    
    //修改
    int updateByPrimaryKeySelective(InfoFinancialAccount record) throws Exception;

}