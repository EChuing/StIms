package com.zz.po.push;

public class PushBkUnit {
    private Integer pbuId;

    private Integer pbuHsId;

    private String pbuHouseType;

    private String pbuGmtCreate;

    private String pbuGmtModified;

    private String pbuDetail;

    public Integer getPbuId() {
        return pbuId;
    }

    public void setPbuId(Integer pbuId) {
        this.pbuId = pbuId;
    }

    public Integer getPbuHsId() {
        return pbuHsId;
    }

    public void setPbuHsId(Integer pbuHsId) {
        this.pbuHsId = pbuHsId;
    }

    public String getPbuHouseType() {
        return pbuHouseType;
    }

    public void setPbuHouseType(String pbuHouseType) {
        this.pbuHouseType = pbuHouseType == null ? null : pbuHouseType.trim();
    }

    public String getPbuGmtCreate() {
        return pbuGmtCreate;
    }

    public void setPbuGmtCreate(String pbuGmtCreate) {
        this.pbuGmtCreate = pbuGmtCreate == null ? null : pbuGmtCreate.trim();
    }

    public String getPbuGmtModified() {
        return pbuGmtModified;
    }

    public void setPbuGmtModified(String pbuGmtModified) {
        this.pbuGmtModified = pbuGmtModified == null ? null : pbuGmtModified.trim();
    }

    public String getPbuDetail() {
        return pbuDetail;
    }

    public void setPbuDetail(String pbuDetail) {
        this.pbuDetail = pbuDetail == null ? null : pbuDetail.trim();
    }
}