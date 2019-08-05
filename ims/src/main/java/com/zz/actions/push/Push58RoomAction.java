package com.zz.actions.push;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.push.Push58Room;
import com.zz.rsa.Push58HouseApi;
import com.zz.service.push.Push58RoomService;

public class Push58RoomAction extends BaseAction implements ModelDriven<Push58Room> {
    private Push58Room push58Room;
    private Push58RoomService push58RoomService;
    public void setPush58RoomService(Push58RoomService push58RoomService) {
        this.push58RoomService = push58RoomService;
    }
    @Override
    public Push58Room getModel() {
        if(push58Room == null){
            push58Room = new Push58Room();
        }
        return push58Room;
    }

    /**
     * 添加房间
     */
    public void add58Room(){
        try{
            String result = push58RoomService.add58Room(push58Room);
            if("success".equals(result)){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败：" + result, null));
            }
        }catch(Exception e){
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 修改房间
     */
    public void update58Room(){
        try{
            String result = push58RoomService.update58Room(push58Room);
            if("success".equals(result)){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败：" + result, null));
            }
        }catch(Exception e){
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 查询房间
     */
    public void query58Room(){
        try{
            List<Push58Room> list = push58RoomService.query58Room(push58Room);
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
     * 房源信息获取接口
     */
    public void query58RoomInfo(){
        String result = Push58HouseApi.post(push58Room.getP5rDetail(), 20);
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
     * 积分信息获取接口
     */
    public void query58RoomCreditInfo(){
        String result = Push58HouseApi.post(push58Room.getP5rDetail(), 21);
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
