package com.zz.mapper.journal;


import com.zz.po.journal.JourGateLockRecord;

import java.util.List;

public interface JourGateLockRecordMapper {
    int insertSelective(JourGateLockRecord record)throws Exception;

    int updateByPrimaryKeySelective(JourGateLockRecord record)throws Exception;

    List<JourGateLockRecord> queryDeviceRecord(JourGateLockRecord record) throws Exception;
}