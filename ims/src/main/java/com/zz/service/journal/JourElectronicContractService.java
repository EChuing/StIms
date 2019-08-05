package com.zz.service.journal;

import com.zz.po.commons.Result;
import com.zz.po.journal.JournalElectronicContractExpansion;

import java.util.List;

public interface JourElectronicContractService {
	String dealWithSign(JournalElectronicContractExpansion jece) throws Exception;

	String dealWithSignOut(JournalElectronicContractExpansion jece) throws Exception;

	String signShow(JournalElectronicContractExpansion jece) throws Exception;

	String syncAddNoRent(JournalElectronicContractExpansion jece) throws Exception;

	String asynAddNoRent(JournalElectronicContractExpansion jece) throws Exception;

	int checkResult(JournalElectronicContractExpansion jece) throws Exception;

	List<JournalElectronicContractExpansion> listContract(JournalElectronicContractExpansion jece) throws Exception;

	Result<String> getContractImg(JournalElectronicContractExpansion jece) throws Exception;
	
	Result<String> updateContract(JournalElectronicContractExpansion jece) throws Exception;
}
