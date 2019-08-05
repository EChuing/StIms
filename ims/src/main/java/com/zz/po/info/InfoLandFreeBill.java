package com.zz.po.info;

/**
 * 免租期账单表
 */
public class InfoLandFreeBill {
    private Integer ilfbId;

    private Integer ilfbStoreId;

    private Integer ilfbLandId;

    private String ilfbName;

    private String ilfbTel;

    private String ilfbMonth;

    private String ilfbTime;

    private String addCity;
    private String addDistrict;
    private String addZone;
    private String addStreet;
    private String addCommunity;
    private String addBuilding;
    private String addDoorplateno;
    private Integer hsId;

	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private Integer year;
    private Integer month;
    private Integer popId;
	
	public Integer getPopId() {
		return popId;
	}

	public void setPopId(Integer popId) {
		this.popId = popId;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Integer getIlfbId() {
        return ilfbId;
    }

    public void setIlfbId(Integer ilfbId) {
        this.ilfbId = ilfbId;
    }

    public Integer getIlfbStoreId() {
        return ilfbStoreId;
    }

    public void setIlfbStoreId(Integer ilfbStoreId) {
        this.ilfbStoreId = ilfbStoreId;
    }

    public Integer getIlfbLandId() {
        return ilfbLandId;
    }

    public void setIlfbLandId(Integer ilfbLandId) {
        this.ilfbLandId = ilfbLandId;
    }

    public String getIlfbName() {
        return ilfbName;
    }

    public void setIlfbName(String ilfbName) {
        this.ilfbName = ilfbName == null ? null : ilfbName.trim();
    }

    public String getIlfbTel() {
        return ilfbTel;
    }

    public void setIlfbTel(String ilfbTel) {
        this.ilfbTel = ilfbTel == null ? null : ilfbTel.trim();
    }

    public String getIlfbMonth() {
        return ilfbMonth;
    }

    public void setIlfbMonth(String ilfbMonth) {
        this.ilfbMonth = ilfbMonth == null ? null : ilfbMonth.trim();
    }

    public String getIlfbTime() {
        return (ilfbTime != null && ilfbTime.length() > 19) ? ilfbTime.substring(0,19) : ilfbTime;
    }

    public void setIlfbTime(String ilfbTime) {
        this.ilfbTime = ilfbTime == null ? null : ilfbTime.trim();
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

	public Integer getHsId() {
		return hsId;
	}

	public void setHsId(Integer hsId) {
		this.hsId = hsId;
	}
}