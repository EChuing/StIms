package com.zz.mapper.info;

import java.util.List;
import com.zz.po.info.InfoPlanTable;

public interface InfoPlanTableMapper {
	
    int deleteByPrimaryKey(Integer planId)throws Exception;

    int insertSelective(InfoPlanTable record)throws Exception;

    List<InfoPlanTable> selectByPrimaryKey(InfoPlanTable record)throws Exception;

    int updateByPrimaryKeySelective(InfoPlanTable record)throws Exception;

}