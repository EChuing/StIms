package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourTimingTasks;
import com.zz.service.journal.JourTimingTasksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class JourTimingTasksAction extends BaseAction implements ModelDriven<JourTimingTasks> {
    @Autowired
    private JourTimingTasksService jourTimingTasksService;

    private JourTimingTasks jourTimingTasks;

    @Override
    public JourTimingTasks getModel() {
        if(jourTimingTasks==null){
            jourTimingTasks = new JourTimingTasks();
        }
        return jourTimingTasks;
    }
    //查询定时任务信息
    public String queryTimingTasks(){
        try {

            System.out.println(jourTimingTasks);
            Result<List<JourTimingTasks>> result =jourTimingTasksService.selectTimingTasks(jourTimingTasks);
            String resultStr = JSON.toJSONString(result, SerializerFeature.WriteMapNullValue);
            printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "网络异常 或 数据参数有误 ！", null));
        }
        return null;
    }

    //新增定时任务信息
    public String addTitionalTasks(){
        try {
            System.out.println(jourTimingTasks);
            Integer num =jourTimingTasksService.insertSelective(jourTimingTasks);
            System.out.println(num);
            if(num == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "保存成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "保存失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "网络异常 或 数据参数有误 ！", null));
        }
        return null;
    }

    //修改定时任务信息
    public String uppTitionalTasks(){
        try {
            System.out.println(jourTimingTasks);
            Integer num =jourTimingTasksService.updateByPrimaryKeySelective(jourTimingTasks);
            System.out.println(num);
            if(num == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "修改成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "网络异常 或 数据参数有误 ！", null));
        }
        return null;
    }
}
