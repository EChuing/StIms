package com.zz.po.push;

public class Push58Apartment {
    private Integer p5aId;

    private String p5aApartmentId;
    
    private String p5aApartmentName;

    private String p5aGmtCreate;

    private String p5aGmtModified;

    private String p5aDetail;
    
    private String pid;
    
    private String startNum;
    
    private String endNum;
    
    private String totalNum;

    public String getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(String totalNum) {
        this.totalNum = totalNum;
    }

    public String getP5aApartmentName() {
        return p5aApartmentName;
    }

    public void setP5aApartmentName(String p5aApartmentName) {
        this.p5aApartmentName = p5aApartmentName;
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

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public Integer getP5aId() {
        return p5aId;
    }

    public void setP5aId(Integer p5aId) {
        this.p5aId = p5aId;
    }

    public String getP5aApartmentId() {
        return p5aApartmentId;
    }

    public void setP5aApartmentId(String p5aApartmentId) {
        this.p5aApartmentId = p5aApartmentId == null ? null : p5aApartmentId.trim();
    }

    public String getP5aGmtCreate() {
        return p5aGmtCreate;
    }

    public void setP5aGmtCreate(String p5aGmtCreate) {
        this.p5aGmtCreate = p5aGmtCreate == null ? null : p5aGmtCreate.trim();
    }

    public String getP5aGmtModified() {
        return p5aGmtModified;
    }

    public void setP5aGmtModified(String p5aGmtModified) {
        this.p5aGmtModified = p5aGmtModified == null ? null : p5aGmtModified.trim();
    }

    public String getP5aDetail() {
        return p5aDetail;
    }

    public void setP5aDetail(String p5aDetail) {
        this.p5aDetail = p5aDetail == null ? null : p5aDetail.trim();
    }
}