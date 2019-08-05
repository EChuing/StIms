package com.zz.po.journal;

/**
 * 收支记录表
 */
public class JournalFinancial {
    private Integer jfId;

    private String jfFinancialCoding;

    private Integer jfHouse4rentId;

    private Integer jfHouseId;

    private Integer jfHouse4storeId;

    private Integer jfLandlordId;

    private Integer jfRenterId;

    private Integer jfIntendedId;

    private Integer jfManagerUserId;

    private Integer jfJsrcId;

    private Integer jfFinanReview;

    private Integer jfHandlers;

    private Integer jfTheCashierPeople;

    private Integer jfChargePeople;

    private Integer jfTheReviewer;

    private Integer department;

    private Integer storefront;

    private String jfHaveOrNotArrears;

    private String jfNatureOfThe;

    private String jfBigType;

    private String jfAccountingSpecies;

    private Integer jfStrikeBalanceEncoding;

    private String jfAccountingWhy;

    private Double jfSumMoney;

    private Double jfOweMoney;

    private String jfClosedWay;

    private String jfCheckInTime;

    private String jfAuditState;

    private String jfTheCashier;

    private String jfStrikeABalanceStatus;

    private String jfCertificateNumber;

    private String jfTicketNumber;

    private String jfCertificateStatus;

    private String jfStartCycle;

    private String jfEndCycle;

    private String jfTheOriginalBill;

    private String jfTheOwnershipType;

    private String jfBelongingToTheName;

    private String jfBillingDate;

    private Integer jfAccountId;

    private String jfFinanNote;

    private String jfStrikeABalanceReason;

    private String jfOperationRecords;

    private Integer jfBelongToChannel;

    private Integer jfPricePlan;

    private String jfSettlementMethod;

    private Integer jfCreditSituation;
    
    private Double amountOf;

    private String billingDateFrom;

    private String billingDateTo;

    private String account;
    private String faUserName;

    private String waterElectricalIdentification;
    private String historicalReadings;
    private String jfPayType;
    private Double jfNowBalance;
    private String splitFlag;

	public Integer getJfBelongToChannel() {
		return jfBelongToChannel;
	}

	public void setJfBelongToChannel(Integer jfBelongToChannel) {
		this.jfBelongToChannel = jfBelongToChannel;
	}

	public Integer getJfPricePlan() {
		return jfPricePlan;
	}

	public void setJfPricePlan(Integer jfPricePlan) {
		this.jfPricePlan = jfPricePlan;
	}

	public String getJfSettlementMethod() {
		return jfSettlementMethod;
	}

	public void setJfSettlementMethod(String jfSettlementMethod) {
		this.jfSettlementMethod = jfSettlementMethod;
	}

	public Integer getJfCreditSituation() {
		return jfCreditSituation;
	}

	public void setJfCreditSituation(Integer jfCreditSituation) {
		this.jfCreditSituation = jfCreditSituation;
	}

	public Integer getJfManagerUserId() {
        return jfManagerUserId;
    }

    public void setJfManagerUserId(Integer jfManagerUserId) {
        this.jfManagerUserId = jfManagerUserId;
    }

    public Integer getJfJsrcId() {
        return jfJsrcId;
    }

    public void setJfJsrcId(Integer jfJsrcId) {
        this.jfJsrcId = jfJsrcId;
    }

    public String getSplitFlag() {
        return splitFlag;
    }

    public void setSplitFlag(String splitFlag) {
        this.splitFlag = splitFlag;
    }

    public Double getJfNowBalance() {
        return jfNowBalance;
    }

    public void setJfNowBalance(Double jfNowBalance) {
        this.jfNowBalance = jfNowBalance;
    }

    public String getJfPayType() {
        return jfPayType;
    }

    public void setJfPayType(String jfPayType) {
        this.jfPayType = jfPayType;
    }

    public String getWaterElectricalIdentification() {
        return waterElectricalIdentification;
    }

    public void setWaterElectricalIdentification(
            String waterElectricalIdentification) {
        this.waterElectricalIdentification = waterElectricalIdentification;
    }

    public String getHistoricalReadings() {
        return historicalReadings;
    }

    public void setHistoricalReadings(String historicalReadings) {
        this.historicalReadings = historicalReadings;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getFaUserName() {
        return faUserName;
    }

    public void setFaUserName(String faUserName) {
        this.faUserName = faUserName;
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

    public Double getAmountOf() {
        return amountOf;
    }

    public void setAmountOf(Double amountOf) {
        this.amountOf = amountOf;
    }

    public String getJfFinanNote() {
        return jfFinanNote;
    }

    public void setJfFinanNote(String jfFinanNote) {
        this.jfFinanNote = jfFinanNote == null ? null : jfFinanNote.trim();
    }

    public String getJfStrikeABalanceReason() {
        return jfStrikeABalanceReason;
    }

    public void setJfStrikeABalanceReason(String jfStrikeABalanceReason) {
        this.jfStrikeABalanceReason = jfStrikeABalanceReason == null ? null : jfStrikeABalanceReason.trim();
    }

    public String getJfOperationRecords() {
        return jfOperationRecords;
    }

    public void setJfOperationRecords(String jfOperationRecords) {
        this.jfOperationRecords = jfOperationRecords == null ? null : jfOperationRecords.trim();
    }

    public Integer getJfId() {
        return jfId;
    }

    public void setJfId(Integer jfId) {
        this.jfId = jfId;
    }

    public String getJfFinancialCoding() {
        return jfFinancialCoding;
    }

    public void setJfFinancialCoding(String jfFinancialCoding) {
        this.jfFinancialCoding = jfFinancialCoding == null ? null : jfFinancialCoding.trim();
    }

    public Integer getJfHouse4rentId() {
        return jfHouse4rentId;
    }

    public void setJfHouse4rentId(Integer jfHouse4rentId) {
        this.jfHouse4rentId = jfHouse4rentId;
    }

    public Integer getJfHouseId() {
        return jfHouseId;
    }

    public void setJfHouseId(Integer jfHouseId) {
        this.jfHouseId = jfHouseId;
    }

    public Integer getJfHouse4storeId() {
        return jfHouse4storeId;
    }

    public void setJfHouse4storeId(Integer jfHouse4storeId) {
        this.jfHouse4storeId = jfHouse4storeId;
    }

    public Integer getJfLandlordId() {
        return jfLandlordId;
    }

    public void setJfLandlordId(Integer jfLandlordId) {
        this.jfLandlordId = jfLandlordId;
    }

    public Integer getJfRenterId() {
        return jfRenterId;
    }

    public void setJfRenterId(Integer jfRenterId) {
        this.jfRenterId = jfRenterId;
    }

    public Integer getJfIntendedId() {
        return jfIntendedId;
    }

    public void setJfIntendedId(Integer jfIntendedId) {
        this.jfIntendedId = jfIntendedId;
    }

    public Integer getJfFinanReview() {
        return jfFinanReview;
    }

    public void setJfFinanReview(Integer jfFinanReview) {
        this.jfFinanReview = jfFinanReview;
    }

    public Integer getJfHandlers() {
        return jfHandlers;
    }

    public void setJfHandlers(Integer jfHandlers) {
        this.jfHandlers = jfHandlers;
    }

    public Integer getJfTheCashierPeople() {
        return jfTheCashierPeople;
    }

    public void setJfTheCashierPeople(Integer jfTheCashierPeople) {
        this.jfTheCashierPeople = jfTheCashierPeople;
    }

    public Integer getJfChargePeople() {
        return jfChargePeople;
    }

    public void setJfChargePeople(Integer jfChargePeople) {
        this.jfChargePeople = jfChargePeople;
    }

    public Integer getJfTheReviewer() {
        return jfTheReviewer;
    }

    public void setJfTheReviewer(Integer jfTheReviewer) {
        this.jfTheReviewer = jfTheReviewer;
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

    public String getJfHaveOrNotArrears() {
        return jfHaveOrNotArrears;
    }

    public void setJfHaveOrNotArrears(String jfHaveOrNotArrears) {
        this.jfHaveOrNotArrears = jfHaveOrNotArrears == null ? null : jfHaveOrNotArrears.trim();
    }

    public String getJfNatureOfThe() {
        return jfNatureOfThe;
    }

    public void setJfNatureOfThe(String jfNatureOfThe) {
        this.jfNatureOfThe = jfNatureOfThe == null ? null : jfNatureOfThe.trim();
    }

    public String getJfBigType() {
        return jfBigType;
    }

    public void setJfBigType(String jfBigType) {
        this.jfBigType = jfBigType == null ? null : jfBigType.trim();
    }

    public String getJfAccountingSpecies() {
        return jfAccountingSpecies;
    }

    public void setJfAccountingSpecies(String jfAccountingSpecies) {
        this.jfAccountingSpecies = jfAccountingSpecies == null ? null : jfAccountingSpecies.trim();
    }

    public Integer getJfStrikeBalanceEncoding() {
        return jfStrikeBalanceEncoding;
    }

    public void setJfStrikeBalanceEncoding(Integer jfStrikeBalanceEncoding) {
        this.jfStrikeBalanceEncoding = jfStrikeBalanceEncoding;
    }

    public String getJfAccountingWhy() {
        return jfAccountingWhy;
    }

    public void setJfAccountingWhy(String jfAccountingWhy) {
        this.jfAccountingWhy = jfAccountingWhy == null ? null : jfAccountingWhy.trim();
    }

    public Double getJfSumMoney() {
        return jfSumMoney;
    }

    public void setJfSumMoney(Double jfSumMoney) {
        this.jfSumMoney = jfSumMoney;
    }

    public Double getJfOweMoney() {
        return jfOweMoney;
    }

    public void setJfOweMoney(Double jfOweMoney) {
        this.jfOweMoney = jfOweMoney;
    }

    public String getJfClosedWay() {
        return jfClosedWay;
    }

    public void setJfClosedWay(String jfClosedWay) {
        this.jfClosedWay = jfClosedWay == null ? null : jfClosedWay.trim();
    }

    public String getJfCheckInTime() {
        return (jfCheckInTime != null && jfCheckInTime.length() > 19) ? jfCheckInTime.substring(0,19) : jfCheckInTime;
    }

    public void setJfCheckInTime(String jfCheckInTime) {
        this.jfCheckInTime = jfCheckInTime == null ? null : jfCheckInTime.trim();
    }

    public String getJfAuditState() {
        return jfAuditState;
    }

    public void setJfAuditState(String jfAuditState) {
        this.jfAuditState = jfAuditState == null ? null : jfAuditState.trim();
    }

    public String getJfTheCashier() {
        return jfTheCashier;
    }

    public void setJfTheCashier(String jfTheCashier) {
        this.jfTheCashier = jfTheCashier == null ? null : jfTheCashier.trim();
    }

    public String getJfStrikeABalanceStatus() {
        return jfStrikeABalanceStatus;
    }

    public void setJfStrikeABalanceStatus(String jfStrikeABalanceStatus) {
        this.jfStrikeABalanceStatus = jfStrikeABalanceStatus == null ? null : jfStrikeABalanceStatus.trim();
    }

    public String getJfCertificateNumber() {
        return jfCertificateNumber;
    }

    public void setJfCertificateNumber(String jfCertificateNumber) {
        this.jfCertificateNumber = jfCertificateNumber == null ? null : jfCertificateNumber.trim();
    }

    public String getJfTicketNumber() {
        return jfTicketNumber;
    }

    public void setJfTicketNumber(String jfTicketNumber) {
        this.jfTicketNumber = jfTicketNumber == null ? null : jfTicketNumber.trim();
    }

    public String getJfCertificateStatus() {
        return jfCertificateStatus;
    }

    public void setJfCertificateStatus(String jfCertificateStatus) {
        this.jfCertificateStatus = jfCertificateStatus == null ? null : jfCertificateStatus.trim();
    }

    public String getJfStartCycle() {
        return jfStartCycle;
    }

    public void setJfStartCycle(String jfStartCycle) {
        this.jfStartCycle = jfStartCycle == null ? null : jfStartCycle.trim();
    }

    public String getJfEndCycle() {
        return jfEndCycle;
    }

    public void setJfEndCycle(String jfEndCycle) {
        this.jfEndCycle = jfEndCycle == null ? null : jfEndCycle.trim();
    }

    public String getJfTheOriginalBill() {
        return jfTheOriginalBill;
    }

    public void setJfTheOriginalBill(String jfTheOriginalBill) {
        this.jfTheOriginalBill = jfTheOriginalBill == null ? null : jfTheOriginalBill.trim();
    }

    public String getJfTheOwnershipType() {
        return jfTheOwnershipType;
    }

    public void setJfTheOwnershipType(String jfTheOwnershipType) {
        this.jfTheOwnershipType = jfTheOwnershipType == null ? null : jfTheOwnershipType.trim();
    }

    public String getJfBelongingToTheName() {
        return jfBelongingToTheName;
    }

    public void setJfBelongingToTheName(String jfBelongingToTheName) {
        this.jfBelongingToTheName = jfBelongingToTheName == null ? null : jfBelongingToTheName.trim();
    }

    public String getJfBillingDate() {
        return jfBillingDate;
    }

    public void setJfBillingDate(String jfBillingDate) {
        this.jfBillingDate = jfBillingDate == null ? null : jfBillingDate.trim();
    }

    public Integer getJfAccountId() {
        return jfAccountId;
    }

    public void setJfAccountId(Integer jfAccountId) {
        this.jfAccountId = jfAccountId;
    }

    @Override
	public String toString() {
		return "JournalFinancial [jfId=" + jfId + ", jfFinancialCoding=" + jfFinancialCoding + ", jfHouse4rentId="
				+ jfHouse4rentId + ", jfHouseId=" + jfHouseId + ", jfHouse4storeId=" + jfHouse4storeId
				+ ", jfLandlordId=" + jfLandlordId + ", jfRenterId=" + jfRenterId + ", jfIntendedId=" + jfIntendedId
				+ ", jfManagerUserId=" + jfManagerUserId + ", jfJsrcId=" + jfJsrcId + ", jfFinanReview=" + jfFinanReview
				+ ", jfHandlers=" + jfHandlers + ", jfTheCashierPeople=" + jfTheCashierPeople + ", jfChargePeople="
				+ jfChargePeople + ", jfTheReviewer=" + jfTheReviewer + ", department=" + department + ", storefront="
				+ storefront + ", jfHaveOrNotArrears=" + jfHaveOrNotArrears + ", jfNatureOfThe=" + jfNatureOfThe
				+ ", jfBigType=" + jfBigType + ", jfAccountingSpecies=" + jfAccountingSpecies
				+ ", jfStrikeBalanceEncoding=" + jfStrikeBalanceEncoding + ", jfAccountingWhy=" + jfAccountingWhy
				+ ", jfSumMoney=" + jfSumMoney + ", jfOweMoney=" + jfOweMoney + ", jfClosedWay=" + jfClosedWay
				+ ", jfCheckInTime=" + jfCheckInTime + ", jfAuditState=" + jfAuditState + ", jfTheCashier="
				+ jfTheCashier + ", jfStrikeABalanceStatus=" + jfStrikeABalanceStatus + ", jfCertificateNumber="
				+ jfCertificateNumber + ", jfTicketNumber=" + jfTicketNumber + ", jfCertificateStatus="
				+ jfCertificateStatus + ", jfStartCycle=" + jfStartCycle + ", jfEndCycle=" + jfEndCycle
				+ ", jfTheOriginalBill=" + jfTheOriginalBill + ", jfTheOwnershipType=" + jfTheOwnershipType
				+ ", jfBelongingToTheName=" + jfBelongingToTheName + ", jfBillingDate=" + jfBillingDate
				+ ", jfAccountId=" + jfAccountId + ", jfFinanNote=" + jfFinanNote + ", jfStrikeABalanceReason="
				+ jfStrikeABalanceReason + ", jfOperationRecords=" + jfOperationRecords + ", jfBelongToChannel="
				+ jfBelongToChannel + ", jfPricePlan=" + jfPricePlan + ", jfSettlementMethod=" + jfSettlementMethod
				+ ", jfCreditSituation=" + jfCreditSituation + ", amountOf=" + amountOf + ", billingDateFrom="
				+ billingDateFrom + ", billingDateTo=" + billingDateTo + ", account=" + account + ", faUserName="
				+ faUserName + ", waterElectricalIdentification=" + waterElectricalIdentification
				+ ", historicalReadings=" + historicalReadings + ", jfPayType=" + jfPayType + ", jfNowBalance="
				+ jfNowBalance + ", splitFlag=" + splitFlag + "]";
	}

}