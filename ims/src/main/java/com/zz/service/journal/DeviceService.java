package com.zz.service.journal;

import com.zz.po.journal.JourDevice;
import net.sf.json.JSONObject;

import java.util.List;

public interface DeviceService {

	//查询所有-数据和统计分开
	List<JourDevice> selectAllDevice(JourDevice conditions)throws Exception;
	
	//查询所有设备
	List<JourDevice> queryDevice(JourDevice conditions)throws Exception;
	//查询设备表所有设备
	List<JourDevice> getAllDevice() throws Exception;

	//查询本房源使用的设备
	List<JourDevice> selectThisHouseDevice(List list)throws Exception;

	int insertDeviceList(List list) throws Exception;
	
	//查询单个设备
	JourDevice selectSingle(Integer devId)throws Exception;
	
	//根据品牌ID和设备type查询设备的SN
	List<JourDevice> selectDeviceSN(JourDevice jourDevice) throws Exception;
	
	//根据品牌ID和设备type查询水电表设备和关联的未租房
	List<JourDevice> selectDeviceHouseStore(JourDevice jourDevice) throws Exception;
	
	//获取云海和电易水表
	List<JourDevice> waterEarlyWarning() throws Exception;
	
	//用未租ID查询设备信息
	List<JourDevice> selectDeviceStatus(int jhdHsId) throws Exception;

	//用未租ID查询设备信息
	List<JourDevice> selectCommon(int jhdHsId) throws Exception;

	//修改设备
	int updateById(JourDevice jourDevice);
	//删除人脸设备
	int deleteDevice(JourDevice jourDevice);
	//获取更改的二级设备类型
	Integer getDevSecondType(JSONObject obj);

	//查询所有设备
	List<JourDevice> selectDoorDevice(JourDevice conditions)throws Exception;

	int insertDevice(JourDevice jourDevice) throws Exception;

	//用设备ID，查询设备与未租关系表是否存在数据
	List<JourDevice> selectDeviceIdData(JourDevice conditions) throws Exception;

	//通过设备sn查询设备
	List<JourDevice> selectDeviceSn(JourDevice jourDevice)throws Exception;
}