package com.zz.po.journal;

public class JourAntPassword {
    private Integer japId;

    private Integer japHsId;

    private Integer japPopId;

    private Integer japUserId;

    private String japAntDeviceId;

    private String japPasswordId;

    private String japOperationFlowId;

    private String japOperationStatus;

    private String japPasswordStatus;

    private String japPasswordType;

    private String japStartTime;

    private String japEndTime;

    private String japRegistrationTime;

    private String popName;
    private String popTelephone;

    private String startNum;
    private String endNum;
    private String totalNum;

    public String getPopName() {
        return popName;
    }

    public void setPopName(String popName) {
        this.popName = popName;
    }

    public String getPopTelephone() {
        return popTelephone;
    }

    public void setPopTelephone(String popTelephone) {
        this.popTelephone = popTelephone;
    }

    public String getStartNum() {
        return startNum;
    }

    public void setStartNum(String startNum) {
        this.startNum = startNum;
    }

    public String getEndNum() {
        return endNum;
    }

    public void setEndNum(String endNum) {
        this.endNum = endNum;
    }

    public String getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(String totalNum) {
        this.totalNum = totalNum;
    }

    public Integer getJapId() {
        return japId;
    }

    public void setJapId(Integer japId) {
        this.japId = japId;
    }

    public Integer getJapHsId() {
        return japHsId;
    }

    public void setJapHsId(Integer japHsId) {
        this.japHsId = japHsId;
    }

    public Integer getJapPopId() {
        return japPopId;
    }

    public void setJapPopId(Integer japPopId) {
        this.japPopId = japPopId;
    }

    public Integer getJapUserId() {
        return japUserId;
    }

    public void setJapUserId(Integer japUserId) {
        this.japUserId = japUserId;
    }

    public String getJapAntDeviceId() {
        return japAntDeviceId;
    }

    public void setJapAntDeviceId(String japAntDeviceId) {
        this.japAntDeviceId = japAntDeviceId == null ? null : japAntDeviceId.trim();
    }

    public String getJapPasswordId() {
        return japPasswordId;
    }

    public void setJapPasswordId(String japPasswordId) {
        this.japPasswordId = japPasswordId == null ? null : japPasswordId.trim();
    }

    public String getJapOperationFlowId() {
        return japOperationFlowId;
    }

    public void setJapOperationFlowId(String japOperationFlowId) {
        this.japOperationFlowId = japOperationFlowId == null ? null : japOperationFlowId.trim();
    }

    public String getJapOperationStatus() {
        return japOperationStatus;
    }

    public void setJapOperationStatus(String japOperationStatus) {
        this.japOperationStatus = japOperationStatus == null ? null : japOperationStatus.trim();
    }

    public String getJapPasswordStatus() {
        return japPasswordStatus;
    }

    public void setJapPasswordStatus(String japPasswordStatus) {
        this.japPasswordStatus = japPasswordStatus == null ? null : japPasswordStatus.trim();
    }

    public String getJapPasswordType() {
        return japPasswordType;
    }

    public void setJapPasswordType(String japPasswordType) {
        this.japPasswordType = japPasswordType == null ? null : japPasswordType.trim();
    }

    public String getJapStartTime() {
        return japStartTime;
    }

    public void setJapStartTime(String japStartTime) {
        this.japStartTime = japStartTime == null ? null : japStartTime.trim();
    }

    public String getJapEndTime() {
        return japEndTime;
    }

    public void setJapEndTime(String japEndTime) {
        this.japEndTime = japEndTime == null ? null : japEndTime.trim();
    }

    public String getJapRegistrationTime() {
        return japRegistrationTime;
    }

    public void setJapRegistrationTime(String japRegistrationTime) {
        this.japRegistrationTime = japRegistrationTime == null ? null : japRegistrationTime.trim();
    }
}