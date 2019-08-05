package com.zz.mapper.stat;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zz.po.stat.StatAchievementData;

public interface StatAchievementDataMapper {

    List<StatAchievementData> selectByDate(@Param("year") Integer year, @Param("month") Integer month);
    
}