package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.datasource.Brand;
import com.zz.other.Syslog;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourHsDevice;
import com.zz.service.journal.DeviceService;
import com.zz.service.journal.JourHsDeviceService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.convention.annotation.*;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Namespace("/")
@ParentPackage("json-default")
@Results({@Result(type = "json")})
public class DeviceAction extends BaseAction implements ModelDriven<JourDevice> {
    private JourDevice jourDevice;
    private DeviceService deviceService;
    @Autowired
    private JourHsDeviceService jourHsDeviceService;

    //查询领虎设备
    @Action("getLingHuDevice")
    public void getLingHuDevice() {
        try {
            List<JourDevice> result = deviceService.getAllDevice();
            String json = JSONUtil.serialize(result);
            printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    @Action("insertDeviceList")
    public void insertDeviceList(){
        try {
            List<JourDevice> deviceList = JSON.parseArray(jourDevice.getPostJson(),JourDevice.class);
            int results = deviceService.insertDeviceList(deviceList);
            if (results > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加设备失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    public void deleteDevice() {
        try {
            int result = deviceService.deleteDevice(jourDevice);
            System.out.println(result);
            if (result == 1) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "刪除失败！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    // 查询-数据和统计分开
    public String selectAllDevice() {
        try {
            System.out.println("000我要看輸出" + jourDevice);
            System.out.println("我要看輸出" + jourDevice.getDevAddress());
            List<JourDevice> list = deviceService.selectAllDevice(jourDevice);
            // 从session中读取全部品牌
            JSONArray allBrand = JSONArray.fromObject(CommonMethodClass.getSessionBrandInfo());
            if (list.size() != 0) {
                for (int i = 0; i < list.size(); i++) {
                    System.out.println("============================");
                    System.out.println(list.get(i));
                    for (int j = 0; j < allBrand.size(); j++) {
                        Object obj = allBrand.get(j);
                        JSONObject jsonObject = JSONObject.fromObject(obj);
                        Brand brand = (Brand) JSONObject.toBean(jsonObject, Brand.class);
                        if (brand.getBrandId().equals(list.get(i).getDevBrandId())) {
                            list.get(i).setBrandModel(brand.getBrandModel());
                            list.get(i).setBrandType(brand.getBrandType());
                            list.get(i).setBrandName(brand.getBrandName());
                        }
                    }
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    // 查询-数据和统计分开
    public String queryDevice() {
        try {
            List<JourDevice> list = deviceService.queryDevice(jourDevice);
            // 从session中读取全部品牌
            JSONArray allBrand = JSONArray.fromObject(CommonMethodClass.getSessionBrandInfo());
            if (list.size() != 0) {
                for (int i = 0; i < list.size(); i++) {
                    for (int j = 0; j < allBrand.size(); j++) {
                        Object obj = allBrand.get(j);
                        JSONObject jsonObject = JSONObject.fromObject(obj);
                        Brand brand = (Brand) JSONObject.toBean(jsonObject, Brand.class);
                        if (brand.getBrandId().equals(list.get(i).getDevBrandId())) {
                            list.get(i).setBrandModel(brand.getBrandModel());
                            list.get(i).setBrandType(brand.getBrandType());
                            list.get(i).setBrandName(brand.getBrandName());
                        }
                    }
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //查询所有门禁设备
    public String selectDoorDevice() {
        try {
            List<JourDevice> jourDevices = deviceService.selectDoorDevice(jourDevice);
            JSONArray allBrand = JSONArray.fromObject(CommonMethodClass.getSessionBrandInfo());
            if (jourDevices.size() != 0) {
                for (int i = 0; i < jourDevices.size(); i++) {
                    for (int j = 0; j < allBrand.size(); j++) {
                        Object obj = allBrand.get(j);
                        JSONObject jsonObject = JSONObject.fromObject(obj);
                        Brand brand = (Brand) JSONObject.toBean(jsonObject, Brand.class);
                        if (brand.getBrandId().equals(jourDevices.get(i).getDevBrandId())) {
                            jourDevices.get(i).setBrandModel(brand.getBrandModel());
                            jourDevices.get(i).setBrandType(brand.getBrandType());
                            jourDevices.get(i).setBrandName(brand.getBrandName());
                        }
                    }
                }
                String json = JSONUtil.serialize(jourDevices);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    // 单独查询本房源设备
    public String selectThisHouseDevice() {
        try {
            String[] idArray = jourDevice.getIdArrayStr().split(",");
            List idList = java.util.Arrays.asList(idArray);

            List<JourDevice> list = deviceService.selectThisHouseDevice(idList);

            JSONArray allBrand = JSONArray.fromObject(CommonMethodClass.getSessionBrandInfo());

            if (list.size() != 0) {
                for (int i = 0; i < list.size(); i++) {
                    for (int j = 0; j < allBrand.size(); j++) {
                        Object obj = allBrand.get(j);
                        JSONObject jsonObject = JSONObject.fromObject(obj);
                        Brand brand = (Brand) JSONObject.toBean(jsonObject, Brand.class);
                        if (brand.getBrandId().equals(list.get(i).getDevBrandId())) {
                            list.get(i).setBrandModel(brand.getBrandModel());
                            list.get(i).setBrandType(brand.getBrandType());
                            list.get(i).setBrandName(brand.getBrandName());
                        }
                    }
                }
                String json = JSONUtil.serialize(list);

                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //修改设备
    public void updateDevice() {
        try {
            int results = deviceService.updateById(jourDevice);
            if (results > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改设备失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    //添加设备
    public void insertDevice() {
        try {
            int results = 0;
            String name = jourDevice.getDevNickname();
            String[] str = jourDevice.getSubDeviceNumer().split(",");
            for (int i = 0; i < str.length; i++) {
                jourDevice.setDevRoad(Integer.valueOf(str[i]));
                jourDevice.setDevNickname(name + "-" + str[i]);
                results = deviceService.insertDevice(jourDevice);
            }
            if (results > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加设备失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    //拆分悠悠电箱
    public void dismantlingElectricBox() {
        try {
            int results = 0;
            JSONArray list = JSONArray.fromObject(jourDevice.getBrandDeviceJson());
            for (int i = 0; i < list.size(); i++) {
                System.out.println(list.getJSONObject(i).getInt("jhdId"));
                if (list.getJSONObject(i).getInt("jhdId") == 0) {
                    JourDevice jd = new JourDevice();
                    jd.setDevId(list.getJSONObject(i).getString("devId"));
                    jd.setDevNickname(list.getJSONObject(i).getString("devNickname") + "-" + list.getJSONObject(i).getInt("devRoad"));
                    jd.setDevBrandId(list.getJSONObject(i).getInt("devBrandId"));
                    jd.setDevSn(list.getJSONObject(i).getString("devSn"));
                    jd.setDevAuthSecret(list.getJSONObject(i).getString("devAuthSecret"));
                    jd.setDevAuthId(list.getJSONObject(i).getString("devAuthId"));
                    jd.setDevFirstType(list.getJSONObject(i).getInt("devFirstType"));
                    jd.setDevSecondType(list.getJSONObject(i).getInt("devSecondType"));
                    jd.setDevRoad(list.getJSONObject(i).getInt("devRoad"));
                    results = deviceService.insertDevice(jd);
                    if (results != 1) {
                        throw new Exception();
                    }
                    JourHsDevice jhd = new JourHsDevice();
                    jhd.setJhdHsId(list.getJSONObject(i).getInt("hsId"));
                    jhd.setJhdDeviceId(jd.getId());
                    int results2 = jourHsDeviceService.insertHsDevice(jhd);
                    if (results2 != 1) {
                        throw new Exception();
                    }
                } else {
                    JourDevice jd = new JourDevice();
                    jd.setDevRoad(list.getJSONObject(i).getInt("devRoad"));
                    jd.setDevNickname(list.getJSONObject(i).getString("devNickname") + "-" + list.getJSONObject(i).getInt("devRoad"));
                    jd.setId(list.getJSONObject(i).getInt("id"));
                    results = deviceService.updateById(jd);
                    if (results != 1) {
                        throw new Exception();
                    }

                    JourHsDevice jhd = new JourHsDevice();
                    jhd.setJhdHsId(list.getJSONObject(i).getInt("jhdHsId"));
                    jhd.setJhdDeviceId(list.getJSONObject(i).getInt("id"));
                    jhd.setJhdId(list.getJSONObject(i).getInt("jhdId"));
                    int results2 = jourHsDeviceService.updateHsDevice(jhd);
                    if (results2 != 1) {
                        throw new Exception();
                    }
                }
            }
            if (results > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加设备失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

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

}
