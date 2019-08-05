package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.DailyBase;

public interface DailyBaseMapper {
    List<DailyBase> selectAll(DailyBase record);
    
    List<DailyBase> selectByDate(DailyBase record);
}