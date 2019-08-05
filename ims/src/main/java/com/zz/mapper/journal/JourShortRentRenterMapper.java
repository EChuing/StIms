package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourShortRentRenter;

public interface JourShortRentRenterMapper {

    int insertSelective(JourShortRentRenter record) throws Exception;

    List<JourShortRentRenter> selectByPrimaryKey(JourShortRentRenter record) throws Exception;

    int updateByPrimaryKeySelective(JourShortRentRenter record) throws Exception;

	List<JourShortRentRenter> selectByJsrrId(JourShortRentRenter jourShortRentRenter) throws Exception;

	List<JourShortRentRenter> selectByJsrrPopId(JourShortRentRenter jsrr)throws Exception;

	
	
	
	
}