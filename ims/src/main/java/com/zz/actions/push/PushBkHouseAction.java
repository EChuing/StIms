package com.zz.actions.push;

import java.util.List;
import java.util.Map;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.push.PushBkHouse;
import com.zz.service.push.PushBkApiService;
import com.zz.service.push.PushBkHouseService;

public class PushBkHouseAction extends BaseAction implements ModelDriven<PushBkHouse>{
    private PushBkHouse pushBkHouse;
    private PushBkHouseService pushBkHouseService;
    private PushBkApiService pushBkApiService;

	public void setPushBkHouseService(PushBkHouseService pushBkHouseService) {
        this.pushBkHouseService = pushBkHouseService;
    }

    public void setPushBkApiService(PushBkApiService pushBkApiService) {
        this.pushBkApiService = pushBkApiService;
    }

    @Override
	public PushBkHouse getModel() {
	    if(pushBkHouse == null){
	        pushBkHouse = new PushBkHouse();
        }
        return pushBkHouse;
	}
    
    /**
     * 请求贝壳接口
     */
    public void bkapi(){
        Map mapTypes = null;
        //System.out.println("pushBkHouse.getPbhDetail() : "+pushBkHouse.getPbhDetail());
        if(pushBkHouse.getPbhDetail()!=null && !"".equals(pushBkHouse.getPbhDetail())){
            mapTypes = JSON.parseObject(pushBkHouse.getPbhDetail());
           // System.out.println("mapTypes: "+mapTypes);
        }
        Map map = pushBkApiService.getAccessToken();
        if (map != null) {
            String appKey = (String) map.get("appKey");
            map.remove("appKey");
            if(mapTypes != null){
                map.putAll(mapTypes);
            }
            map.put("signCode", pushBkApiService.sign(map, appKey));
            String result = pushBkApiService.post(map, pushBkHouse.getPbhApi());
            JSONObject resultObj = JSON.parseObject(result);
            int errorCode = (int) resultObj.get("errorCode");
            String msg = resultObj.getString("msg");
            String data = resultObj.getString("data");
            if (errorCode == 200000) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", data));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, msg, null));
            }
        } else {
            printlnOfJson(CommonMethodClass.jsonData(-2, "获取授权码失败", null));
        }
    }
    
    //发布房屋
    public void publishBkHouse() {
        try{
            String result = pushBkHouseService.publishBkHouse(pushBkHouse);
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
    
    //更新房屋
    public void editBkHouse() {
        try{
            String result = pushBkHouseService.editBkHouse(pushBkHouse);
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
    
    //查询房屋
    public List<PushBkHouse> selectBkHouse(){
    	try {
    		List<PushBkHouse> list = pushBkHouseService.queryBkHouse(pushBkHouse);
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
