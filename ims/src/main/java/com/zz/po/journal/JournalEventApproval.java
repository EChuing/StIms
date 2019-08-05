package com.zz.po.journal;

/**
 * 事件审批表
 */
public class JournalEventApproval {
    private Integer eaId;

    private Integer eaRentId;

    private Integer eaStoreId;

    private Integer eaHouseId;
    
    private Integer eaCocId;

	private Integer eaEventPublisher;

    private Integer eaEventHandler;

    private String eaEventType;

    private String eaEventState;

    private String eaWhetherGenerateRecord;

    private Double eaAmountInvolved;

    private String eaAmountType;

    private String eaReleaseTime;

    private String eaCompletionTime;
    
    private String eaPayTime;
    
    private String eaEventContent;

    private String eaHistoricalProcess;

    private String eaTreatmentOpinion;
    
    private String eaHomeType;
    
    private String eaImgPath;
    
    private String eaImgNum;
    
    private String splitFlag;

    private String startNum;

	private String endNum;

	private String totalNum;

	private String totalPage;

	private String startTime;

	private String endTime;

	private String publisherName;

	private String handlerName;

	private String payStartTime;

	private String payEndTime;
	
	private String addProvince;

    private String addCity;

    private String addDistrict;

    private String addZone;

    private String addStreet;

    private String addCommunity;

    private String addBuilding;

    private String addDoorplateno;

    private String keyAdministrator;

    private Integer userId;

    private Integer departmentId;

    private Integer storefrontId;

    private String att;

    private String eaUseTime;

    private String eaApprovalNumber;

    private String eaBankName;

    private String eaBankUsername;

    private String eaBankAccountNumber;

    private String eaFinancialCoding;

	private Integer handlerDetId;

	private Integer handlerStoreId;

	private String cocContacts;

	private String eaSubordinateBranch;

	private String eaBankAccountDescription;

	public String getEaSubordinateBranch() {
		return eaSubordinateBranch;
	}

	public void setEaSubordinateBranch(String eaSubordinateBranch) {
		this.eaSubordinateBranch = eaSubordinateBranch;
	}

	public String getEaBankAccountDescription() {
		return eaBankAccountDescription;
	}

	public void setEaBankAccountDescription(String eaBankAccountDescription) {
		this.eaBankAccountDescription = eaBankAccountDescription;
	}

	public String getCocContacts() {
		return cocContacts;
	}

	public void setCocContacts(String cocContacts) {
		this.cocContacts = cocContacts;
	}

	public Integer getEaCocId() {
			return eaCocId;
		}

	public void setEaCocId(Integer eaCocId) {
			this.eaCocId = eaCocId;
		}

	public Integer getHandlerDetId() {
		return handlerDetId;
	}

	public void setHandlerDetId(Integer handlerDetId) {
		this.handlerDetId = handlerDetId;
	}

	public Integer getHandlerStoreId() {
		return handlerStoreId;
	}

	public void setHandlerStoreId(Integer handlerStoreId) {
		this.handlerStoreId = handlerStoreId;
	}

	public String getPayStartTime() {
		return payStartTime;
	}

	public void setPayStartTime(String payStartTime) {
		this.payStartTime = payStartTime;
	}

	public String getPayEndTime() {
		return payEndTime;
	}

	public void setPayEndTime(String payEndTime) {
		this.payEndTime = payEndTime;
	}

	public String getEaPayTime() {
		return eaPayTime;
	}

	public void setEaPayTime(String eaPayTime) {
		this.eaPayTime = eaPayTime;
	}

	public String getEaFinancialCoding() {
        return eaFinancialCoding;
    }

    public void setEaFinancialCoding(String eaFinancialCoding) {
        this.eaFinancialCoding = eaFinancialCoding;
    }

    public String getEaBankName() {
        return eaBankName;
    }

    public void setEaBankName(String eaBankName) {
        this.eaBankName = eaBankName;
    }

    public String getEaBankUsername() {
        return eaBankUsername;
    }

    public void setEaBankUsername(String eaBankUsername) {
        this.eaBankUsername = eaBankUsername;
    }

    public String getEaBankAccountNumber() {
        return eaBankAccountNumber;
    }

    public void setEaBankAccountNumber(String eaBankAccountNumber) {
        this.eaBankAccountNumber = eaBankAccountNumber;
    }

    public String getEaApprovalNumber() {
		return eaApprovalNumber;
	}

	public void setEaApprovalNumber(String eaApprovalNumber) {
		this.eaApprovalNumber = eaApprovalNumber;
	}

	public String getSplitFlag() {
		return splitFlag;
	}

	public void setSplitFlag(String splitFlag) {
		this.splitFlag = splitFlag;
	}

	public String getEaUseTime() {
		return eaUseTime;
	}

	public void setEaUseTime(String eaUseTime) {
		this.eaUseTime = eaUseTime;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public Integer getStorefrontId() {
		return storefrontId;
	}

	public void setStorefrontId(Integer storefrontId) {
		this.storefrontId = storefrontId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getKeyAdministrator() {
		return keyAdministrator;
	}

	public void setKeyAdministrator(String keyAdministrator) {
		this.keyAdministrator = keyAdministrator;
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

	public String getEaHomeType() {
		return eaHomeType;
	}

	public void setEaHomeType(String eaHomeType) {
		this.eaHomeType = eaHomeType;
	}

	public String getPublisherName() {
		return publisherName;
	}

	public void setPublisherName(String publisherName) {
		this.publisherName = publisherName;
	}

	public String getHandlerName() {
		return handlerName;
	}

	public void setHandlerName(String handlerName) {
		this.handlerName = handlerName;
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

	public String getEaEventContent() {
		return eaEventContent;
	}

	public void setEaEventContent(String eaEventContent) {
		this.eaEventContent = eaEventContent;
	}

	public String getEaHistoricalProcess() {
		return eaHistoricalProcess;
	}

	public void setEaHistoricalProcess(String eaHistoricalProcess) {
		this.eaHistoricalProcess = eaHistoricalProcess;
	}

	public String getEaTreatmentOpinion() {
		return eaTreatmentOpinion;
	}

	public void setEaTreatmentOpinion(String eaTreatmentOpinion) {
		this.eaTreatmentOpinion = eaTreatmentOpinion;
	}

	public Integer getEaId() {
        return eaId;
    }

    public void setEaId(Integer eaId) {
        this.eaId = eaId;
    }

    public Integer getEaRentId() {
        return eaRentId;
    }

    public void setEaRentId(Integer eaRentId) {
        this.eaRentId = eaRentId;
    }

    public Integer getEaStoreId() {
        return eaStoreId;
    }

    public void setEaStoreId(Integer eaStoreId) {
        this.eaStoreId = eaStoreId;
    }

    public Integer getEaHouseId() {
        return eaHouseId;
    }

    public void setEaHouseId(Integer eaHouseId) {
        this.eaHouseId = eaHouseId;
    }

    public Integer getEaEventPublisher() {
        return eaEventPublisher;
    }

    public void setEaEventPublisher(Integer eaEventPublisher) {
        this.eaEventPublisher = eaEventPublisher;
    }

    public Integer getEaEventHandler() {
        return eaEventHandler;
    }

    public void setEaEventHandler(Integer eaEventHandler) {
        this.eaEventHandler = eaEventHandler;
    }

    public String getEaEventType() {
        return eaEventType;
    }

    public void setEaEventType(String eaEventType) {
        this.eaEventType = eaEventType == null ? null : eaEventType.trim();
    }

    public String getEaEventState() {
        return eaEventState;
    }

    public void setEaEventState(String eaEventState) {
        this.eaEventState = eaEventState == null ? null : eaEventState.trim();
    }

    public String getEaWhetherGenerateRecord() {
        return eaWhetherGenerateRecord;
    }

    public void setEaWhetherGenerateRecord(String eaWhetherGenerateRecord) {
        this.eaWhetherGenerateRecord = eaWhetherGenerateRecord == null ? null : eaWhetherGenerateRecord.trim();
    }

    public Double getEaAmountInvolved() {
        return eaAmountInvolved;
    }

    public void setEaAmountInvolved(Double eaAmountInvolved) {
        this.eaAmountInvolved = eaAmountInvolved;
    }

    public String getEaAmountType() {
        return eaAmountType;
    }

    public void setEaAmountType(String eaAmountType) {
        this.eaAmountType = eaAmountType == null ? null : eaAmountType.trim();
    }

    public String getEaReleaseTime() {
        return (eaReleaseTime != null && eaReleaseTime.length() > 19) ? eaReleaseTime.substring(0,19) : eaReleaseTime;
    }

    public void setEaReleaseTime(String eaReleaseTime) {
        this.eaReleaseTime = eaReleaseTime == null ? null : eaReleaseTime.trim();
    }

    public String getEaCompletionTime() {
        return eaCompletionTime;
    }

    public void setEaCompletionTime(String eaCompletionTime) {
        this.eaCompletionTime = eaCompletionTime == null ? null : eaCompletionTime.trim();
    }

	public String getEaImgPath() {
		return eaImgPath;
	}

	public void setEaImgPath(String eaImgPath) {
		this.eaImgPath = eaImgPath;
	}

	public String getEaImgNum() {
		return eaImgNum;
	}

	public void setEaImgNum(String eaImgNum) {
		this.eaImgNum = eaImgNum;
	}

	public String getAtt() {
		return att;
	}

	public void setAtt(String att) {
		this.att = att;
	}

	@Override
	public String toString() {
		return "JournalEventApproval{" +
				"eaId=" + eaId +
				", eaRentId=" + eaRentId +
				", eaStoreId=" + eaStoreId +
				", eaHouseId=" + eaHouseId +
				", eaCocId=" + eaCocId +
				", eaEventPublisher=" + eaEventPublisher +
				", eaEventHandler=" + eaEventHandler +
				", eaEventType='" + eaEventType + '\'' +
				", eaEventState='" + eaEventState + '\'' +
				", eaWhetherGenerateRecord='" + eaWhetherGenerateRecord + '\'' +
				", eaAmountInvolved=" + eaAmountInvolved +
				", eaAmountType='" + eaAmountType + '\'' +
				", eaReleaseTime='" + eaReleaseTime + '\'' +
				", eaCompletionTime='" + eaCompletionTime + '\'' +
				", eaPayTime='" + eaPayTime + '\'' +
				", eaEventContent='" + eaEventContent + '\'' +
				", eaHistoricalProcess='" + eaHistoricalProcess + '\'' +
				", eaTreatmentOpinion='" + eaTreatmentOpinion + '\'' +
				", eaHomeType='" + eaHomeType + '\'' +
				", eaImgPath='" + eaImgPath + '\'' +
				", eaImgNum='" + eaImgNum + '\'' +
				", splitFlag='" + splitFlag + '\'' +
				", startNum='" + startNum + '\'' +
				", endNum='" + endNum + '\'' +
				", totalNum='" + totalNum + '\'' +
				", totalPage='" + totalPage + '\'' +
				", startTime='" + startTime + '\'' +
				", endTime='" + endTime + '\'' +
				", publisherName='" + publisherName + '\'' +
				", handlerName='" + handlerName + '\'' +
				", payStartTime='" + payStartTime + '\'' +
				", payEndTime='" + payEndTime + '\'' +
				", addProvince='" + addProvince + '\'' +
				", addCity='" + addCity + '\'' +
				", addDistrict='" + addDistrict + '\'' +
				", addZone='" + addZone + '\'' +
				", addStreet='" + addStreet + '\'' +
				", addCommunity='" + addCommunity + '\'' +
				", addBuilding='" + addBuilding + '\'' +
				", addDoorplateno='" + addDoorplateno + '\'' +
				", keyAdministrator='" + keyAdministrator + '\'' +
				", userId=" + userId +
				", departmentId=" + departmentId +
				", storefrontId=" + storefrontId +
				", att='" + att + '\'' +
				", eaUseTime='" + eaUseTime + '\'' +
				", eaApprovalNumber='" + eaApprovalNumber + '\'' +
				", eaBankName='" + eaBankName + '\'' +
				", eaBankUsername='" + eaBankUsername + '\'' +
				", eaBankAccountNumber='" + eaBankAccountNumber + '\'' +
				", eaFinancialCoding='" + eaFinancialCoding + '\'' +
				", handlerDetId=" + handlerDetId +
				", handlerStoreId=" + handlerStoreId +
				", cocContacts='" + cocContacts + '\'' +
				", eaSubordinateBranch='" + eaSubordinateBranch + '\'' +
				", eaBankAccountDescription='" + eaBankAccountDescription + '\'' +
				'}';
	}

}