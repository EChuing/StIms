package com.zz.po.journal;

/**
 * 维修回访表
 */
public class JournalRepairReturning {
    private Integer retId;

    private Integer retRepairId;

    private Integer retUserId;

    private Integer retViolationPeople;

    private String retTime;

    private String retResult;

    private String retServiceAttitude;

    private String retCompleteQuality;

    private String retViolationShopping;

    private String retViolationGetpay;

    private String retViolationRegulation;

    private Double retShouldFine;

    private Double retActuallyFine;

    private String rteRemark;
    
    private Integer department;
    private Integer storefront;

    public Integer getDepartment() {
		return department;
	}

	public void setDepartment(Integer department) {
		this.department = department;
	}

	public Integer getStorefront() {
		return storefront;
	}

	public void setStorefront(Integer storefront) {
		this.storefront = storefront;
	}

	public Integer getRetId() {
        return retId;
    }

    public void setRetId(Integer retId) {
        this.retId = retId;
    }

    public Integer getRetRepairId() {
        return retRepairId;
    }

    public void setRetRepairId(Integer retRepairId) {
        this.retRepairId = retRepairId;
    }
    

    public Integer getRetUserId() {
		return retUserId;
	}

	public void setRetUserId(Integer retUserId) {
		this.retUserId = retUserId;
	}

	public Integer getRetViolationPeople() {
		return retViolationPeople;
	}

	public void setRetViolationPeople(Integer retViolationPeople) {
		this.retViolationPeople = retViolationPeople;
	}

	public String getRetTime() {
        return retTime;
    }

    public void setRetTime(String retTime) {
        this.retTime = retTime == null ? null : retTime.trim();
    }

    public String getRetResult() {
        return retResult;
    }

    public void setRetResult(String retResult) {
        this.retResult = retResult == null ? null : retResult.trim();
    }

    public String getRetServiceAttitude() {
        return retServiceAttitude;
    }

    public void setRetServiceAttitude(String retServiceAttitude) {
        this.retServiceAttitude = retServiceAttitude == null ? null : retServiceAttitude.trim();
    }

    public String getRetCompleteQuality() {
        return retCompleteQuality;
    }

    public void setRetCompleteQuality(String retCompleteQuality) {
        this.retCompleteQuality = retCompleteQuality == null ? null : retCompleteQuality.trim();
    }

    public String getRetViolationShopping() {
        return retViolationShopping;
    }

    public void setRetViolationShopping(String retViolationShopping) {
        this.retViolationShopping = retViolationShopping == null ? null : retViolationShopping.trim();
    }

    public String getRetViolationGetpay() {
        return retViolationGetpay;
    }

    public void setRetViolationGetpay(String retViolationGetpay) {
        this.retViolationGetpay = retViolationGetpay == null ? null : retViolationGetpay.trim();
    }

    public String getRetViolationRegulation() {
        return retViolationRegulation;
    }

    public void setRetViolationRegulation(String retViolationRegulation) {
        this.retViolationRegulation = retViolationRegulation == null ? null : retViolationRegulation.trim();
    }

    public Double getRetShouldFine() {
        return retShouldFine;
    }

    public void setRetShouldFine(Double retShouldFine) {
        this.retShouldFine = retShouldFine;
    }

    public Double getRetActuallyFine() {
        return retActuallyFine;
    }

    public void setRetActuallyFine(Double retActuallyFine) {
        this.retActuallyFine = retActuallyFine;
    }

    public String getRteRemark() {
        return rteRemark;
    }

    public void setRteRemark(String rteRemark) {
        this.rteRemark = rteRemark == null ? null : rteRemark.trim();
    }
}