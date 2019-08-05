package com.zz.po.sys;

/**
 * 资产表
 */
public class SysAssets {

    private Integer saId;

    private String saNumber;

    private Integer saHouseStoreId;

    private Integer department;

    private Integer storefront;

    private Integer saAgent;

    private Integer saRegistrant;

    private String saUse;

    private String saType;

    private String saClassify;

    private String saName;

    private String saBrand;

    private String saModel;

    private Double saPrice;

    private String saStatus;

    private String saRemarks;

    private String saRegistrationTime;

    private Integer saHouseId;

    private String saPhotos;

    private String saPhotosNum;

    private String saAddCommunity;

    private String saKeyAdministrator;

    private Integer number;

    private Double saDepreciationPrice;

    private Integer saSupplier;

    private String saFollowUp;

    private String saGmtModified;

	public String getSaGmtModified() {
        return saGmtModified;
    }

    public void setSaGmtModified(String saGmtModified) {
        this.saGmtModified = saGmtModified;
    }

    public String getSaNumber() {
		return saNumber;
	}

	public void setSaNumber(String saNumber) {
		this.saNumber = saNumber;
	}

	public String getSaFollowUp() {
        return saFollowUp;
    }

    public void setSaFollowUp(String saFollowUp) {
        this.saFollowUp = saFollowUp;
    }

    public String getSaPhotosNum() {
		return saPhotosNum;
	}

	public void setSaPhotosNum(String saPhotosNum) {
		this.saPhotosNum = saPhotosNum;
	}

	public Integer getSaSupplier() {
		return saSupplier;
	}

	public void setSaSupplier(Integer saSupplier) {
		this.saSupplier = saSupplier;
	}



	public Integer getSaId() {
		return saId;
	}



	public void setSaId(Integer saId) {
		this.saId = saId;
	}



	public Integer getSaHouseStoreId() {
		return saHouseStoreId;
	}



	public void setSaHouseStoreId(Integer saHouseStoreId) {
		this.saHouseStoreId = saHouseStoreId;
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



	public Integer getSaAgent() {
		return saAgent;
	}



	public void setSaAgent(Integer saAgent) {
		this.saAgent = saAgent;
	}



	public Integer getSaRegistrant() {
		return saRegistrant;
	}



	public void setSaRegistrant(Integer saRegistrant) {
		this.saRegistrant = saRegistrant;
	}



	public String getSaUse() {
		return saUse;
	}



	public void setSaUse(String saUse) {
		this.saUse = saUse;
	}



	public String getSaType() {
		return saType;
	}



	public void setSaType(String saType) {
		this.saType = saType;
	}



	public String getSaClassify() {
		return saClassify;
	}



	public void setSaClassify(String saClassify) {
		this.saClassify = saClassify;
	}



	public String getSaName() {
		return saName;
	}



	public void setSaName(String saName) {
		this.saName = saName;
	}



	public String getSaBrand() {
		return saBrand;
	}



	public void setSaBrand(String saBrand) {
		this.saBrand = saBrand;
	}



	public String getSaModel() {
		return saModel;
	}



	public void setSaModel(String saModel) {
		this.saModel = saModel;
	}



	public Double getSaPrice() {
		return saPrice;
	}



	public void setSaPrice(Double saPrice) {
		this.saPrice = saPrice;
	}



	public String getSaStatus() {
		return saStatus;
	}



	public void setSaStatus(String saStatus) {
		this.saStatus = saStatus;
	}



	public String getSaRemarks() {
		return saRemarks;
	}



	public void setSaRemarks(String saRemarks) {
		this.saRemarks = saRemarks;
	}

	public String getSaRegistrationTime() {
		return (saRegistrationTime != null && saRegistrationTime.length() > 19) ? saRegistrationTime.substring(0,19) : saRegistrationTime;
	}

	public void setSaRegistrationTime(String saRegistrationTime) {
		this.saRegistrationTime = saRegistrationTime;
	}



	public Integer getSaHouseId() {
		return saHouseId;
	}



	public void setSaHouseId(Integer saHouseId) {
		this.saHouseId = saHouseId;
	}



	public String getSaPhotos() {
		return saPhotos;
	}



	public void setSaPhotos(String saPhotos) {
		this.saPhotos = saPhotos;
	}



	public String getSaAddCommunity() {
		return saAddCommunity;
	}



	public void setSaAddCommunity(String saAddCommunity) {
		this.saAddCommunity = saAddCommunity;
	}



	public String getSaKeyAdministrator() {
		return saKeyAdministrator;
	}



	public void setSaKeyAdministrator(String saKeyAdministrator) {
		this.saKeyAdministrator = saKeyAdministrator;
	}



	public Integer getNumber() {
		return number;
	}



	public void setNumber(Integer number) {
		this.number = number;
	}



	public Double getSaDepreciationPrice() {
		return saDepreciationPrice;
	}



	public void setSaDepreciationPrice(Double saDepreciationPrice) {
		this.saDepreciationPrice = saDepreciationPrice;
	}

	@Override
	public String toString() {
		return "SysAssets [saId=" + saId
				+ ", saHouseStoreId=" + saHouseStoreId + ", department="
				+ department + ", storefront=" + storefront + ", saAgent="
				+ saAgent + ", saRegistrant=" + saRegistrant + ", saUse="
				+ saUse + ", saType=" + saType + ", saClassify=" + saClassify
				+ ", saName=" + saName + ", saBrand=" + saBrand + ", saModel="
				+ saModel + ", saPrice=" + saPrice + ", saStatus=" + saStatus
				+ ", saRemarks=" + saRemarks
				+ ", saRegistrationTime=" + saRegistrationTime + ", saHouseId="
				+ saHouseId + ", saPhotos=" + saPhotos
				+ ", saAddCommunity=" + saAddCommunity
				+ ", saKeyAdministrator=" + saKeyAdministrator + ", number="
				+ number + ", saDepreciationPrice=" + saDepreciationPrice
				+ ", saSupplier=" + saSupplier + "]";
	}



}