package com.zz.service.info;

import com.alibaba.fastjson.JSON;
import com.google.gson.JsonArray;
import com.zz.mapper.info.DeviceMenuMapper;
import com.zz.po.commons.Result;
import com.zz.po.info.DeviceMenu;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

public class DeviceMenuServiceImpl implements DeviceMenuService {
    @Autowired
    private DeviceMenuMapper deviceMenuMapper;

    //查询设备菜单
    @Override
    public List<DeviceMenu> selectDeviceType() throws Exception {
        return deviceMenuMapper.selectDeviceType();
    }

    //查询有设备的房间信息
    @Override
    public List<DeviceMenu> selectDeviceRooms(DeviceMenu deviceMenu) throws Exception {
        return deviceMenuMapper.selectDeviceRooms(deviceMenu);
    }

    //查询情景名称
    @Override
    public List<DeviceMenu> selectSceneMode() throws Exception {
        return deviceMenuMapper.selectSceneMode();
    }

    //查询房间信息
    @Override
    public List<DeviceMenu> selectRooms(DeviceMenu deviceMenu) throws Exception {
        return deviceMenuMapper.selectRooms(deviceMenu);
    }

    //查询集控情景表的数据，存在返回Id
    @Override
    public List<DeviceMenu> selectJsro(DeviceMenu deviceMenu) throws Exception {
        return deviceMenuMapper.selectJsro(deviceMenu);
    }

    //查询设备SN、网关等selectDevSN
    @Override
    public List<DeviceMenu> selectDevSN(DeviceMenu deviceMenu) throws Exception {
        return deviceMenuMapper.selectDevSN(deviceMenu);
    }

    //新增情景
    @Override
    public int insertScene(DeviceMenu deviceMenu) throws Exception {
        return deviceMenuMapper.insertScene(deviceMenu);
    }

    //修改情景
    @Override
    public int updateScene(DeviceMenu deviceMenu) throws Exception {
        return deviceMenuMapper.updateScene(deviceMenu);
    }

    //查询设备表ID
    @Override
    public List<DeviceMenu> selectDevice(DeviceMenu deviceMenu) throws Exception {
        return deviceMenuMapper.selectDevice(deviceMenu);
    }

    //查询集控设置面板的数据，存在返回Id
    @Override
    public List<DeviceMenu> selectPanel(DeviceMenu deviceMenu) throws Exception {
        return deviceMenuMapper.selectPanel(deviceMenu);
    }

    //新增设置集控面板
    @Override
    public int insertPanel(DeviceMenu deviceMenu) throws Exception {
        return deviceMenuMapper.insertPanel(deviceMenu);
    }

    //修改设置集控面板
    @Override
    public int updatePanel(DeviceMenu deviceMenu) throws Exception {
        return deviceMenuMapper.updatePanel(deviceMenu);
    }

    @Override
    public List<DeviceMenu> queryDevPlace() throws Exception {
        return deviceMenuMapper.queryDevPlace();
    }

    @Override
    public List<DeviceMenu> queryFtSceneType() throws Exception {
        return deviceMenuMapper.queryFtSceneType();
    }

    @Override
    public List<DeviceMenu> queryAllDevType() throws Exception {
        return deviceMenuMapper.queryAllDevType();
    }

    @Override
    public int updateSceneType(List<DeviceMenu> list) throws Exception {
        DeviceMenu dm = new DeviceMenu();
        dm.setIdftId(list.get(0).getIdftId());
        dm.setIdstName(list.get(0).getIdstName());

        DeviceMenu stDm = deviceMenuMapper.queryStSceneType(dm);
        HashMap updateMap = new HashMap<>();
        updateMap.put("list", list);
        if (stDm != null) {
            updateMap.put("idstIdftId", stDm.getIdstIdftId());
            updateMap.put("idstId", stDm.getIdstId());
        } else {
            int addResult = deviceMenuMapper.addStSceneType(dm);
            dm = deviceMenuMapper.queryStSceneType(dm);
            if (addResult > 0) {
                updateMap.put("idstIdftId", dm.getIdstIdftId());
                updateMap.put("idstId", dm.getIdstId());
            } else {
                throw new Exception("添加情景模式二级设备失败");
            }
        }
        return deviceMenuMapper.updateDevSceneType(updateMap);
    }
    //查询情景模式以及详情
    @Override
    public Result<JSONArray> querySituationalDetails(DeviceMenu deviceMenu) throws Exception {
        deviceMenu.setJhdHsId(deviceMenu.getJsroHsId());
        List<DeviceMenu> listJd = deviceMenuMapper.queryDevice(deviceMenu);
        if (listJd.size() > 0) {
                JSONArray jsonArray=new JSONArray();
                List<DeviceMenu> listJspt = deviceMenuMapper.querySituationalDetails(deviceMenu);
            for (int i=0;i<listJd.size();i++){
                if(listJd.get(i).getDevFirstType()==1 || listJd.get(i).getDevFirstType()==2 || listJd.get(i).getDevFirstType()==4 ||listJd.get(i).getDevFirstType()==6 || listJd.get(i).getDevFirstType()==23){
                    com.alibaba.fastjson.JSONObject obj=new com.alibaba.fastjson.JSONObject();
                    obj.put("devId",listJd.get(i).getDevId());
                    obj.put("devBrandId",listJd.get(i).getDevBrandId());
                    obj.put("devNickname",listJd.get(i).getDevNickname());
                    obj.put("devAuthId",listJd.get(i).getDevAuthId());
                    obj.put("devAuthSecret",listJd.get(i).getDevAuthSecret());
                    obj.put("devFirstType",listJd.get(i).getDevFirstType());
                    obj.put("devSecondType",listJd.get(i).getDevSecondType());
                    obj.put("brightness","50");//冷暖灯亮度
                    obj.put("colorTemperature","50");//冷暖灯色温
                    obj.put("temperature","26");//空调温度
                    obj.put("pattern","00");//空调模式
                    obj.put("windSpeed","00");//空调风速
                    obj.put("deSwitch","关");//开关状态
                    obj.put("devActivation","不启用");//激活状态
                    for(int j=0;j<listJspt.size();j++){
                        com.alibaba.fastjson.JSONArray wxgzhStateArray=JSON.parseArray(listJspt.get(j).getJsroWxgzhState());
                        for (int l=0;l<wxgzhStateArray.size();l++){
                            if (listJd.get(i).getDevAuthId().equals(wxgzhStateArray.getJSONObject(l).getString("sn"))){
                                obj.put("deSwitch",wxgzhStateArray.getJSONObject(l).getString("state"));//开关状态
                                obj.put("devActivation","启用");//激活状态
                                obj.put("brightness",wxgzhStateArray.getJSONObject(l).getString("brightness"));//冷暖灯亮度
                                obj.put("colorTemperature",wxgzhStateArray.getJSONObject(l).getString("colorTemperature"));//冷暖灯色温
                                obj.put("temperature",wxgzhStateArray.getJSONObject(l).getString("temperature"));//空调温度
                                obj.put("pattern",wxgzhStateArray.getJSONObject(l).getString("pattern"));//空调模式
                                obj.put("windSpeed",wxgzhStateArray.getJSONObject(l).getString("windSpeed"));//空调风速
                            }
                        }
                    }
                    jsonArray.add(obj);
                }
            }
            return new Result<>(1, "成功", jsonArray);
        } else {
            return new Result<>(-1, "未查询到数据", null);
        }
    }

    @Override
    public Result<List<DeviceMenu>> querySituationalPatterns(DeviceMenu deviceMenu) throws Exception {
        List<DeviceMenu> list = deviceMenuMapper.querySituationalPatterns(deviceMenu);

        List<DeviceMenu> newList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            JSONArray array = new JSONArray();
            DeviceMenu dm = list.get(i);
            if (newList.size() == 0) {
                JSONObject obj = new JSONObject();
                obj.put("id", dm.getSpdId());
                obj.put("name", dm.getSpdDescribe());
                array.add(obj);

                newList.add(dm);
                newList.get(0).setAllSpdDescribe(dm.getSpdDescribe());
                newList.get(0).setSituationalPatternsList(array.toString());
            } else {
                boolean flag = false; //检测数组中是否存在，false为不存在
                for (int j = 0; j < newList.size(); j++) {
                    JSONObject obj = new JSONObject();
                    if (dm.getJsroHsId() == newList.get(j).getJsroHsId()) {
                        String allSpdDescribe = newList.get(j).getAllSpdDescribe() + "、" + dm.getSpdDescribe();
                        newList.get(j).setAllSpdDescribe(allSpdDescribe);

                        JSONArray jsonArray1 = JSONArray.fromObject(newList.get(j).getSituationalPatternsList());
                        obj.put("id", dm.getSpdId());
                        obj.put("name", dm.getSpdDescribe());
                        jsonArray1.add(obj);
                        newList.get(j).setSituationalPatternsList(jsonArray1.toString());

                        System.out.println("跳出循环");
                        flag = true;
                        break;
                    } else {
                        flag = false;
                    }
                }
                if (!flag) {
                    dm.setAllSpdDescribe(dm.getSpdDescribe());
                    newList.add(dm);
                }
            }
        }

        //修改totalNum
        for (int i = 0; i < newList.size(); i++) {
            String totalNum = String.valueOf(newList.size());
            System.out.println(totalNum);
            newList.get(0).setTotalNum(totalNum);
        }

        if (list.size() > 0) {
            return new Result<>(1, "成功", newList);
        } else {
            return new Result<>(-1, "未查询到数据", null);
        }
    }

    @Override
    public Result<List<DeviceMenu>> queryDeviceType(DeviceMenu deviceMenu) throws Exception {
        List<Integer> hsIdList = JSON.parseArray(deviceMenu.getHsIdList(), Integer.class);
        deviceMenu.setList(hsIdList);
        List<DeviceMenu> list = deviceMenuMapper.queryDeviceType(deviceMenu);

        System.out.println(deviceMenu.getType());
        System.out.println("====================================");
        int num = 0; //判断是否所有设备都没有设置安装位置
        for (int i = 0; i < list.size(); i++) {
            DeviceMenu dm = list.get(i);
            if (dm.getIdftId() == null) {
                num += 1;
            }
        }

        System.out.println(num);
        if (list.size() > 0) {
            if (num == list.size()) {
                return new Result<>(-2, "所有设备都没设置安装位置,请先设置设备安装位置", null);
            } else if (num != 0) {
                return new Result<>(2, "成功,但存在设备没有设置安装位置", list);
            } else {
                return new Result<>(1, "成功", list);
            }
        } else {
            return new Result<>(-1, "未查询到所选地址下的设备", null);
        }
    }

    @Override
    public Result<String> insertSituationalTypes(DeviceMenu deviceMenu) throws Exception {
        List<DeviceMenu> list = JSON.parseArray(deviceMenu.getSituationalPatternsList(),DeviceMenu.class);
        int result = deviceMenuMapper.insertList(list);
        if(result > 0){
            return new Result<>(1,"添加情景类型成功",null);
        }else{
            return new Result<>(-1,"添加情景类型失败",null);
        }
    }

    @Override
    public Result<String> updateSituationalTypes (DeviceMenu deviceMenu) throws Exception {
        List<DeviceMenu> list = JSON.parseArray(deviceMenu.getSituationalPatternsList(),DeviceMenu.class);
        int result = deviceMenuMapper.updateList(list);
        if(result > 0){
            return new Result<>(1,"修改情景类型成功",null);
        }else{
            return new Result<>(-1,"修改情景类型失败",null);
        }
    }
}