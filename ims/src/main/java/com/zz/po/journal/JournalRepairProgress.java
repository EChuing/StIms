package com.zz.po.journal;

/**
 * 进展表
 */
public class JournalRepairProgress {
    private Integer proId;

    private Integer proRepairId;

    private Integer proUserId;

    private String proTime;
    
    private String proState;

    private String proReceivableMoney;

    private String proBillingInfo;

    private String proRemark;
    
    private Integer department;
    private Integer storefront;
    
    private String proAssetItemsRecord;
    private Double proManMoney;
    private Double proUseMoney;
    private Double proOtherMoney;

	public Double getProManMoney() {
		return proManMoney;
	}

	public void setProManMoney(Double proManMoney) {
		this.proManMoney = proManMoney;
	}

	public Double getProUseMoney() {
		return proUseMoney;
	}

	public void setProUseMoney(Double proUseMoney) {
		this.proUseMoney = proUseMoney;
	}

	public Double getProOtherMoney() {
		return proOtherMoney;
	}

	public void setProOtherMoney(Double proOtherMoney) {
		this.proOtherMoney = proOtherMoney;
	}

	public String getProAssetItemsRecord() {
		return proAssetItemsRecord;
	}

	public void setProAssetItemsRecord(String proAssetItemsRecord) {
		this.proAssetItemsRecord = proAssetItemsRecord;
	}

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

	public Integer getProId() {
        return proId;
    }

    public void setProId(Integer proId) {
        this.proId = proId;
    }

    public Integer getProRepairId() {
        return proRepairId;
    }

    public void setProRepairId(Integer proRepairId) {
        this.proRepairId = proRepairId;
    }


    public Integer getProUserId() {
		return proUserId;
	}

	public void setProUserId(Integer proUserId) {
		this.proUserId = proUserId;
	}

	public String getProTime() {
        return proTime;
    }

    public void setProTime(String proTime) {
        this.proTime = proTime == null ? null : proTime.trim();
    }
    
    public String getProState() {
		return proState;
	}

	public void setProState(String proState) {
		this.proState = proState == null ? null : proState.trim();
	}

	public String getProReceivableMoney() {
        return proReceivableMoney;
    }

    public void setProReceivableMoney(String proReceivableMoney) {
        this.proReceivableMoney = proReceivableMoney == null ? null : proReceivableMoney.trim();
    }

    public String getProBillingInfo() {
        return proBillingInfo;
    }

    public void setProBillingInfo(String proBillingInfo) {
        this.proBillingInfo = proBillingInfo == null ? null : proBillingInfo.trim();
    }

    public String getProRemark() {
        return proRemark;
    }

    public void setProRemark(String proRemark) {
        this.proRemark = proRemark == null ? null : proRemark.trim();
    }
}