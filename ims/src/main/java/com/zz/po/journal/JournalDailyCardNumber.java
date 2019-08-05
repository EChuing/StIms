package com.zz.po.journal;

/**
 * 日用卡号管理
 */
public class JournalDailyCardNumber {
    private Integer jdcnId;

    private Integer jdcnHouse4storeId;

    private String jdcnCardNumber;

    private String jdcnCardName;

    private String jdcnBelongingToPeople;

    private String jdcnIdCard;

    private String jdcnTelephone;

    private String jdcnBankCard;

    private String jdcnBankName;

    private String jdcnRemarks;

    private String jdcnRecordTime;
    
    private String jdcnMeterNumber;
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private String addProvince;
	private String addCity;
	private String addDistrict;
	private String addZone;
	private String addStreet;
	private String addCommunity;
	private String addBuilding;
	private String addDoorplateno;
	
	private String followUpContent;
	private Integer jhfHouse4rentId;
	private Integer jhfDepartment;
	private Integer jhfStorefront;
	private Integer jhfUserId;
	private String loginUserName;
	private Integer jhfHouseId;
	
    public Integer getJhfHouseId() {
		return jhfHouseId;
	}

	public void setJhfHouseId(Integer jhfHouseId) {
		this.jhfHouseId = jhfHouseId;
	}

	public String getLoginUserName() {
		return loginUserName;
	}

	public void setLoginUserName(String loginUserName) {
		this.loginUserName = loginUserName;
	}

	public Integer getJhfHouse4rentId() {
		return jhfHouse4rentId;
	}

	public void setJhfHouse4rentId(Integer jhfHouse4rentId) {
		this.jhfHouse4rentId = jhfHouse4rentId;
	}

	public Integer getJhfDepartment() {
		return jhfDepartment;
	}

	public void setJhfDepartment(Integer jhfDepartment) {
		this.jhfDepartment = jhfDepartment;
	}

	public Integer getJhfStorefront() {
		return jhfStorefront;
	}

	public void setJhfStorefront(Integer jhfStorefront) {
		this.jhfStorefront = jhfStorefront;
	}

	public Integer getJhfUserId() {
		return jhfUserId;
	}

	public void setJhfUserId(Integer jhfUserId) {
		this.jhfUserId = jhfUserId;
	}

	public String getFollowUpContent() {
		return followUpContent;
	}

	public void setFollowUpContent(String followUpContent) {
		this.followUpContent = followUpContent;
	}

	public String getJdcnMeterNumber() {
		return jdcnMeterNumber;
	}

	public void setJdcnMeterNumber(String jdcnMeterNumber) {
		this.jdcnMeterNumber = jdcnMeterNumber;
	}

	public String getAddProvince() {
		return addProvince;
	}

	public void setAddProvince(String addProvince) {
		this.addProvince = addProvince;
	}

	public String getAddCity() {
		return addCity;
	}

	public void setAddCity(String addCity) {
		this.addCity = addCity;
	}

	public String getAddDistrict() {
		return addDistrict;
	}

	public void setAddDistrict(String addDistrict) {
		this.addDistrict = addDistrict;
	}

	public String getAddZone() {
		return addZone;
	}

	public void setAddZone(String addZone) {
		this.addZone = addZone;
	}

	public String getAddStreet() {
		return addStreet;
	}

	public void setAddStreet(String addStreet) {
		this.addStreet = addStreet;
	}

	public String getAddCommunity() {
		return addCommunity;
	}

	public void setAddCommunity(String addCommunity) {
		this.addCommunity = addCommunity;
	}

	public String getAddBuilding() {
		return addBuilding;
	}

	public void setAddBuilding(String addBuilding) {
		this.addBuilding = addBuilding;
	}

	public String getAddDoorplateno() {
		return addDoorplateno;
	}

	public void setAddDoorplateno(String addDoorplateno) {
		this.addDoorplateno = addDoorplateno;
	}

	public String getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
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

	public String getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(String totalPage) {
		this.totalPage = totalPage;
	}

	public Integer getJdcnId() {
        return jdcnId;
    }

    public void setJdcnId(Integer jdcnId) {
        this.jdcnId = jdcnId;
    }

    public Integer getJdcnHouse4storeId() {
        return jdcnHouse4storeId;
    }

    public void setJdcnHouse4storeId(Integer jdcnHouse4storeId) {
        this.jdcnHouse4storeId = jdcnHouse4storeId;
    }

    public String getJdcnCardNumber() {
        return jdcnCardNumber;
    }

    public void setJdcnCardNumber(String jdcnCardNumber) {
        this.jdcnCardNumber = jdcnCardNumber == null ? null : jdcnCardNumber.trim();
    }

    public String getJdcnCardName() {
        return jdcnCardName;
    }

    public void setJdcnCardName(String jdcnCardName) {
        this.jdcnCardName = jdcnCardName == null ? null : jdcnCardName.trim();
    }

    public String getJdcnBelongingToPeople() {
        return jdcnBelongingToPeople;
    }

    public void setJdcnBelongingToPeople(String jdcnBelongingToPeople) {
        this.jdcnBelongingToPeople = jdcnBelongingToPeople == null ? null : jdcnBelongingToPeople.trim();
    }

    public String getJdcnIdCard() {
        return jdcnIdCard;
    }

    public void setJdcnIdCard(String jdcnIdCard) {
        this.jdcnIdCard = jdcnIdCard == null ? null : jdcnIdCard.trim();
    }

    public String getJdcnTelephone() {
        return jdcnTelephone;
    }

    public void setJdcnTelephone(String jdcnTelephone) {
        this.jdcnTelephone = jdcnTelephone == null ? null : jdcnTelephone.trim();
    }

    public String getJdcnBankCard() {
        return jdcnBankCard;
    }

    public void setJdcnBankCard(String jdcnBankCard) {
        this.jdcnBankCard = jdcnBankCard == null ? null : jdcnBankCard.trim();
    }

    public String getJdcnBankName() {
        return jdcnBankName;
    }

    public void setJdcnBankName(String jdcnBankName) {
        this.jdcnBankName = jdcnBankName == null ? null : jdcnBankName.trim();
    }

    public String getJdcnRemarks() {
        return jdcnRemarks;
    }

    public void setJdcnRemarks(String jdcnRemarks) {
        this.jdcnRemarks = jdcnRemarks == null ? null : jdcnRemarks.trim();
    }

    public String getJdcnRecordTime() {
        return (jdcnRecordTime != null && jdcnRecordTime.length() > 19) ? jdcnRecordTime.substring(0,19) : jdcnRecordTime;
    }

    public void setJdcnRecordTime(String jdcnRecordTime) {
        this.jdcnRecordTime = jdcnRecordTime == null ? null : jdcnRecordTime.trim();
    }

	@Override
	public String toString() {
		return "JournalDailyCardNumber [jdcnId=" + jdcnId + ", jdcnHouse4storeId=" + jdcnHouse4storeId
				+ ", jdcnCardNumber=" + jdcnCardNumber + ", jdcnCardName=" + jdcnCardName + ", jdcnBelongingToPeople="
				+ jdcnBelongingToPeople + ", jdcnIdCard=" + jdcnIdCard + ", jdcnTelephone=" + jdcnTelephone
				+ ", jdcnBankCard=" + jdcnBankCard + ", jdcnBankName=" + jdcnBankName + ", jdcnRemarks=" + jdcnRemarks
				+ ", jdcnRecordTime=" + jdcnRecordTime + ", jdcnMeterNumber=" + jdcnMeterNumber + ", pageNumber="
				+ pageNumber + ", startNum=" + startNum + ", endNum=" + endNum + ", totalNum=" + totalNum
				+ ", totalPage=" + totalPage + ", addProvince=" + addProvince + ", addCity=" + addCity
				+ ", addDistrict=" + addDistrict + ", addZone=" + addZone + ", addStreet=" + addStreet
				+ ", addCommunity=" + addCommunity + ", addBuilding=" + addBuilding + ", addDoorplateno="
				+ addDoorplateno + ", followUpContent=" + followUpContent + ", jhfHouse4rentId=" + jhfHouse4rentId
				+ ", jhfDepartment=" + jhfDepartment + ", jhfStorefront=" + jhfStorefront + ", jhfUserId=" + jhfUserId
				+ ", loginUserName=" + loginUserName + "]";
	}
}