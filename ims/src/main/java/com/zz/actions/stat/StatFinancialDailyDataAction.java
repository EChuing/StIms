package com.zz.actions.stat;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.stat.StatFinancialDailyData;
import com.zz.service.stat.StatFinancialDailyDataService;

public class StatFinancialDailyDataAction extends BaseAction implements ModelDriven<StatFinancialDailyData>{
    
    private StatFinancialDailyData statFinancialDailyData;
    private StatFinancialDailyDataService statFinancialDailyDataService;

    public void setStatFinancialDailyDataService(
            StatFinancialDailyDataService statFinancialDailyDataService) {
        this.statFinancialDailyDataService = statFinancialDailyDataService;
    }

    @Override
    public StatFinancialDailyData getModel() {
        if (statFinancialDailyData == null) {
            statFinancialDailyData = new StatFinancialDailyData();
        }
        return statFinancialDailyData;
    }
    
    /**
     * 查询财务数据快照表
     */
    public void queryFinancialDailyData() {
        //企业盈亏 - 查询     F02b01
        int auth1 = Authority.authorize("F02b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看企业盈亏权限", null));
            return;
        }
        try {
            List<StatFinancialDailyData> list = statFinancialDailyDataService.selectAll(statFinancialDailyData);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

}
