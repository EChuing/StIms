package com.zz.service.journal;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourShiftRecord;

import java.util.List;

public interface JourShiftRecordService {

    Result<List<JourShiftRecord>> getShiftRecordInfo(JourShiftRecord record) throws Exception;

    int insertSelective(JourShiftRecord record)throws Exception;

    Result<List<JourShiftRecord>> selectShiftRecord(JourShiftRecord record)throws Exception;
}
