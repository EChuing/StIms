package com.zz.po.info;

import com.zz.po.commons.CommonsPo;

/**
 * 合约分期账单表
 */
public class InfoContractInstallment extends CommonsPo{
    private Integer jciId;

    private Integer jciRegisterPeople;

    private Integer jciHouse4rentId;
    
    private Integer jciHouse4storeId;

    private Integer jciDepartment;

    private Integer jciStorefront;

    private Integer jciLandlordId;

    private Integer jciRenterId;

    private Integer jciPeriods;
    
    private Integer jciLandContId;
    
    private Integer jciRentContId;

    private String jciBeginPeriods;

    private String jciEndPeriods;

    private String jciNature;

    private String jciType;

    private Double jciMoney;

    private String jciState;

    private String jciRegisterTime;
    
    private String jciRemark;
    
    private String byTheTime;
	private Double monthRent;
	
	private String jciFukuanri;
	
	private String jciMessageTime;
	
	private String jciMessageNote;
	
	private String jciPaymentVoucher;
	
	private String jciRead;
    
    private String jciAudit;
	
    private Double jciManageCost;
    
    private Double jciServerCost;
    
    private String jciIfPrint;
    
    private String jciSpecialNumber;
    
    private String jciImgPath;
    
    private String jciImgNum;
    
    private Integer jciJhpId;
    
    private Integer jciLabelType;
    
    private String jciBillJson;
    
    private Integer jciOverdueDays;
    
    private Integer hsHouseId;
    
    private Double jciContractBillTotal;

    public Double getJciContractBillTotal() { return jciContractBillTotal; }

    public void setJciContractBillTotal(Double jciContractBillTotal) { this.jciContractBillTotal = jciContractBillTotal; }

    public Integer getJciOverdueDays() {
        return jciOverdueDays;
    }

    public void setJciOverdueDays(Integer jciOverdueDays) {
        this.jciOverdueDays = jciOverdueDays;
    }

    public String getJciBillJson() {
		return jciBillJson;
	}

	public void setJciBillJson(String jciBillJson) {
		this.jciBillJson = jciBillJson;
	}

	public Integer getJciLabelType() {
		return jciLabelType;
	}

	public void setJciLabelType(Integer jciLabelType) {
		this.jciLabelType = jciLabelType;
	}

	public Integer getJciJhpId() {
		return jciJhpId;
	}

	public void setJciJhpId(Integer jciJhpId) {
		this.jciJhpId = jciJhpId;
	}

	public String getJciImgPath() {
        return jciImgPath;
    }

    public void setJciImgPath(String jciImgPath) {
        this.jciImgPath = jciImgPath;
    }

    public String getJciImgNum() {
        return jciImgNum;
    }

    public void setJciImgNum(String jciImgNum) {
        this.jciImgNum = jciImgNum;
    }

    public String getJciSpecialNumber() {
		return jciSpecialNumber;
	}

	public void setJciSpecialNumber(String jciSpecialNumber) {
		this.jciSpecialNumber = jciSpecialNumber;
	}

	public String getJciIfPrint() {
		return jciIfPrint;
	}

	public void setJciIfPrint(String jciIfPrint) {
		this.jciIfPrint = jciIfPrint;
	}

	public Double getJciManageCost() {
		return jciManageCost;
	}

	public void setJciManageCost(Double jciManageCost) {
		this.jciManageCost = jciManageCost;
	}

	public Double getJciServerCost() {
		return jciServerCost;
	}

	public void setJciServerCost(Double jciServerCost) {
		this.jciServerCost = jciServerCost;
	}
    
    public String getJciAudit() {
        return jciAudit;
    }
    public void setJciAudit(String jciAudit) {
        this.jciAudit = jciAudit;
    }
    public String getJciPaymentVoucher() {
        return jciPaymentVoucher;
    }
    public void setJciPaymentVoucher(String jciPaymentVoucher) {
        this.jciPaymentVoucher = jciPaymentVoucher;
    }
    public String getJciRead() {
        return jciRead;
    }
    public void setJciRead(String jciRead) {
        this.jciRead = jciRead;
    }
    public String getJciMessageTime() {
		return jciMessageTime;
	}
	public void setJciMessageTime(String jciMessageTime) {
		this.jciMessageTime = jciMessageTime;
	}
	public String getJciMessageNote() {
		return jciMessageNote;
	}
	public void setJciMessageNote(String jciMessageNote) {
		this.jciMessageNote = jciMessageNote;
	}
	public String getJciFukuanri() {
		return jciFukuanri;
	}
	public void setJciFukuanri(String jciFukuanri) {
		this.jciFukuanri = jciFukuanri;
	}
	public String getByTheTime() {
		return byTheTime;
	}
	public void setByTheTime(String byTheTime) {
		this.byTheTime = byTheTime;
	}
	public Double getMonthRent() {
		return monthRent;
	}
	public void setMonthRent(Double monthRent) {
		this.monthRent = monthRent;
	}

    public Integer getJciId() {
        return jciId;
    }

    public void setJciId(Integer jciId) {
        this.jciId = jciId;
    }

    public Integer getJciRegisterPeople() {
        return jciRegisterPeople;
    }

    public void setJciRegisterPeople(Integer jciRegisterPeople) {
        this.jciRegisterPeople = jciRegisterPeople;
    }

    public Integer getJciHouse4rentId() {
        return jciHouse4rentId;
    }

    public void setJciHouse4rentId(Integer jciHouse4rentId) {
        this.jciHouse4rentId = jciHouse4rentId;
    }

    public Integer getJciHouse4storeId() {
		return jciHouse4storeId;
	}

	public void setJciHouse4storeId(Integer jciHouse4storeId) {
		this.jciHouse4storeId = jciHouse4storeId;
	}

	public Integer getJciDepartment() {
        return jciDepartment;
    }

    public void setJciDepartment(Integer jciDepartment) {
        this.jciDepartment = jciDepartment;
    }

    public Integer getJciStorefront() {
        return jciStorefront;
    }

    public void setJciStorefront(Integer jciStorefront) {
        this.jciStorefront = jciStorefront;
    }

    public Integer getJciLandlordId() {
        return jciLandlordId;
    }

    public void setJciLandlordId(Integer jciLandlordId) {
        this.jciLandlordId = jciLandlordId;
    }

    public Integer getJciRenterId() {
        return jciRenterId;
    }

    public void setJciRenterId(Integer jciRenterId) {
        this.jciRenterId = jciRenterId;
    }

    public Integer getJciPeriods() {
        return jciPeriods;
    }

    public void setJciPeriods(Integer jciPeriods) {
        this.jciPeriods = jciPeriods;
    }

    public String getJciBeginPeriods() {
        return jciBeginPeriods;
    }

    public void setJciBeginPeriods(String jciBeginPeriods) {
        this.jciBeginPeriods = jciBeginPeriods == null ? null : jciBeginPeriods.trim();
    }

    public String getJciEndPeriods() {
        return jciEndPeriods;
    }

    public void setJciEndPeriods(String jciEndPeriods) {
        this.jciEndPeriods = jciEndPeriods == null ? null : jciEndPeriods.trim();
    }

    public String getJciNature() {
        return jciNature;
    }

    public void setJciNature(String jciNature) {
        this.jciNature = jciNature == null ? null : jciNature.trim();
    }

    public String getJciType() {
        return jciType;
    }

    public void setJciType(String jciType) {
        this.jciType = jciType == null ? null : jciType.trim();
    }

    public Double getJciMoney() {
        return jciMoney;
    }

    public void setJciMoney(Double jciMoney) {
        this.jciMoney = jciMoney;
    }

    public String getJciState() {
        return jciState;
    }

    public void setJciState(String jciState) {
        this.jciState = jciState == null ? null : jciState.trim();
    }

    public String getJciRegisterTime() {
        return (jciRegisterTime != null && jciRegisterTime.length() > 19) ? jciRegisterTime.substring(0,19) : jciRegisterTime;
    }

    public void setJciRegisterTime(String jciRegisterTime) {
        this.jciRegisterTime = jciRegisterTime == null ? null : jciRegisterTime.trim();
    }

    public String getJciRemark() {
        return jciRemark;
    }

    public void setJciRemark(String jciRemark) {
        this.jciRemark = jciRemark == null ? null : jciRemark.trim();
    }
	public Integer getJciLandContId() {
		return jciLandContId;
	}
	public void setJciLandContId(Integer jciLandContId) {
		this.jciLandContId = jciLandContId;
	}
	public Integer getJciRentContId() {
		return jciRentContId;
	}
	public void setJciRentContId(Integer jciRentContId) {
		this.jciRentContId = jciRentContId;
	}
	public Integer getHsHouseId() {
		return hsHouseId;
	}

	public void setHsHouseId(Integer hsHouseId) {
		this.hsHouseId = hsHouseId;
	}


	@Override
	public String toString() {
		return "InfoContractInstallment [jciId=" + jciId + ", jciRegisterPeople=" + jciRegisterPeople
				+ ", jciHouse4rentId=" + jciHouse4rentId + ", jciHouse4storeId=" + jciHouse4storeId + ", jciDepartment="
				+ jciDepartment + ", jciStorefront=" + jciStorefront + ", jciLandlordId=" + jciLandlordId
				+ ", jciRenterId=" + jciRenterId + ", jciPeriods=" + jciPeriods + ", jciLandContId=" + jciLandContId
				+ ", jciRentContId=" + jciRentContId + ", jciBeginPeriods=" + jciBeginPeriods + ", jciEndPeriods="
				+ jciEndPeriods + ", jciNature=" + jciNature + ", jciType=" + jciType + ", jciMoney=" + jciMoney
				+ ", jciState=" + jciState + ", jciRegisterTime=" + jciRegisterTime + ", jciRemark=" + jciRemark
				+ ", byTheTime=" + byTheTime + ", monthRent=" + monthRent + ", jciFukuanri=" + jciFukuanri
				+ ", jciMessageTime=" + jciMessageTime + ", jciMessageNote=" + jciMessageNote + ", jciPaymentVoucher="
				+ jciPaymentVoucher + ", jciRead=" + jciRead + ", jciAudit=" + jciAudit + ", jciManageCost="
				+ jciManageCost + ", jciServerCost=" + jciServerCost + ", jciIfPrint=" + jciIfPrint
				+ ", jciSpecialNumber=" + jciSpecialNumber + ", jciImgPath=" + jciImgPath + ", jciImgNum=" + jciImgNum
				+ ", jciJhpId=" + jciJhpId + ", jciLabelType=" + jciLabelType + ", jciBillJson=" + jciBillJson + "]";
	}

	

	

	

	
	
	
    
}