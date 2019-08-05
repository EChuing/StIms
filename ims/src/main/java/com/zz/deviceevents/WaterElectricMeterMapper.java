package com.zz.deviceevents;

import java.util.List;

public interface WaterElectricMeterMapper {
	// 获取最新水表的读数
	List<WaterMeterEvents> queryWaterMeterDetails(WaterMeterEvents waterMeterEvents) throws Exception;
	//获取上月水表最后的读数
	String queryLastMonthWaterMeter(WaterMeterEvents waterMeterEvents) throws Exception;
	//获取最新电表的读数 
	List<ElectricMeterEvents> queryElectricMeterDetails(ElectricMeterEvents electricMeterEvents) throws Exception;
	//获取上月电表最后的读数
	String queryLastMonthElectricMeter(ElectricMeterEvents electricMeterEvents) throws Exception;
	//查询水表读数
	List<WaterMeterEvents> selectWaterMeterNum(WaterMeterEvents waterMeterEvents) throws  Exception;
	//查询电表读数
	List<ElectricMeterEvents> selectElectricMeterNum(ElectricMeterEvents electricMeterEvents) throws  Exception;
	//查询水表状态
	List<WaterMeterEvents> queryDeviceMessage(WaterMeterEvents waterMeterEvents) throws  Exception;

}
