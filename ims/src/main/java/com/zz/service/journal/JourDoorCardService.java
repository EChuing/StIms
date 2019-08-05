package com.zz.service.journal;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourDoorCard;

import java.util.List;

public interface JourDoorCardService {
	String insertDoorCard(JourDoorCard jourDoorCard) throws Exception;

	List<JourDoorCard> listDoorCard(JourDoorCard jourDoorCard) throws Exception;
	
	String updateDoorCard(JourDoorCard jourDoorCard) throws Exception;

	String deleteDoorCard(JourDoorCard jourDoorCard) throws Exception;

	String deletePower(JourDoorCard jourDoorCard) throws Exception;
	
	String inputLockPassword(JourDoorCard jourDoorCard) throws Exception;
	
	Result<String> checkLockPassword(JourDoorCard jourDoorCard) throws Exception;
	
	int insertOneDoorCard(JourDoorCard jourDoorCard) throws Exception;

	String insertFacePower(JourDoorCard jourDoorCard) throws Exception;

	String pushingCard(JourDoorCard jourDoorCard) throws Exception;

	Integer insertJustDoorCard(JourDoorCard jourDoorCard);
}
