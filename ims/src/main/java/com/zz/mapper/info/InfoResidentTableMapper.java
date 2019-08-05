package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoResidentTable;

public interface InfoResidentTableMapper {
	//删除
    int deleteByPrimaryKey(Integer rtId)throws Exception;
    
    //新增
    int insertSelective(InfoResidentTable record)throws Exception;
    
    //查询
    List<InfoResidentTable> selectByPrimaryKey(InfoResidentTable record)throws Exception;
    
    //修改
    int updateByPrimaryKeySelective(InfoResidentTable record)throws Exception;
    
    //判断查询
    List<InfoResidentTable> selectRtplid(InfoResidentTable record)throws Exception;
}