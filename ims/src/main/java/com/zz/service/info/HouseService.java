package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoHouse;
import com.zz.po.info.InfoHouseExpand;
import com.zz.po.journal.JournalFinancialExpand;

public interface HouseService {
	
	List<InfoHouseExpand> getemployee(InfoHouseExpand conditions)throws Exception;
	//数据导入查询
	List<InfoHouseExpand> selectData(InfoHouseExpand conditions)throws Exception;
	
	//项目盘源查询 
	List<InfoHouseExpand> virtualProperty(InfoHouseExpand conditions) throws Exception;
	
	//供应商查询
	List<InfoHouseExpand> virtualRoomVendorQuery(InfoHouseExpand conditions) throws Exception;
	
	int deleteByPrimaryKey(Integer houseCoding) throws Exception;

    int insertSelective(InfoHouseExpand record) throws Exception;
    
    int insertList(List<InfoHouseExpand> recordList) throws Exception;

    List<InfoHouseExpand> selectByPrimaryKey(Integer integer);
    
    List<InfoHouseExpand> queryHousePaper(InfoHouseExpand conditions) throws Exception;
    
    List<InfoHouseExpand> queryHousePaperCommon(InfoHouseExpand conditions) throws Exception;
    
    List<String> selectForAddress(InfoHouseExpand conditions) throws Exception;
    
    String selectOfMaxNumber() throws Exception;

    int updateHouse(InfoHouseExpand record) throws Exception;
    int updateByPrimaryKeySelective(InfoHouseExpand record) throws Exception;

    //项目余额的修改累加
    int updateVirBalance(InfoHouseExpand record) throws Exception;
    
    //统计所有项目余额
    int statisticsAllAccountBalance(InfoHouseExpand record) throws Exception;
    
    //查项目
    List<InfoHouseExpand> getProject(InfoHouseExpand record) throws Exception;
    
    //公司成本统计
    List<JournalFinancialExpand> getCompanyCost(InfoHouseExpand record) throws Exception;
	
    int addOffice(InfoHouseExpand office) throws Exception;
	
    int updateOffice(InfoHouseExpand office) throws Exception;
    
    //查办公区
	List<InfoHouseExpand> queryOffice(InfoHouseExpand office) throws Exception;
}
