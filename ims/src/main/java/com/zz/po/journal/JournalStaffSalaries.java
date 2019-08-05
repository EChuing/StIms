package com.zz.po.journal;

/**
 * 用户工资表
 */
public class JournalStaffSalaries {
    private Integer ssaId;

    private Integer ssaRegisterPeople;

    private Integer ssaEmployeeId;

    private Integer ssaDepartment;

    private Integer ssaStorefront;

    private Double ssaBasicSalary;

    private Double ssaPayForPerformance;

    private Double ssaRealWages;

    private Double ssaSalaryShouldBeMade;

    private Double ssaRealWageEarnings;

    private Double ssaShouldThePostDays;

    private Double ssaNumberOfDays;

    private Double ssaDeductionOfWages;

    private Double ssaWageLosses;

    private Double ssaSocialSecurity;

    private Double ssaLodging;

    private Double ssaOthers;

    private Double ssaSalary;

    private String ssaPaymentStatus;

    private String ssaMonthlySalary;

    private String ssaPaymentTime;

    private String ssaRegisterTime;

    private String ssaState;

    private String ssaRemark;
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private String ssaMonth;
	private String staffname;
	private String departmentname;
	private String storefrontname;
	private String endTime;
	private String startTime;

    public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getStaffname() {
		return staffname;
	}

	public void setStaffname(String staffname) {
		this.staffname = staffname;
	}

	public String getDepartmentname() {
		return departmentname;
	}

	public void setDepartmentname(String departmentname) {
		this.departmentname = departmentname;
	}

	public String getStorefrontname() {
		return storefrontname;
	}

	public void setStorefrontname(String storefrontname) {
		this.storefrontname = storefrontname;
	}

	public String getSsaMonth() {
		return ssaMonth;
	}

	public void setSsaMonth(String ssaMonth) {
		this.ssaMonth = ssaMonth;
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

	public Integer getSsaId() {
        return ssaId;
    }

    public void setSsaId(Integer ssaId) {
        this.ssaId = ssaId;
    }

    public Integer getSsaRegisterPeople() {
        return ssaRegisterPeople;
    }

    public void setSsaRegisterPeople(Integer ssaRegisterPeople) {
        this.ssaRegisterPeople = ssaRegisterPeople;
    }

    public Integer getSsaEmployeeId() {
        return ssaEmployeeId;
    }

    public void setSsaEmployeeId(Integer ssaEmployeeId) {
        this.ssaEmployeeId = ssaEmployeeId;
    }

    public Integer getSsaDepartment() {
        return ssaDepartment;
    }

    public void setSsaDepartment(Integer ssaDepartment) {
        this.ssaDepartment = ssaDepartment;
    }

    public Integer getSsaStorefront() {
        return ssaStorefront;
    }

    public void setSsaStorefront(Integer ssaStorefront) {
        this.ssaStorefront = ssaStorefront;
    }

    public Double getSsaBasicSalary() {
        return ssaBasicSalary;
    }

    public void setSsaBasicSalary(Double ssaBasicSalary) {
        this.ssaBasicSalary = ssaBasicSalary;
    }

    public Double getSsaPayForPerformance() {
        return ssaPayForPerformance;
    }

    public void setSsaPayForPerformance(Double ssaPayForPerformance) {
        this.ssaPayForPerformance = ssaPayForPerformance;
    }

    public Double getSsaRealWages() {
        return ssaRealWages;
    }

    public void setSsaRealWages(Double ssaRealWages) {
        this.ssaRealWages = ssaRealWages;
    }

    public Double getSsaSalaryShouldBeMade() {
        return ssaSalaryShouldBeMade;
    }

    public void setSsaSalaryShouldBeMade(Double ssaSalaryShouldBeMade) {
        this.ssaSalaryShouldBeMade = ssaSalaryShouldBeMade;
    }

    public Double getSsaRealWageEarnings() {
        return ssaRealWageEarnings;
    }

    public void setSsaRealWageEarnings(Double ssaRealWageEarnings) {
        this.ssaRealWageEarnings = ssaRealWageEarnings;
    }

    public Double getSsaShouldThePostDays() {
        return ssaShouldThePostDays;
    }

    public void setSsaShouldThePostDays(Double ssaShouldThePostDays) {
        this.ssaShouldThePostDays = ssaShouldThePostDays;
    }

    public Double getSsaNumberOfDays() {
        return ssaNumberOfDays;
    }

    public void setSsaNumberOfDays(Double ssaNumberOfDays) {
        this.ssaNumberOfDays = ssaNumberOfDays;
    }

    public Double getSsaDeductionOfWages() {
        return ssaDeductionOfWages;
    }

    public void setSsaDeductionOfWages(Double ssaDeductionOfWages) {
        this.ssaDeductionOfWages = ssaDeductionOfWages;
    }

    public Double getSsaWageLosses() {
        return ssaWageLosses;
    }

    public void setSsaWageLosses(Double ssaWageLosses) {
        this.ssaWageLosses = ssaWageLosses;
    }

    public Double getSsaSocialSecurity() {
        return ssaSocialSecurity;
    }

    public void setSsaSocialSecurity(Double ssaSocialSecurity) {
        this.ssaSocialSecurity = ssaSocialSecurity;
    }

    public Double getSsaLodging() {
        return ssaLodging;
    }

    public void setSsaLodging(Double ssaLodging) {
        this.ssaLodging = ssaLodging;
    }

    public Double getSsaOthers() {
        return ssaOthers;
    }

    public void setSsaOthers(Double ssaOthers) {
        this.ssaOthers = ssaOthers;
    }

    public Double getSsaSalary() {
        return ssaSalary;
    }

    public void setSsaSalary(Double ssaSalary) {
        this.ssaSalary = ssaSalary;
    }

    public String getSsaPaymentStatus() {
        return ssaPaymentStatus;
    }

    public void setSsaPaymentStatus(String ssaPaymentStatus) {
        this.ssaPaymentStatus = ssaPaymentStatus == null ? null : ssaPaymentStatus.trim();
    }

    public String getSsaMonthlySalary() {
        return ssaMonthlySalary;
    }

    public void setSsaMonthlySalary(String ssaMonthlySalary) {
        this.ssaMonthlySalary = ssaMonthlySalary == null ? null : ssaMonthlySalary.trim();
    }

    public String getSsaPaymentTime() {
        return ssaPaymentTime;
    }

    public void setSsaPaymentTime(String ssaPaymentTime) {
        this.ssaPaymentTime = ssaPaymentTime == null ? null : ssaPaymentTime.trim();
    }

    public String getSsaRegisterTime() {
        return (ssaRegisterTime != null && ssaRegisterTime.length() > 19) ? ssaRegisterTime.substring(0,19) : ssaRegisterTime;
    }

    public void setSsaRegisterTime(String ssaRegisterTime) {
        this.ssaRegisterTime = ssaRegisterTime == null ? null : ssaRegisterTime.trim();
    }

    public String getSsaState() {
        return ssaState;
    }

    public void setSsaState(String ssaState) {
        this.ssaState = ssaState == null ? null : ssaState.trim();
    }

    public String getSsaRemark() {
        return ssaRemark;
    }

    public void setSsaRemark(String ssaRemark) {
        this.ssaRemark = ssaRemark == null ? null : ssaRemark.trim();
    }
}