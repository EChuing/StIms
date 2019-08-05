package com.zz.service.stat;

import java.util.List;

import com.zz.po.stat.StatAchievementData;

public interface StatAchievementDataService {

    List<StatAchievementData> selectByDate(Integer year, Integer month) throws Exception;
    
}
