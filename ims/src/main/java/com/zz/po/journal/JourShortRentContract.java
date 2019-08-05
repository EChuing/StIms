package com.zz.po.journal;

import java.util.List;

import com.zz.po.info.InfoPopulation;

public class JourShortRentContract {
    private Integer jsrcId;
    
    private Integer jsrcHsId;

    private Integer jsrcRenterId;

    private Integer jsrcUserId;
    
    private Integer jsrcCustomerId;

    private Integer jsrcTotalDays;

    private Double jsrcDailyPrice;
    
    private String jsrcPartnerId;
    
    private String hsAddFloor;
    
    private String jsrcOrderNum;
    
    private String jsrcRefundNum;

    private Double jsrcTotalPrice;

    private Double jsrcDeposit;

    private String jsrcBeginTime;

    private String jsrcEndTime;
    
    private String jsrcPeople;

    private String jsrcState;
    
    private String jsrcFollow;

    private String jsrcRegistrationTime;
    
    private String jsrcOrderSource;
    
    private Integer jsrcDepositPayType;

    private Double jsrcFirstPay;

    private Integer jsrcRoomChargePercent;
    
    private Integer jsrcOrderState;
    
	private List<Integer> hsIdList;
	
	private String hsIdListStr;
    
    private Integer departmentId;
    
    private Integer storeId;
    
    private String rentJson;
    
    private String popJson;
    
    private Integer type;
    
    private Integer lockId;
    
    private String cardFollow;
    
    private String cardId;
    
    private String idcard;
    
    private String cardNum;
    
    private String jsrcSaleNo;
    
    private String startNum;
  	private String endNum;
  	private String totalNum;
  	private String splitFlag;
	private String userName;
  	
  	private String hsAddDistrict;
  	private String hsAddCity;
  	private String hsAddProvince;
  	private String hsAddCommunity;
  	private String hsAddBuilding;
  	private String hsAddDoorplateno;
  	private String hsDailyRent;
  	private String hsHotDailyRent;
  	private String hsRoomType;
  	private String hsLeaseState;
  	private Integer hsLeaseType;
  	
  	private String renterName;
  	private String suStaffName;
  	
  	private Integer laoHsId;
  	
  	private Double jsrcAmountPayable;			     //应付金额
	private String jsrcPaymentMethod;			    //付款方式
	private String jsrcRemarks;		 			   //备注
	private String jsrcActualOccupancyTime;		  //实际入住时间
	private String jsrcActualDepartureTime;		 //实际搬离时间
	private String jsrcAdditionalDescription;	//附加描述
  	private Double jsrcAdditionalCost;		   //附加费用总金额
  	private String jsrcTypeOccupancy;		  //入住类型
  	private Double jsrcArrears;				 //欠费金额
  	
  	private String handle;					 //批量保留订单
	
	private String jsonArray;
    
    private String wxpayBody;
    
    private String authCode;
    
    private String addTaskObj;

    private Integer jsrrId;
    private String jsrrCustomerType;
    private Integer jsrrPopId;
    
    private Double totalPrice;
    private Double refundPrice;
    
    private InfoPopulation infoPopulation;
    
    private String contractState;

	private String jarStartTime;
	private String jarEndTime;
	private String coId;

	private String doorCardJson;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public String toString() {
		return "JourShortRentContract{" +
				"jsrcId=" + jsrcId +
				", jsrcHsId=" + jsrcHsId +
				", jsrcRenterId=" + jsrcRenterId +
				", jsrcUserId=" + jsrcUserId +
				", jsrcCustomerId=" + jsrcCustomerId +
				", jsrcTotalDays=" + jsrcTotalDays +
				", jsrcDailyPrice=" + jsrcDailyPrice +
				", jsrcPartnerId='" + jsrcPartnerId + '\'' +
				", hsAddFloor='" + hsAddFloor + '\'' +
				", jsrcOrderNum='" + jsrcOrderNum + '\'' +
				", jsrcRefundNum='" + jsrcRefundNum + '\'' +
				", jsrcTotalPrice=" + jsrcTotalPrice +
				", jsrcDeposit=" + jsrcDeposit +
				", jsrcBeginTime='" + jsrcBeginTime + '\'' +
				", jsrcEndTime='" + jsrcEndTime + '\'' +
				", jsrcPeople='" + jsrcPeople + '\'' +
				", jsrcState='" + jsrcState + '\'' +
				", jsrcFollow='" + jsrcFollow + '\'' +
				", jsrcRegistrationTime='" + jsrcRegistrationTime + '\'' +
				", jsrcOrderSource='" + jsrcOrderSource + '\'' +
				", jsrcDepositPayType=" + jsrcDepositPayType +
				", jsrcFirstPay=" + jsrcFirstPay +
				", jsrcRoomChargePercent=" + jsrcRoomChargePercent +
				", jsrcOrderState=" + jsrcOrderState +
				", hsIdList=" + hsIdList +
				", hsIdListStr='" + hsIdListStr + '\'' +
				", departmentId=" + departmentId +
				", storeId=" + storeId +
				", rentJson='" + rentJson + '\'' +
				", popJson='" + popJson + '\'' +
				", type=" + type +
				", lockId=" + lockId +
				", cardFollow='" + cardFollow + '\'' +
				", cardId='" + cardId + '\'' +
				", idcard='" + idcard + '\'' +
				", cardNum='" + cardNum + '\'' +
				", jsrcSaleNo='" + jsrcSaleNo + '\'' +
				", startNum='" + startNum + '\'' +
				", endNum='" + endNum + '\'' +
				", totalNum='" + totalNum + '\'' +
				", splitFlag='" + splitFlag + '\'' +
				", userName='" + userName + '\'' +
				", hsAddDistrict='" + hsAddDistrict + '\'' +
				", hsAddCity='" + hsAddCity + '\'' +
				", hsAddProvince='" + hsAddProvince + '\'' +
				", hsAddCommunity='" + hsAddCommunity + '\'' +
				", hsAddBuilding='" + hsAddBuilding + '\'' +
				", hsAddDoorplateno='" + hsAddDoorplateno + '\'' +
				", hsDailyRent='" + hsDailyRent + '\'' +
				", hsHotDailyRent='" + hsHotDailyRent + '\'' +
				", hsRoomType='" + hsRoomType + '\'' +
				", hsLeaseState='" + hsLeaseState + '\'' +
				", hsLeaseType=" + hsLeaseType +
				", renterName='" + renterName + '\'' +
				", suStaffName='" + suStaffName + '\'' +
				", laoHsId=" + laoHsId +
				", jsrcAmountPayable=" + jsrcAmountPayable +
				", jsrcPaymentMethod='" + jsrcPaymentMethod + '\'' +
				", jsrcRemarks='" + jsrcRemarks + '\'' +
				", jsrcActualOccupancyTime='" + jsrcActualOccupancyTime + '\'' +
				", jsrcActualDepartureTime='" + jsrcActualDepartureTime + '\'' +
				", jsrcAdditionalDescription='" + jsrcAdditionalDescription + '\'' +
				", jsrcAdditionalCost=" + jsrcAdditionalCost +
				", jsrcTypeOccupancy='" + jsrcTypeOccupancy + '\'' +
				", jsrcArrears=" + jsrcArrears +
				", handle='" + handle + '\'' +
				", jsonArray='" + jsonArray + '\'' +
				", wxpayBody='" + wxpayBody + '\'' +
				", authCode='" + authCode + '\'' +
				", addTaskObj='" + addTaskObj + '\'' +
				", jsrrId=" + jsrrId +
				", jsrrCustomerType='" + jsrrCustomerType + '\'' +
				", jsrrPopId=" + jsrrPopId +
				", totalPrice=" + totalPrice +
				", refundPrice=" + refundPrice +
				", infoPopulation=" + infoPopulation +
				", contractState='" + contractState + '\'' +
				", jarStartTime='" + jarStartTime + '\'' +
				", jarEndTime='" + jarEndTime + '\'' +
				", coId='" + coId + '\'' +
				", doorCardJson='" + doorCardJson + '\'' +
				'}';
	}

	public String getCoId() {
		return coId;
	}

	public void setCoId(String coId) {
		this.coId = coId;
	}
	public String getDoorCardJson() {
		return doorCardJson;
	}

	public void setDoorCardJson(String doorCardJson) {
		this.doorCardJson = doorCardJson;
	}

	public String getHsLeaseState() {
		return hsLeaseState;
	}

	public void setHsLeaseState(String hsLeaseState) {
		this.hsLeaseState = hsLeaseState;
	}

	public Integer getHsLeaseType() {
		return hsLeaseType;
	}

	public void setHsLeaseType(Integer hsLeaseType) {
		this.hsLeaseType = hsLeaseType;
	}

	public String getJarStartTime() {
		return jarStartTime;
	}

	public void setJarStartTime(String jarStartTime) {
		this.jarStartTime = jarStartTime;
	}

	public String getJarEndTime() {
		return jarEndTime;
	}

	public void setJarEndTime(String jarEndTime) {
		this.jarEndTime = jarEndTime;
	}

	public String getHsAddDistrict() {
		return hsAddDistrict;
	}

	public void setHsAddDistrict(String hsAddDistrict) {
		this.hsAddDistrict = hsAddDistrict;
	}

	public String getHsAddCity() {
		return hsAddCity;
	}

	public void setHsAddCity(String hsAddCity) {
		this.hsAddCity = hsAddCity;
	}

	public String getHsAddProvince() {
		return hsAddProvince;
	}

	public void setHsAddProvince(String hsAddProvince) {
		this.hsAddProvince = hsAddProvince;
	}
	
	public Integer getJsrcOrderState() {
		return jsrcOrderState;
	}

	public void setJsrcOrderState(Integer jsrcOrderState) {
		this.jsrcOrderState = jsrcOrderState;
	}

	public Integer getJsrcDepositPayType() {
		return jsrcDepositPayType;
	}

	public void setJsrcDepositPayType(Integer jsrcDepositPayType) {
		this.jsrcDepositPayType = jsrcDepositPayType;
	}

	public Double getJsrcFirstPay() {
		return jsrcFirstPay;
	}

	public void setJsrcFirstPay(Double jsrcFirstPay) {
		this.jsrcFirstPay = jsrcFirstPay;
	}

	public Integer getJsrcRoomChargePercent() {
		return jsrcRoomChargePercent;
	}

	public void setJsrcRoomChargePercent(Integer jsrcRoomChargePercent) {
		this.jsrcRoomChargePercent = jsrcRoomChargePercent;
	}

	public String getHsIdListStr() {
		return hsIdListStr;
	}

	public void setHsIdListStr(String hsIdListStr) {
		this.hsIdListStr = hsIdListStr;
	}

	public String getContractState() {
		return contractState;
	}

	public void setContractState(String contractState) {
		this.contractState = contractState;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getWxpayBody() {
		return wxpayBody;
	}

	public void setWxpayBody(String wxpayBody) {
		this.wxpayBody = wxpayBody;
	}

	public String getAuthCode() {
		return authCode;
	}

	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}

	public String getJsonArray() {
		return jsonArray;
	}

	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}

	public Integer getJsrcCustomerId() {
		return jsrcCustomerId;
	}

	public void setJsrcCustomerId(Integer jsrcCustomerId) {
		this.jsrcCustomerId = jsrcCustomerId;
	}

	public String getJsrcOrderSource() {
		return jsrcOrderSource;
	}

	public void setJsrcOrderSource(String jsrcOrderSource) {
		this.jsrcOrderSource = jsrcOrderSource;
	}

	public Integer getLaoHsId() {
		return laoHsId;
	}

	public void setLaoHsId(Integer laoHsId) {
		this.laoHsId = laoHsId;
	}

	public String getSuStaffName() {
		return suStaffName;
	}

	public void setSuStaffName(String suStaffName) {
		this.suStaffName = suStaffName;
	}

	public String getRenterName() {
		return renterName;
	}

	public void setRenterName(String renterName) {
		this.renterName = renterName;
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

	public String getHsDailyRent() {
		return hsDailyRent;
	}

	public void setHsDailyRent(String hsDailyRent) {
		this.hsDailyRent = hsDailyRent;
	}

	public String getHsHotDailyRent() {
		return hsHotDailyRent;
	}

	public void setHsHotDailyRent(String hsHotDailyRent) {
		this.hsHotDailyRent = hsHotDailyRent;
	}

	public String getHsRoomType() {
		return hsRoomType;
	}

	public void setHsRoomType(String hsRoomType) {
		this.hsRoomType = hsRoomType;
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

	public String getSplitFlag() {
		return splitFlag;
	}

	public void setSplitFlag(String splitFlag) {
		this.splitFlag = splitFlag;
	}

	public String getCardNum() {
		return cardNum;
	}

	public void setCardNum(String cardNum) {
		this.cardNum = cardNum;
	}

	public String getIdcard() {
		return idcard;
	}

	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}

	public String getCardId() {
		return cardId;
	}

	public void setCardId(String cardId) {
		this.cardId = cardId;
	}

	public Integer getLockId() {
		return lockId;
	}

	public void setLockId(Integer lockId) {
		this.lockId = lockId;
	}

	public String getCardFollow() {
		return cardFollow;
	}

	public void setCardFollow(String cardFollow) {
		this.cardFollow = cardFollow;
	}

	public String getJsrcRefundNum() {
		return jsrcRefundNum;
	}

	public void setJsrcRefundNum(String jsrcRefundNum) {
		this.jsrcRefundNum = jsrcRefundNum;
	}

	public String getJsrcOrderNum() {
		return jsrcOrderNum;
	}

	public void setJsrcOrderNum(String jsrcOrderNum) {
		this.jsrcOrderNum = jsrcOrderNum;
	}

	public String getJsrcPeople() {
		return jsrcPeople;
	}

	public void setJsrcPeople(String jsrcPeople) {
		this.jsrcPeople = jsrcPeople;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getPopJson() {
		return popJson;
	}

	public void setPopJson(String popJson) {
		this.popJson = popJson;
	}

	public String getJsrcPartnerId() {
		return jsrcPartnerId;
	}

	public void setJsrcPartnerId(String jsrcPartnerId) {
		this.jsrcPartnerId = jsrcPartnerId;
	}

	public String getJsrcFollow() {
		return jsrcFollow;
	}

	public void setJsrcFollow(String jsrcFollow) {
		this.jsrcFollow = jsrcFollow;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public Integer getStoreId() {
		return storeId;
	}

	public void setStoreId(Integer storeId) {
		this.storeId = storeId;
	}

	public String getRentJson() {
		return rentJson;
	}

	public void setRentJson(String rentJson) {
		this.rentJson = rentJson;
	}
	
	public List<Integer> getHsIdList() {
		return hsIdList;
	}

	public void setHsIdList(List<Integer> hsIdList) {
		this.hsIdList = hsIdList;
	}

	public Integer getJsrcId() {
        return jsrcId;
    }

    public void setJsrcId(Integer jsrcId) {
        this.jsrcId = jsrcId;
    }

    public Integer getJsrcHsId() {
        return jsrcHsId;
    }

    public void setJsrcHsId(Integer jsrcHsId) {
        this.jsrcHsId = jsrcHsId;
    }

    public Integer getJsrcRenterId() {
        return jsrcRenterId;
    }

    public void setJsrcRenterId(Integer jsrcRenterId) {
        this.jsrcRenterId = jsrcRenterId;
    }

    public Integer getJsrcUserId() {
        return jsrcUserId;
    }

    public void setJsrcUserId(Integer jsrcUserId) {
        this.jsrcUserId = jsrcUserId;
    }

    public Integer getJsrcTotalDays() {
        return jsrcTotalDays;
    }

    public void setJsrcTotalDays(Integer jsrcTotalDays) {
        this.jsrcTotalDays = jsrcTotalDays;
    }

    public Double getJsrcDailyPrice() {
        return jsrcDailyPrice;
    }

    public void setJsrcDailyPrice(Double jsrcDailyPrice) {
        this.jsrcDailyPrice = jsrcDailyPrice;
    }

    public Double getJsrcTotalPrice() {
        return jsrcTotalPrice;
    }

    public void setJsrcTotalPrice(Double jsrcTotalPrice) {
        this.jsrcTotalPrice = jsrcTotalPrice;
    }

    public Double getJsrcDeposit() {
        return jsrcDeposit;
    }

    public void setJsrcDeposit(Double jsrcDeposit) {
        this.jsrcDeposit = jsrcDeposit;
    }

    public String getJsrcBeginTime() {
        return jsrcBeginTime;
    }

    public void setJsrcBeginTime(String jsrcBeginTime) {
        this.jsrcBeginTime = jsrcBeginTime == null ? null : jsrcBeginTime.trim();
    }

    public String getJsrcEndTime() {
        return jsrcEndTime;
    }

    public void setJsrcEndTime(String jsrcEndTime) {
        this.jsrcEndTime = jsrcEndTime == null ? null : jsrcEndTime.trim();
    }

    public String getJsrcState() {
        return jsrcState;
    }

    public void setJsrcState(String jsrcState) {
        this.jsrcState = jsrcState == null ? null : jsrcState.trim();
    }

    public String getJsrcRegistrationTime() {
        return jsrcRegistrationTime;
    }

    public void setJsrcRegistrationTime(String jsrcRegistrationTime) {
        this.jsrcRegistrationTime = jsrcRegistrationTime == null ? null : jsrcRegistrationTime.trim();
    }
    
	public Double getJsrcAmountPayable() {
		return jsrcAmountPayable;
	}

	public void setJsrcAmountPayable(Double jsrcAmountPayable) {
		this.jsrcAmountPayable = jsrcAmountPayable;
	}

	public String getJsrcPaymentMethod() {
		return jsrcPaymentMethod;
	}

	public void setJsrcPaymentMethod(String jsrcPaymentMethod) {
		this.jsrcPaymentMethod = jsrcPaymentMethod;
	}

	public String getJsrcRemarks() {
		return jsrcRemarks;
	}

	public void setJsrcRemarks(String jsrcRemarks) {
		this.jsrcRemarks = jsrcRemarks;
	}
	

	public String getJsrcActualOccupancyTime() {
		return jsrcActualOccupancyTime;
	}

	public void setJsrcActualOccupancyTime(String jsrcActualOccupancyTime) {
		this.jsrcActualOccupancyTime = jsrcActualOccupancyTime;
	}

	public String getJsrcActualDepartureTime() {
		return jsrcActualDepartureTime;
	}

	public void setJsrcActualDepartureTime(String jsrcActualDepartureTime) {
		this.jsrcActualDepartureTime = jsrcActualDepartureTime;
	}
	

	public String getJsrcAdditionalDescription() {
		return jsrcAdditionalDescription;
	}

	public void setJsrcAdditionalDescription(String jsrcAdditionalDescription) {
		this.jsrcAdditionalDescription = jsrcAdditionalDescription;
	}

	public Double getJsrcAdditionalCost() {
		return jsrcAdditionalCost;
	}

	public void setJsrcAdditionalCost(Double jsrcAdditionalCost) {
		this.jsrcAdditionalCost = jsrcAdditionalCost;
	}
	
	public String getJsrcTypeOccupancy() {
		return jsrcTypeOccupancy;
	}

	public void setJsrcTypeOccupancy(String jsrcTypeOccupancy) {
		this.jsrcTypeOccupancy = jsrcTypeOccupancy;
	}
	
	public Double getJsrcArrears() {
		return jsrcArrears;
	}

	public void setJsrcArrears(Double jsrcArrears) {
		this.jsrcArrears = jsrcArrears;
	}

	public String getHandle() {
		return handle;
	}

	public void setHandle(String handle) {
		this.handle = handle;
	}

	public String getJsrrCustomerType() {
		return jsrrCustomerType;
	}

	public void setJsrrCustomerType(String jsrrCustomerType) {
		this.jsrrCustomerType = jsrrCustomerType;
	}

	public String getAddTaskObj() {
		return addTaskObj;
	}

	public void setAddTaskObj(String addTaskObj) {
		this.addTaskObj = addTaskObj;
	}

	public Integer getJsrrId() {
		return jsrrId;
	}

	public void setJsrrId(Integer jsrrId) {
		this.jsrrId = jsrrId;
	}

	public Integer getJsrrPopId() {
		return jsrrPopId;
	}

	public void setJsrrPopId(Integer jsrrPopId) {
		this.jsrrPopId = jsrrPopId;
	}

	public InfoPopulation getInfoPopulation() {
		return infoPopulation;
	}

	public void setInfoPopulation(InfoPopulation infoPopulation) {
		this.infoPopulation = infoPopulation;
	}

	public Double getRefundPrice() {
		return refundPrice;
	}

	public void setRefundPrice(Double refundPrice) {
		this.refundPrice = refundPrice;
	}

	public String getJsrcSaleNo() {
		return jsrcSaleNo;
	}

	public void setJsrcSaleNo(String jsrcSaleNo) {
		this.jsrcSaleNo = jsrcSaleNo;
	}

	public String getHsAddFloor() {
		return hsAddFloor;
	}

	public void setHsAddFloor(String hsAddFloor) {
		this.hsAddFloor = hsAddFloor;
	}
    
    
}