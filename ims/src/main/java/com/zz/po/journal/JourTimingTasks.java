package com.zz.po.journal;

public class JourTimingTasks {
    private Integer jttId;

    private String jttTaskName;

    private String jttClassRoom;

    private String jttStartTime;

    private String jttEndTime;

    private String jttWeeklyChoices;

    private String jttTaskContent;

    private String jttTaskStatus;

    private String splitFlag;//分页查询标识

    private String totalNum;//数据总条数

    private String startNum;//开始查询位置

    private String endNum;//查询条数

    public String getSplitFlag() {
        return splitFlag;
    }

    public void setSplitFlag(String splitFlag) {
        this.splitFlag = splitFlag;
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

    public Integer getJttId() {
        return jttId;
    }

    public void setJttId(Integer jttId) {
        this.jttId = jttId;
    }

    public String getJttTaskName() {
        return jttTaskName;
    }

    public void setJttTaskName(String jttTaskName) {
        this.jttTaskName = jttTaskName;
    }

    public String getJttClassRoom() {
        return jttClassRoom;
    }

    public void setJttClassRoom(String jttClassRoom) {
        this.jttClassRoom = jttClassRoom;
    }

    public String getJttStartTime() {
        return jttStartTime;
    }

    public void setJttStartTime(String jttStartTime) {
        this.jttStartTime = jttStartTime;
    }

    public String getJttEndTime() {
        return jttEndTime;
    }

    public void setJttEndTime(String jttEndTime) {
        this.jttEndTime = jttEndTime;
    }

    public String getJttWeeklyChoices() {
        return jttWeeklyChoices;
    }

    public void setJttWeeklyChoices(String jttWeeklyChoices) {
        this.jttWeeklyChoices = jttWeeklyChoices;
    }

    public String getJttTaskContent() {
        return jttTaskContent;
    }

    public void setJttTaskContent(String jttTaskContent) {
        this.jttTaskContent = jttTaskContent;
    }


    public String getJttTaskStatus() {
        return jttTaskStatus;
    }

    public void setJttTaskStatus(String jttTaskStatus) {
        this.jttTaskStatus = jttTaskStatus;
    }

    @Override
    public String toString() {
        return "JourTimingTasks{" +
                "jttId=" + jttId +
                ", jttTaskName='" + jttTaskName + '\'' +
                ", jttClassRoom='" + jttClassRoom + '\'' +
                ", jttStartTime='" + jttStartTime + '\'' +
                ", jttEndTime='" + jttEndTime + '\'' +
                ", jttWeeklyChoices='" + jttWeeklyChoices + '\'' +
                ", jttTaskContent='" + jttTaskContent + '\'' +
                ", jttTaskStatus='" + jttTaskStatus + '\'' +
                ", splitFlag='" + splitFlag + '\'' +
                ", totalNum='" + totalNum + '\'' +
                ", startNum='" + startNum + '\'' +
                ", endNum='" + endNum + '\'' +
                '}';
    }
}
