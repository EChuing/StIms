package com.zz.po.push;

public class Push58Unit {
    private Integer p5uId;

    private Integer p5uHsId;

    private String p5uHouseType;

    private String p5uGmtCreate;

    private String p5uGmtModified;

    private String p5uDetail;

    public Integer getP5uId() {
        return p5uId;
    }

    public void setP5uId(Integer p5uId) {
        this.p5uId = p5uId;
    }

    public Integer getP5uHsId() {
        return p5uHsId;
    }

    public void setP5uHsId(Integer p5uHsId) {
        this.p5uHsId = p5uHsId;
    }

    public String getP5uHouseType() {
        return p5uHouseType;
    }

    public void setP5uHouseType(String p5uHouseType) {
        this.p5uHouseType = p5uHouseType == null ? null : p5uHouseType.trim();
    }

    public String getP5uGmtCreate() {
        return p5uGmtCreate;
    }

    public void setP5uGmtCreate(String p5uGmtCreate) {
        this.p5uGmtCreate = p5uGmtCreate == null ? null : p5uGmtCreate.trim();
    }

    public String getP5uGmtModified() {
        return p5uGmtModified;
    }

    public void setP5uGmtModified(String p5uGmtModified) {
        this.p5uGmtModified = p5uGmtModified == null ? null : p5uGmtModified.trim();
    }

    public String getP5uDetail() {
        return p5uDetail;
    }

    public void setP5uDetail(String p5uDetail) {
        this.p5uDetail = p5uDetail == null ? null : p5uDetail.trim();
    }
}