package com.zz.service.journal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.zz.mapper.journal.JourCaTemporaryMapper;
import com.zz.po.journal.JourCaTemporary;

public class JourCaTemporaryServiceImpl implements JourCaTemporaryService {

	@Autowired
	private JourCaTemporaryMapper jourCaTemporaryMapper;
	
	@Override
	public int insertCentralized(JourCaTemporary jourCaTemporary) throws Exception {
		return jourCaTemporaryMapper.insertCentralized(jourCaTemporary);
	}

	@Override
	public List<JourCaTemporary> selectCentralized(JourCaTemporary jourCaTemporary) throws Exception {
		return jourCaTemporaryMapper.selectCentralized(jourCaTemporary);
	}

	@Override
	public int updateCentralized(JourCaTemporary jourCaTemporary) throws Exception {
		return jourCaTemporaryMapper.updateCentralized(jourCaTemporary);
	}

}
