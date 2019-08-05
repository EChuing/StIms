package com.zz.po.push;

public class PushBkHouseStatus {
    private Integer pbhsId;

    private String pbhsHouseId;

    private String pbhsHouseType;

    private String pbhsAuditStatus;

    private String pbhsOnoffStatus;

    private String pbhsProblemStatus;

    private String pbhsGmtCreate;

    private String pbhsDetail;

    public Integer getPbhsId() {
        return pbhsId;
    }

    public void setPbhsId(Integer pbhsId) {
        this.pbhsId = pbhsId;
    }

    public String getPbhsHouseId() {
        return pbhsHouseId;
    }

    public void setPbhsHouseId(String pbhsHouseId) {
        this.pbhsHouseId = pbhsHouseId == null ? null : pbhsHouseId.trim();
    }

    public String getPbhsHouseType() {
        return pbhsHouseType;
    }

    public void setPbhsHouseType(String pbhsHouseType) {
        this.pbhsHouseType = pbhsHouseType == null ? null : pbhsHouseType.trim();
    }

    public String getPbhsAuditStatus() {
        return pbhsAuditStatus;
    }

    public void setPbhsAuditStatus(String pbhsAuditStatus) {
        this.pbhsAuditStatus = pbhsAuditStatus == null ? null : pbhsAuditStatus.trim();
    }

    public String getPbhsOnoffStatus() {
        return pbhsOnoffStatus;
    }

    public void setPbhsOnoffStatus(String pbhsOnoffStatus) {
        this.pbhsOnoffStatus = pbhsOnoffStatus == null ? null : pbhsOnoffStatus.trim();
    }

    public String getPbhsProblemStatus() {
        return pbhsProblemStatus;
    }

    public void setPbhsProblemStatus(String pbhsProblemStatus) {
        this.pbhsProblemStatus = pbhsProblemStatus == null ? null : pbhsProblemStatus.trim();
    }

    public String getPbhsGmtCreate() {
        return pbhsGmtCreate;
    }

    public void setPbhsGmtCreate(String pbhsGmtCreate) {
        this.pbhsGmtCreate = pbhsGmtCreate == null ? null : pbhsGmtCreate.trim();
    }

    public String getPbhsDetail() {
        return pbhsDetail;
    }

    public void setPbhsDetail(String pbhsDetail) {
        this.pbhsDetail = pbhsDetail == null ? null : pbhsDetail.trim();
    }
}