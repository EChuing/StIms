package com.zz.po.journal;

public class JourUserDevice {
	private Integer judId;
	private Integer judUserId;
	private Integer judDeviceId;
	private String judCreateTime;
	private String JhoIdJson;
	
	private Integer userId;
	private String suName;
	private String departmentName;
	private String suStaffName;
	
	private String devType;
	private String devNickname;
	private Integer id;

	@Override
	public String toString() {
		return "JourUserDevice{" +
				"judId=" + judId +
				", judUserId=" + judUserId +
				", judDeviceId=" + judDeviceId +
				", judCreateTime='" + judCreateTime + '\'' +
				", JhoIdJson='" + JhoIdJson + '\'' +
				", userId=" + userId +
				", suName='" + suName + '\'' +
				", departmentName='" + departmentName + '\'' +
				", suStaffName='" + suStaffName + '\'' +
				", devType='" + devType + '\'' +
				", devNickname='" + devNickname + '\'' +
				", id=" + id +
				", devUsername='" + devUsername + '\'' +
				", suState='" + suState + '\'' +
				", hsAddCommunity='" + hsAddCommunity + '\'' +
				", hsAddCity='" + hsAddCity + '\'' +
				'}';
	}

	public String getSuState() {
		return suState;
	}

	public void setSuState(String suState) {
		this.suState = suState;
	}

	private String devUsername;
	private String suState;


	public String getHsAddCity() {
		return hsAddCity;
	}

	public void setHsAddCity(String hsAddCity) {
		this.hsAddCity = hsAddCity;
	}

	private String hsAddCommunity;
	private String hsAddCity;
	
	
	public String getHsAddCommunity() {
		return hsAddCommunity;
	}
	public void setHsAddCommunity(String hsAddCommunity) {
		this.hsAddCommunity = hsAddCommunity;
	}
	public String getSuStaffName() {
		return suStaffName;
	}
	public void setSuStaffName(String suStaffName) {
		this.suStaffName = suStaffName;
	}
	public String getDevUsername() {
		return devUsername;
	}
	public void setDevUsername(String devUsername) {
		this.devUsername = devUsername;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDevType() {
		return devType;
	}
	public void setDevType(String devType) {
		this.devType = devType;
	}
	public String getDevNickname() {
		return devNickname;
	}
	public void setDevNickname(String devNickname) {
		this.devNickname = devNickname;
	}
	public String getSuName() {
		return suName;
	}
	public void setSuName(String suName) {
		this.suName = suName;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getJhoIdJson() {
		return JhoIdJson;
	}
	public void setJhoIdJson(String jhoIdJson) {
		JhoIdJson = jhoIdJson;
	}
	public Integer getJudId() {
		return judId;
	}
	public void setJudId(Integer judId) {
		this.judId = judId;
	}
	public Integer getJudUserId() {
		return judUserId;
	}
	public void setJudUserId(Integer judUserId) {
		this.judUserId = judUserId;
	}
	public Integer getJudDeviceId() {
		return judDeviceId;
	}
	public void setJudDeviceId(Integer judDeviceId) {
		this.judDeviceId = judDeviceId;
	}
	public String getJudCreateTime() {
		return judCreateTime;
	}
	public void setJudCreateTime(String judCreateTime) {
		this.judCreateTime = judCreateTime;
	}


}
