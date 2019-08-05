package com.zz.po.info;

/**
 * 租客表
 */
public class InfoRenter {
    private Integer renterId;

    private Integer renterUserId;

    private String renterSecondContacts;

    private String renterSecondPhone;
    
    private Integer renterDepartment;
    private Integer renterStorefront;
    
    private String tempAssist;
    
    private String renterRegisterTime;
    
    private String addProvince;
    private String addCity;
    private String addDistrict;
    private String addZone;
    private String addStreet;
    private String addCommunity;
    private String addBuilding;
    private String addDoorplateno;
    
    private String renterPopIdcard;
    private String renterPopName;
    private String renterPopTelephone;
    private Integer renterPopulationId;
    
    private String popModifyTheRecord;
    private String popNation;
    private String popMarriageState;
    private String popFromArea;
    private String popPresentAddress;
    private String popIdcardType;
    private String popBirth;
    private String popSex;
    private String popDegreeEducation;
    private String popOccupation;
    private String popUnitService;
    private String popCheckinTime;
    private String popResidenceType;
    private String popResidenceCause;
    private String popRelation;
    private String popNameRemark;

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

	public String getPopMarriageState() {
		return popMarriageState;
	}

	public void setPopMarriageState(String popMarriageState) {
		this.popMarriageState = popMarriageState;
	}

	public String getPopFromArea() {
		return popFromArea;
	}

	public void setPopFromArea(String popFromArea) {
		this.popFromArea = popFromArea;
	}

	public String getPopPresentAddress() {
		return popPresentAddress;
	}

	public void setPopPresentAddress(String popPresentAddress) {
		this.popPresentAddress = popPresentAddress;
	}

	public String getPopIdcardType() {
		return popIdcardType;
	}

	public void setPopIdcardType(String popIdcardType) {
		this.popIdcardType = popIdcardType;
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

	public String getPopDegreeEducation() {
		return popDegreeEducation;
	}

	public void setPopDegreeEducation(String popDegreeEducation) {
		this.popDegreeEducation = popDegreeEducation;
	}

	public String getPopOccupation() {
		return popOccupation;
	}

	public void setPopOccupation(String popOccupation) {
		this.popOccupation = popOccupation;
	}

	public String getPopUnitService() {
		return popUnitService;
	}

	public void setPopUnitService(String popUnitService) {
		this.popUnitService = popUnitService;
	}

	public String getPopCheckinTime() {
		return popCheckinTime;
	}

	public void setPopCheckinTime(String popCheckinTime) {
		this.popCheckinTime = popCheckinTime;
	}

	public String getPopResidenceType() {
		return popResidenceType;
	}

	public void setPopResidenceType(String popResidenceType) {
		this.popResidenceType = popResidenceType;
	}

	public String getPopResidenceCause() {
		return popResidenceCause;
	}

	public void setPopResidenceCause(String popResidenceCause) {
		this.popResidenceCause = popResidenceCause;
	}

	public String getPopRelation() {
		return popRelation;
	}

	public void setPopRelation(String popRelation) {
		this.popRelation = popRelation;
	}

	public String getPopModifyTheRecord() {
		return popModifyTheRecord;
	}

	public void setPopModifyTheRecord(String popModifyTheRecord) {
		this.popModifyTheRecord = popModifyTheRecord;
	}

	public Integer getRenterPopulationId() {
		return renterPopulationId;
	}

	public void setRenterPopulationId(Integer renterPopulationId) {
		this.renterPopulationId = renterPopulationId;
	}

	public String getRenterPopName() {
		return renterPopName;
	}

	public void setRenterPopName(String renterPopName) {
		this.renterPopName = renterPopName;
	}

	public String getRenterPopTelephone() {
		return renterPopTelephone;
	}

	public void setRenterPopTelephone(String renterPopTelephone) {
		this.renterPopTelephone = renterPopTelephone;
	}

	public String getRenterPopIdcard() {
		return renterPopIdcard;
	}

	public void setRenterPopIdcard(String renterPopIdcard) {
		this.renterPopIdcard = renterPopIdcard;
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

	public String getRenterRegisterTime() {
		return (renterRegisterTime != null && renterRegisterTime.length() > 19) ? renterRegisterTime.substring(0,19) : renterRegisterTime;
	}

	public void setRenterRegisterTime(String renterRegisterTime) {
		this.renterRegisterTime = renterRegisterTime;
	}

	public String getTempAssist() {
		return tempAssist;
	}

	public void setTempAssist(String tempAssist) {
		this.tempAssist = tempAssist;
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

    public Integer getRenterId() {
        return renterId;
    }

    public void setRenterId(Integer renterId) {
        this.renterId = renterId;
    }

    public Integer getRenterUserId() {
		return renterUserId;
	}

	public void setRenterUserId(Integer renterUserId) {
		this.renterUserId = renterUserId;
	}

    public String getRenterSecondContacts() {
        return renterSecondContacts;
    }

    public void setRenterSecondContacts(String renterSecondContacts) {
        this.renterSecondContacts = renterSecondContacts == null ? null : renterSecondContacts.trim();
    }

    public String getRenterSecondPhone() {
        return renterSecondPhone;
    }

    public void setRenterSecondPhone(String renterSecondPhone) {
        this.renterSecondPhone = renterSecondPhone == null ? null : renterSecondPhone.trim();
    }

	@Override
	public String toString() {
		return "InfoRenter [renterId=" + renterId + ", renterUserId="
				+ renterUserId + ", renterSecondContacts="
				+ renterSecondContacts + ", renterSecondPhone="
				+ renterSecondPhone + ", renterDepartment="
				+ renterDepartment + ", renterStorefront=" + renterStorefront
				+ ", tempAssist=" + tempAssist + ", renterRegisterTime="
				+ renterRegisterTime + ", addProvince=" + addProvince
				+ ", addCity=" + addCity + ", addDistrict=" + addDistrict
				+ ", addZone=" + addZone + ", addStreet=" + addStreet
				+ ", addCommunity=" + addCommunity + ", addBuilding="
				+ addBuilding + ", addDoorplateno=" + addDoorplateno
				+ ", renterPopIdcard=" + renterPopIdcard + ", renterPopName="
				+ renterPopName + ", renterPopTelephone=" + renterPopTelephone
				+ ", renterPopulationId=" + renterPopulationId + "]";
	}
	
}