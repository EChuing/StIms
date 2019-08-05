package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.info.InfoContractInstallment;

public interface InfoContractInstallmentMapper {
	//查询所有-数据和统计分开
	List<InfoContractInstallmentExpand>selectAllContract(InfoContractInstallmentExpand conditions)throws Exception;
	
	//已租房id查询分期账单
	List<InfoContractInstallmentExpand>rentIdAll(InfoContractInstallmentExpand conditions)throws Exception;
	
	//查询房东银行账号与类型
	List<InfoContractInstallmentExpand>landlordCard(InfoContractInstallmentExpand conditions)throws Exception;
	
	//修改退房状态
	int checkoutthestate(InfoContractInstallment record)throws Exception;
	
	//查询已租房预交租金
	List<InfoContractInstallmentExpand> paysTheRent(InfoContractInstallmentExpand conditions)throws Exception;
	
	//查询未租房应付款
	List<InfoContractInstallmentExpand> accountsPayable(InfoContractInstallmentExpand conditions)throws Exception;
	
	//查询已租房剩余待交租金
	List<InfoContractInstallmentExpand> selectcontractInstallment(InfoContractInstallmentExpand conditions)throws Exception;
	
	//单个查询
	List<InfoContractInstallmentExpand> selectByPrimaryKey (InfoContractInstallmentExpand infoContract)throws Exception;
	List<InfoContractInstallmentExpand> selectByPrimaryKey (Integer id)throws Exception;
	//查询即将15天应收（租客）账单
	List<InfoContractInstallmentExpand> financialSelectRenter(InfoContractInstallmentExpand conditions)throws Exception;
	
	//查询即将15天应支（房东）账单 
	List<InfoContractInstallmentExpand> financialSelectLanlord(InfoContractInstallmentExpand conditions)throws Exception;
	
	//修改合约时查询最后一条已付、已支账单的结束周期
	String selectEndPeriods(InfoContractInstallmentExpand conditions) throws Exception;
	
	//修改合约时查询待付的第一条
	List<InfoContractInstallmentExpand> selectBeginPeriods(InfoContractInstallmentExpand conditions) throws Exception;
	
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

    int updateIfPrintYes(List<InfoContractInstallmentExpand> list) throws Exception;
    
    int updateIfPrintNo(List list) throws Exception;
    
    //查询新签租客合约信息
    List<InfoContractInstallmentExpand> queryNewTenantContractInformation(InfoContractInstallmentExpand conditions);
    
    //查询当期的租金、物管费、服务费
    List<InfoContractInstallmentExpand> queryTheCurrentDataInformation(InfoContractInstallmentExpand conditions)throws Exception;
    //计算合约期内待收账单总金额
    List<InfoContractInstallmentExpand> countJciMoney(InfoContractInstallmentExpand conditions)throws Exception;
    //退房时账单
    List<InfoContractInstallmentExpand> queryByTheTime(InfoContractInstallmentExpand conditions)throws Exception;
    //查询此日期之后下一期有金额的账单
//    InfoContractInstallmentExpand queryByTheTime2(InfoContractInstallmentExpand conditions)throws Exception;
    //查询最近一期有金额的账单的开始时间之前的账单是否存在待收的账单，有的话也是要补交的
//    List<InfoContractInstallmentExpand> queryByTheTime3(InfoContractInstallmentExpand conditions)throws Exception;
    //查询最近一期有金额的账单的开始时间之后的账单是否存在已收的账单，有的话也是要退的
//    List<InfoContractInstallmentExpand> queryByTheTime4(InfoContractInstallmentExpand conditions)throws Exception;

	List<InfoContractInstallmentExpand> selectFukuanri(InfoContractInstallmentExpand conditions)throws Exception;
     
}