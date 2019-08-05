package com.zz.po.sys;

public class SysDepartmentExpand extends SysDepartment{
	
	
	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	private Integer departmentDistinguishId;
	private Integer departmentClassId;


	@Override
	public String toString() {
		return "SysDepartmentExpand{" +
				"pageNumber='" + pageNumber + '\'' +
				", startNum='" + startNum + '\'' +
				", endNum='" + endNum + '\'' +
				", totalNum='" + totalNum + '\'' +
				", totalPage='" + totalPage + '\'' +
				", departmentDistinguishId=" + departmentDistinguishId +
				", departmentClassId=" + departmentClassId +
				'}';
	}

	public Integer getDepartmentDistinguishId() {
		return departmentDistinguishId;
	}

	public void setDepartmentDistinguishId(Integer departmentDistinguishId) {
		this.departmentDistinguishId = departmentDistinguishId;
	}

	public Integer getDepartmentClassId() {
		return departmentClassId;
	}

	public void setDepartmentClassId(Integer departmentClassId) {
		this.departmentClassId = departmentClassId;
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
	
}