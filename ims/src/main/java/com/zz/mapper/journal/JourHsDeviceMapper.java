package com.zz.mapper.journal;


import java.util.List;

import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourHsDevice;

public interface JourHsDeviceMapper {
	//添加数据
	int insertList(List<JourHsDevice> recordList) throws Exception;
	
	//查询本房源使用的设备ID
	List<JourHsDevice> selectThisHouseDeviceID(Integer jhdHsId) throws Exception;

	//根据设备ID查询房
	int selectThisDeviceIDHouse(Integer jhdDeviceId) throws Exception;
	
	//根据设备id查询房间id
	List<JourHsDevice> selectThisHsIdByDeviceId(Integer jhdDeviceId) throws Exception;
	
	//根据房间id查询设备id
	List<Integer> selectDeviceIdsByHsId(Integer jhdDeviceId) throws Exception;
	//未租房查设备
	List<JourDevice> queryDeviceByHs(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception;

	//查办公区设备
	List<JourDevice> queryOfficeAreaDevice(JourDevice office) throws Exception;
	
	List<JourHsDevice> queryAllDevice(JourHsDevice jourHsDevice) throws Exception;

	JourDevice queryThisDeviceHouse(JourHsDevice jourHsDevice) throws Exception;

	int insertHsDevice(JourHsDevice jourHsDevice) throws Exception;

	int delHsDevice(JourHsDevice jourHsDevice) throws Exception;

	int updateHsDevice(JourHsDevice jourHsDevice) throws Exception;

	List<JourDevice> seleceGuidByHsId(JourHsDevice jourHsDevice) throws Exception;

}
