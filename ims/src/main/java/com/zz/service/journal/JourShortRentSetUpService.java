package com.zz.service.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.info.InfoNotRentCheckOut;
import com.zz.po.journal.JourShortRentSetUp;

public interface JourShortRentSetUpService {
	
	Result<String> updateSetUp(JourShortRentSetUp jourShortRentSetUp) throws Exception;
	
	Result<String> getSetUpInfo(JourShortRentSetUp jourShortRentSetUp) throws Exception;
	
	Result<String> deleteAdImg(JourShortRentSetUp jourShortRentSetUp) throws Exception;

	List<JourShortRentSetUp> selectByPrimaryKey(Integer jsrsuId) throws Exception;
}
