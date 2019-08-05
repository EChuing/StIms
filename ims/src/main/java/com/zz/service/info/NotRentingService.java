package com.zz.service.info;

import java.util.List;

import com.zz.po.integrated.InfoNotRenting;

public interface NotRentingService {
	List<InfoNotRenting> integratedQuery(InfoNotRenting infoNotRenting)throws Exception;
    
    //未租
    int infoNotRenting2(InfoNotRenting infoNotRenting)throws Exception;
    
    //已租
    int updateRentHoues(InfoNotRenting infoNotRenting)throws Exception;
    
    //房东
    int updateLand(InfoNotRenting infoNotRenting)throws Exception;
    
    // 人口 
    int updatePop(InfoNotRenting infoNotRenting)throws Exception;
    
    //未租合约
    int updateLandjrl(InfoNotRenting infoNotRenting)throws Exception;
    
    //已租合约
    int updataRentJrr(InfoNotRenting infoNotRenting)throws Exception;
    
    //租客
    int updataRenter(InfoNotRenting infoNotRenting)throws Exception;
    
    //水电气读数修改
    int upWaterElectricalModification(InfoNotRenting infoNotRenting)throws Exception;
    
    //综合修改
    int updateNotRenting(InfoNotRenting infoNotRenting)throws Exception;
}
