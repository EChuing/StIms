package com.zz.po.journal;

public class JourPricePlan {
	private Integer jppId;
	
	private String jppPlanName;
	
	private String jppPlanPackage;
	
	private Integer jppPriorityLevel;

	private Integer jppState;

	private String jsonArray;
	private String totalNum;
	private String startNum;
	private String endNum;
	
	public String getJsonArray() {
		return jsonArray;
	}

	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}

	public Integer getJppState() {
		return jppState;
	}

	public void setJppState(Integer jppState) {
		this.jppState = jppState;
	}

	public String getTotalNum() {
		return totalNum;
	}

	public void setTotalNum(String totalNum) {
		this.totalNum = totalNum;
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

	public Integer getJppId() {
		return jppId;
	}

	public void setJppId(Integer jppId) {
		this.jppId = jppId;
	}

	public String getJppPlanName() {
		return jppPlanName;
	}

	public void setJppPlanName(String jppPlanName) {
		this.jppPlanName = jppPlanName;
	}

	public String getJppPlanPackage() {
		return jppPlanPackage;
	}

	public void setJppPlanPackage(String jppPlanPackage) {
		this.jppPlanPackage = jppPlanPackage;
	}

	public Integer getJppPriorityLevel() {
		return jppPriorityLevel;
	}

	public void setJppPriorityLevel(Integer jppPriorityLevel) {
		this.jppPriorityLevel = jppPriorityLevel;
	}

	@Override
	public String toString() {
		return "JourPricePlan [jppId=" + jppId + ", jppPlanName=" + jppPlanName + ", jppPlanPackage=" + jppPlanPackage
				+ ", jppPriorityLevel=" + jppPriorityLevel + ", jppState=" + jppState + ", jsonArray=" + jsonArray
				+ ", totalNum=" + totalNum + ", startNum=" + startNum + ", endNum=" + endNum + "]";
	}
	
}
