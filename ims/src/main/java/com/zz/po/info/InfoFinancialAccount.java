package com.zz.po.info;

/**
 * 财务账户表
 */
public class InfoFinancialAccount {
    private Integer faId;
    
    private Integer faSfrontId;

    private String faUserName;

    private String faPaymentType;

    private String faAccount;

    private String faDescribe;

    private String faBelonging;

    private String faState;
    
    private String totalNum;
    
    private String startNum;
	private String endNum;
	
	private Double faTheBalanceOf;
	private Double faTheInitialAmount;
	private Double faCalibrationAmount;
	private Integer faRank;
	
	private String jsonArray;
	
	private Double financialSummary;
	private String billingDateFrom;
	private String billingDateTo;
	private Double income;
	private Double expenditure;
	private Double strike;

	public Double getFaCalibrationAmount() {
		return faCalibrationAmount;
	}

	public void setFaCalibrationAmount(Double faCalibrationAmount) {
		this.faCalibrationAmount = faCalibrationAmount;
	}

	public Double getIncome() {
		return income;
	}

	public void setIncome(Double income) {
		this.income = income;
	}

	public Double getExpenditure() {
		return expenditure;
	}

	public void setExpenditure(Double expenditure) {
		this.expenditure = expenditure;
	}

	public Double getStrike() {
		return strike;
	}

	public void setStrike(Double strike) {
		this.strike = strike;
	}

	public String getBillingDateFrom() {
		return billingDateFrom;
	}

	public void setBillingDateFrom(String billingDateFrom) {
		this.billingDateFrom = billingDateFrom;
	}

	public String getBillingDateTo() {
		return billingDateTo;
	}

	public void setBillingDateTo(String billingDateTo) {
		this.billingDateTo = billingDateTo;
	}

	public Double getFinancialSummary() {
		return financialSummary;
	}

	public void setFinancialSummary(Double financialSummary) {
		this.financialSummary = financialSummary;
	}
	private Integer fajfId;

    public Integer getFajfId() {
		return fajfId;
	}

	public void setFajfId(Integer fajfId) {
		this.fajfId = fajfId;
	}

	public String getJsonArray() {
		return jsonArray;
	}

	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}

	public Integer getFaRank() {
		return faRank;
	}

	public void setFaRank(Integer faRank) {
		this.faRank = faRank;
	}

	public Double getFaTheBalanceOf() {
		return faTheBalanceOf;
	}

	public void setFaTheBalanceOf(Double faTheBalanceOf) {
		this.faTheBalanceOf = faTheBalanceOf;
	}

	public Double getFaTheInitialAmount() {
		return faTheInitialAmount;
	}

	public void setFaTheInitialAmount(Double faTheInitialAmount) {
		this.faTheInitialAmount = faTheInitialAmount;
	}

	public Integer getFaSfrontId() {
		return faSfrontId;
	}

	public void setFaSfrontId(Integer faSfrontId) {
		this.faSfrontId = faSfrontId;
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

	public Integer getFaId() {
        return faId;
    }

    public void setFaId(Integer faId) {
        this.faId = faId;
    }

    public String getFaUserName() {
        return faUserName;
    }

    public void setFaUserName(String faUserName) {
        this.faUserName = faUserName == null ? null : faUserName.trim();
    }

    public String getFaPaymentType() {
        return faPaymentType;
    }

    public void setFaPaymentType(String faPaymentType) {
        this.faPaymentType = faPaymentType == null ? null : faPaymentType.trim();
    }

    public String getFaAccount() {
        return faAccount;
    }

    public void setFaAccount(String faAccount) {
        this.faAccount = faAccount == null ? null : faAccount.trim();
    }

    public String getFaDescribe() {
        return faDescribe;
    }

    public void setFaDescribe(String faDescribe) {
        this.faDescribe = faDescribe == null ? null : faDescribe.trim();
    }

    public String getFaBelonging() {
        return faBelonging;
    }

    public void setFaBelonging(String faBelonging) {
        this.faBelonging = faBelonging == null ? null : faBelonging.trim();
    }

    public String getFaState() {
        return faState;
    }

    public void setFaState(String faState) {
        this.faState = faState == null ? null : faState.trim();
    }
}