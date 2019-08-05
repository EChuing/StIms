package com.zz.po.cs;


public class CsGoodsBilling {
    private Integer id;

    private Integer cgbHrId;

    private Integer cgbOperatorId;
    
    private Integer cgbCocId;
    
    private Integer cgbSendId;

    private String cgbOrderNum;
    
    private Double cgbActualSpending;

    private Double cgbTotalSpending;

    private Double cgbShippingFee;
    
    private Double cgbReduceFee;
    
    private String cgbReduceReason;

    private String cgbPayType;
    
    private Integer cgbType;

    private String cgbState;
    
    private String cgbRefundNum;
    
    private String cgbAcceptTime;
    
    private String cgbSendTime;
    
    private String cgbOverTime;

    private String cgbRegistrationTime;
    
    private String cgbRemark;
    
    private String cgbMailName;
    
    private String cgbMailNum;
    
    private String orderGoodsJson;
    
    private Integer type;
    
    private String startNum;
   	private String endNum;
   	private String totalNum;
   	private String splitFlag;
   	
   	private String address;
   	
   	private String authCode;
   	
   	private String goodsBody;
   	
   	private String key;
   	
   	private String mch_id;
   	
   	private String cocAddress;
   	
   	private String cocMailData;
   	
   	private String popTelephone;
   	
   	private String cocPhone;
   	private String cocContacts;
   	private String cocGrade;
   	private String cocCompany;
   	
   	private String startTime;
   	private String endTime;
   	
   	private String cancelOrder;
   	private String onlineOrder;
   	private String unOnlineOrder;
   	private String saleTotalMoney;
   	private String totalProfit;
   	private String saleGoodsTotal;
   	
   	private String cashMoneyTotal;
   	private String otherMoneyTotal;
   	private String moneyTotal;
   	
   	private String goodsRows;
   	private String cgbPaymentStatus;
   	private String cgbPrepayRatio;
   	private String cgbTransportationMethods;

   	private Integer cgsGoodsId;
   	private Integer cgsSellNum;
   	private Integer cgsRemainingNum;
   	private Integer orderId;

   	private Integer num;

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getCgsRemainingNum() {
		return cgsRemainingNum;
	}

	public void setCgsRemainingNum(Integer cgsRemainingNum) {
		this.cgsRemainingNum = cgsRemainingNum;
	}

	private Double total_fee;

	public Double getTotal_fee() {
		return total_fee;
	}

	public void setTotal_fee(Double total_fee) {
		this.total_fee = total_fee;
	}

	public Integer getCgsSellNum() {
		return cgsSellNum;
	}

	public void setCgsSellNum(Integer cgsSellNum) {
		this.cgsSellNum = cgsSellNum;
	}

	public Integer getCgsGoodsId() {
		return cgsGoodsId;
	}

	public void setCgsGoodsId(Integer cgsGoodsId) {
		this.cgsGoodsId = cgsGoodsId;
	}

	public String getCocGrade() {
		return cocGrade;
	}

	public void setCocGrade(String cocGrade) {
		this.cocGrade = cocGrade;
	}

	public String getCocCompany() {
		return cocCompany;
	}

	public void setCocCompany(String cocCompany) {
		this.cocCompany = cocCompany;
	}

	public String getCocContacts() {
		return cocContacts;
	}

	public void setCocContacts(String cocContacts) {
		this.cocContacts = cocContacts;
	}

	public String getCgbTransportationMethods() {
		return cgbTransportationMethods;
	}

	public void setCgbTransportationMethods(String cgbTransportationMethods) {
		this.cgbTransportationMethods = cgbTransportationMethods;
	}

	public String getCgbPaymentStatus() {
		return cgbPaymentStatus;
	}

	public void setCgbPaymentStatus(String cgbPaymentStatus) {
		this.cgbPaymentStatus = cgbPaymentStatus;
	}

	public String getCgbPrepayRatio() {
		return cgbPrepayRatio;
	}

	public void setCgbPrepayRatio(String cgbPrepayRatio) {
		this.cgbPrepayRatio = cgbPrepayRatio;
	}

	public String getGoodsRows() {
		return goodsRows;
	}

	public void setGoodsRows(String goodsRows) {
		this.goodsRows = goodsRows;
	}

	public String getCgbRefundNum() {
		return cgbRefundNum;
	}

	public void setCgbRefundNum(String cgbRefundNum) {
		this.cgbRefundNum = cgbRefundNum;
	}

	public String getMoneyTotal() {
		return moneyTotal;
	}

	public void setMoneyTotal(String moneyTotal) {
		this.moneyTotal = moneyTotal;
	}

	public String getCashMoneyTotal() {
		return cashMoneyTotal;
	}

	public void setCashMoneyTotal(String cashMoneyTotal) {
		this.cashMoneyTotal = cashMoneyTotal;
	}

	public String getOtherMoneyTotal() {
		return otherMoneyTotal;
	}

	public void setOtherMoneyTotal(String otherMoneyTotal) {
		this.otherMoneyTotal = otherMoneyTotal;
	}

	public String getSaleGoodsTotal() {
		return saleGoodsTotal;
	}

	public void setSaleGoodsTotal(String saleGoodsTotal) {
		this.saleGoodsTotal = saleGoodsTotal;
	}

	public String getCancelOrder() {
		return cancelOrder;
	}

	public void setCancelOrder(String cancelOrder) {
		this.cancelOrder = cancelOrder;
	}

	public String getOnlineOrder() {
		return onlineOrder;
	}

	public void setOnlineOrder(String onlineOrder) {
		this.onlineOrder = onlineOrder;
	}

	public String getUnOnlineOrder() {
		return unOnlineOrder;
	}

	public void setUnOnlineOrder(String unOnlineOrder) {
		this.unOnlineOrder = unOnlineOrder;
	}

	public String getSaleTotalMoney() {
		return saleTotalMoney;
	}

	public void setSaleTotalMoney(String saleTotalMoney) {
		this.saleTotalMoney = saleTotalMoney;
	}

	public String getTotalProfit() {
		return totalProfit;
	}

	public void setTotalProfit(String totalProfit) {
		this.totalProfit = totalProfit;
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

	public String getCgbMailName() {
		return cgbMailName;
	}

	public void setCgbMailName(String cgbMailName) {
		this.cgbMailName = cgbMailName;
	}

	public String getCgbMailNum() {
		return cgbMailNum;
	}

	public void setCgbMailNum(String cgbMailNum) {
		this.cgbMailNum = cgbMailNum;
	}

	public String getCocMailData() {
		return cocMailData;
	}

	public void setCocMailData(String cocMailData) {
		this.cocMailData = cocMailData;
	}

	public Integer getCgbType() {
		return cgbType;
	}

	public void setCgbType(Integer cgbType) {
		this.cgbType = cgbType;
	}

	public String getCgbRemark() {
		return cgbRemark;
	}

	public void setCgbRemark(String cgbRemark) {
		this.cgbRemark = cgbRemark;
	}

	public Integer getCgbCocId() {
		return cgbCocId;
	}

	public void setCgbCocId(Integer cgbCocId) {
		this.cgbCocId = cgbCocId;
	}

	public String getPopTelephone() {
		return popTelephone;
	}

	public void setPopTelephone(String popTelephone) {
		this.popTelephone = popTelephone;
	}

	public String getCocPhone() {
		return cocPhone;
	}

	public void setCocPhone(String cocPhone) {
		this.cocPhone = cocPhone;
	}

	public String getCocAddress() {
		return cocAddress;
	}

	public void setCocAddress(String cocAddress) {
		this.cocAddress = cocAddress;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getMch_id() {
		return mch_id;
	}

	public void setMch_id(String mch_id) {
		this.mch_id = mch_id;
	}

	public String getGoodsBody() {
		return goodsBody;
	}

	public void setGoodsBody(String goodsBody) {
		this.goodsBody = goodsBody;
	}

	public String getAuthCode() {
		return authCode;
	}

	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getOrderGoodsJson() {
		return orderGoodsJson;
	}

	public void setOrderGoodsJson(String orderGoodsJson) {
		this.orderGoodsJson = orderGoodsJson;
	}

	public Integer getCgbSendId() {
		return cgbSendId;
	}

	public void setCgbSendId(Integer cgbSendId) {
		this.cgbSendId = cgbSendId;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getCgbAcceptTime() {
		return cgbAcceptTime;
	}

	public void setCgbAcceptTime(String cgbAcceptTime) {
		this.cgbAcceptTime = cgbAcceptTime;
	}

	public String getCgbSendTime() {
		return cgbSendTime;
	}

	public void setCgbSendTime(String cgbSendTime) {
		this.cgbSendTime = cgbSendTime;
	}

	public String getCgbOverTime() {
		return cgbOverTime;
	}

	public void setCgbOverTime(String cgbOverTime) {
		this.cgbOverTime = cgbOverTime;
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

	public Double getCgbActualSpending() {
		return cgbActualSpending;
	}

	public void setCgbActualSpending(Double cgbActualSpending) {
		this.cgbActualSpending = cgbActualSpending;
	}

	public Double getCgbReduceFee() {
		return cgbReduceFee;
	}

	public void setCgbReduceFee(Double cgbReduceFee) {
		this.cgbReduceFee = cgbReduceFee;
	}

	public String getCgbReduceReason() {
		return cgbReduceReason;
	}

	public void setCgbReduceReason(String cgbReduceReason) {
		this.cgbReduceReason = cgbReduceReason;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getCgbOrderNum() {
		return cgbOrderNum;
	}

	public Integer getCgbHrId() {
        return cgbHrId;
    }

    public void setCgbHrId(Integer cgbHrId) {
        this.cgbHrId = cgbHrId;
    }

    public Integer getCgbOperatorId() {
        return cgbOperatorId;
    }

    public void setCgbOperatorId(Integer cgbOperatorId) {
        this.cgbOperatorId = cgbOperatorId;
    }
    
    public void setCgbOrderNum(String cgbOrderNum) {
		this.cgbOrderNum = cgbOrderNum;
	}

	public Double getCgbTotalSpending() {
        return cgbTotalSpending;
    }

    public void setCgbTotalSpending(Double cgbTotalSpending) {
        this.cgbTotalSpending = cgbTotalSpending;
    }

    public Double getCgbShippingFee() {
        return cgbShippingFee;
    }

    public void setCgbShippingFee(Double cgbShippingFee) {
        this.cgbShippingFee = cgbShippingFee;
    }

    public String getCgbPayType() {
        return cgbPayType;
    }

    public void setCgbPayType(String cgbPayType) {
        this.cgbPayType = cgbPayType == null ? null : cgbPayType.trim();
    }

    public String getCgbState() {
        return cgbState;
    }

    public void setCgbState(String cgbState) {
        this.cgbState = cgbState == null ? null : cgbState.trim();
    }

	public String getCgbRegistrationTime() {
		return cgbRegistrationTime;
	}

	public void setCgbRegistrationTime(String cgbRegistrationTime) {
		this.cgbRegistrationTime = cgbRegistrationTime;
	}

	@Override
	public String toString() {
		return "CsGoodsBilling{" +
				"id=" + id +
				", cgbHrId=" + cgbHrId +
				", cgbOperatorId=" + cgbOperatorId +
				", cgbCocId=" + cgbCocId +
				", cgbSendId=" + cgbSendId +
				", cgbOrderNum='" + cgbOrderNum + '\'' +
				", cgbActualSpending=" + cgbActualSpending +
				", cgbTotalSpending=" + cgbTotalSpending +
				", cgbShippingFee=" + cgbShippingFee +
				", cgbReduceFee=" + cgbReduceFee +
				", cgbReduceReason='" + cgbReduceReason + '\'' +
				", cgbPayType='" + cgbPayType + '\'' +
				", cgbType=" + cgbType +
				", cgbState='" + cgbState + '\'' +
				", cgbRefundNum='" + cgbRefundNum + '\'' +
				", cgbAcceptTime='" + cgbAcceptTime + '\'' +
				", cgbSendTime='" + cgbSendTime + '\'' +
				", cgbOverTime='" + cgbOverTime + '\'' +
				", cgbRegistrationTime='" + cgbRegistrationTime + '\'' +
				", cgbRemark='" + cgbRemark + '\'' +
				", cgbMailName='" + cgbMailName + '\'' +
				", cgbMailNum='" + cgbMailNum + '\'' +
				", orderGoodsJson='" + orderGoodsJson + '\'' +
				", type=" + type +
				", startNum='" + startNum + '\'' +
				", endNum='" + endNum + '\'' +
				", totalNum='" + totalNum + '\'' +
				", splitFlag='" + splitFlag + '\'' +
				", address='" + address + '\'' +
				", authCode='" + authCode + '\'' +
				", goodsBody='" + goodsBody + '\'' +
				", key='" + key + '\'' +
				", mch_id='" + mch_id + '\'' +
				", cocAddress='" + cocAddress + '\'' +
				", cocMailData='" + cocMailData + '\'' +
				", popTelephone='" + popTelephone + '\'' +
				", cocPhone='" + cocPhone + '\'' +
				", cocContacts='" + cocContacts + '\'' +
				", cocGrade='" + cocGrade + '\'' +
				", cocCompany='" + cocCompany + '\'' +
				", startTime='" + startTime + '\'' +
				", endTime='" + endTime + '\'' +
				", cancelOrder='" + cancelOrder + '\'' +
				", onlineOrder='" + onlineOrder + '\'' +
				", unOnlineOrder='" + unOnlineOrder + '\'' +
				", saleTotalMoney='" + saleTotalMoney + '\'' +
				", totalProfit='" + totalProfit + '\'' +
				", saleGoodsTotal='" + saleGoodsTotal + '\'' +
				", cashMoneyTotal='" + cashMoneyTotal + '\'' +
				", otherMoneyTotal='" + otherMoneyTotal + '\'' +
				", moneyTotal='" + moneyTotal + '\'' +
				", goodsRows='" + goodsRows + '\'' +
				", cgbPaymentStatus='" + cgbPaymentStatus + '\'' +
				", cgbPrepayRatio='" + cgbPrepayRatio + '\'' +
				", cgbTransportationMethods='" + cgbTransportationMethods + '\'' +
				", cgsGoodsId=" + cgsGoodsId +
				", cgsSellNum=" + cgsSellNum +
				", cgsRemainingNum=" + cgsRemainingNum +
				", orderId=" + orderId +
				", num=" + num +
				", total_fee=" + total_fee +
				'}';
	}

}