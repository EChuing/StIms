package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.info.InfoContractInstallment;

public interface ContractInstallmentService {
	//查询所有-数据和统计分开
	List<InfoContractInstallmentExpand>selectAllContract(InfoContractInstallmentExpand conditions)throws Exception;
	//查询房东银行账号与类型
	List<InfoContractInstallmentExpand>landlordCard(InfoContractInstallmentExpand conditions)throws Exception;
	
	//单个查询
	List<InfoContractInstallmentExpand> selectByPrimaryKey (Integer id)throws Exception;
	
	//修改退房状态
	int checkoutthestate(InfoContractInstallment record)throws Exception;
	
	//查询已租房预交租金
	List<InfoContractInstallmentExpand> paysTheRent(InfoContractInstallmentExpand conditions)throws Exception;
	
	//查询未租房应付款
	List<InfoContractInstallmentExpand> accountsPayable(InfoContractInstallmentExpand conditions)throws Exception;
	
	//查询即将15天应收（租客）账单
	List<InfoContractInstallmentExpand> financialSelectRenter(InfoContractInstallmentExpand conditions)throws Exception;

	//查询即将15天应支（房东）账单 
	List<InfoContractInstallmentExpand> financialSelectLanlord(InfoContractInstallmentExpand conditions)throws Exception;

	//修改合约时查询最后一条已付、已支账单的结束周期
	String selectEndPeriods(InfoContractInstallmentExpand conditions) throws Exception;
	
	//修改合约时查询待付的第一条
	List<InfoContractInstallmentExpand> selectBeginPeriods(InfoContractInstallmentExpand conditions) throws Exception;
		
	List<InfoContractInstallmentExpand> selectcontractInstallment(InfoContractInstallmentExpand conditions)throws Exception;
    
    //查房东账单
    List<InfoContractInstallmentExpand> selectPayableToLandlord(InfoContractInstallmentExpand conditions);
	
	int deleteByPrimaryKey(InfoContractInstallment record) throws Exception;
	
	//单条账单增加
    int insertSelective(InfoContractInstallment record) throws Exception;
    
    int insertList(List<InfoContractInstallment> recordList) throws Exception;
    
    //查询所有
    List<InfoContractInstallmentExpand> selectAll(InfoContractInstallmentExpand conditions) throws Exception;
    
    //查询租客房东分期账单的总条数
    Integer billCount(InfoContractInstallmentExpand conditions);

    int updateByPrimaryKeySelective(InfoContractInstallment record) throws Exception;

    int updatePaymentInUpdateAll(InfoContractInstallment record) throws Exception;

    
    int updateIfPrintYes(List<InfoContractInstallmentExpand> list) throws Exception;
    
    int updateIfPrintNo(List list) throws Exception;
    
    //查询新签租客合约信息
    List<InfoContractInstallmentExpand> queryNewTenantContractInformation(InfoContractInstallmentExpand conditions);
    
    //查询当期的租金、物管费、服务费
    List<InfoContractInstallmentExpand>queryTheCurrentDataInformation(InfoContractInstallmentExpand conditions)throws Exception;
}
