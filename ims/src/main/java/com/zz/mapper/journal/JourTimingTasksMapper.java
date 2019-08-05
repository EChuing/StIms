package com.zz.mapper.journal;

import com.zz.po.journal.JourTimingTasks;

import java.util.List;

public interface JourTimingTasksMapper {

    //查询定时任务,有条件则条件查询,无则查全部
    public List<JourTimingTasks> selectByPrimaryKey(JourTimingTasks result) throws  Exception;

    //修改定时任务信息
    public int updateByPrimaryKeySelective(JourTimingTasks result) throws  Exception;

    //新增定时任务信息
    public int insertSelective(JourTimingTasks result) throws  Exception;
}
