package com.zz.datasource;

import java.util.List;

public interface DevFirstTypeMapper {

	//查询所有数据
	public List<DevFirstType> selectAll();
	//查询报警设备
	public List<DevFirstType> selectPolice() throws Exception;
}
