package com.zz.po.push;

public class Push58Layout {
    private Integer p5lId;

    private String p5lApartmentId;

    private String p5lLayoutId;
    
    private String p5lLayoutName;

    private String p5lGmtCreate;

    private String p5lGmtModified;

    private String p5lDetail;
    
    private String startNum;
    
    private String endNum;
    
    private String totalNum;

    public String getP5lLayoutName() {
        return p5lLayoutName;
    }

    public void setP5lLayoutName(String p5lLayoutName) {
        this.p5lLayoutName = p5lLayoutName;
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

    public Integer getP5lId() {
        return p5lId;
    }

    public void setP5lId(Integer p5lId) {
        this.p5lId = p5lId;
    }

    public String getP5lApartmentId() {
        return p5lApartmentId;
    }

    public void setP5lApartmentId(String p5lApartmentId) {
        this.p5lApartmentId = p5lApartmentId == null ? null : p5lApartmentId.trim();
    }

    public String getP5lLayoutId() {
        return p5lLayoutId;
    }

    public void setP5lLayoutId(String p5lLayoutId) {
        this.p5lLayoutId = p5lLayoutId == null ? null : p5lLayoutId.trim();
    }

    public String getP5lGmtCreate() {
        return p5lGmtCreate;
    }

    public void setP5lGmtCreate(String p5lGmtCreate) {
        this.p5lGmtCreate = p5lGmtCreate == null ? null : p5lGmtCreate.trim();
    }

    public String getP5lGmtModified() {
        return p5lGmtModified;
    }

    public void setP5lGmtModified(String p5lGmtModified) {
        this.p5lGmtModified = p5lGmtModified == null ? null : p5lGmtModified.trim();
    }

    public String getP5lDetail() {
        return p5lDetail;
    }

    public void setP5lDetail(String p5lDetail) {
        this.p5lDetail = p5lDetail == null ? null : p5lDetail.trim();
    }
}