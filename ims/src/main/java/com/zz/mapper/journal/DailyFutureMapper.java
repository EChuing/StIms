package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.DailyFuture;

public interface DailyFutureMapper {
    int deleteByPrimaryKey(Integer dfId);

    int insert(DailyFuture record);

    int insertSelective(DailyFuture record);

    DailyFuture selectByPrimaryKey(Integer dfId);

    int updateByPrimaryKeySelective(DailyFuture record);

    int updateByPrimaryKey(DailyFuture record);
    
    List<DailyFuture> selectByDate(DailyFuture record);
}