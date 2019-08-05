package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoRenewalLandlord;
import com.zz.po.info.InfoRenewalLandlordExpand;
import com.zz.po.info.InfoContractInstallment;
import com.zz.po.info.InfoRenewalRenterExpand;
import com.zz.po.info.InfoRenterExpand;
import com.zz.po.integrated.InfoNotRenting;

public interface RenewalLandlordService {
	//查询所有-数据和统计分开
	List<InfoRenewalLandlordExpand> selectAllRenewalLandlord(InfoRenewalLandlordExpand conditions) throws Exception;
	
	List<InfoRenewalLandlordExpand> selectAll(InfoRenewalLandlordExpand conditions) throws Exception;
	
	List<InfoRenewalLandlordExpand> adSelect(InfoRenewalLandlordExpand conditions) throws Exception;
	
	List<InfoRenewalLandlordExpand> selectByPrimaryKey(InfoRenewalLandlordExpand conditions) throws Exception;
	
    int deleteByPrimaryKey(Integer jrlId) throws Exception;

    int insertSelective(InfoRenewalLandlord record) throws Exception;

    int updateByPrimaryKeySelective(InfoRenewalLandlord record) throws Exception;
    
    //新增合约
    String insertRenewalLandlord(InfoRenewalLandlordExpand infoRenewalLandlordExpand) throws Exception;
    
    //修改合约
    String updateRenewalLandlord(InfoRenewalLandlordExpand infoRenewalLandlordExpand) throws Exception;
    
    //房东新签合约统计
    int querySignedNum (InfoRenewalLandlordExpand infoRenewalLandlordExpand) throws Exception;
   
    //废除合约
    int abrogateLandlordContract(InfoRenewalLandlordExpand infoRenewalLandlordExpand) throws Exception;
}
