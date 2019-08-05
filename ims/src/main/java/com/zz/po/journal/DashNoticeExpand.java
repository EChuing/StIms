package com.zz.po.journal;

public class DashNoticeExpand extends DashNotice{
	
	  private String pageNumber;
	  private String startNum;
	  private String endNum;
	  private String totalNum;
	  private String totalPage;
	  private String jsonArray;
	  private String suStaffName;
	  
	public String getSuStaffName() {
		return suStaffName;
	}
	public void setSuStaffName(String suStaffName) {
		this.suStaffName = suStaffName;
	}
	public String getJsonArray() {
		return jsonArray;
	}
	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
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
		return "DashNoticeExpand [toString()=" + super.toString() + "]";
	}
}
