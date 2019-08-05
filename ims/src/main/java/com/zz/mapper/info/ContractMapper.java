package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoRenewalLandlord;
import com.zz.po.info.InfoRenewalRenterExpand;

public interface ContractMapper {

	//查询所有租客合约信息,有条件则条件查询 1为纸质合同 2为电子签约
    List<InfoRenewalRenterExpand> selectTenant(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception;
    
    //查询所有业主合约信息
    List<InfoRenewalLandlord> selectOwner(InfoRenewalLandlord infoRenewalLandlord) throws Exception;
   
}
