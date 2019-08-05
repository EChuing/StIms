package com.zz.mapper.journal;


import java.util.List;

import com.zz.po.journal.JournalElectronicContractExpansion;

public interface JourElectronicContractMapper {
	//插入电子合同临时表
	int insertElectronicContract(JournalElectronicContractExpansion jece) throws Exception;

	JournalElectronicContractExpansion selectElectronicContract(JournalElectronicContractExpansion jece) throws Exception;
	//更新电子合同临时表
	int updateElectronicContract(JournalElectronicContractExpansion jece) throws Exception;

	int updateByPrimaryKeySelective(JournalElectronicContractExpansion jece) throws Exception;

	List<JournalElectronicContractExpansion> listContract(JournalElectronicContractExpansion jece) throws Exception;
}
