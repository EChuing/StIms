package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JourWxPayment;

public interface WxPaymentService {
	
	//查询所有-数据和统计分开
	List<JourWxPayment> selectAllWxPayment(JourWxPayment conditions)throws Exception;
	

}