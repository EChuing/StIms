package com.zz.deviceevents;


public class ElectricMeterEvents {
    private Integer emId;

    private Integer emBrandId;

    private String emBrand;

    private String emDeviceSn;

    private Integer emSubDeviceNumber;

    private String emNum;

    private String emOnline;

    private String emEventType;

    private String emWarningContent;

    private String emString;

    private String emTime;

    private String emWarningStatus;

    private String emHandleStatus;

    private String emHandleResult;

    private String startTime;

    private String endTime;

    private String emFailureCause;

    private String emDate;

    public String getEmDate() {
        return emDate;
    }

    public void setEmDate(String emDate) {
        this.emDate = emDate;
    }

    public String getEmFailureCause() {
        return emFailureCause;
    }

    public void setEmFailureCause(String emFailureCause) {
        this.emFailureCause = emFailureCause;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getEmId() {
        return emId;
    }

    public void setEmId(Integer emId) {
        this.emId = emId;
    }

    public Integer getEmBrandId() {
        return emBrandId;
    }

    public void setEmBrandId(Integer emBrandId) {
        this.emBrandId = emBrandId;
    }

    public String getEmBrand() {
        return emBrand;
    }

    public void setEmBrand(String emBrand) {
        this.emBrand = emBrand;
    }

    public String getEmDeviceSn() {
        return emDeviceSn;
    }

    public void setEmDeviceSn(String emDeviceSn) {
        this.emDeviceSn = emDeviceSn;
    }

    public Integer getEmSubDeviceNumber() {
        return emSubDeviceNumber;
    }

    public void setEmSubDeviceNumber(Integer emSubDeviceNumber) {
        this.emSubDeviceNumber = emSubDeviceNumber;
    }

    public String getEmNum() {
        return emNum;
    }

    public void setEmNum(String emNum) {
        this.emNum = emNum;
    }

    public String getEmOnline() {
        return emOnline;
    }

    public void setEmOnline(String emOnline) {
        this.emOnline = emOnline;
    }

    public String getEmEventType() {
        return emEventType;
    }

    public void setEmEventType(String emEventType) {
        this.emEventType = emEventType;
    }

    public String getEmWarningContent() {
        return emWarningContent;
    }

    public void setEmWarningContent(String emWarningContent) {
        this.emWarningContent = emWarningContent;
    }

    public String getEmString() {
        return emString;
    }

    public void setEmString(String emString) {
        this.emString = emString;
    }

    public String getEmTime() {
        return emTime;
    }

    public void setEmTime(String emTime) {
        this.emTime = emTime;
    }

    public String getEmWarningStatus() {
        return emWarningStatus;
    }

    public void setEmWarningStatus(String emWarningStatus) {
        this.emWarningStatus = emWarningStatus;
    }

    public String getEmHandleStatus() {
        return emHandleStatus;
    }

    public void setEmHandleStatus(String emHandleStatus) {
        this.emHandleStatus = emHandleStatus;
    }

    public String getEmHandleResult() {
        return emHandleResult;
    }

    public void setEmHandleResult(String emHandleResult) {
        this.emHandleResult = emHandleResult;
    }

    @Override
    public String toString() {
        return "ElectricMeterEvents{" +
                "emId=" + emId +
                ", emBrandId=" + emBrandId +
                ", emBrand='" + emBrand + '\'' +
                ", emDeviceSn='" + emDeviceSn + '\'' +
                ", emSubDeviceNumber=" + emSubDeviceNumber +
                ", emNum='" + emNum + '\'' +
                ", emOnline='" + emOnline + '\'' +
                ", emEventType='" + emEventType + '\'' +
                ", emWarningContent='" + emWarningContent + '\'' +
                ", emString='" + emString + '\'' +
                ", emTime='" + emTime + '\'' +
                ", emWarningStatus='" + emWarningStatus + '\'' +
                ", emHandleStatus='" + emHandleStatus + '\'' +
                ", emHandleResult='" + emHandleResult + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", emFailureCause='" + emFailureCause + '\'' +
                ", emDate='" + emDate + '\'' +
                '}';
    }
}