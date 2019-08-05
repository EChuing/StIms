package com.zz.service.journal;

import com.zz.mapper.journal.JourSubjectMapper;
import com.zz.po.journal.JourSubject;

import java.util.List;

public class JourSubjectServiceImpl implements JourSubjectService {
	private JourSubjectMapper jourSubjectMapper;
	
	public void setJourSubjectMapper(JourSubjectMapper jourSubjectMapper) {
		this.jourSubjectMapper = jourSubjectMapper;
	}

	public int insertJourSubject(JourSubject jourSubject) throws Exception {
		return jourSubjectMapper.insertSubject(jourSubject);
	}

	@Override
	public List<JourSubject> selectAllSubject(JourSubject jourSubject) throws Exception {
		return jourSubjectMapper.selectAllSubject(jourSubject);
	}

	public int updateSubject(JourSubject jourSubject)throws Exception {
		return jourSubjectMapper.updateSubject(jourSubject);
	}
}
