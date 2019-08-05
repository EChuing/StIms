package com.zz.actions.push;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.push.Push58Apartment;
import com.zz.rsa.Push58HouseApi;
import com.zz.service.push.Push58ApartmentService;

public class Push58ApartmentAction extends BaseAction implements ModelDriven<Push58Apartment> {
    private Push58Apartment push58Apartment;
    private Push58ApartmentService push58ApartmentService;

    public void setPush58ApartmentService(
            Push58ApartmentService push58ApartmentService) {
        this.push58ApartmentService = push58ApartmentService;
    }

    @Override
    public Push58Apartment getModel() {
        if (push58Apartment == null) {
            push58Apartment = new Push58Apartment();
        }
        return push58Apartment;
    }
    
    /**
     * 58字典查询
     */
    public void query58Dict(){
        String result = Push58HouseApi.queryDict(push58Apartment.getPid());
        printlnOfJson(CommonMethodClass.jsonData(1, "成功", result));
    }
    
    /**
     * 发布分散式房源
     */
    public void add58Apartment(){
        try{
            String result = push58ApartmentService.add58Apartment(push58Apartment);
            if("success".equals(result)){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败：" + result, null));
            }
        }catch(Exception e){
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 修改房源状态
     */
    public void update58Apartment(){
        try {
            String result = push58ApartmentService.update58Apartment(push58Apartment);
            if("success".equals(result)){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败：" + result, null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 查询门店
     */
    public void query58Apartment(){
        try{
            List<Push58Apartment> list = push58ApartmentService.query58Apartment(push58Apartment);
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
