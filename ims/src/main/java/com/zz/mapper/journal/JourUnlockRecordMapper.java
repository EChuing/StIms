package com.zz.mapper.journal;

import com.zz.po.journal.JourUnlockRecord;

import java.util.List;

public interface JourUnlockRecordMapper {

    int insertSelective(JourUnlockRecord record);

    List<JourUnlockRecord> selectByPrimaryKey(JourUnlockRecord jourUnlockRecord);
}