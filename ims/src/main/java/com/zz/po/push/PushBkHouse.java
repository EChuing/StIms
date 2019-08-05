package com.zz.po.push;

public class PushBkHouse {
    private Integer pbhId;
    
    private Integer pbhHsId;

    private String pbhHouseId;

    private String pbhHouseAddress;
    
    private String pbhRentType;

    private String pbhGmtCreate;

    private String pbhGmtModified;

    private String pbhDetail;
    
    private String pbhApi;
    
    private String pbhImgPath;
    
    private String pbhImgNum;
    
    private String att;

    public String getPbhRentType() {
        return pbhRentType;
    }

    public void setPbhRentType(String pbhRentType) {
        this.pbhRentType = pbhRentType;
    }

    public String getAtt() {
        return att;
    }

    public void setAtt(String att) {
        this.att = att;
    }

    public Integer getPbhHsId() {
        return pbhHsId;
    }

    public void setPbhHsId(Integer pbhHsId) {
        this.pbhHsId = pbhHsId;
    }

    public String getPbhImgPath() {
        return pbhImgPath;
    }

    public void setPbhImgPath(String pbhImgPath) {
        this.pbhImgPath = pbhImgPath;
    }

    public String getPbhImgNum() {
        return pbhImgNum;
    }

    public void setPbhImgNum(String pbhImgNum) {
        this.pbhImgNum = pbhImgNum;
    }

    public String getPbhApi() {
        return pbhApi;
    }

    public void setPbhApi(String pbhApi) {
        this.pbhApi = pbhApi;
    }

    public Integer getPbhId() {
        return pbhId;
    }

    public void setPbhId(Integer pbhId) {
        this.pbhId = pbhId;
    }

    public String getPbhHouseId() {
        return pbhHouseId;
    }

    public void setPbhHouseId(String pbhHouseId) {
        this.pbhHouseId = pbhHouseId;
    }

    public String getPbhHouseAddress() {
        return pbhHouseAddress;
    }

    public void setPbhHouseAddress(String pbhHouseAddress) {
        this.pbhHouseAddress = pbhHouseAddress == null ? null : pbhHouseAddress.trim();
    }

    public String getPbhGmtCreate() {
        return pbhGmtCreate;
    }

    public void setPbhGmtCreate(String pbhGmtCreate) {
        this.pbhGmtCreate = pbhGmtCreate == null ? null : pbhGmtCreate.trim();
    }

    public String getPbhGmtModified() {
        return pbhGmtModified;
    }

    public void setPbhGmtModified(String pbhGmtModified) {
        this.pbhGmtModified = pbhGmtModified == null ? null : pbhGmtModified.trim();
    }

    public String getPbhDetail() {
        return pbhDetail;
    }

    public void setPbhDetail(String pbhDetail) {
        this.pbhDetail = pbhDetail == null ? null : pbhDetail.trim();
    }
}