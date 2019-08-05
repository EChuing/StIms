package com.zz.po.info;

public class InfoLandlordExpand extends InfoLandlord{
	private String userName;
	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private String housingNumber;
	
	public String getHousingNumber() {
		return housingNumber;
	}
	public void setHousingNumber(String housingNumber) {
		this.housingNumber = housingNumber;
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
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	@Override
	public String toString() {
		return "InfoLandlordExpand [userName=" + userName + ", pageNumber="
				+ pageNumber + ", startNum=" + startNum + ", endNum=" + endNum
				+ ", totalNum=" + totalNum + ", totalPage=" + totalPage
				+ ", housingNumber=" + housingNumber + ", toString()="
				+ super.toString() + "]";
	}
	
}