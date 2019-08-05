package com.zz.po.journal;

public class JournalHousingFollowExpand extends JournalHousingFollow{
	
    private String jhfUserName;
    
    private String fromTime;
	private String toTime;
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private String addZone;
	private String addCommunity;
	private String addBuilding;
	private String addDoorplateno;
    private String houseSignedState;
    
	public String getHouseSignedState() {
        return houseSignedState;
    }
    public void setHouseSignedState(String houseSignedState) {
        this.houseSignedState = houseSignedState;
    }
    private String att;
    
    private String att2;
	
	public String getAtt() {
		return att;
	}
	public void setAtt(String att) {
		this.att = att;
	}
	public String getAtt2() {
		return att2;
	}
	public void setAtt2(String att2) {
		this.att2 = att2;
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
    
	public String getJhfUserName() {
		return jhfUserName;
	}
	public void setJhfUserName(String jhfUserName) {
		this.jhfUserName = jhfUserName;
	}
	@Override
	public String toString() {
		return "JournalHousingFollowExpand [jhfUserName=" + jhfUserName + ", fromTime=" + fromTime + ", toTime="
				+ toTime + ", pageNumber=" + pageNumber + ", startNum=" + startNum + ", endNum=" + endNum
				+ ", totalNum=" + totalNum + ", totalPage=" + totalPage + ", addZone=" + addZone + ", addCommunity="
				+ addCommunity + ", addBuilding=" + addBuilding + ", addDoorplateno=" + addDoorplateno
				+ ", houseSignedState=" + houseSignedState + ", att=" + att + ", att2=" + att2 + "]";
	}
	
}