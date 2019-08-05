package com.zz.mapper.journal;

import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourDeviceWarning;

import java.util.List;


public interface JourDeviceWarningMapper {
	List<JourDeviceWarning> selectToDayDetails(JourDeviceWarning jourDeviceWarning) throws Exception;
	
	int insertDeviceWarning(JourDeviceWarning jourDeviceWarning) throws Exception;
	
	List<JourDevice> selectAlarmRecord(JourDevice jourDevice) throws Exception;

	List<JourDevice> queryAlarmRecordCount(JourDevice jourDevice) throws Exception;
	
	List<JourDevice> selectDevice(JourDevice jourDevice) throws Exception;
	
	//根据设备sn码查询当天警情记录数量
	int selectCountAlarmRecord(JourDeviceWarning jourDeviceWarning) throws Exception;
	
	int updateByPrimaryKeySelective(JourDeviceWarning jourDeviceWarning) throws Exception;

	JourDeviceWarning selectSingle(Integer id) throws Exception;

	List<JourDevice> queryAlarmFrequency() throws Exception;

	List<JourDevice> equipmentCondition() throws Exception;

	List<JourDevice> selectPolice(JourDevice jourDevice) throws Exception;
}
