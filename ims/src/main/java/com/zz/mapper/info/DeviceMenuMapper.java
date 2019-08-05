package com.zz.mapper.info;

import com.zz.po.info.DeviceMenu;

import java.util.HashMap;
import java.util.List;

public interface DeviceMenuMapper {
    //查询设备菜单
    List<DeviceMenu> selectDeviceType() throws Exception;
    //查询全部设备房间
    List<DeviceMenu> selectDeviceRooms(DeviceMenu deviceMenu) throws  Exception;
    //查询情景名称
    List<DeviceMenu> selectSceneMode() throws  Exception;
    //查询房间信息
    List<DeviceMenu> selectRooms(DeviceMenu deviceMenu) throws Exception;
    //查询集控情景表的数据，存在返回Id
    List<DeviceMenu> selectJsro(DeviceMenu deviceMenu)throws Exception;
    //查询设备SN、网关等selectDevSN
    List<DeviceMenu> selectDevSN(DeviceMenu deviceMenu)throws Exception;
    //新增情景
    int insertScene(DeviceMenu deviceMenu) throws Exception;
    //修改情景
    int updateScene (DeviceMenu deviceMenu) throws Exception;
    //查询设备表ID
    List<DeviceMenu>selectDevice(DeviceMenu deviceMenu)throws Exception;
    //查询集控设置面板的数据，存在返回Id
    List<DeviceMenu> selectPanel(DeviceMenu deviceMenu)throws Exception;
    //新增设置集控面板
    int insertPanel(DeviceMenu deviceMenu) throws Exception;
    //修改设置集控面板
    int updatePanel (DeviceMenu deviceMenu) throws Exception;

    //查找安装位置
    List<DeviceMenu> queryDevPlace() throws Exception;
    //查找一级情景设备类型
    List<DeviceMenu> queryFtSceneType() throws Exception;

    DeviceMenu queryStSceneType(DeviceMenu dm) throws Exception;

    Integer updateDevSceneType(HashMap map)throws  Exception;

    int addStSceneType(DeviceMenu dm) throws Exception;

    List<DeviceMenu> queryAllDevType()throws Exception;

    //查询情景模式以及设备安装地址
    List<DeviceMenu> querySituationalPatterns(DeviceMenu deviceMenu) throws Exception;
    //查询情景模式以及详情
    List<DeviceMenu> querySituationalDetails(DeviceMenu deviceMenu) throws Exception;

    List<DeviceMenu> queryDevice(DeviceMenu deviceMenu) throws Exception;

    List<DeviceMenu> queryDeviceType(DeviceMenu deviceMenu) throws Exception;

    int insertList(List<DeviceMenu> list) throws Exception;

    int updateList(List<DeviceMenu> list) throws Exception;
}
