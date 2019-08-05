package com.zz.service.stat;

import com.zz.po.stat.StatDeviceWarning;

import java.util.List;

public interface StatDeviceWarningService {

	//查设备七天的状态
	List<StatDeviceWarning> selectDeviceWarning(StatDeviceWarning statDeviceWarning) throws Exception;
	//查设备本月的状态
	List<StatDeviceWarning> selectDeviceWarning2(StatDeviceWarning statDeviceWarning) throws Exception;
}
