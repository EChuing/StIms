package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JourContactTelephone;
import com.zz.service.journal.JourContactTelephoneService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourContactTelephoneAction extends BaseAction implements ModelDriven<JourContactTelephone> {
    private JourContactTelephone jourContactTelephone;
    @Autowired
    private JourContactTelephoneService jourContactTelephoneService;
    @Override
    public JourContactTelephone getModel() {
        if(jourContactTelephone == null){
            jourContactTelephone = new JourContactTelephone();
        }
        return jourContactTelephone;
    }
    public String selectJourCall2(){
        try {
            List<JourContactTelephone> jourEmergencyCall1 = jourContactTelephoneService.selectJourCall(jourContactTelephone);
            if(null != jourEmergencyCall1){
                String json = JSON.toJSONString(jourEmergencyCall1, SerializerFeature.WriteMapNullValue);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的设备！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
        return null;
    }
    public String insertJourCall2(){
        try {
            int i = jourContactTelephoneService.insertJourCall(jourContactTelephone);
            if(i>0){
                String json = JSON.toJSONString(i, SerializerFeature.WriteMapNullValue);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
        System.out.println("进来了");
        return null;
    }
    public String updataJourCall2(){
        try {
            int i = jourContactTelephoneService.updataJourCall(jourContactTelephone);
            if(i>0){
                String json = JSON.toJSONString(i, SerializerFeature.WriteMapNullValue);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
        return null;
    }
    public String deleteJourTellphone(){
        System.out.println("删除进来了");
        try {
            int i = jourContactTelephoneService.deleteJourTellphone(jourContactTelephone);
            if(0 != i){
                String json = JSON.toJSONString(i, SerializerFeature.WriteMapNullValue);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
        return null;
    }
}
