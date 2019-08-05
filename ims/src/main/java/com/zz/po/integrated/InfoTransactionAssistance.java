package com.zz.po.integrated;

public class InfoTransactionAssistance {
    private Integer assistId;

    private Integer assistRegisterPeople;

    private Integer assistDepartment;

    private Integer assistStorefront;

    private Integer assistHouse4rent;

    private Integer assistHouse4store;

    private Integer assistUserId;

    private Double assistBonus;

    private String assistType;

    private String assistRegisterTime;

    private String assistState;

    private String assistRemark;
    
    private String jsonArray;

    public String getJsonArray() {
		return jsonArray;
	}

	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}

	public Integer getAssistId() {
        return assistId;
    }

    public void setAssistId(Integer assistId) {
        this.assistId = assistId;
    }

    public Integer getAssistRegisterPeople() {
        return assistRegisterPeople;
    }

    public void setAssistRegisterPeople(Integer assistRegisterPeople) {
        this.assistRegisterPeople = assistRegisterPeople;
    }

    public Integer getAssistDepartment() {
        return assistDepartment;
    }

    public void setAssistDepartment(Integer assistDepartment) {
        this.assistDepartment = assistDepartment;
    }

    public Integer getAssistStorefront() {
        return assistStorefront;
    }

    public void setAssistStorefront(Integer assistStorefront) {
        this.assistStorefront = assistStorefront;
    }

    public Integer getAssistHouse4rent() {
        return assistHouse4rent;
    }

    public void setAssistHouse4rent(Integer assistHouse4rent) {
        this.assistHouse4rent = assistHouse4rent;
    }

    public Integer getAssistHouse4store() {
        return assistHouse4store;
    }

    public void setAssistHouse4store(Integer assistHouse4store) {
        this.assistHouse4store = assistHouse4store;
    }

    public Integer getAssistUserId() {
		return assistUserId;
	}

	public void setAssistUserId(Integer assistUserId) {
		this.assistUserId = assistUserId;
	}

	public Double getAssistBonus() {
        return assistBonus;
    }

    public void setAssistBonus(Double assistBonus) {
        this.assistBonus = assistBonus;
    }

    public String getAssistType() {
        return assistType;
    }

    public void setAssistType(String assistType) {
        this.assistType = assistType == null ? null : assistType.trim();
    }

    public String getAssistRegisterTime() {
        return assistRegisterTime;
    }

    public void setAssistRegisterTime(String assistRegisterTime) {
        this.assistRegisterTime = assistRegisterTime == null ? null : assistRegisterTime.trim();
    }

    public String getAssistState() {
        return assistState;
    }

    public void setAssistState(String assistState) {
        this.assistState = assistState == null ? null : assistState.trim();
    }

    public String getAssistRemark() {
        return assistRemark;
    }

    public void setAssistRemark(String assistRemark) {
        this.assistRemark = assistRemark == null ? null : assistRemark.trim();
    }

	@Override
	public String toString() {
		return "InfoTransactionAssistance [assistId=" + assistId
				+ ", assistRegisterPeople="
				+ assistRegisterPeople + ", assistDepartment="
				+ assistDepartment + ", assistStorefront=" + assistStorefront
				+ ", assistHouse4rent=" + assistHouse4rent
				+ ", assistHouse4store=" + assistHouse4store
				+ ", assistUserId=" + assistUserId + ", assistBonus="
				+ assistBonus + ", assistType=" + assistType
				+ ", assistRegisterTime=" + assistRegisterTime
				+ ", assistState=" + assistState + ", assistRemark="
				+ assistRemark + ", jsonArray=" + jsonArray + "]";
	}
    
}