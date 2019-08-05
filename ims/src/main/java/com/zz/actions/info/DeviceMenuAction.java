package com.zz.actions.info;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.sun.org.apache.bcel.internal.generic.IF_ACMPEQ;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.info.DeviceMenu;
import com.zz.po.journal.JourShortRentContract;
import com.zz.po.journal.JourShortRentSetUp;
import com.zz.service.info.DeviceMenuService;
import com.zz.service.journal.JourShortRentSetUpService;

import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DeviceMenuAction extends BaseAction implements ModelDriven<DeviceMenu> {
    private final static String POSTURL = "http://www.fangzhizun.com/device/Interface/QueryDeviceStatus2";
    private final static String POSTURL1 = "http://www.fangzhizun.com/device/creat/CreateAirConver";

    private DeviceMenu deviceMenu;
    @Autowired
    private DeviceMenuService deviceMenuService;
    @Autowired
    private JourShortRentSetUpService jourShortRentSetUpService;
    
    @Override
    public DeviceMenu getModel() {
        if (deviceMenu == null) {
            deviceMenu = new DeviceMenu();
        }
        return deviceMenu;
    }
    //查询设备菜单
    public String queryDeviceMenu(){
        try {
            List<DeviceMenu> restuel=deviceMenuService.selectDeviceType();
            String json = JSONUtil.serialize(restuel);
            printlnOfJson(CommonMethodClass.jsonData(1, "查询成功", json));
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
    //查询设备一二级类型菜单
    public String queryDevTypeMenu(){
        try {
            List<DeviceMenu> restuel=deviceMenuService.queryAllDevType();
            System.out.println(restuel.toString());
            String json = JSONUtil.serialize(restuel);
            printlnOfJson(CommonMethodClass.jsonData(1, "查询成功", json));
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
  //查询有设备的房间信息
    public  String queryDeviceRooms(){
        try{
            System.out.println(deviceMenu.getDevIdftId());
            System.out.println(deviceMenu.getDevIdstId());
            List<DeviceMenu> restuel=deviceMenuService.selectDeviceRooms(deviceMenu);
            String json = JSONUtil.serialize(restuel);
          //  System.out.println(json);
            printlnOfJson(CommonMethodClass.jsonData(1, "查询成功", json));
        }
        catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
    //查询情景名称
    public String querySceneMode(){
        try{
            List<DeviceMenu> restuel=deviceMenuService.selectSceneMode();
            String json = JSONUtil.serialize(restuel);
            printlnOfJson(CommonMethodClass.jsonData(1, "查询成功", json));
        }
        catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
    //查询未租房间信息
    public String queryRooms(){
        try{
            List<DeviceMenu> restuel=deviceMenuService.selectRooms(deviceMenu);
            if (restuel.size()>0){
                String json = JSONUtil.serialize(restuel);
                printlnOfJson(CommonMethodClass.jsonData(1, "查询成功", json));
            }else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "无符合条件记录", null));
            }
        }
        catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //查询情景模式以及设备安装地址
    public void querySituationalPatterns(){
        try {
            Result<List<DeviceMenu>> result = deviceMenuService.querySituationalPatterns(deviceMenu);
            String resultStr = JSON.toJSONString(result, SerializerFeature.WriteMapNullValue);
            printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
    }

    //查询情景模式以及详情
    public void querySituationalDetails(){
        try {
            Result<net.sf.json.JSONArray> result=deviceMenuService.querySituationalDetails(deviceMenu);
            String resultStr = JSON.toJSONString(result, SerializerFeature.WriteMapNullValue);
            printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
    }
    //保存情景设置
    public void insertScene(){
        try{
            Integer reCode=0;
            Integer jsroPatternId=deviceMenu.getJsroPatternId(); //情景模式ID
            JSONArray  hsIdArray=JSON.parseArray(deviceMenu.getHsIdList());//未租数组、全部ID信息
            DeviceMenu dm=new DeviceMenu();
            for (int i=0;i<hsIdArray.size();i++){
                JSONArray jsroInstruction=new JSONArray();
                JSONArray jsroImsState = new JSONArray();
                Integer jsroHsId=Integer.parseInt(JSON.toJSONString(hsIdArray.get(i))); //未租ID
                JSONArray  DeviceStateArray=JSON.parseArray(deviceMenu.getJsroImsState());//设备开关状态

                for (int j=0;j<DeviceStateArray.size();j++){
                    String state=DeviceStateArray.getJSONObject(j).getString("state");//开关状态
                    String instructions=DeviceStateArray.getJSONObject(j).getString("instructions");//空调温度、风速、冷暖灯亮度、色温等参数

                    dm.setJhdHsId(jsroHsId);
                    dm.setDevIdftId(Integer.parseInt(DeviceStateArray.getJSONObject(j).getString("idftId")));//一级设备ID（情景专用）
                    dm.setDevIdstId(Integer.parseInt(DeviceStateArray.getJSONObject(j).getString("idstId")));//二级设备ID（情景专用）
                    List<DeviceMenu> devSn=deviceMenuService.selectDevSN(dm);//用未租ID、一级名称、二级名称查询设备信息
                    if(devSn.size()>0){//判断该房间是否存在选择设备信息
                        for(int l=0;l<devSn.size();l++){
                            JSONObject jsroImsStateObj = new JSONObject();//情景设置设备状态obj
                            jsroImsStateObj.put("state",state);
                            jsroImsStateObj.put("devFirstType",devSn.get(l).getDevFirstType());
                            jsroImsStateObj.put("devSecondType",devSn.get(l).getDevSecondType());
                            jsroImsStateObj.put("sn",devSn.get(l).getDevAuthId());

                            JSONObject jsroInstructionObj=new JSONObject();//情景指令Obj
                            Integer devFirstType =devSn.get(l).getDevFirstType(); //一级类型
                            Integer devSecondType=devSn.get(l).getDevSecondType();//二级类型
                            jsroInstructionObj.put("isNeedCache",false);
                            jsroInstructionObj.put("resultCode",0);
                            jsroInstructionObj.put("sn",devSn.get(l).getDevAuthId());
                            jsroInstructionObj.put("mac",devSn.get(l).getDevAuthSecret());
                            jsroInstructionObj.put("devId",devSn.get(l).getDevId());
                            if(devFirstType != null || devSecondType != null){//判断设备信息是否存在一级、二级设备类型存在（房至尊内部定义一级、二级规则）
                                if(devFirstType==1&&devSecondType==1){//灯控盒
                                    if (("开").equals(state)){
                                        jsroInstructionObj.put("status",8080);
                                    }else{
                                        jsroInstructionObj.put("status",8000);
                                    }
                                }

                                if(devFirstType==23){//冷暖灯或者调节灯
                                    String brightness="07";
                                    String colorTemperature="07";
                                    jsroImsStateObj.put("brightness","46");
                                    jsroImsStateObj.put("colorTemperature","46");
                                    if (devSecondType==31 || devSecondType==36){//冷暖灯
                                        if (!"".equals(instructions)){
                                            if (!"".equals(JSON.parseObject(instructions).getString("brightness"))){
                                                jsroImsStateObj.put("brightness",JSON.parseObject(instructions).getString("brightness"));
                                                Double brigDouble = Double.valueOf(JSON.parseObject(instructions).getString("brightness")) / 6.6;
                                                Integer brigInt = Integer.valueOf(brigDouble.intValue());
                                                brightness= "0" + Integer.toHexString(brigInt);//亮度
                                            }
//                                            else{
//                                                jsroImsStateObj.put("brightness","46");
//                                                brightness="07";
//                                            }
                                            if (devSecondType==31){
                                                if (!"".equals(JSON.parseObject(instructions).getString("colorTemperature"))){
                                                    jsroImsStateObj.put("colorTemperature",JSON.parseObject(instructions).getString("colorTemperature"));
                                                    Double colorDouble = Double.valueOf(JSON.parseObject(instructions).getString("colorTemperature")) * 1.27;
                                                    Integer colorInt = Integer.valueOf(colorDouble.intValue());
                                                    if (colorInt < 16) {
                                                        colorTemperature = "0" + Integer.toHexString(colorInt);//色温
                                                    } else {
                                                        colorTemperature = Integer.toHexString(colorInt);//色温
                                                    }
                                                }
//                                                else{
//                                                    jsroImsStateObj.put("colorTemperature","50");
//                                                    colorTemperature="3f";
//                                                }
                                            }
                                        }
                                        if (("开").equals(state)){
                                            jsroInstructionObj.put("status","80"+brightness+colorTemperature+"07");
                                        }else{
                                            jsroInstructionObj.put("status","00"+brightness+colorTemperature+"07");
                                        }
                                     }
                                    if (devSecondType==36){//调节灯
                                        if (!"".equals(JSON.parseObject(instructions).getString("brightness"))){
                                            jsroImsStateObj.put("brightness",JSON.parseObject(instructions).getString("brightness"));
                                            Double brigDouble = Double.valueOf(JSON.parseObject(instructions).getString("brightness")) / 6.6;
                                            Integer brigInt = Integer.valueOf(brigDouble.intValue());
                                            brightness= "0" + Integer.toHexString(brigInt);//亮度
                                        }else{
                                            jsroImsStateObj.put("brightness","0");
                                            brightness="07";
                                        }
                                        if (("开").equals(state)){
                                            jsroInstructionObj.put("status","80"+brightness+"0707");
                                        }else{
                                            jsroInstructionObj.put("status","00"+brightness+"0707");
                                        }
                                    }
                                }
                                if(devFirstType==6 && devSecondType==6 || devFirstType==6 && devSecondType==41){//窗帘或者电机正反控制盒
                                    if (("开").equals(state)){
                                        jsroInstructionObj.put("status",8080);
                                    }else{
                                        jsroInstructionObj.put("status",4040);
                                    }
                                }
                                if(devFirstType==6 && devSecondType==38){//窗帘
                                    if (("开").equals(state)){
                                        jsroInstructionObj.put("status","000200018080");
                                    }else{
                                        jsroInstructionObj.put("status","000200014040");
                                    }
                                }
                                if(devFirstType==2 && devSecondType==2 ||devFirstType==2 && devSecondType==25){//插座
                                    if (("开").equals(state)){
                                        jsroInstructionObj.put("status",81);
                                    }else{
                                        jsroInstructionObj.put("status",80);
                                    }
                                }
                                if(devFirstType==2 && devSecondType==37){//2.4G插座
                                    if (("开").equals(state)){
                                        jsroInstructionObj.put("status","8080");
                                    }else{
                                        jsroInstructionObj.put("status","8000");
                                    }
                                }
                                if(devFirstType==4 && devSecondType==4){//空调
                                    Map<String, String> map = new HashMap<String, String>();
                                    map.put("sns", devSn.get(l).getDevAuthId());
                                    String  responseText = HttpRequestUtil.post(POSTURL, map);//查询空调当前的状态信息
                                    JSONObject job = JSONObject.fromObject(responseText);
                                    JSONArray body = JSONArray.parseArray(job.get("body").toString());
                                    if(body.size() <= 0){
                                        continue;
                                    }
                                    String status = body.getJSONObject(0).getString("status");//空调当前状态信息
                                    String strCode = status.substring(4, 6) + status.substring(2, 4); //码组号
                                    String mode = status.substring(6, 8);//模式
                                    String strTemp = status.substring(8, 10);//温度
                                    String speed = status.substring(10, 12);//风量（风速）
                                    Boolean isOn = true; //开关
                                    Integer temp = Integer.parseInt(strTemp, 16) + 16;//温度
                                    Integer code = Integer.parseInt(strCode, 16);//码组号
                                    jsroImsStateObj.put("temperature",temp);
                                    jsroImsStateObj.put("pattern",mode);
                                    jsroImsStateObj.put("windSpeed",speed);
                                    if (!"".equals(instructions)){
                                        if (!"".equals(JSON.parseObject(instructions).getString("temperature"))){
                                            jsroImsStateObj.put("temperature",JSON.parseObject(instructions).getString("temperature"));
                                            temp=Integer.parseInt(JSON.parseObject(instructions).getString("temperature"));
                                        }
                                        if (!"".equals(JSON.parseObject(instructions).getString("pattern"))){
                                            jsroImsStateObj.put("pattern",JSON.parseObject(instructions).getString("pattern"));
                                            mode=JSON.parseObject(instructions).getString("pattern");
                                        }
                                        if (!"".equals(JSON.parseObject(instructions).getString("windSpeed"))){
                                            jsroImsStateObj.put("windSpeed",JSON.parseObject(instructions).getString("windSpeed"));
                                            speed=JSON.parseObject(instructions).getString("windSpeed");
                                        }
                                    }
                                    if (("开").equals(state)){
                                        isOn = true;
                                    }else{
                                        isOn = false;
                                    }

                                    Map<String, String> map1 = new HashMap<String, String>();
                                    map1.put("type", devSn.get(l).getDevId());
                                    map1.put("code", String.valueOf(code));
                                    map1.put("isOn", String.valueOf(isOn));
                                    map1.put("temp", String.valueOf(temp));
                                    map1.put("mode", mode);
                                    map1.put("speed", speed);
                                    map1.put("codeType", "0");
                                    String  responseText1 = HttpRequestUtil.post(POSTURL1, map1);       //生成空调开关指令信息
                                    JSONObject statusObj=JSONObject.fromObject(responseText1);
                                    jsroInstructionObj.put("status",statusObj.get("body").toString());
                                }
                                if(devFirstType==19 && devSecondType==19){//电子门牌的灯
                                    List<JourShortRentSetUp> jsrsuList = jourShortRentSetUpService.selectByPrimaryKey(1);
                                    JSONArray jedArray = JSON.parseArray(jsrsuList.get(0).getJsrsuElectronicDoorplateno());
                                    for(int n=0;n<jedArray.size();n++){
                                        String status = "";
                                        Integer scenarioMode = jedArray.getJSONObject(n).getInteger("scenarioMode");
                                        if(scenarioMode == 1){
                                            Integer keyNumber = jedArray.getJSONObject(n).getInteger("keyNumber");
                                            if(keyNumber == 0){
                                                status = ("开").equals(state)?"4040":"4000";
                                            }else if(keyNumber == 1){
                                                status = ("开").equals(state)?"2020":"2000";
                                            }else{
                                                status = ("开").equals(state)?"1010":"1000";
                                            }
                                            jsroInstructionObj.put("status",status);
                                        }
                                    }
                                }
                            }
                            jsroInstruction.add(jsroInstructionObj);
                            jsroImsState.add(jsroImsStateObj);
                        }
                        System.out.println("全部设备指令信息====================="+jsroInstruction);
                    }
                }
                if (jsroInstruction.size()>0){//判断是否生成设备指令信息

                    dm.setJsroHsId(jsroHsId);
                    dm.setJsroPatternId(jsroPatternId);
                    List<DeviceMenu>  demList=deviceMenuService.selectJsro(dm);
                    dm.setJsroInstruction(JSON.toJSONString(jsroInstruction));
                    dm.setJsroWxgzhState(JSON.toJSONString(jsroImsState));
                    dm.setJsroImsState(JSON.toJSONString(jsroImsState));
                    if (demList.size()==0){
                        dm.setJsroPatternId(jsroPatternId);
                        dm.setJsroHsId(jsroHsId);
//                        dm.setJsroInstruction(JSON.toJSONString(jsroInstruction));
//                        dm.setJsroWxgzhState(JSON.toJSONString(jsroImsState));
//                        dm.setJsroImsState(JSON.toJSONString(jsroImsState));
                        deviceMenuService.insertScene(dm);
                        reCode=reCode+1;
                    }else{
                        Integer jsroId=demList.get(0).getJsroId();
                        dm.setJsroId(jsroId);
//                        dm.setJsroInstruction(JSON.toJSONString(jsroInstruction));
//                        dm.setJsroWxgzhState(JSON.toJSONString(jsroImsState));
//                        dm.setJsroImsState(JSON.toJSONString(jsroImsState));
                        deviceMenuService.updateScene(dm);
                        reCode=reCode+1;
                    }
                }
            }
            if (reCode>=1){
                printlnOfJson(CommonMethodClass.jsonData(1, "保存成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(0, "房间不存在选择设备", null));
            }
        }
        catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    //保存集控设置面板
    public void addPanel(){
        try{
            JSONArray  hsIdArray=JSON.parseArray(deviceMenu.getHsIdList());//未租集合
            Integer jsroPatternId=deviceMenu.getJsroPatternId();//情景描述ID
            Integer idftId=deviceMenu.getIdftId();  //一级设备ID
            Integer idstId=deviceMenu.getIdstId(); //二级设备ID
            if (idstId==0){
                idstId=null;
            }
            Integer cpKeyValue=deviceMenu.getCpKeyValue();//面板按键值
            DeviceMenu dm=new DeviceMenu();
            Integer reCode=0;
            for (int i=0;i<hsIdArray.size();i++){
                Integer jsroHsId=Integer.parseInt(JSON.toJSONString(hsIdArray.get(i)));
                dm.setJsroHsId(jsroHsId);
                dm.setJsroPatternId(jsroPatternId);
                List<DeviceMenu>  jsro=deviceMenuService.selectJsro(dm);   //查询情景指令信息
                if(jsro.size()==0){
                    System.out.println("该房间不存在选择情景指令，本次循环不做保存");
                    continue;
                }else{
                    Integer jsroId=jsro.get(0).getJsroId();         //情景指令ID
                    dm.setDevIdstId(idstId);
                    dm.setDevIdftId(idftId);
                    List<DeviceMenu>  device=deviceMenuService.selectDevice(dm);      //查询设备信息
                    if (device.size()==0){
                        System.out.println("该房间不存在选择面板类型，本次循环不做保存");
                        continue;
                    }else {
                        Integer id=null;
                        for (int l=0;l<device.size();l++){
                           id=device.get(l).getId();
                        }
                        dm.setCpKeyValue(cpKeyValue);
                        dm.setCpDeviceId(id);
                        List<DeviceMenu>  panel=deviceMenuService.selectPanel(dm);          //查询情景面板信息
                        if (panel.size()==0){
                            dm.setCpScenarioId(jsroId);
                            dm.setCpKeyValue(cpKeyValue);
                            dm.setCpDeviceId(id);
                            deviceMenuService.insertPanel(dm);
                            reCode=reCode+1;
                        }else{
                            for (int k=0;k<panel.size();k++){
                                Integer cpId=panel.get(k).getCpId();
                                System.out.println(cpId);
                                dm.setCpId(cpId);
                                dm.setCpScenarioId(jsroId);
                                deviceMenuService.updatePanel(dm);
                                reCode=reCode+1;
                            }
                        }
                    }
                }
            }
            if (reCode>=1){
                printlnOfJson(CommonMethodClass.jsonData(1, "保存成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(0, "房间不存在情景模式或不存在情景面板", null));
             }
        }
        catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }


    //查找安装位置
    public void queryDevPlace (){
        try {
            List<DeviceMenu> list=deviceMenuService.queryDevPlace();
            if (list.size()>0){
                String  json= JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "查询成功", json));
            }else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "查询失败", null));
            }
        } catch (Exception e) {
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统功能错误:"+e.getMessage(), null));
            e.printStackTrace();Syslog.writeErr(e);
        }
        return;
    }

    public void queryFtSceneType (){
        try {
            List<DeviceMenu> list=deviceMenuService.queryFtSceneType();
            if (list.size()>0){
                String  json= JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "查询成功", json));
            }else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "查询失败", null));
            }
        } catch (Exception e) {
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统功能错误:"+e.getMessage(), null));
            e.printStackTrace();Syslog.writeErr(e);
        }
        return;
    }

    public void updateSceneType(){
        try {
            System.out.println("dm="+deviceMenu);
            List<DeviceMenu> list=new ArrayList<>();
            String updateJson = deviceMenu.getUpdateJson();
            net.sf.json.JSONArray jsa= net.sf.json.JSONArray.fromObject(updateJson);
            for(Object a : jsa){
                JSONObject jsonObj = (JSONObject)a;
                DeviceMenu dm = (DeviceMenu) JSONObject.toBean(jsonObj, DeviceMenu.class);
                list.add(dm);
            }
            int result= deviceMenuService.updateSceneType(list);
            if (result>=0){
                printlnOfJson(CommonMethodClass.jsonData(1, "添加成功", null));
            }else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-1, "系统异常:"+e.getMessage(), null));
        }
    }

    public void queryDeviceType(){
        try {
            Result<List<DeviceMenu>> result=deviceMenuService.queryDeviceType(deviceMenu);
            String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
            printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-3, "系统异常", null));
        }
    }

    //批量修改情景模式类型
    public void updateSituationalTypes(){
        try {
            Result<String> result=deviceMenuService.updateSituationalTypes(deviceMenu);
            String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
            printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    //批量添加情景模式类型
    public void insertSituationalTypes(){
        try {
            Result<String> result=deviceMenuService.insertSituationalTypes(deviceMenu);
            String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
            printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
}
