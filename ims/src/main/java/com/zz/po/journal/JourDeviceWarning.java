package com.zz.po.journal;

public class JourDeviceWarning {

	private Integer id;
	
	private Integer jdwDevId;
	
	private Integer jdwType;
	
	private String jdwBrand;
	
	private String jdwSn;
	
	private String jdwHandleStatus;
	
	private String jdwHandleResult;
	
	private String jdwModificationTime;
	
	private String jdwTime;
	
	private String jdwWarningTime;

	private String jdwFailureCause;

	public String getJdwFailureCause() {
		return jdwFailureCause;
	}

	public void setJdwFailureCause(String jdwFailureCause) {
		this.jdwFailureCause = jdwFailureCause;
	}

	//类型
	private Integer devFirstType;//一级类型
	private Integer devSecondType;//二级类型

	private String  coId;
	

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

	public Integer getJdwDevId() {
		return jdwDevId;
	}

	public void setJdwDevId(Integer jdwDevId) {
		this.jdwDevId = jdwDevId;
	}

	public String getJdwWarningTime() {
		return jdwWarningTime;
	}

	public void setJdwWarningTime(String jdwWarningTime) {
		this.jdwWarningTime = jdwWarningTime;
	}

	public Integer getJdwType() {
		return jdwType;
	}

	public void setJdwType(Integer jdwType) {
		this.jdwType = jdwType;
	}

	public String getJdwTime() {
		return jdwTime;
	}

	public void setJdwTime(String jdwTime) {
		this.jdwTime = jdwTime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getJdwBrand() {
		return jdwBrand;
	}

	public void setJdwBrand(String jdwBrand) {
		this.jdwBrand = jdwBrand;
	}

	public String getJdwSn() {
		return jdwSn;
	}

	public void setJdwSn(String jdwSn) {
		this.jdwSn = jdwSn;
	}

	public String getJdwHandleStatus() {
		return jdwHandleStatus;
	}

	public void setJdwHandleStatus(String jdwHandleStatus) {
		this.jdwHandleStatus = jdwHandleStatus;
	}

	public String getJdwHandleResult() {
		return jdwHandleResult;
	}

	public void setJdwHandleResult(String jdwHandleResult) {
		this.jdwHandleResult = jdwHandleResult;
	}

	public String getJdwModificationTime() {
		return jdwModificationTime;
	}

	public void setJdwModificationTime(String jdwModificationTime) {
		this.jdwModificationTime = jdwModificationTime;
	}

    public String getCoId() {
        return coId;
    }

    public void setCoId(String coId) {
        this.coId = coId;
    }

    @Override
    public String toString() {
        return "JourDeviceWarning{" +
                "id=" + id +
                ", jdwDevId=" + jdwDevId +
                ", jdwType=" + jdwType +
                ", jdwBrand='" + jdwBrand + '\'' +
                ", jdwSn='" + jdwSn + '\'' +
                ", jdwHandleStatus='" + jdwHandleStatus + '\'' +
                ", jdwHandleResult='" + jdwHandleResult + '\'' +
                ", jdwModificationTime='" + jdwModificationTime + '\'' +
                ", jdwTime='" + jdwTime + '\'' +
                ", jdwWarningTime='" + jdwWarningTime + '\'' +
                ", devFirstType=" + devFirstType +
                ", devSecondType=" + devSecondType +
                ", coId='" + coId + '\'' +
                '}';
    }
}
