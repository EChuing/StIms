package com.zz.service.journal;

import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourHsOfficeExpand;

import java.util.List;

public interface JourHsOfficeService {
	//更新
	int updateList(List<JourHsOfficeExpand> recordList) throws Exception;
	//根据办公区id查询获取关联房id
	List<Integer> selectHssByJhoOfficeId(Integer jhoOfficeId) throws Exception;
	//根据关联房id获取关联房
	List<InfoHouse4storeExpand>selectRelatedInfoHouse4storeExpand(JourHsOfficeExpand jourHsOfficeExpand) throws Exception;
	//获取所有未关联房
	List<InfoHouse4storeExpand>AllInfoHouse4storeExpand(JourHsOfficeExpand jourHsOfficeExpand) throws Exception;
	//根据办公区id获取关联设备id
	List<Integer> selectDevicesByJhoOfficeId(JourHsOfficeExpand jourHsOfficeExpand) throws Exception;
	//根据关联设备id获取关联设备
	List<JourDevice>selectRelatedDeviceExpand(JourHsOfficeExpand jourHsOfficeExpand) throws Exception;
	//获取所有未关联设备
	List<JourDevice> AllDeviceExpand(JourHsOfficeExpand jourHsOfficeExpand) throws Exception;
	//根据关联房id获取设备id
	List<Integer> selectDevIdByHsId(Integer hsId)throws Exception;
}
