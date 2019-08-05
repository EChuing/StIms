package com.zz.po.info;

/**
 * 盘源表
 */
public class InfoHouse {
    private Integer houseCoding;

    private Integer userId;

    private Integer landlordId;

    private Integer houseDictId;

    private String sectionType;

    private String houseDirection;

    private String houseType;

    private String houseOwner;

    private Double storeSquare;

    private String furnitureConfig;

    private Double housePrice;

    private String houseRemake;

    private String registerTime;

    private String addProvince;

    private String addCity;

    private String addDistrict;

    private String addZone;

    private String addStreet;

    private String addCommunity;

    private String addBuilding;

    private String addDoorplateno;

    private String stateOwned;

    private String houseState;

    private String houseSignedState;

    private Integer housePeople4rent;

    private Integer housePeople4sell;

    private String keyAdministrator;

    private String keyNumber;

    private String houseEntrust4rent;

    private String houseEntrust4sell;

    private String houseSource;

    private String houseProperty;

    private String house4buyTime;

    private Double houseSellingPrice;

    private Double unitPriceRent;

    private Double unitPriceSell;
    
    private Integer storefront;
    private Integer department;
    
    private Integer rentDepartment;
    private Integer sellDepartment;
    
    private Integer innerVirtualRoom;
    private Integer outerVirtualRoom;
    
    private String virtualType;
    
    private Integer nonCostVirtualRoom;
    
    private Integer houseLipId;
    
    private Integer firstFollow;

    private String houseImgPath;

    public String getHouseImgPath() {
        return houseImgPath;
    }

    public void setHouseImgPath(String houseImgPath) {
        this.houseImgPath = houseImgPath;
    }

    public Integer getHouseLipId() {
		return houseLipId;
	}

	public void setHouseLipId(Integer houseLipId) {
		this.houseLipId = houseLipId;
	}

	public Integer getNonCostVirtualRoom() {
		return nonCostVirtualRoom;
	}

	public void setNonCostVirtualRoom(Integer nonCostVirtualRoom) {
		this.nonCostVirtualRoom = nonCostVirtualRoom;
	}

	public String getVirtualType() {
		return virtualType;
	}

	public void setVirtualType(String virtualType) {
		this.virtualType = virtualType;
	}

	public Integer getInnerVirtualRoom() {
		return innerVirtualRoom;
	}

	public void setInnerVirtualRoom(Integer innerVirtualRoom) {
		this.innerVirtualRoom = innerVirtualRoom;
	}

	public Integer getOuterVirtualRoom() {
		return outerVirtualRoom;
	}

	public void setOuterVirtualRoom(Integer outerVirtualRoom) {
		this.outerVirtualRoom = outerVirtualRoom;
	}

	public Integer getRentDepartment() {
		return rentDepartment;
	}

	public void setRentDepartment(Integer rentDepartment) {
		this.rentDepartment = rentDepartment;
	}

	public Integer getSellDepartment() {
		return sellDepartment;
	}

	public void setSellDepartment(Integer sellDepartment) {
		this.sellDepartment = sellDepartment;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getStorefront() {
		return storefront;
	}

	public void setStorefront(Integer storefront) {
		this.storefront = storefront;
	}

	public Integer getDepartment() {
		return department;
	}

	public void setDepartment(Integer department) {
		this.department = department;
	}

	public Integer getHouseCoding() {
        return houseCoding;
    }

    public void setHouseCoding(Integer houseCoding) {
        this.houseCoding = houseCoding;
    }

    public Integer getLandlordId() {
        return landlordId;
    }

    public void setLandlordId(Integer landlordId) {
        this.landlordId = landlordId;
    }

    public Integer getHouseDictId() {
        return houseDictId;
    }

    public void setHouseDictId(Integer houseDictId) {
        this.houseDictId = houseDictId;
    }

    public String getSectionType() {
        return sectionType;
    }

    public void setSectionType(String sectionType) {
        this.sectionType = sectionType == null ? null : sectionType.trim();
    }

    public String getHouseDirection() {
        return houseDirection;
    }

    public void setHouseDirection(String houseDirection) {
        this.houseDirection = houseDirection == null ? null : houseDirection.trim();
    }

    public String getHouseType() {
        return houseType;
    }

    public void setHouseType(String houseType) {
        this.houseType = houseType == null ? null : houseType.trim();
    }

    public String getHouseOwner() {
        return houseOwner;
    }

    public void setHouseOwner(String houseOwner) {
        this.houseOwner = houseOwner == null ? null : houseOwner.trim();
    }

    public Double getStoreSquare() {
        return storeSquare;
    }

    public void setStoreSquare(Double storeSquare) {
        this.storeSquare = storeSquare;
    }

    public String getFurnitureConfig() {
        return furnitureConfig;
    }

    public void setFurnitureConfig(String furnitureConfig) {
        this.furnitureConfig = furnitureConfig == null ? null : furnitureConfig.trim();
    }

    public Double getHousePrice() {
        return housePrice;
    }

    public void setHousePrice(Double housePrice) {
        this.housePrice = housePrice;
    }

    public String getHouseRemake() {
        return houseRemake;
    }

    public void setHouseRemake(String houseRemake) {
        this.houseRemake = houseRemake == null ? null : houseRemake.trim();
    }

    public String getRegisterTime() {
        return (registerTime != null && registerTime.length() > 19) ? registerTime.substring(0,19) : registerTime;
    }

    public void setRegisterTime(String registerTime) {
        this.registerTime = registerTime == null ? null : registerTime.trim();
    }

    public String getAddProvince() {
        return addProvince;
    }

    public void setAddProvince(String addProvince) {
        this.addProvince = addProvince == null ? null : addProvince.trim();
    }

    public String getAddCity() {
        return addCity;
    }

    public void setAddCity(String addCity) {
        this.addCity = addCity == null ? null : addCity.trim();
    }

    public String getAddDistrict() {
        return addDistrict;
    }

    public void setAddDistrict(String addDistrict) {
        this.addDistrict = addDistrict == null ? null : addDistrict.trim();
    }

    public String getAddZone() {
        return addZone;
    }

    public void setAddZone(String addZone) {
        this.addZone = addZone == null ? null : addZone.trim();
    }

    public String getAddStreet() {
        return addStreet;
    }

    public void setAddStreet(String addStreet) {
        this.addStreet = addStreet == null ? null : addStreet.trim();
    }

    public String getAddCommunity() {
        return addCommunity;
    }

    public void setAddCommunity(String addCommunity) {
        this.addCommunity = addCommunity == null ? null : addCommunity.trim();
    }

    public String getAddBuilding() {
        return addBuilding;
    }

    public void setAddBuilding(String addBuilding) {
        this.addBuilding = addBuilding == null ? null : addBuilding.trim();
    }

    public String getAddDoorplateno() {
        return addDoorplateno;
    }

    public void setAddDoorplateno(String addDoorplateno) {
        this.addDoorplateno = addDoorplateno == null ? null : addDoorplateno.trim();
    }

    public String getStateOwned() {
        return stateOwned;
    }

    public void setStateOwned(String stateOwned) {
        this.stateOwned = stateOwned == null ? null : stateOwned.trim();
    }

    public String getHouseState() {
        return houseState;
    }

    public void setHouseState(String houseState) {
        this.houseState = houseState == null ? null : houseState.trim();
    }

    public String getHouseSignedState() {
        return houseSignedState;
    }

    public void setHouseSignedState(String houseSignedState) {
        this.houseSignedState = houseSignedState == null ? null : houseSignedState.trim();
    }

    public Integer getHousePeople4rent() {
        return housePeople4rent;
    }

    public void setHousePeople4rent(Integer housePeople4rent) {
        this.housePeople4rent = housePeople4rent;
    }

    public Integer getHousePeople4sell() {
        return housePeople4sell;
    }

    public void setHousePeople4sell(Integer housePeople4sell) {
        this.housePeople4sell = housePeople4sell;
    }

    public String getKeyAdministrator() {
        return keyAdministrator;
    }

    public void setKeyAdministrator(String keyAdministrator) {
        this.keyAdministrator = keyAdministrator == null ? null : keyAdministrator.trim();
    }

    public String getKeyNumber() {
        return keyNumber;
    }

    public void setKeyNumber(String keyNumber) {
        this.keyNumber = keyNumber == null ? null : keyNumber.trim();
    }

    public String getHouseEntrust4rent() {
        return houseEntrust4rent;
    }

    public void setHouseEntrust4rent(String houseEntrust4rent) {
        this.houseEntrust4rent = houseEntrust4rent == null ? null : houseEntrust4rent.trim();
    }

    public String getHouseEntrust4sell() {
        return houseEntrust4sell;
    }

    public void setHouseEntrust4sell(String houseEntrust4sell) {
        this.houseEntrust4sell = houseEntrust4sell == null ? null : houseEntrust4sell.trim();
    }

    public String getHouseSource() {
        return houseSource;
    }

    public void setHouseSource(String houseSource) {
        this.houseSource = houseSource == null ? null : houseSource.trim();
    }

    public String getHouseProperty() {
        return houseProperty;
    }

    public void setHouseProperty(String houseProperty) {
        this.houseProperty = houseProperty == null ? null : houseProperty.trim();
    }

    public String getHouse4buyTime() {
        return house4buyTime;
    }

    public void setHouse4buyTime(String house4buyTime) {
        this.house4buyTime = house4buyTime == null ? null : house4buyTime.trim();
    }

    public Double getHouseSellingPrice() {
        return houseSellingPrice;
    }

    public void setHouseSellingPrice(Double houseSellingPrice) {
        this.houseSellingPrice = houseSellingPrice;
    }

    public Double getUnitPriceRent() {
        return unitPriceRent;
    }

    public void setUnitPriceRent(Double unitPriceRent) {
        this.unitPriceRent = unitPriceRent;
    }

    public Double getUnitPriceSell() {
        return unitPriceSell;
    }

    public void setUnitPriceSell(Double unitPriceSell) {
        this.unitPriceSell = unitPriceSell;
    }

	public Integer getFirstFollow() {
		return firstFollow;
	}

	public void setFirstFollow(Integer firstFollow) {
		this.firstFollow = firstFollow;
	}

	@Override
	public String toString() {
		return "InfoHouse [houseCoding=" + houseCoding + ", userId=" + userId
				+ ", landlordId=" + landlordId + ", houseDictId=" + houseDictId
				+ ", sectionType=" + sectionType + ", houseDirection="
				+ houseDirection + ", houseType=" + houseType + ", houseOwner="
				+ houseOwner + ", storeSquare=" + storeSquare
				+ ", furnitureConfig=" + furnitureConfig + ", housePrice="
				+ housePrice + ", houseRemake="
				+ houseRemake + ", registerTime=" + registerTime
				+ ", addProvince=" + addProvince + ", addCity=" + addCity
				+ ", addDistrict=" + addDistrict + ", addZone=" + addZone
				+ ", addStreet=" + addStreet + ", addCommunity=" + addCommunity
				+ ", addBuilding=" + addBuilding + ", addDoorplateno="
				+ addDoorplateno + ", stateOwned=" + stateOwned
				+ ", houseState=" + houseState + ", houseSignedState="
				+ houseSignedState + ", housePeople4rent=" + housePeople4rent
				+ ", housePeople4sell=" + housePeople4sell
				+ ", keyAdministrator=" + keyAdministrator + ", keyNumber="
				+ keyNumber + ", houseEntrust4rent=" + houseEntrust4rent
				+ ", houseEntrust4sell=" + houseEntrust4sell + ", houseSource="
				+ houseSource + ", houseProperty=" + houseProperty
				+ ", house4buyTime=" + house4buyTime + ", houseSellingPrice="
				+ houseSellingPrice + ", unitPriceRent=" + unitPriceRent
				+ ", unitPriceSell=" + unitPriceSell + ", storefront="
				+ storefront + ", department=" + department
				+ ", rentDepartment=" + rentDepartment + ", sellDepartment="
				+ sellDepartment + ", innerVirtualRoom=" + innerVirtualRoom
				+ ", outerVirtualRoom=" + outerVirtualRoom + ", virtualType="
				+ virtualType + "]";
	}
  
}
