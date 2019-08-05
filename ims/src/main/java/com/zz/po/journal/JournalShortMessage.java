package com.zz.po.journal;

import com.zz.po.commons.CommonsPo;

/**
 * 短信表
 */
public class JournalShortMessage extends CommonsPo{
    private Integer smId;
    
    private Integer smUserId;

    private Integer smPopId;

    private Integer smLandId;

    private Integer smRentId;

    private Integer smNotRentId;

    private String smContent;

    private String smState;

    private String smType;

    private String smTreatmentStatus;

    private String smDataTime;
    
    private Double smMoney;
    
    private Integer smCount;
    
    private String smField;
    
    private Integer smIpId;
    
	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private String popName;
	private String popTelephone;
	private String popIdcard;
	private Integer popId;
	
	private String addProvince;
	private String addCity;
	private String addDistrict;
	private String addZone;
	private String addStreet;
	private String addCommunity;
	private String addBuilding;
	private String addDoorplateno;
	
	private Integer popLandlord;
	private Integer popRenter;
	
	private Integer smlandId;
	private Integer smrentId;
	
	private String smNote;
	
	private String startTime;
	private String endTime;
	private String jciNature;
	private String jciBeginPeriods;
	private String jciEndPeriods;
	private String jciFukuanri;
	private String flag;
	
	private String jrlEndTime;
	private String jrrEndTime;
	private String serviceTelephone;
	private String companyAddress;
	private String deadline;
	private Integer unlockingTimes;//有效次数

	private String hsEndDate;
	private String hsDepositAmount;

	private int messageType;
	
	private Integer rentPopId;
	private Integer hrid;
	private Integer hsid;
	private String time;
	
	private Integer repairUserId;
	private String repairUserName;
	private String repairEvenType;
	private String repairUserMobile;
	private String repairDescribe;
	private String hopeTime;
	private String houseType;
	
	private String hsBankType;
	private String hsBankNum;
	private String hsBankName;
	
	private String smReceiveNumber;
	private String smUserName;
	
	private Integer variableParameter;

    private String url;
    
    private String password;
    private String houseAddress;
    
    private Integer popCocId;
    
    public Integer getPopCocId() {
		return popCocId;
	}

	public void setPopCocId(Integer popCocId) {
		this.popCocId = popCocId;
	}

	public String getHouseAddress() {
		return houseAddress;
	}

	public void setHouseAddress(String houseAddress) {
		this.houseAddress = houseAddress;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getVariableParameter() {
		return variableParameter;
	}

	public void setVariableParameter(Integer variableParameter) {
		this.variableParameter = variableParameter;
	}

    public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getSmUserName() {
		return smUserName;
	}

	public void setSmUserName(String smUserName) {
		this.smUserName = smUserName;
	}

	public Integer getSmIpId() {
		return smIpId;
	}

	public void setSmIpId(Integer smIpId) {
		this.smIpId = smIpId;
	}

	public String getSmReceiveNumber() {
		return smReceiveNumber;
	}

	public void setSmReceiveNumber(String smReceiveNumber) {
		this.smReceiveNumber = smReceiveNumber;
	}

	public String getSmField() {
		return smField;
	}

	public void setSmField(String smField) {
		this.smField = smField;
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

	public Integer getUnlockingTimes() {
		return unlockingTimes;
	}

	public void setUnlockingTimes(Integer unlockingTimes) {
		this.unlockingTimes = unlockingTimes;
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

	public Integer getSmUserId() {
		return smUserId;
	}

	public void setSmUserId(Integer smUserId) {
		this.smUserId = smUserId;
	}

	public Integer getSmCount() {
		return smCount;
	}

	public void setSmCount(Integer smCount) {
		this.smCount = smCount;
	}

	public Double getSmMoney() {
		return smMoney;
	}

	public void setSmMoney(Double smMoney) {
		this.smMoney = smMoney;
	}
	
	public String getHouseType() {
		return houseType;
	}

	public void setHouseType(String houseType) {
		this.houseType = houseType;
	}

	public String getHopeTime() {
		return hopeTime;
	}

	public void setHopeTime(String hopeTime) {
		this.hopeTime = hopeTime;
	}

	public String getRepairEvenType() {
		return repairEvenType;
	}

	public void setRepairEvenType(String repairEvenType) {
		this.repairEvenType = repairEvenType;
	}

	public Integer getRepairUserId() {
		return repairUserId;
	}

	public void setRepairUserId(Integer repairUserId) {
		this.repairUserId = repairUserId;
	}

	public String getRepairUserName() {
		return repairUserName;
	}

	public void setRepairUserName(String repairUserName) {
		this.repairUserName = repairUserName;
	}

	public String getRepairUserMobile() {
		return repairUserMobile;
	}

	public void setRepairUserMobile(String repairUserMobile) {
		this.repairUserMobile = repairUserMobile;
	}

	public String getRepairDescribe() {
		return repairDescribe;
	}

	public void setRepairDescribe(String repairDescribe) {
		this.repairDescribe = repairDescribe;
	}

	public Integer getPopId() {
		return popId;
	}

	public void setPopId(Integer popId) {
		this.popId = popId;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Integer getHrid() {
		return hrid;
	}

	public void setHrid(Integer hrid) {
		this.hrid = hrid;
	}

	public Integer getHsid() {
		return hsid;
	}

	public void setHsid(Integer hsid) {
		this.hsid = hsid;
	}

	public Integer getRentPopId() {
		return rentPopId;
	}

	public void setRentPopId(Integer rentPopId) {
		this.rentPopId = rentPopId;
	}

	public int getMessageType() {
		return messageType;
	}

	public void setMessageType(int messageType) {
		this.messageType = messageType;
	}

	public String getHsEndDate() {
		return hsEndDate;
	}

	public void setHsEndDate(String hsEndDate) {
		this.hsEndDate = hsEndDate;
	}

	public String getHsDepositAmount() {
		return hsDepositAmount;
	}

	public void setHsDepositAmount(String hsDepositAmount) {
		this.hsDepositAmount = hsDepositAmount;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public String getCompanyAddress() {
		return companyAddress;
	}

	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}

	public String getServiceTelephone() {
		return serviceTelephone;
	}

	public void setServiceTelephone(String serviceTelephone) {
		this.serviceTelephone = serviceTelephone;
	}

	public String getJrrEndTime() {
		return jrrEndTime;
	}

	public void setJrrEndTime(String jrrEndTime) {
		this.jrrEndTime = jrrEndTime;
	}

	public String getJrlEndTime() {
		return jrlEndTime;
	}

	public void setJrlEndTime(String jrlEndTime) {
		this.jrlEndTime = jrlEndTime;
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

	public String getJciNature() {
		return jciNature;
	}

	public void setJciNature(String jciNature) {
		this.jciNature = jciNature;
	}

	public String getJciBeginPeriods() {
		return jciBeginPeriods;
	}

	public void setJciBeginPeriods(String jciBeginPeriods) {
		this.jciBeginPeriods = jciBeginPeriods;
	}

	public String getJciEndPeriods() {
		return jciEndPeriods;
	}

	public void setJciEndPeriods(String jciEndPeriods) {
		this.jciEndPeriods = jciEndPeriods;
	}

	public String getSmNote() {
		return smNote;
	}

	public void setSmNote(String smNote) {
		this.smNote = smNote;
	}

	public Integer getSmlandId() {
		return smlandId;
	}

	public void setSmlandId(Integer smlandId) {
		this.smlandId = smlandId;
	}

	public Integer getSmrentId() {
		return smrentId;
	}

	public void setSmrentId(Integer smrentId) {
		this.smrentId = smrentId;
	}

	public Integer getPopLandlord() {
        return popLandlord;
    }

    public void setPopLandlord(Integer popLandlord) {
        this.popLandlord = popLandlord;
    }

    public Integer getPopRenter() {
        return popRenter;
    }

    public void setPopRenter(Integer popRenter) {
        this.popRenter = popRenter;
    }

    public String getAddProvince() {
		return addProvince;
	}

	public void setAddProvince(String addProvince) {
		this.addProvince = addProvince;
	}

	public String getAddCity() {
		return addCity;
	}

	public void setAddCity(String addCity) {
		this.addCity = addCity;
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

	public String getAddStreet() {
		return addStreet;
	}

	public void setAddStreet(String addStreet) {
		this.addStreet = addStreet;
	}

	public String getAddCommunity() {
		return addCommunity;
	}

	public void setAddCommunity(String addCommunity) {
		this.addCommunity = addCommunity;
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

	public Integer getSmId() {
        return smId;
    }

    public void setSmId(Integer smId) {
        this.smId = smId;
    }

    public Integer getSmPopId() {
        return smPopId;
    }

    public void setSmPopId(Integer smPopId) {
        this.smPopId = smPopId;
    }

    public Integer getSmRentId() {
        return smRentId;
    }

    public void setSmRentId(Integer smRentId) {
        this.smRentId = smRentId;
    }

    public Integer getSmNotRentId() {
        return smNotRentId;
    }

    public void setSmNotRentId(Integer smNotRentId) {
        this.smNotRentId = smNotRentId;
    }

    public String getSmContent() {
        return smContent;
    }

    public void setSmContent(String smContent) {
        this.smContent = smContent == null ? null : smContent.trim();
    }

    public String getSmState() {
        return smState;
    }

    public void setSmState(String smState) {
        this.smState = smState == null ? null : smState.trim();
    }

    public String getSmType() {
        return smType;
    }

    public void setSmType(String smType) {
        this.smType = smType == null ? null : smType.trim();
    }

    public String getSmTreatmentStatus() {
        return smTreatmentStatus;
    }

    public void setSmTreatmentStatus(String smTreatmentStatus) {
        this.smTreatmentStatus = smTreatmentStatus == null ? null : smTreatmentStatus.trim();
    }

    public String getSmDataTime() {
        return (smDataTime != null && smDataTime.length() > 19) ? smDataTime.substring(0,19) : smDataTime;
    }

    public void setSmDataTime(String smDataTime) {
        this.smDataTime = smDataTime == null ? null : smDataTime.trim();
    }

	public Integer getSmLandId() {
		return smLandId;
	}

	public void setSmLandId(Integer smLandId) {
		this.smLandId = smLandId;
	}
	
	public String getJciFukuanri() {
		return jciFukuanri;
	}

	public void setJciFukuanri(String jciFukuanri) {
		this.jciFukuanri = jciFukuanri;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	@Override
	public String toString() {
		return "JournalShortMessage [smId=" + smId + ", smUserId=" + smUserId + ", smPopId=" + smPopId + ", smLandId="
				+ smLandId + ", smRentId=" + smRentId + ", smNotRentId=" + smNotRentId + ", smContent=" + smContent
				+ ", smState=" + smState + ", smType=" + smType + ", smTreatmentStatus=" + smTreatmentStatus
				+ ", smDataTime=" + smDataTime + ", smMoney=" + smMoney + ", smCount=" + smCount + ", smField="
				+ smField + ", smIpId=" + smIpId + ", pageNumber=" + pageNumber + ", startNum=" + startNum + ", endNum="
				+ endNum + ", totalNum=" + totalNum + ", totalPage=" + totalPage + ", popName=" + popName
				+ ", popTelephone=" + popTelephone + ", popIdcard=" + popIdcard + ", popId=" + popId + ", addProvince="
				+ addProvince + ", addCity=" + addCity + ", addDistrict=" + addDistrict + ", addZone=" + addZone
				+ ", addStreet=" + addStreet + ", addCommunity=" + addCommunity + ", addBuilding=" + addBuilding
				+ ", addDoorplateno=" + addDoorplateno + ", popLandlord=" + popLandlord + ", popRenter=" + popRenter
				+ ", smlandId=" + smlandId + ", smrentId=" + smrentId + ", smNote=" + smNote + ", startTime="
				+ startTime + ", endTime=" + endTime + ", jciNature=" + jciNature + ", jciBeginPeriods="
				+ jciBeginPeriods + ", jciEndPeriods=" + jciEndPeriods + ", jciFukuanri=" + jciFukuanri + ", flag="
				+ flag + ", jrlEndTime=" + jrlEndTime + ", jrrEndTime=" + jrrEndTime + ", serviceTelephone="
				+ serviceTelephone + ", companyAddress=" + companyAddress + ", deadline=" + deadline + ", hsEndDate="
				+ hsEndDate + ", hsDepositAmount=" + hsDepositAmount + ", messageType=" + messageType + ", rentPopId="
				+ rentPopId + ", hrid=" + hrid + ", hsid=" + hsid + ", time=" + time + ", repairUserId=" + repairUserId
				+ ", repairUserName=" + repairUserName + ", repairEvenType=" + repairEvenType + ", repairUserMobile="
				+ repairUserMobile + ", repairDescribe=" + repairDescribe + ", hopeTime=" + hopeTime + ", houseType="
				+ houseType + ", hsBankType=" + hsBankType + ", hsBankNum=" + hsBankNum + ", hsBankName=" + hsBankName
				+ ", smReceiveNumber=" + smReceiveNumber + ", smUserName=" + smUserName + ", variableParameter="
				+ variableParameter + ", url=" + url + ", password=" + password + ", houseAddress=" + houseAddress
				+ "]";
	}
}