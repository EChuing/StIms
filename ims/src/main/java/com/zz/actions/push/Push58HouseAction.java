package com.zz.actions.push;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.push.Push58House;
import com.zz.rsa.Push58HouseApi;
import com.zz.service.push.Push58HouseService;

public class Push58HouseAction extends BaseAction implements ModelDriven<Push58House> {
    private Push58House push58House;
    private Push58HouseService push58HouseService;

    public void setPush58HouseService(Push58HouseService push58HouseService) {
        this.push58HouseService = push58HouseService;
    }
    
    @Override
    public Push58House getModel() {
        if(push58House == null){
            push58House = new Push58House();
        }
        return push58House;
    }
    
    /**
     * 发布分散式房源
     */
    public void push58House(){
        try{
            String result = push58HouseService.push58House(push58House);
            if("success".equals(result)){
                printlnOfJson(CommonMethodClass.jsonData(1, "发布成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "发布失败：" + result, null));
            }
        }catch(Exception e){
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 修改房源并转为已发布状态
     */
    public void update58House(){
        try{
            String result = push58HouseService.update58House(push58House);
            if("success".equals(result)){
                printlnOfJson(CommonMethodClass.jsonData(1, "修改成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败：" + result, null));
            }
        }catch(Exception e){
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 查询分散式房源
     */
    public void query58House(){
        try{
            List<Push58House> list = push58HouseService.query58House(push58House);
            if(list.size() > 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        }catch(Exception e){
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 查询房源状态
     */
    public void query58HouseStatus(){
        String result = Push58HouseApi.post(push58House.getP5hDetail(), 5);
        if ("error".equals(result)) {
            printlnOfJson(CommonMethodClass.jsonData(-1, "查询失败", null));
            return;
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if (!"0".equals(code)) {
            printlnOfJson(CommonMethodClass.jsonData(-1, msg, null));
            return;
        }
        try{
            JSONArray resultArray = (JSONArray) resultObj.get("result");
            push58House.setP5hDetail(resultArray.toString());
            String json = JSONUtil.serialize(push58House);
            printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
        }catch(Exception e){
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 修改房源状态
     */
    public void update58HouseStatus(){
        String result = Push58HouseApi.post(push58House.getP5hDetail(), 2);
        if ("error".equals(result)) {
            printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            return;
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if ("0".equals(code)) {
            printlnOfJson(CommonMethodClass.jsonData(1, msg, null));
        } else {
            printlnOfJson(CommonMethodClass.jsonData(-1, msg, null));
        }
    }
    
    /**
     * 预约信息获取接口
     */
    public void query58HouseOrderInfo(){
        String result = Push58HouseApi.post(push58House.getP5hDetail(), 6);
        if ("error".equals(result)) {
            printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            return;
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if ("0".equals(code)) {
            printlnOfJson(CommonMethodClass.jsonData(1, msg, null));
        } else {
            printlnOfJson(CommonMethodClass.jsonData(-1, msg, null));
        }
    }
    
    /**
     * 商业信息获取接口
     */
    public void query58HouseBizInfo(){
        String result = Push58HouseApi.post(push58House.getP5hDetail(), 7);
        if ("error".equals(result)) {
            printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            return;
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if ("0".equals(code)) {
            printlnOfJson(CommonMethodClass.jsonData(1, msg, null));
        } else {
            printlnOfJson(CommonMethodClass.jsonData(-1, msg, null));
        }
    }
    
    /**
     * 数据统计获取接口
     */
    public void query58HouseBizStatistics(){
        String result = Push58HouseApi.post(push58House.getP5hDetail(), 8);
        if ("error".equals(result)) {
            printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            return;
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if ("0".equals(code)) {
            printlnOfJson(CommonMethodClass.jsonData(1, msg, null));
        } else {
            printlnOfJson(CommonMethodClass.jsonData(-1, msg, null));
        }
    }
    
    /**
     * 电话列表获取接口
     */
    public void query58HouseBizCallList(){
        String result = Push58HouseApi.post(push58House.getP5hDetail(), 9);
        if ("error".equals(result)) {
            printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            return;
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if ("0".equals(code)) {
            printlnOfJson(CommonMethodClass.jsonData(1, msg, null));
        } else {
            printlnOfJson(CommonMethodClass.jsonData(-1, msg, null));
        }
    }
}
