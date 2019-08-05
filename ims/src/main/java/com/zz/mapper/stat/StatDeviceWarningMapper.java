package com.zz.mapper.stat;

import com.zz.po.stat.StatDeviceWarning;

import java.util.List;


public interface StatDeviceWarningMapper {

	//查设备当天的状态
	List<StatDeviceWarning> selectDeviceWarning(StatDeviceWarning statDeviceWarning) throws Exception;

}
