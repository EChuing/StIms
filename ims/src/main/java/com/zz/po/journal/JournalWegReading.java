package com.zz.po.journal;

import com.zz.po.commons.CommonsPo;

/**
 * 水电气抄表
 */
public class JournalWegReading extends CommonsPo{
    private Integer wegrdId;

    private Integer wegrdRenterId;

    private Integer wegrdHouse4rentId;

    private Integer wegrdHouse4storeId;

    private Integer wegrdHouseId;

    private Integer wegrdUserId;

    private Integer wegrdDoUserId;

    private Integer wegrdDepartment;

    private Integer wegrdStorefront;

    private Integer wegrdCostWays;

    private String wegrdType;

    private Double wegrdNums;

    private String wegrdMonth;

    private String wegrdNature;

    private String wegrdRegisterTime;
    
    private String startNum;
    
	private String endNum;
	
	private String totalNum;
	
	private String addDistrict;
	private String addCommunity;
	private String addZone;
	private String addBuilding;
	private String addDoorplateno;
	
	private Double waterReading;
	private Double electricReading;
	private Double gasReading;
	
	private Double hotwaterReading;
	private Double hotairReading;
	//
	private String registerPeople;
	private String dealPeople;
	private String wegJson;
	
	private Double lastWater;
	private Double thisWater;
	private Double lastEle;
	private Double thisEle;
	private Double lastGas;
	private Double thisGas;
	
	private String  thisMonthFukuanri;
	private String 	lastMonthFukuanri;
	private Integer conditionalType;
	private Double lastHotwater;
	private Double thisHotwater;
	private Double lastHotair;
	private Double thisHotair;
	private int hsId;
	private Integer brandId;
	private String  devAuthId;
	private int[] arr;//计费方案\
	private String arrStr;

	public String getArrStr() {
		return arrStr;
	}

	public void setArrStr(String arrStr) {
		this.arrStr = arrStr;
	}

	public int[] getArr() {
		return arr;
	}

	public void setArr(int[] arr) {
		this.arr = arr;
	}

	public Integer getBrandId() {
		return brandId;
	}

	public void setBrandId(Integer brandId) {
		this.brandId = brandId;
	}

	public String getDevAuthId() {
		return devAuthId;
	}

	public void setDevAuthId(String devAuthId) {
		this.devAuthId = devAuthId;
	}

	public int getHsId() {
		return hsId;
	}

	public void setHsId(int hsId) {
		this.hsId = hsId;
	}

	public Integer getWegrdHouseId() {
		return wegrdHouseId;
	}

	public void setWegrdHouseId(Integer wegrdHouseId) {
		this.wegrdHouseId = wegrdHouseId;
	}

	public Integer getConditionalType() {
		return conditionalType;
	}

	public void setConditionalType(Integer conditionalType) {
		this.conditionalType = conditionalType;
	}

	public String getThisMonthFukuanri() {
		return thisMonthFukuanri;
	}

	public void setThisMonthFukuanri(String thisMonthFukuanri) {
		this.thisMonthFukuanri = thisMonthFukuanri;
	}

	public String getLastMonthFukuanri() {
		return lastMonthFukuanri;
	}

	public void setLastMonthFukuanri(String lastMonthFukuanri) {
		this.lastMonthFukuanri = lastMonthFukuanri;
	}
	
	public Double getHotwaterReading() {
		return hotwaterReading;
	}

	public void setHotwaterReading(Double hotwaterReading) {
		this.hotwaterReading = hotwaterReading;
	}

	public Double getHotairReading() {
		return hotairReading;
	}

	public void setHotairReading(Double hotairReading) {
		this.hotairReading = hotairReading;
	}

	public Double getLastHotwater() {
		return lastHotwater;
	}

	public void setLastHotwater(Double lastHotwater) {
		this.lastHotwater = lastHotwater;
	}

	public Double getThisHotwater() {
		return thisHotwater;
	}

	public void setThisHotwater(Double thisHotwater) {
		this.thisHotwater = thisHotwater;
	}

	public Double getLastHotair() {
		return lastHotair;
	}

	public void setLastHotair(Double lastHotair) {
		this.lastHotair = lastHotair;
	}

	public Double getThisHotair() {
		return thisHotair;
	}

	public void setThisHotair(Double thisHotair) {
		this.thisHotair = thisHotair;
	}

	public Double getLastWater() {
		return lastWater;
	}

	public void setLastWater(Double lastWater) {
		this.lastWater = lastWater;
	}

	public Double getThisWater() {
		return thisWater;
	}

	public void setThisWater(Double thisWater) {
		this.thisWater = thisWater;
	}

	public Double getLastEle() {
		return lastEle;
	}

	public void setLastEle(Double lastEle) {
		this.lastEle = lastEle;
	}

	public Double getThisEle() {
		return thisEle;
	}

	public void setThisEle(Double thisEle) {
		this.thisEle = thisEle;
	}

	public Double getLastGas() {
		return lastGas;
	}

	public void setLastGas(Double lastGas) {
		this.lastGas = lastGas;
	}

	public Double getThisGas() {
		return thisGas;
	}

	public void setThisGas(Double thisGas) {
		this.thisGas = thisGas;
	}

	public String getWegJson() {
		return wegJson;
	}

	public void setWegJson(String wegJson) {
		this.wegJson = wegJson;
	}

	public String getRegisterPeople() {
		return registerPeople;
	}

	public void setRegisterPeople(String registerPeople) {
		this.registerPeople = registerPeople;
	}

	public String getDealPeople() {
		return dealPeople;
	}

	public void setDealPeople(String dealPeople) {
		this.dealPeople = dealPeople;
	}

	public Double getWaterReading() {
		return waterReading;
	}

	public void setWaterReading(Double waterReading) {
		this.waterReading = waterReading;
	}

	public Double getElectricReading() {
		return electricReading;
	}

	public void setElectricReading(Double electricReading) {
		this.electricReading = electricReading;
	}

	public Double getGasReading() {
		return gasReading;
	}

	public void setGasReading(Double gasReading) {
		this.gasReading = gasReading;
	}

	public String getAddDistrict() {
		return addDistrict;
	}

	public void setAddDistrict(String addDistrict) {
		this.addDistrict = addDistrict;
	}

	public String getAddCommunity() {
		return addCommunity;
	}

	public void setAddCommunity(String addCommunity) {
		this.addCommunity = addCommunity;
	}

	public String getAddZone() {
		return addZone;
	}

	public void setAddZone(String addZone) {
		this.addZone = addZone;
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

	public Integer getWegrdId() {
        return wegrdId;
    }

    public void setWegrdId(Integer wegrdId) {
        this.wegrdId = wegrdId;
    }

    public Integer getWegrdRenterId() {
		return wegrdRenterId;
	}

	public void setWegrdRenterId(Integer wegrdRenterId) {
		this.wegrdRenterId = wegrdRenterId;
	}

	public Integer getWegrdHouse4rentId() {
        return wegrdHouse4rentId;
    }

    public void setWegrdHouse4rentId(Integer wegrdHouse4rentId) {
        this.wegrdHouse4rentId = wegrdHouse4rentId;
    }

    public Integer getWegrdHouse4storeId() {
        return wegrdHouse4storeId;
    }

    public void setWegrdHouse4storeId(Integer wegrdHouse4storeId) {
        this.wegrdHouse4storeId = wegrdHouse4storeId;
    }

    public Integer getWegrdUserId() {
        return wegrdUserId;
    }

    public void setWegrdUserId(Integer wegrdUserId) {
        this.wegrdUserId = wegrdUserId;
    }

    public Integer getWegrdDoUserId() {
        return wegrdDoUserId;
    }

    public void setWegrdDoUserId(Integer wegrdDoUserId) {
        this.wegrdDoUserId = wegrdDoUserId;
    }

    public Integer getWegrdDepartment() {
        return wegrdDepartment;
    }

    public void setWegrdDepartment(Integer wegrdDepartment) {
        this.wegrdDepartment = wegrdDepartment;
    }

    public Integer getWegrdStorefront() {
        return wegrdStorefront;
    }

    public void setWegrdStorefront(Integer wegrdStorefront) {
        this.wegrdStorefront = wegrdStorefront;
    }

    public Integer getWegrdCostWays() {
        return wegrdCostWays;
    }

    public void setWegrdCostWays(Integer wegrdCostWays) {
        this.wegrdCostWays = wegrdCostWays;
    }

    public String getWegrdType() {
        return wegrdType;
    }

    public void setWegrdType(String wegrdType) {
        this.wegrdType = wegrdType == null ? null : wegrdType.trim();
    }

    public Double getWegrdNums() {
        return wegrdNums;
    }

    public void setWegrdNums(Double wegrdNums) {
        this.wegrdNums = wegrdNums;
    }

    public String getWegrdMonth() {
        return wegrdMonth;
    }

    public void setWegrdMonth(String wegrdMonth) {
        this.wegrdMonth = wegrdMonth;
    }

    public String getWegrdNature() {
        return wegrdNature;
    }

    public void setWegrdNature(String wegrdNature) {
        this.wegrdNature = wegrdNature == null ? null : wegrdNature.trim();
    }

    public String getWegrdRegisterTime() {
        return (wegrdRegisterTime != null && wegrdRegisterTime.length() > 19) ? wegrdRegisterTime.substring(0,19) : wegrdRegisterTime;
    }

    public void setWegrdRegisterTime(String wegrdRegisterTime) {
        this.wegrdRegisterTime = wegrdRegisterTime == null ? null : wegrdRegisterTime.trim();
    }

	@Override
	public String toString() {
		return "JournalWegReading [wegrdId=" + wegrdId + ", wegrdRenterId=" + wegrdRenterId + ", wegrdHouse4rentId="
				+ wegrdHouse4rentId + ", wegrdHouse4storeId=" + wegrdHouse4storeId + ", wegrdUserId=" + wegrdUserId
				+ ", wegrdDoUserId=" + wegrdDoUserId + ", wegrdDepartment=" + wegrdDepartment + ", wegrdStorefront="
				+ wegrdStorefront + ", wegrdCostWays=" + wegrdCostWays + ", wegrdType=" + wegrdType + ", wegrdNums="
				+ wegrdNums + ", wegrdMonth=" + wegrdMonth + ", wegrdNature=" + wegrdNature + ", wegrdRegisterTime="
				+ wegrdRegisterTime + ", startNum=" + startNum + ", endNum=" + endNum + ", totalNum=" + totalNum
				+ ", addDistrict=" + addDistrict + ", addCommunity=" + addCommunity + ", addZone=" + addZone
				+ ", addBuilding=" + addBuilding + ", addDoorplateno=" + addDoorplateno + ", waterReading="
				+ waterReading + ", electricReading=" + electricReading + ", gasReading=" + gasReading
				+ ", registerPeople=" + registerPeople + ", dealPeople=" + dealPeople + ", wegJson=" + wegJson
				+ ", lastWater=" + lastWater + ", thisWater=" + thisWater + ", lastEle=" + lastEle + ", thisEle="
				+ thisEle + ", lastGas=" + lastGas + ", thisGas=" + thisGas + ", thisMonthFukuanri=" + thisMonthFukuanri
				+ ", lastMonthFukuanri=" + lastMonthFukuanri + ", conditionalType=" + conditionalType + "]";
	}
    
}