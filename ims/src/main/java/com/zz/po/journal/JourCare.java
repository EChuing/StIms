package com.zz.po.journal;

public class JourCare {
    private Integer jcId;

    private String jcSendingTime;

    private String jcCaringContent;

    private String jcUsername;

    private Integer jcCaringMode;

    private String jcRegisterTime;

    private String jcCustomerId;

    private String startNum;

    private String endNum;

    private String totalNum;

    private String username;

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getJcId() {
        return jcId;
    }

    public void setJcId(Integer jcId) {
        this.jcId = jcId;
    }

    public String getJcSendingTime() {
        return jcSendingTime;
    }

    public void setJcSendingTime(String jcSendingTime) {
        this.jcSendingTime = jcSendingTime;
    }

    public String getJcCaringContent() {
        return jcCaringContent;
    }

    public void setJcCaringContent(String jcCaringContent) {
        this.jcCaringContent = jcCaringContent == null ? null : jcCaringContent.trim();
    }

    public String getJcUsername() {
        return jcUsername;
    }

    public void setJcUsername(String jcUsername) {
        this.jcUsername = jcUsername == null ? null : jcUsername.trim();
    }

    public Integer getJcCaringMode() {
        return jcCaringMode;
    }

    public void setJcCaringMode(Integer jcCaringMode) {
        this.jcCaringMode = jcCaringMode;
    }

    public String getJcRegisterTime() {
        return jcRegisterTime;
    }

    public void setJcRegisterTime(String jcRegisterTime) {
        this.jcRegisterTime = jcRegisterTime == null ? null : jcRegisterTime.trim();
    }

    public String getJcCustomerId() {
        return jcCustomerId;
    }

    public void setJcCustomerId(String jcCustomerId) {
        this.jcCustomerId = jcCustomerId == null ? null : jcCustomerId.trim();
    }
}