package com.zz.po.info;

import com.zz.po.commons.CommonsPo;

/**
 * 房东合约表
 */
public class InfoRenewalLandlord extends CommonsPo{
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
    
    private String jrlUpdateTime;
    
    private Integer jrlFreeDaysDecoration;
    
    private Integer jrlFreeDaysHeader;

    private String jrlAnnualMethod;

    private Boolean jrlReverseOrderFlag;

    private Integer laPopulationId;
	private Integer laId;
	private Integer popId;				//人口表id
	private String  popName;				//人口表租客姓名
	
	private Integer hsId;				//未租表ID
	private String hsAddCommunity;		//楼盘
	private String hsAddBuilding;		//楼栋
	private String hsAddDoorplateno;	//门牌号
	private String theSortTerm;
	private String theSortContrary;
	
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
        this.jrlRenewalCoding = jrlRenewalCoding == null ? null : jrlRenewalCoding.trim();
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
        this.jrlContractType = jrlContractType == null ? null : jrlContractType.trim();
    }

    public String getJrlRentalType() {
        return jrlRentalType;
    }

    public void setJrlRentalType(String jrlRentalType) {
        this.jrlRentalType = jrlRentalType == null ? null : jrlRentalType.trim();
    }

    public String getJrlBeginTime() {
        return jrlBeginTime;
    }

    public void setJrlBeginTime(String jrlBeginTime) {
        this.jrlBeginTime = jrlBeginTime == null ? null : jrlBeginTime.trim();
    }

    public String getJrlEndTime() {
        return jrlEndTime;
    }

    public void setJrlEndTime(String jrlEndTime) {
        this.jrlEndTime = jrlEndTime == null ? null : jrlEndTime.trim();
    }

    public String getJrlSignedTime() {
        return jrlSignedTime;
    }

    public void setJrlSignedTime(String jrlSignedTime) {
        this.jrlSignedTime = jrlSignedTime == null ? null : jrlSignedTime.trim();
    }

    public String getJrlRegistrationTime() {
        return (jrlRegistrationTime != null && jrlRegistrationTime.length() > 19) ? jrlRegistrationTime.substring(0,19) : jrlRegistrationTime;
    }

    public void setJrlRegistrationTime(String jrlRegistrationTime) {
        this.jrlRegistrationTime = jrlRegistrationTime == null ? null : jrlRegistrationTime.trim();
    }

	public String getJrlTheTerm() {
        return jrlTheTerm;
    }

    public void setJrlTheTerm(String jrlTheTerm) {
        this.jrlTheTerm = jrlTheTerm == null ? null : jrlTheTerm.trim();
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
        this.jrlPriceLadder = jrlPriceLadder == null ? null : jrlPriceLadder.trim();
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
        this.jrlRentFreeSegment = jrlRentFreeSegment == null ? null : jrlRentFreeSegment.trim();
    }

    public String getJrlPaymentMethod() {
        return jrlPaymentMethod;
    }

    public void setJrlPaymentMethod(String jrlPaymentMethod) {
        this.jrlPaymentMethod = jrlPaymentMethod == null ? null : jrlPaymentMethod.trim();
    }

    public String getJrlUpdateTime() {
		return jrlUpdateTime;
	}

	public void setJrlUpdateTime(String jrlUpdateTime) {
		this.jrlUpdateTime = jrlUpdateTime;
	}

	public String getJrlRemark() {
        return jrlRemark;
    }

    public void setJrlRemark(String jrlRemark) {
        this.jrlRemark = jrlRemark == null ? null : jrlRemark.trim();
    }

    public String getJrlImgPath() {
        return jrlImgPath;
    }

    public void setJrlImgPath(String jrlImgPath) {
        this.jrlImgPath = jrlImgPath == null ? null : jrlImgPath.trim();
    }

	public String getJrlImgNum() {
		return jrlImgNum;
	}

	public void setJrlImgNum(String jrlImgNum) {
		this.jrlImgNum = jrlImgNum;
	}

	public Integer getLaPopulationId() {
		return laPopulationId;
	}

	public void setLaPopulationId(Integer laPopulationId) {
		this.laPopulationId = laPopulationId;
	}

	public Integer getLaId() {
		return laId;
	}

	public void setLaId(Integer laId) {
		this.laId = laId;
	}

	public Integer getPopId() {
		return popId;
	}

	public void setPopId(Integer popId) {
		this.popId = popId;
	}

	public String getPopName() {
		return popName;
	}

	public void setPopName(String popName) {
		this.popName = popName;
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

    public String getJrlAnnualMethod() { return jrlAnnualMethod; }

    public void setJrlAnnualMethod(String jrlAnnualMethod) { this.jrlAnnualMethod = jrlAnnualMethod; }

    public Boolean getJrlReverseOrderFlag() { return jrlReverseOrderFlag; }

    public void setJrlReverseOrderFlag(Boolean jrlReverseOrderFlag) { this.jrlReverseOrderFlag = jrlReverseOrderFlag; }

    @Override
	public String toString() {
		return "InfoRenewalLandlord [jrlId=" + jrlId + ", jrlRenewalCoding=" + jrlRenewalCoding + ", jrlHouse4storeId="
				+ jrlHouse4storeId + ", jrlLandlordId=" + jrlLandlordId + ", jrlUserId=" + jrlUserId
				+ ", jrlDepartment=" + jrlDepartment + ", jrlStorefront=" + jrlStorefront + ", jrlContractType="
				+ jrlContractType + ", jrlRentalType=" + jrlRentalType + ", jrlBeginTime=" + jrlBeginTime
				+ ", jrlEndTime=" + jrlEndTime + ", jrlSignedTime=" + jrlSignedTime + ", jrlRegistrationTime="
				+ jrlRegistrationTime + ", jrlTheTerm=" + jrlTheTerm + ", jrlInAdvancePay=" + jrlInAdvancePay
				+ ", jrlPriceLadder=" + jrlPriceLadder + ", jrlRentFreeDays=" + jrlRentFreeDays
				+ ", jrlRentFreeSegment=" + jrlRentFreeSegment + ", jrlPaymentMethod=" + jrlPaymentMethod
				+ ", jrlRemark=" + jrlRemark + ", jrlImgPath=" + jrlImgPath + ", jrlImgNum=" + jrlImgNum
				+ ", jrlUpdateTime=" + jrlUpdateTime + ", jrlFreeDaysDecoration=" + jrlFreeDaysDecoration
				+ ", jrlFreeDaysHeader=" + jrlFreeDaysHeader + ", laPopulationId=" + laPopulationId + ", laId=" + laId
				+ ", popId=" + popId + ", popName=" + popName + ", hsId=" + hsId + ", hsAddCommunity=" + hsAddCommunity
				+ ", hsAddBuilding=" + hsAddBuilding + ", hsAddDoorplateno=" + hsAddDoorplateno + "]";
	}
    
}