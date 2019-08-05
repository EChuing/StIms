package com.zz.po.journal;

public class JourGateLockRecord {
    private Integer jglrId;

    private Integer jglrBrandId;

    private String jglrDeviceType;

    private String jglrSn;

    private String jglrRecordType;

    private String jglrContent;

    private Integer jglrPopId;

    private Integer jglrUserId;

    private String jglrTime;

    private String startNum;

    private String endNum;

    private String totalNum;

    private String suName;

    private String popName;

    public String getSuName() {
        return suName;
    }

    public void setSuName(String suName) {
        this.suName = suName;
    }

    public String getPopName() {
        return popName;
    }

    public void setPopName(String popName) {
        this.popName = popName;
    }

    public String getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(String totalNum) {
        this.totalNum = totalNum;
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

    public Integer getJglrId() {
        return jglrId;
    }

    public void setJglrId(Integer jglrId) {
        this.jglrId = jglrId;
    }

    public Integer getJglrBrandId() {
        return jglrBrandId;
    }

    public void setJglrBrandId(Integer jglrBrandId) {
        this.jglrBrandId = jglrBrandId;
    }

    public String getJglrDeviceType() {
        return jglrDeviceType;
    }

    public void setJglrDeviceType(String jglrDeviceType) {
        this.jglrDeviceType = jglrDeviceType == null ? null : jglrDeviceType.trim();
    }

    public String getJglrSn() {
        return jglrSn;
    }

    public void setJglrSn(String jglrSn) {
        this.jglrSn = jglrSn == null ? null : jglrSn.trim();
    }

    public String getJglrRecordType() {
        return jglrRecordType;
    }

    public void setJglrRecordType(String jglrRecordType) {
        this.jglrRecordType = jglrRecordType == null ? null : jglrRecordType.trim();
    }

    public String getJglrContent() {
        return jglrContent;
    }

    public void setJglrContent(String jglrContent) {
        this.jglrContent = jglrContent == null ? null : jglrContent.trim();
    }

    public Integer getJglrPopId() {
        return jglrPopId;
    }

    public void setJglrPopId(Integer jglrPopId) {
        this.jglrPopId = jglrPopId;
    }

    public Integer getJglrUserId() {
        return jglrUserId;
    }

    public void setJglrUserId(Integer jglrUserId) {
        this.jglrUserId = jglrUserId;
    }

    public String getJglrTime() {
        return jglrTime;
    }

    public void setJglrTime(String jglrTime) {
        this.jglrTime = jglrTime == null ? null : jglrTime.trim();
    }
}