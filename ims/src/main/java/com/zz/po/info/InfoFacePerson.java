package com.zz.po.info;

public class InfoFacePerson {
    private Integer ifpId;

    private String ifpName;

    private Integer ifpPopId;

    private String ifpGuid;

    private String ifpCardno;

    private String ifpTag;

    private String ifpPhone;

    private String ifpCreateTime;

    private String ifpPath;
    private String guidPhoto;
    
    private Integer popId;

    public Integer getPopId() {
		return popId;
	}

	public void setPopId(Integer popId) {
		this.popId = popId;
	}

	public String getGuidPhoto() {
        return guidPhoto;
    }

    public void setGuidPhoto(String guidPhoto) {
        this.guidPhoto = guidPhoto;
    }

    public Integer getIfpId() {
        return ifpId;
    }

    public void setIfpId(Integer ifpId) {
        this.ifpId = ifpId;
    }

    public String getIfpName() {
        return ifpName;
    }

    public void setIfpName(String ifpName) {
        this.ifpName = ifpName == null ? null : ifpName.trim();
    }

    public Integer getIfpPopId() {
        return ifpPopId;
    }

    public void setIfpPopId(Integer ifpPopId) {
        this.ifpPopId = ifpPopId;
    }

    public String getIfpGuid() {
        return ifpGuid;
    }

    public void setIfpGuid(String ifpGuid) {
        this.ifpGuid = ifpGuid == null ? null : ifpGuid.trim();
    }

    public String getIfpCardno() {
        return ifpCardno;
    }

    public void setIfpCardno(String ifpCardno) {
        this.ifpCardno = ifpCardno == null ? null : ifpCardno.trim();
    }

    public String getIfpTag() {
        return ifpTag;
    }

    public void setIfpTag(String ifpTag) {
        this.ifpTag = ifpTag == null ? null : ifpTag.trim();
    }

    public String getIfpPhone() {
        return ifpPhone;
    }

    public void setIfpPhone(String ifpPhone) {
        this.ifpPhone = ifpPhone == null ? null : ifpPhone.trim();
    }

    public String getIfpCreateTime() {
        return ifpCreateTime;
    }

    public void setIfpCreateTime(String ifpCreateTime) {
        this.ifpCreateTime = ifpCreateTime == null ? null : ifpCreateTime.trim();
    }

    public String getIfpPath() {
        return ifpPath;
    }

    public void setIfpPath(String ifpPath) {
        this.ifpPath = ifpPath == null ? null : ifpPath.trim();
    }


	
}