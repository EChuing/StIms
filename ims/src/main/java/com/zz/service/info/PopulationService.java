package com.zz.service.info;

import com.zz.po.info.InfoPopulation;

import java.util.List;

public interface PopulationService {
	
	List<InfoPopulation> getPopUserId(InfoPopulation record)throws Exception;
	//删除
    int deleteByPrimaryKey(Integer popId)throws Exception;
    
    //新增
    int insertSelective(InfoPopulation record)throws Exception;
    
    //查询
    List<InfoPopulation> selectByPrimaryKey(InfoPopulation record)throws Exception;
    
    //修改
    int updateByPrimaryKeySelective(InfoPopulation record)throws Exception;
    
    //修改
    int updateByPrimaryKeySelective2(InfoPopulation record)throws Exception;
    
    //批量导入查询
    List<InfoPopulation> selectIdcardKey(InfoPopulation record)throws Exception;
    
    //查询人头下所有的房屋
    List<InfoPopulation> selectPopulationHouse(InfoPopulation record)throws Exception;
    
    //查询房屋下所有的人头
    List<InfoPopulation> selectHousePopulation(InfoPopulation record)throws Exception;
    
    //用已租ID去查该已租房间里的所有人头
    List<InfoPopulation> listHousePopulatinByHrId(InfoPopulation record)throws Exception;

    //查询所有的人头
    InfoPopulation selectPopulationAllUsers()throws Exception;

    //查询房屋下所有的人口
    List<InfoPopulation> getHousePopulation(InfoPopulation record) throws Exception;
}
