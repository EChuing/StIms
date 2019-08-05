package com.zz.po.journal;

import java.util.List;

/**
 * 2019-02-15
 * @author yjw
 *未租与设备的对应关系表
 */
public class JourHsDevice {
	
	private Integer jhdId;
	private Integer jhdHsId;
	private Integer jhdDeviceId;
	private Integer jhdSubDeviceNumber;
	private String jhdDeviceIdJson;
	private String devAuthId;
	private  Integer delHsDevice;
	private String ifpGuid;
	private String hrLeaseState;
	private String co;

	public String getCo() {
		return co;
	}

	public void setCo(String co) {
		this.co = co;
	}

	public String getHrLeaseState() {
		return hrLeaseState;
	}

	public void setHrLeaseState(String hrLeaseState) {
		this.hrLeaseState = hrLeaseState;
	}

	public String getIfpGuid() {
		return ifpGuid;
	}

	public void setIfpGuid(String ifpGuid) {
		this.ifpGuid = ifpGuid;
	}

	private  List<JourDevice> seleceGuidByHsId;

	public List<JourDevice> getSeleceGuidByHsId() {
		return seleceGuidByHsId;
	}

	public void setSeleceGuidByHsId(List<JourDevice> seleceGuidByHsId) {
		this.seleceGuidByHsId = seleceGuidByHsId;
	}

	public Integer getDelHsDevice() {
		return delHsDevice;
	}

	public void setDelHsDevice(Integer delHsDevice) {
		this.delHsDevice = delHsDevice;
	}

	private String devId;
	private Integer devFirstType;
	private Integer devSecondType;
	
	private String jsonArray;
	private List<Integer> devIdArray;


	public Integer getJhdSubDeviceNumber() {
		return jhdSubDeviceNumber;
	}

	public void setJhdSubDeviceNumber(Integer jhdSubDeviceNumber) {
		this.jhdSubDeviceNumber = jhdSubDeviceNumber;
	}

	public List<Integer> getDevIdArray() {
		return devIdArray;
	}

	public void setDevIdArray(List<Integer> devIdArray) {
		this.devIdArray = devIdArray;
	}

	public String getJsonArray() {
		return jsonArray;
	}

	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}

	public String getDevId() {
		return devId;
	}

	public void setDevId(String devId) {
		this.devId = devId;
	}

	public String getDevAuthId() {
		return devAuthId;
	}

	public void setDevAuthId(String devAuthId) {
		this.devAuthId = devAuthId;
	}

	public String getJhdDeviceIdJson() {
		return jhdDeviceIdJson;
	}
	public void setJhdDeviceIdJson(String jhdDeviceIdJson) {
		this.jhdDeviceIdJson = jhdDeviceIdJson;
	}
	public Integer getJhdId() {
		return jhdId;
	}
	public void setJhdId(Integer jhdId) {
		this.jhdId = jhdId;
	}
	public Integer getJhdHsId() {
		return jhdHsId;
	}
	public void setJhdHsId(Integer jhdHsId) {
		this.jhdHsId = jhdHsId;
	}
	public Integer getJhdDeviceId() {
		return jhdDeviceId;
	}
	public void setJhdDeviceId(Integer jhdDeviceId) {
		this.jhdDeviceId = jhdDeviceId;
	}

	public Integer getDevFirstType() {
		return devFirstType;
	}

	public void setDevFirstType(Integer devFirstType) {
		this.devFirstType = devFirstType;
	}

	public Integer getDevSecondType() {
		return devSecondType;
	}

	public void setDevSecondType(Integer devSecondType) {
		this.devSecondType = devSecondType;
	}

	@Override
	public String toString() {
		return "JourHsDevice{" +
				"jhdId=" + jhdId +
				", jhdHsId=" + jhdHsId +
				", jhdDeviceId=" + jhdDeviceId +
				", jhdSubDeviceNumber=" + jhdSubDeviceNumber +
				", jhdDeviceIdJson='" + jhdDeviceIdJson + '\'' +
				", devAuthId='" + devAuthId + '\'' +
				", devId='" + devId + '\'' +
				", devFirstType=" + devFirstType +
				", devSecondType=" + devSecondType +
				", jsonArray='" + jsonArray + '\'' +
				", devIdArray=" + devIdArray +
				'}';
	}
}
