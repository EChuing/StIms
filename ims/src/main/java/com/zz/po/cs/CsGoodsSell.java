package com.zz.po.cs;

public class CsGoodsSell {
    private Integer id;

    private Integer cgsOrderId;
    
    private Integer cgsGoodsId;

    private String cgsCategory;

    private Integer cgsOperatorId;

    private String cgsGoodsName;

    private Integer cgsSellNum;

    private Integer cgsRemainingNum;

    private Double cgsOriginalPrice;

    private Double cgsCurrentPrice;

    private Double cgsCostPrice;

    private Integer cgsPreferential;

    private Integer cgsSellWell;

    private String cgsRegistrationTime;
    
    private String startNum;
   	private String endNum;
   	private String totalNum;
   	private String splitFlag;
    
    private String suStaffName;
    
    private String startTime;
    private String endTime;
    
    private Integer type;
    
    private Integer sellNum;
    
    private Double bili;
    
    private Double goodsProfit;
    
    private String cgSn;
    
    private String cgsGoodsSn;
    private String cgbState;


	public String getCgbState() {
		return cgbState;
	}

	public void setCgbState(String cgbState) {
		this.cgbState = cgbState;
	}

	public String getCgsGoodsSn() {
		return cgsGoodsSn;
	}

	public void setCgsGoodsSn(String cgsGoodsSn) {
		this.cgsGoodsSn = cgsGoodsSn;
	}

	public String getCgSn() {
		return cgSn;
	}

	public void setCgSn(String cgSn) {
		this.cgSn = cgSn;
	}

	public Double getGoodsProfit() {
		return goodsProfit;
	}

	public void setGoodsProfit(Double goodsProfit) {
		this.goodsProfit = goodsProfit;
	}

	public Double getBili() {
		return bili;
	}

	public void setBili(Double bili) {
		this.bili = bili;
	}

	public Integer getSellNum() {
		return sellNum;
	}

	public void setSellNum(Integer sellNum) {
		this.sellNum = sellNum;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
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

	public Integer getCgsGoodsId() {
		return cgsGoodsId;
	}

	public void setCgsGoodsId(Integer cgsGoodsId) {
		this.cgsGoodsId = cgsGoodsId;
	}

	public String getSuStaffName() {
		return suStaffName;
	}

	public void setSuStaffName(String suStaffName) {
		this.suStaffName = suStaffName;
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

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCgsOrderId() {
        return cgsOrderId;
    }

    public void setCgsOrderId(Integer cgsOrderId) {
        this.cgsOrderId = cgsOrderId;
    }
    
    public String getCgsCategory() {
		return cgsCategory;
	}

	public void setCgsCategory(String cgsCategory) {
		this.cgsCategory = cgsCategory;
	}

	public Integer getCgsOperatorId() {
        return cgsOperatorId;
    }

    public void setCgsOperatorId(Integer cgsOperatorId) {
        this.cgsOperatorId = cgsOperatorId;
    }

    
    public String getCgsGoodsName() {
		return cgsGoodsName;
	}

	public void setCgsGoodsName(String cgsGoodsName) {
		this.cgsGoodsName = cgsGoodsName;
	}

	public Integer getCgsRemainingNum() {
		return cgsRemainingNum;
	}

	public void setCgsRemainingNum(Integer cgsRemainingNum) {
		this.cgsRemainingNum = cgsRemainingNum;
	}


	public Integer getCgsSellNum() {
        return cgsSellNum;
    }

    public void setCgsSellNum(Integer cgsSellNum) {
        this.cgsSellNum = cgsSellNum;
    }

    public Integer getCgsRemainincgNum() {
        return cgsRemainingNum;
    }

    public Double getCgsCurrentPrice() {
        return cgsCurrentPrice;
    }

    public void setCgsCurrentPrice(Double cgsCurrentPrice) {
        this.cgsCurrentPrice = cgsCurrentPrice;
    }

    public Double getCgsCostPrice() {
        return cgsCostPrice;
    }

    public void setCgsCostPrice(Double cgsCostPrice) {
        this.cgsCostPrice = cgsCostPrice;
    }

    public Integer getCgsPreferential() {
        return cgsPreferential;
    }

    public void setCgsPreferential(Integer cgsPreferential) {
        this.cgsPreferential = cgsPreferential;
    }

    public Integer getCgsSellWell() {
        return cgsSellWell;
    }

    public void setCgsSellWell(Integer cgsSellWell) {
        this.cgsSellWell = cgsSellWell;
    }

	public Double getCgsOriginalPrice() {
		return cgsOriginalPrice;
	}

	public void setCgsOriginalPrice(Double cgsOriginalPrice) {
		this.cgsOriginalPrice = cgsOriginalPrice;
	}

	public String getCgsRegistrationTime() {
		return cgsRegistrationTime;
	}

	public void setCgsRegistrationTime(String cgsRegistrationTime) {
		this.cgsRegistrationTime = cgsRegistrationTime;
	}

	@Override
	public String toString() {
		return "CsGoodsSell{" +
				"id=" + id +
				", cgsOrderId=" + cgsOrderId +
				", cgsGoodsId=" + cgsGoodsId +
				", cgsCategory='" + cgsCategory + '\'' +
				", cgsOperatorId=" + cgsOperatorId +
				", cgsGoodsName='" + cgsGoodsName + '\'' +
				", cgsSellNum=" + cgsSellNum +
				", cgsRemainingNum=" + cgsRemainingNum +
				", cgsOriginalPrice=" + cgsOriginalPrice +
				", cgsCurrentPrice=" + cgsCurrentPrice +
				", cgsCostPrice=" + cgsCostPrice +
				", cgsPreferential=" + cgsPreferential +
				", cgsSellWell=" + cgsSellWell +
				", cgsRegistrationTime='" + cgsRegistrationTime + '\'' +
				", startNum='" + startNum + '\'' +
				", endNum='" + endNum + '\'' +
				", totalNum='" + totalNum + '\'' +
				", splitFlag='" + splitFlag + '\'' +
				", suStaffName='" + suStaffName + '\'' +
				", startTime='" + startTime + '\'' +
				", endTime='" + endTime + '\'' +
				", type=" + type +
				", sellNum=" + sellNum +
				", bili=" + bili +
				", goodsProfit=" + goodsProfit +
				", cgSn='" + cgSn + '\'' +
				", cgsGoodsSn='" + cgsGoodsSn + '\'' +
				", cgbState='" + cgbState + '\'' +
				'}';
	}
}