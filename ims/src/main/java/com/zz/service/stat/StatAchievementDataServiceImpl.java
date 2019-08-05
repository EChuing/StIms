package com.zz.service.stat;

import java.util.List;

import com.zz.mapper.stat.StatAchievementDataMapper;
import com.zz.po.stat.StatAchievementData;

public class StatAchievementDataServiceImpl implements StatAchievementDataService{
    
    private StatAchievementDataMapper statAchievementDataMapper;

    public void setStatAchievementDataMapper(
            StatAchievementDataMapper statAchievementDataMapper) {
        this.statAchievementDataMapper = statAchievementDataMapper;
    }

    @Override
    public List<StatAchievementData> selectByDate(Integer year, Integer month) throws Exception {
        return statAchievementDataMapper.selectByDate(year, month);
    }

}
