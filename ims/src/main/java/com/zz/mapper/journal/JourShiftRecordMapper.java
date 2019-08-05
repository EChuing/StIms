package com.zz.mapper.journal;

import com.zz.po.journal.JourShiftRecord;

import java.util.List;

public interface JourShiftRecordMapper {
    int deleteByPrimaryKey(Integer jsrId);

    int insert(JourShiftRecord record);

    int insertSelective(JourShiftRecord record)throws Exception;

    JourShiftRecord selectByPrimaryKey(Integer jsrId);

    int updateByPrimaryKeySelective(JourShiftRecord record);

    int updateByPrimaryKey(JourShiftRecord record);

    List<JourShiftRecord> selectAll(JourShiftRecord record) throws Exception;

    List<JourShiftRecord> selectShiftRecord(JourShiftRecord record) throws Exception;

}