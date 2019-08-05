package com.zz.actions.stat;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.stat.StatAchievementData;
import com.zz.service.stat.StatAchievementDataService;

public class StatAchievementDataAction extends BaseAction implements ModelDriven<StatAchievementData>{
    
    private StatAchievementData statAchievementData;
    private StatAchievementDataService statAchievementDataService;

    public void setStatAchievementDataService(
            StatAchievementDataService statAchievementDataService) {
        this.statAchievementDataService = statAchievementDataService;
    }

    @Override
    public StatAchievementData getModel() {
        if (statAchievementData == null) {
            statAchievementData = new StatAchievementData();
        }
        return statAchievementData;
    }
    
    /**
     * 查询用户绩效数据
     */
    public void queryAchievementData() {
        //绩效统计 - 查询     F00b01
        int auth1 = Authority.authorize("F00b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看用户绩效权限", null));
            return;
        }
        try {
            List<StatAchievementData> list = statAchievementDataService.selectByDate(statAchievementData.getYear(), statAchievementData.getMonth());
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到用户绩效数据！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
}
