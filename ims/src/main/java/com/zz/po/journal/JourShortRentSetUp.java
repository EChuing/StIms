package com.zz.po.journal;

import java.util.List;

public class JourShortRentSetUp {
    private Integer jsrsuId;

    private String jsrsuWxgzhTitle;

    private Byte jsrsuState;

    private String jsrsuCheckInTime;

    private String jsrsuCheckOutTime;
    
    private String jsrsuTelphone;

    private String jsrsuRegisterTime;

    private String jsrsuAdImgs;
    
    private String jsrsuRoomType;
    
    private String jsrsuServiceCharge;
    
    private String att;
    
    private String jsrsuTradingRules;
    
    private String jsrsuHourRoom;	
    
    private Integer jsrsuShopAccount;
    
    private Integer jsrsuCashAccount;
    
    private Integer jsrsuDepositRules;
    
    private Integer jsrsuRoomChargePercent;
    
    private Integer jsrsuRefundRoomCharge;
    
    private String jsrsuRefundRoomChargeTime;
    
    private String jsrsuGrogshopIntroduce;
    
    private String jsrsuDepositSetType;

    private Integer jsrsuLongestBookingDays;

    private Integer jsrsuFutureBookingDays;
    
    private String jsrsuElectronicDoorplateno;

    private String jsrsuTmPassword;
    
    private Integer jsrrtpId;
    private String jsrrtpPlanPackage;
    private Integer jsrrtpPlanNumber;
    
    private List<Integer> jsrrtpPlanNumberList;
    private String jsonArray;

	public String getJsrsuTmPassword() {
		return jsrsuTmPassword;
	}

	public void setJsrsuTmPassword(String jsrsuTmPassword) {
		this.jsrsuTmPassword = jsrsuTmPassword;
	}

	public String getJsrsuElectronicDoorplateno() {
		return jsrsuElectronicDoorplateno;
	}

	public void setJsrsuElectronicDoorplateno(String jsrsuElectronicDoorplateno) {
		this.jsrsuElectronicDoorplateno = jsrsuElectronicDoorplateno;
	}

	public List<Integer> getJsrrtpPlanNumberList() {
		return jsrrtpPlanNumberList;
	}

	public void setJsrrtpPlanNumberList(List<Integer> jsrrtpPlanNumberList) {
		this.jsrrtpPlanNumberList = jsrrtpPlanNumberList;
	}

	public Integer getJsrrtpPlanNumber() {
		return jsrrtpPlanNumber;
	}

	public void setJsrrtpPlanNumber(Integer jsrrtpPlanNumber) {
		this.jsrrtpPlanNumber = jsrrtpPlanNumber;
	}

	public String getJsrrtpPlanPackage() {
		return jsrrtpPlanPackage;
	}

	public void setJsrrtpPlanPackage(String jsrrtpPlanPackage) {
		this.jsrrtpPlanPackage = jsrrtpPlanPackage;
	}

	public Integer getJsrrtpId() {
		return jsrrtpId;
	}

	public void setJsrrtpId(Integer jsrrtpId) {
		this.jsrrtpId = jsrrtpId;
	}

	public String getJsonArray() {
		return jsonArray;
	}

	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}

	public Integer getJsrsuLongestBookingDays() {
		return jsrsuLongestBookingDays;
	}

	public void setJsrsuLongestBookingDays(Integer jsrsuLongestBookingDays) {
		this.jsrsuLongestBookingDays = jsrsuLongestBookingDays;
	}

	public Integer getJsrsuFutureBookingDays() {
		return jsrsuFutureBookingDays;
	}

	public void setJsrsuFutureBookingDays(Integer jsrsuFutureBookingDays) {
		this.jsrsuFutureBookingDays = jsrsuFutureBookingDays;
	}

	public String getJsrsuDepositSetType() {
		return jsrsuDepositSetType;
	}

	public void setJsrsuDepositSetType(String jsrsuDepositSetType) {
		this.jsrsuDepositSetType = jsrsuDepositSetType;
	}
    
	public String getJsrsuGrogshopIntroduce() {
		return jsrsuGrogshopIntroduce;
	}

	public void setJsrsuGrogshopIntroduce(String jsrsuGrogshopIntroduce) {
		this.jsrsuGrogshopIntroduce = jsrsuGrogshopIntroduce;
	}

	public String getJsrsuRefundRoomChargeTime() {
		return jsrsuRefundRoomChargeTime;
	}

	public void setJsrsuRefundRoomChargeTime(String jsrsuRefundRoomChargeTime) {
		this.jsrsuRefundRoomChargeTime = jsrsuRefundRoomChargeTime;
	}

	public Integer getJsrsuRefundRoomCharge() {
		return jsrsuRefundRoomCharge;
	}

	public void setJsrsuRefundRoomCharge(Integer jsrsuRefundRoomCharge) {
		this.jsrsuRefundRoomCharge = jsrsuRefundRoomCharge;
	}

	public String getJsrsuTelphone() {
		return jsrsuTelphone;
	}

	public Integer getJsrsuRoomChargePercent() {
		return jsrsuRoomChargePercent;
	}

	public void setJsrsuRoomChargePercent(Integer jsrsuRoomChargePercent) {
		this.jsrsuRoomChargePercent = jsrsuRoomChargePercent;
	}

	public void setJsrsuTelphone(String jsrsuTelphone) {
		this.jsrsuTelphone = jsrsuTelphone;
	}

	public String getAtt() {
		return att;
	}

	public void setAtt(String att) {
		this.att = att;
	}

	public Integer getJsrsuId() {
        return jsrsuId;
    }

    public void setJsrsuId(Integer jsrsuId) {
        this.jsrsuId = jsrsuId;
    }

    public String getJsrsuWxgzhTitle() {
        return jsrsuWxgzhTitle;
    }

    public void setJsrsuWxgzhTitle(String jsrsuWxgzhTitle) {
        this.jsrsuWxgzhTitle = jsrsuWxgzhTitle == null ? null : jsrsuWxgzhTitle.trim();
    }

    public Byte getJsrsuState() {
        return jsrsuState;
    }

    public void setJsrsuState(Byte jsrsuState) {
        this.jsrsuState = jsrsuState;
    }

    public String getJsrsuCheckInTime() {
        return jsrsuCheckInTime;
    }

    public void setJsrsuCheckInTime(String jsrsuCheckInTime) {
        this.jsrsuCheckInTime = jsrsuCheckInTime == null ? null : jsrsuCheckInTime.trim();
    }

    public String getJsrsuCheckOutTime() {
        return jsrsuCheckOutTime;
    }

    public void setJsrsuCheckOutTime(String jsrsuCheckOutTime) {
        this.jsrsuCheckOutTime = jsrsuCheckOutTime == null ? null : jsrsuCheckOutTime.trim();
    }

    public String getJsrsuRegisterTime() {
        return jsrsuRegisterTime;
    }

    public void setJsrsuRegisterTime(String jsrsuRegisterTime) {
        this.jsrsuRegisterTime = jsrsuRegisterTime == null ? null : jsrsuRegisterTime.trim();
    }

    public String getJsrsuAdImgs() {
        return jsrsuAdImgs;
    }

    public void setJsrsuAdImgs(String jsrsuAdImgs) {
        this.jsrsuAdImgs = jsrsuAdImgs == null ? null : jsrsuAdImgs.trim();
    }

	public String getJsrsuRoomType() {
		return jsrsuRoomType;
	}

	public void setJsrsuRoomType(String jsrsuRoomType) {
		this.jsrsuRoomType = jsrsuRoomType;
	}

	public String getJsrsuTradingRules() {
		return jsrsuTradingRules;
	}

	public void setJsrsuTradingRules(String jsrsuTradingRules) {
		this.jsrsuTradingRules = jsrsuTradingRules;
	}

	public String getJsrsuServiceCharge() {
		return jsrsuServiceCharge;
	}

	public void setJsrsuServiceCharge(String jsrsuServiceCharge) {
		this.jsrsuServiceCharge = jsrsuServiceCharge;
	}

	public String getJsrsuHourRoom() {
		return jsrsuHourRoom;
	}

	public void setJsrsuHourRoom(String jsrsuHourRoom) {
		this.jsrsuHourRoom = jsrsuHourRoom;
	}

	public Integer getJsrsuShopAccount() {
		return jsrsuShopAccount;
	}

	public void setJsrsuShopAccount(Integer jsrsuShopAccount) {
		this.jsrsuShopAccount = jsrsuShopAccount;
	}

	public Integer getJsrsuCashAccount() {
		return jsrsuCashAccount;
	}

	public void setJsrsuCashAccount(Integer jsrsuCashAccount) {
		this.jsrsuCashAccount = jsrsuCashAccount;
	}

	public Integer getJsrsuDepositRules() {
		return jsrsuDepositRules;
	}

	public void setJsrsuDepositRules(Integer jsrsuDepositRules) {
		this.jsrsuDepositRules = jsrsuDepositRules;
	}

	@Override
	public String toString() {
		return "JourShortRentSetUp{" +
				"jsrsuId=" + jsrsuId +
				", jsrsuWxgzhTitle='" + jsrsuWxgzhTitle + '\'' +
				", jsrsuState=" + jsrsuState +
				", jsrsuCheckInTime='" + jsrsuCheckInTime + '\'' +
				", jsrsuCheckOutTime='" + jsrsuCheckOutTime + '\'' +
				", jsrsuTelphone='" + jsrsuTelphone + '\'' +
				", jsrsuRegisterTime='" + jsrsuRegisterTime + '\'' +
				", jsrsuAdImgs='" + jsrsuAdImgs + '\'' +
				", jsrsuRoomType='" + jsrsuRoomType + '\'' +
				", jsrsuServiceCharge='" + jsrsuServiceCharge + '\'' +
				", att='" + att + '\'' +
				", jsrsuTradingRules='" + jsrsuTradingRules + '\'' +
				", jsrsuHourRoom='" + jsrsuHourRoom + '\'' +
				", jsrsuShopAccount=" + jsrsuShopAccount +
				", jsrsuCashAccount=" + jsrsuCashAccount +
				", jsrsuDepositRules=" + jsrsuDepositRules +
				", jsrsuRoomChargePercent=" + jsrsuRoomChargePercent +
				", jsrsuRefundRoomCharge=" + jsrsuRefundRoomCharge +
				", jsrsuRefundRoomChargeTime='" + jsrsuRefundRoomChargeTime + '\'' +
				", jsrsuGrogshopIntroduce='" + jsrsuGrogshopIntroduce + '\'' +
				", jsrsuDepositSetType='" + jsrsuDepositSetType + '\'' +
				", jsrsuLongestBookingDays=" + jsrsuLongestBookingDays +
				", jsrsuFutureBookingDays=" + jsrsuFutureBookingDays +
				", jsrsuElectronicDoorplateno='" + jsrsuElectronicDoorplateno + '\'' +
				", jsrsuTmPassword='" + jsrsuTmPassword + '\'' +
				", jsrrtpId=" + jsrrtpId +
				", jsrrtpPlanPackage='" + jsrrtpPlanPackage + '\'' +
				", jsrrtpPlanNumber=" + jsrrtpPlanNumber +
				", jsrrtpPlanNumberList=" + jsrrtpPlanNumberList +
				", jsonArray='" + jsonArray + '\'' +
				'}';
	}

}