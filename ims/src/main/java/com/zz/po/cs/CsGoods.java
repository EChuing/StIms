package com.zz.po.cs;

import java.util.HashMap;
import java.util.List;

public class CsGoods {
    private Integer id;

    private Integer cgCategoryId;

    private String cgName;

    private Integer cgNum;

    private Double cgCurrentPrice;

    private Double cgOriginalPrice;

    private Double cgCostPrice;

    private String cgImgPath;
    
    private String cgImgNum;

    private String cgParameter;
    
    private String cgCode;
    
    private Integer cgState;

    private Integer cgPreferential;

    private Integer cgSellWell;

    private String cgRegistrationTime;
    
    private Integer cgDeleteState;
    
    private String cgIntroduce;
    
    private String startNum;
	private String endNum;
	private String totalNum;
	private String splitFlag;
	
	private String att;
	
	private Integer cgcId;

    private String cgcCategoryName;

    private Integer cgcNum;

    private String cgcRegistrationTime;
    
    private Integer oldCgCategoryId;
    
    private Integer oldCgcNum;
    
    private Integer type;
    
    private Integer num;
    
    private Integer cgSn;
    
    private Integer cgsId;

    private Double newCgCostPrice;
    
    private String purchaseGoodsJson;
    
    private String cgdrSn;
    
    public Integer getCgsId() {
		return cgsId;
	}

	public void setCgsId(Integer cgsId) {
		this.cgsId = cgsId;
	}

	public String getCgdrSn() {
		return cgdrSn;
	}

	public void setCgdrSn(String cgdrSn) {
		this.cgdrSn = cgdrSn;
	}

	private List<HashMap<String,String>> sn;
    

	public Integer getCgSn() {
		return cgSn;
	}

	public void setCgSn(Integer cgSn) {
		this.cgSn = cgSn;
	}

	public List<HashMap<String, String>> getSn() {
		return sn;
	}

	public void setSn(List<HashMap<String, String>> sn) {
		this.sn = sn;
	}

	public String getCgIntroduce() {
		return cgIntroduce;
	}

	public void setCgIntroduce(String cgIntroduce) {
		this.cgIntroduce = cgIntroduce;
	}

	//用来传输与这个类不相关的属性
    private String jsonString;

	public Double getNewCgCostPrice() {
		return newCgCostPrice;
	}

	public void setNewCgCostPrice(Double newCgCostPrice) {
		this.newCgCostPrice = newCgCostPrice;
	}

	public String getJsonString() {
		return jsonString;
	}

	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}

	public String getPurchaseGoodsJson() {
		return purchaseGoodsJson;
	}

	public void setPurchaseGoodsJson(String purchaseGoodsJson) {
		this.purchaseGoodsJson = purchaseGoodsJson;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getOldCgcNum() {
		return oldCgcNum;
	}

	public void setOldCgcNum(Integer oldCgcNum) {
		this.oldCgcNum = oldCgcNum;
	}

	public Integer getOldCgCategoryId() {
		return oldCgCategoryId;
	}

	public void setOldCgCategoryId(Integer oldCgCategoryId) {
		this.oldCgCategoryId = oldCgCategoryId;
	}

	public Integer getCgDeleteState() {
		return cgDeleteState;
	}

	public void setCgDeleteState(Integer cgDeleteState) {
		this.cgDeleteState = cgDeleteState;
	}

	public Integer getCgcId() {
		return cgcId;
	}

	public void setCgcId(Integer cgcId) {
		this.cgcId = cgcId;
	}

	public String getCgcCategoryName() {
		return cgcCategoryName;
	}

	public void setCgcCategoryName(String cgcCategoryName) {
		this.cgcCategoryName = cgcCategoryName;
	}

	public Integer getCgcNum() {
		return cgcNum;
	}

	public void setCgcNum(Integer cgcNum) {
		this.cgcNum = cgcNum;
	}

	public String getCgcRegistrationTime() {
		return cgcRegistrationTime;
	}

	public void setCgcRegistrationTime(String cgcRegistrationTime) {
		this.cgcRegistrationTime = cgcRegistrationTime;
	}

	public String getCgCode() {
		return cgCode;
	}

	public void setCgCode(String cgCode) {
		this.cgCode = cgCode;
	}

	public Integer getCgState() {
		return cgState;
	}

	public void setCgState(Integer cgState) {
		this.cgState = cgState;
	}

	public String getCgImgPath() {
		return cgImgPath;
	}

	public void setCgImgPath(String cgImgPath) {
		this.cgImgPath = cgImgPath;
	}

	public String getCgImgNum() {
		return cgImgNum;
	}

	public void setCgImgNum(String cgImgNum) {
		this.cgImgNum = cgImgNum;
	}

	public String getAtt() {
		return att;
	}

	public void setAtt(String att) {
		this.att = att;
	}

	public String getSplitFlag() {
		return splitFlag;
	}

	public void setSplitFlag(String splitFlag) {
		this.splitFlag = splitFlag;
	}

	public String getTotalNum() {
		return totalNum;
	}

	public void setTotalNum(String totalNum) {
		this.totalNum = totalNum;
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

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCgCategoryId() {
        return cgCategoryId;
    }

    public void setCgCategoryId(Integer cgCategoryId) {
        this.cgCategoryId = cgCategoryId;
    }

    public String getCgName() {
        return cgName;
    }

    public void setCgName(String cgName) {
        this.cgName = cgName == null ? null : cgName.trim();
    }

    public Integer getCgNum() {
        return cgNum;
    }

    public void setCgNum(Integer cgNum) {
        this.cgNum = cgNum;
    }

    public Double getCgCurrentPrice() {
        return cgCurrentPrice;
    }

    public void setCgCurrentPrice(Double cgCurrentPrice) {
        this.cgCurrentPrice = cgCurrentPrice;
    }

    public Double getCgOriginalPrice() {
		return cgOriginalPrice;
	}

	public void setCgOriginalPrice(Double cgOriginalPrice) {
		this.cgOriginalPrice = cgOriginalPrice;
	}

	public Double getCgCostPrice() {
        return cgCostPrice;
    }

    public void setCgCostPrice(Double cgCostPrice) {
        this.cgCostPrice = cgCostPrice;
    }

    public String getCgParameter() {
        return cgParameter;
    }

    public void setCgParameter(String cgParameter) {
        this.cgParameter = cgParameter == null ? null : cgParameter.trim();
    }

    public Integer getCgPreferential() {
        return cgPreferential;
    }

    public void setCgPreferential(Integer cgPreferential) {
        this.cgPreferential = cgPreferential;
    }

    public Integer getCgSellWell() {
        return cgSellWell;
    }

    public void setCgSellWell(Integer cgSellWell) {
        this.cgSellWell = cgSellWell;
    }

	public String getCgRegistrationTime() {
		return cgRegistrationTime;
	}

	public void setCgRegistrationTime(String cgRegistrationTime) {
		this.cgRegistrationTime = cgRegistrationTime;
	}


   
}