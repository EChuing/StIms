package com.zz.po.info;

public class InfoRenewalRenterExpand extends InfoRenewalRenter{
	
	private Integer updateFlag;
	private Integer HouseId;
	private Integer hsHouseId;
	private String registerPeople;
	private String landlordName;
	private String renterName;
	private String departmentName;
	private String storefrontName;
	private String addCommunity;
    private String addDistrict;
    private String addZone;
    private String addBuilding;
    private String addDoorplateno;
    private String hrState;
    private String renterPhone;
    private Integer dateType;
	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	private String jcdContractPrefix;
	private String jcdContractNumber;
	private Integer jcdId;
	private Integer adminUser;
	private String jcdHouseAddress;
	private String maxtime;
	private String flag;
	private Double hrHouseDeposit;
	private Integer advanceMode;
	private Integer numberMode;
	private String templateFillValue;
	private String ownerObj;		//业主合约全部信息
	private Double hrPowerDeposit;
	private Double hrOtherDeposit;
	private Double hrDoorDeposit;
	private Double hrWifiCharge;
	private Double hrTvCharge;
	private Double hrOtherPay;
	private String hrHouseNote;
	private Integer jrlId;
	private	Integer renterPopulationId;	//租客表人口id
	private Integer renterId;			//租客表id
	private Integer popId;				//人口表id
	private String  popName;				//人口表租客姓名
	private Integer hsId;				//未租表ID
	private String hsAddCommunity;		//楼盘
	private String hsAddBuilding;		//楼栋
	private String hsAddDoorplateno;	//门牌号
	private String theSortTerm;
	private String theSortContrary;
	private Double contractBillTotal;//签约账单总费用
	private Double refundDeposit; //退定金额
	private Double totalMoney;
	private Double exceptRentAndRefund;
//	private String jciBillJson;
	private String popIdcard;

	/*已租表信息*/
	private String popTelephone;
	private Integer hrHouseId;
	private Integer hrHouseDictId;
	private String hrStorefront;
	private Integer hrLandlordId;
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
	private String hrBeginTime;
	private String hrTheTerm;
	private String hrEndTime;
	private Double hrHousePrice;
	private Double hrDoorTrendFee;
	private Double hrComServiceFee;
	private String hrPaymentType;
	private Integer hrUserId;
	private Integer hrAdminUserId;
	private String hrDepartment;
	private Integer hrWaterPlan;
	private Integer hrElectritPlan;
	private Integer hrGasPlan;
	private String hrSectionType;
	private Integer hrHotairPlan;
	private Integer hrManagerUserId;
	private Integer hrFlatShareLogo;
	private Integer hrHotwaterPlan;
	private String taskTimeConsumingJson;
	private String jsonArray;
	private String moveAsset;
	private String hsDepositAmount;
	private String jsonStrArry;

	public String getJsonStrArry() {
		return jsonStrArry;
	}

	public void setJsonStrArry(String jsonStrArry) {
		this.jsonStrArry = jsonStrArry;
	}

	public String getHsDepositAmount() {
		return hsDepositAmount;
	}

	public void setHsDepositAmount(String hsDepositAmount) {
		this.hsDepositAmount = hsDepositAmount;
	}

	public String getMoveAsset() {
		return moveAsset;
	}

	public void setMoveAsset(String moveAsset) {
		this.moveAsset = moveAsset;
	}

	public String getJsonArray() {
		return jsonArray;
	}
	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}
	public String getTaskTimeConsumingJson() {
		return taskTimeConsumingJson;
	}
	public void setTaskTimeConsumingJson(String taskTimeConsumingJson) {
		this.taskTimeConsumingJson = taskTimeConsumingJson;
	}
	public String getPopIdcard() {
		return popIdcard;
	}
	public void setPopIdcard(String popIdcard) {
		this.popIdcard = popIdcard;
	}
	/*public String getJciBillJson() {
		return jciBillJson;
	}

	public void setJciBillJson(String jciBillJson) {
		this.jciBillJson = jciBillJson;
	}*/

	@Override
	public String getPopTelephone() {
		return popTelephone;
	}

	@Override
	public void setPopTelephone(String popTelephone) {
		this.popTelephone = popTelephone;
	}

	public Integer getHrHotwaterPlan() {
		return hrHotwaterPlan;
	}

	public void setHrHotwaterPlan(Integer hrHotwaterPlan) {
		this.hrHotwaterPlan = hrHotwaterPlan;
	}

	public Integer getHrFlatShareLogo() {
		return hrFlatShareLogo;
	}

	public void setHrFlatShareLogo(Integer hrFlatShareLogo) {
		this.hrFlatShareLogo = hrFlatShareLogo;
	}

	public Integer getHrManagerUserId() {
		return hrManagerUserId;
	}

	public void setHrManagerUserId(Integer hrManagerUserId) {
		this.hrManagerUserId = hrManagerUserId;
	}

	public Integer getHrHotairPlan() {
		return hrHotairPlan;
	}

	public void setHrHotairPlan(Integer hrHotairPlan) {
		this.hrHotairPlan = hrHotairPlan;
	}

	public String getHrSectionType() {
		return hrSectionType;
	}

	public void setHrSectionType(String hrSectionType) {
		this.hrSectionType = hrSectionType;
	}

	public String getHrStorefront() {
		return hrStorefront;
	}

	public void setHrStorefront(String hrStorefront) {
		this.hrStorefront = hrStorefront;
	}

	public Integer getHrLandlordId() {
		return hrLandlordId;
	}

	public void setHrLandlordId(Integer hrLandlordId) {
		this.hrLandlordId = hrLandlordId;
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

	public String getHrBeginTime() {
		return hrBeginTime;
	}

	public void setHrBeginTime(String hrBeginTime) {
		this.hrBeginTime = hrBeginTime;
	}

	public String getHrTheTerm() {
		return hrTheTerm;
	}

	public void setHrTheTerm(String hrTheTerm) {
		this.hrTheTerm = hrTheTerm;
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

	public Double getHrDoorTrendFee() {
		return hrDoorTrendFee;
	}

	public void setHrDoorTrendFee(Double hrDoorTrendFee) {
		this.hrDoorTrendFee = hrDoorTrendFee;
	}

	public Double getHrComServiceFee() {
		return hrComServiceFee;
	}

	public void setHrComServiceFee(Double hrComServiceFee) {
		this.hrComServiceFee = hrComServiceFee;
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

	public String getHrDepartment() {
		return hrDepartment;
	}

	public void setHrDepartment(String hrDepartment) {
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

	public Integer getHrHouseDictId() {
		return hrHouseDictId;
	}

	public void setHrHouseDictId(Integer hrHouseDictId) {
		this.hrHouseDictId = hrHouseDictId;
	}

	public Integer getHrHouseId() {
		return hrHouseId;
	}

	public void setHrHouseId(Integer hrHouseId) {
		this.hrHouseId = hrHouseId;
	}

	public Double getExceptRentAndRefund() { return exceptRentAndRefund; }

	public void setExceptRentAndRefund(Double exceptRentAndRefund) {
		this.exceptRentAndRefund = exceptRentAndRefund;
	}
	public Double getTotalMoney() {
		return totalMoney;
	}
	public void setTotalMoney(Double totalMoney) {
		this.totalMoney = totalMoney;
	}
	public Double getRefundDeposit() {
		return refundDeposit;
	}
	public void setRefundDeposit(Double refundDeposit) {
		this.refundDeposit = refundDeposit;
	}
	public Double getContractBillTotal() { return contractBillTotal; }
	public void setContractBillTotal(Double contractBillTotal) { this.contractBillTotal = contractBillTotal; }
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
	public String getHrHouseNote() {
		return hrHouseNote;
	}
	public void setHrHouseNote(String hrHouseNote) {
		this.hrHouseNote = hrHouseNote;
	}
	public Double getHrPowerDeposit() {
		return hrPowerDeposit;
	}
	public void setHrPowerDeposit(Double hrPowerDeposit) {
		this.hrPowerDeposit = hrPowerDeposit;
	}
	public Double getHrOtherDeposit() {
		return hrOtherDeposit;
	}
	public void setHrOtherDeposit(Double hrOtherDeposit) {
		this.hrOtherDeposit = hrOtherDeposit;
	}
	public Double getHrDoorDeposit() {
		return hrDoorDeposit;
	}
	public void setHrDoorDeposit(Double hrDoorDeposit) {
		this.hrDoorDeposit = hrDoorDeposit;
	}
	public Double getHrWifiCharge() {
		return hrWifiCharge;
	}
	public void setHrWifiCharge(Double hrWifiCharge) {
		this.hrWifiCharge = hrWifiCharge;
	}
	public Double getHrTvCharge() {
		return hrTvCharge;
	}
	public void setHrTvCharge(Double hrTvCharge) {
		this.hrTvCharge = hrTvCharge;
	}
	public Double getHrOtherPay() {
		return hrOtherPay;
	}
	public void setHrOtherPay(Double hrOtherPay) {
		this.hrOtherPay = hrOtherPay;
	}
	public String getTemplateFillValue() {
		return templateFillValue;
	}
	public void setTemplateFillValue(String templateFillValue) {
		this.templateFillValue = templateFillValue;
	}
	public Integer getHouseId() {
		return HouseId;
	}
	public void setHouseId(Integer houseId) {
		HouseId = houseId;
	}
	public Integer getNumberMode() {
		return numberMode;
	}
	public void setNumberMode(Integer numberMode) {
		this.numberMode = numberMode;
	}
	public Integer getAdvanceMode() {
		return advanceMode;
	}
	public void setAdvanceMode(Integer advanceMode) {
		this.advanceMode = advanceMode;
	}
	public Double getHrHouseDeposit() {
        return hrHouseDeposit;
    }
    public void setHrHouseDeposit(Double hrHouseDeposit) {
        this.hrHouseDeposit = hrHouseDeposit;
    }
    public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getMaxtime() {
		return maxtime;
	}
	public void setMaxtime(String maxtime) {
		this.maxtime = maxtime;
	}
	public String getHrState() {
		return hrState;
	}
	public void setHrState(String hrState) {
		this.hrState = hrState;
	}
	public String getJcdHouseAddress() {
		return jcdHouseAddress;
	}
	public void setJcdHouseAddress(String jcdHouseAddress) {
		this.jcdHouseAddress = jcdHouseAddress;
	}
	public Integer getAdminUser() {
		return adminUser;
	}
	public void setAdminUser(Integer adminUser) {
		this.adminUser = adminUser;
	}
	public Integer getJcdId() {
		return jcdId;
	}
	public void setJcdId(Integer jcdId) {
		this.jcdId = jcdId;
	}
	public Integer getDateType() {
		return dateType;
	}
	public void setDateType(Integer dateType) {
		this.dateType = dateType;
	}
	public String getRenterPhone() {
		return renterPhone;
	}
	public void setRenterPhone(String renterPhone) {
		this.renterPhone = renterPhone;
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
	public String getRegisterPeople() {
		return registerPeople;
	}
	public void setRegisterPeople(String registerPeople) {
		this.registerPeople = registerPeople;
	}
	public String getLandlordName() {
		return landlordName;
	}
	public void setLandlordName(String landlordName) {
		this.landlordName = landlordName;
	}
	public String getRenterName() {
		return renterName;
	}
	public void setRenterName(String renterName) {
		this.renterName = renterName;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getStorefrontName() {
		return storefrontName;
	}
	public void setStorefrontName(String storefrontName) {
		this.storefrontName = storefrontName;
	}
	public String getAddCommunity() {
		return addCommunity;
	}
	public void setAddCommunity(String addCommunity) {
		this.addCommunity = addCommunity;
	}
	public String getAddDistrict() {
		return addDistrict;
	}
	public void setAddDistrict(String addDistrict) {
		this.addDistrict = addDistrict;
	}
	public String getAddZone() {
		return addZone;
	}
	public void setAddZone(String addZone) {
		this.addZone = addZone;
	}
	public String getAddBuilding() {
		return addBuilding;
	}
	public void setAddBuilding(String addBuilding) {
		this.addBuilding = addBuilding;
	}
	public String getAddDoorplateno() {
		return addDoorplateno;
	}
	public void setAddDoorplateno(String addDoorplateno) {
		this.addDoorplateno = addDoorplateno;
	}
	public String getJcdContractPrefix() {
		return jcdContractPrefix;
	}
	public void setJcdContractPrefix(String jcdContractPrefix) {
		this.jcdContractPrefix = jcdContractPrefix;
	}
	public String getJcdContractNumber() {
		return jcdContractNumber;
	}
	public void setJcdContractNumber(String jcdContractNumber) {
		this.jcdContractNumber = jcdContractNumber;
	}
	public Integer getUpdateFlag() {
		return updateFlag;
	}
	public void setUpdateFlag(Integer updateFlag) {
		this.updateFlag = updateFlag;
	}
	public String getOwnerObj() {
		return ownerObj;
	}
	public void setOwnerObj(String ownerObj) {
		this.ownerObj = ownerObj;
	}
	public Integer getHsHouseId() {
		return hsHouseId;
	}
	public void setHsHouseId(Integer hsHouseId) {
		this.hsHouseId = hsHouseId;
	}
	public Integer getRenterPopulationId() {
		return renterPopulationId;
	}
	public void setRenterPopulationId(Integer renterPopulationId) {
		this.renterPopulationId = renterPopulationId;
	}
	public String getPopName() {
		return popName;
	}
	public void setPopName(String popName) {
		this.popName = popName;
	}
	public Integer getRenterId() {
		return renterId;
	}
	public void setRenterId(Integer renterId) {
		this.renterId = renterId;
	}
	public Integer getPopId() {
		return popId;
	}
	public void setPopId(Integer popId) {
		this.popId = popId;
	}
	public Integer getHsId() {
		return hsId;
	}
	public void setHsId(Integer hsId) {
		this.hsId = hsId;
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
	public Integer getJrlId() {
		return jrlId;
	}
	public void setJrlId(Integer jrlId) {
		this.jrlId = jrlId;
	}

	@Override
	public String toString() {
		return "InfoRenewalRenterExpand{" +
				"updateFlag=" + updateFlag +
				", HouseId=" + HouseId +
				", hsHouseId=" + hsHouseId +
				", registerPeople='" + registerPeople + '\'' +
				", landlordName='" + landlordName + '\'' +
				", renterName='" + renterName + '\'' +
				", departmentName='" + departmentName + '\'' +
				", storefrontName='" + storefrontName + '\'' +
				", addCommunity='" + addCommunity + '\'' +
				", addDistrict='" + addDistrict + '\'' +
				", addZone='" + addZone + '\'' +
				", addBuilding='" + addBuilding + '\'' +
				", addDoorplateno='" + addDoorplateno + '\'' +
				", hrState='" + hrState + '\'' +
				", renterPhone='" + renterPhone + '\'' +
				", dateType=" + dateType +
				", pageNumber='" + pageNumber + '\'' +
				", startNum='" + startNum + '\'' +
				", endNum='" + endNum + '\'' +
				", totalNum='" + totalNum + '\'' +
				", totalPage='" + totalPage + '\'' +
				", jcdContractPrefix='" + jcdContractPrefix + '\'' +
				", jcdContractNumber='" + jcdContractNumber + '\'' +
				", jcdId=" + jcdId +
				", adminUser=" + adminUser +
				", jcdHouseAddress='" + jcdHouseAddress + '\'' +
				", maxtime='" + maxtime + '\'' +
				", flag='" + flag + '\'' +
				", hrHouseDeposit=" + hrHouseDeposit +
				", advanceMode=" + advanceMode +
				", numberMode=" + numberMode +
				", templateFillValue='" + templateFillValue + '\'' +
				", ownerObj='" + ownerObj + '\'' +
				", hrPowerDeposit=" + hrPowerDeposit +
				", hrOtherDeposit=" + hrOtherDeposit +
				", hrDoorDeposit=" + hrDoorDeposit +
				", hrWifiCharge=" + hrWifiCharge +
				", hrTvCharge=" + hrTvCharge +
				", hrOtherPay=" + hrOtherPay +
				", hrHouseNote='" + hrHouseNote + '\'' +
				", jrlId=" + jrlId +
				", renterPopulationId=" + renterPopulationId +
				", renterId=" + renterId +
				", popId=" + popId +
				", popName='" + popName + '\'' +
				", hsId=" + hsId +
				", hsAddCommunity='" + hsAddCommunity + '\'' +
				", hsAddBuilding='" + hsAddBuilding + '\'' +
				", hsAddDoorplateno='" + hsAddDoorplateno + '\'' +
				", theSortTerm='" + theSortTerm + '\'' +
				", theSortContrary='" + theSortContrary + '\'' +
				", contractBillTotal=" + contractBillTotal +
				", refundDeposit=" + refundDeposit +
				", totalMoney=" + totalMoney +
				", exceptRentAndRefund=" + exceptRentAndRefund +
				", popIdcard='" + popIdcard + '\'' +
				", popTelephone='" + popTelephone + '\'' +
				", hrHouseId=" + hrHouseId +
				", hrHouseDictId=" + hrHouseDictId +
				", hrStorefront='" + hrStorefront + '\'' +
				", hrLandlordId=" + hrLandlordId +
				", hrHouseOwner='" + hrHouseOwner + '\'' +
				", hrHouseSquare=" + hrHouseSquare +
				", hrHouseDirection='" + hrHouseDirection + '\'' +
				", hrSplitIdentifier='" + hrSplitIdentifier + '\'' +
				", hrAddCity='" + hrAddCity + '\'' +
				", hrAddDistrict='" + hrAddDistrict + '\'' +
				", hrAddZone='" + hrAddZone + '\'' +
				", hrAddStreet='" + hrAddStreet + '\'' +
				", hrAddCommunity='" + hrAddCommunity + '\'' +
				", hrAddBuilding='" + hrAddBuilding + '\'' +
				", hrAddDoorplateno='" + hrAddDoorplateno + '\'' +
				", hrWaterVolFirst=" + hrWaterVolFirst +
				", hrElectritVolFirst=" + hrElectritVolFirst +
				", hrGasVolFirst=" + hrGasVolFirst +
				", hrHotWaterVolFirst=" + hrHotWaterVolFirst +
				", hrHotAirVolFirst=" + hrHotAirVolFirst +
				", hrBeginTime='" + hrBeginTime + '\'' +
				", hrTheTerm='" + hrTheTerm + '\'' +
				", hrEndTime='" + hrEndTime + '\'' +
				", hrHousePrice=" + hrHousePrice +
				", hrDoorTrendFee=" + hrDoorTrendFee +
				", hrComServiceFee=" + hrComServiceFee +
				", hrPaymentType='" + hrPaymentType + '\'' +
				", hrUserId=" + hrUserId +
				", hrAdminUserId=" + hrAdminUserId +
				", hrDepartment='" + hrDepartment + '\'' +
				", hrWaterPlan=" + hrWaterPlan +
				", hrElectritPlan=" + hrElectritPlan +
				", hrGasPlan=" + hrGasPlan +
				", hrSectionType='" + hrSectionType + '\'' +
				", hrHotairPlan=" + hrHotairPlan +
				", hrManagerUserId=" + hrManagerUserId +
				", hrFlatShareLogo=" + hrFlatShareLogo +
				", hrHotwaterPlan=" + hrHotwaterPlan +
				", taskTimeConsumingJson='" + taskTimeConsumingJson + '\'' +
				", jsonArray='" + jsonArray + '\'' +
				", moveAsset='" + moveAsset + '\'' +
				", hsDepositAmount='" + hsDepositAmount + '\'' +
				", jsonStrArry='" + jsonStrArry + '\'' +
				"} " + super.toString();
	}
}