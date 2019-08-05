package com.zz.po.info;

/**
 * 已租退房表
 */
public class InfoHaveRentCheckOut {
	private Integer rcoId;
	
	private Integer hrId;
	
	private Integer hsId;

	private Integer rcoRentId;

	private Integer rcoRenterId;

	private String rcoCheckOutTheState;

	private Double rcoReturnDeposit;
	
	private Double rcoReturnPowerDeposit;
	
	private Double rcoReturnDoorDeposit;
	
	private Double rcoReturnOtherDeposit;
    
    private Double rcoReturnOtherCost;

	private Double rcoRemainingRent;

	private Double rcoLicenceFee;

	private Double rcoLastWaterBase;

	private Double rcoWaterBase;

	private Double rcoWaterPrice;

	private Double rcoWaterCombined;

	private Double rcoLastElectricityBase;

	private Double rcoElectricityBase;

	private Double rcoElectricityPrice;

	private Double rcoElectricityCombined;

	private Double rcoGasBaseLast;

	private Double rcoGasBaseNumber;

	private Double rcoGasPrice;

	private Double rcoGasCombined;
	
	private Double rcoHotWaterBaseLast;

	private Double rcoHotWaterBaseNumber;

	private Double rcoHotWaterPrice;

	private Double rcoHotWaterCombined;
	
	private Double rcoHotAirBaseLast;

	private Double rcoHotAirBaseNumber;

	private Double rcoHotAirPrice;

	private Double rcoHotAirCombined;

	private Double rcoLastMakePropertyCosts;
	
	private Double rcoWifiCost;
	
	private Double rcoTvCost;
	
	private Double rcoServerCost;
    
    private Double rcoOtherCost;

	private String rcoTotalAmountDue;

	private Double rcoPropertyCostUnitPrice;

	private Double rcoPropertyCostsInTotal;

	private Double rcoOtherChargesInTotal;

	private Double rcoBreachOfContract;
	
	private String rcoBreachDetail;
	
	private Double rcoLateFee;
	
	private String rcoLateFeeDetail;

	private Double rcoRepairDamages;

	private Integer rcoDaysOverdue;

	private Double rcoBeyondTheRent;

	private Double rcoTotalShouldBeReturned;

	private String rcoCheckOutNature;

	private String rcoCheckOutTime;

	private String rcoApplyForTime;

	private String rcoCheckOutReason;
	private Double rcoDeductionCombined;
	private Integer rcoStoreId;
	private Integer rcoLandlordId;
	private Integer rcoCheckoutAccount;

	private String startNum;
	private String endNum;
	private String totalNum;
    private String totalNum2;
	private Double theInitialDeposit;
	private Double theInitialDoorDeposit;
	private Double theInitialPowerDeposit;
	private Double theInitialOtherDeposit;
	
	private String rcoCheckOutActualTime;
	private String rcoARefundOfTime;
	private String rcoRefundTheUserName;
	private String rcoRefundAccount;
	private String rcoRefundBank;
	
	private String rcoImgPath;
	private String rcoImgNum;
	private String rcoPayType;
	private String rcoApplyUserName;
	private Integer rcoApplyUser;
	private String rcoOperationRecords;
    private String rcoNumber;
    private String rcoWaterPlan;
    private String rcoElectricityPlan;
    private String rcoGasPlan;
    private String rcoHotWaterPlan;
    private String rcoHotAirPlan;
    
    private Double rcoSysWater;
    private Double rcoSysElectricity;
    private Double rcoSysGas;
    private Double rcoSysHotWater;
    private Double rcoSysHotAir;
    
    private Integer rcoHandler;
    private String rcoReturnNote;
    private String rcoPayNote;
    private String rcoRepairNote;
    private Double rcoTotalMoney;
    private String rcoHandlerName;
    private String rcoJrrEndTime;
    private Double rcoJrrMoney;
    private String rcoSave;
	private String jsonArray;
	private Double rcoActualReceipts;
	private Integer rcohouseId;
	//已租
	private Integer hrHouse4storeId;
	private Integer hrHouseId;
	private Integer hrHouseDictId;
	private Integer hrLandlordId;
	private Integer hrRenterId;
	private String hrSectionType;
	private String hrHouseOwner;
	private Double hrHouseSquare;
	private String hrHouseDirection;
	private String hrSplitIdentifier;
	private String hrAddCity;
    private String hrAddDistrict;
    private String hrAddZone;
    private String hrAddStreet;
    private String hrAddCommunity;
    private String hrAddBuilding;
    private String hrAddDoorplateno;
    
    private Double hrWaterVolFirst;
    private Double hrElectritVolFirst;
    private Double hrGasVolFirst;
    private Double hrHotWaterVolFirst;
    private Double hrHotAirVolFirst;
    
    
    private String hrTheTerm;
    private String hrBeginTime;
    private String hrEndTime;
    private Double hrHousePrice;
    private Double hrHouseDeposit;
    private Double hrPowerDeposit;
    private Double hrDoorDeposit;
    private Double hrOtherDeposit;
    private String hrPaymentType;
    private Integer hrUserId;
    private Integer hrAdminUserId;
    private String hrHouseNote;
    private Integer hrStorefront;
    private Integer hrDepartment;
    private Integer hrWaterPlan;
    private Integer hrElectritPlan;
    private Integer hrGasPlan;
    
    private Integer hrHotWaterPlan;
    private Integer hrHotAirPlan;
    private Double hrTvCharge;
    private Double hrWifiCharge;
    private Double hrOtherPay;
    private Integer hrManagerUserId;
    private Integer hrFlatShareLogo;
	//租客合约
    private Integer jrrHouse4storeId;
    private Integer jrrLandlordId;
    private String jrrSignedTime;
    private Integer jrrUserId;
    private Integer jrrDepartment;
    private Integer jrrStorefront;
    private String jrrContractType;
    private String jrrRentalType;
    private String jrrBeginTime;
    private String jrrEndTime;
    private String jrrTheTerm;
    private Integer jrrInAdvancePay;
    private String jrrPaymentMethod;
    private Double jrrMoney;
    private String jrrRenewalCoding;
    private Integer jcdId;
    private Integer adminUser;
    private Double jrrManageCost;
    private String jrrManagePayment;
    private Double jrrServerCost;
    private String jrrServerPayment;
    private String taskTimeConsumingJson;
    private Integer advanceMode;
    private Integer jrrTypeOfContract;
  //意向人
    private Integer ipId;
  //资产
    private Integer moveSaId;
    private String moveAsset;
    private String att;
    private String att2;
    
    private String renterPopTelephone;
    private String renterPopName;
    private String renterPopIdcard;
    private Integer renterUserId;
    private Integer renterDepartment;
    private Integer renterStorefront;
    private String popNameRemark;
    private String popNation;
    private String popIdcardAddress;
    private String popBirth;
    private String popSex;
    private String popIdcardJson;
    //跟进
    private Integer jhfDepartment;
    private Integer jhfStorefront;
    private Integer jhfHouseId;
    private Integer jhfHouse4rentId;
    private Integer jhfHouse4storeId;
    private String jhfFollowRemark;
    private String jhfFollowResult;
    private String jhfPaymentWay;
    private Integer jhfUserId;
    
    private String jsonStrArry;

    private String jciBillJson;

    private String rcoProcedures;
    private String reflashStore;
	public Integer getRcoId() {
		return rcoId;
	}
    public Integer getRcohouseId() {
		return rcohouseId;
	}

	public void setRcohouseId(Integer rcohouseId) {
		this.rcohouseId = rcohouseId;
	}

	
	public void setRcoId(Integer rcoId) {
		this.rcoId = rcoId;
	}
	public Integer getHrId() {
		return hrId;
	}
	public void setHrId(Integer hrId) {
		this.hrId = hrId;
	}
	public Integer getHsId() {
		return hsId;
	}
	public void setHsId(Integer hsId) {
		this.hsId = hsId;
	}
	public Integer getRcoRentId() {
		return rcoRentId;
	}
	public void setRcoRentId(Integer rcoRentId) {
		this.rcoRentId = rcoRentId;
	}
	public Integer getRcoRenterId() {
		return rcoRenterId;
	}
	public void setRcoRenterId(Integer rcoRenterId) {
		this.rcoRenterId = rcoRenterId;
	}
	public String getRcoCheckOutTheState() {
		return rcoCheckOutTheState;
	}
	public void setRcoCheckOutTheState(String rcoCheckOutTheState) {
		this.rcoCheckOutTheState = rcoCheckOutTheState;
	}
	public Double getRcoReturnDeposit() {
		return rcoReturnDeposit;
	}
	public void setRcoReturnDeposit(Double rcoReturnDeposit) {
		this.rcoReturnDeposit = rcoReturnDeposit;
	}
	public Double getRcoReturnPowerDeposit() {
		return rcoReturnPowerDeposit;
	}
	public void setRcoReturnPowerDeposit(Double rcoReturnPowerDeposit) {
		this.rcoReturnPowerDeposit = rcoReturnPowerDeposit;
	}
	public Double getRcoReturnDoorDeposit() {
		return rcoReturnDoorDeposit;
	}
	public void setRcoReturnDoorDeposit(Double rcoReturnDoorDeposit) {
		this.rcoReturnDoorDeposit = rcoReturnDoorDeposit;
	}
	public Double getRcoReturnOtherDeposit() {
		return rcoReturnOtherDeposit;
	}
	public void setRcoReturnOtherDeposit(Double rcoReturnOtherDeposit) {
		this.rcoReturnOtherDeposit = rcoReturnOtherDeposit;
	}
	public Double getRcoReturnOtherCost() {
		return rcoReturnOtherCost;
	}
	public void setRcoReturnOtherCost(Double rcoReturnOtherCost) {
		this.rcoReturnOtherCost = rcoReturnOtherCost;
	}
	public Double getRcoRemainingRent() {
		return rcoRemainingRent;
	}
	public void setRcoRemainingRent(Double rcoRemainingRent) {
		this.rcoRemainingRent = rcoRemainingRent;
	}
	public Double getRcoLicenceFee() {
		return rcoLicenceFee;
	}
	public void setRcoLicenceFee(Double rcoLicenceFee) {
		this.rcoLicenceFee = rcoLicenceFee;
	}
	public Double getRcoLastWaterBase() {
		return rcoLastWaterBase;
	}
	public void setRcoLastWaterBase(Double rcoLastWaterBase) {
		this.rcoLastWaterBase = rcoLastWaterBase;
	}
	public Double getRcoWaterBase() {
		return rcoWaterBase;
	}
	public void setRcoWaterBase(Double rcoWaterBase) {
		this.rcoWaterBase = rcoWaterBase;
	}
	public Double getRcoWaterPrice() {
		return rcoWaterPrice;
	}
	public void setRcoWaterPrice(Double rcoWaterPrice) {
		this.rcoWaterPrice = rcoWaterPrice;
	}
	public Double getRcoWaterCombined() {
		return rcoWaterCombined;
	}
	public void setRcoWaterCombined(Double rcoWaterCombined) {
		this.rcoWaterCombined = rcoWaterCombined;
	}
	public Double getRcoLastElectricityBase() {
		return rcoLastElectricityBase;
	}
	public void setRcoLastElectricityBase(Double rcoLastElectricityBase) {
		this.rcoLastElectricityBase = rcoLastElectricityBase;
	}
	public Double getRcoElectricityBase() {
		return rcoElectricityBase;
	}
	public void setRcoElectricityBase(Double rcoElectricityBase) {
		this.rcoElectricityBase = rcoElectricityBase;
	}
	public Double getRcoElectricityPrice() {
		return rcoElectricityPrice;
	}
	public void setRcoElectricityPrice(Double rcoElectricityPrice) {
		this.rcoElectricityPrice = rcoElectricityPrice;
	}
	public Double getRcoElectricityCombined() {
		return rcoElectricityCombined;
	}
	public void setRcoElectricityCombined(Double rcoElectricityCombined) {
		this.rcoElectricityCombined = rcoElectricityCombined;
	}
	public Double getRcoGasBaseLast() {
		return rcoGasBaseLast;
	}
	public void setRcoGasBaseLast(Double rcoGasBaseLast) {
		this.rcoGasBaseLast = rcoGasBaseLast;
	}
	public Double getRcoGasBaseNumber() {
		return rcoGasBaseNumber;
	}
	public void setRcoGasBaseNumber(Double rcoGasBaseNumber) {
		this.rcoGasBaseNumber = rcoGasBaseNumber;
	}
	public Double getRcoGasPrice() {
		return rcoGasPrice;
	}
	public void setRcoGasPrice(Double rcoGasPrice) {
		this.rcoGasPrice = rcoGasPrice;
	}
	public Double getRcoGasCombined() {
		return rcoGasCombined;
	}
	public void setRcoGasCombined(Double rcoGasCombined) {
		this.rcoGasCombined = rcoGasCombined;
	}
	public Double getRcoHotWaterBaseLast() {
		return rcoHotWaterBaseLast;
	}
	public void setRcoHotWaterBaseLast(Double rcoHotWaterBaseLast) {
		this.rcoHotWaterBaseLast = rcoHotWaterBaseLast;
	}
	public Double getRcoHotWaterBaseNumber() {
		return rcoHotWaterBaseNumber;
	}
	public void setRcoHotWaterBaseNumber(Double rcoHotWaterBaseNumber) {
		this.rcoHotWaterBaseNumber = rcoHotWaterBaseNumber;
	}
	public Double getRcoHotWaterPrice() {
		return rcoHotWaterPrice;
	}
	public void setRcoHotWaterPrice(Double rcoHotWaterPrice) {
		this.rcoHotWaterPrice = rcoHotWaterPrice;
	}
	public Double getRcoHotWaterCombined() {
		return rcoHotWaterCombined;
	}
	public void setRcoHotWaterCombined(Double rcoHotWaterCombined) {
		this.rcoHotWaterCombined = rcoHotWaterCombined;
	}
	public Double getRcoHotAirBaseLast() {
		return rcoHotAirBaseLast;
	}
	public void setRcoHotAirBaseLast(Double rcoHotAirBaseLast) {
		this.rcoHotAirBaseLast = rcoHotAirBaseLast;
	}
	public Double getRcoHotAirBaseNumber() {
		return rcoHotAirBaseNumber;
	}
	public void setRcoHotAirBaseNumber(Double rcoHotAirBaseNumber) {
		this.rcoHotAirBaseNumber = rcoHotAirBaseNumber;
	}
	public Double getRcoHotAirPrice() {
		return rcoHotAirPrice;
	}
	public void setRcoHotAirPrice(Double rcoHotAirPrice) {
		this.rcoHotAirPrice = rcoHotAirPrice;
	}
	public Double getRcoHotAirCombined() {
		return rcoHotAirCombined;
	}
	public void setRcoHotAirCombined(Double rcoHotAirCombined) {
		this.rcoHotAirCombined = rcoHotAirCombined;
	}
	public Double getRcoLastMakePropertyCosts() {
		return rcoLastMakePropertyCosts;
	}
	public void setRcoLastMakePropertyCosts(Double rcoLastMakePropertyCosts) {
		this.rcoLastMakePropertyCosts = rcoLastMakePropertyCosts;
	}
	public Double getRcoWifiCost() {
		return rcoWifiCost;
	}
	public void setRcoWifiCost(Double rcoWifiCost) {
		this.rcoWifiCost = rcoWifiCost;
	}
	public Double getRcoTvCost() {
		return rcoTvCost;
	}
	public void setRcoTvCost(Double rcoTvCost) {
		this.rcoTvCost = rcoTvCost;
	}
	public Double getRcoServerCost() {
		return rcoServerCost;
	}
	public void setRcoServerCost(Double rcoServerCost) {
		this.rcoServerCost = rcoServerCost;
	}
	public Double getRcoOtherCost() {
		return rcoOtherCost;
	}
	public void setRcoOtherCost(Double rcoOtherCost) {
		this.rcoOtherCost = rcoOtherCost;
	}
	public String getRcoTotalAmountDue() {
		return rcoTotalAmountDue;
	}
	public void setRcoTotalAmountDue(String rcoTotalAmountDue) {
		this.rcoTotalAmountDue = rcoTotalAmountDue;
	}
	public Double getRcoPropertyCostUnitPrice() {
		return rcoPropertyCostUnitPrice;
	}
	public void setRcoPropertyCostUnitPrice(Double rcoPropertyCostUnitPrice) {
		this.rcoPropertyCostUnitPrice = rcoPropertyCostUnitPrice;
	}
	public Double getRcoPropertyCostsInTotal() {
		return rcoPropertyCostsInTotal;
	}
	public void setRcoPropertyCostsInTotal(Double rcoPropertyCostsInTotal) {
		this.rcoPropertyCostsInTotal = rcoPropertyCostsInTotal;
	}
	public Double getRcoOtherChargesInTotal() {
		return rcoOtherChargesInTotal;
	}
	public void setRcoOtherChargesInTotal(Double rcoOtherChargesInTotal) {
		this.rcoOtherChargesInTotal = rcoOtherChargesInTotal;
	}
	public Double getRcoBreachOfContract() {
		return rcoBreachOfContract;
	}
	public void setRcoBreachOfContract(Double rcoBreachOfContract) {
		this.rcoBreachOfContract = rcoBreachOfContract;
	}
	public String getRcoBreachDetail() {
		return rcoBreachDetail;
	}
	public void setRcoBreachDetail(String rcoBreachDetail) {
		this.rcoBreachDetail = rcoBreachDetail;
	}
	public Double getRcoLateFee() {
		return rcoLateFee;
	}
	public void setRcoLateFee(Double rcoLateFee) {
		this.rcoLateFee = rcoLateFee;
	}
	public String getRcoLateFeeDetail() {
		return rcoLateFeeDetail;
	}
	public void setRcoLateFeeDetail(String rcoLateFeeDetail) {
		this.rcoLateFeeDetail = rcoLateFeeDetail;
	}
	public Double getRcoRepairDamages() {
		return rcoRepairDamages;
	}
	public void setRcoRepairDamages(Double rcoRepairDamages) {
		this.rcoRepairDamages = rcoRepairDamages;
	}
	public Integer getRcoDaysOverdue() {
		return rcoDaysOverdue;
	}
	public void setRcoDaysOverdue(Integer rcoDaysOverdue) {
		this.rcoDaysOverdue = rcoDaysOverdue;
	}
	public Double getRcoBeyondTheRent() {
		return rcoBeyondTheRent;
	}
	public void setRcoBeyondTheRent(Double rcoBeyondTheRent) {
		this.rcoBeyondTheRent = rcoBeyondTheRent;
	}
	public Double getRcoTotalShouldBeReturned() {
		return rcoTotalShouldBeReturned;
	}
	public void setRcoTotalShouldBeReturned(Double rcoTotalShouldBeReturned) {
		this.rcoTotalShouldBeReturned = rcoTotalShouldBeReturned;
	}
	public String getRcoCheckOutNature() {
		return rcoCheckOutNature;
	}
	public void setRcoCheckOutNature(String rcoCheckOutNature) {
		this.rcoCheckOutNature = rcoCheckOutNature;
	}
	public String getRcoCheckOutTime() {
		return rcoCheckOutTime;
	}
	public void setRcoCheckOutTime(String rcoCheckOutTime) {
		this.rcoCheckOutTime = rcoCheckOutTime;
	}
	public String getRcoApplyForTime() {
		return rcoApplyForTime;
	}
	public void setRcoApplyForTime(String rcoApplyForTime) {
		this.rcoApplyForTime = rcoApplyForTime;
	}
	public String getRcoCheckOutReason() {
		return rcoCheckOutReason;
	}
	public void setRcoCheckOutReason(String rcoCheckOutReason) {
		this.rcoCheckOutReason = rcoCheckOutReason;
	}
	public Double getRcoDeductionCombined() {
		return rcoDeductionCombined;
	}
	public void setRcoDeductionCombined(Double rcoDeductionCombined) {
		this.rcoDeductionCombined = rcoDeductionCombined;
	}
	public Integer getRcoStoreId() {
		return rcoStoreId;
	}
	public void setRcoStoreId(Integer rcoStoreId) {
		this.rcoStoreId = rcoStoreId;
	}
	public Integer getRcoLandlordId() {
		return rcoLandlordId;
	}
	public void setRcoLandlordId(Integer rcoLandlordId) {
		this.rcoLandlordId = rcoLandlordId;
	}
	public Integer getRcoCheckoutAccount() {
		return rcoCheckoutAccount;
	}
	public void setRcoCheckoutAccount(Integer rcoCheckoutAccount) {
		this.rcoCheckoutAccount = rcoCheckoutAccount;
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
	public String getTotalNum2() {
		return totalNum2;
	}
	public void setTotalNum2(String totalNum2) {
		this.totalNum2 = totalNum2;
	}
	public Double getTheInitialDeposit() {
		return theInitialDeposit;
	}
	public void setTheInitialDeposit(Double theInitialDeposit) {
		this.theInitialDeposit = theInitialDeposit;
	}
	public Double getTheInitialDoorDeposit() {
		return theInitialDoorDeposit;
	}
	public void setTheInitialDoorDeposit(Double theInitialDoorDeposit) {
		this.theInitialDoorDeposit = theInitialDoorDeposit;
	}
	public Double getTheInitialPowerDeposit() {
		return theInitialPowerDeposit;
	}
	public void setTheInitialPowerDeposit(Double theInitialPowerDeposit) {
		this.theInitialPowerDeposit = theInitialPowerDeposit;
	}
	public Double getTheInitialOtherDeposit() {
		return theInitialOtherDeposit;
	}
	public void setTheInitialOtherDeposit(Double theInitialOtherDeposit) {
		this.theInitialOtherDeposit = theInitialOtherDeposit;
	}
	public String getRcoCheckOutActualTime() {
		return rcoCheckOutActualTime;
	}
	public void setRcoCheckOutActualTime(String rcoCheckOutActualTime) {
		this.rcoCheckOutActualTime = rcoCheckOutActualTime;
	}
	public String getRcoARefundOfTime() {
		return rcoARefundOfTime;
	}
	public void setRcoARefundOfTime(String rcoARefundOfTime) {
		this.rcoARefundOfTime = rcoARefundOfTime;
	}
	public String getRcoRefundTheUserName() {
		return rcoRefundTheUserName;
	}
	public void setRcoRefundTheUserName(String rcoRefundTheUserName) {
		this.rcoRefundTheUserName = rcoRefundTheUserName;
	}
	public String getRcoRefundAccount() {
		return rcoRefundAccount;
	}
	public void setRcoRefundAccount(String rcoRefundAccount) {
		this.rcoRefundAccount = rcoRefundAccount;
	}
	public String getRcoRefundBank() {
		return rcoRefundBank;
	}
	public void setRcoRefundBank(String rcoRefundBank) {
		this.rcoRefundBank = rcoRefundBank;
	}
	public String getRcoImgPath() {
		return rcoImgPath;
	}
	public void setRcoImgPath(String rcoImgPath) {
		this.rcoImgPath = rcoImgPath;
	}
	public String getRcoImgNum() {
		return rcoImgNum;
	}
	public void setRcoImgNum(String rcoImgNum) {
		this.rcoImgNum = rcoImgNum;
	}
	public String getRcoPayType() {
		return rcoPayType;
	}
	public void setRcoPayType(String rcoPayType) {
		this.rcoPayType = rcoPayType;
	}
	public String getRcoApplyUserName() {
		return rcoApplyUserName;
	}
	public void setRcoApplyUserName(String rcoApplyUserName) {
		this.rcoApplyUserName = rcoApplyUserName;
	}
	public Integer getRcoApplyUser() {
		return rcoApplyUser;
	}
	public void setRcoApplyUser(Integer rcoApplyUser) {
		this.rcoApplyUser = rcoApplyUser;
	}
	public String getRcoOperationRecords() {
		return rcoOperationRecords;
	}
	public void setRcoOperationRecords(String rcoOperationRecords) {
		this.rcoOperationRecords = rcoOperationRecords;
	}
	public String getRcoNumber() {
		return rcoNumber;
	}
	public void setRcoNumber(String rcoNumber) {
		this.rcoNumber = rcoNumber;
	}
	public String getRcoWaterPlan() {
		return rcoWaterPlan;
	}
	public void setRcoWaterPlan(String rcoWaterPlan) {
		this.rcoWaterPlan = rcoWaterPlan;
	}
	public String getRcoElectricityPlan() {
		return rcoElectricityPlan;
	}
	public void setRcoElectricityPlan(String rcoElectricityPlan) {
		this.rcoElectricityPlan = rcoElectricityPlan;
	}
	public String getRcoGasPlan() {
		return rcoGasPlan;
	}
	public void setRcoGasPlan(String rcoGasPlan) {
		this.rcoGasPlan = rcoGasPlan;
	}
	public String getRcoHotWaterPlan() {
		return rcoHotWaterPlan;
	}
	public void setRcoHotWaterPlan(String rcoHotWaterPlan) {
		this.rcoHotWaterPlan = rcoHotWaterPlan;
	}
	public String getRcoHotAirPlan() {
		return rcoHotAirPlan;
	}
	public void setRcoHotAirPlan(String rcoHotAirPlan) {
		this.rcoHotAirPlan = rcoHotAirPlan;
	}
	public Double getRcoSysWater() {
		return rcoSysWater;
	}
	public void setRcoSysWater(Double rcoSysWater) {
		this.rcoSysWater = rcoSysWater;
	}
	public Double getRcoSysElectricity() {
		return rcoSysElectricity;
	}
	public void setRcoSysElectricity(Double rcoSysElectricity) {
		this.rcoSysElectricity = rcoSysElectricity;
	}
	public Double getRcoSysGas() {
		return rcoSysGas;
	}
	public void setRcoSysGas(Double rcoSysGas) {
		this.rcoSysGas = rcoSysGas;
	}
	public Double getRcoSysHotWater() {
		return rcoSysHotWater;
	}
	public void setRcoSysHotWater(Double rcoSysHotWater) {
		this.rcoSysHotWater = rcoSysHotWater;
	}
	public Double getRcoSysHotAir() {
		return rcoSysHotAir;
	}
	public void setRcoSysHotAir(Double rcoSysHotAir) {
		this.rcoSysHotAir = rcoSysHotAir;
	}
	public Integer getRcoHandler() {
		return rcoHandler;
	}
	public void setRcoHandler(Integer rcoHandler) {
		this.rcoHandler = rcoHandler;
	}
	public String getRcoReturnNote() {
		return rcoReturnNote;
	}
	public void setRcoReturnNote(String rcoReturnNote) {
		this.rcoReturnNote = rcoReturnNote;
	}
	public String getRcoPayNote() {
		return rcoPayNote;
	}
	public void setRcoPayNote(String rcoPayNote) {
		this.rcoPayNote = rcoPayNote;
	}
	public String getRcoRepairNote() {
		return rcoRepairNote;
	}
	public void setRcoRepairNote(String rcoRepairNote) {
		this.rcoRepairNote = rcoRepairNote;
	}
	public Double getRcoTotalMoney() {
		return rcoTotalMoney;
	}
	public void setRcoTotalMoney(Double rcoTotalMoney) {
		this.rcoTotalMoney = rcoTotalMoney;
	}
	public String getRcoHandlerName() {
		return rcoHandlerName;
	}
	public void setRcoHandlerName(String rcoHandlerName) {
		this.rcoHandlerName = rcoHandlerName;
	}
	public String getRcoJrrEndTime() {
		return rcoJrrEndTime;
	}
	public void setRcoJrrEndTime(String rcoJrrEndTime) {
		this.rcoJrrEndTime = rcoJrrEndTime;
	}
	public Double getRcoJrrMoney() {
		return rcoJrrMoney;
	}
	public void setRcoJrrMoney(Double rcoJrrMoney) {
		this.rcoJrrMoney = rcoJrrMoney;
	}
	public String getRcoSave() {
		return rcoSave;
	}
	public void setRcoSave(String rcoSave) {
		this.rcoSave = rcoSave;
	}
	public String getJsonArray() {
		return jsonArray;
	}
	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}
	public Double getRcoActualReceipts() {
		return rcoActualReceipts;
	}
	public void setRcoActualReceipts(Double rcoActualReceipts) {
		this.rcoActualReceipts = rcoActualReceipts;
	}
	public Integer getHrHouse4storeId() {
		return hrHouse4storeId;
	}
	public void setHrHouse4storeId(Integer hrHouse4storeId) {
		this.hrHouse4storeId = hrHouse4storeId;
	}
	public Integer getHrHouseId() {
		return hrHouseId;
	}
	public void setHrHouseId(Integer hrHouseId) {
		this.hrHouseId = hrHouseId;
	}
	public Integer getHrHouseDictId() {
		return hrHouseDictId;
	}
	public void setHrHouseDictId(Integer hrHouseDictId) {
		this.hrHouseDictId = hrHouseDictId;
	}
	public Integer getHrLandlordId() {
		return hrLandlordId;
	}
	public void setHrLandlordId(Integer hrLandlordId) {
		this.hrLandlordId = hrLandlordId;
	}
	public Integer getHrRenterId() {
		return hrRenterId;
	}
	public void setHrRenterId(Integer hrRenterId) {
		this.hrRenterId = hrRenterId;
	}
	public String getHrSectionType() {
		return hrSectionType;
	}
	public void setHrSectionType(String hrSectionType) {
		this.hrSectionType = hrSectionType;
	}
	public String getHrHouseOwner() {
		return hrHouseOwner;
	}
	public void setHrHouseOwner(String hrHouseOwner) {
		this.hrHouseOwner = hrHouseOwner;
	}
	public Double getHrHouseSquare() {
		return hrHouseSquare;
	}
	public void setHrHouseSquare(Double hrHouseSquare) {
		this.hrHouseSquare = hrHouseSquare;
	}
	public String getHrHouseDirection() {
		return hrHouseDirection;
	}
	public void setHrHouseDirection(String hrHouseDirection) {
		this.hrHouseDirection = hrHouseDirection;
	}
	public String getHrSplitIdentifier() {
		return hrSplitIdentifier;
	}
	public void setHrSplitIdentifier(String hrSplitIdentifier) {
		this.hrSplitIdentifier = hrSplitIdentifier;
	}
	public String getHrAddCity() {
		return hrAddCity;
	}
	public void setHrAddCity(String hrAddCity) {
		this.hrAddCity = hrAddCity;
	}
	public String getHrAddDistrict() {
		return hrAddDistrict;
	}
	public void setHrAddDistrict(String hrAddDistrict) {
		this.hrAddDistrict = hrAddDistrict;
	}
	public String getHrAddZone() {
		return hrAddZone;
	}
	public void setHrAddZone(String hrAddZone) {
		this.hrAddZone = hrAddZone;
	}
	public String getHrAddStreet() {
		return hrAddStreet;
	}
	public void setHrAddStreet(String hrAddStreet) {
		this.hrAddStreet = hrAddStreet;
	}
	public String getHrAddCommunity() {
		return hrAddCommunity;
	}
	public void setHrAddCommunity(String hrAddCommunity) {
		this.hrAddCommunity = hrAddCommunity;
	}
	public String getHrAddBuilding() {
		return hrAddBuilding;
	}
	public void setHrAddBuilding(String hrAddBuilding) {
		this.hrAddBuilding = hrAddBuilding;
	}
	public String getHrAddDoorplateno() {
		return hrAddDoorplateno;
	}
	public void setHrAddDoorplateno(String hrAddDoorplateno) {
		this.hrAddDoorplateno = hrAddDoorplateno;
	}
	public Double getHrWaterVolFirst() {
		return hrWaterVolFirst;
	}
	public void setHrWaterVolFirst(Double hrWaterVolFirst) {
		this.hrWaterVolFirst = hrWaterVolFirst;
	}
	public Double getHrElectritVolFirst() {
		return hrElectritVolFirst;
	}
	public void setHrElectritVolFirst(Double hrElectritVolFirst) {
		this.hrElectritVolFirst = hrElectritVolFirst;
	}
	public Double getHrGasVolFirst() {
		return hrGasVolFirst;
	}
	public void setHrGasVolFirst(Double hrGasVolFirst) {
		this.hrGasVolFirst = hrGasVolFirst;
	}
	public Double getHrHotWaterVolFirst() {
		return hrHotWaterVolFirst;
	}
	public void setHrHotWaterVolFirst(Double hrHotWaterVolFirst) {
		this.hrHotWaterVolFirst = hrHotWaterVolFirst;
	}
	public Double getHrHotAirVolFirst() {
		return hrHotAirVolFirst;
	}
	public void setHrHotAirVolFirst(Double hrHotAirVolFirst) {
		this.hrHotAirVolFirst = hrHotAirVolFirst;
	}
	public String getHrTheTerm() {
		return hrTheTerm;
	}
	public void setHrTheTerm(String hrTheTerm) {
		this.hrTheTerm = hrTheTerm;
	}
	public String getHrBeginTime() {
		return hrBeginTime;
	}
	public void setHrBeginTime(String hrBeginTime) {
		this.hrBeginTime = hrBeginTime;
	}
	public String getHrEndTime() {
		return hrEndTime;
	}
	public void setHrEndTime(String hrEndTime) {
		this.hrEndTime = hrEndTime;
	}
	public Double getHrHousePrice() {
		return hrHousePrice;
	}
	public void setHrHousePrice(Double hrHousePrice) {
		this.hrHousePrice = hrHousePrice;
	}
	public Double getHrHouseDeposit() {
		return hrHouseDeposit;
	}
	public void setHrHouseDeposit(Double hrHouseDeposit) {
		this.hrHouseDeposit = hrHouseDeposit;
	}
	public Double getHrPowerDeposit() {
		return hrPowerDeposit;
	}
	public void setHrPowerDeposit(Double hrPowerDeposit) {
		this.hrPowerDeposit = hrPowerDeposit;
	}
	public Double getHrDoorDeposit() {
		return hrDoorDeposit;
	}
	public void setHrDoorDeposit(Double hrDoorDeposit) {
		this.hrDoorDeposit = hrDoorDeposit;
	}
	public Double getHrOtherDeposit() {
		return hrOtherDeposit;
	}
	public void setHrOtherDeposit(Double hrOtherDeposit) {
		this.hrOtherDeposit = hrOtherDeposit;
	}
	public String getHrPaymentType() {
		return hrPaymentType;
	}
	public void setHrPaymentType(String hrPaymentType) {
		this.hrPaymentType = hrPaymentType;
	}
	public Integer getHrUserId() {
		return hrUserId;
	}
	public void setHrUserId(Integer hrUserId) {
		this.hrUserId = hrUserId;
	}
	public Integer getHrAdminUserId() {
		return hrAdminUserId;
	}
	public void setHrAdminUserId(Integer hrAdminUserId) {
		this.hrAdminUserId = hrAdminUserId;
	}
	public String getHrHouseNote() {
		return hrHouseNote;
	}
	public void setHrHouseNote(String hrHouseNote) {
		this.hrHouseNote = hrHouseNote;
	}
	public Integer getHrStorefront() {
		return hrStorefront;
	}
	public void setHrStorefront(Integer hrStorefront) {
		this.hrStorefront = hrStorefront;
	}
	public Integer getHrDepartment() {
		return hrDepartment;
	}
	public void setHrDepartment(Integer hrDepartment) {
		this.hrDepartment = hrDepartment;
	}
	public Integer getHrWaterPlan() {
		return hrWaterPlan;
	}
	public void setHrWaterPlan(Integer hrWaterPlan) {
		this.hrWaterPlan = hrWaterPlan;
	}
	public Integer getHrElectritPlan() {
		return hrElectritPlan;
	}
	public void setHrElectritPlan(Integer hrElectritPlan) {
		this.hrElectritPlan = hrElectritPlan;
	}
	public Integer getHrGasPlan() {
		return hrGasPlan;
	}
	public void setHrGasPlan(Integer hrGasPlan) {
		this.hrGasPlan = hrGasPlan;
	}
	public Integer getHrHotWaterPlan() {
		return hrHotWaterPlan;
	}
	public void setHrHotWaterPlan(Integer hrHotWaterPlan) {
		this.hrHotWaterPlan = hrHotWaterPlan;
	}
	public Integer getHrHotAirPlan() {
		return hrHotAirPlan;
	}
	public void setHrHotAirPlan(Integer hrHotAirPlan) {
		this.hrHotAirPlan = hrHotAirPlan;
	}
	public Double getHrTvCharge() {
		return hrTvCharge;
	}
	public void setHrTvCharge(Double hrTvCharge) {
		this.hrTvCharge = hrTvCharge;
	}
	public Double getHrWifiCharge() {
		return hrWifiCharge;
	}
	public void setHrWifiCharge(Double hrWifiCharge) {
		this.hrWifiCharge = hrWifiCharge;
	}
	public Double getHrOtherPay() {
		return hrOtherPay;
	}
	public void setHrOtherPay(Double hrOtherPay) {
		this.hrOtherPay = hrOtherPay;
	}
	public Integer getHrManagerUserId() {
		return hrManagerUserId;
	}
	public void setHrManagerUserId(Integer hrManagerUserId) {
		this.hrManagerUserId = hrManagerUserId;
	}
	public Integer getHrFlatShareLogo() {
		return hrFlatShareLogo;
	}
	public void setHrFlatShareLogo(Integer hrFlatShareLogo) {
		this.hrFlatShareLogo = hrFlatShareLogo;
	}
	public Integer getJrrHouse4storeId() {
		return jrrHouse4storeId;
	}
	public void setJrrHouse4storeId(Integer jrrHouse4storeId) {
		this.jrrHouse4storeId = jrrHouse4storeId;
	}
	public Integer getJrrLandlordId() {
		return jrrLandlordId;
	}
	public void setJrrLandlordId(Integer jrrLandlordId) {
		this.jrrLandlordId = jrrLandlordId;
	}
	public String getJrrSignedTime() {
		return jrrSignedTime;
	}
	public void setJrrSignedTime(String jrrSignedTime) {
		this.jrrSignedTime = jrrSignedTime;
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
	public String getJrrContractType() {
		return jrrContractType;
	}
	public void setJrrContractType(String jrrContractType) {
		this.jrrContractType = jrrContractType;
	}
	public String getJrrRentalType() {
		return jrrRentalType;
	}
	public void setJrrRentalType(String jrrRentalType) {
		this.jrrRentalType = jrrRentalType;
	}
	public String getJrrBeginTime() {
		return jrrBeginTime;
	}
	public void setJrrBeginTime(String jrrBeginTime) {
		this.jrrBeginTime = jrrBeginTime;
	}
	public String getJrrEndTime() {
		return jrrEndTime;
	}
	public void setJrrEndTime(String jrrEndTime) {
		this.jrrEndTime = jrrEndTime;
	}
	public String getJrrTheTerm() {
		return jrrTheTerm;
	}
	public void setJrrTheTerm(String jrrTheTerm) {
		this.jrrTheTerm = jrrTheTerm;
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
		this.jrrPaymentMethod = jrrPaymentMethod;
	}
	public Double getJrrMoney() {
		return jrrMoney;
	}
	public void setJrrMoney(Double jrrMoney) {
		this.jrrMoney = jrrMoney;
	}
	public String getJrrRenewalCoding() {
		return jrrRenewalCoding;
	}
	public void setJrrRenewalCoding(String jrrRenewalCoding) {
		this.jrrRenewalCoding = jrrRenewalCoding;
	}
	public Integer getJcdId() {
		return jcdId;
	}
	public void setJcdId(Integer jcdId) {
		this.jcdId = jcdId;
	}
	public Integer getAdminUser() {
		return adminUser;
	}
	public void setAdminUser(Integer adminUser) {
		this.adminUser = adminUser;
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
	public String getTaskTimeConsumingJson() {
		return taskTimeConsumingJson;
	}
	public void setTaskTimeConsumingJson(String taskTimeConsumingJson) {
		this.taskTimeConsumingJson = taskTimeConsumingJson;
	}
	public Integer getAdvanceMode() {
		return advanceMode;
	}
	public void setAdvanceMode(Integer advanceMode) {
		this.advanceMode = advanceMode;
	}
	public Integer getJrrTypeOfContract() {
		return jrrTypeOfContract;
	}
	public void setJrrTypeOfContract(Integer jrrTypeOfContract) {
		this.jrrTypeOfContract = jrrTypeOfContract;
	}
	public Integer getIpId() {
		return ipId;
	}
	public void setIpId(Integer ipId) {
		this.ipId = ipId;
	}
	public Integer getMoveSaId() {
		return moveSaId;
	}
	public void setMoveSaId(Integer moveSaId) {
		this.moveSaId = moveSaId;
	}
	public String getMoveAsset() {
		return moveAsset;
	}
	public void setMoveAsset(String moveAsset) {
		this.moveAsset = moveAsset;
	}
	public String getAtt() {
		return att;
	}
	public void setAtt(String att) {
		this.att = att;
	}
	
	public String getAtt2() {
		return att2;
	}
	public void setAtt2(String att2) {
		this.att2 = att2;
	}
	public String getRenterPopTelephone() {
		return renterPopTelephone;
	}
	public void setRenterPopTelephone(String renterPopTelephone) {
		this.renterPopTelephone = renterPopTelephone;
	}
	public String getRenterPopName() {
		return renterPopName;
	}
	public void setRenterPopName(String renterPopName) {
		this.renterPopName = renterPopName;
	}
	public String getRenterPopIdcard() {
		return renterPopIdcard;
	}
	public void setRenterPopIdcard(String renterPopIdcard) {
		this.renterPopIdcard = renterPopIdcard;
	}
	public Integer getRenterUserId() {
		return renterUserId;
	}
	public void setRenterUserId(Integer renterUserId) {
		this.renterUserId = renterUserId;
	}
	public Integer getRenterDepartment() {
		return renterDepartment;
	}
	public void setRenterDepartment(Integer renterDepartment) {
		this.renterDepartment = renterDepartment;
	}
	public Integer getRenterStorefront() {
		return renterStorefront;
	}
	public void setRenterStorefront(Integer renterStorefront) {
		this.renterStorefront = renterStorefront;
	}
	public String getPopNameRemark() {
		return popNameRemark;
	}
	public void setPopNameRemark(String popNameRemark) {
		this.popNameRemark = popNameRemark;
	}
	public String getPopNation() {
		return popNation;
	}
	public void setPopNation(String popNation) {
		this.popNation = popNation;
	}
	public String getPopIdcardAddress() {
		return popIdcardAddress;
	}
	public void setPopIdcardAddress(String popIdcardAddress) {
		this.popIdcardAddress = popIdcardAddress;
	}
	public String getPopBirth() {
		return popBirth;
	}
	public void setPopBirth(String popBirth) {
		this.popBirth = popBirth;
	}
	public String getPopSex() {
		return popSex;
	}
	public void setPopSex(String popSex) {
		this.popSex = popSex;
	}
	public String getPopIdcardJson() {
		return popIdcardJson;
	}
	public void setPopIdcardJson(String popIdcardJson) {
		this.popIdcardJson = popIdcardJson;
	}
	public Integer getJhfDepartment() {
		return jhfDepartment;
	}
	public void setJhfDepartment(Integer jhfDepartment) {
		this.jhfDepartment = jhfDepartment;
	}
	public Integer getJhfStorefront() {
		return jhfStorefront;
	}
	public void setJhfStorefront(Integer jhfStorefront) {
		this.jhfStorefront = jhfStorefront;
	}
	public Integer getJhfHouseId() {
		return jhfHouseId;
	}
	public void setJhfHouseId(Integer jhfHouseId) {
		this.jhfHouseId = jhfHouseId;
	}
	public Integer getJhfHouse4rentId() {
		return jhfHouse4rentId;
	}
	public void setJhfHouse4rentId(Integer jhfHouse4rentId) {
		this.jhfHouse4rentId = jhfHouse4rentId;
	}
	public Integer getJhfHouse4storeId() {
		return jhfHouse4storeId;
	}
	public void setJhfHouse4storeId(Integer jhfHouse4storeId) {
		this.jhfHouse4storeId = jhfHouse4storeId;
	}
	public String getJhfFollowRemark() {
		return jhfFollowRemark;
	}
	public void setJhfFollowRemark(String jhfFollowRemark) {
		this.jhfFollowRemark = jhfFollowRemark;
	}
	public String getJhfFollowResult() {
		return jhfFollowResult;
	}
	public void setJhfFollowResult(String jhfFollowResult) {
		this.jhfFollowResult = jhfFollowResult;
	}
	public String getJhfPaymentWay() {
		return jhfPaymentWay;
	}
	public void setJhfPaymentWay(String jhfPaymentWay) {
		this.jhfPaymentWay = jhfPaymentWay;
	}
	public Integer getJhfUserId() {
		return jhfUserId;
	}
	public void setJhfUserId(Integer jhfUserId) {
		this.jhfUserId = jhfUserId;
	}
	public String getJsonStrArry() {
		return jsonStrArry;
	}
	public void setJsonStrArry(String jsonStrArry) {
		this.jsonStrArry = jsonStrArry;
	}
	public String getRcoProcedures() {
		return rcoProcedures;
	}
	public void setRcoProcedures(String rcoProcedures) {
		this.rcoProcedures = rcoProcedures;
	}
	public String getReflashStore() {
		return reflashStore;
	}
	public void setReflashStore(String reflashStore) {
		this.reflashStore = reflashStore;
	}
	public String getJciBillJson() { return jciBillJson; }
	public void setJciBillJson(String jciBillJson) { this.jciBillJson = jciBillJson; }
	@Override
	public String toString() {
		return "InfoHaveRentCheckOut [rcoId=" + rcoId + ", hrId=" + hrId + ", hsId=" + hsId + ", rcoRentId=" + rcoRentId
				+ ", rcoRenterId=" + rcoRenterId + ", rcoCheckOutTheState=" + rcoCheckOutTheState
				+ ", rcoReturnDeposit=" + rcoReturnDeposit + ", rcoReturnPowerDeposit=" + rcoReturnPowerDeposit
				+ ", rcoReturnDoorDeposit=" + rcoReturnDoorDeposit + ", rcoReturnOtherDeposit=" + rcoReturnOtherDeposit
				+ ", rcoReturnOtherCost=" + rcoReturnOtherCost + ", rcoRemainingRent=" + rcoRemainingRent
				+ ", rcoLicenceFee=" + rcoLicenceFee + ", rcoLastWaterBase=" + rcoLastWaterBase + ", rcoWaterBase="
				+ rcoWaterBase + ", rcoWaterPrice=" + rcoWaterPrice + ", rcoWaterCombined=" + rcoWaterCombined
				+ ", rcoLastElectricityBase=" + rcoLastElectricityBase + ", rcoElectricityBase=" + rcoElectricityBase
				+ ", rcoElectricityPrice=" + rcoElectricityPrice + ", rcoElectricityCombined=" + rcoElectricityCombined
				+ ", rcoGasBaseLast=" + rcoGasBaseLast + ", rcoGasBaseNumber=" + rcoGasBaseNumber + ", rcoGasPrice="
				+ rcoGasPrice + ", rcoGasCombined=" + rcoGasCombined + ", rcoHotWaterBaseLast=" + rcoHotWaterBaseLast
				+ ", rcoHotWaterBaseNumber=" + rcoHotWaterBaseNumber + ", rcoHotWaterPrice=" + rcoHotWaterPrice
				+ ", rcoHotWaterCombined=" + rcoHotWaterCombined + ", rcoHotAirBaseLast=" + rcoHotAirBaseLast
				+ ", rcoHotAirBaseNumber=" + rcoHotAirBaseNumber + ", rcoHotAirPrice=" + rcoHotAirPrice
				+ ", rcoHotAirCombined=" + rcoHotAirCombined + ", rcoLastMakePropertyCosts=" + rcoLastMakePropertyCosts
				+ ", rcoWifiCost=" + rcoWifiCost + ", rcoTvCost=" + rcoTvCost + ", rcoServerCost=" + rcoServerCost
				+ ", rcoOtherCost=" + rcoOtherCost + ", rcoTotalAmountDue=" + rcoTotalAmountDue
				+ ", rcoPropertyCostUnitPrice=" + rcoPropertyCostUnitPrice + ", rcoPropertyCostsInTotal="
				+ rcoPropertyCostsInTotal + ", rcoOtherChargesInTotal=" + rcoOtherChargesInTotal
				+ ", rcoBreachOfContract=" + rcoBreachOfContract + ", rcoBreachDetail=" + rcoBreachDetail
				+ ", rcoLateFee=" + rcoLateFee + ", rcoLateFeeDetail=" + rcoLateFeeDetail + ", rcoRepairDamages="
				+ rcoRepairDamages + ", rcoDaysOverdue=" + rcoDaysOverdue + ", rcoBeyondTheRent=" + rcoBeyondTheRent
				+ ", rcoTotalShouldBeReturned=" + rcoTotalShouldBeReturned + ", rcoCheckOutNature=" + rcoCheckOutNature
				+ ", rcoCheckOutTime=" + rcoCheckOutTime + ", rcoApplyForTime=" + rcoApplyForTime
				+ ", rcoCheckOutReason=" + rcoCheckOutReason + ", rcoDeductionCombined=" + rcoDeductionCombined
				+ ", rcoStoreId=" + rcoStoreId + ", rcoLandlordId=" + rcoLandlordId + ", rcoCheckoutAccount="
				+ rcoCheckoutAccount + ", startNum=" + startNum + ", endNum=" + endNum + ", totalNum=" + totalNum
				+ ", totalNum2=" + totalNum2 + ", theInitialDeposit=" + theInitialDeposit + ", theInitialDoorDeposit="
				+ theInitialDoorDeposit + ", theInitialPowerDeposit=" + theInitialPowerDeposit
				+ ", theInitialOtherDeposit=" + theInitialOtherDeposit + ", rcoCheckOutActualTime="
				+ rcoCheckOutActualTime + ", rcoARefundOfTime=" + rcoARefundOfTime + ", rcoRefundTheUserName="
				+ rcoRefundTheUserName + ", rcoRefundAccount=" + rcoRefundAccount + ", rcoRefundBank=" + rcoRefundBank
				+ ", rcoImgPath=" + rcoImgPath + ", rcoImgNum=" + rcoImgNum + ", rcoPayType=" + rcoPayType
				+ ", rcoApplyUserName=" + rcoApplyUserName + ", rcoApplyUser=" + rcoApplyUser + ", rcoOperationRecords="
				+ rcoOperationRecords + ", rcoNumber=" + rcoNumber + ", rcoWaterPlan=" + rcoWaterPlan
				+ ", rcoElectricityPlan=" + rcoElectricityPlan + ", rcoGasPlan=" + rcoGasPlan + ", rcoHotWaterPlan="
				+ rcoHotWaterPlan + ", rcoHotAirPlan=" + rcoHotAirPlan + ", rcoSysWater=" + rcoSysWater
				+ ", rcoSysElectricity=" + rcoSysElectricity + ", rcoSysGas=" + rcoSysGas + ", rcoSysHotWater="
				+ rcoSysHotWater + ", rcoSysHotAir=" + rcoSysHotAir + ", rcoHandler=" + rcoHandler + ", rcoReturnNote="
				+ rcoReturnNote + ", rcoPayNote=" + rcoPayNote + ", rcoRepairNote=" + rcoRepairNote + ", rcoTotalMoney="
				+ rcoTotalMoney + ", rcoHandlerName=" + rcoHandlerName + ", rcoJrrEndTime=" + rcoJrrEndTime
				+ ", rcoJrrMoney=" + rcoJrrMoney + ", rcoSave=" + rcoSave + ", jsonArray=" + jsonArray
				+ ", rcoActualReceipts=" + rcoActualReceipts + ", rcohouseId=" + rcohouseId + ", hrHouse4storeId="
				+ hrHouse4storeId + ", hrHouseId=" + hrHouseId + ", hrHouseDictId=" + hrHouseDictId + ", hrLandlordId="
				+ hrLandlordId + ", hrRenterId=" + hrRenterId + ", hrSectionType=" + hrSectionType + ", hrHouseOwner="
				+ hrHouseOwner + ", hrHouseSquare=" + hrHouseSquare + ", hrHouseDirection=" + hrHouseDirection
				+ ", hrSplitIdentifier=" + hrSplitIdentifier + ", hrAddCity=" + hrAddCity + ", hrAddDistrict="
				+ hrAddDistrict + ", hrAddZone=" + hrAddZone + ", hrAddStreet=" + hrAddStreet + ", hrAddCommunity="
				+ hrAddCommunity + ", hrAddBuilding=" + hrAddBuilding + ", hrAddDoorplateno=" + hrAddDoorplateno
				+ ", hrWaterVolFirst=" + hrWaterVolFirst + ", hrElectritVolFirst=" + hrElectritVolFirst
				+ ", hrGasVolFirst=" + hrGasVolFirst + ", hrHotWaterVolFirst=" + hrHotWaterVolFirst
				+ ", hrHotAirVolFirst=" + hrHotAirVolFirst + ", hrTheTerm=" + hrTheTerm + ", hrBeginTime=" + hrBeginTime
				+ ", hrEndTime=" + hrEndTime + ", hrHousePrice=" + hrHousePrice + ", hrHouseDeposit=" + hrHouseDeposit
				+ ", hrPowerDeposit=" + hrPowerDeposit + ", hrDoorDeposit=" + hrDoorDeposit + ", hrOtherDeposit="
				+ hrOtherDeposit + ", hrPaymentType=" + hrPaymentType + ", hrUserId=" + hrUserId + ", hrAdminUserId="
				+ hrAdminUserId + ", hrHouseNote=" + hrHouseNote + ", hrStorefront=" + hrStorefront + ", hrDepartment="
				+ hrDepartment + ", hrWaterPlan=" + hrWaterPlan + ", hrElectritPlan=" + hrElectritPlan + ", hrGasPlan="
				+ hrGasPlan + ", hrHotWaterPlan=" + hrHotWaterPlan + ", hrHotAirPlan=" + hrHotAirPlan + ", hrTvCharge="
				+ hrTvCharge + ", hrWifiCharge=" + hrWifiCharge + ", hrOtherPay=" + hrOtherPay + ", hrManagerUserId="
				+ hrManagerUserId + ", hrFlatShareLogo=" + hrFlatShareLogo + ", jrrHouse4storeId=" + jrrHouse4storeId
				+ ", jrrLandlordId=" + jrrLandlordId + ", jrrSignedTime=" + jrrSignedTime + ", jrrUserId=" + jrrUserId
				+ ", jrrDepartment=" + jrrDepartment + ", jrrStorefront=" + jrrStorefront + ", jrrContractType="
				+ jrrContractType + ", jrrRentalType=" + jrrRentalType + ", jrrBeginTime=" + jrrBeginTime
				+ ", jrrEndTime=" + jrrEndTime + ", jrrTheTerm=" + jrrTheTerm + ", jrrInAdvancePay=" + jrrInAdvancePay
				+ ", jrrPaymentMethod=" + jrrPaymentMethod + ", jrrMoney=" + jrrMoney + ", jrrRenewalCoding="
				+ jrrRenewalCoding + ", jcdId=" + jcdId + ", adminUser=" + adminUser + ", jrrManageCost="
				+ jrrManageCost + ", jrrManagePayment=" + jrrManagePayment + ", jrrServerCost=" + jrrServerCost
				+ ", jrrServerPayment=" + jrrServerPayment + ", taskTimeConsumingJson=" + taskTimeConsumingJson
				+ ", advanceMode=" + advanceMode + ", jrrTypeOfContract=" + jrrTypeOfContract + ", ipId=" + ipId
				+ ", moveSaId=" + moveSaId + ", moveAsset=" + moveAsset + ", att=" + att + ", att2=" + att2 + ", renterPopTelephone="
				+ renterPopTelephone + ", renterPopName=" + renterPopName + ", renterPopIdcard=" + renterPopIdcard
				+ ", renterUserId=" + renterUserId + ", renterDepartment=" + renterDepartment + ", renterStorefront="
				+ renterStorefront + ", popNameRemark=" + popNameRemark + ", popNation=" + popNation
				+ ", popIdcardAddress=" + popIdcardAddress + ", popBirth=" + popBirth + ", popSex=" + popSex
				+ ", popIdcardJson=" + popIdcardJson + ", jhfDepartment=" + jhfDepartment + ", jhfStorefront="
				+ jhfStorefront + ", jhfHouseId=" + jhfHouseId + ", jhfHouse4rentId=" + jhfHouse4rentId
				+ ", jhfHouse4storeId=" + jhfHouse4storeId + ", jhfFollowRemark=" + jhfFollowRemark
				+ ", jhfFollowResult=" + jhfFollowResult + ", jhfPaymentWay=" + jhfPaymentWay + ", jhfUserId="
				+ jhfUserId + ", jsonStrArry=" + jsonStrArry + ", rcoProcedures=" + rcoProcedures + ", reflashStore="
				+ reflashStore + ", getRcoId()=" + getRcoId() + ", getRcohouseId()=" + getRcohouseId() + ", getHrId()="
				+ getHrId() + ", getHsId()=" + getHsId() + ", getRcoRentId()=" + getRcoRentId() + ", getRcoRenterId()="
				+ getRcoRenterId() + ", getRcoCheckOutTheState()=" + getRcoCheckOutTheState()
				+ ", getRcoReturnDeposit()=" + getRcoReturnDeposit() + ", getRcoReturnPowerDeposit()="
				+ getRcoReturnPowerDeposit() + ", getRcoReturnDoorDeposit()=" + getRcoReturnDoorDeposit()
				+ ", getRcoReturnOtherDeposit()=" + getRcoReturnOtherDeposit() + ", getRcoReturnOtherCost()="
				+ getRcoReturnOtherCost() + ", getRcoRemainingRent()=" + getRcoRemainingRent() + ", getRcoLicenceFee()="
				+ getRcoLicenceFee() + ", getRcoLastWaterBase()=" + getRcoLastWaterBase() + ", getRcoWaterBase()="
				+ getRcoWaterBase() + ", getRcoWaterPrice()=" + getRcoWaterPrice() + ", getRcoWaterCombined()="
				+ getRcoWaterCombined() + ", getRcoLastElectricityBase()=" + getRcoLastElectricityBase()
				+ ", getRcoElectricityBase()=" + getRcoElectricityBase() + ", getRcoElectricityPrice()="
				+ getRcoElectricityPrice() + ", getRcoElectricityCombined()=" + getRcoElectricityCombined()
				+ ", getRcoGasBaseLast()=" + getRcoGasBaseLast() + ", getRcoGasBaseNumber()=" + getRcoGasBaseNumber()
				+ ", getRcoGasPrice()=" + getRcoGasPrice() + ", getRcoGasCombined()=" + getRcoGasCombined()
				+ ", getRcoHotWaterBaseLast()=" + getRcoHotWaterBaseLast() + ", getRcoHotWaterBaseNumber()="
				+ getRcoHotWaterBaseNumber() + ", getRcoHotWaterPrice()=" + getRcoHotWaterPrice()
				+ ", getRcoHotWaterCombined()=" + getRcoHotWaterCombined() + ", getRcoHotAirBaseLast()="
				+ getRcoHotAirBaseLast() + ", getRcoHotAirBaseNumber()=" + getRcoHotAirBaseNumber()
				+ ", getRcoHotAirPrice()=" + getRcoHotAirPrice() + ", getRcoHotAirCombined()=" + getRcoHotAirCombined()
				+ ", getRcoLastMakePropertyCosts()=" + getRcoLastMakePropertyCosts() + ", getRcoWifiCost()="
				+ getRcoWifiCost() + ", getRcoTvCost()=" + getRcoTvCost() + ", getRcoServerCost()=" + getRcoServerCost()
				+ ", getRcoOtherCost()=" + getRcoOtherCost() + ", getRcoTotalAmountDue()=" + getRcoTotalAmountDue()
				+ ", getRcoPropertyCostUnitPrice()=" + getRcoPropertyCostUnitPrice() + ", getRcoPropertyCostsInTotal()="
				+ getRcoPropertyCostsInTotal() + ", getRcoOtherChargesInTotal()=" + getRcoOtherChargesInTotal()
				+ ", getRcoBreachOfContract()=" + getRcoBreachOfContract() + ", getRcoBreachDetail()="
				+ getRcoBreachDetail() + ", getRcoLateFee()=" + getRcoLateFee() + ", getRcoLateFeeDetail()="
				+ getRcoLateFeeDetail() + ", getRcoRepairDamages()=" + getRcoRepairDamages() + ", getRcoDaysOverdue()="
				+ getRcoDaysOverdue() + ", getRcoBeyondTheRent()=" + getRcoBeyondTheRent()
				+ ", getRcoTotalShouldBeReturned()=" + getRcoTotalShouldBeReturned() + ", getRcoCheckOutNature()="
				+ getRcoCheckOutNature() + ", getRcoCheckOutTime()=" + getRcoCheckOutTime() + ", getRcoApplyForTime()="
				+ getRcoApplyForTime() + ", getRcoCheckOutReason()=" + getRcoCheckOutReason()
				+ ", getRcoDeductionCombined()=" + getRcoDeductionCombined() + ", getRcoStoreId()=" + getRcoStoreId()
				+ ", getRcoLandlordId()=" + getRcoLandlordId() + ", getRcoCheckoutAccount()=" + getRcoCheckoutAccount()
				+ ", getStartNum()=" + getStartNum() + ", getEndNum()=" + getEndNum() + ", getTotalNum()="
				+ getTotalNum() + ", getTotalNum2()=" + getTotalNum2() + ", getTheInitialDeposit()="
				+ getTheInitialDeposit() + ", getTheInitialDoorDeposit()=" + getTheInitialDoorDeposit()
				+ ", getTheInitialPowerDeposit()=" + getTheInitialPowerDeposit() + ", getTheInitialOtherDeposit()="
				+ getTheInitialOtherDeposit() + ", getRcoCheckOutActualTime()=" + getRcoCheckOutActualTime()
				+ ", getRcoARefundOfTime()=" + getRcoARefundOfTime() + ", getRcoRefundTheUserName()="
				+ getRcoRefundTheUserName() + ", getRcoRefundAccount()=" + getRcoRefundAccount()
				+ ", getRcoRefundBank()=" + getRcoRefundBank() + ", getRcoImgPath()=" + getRcoImgPath()
				+ ", getRcoImgNum()=" + getRcoImgNum() + ", getRcoPayType()=" + getRcoPayType()
				+ ", getRcoApplyUserName()=" + getRcoApplyUserName() + ", getRcoApplyUser()=" + getRcoApplyUser()
				+ ", getRcoOperationRecords()=" + getRcoOperationRecords() + ", getRcoNumber()=" + getRcoNumber()
				+ ", getRcoWaterPlan()=" + getRcoWaterPlan() + ", getRcoElectricityPlan()=" + getRcoElectricityPlan()
				+ ", getRcoGasPlan()=" + getRcoGasPlan() + ", getRcoHotWaterPlan()=" + getRcoHotWaterPlan()
				+ ", getRcoHotAirPlan()=" + getRcoHotAirPlan() + ", getRcoSysWater()=" + getRcoSysWater()
				+ ", getRcoSysElectricity()=" + getRcoSysElectricity() + ", getRcoSysGas()=" + getRcoSysGas()
				+ ", getRcoSysHotWater()=" + getRcoSysHotWater() + ", getRcoSysHotAir()=" + getRcoSysHotAir()
				+ ", getRcoHandler()=" + getRcoHandler() + ", getRcoReturnNote()=" + getRcoReturnNote()
				+ ", getRcoPayNote()=" + getRcoPayNote() + ", getRcoRepairNote()=" + getRcoRepairNote()
				+ ", getRcoTotalMoney()=" + getRcoTotalMoney() + ", getRcoHandlerName()=" + getRcoHandlerName()
				+ ", getRcoJrrEndTime()=" + getRcoJrrEndTime() + ", getRcoJrrMoney()=" + getRcoJrrMoney()
				+ ", getRcoSave()=" + getRcoSave() + ", getJsonArray()=" + getJsonArray() + ", getRcoActualReceipts()="
				+ getRcoActualReceipts() + ", getHrHouse4storeId()=" + getHrHouse4storeId() + ", getHrHouseId()="
				+ getHrHouseId() + ", getHrHouseDictId()=" + getHrHouseDictId() + ", getHrLandlordId()="
				+ getHrLandlordId() + ", getHrRenterId()=" + getHrRenterId() + ", getHrSectionType()="
				+ getHrSectionType() + ", getHrHouseOwner()=" + getHrHouseOwner() + ", getHrHouseSquare()="
				+ getHrHouseSquare() + ", getHrHouseDirection()=" + getHrHouseDirection() + ", getHrSplitIdentifier()="
				+ getHrSplitIdentifier() + ", getHrAddCity()=" + getHrAddCity() + ", getHrAddDistrict()="
				+ getHrAddDistrict() + ", getHrAddZone()=" + getHrAddZone() + ", getHrAddStreet()=" + getHrAddStreet()
				+ ", getHrAddCommunity()=" + getHrAddCommunity() + ", getHrAddBuilding()=" + getHrAddBuilding()
				+ ", getHrAddDoorplateno()=" + getHrAddDoorplateno() + ", getHrWaterVolFirst()=" + getHrWaterVolFirst()
				+ ", getHrElectritVolFirst()=" + getHrElectritVolFirst() + ", getHrGasVolFirst()=" + getHrGasVolFirst()
				+ ", getHrHotWaterVolFirst()=" + getHrHotWaterVolFirst() + ", getHrHotAirVolFirst()="
				+ getHrHotAirVolFirst() + ", getHrTheTerm()=" + getHrTheTerm() + ", getHrBeginTime()="
				+ getHrBeginTime() + ", getHrEndTime()=" + getHrEndTime() + ", getHrHousePrice()=" + getHrHousePrice()
				+ ", getHrHouseDeposit()=" + getHrHouseDeposit() + ", getHrPowerDeposit()=" + getHrPowerDeposit()
				+ ", getHrDoorDeposit()=" + getHrDoorDeposit() + ", getHrOtherDeposit()=" + getHrOtherDeposit()
				+ ", getHrPaymentType()=" + getHrPaymentType() + ", getHrUserId()=" + getHrUserId()
				+ ", getHrAdminUserId()=" + getHrAdminUserId() + ", getHrHouseNote()=" + getHrHouseNote()
				+ ", getHrStorefront()=" + getHrStorefront() + ", getHrDepartment()=" + getHrDepartment()
				+ ", getHrWaterPlan()=" + getHrWaterPlan() + ", getHrElectritPlan()=" + getHrElectritPlan()
				+ ", getHrGasPlan()=" + getHrGasPlan() + ", getHrHotWaterPlan()=" + getHrHotWaterPlan()
				+ ", getHrHotAirPlan()=" + getHrHotAirPlan() + ", getHrTvCharge()=" + getHrTvCharge()
				+ ", getHrWifiCharge()=" + getHrWifiCharge() + ", getHrOtherPay()=" + getHrOtherPay()
				+ ", getHrManagerUserId()=" + getHrManagerUserId() + ", getHrFlatShareLogo()=" + getHrFlatShareLogo()
				+ ", getJrrHouse4storeId()=" + getJrrHouse4storeId() + ", getJrrLandlordId()=" + getJrrLandlordId()
				+ ", getJrrSignedTime()=" + getJrrSignedTime() + ", getJrrUserId()=" + getJrrUserId()
				+ ", getJrrDepartment()=" + getJrrDepartment() + ", getJrrStorefront()=" + getJrrStorefront()
				+ ", getJrrContractType()=" + getJrrContractType() + ", getJrrRentalType()=" + getJrrRentalType()
				+ ", getJrrBeginTime()=" + getJrrBeginTime() + ", getJrrEndTime()=" + getJrrEndTime()
				+ ", getJrrTheTerm()=" + getJrrTheTerm() + ", getJrrInAdvancePay()=" + getJrrInAdvancePay()
				+ ", getJrrPaymentMethod()=" + getJrrPaymentMethod() + ", getJrrMoney()=" + getJrrMoney()
				+ ", getJrrRenewalCoding()=" + getJrrRenewalCoding() + ", getJcdId()=" + getJcdId()
				+ ", getAdminUser()=" + getAdminUser() + ", getJrrManageCost()=" + getJrrManageCost()
				+ ", getJrrManagePayment()=" + getJrrManagePayment() + ", getJrrServerCost()=" + getJrrServerCost()
				+ ", getJrrServerPayment()=" + getJrrServerPayment() + ", getTaskTimeConsumingJson()="
				+ getTaskTimeConsumingJson() + ", getAdvanceMode()=" + getAdvanceMode() + ", getJrrTypeOfContract()="
				+ getJrrTypeOfContract() + ", getIpId()=" + getIpId() + ", getMoveSaId()=" + getMoveSaId()
				+ ", getMoveAsset()=" + getMoveAsset() + ", getAtt()=" + getAtt() + ", getRenterPopTelephone()="
				+ getRenterPopTelephone() + ", getRenterPopName()=" + getRenterPopName() + ", getRenterPopIdcard()="
				+ getRenterPopIdcard() + ", getRenterUserId()=" + getRenterUserId() + ", getRenterDepartment()="
				+ getRenterDepartment() + ", getRenterStorefront()=" + getRenterStorefront() + ", getPopNameRemark()="
				+ getPopNameRemark() + ", getPopNation()=" + getPopNation() + ", getPopIdcardAddress()="
				+ getPopIdcardAddress() + ", getPopBirth()=" + getPopBirth() + ", getPopSex()=" + getPopSex()
				+ ", getPopIdcardJson()=" + getPopIdcardJson() + ", getJhfDepartment()=" + getJhfDepartment()
				+ ", getJhfStorefront()=" + getJhfStorefront() + ", getJhfHouseId()=" + getJhfHouseId()
				+ ", getJhfHouse4rentId()=" + getJhfHouse4rentId() + ", getJhfHouse4storeId()=" + getJhfHouse4storeId()
				+ ", getJhfFollowRemark()=" + getJhfFollowRemark() + ", getJhfFollowResult()=" + getJhfFollowResult()
				+ ", getJhfPaymentWay()=" + getJhfPaymentWay() + ", getJhfUserId()=" + getJhfUserId()
				+ ", getJsonStrArry()=" + getJsonStrArry() + ", getRcoProcedures()=" + getRcoProcedures()
				+ ", getReflashStore()=" + getReflashStore() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}
	
    
    

}