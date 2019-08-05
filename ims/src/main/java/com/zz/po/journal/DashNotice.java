package com.zz.po.journal;

/**
 * 公告表
 */
public class DashNotice {
	private Integer dnId;
	
	private Integer dnUserId;
	
	private String dnType;
	
	private String dnTitle;
	
	private String dnContent;
	 
	private String dnTime;
	
	private String dnState;

	private String fileImgPath;

	private String fileImgNum;

	public String getFileImgPath() { return fileImgPath; }

	public void setFileImgPath(String fileImgPath) { this.fileImgPath = fileImgPath; }

	public String getFileImgNum() { return fileImgNum; }

	public void setFileImgNum(String fileImgNum) { this.fileImgNum = fileImgNum; }

	public String getDnState() {
		return dnState;
	}

	public void setDnState(String dnState) {
		this.dnState = dnState;
	}

	public Integer getDnId() {
		return dnId;
	}

	public void setDnId(Integer dnId) {
		this.dnId = dnId;
	}

	public Integer getDnUserId() {
		return dnUserId;
	}

	public void setDnUserId(Integer dnUserId) {
		this.dnUserId = dnUserId;
	}

	public String getDnType() {
		return dnType;
	}

	public void setDnType(String dnType) {
		this.dnType = dnType;
	}

	public String getDnTitle() {
		return dnTitle;
	}

	public void setDnTitle(String dnTitle) {
		this.dnTitle = dnTitle;
	}

	public String getDnContent() {
		return dnContent;
	}

	public void setDnContent(String dnContent) {
		this.dnContent = dnContent;
	}

	public String getDnTime() {
		return (dnTime != null && dnTime.length() > 19) ? dnTime.substring(0,19) : dnTime;
	}

	public void setDnTime(String dnTime) {
		this.dnTime = dnTime == null ? null : dnTime.trim();
	}

	@Override
	public String toString() {
		return "DashNotice{" +
				"dnId=" + dnId +
				", dnUserId=" + dnUserId +
				", dnType='" + dnType + '\'' +
				", dnTitle='" + dnTitle + '\'' +
				", dnContent='" + dnContent + '\'' +
				", dnTime='" + dnTime + '\'' +
				", dnState='" + dnState + '\'' +
				", fileImgPath='" + fileImgPath + '\'' +
				", fileImgNum='" + fileImgNum + '\'' +
				'}';
	}
}
