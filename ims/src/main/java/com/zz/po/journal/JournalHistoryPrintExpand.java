package com.zz.po.journal;

public class JournalHistoryPrintExpand extends JournalHistoryPrint{
	private String pageNumber;
	private String startNum;
	private String fromTime;
	private String toTime;
	private String endNum;
	private String totalNum;
	private String totalPage;
	private String username;
	private String addZone;
	private String addCommunity;
	private String addBuilding;
	private String addDoorplateno;
	private Integer jciOverdueDays;
	private String cocContacts;

	public String getCocContacts() {
		return cocContacts;
	}

	public void setCocContacts(String cocContacts) {
		this.cocContacts = cocContacts;
	}

	public Integer getJciOverdueDays() {
		return jciOverdueDays;
	}
	public void setJciOverdueDays(Integer jciOverdueDays) {
		this.jciOverdueDays = jciOverdueDays;
	}
	public String getFromTime() {
		return fromTime;
	}
	public void setFromTime(String fromTime) {
		this.fromTime = fromTime;
	}
	public String getToTime() {
		return toTime;
	}
	public void setToTime(String toTime) {
		this.toTime = toTime;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAddZone() {
		return addZone;
	}
	public void setAddZone(String addZone) {
		this.addZone = addZone;
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

	@Override
	public String toString() {
		return "JournalHistoryPrintExpand{" +
				"pageNumber='" + pageNumber + '\'' +
				", startNum='" + startNum + '\'' +
				", fromTime='" + fromTime + '\'' +
				", toTime='" + toTime + '\'' +
				", endNum='" + endNum + '\'' +
				", totalNum='" + totalNum + '\'' +
				", totalPage='" + totalPage + '\'' +
				", username='" + username + '\'' +
				", addZone='" + addZone + '\'' +
				", addCommunity='" + addCommunity + '\'' +
				", addBuilding='" + addBuilding + '\'' +
				", addDoorplateno='" + addDoorplateno + '\'' +
				", jciOverdueDays=" + jciOverdueDays +
				", cocContacts='" + cocContacts + '\'' +
				'}';
	}
}