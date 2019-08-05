package com.zz.po.info;

/**
 * 沙盘演算基础表
 */
public class InfoSandboxie {
    private Integer isId;

    private String isLandlordContract;

    private String isCompanyBasicData;

    private String isTime;

    public Integer getIsId() {
        return isId;
    }

    public void setIsId(Integer isId) {
        this.isId = isId;
    }

    public String getIsLandlordContract() {
        return isLandlordContract;
    }

    public void setIsLandlordContract(String isLandlordContract) {
        this.isLandlordContract = isLandlordContract == null ? null : isLandlordContract.trim();
    }

    public String getIsCompanyBasicData() {
        return isCompanyBasicData;
    }

    public void setIsCompanyBasicData(String isCompanyBasicData) {
        this.isCompanyBasicData = isCompanyBasicData == null ? null : isCompanyBasicData.trim();
    }

    public String getIsTime() {
        return (isTime != null && isTime.length() > 19) ? isTime.substring(0,19) : isTime;
    }

    public void setIsTime(String isTime) {
        this.isTime = isTime == null ? null : isTime.trim();
    }
   
    private Integer storeHouseCount;
    private Integer rentHouseCount;
    private Double averageLandlordMoney;
    private Double middleLandlordMoney;
    private Double averageRenterMoney;
    private Double middleRenterMoney;
    private Double balance;
    private Double averageBalance;
    private Double middleBalance;
    private Integer landlordDepositCount;
    private Integer renterDepositCount;
    private Double landlordNoDepositProportion;
    private Double landlordDepositProportion;
    private Double landlordRenew;
    private Double renterNoDepositProportion;
    private Double renterDepositProportion;
    private Double renterRenew;
    private Integer landlordContractPeriod;
    private Integer renterContractPeriod;
    private Integer landlordSignCount;
    private Integer renterSignCount;

	public Integer getStoreHouseCount() {
		return storeHouseCount;
	}

	public void setStoreHouseCount(Integer storeHouseCount) {
		this.storeHouseCount = storeHouseCount;
	}

	public Integer getRentHouseCount() {
		return rentHouseCount;
	}

	public void setRentHouseCount(Integer rentHouseCount) {
		this.rentHouseCount = rentHouseCount;
	}

	public Double getAverageLandlordMoney() {
		return averageLandlordMoney;
	}

	public void setAverageLandlordMoney(Double averageLandlordMoney) {
		this.averageLandlordMoney = averageLandlordMoney;
	}

	public Double getMiddleLandlordMoney() {
		return middleLandlordMoney;
	}

	public void setMiddleLandlordMoney(Double middleLandlordMoney) {
		this.middleLandlordMoney = middleLandlordMoney;
	}

	public Double getAverageRenterMoney() {
		return averageRenterMoney;
	}

	public void setAverageRenterMoney(Double averageRenterMoney) {
		this.averageRenterMoney = averageRenterMoney;
	}

	public Double getMiddleRenterMoney() {
		return middleRenterMoney;
	}

	public void setMiddleRenterMoney(Double middleRenterMoney) {
		this.middleRenterMoney = middleRenterMoney;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public Integer getLandlordDepositCount() {
		return landlordDepositCount;
	}

	public void setLandlordDepositCount(Integer landlordDepositCount) {
		this.landlordDepositCount = landlordDepositCount;
	}

	public Integer getRenterDepositCount() {
		return renterDepositCount;
	}

	public void setRenterDepositCount(Integer renterDepositCount) {
		this.renterDepositCount = renterDepositCount;
	}

	public Double getLandlordNoDepositProportion() {
		return landlordNoDepositProportion;
	}

	public void setLandlordNoDepositProportion(Double landlordNoDepositProportion) {
		this.landlordNoDepositProportion = landlordNoDepositProportion;
	}

	public Double getLandlordDepositProportion() {
		return landlordDepositProportion;
	}

	public void setLandlordDepositProportion(Double landlordDepositProportion) {
		this.landlordDepositProportion = landlordDepositProportion;
	}

	public Double getLandlordRenew() {
		return landlordRenew;
	}

	public void setLandlordRenew(Double landlordRenew) {
		this.landlordRenew = landlordRenew;
	}

	public Double getRenterNoDepositProportion() {
		return renterNoDepositProportion;
	}

	public void setRenterNoDepositProportion(Double renterNoDepositProportion) {
		this.renterNoDepositProportion = renterNoDepositProportion;
	}

	public Double getRenterDepositProportion() {
		return renterDepositProportion;
	}

	public void setRenterDepositProportion(Double renterDepositProportion) {
		this.renterDepositProportion = renterDepositProportion;
	}

	public Double getRenterRenew() {
		return renterRenew;
	}

	public void setRenterRenew(Double renterRenew) {
		this.renterRenew = renterRenew;
	}

	public Integer getLandlordContractPeriod() {
		return landlordContractPeriod;
	}

	public void setLandlordContractPeriod(Integer landlordContractPeriod) {
		this.landlordContractPeriod = landlordContractPeriod;
	}

	public Integer getRenterContractPeriod() {
		return renterContractPeriod;
	}

	public void setRenterContractPeriod(Integer renterContractPeriod) {
		this.renterContractPeriod = renterContractPeriod;
	}

	public Integer getLandlordSignCount() {
		return landlordSignCount;
	}

	public void setLandlordSignCount(Integer landlordSignCount) {
		this.landlordSignCount = landlordSignCount;
	}

	public Integer getRenterSignCount() {
		return renterSignCount;
	}

	public void setRenterSignCount(Integer renterSignCount) {
		this.renterSignCount = renterSignCount;
	}

	public Double getAverageBalance() {
		return averageBalance;
	}

	public void setAverageBalance(Double averageBalance) {
		this.averageBalance = averageBalance;
	}

	public Double getMiddleBalance() {
		return middleBalance;
	}

	public void setMiddleBalance(Double middleBalance) {
		this.middleBalance = middleBalance;
	}
    
}