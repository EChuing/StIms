package com.zz.deviceevents;

public class WaterMeterEvents {

    private Integer wmId;
    private Integer wmBrandId;
    private String wmBrand;
    private String wmDeviceSn;
    private String wmEventType;
    private String wmWarningContent;
    private String wmNum;
    private String wmTime;
    private String startTime;
    private String endTime;
    private String wmOnline;

    public String getWmOnline() {
        return wmOnline;
    }

    public void setWmOnline(String wmOnline) {
        this.wmOnline = wmOnline;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public Integer getWmBrandId() {
        return wmBrandId;
    }

    public void setWmBrandId(Integer wmBrandId) {
        this.wmBrandId = wmBrandId;
    }

    public Integer getWmId() {
        return wmId;
    }

    public void setWmId(Integer wmId) {
        this.wmId = wmId;
    }

    public String getWmBrand() {
        return wmBrand;
    }

    public void setWmBrand(String wmBrand) {
        this.wmBrand = wmBrand;
    }

    public String getWmDeviceSn() {
        return wmDeviceSn;
    }

    public void setWmDeviceSn(String wmDeviceSn) {
        this.wmDeviceSn = wmDeviceSn;
    }

    public String getWmEventType() {
        return wmEventType;
    }

    public void setWmEventType(String wmEventType) {
        this.wmEventType = wmEventType;
    }

    public String getWmWarningContent() {
        return wmWarningContent;
    }

    public void setWmWarningContent(String wmWarningContent) {
        this.wmWarningContent = wmWarningContent;
    }

    public String getWmNum() {
        return wmNum;
    }

    public void setWmNum(String wmNum) {
        this.wmNum = wmNum;
    }

    public String getWmTime() {
        return wmTime;
    }

    public void setWmTime(String wmTime) {
        this.wmTime = wmTime;
    }

    @Override
    public String toString() {
        return "WaterMeterEvents{" +
                "wmId=" + wmId +
                ", wmBrandId=" + wmBrandId +
                ", wmBrand='" + wmBrand + '\'' +
                ", wmDeviceSn='" + wmDeviceSn + '\'' +
                ", wmEventType='" + wmEventType + '\'' +
                ", wmWarningContent='" + wmWarningContent + '\'' +
                ", wmNum='" + wmNum + '\'' +
                ", wmTime='" + wmTime + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", wmOnline='" + wmOnline + '\'' +
                '}';
    }
}
