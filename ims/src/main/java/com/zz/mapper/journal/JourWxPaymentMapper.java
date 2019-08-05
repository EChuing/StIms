package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourWxPayment;

public interface JourWxPaymentMapper {
	
	//查询所有-数据和统计分开
	List<JourWxPayment> selectAllWxPayment(JourWxPayment conditions)throws Exception;
	

}