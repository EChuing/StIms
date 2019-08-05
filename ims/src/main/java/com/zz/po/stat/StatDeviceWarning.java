package com.zz.po.stat;

public class StatDeviceWarning {

	private Integer sdwId;
	
	private Integer sdwOnline;
	
	private Integer sdwOffline;
	
	private Integer sdwWarning;
	
	private String sdwTime;

	private String startTime;

	private String endTime;

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Integer getSdwId() {
		return sdwId;
	}

	public void setSdwId(Integer sdwId) {
		this.sdwId = sdwId;
	}

	public Integer getSdwOnline() {
		return sdwOnline;
	}

	public void setSdwOnline(Integer sdwOnline) {
		this.sdwOnline = sdwOnline;
	}

	public Integer getSdwOffline() {
		return sdwOffline;
	}

	public void setSdwOffline(Integer sdwOffline) {
		this.sdwOffline = sdwOffline;
	}

	public Integer getSdwWarning() {
		return sdwWarning;
	}

	public void setSdwWarning(Integer sdwWarning) {
		this.sdwWarning = sdwWarning;
	}

	public String getSdwTime() {
		return sdwTime;
	}

	public void setSdwTime(String sdwTime) {
		this.sdwTime = sdwTime;
	}

	@Override
	public String toString() {
		return "StatDeviceWarning{" +
				"sdwId=" + sdwId +
				", sdwOnline=" + sdwOnline +
				", sdwOffline=" + sdwOffline +
				", sdwWarning=" + sdwWarning +
				", sdwTime='" + sdwTime + '\'' +
				", startTime='" + startTime + '\'' +
				", endTime='" + endTime + '\'' +
				'}';
	}


}
