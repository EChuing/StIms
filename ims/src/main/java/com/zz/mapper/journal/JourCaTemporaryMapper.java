package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourCaTemporary;

public interface JourCaTemporaryMapper {
	//添加临时集中房
	int insertCentralized(JourCaTemporary jourCaTemporary) throws Exception;
	//查询临时集中房
	List<JourCaTemporary> selectCentralized(JourCaTemporary jourCaTemporary) throws Exception;
	//更新关联集中房
	int updateCentralized(JourCaTemporary jourCaTemporary) throws Exception;
}
