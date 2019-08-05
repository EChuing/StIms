package com.zz.mapper.journal;

import com.zz.po.journal.JourSubject;
import java.util.List;

public interface JourSubjectMapper {
	int insertSubject(JourSubject jourSubject)throws Exception;

	List<JourSubject> selectAllSubject(JourSubject jourSubject)throws Exception;

	int updateSubject(JourSubject jourSubject)throws Exception;
}
