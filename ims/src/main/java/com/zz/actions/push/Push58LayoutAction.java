package com.zz.actions.push;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.push.Push58Layout;
import com.zz.rsa.Push58HouseApi;
import com.zz.service.push.Push58LayoutService;

public class Push58LayoutAction extends BaseAction implements ModelDriven<Push58Layout> {
    private Push58Layout push58Layout;
    private Push58LayoutService push58LayoutService;
    public void setPush58LayoutService(Push58LayoutService push58LayoutService) {
        this.push58LayoutService = push58LayoutService;
    }
    @Override
    public Push58Layout getModel() {
        if(push58Layout == null){
            push58Layout = new Push58Layout();
        }
        return push58Layout;
    }
    
    /**
     * 发布房型
     */
    public void add58Layout(){
        try{
            String result = push58LayoutService.add58Layout(push58Layout);
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
     * 修改房型
     */
    public void update58Layout(){
        String result = Push58HouseApi.post(push58Layout.getP5lDetail(), 14);
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
     * 查询房型
     */
    public void query58Layout(){
        try{
            List<Push58Layout> list = push58LayoutService.query58Layout(push58Layout);
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

}
