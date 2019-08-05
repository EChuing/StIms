package com.zz.service.journal;

import java.util.List;

import com.zz.mapper.journal.JourWxPaymentMapper;
import com.zz.po.journal.JourWxPayment;

public class WxPaymentServiceImpl implements WxPaymentService{

	private JourWxPaymentMapper jourWxPaymentMapper;
	
	public void setJourWxPaymentMapper(JourWxPaymentMapper jourWxPaymentMapper){
			this.jourWxPaymentMapper =  jourWxPaymentMapper;
	}
	
	@Override
	public List<JourWxPayment> selectAllWxPayment(JourWxPayment conditions) throws Exception {
		// TODO Auto-generated method stub
		return jourWxPaymentMapper.selectAllWxPayment(conditions);
	}
	
	
	

}