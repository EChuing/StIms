package com.zz.service.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourPricePlan;

public interface JourPricePlanService {

	Result<String> savePricePlan(JourPricePlan jourPricePlan) throws Exception;

	Result<List<JourPricePlan>> queryJourPricePlan(JourPricePlan jourPricePlan) throws Exception;

	Result<String> batchUpdateJppState(JourPricePlan jourPricePlan) throws Exception;

}
