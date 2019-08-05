package com.zz.po.journal;

import com.zz.po.commons.CommonsPo;

/**
 * 维修、审批短信表
 */
public class JournalShortMessageAdministrative  extends CommonsPo{
    private Integer smId;
    
    private Integer smUserId;
    
    private String smUserContacts;

    private Integer smRentId;

    private Integer smNotRentId;

    private String smContent;

    private String smState;

    private String smType;

    private String smDataTime;
    
    private Double smMoney;
    
    private Integer smCount;
    
    private String smField;

	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	
	private String addProvince;
	private String addCity;
	private String addDistrict;
	private String addZone;
	private String addStreet;
	private String addCommunity;
	private String addBuilding;
	private String addDoorplateno;
	
	private String repairEvenType;
	private String popName;
	private String popTelephone;
	private String hopeTime;
	private String repairDescribe;
	
	private String evenType;
	private String houseType;
	private String handleStatus;
	private String handleOpinion;
	
	private String suStaffName;
	private String doorPsw;
	
	public String getDoorPsw() {
        return doorPsw;
    }
    public void setDoorPsw(String doorPsw) {
        this.doorPsw = doorPsw;
    }
    public String getSmField() {
		return smField;
	}
	public void setSmField(String smField) {
		this.smField = smField;
	}
	public String getSuStaffName() {
		return suStaffName;
	}
	public void setSuStaffName(String suStaffName) {
		this.suStaffName = suStaffName;
	}
	public String getHandleOpinion() {
		return handleOpinion;
	}
	public void setHandleOpinion(String handleOpinion) {
		this.handleOpinion = handleOpinion;
	}
	public String getHandleStatus() {
		return handleStatus;
	}
	public void setHandleStatus(String handleStatus) {
		this.handleStatus = handleStatus;
	}
	public String getEvenType() {
		return evenType;
	}
	public void setEvenType(String evenType) {
		this.evenType = evenType;
	}
	public String getHouseType() {
		return houseType;
	}
	public void setHouseType(String houseType) {
		this.houseType = houseType;
	}
	public String getSmUserContacts() {
		return smUserContacts;
	}
	public void setSmUserContacts(String smUserContacts) {
		this.smUserContacts = smUserContacts;
	}
	public String getRepairEvenType() {
		return repairEvenType;
	}
	public void setRepairEvenType(String repairEvenType) {
		this.repairEvenType = repairEvenType;
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
	public String getHopeTime() {
		return hopeTime;
	}
	public void setHopeTime(String hopeTime) {
		this.hopeTime = hopeTime;
	}
	public String getRepairDescribe() {
		return repairDescribe;
	}
	public void setRepairDescribe(String repairDescribe) {
		this.repairDescribe = repairDescribe;
	}
	public Integer getSmId() {
		return smId;
	}
	public void setSmId(Integer smId) {
		this.smId = smId;
	}
	public Integer getSmUserId() {
		return smUserId;
	}
	public void setSmUserId(Integer smUserId) {
		this.smUserId = smUserId;
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
		this.smContent = smContent;
	}
	public String getSmState() {
		return smState;
	}
	public void setSmState(String smState) {
		this.smState = smState;
	}
	public String getSmType() {
		return smType;
	}
	public void setSmType(String smType) {
		this.smType = smType;
	}
	public String getSmDataTime() {
		return (smDataTime != null && smDataTime.length() > 19) ? smDataTime.substring(0,19) : smDataTime;
	}
	public void setSmDataTime(String smDataTime) {
		this.smDataTime = smDataTime;
	}
	public Double getSmMoney() {
		return smMoney;
	}
	public void setSmMoney(Double smMoney) {
		this.smMoney = smMoney;
	}
	public Integer getSmCount() {
		return smCount;
	}
	public void setSmCount(Integer smCount) {
		this.smCount = smCount;
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
	
	@Override
	public String toString() {
		return "JournalShortMessageAdministrative [smId=" + smId
				+ ", smUserId=" + smUserId + ", smUserContacts="
				+ smUserContacts + ", smRentId=" + smRentId + ", smNotRentId="
				+ smNotRentId + ", smContent=" + smContent + ", smState="
				+ smState + ", smType=" + smType + ", smDataTime=" + smDataTime
				+ ", smMoney=" + smMoney + ", smCount=" + smCount
				+ ", pageNumber=" + pageNumber + ", startNum=" + startNum
				+ ", endNum=" + endNum + ", totalNum=" + totalNum
				+ ", totalPage=" + totalPage + ", addProvince=" + addProvince
				+ ", addCity=" + addCity + ", addDistrict=" + addDistrict
				+ ", addZone=" + addZone + ", addStreet=" + addStreet
				+ ", addCommunity=" + addCommunity + ", addBuilding="
				+ addBuilding + ", addDoorplateno=" + addDoorplateno
				+ ", repairEvenType=" + repairEvenType + ", popName=" + popName
				+ ", popTelephone=" + popTelephone + ", hopeTime=" + hopeTime
				+ ", repairDescribe=" + repairDescribe + ", evenType="
				+ evenType + ", houseType=" + houseType + ", handleStatus="
				+ handleStatus + ", handleOpinion=" + handleOpinion
				+ ", suStaffName=" + suStaffName + "]";
	}

}