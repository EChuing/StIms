package com.zz.po.journal;

public class JournalElectronicContract {
	private Integer popId;
	private Integer hrUserId;
	private Integer ectId;
	private Integer ectHrRenterId;
	private Integer ectOperatingId;
	private Integer ectHsId;
	private Integer ectHrId;
	private String ectUserCode;
	private String ectIdCard;
	private String ectName;
	private String ectTelphone;
	private String ectContractNo;
	private String ectContractTemplateNumber;
	private String ectTemplateFillValue;
	private String ectStatus;
	private String ectSignUrl;
	private String ectCreationTime;
	

	public String getEctSignUrl() {
		return ectSignUrl;
	}



	public void setEctSignUrl(String ectSignUrl) {
		this.ectSignUrl = ectSignUrl;
	}



	public Integer getPopId() {
		return popId;
	}



	public void setPopId(Integer popId) {
		this.popId = popId;
	}



	public Integer getHrUserId() {
		return hrUserId;
	}



	public void setHrUserId(Integer hrUserId) {
		this.hrUserId = hrUserId;
	}



	public Integer getEctId() {
		return ectId;
	}



	public void setEctId(Integer ectId) {
		this.ectId = ectId;
	}



	public Integer getEctHrRenterId() {
		return ectHrRenterId;
	}



	public void setEctHrRenterId(Integer ectHrRenterId) {
		this.ectHrRenterId = ectHrRenterId;
	}



	public Integer getEctOperatingId() {
		return ectOperatingId;
	}



	public void setEctOperatingId(Integer ectOperatingId) {
		this.ectOperatingId = ectOperatingId;
	}



	public Integer getEctHsId() {
		return ectHsId;
	}



	public void setEctHsId(Integer ectHsId) {
		this.ectHsId = ectHsId;
	}



	public Integer getEctHrId() {
		return ectHrId;
	}



	public void setEctHrId(Integer ectHrId) {
		this.ectHrId = ectHrId;
	}



	public String getEctUserCode() {
		return ectUserCode;
	}



	public void setEctUserCode(String ectUserCode) {
		this.ectUserCode = ectUserCode;
	}



	public String getEctIdCard() {
		return ectIdCard;
	}



	public void setEctIdCard(String ectIdCard) {
		this.ectIdCard = ectIdCard;
	}



	public String getEctName() {
		return ectName;
	}



	public void setEctName(String ectName) {
		this.ectName = ectName;
	}



	public String getEctTelphone() {
		return ectTelphone;
	}



	public void setEctTelphone(String ectTelphone) {
		this.ectTelphone = ectTelphone;
	}



	public String getEctContractNo() {
		return ectContractNo;
	}



	public void setEctContractNo(String ectContractNo) {
		this.ectContractNo = ectContractNo;
	}



	public String getEctContractTemplateNumber() {
		return ectContractTemplateNumber;
	}



	public void setEctContractTemplateNumber(String ectContractTemplateNumber) {
		this.ectContractTemplateNumber = ectContractTemplateNumber;
	}



	public String getEctTemplateFillValue() {
		return ectTemplateFillValue;
	}



	public void setEctTemplateFillValue(String ectTemplateFillValue) {
		this.ectTemplateFillValue = ectTemplateFillValue;
	}



	public String getEctStatus() {
		return ectStatus;
	}



	public void setEctStatus(String ectStatus) {
		this.ectStatus = ectStatus;
	}

	public String getEctCreationTime() {
		return ectCreationTime;
	}

	public void setEctCreationTime(String ectCreationTime) {
		this.ectCreationTime = ectCreationTime;
	}

	@Override
	public String toString() {
		return "JournalElectronicContract{" +
				"popId=" + popId +
				", hrUserId=" + hrUserId +
				", ectId=" + ectId +
				", ectHrRenterId=" + ectHrRenterId +
				", ectOperatingId=" + ectOperatingId +
				", ectHsId=" + ectHsId +
				", ectHrId=" + ectHrId +
				", ectUserCode='" + ectUserCode + '\'' +
				", ectIdCard='" + ectIdCard + '\'' +
				", ectName='" + ectName + '\'' +
				", ectTelphone='" + ectTelphone + '\'' +
				", ectContractNo='" + ectContractNo + '\'' +
				", ectContractTemplateNumber='" + ectContractTemplateNumber + '\'' +
				", ectTemplateFillValue='" + ectTemplateFillValue + '\'' +
				", ectStatus='" + ectStatus + '\'' +
				", ectSignUrl='" + ectSignUrl + '\'' +
				", ectCreationTime='" + ectCreationTime + '\'' +
				'}';
	}
}
