package com.zz.mapper.journal;

import com.zz.po.journal.JourFaceRecognitionInformation;

import java.util.List;

public interface JourFaceRecognitionInformationMapper {
    int insertJourFaceRecognitionInformation(JourFaceRecognitionInformation jourFaceRecognitionInformation)throws Exception;
    List<JourFaceRecognitionInformation> selectJourFaceRecognitionInformation(JourFaceRecognitionInformation jourFaceRecognitionInformation)throws Exception;
    List<JourFaceRecognitionInformation> selectUsersIdInformation(JourFaceRecognitionInformation jourFaceRecognitionInformation)throws Exception;
}
