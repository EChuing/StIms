package com.zz.actions.stat;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.stat.StatFinancialData;
import com.zz.service.stat.StatFinancialDataService;

public class StatFinancialDataAction extends BaseAction implements ModelDriven<StatFinancialData>{
    
    private StatFinancialData statFinancialData;
    private StatFinancialDataService statFinancialDataService;

    public void setStatFinancialDataService(
            StatFinancialDataService statFinancialDataService) {
        this.statFinancialDataService = statFinancialDataService;
    }

    @Override
    public StatFinancialData getModel() {
        if (statFinancialData == null) {
            statFinancialData = new StatFinancialData();
        }
        return statFinancialData;
    }
    
    /**
     * 查询房屋财务数据
     */
    public void queryFinancialData() {
        //绩效统计 - 查询     F00b01
        int auth1 = Authority.authorize("F00b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看绩效统计权限", null));
            return;
        }
        try {
            List<StatFinancialData> list = statFinancialDataService.selectByDate(statFinancialData.getYear(), statFinancialData.getMonth());
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到房屋财务数据！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

}
