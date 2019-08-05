package com.zz.service.journal;

import com.zz.po.journal.JourSubject;

import java.util.List;

public interface JourSubjectService {
	int insertJourSubject(JourSubject jourSubject) throws Exception;
	List<JourSubject> selectAllSubject(JourSubject jourSubject)throws Exception;
	int updateSubject(JourSubject jourSubject) throws Exception;
}
