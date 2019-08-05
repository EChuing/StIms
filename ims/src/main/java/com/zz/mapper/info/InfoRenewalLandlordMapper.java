package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoRenewalLandlord;
import com.zz.po.info.InfoRenewalLandlordExpand;

public interface InfoRenewalLandlordMapper {
	//查询所有-数据和统计分开
	List<InfoRenewalLandlordExpand> selectAllRenewalLandlord(InfoRenewalLandlordExpand conditions) throws Exception;
	
	List<InfoRenewalLandlordExpand> selectAll(InfoRenewalLandlordExpand conditions) throws Exception;
	
	List<InfoRenewalLandlordExpand> adSelect(InfoRenewalLandlordExpand conditions) throws Exception;
	
	List<InfoRenewalLandlordExpand> selectByPrimaryKey(InfoRenewalLandlordExpand conditions) throws Exception;
    
    int deleteByPrimaryKey(Integer jrlId) throws Exception;

    int insertSelective(InfoRenewalLandlord record) throws Exception;

    int updateByPrimaryKeySelective(InfoRenewalLandlord record) throws Exception;
    
    //公司人员，转移部门查询
    List<InfoRenewalLandlordExpand> alljrlContractDepartment(InfoRenewalLandlordExpand conditions) throws Exception;
    
    //房东新签合约统计
   int querySignedNum (InfoRenewalLandlordExpand conditions) throws Exception;
   
   //查询未租房托管到期时间
   InfoRenewalLandlordExpand selectEndTime(Integer hsId) throws Exception;
   
   //查询当期业主合约的到期日期 
   InfoRenewalLandlordExpand queryCurJrlEndTime(InfoRenewalLandlordExpand conditions) throws Exception;
}