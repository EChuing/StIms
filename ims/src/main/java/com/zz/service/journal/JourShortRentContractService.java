package com.zz.service.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourShortRentContract;
import com.zz.po.journal.JourShortRentRenter;

public interface JourShortRentContractService {
	List<JourShortRentContract> listJourShortRentContractByHsIdList(JourShortRentContract jourShortRentContract) throws Exception;
	
	Result<String> insertShortRent(JourShortRentContract jourShortRentContract) throws Exception;
	
	String checkOutShortRent(JourShortRentContract jourShortRentContract) throws Exception;
	
	Result<List<JourShortRentContract>> updateShortRent(JourShortRentContract jourShortRentContract) throws Exception;
	
	String checkInShortRent(JourShortRentContract jourShortRentContract) throws Exception;
	
	Result<List<JourShortRentContract>> selectJourShortRentContract(JourShortRentContract jourShortRentContract) throws Exception;
	
	Result<String> sceneCheckIn(JourShortRentContract jourShortRentContract) throws Exception;
	
	Result<String> retainCheckIn(JourShortRentContract jourShortRentContract) throws Exception;

	Result<List<JourShortRentContract>> updateRoom(JourShortRentContract jourShortRentContract) throws Exception;
	
	//批量插入保留办理订单
	Result<String> insertList(JourShortRentContract jourShortRentContract) throws Exception;
	
	Result<String> changeShortRentHouse(JourShortRentContract jourShortRentContract) throws Exception;
	
	List<JourShortRentContract> selectRenter(JourShortRentContract jourShortRentContract) throws Exception;
	
	List<JourShortRentContract> queryNewOrder(JourShortRentContract jourShortRentContract) throws Exception;
	
	int updateShortRentContract(JourShortRentContract jourShortRentContract) throws Exception;

	String housingCleaning(JourShortRentContract jourShortRentContract) throws Exception;

}
