package com.zz.po.journal;


/**
 * 2019-03-27
 * @author ml
 * 未租房与办公区的对应关系表
 */
public class JourHsOffice {
	private Integer jhoId;
	private Integer jhoHsId;
	private Integer jhoOfficeId;
	private Integer jhoDeviceId;
	private String   jhoTime;
	private String jhoIdJson;
	
	public Integer getJhoId() {
		return jhoId;
	}
	public void setJhoId(Integer jhoId) {
		this.jhoId = jhoId;
	}
	public Integer getJhoHsId() {
		return jhoHsId;
	}
	public void setJhoHsId(Integer jhoHsId) {
		this.jhoHsId = jhoHsId;
	}
	public Integer getJhoOfficeId() {
		return jhoOfficeId;
	}
	public void setJhoOfficeId(Integer jhoOfficeId) {
		this.jhoOfficeId = jhoOfficeId;
	}
	public Integer getJhoDeviceId() {
		return jhoDeviceId;
	}
	public void setJhoDeviceId(Integer jhoDeviceId) {
		this.jhoDeviceId = jhoDeviceId;
	}
	public String getJhoTime() {
		return jhoTime;
	}
	public void setJhoTime(String jhoTime) {
		this.jhoTime = jhoTime;
	}
	public String getJhoIdJson() {
		return jhoIdJson;
	}
	public void setJhoIdJson(String jhoIdJson) {
		this.jhoIdJson = jhoIdJson;
	}

	@Override
	public String toString() {
		return "JourHsOffice [jhoId=" + jhoId + ", jhoHsId=" + jhoHsId + ", jhoOfficeId=" + jhoOfficeId
				+ ", jhoDeviceId=" + jhoDeviceId + ", jhoTime=" + jhoTime + ", jhoIdJson=" + jhoIdJson + "]";
	}
	
}
