package com.zz.service.info;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.zz.mapper.info.ContractMapper;
import com.zz.po.info.InfoRenewalLandlord;
import com.zz.po.info.InfoRenewalRenterExpand;

public class ContractServiceImpl  implements ContractService{
	@Autowired
	private ContractMapper contractMapper;

	//查询所有合约信息,有条件则条件查询 1为纸质合同 2为电子签约
    @Override
	public List<InfoRenewalRenterExpand> selectTenant(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception{
    	return contractMapper.selectTenant(infoRenewalRenterExpand);
    }
    
    //查询所有业主合约信息
    @Override
    public List<InfoRenewalLandlord> selectOwner(InfoRenewalLandlord infoRenewalLandlord) throws Exception{
    	return contractMapper.selectOwner(infoRenewalLandlord);
    }
}
