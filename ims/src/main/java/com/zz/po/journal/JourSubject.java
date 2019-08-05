package com.zz.po.journal;

public class JourSubject {
	private Integer subId;
	private String subTitle;
	private String subDateStart;
	private String subDateEnd;
	private String subPlace;
	private String subContent;
	private String startNum;
	private String endNum;
	private Integer totalNum;
	private String fileImgPath;
	private String fileImgNum;

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

	public Integer getTotalNum() {
		return totalNum;
	}

	public void setTotalNum(Integer totalNum) {
		this.totalNum = totalNum;
	}

	public Integer getSubId() {
		return subId;
	}
	public void setSubId(Integer subId) {
		this.subId = subId;
	}
	public String getSubTitle() {
		return subTitle;
	}
	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}
	public String getSubDateStart() {
		return subDateStart;
	}
	public void setSubDateStart(String subDateStart) {
		this.subDateStart = subDateStart;
	}
	public String getSubDateEnd() {
		return subDateEnd;
	}
	public void setSubDateEnd(String subDateEnd) {
		this.subDateEnd = subDateEnd;
	}
	public String getSubPlace() {
		return subPlace;
	}
	public void setSubPlace(String subPlace) {
		this.subPlace = subPlace;
	}
	public String getSubContent() {
		return subContent;
	}
	public void setSubContent(String subContent) {
		this.subContent = subContent;
	}

	public String getFileImgPath() { return fileImgPath; }

	public void setFileImgPath(String fileImgPath) { this.fileImgPath = fileImgPath; }

	public String getFileImgNum() { return fileImgNum; }

	public void setFileImgNum(String fileImgNum) { this.fileImgNum = fileImgNum; }
}
