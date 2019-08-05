package com.zz.service.journal;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourChannelUnit;
import com.zz.po.journal.JourTimingTasks;

import java.util.List;

public interface JourTimingTasksService {

    //查询定时任务,有条件则条件查询,无则查全部
    Result<List<JourTimingTasks>> selectTimingTasks(JourTimingTasks result) throws  Exception;

    //修改定时任务信息
    public int updateByPrimaryKeySelective (JourTimingTasks result) throws  Exception;

    //新增定时任务信息
    public int insertSelective (JourTimingTasks result) throws  Exception;
}
