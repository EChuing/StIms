package com.zz.po.journal;

public class JourUnlockRecord {
    private Integer jurId;

    private String jurOpenPeople;

    private Integer jurDeviceId;

    private String jurOpenType;

    private String jurResult;

    private String jurOpenTime;

    private String startNum;

    private String endNum;

    private String totalNum;

    private String hsAddDoorplateno;

    private String hsAddBuilding;

    private String hsAddCommunity;

    private String devNickname;

    public String getHsAddDoorplateno() {
        return hsAddDoorplateno;
    }

    public void setHsAddDoorplateno(String hsAddDoorplateno) {
        this.hsAddDoorplateno = hsAddDoorplateno;
    }

    public String getHsAddBuilding() {
        return hsAddBuilding;
    }

    public void setHsAddBuilding(String hsAddBuilding) {
        this.hsAddBuilding = hsAddBuilding;
    }

    public String getHsAddCommunity() {
        return hsAddCommunity;
    }

    public void setHsAddCommunity(String hsAddCommunity) {
        this.hsAddCommunity = hsAddCommunity;
    }

    public String getDevNickname() {
        return devNickname;
    }

    public void setDevNickname(String devNickname) {
        this.devNickname = devNickname;
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

    public Integer getJurId() {
        return jurId;
    }

    public void setJurId(Integer jurId) {
        this.jurId = jurId;
    }

    public String getJurOpenPeople() {
        return jurOpenPeople;
    }

    public void setJurOpenPeople(String jurOpenPeople) {
        this.jurOpenPeople = jurOpenPeople == null ? null : jurOpenPeople.trim();
    }

    public Integer getJurDeviceId() {
        return jurDeviceId;
    }

    public void setJurDeviceId(Integer jurDeviceId) {
        this.jurDeviceId = jurDeviceId;
    }

    public String getJurOpenType() {
        return jurOpenType;
    }

    public void setJurOpenType(String jurOpenType) {
        this.jurOpenType = jurOpenType == null ? null : jurOpenType.trim();
    }

    public String getJurResult() {
        return jurResult;
    }

    public void setJurResult(String jurResult) {
        this.jurResult = jurResult == null ? null : jurResult.trim();
    }

    public String getJurOpenTime() {
        return jurOpenTime;
    }

    public void setJurOpenTime(String jurOpenTime) {
        this.jurOpenTime = jurOpenTime == null ? null : jurOpenTime.trim();
    }

    @Override
    public String toString() {
        return "JourUnlockRecord{" +
                "jurId=" + jurId +
                ", jurOpenPeople='" + jurOpenPeople + '\'' +
                ", jurDeviceId=" + jurDeviceId +
                ", jurOpenType='" + jurOpenType + '\'' +
                ", jurResult='" + jurResult + '\'' +
                ", jurOpenTime='" + jurOpenTime + '\'' +
                ", startNum='" + startNum + '\'' +
                ", endNum='" + endNum + '\'' +
                ", totalNum='" + totalNum + '\'' +
                ", hsAddDoorplateno='" + hsAddDoorplateno + '\'' +
                ", hsAddBuilding='" + hsAddBuilding + '\'' +
                ", hsAddCommunity='" + hsAddCommunity + '\'' +
                ", devNickname='" + devNickname + '\'' +
                '}';
    }
}