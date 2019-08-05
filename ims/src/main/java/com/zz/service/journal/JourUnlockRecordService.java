package com.zz.service.journal;

import com.zz.po.journal.JourUnlockRecord;

import java.util.List;

public interface JourUnlockRecordService {

    List<JourUnlockRecord> selectByPrimaryKey(JourUnlockRecord record)throws Exception;

    int insertSelective(JourUnlockRecord record)throws Exception;
}
