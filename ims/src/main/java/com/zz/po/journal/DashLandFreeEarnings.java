package com.zz.po.journal;

/**
 * 免租收益表
 */
public class DashLandFreeEarnings {
    private Integer dlfeId;

    private String dlfeThisYearFreeDays;

    private String dlfeThisYearEarnings;

    private String dlfeNextYearFreeDays;

    private String dlfeNextYearEarnings;

    private String dlfeTime;

    public Integer getDlfeId() {
        return dlfeId;
    }

    public void setDlfeId(Integer dlfeId) {
        this.dlfeId = dlfeId;
    }

    public String getDlfeThisYearFreeDays() {
        return dlfeThisYearFreeDays;
    }

    public void setDlfeThisYearFreeDays(String dlfeThisYearFreeDays) {
        this.dlfeThisYearFreeDays = dlfeThisYearFreeDays == null ? null : dlfeThisYearFreeDays.trim();
    }

    public String getDlfeThisYearEarnings() {
        return dlfeThisYearEarnings;
    }

    public void setDlfeThisYearEarnings(String dlfeThisYearEarnings) {
        this.dlfeThisYearEarnings = dlfeThisYearEarnings == null ? null : dlfeThisYearEarnings.trim();
    }

    public String getDlfeNextYearFreeDays() {
        return dlfeNextYearFreeDays;
    }

    public void setDlfeNextYearFreeDays(String dlfeNextYearFreeDays) {
        this.dlfeNextYearFreeDays = dlfeNextYearFreeDays == null ? null : dlfeNextYearFreeDays.trim();
    }

    public String getDlfeNextYearEarnings() {
        return dlfeNextYearEarnings;
    }

    public void setDlfeNextYearEarnings(String dlfeNextYearEarnings) {
        this.dlfeNextYearEarnings = dlfeNextYearEarnings == null ? null : dlfeNextYearEarnings.trim();
    }

    public String getDlfeTime() {
        return dlfeTime;
    }

    public void setDlfeTime(String dlfeTime) {
        this.dlfeTime = dlfeTime == null ? null : dlfeTime.trim();
    }
}