package com.zz.po.journal;

/**
 * 外出登记表
 */
public class JournalGoToRegister {
    private Integer gotoId;

    private Integer gotoRentId;

    private Integer gotoStoreId;

    private Integer gotoHouseId;

    private Integer gotoUserId;

    private Integer gotoDepartmentId;

    private Integer gotoStorefrontId;

    private String gotoItemType;
    
    private String gotoAddressType;

    private String gotoOutOfTime;

    private String gotoComeBackTime;

    private String gotoNote;
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private String username;
	private String suWhetherGoOut;
	private String departmentName;
	private String storefrontName;
	
	private String addProvince;
    private String addCity;
    private String addDistrict;
    private String addZone;
    private String addStreet;
    private String addCommunity;
    private String addBuilding;
    private String addDoorplateno;
    private String keyAdministrator;
    
    private Integer goto1GetUserId;
    private Integer goto1StoreId;
    private Integer goto1DetId;
    private Integer goto2GetUserId;
    private Integer goto2StoreId;
    private Integer goto2DetId;
    private Integer ipId;
    private String ipGotoJosn;
    private String gotoPassword;
    private String ipName;
    private String ipTel;
    private String houseAddress;
    
    public String getHouseAddress() {
		return houseAddress;
	}

	public void setHouseAddress(String houseAddress) {
		this.houseAddress = houseAddress;
	}

	public String getIpTel() {
		return ipTel;
	}

	public void setIpTel(String ipTel) {
		this.ipTel = ipTel;
	}

	public String getIpName() {
		return ipName;
	}

	public void setIpName(String ipName) {
		this.ipName = ipName;
	}

	public String getGotoPassword() {
        return gotoPassword;
    }

    public void setGotoPassword(String gotoPassword) {
        this.gotoPassword = gotoPassword;
    }

    public String getIpGotoJosn() {
		return ipGotoJosn;
	}

	public void setIpGotoJosn(String ipGotoJosn) {
		this.ipGotoJosn = ipGotoJosn;
	}

	public Integer getIpId() {
		return ipId;
	}

	public void setIpId(Integer ipId) {
		this.ipId = ipId;
	}

	public Integer getGoto1GetUserId() {
		return goto1GetUserId;
	}

	public void setGoto1GetUserId(Integer goto1GetUserId) {
		this.goto1GetUserId = goto1GetUserId;
	}

	public Integer getGoto1StoreId() {
		return goto1StoreId;
	}

	public void setGoto1StoreId(Integer goto1StoreId) {
		this.goto1StoreId = goto1StoreId;
	}

	public Integer getGoto1DetId() {
		return goto1DetId;
	}

	public void setGoto1DetId(Integer goto1DetId) {
		this.goto1DetId = goto1DetId;
	}

	public Integer getGoto2GetUserId() {
		return goto2GetUserId;
	}

	public void setGoto2GetUserId(Integer goto2GetUserId) {
		this.goto2GetUserId = goto2GetUserId;
	}

	public Integer getGoto2StoreId() {
		return goto2StoreId;
	}

	public void setGoto2StoreId(Integer goto2StoreId) {
		this.goto2StoreId = goto2StoreId;
	}

	public Integer getGoto2DetId() {
		return goto2DetId;
	}

	public void setGoto2DetId(Integer goto2DetId) {
		this.goto2DetId = goto2DetId;
	}

	public String getKeyAdministrator() {
		return keyAdministrator;
	}

	public void setKeyAdministrator(String keyAdministrator) {
		this.keyAdministrator = keyAdministrator;
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

	public String getSuWhetherGoOut() {
		return suWhetherGoOut;
	}

	public void setSuWhetherGoOut(String suWhetherGoOut) {
		this.suWhetherGoOut = suWhetherGoOut;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getStorefrontName() {
		return storefrontName;
	}

	public void setStorefrontName(String storefrontName) {
		this.storefrontName = storefrontName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public Integer getGotoId() {
        return gotoId;
    }

    public void setGotoId(Integer gotoId) {
        this.gotoId = gotoId;
    }

    public Integer getGotoRentId() {
        return gotoRentId;
    }

    public void setGotoRentId(Integer gotoRentId) {
        this.gotoRentId = gotoRentId;
    }

    public Integer getGotoStoreId() {
        return gotoStoreId;
    }

    public void setGotoStoreId(Integer gotoStoreId) {
        this.gotoStoreId = gotoStoreId;
    }

    public Integer getGotoHouseId() {
        return gotoHouseId;
    }

    public void setGotoHouseId(Integer gotoHouseId) {
        this.gotoHouseId = gotoHouseId;
    }

    public Integer getGotoUserId() {
        return gotoUserId;
    }

    public void setGotoUserId(Integer gotoUserId) {
        this.gotoUserId = gotoUserId;
    }

    public Integer getGotoDepartmentId() {
        return gotoDepartmentId;
    }

    public void setGotoDepartmentId(Integer gotoDepartmentId) {
        this.gotoDepartmentId = gotoDepartmentId;
    }

    public Integer getGotoStorefrontId() {
        return gotoStorefrontId;
    }

    public void setGotoStorefrontId(Integer gotoStorefrontId) {
        this.gotoStorefrontId = gotoStorefrontId;
    }

    public String getGotoItemType() {
        return gotoItemType;
    }

    public void setGotoItemType(String gotoItemType) {
        this.gotoItemType = gotoItemType == null ? null : gotoItemType.trim();
    }

    public String getGotoOutOfTime() {
        return (gotoOutOfTime != null && gotoOutOfTime.length() > 19) ? gotoOutOfTime.substring(0,19) : gotoOutOfTime;
    }

    public void setGotoOutOfTime(String gotoOutOfTime) {
        this.gotoOutOfTime = gotoOutOfTime == null ? null : gotoOutOfTime.trim();
    }

    public String getGotoComeBackTime() {
        return gotoComeBackTime;
    }

    public void setGotoComeBackTime(String gotoComeBackTime) {
        this.gotoComeBackTime = gotoComeBackTime == null ? null : gotoComeBackTime.trim();
    }

    public String getGotoNote() {
        return gotoNote;
    }

    public void setGotoNote(String gotoNote) {
        this.gotoNote = gotoNote == null ? null : gotoNote.trim();
    }

	public String getGotoAddressType() {
		return gotoAddressType;
	}

	public void setGotoAddressType(String gotoAddressType) {
		this.gotoAddressType = gotoAddressType;
	}

	@Override
	public String toString() {
		return "JournalGoToRegister [gotoId=" + gotoId + ", gotoRentId=" + gotoRentId + ", gotoStoreId=" + gotoStoreId
				+ ", gotoHouseId=" + gotoHouseId + ", gotoUserId=" + gotoUserId + ", gotoDepartmentId="
				+ gotoDepartmentId + ", gotoStorefrontId=" + gotoStorefrontId + ", gotoItemType=" + gotoItemType
				+ ", gotoAddressType=" + gotoAddressType + ", gotoOutOfTime=" + gotoOutOfTime + ", gotoComeBackTime="
				+ gotoComeBackTime + ", gotoNote=" + gotoNote + ", pageNumber=" + pageNumber + ", startNum=" + startNum
				+ ", endNum=" + endNum + ", totalNum=" + totalNum + ", totalPage=" + totalPage + ", username="
				+ username + ", suWhetherGoOut=" + suWhetherGoOut + ", departmentName=" + departmentName
				+ ", storefrontName=" + storefrontName + ", addProvince=" + addProvince + ", addCity=" + addCity
				+ ", addDistrict=" + addDistrict + ", addZone=" + addZone + ", addStreet=" + addStreet
				+ ", addCommunity=" + addCommunity + ", addBuilding=" + addBuilding + ", addDoorplateno="
				+ addDoorplateno + ", keyAdministrator=" + keyAdministrator + ", goto1GetUserId=" + goto1GetUserId
				+ ", goto1StoreId=" + goto1StoreId + ", goto1DetId=" + goto1DetId + ", goto2GetUserId=" + goto2GetUserId
				+ ", goto2StoreId=" + goto2StoreId + ", goto2DetId=" + goto2DetId + ", ipId=" + ipId + ", ipGotoJosn="
				+ ipGotoJosn + ", gotoPassword=" + gotoPassword + ", ipName=" + ipName + ", ipTel=" + ipTel
				+ ", houseAddress=" + houseAddress + "]";
	}

    
}