package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoFile;


public interface InfoFileMapper {
    //查询所有
    List<InfoFile> selectAll(InfoFile record)throws Exception;
    
    //修改文件
    int updateFile(InfoFile record)throws Exception;
    
    //删除文件
    int deleteFile(Integer id)throws Exception;
    
    //上传文件
    int insertSelective(InfoFile infoFile)throws Exception;
}
