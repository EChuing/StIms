package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoRenewalRenter;
import com.zz.po.info.InfoRenewalRenterExpand;

public interface InfoRenewalRenterMapper {
	//查询所有-数据和统计分开
	List<InfoRenewalRenterExpand> selectAllRenewalRenter(InfoRenewalRenterExpand conditions) throws Exception;
	
	List<InfoRenewalRenterExpand> selectrenterAll(InfoRenewalRenterExpand conditions) throws Exception;
	
	List<InfoRenewalRenterExpand> adSelect(InfoRenewalRenterExpand conditions) throws Exception;
	
    int deleteByPrimaryKey(Integer jrlId) throws Exception;

    int insertSelective(InfoRenewalRenter record) throws Exception;

    int updateByPrimaryKeySelective(InfoRenewalRenterExpand record) throws Exception;

    //公司人员，转移部门查询
    List<InfoRenewalRenterExpand>allContractDepartment(InfoRenewalRenterExpand conditions) throws Exception;
    
    //租客新签合约统计
    int querySignedNum (InfoRenewalRenterExpand conditions) throws Exception;
   
    //已租退房合约查询
    List<InfoRenewalRenterExpand> houseRent(InfoRenewalRenterExpand conditions) throws Exception;
   
    
    //id查询
    InfoRenewalRenterExpand selectByPrimaryKey(Integer jrrId) throws Exception;
    //查询已租房租赁到期时间
    InfoRenewalRenterExpand selectEndTime(Integer hrId) throws Exception;
    
}