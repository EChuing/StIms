package com.zz.service.journal;



import java.util.List;
import java.util.Map;

import com.zz.po.commons.Result;
import com.zz.po.journal.JournalFinancial;
import com.zz.po.journal.JournalFinancialExpand;

public interface FinancialService {
	//查询收支-数据和统计分开
	List<JournalFinancialExpand> queryFinancial (JournalFinancialExpand str) throws Exception;
    //查询收支
    List<JournalFinancialExpand> queryFinancialCommon (JournalFinancialExpand str) throws Exception;
	
	//查询用于打印凭证号的收支
	List<JournalFinancialExpand> selectToDoPringt (JournalFinancialExpand str) throws Exception;
	
	//生成凭证号
	String documentNumber(JournalFinancialExpand str) throws Exception;
	
	//租客每期租金收支生成
	int rentEachPayment(JournalFinancialExpand str) throws Exception;
	
	//凭证号未生成的收支查询
	List<JournalFinancialExpand> documentQuery (JournalFinancialExpand str) throws Exception;
	
	//查询已生成凭证号的收支
	List<JournalFinancialExpand> certificateDetails  (JournalFinancialExpand str) throws Exception;
	
	//项目的财务收支查询
	List<JournalFinancialExpand> allvirtualPayments(JournalFinancialExpand str) throws Exception;
	
	//账户余额处理
	List<JournalFinancial> theBalanceOf(JournalFinancialExpand datatime)throws Exception;
	
	//根据盘源id查收支记录
	List<JournalFinancial> theBalanceOfByHouseId(JournalFinancialExpand datatime)throws Exception;
	
	//账户收支明细（账户收支总额查询）
	List<JournalFinancial> balanceByBillingDate(JournalFinancialExpand datatime)throws Exception;
	
	//账户收支明细（账户收支总额查询,统计总收入、总支出、总冲账）
	List<JournalFinancial> balanceByAccountId(JournalFinancialExpand datatime)throws Exception;
	
	//根据冲帐编码查询冲帐ID
	List<JournalFinancial> balanceId (JournalFinancial jfStrikeBalanceEncoding) throws Exception;
	
	//冲帐接口查询
	List<JournalFinancialExpand> strikeBalanceInterface (JournalFinancialExpand id) throws Exception;
		
	//根据财务编码ID删除
	int deleteByPrimaryKey(Integer jfFinancialCoding) throws Exception;
	
	// 1.录入外部买卖房财务信息 ；2.录入内部管理项目财务信息 ，房源编码绑定经理项目屋ID
    int insertSelective(JournalFinancial record) throws Exception;
    
    int insertList(List<JournalFinancial> recordList, int number) throws Exception;
    
    //查询所有的财务信息、冲账和被冲账与分页,给条件则为条件查询,不包含项目收支
    List<JournalFinancialExpand> selectInformationAll(JournalFinancialExpand str) throws Exception;
    
    //查询所有的财务信息、冲账和被冲账与分页,给条件则为条件查询 ,包含项目收支
    List<JournalFinancialExpand> allNormalAndVirtualPayments(JournalFinancialExpand str) throws Exception;
    
    List<JournalFinancialExpand> selectByHouse4rentId(Integer houseId) throws Exception;
    
    List<JournalFinancialExpand> selectAll(JournalFinancialExpand conditions) throws Exception;

    List<JournalFinancialExpand> selectByPrimaryKey(Integer jfFinancialCoding) throws Exception;

    String selectOfMaxNumber() throws Exception;
    
    //根据财务ID修改
    int updateByPrimaryKeySelective(JournalFinancialExpand record , Integer a) throws Exception;
    
    //根据房屋ID修改
    int updateByHouse4rentId(JournalFinancial record) throws Exception;
    
    //财务收支复核
   int financialAudit(JournalFinancialExpand record) throws Exception;
   
   //项目收支复核
   int financialVirtualReview(JournalFinancialExpand record) throws Exception;
   
   //财务冲账
   int financialCompensation(JournalFinancialExpand record) throws Exception;
   
   //公司成本统计
   List<JournalFinancialExpand> getCompanyCost(Map<String, Object> map) throws Exception;
   
   /**
    * 批量插入收支记录 不校验票据编号
    * @param jsonArray 拼好了的收支jsonArray
    * @return
    * @throws Exception
    */
   int insertFinancialList(String jsonArray) throws Exception;

   Result<String> clearCreditMoney(JournalFinancialExpand record) throws Exception;
   
   Result<String> batchClearCredit(JournalFinancialExpand record) throws Exception;
   
}
