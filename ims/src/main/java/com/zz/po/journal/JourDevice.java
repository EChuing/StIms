package com.zz.po.journal;

import com.zz.po.commons.CommonsPo;

public class JourDevice extends CommonsPo{

	private Integer id;
	private String  devId;
	private String  devSn;
	private Integer devBrandId;
	private String  devNickname;
	private String  devUsername;
	private String  devPassword;
	private String  devAuthId;
	private String  devAuthSecret;
    private String  devSpare1;
    private String  devSpare2;
    private String  devState;
    private String  devAuthNum;
    private String  devType;
    private String  devDifference;
    private Integer devIdftId;
    private Integer devIdstId;
    private Integer devUserId;
    private String devPasswd;
	private String devAddress;


	private Integer devRoad;

	private String  idArrayStr;
	private String  splitFlag;
	private String  totalNum;
	
	private Integer brandId;
	
	private String brandName;
	
	private String brandType;
	
	private String brandModel;
	
	private String postJson;
	
	private String brandDeviceJson;
	
	private Integer hsId;
	
	private String hsAddCommunity;

	private String hsState;

	private String hsAddBuilding;
	
	private String hsAddDoorplateno;
	
	private String hsAddDistrict;
	
	private String hsLeaseState;
	
	private String hsAddCity;
	
	private String handleResult;


	private Integer jhdId;
	private Integer jhdHsId;
	private Integer jhdDeviceId;
	private Integer jhdSubDeviceNumber;

	private Integer jdwId;
	
	private String jdwBrand;
	
	private String jdwSn;
	
	private String jdwHandleStatus;
	
	private String jdwHandleResult;
	
	private String jdwModificationTime;
	
	private String jdwTime;
	
	private String jdwWarningTime;
	
	private Integer jdwType;

	private String jdwFailureCause;

	private String startNum;

	private String endNum;

	private String json;

	private String idftName;

	private String idstName;
	private String jsrcState;
	//类型

	private Integer devFirstType;//一级类型
	private Integer devSecondType;//二级类型
	//用户和设备字段

	private Integer judId;
	private Integer judUserId;
	private Integer judDeviceId;
	private String subDeviceNumer;

	private String type;
	private String deviceType;

	private String devAntDeviceId;

	public String getDevAntDeviceId() {
		return devAntDeviceId;
	}

	public void setDevAntDeviceId(String devAntDeviceId) {
		this.devAntDeviceId = devAntDeviceId;
	}

	public String getDevAddress() {
		return devAddress;
	}

	public void setDevAddress(String devAddress) {
		this.devAddress = devAddress;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	private String countSum;

	private String count;

	private String jdwDevId;

	public String getJdwDevId() {
		return jdwDevId;
	}

	public void setJdwDevId(String jdwDevId) {
		this.jdwDevId = jdwDevId;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public String getCountSum() {
		return countSum;
	}

	public String getJdwFailureCause() {
		return jdwFailureCause;
	}

	public void setJdwFailureCause(String jdwFailureCause) {
		this.jdwFailureCause = jdwFailureCause;
	}

	public void setCountSum(String countSum) {
		this.countSum = countSum;
	}

	public String getSubDeviceNumer() {
		return subDeviceNumer;
	}

	public void setSubDeviceNumer(String subDeviceNumer) {
		this.subDeviceNumer = subDeviceNumer;
	}

	public String getDevPasswd() {
		return devPasswd;
	}

	public void setDevPasswd(String devPasswd) {
		this.devPasswd = devPasswd;
	}

	public Integer getDevRoad() {
		return devRoad;
	}

	public void setDevRoad(Integer devRoad) {
		this.devRoad = devRoad;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDevSn() {
		return devSn;
	}

	public void setDevSn(String devSn) {
		this.devSn = devSn;
	}

	public Integer getDevUserId() {
		return devUserId;
	}

	public void setDevUserId(Integer devUserId) {
		this.devUserId = devUserId;
	}

	public Integer getJudId() {
		return judId;
	}

	public void setJudId(Integer judId) {
		this.judId = judId;
	}

	public Integer getJudUserId() {
		return judUserId;
	}

	public void setJudUserId(Integer judUserId) {
		this.judUserId = judUserId;
	}

	public Integer getJudDeviceId() {
		return judDeviceId;
	}

	public void setJudDeviceId(Integer judDeviceId) {
		this.judDeviceId = judDeviceId;
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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getDevState() {
		return devState;
	}

	public void setDevState(String devState) {
		this.devState = devState;
	}

	public String getDevAuthNum() {
		return devAuthNum;
	}

	public void setDevAuthNum(String devAuthNum) {
		this.devAuthNum = devAuthNum;
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


	/*public Integer getDevFirstType() {
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
    */
	public String getIdArrayStr() {
		return idArrayStr;
	}

	public void setIdArrayStr(String idArrayStr) {
		this.idArrayStr = idArrayStr;
	}

	@Override
	public String getSplitFlag() {
		return splitFlag;
	}

	@Override
	public void setSplitFlag(String splitFlag) {
		this.splitFlag = splitFlag;
	}

	@Override
	public String getTotalNum() {
		return totalNum;
	}

	@Override
	public void setTotalNum(String totalNum) {
		this.totalNum = totalNum;
	}

	public Integer getBrandId() {
		return brandId;
	}

	public void setBrandId(Integer brandId) {
		this.brandId = brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getBrandType() {
		return brandType;
	}

	public void setBrandType(String brandType) {
		this.brandType = brandType;
	}

	public String getBrandModel() {
		return brandModel;
	}

	public void setBrandModel(String brandModel) {
		this.brandModel = brandModel;
	}

	public String getPostJson() {
		return postJson;
	}

	public void setPostJson(String postJson) {
		this.postJson = postJson;
	}

	public String getBrandDeviceJson() {
		return brandDeviceJson;
	}

	public void setBrandDeviceJson(String brandDeviceJson) {
		this.brandDeviceJson = brandDeviceJson;
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

	public String getHsState() {
		return hsState;
	}

	public void setHsState(String hsState) {
		this.hsState = hsState;
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

	public String getHsAddDistrict() {
		return hsAddDistrict;
	}

	public void setHsAddDistrict(String hsAddDistrict) {
		this.hsAddDistrict = hsAddDistrict;
	}

	public String getHsLeaseState() {
		return hsLeaseState;
	}

	public void setHsLeaseState(String hsLeaseState) {
		this.hsLeaseState = hsLeaseState;
	}

	public String getHsAddCity() {
		return hsAddCity;
	}

	public void setHsAddCity(String hsAddCity) {
		this.hsAddCity = hsAddCity;
	}

	public String getHandleResult() {
		return handleResult;
	}

	public void setHandleResult(String handleResult) {
		this.handleResult = handleResult;
	}

	public Integer getJhdId() {
		return jhdId;
	}

	public void setJhdId(Integer jhdId) {
		this.jhdId = jhdId;
	}

	public Integer getJhdHsId() {
		return jhdHsId;
	}

	public void setJhdHsId(Integer jhdHsId) {
		this.jhdHsId = jhdHsId;
	}

	public Integer getJhdDeviceId() {
		return jhdDeviceId;
	}

	public void setJhdDeviceId(Integer jhdDeviceId) {
		this.jhdDeviceId = jhdDeviceId;
	}

	public Integer getJhdSubDeviceNumber() {
		return jhdSubDeviceNumber;
	}

	public void setJhdSubDeviceNumber(Integer jhdSubDeviceNumber) {
		this.jhdSubDeviceNumber = jhdSubDeviceNumber;
	}

	public Integer getJdwId() {
		return jdwId;
	}

	public void setJdwId(Integer jdwId) {
		this.jdwId = jdwId;
	}

	public String getJdwBrand() {
		return jdwBrand;
	}

	public void setJdwBrand(String jdwBrand) {
		this.jdwBrand = jdwBrand;
	}

	public String getJdwSn() {
		return jdwSn;
	}

	public void setJdwSn(String jdwSn) {
		this.jdwSn = jdwSn;
	}

	public String getJdwHandleStatus() {
		return jdwHandleStatus;
	}

	public void setJdwHandleStatus(String jdwHandleStatus) {
		this.jdwHandleStatus = jdwHandleStatus;
	}

	public String getJdwHandleResult() {
		return jdwHandleResult;
	}

	public void setJdwHandleResult(String jdwHandleResult) {
		this.jdwHandleResult = jdwHandleResult;
	}

	public String getJdwModificationTime() {
		return jdwModificationTime;
	}

	public void setJdwModificationTime(String jdwModificationTime) {
		this.jdwModificationTime = jdwModificationTime;
	}

	public String getJdwTime() {
		return jdwTime;
	}

	public void setJdwTime(String jdwTime) {
		this.jdwTime = jdwTime;
	}

	public String getJdwWarningTime() {
		return jdwWarningTime;
	}

	public void setJdwWarningTime(String jdwWarningTime) {
		this.jdwWarningTime = jdwWarningTime;
	}

	public Integer getJdwType() {
		return jdwType;
	}

	public void setJdwType(Integer jdwType) {
		this.jdwType = jdwType;
	}

	@Override
	public String getStartNum() {
		return startNum;
	}

	@Override
	public void setStartNum(String startNum) {
		this.startNum = startNum;
	}

	@Override
	public String getEndNum() {
		return endNum;
	}

	@Override
	public void setEndNum(String endNum) {
		this.endNum = endNum;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public String getIdftName() {
		return idftName;
	}

	public void setIdftName(String idftName) {
		this.idftName = idftName;
	}

	public String getIdstName() {
		return idstName;
	}

	public void setIdstName(String idstName) {
		this.idstName = idstName;
	}

	public String getJsrcState() {
		return jsrcState;
	}

	public void setJsrcState(String jsrcState) {
		this.jsrcState = jsrcState;
	}

	@Override
	public String toString() {
		return "JourDevice{" +
				"id=" + id +
				", devId='" + devId + '\'' +
				", devSn='" + devSn + '\'' +
				", devBrandId=" + devBrandId +
				", devNickname='" + devNickname + '\'' +
				", devUsername='" + devUsername + '\'' +
				", devPassword='" + devPassword + '\'' +
				", devAuthId='" + devAuthId + '\'' +
				", devAuthSecret='" + devAuthSecret + '\'' +
				", devSpare1='" + devSpare1 + '\'' +
				", devSpare2='" + devSpare2 + '\'' +
				", devState='" + devState + '\'' +
				", devAuthNum='" + devAuthNum + '\'' +
				", devType='" + devType + '\'' +
				", devDifference='" + devDifference + '\'' +
				", devIdftId=" + devIdftId +
				", devIdstId=" + devIdstId +
				", devUserId=" + devUserId +
				", devPasswd='" + devPasswd + '\'' +
				", devAddress='" + devAddress + '\'' +
				", devRoad=" + devRoad +
				", idArrayStr='" + idArrayStr + '\'' +
				", splitFlag='" + splitFlag + '\'' +
				", totalNum='" + totalNum + '\'' +
				", brandId=" + brandId +
				", brandName='" + brandName + '\'' +
				", brandType='" + brandType + '\'' +
				", brandModel='" + brandModel + '\'' +
				", postJson='" + postJson + '\'' +
				", brandDeviceJson='" + brandDeviceJson + '\'' +
				", hsId=" + hsId +
				", hsAddCommunity='" + hsAddCommunity + '\'' +
				", hsState='" + hsState + '\'' +
				", hsAddBuilding='" + hsAddBuilding + '\'' +
				", hsAddDoorplateno='" + hsAddDoorplateno + '\'' +
				", hsAddDistrict='" + hsAddDistrict + '\'' +
				", hsLeaseState='" + hsLeaseState + '\'' +
				", hsAddCity='" + hsAddCity + '\'' +
				", handleResult='" + handleResult + '\'' +
				", jhdId=" + jhdId +
				", jhdHsId=" + jhdHsId +
				", jhdDeviceId=" + jhdDeviceId +
				", jhdSubDeviceNumber=" + jhdSubDeviceNumber +
				", jdwId=" + jdwId +
				", jdwBrand='" + jdwBrand + '\'' +
				", jdwSn='" + jdwSn + '\'' +
				", jdwHandleStatus='" + jdwHandleStatus + '\'' +
				", jdwHandleResult='" + jdwHandleResult + '\'' +
				", jdwModificationTime='" + jdwModificationTime + '\'' +
				", jdwTime='" + jdwTime + '\'' +
				", jdwWarningTime='" + jdwWarningTime + '\'' +
				", jdwType=" + jdwType +
				", jdwFailureCause='" + jdwFailureCause + '\'' +
				", startNum='" + startNum + '\'' +
				", endNum='" + endNum + '\'' +
				", json='" + json + '\'' +
				", idftName='" + idftName + '\'' +
				", idstName='" + idstName + '\'' +
				", jsrcState='" + jsrcState + '\'' +
				", devFirstType=" + devFirstType +
				", devSecondType=" + devSecondType +
				", judId=" + judId +
				", judUserId=" + judUserId +
				", judDeviceId=" + judDeviceId +
				", subDeviceNumer='" + subDeviceNumer + '\'' +
				", type='" + type + '\'' +
				", deviceType='" + deviceType + '\'' +
				", countSum='" + countSum + '\'' +
				", count='" + count + '\'' +
				", jdwDevId='" + jdwDevId + '\'' +
				'}';
	}
}
