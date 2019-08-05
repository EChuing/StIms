package com.zz.po.sys;

/**
 * 超级系统公司内部表
 */
public class SysSystemSetting {
    private Integer ssitId;

    private String ssitShortMessageInterface;

    private Double ssitSmsUnitPrice;

    private Double ssitSmsAccountBalance;

    private String ssitRegistrationTime;

    private String ssitModificationTime;
    
    private String ssitIdentification;
    
    private String ssitPassword;
    
    private String ssitWechatPublicNumber;
    
    private String ssit58HouseAppid;
    
    private String ssit58RoomAppid;

    private String ssitBkAppId;

    private String ssitBkAppKey;

    private String ssitBkUserName;

    private String ssitBkPassword;

    private String ssitBkAccessToken;

    private String gzhAccessToken;

    private String gzhTokenLastTime;

    public String getSsitBkAppId() {
        return ssitBkAppId;
    }

    public void setSsitBkAppId(String ssitBkAppId) {
        this.ssitBkAppId = ssitBkAppId;
    }

    public String getSsitBkAppKey() {
        return ssitBkAppKey;
    }

    public void setSsitBkAppKey(String ssitBkAppKey) {
        this.ssitBkAppKey = ssitBkAppKey;
    }

    public String getSsitBkUserName() {
        return ssitBkUserName;
    }

    public void setSsitBkUserName(String ssitBkUserName) {
        this.ssitBkUserName = ssitBkUserName;
    }

    public String getSsitBkPassword() {
        return ssitBkPassword;
    }

    public void setSsitBkPassword(String ssitBkPassword) {
        this.ssitBkPassword = ssitBkPassword;
    }

    public String getSsitBkAccessToken() {
        return ssitBkAccessToken;
    }

    public void setSsitBkAccessToken(String ssitBkAccessToken) {
        this.ssitBkAccessToken = ssitBkAccessToken;
    }

    public String getSsit58HouseAppid() {
        return ssit58HouseAppid;
    }

    public void setSsit58HouseAppid(String ssit58HouseAppid) {
        this.ssit58HouseAppid = ssit58HouseAppid;
    }

    public String getSsit58RoomAppid() {
        return ssit58RoomAppid;
    }

    public void setSsit58RoomAppid(String ssit58RoomAppid) {
        this.ssit58RoomAppid = ssit58RoomAppid;
    }

    public String getSsitWechatPublicNumber() {
		return ssitWechatPublicNumber;
	}

	public void setSsitWechatPublicNumber(String ssitWechatPublicNumber) {
		this.ssitWechatPublicNumber = ssitWechatPublicNumber;
	}

	public String getSsitPassword() {
		return ssitPassword;
	}

	public void setSsitPassword(String ssitPassword) {
		this.ssitPassword = ssitPassword;
	}

	public String getSsitIdentification() {
		return ssitIdentification;
	}

	public void setSsitIdentification(String ssitIdentification) {
		this.ssitIdentification = ssitIdentification;
	}

	public Integer getSsitId() {
        return ssitId;
    }

    public void setSsitId(Integer ssitId) {
        this.ssitId = ssitId;
    }

    public String getSsitShortMessageInterface() {
        return ssitShortMessageInterface;
    }

    public void setSsitShortMessageInterface(String ssitShortMessageInterface) {
        this.ssitShortMessageInterface = ssitShortMessageInterface == null ? null : ssitShortMessageInterface.trim();
    }

    public Double getSsitSmsUnitPrice() {
        return ssitSmsUnitPrice;
    }

    public void setSsitSmsUnitPrice(Double ssitSmsUnitPrice) {
        this.ssitSmsUnitPrice = ssitSmsUnitPrice;
    }

    public Double getSsitSmsAccountBalance() {
        return ssitSmsAccountBalance;
    }

    public void setSsitSmsAccountBalance(Double ssitSmsAccountBalance) {
        this.ssitSmsAccountBalance = ssitSmsAccountBalance;
    }

    public String getSsitRegistrationTime() {
        return (ssitRegistrationTime != null && ssitRegistrationTime.length() > 19) ? ssitRegistrationTime.substring(0,19) : ssitRegistrationTime;
    }

    public void setSsitRegistrationTime(String ssitRegistrationTime) {
        this.ssitRegistrationTime = ssitRegistrationTime == null ? null : ssitRegistrationTime.trim();
    }

    public String getSsitModificationTime() {
        return ssitModificationTime;
    }

    public void setSsitModificationTime(String ssitModificationTime) {
        this.ssitModificationTime = ssitModificationTime == null ? null : ssitModificationTime.trim();
    }

    public String getGzhAccessToken() {
        return gzhAccessToken;
    }

    public void setGzhAccessToken(String gzhAccessToken) {
        this.gzhAccessToken = gzhAccessToken;
    }

    public String getGzhTokenLastTime() {
        return gzhTokenLastTime;
    }

    public void setGzhTokenLastTime(String gzhTokenLastTime) {
        this.gzhTokenLastTime = gzhTokenLastTime;
    }
}