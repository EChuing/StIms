package com.zz.po.cs;


public class CsGoodsPurchase {
    private Integer cgpId;

    private Integer cgpOperatorId;

    private Integer cgpSupplierId;

    private String cgpNumbers;

    private Double cgpTotalMoney;

    private String cgpRegistrationTime;

    private String cgpGoodsJson;
    
    private String suStaffName;
    
    private String supplierName;
    
    private String startNum;
	private String endNum;
	private String totalNum;
	private String splitFlag;
	
	private String startTime;
	private String endTime;
	
	private String totalPurchaseMoney;
	
    
    public String getTotalPurchaseMoney() {
		return totalPurchaseMoney;
	}

	public void setTotalPurchaseMoney(String totalPurchaseMoney) {
		this.totalPurchaseMoney = totalPurchaseMoney;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
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

	public String getSplitFlag() {
		return splitFlag;
	}

	public void setSplitFlag(String splitFlag) {
		this.splitFlag = splitFlag;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getSuStaffName() {
		return suStaffName;
	}

	public void setSuStaffName(String suStaffName) {
		this.suStaffName = suStaffName;
	}

	public Integer getCgpId() {
        return cgpId;
    }

    public void setCgpId(Integer cgpId) {
        this.cgpId = cgpId;
    }

    public Integer getCgpOperatorId() {
        return cgpOperatorId;
    }

    public void setCgpOperatorId(Integer cgpOperatorId) {
        this.cgpOperatorId = cgpOperatorId;
    }

    public Integer getCgpSupplierId() {
        return cgpSupplierId;
    }

    public void setCgpSupplierId(Integer cgpSupplierId) {
        this.cgpSupplierId = cgpSupplierId;
    }

    public String getCgpNumbers() {
        return cgpNumbers;
    }

    public void setCgpNumbers(String cgpNumbers) {
        this.cgpNumbers = cgpNumbers == null ? null : cgpNumbers.trim();
    }

    public Double getCgpTotalMoney() {
        return cgpTotalMoney;
    }

    public void setCgpTotalMoney(Double cgpTotalMoney) {
        this.cgpTotalMoney = cgpTotalMoney;
    }

    public String getCgpRegistrationTime() {
        return (cgpRegistrationTime != null && cgpRegistrationTime.length() > 19) ? cgpRegistrationTime.substring(0,19) : cgpRegistrationTime;
    }

    public void setCgpRegistrationTime(String cgpRegistrationTime) {
        this.cgpRegistrationTime = cgpRegistrationTime == null ? null : cgpRegistrationTime.trim();
    }

    public String getCgpGoodsJson() {
        return cgpGoodsJson;
    }

    public void setCgpGoodsJson(String cgpGoodsJson) {
        this.cgpGoodsJson = cgpGoodsJson == null ? null : cgpGoodsJson.trim();
    }
}