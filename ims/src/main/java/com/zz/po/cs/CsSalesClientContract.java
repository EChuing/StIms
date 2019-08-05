package com.zz.po.cs;

public class CsSalesClientContract {
	private Integer csContractId;
	private String csImgPath;
	private String csImgNum;
	private String csSigningTime;
	private String csCancellationTime;
	private String csCreationTime;
	private String csName;
	private String csTelphone;
	private String att;
	private String csContractType;
	private String csRemarks;
	private String csContractNo;
	private String csContractTemplateNumber;
	private String csTemplateFillValue;
	private String csSignUrl;
	private String csStatus;
	private Integer csCocId;
	private String csUserCode;
	private String csIdCardNo;

	private String contractNumTips;
	private String usedContractNum;
	public String getContractNumTips() {
		return contractNumTips;
	}
	public void setContractNumTips(String contractNumTips) {
		this.contractNumTips = contractNumTips;
	}
	public String getUsedContractNum() {
		return usedContractNum;
	}
	public void setUsedContractNum(String usedContractNum) {
		this.usedContractNum = usedContractNum;
	}
	public String getCsIdCardNo() {
		return csIdCardNo;
	}
	public void setCsIdCardNo(String csIdCardNo) {
		this.csIdCardNo = csIdCardNo;
	}
	public String getCsUserCode() {
		return csUserCode;
	}
	public void setCsUserCode(String csUserCode) {
		this.csUserCode = csUserCode;
	}
	public Integer getCsCocId() {
		return csCocId;
	}
	public void setCsCocId(Integer csCocId) {
		this.csCocId = csCocId;
	}
	public String getCsContractTemplateNumber() {
		return csContractTemplateNumber;
	}
	public void setCsContractTemplateNumber(String csContractTemplateNumber) {
		this.csContractTemplateNumber = csContractTemplateNumber;
	}
	public String getCsTemplateFillValue() {
		return csTemplateFillValue;
	}
	public void setCsTemplateFillValue(String csTemplateFillValue) {
		this.csTemplateFillValue = csTemplateFillValue;
	}
	public String getCsSignUrl() {
		return csSignUrl;
	}
	public void setCsSignUrl(String csSignUrl) {
		this.csSignUrl = csSignUrl;
	}
	public String getCsStatus() {
		return csStatus;
	}
	public void setCsStatus(String csStatus) {
		this.csStatus = csStatus;
	}
	public String getCsRemarks() {
		return csRemarks;
	}
	public void setCsRemarks(String csRemarks) {
		this.csRemarks = csRemarks;
	}
	public String getCsContractType() {
		return csContractType;
	}
	public void setCsContractType(String csContractType) {
		this.csContractType = csContractType;
	}
	public String getAtt() {
		return att;
	}
	public void setAtt(String att) {
		this.att = att;
	}
	public Integer getCsContractId() {
		return csContractId;
	}
	public void setCsContractId(Integer csContractId) {
		this.csContractId = csContractId;
	}
	public String getCsImgPath() {
		return csImgPath;
	}
	public void setCsImgPath(String csImgPath) {
		this.csImgPath = csImgPath;
	}
	public String getCsImgNum() {
		return csImgNum;
	}
	public void setCsImgNum(String csImgNum) {
		this.csImgNum = csImgNum;
	}
	
	public String getCsSigningTime() {
		return csSigningTime;
	}
	public void setCsSigningTime(String csSigningTime) {
		this.csSigningTime = csSigningTime == null ? null : csSigningTime.trim();
	}
	public String getCsCancellationTime() {
		return csCancellationTime;
	}
	public void setCsCancellationTime(String csCancellationTime) {
		this.csCancellationTime = csCancellationTime == null ? null : csCancellationTime.trim();
	}
	public String getCsCreationTime() {
		return csCreationTime;
	}
	public void setCsCreationTime(String csCreationTime) {
		this.csCreationTime = csCreationTime == null ? null : csCreationTime.trim();
	}
	public String getCsContractNo() {
		return csContractNo;
	}
	public void setCsContractNo(String csContractNo) {
		this.csContractNo = csContractNo;
	}
	public String getCsName() {
		return csName;
	}
	public void setCsName(String csName) {
		this.csName = csName;
	}
	public String getCsTelphone() {
		return csTelphone;
	}
	public void setCsTelphone(String csTelphone) {
		this.csTelphone = csTelphone;
	}
	@Override
	public String toString() {
		return "CsSalesClientContract [csContractId=" + csContractId + ", csImgPath=" + csImgPath + ", csImgNum="
				+ csImgNum + ", csSigningTime=" + csSigningTime + ", csCancellationTime=" + csCancellationTime
				+ ", csCreationTime=" + csCreationTime + ", csContractNo=" + csContractNo + ", csName=" + csName
				+ ", csTelphone=" + csTelphone + "]";
	}

}
