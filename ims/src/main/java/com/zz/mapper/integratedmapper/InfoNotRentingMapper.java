package com.zz.mapper.integratedmapper;

import java.util.List;

import com.zz.po.integrated.InfoNotRenting;
import com.zz.po.journal.JournalHousingFollowExpand;

public interface InfoNotRentingMapper {
	
    List<InfoNotRenting> integratedQuery(InfoNotRenting infoNotRenting)throws Exception;
    
    //未租
    int infoNotRenting(InfoNotRenting infoNotRenting)throws Exception;
    
    //已租
    
    int updateRentHoues(InfoNotRenting nalHousingFollow)throws Exception;
    List<InfoNotRenting> selectAll(InfoNotRenting infoNotRenting) throws Exception;
    
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

	

	
    
	
    
}