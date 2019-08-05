package com.zz.service.journal;

import com.zz.mapper.journal.JourUnlockRecordMapper;
import com.zz.po.journal.JourUnlockRecord;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourUnlockRecordServiceImpl implements JourUnlockRecordService{
    @Autowired
    private JourUnlockRecordMapper jourUnlockRecordMapper;
    @Override
    public List<JourUnlockRecord> selectByPrimaryKey(JourUnlockRecord jourUnlockRecord) throws Exception {
        return jourUnlockRecordMapper.selectByPrimaryKey(jourUnlockRecord);
    }

    @Override
    public int insertSelective(JourUnlockRecord record) throws Exception {
        return jourUnlockRecordMapper.insertSelective(record);
    }
}
