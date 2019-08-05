package com.zz.datasource;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface BrandMapper {
	//查询所有数据
	List<Brand> getAllBrand();
	//根据品牌id查询出对应的数据
	List<Brand> getAllBrandById(List list);
}
