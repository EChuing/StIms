package com.zz.po.info;

public class InfoRenewalLandlordExpand extends InfoRenewalLandlord{
	
	private Integer updateFlag;
	
	private String registerPeople;
	
	private String landlordName;
	
	private String departmentName;
	
	private String storefrontName;
	
	private String addCommunity;
    
    private String addDistrict;
    
    private String addZone;
    
    private String addBuilding;
    
    private String addDoorplateno;
    
    private String hsState;
    
    private String landlordPhone;
    private Integer dateType;
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private Integer jcdId;
	private Integer adminUser;
	
	private String jcdHouseAddress;
	private String maxtime;
	private String flag;
	private Double hsHouseDeposit;
	private Integer hsHouseId;
	
	public Integer getHsHouseId() {
		return hsHouseId;
	}
	public void setHsHouseId(Integer hsHouseId) {
		this.hsHouseId = hsHouseId;
	}
	public Double getHsHouseDeposit() {
        return hsHouseDeposit;
    }
    public void setHsHouseDeposit(Double hsHouseDeposit) {
        this.hsHouseDeposit = hsHouseDeposit;
    }
    public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getMaxtime() {
		return maxtime;
	}
	public void setMaxtime(String maxtime) {
		this.maxtime = maxtime;
	}
	public String getHsState() {
		return hsState;
	}
	public void setHsState(String hsState) {
		this.hsState = hsState;
	}
	public String getJcdHouseAddress() {
		return jcdHouseAddress;
	}
	public void setJcdHouseAddress(String jcdHouseAddress) {
		this.jcdHouseAddress = jcdHouseAddress;
	}
	public Integer getAdminUser() {
		return adminUser;
	}
	public void setAdminUser(Integer adminUser) {
		this.adminUser = adminUser;
	}
	public Integer getJcdId() {
		return jcdId;
	}
	public void setJcdId(Integer jcdId) {
		this.jcdId = jcdId;
	}
	public String getLandlordPhone() {
		return landlordPhone;
	}
	public void setLandlordPhone(String landlordPhone) {
		this.landlordPhone = landlordPhone;
	}
	public Integer getDateType() {
		return dateType;
	}
	public void setDateType(Integer dateType) {
		this.dateType = dateType;
	}
	public String getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
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
	
	public String getRegisterPeople() {
		return registerPeople;
	}
	public void setRegisterPeople(String registerPeople) {
		this.registerPeople = registerPeople;
	}
	public String getLandlordName() {
		return landlordName;
	}
	public void setLandlordName(String landlordName) {
		this.landlordName = landlordName;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getStorefrontName() {
		return storefrontName;
	}
	public void setStorefrontName(String storefrontName) {
		this.storefrontName = storefrontName;
	}
	public String getAddCommunity() {
		return addCommunity;
	}
	public void setAddCommunity(String addCommunity) {
		this.addCommunity = addCommunity;
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
	public Integer getUpdateFlag() {
		return updateFlag;
	}
	public void setUpdateFlag(Integer updateFlag) {
		this.updateFlag = updateFlag;
	}
	@Override
	public String toString() {
		return "InfoRenewalLandlordExpand ["+super.toString()+"]";
	}
	
    
}