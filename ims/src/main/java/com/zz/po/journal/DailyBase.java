package com.zz.po.journal;

import java.util.Date;

/**
 * 每日常用历史基础数据统计表（老板大日历）
 */
public class DailyBase {
    private Integer dbId;

    private Integer dbReceivedRenterRent;

    private Double dbReceivedRenterRentMoney;

    private Integer dbNotReceivedRenterRent;

    private Double dbNotReceivedRenterRentMoney;

    private Double dbRenterRentOnTimeRate;

    private Integer dbPaidLandlordRent;

    private Double dbPaidLandlordRentMoney;

    private Integer dbNotPaidLandlordRent;

    private Double dbNotPaidLandlordRentMoney;

    private Double dbLandlordRentOnTimeRate;

    private Integer dbAllHouse;

    private Integer dbNotRentHouse;

    private Integer dbRentHouse;

    private Integer dbVacantHouse;

    private Double dbVacantRate;
    
    private Double dbVacantFutureRate;

    private Double dbVacantCost;

    private Integer dbWholeRentVacantHouse;

    private Double dbWholeRentVacantRate;

    private Integer dbJointRentVacantHouse;

    private Double dbJointRentVacantRate;

    private Integer dbIntendedPerson;

    private Double dbAccountBalance;

    private Integer dbNewRenterContract;

    private Integer dbNewLandlordContract;
    
    private Double dbRentMoneyLossRate;
    
    private String dbRentMoneyLossDetail;

    private String dbDate;

    private Date dbTime;

    public Double getDbRentMoneyLossRate() {
        return dbRentMoneyLossRate;
    }

    public void setDbRentMoneyLossRate(Double dbRentMoneyLossRate) {
        this.dbRentMoneyLossRate = dbRentMoneyLossRate;
    }

    public String getDbRentMoneyLossDetail() {
        return dbRentMoneyLossDetail;
    }

    public void setDbRentMoneyLossDetail(String dbRentMoneyLossDetail) {
        this.dbRentMoneyLossDetail = dbRentMoneyLossDetail;
    }

    public Integer getDbId() {
        return dbId;
    }

    public void setDbId(Integer dbId) {
        this.dbId = dbId;
    }

    public Integer getDbReceivedRenterRent() {
        return dbReceivedRenterRent;
    }

    public void setDbReceivedRenterRent(Integer dbReceivedRenterRent) {
        this.dbReceivedRenterRent = dbReceivedRenterRent;
    }

    public Double getDbReceivedRenterRentMoney() {
        return dbReceivedRenterRentMoney;
    }

    public void setDbReceivedRenterRentMoney(Double dbReceivedRenterRentMoney) {
        this.dbReceivedRenterRentMoney = dbReceivedRenterRentMoney;
    }

    public Integer getDbNotReceivedRenterRent() {
        return dbNotReceivedRenterRent;
    }

    public void setDbNotReceivedRenterRent(Integer dbNotReceivedRenterRent) {
        this.dbNotReceivedRenterRent = dbNotReceivedRenterRent;
    }

    public Double getDbNotReceivedRenterRentMoney() {
        return dbNotReceivedRenterRentMoney;
    }

    public void setDbNotReceivedRenterRentMoney(Double dbNotReceivedRenterRentMoney) {
        this.dbNotReceivedRenterRentMoney = dbNotReceivedRenterRentMoney;
    }

    public Double getDbRenterRentOnTimeRate() {
        return dbRenterRentOnTimeRate;
    }

    public void setDbRenterRentOnTimeRate(Double dbRenterRentOnTimeRate) {
        this.dbRenterRentOnTimeRate = dbRenterRentOnTimeRate;
    }

    public Integer getDbPaidLandlordRent() {
        return dbPaidLandlordRent;
    }

    public void setDbPaidLandlordRent(Integer dbPaidLandlordRent) {
        this.dbPaidLandlordRent = dbPaidLandlordRent;
    }

    public Double getDbPaidLandlordRentMoney() {
        return dbPaidLandlordRentMoney;
    }

    public void setDbPaidLandlordRentMoney(Double dbPaidLandlordRentMoney) {
        this.dbPaidLandlordRentMoney = dbPaidLandlordRentMoney;
    }

    public Integer getDbNotPaidLandlordRent() {
        return dbNotPaidLandlordRent;
    }

    public void setDbNotPaidLandlordRent(Integer dbNotPaidLandlordRent) {
        this.dbNotPaidLandlordRent = dbNotPaidLandlordRent;
    }

    public Double getDbNotPaidLandlordRentMoney() {
        return dbNotPaidLandlordRentMoney;
    }

    public void setDbNotPaidLandlordRentMoney(Double dbNotPaidLandlordRentMoney) {
        this.dbNotPaidLandlordRentMoney = dbNotPaidLandlordRentMoney;
    }

    public Double getDbLandlordRentOnTimeRate() {
        return dbLandlordRentOnTimeRate;
    }

    public void setDbLandlordRentOnTimeRate(Double dbLandlordRentOnTimeRate) {
        this.dbLandlordRentOnTimeRate = dbLandlordRentOnTimeRate;
    }

    public Integer getDbAllHouse() {
        return dbAllHouse;
    }

    public void setDbAllHouse(Integer dbAllHouse) {
        this.dbAllHouse = dbAllHouse;
    }

    public Integer getDbNotRentHouse() {
        return dbNotRentHouse;
    }

    public void setDbNotRentHouse(Integer dbNotRentHouse) {
        this.dbNotRentHouse = dbNotRentHouse;
    }

    public Integer getDbRentHouse() {
        return dbRentHouse;
    }

    public void setDbRentHouse(Integer dbRentHouse) {
        this.dbRentHouse = dbRentHouse;
    }

    public Integer getDbVacantHouse() {
        return dbVacantHouse;
    }

    public void setDbVacantHouse(Integer dbVacantHouse) {
        this.dbVacantHouse = dbVacantHouse;
    }

    public Double getDbVacantRate() {
        return dbVacantRate;
    }

    public void setDbVacantRate(Double dbVacantRate) {
        this.dbVacantRate = dbVacantRate;
    }

    public Double getDbVacantFutureRate() {
        return dbVacantFutureRate;
    }

    public void setDbVacantFutureRate(Double dbVacantFutureRate) {
        this.dbVacantFutureRate = dbVacantFutureRate;
    }

    public Double getDbVacantCost() {
        return dbVacantCost;
    }

    public void setDbVacantCost(Double dbVacantCost) {
        this.dbVacantCost = dbVacantCost;
    }

    public Integer getDbWholeRentVacantHouse() {
        return dbWholeRentVacantHouse;
    }

    public void setDbWholeRentVacantHouse(Integer dbWholeRentVacantHouse) {
        this.dbWholeRentVacantHouse = dbWholeRentVacantHouse;
    }

    public Double getDbWholeRentVacantRate() {
        return dbWholeRentVacantRate;
    }

    public void setDbWholeRentVacantRate(Double dbWholeRentVacantRate) {
        this.dbWholeRentVacantRate = dbWholeRentVacantRate;
    }

    public Integer getDbJointRentVacantHouse() {
        return dbJointRentVacantHouse;
    }

    public void setDbJointRentVacantHouse(Integer dbJointRentVacantHouse) {
        this.dbJointRentVacantHouse = dbJointRentVacantHouse;
    }

    public Double getDbJointRentVacantRate() {
        return dbJointRentVacantRate;
    }

    public void setDbJointRentVacantRate(Double dbJointRentVacantRate) {
        this.dbJointRentVacantRate = dbJointRentVacantRate;
    }

    public Integer getDbIntendedPerson() {
        return dbIntendedPerson;
    }

    public void setDbIntendedPerson(Integer dbIntendedPerson) {
        this.dbIntendedPerson = dbIntendedPerson;
    }

    public Double getDbAccountBalance() {
        return dbAccountBalance;
    }

    public void setDbAccountBalance(Double dbAccountBalance) {
        this.dbAccountBalance = dbAccountBalance;
    }

    public Integer getDbNewRenterContract() {
        return dbNewRenterContract;
    }

    public void setDbNewRenterContract(Integer dbNewRenterContract) {
        this.dbNewRenterContract = dbNewRenterContract;
    }

    public Integer getDbNewLandlordContract() {
        return dbNewLandlordContract;
    }

    public void setDbNewLandlordContract(Integer dbNewLandlordContract) {
        this.dbNewLandlordContract = dbNewLandlordContract;
    }

    public String getDbDate() {
        return dbDate;
    }

    public void setDbDate(String dbDate) {
        this.dbDate = dbDate == null ? null : dbDate.trim();
    }

    public Date getDbTime() {
        return dbTime;
    }

    public void setDbTime(Date dbTime) {
        this.dbTime = dbTime;
    }
    
    private String startNum;
	private String endNum;
	private String startDate;
	private String endDate;
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