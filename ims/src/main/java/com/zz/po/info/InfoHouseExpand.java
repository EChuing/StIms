package com.zz.po.info;

import java.io.File;
import java.util.List;

public class InfoHouseExpand extends InfoHouse{
	
	private Integer hsId;

    private Integer hsRenterId;

    private Integer hsLandlordId;

    private Integer hsHouseId;

    private Integer hsUserId;

    private Integer hsAdminUserId;

    private Integer hsHouseDictId;

    private String hsSectionType;

    private String hsHouseType;

    private String hsHouseDirection;

    private String hsHouseOwner;

    private Double hsHouseSquare;

    private String hsFurnitureConfig;

    private Double hsHousePrice;

    private Double hsWaterVolFirst;

    private Double hsElectritVolFirst;

    private Double hsGasVolFirst;

    private String hsPaymentType;

    private String hsRegisterTime;

    private String hsAddProvince;

    private String hsAddCity;

    private String hsAddDistrict;
    
    private String hsAddZone;

    private String hsAddStreet;

    private String hsAddCommunity;

    private String hsAddBuilding;

    private String hsAddDoorplateno;

    private Double hsHouseDeposit;

    private String hsTheTerm;

    private String hsBeginTime;

    private String hsEndTime;

    private String hsLeaseState;

    private String hsHouseKey;

    private Integer hsRentHoliday;

    private String hsHouseNote;

    private Integer hsVacancyDay;

    private String hsState;

    private String hsAssist;
    
    private Integer hsStorefront;
    private Integer hsDepartment;
    
    private String hsMeterReadingRecord;
    
    private Double hsBase;
    private Double tempBase;
    
    private Double hsDailyRent;
    private Double hsHotDailyRent;
    private Integer hsDirtyHouse;
    private Integer hsLeaseType;
    private String hsRoomType;
    
    private String tempAssist;
    private Double hsGuidePrice;
    private Double hsRelationsCost;
    private Double hsManagedCost;
    private Integer hsDecorationHoliday;
    
    private String hsBankType;
    private String hsBankNum;
    private String hsBankName;
    
    private String hsDownDeposit;
    private Double hsDepositAmount;
    private String hsDespositJson;
    private Integer hsIntentionalId;
    private Integer hsSalesmanId;
    private String hsStartDate;
    private String hsEndDate;
    private Integer hsDespositAccount;
    
    private Integer hsManagerUserId;
    
    private String hsManagerUserName;
    
    private Integer hsPrimitiveMother;
    private Integer hsNotRentSplit;
    private String hsSplitIdentifier;
    
    private String hsReleaseStatus;
    private String hsReleasePicture;
    
    private String hsMainImg;
    
    private String hsOtherImg;
    
    private String hsHouseTitle;
    private String hsCorridor;
    private String hsApplianceSettings;
    private String hsOpenHome;
    private String hsReleaseTime;
    private String hsChargesPaid;
    private String hsDecorationLabel;
    
    private String hsDeviceJson;
    
    private Integer hsMicronetIdentification;
    
    private Double hsTransactionPrice;
    
    private Double hsInPrice;
    
    private Double hsOutPrice;
    
    private Integer hsTotalVacancyDay;
    
    private Double hsTotalVacancyCost;
    
    private Double hsLatestVacancyCost;
    
    private Integer hsPopId;
    
    private String hsPriceLadder;
    
    private String taskSign;
    
    private Integer houseId;

	private String deviceType;

	private String  devId;
	private Integer devBrandId;
	private Integer devIdftId;
	private Integer devIdstId;
	private Integer devFirstType;
	private Integer devSecondType;

	private String type;

	public Integer getDevFirstType() {
		return devFirstType;
	}

	public void setDevFirstType(Integer devFirstType) {
		this.devFirstType = devFirstType;
	}

	public Integer getDevSecondType() {
		return devSecondType;
	}

	public void setDevSecondType(Integer devSecondType) {
		this.devSecondType = devSecondType;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getDevIdftId() {
		return devIdftId;
	}

	public void setDevIdftId(Integer devIdftId) {
		this.devIdftId = devIdftId;
	}

	public Integer getDevIdstId() {
		return devIdstId;
	}

	public void setDevIdstId(Integer devIdstId) {
		this.devIdstId = devIdstId;
	}

	public Integer getHouseId() {
		return houseId;
	}

	public void setHouseId(Integer houseId) {
		this.houseId = houseId;
	}

	public String getDevId() {
		return devId;
	}

	public void setDevId(String devId) {
		this.devId = devId;
	}

	public Integer getDevBrandId() {
		return devBrandId;
	}

	public void setDevBrandId(Integer devBrandId) {
		this.devBrandId = devBrandId;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	public String getTaskSign() {
		return taskSign;
	}

	public void setTaskSign(String taskSign) {
		this.taskSign = taskSign;
	}

	public Integer getHsId() {
		return hsId;
	}

	public void setHsId(Integer hsId) {
		this.hsId = hsId;
	}

	public Integer getHsRenterId() {
		return hsRenterId;
	}

	public void setHsRenterId(Integer hsRenterId) {
		this.hsRenterId = hsRenterId;
	}

	public Integer getHsLandlordId() {
		return hsLandlordId;
	}

	public void setHsLandlordId(Integer hsLandlordId) {
		this.hsLandlordId = hsLandlordId;
	}

	public Integer getHsHouseId() {
		return hsHouseId;
	}

	public void setHsHouseId(Integer hsHouseId) {
		this.hsHouseId = hsHouseId;
	}

	public Integer getHsUserId() {
		return hsUserId;
	}

	public void setHsUserId(Integer hsUserId) {
		this.hsUserId = hsUserId;
	}

	public Integer getHsAdminUserId() {
		return hsAdminUserId;
	}

	public void setHsAdminUserId(Integer hsAdminUserId) {
		this.hsAdminUserId = hsAdminUserId;
	}

	public Integer getHsHouseDictId() {
		return hsHouseDictId;
	}

	public void setHsHouseDictId(Integer hsHouseDictId) {
		this.hsHouseDictId = hsHouseDictId;
	}

	public String getHsSectionType() {
		return hsSectionType;
	}

	public void setHsSectionType(String hsSectionType) {
		this.hsSectionType = hsSectionType;
	}

	public String getHsHouseType() {
		return hsHouseType;
	}

	public void setHsHouseType(String hsHouseType) {
		this.hsHouseType = hsHouseType;
	}

	public String getHsHouseDirection() {
		return hsHouseDirection;
	}

	public void setHsHouseDirection(String hsHouseDirection) {
		this.hsHouseDirection = hsHouseDirection;
	}

	public String getHsHouseOwner() {
		return hsHouseOwner;
	}

	public void setHsHouseOwner(String hsHouseOwner) {
		this.hsHouseOwner = hsHouseOwner;
	}

	public Double getHsHouseSquare() {
		return hsHouseSquare;
	}

	public void setHsHouseSquare(Double hsHouseSquare) {
		this.hsHouseSquare = hsHouseSquare;
	}

	public String getHsFurnitureConfig() {
		return hsFurnitureConfig;
	}

	public void setHsFurnitureConfig(String hsFurnitureConfig) {
		this.hsFurnitureConfig = hsFurnitureConfig;
	}

	public Double getHsHousePrice() {
		return hsHousePrice;
	}

	public void setHsHousePrice(Double hsHousePrice) {
		this.hsHousePrice = hsHousePrice;
	}

	public Double getHsWaterVolFirst() {
		return hsWaterVolFirst;
	}

	public void setHsWaterVolFirst(Double hsWaterVolFirst) {
		this.hsWaterVolFirst = hsWaterVolFirst;
	}

	public Double getHsElectritVolFirst() {
		return hsElectritVolFirst;
	}

	public void setHsElectritVolFirst(Double hsElectritVolFirst) {
		this.hsElectritVolFirst = hsElectritVolFirst;
	}

	public Double getHsGasVolFirst() {
		return hsGasVolFirst;
	}

	public void setHsGasVolFirst(Double hsGasVolFirst) {
		this.hsGasVolFirst = hsGasVolFirst;
	}

	public String getHsPaymentType() {
		return hsPaymentType;
	}

	public void setHsPaymentType(String hsPaymentType) {
		this.hsPaymentType = hsPaymentType;
	}

	public String getHsRegisterTime() {
		return hsRegisterTime;
	}

	public void setHsRegisterTime(String hsRegisterTime) {
		this.hsRegisterTime = hsRegisterTime;
	}

	public String getHsAddProvince() {
		return hsAddProvince;
	}

	public void setHsAddProvince(String hsAddProvince) {
		this.hsAddProvince = hsAddProvince;
	}

	public String getHsAddCity() {
		return hsAddCity;
	}

	public void setHsAddCity(String hsAddCity) {
		this.hsAddCity = hsAddCity;
	}

	public String getHsAddDistrict() {
		return hsAddDistrict;
	}

	public void setHsAddDistrict(String hsAddDistrict) {
		this.hsAddDistrict = hsAddDistrict;
	}

	public String getHsAddZone() {
		return hsAddZone;
	}

	public void setHsAddZone(String hsAddZone) {
		this.hsAddZone = hsAddZone;
	}

	public String getHsAddStreet() {
		return hsAddStreet;
	}

	public void setHsAddStreet(String hsAddStreet) {
		this.hsAddStreet = hsAddStreet;
	}

	public String getHsAddCommunity() {
		return hsAddCommunity;
	}

	public void setHsAddCommunity(String hsAddCommunity) {
		this.hsAddCommunity = hsAddCommunity;
	}

	public String getHsAddBuilding() {
		return hsAddBuilding;
	}

	public void setHsAddBuilding(String hsAddBuilding) {
		this.hsAddBuilding = hsAddBuilding;
	}

	public String getHsAddDoorplateno() {
		return hsAddDoorplateno;
	}

	public void setHsAddDoorplateno(String hsAddDoorplateno) {
		this.hsAddDoorplateno = hsAddDoorplateno;
	}

	public Double getHsHouseDeposit() {
		return hsHouseDeposit;
	}

	public void setHsHouseDeposit(Double hsHouseDeposit) {
		this.hsHouseDeposit = hsHouseDeposit;
	}

	public String getHsTheTerm() {
		return hsTheTerm;
	}

	public void setHsTheTerm(String hsTheTerm) {
		this.hsTheTerm = hsTheTerm;
	}

	public String getHsBeginTime() {
		return hsBeginTime;
	}

	public void setHsBeginTime(String hsBeginTime) {
		this.hsBeginTime = hsBeginTime;
	}

	public String getHsEndTime() {
		return hsEndTime;
	}

	public void setHsEndTime(String hsEndTime) {
		this.hsEndTime = hsEndTime;
	}

	public String getHsLeaseState() {
		return hsLeaseState;
	}

	public void setHsLeaseState(String hsLeaseState) {
		this.hsLeaseState = hsLeaseState;
	}

	public String getHsHouseKey() {
		return hsHouseKey;
	}

	public void setHsHouseKey(String hsHouseKey) {
		this.hsHouseKey = hsHouseKey;
	}

	public Integer getHsRentHoliday() {
		return hsRentHoliday;
	}

	public void setHsRentHoliday(Integer hsRentHoliday) {
		this.hsRentHoliday = hsRentHoliday;
	}

	public String getHsHouseNote() {
		return hsHouseNote;
	}

	public void setHsHouseNote(String hsHouseNote) {
		this.hsHouseNote = hsHouseNote;
	}

	public Integer getHsVacancyDay() {
		return hsVacancyDay;
	}

	public void setHsVacancyDay(Integer hsVacancyDay) {
		this.hsVacancyDay = hsVacancyDay;
	}

	public String getHsState() {
		return hsState;
	}

	public void setHsState(String hsState) {
		this.hsState = hsState;
	}

	public String getHsAssist() {
		return hsAssist;
	}

	public void setHsAssist(String hsAssist) {
		this.hsAssist = hsAssist;
	}

	public Integer getHsStorefront() {
		return hsStorefront;
	}

	public void setHsStorefront(Integer hsStorefront) {
		this.hsStorefront = hsStorefront;
	}

	public Integer getHsDepartment() {
		return hsDepartment;
	}

	public void setHsDepartment(Integer hsDepartment) {
		this.hsDepartment = hsDepartment;
	}

	public String getHsMeterReadingRecord() {
		return hsMeterReadingRecord;
	}

	public void setHsMeterReadingRecord(String hsMeterReadingRecord) {
		this.hsMeterReadingRecord = hsMeterReadingRecord;
	}

	public Double getHsBase() {
		return hsBase;
	}

	public void setHsBase(Double hsBase) {
		this.hsBase = hsBase;
	}

	public Double getTempBase() {
		return tempBase;
	}

	public void setTempBase(Double tempBase) {
		this.tempBase = tempBase;
	}

	public Double getHsDailyRent() {
		return hsDailyRent;
	}

	public void setHsDailyRent(Double hsDailyRent) {
		this.hsDailyRent = hsDailyRent;
	}

	public Double getHsHotDailyRent() {
		return hsHotDailyRent;
	}

	public void setHsHotDailyRent(Double hsHotDailyRent) {
		this.hsHotDailyRent = hsHotDailyRent;
	}

	public Integer getHsDirtyHouse() {
		return hsDirtyHouse;
	}

	public void setHsDirtyHouse(Integer hsDirtyHouse) {
		this.hsDirtyHouse = hsDirtyHouse;
	}

	public Integer getHsLeaseType() {
		return hsLeaseType;
	}

	public void setHsLeaseType(Integer hsLeaseType) {
		this.hsLeaseType = hsLeaseType;
	}

	public String getHsRoomType() {
		return hsRoomType;
	}

	public void setHsRoomType(String hsRoomType) {
		this.hsRoomType = hsRoomType;
	}

	public String getTempAssist() {
		return tempAssist;
	}

	public void setTempAssist(String tempAssist) {
		this.tempAssist = tempAssist;
	}

	public Double getHsGuidePrice() {
		return hsGuidePrice;
	}

	public void setHsGuidePrice(Double hsGuidePrice) {
		this.hsGuidePrice = hsGuidePrice;
	}

	public Double getHsRelationsCost() {
		return hsRelationsCost;
	}

	public void setHsRelationsCost(Double hsRelationsCost) {
		this.hsRelationsCost = hsRelationsCost;
	}

	public Double getHsManagedCost() {
		return hsManagedCost;
	}

	public void setHsManagedCost(Double hsManagedCost) {
		this.hsManagedCost = hsManagedCost;
	}

	public Integer getHsDecorationHoliday() {
		return hsDecorationHoliday;
	}

	public void setHsDecorationHoliday(Integer hsDecorationHoliday) {
		this.hsDecorationHoliday = hsDecorationHoliday;
	}

	public String getHsBankType() {
		return hsBankType;
	}

	public void setHsBankType(String hsBankType) {
		this.hsBankType = hsBankType;
	}

	public String getHsBankNum() {
		return hsBankNum;
	}

	public void setHsBankNum(String hsBankNum) {
		this.hsBankNum = hsBankNum;
	}

	public String getHsBankName() {
		return hsBankName;
	}

	public void setHsBankName(String hsBankName) {
		this.hsBankName = hsBankName;
	}

	public String getHsDownDeposit() {
		return hsDownDeposit;
	}

	public void setHsDownDeposit(String hsDownDeposit) {
		this.hsDownDeposit = hsDownDeposit;
	}

	public Double getHsDepositAmount() {
		return hsDepositAmount;
	}

	public void setHsDepositAmount(Double hsDepositAmount) {
		this.hsDepositAmount = hsDepositAmount;
	}

	public String getHsDespositJson() {
		return hsDespositJson;
	}

	public void setHsDespositJson(String hsDespositJson) {
		this.hsDespositJson = hsDespositJson;
	}

	public Integer getHsIntentionalId() {
		return hsIntentionalId;
	}

	public void setHsIntentionalId(Integer hsIntentionalId) {
		this.hsIntentionalId = hsIntentionalId;
	}

	public Integer getHsSalesmanId() {
		return hsSalesmanId;
	}

	public void setHsSalesmanId(Integer hsSalesmanId) {
		this.hsSalesmanId = hsSalesmanId;
	}

	public String getHsStartDate() {
		return hsStartDate;
	}

	public void setHsStartDate(String hsStartDate) {
		this.hsStartDate = hsStartDate;
	}

	public String getHsEndDate() {
		return hsEndDate;
	}

	public void setHsEndDate(String hsEndDate) {
		this.hsEndDate = hsEndDate;
	}

	public Integer getHsDespositAccount() {
		return hsDespositAccount;
	}

	public void setHsDespositAccount(Integer hsDespositAccount) {
		this.hsDespositAccount = hsDespositAccount;
	}

	public Integer getHsManagerUserId() {
		return hsManagerUserId;
	}

	public void setHsManagerUserId(Integer hsManagerUserId) {
		this.hsManagerUserId = hsManagerUserId;
	}

	public String getHsManagerUserName() {
		return hsManagerUserName;
	}

	public void setHsManagerUserName(String hsManagerUserName) {
		this.hsManagerUserName = hsManagerUserName;
	}

	public Integer getHsPrimitiveMother() {
		return hsPrimitiveMother;
	}

	public void setHsPrimitiveMother(Integer hsPrimitiveMother) {
		this.hsPrimitiveMother = hsPrimitiveMother;
	}

	public Integer getHsNotRentSplit() {
		return hsNotRentSplit;
	}

	public void setHsNotRentSplit(Integer hsNotRentSplit) {
		this.hsNotRentSplit = hsNotRentSplit;
	}

	public String getHsSplitIdentifier() {
		return hsSplitIdentifier;
	}

	public void setHsSplitIdentifier(String hsSplitIdentifier) {
		this.hsSplitIdentifier = hsSplitIdentifier;
	}

	public String getHsReleaseStatus() {
		return hsReleaseStatus;
	}

	public void setHsReleaseStatus(String hsReleaseStatus) {
		this.hsReleaseStatus = hsReleaseStatus;
	}

	public String getHsReleasePicture() {
		return hsReleasePicture;
	}

	public void setHsReleasePicture(String hsReleasePicture) {
		this.hsReleasePicture = hsReleasePicture;
	}

	public String getHsMainImg() {
		return hsMainImg;
	}

	public void setHsMainImg(String hsMainImg) {
		this.hsMainImg = hsMainImg;
	}

	public String getHsOtherImg() {
		return hsOtherImg;
	}

	public void setHsOtherImg(String hsOtherImg) {
		this.hsOtherImg = hsOtherImg;
	}

	public String getHsHouseTitle() {
		return hsHouseTitle;
	}

	public void setHsHouseTitle(String hsHouseTitle) {
		this.hsHouseTitle = hsHouseTitle;
	}

	public String getHsCorridor() {
		return hsCorridor;
	}

	public void setHsCorridor(String hsCorridor) {
		this.hsCorridor = hsCorridor;
	}

	public String getHsApplianceSettings() {
		return hsApplianceSettings;
	}

	public void setHsApplianceSettings(String hsApplianceSettings) {
		this.hsApplianceSettings = hsApplianceSettings;
	}

	public String getHsOpenHome() {
		return hsOpenHome;
	}

	public void setHsOpenHome(String hsOpenHome) {
		this.hsOpenHome = hsOpenHome;
	}

	public String getHsReleaseTime() {
		return hsReleaseTime;
	}

	public void setHsReleaseTime(String hsReleaseTime) {
		this.hsReleaseTime = hsReleaseTime;
	}

	public String getHsChargesPaid() {
		return hsChargesPaid;
	}

	public void setHsChargesPaid(String hsChargesPaid) {
		this.hsChargesPaid = hsChargesPaid;
	}

	public String getHsDecorationLabel() {
		return hsDecorationLabel;
	}

	public void setHsDecorationLabel(String hsDecorationLabel) {
		this.hsDecorationLabel = hsDecorationLabel;
	}

	public String getHsDeviceJson() {
		return hsDeviceJson;
	}

	public void setHsDeviceJson(String hsDeviceJson) {
		this.hsDeviceJson = hsDeviceJson;
	}

	public Integer getHsMicronetIdentification() {
		return hsMicronetIdentification;
	}

	public void setHsMicronetIdentification(Integer hsMicronetIdentification) {
		this.hsMicronetIdentification = hsMicronetIdentification;
	}

	public Double getHsTransactionPrice() {
		return hsTransactionPrice;
	}

	public void setHsTransactionPrice(Double hsTransactionPrice) {
		this.hsTransactionPrice = hsTransactionPrice;
	}

	public Double getHsInPrice() {
		return hsInPrice;
	}

	public void setHsInPrice(Double hsInPrice) {
		this.hsInPrice = hsInPrice;
	}

	public Double getHsOutPrice() {
		return hsOutPrice;
	}

	public void setHsOutPrice(Double hsOutPrice) {
		this.hsOutPrice = hsOutPrice;
	}

	public Integer getHsTotalVacancyDay() {
		return hsTotalVacancyDay;
	}

	public void setHsTotalVacancyDay(Integer hsTotalVacancyDay) {
		this.hsTotalVacancyDay = hsTotalVacancyDay;
	}

	public Double getHsTotalVacancyCost() {
		return hsTotalVacancyCost;
	}

	public void setHsTotalVacancyCost(Double hsTotalVacancyCost) {
		this.hsTotalVacancyCost = hsTotalVacancyCost;
	}

	public Double getHsLatestVacancyCost() {
		return hsLatestVacancyCost;
	}

	public void setHsLatestVacancyCost(Double hsLatestVacancyCost) {
		this.hsLatestVacancyCost = hsLatestVacancyCost;
	}

	public Integer getHsPopId() {
		return hsPopId;
	}

	public void setHsPopId(Integer hsPopId) {
		this.hsPopId = hsPopId;
	}

	public String getHsPriceLadder() {
		return hsPriceLadder;
	}

	public void setHsPriceLadder(String hsPriceLadder) {
		this.hsPriceLadder = hsPriceLadder;
	}

	private Integer addHsId;
	
	public Integer getAddHsId() {
		return addHsId;
	}

	public void setAddHsId(Integer addHsId) {
		this.addHsId = addHsId;
	}

	private String userName;
	
	private String hdCity;

    private String hdDistrict;

    private String hdZone;

    private String hdRoad;

    private String hdCommunity;

    private String hdPinyin;

    private String hdBaiduLongitudeX;

    private String hdBaiduLatitudeY;

    private String hdBuildingForm;

    private String hdPropertyType;

    private String hdBuildingDevelopers;

    private String hdBeCompletedTime;

    private String hdItemFeatures;

    private String hdLoopPosition;

    private Double hdPlotRatio;

    private Double hdAfforestationRate;

    private String hdPropertyFee;

    private String hdPropertyCompany;

    private String hdAdditionalInformation;

    private Double hdCoversAnAreaOf;

    private Double hdFloorArea;

    private String hdSumHouseholds;

    private Integer hdTheCurrentNumber;

    private Integer hdParkingSpaceTop;

    private String hdParkingSpaceNuder;

    private String hdZoneBitIntroduce;
    
    private Integer lipRegistrar;

    private String lipLandlordName;

    private String lipLandlordPhone;

    private String lipLandlordOtherContact;

    private String lipContactsPeople;

    private String lipContactInformation;

    private String lipOtherContactInfo;

    private String lipTheAgent;

    private String lipAgentPhone;

    private String lipAgentOtherContact;

    private String lipRegistrationTime;
    
    private String lipNote;
    
    private String tenantName;
    private String whilePeopleName;
    private String keyPeopleName;
    
    private String billingDateFrom;
    
    private String billingDateTo;
    
    private Double income;
    
    private Double expenditure;
    
    private Double strike;
    
    private Double summary;
    
    private String jsonArray;
    
    private String theSortTerm;
    private String theSortContrary;
    
    private String key;
    
    private Integer consumablesNum;
    private Integer assetsNum;
    
    private String startTime;
    
    private String endTime;
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;

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

    public Integer getConsumablesNum() {
		return consumablesNum;
	}

	public void setConsumablesNum(Integer consumablesNum) {
		this.consumablesNum = consumablesNum;
	}

	public Integer getAssetsNum() {
		return assetsNum;
	}

	public void setAssetsNum(Integer assetsNum) {
		this.assetsNum = assetsNum;
	}

	public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getTheSortTerm() {
		return theSortTerm;
	}

	public void setTheSortTerm(String theSortTerm) {
		this.theSortTerm = theSortTerm;
	}

	public String getTheSortContrary() {
		return theSortContrary;
	}

	public void setTheSortContrary(String theSortContrary) {
		this.theSortContrary = theSortContrary;
	}
    
	public String getKeyPeopleName() {
		return keyPeopleName;
	}

	public void setKeyPeopleName(String keyPeopleName) {
		this.keyPeopleName = keyPeopleName;
	}

	public String getJsonArray() {
		return jsonArray;
	}

	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}

	public Double getSummary() {
		return summary;
	}

	public void setSummary(Double summary) {
		this.summary = summary;
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

	public Double getIncome() {
		return income;
	}

	public void setIncome(Double income) {
		this.income = income;
	}

	public Double getExpenditure() {
		return expenditure;
	}

	public void setExpenditure(Double expenditure) {
		this.expenditure = expenditure;
	}

	public Double getStrike() {
		return strike;
	}

	public void setStrike(Double strike) {
		this.strike = strike;
	}

	public String getTenantName() {
		return tenantName;
	}

	public void setTenantName(String tenantName) {
		this.tenantName = tenantName;
	}

	public String getWhilePeopleName() {
		return whilePeopleName;
	}

	public void setWhilePeopleName(String whilePeopleName) {
		this.whilePeopleName = whilePeopleName;
	}

	public Integer getLipRegistrar() {
		return lipRegistrar;
	}

	public void setLipRegistrar(Integer lipRegistrar) {
		this.lipRegistrar = lipRegistrar;
	}

	public String getLipLandlordName() {
		return lipLandlordName;
	}

	public void setLipLandlordName(String lipLandlordName) {
		this.lipLandlordName = lipLandlordName;
	}

	public String getLipLandlordPhone() {
		return lipLandlordPhone;
	}

	public void setLipLandlordPhone(String lipLandlordPhone) {
		this.lipLandlordPhone = lipLandlordPhone;
	}

	public String getLipLandlordOtherContact() {
		return lipLandlordOtherContact;
	}

	public void setLipLandlordOtherContact(String lipLandlordOtherContact) {
		this.lipLandlordOtherContact = lipLandlordOtherContact;
	}

	public String getLipContactsPeople() {
		return lipContactsPeople;
	}

	public void setLipContactsPeople(String lipContactsPeople) {
		this.lipContactsPeople = lipContactsPeople;
	}

	public String getLipContactInformation() {
		return lipContactInformation;
	}

	public void setLipContactInformation(String lipContactInformation) {
		this.lipContactInformation = lipContactInformation;
	}

	public String getLipOtherContactInfo() {
		return lipOtherContactInfo;
	}

	public void setLipOtherContactInfo(String lipOtherContactInfo) {
		this.lipOtherContactInfo = lipOtherContactInfo;
	}

	public String getLipTheAgent() {
		return lipTheAgent;
	}

	public void setLipTheAgent(String lipTheAgent) {
		this.lipTheAgent = lipTheAgent;
	}

	public String getLipAgentPhone() {
		return lipAgentPhone;
	}

	public void setLipAgentPhone(String lipAgentPhone) {
		this.lipAgentPhone = lipAgentPhone;
	}

	public String getLipAgentOtherContact() {
		return lipAgentOtherContact;
	}

	public void setLipAgentOtherContact(String lipAgentOtherContact) {
		this.lipAgentOtherContact = lipAgentOtherContact;
	}

	public String getLipRegistrationTime() {
		return lipRegistrationTime;
	}

	public void setLipRegistrationTime(String lipRegistrationTime) {
		this.lipRegistrationTime = lipRegistrationTime;
	}

	public String getLipNote() {
		return lipNote;
	}

	public void setLipNote(String lipNote) {
		this.lipNote = lipNote;
	}

	// myFile属性用来封装上传的文件
    private File myFile;

    // myFileContentType属性用来封装上传文件的类型
    private String myFileContentType;

    // myFileFileName属性用来封装上传文件的文件名
    private String myFileFileName;


	// 获得myFile值
    public File getMyFile() {
	return myFile;
    }

    // 设置myFile值
    public void setMyFile(File myFile) {
	this.myFile = myFile;
    }

    // 获得myFileContentType值
    public String getMyFileContentType() {
	return myFileContentType;
    }

    public void setMyFileContentType(String myFileContentType) {
	this.myFileContentType = myFileContentType;
    }

    // 获得myFileFileName值
    public String getMyFileFileName() {
	return myFileFileName;
    }

    // 设置myFileFileName值
    public void setMyFileFileName(String myFileFileName) {
	this.myFileFileName = myFileFileName;
    }
    
	public String getHdCity() {
		return hdCity;
	}

	public void setHdCity(String hdCity) {
		this.hdCity = hdCity;
	}

	public String getHdDistrict() {
		return hdDistrict;
	}

	public void setHdDistrict(String hdDistrict) {
		this.hdDistrict = hdDistrict;
	}

	public String getHdZone() {
		return hdZone;
	}

	public void setHdZone(String hdZone) {
		this.hdZone = hdZone;
	}

	public String getHdRoad() {
		return hdRoad;
	}

	public void setHdRoad(String hdRoad) {
		this.hdRoad = hdRoad;
	}

	public String getHdCommunity() {
		return hdCommunity;
	}

	public void setHdCommunity(String hdCommunity) {
		this.hdCommunity = hdCommunity;
	}

	public String getHdPinyin() {
		return hdPinyin;
	}

	public void setHdPinyin(String hdPinyin) {
		this.hdPinyin = hdPinyin;
	}

	public String getHdBaiduLongitudeX() {
		return hdBaiduLongitudeX;
	}

	public void setHdBaiduLongitudeX(String hdBaiduLongitudeX) {
		this.hdBaiduLongitudeX = hdBaiduLongitudeX;
	}

	public String getHdBaiduLatitudeY() {
		return hdBaiduLatitudeY;
	}

	public void setHdBaiduLatitudeY(String hdBaiduLatitudeY) {
		this.hdBaiduLatitudeY = hdBaiduLatitudeY;
	}

	public String getHdBuildingForm() {
		return hdBuildingForm;
	}

	public void setHdBuildingForm(String hdBuildingForm) {
		this.hdBuildingForm = hdBuildingForm;
	}

	public String getHdPropertyType() {
		return hdPropertyType;
	}

	public void setHdPropertyType(String hdPropertyType) {
		this.hdPropertyType = hdPropertyType;
	}

	public String getHdBuildingDevelopers() {
		return hdBuildingDevelopers;
	}

	public void setHdBuildingDevelopers(String hdBuildingDevelopers) {
		this.hdBuildingDevelopers = hdBuildingDevelopers;
	}

	public String getHdBeCompletedTime() {
		return hdBeCompletedTime;
	}

	public void setHdBeCompletedTime(String hdBeCompletedTime) {
		this.hdBeCompletedTime = hdBeCompletedTime;
	}

	public String getHdItemFeatures() {
		return hdItemFeatures;
	}

	public void setHdItemFeatures(String hdItemFeatures) {
		this.hdItemFeatures = hdItemFeatures;
	}

	public String getHdLoopPosition() {
		return hdLoopPosition;
	}

	public void setHdLoopPosition(String hdLoopPosition) {
		this.hdLoopPosition = hdLoopPosition;
	}

	public Double getHdPlotRatio() {
		return hdPlotRatio;
	}

	public void setHdPlotRatio(Double hdPlotRatio) {
		this.hdPlotRatio = hdPlotRatio;
	}

	public Double getHdAfforestationRate() {
		return hdAfforestationRate;
	}

	public void setHdAfforestationRate(Double hdAfforestationRate) {
		this.hdAfforestationRate = hdAfforestationRate;
	}

	public String getHdPropertyFee() {
		return hdPropertyFee;
	}

	public void setHdPropertyFee(String hdPropertyFee) {
		this.hdPropertyFee = hdPropertyFee;
	}

	public String getHdPropertyCompany() {
		return hdPropertyCompany;
	}

	public void setHdPropertyCompany(String hdPropertyCompany) {
		this.hdPropertyCompany = hdPropertyCompany;
	}

	public String getHdAdditionalInformation() {
		return hdAdditionalInformation;
	}

	public void setHdAdditionalInformation(String hdAdditionalInformation) {
		this.hdAdditionalInformation = hdAdditionalInformation;
	}

	public Double getHdCoversAnAreaOf() {
		return hdCoversAnAreaOf;
	}

	public void setHdCoversAnAreaOf(Double hdCoversAnAreaOf) {
		this.hdCoversAnAreaOf = hdCoversAnAreaOf;
	}

	public Double getHdFloorArea() {
		return hdFloorArea;
	}

	public void setHdFloorArea(Double hdFloorArea) {
		this.hdFloorArea = hdFloorArea;
	}

	public String getHdSumHouseholds() {
		return hdSumHouseholds;
	}

	public void setHdSumHouseholds(String hdSumHouseholds) {
		this.hdSumHouseholds = hdSumHouseholds;
	}

	public Integer getHdTheCurrentNumber() {
		return hdTheCurrentNumber;
	}

	public void setHdTheCurrentNumber(Integer hdTheCurrentNumber) {
		this.hdTheCurrentNumber = hdTheCurrentNumber;
	}

	public Integer getHdParkingSpaceTop() {
		return hdParkingSpaceTop;
	}

	public void setHdParkingSpaceTop(Integer hdParkingSpaceTop) {
		this.hdParkingSpaceTop = hdParkingSpaceTop;
	}

	public String getHdParkingSpaceNuder() {
		return hdParkingSpaceNuder;
	}

	public void setHdParkingSpaceNuder(String hdParkingSpaceNuder) {
		this.hdParkingSpaceNuder = hdParkingSpaceNuder;
	}

	public String getHdZoneBitIntroduce() {
		return hdZoneBitIntroduce;
	}

	public void setHdZoneBitIntroduce(String hdZoneBitIntroduce) {
		this.hdZoneBitIntroduce = hdZoneBitIntroduce;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
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
	public String getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(String totalPage) {
		this.totalPage = totalPage;
	}

	@Override
	public String toString() {
		return "InfoHouseExpand{" +
				"hsId=" + hsId +
				", hsRenterId=" + hsRenterId +
				", hsLandlordId=" + hsLandlordId +
				", hsHouseId=" + hsHouseId +
				", hsUserId=" + hsUserId +
				", hsAdminUserId=" + hsAdminUserId +
				", hsHouseDictId=" + hsHouseDictId +
				", hsSectionType='" + hsSectionType + '\'' +
				", hsHouseType='" + hsHouseType + '\'' +
				", hsHouseDirection='" + hsHouseDirection + '\'' +
				", hsHouseOwner='" + hsHouseOwner + '\'' +
				", hsHouseSquare=" + hsHouseSquare +
				", hsFurnitureConfig='" + hsFurnitureConfig + '\'' +
				", hsHousePrice=" + hsHousePrice +
				", hsWaterVolFirst=" + hsWaterVolFirst +
				", hsElectritVolFirst=" + hsElectritVolFirst +
				", hsGasVolFirst=" + hsGasVolFirst +
				", hsPaymentType='" + hsPaymentType + '\'' +
				", hsRegisterTime='" + hsRegisterTime + '\'' +
				", hsAddProvince='" + hsAddProvince + '\'' +
				", hsAddCity='" + hsAddCity + '\'' +
				", hsAddDistrict='" + hsAddDistrict + '\'' +
				", hsAddZone='" + hsAddZone + '\'' +
				", hsAddStreet='" + hsAddStreet + '\'' +
				", hsAddCommunity='" + hsAddCommunity + '\'' +
				", hsAddBuilding='" + hsAddBuilding + '\'' +
				", hsAddDoorplateno='" + hsAddDoorplateno + '\'' +
				", hsHouseDeposit=" + hsHouseDeposit +
				", hsTheTerm='" + hsTheTerm + '\'' +
				", hsBeginTime='" + hsBeginTime + '\'' +
				", hsEndTime='" + hsEndTime + '\'' +
				", hsLeaseState='" + hsLeaseState + '\'' +
				", hsHouseKey='" + hsHouseKey + '\'' +
				", hsRentHoliday=" + hsRentHoliday +
				", hsHouseNote='" + hsHouseNote + '\'' +
				", hsVacancyDay=" + hsVacancyDay +
				", hsState='" + hsState + '\'' +
				", hsAssist='" + hsAssist + '\'' +
				", hsStorefront=" + hsStorefront +
				", hsDepartment=" + hsDepartment +
				", hsMeterReadingRecord='" + hsMeterReadingRecord + '\'' +
				", hsBase=" + hsBase +
				", tempBase=" + tempBase +
				", hsDailyRent=" + hsDailyRent +
				", hsHotDailyRent=" + hsHotDailyRent +
				", hsDirtyHouse=" + hsDirtyHouse +
				", hsLeaseType=" + hsLeaseType +
				", hsRoomType='" + hsRoomType + '\'' +
				", tempAssist='" + tempAssist + '\'' +
				", hsGuidePrice=" + hsGuidePrice +
				", hsRelationsCost=" + hsRelationsCost +
				", hsManagedCost=" + hsManagedCost +
				", hsDecorationHoliday=" + hsDecorationHoliday +
				", hsBankType='" + hsBankType + '\'' +
				", hsBankNum='" + hsBankNum + '\'' +
				", hsBankName='" + hsBankName + '\'' +
				", hsDownDeposit='" + hsDownDeposit + '\'' +
				", hsDepositAmount=" + hsDepositAmount +
				", hsDespositJson='" + hsDespositJson + '\'' +
				", hsIntentionalId=" + hsIntentionalId +
				", hsSalesmanId=" + hsSalesmanId +
				", hsStartDate='" + hsStartDate + '\'' +
				", hsEndDate='" + hsEndDate + '\'' +
				", hsDespositAccount=" + hsDespositAccount +
				", hsManagerUserId=" + hsManagerUserId +
				", hsManagerUserName='" + hsManagerUserName + '\'' +
				", hsPrimitiveMother=" + hsPrimitiveMother +
				", hsNotRentSplit=" + hsNotRentSplit +
				", hsSplitIdentifier='" + hsSplitIdentifier + '\'' +
				", hsReleaseStatus='" + hsReleaseStatus + '\'' +
				", hsReleasePicture='" + hsReleasePicture + '\'' +
				", hsMainImg='" + hsMainImg + '\'' +
				", hsOtherImg='" + hsOtherImg + '\'' +
				", hsHouseTitle='" + hsHouseTitle + '\'' +
				", hsCorridor='" + hsCorridor + '\'' +
				", hsApplianceSettings='" + hsApplianceSettings + '\'' +
				", hsOpenHome='" + hsOpenHome + '\'' +
				", hsReleaseTime='" + hsReleaseTime + '\'' +
				", hsChargesPaid='" + hsChargesPaid + '\'' +
				", hsDecorationLabel='" + hsDecorationLabel + '\'' +
				", hsDeviceJson='" + hsDeviceJson + '\'' +
				", hsMicronetIdentification=" + hsMicronetIdentification +
				", hsTransactionPrice=" + hsTransactionPrice +
				", hsInPrice=" + hsInPrice +
				", hsOutPrice=" + hsOutPrice +
				", hsTotalVacancyDay=" + hsTotalVacancyDay +
				", hsTotalVacancyCost=" + hsTotalVacancyCost +
				", hsLatestVacancyCost=" + hsLatestVacancyCost +
				", hsPopId=" + hsPopId +
				", hsPriceLadder='" + hsPriceLadder + '\'' +
				", taskSign='" + taskSign + '\'' +
				", houseId=" + houseId +
				", deviceType='" + deviceType + '\'' +
				", devId='" + devId + '\'' +
				", devBrandId=" + devBrandId +
				", devIdftId=" + devIdftId +
				", devIdstId=" + devIdstId +
				", addHsId=" + addHsId +
				", userName='" + userName + '\'' +
				", hdCity='" + hdCity + '\'' +
				", hdDistrict='" + hdDistrict + '\'' +
				", hdZone='" + hdZone + '\'' +
				", hdRoad='" + hdRoad + '\'' +
				", hdCommunity='" + hdCommunity + '\'' +
				", hdPinyin='" + hdPinyin + '\'' +
				", hdBaiduLongitudeX='" + hdBaiduLongitudeX + '\'' +
				", hdBaiduLatitudeY='" + hdBaiduLatitudeY + '\'' +
				", hdBuildingForm='" + hdBuildingForm + '\'' +
				", hdPropertyType='" + hdPropertyType + '\'' +
				", hdBuildingDevelopers='" + hdBuildingDevelopers + '\'' +
				", hdBeCompletedTime='" + hdBeCompletedTime + '\'' +
				", hdItemFeatures='" + hdItemFeatures + '\'' +
				", hdLoopPosition='" + hdLoopPosition + '\'' +
				", hdPlotRatio=" + hdPlotRatio +
				", hdAfforestationRate=" + hdAfforestationRate +
				", hdPropertyFee='" + hdPropertyFee + '\'' +
				", hdPropertyCompany='" + hdPropertyCompany + '\'' +
				", hdAdditionalInformation='" + hdAdditionalInformation + '\'' +
				", hdCoversAnAreaOf=" + hdCoversAnAreaOf +
				", hdFloorArea=" + hdFloorArea +
				", hdSumHouseholds='" + hdSumHouseholds + '\'' +
				", hdTheCurrentNumber=" + hdTheCurrentNumber +
				", hdParkingSpaceTop=" + hdParkingSpaceTop +
				", hdParkingSpaceNuder='" + hdParkingSpaceNuder + '\'' +
				", hdZoneBitIntroduce='" + hdZoneBitIntroduce + '\'' +
				", lipRegistrar=" + lipRegistrar +
				", lipLandlordName='" + lipLandlordName + '\'' +
				", lipLandlordPhone='" + lipLandlordPhone + '\'' +
				", lipLandlordOtherContact='" + lipLandlordOtherContact + '\'' +
				", lipContactsPeople='" + lipContactsPeople + '\'' +
				", lipContactInformation='" + lipContactInformation + '\'' +
				", lipOtherContactInfo='" + lipOtherContactInfo + '\'' +
				", lipTheAgent='" + lipTheAgent + '\'' +
				", lipAgentPhone='" + lipAgentPhone + '\'' +
				", lipAgentOtherContact='" + lipAgentOtherContact + '\'' +
				", lipRegistrationTime='" + lipRegistrationTime + '\'' +
				", lipNote='" + lipNote + '\'' +
				", tenantName='" + tenantName + '\'' +
				", whilePeopleName='" + whilePeopleName + '\'' +
				", keyPeopleName='" + keyPeopleName + '\'' +
				", billingDateFrom='" + billingDateFrom + '\'' +
				", billingDateTo='" + billingDateTo + '\'' +
				", income=" + income +
				", expenditure=" + expenditure +
				", strike=" + strike +
				", summary=" + summary +
				", jsonArray='" + jsonArray + '\'' +
				", theSortTerm='" + theSortTerm + '\'' +
				", theSortContrary='" + theSortContrary + '\'' +
				", key='" + key + '\'' +
				", consumablesNum=" + consumablesNum +
				", assetsNum=" + assetsNum +
				", startTime='" + startTime + '\'' +
				", endTime='" + endTime + '\'' +
				", pageNumber='" + pageNumber + '\'' +
				", startNum='" + startNum + '\'' +
				", endNum='" + endNum + '\'' +
				", totalNum='" + totalNum + '\'' +
				", totalPage='" + totalPage + '\'' +
				", myFile=" + myFile +
				", myFileContentType='" + myFileContentType + '\'' +
				", myFileFileName='" + myFileFileName + '\'' +
				'}';
	}

}