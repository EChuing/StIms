package com.zz.mapper.info;

import com.zz.po.info.InfoPopulation;

import java.util.List;

public interface InfoPopulationMapper {
	
	List<InfoPopulation> getPopUserId(InfoPopulation record)throws Exception;
	//删除
    int deleteByPrimaryKey(Integer popId)throws Exception;
    
    //新增
    int insertSelective(InfoPopulation record)throws Exception;
    
    //查询
    List<InfoPopulation> selectByPrimaryKey(InfoPopulation record)throws Exception;
    
    //人口新增修改判断查询
    List<InfoPopulation>newModifiedJudgmentQuery(InfoPopulation record)throws Exception;
    
    //修改
    int updateByPrimaryKeySelective(InfoPopulation record)throws Exception;
    
    //批量导入查询
    List<InfoPopulation> selectIdcardKey(InfoPopulation record)throws Exception;

    //查业主的房
    List<InfoPopulation> getLandlordHouse(InfoPopulation record)throws Exception;
    
    //查租客的房
    List<InfoPopulation> getRenterHouse(InfoPopulation record)throws Exception;
    
    //查住户的房
    List<InfoPopulation> getLivingMenHouse(InfoPopulation record)throws Exception;

    //用未租ID查业主
    List<InfoPopulation> getHouseLandlord(InfoPopulation record)throws Exception;
    
    //用未租ID查租客
    List<InfoPopulation> getHouseRenter(InfoPopulation record)throws Exception;
    
    //用未租ID查住户
    List<InfoPopulation> getHouseLivingMen(InfoPopulation record)throws Exception;

    //用未租ID查住户（查询在住的住户）
    List<InfoPopulation> getHousehold(InfoPopulation record)throws Exception;

    //用已租ID查业主
    List<InfoPopulation> getRentHouseLandlord(InfoPopulation record)throws Exception;
    
    //用已租ID查租客
    List<InfoPopulation> getRentHouseRenter(InfoPopulation record)throws Exception;
    
    //用已租ID查住户
    List<InfoPopulation> getRentHouseLivingMen(InfoPopulation record)throws Exception;
    
    //用人口表id
    List<InfoPopulation> listPopByList(List<Integer> list)throws Exception;
    //查询租客总人数
    InfoPopulation selectPopulationAllUsers() throws Exception;

}