package com.zz.service.journal;

import com.zz.po.journal.JourFaceRecognitionInformation;

import java.util.List;

public interface JourFaceRecognitionInformationService {
    //查询人脸识别记录
    List<JourFaceRecognitionInformation> selectJourFaceRecognitionInformation(JourFaceRecognitionInformation jourFaceRecognitionInformation)throws Exception;
}
