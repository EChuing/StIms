package com.zz.actions.stat;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.stat.StatFinancialEcology;
import com.zz.service.stat.StatFinancialEcologyService;

public class StatFinancialEcologyAction extends BaseAction implements ModelDriven<StatFinancialEcology>{
    
    private StatFinancialEcology statFinancialEcology;
    private StatFinancialEcologyService statFinancialEcologyService;

    public void setStatFinancialEcologyService(
            StatFinancialEcologyService statFinancialEcologyService) {
        this.statFinancialEcologyService = statFinancialEcologyService;
    }

    @Override
    public StatFinancialEcology getModel() {
        if (statFinancialEcology == null) {
            statFinancialEcology = new StatFinancialEcology();
        }
        return statFinancialEcology;
    }
    
    /**
     * 查询房屋生态表，用于前端统计收支差额
     */
    public void queryFinancialEcology() {
        try {
            List<StatFinancialEcology> list = statFinancialEcologyService.selectAll(statFinancialEcology);
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
    
    /**
     * 查询房屋生态表一段时间内的结果汇总,一套房一条记录
     */
    public void queryFinancialEcologyByDate() {
        //房屋生态 - 查询     F01b01
        int auth1 = Authority.authorize("F01b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看房屋生态权限", null));
            return;
        }
        try {
            List<StatFinancialEcology> list = statFinancialEcologyService.selectFeByDate(statFinancialEcology);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 查询房屋生态表一段时间内，所有房源的结果汇总成一条记录
     */
    public void queryTotalFinancialEcologyByDate() {
        try {
            StatFinancialEcology fe = statFinancialEcologyService.selectTotalFeByDate(statFinancialEcology);
            if(fe != null){
                String json = JSONUtil.serialize(fe);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

}
