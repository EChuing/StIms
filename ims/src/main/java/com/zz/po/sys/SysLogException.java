package com.zz.po.sys;

public class SysLogException {
    private Long sleId;

    private String sleServer;

    private String sleTime;

    private String sleContent;

    public Long getSleId() {
        return sleId;
    }

    public void setSleId(Long sleId) {
        this.sleId = sleId;
    }

    public String getSleServer() {
        return sleServer;
    }

    public void setSleServer(String sleServer) {
        this.sleServer = sleServer == null ? null : sleServer.trim();
    }

    public String getSleTime() {
        return sleTime;
    }

    public void setSleTime(String sleTime) {
        this.sleTime = sleTime == null ? null : sleTime.trim();
    }

    public String getSleContent() {
        return sleContent;
    }

    public void setSleContent(String sleContent) {
        this.sleContent = sleContent == null ? null : sleContent.trim();
    }
}