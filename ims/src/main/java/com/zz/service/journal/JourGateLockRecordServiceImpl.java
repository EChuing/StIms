package com.zz.service.journal;

import com.zz.mapper.journal.JourGateLockRecordMapper;
import com.zz.po.journal.JourGateLockRecord;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourGateLockRecordServiceImpl implements JourGateLockRecordService {
    @Autowired
    private JourGateLockRecordMapper jourGateLockRecordMapper;

    @Override
    public int insertSelective(JourGateLockRecord record) throws Exception {
        return jourGateLockRecordMapper.insertSelective(record);
    }

    @Override
    public int updateByPrimaryKeySelective(JourGateLockRecord record) throws Exception {
        return jourGateLockRecordMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<JourGateLockRecord> queryDeviceRecord(JourGateLockRecord record) throws Exception {
        return jourGateLockRecordMapper.queryDeviceRecord(record);
    }
}
