package com.zz.actions.push;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.push.PushBkHouse;
import com.zz.po.push.PushBkRentUnit;
import com.zz.service.push.PushBkRentUnitService;

public class PushBkRentUnitAction extends BaseAction implements ModelDriven<PushBkRentUnit>{
    private PushBkRentUnit pushBkRentUnit;
    private PushBkRentUnitService pushBkRentUnitService;

	public void setPushBkRentUnitService(
            PushBkRentUnitService pushBkRentUnitService) {
        this.pushBkRentUnitService = pushBkRentUnitService;
    }

    @Override
	public PushBkRentUnit getModel() {
        if(pushBkRentUnit == null){
            pushBkRentUnit = new PushBkRentUnit();
        }
        return pushBkRentUnit;
	}
    
    //发布出租单元
    public void publishBkRentUnit() {
        try{
            String result = pushBkRentUnitService.publishBkRentUnit(pushBkRentUnit);
            if("success".equals(result)){
                printlnOfJson(CommonMethodClass.jsonData(1, "发布成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败：" + result, null));
            }
        }catch(Exception e){
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    //更新出租单元
    public void editBkRentUnit() {
        try{
            String result = pushBkRentUnitService.editBkRentUnit(pushBkRentUnit);
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
    
    //更新价格
    public void editBkRentUnitPayment() {
        try{
            String result = pushBkRentUnitService.editBkRentUnitPayment(pushBkRentUnit);
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
	
    public List<PushBkRentUnit> selectBkRentUnit(){
    	try {
    		List<PushBkRentUnit> list = pushBkRentUnitService.queryBkRentUnit(pushBkRentUnit);
    		 if(list.size() > 0){
    			 String json = JSONUtil.serialize(list);
                 printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
             }else{
                 printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
             }
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
    	return null;
    }
    
}
