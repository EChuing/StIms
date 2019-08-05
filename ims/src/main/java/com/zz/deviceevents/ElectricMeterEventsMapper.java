package com.zz.deviceevents;

import java.util.List;

public interface ElectricMeterEventsMapper {
    int deleteByPrimaryKey(Integer emId);

    int insert(ElectricMeterEvents record);

    int insertSelective(ElectricMeterEvents record);

    ElectricMeterEvents selectByPrimaryKey(Integer emId);

    int updateByPrimaryKeySelective(ElectricMeterEvents record);

    int updateByPrimaryKey(ElectricMeterEvents record);

    List<ElectricMeterEvents> selectEmAlarmRecord(ElectricMeterEvents electricMeterEvents)throws Exception;

    Integer updateEmAlarmRecord(ElectricMeterEvents electricMeterEvents2)throws Exception;

    List<ElectricMeterEvents> queryDeviceMessage(ElectricMeterEvents electricMeterEvents)throws Exception;
}