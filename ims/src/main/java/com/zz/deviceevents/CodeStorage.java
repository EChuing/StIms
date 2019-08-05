package com.zz.deviceevents;

import java.util.Date;
/**
* 空调码库
 * @author Administrator
 *
 */
public class CodeStorage {
	private Integer csId;
	private String csCoId;
	private String csSn;
	private String csAirConditioningCode;
	private String csRoad;
	private String csTime;
	
	public Integer getCsId() {
		return csId;
	}
	public void setCsId(Integer csId) {
		this.csId = csId;
	}
	public String getCsCoId() {
		return csCoId;
	}
	public void setCsCoId(String csCoId) {
		this.csCoId = csCoId;
	}
	public String getCsSn() {
		return csSn;
	}
	public void setCsSn(String csSn) {
		this.csSn = csSn;
	}
	public String getCsAirConditioningCode() {
		return csAirConditioningCode;
	}
	public void setCsAirConditioningCode(String csAirConditioningCode) {
		this.csAirConditioningCode = csAirConditioningCode;
	}
	public String getCsRoad() {
		return csRoad;
	}
	public void setCsRoad(String csRoad) {
		this.csRoad = csRoad;
	}
	public String getCsTime() {
		return csTime;
	}
	public void setCsTime(String csTime) {
		this.csTime = csTime;
	}
	@Override
	public String toString() {
		return "CodeStorage [csId=" + csId + ", csCoId=" + csCoId + ", csSn=" + csSn + ", csAirConditioningCode="
				+ csAirConditioningCode + ", csRoad=" + csRoad + ", csTime=" + csTime + "]";
	}
}
