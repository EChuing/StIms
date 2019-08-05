package com.zz.po.integrated;

//租客合约表
public class InfoRenewalRent  extends Renter{
    private Integer jrrId;

    private String jrrRenewalCoding;

    private Integer jrrHouse4rentId;

    private Integer jrrHouse4storeId;

    private Integer jrrRenterId;

    private Integer jrrLandlordId;

    private Integer jrrUserId;

    private Integer jrrDepartment;

    private Integer jrrStorefront;

    private String jrrRegistrationTime;

    private String jrrContractType;

    private String jrrRentalType;

    private String jrrBeginTime;

    private String jrrEndTime;

    private String jrrSignedTime;

    private Double jrrMoney;

    private String jrrTheTerm;

    private String jrrTheContract;

    private Integer jrrInAdvancePay;

    private String jrrPaymentMethod;

    private String jrrRemark;

    private String jrrImgPath;

    private Double jrrManageCost;
    
    private String jrrManagePayment;
    
    private Double jrrServerCost;
    
    private String jrrServerPayment;
    
    private Integer advanceMode;
    private Integer numberMode;
    
    public Integer getAdvanceMode() {
		return advanceMode;
	}

	public void setAdvanceMode(Integer advanceMode) {
		this.advanceMode = advanceMode;
	}

	public Integer getNumberMode() {
		return numberMode;
	}

	public void setNumberMode(Integer numberMode) {
		this.numberMode = numberMode;
	}

	public Double getJrrManageCost() {
		return jrrManageCost;
	}

	public void setJrrManageCost(Double jrrManageCost) {
		this.jrrManageCost = jrrManageCost;
	}

	public String getJrrManagePayment() {
		return jrrManagePayment;
	}

	public void setJrrManagePayment(String jrrManagePayment) {
		this.jrrManagePayment = jrrManagePayment;
	}

	public Double getJrrServerCost() {
		return jrrServerCost;
	}

	public void setJrrServerCost(Double jrrServerCost) {
		this.jrrServerCost = jrrServerCost;
	}

	public String getJrrServerPayment() {
		return jrrServerPayment;
	}

	public void setJrrServerPayment(String jrrServerPayment) {
		this.jrrServerPayment = jrrServerPayment;
	}
    
    public Integer getJrrId() {
        return jrrId;
    }

    public void setJrrId(Integer jrrId) {
        this.jrrId = jrrId;
    }

    public String getJrrRenewalCoding() {
        return jrrRenewalCoding;
    }

    public void setJrrRenewalCoding(String jrrRenewalCoding) {
        this.jrrRenewalCoding = jrrRenewalCoding == null ? null : jrrRenewalCoding.trim();
    }

    public Integer getJrrHouse4rentId() {
        return jrrHouse4rentId;
    }

    public void setJrrHouse4rentId(Integer jrrHouse4rentId) {
        this.jrrHouse4rentId = jrrHouse4rentId;
    }

    public Integer getJrrHouse4storeId() {
        return jrrHouse4storeId;
    }

    public void setJrrHouse4storeId(Integer jrrHouse4storeId) {
        this.jrrHouse4storeId = jrrHouse4storeId;
    }

    public Integer getJrrRenterId() {
        return jrrRenterId;
    }

    public void setJrrRenterId(Integer jrrRenterId) {
        this.jrrRenterId = jrrRenterId;
    }

    public Integer getJrrLandlordId() {
        return jrrLandlordId;
    }

    public void setJrrLandlordId(Integer jrrLandlordId) {
        this.jrrLandlordId = jrrLandlordId;
    }

    public Integer getJrrUserId() {
        return jrrUserId;
    }

    public void setJrrUserId(Integer jrrUserId) {
        this.jrrUserId = jrrUserId;
    }

    public Integer getJrrDepartment() {
        return jrrDepartment;
    }

    public void setJrrDepartment(Integer jrrDepartment) {
        this.jrrDepartment = jrrDepartment;
    }

    public Integer getJrrStorefront() {
        return jrrStorefront;
    }

    public void setJrrStorefront(Integer jrrStorefront) {
        this.jrrStorefront = jrrStorefront;
    }

    public String getJrrRegistrationTime() {
        return jrrRegistrationTime;
    }

    public void setJrrRegistrationTime(String jrrRegistrationTime) {
        this.jrrRegistrationTime = jrrRegistrationTime == null ? null : jrrRegistrationTime.trim();
    }

    public String getJrrContractType() {
        return jrrContractType;
    }

    public void setJrrContractType(String jrrContractType) {
        this.jrrContractType = jrrContractType == null ? null : jrrContractType.trim();
    }

    public String getJrrRentalType() {
        return jrrRentalType;
    }

    public void setJrrRentalType(String jrrRentalType) {
        this.jrrRentalType = jrrRentalType == null ? null : jrrRentalType.trim();
    }

    public String getJrrBeginTime() {
        return jrrBeginTime;
    }

    public void setJrrBeginTime(String jrrBeginTime) {
        this.jrrBeginTime = jrrBeginTime == null ? null : jrrBeginTime.trim();
    }

    public String getJrrEndTime() {
        return jrrEndTime;
    }

    public void setJrrEndTime(String jrrEndTime) {
        this.jrrEndTime = jrrEndTime == null ? null : jrrEndTime.trim();
    }

    public String getJrrSignedTime() {
        return jrrSignedTime;
    }

    public void setJrrSignedTime(String jrrSignedTime) {
        this.jrrSignedTime = jrrSignedTime == null ? null : jrrSignedTime.trim();
    }

    public Double getJrrMoney() {
        return jrrMoney;
    }

    public void setJrrMoney(Double jrrMoney) {
        this.jrrMoney = jrrMoney;
    }

    public String getJrrTheTerm() {
        return jrrTheTerm;
    }

    public void setJrrTheTerm(String jrrTheTerm) {
        this.jrrTheTerm = jrrTheTerm == null ? null : jrrTheTerm.trim();
    }

    public String getJrrTheContract() {
        return jrrTheContract;
    }

    public void setJrrTheContract(String jrrTheContract) {
        this.jrrTheContract = jrrTheContract == null ? null : jrrTheContract.trim();
    }

    public Integer getJrrInAdvancePay() {
        return jrrInAdvancePay;
    }

    public void setJrrInAdvancePay(Integer jrrInAdvancePay) {
        this.jrrInAdvancePay = jrrInAdvancePay;
    }

    public String getJrrPaymentMethod() {
        return jrrPaymentMethod;
    }

    public void setJrrPaymentMethod(String jrrPaymentMethod) {
        this.jrrPaymentMethod = jrrPaymentMethod == null ? null : jrrPaymentMethod.trim();
    }

    public String getJrrRemark() {
        return jrrRemark;
    }

    public void setJrrRemark(String jrrRemark) {
        this.jrrRemark = jrrRemark == null ? null : jrrRemark.trim();
    }

    public String getJrrImgPath() {
        return jrrImgPath;
    }

    public void setJrrImgPath(String jrrImgPath) {
        this.jrrImgPath = jrrImgPath == null ? null : jrrImgPath.trim();
    }
}