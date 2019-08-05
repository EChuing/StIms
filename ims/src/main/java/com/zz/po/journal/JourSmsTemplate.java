package com.zz.po.journal;

public class JourSmsTemplate {
    private Integer jstId;

    private String jstTitle;

    private String jstContent;

    private Integer jstSort;

    private String jstTime;

    public Integer getJstId() {
        return jstId;
    }

    public void setJstId(Integer jstId) {
        this.jstId = jstId;
    }

    public String getJstTitle() {
        return jstTitle;
    }

    public void setJstTitle(String jstTitle) {
        this.jstTitle = jstTitle == null ? null : jstTitle.trim();
    }

    public String getJstContent() {
        return jstContent;
    }

    public void setJstContent(String jstContent) {
        this.jstContent = jstContent == null ? null : jstContent.trim();
    }

    public Integer getJstSort() {
        return jstSort;
    }

    public void setJstSort(Integer jstSort) {
        this.jstSort = jstSort;
    }

    public String getJstTime() {
        return jstTime;
    }

    public void setJstTime(String jstTime) {
        this.jstTime = jstTime == null ? null : jstTime.trim();
    }
}