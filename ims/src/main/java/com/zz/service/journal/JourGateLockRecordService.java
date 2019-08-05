package com.zz.service.journal;

import com.zz.po.journal.JourGateLockRecord;

import java.util.List;

public interface JourGateLockRecordService {
    int insertSelective(JourGateLockRecord record) throws Exception;

    int updateByPrimaryKeySelective(JourGateLockRecord record) throws Exception;

    List<JourGateLockRecord> queryDeviceRecord(JourGateLockRecord record) throws Exception;
}
