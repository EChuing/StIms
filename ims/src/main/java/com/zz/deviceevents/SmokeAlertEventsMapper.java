package com.zz.deviceevents;

import java.util.List;


public interface SmokeAlertEventsMapper {
	
	//根据设备sn码查询警情记录
	List<SmokeAlertEvents> selectAlarmRecord(SmokeAlertEvents smokeAlertEvents) throws Exception;
	
	//根据设备sn码查询当天警情记录数量
	int selectCountAlarmRecord(SmokeAlertEvents smokeAlertEvents) throws Exception;
	//根据设备sn码查询
	List<SmokeAlertEvents> queryDeviceMessage(SmokeAlertEvents smokeAlertEvents) throws Exception;

	int updateAlarmRecord(SmokeAlertEvents smokeAlertEvents) throws Exception;
	
}
