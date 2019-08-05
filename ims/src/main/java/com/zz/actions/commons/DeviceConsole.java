package com.zz.actions.commons;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.other.Syslog;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourUnlockRecord;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.journal.DeviceService;
import com.zz.service.journal.JourUnlockRecordService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class DeviceConsole extends BaseAction implements ModelDriven<JourDevice> {
    private JourDevice jourDevice;
    private DeviceService deviceService;
    @Autowired
    private JourUnlockRecordService jourUnlockRecordService;
    private final static String POSTURL = "http://www.fangzhizun.com/device/api";
//    private final static String POSTURL = "http://localhost:8080/device/api";

    public void setJourDevice(JourDevice jourDevice) {
        this.jourDevice = jourDevice;
    }

    public void setDeviceService(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @Override
    public JourDevice getModel() {
        if (jourDevice == null) {
            jourDevice = new JourDevice();
        }
        return jourDevice;
    }

    // 设备操作-所有类型
    public String doDevicConsoleAll() {

        try {
            Map<String, String> map = new HashMap<String, String>();
            String jsonArrayData = jourDevice.getPostJson();
            System.out.println("jsonArrayData: " + jsonArrayData);
            JSONObject jsonObject = JSONObject.fromObject(jsonArrayData);
            Iterator iterator = jsonObject.keys();
            while (iterator.hasNext()) {
                String key = (String) iterator.next();
                String value = jsonObject.getString(key);
                map.put(key, value);
                System.out.println("key: " + key);
                System.out.println("value: " + value);
            }

            String responseText = HttpRequestUtil.post(POSTURL, map);
            HttpSession session = ServletActionContext.getRequest().getSession();
            SysUserExpand su = (SysUserExpand) session.getAttribute("userinfo");
            JourDevice jourDevice = new JourDevice();
            JourUnlockRecord jourUnlockRecord = new JourUnlockRecord();
            jourDevice.setDevSn(jsonObject.getString("sn"));
            List<JourDevice> devices = deviceService.selectDeviceSn(jourDevice);
            if (responseText==null||responseText==""){
                if(devices.size()>0){
                    jourUnlockRecord.setJurDeviceId(devices.get(0).getId());
                    jourUnlockRecord.setJurOpenType("远程开锁");
                    jourUnlockRecord.setJurResult("失败");
                    jourUnlockRecord.setJurOpenPeople(su.getSuStaffName());
                    int i = jourUnlockRecordService.insertSelective(jourUnlockRecord);
                    if(i>0){
                        System.out.println("插入数据成功");
                    }
                }
                printlnOfJson(CommonMethodClass.jsonData(-2, "操作失败", null));
            }else{
                if(devices.size()>0){
                    JSONObject object = JSONObject.fromObject(responseText);
                    for (JourDevice jd:devices) {
                        if("1".equals(object.getString("code"))){
                            jourUnlockRecord.setJurResult("成功");
                        }else{
                            jourUnlockRecord.setJurResult("失败");
                        }
                        jourUnlockRecord.setJurDeviceId(jd.getId());
                        jourUnlockRecord.setJurOpenType("远程开锁");
                        jourUnlockRecord.setJurOpenPeople(su.getSuStaffName());
                        int i = jourUnlockRecordService.insertSelective(jourUnlockRecord);
                        if(i>0){
                            System.out.println("插入数据成功");
                        }
                    }
                }
            }
            printlnOfJson(responseText);
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    // 设备操作-抄表
    public String doDevicWeg() {
        //System.out.println("这是jourDevice: "+jourDevice.toString());
        try {
            if (jourDevice.getIdArrayStr() != null && !"".equals(jourDevice.getIdArrayStr())) {

                JourDevice jdvice = new JourDevice();
                String[] idArray = jourDevice.getIdArrayStr().split(",");
                List idList = java.util.Arrays.asList(idArray);

                List<JourDevice> list = deviceService.selectThisHouseDevice(idList);
                String waterMeter = "";
                String electMeter = "";
                String gasMeter = "";
                Map<String, String> map = new HashMap<String, String>();
                String returnJsonStr = "";
                JSONObject jsonReading = new JSONObject();
                for (int i = 0; i < list.size(); i++) {

                    //System.out.println("这是下标i的list： "+list.get(i).toString());

                    if (list.get(i).getDevBrandId() == 3) {//飞雪电表
                        map.put("insType", "查询电表读数");
                        map.put("insBrandId", list.get(i).getDevBrandId().toString());
                        map.put("authId", list.get(i).getDevAuthId());
                        map.put("authToken", list.get(i).getDevAuthSecret());
                        map.put("deviceId", list.get(i).getDevId());
                    }

                    if (list.get(i).getDevBrandId() == 12) {//
                        map.put("instruction", "查询电表详情");
                        map.put("brandId", list.get(i).getDevBrandId().toString());
                        map.put("code", list.get(i).getDevSpare2());
                        map.put("app_key", list.get(i).getDevAuthId());
                        map.put("secret", list.get(i).getDevAuthSecret());
                    }

                    if (list.get(i).getDevBrandId() == 13) {//
                        map.put("instruction", "查询水表详情");
                        map.put("brandId", list.get(i).getDevBrandId().toString());
                        map.put("code", list.get(i).getDevSpare2());
                        map.put("app_key", list.get(i).getDevAuthId());
                        map.put("secret", list.get(i).getDevAuthSecret());
                    }

                    if (!map.isEmpty()) {
                        String responseText = HttpRequestUtil.post(POSTURL, map);

                        //System.out.println("这是responseText:"+responseText);
                        //返回值转换为JSONArray
                        JSONArray jsonData = JSONArray.fromObject('[' + responseText + ']');
                        String meterValue = "";
                        String mac = "";
                        //	System.out.println("这是这是:jsonData:"+jsonData);

                        //判断是否成功
                        if ("1".equals(jsonData.getJSONObject(0).getString("code"))) {
                            //将 body里的转换喂JSONArray
                            JSONArray jsonBody = JSONArray.fromObject("[" + jsonData.getJSONObject(0).getString("body") + "]");
                            //获取value值
                            //System.out.println("jsonBody: "+jsonBody);
                            JSONObject jsondata = JSONObject.fromObject(jsonBody.getJSONObject(0).getString("data"));

                            if (jsondata.has("reading")) {
                                waterMeter = jsondata.getString("reading");
                                //mac = jsondata.getString("mac");
                                //System.out.println("waterMeter:"+waterMeter);
                                jsonReading.put("water", waterMeter);
                            }

                            if (jsondata.has("voltage")) {
                                electMeter = jsondata.getString("voltage");
                                //mac = jsondata.getString("mac");
                                //System.out.println("electMeter:"+electMeter);
                                jsonReading.put("elect", electMeter);
                            }
                            //meterValue = jsonBody.getJSONObject(0).getString("value");
                            //System.out.println("值是多少："+meterValue);
                        }
						
						
						
						/*if("1".equals(jsonData.getJSONObject(0).getString("code"))){
							//将 body里的转换喂JSONArray
							JSONArray jsonBody = JSONArray.fromObject("["+jsonData.getJSONObject(0).getString("data")+"]"); 
							//获取value值
							meterValue = jsonBody.getJSONObject(0).getString("currentNumber");  
							System.out.println("值是多少："+meterValue);
						}*/

                        //赋值
						/*if(map.get("insType").equals("查询水表读数")){
							waterMeter= meterValue;
						}
						if(map.get("insType").equals("查询电表读数")){
							electMeter = meterValue;
						}
						if(map.get("insType").equals("查询气表读数")){
							gasMeter = meterValue;
						}*/
						
						/*if(map.get("instruction").equals("查询水表详情")){
							waterMeter = meterValue;
							
						}
						if(map.get("instruction").equals("查询电表详情")){
							electMeter = meterValue;
							System.out.println("electMeter:"+electMeter);
							jsonReading.put("elect", electMeter);
						}*/
                        map.clear();

                    }
                    //returnJsonStr = "{water:\""+waterMeter+"\",elect:\""+electMeter+"\",gas:\""+gasMeter+"\"}";
                }
                //System.out.println(jsonReading.toString());
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", jsonReading.toString()));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
}
