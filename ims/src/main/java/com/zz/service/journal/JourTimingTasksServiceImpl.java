package com.zz.service.journal;

import com.alibaba.fastjson.JSON;
import com.zz.mapper.journal.JourTimingTasksMapper;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourChannelUnit;
import com.zz.po.journal.JourTimingTasks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JourTimingTasksServiceImpl implements JourTimingTasksService {
    @Autowired
    private JourTimingTasksMapper jourTimingTasksMapper;

    //查询定时任务,有条件则条件查询,无则查全部
    public Result<List<JourTimingTasks>> selectTimingTasks(JourTimingTasks result) throws  Exception{
        List<JourTimingTasks>  list=jourTimingTasksMapper.selectByPrimaryKey(result);
        if (list.size()>0){
            return new Result<>(1,"查询成功", list);
        }else{
            return new Result<>(-1,"没有符合条件信息",null);
        }
    }

    //修改定时任务信息
    public int updateByPrimaryKeySelective (JourTimingTasks result) throws  Exception{
        return   jourTimingTasksMapper.updateByPrimaryKeySelective(result);
    }

    //新增定时任务信息
    public int insertSelective (JourTimingTasks result) throws  Exception{
        return   jourTimingTasksMapper.insertSelective(result);
    }
}
