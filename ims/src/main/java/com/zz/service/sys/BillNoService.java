package com.zz.service.sys;

import java.util.List;

import com.zz.po.sys.SysBillNo;

public interface BillNoService {
	List<SysBillNo> selectAll(SysBillNo record) throws Exception;
	
    int insert(SysBillNo record) throws Exception;

    int insertSelective(SysBillNo record) throws Exception;
}
