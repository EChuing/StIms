package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoRenewalRenter;
import com.zz.po.info.InfoRenewalRenterExpand;

public interface RenewalRenterService {
	//查询所有-数据和统计分开
	List<InfoRenewalRenterExpand> selectAllRenewalRenter(InfoRenewalRenterExpand conditions) throws Exception;
	
	List<InfoRenewalRenterExpand> selectAll(InfoRenewalRenterExpand conditions) throws Exception;
	
	List<InfoRenewalRenterExpand> adSelect(InfoRenewalRenterExpand conditions) throws Exception;
	
    int deleteByPrimaryKey(Integer jrlId) throws Exception;

    int insertSelective(InfoRenewalRenter record) throws Exception;

    int updateByPrimaryKeySelective(InfoRenewalRenterExpand record) throws Exception;
    //新增租客合同
    String insertRenewalRenter(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception;
    //续签租客合同
    int renewRenterContract(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception;
    //修改租客合同
    int updateRenewalRenter(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception;

    //租客新签合约统计
    int querySignedNum (InfoRenewalRenterExpand conditions) throws Exception;
   
    //废除合约
    int abrogateRenterContract(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception;
    
   /* //增加跟进  租客合约info_contract_divider
    int TenantContractFollowUpRecord(InfoRenewalRenterExpand record) throws Exception;
    //增加跟进  业主合约
    int OwnerContractFollowUpRecord(InfoRenewalRenterExpand record) throws Exception;
    //增加跟进  租客分期账单
    int InstallmentBillFollowUpRecord(InfoContractInstallmentExpand record) throws Exception;*/
   
}
