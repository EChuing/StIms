package com.zz.po.journal;

public class JournalRepairProgressExpand extends JournalRepairProgress{
	
	private String userName;
	
	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private Integer jcdId;
	private String jcdHouseAddress;
	public Integer getJcdId() {
        return jcdId;
    }
    public void setJcdId(Integer jcdId) {
        this.jcdId = jcdId;
    }
    public String getJcdHouseAddress() {
        return jcdHouseAddress;
    }
    public void setJcdHouseAddress(String jcdHouseAddress) {
        this.jcdHouseAddress = jcdHouseAddress;
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
	
}