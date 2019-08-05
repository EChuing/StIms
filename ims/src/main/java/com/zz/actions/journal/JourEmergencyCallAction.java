package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JourEmergencyCall;
import com.zz.service.journal.JourEmergencyCallService;
import org.springframework.beans.factory.annotation.Autowired;

public class JourEmergencyCallAction extends BaseAction implements ModelDriven<JourEmergencyCall> {
    private JourEmergencyCall jourEmergencyCall;
    @Autowired
    private JourEmergencyCallService jourEmergencyCallService;
    @Override
    public JourEmergencyCall getModel() {
        if(jourEmergencyCall == null){
            jourEmergencyCall = new JourEmergencyCall();
        }
        return jourEmergencyCall;
    }
    public String selectJourCall(){
        System.out.println("进来了");
        try {
            JourEmergencyCall jourEmergencyCall1 = jourEmergencyCallService.selectJourCall(jourEmergencyCall);
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
    public String insertJourCall(){
        try {
            int i = jourEmergencyCallService.insertJourCall(jourEmergencyCall);
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
    public String updataJourCall(){
        try {
            int i = jourEmergencyCallService.updataJourCall(jourEmergencyCall);
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
}
