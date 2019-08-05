package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JournalPerfDetail;

public interface JournalPerfDetailMapper {
    int deleteByPrimaryKey(Integer jpdId);

    int insert(JournalPerfDetail record);

    int insertSelective(JournalPerfDetail record);

    JournalPerfDetail selectByPrimaryKey(Integer jpdId);

    int updateByPrimaryKeySelective(JournalPerfDetail record);

    int updateByPrimaryKey(JournalPerfDetail record);
    
    List<JournalPerfDetail> selectByJP(JournalPerfDetail record);
}