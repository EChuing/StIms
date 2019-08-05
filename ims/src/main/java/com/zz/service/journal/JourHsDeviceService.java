package com.zz.service.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourHsDevice;

public interface JourHsDeviceService {
	int insertList(List<JourHsDevice> recordList) throws Exception;
	
	List<JourHsDevice> selectThisHouseDeviceID(Integer jhdHsId) throws Exception;

	int selectThisDeviceIDHouse(Integer jhdDeviceId) throws Exception;
	//未租房查设备
	List<JourDevice> queryDeviceByHs(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception;
	//查办公区设备
	List<JourDevice> queryOfficeAreaDevice(JourDevice office) throws Exception;

	Result<List<JourHsDevice>> queryAllDevice(JourHsDevice jourHsDevice) throws Exception;

	JourDevice queryThisDeviceHouse(JourHsDevice jourHsDevice) throws Exception;

	int insertHsDevice(JourHsDevice jourHsDevice) throws Exception;

	int delHsDevice(JourHsDevice jourHsDevice) throws Exception;

	List<JourDevice> seleceGuidByHsId(JourHsDevice jourHsDevice) throws Exception;

	int updateHsDevice(JourHsDevice jourHsDevice) throws Exception;
}
