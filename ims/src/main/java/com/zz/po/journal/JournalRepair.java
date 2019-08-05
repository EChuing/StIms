package com.zz.po.journal;

import com.zz.po.commons.CommonsPo;

/**
 * 维修记录表
 */
public class JournalRepair extends CommonsPo{
    private Integer repId;

    private Integer repHouse4rentId;

    private Integer repHouse4storeId;

    private Integer repUserId;

    private Integer repRepairPeopleId;

    private String repContacts;

    private String repContactsPhone;

    private String repResponsibility;

    private String repReportingTime;

    private String repEventRp;

    private String repHopeTime;

    private String repTypeRp;
    
    private String repGrade;

    private Double repTollRp;

    private String repProgressRp;

    private String repReturningRp;

    private String repToReceive;
    
    private String repState;
    
    private Integer repDepartment;
    private Integer repStorefront;
    
    private String repTaskTime;
    
    private Integer aNumberOf;
    private Integer repHouseId;
    
    private String repFinancialIf;
    
    private String repImgPath;
    
    private String repImgNum;

    private String repUseTime; 
    
    private String repFinishTime;
    
    private String repNumber;
    
	public String getRepFinishTime() {
		return repFinishTime;
	}

	public void setRepFinishTime(String repFinishTime) {
		this.repFinishTime = repFinishTime;
	}

	public String getRepGrade() {
		return repGrade;
	}

	public void setRepGrade(String repGrade) {
		this.repGrade = repGrade;
	}

	public String getRepNumber() {
        return repNumber;
    }

    public void setRepNumber(String repNumber) {
        this.repNumber = repNumber;
    }

    public String getRepUseTime() {
		 return (repUseTime != null && repUseTime.length() > 19) ? repUseTime.substring(0,19) : repUseTime;
	}

	public void setRepUseTime(String repUseTime) {
		this.repUseTime = repUseTime;
	}

	public String getRepImgPath() {
		return repImgPath;
	}

	public void setRepImgPath(String repImgPath) {
		this.repImgPath = repImgPath;
	}

	public String getRepImgNum() {
		return repImgNum;
	}

	public void setRepImgNum(String repImgNum) {
		this.repImgNum = repImgNum;
	}

	public String getRepFinancialIf() {
		return repFinancialIf;
	}

	public void setRepFinancialIf(String repFinancialIf) {
		this.repFinancialIf = repFinancialIf;
	}

	public Integer getRepHouseId() {
		return repHouseId;
	}

	public void setRepHouseId(Integer repHouseId) {
		this.repHouseId = repHouseId;
	}

	public Integer getaNumberOf() {
		return aNumberOf;
	}

	public void setaNumberOf(Integer aNumberOf) {
		this.aNumberOf = aNumberOf;
	}

	public String getRepTaskTime() {
		return repTaskTime;
	}

	public void setRepTaskTime(String repTaskTime) {
		this.repTaskTime = repTaskTime;
	}

	public Integer getRepDepartment() {
		return repDepartment;
	}

	public void setRepDepartment(Integer repDepartment) {
		this.repDepartment = repDepartment;
	}

	public Integer getRepStorefront() {
		return repStorefront;
	}

	public void setRepStorefront(Integer repStorefront) {
		this.repStorefront = repStorefront;
	}

	public Integer getRepId() {
        return repId;
    }

    public void setRepId(Integer repId) {
        this.repId = repId;
    }

    public Integer getRepHouse4rentId() {
        return repHouse4rentId;
    }

    public void setRepHouse4rentId(Integer repHouse4rentId) {
        this.repHouse4rentId = repHouse4rentId;
    }

    public Integer getRepHouse4storeId() {
        return repHouse4storeId;
    }

    public void setRepHouse4storeId(Integer repHouse4storeId) {
        this.repHouse4storeId = repHouse4storeId;
    }

    public Integer getRepUserId() {
		return repUserId;
	}

	public void setRepUserId(Integer repUserId) {
		this.repUserId = repUserId;
	}

	public Integer getRepRepairPeopleId() {
		return repRepairPeopleId;
	}

	public void setRepRepairPeopleId(Integer repRepairPeopleId) {
		this.repRepairPeopleId = repRepairPeopleId;
	}

	public String getRepContacts() {
        return repContacts;
    }

    public void setRepContacts(String repContacts) {
        this.repContacts = repContacts == null ? null : repContacts.trim();
    }

    public String getRepContactsPhone() {
        return repContactsPhone;
    }

    public void setRepContactsPhone(String repContactsPhone) {
        this.repContactsPhone = repContactsPhone == null ? null : repContactsPhone.trim();
    }

    public String getRepResponsibility() {
        return repResponsibility;
    }

    public void setRepResponsibility(String repResponsibility) {
        this.repResponsibility = repResponsibility == null ? null : repResponsibility.trim();
    }

    public String getRepReportingTime() {
        return (repReportingTime != null && repReportingTime.length() > 19) ? repReportingTime.substring(0,19) : repReportingTime;
    }

    public void setRepReportingTime(String repReportingTime) {
        this.repReportingTime = repReportingTime;
    }

    public String getRepEventRp() {
        return repEventRp;
    }

    public void setRepEventRp(String repEventRp) {
        this.repEventRp = repEventRp == null ? null : repEventRp.trim();
    }

    public String getRepHopeTime() {
        return repHopeTime;
    }

    public void setRepHopeTime(String repHopeTime) {
        this.repHopeTime = repHopeTime;
    }

    public String getRepTypeRp() {
        return repTypeRp;
    }

    public void setRepTypeRp(String repTypeRp) {
        this.repTypeRp = repTypeRp == null ? null : repTypeRp.trim();
    }

    public Double getRepTollRp() {
        return repTollRp;
    }

    public void setRepTollRp(Double repTollRp) {
        this.repTollRp = repTollRp;
    }

    public String getRepProgressRp() {
        return repProgressRp;
    }

    public void setRepProgressRp(String repProgressRp) {
        this.repProgressRp = repProgressRp == null ? null : repProgressRp.trim();
    }

    public String getRepReturningRp() {
        return repReturningRp;
    }

    public void setRepReturningRp(String repReturningRp) {
        this.repReturningRp = repReturningRp == null ? null : repReturningRp.trim();
    }

    public String getRepToReceive() {
        return repToReceive;
    }

    public void setRepToReceive(String repToReceive) {
        this.repToReceive = repToReceive == null ? null : repToReceive.trim();
    }

	public String getRepState() {
		return repState;
	}

	public void setRepState(String repState) {
		this.repState = repState;
	}

	@Override
	public String toString() {
		return "JournalRepair [repId=" + repId + ", repHouse4rentId=" + repHouse4rentId + ", repHouse4storeId="
				+ repHouse4storeId + ", repUserId=" + repUserId + ", repRepairPeopleId=" + repRepairPeopleId
				+ ", repContacts=" + repContacts + ", repContactsPhone=" + repContactsPhone + ", repResponsibility="
				+ repResponsibility + ", repReportingTime=" + repReportingTime + ", repEventRp=" + repEventRp
				+ ", repHopeTime=" + repHopeTime + ", repTypeRp=" + repTypeRp + ", repGrade=" + repGrade
				+ ", repTollRp=" + repTollRp + ", repProgressRp=" + repProgressRp + ", repReturningRp=" + repReturningRp
				+ ", repToReceive=" + repToReceive + ", repState=" + repState + ", repDepartment=" + repDepartment
				+ ", repStorefront=" + repStorefront + ", repTaskTime=" + repTaskTime + ", aNumberOf=" + aNumberOf
				+ ", repHouseId=" + repHouseId + ", repFinancialIf=" + repFinancialIf + ", repImgPath=" + repImgPath
				+ ", repImgNum=" + repImgNum + ", repUseTime=" + repUseTime + ", repNumber=" + repNumber + "]";
	}   
}