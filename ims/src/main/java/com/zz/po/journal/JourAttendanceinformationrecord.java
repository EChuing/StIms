package com.zz.po.journal;

public class JourAttendanceinformationrecord {
    private Integer jairId;

    private Integer jairUserId;

    private String jairTime;

    public Integer getJairId() {
        return jairId;
    }

    public void setJairId(Integer jairId) {
        this.jairId = jairId;
    }

    public Integer getJairUserId() {
        return jairUserId;
    }

    public void setJairUserId(Integer jairUserId) {
        this.jairUserId = jairUserId;
    }

    public String getJairTime() {
        return jairTime;
    }

    public void setJairTime(String jairTime) {
        this.jairTime = jairTime == null ? null : jairTime.trim();
    }
}