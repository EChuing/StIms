package com.zz.actions.sys;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourContactTelephone;
import com.zz.po.journal.JourDevice;
import com.zz.po.sys.SysSystemSetting;
import com.zz.po.sys.SysUserClass;
import com.zz.service.journal.DeviceService;
import com.zz.service.journal.JourHsDeviceService;
import com.zz.service.sys.SysUserClassService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class SysUserClassAction extends BaseAction implements ModelDriven<SysUserClass>{

    private SysUserClass sysUserClass;
    @Autowired
    private SysUserClassService sysUserClassService;

    @Override
    public SysUserClass getModel() {
        if(sysUserClass == null){
            sysUserClass = new SysUserClass();
        }
        return sysUserClass;
    }

    public void insertUserClass(){
        try {
            Result<String> result = sysUserClassService.insertUserClass(sysUserClass);
            String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
            printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    public void queryClassRoom(){
        try {
            List<SysUserClass> list = sysUserClassService.queryClassRoom(sysUserClass);
            if(list.size() >0){
                String json = JSON.toJSONString(list, SerializerFeature.WriteMapNullValue);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的教室！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
    }

    public void deleteByPrimaryKey(){
        try {
            int result = sysUserClassService.deleteByPrimaryKey(sysUserClass);
            if(result >0){
                printlnOfJson(CommonMethodClass.jsonData(1, "删除成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败,没有查询到符合条件的教室！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
    }

    public String queryAllStudent(){

        try {
            List<SysUserClass> list = sysUserClassService.queryAllStudent(sysUserClass);
            System.out.println("我要看输出"+list);
            if(list.size() >0){
                String json = JSON.toJSONString(list, SerializerFeature.WriteMapNullValue);
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
}
