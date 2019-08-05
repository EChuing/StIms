package com.zz.po.info;

import java.util.List;

public class InfoHouse4storeExpand extends InfoHouse4store{
	private String houseEntrust4sell;
	
	private String hdCity;

    private String hdDistrict;

    private String hdZone;

    private String hdRoad;

    private String hdCommunity;
    
    private String hdProvince;

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
    
    private Integer assistUserId;
    private Integer assistDepartment;
    
    private String popName;
    private String popTelephone;
    private String popIdcard;
    private String popIdcardAddress;
    private String popBirth;
    private String popSex;
    private String popNation;
    private String popImgPath;
    
    private Integer jrlId;

    private String jrlRenewalCoding;

    private Integer jrlHouse4storeId;

    private Integer jrlLandlordId;

    private Integer jrlUserId;

    private Integer jrlDepartment;

    private Integer jrlStorefront;

    private String jrlContractType;

    private String jrlRentalType;

    private String jrlBeginTime;

    private String jrlEndTime;

    private String jrlSignedTime;

    private String jrlRegistrationTime;

    private String jrlTheTerm;

    private Integer jrlInAdvancePay;

    private String jrlPriceLadder;

    private Integer jrlRentFreeDays;

    private String jrlRentFreeSegment;

    private String jrlPaymentMethod;

    private String jrlRemark;

    private String jrlImgPath;
    
    private String jrlImgNum;
    
    private Integer jrlFreeDaysDecoration;
    
    private Integer jrlFreeDaysHeader;
    
    private Integer laId;
    private Integer laUserId;
    private Integer laDepartment;
    private Integer laStorefront;
    private String landlordOtherContact;
    private String laSecondContacts;
    private String laSecondPhone;
    private String laOtherContact;
    
    private Integer laPopulationId;
    private String laPopName;
    private String laPopTelephone;
    private String laPopIdcard;
    private String popNameRemark;
    
    private Integer  adminUser;
    private String jsonArray;
    private String followArray;
    private String addRepairs;
    
    private String splitJson;
    
    private Integer accumulation;
    
    private Integer jcdId;
	private String jcdHouseAddress;
	
	private String jcdIdjosn;
	
	private String theSortTerm;
    private String theSortContrary;
    
    private Integer judge;
    private Integer personal;

	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	private String userName;
	private String adminName;
	private String adminPhone;
	private String defaultName;
	private String defaultPhone;
	
	private Integer addHsHouseType;
	private String hsAddFloor;
	private String addAsset;
	
    private String hsCustomContacts;
    
    private Integer nrcId;
    
    private String notRentingJson;
    //距离到期时间
    private Integer dateType;
    
    private String totalNum2;
    
    private String totalNum3;
    
    private String totalNum4;
    
    private String jsrcState;
    private Integer hsMicronetIdentification;
    private Integer jsrsuId;
    
	//维保情况
    private String maintenanceSituation;
    private String popIdcardJson;
    private Integer maxHsNum;
    private Integer shortRentType;
    private Integer splitFlag;
    
    private String startTime;
    private String endTime;
    private String deviceType;
    private List<Integer> jsrcHsIdList;
    //短租设置对应表
    private Integer jshnId;
    private Integer jshnJsrsuId;
    private Integer jshnShdId;

    //智能设备对应表
	private String  devId;
	private Integer devBrandId;
	private String  devNickname;
	private String  devUsername;
	private String  devPassword;
	private String  devAuthId;
	private String  devAuthSecret;
	private String  devSpare1;
	private String  devSpare2;
	private String  devType;
	private String  devDifference;
	private Integer devIdftId;
	private Integer devIdstId;
	private Integer devFirstType;
	private Integer devSecondType;
	private Integer jhdSubDeviceNumber;

	private Integer noOwner;

	public Integer getNoOwner() {
		return noOwner;
	}

	public void setNoOwner(Integer noOwner) {
		this.noOwner = noOwner;
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

	public String getDevNickname() {
		return devNickname;
	}

	public void setDevNickname(String devNickname) {
		this.devNickname = devNickname;
	}

	public String getDevUsername() {
		return devUsername;
	}

	public void setDevUsername(String devUsername) {
		this.devUsername = devUsername;
	}

	public String getDevPassword() {
		return devPassword;
	}

	public void setDevPassword(String devPassword) {
		this.devPassword = devPassword;
	}

	public String getDevAuthId() {
		return devAuthId;
	}

	public void setDevAuthId(String devAuthId) {
		this.devAuthId = devAuthId;
	}

	public String getDevAuthSecret() {
		return devAuthSecret;
	}

	public void setDevAuthSecret(String devAuthSecret) {
		this.devAuthSecret = devAuthSecret;
	}

	public String getDevSpare1() {
		return devSpare1;
	}

	public void setDevSpare1(String devSpare1) {
		this.devSpare1 = devSpare1;
	}

	public String getDevSpare2() {
		return devSpare2;
	}

	public void setDevSpare2(String devSpare2) {
		this.devSpare2 = devSpare2;
	}

	public String getDevType() {
		return devType;
	}

	public void setDevType(String devType) {
		this.devType = devType;
	}

	public String getDevDifference() {
		return devDifference;
	}

	public void setDevDifference(String devDifference) {
		this.devDifference = devDifference;
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

	public Integer getJhdSubDeviceNumber() {
		return jhdSubDeviceNumber;
	}

	public void setJhdSubDeviceNumber(Integer jhdSubDeviceNumber) {
		this.jhdSubDeviceNumber = jhdSubDeviceNumber;
	}

	public String getAddRepairs() {
		return addRepairs;
	}

	public void setAddRepairs(String addRepairs) {
		this.addRepairs = addRepairs;
	}

	public Integer getJshnId() {
		return jshnId;
	}

	public void setJshnId(Integer jshnId) {
		this.jshnId = jshnId;
	}

	public Integer getJshnJsrsuId() {
		return jshnJsrsuId;
	}

	public void setJshnJsrsuId(Integer jshnJsrsuId) {
		this.jshnJsrsuId = jshnJsrsuId;
	}

	public Integer getJshnShdId() {
		return jshnShdId;
	}

	public void setJshnShdId(Integer jshnShdId) {
		this.jshnShdId = jshnShdId;
	}

	public Integer getJsrsuId() {
		return jsrsuId;
	}

	public void setJsrsuId(Integer jsrsuId) {
		this.jsrsuId = jsrsuId;
	}

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

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
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

	public String getPopNation() {
		return popNation;
	}

	public void setPopNation(String popNation) {
		this.popNation = popNation;
	}

	public String getPopImgPath() {
		return popImgPath;
	}

	public void setPopImgPath(String popImgPath) {
		this.popImgPath = popImgPath;
	}

	public String getFollowArray() {
		return followArray;
	}

	public void setFollowArray(String followArray) {
		this.followArray = followArray;
	}

	public Integer getShortRentType() {
		return shortRentType;
	}

	public void setShortRentType(Integer shortRentType) {
		this.shortRentType = shortRentType;
	}

	public String getPopIdcardJson() {
		return popIdcardJson;
	}

	public void setPopIdcardJson(String popIdcardJson) {
		this.popIdcardJson = popIdcardJson;
	}

	public Integer getPersonal() {
        return personal;
    }

    public void setPersonal(Integer personal) {
        this.personal = personal;
    }

    public String getTotalNum4() {
		return totalNum4;
	}

	public void setTotalNum4(String totalNum4) {
		this.totalNum4 = totalNum4;
	}

	public String getMaintenanceSituation() {
		return maintenanceSituation;
	}

	public void setMaintenanceSituation(String maintenanceSituation) {
		this.maintenanceSituation = maintenanceSituation;
	}

	public String getTotalNum2() {
        return totalNum2;
    }

    public void setTotalNum2(String totalNum2) {
        this.totalNum2 = totalNum2;
    }

    public String getTotalNum3() {
        return totalNum3;
    }

    public void setTotalNum3(String totalNum3) {
        this.totalNum3 = totalNum3;
    }

    public Integer getDateType() {
		return dateType;
	}

	public void setDateType(Integer dateType) {
		this.dateType = dateType;
	}

	public String getNotRentingJson() {
		return notRentingJson;
	}

	public void setNotRentingJson(String notRentingJson) {
		this.notRentingJson = notRentingJson;
	}

	public Integer getNrcId() {
        return nrcId;
    }

    public void setNrcId(Integer nrcId) {
        this.nrcId = nrcId;
    }

    public String getPopNameRemark() {
		return popNameRemark;
	}

	public void setPopNameRemark(String popNameRemark) {
		this.popNameRemark = popNameRemark;
	}

	public String getHsCustomContacts() {
		return hsCustomContacts;
	}

	public void setHsCustomContacts(String hsCustomContacts) {
		this.hsCustomContacts = hsCustomContacts;
	}

	public String getAddAsset() {
        return addAsset;
    }

    public void setAddAsset(String addAsset) {
        this.addAsset = addAsset;
    }

    public Integer getAddHsHouseType() {
        return addHsHouseType;
    }

    public void setAddHsHouseType(Integer addHsHouseType) {
        this.addHsHouseType = addHsHouseType;
    }

    private String att;
    
    public String getAtt() {
        return att;
    }

    public void setAtt(String att) {
        this.att = att;
    }

    public Integer getJudge() {
		return judge;
	}

	public void setJudge(Integer judge) {
		this.judge = judge;
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

	public String getJcdIdjosn() {
		return jcdIdjosn;
	}

	public void setJcdIdjosn(String jcdIdjosn) {
		this.jcdIdjosn = jcdIdjosn;
	}

	public Integer getJcdId() {
		return jcdId;
	}

	public void setJcdId(Integer jcdId) {
		this.jcdId = jcdId;
	}

	public String getJcdHouseAddress() {
		return jcdHouseAddress;
	}

	public void setJcdHouseAddress(String jcdHouseAddress) {
		this.jcdHouseAddress = jcdHouseAddress;
	}

	public Integer getAccumulation() {
		return accumulation;
	}

	public void setAccumulation(Integer accumulation) {
		this.accumulation = accumulation;
	}

	public String getSplitJson() {
		return splitJson;
	}

	public void setSplitJson(String splitJson) {
		this.splitJson = splitJson;
	}

	public String getJsonArray() {
		return jsonArray;
	}

	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}

	public Integer getAdminUser() {
		return adminUser;
	}

	public void setAdminUser(Integer adminUser) {
		this.adminUser = adminUser;
	}

	public Integer getLaPopulationId() {
		return laPopulationId;
	}

	public void setLaPopulationId(Integer laPopulationId) {
		this.laPopulationId = laPopulationId;
	}

	public String getLaPopName() {
		return laPopName;
	}

	public void setLaPopName(String laPopName) {
		this.laPopName = laPopName;
	}

	public String getLaPopTelephone() {
		return laPopTelephone;
	}

	public void setLaPopTelephone(String laPopTelephone) {
		this.laPopTelephone = laPopTelephone;
	}

	public String getLaPopIdcard() {
		return laPopIdcard;
	}

	public void setLaPopIdcard(String laPopIdcard) {
		this.laPopIdcard = laPopIdcard;
	}

	public Integer getLaId() {
		return laId;
	}

	public void setLaId(Integer laId) {
		this.laId = laId;
	}

	public Integer getLaUserId() {
		return laUserId;
	}

	public void setLaUserId(Integer laUserId) {
		this.laUserId = laUserId;
	}

	public Integer getLaDepartment() {
		return laDepartment;
	}

	public void setLaDepartment(Integer laDepartment) {
		this.laDepartment = laDepartment;
	}

	public Integer getLaStorefront() {
		return laStorefront;
	}

	public void setLaStorefront(Integer laStorefront) {
		this.laStorefront = laStorefront;
	}

	public String getLandlordOtherContact() {
		return landlordOtherContact;
	}

	public void setLandlordOtherContact(String landlordOtherContact) {
		this.landlordOtherContact = landlordOtherContact;
	}

	public String getLaSecondContacts() {
		return laSecondContacts;
	}

	public void setLaSecondContacts(String laSecondContacts) {
		this.laSecondContacts = laSecondContacts;
	}

	public String getLaSecondPhone() {
		return laSecondPhone;
	}

	public void setLaSecondPhone(String laSecondPhone) {
		this.laSecondPhone = laSecondPhone;
	}

	public String getLaOtherContact() {
		return laOtherContact;
	}

	public void setLaOtherContact(String laOtherContact) {
		this.laOtherContact = laOtherContact;
	}

	public String getJrlBeginTime() {
		return jrlBeginTime;
	}

	public void setJrlBeginTime(String jrlBeginTime) {
		this.jrlBeginTime = jrlBeginTime;
	}

	public String getJrlEndTime() {
		return jrlEndTime;
	}

	public void setJrlEndTime(String jrlEndTime) {
		this.jrlEndTime = jrlEndTime;
	}

	public String getJrlTheTerm() {
		return jrlTheTerm;
	}

	public void setJrlTheTerm(String jrlTheTerm) {
		this.jrlTheTerm = jrlTheTerm;
	}

	public String getPopName() {
		return popName;
	}

	public void setPopName(String popName) {
		this.popName = popName;
	}

	public String getPopTelephone() {
		return popTelephone;
	}

	public void setPopTelephone(String popTelephone) {
		this.popTelephone = popTelephone;
	}

	public String getPopIdcard() {
		return popIdcard;
	}

	public void setPopIdcard(String popIdcard) {
		this.popIdcard = popIdcard;
	}

	public Integer getAssistUserId() {
		return assistUserId;
	}

	public void setAssistUserId(Integer assistUserId) {
		this.assistUserId = assistUserId;
	}

	public Integer getAssistDepartment() {
		return assistDepartment;
	}

	public void setAssistDepartment(Integer assistDepartment) {
		this.assistDepartment = assistDepartment;
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
	
	public String getAdminPhone() {
		return adminPhone;
	}

	public void setAdminPhone(String adminPhone) {
		this.adminPhone = adminPhone;
	}

	public String getDefaultName() {
		return defaultName;
	}

	public void setDefaultName(String defaultName) {
		this.defaultName = defaultName;
	}

	public String getDefaultPhone() {
		return defaultPhone;
	}

	public void setDefaultPhone(String defaultPhone) {
		this.defaultPhone = defaultPhone;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
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

	public Integer getJrlId() {
		return jrlId;
	}

	public void setJrlId(Integer jrlId) {
		this.jrlId = jrlId;
	}

	public String getJrlRenewalCoding() {
		return jrlRenewalCoding;
	}

	public void setJrlRenewalCoding(String jrlRenewalCoding) {
		this.jrlRenewalCoding = jrlRenewalCoding;
	}

	public Integer getJrlHouse4storeId() {
		return jrlHouse4storeId;
	}

	public void setJrlHouse4storeId(Integer jrlHouse4storeId) {
		this.jrlHouse4storeId = jrlHouse4storeId;
	}

	public Integer getJrlLandlordId() {
		return jrlLandlordId;
	}

	public void setJrlLandlordId(Integer jrlLandlordId) {
		this.jrlLandlordId = jrlLandlordId;
	}

	public Integer getJrlUserId() {
		return jrlUserId;
	}

	public void setJrlUserId(Integer jrlUserId) {
		this.jrlUserId = jrlUserId;
	}

	public Integer getJrlDepartment() {
		return jrlDepartment;
	}

	public void setJrlDepartment(Integer jrlDepartment) {
		this.jrlDepartment = jrlDepartment;
	}

	public Integer getJrlStorefront() {
		return jrlStorefront;
	}

	public void setJrlStorefront(Integer jrlStorefront) {
		this.jrlStorefront = jrlStorefront;
	}

	public String getJrlContractType() {
		return jrlContractType;
	}

	public void setJrlContractType(String jrlContractType) {
		this.jrlContractType = jrlContractType;
	}

	public String getJrlRentalType() {
		return jrlRentalType;
	}

	public void setJrlRentalType(String jrlRentalType) {
		this.jrlRentalType = jrlRentalType;
	}

	public String getJrlSignedTime() {
		return jrlSignedTime;
	}

	public void setJrlSignedTime(String jrlSignedTime) {
		this.jrlSignedTime = jrlSignedTime;
	}

	public String getJrlRegistrationTime() {
		return jrlRegistrationTime;
	}

	public void setJrlRegistrationTime(String jrlRegistrationTime) {
		this.jrlRegistrationTime = jrlRegistrationTime;
	}

	public Integer getJrlInAdvancePay() {
        return jrlInAdvancePay;
    }

    public void setJrlInAdvancePay(Integer jrlInAdvancePay) {
        this.jrlInAdvancePay = jrlInAdvancePay;
    }

    public String getJrlPriceLadder() {
		return jrlPriceLadder;
	}

	public void setJrlPriceLadder(String jrlPriceLadder) {
		this.jrlPriceLadder = jrlPriceLadder;
	}

	public Integer getJrlRentFreeDays() {
		return jrlRentFreeDays;
	}

	public void setJrlRentFreeDays(Integer jrlRentFreeDays) {
		this.jrlRentFreeDays = jrlRentFreeDays;
	}

	public String getJrlRentFreeSegment() {
		return jrlRentFreeSegment;
	}

	public void setJrlRentFreeSegment(String jrlRentFreeSegment) {
		this.jrlRentFreeSegment = jrlRentFreeSegment;
	}

	public String getJrlPaymentMethod() {
		return jrlPaymentMethod;
	}

	public void setJrlPaymentMethod(String jrlPaymentMethod) {
		this.jrlPaymentMethod = jrlPaymentMethod;
	}

	public String getJrlRemark() {
		return jrlRemark;
	}

	public void setJrlRemark(String jrlRemark) {
		this.jrlRemark = jrlRemark;
	}

	public String getJrlImgPath() {
		return jrlImgPath;
	}

	public void setJrlImgPath(String jrlImgPath) {
		this.jrlImgPath = jrlImgPath;
	}

	public String getJrlImgNum() {
		return jrlImgNum;
	}

	public void setJrlImgNum(String jrlImgNum) {
		this.jrlImgNum = jrlImgNum;
	}
    
    public Integer getJrlFreeDaysDecoration() {
        return jrlFreeDaysDecoration;
    }

    public void setJrlFreeDaysDecoration(Integer jrlFreeDaysDecoration) {
        this.jrlFreeDaysDecoration = jrlFreeDaysDecoration;
    }

    public Integer getJrlFreeDaysHeader() {
        return jrlFreeDaysHeader;
    }

    public void setJrlFreeDaysHeader(Integer jrlFreeDaysHeader) {
        this.jrlFreeDaysHeader = jrlFreeDaysHeader;
    }
    public Integer getMaxHsNum() {
		return maxHsNum;
	}

	public void setMaxHsNum(Integer maxHsNum) {
		this.maxHsNum = maxHsNum;
	}
	public String getHouseEntrust4sell() {
		return houseEntrust4sell;
	}

	public void setHouseEntrust4sell(String houseEntrust4sell) {
		this.houseEntrust4sell = houseEntrust4sell;
	}

	public String getHdProvince() {
		return hdProvince;
	}

	public void setHdProvince(String hdProvince) {
		this.hdProvince = hdProvince;
	}
	public String getJsrcState() {
		return jsrcState;
	}

	public void setJsrcState(String jsrcState) {
		this.jsrcState = jsrcState;
	}
	public Integer getHsMicronetIdentification() {
		return hsMicronetIdentification;
	}

	public void setHsMicronetIdentification(Integer hsMicronetIdentification) {
		this.hsMicronetIdentification = hsMicronetIdentification;
	}

	@Override
	public String toString() {
		return "InfoHouse4storeExpand [houseEntrust4sell=" + houseEntrust4sell + ", hdCity=" + hdCity + ", hdDistrict="
				+ hdDistrict + ", hdZone=" + hdZone + ", hdRoad=" + hdRoad + ", hdCommunity=" + hdCommunity
				+ ", hdProvince=" + hdProvince + ", hdPinyin=" + hdPinyin + ", hdBaiduLongitudeX=" + hdBaiduLongitudeX
				+ ", hdBaiduLatitudeY=" + hdBaiduLatitudeY + ", hdBuildingForm=" + hdBuildingForm + ", hdPropertyType="
				+ hdPropertyType + ", hdBuildingDevelopers=" + hdBuildingDevelopers + ", hdBeCompletedTime="
				+ hdBeCompletedTime + ", hdItemFeatures=" + hdItemFeatures + ", hdLoopPosition=" + hdLoopPosition
				+ ", hdPlotRatio=" + hdPlotRatio + ", hdAfforestationRate=" + hdAfforestationRate + ", hdPropertyFee="
				+ hdPropertyFee + ", hdPropertyCompany=" + hdPropertyCompany + ", hdAdditionalInformation="
				+ hdAdditionalInformation + ", hdCoversAnAreaOf=" + hdCoversAnAreaOf + ", hdFloorArea=" + hdFloorArea
				+ ", hdSumHouseholds=" + hdSumHouseholds + ", hdTheCurrentNumber=" + hdTheCurrentNumber
				+ ", hdParkingSpaceTop=" + hdParkingSpaceTop + ", hdParkingSpaceNuder=" + hdParkingSpaceNuder
				+ ", hdZoneBitIntroduce=" + hdZoneBitIntroduce + ", assistUserId=" + assistUserId
				+ ", assistDepartment=" + assistDepartment + ", popName=" + popName + ", popTelephone=" + popTelephone
				+ ", popIdcard=" + popIdcard + ", popIdcardAddress=" + popIdcardAddress + ", popBirth=" + popBirth
				+ ", popSex=" + popSex + ", popNation=" + popNation + ", popImgPath=" + popImgPath + ", jrlId=" + jrlId
				+ ", jrlRenewalCoding=" + jrlRenewalCoding + ", jrlHouse4storeId=" + jrlHouse4storeId
				+ ", jrlLandlordId=" + jrlLandlordId + ", jrlUserId=" + jrlUserId + ", jrlDepartment=" + jrlDepartment
				+ ", jrlStorefront=" + jrlStorefront + ", jrlContractType=" + jrlContractType + ", jrlRentalType="
				+ jrlRentalType + ", jrlBeginTime=" + jrlBeginTime + ", jrlEndTime=" + jrlEndTime + ", jrlSignedTime="
				+ jrlSignedTime + ", jrlRegistrationTime=" + jrlRegistrationTime + ", jrlTheTerm=" + jrlTheTerm
				+ ", jrlInAdvancePay=" + jrlInAdvancePay + ", jrlPriceLadder=" + jrlPriceLadder + ", jrlRentFreeDays="
				+ jrlRentFreeDays + ", jrlRentFreeSegment=" + jrlRentFreeSegment + ", jrlPaymentMethod="
				+ jrlPaymentMethod + ", jrlRemark=" + jrlRemark + ", jrlImgPath=" + jrlImgPath + ", jrlImgNum="
				+ jrlImgNum + ", jrlFreeDaysDecoration=" + jrlFreeDaysDecoration + ", jrlFreeDaysHeader="
				+ jrlFreeDaysHeader + ", laId=" + laId + ", laUserId=" + laUserId + ", laDepartment=" + laDepartment
				+ ", laStorefront=" + laStorefront + ", landlordOtherContact=" + landlordOtherContact
				+ ", laSecondContacts=" + laSecondContacts + ", laSecondPhone=" + laSecondPhone + ", laOtherContact="
				+ laOtherContact + ", laPopulationId=" + laPopulationId + ", laPopName=" + laPopName
				+ ", laPopTelephone=" + laPopTelephone + ", laPopIdcard=" + laPopIdcard + ", popNameRemark="
				+ popNameRemark + ", adminUser=" + adminUser + ", jsonArray=" + jsonArray + ", followArray="
				+ followArray + ", addRepairs=" + addRepairs + ", splitJson=" + splitJson + ", accumulation="
				+ accumulation + ", jcdId=" + jcdId + ", jcdHouseAddress=" + jcdHouseAddress + ", jcdIdjosn="
				+ jcdIdjosn + ", theSortTerm=" + theSortTerm + ", theSortContrary=" + theSortContrary + ", judge="
				+ judge + ", personal=" + personal + ", pageNumber=" + pageNumber + ", startNum=" + startNum
				+ ", endNum=" + endNum + ", totalNum=" + totalNum + ", totalPage=" + totalPage + ", userName="
				+ userName + ", adminName=" + adminName + ", adminPhone=" + adminPhone + ", defaultName=" + defaultName
				+ ", defaultPhone=" + defaultPhone + ", addHsHouseType=" + addHsHouseType + ", hsAddFloor=" + hsAddFloor
				+ ", addAsset=" + addAsset + ", hsCustomContacts=" + hsCustomContacts + ", nrcId=" + nrcId
				+ ", notRentingJson=" + notRentingJson + ", dateType=" + dateType + ", totalNum2=" + totalNum2
				+ ", totalNum3=" + totalNum3 + ", totalNum4=" + totalNum4 + ", jsrcState=" + jsrcState
				+ ", hsMicronetIdentification=" + hsMicronetIdentification + ", jsrsuId=" + jsrsuId
				+ ", maintenanceSituation=" + maintenanceSituation + ", popIdcardJson=" + popIdcardJson + ", maxHsNum="
				+ maxHsNum + ", shortRentType=" + shortRentType + ", splitFlag=" + splitFlag + ", startTime="
				+ startTime + ", endTime=" + endTime + ", deviceType=" + deviceType + ", jsrcHsIdList=" + jsrcHsIdList
				+ ", jshnId=" + jshnId + ", jshnJsrsuId=" + jshnJsrsuId + ", jshnShdId=" + jshnShdId + ", att=" + att
				+ "]";
	}

	public Integer getSplitFlag() {
		return splitFlag;
	}

	public void setSplitFlag(Integer splitFlag) {
		this.splitFlag = splitFlag;
	}

	public String getHsAddFloor() {
		return hsAddFloor;
	}

	public void setHsAddFloor(String hsAddFloor) {
		this.hsAddFloor = hsAddFloor;
	}

	public List<Integer> getJsrcHsIdList() {
		return jsrcHsIdList;
	}

	public void setJsrcHsIdList(List<Integer> jsrcHsIdList) {
		this.jsrcHsIdList = jsrcHsIdList;
	}

}