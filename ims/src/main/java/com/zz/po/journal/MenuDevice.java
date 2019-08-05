package com.zz.po.journal;

public class MenuDevice {
    //一级设备菜单表
    private Integer flmdId;                 //一级设备菜单的Id
    private String flmdDeviceDescription;   //一级设备菜单的描述

    //二级设备菜单表
    private Integer smdId;                  //二级设备菜单的Id
    private String  smdDeviceDescription;   //二级设备菜单的描述
    private Integer smdDeviceId;            //一级设备菜单的Id

    public Integer getFlmdId() {
        return flmdId;
    }

    public void setFlmdId(Integer flmdId) {
        this.flmdId = flmdId;
    }

    public String getFlmdDeviceDescription() {
        return flmdDeviceDescription;
    }

    public void setFlmdDeviceDescription(String flmdDeviceDescription) {
        this.flmdDeviceDescription = flmdDeviceDescription;
    }

    public Integer getSmdId() {
        return smdId;
    }

    public void setSmdId(Integer smdId) {
        this.smdId = smdId;
    }

    public String getSmdDeviceDescription() {
        return smdDeviceDescription;
    }

    public void setSmdDeviceDescription(String smdDeviceDescription) {
        this.smdDeviceDescription = smdDeviceDescription;
    }

    public Integer getSmdDeviceId() {
        return smdDeviceId;
    }

    public void setSmdDeviceId(Integer smdDeviceId) {
        this.smdDeviceId = smdDeviceId;
    }

    @Override
    public String toString() {
        return "firstLevelMenuDevice{" +
                "flmdId=" + flmdId +
                ", flmdDeviceDescription='" + flmdDeviceDescription + '\'' +
                ", smdId=" + smdId +
                ", smdDeviceDescription='" + smdDeviceDescription + '\'' +
                ", smdDeviceId=" + smdDeviceId +
                '}';
    }
}
