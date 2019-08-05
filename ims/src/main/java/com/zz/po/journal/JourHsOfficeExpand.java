package com.zz.po.journal;

public class JourHsOfficeExpand extends JourHsOffice{
	
	private String startNum;
	private String endNum;
	private String community;
	private String building;
	private String doorplateno;
	private String pageSize;
	private String hsOfficeJson;
	
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
	public String getPageSize() {
		return pageSize;
	}
	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}
	public String getHsOfficeJson() {
		return hsOfficeJson;
	}
	public void setHsOfficeJson(String hsOfficeJson) {
		this.hsOfficeJson = hsOfficeJson;
	}
	@Override
	public String toString() {
		return "JourHsOfficeExpand [startNum=" + startNum + ", endNum=" + endNum + ", community=" + community
				+ ", building=" + building + ", doorplateno=" + doorplateno + ", pageSize=" + pageSize
				+ ", hsOfficeJson=" + hsOfficeJson + "]";
	}
}
