package com.zz.po.info;

public class InfoTransactionExpand extends InfoTransactionAssistance{
	
	private String registerPeople;
    
    private String assistPeople;
	
	private String addCommunity;
    
    private String addBuilding;
    
    private String addDoorplateno;
	
	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
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
	public String getAssistPeople() {
		return assistPeople;
	}
	public void setAssistPeople(String assistPeople) {
		this.assistPeople = assistPeople;
	}
	public String getAddCommunity() {
		return addCommunity;
	}
	public void setAddCommunity(String addCommunity) {
		this.addCommunity = addCommunity;
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
	@Override
	public String toString() {
		return "InfoTransactionExpand [addCommunity=" + addCommunity
				+ ", addBuilding=" + addBuilding + ", addDoorplateno="
				+ addDoorplateno + ", startNum=" + startNum + ", endNum="
				+ endNum + ", totalNum=" + totalNum + ", toString()="
				+ super.toString() + "]";
	}
	
}