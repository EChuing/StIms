package com.zz.mapper.journal;

import com.zz.po.journal.JourHsOfficeExpand;

import java.util.List;


public interface JourHsOfficeMapper {
	
	int insertOfficeAssociateHsList(List<JourHsOfficeExpand> recordList)throws Exception;
	
	int removeOfficeAssociateByList(List<JourHsOfficeExpand> recordList)throws Exception;
	
	int removeOfficeAssociateByOfficeId(Integer jhoOfficeId)throws Exception;
	
	int removeOfficeAssociateByIds(List<JourHsOfficeExpand> recordList)throws Exception;
	
	List<Integer> selectHssByJhoOfficeId(Integer jhoOfficeId) throws Exception;
	
	List<Integer>selectDevIdsByJhoOfficeId(Integer jhoOfficeId) throws Exception;

	List<Integer>selectDevIdByHsId(Integer jhoHsId);
	
	List<JourHsOfficeExpand> selectJourHsOfficeExpandByOfficeId(Integer jhoOfficeId) throws Exception;
	
}
