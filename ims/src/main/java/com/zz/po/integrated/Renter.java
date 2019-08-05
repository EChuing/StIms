package com.zz.po.integrated;

import java.util.Date;

public class Renter extends InfoTransactionAssistance{
    private Integer renterId;

    private Integer renterUserId;

    private Integer renterDepartment;

    private Integer renterStorefront;

    private Integer renterPopulationId;

    private String renterSecondContacts;

    private String renterSecondPhone;

    private String renterRegisterTime;
    
    private String popNameRemark;

    public String getPopNameRemark() {
		return popNameRemark;
	}

	public void setPopNameRemark(String popNameRemark) {
		this.popNameRemark = popNameRemark;
	}

	public Integer getRenterId() {
        return renterId;
    }

    public void setRenterId(Integer renterId) {
        this.renterId = renterId;
    }

    public Integer getRenterUserId() {
        return renterUserId;
    }

    public void setRenterUserId(Integer renterUserId) {
        this.renterUserId = renterUserId;
    }

    public Integer getRenterDepartment() {
        return renterDepartment;
    }

    public void setRenterDepartment(Integer renterDepartment) {
        this.renterDepartment = renterDepartment;
    }

    public Integer getRenterStorefront() {
        return renterStorefront;
    }

    public void setRenterStorefront(Integer renterStorefront) {
        this.renterStorefront = renterStorefront;
    }

    public Integer getRenterPopulationId() {
        return renterPopulationId;
    }

    public void setRenterPopulationId(Integer renterPopulationId) {
        this.renterPopulationId = renterPopulationId;
    }

    public String getRenterSecondContacts() {
        return renterSecondContacts;
    }

    public void setRenterSecondContacts(String renterSecondContacts) {
        this.renterSecondContacts = renterSecondContacts == null ? null : renterSecondContacts.trim();
    }

    public String getRenterSecondPhone() {
        return renterSecondPhone;
    }

    public void setRenterSecondPhone(String renterSecondPhone) {
        this.renterSecondPhone = renterSecondPhone == null ? null : renterSecondPhone.trim();
    }

    public String getRenterRegisterTime() {
        return renterRegisterTime;
    }

    public void setRenterRegisterTime(String renterRegisterTime) {
        this.renterRegisterTime = renterRegisterTime == null ? null : renterRegisterTime.trim();
    }
}