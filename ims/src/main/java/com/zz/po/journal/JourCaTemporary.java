package com.zz.po.journal;

public class JourCaTemporary {

	private Integer id;
	private String identifying;
	private String sectionType;
	private String houseDirection;
	private String houseState;
	private Double houseSquare;
	private Double guidePrice;
	private Double costPrice;
	private String jctCostPriceVal;
	private String community;
	private String building;
	private String doorplateno;
	private String floorNumPrefix;
	private Integer floor;
	private String splitJson;
	private String roomNumber;
	private String roomNumPrefix;
	private String maxPeople;
	private String dailyRent;
	private String hotDailyRent;
	private String roomType;
	private String roomConfiguration;

	public Double getCostPrice() {
		return costPrice;
	}
	public void setCostPrice(Double costPrice) {
		this.costPrice = costPrice;
	}

	public String getJctCostPriceVal() {
		return jctCostPriceVal;
	}

	public void setJctCostPriceVal(String jctCostPriceVal) {
		this.jctCostPriceVal = jctCostPriceVal;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getIdentifying() {
		return identifying;
	}
	public void setIdentifying(String identifying) {
		this.identifying = identifying;
	}
	public String getSectionType() {
		return sectionType;
	}
	public void setSectionType(String sectionType) {
		this.sectionType = sectionType;
	}
	public String getHouseDirection() {
		return houseDirection;
	}
	public void setHouseDirection(String houseDirection) {
		this.houseDirection = houseDirection;
	}
	public Double getHouseSquare() {
		return houseSquare;
	}
	public void setHouseSquare(Double houseSquare) {
		this.houseSquare = houseSquare;
	}
	public Double getGuidePrice() {
		return guidePrice;
	}
	public void setGuidePrice(Double guidePrice) {
		this.guidePrice = guidePrice;
	}
	public String getCommunity() {
		return community;
	}
	public void setCommunity(String community) {
		this.community = community;
	}
	public String getBuilding() {
		return building;
	}
	public void setBuilding(String building) {
		this.building = building;
	}
	public String getDoorplateno() {
		return doorplateno;
	}
	public void setDoorplateno(String doorplateno) {
		this.doorplateno = doorplateno;
	}
	public String getFloorNumPrefix() {
		return floorNumPrefix;
	}
	public void setFloorNumPrefix(String floorNumPrefix) {
		this.floorNumPrefix = floorNumPrefix;
	}
	public Integer getFloor() {
		return floor;
	}
	public void setFloor(Integer floor) {
		this.floor = floor;
	}
	public String getSplitJson() {
		return splitJson;
	}
	public void setSplitJson(String splitJson) {
		this.splitJson = splitJson;
	}
	public String getRoomNumber() {
		return roomNumber;
	}
	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}
	public String getRoomNumPrefix() {
		return roomNumPrefix;
	}
	public void setRoomNumPrefix(String roomNumPrefix) {
		this.roomNumPrefix = roomNumPrefix;
	}
	public String getMaxPeople() {
		return maxPeople;
	}
	public void setMaxPeople(String maxPeople) {
		this.maxPeople = maxPeople;
	}
	public String getDailyRent() {
		return dailyRent;
	}
	public void setDailyRent(String dailyRent) {
		this.dailyRent = dailyRent;
	}
	public String getHotDailyRent() {
		return hotDailyRent;
	}
	public void setHotDailyRent(String hotDailyRent) {
		this.hotDailyRent = hotDailyRent;
	}
	public String getRoomType() {
		return roomType;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	public String getRoomConfiguration() {
		return roomConfiguration;
	}
	public void setRoomConfiguration(String roomConfiguration) {
		this.roomConfiguration = roomConfiguration;
	}
	public String getHouseState() { return houseState; }
	public void setHouseState(String houseState) { this.houseState = houseState; }

	@Override
	public String toString() {
		return "JourCaTemporary{" +
				"id=" + id +
				", identifying='" + identifying + '\'' +
				", sectionType='" + sectionType + '\'' +
				", houseDirection='" + houseDirection + '\'' +
				", houseState='" + houseState + '\'' +
				", houseSquare=" + houseSquare +
				", guidePrice=" + guidePrice +
				", costPrice=" + costPrice +
				", jctCostPriceVal='" + jctCostPriceVal + '\'' +
				", community='" + community + '\'' +
				", building='" + building + '\'' +
				", doorplateno='" + doorplateno + '\'' +
				", floorNumPrefix='" + floorNumPrefix + '\'' +
				", floor=" + floor +
				", splitJson='" + splitJson + '\'' +
				", roomNumber='" + roomNumber + '\'' +
				", roomNumPrefix='" + roomNumPrefix + '\'' +
				", maxPeople='" + maxPeople + '\'' +
				", dailyRent='" + dailyRent + '\'' +
				", hotDailyRent='" + hotDailyRent + '\'' +
				", roomType='" + roomType + '\'' +
				", roomConfiguration='" + roomConfiguration + '\'' +
				'}';
	}
}
