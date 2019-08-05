package com.zz.service.info;

import com.google.gson.JsonArray;
import com.zz.po.commons.Result;
import com.zz.po.info.DeviceMenu;
import com.zz.po.journal.JourShortRentContract;
import net.sf.json.JSONArray;

import java.util.List;

public interface DeviceMenuService  {
    //查询设备菜单
    List<DeviceMenu> selectDeviceType() throws Exception;
    //查询有设备的房间信息
    List<DeviceMenu> selectDeviceRooms(DeviceMenu deviceMenu) throws  Exception;
    //查询情景名称
    List<DeviceMenu> selectSceneMode() throws  Exception;
    //查询房间信息
    List<DeviceMenu> selectRooms(DeviceMenu deviceMenu) throws Exception;
    //查询情景指令表的数据，存在返回Id
    List<DeviceMenu> selectJsro(DeviceMenu deviceMenu)throws Exception;
    //查询设备SN、网关等selectDevSN
    List<DeviceMenu> selectDevSN(DeviceMenu deviceMenu)throws Exception;
    //新增情景
    int insertScene(DeviceMenu deviceMenu) throws Exception;
    //修改情景
    int updateScene (DeviceMenu deviceMenu) throws Exception;
    //查询设备表ID
    List<DeviceMenu> selectDevice(DeviceMenu deviceMenu)throws Exception;
    //查询情景面板的数据，存在返回Id
    List<DeviceMenu> selectPanel(DeviceMenu deviceMenu)throws Exception;
    //新增情景面板
    int insertPanel(DeviceMenu deviceMenu) throws Exception;
    //修改情景面板
    int updatePanel (DeviceMenu deviceMenu) throws Exception;

    //查找安装位置
    List<DeviceMenu> queryDevPlace()throws Exception;
    //查找一级情境设备
    List<DeviceMenu> queryFtSceneType()throws Exception;
    //查询设备一二级类型
    List<DeviceMenu> queryAllDevType()throws Exception;

    int updateSceneType(List<DeviceMenu> list) throws Exception;

    //查询情景模式以及设备安装地址
    Result<List<DeviceMenu>> querySituationalPatterns(DeviceMenu deviceMenu) throws Exception;

    Result<JSONArray> querySituationalDetails(DeviceMenu deviceMenu) throws Exception;

    //根据安装位置查询设备类型
    Result<List<DeviceMenu>> queryDeviceType(DeviceMenu deviceMenu) throws Exception;

    //批量添加情景模式类型
    Result<String> insertSituationalTypes(DeviceMenu deviceMenu) throws Exception;

    //批量修改情景模式类型
    Result<String> updateSituationalTypes(DeviceMenu deviceMenu) throws Exception;
}
