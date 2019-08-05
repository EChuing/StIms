package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoIntendedPerson;

public interface InfoIntendedPersonMapper {
	//批量修改
	int intendedBatchUpdate(List<InfoIntendedPerson> iplist)throws Exception;
	
	//转移查询
	List<InfoIntendedPerson> getipUserId(InfoIntendedPerson record)throws Exception;
	//删除
    int deleteByPrimaryKey(Integer ipId)throws Exception;
    
    //新增
    int insertSelective(InfoIntendedPerson record)throws Exception;
    
    //查询
    List<InfoIntendedPerson> selectByPrimaryKey(InfoIntendedPerson record)throws Exception;
    
    //修改
    int updateByPrimaryKeySelective(InfoIntendedPerson record)throws Exception;
    
    //数据导入查询
    List<InfoIntendedPerson> dataImportQuery(Integer ipPopulationId)throws Exception;
}