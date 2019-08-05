package com.zz.po.journal;

public class JourEwsFollow {
    private Integer id;

    private Integer jourId;

    private String jourProTime;

    private String jourProUserName;

    private String jourProMark;

    private String startNum;

    private String endNum;

    private Integer totalNum;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getJourId() {
        return jourId;
    }

    public void setJourId(Integer jourId) {
        this.jourId = jourId;
    }

    public String getJourProTime() {
        return jourProTime;
    }

    public void setJourProTime(String jourProTime) {
        this.jourProTime = jourProTime == null ? null : jourProTime.trim();
    }

    public String getJourProUserName() {
        return jourProUserName;
    }

    public void setJourProUserName(String jourProUserName) {
        this.jourProUserName = jourProUserName == null ? null : jourProUserName.trim();
    }

    public String getJourProMark() {
        return jourProMark;
    }

    public void setJourProMark(String jourProMark) {
        this.jourProMark = jourProMark == null ? null : jourProMark.trim();
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

    public Integer getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(Integer totalNum) {
        this.totalNum = totalNum;
    }

    @Override
    public String toString() {
        return "JourEwsFollow{" +
                "id=" + id +
                ", jourId=" + jourId +
                ", jourProTime='" + jourProTime + '\'' +
                ", jourProUserName='" + jourProUserName + '\'' +
                ", jourProMark='" + jourProMark + '\'' +
                '}';
    }
}