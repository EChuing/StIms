package com.zz.service.stat;

import com.zz.mapper.stat.StatDeviceWarningMapper;
import com.zz.po.stat.StatDeviceWarning;

import java.util.List;

public class StatDeviceWarningServiceImpl implements StatDeviceWarningService {

	private StatDeviceWarningMapper statDeviceWarningMapper;
	
	public void setStatDeviceWarningMapper(StatDeviceWarningMapper statDeviceWarningMapper) {
		this.statDeviceWarningMapper = statDeviceWarningMapper;
	}

	@Override
	public List<StatDeviceWarning> selectDeviceWarning(StatDeviceWarning statDeviceWarning) throws Exception {
		return statDeviceWarningMapper.selectDeviceWarning(statDeviceWarning);
	}

	@Override
	public List<StatDeviceWarning> selectDeviceWarning2(StatDeviceWarning statDeviceWarning) throws Exception {
		return statDeviceWarningMapper.selectDeviceWarning(statDeviceWarning);
	}

}
