package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoRenewalLandlord;
import com.zz.po.info.InfoRenewalRenterExpand;

public interface ContractService {
	
    //查询所有合约信息,有条件则条件查询 1为纸质合同 2为电子签约
    List<InfoRenewalRenterExpand> selectTenant(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception;

    //查询所有业主合约信息
    List<InfoRenewalLandlord> selectOwner(InfoRenewalLandlord infoRenewalLandlord) throws Exception;
}
