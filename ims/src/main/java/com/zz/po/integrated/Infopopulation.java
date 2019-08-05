package com.zz.po.integrated;

public class Infopopulation extends InfoRenewalLand{
    private Integer popId;

    private Integer popUser;

    private Integer popInnerCreditLevel;

    private Integer popOuterCreditLevel;

    private Integer popLandlord;

    private Integer popRenter;

    private Integer popResident;

    private String popName;

    private String popTelephone;

    private String popIdcard;

    private String popRegistrationTime;
    
    private String wxOpenid;

    public String getWxOpenid() {
		return wxOpenid;
	}

	public void setWxOpenid(String wxOpenid) {
		this.wxOpenid = wxOpenid;
	}

	public Integer getPopId() {
        return popId;
    }

    public void setPopId(Integer popId) {
        this.popId = popId;
    }

    public Integer getPopUser() {
        return popUser;
    }

    public void setPopUser(Integer popUser) {
        this.popUser = popUser;
    }

    public Integer getPopInnerCreditLevel() {
        return popInnerCreditLevel;
    }

    public void setPopInnerCreditLevel(Integer popInnerCreditLevel) {
        this.popInnerCreditLevel = popInnerCreditLevel;
    }

    public Integer getPopOuterCreditLevel() {
        return popOuterCreditLevel;
    }

    public void setPopOuterCreditLevel(Integer popOuterCreditLevel) {
        this.popOuterCreditLevel = popOuterCreditLevel;
    }

    public Integer getPopLandlord() {
        return popLandlord;
    }

    public void setPopLandlord(Integer popLandlord) {
        this.popLandlord = popLandlord;
    }

    public Integer getPopRenter() {
        return popRenter;
    }

    public void setPopRenter(Integer popRenter) {
        this.popRenter = popRenter;
    }

    public Integer getPopResident() {
        return popResident;
    }

    public void setPopResident(Integer popResident) {
        this.popResident = popResident;
    }

    public String getPopName() {
        return popName;
    }

    public void setPopName(String popName) {
        this.popName = popName == null ? null : popName.trim();
    }

    public String getPopTelephone() {
        return popTelephone;
    }

    public void setPopTelephone(String popTelephone) {
        this.popTelephone = popTelephone == null ? null : popTelephone.trim();
    }

    public String getPopIdcard() {
        return popIdcard;
    }

    public void setPopIdcard(String popIdcard) {
        this.popIdcard = popIdcard == null ? null : popIdcard.trim();
    }

    public String getPopRegistrationTime() {
        return popRegistrationTime;
    }

    public void setPopRegistrationTime(String popRegistrationTime) {
        this.popRegistrationTime = popRegistrationTime == null ? null : popRegistrationTime.trim();
    }
}