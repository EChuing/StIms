package com.zz.service.journal;

import com.zz.mapper.journal.JourShiftRecordMapper;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourShiftRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("jourShiftRecordService")
public class JourShiftRecordServiceImpl implements JourShiftRecordService{

    @Autowired
    private JourShiftRecordMapper jourShiftRecordMapper;

    public void setJourShiftRecordMapper(JourShiftRecordMapper jourShiftRecordMapper) {
        this.jourShiftRecordMapper = jourShiftRecordMapper;
    }

    @Override
    public Result<List<JourShiftRecord>> getShiftRecordInfo(JourShiftRecord record)  throws Exception{

        List<JourShiftRecord> list = jourShiftRecordMapper.selectAll(record);

        Result<List<JourShiftRecord>> result =null;

        if (list.size() >0) {
            result =new Result<>(1, "查询成功",list);
            return result;
        }

        return new Result<>(-1,"查询失败",null);
    }

    //插入交接班的数据
    @Override
    public int insertSelective(JourShiftRecord record) throws Exception {

        int result =jourShiftRecordMapper.insertSelective(record);

        return result;
    }

    @Override
    public Result<List<JourShiftRecord>> selectShiftRecord(JourShiftRecord record) throws Exception {

        List<JourShiftRecord> list = jourShiftRecordMapper.selectShiftRecord(record);

        Result<List<JourShiftRecord>> result =null;

        if (list.size() >0) {
            result =new Result<>(1, "查询成功",list);
            return result;
        }

        return new Result<>(-1,"查询失败",null);
    }
}
