package com.zz.service.journal;

import com.zz.mapper.journal.JourFaceRecognitionInformationMapper;
import com.zz.po.journal.JourFaceRecognitionInformation;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourFaceRecognitionInformationServiceImpl implements JourFaceRecognitionInformationService{
    @Autowired
    private JourFaceRecognitionInformationMapper jourFaceRecognitionInformationMapper;
    @Override
    public List<JourFaceRecognitionInformation> selectJourFaceRecognitionInformation(JourFaceRecognitionInformation jourFaceRecognitionInformation) throws Exception {
        return jourFaceRecognitionInformationMapper.selectJourFaceRecognitionInformation(jourFaceRecognitionInformation);
    }
}
