package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourShortRentContract;

public interface JourShortRentContractMapper {

    int insertSelective(JourShortRentContract record) throws Exception;

    int updateByPrimaryKeySelective(JourShortRentContract record) throws Exception;
    
    List<JourShortRentContract> listJourShortRentContractByHsIdList(JourShortRentContract jsrc) throws Exception;
    
    List<JourShortRentContract> selectJourShortRentContract(JourShortRentContract record) throws Exception;
    
    List<JourShortRentContract> selectByJsrcId(List<Integer> record) throws Exception;
    
    //批量插入保留办理订单
  	int insertList(List<JourShortRentContract> list) throws Exception;

	int updateShortRoom(List<JourShortRentContract> repairList) throws Exception;
	
	List<JourShortRentContract> selectRenter(JourShortRentContract jourShortRentContract) throws Exception;
	
	List<JourShortRentContract> queryNewOrder(JourShortRentContract jourShortRentContract) throws Exception;

	//查询交接班所需数据
    List<JourShortRentContract> selectByStaffNameAndShiftTime(JourShortRentContract jourShortRentContract );

    //查询已住的房
    List<JourShortRentContract> selectByJsrcHsId(JourShortRentContract jourShortRentContract) throws Exception;
}