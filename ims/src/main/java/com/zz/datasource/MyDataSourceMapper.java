package com.zz.datasource;

import org.apache.ibatis.annotations.Param;

public interface MyDataSourceMapper {

	MyDataSource getDataSource(@Param("name") String name);
	MyDataSource getComparyId(@Param("id") Integer id);
}
