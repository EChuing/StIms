package com.zz.deviceevents;

public class SmokeAlertEvents {

	private Integer saId;
	private String saBrand;
	private String saDeviceSn;
	private String saEventType;
	private String saWarningContent;
	private String saWarningStatus;
	private String saDeviceStatus;
	private String saHandleStatus;
	private String saTime;
	private String saHandleResult;
	
	public String getSaHandleResult() {
		return saHandleResult;
	}
	public void setSaHandleResult(String saHandleResult) {
		this.saHandleResult = saHandleResult;
	}
	public Integer getSaId() {
		return saId;
	}
	public void setSaId(Integer saId) {
		this.saId = saId;
	}
	public String getSaBrand() {
		return saBrand;
	}
	public void setSaBrand(String saBrand) {
		this.saBrand = saBrand;
	}
	public String getSaDeviceSn() {
		return saDeviceSn;
	}
	public void setSaDeviceSn(String saDeviceSn) {
		this.saDeviceSn = saDeviceSn;
	}
	public String getSaEventType() {
		return saEventType;
	}
	public void setSaEventType(String saEventType) {
		this.saEventType = saEventType;
	}
	public String getSaWarningContent() {
		return saWarningContent;
	}
	public void setSaWarningContent(String saWarningContent) {
		this.saWarningContent = saWarningContent;
	}
	public String getSaWarningStatus() {
		return saWarningStatus;
	}
	public void setSaWarningStatus(String saWarningStatus) {
		this.saWarningStatus = saWarningStatus;
	}
	public String getSaDeviceStatus() {
		return saDeviceStatus;
	}
	public void setSaDeviceStatus(String saDeviceStatus) {
		this.saDeviceStatus = saDeviceStatus;
	}
	public String getSaHandleStatus() {
		return saHandleStatus;
	}
	public void setSaHandleStatus(String saHandleStatus) {
		this.saHandleStatus = saHandleStatus;
	}
	public String getSaTime() {
		return saTime;
	}
	public void setSaTime(String saTime) {
		this.saTime = saTime;
	}
	@Override
	public String toString() {
		return "SmokeAlertEvents [saId=" + saId + ", saBrand=" + saBrand + ", saDeviceSn=" + saDeviceSn
				+ ", saEventType=" + saEventType + ", saWarningContent=" + saWarningContent + ", saWarningStatus="
				+ saWarningStatus + ", saDeviceStatus=" + saDeviceStatus + ", saHandleStatus=" + saHandleStatus
				+ ", saTime=" + saTime + ", saHandleResult=" + saHandleResult + "]";
	}
	
}
