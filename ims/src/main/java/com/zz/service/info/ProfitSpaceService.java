package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoProfitSpace;

public interface ProfitSpaceService {
	List<InfoProfitSpace> selectAll(InfoProfitSpace record);
}
