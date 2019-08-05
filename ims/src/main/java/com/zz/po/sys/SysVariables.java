package com.zz.po.sys;

/**
 * 变量表
 */
public class SysVariables {
	// 公司名
	private String companyAbbreviation;
	// 公司电话
	private String customerServiceTel;
	// 公司自动发短信提前天数变量
	private Integer autoSendMessageDays;

	private Integer autoSendMessage;
	//自动检测预期冻锁门锁
	private Integer maxOverdueDays;

	//合同风控开关
	private Integer contractRiskControl;

	private Integer waterDailyVariable;

	//门锁二次授权开关
	private Integer doorLockAuthorization;

	private Integer authorizedFee;


	private Integer waterContinuityVariable;

	private Integer maxOverdue;

	private Integer variablesId;

    private Integer contractNums;

    private String intendedSource;

    private String bankType;

    private String newFinancial;

    private String eventApprovalType;

    private String acountType;

    private String gzhAd;

    private Integer onDutyRepairer;

    private Integer wxpayAccount;
    private Integer shortRentAccount;
    private Integer shopAccount;
    private Integer shopCashAccount;

    private String assetsType;
    private String imgPath;
    private Double chargePercentage;
    private String chargeReminder;
    private String suppliesType;

    private Integer defaultContact;

    private Integer billNum;
	//开启电话强写
	private Integer forcedFollowupSwitch;
	//电话强写次数
	private Integer forcedFollowupValues;
	//自动发送短信
	private Integer campusMessageSwitch;

	private Integer moneySwitch;
	private Integer moneyValues;

    private Integer comfirmNum;

    private Integer doorplateno;

    private String contractTemplateNumber;

    private String wxgzhImgPath;

    private Double lateFeeRate;

    private String chargingPlan;

    private String taskType;//任务类型

    private String userType;//岗位类型

    private String outsideCustomerSource;//商超外部顾客来源

    private String outsideCustomerType;//商超外部顾客类型

    private String outsideCustomerScale;//商超外部顾客规模

    private String outsideCustomerContactsPost;//商超外部顾客联系人岗位

    private int timeOnAndOff;//收租时间开关

    private String timeScope;//收租时间范围

    private Integer meterReadingSwitch;//自动抄表开关

    private Integer meterReadingTimes;//自动抄表时间

	private Integer doorCardSystem;//门卡进制


	public Integer getMoneySwitch() {
		return moneySwitch;
	}

	public void setMoneySwitch(Integer moneySwitch) {
		this.moneySwitch = moneySwitch;
	}

	public Integer getMoneyValues() {
		return moneyValues;
	}

	public void setMoneyValues(Integer moneyValues) {
		this.moneyValues = moneyValues;
	}

	public Integer getDoorCardSystem() {
		return doorCardSystem;
	}

	public void setDoorCardSystem(Integer doorCardSystem) {
		this.doorCardSystem = doorCardSystem;
	}

	public Integer getMeterReadingSwitch() {
		return meterReadingSwitch;
	}
	public void setMeterReadingSwitch(Integer meterReadingSwitch) {
		this.meterReadingSwitch = meterReadingSwitch;
	}
	public Integer getMeterReadingTimes() {
		return meterReadingTimes;
	}
	public void setMeterReadingTimes(Integer meterReadingTimes) {
		this.meterReadingTimes = meterReadingTimes;
	}
	public String getOutsideCustomerSource() {
		return outsideCustomerSource;
	}
	public void setOutsideCustomerSource(String outsideCustomerSource) {
		this.outsideCustomerSource = outsideCustomerSource;
	}
	public String getOutsideCustomerType() {
		return outsideCustomerType;
	}
	public void setOutsideCustomerType(String outsideCustomerType) {
		this.outsideCustomerType = outsideCustomerType;
	}
	public String getOutsideCustomerScale() {
		return outsideCustomerScale;
	}
	public void setOutsideCustomerScale(String outsideCustomerScale) {
		this.outsideCustomerScale = outsideCustomerScale;
	}
	public String getOutsideCustomerContactsPost() {
		return outsideCustomerContactsPost;
	}
	public void setOutsideCustomerContactsPost(String outsideCustomerContactsPost) {
		this.outsideCustomerContactsPost = outsideCustomerContactsPost;
	}
	public String getCompanyAbbreviation() {
		return companyAbbreviation;
	}
    public Integer getWaterDailyVariable() {
		return waterDailyVariable;
	}

	public void setWaterDailyVariable(Integer waterDailyVariable) {
		this.waterDailyVariable = waterDailyVariable;
	}

	public Integer getWaterContinuityVariable() {
		return waterContinuityVariable;
	}

	public void setWaterContinuityVariable(Integer waterContinuityVariable) {
		this.waterContinuityVariable = waterContinuityVariable;
	}

	public Integer getForcedFollowupValues() {
		return forcedFollowupValues;
	}
	public Integer getForcedFollowupSwitch() { return forcedFollowupSwitch;}

	public void setForcedFollowupValues(Integer forcedFollowupValues) {this.forcedFollowupValues = forcedFollowupValues;}
	public void setForcedFollowupSwitch(Integer forcedFollowupSwitch) {this.forcedFollowupSwitch = forcedFollowupSwitch;}


	public Integer getCampusMessageSwitch() {
		return campusMessageSwitch;
	}

	public void setCampusMessageSwitch(Integer campusMessageSwitch) {
		this.campusMessageSwitch = campusMessageSwitch;
	}

	public void setCompanyAbbreviation(String companyAbbreviation) {
		this.companyAbbreviation = companyAbbreviation;
	}


	public String getCustomerServiceTel() {
		return customerServiceTel;
	}


	public void setCustomerServiceTel(String customerServiceTel) {
		this.customerServiceTel = customerServiceTel;
	}

	public Integer getAutoSendMessageDays() {
		return autoSendMessageDays;
	}

	public void setAutoSendMessageDays(Integer autoSendMessageDays) {
		this.autoSendMessageDays = autoSendMessageDays;
	}

	public Integer getAutoSendMessage() {
		return autoSendMessage;
	}

	public void setAutoSendMessage(Integer autoSendMessage) {
		this.autoSendMessage = autoSendMessage;
	}

	public Integer getMaxOverdueDays() {
		return maxOverdueDays;
	}

	public void setMaxOverdueDays(Integer maxOverdueDays) {
		this.maxOverdueDays = maxOverdueDays;
	}
	public Integer getContractRiskControl() {
		return contractRiskControl;
	}
	public void setContractRiskControl(Integer contractRiskControl) {
		this.contractRiskControl = contractRiskControl;
	}
	public Integer getMaxOverdue() {
		return maxOverdue;
	}

	public void setMaxOverdue(Integer maxOverdue) {
		this.maxOverdue = maxOverdue;
	}

	public Integer getVariablesId() {
		return variablesId;
	}

	public void setVariablesId(Integer variablesId) {
		this.variablesId = variablesId;
	}

	public Integer getContractNums() {
		return contractNums;
	}

	public void setContractNums(Integer contractNums) {
		this.contractNums = contractNums;
	}

	public String getIntendedSource() {
		return intendedSource;
	}

	public void setIntendedSource(String intendedSource) {
		this.intendedSource = intendedSource;
	}

	public String getBankType() {
		return bankType;
	}

	public void setBankType(String bankType) {
		this.bankType = bankType;
	}

	public String getNewFinancial() {
		return newFinancial;
	}

	public void setNewFinancial(String newFinancial) {
		this.newFinancial = newFinancial;
	}

	public String getEventApprovalType() {
		return eventApprovalType;
	}

	public void setEventApprovalType(String eventApprovalType) {
		this.eventApprovalType = eventApprovalType;
	}

	public String getAcountType() {
		return acountType;
	}

	public void setAcountType(String acountType) {
		this.acountType = acountType;
	}

	public String getGzhAd() {
		return gzhAd;
	}

	public void setGzhAd(String gzhAd) {
		this.gzhAd = gzhAd;
	}

	public Integer getOnDutyRepairer() {
		return onDutyRepairer;
	}

	public void setOnDutyRepairer(Integer onDutyRepairer) {
		this.onDutyRepairer = onDutyRepairer;
	}

	public Integer getWxpayAccount() {
		return wxpayAccount;
	}

	public void setWxpayAccount(Integer wxpayAccount) {
		this.wxpayAccount = wxpayAccount;
	}

	public Integer getShortRentAccount() {
		return shortRentAccount;
	}

	public void setShortRentAccount(Integer shortRentAccount) {
		this.shortRentAccount = shortRentAccount;
	}

	public Integer getShopAccount() {
		return shopAccount;
	}

	public void setShopAccount(Integer shopAccount) {
		this.shopAccount = shopAccount;
	}

	public Integer getShopCashAccount() {
		return shopCashAccount;
	}

	public void setShopCashAccount(Integer shopCashAccount) {
		this.shopCashAccount = shopCashAccount;
	}

	public String getAssetsType() {
		return assetsType;
	}

	public void setAssetsType(String assetsType) {
		this.assetsType = assetsType;
	}

	public String getImgPath() {
		return imgPath;
	}

	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}

	public Double getChargePercentage() {
		return chargePercentage;
	}

	public void setChargePercentage(Double chargePercentage) {
		this.chargePercentage = chargePercentage;
	}

	public String getChargeReminder() {
		return chargeReminder;
	}

	public void setChargeReminder(String chargeReminder) {
		this.chargeReminder = chargeReminder;
	}

	public String getSuppliesType() {
		return suppliesType;
	}

	public void setSuppliesType(String suppliesType) {
		this.suppliesType = suppliesType;
	}

	public Integer getDefaultContact() {
		return defaultContact;
	}

	public void setDefaultContact(Integer defaultContact) {
		this.defaultContact = defaultContact;
	}

	public Integer getBillNum() {
		return billNum;
	}

	public void setBillNum(Integer billNum) {this.billNum = billNum;}



	public Integer getComfirmNum() {
		return comfirmNum;
	}

	public void setComfirmNum(Integer comfirmNum) {
		this.comfirmNum = comfirmNum;
	}

	public Integer getDoorplateno() {
		return doorplateno;
	}

	public void setDoorplateno(Integer doorplateno) {
		this.doorplateno = doorplateno;
	}

	public String getContractTemplateNumber() {
		return contractTemplateNumber;
	}

	public void setContractTemplateNumber(String contractTemplateNumber) {
		this.contractTemplateNumber = contractTemplateNumber;
	}

	public String getWxgzhImgPath() {
		return wxgzhImgPath;
	}

	public void setWxgzhImgPath(String wxgzhImgPath) {
		this.wxgzhImgPath = wxgzhImgPath;
	}

	public Double getLateFeeRate() {
		return lateFeeRate;
	}

	public void setLateFeeRate(Double lateFeeRate) {
		this.lateFeeRate = lateFeeRate;
	}

	public String getChargingPlan() {
		return chargingPlan;
	}

	public void setChargingPlan(String chargingPlan) {
		this.chargingPlan = chargingPlan;
	}

	public String getTaskType() {
		return taskType;
	}

	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public int getTimeOnAndOff() {
		return timeOnAndOff;
	}

	public void setTimeOnAndOff(int timeOnAndOff) {
		this.timeOnAndOff = timeOnAndOff;
	}

	public String getTimeScope() {
		return timeScope;
	}

	public void setTimeScope(String timeScope) {
		this.timeScope = timeScope;
	}

	public Integer getDoorLockAuthorization() {
		return doorLockAuthorization;
	}

	public void setDoorLockAuthorization(Integer doorLockAuthorization) {
		this.doorLockAuthorization = doorLockAuthorization;
	}

	public Integer getAuthorizedFee() {
		return authorizedFee;
	}

	public void setAuthorizedFee(Integer authorizedFee) {
		this.authorizedFee = authorizedFee;
	}

	@Override
	public String toString() {
		return "SysVariables{" +
				"companyAbbreviation='" + companyAbbreviation + '\'' +
				", customerServiceTel='" + customerServiceTel + '\'' +
				", autoSendMessageDays=" + autoSendMessageDays +
				", autoSendMessage=" + autoSendMessage +
				", maxOverdueDays=" + maxOverdueDays +
				", contractRiskControl=" + contractRiskControl +
				", waterDailyVariable=" + waterDailyVariable +
				", doorLockAuthorization=" + doorLockAuthorization +
				", authorizedFee=" + authorizedFee +
				", waterContinuityVariable=" + waterContinuityVariable +
				", maxOverdue=" + maxOverdue +
				", variablesId=" + variablesId +
				", contractNums=" + contractNums +
				", intendedSource='" + intendedSource + '\'' +
				", bankType='" + bankType + '\'' +
				", newFinancial='" + newFinancial + '\'' +
				", eventApprovalType='" + eventApprovalType + '\'' +
				", gzhAd='" + gzhAd + '\'' +
				", onDutyRepairer=" + onDutyRepairer +
				", wxpayAccount=" + wxpayAccount +
				", shortRentAccount=" + shortRentAccount +
				", shopAccount=" + shopAccount +
				", shopCashAccount=" + shopCashAccount +
				", assetsType='" + assetsType + '\'' +
				", imgPath='" + imgPath + '\'' +
				", chargePercentage=" + chargePercentage +
				", chargeReminder='" + chargeReminder + '\'' +
				", suppliesType='" + suppliesType + '\'' +
				", defaultContact=" + defaultContact +
				", billNum=" + billNum +
				", forcedFollowupSwitch=" + forcedFollowupSwitch +
				", forcedFollowupValues=" + forcedFollowupValues +
				", campusMessageSwitch=" + campusMessageSwitch +
				", moneySwitch=" + moneySwitch +
				", moneyValues=" + moneyValues +
				", comfirmNum=" + comfirmNum +
				", doorplateno=" + doorplateno +
				", contractTemplateNumber='" + contractTemplateNumber + '\'' +
				", wxgzhImgPath='" + wxgzhImgPath + '\'' +
				", lateFeeRate=" + lateFeeRate +
				", chargingPlan='" + chargingPlan + '\'' +
				", taskType='" + taskType + '\'' +
				", userType='" + userType + '\'' +
				", outsideCustomerSource='" + outsideCustomerSource + '\'' +
				", outsideCustomerType='" + outsideCustomerType + '\'' +
				", outsideCustomerScale='" + outsideCustomerScale + '\'' +
				", outsideCustomerContactsPost='" + outsideCustomerContactsPost + '\'' +
				", timeOnAndOff=" + timeOnAndOff +
				", timeScope='" + timeScope + '\'' +
				", meterReadingSwitch=" + meterReadingSwitch +
				", meterReadingTimes=" + meterReadingTimes +
				", doorCardSystem=" + doorCardSystem +
				'}';
	}
}