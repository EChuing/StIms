package com.zz.service.journal;


import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.info.InfoHouse4storeExpand;

public interface JourShortRentHouseService {

	String updateshortRent(InfoHouse4storeExpand record) throws Exception;

	int insertShortRent(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception;
	
	Result<String> batchAddition(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception;

	Result<String> updateDirtyRoomList(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception;

	Result<String> insertHouseList(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception;
	
	Result<List<InfoHouse4storeExpand>> selectShortRentHouse(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception;
}
