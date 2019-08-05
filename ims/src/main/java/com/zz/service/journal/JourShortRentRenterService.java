package com.zz.service.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourShortRentContract;
import com.zz.po.journal.JourShortRentRenter;

public interface JourShortRentRenterService {
	
	List<JourShortRentRenter> listLivingCustomer(JourShortRentRenter jourShortRentRenter) throws Exception;

	Result<List<JourShortRentRenter>> customerOrder(JourShortRentRenter jourShortRentRenter) throws Exception;

	Result<List<JourShortRentRenter>> customerContractOrder(JourShortRentRenter jourShortRentRenter)throws Exception;

}
