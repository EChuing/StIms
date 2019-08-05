package com.zz.po.journal;

/**
 * 业绩明细表
 */
public class JournalPerfDetail {
    private Integer jpdId;

    private Integer jpdUserId;

    private String jpdUserName;

    private String jpdPerfType;

    private String jpdAsstType;

    private Double jpdAsstPro;

    private Integer jpdRentId;

    private Integer jpdStoreId;

    private String jpdAddress;

    private Integer jpdFreeDays;

    private Double jpdFreeMoney;

    private Integer jpdVacantDays;

    private Double jpdVacantMoney;

    private Double jpdTenantRent;

    private Double jpdLandlordRent;

    private Double jpdComm;

    private Double jpdFurn;

    private Double jpdClean;

    private Double jpdDiff;

    private Double jpdPeriod;

    private Double jpdLosses;

    private Double jpdGains;

    private Double jpdDeposit;

    private Double jpdSum;

    private String jpdTime;

    private String jpdRemarks;

    public Integer getJpdId() {
        return jpdId;
    }

    public void setJpdId(Integer jpdId) {
        this.jpdId = jpdId;
    }

    public Integer getJpdUserId() {
        return jpdUserId;
    }

    public void setJpdUserId(Integer jpdUserId) {
        this.jpdUserId = jpdUserId;
    }

    public String getJpdUserName() {
        return jpdUserName;
    }

    public void setJpdUserName(String jpdUserName) {
        this.jpdUserName = jpdUserName == null ? null : jpdUserName.trim();
    }

    public String getJpdPerfType() {
        return jpdPerfType;
    }

    public void setJpdPerfType(String jpdPerfType) {
        this.jpdPerfType = jpdPerfType == null ? null : jpdPerfType.trim();
    }

    public String getJpdAsstType() {
        return jpdAsstType;
    }

    public void setJpdAsstType(String jpdAsstType) {
        this.jpdAsstType = jpdAsstType == null ? null : jpdAsstType.trim();
    }

    public Double getJpdAsstPro() {
        return jpdAsstPro;
    }

    public void setJpdAsstPro(Double jpdAsstPro) {
        this.jpdAsstPro = jpdAsstPro;
    }

    public Integer getJpdRentId() {
        return jpdRentId;
    }

    public void setJpdRentId(Integer jpdRentId) {
        this.jpdRentId = jpdRentId;
    }

    public Integer getJpdStoreId() {
        return jpdStoreId;
    }

    public void setJpdStoreId(Integer jpdStoreId) {
        this.jpdStoreId = jpdStoreId;
    }

    public String getJpdAddress() {
        return jpdAddress;
    }

    public void setJpdAddress(String jpdAddress) {
        this.jpdAddress = jpdAddress == null ? null : jpdAddress.trim();
    }

    public Integer getJpdFreeDays() {
        return jpdFreeDays;
    }

    public void setJpdFreeDays(Integer jpdFreeDays) {
        this.jpdFreeDays = jpdFreeDays;
    }

    public Double getJpdFreeMoney() {
        return jpdFreeMoney;
    }

    public void setJpdFreeMoney(Double jpdFreeMoney) {
        this.jpdFreeMoney = jpdFreeMoney;
    }

    public Integer getJpdVacantDays() {
        return jpdVacantDays;
    }

    public void setJpdVacantDays(Integer jpdVacantDays) {
        this.jpdVacantDays = jpdVacantDays;
    }

    public Double getJpdVacantMoney() {
        return jpdVacantMoney;
    }

    public void setJpdVacantMoney(Double jpdVacantMoney) {
        this.jpdVacantMoney = jpdVacantMoney;
    }

    public Double getJpdTenantRent() {
        return jpdTenantRent;
    }

    public void setJpdTenantRent(Double jpdTenantRent) {
        this.jpdTenantRent = jpdTenantRent;
    }

    public Double getJpdLandlordRent() {
        return jpdLandlordRent;
    }

    public void setJpdLandlordRent(Double jpdLandlordRent) {
        this.jpdLandlordRent = jpdLandlordRent;
    }

    public Double getJpdComm() {
        return jpdComm;
    }

    public void setJpdComm(Double jpdComm) {
        this.jpdComm = jpdComm;
    }

    public Double getJpdFurn() {
        return jpdFurn;
    }

    public void setJpdFurn(Double jpdFurn) {
        this.jpdFurn = jpdFurn;
    }

    public Double getJpdClean() {
        return jpdClean;
    }

    public void setJpdClean(Double jpdClean) {
        this.jpdClean = jpdClean;
    }

    public Double getJpdDiff() {
        return jpdDiff;
    }

    public void setJpdDiff(Double jpdDiff) {
        this.jpdDiff = jpdDiff;
    }

    public Double getJpdPeriod() {
        return jpdPeriod;
    }

    public void setJpdPeriod(Double jpdPeriod) {
        this.jpdPeriod = jpdPeriod;
    }

    public Double getJpdLosses() {
        return jpdLosses;
    }

    public void setJpdLosses(Double jpdLosses) {
        this.jpdLosses = jpdLosses;
    }

    public Double getJpdGains() {
        return jpdGains;
    }

    public void setJpdGains(Double jpdGains) {
        this.jpdGains = jpdGains;
    }

    public Double getJpdDeposit() {
        return jpdDeposit;
    }

    public void setJpdDeposit(Double jpdDeposit) {
        this.jpdDeposit = jpdDeposit;
    }

    public Double getJpdSum() {
        return jpdSum;
    }

    public void setJpdSum(Double jpdSum) {
        this.jpdSum = jpdSum;
    }

    public String getJpdTime() {
        return (jpdTime != null && jpdTime.length() > 19) ? jpdTime.substring(0,19) : jpdTime;
    }

    public void setJpdTime(String jpdTime) {
        this.jpdTime = jpdTime == null ? null : jpdTime.trim();
    }

    public String getJpdRemarks() {
        return jpdRemarks;
    }

    public void setJpdRemarks(String jpdRemarks) {
        this.jpdRemarks = jpdRemarks == null ? null : jpdRemarks.trim();
    }
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	private String startDate;
	private String endDate;

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

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	
}