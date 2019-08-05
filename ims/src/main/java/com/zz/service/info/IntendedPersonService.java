package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoIntendedPerson;

public interface IntendedPersonService {
	
	//批量修改
	int intendedBatchUpdate(List<InfoIntendedPerson> iplist)throws Exception;
	
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
    
    //修改同时写跟进
    int updateById(InfoIntendedPerson record)throws Exception;
}
