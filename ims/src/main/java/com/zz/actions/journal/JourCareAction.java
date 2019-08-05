package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JourCare;
import com.zz.service.journal.JourCareService;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourCareAction extends BaseAction implements ModelDriven<JourCare> {
    private JourCare jourCare;
    @Autowired
    private JourCareService jourCareService;

    @Override
    public JourCare getModel() {
        if(jourCare == null){
            jourCare = new JourCare();
        }
        return jourCare;
    }

    public void insertCare(){
        try {
            int result = jourCareService.insertSelective(jourCare);
            if (result > 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
    }

    public void queryCare(){
        try {
            List<JourCare> list = jourCareService.selectCare(jourCare);
            if(list.size()>0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
    }

    public void updateCare(){
        try {
            int result = jourCareService.updateByPrimaryKeySelective(jourCare);
            if (result > 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
    }
}
