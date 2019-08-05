package com.zz.po.integrated;

public class Landlord extends Infopopulation{
    private Integer laId;

    private Integer laUserId;

    private Integer laDepartment;

    private Integer laStorefront;

    private Integer laPopulationId;

    private String landlordOtherContact;

    private String laSecondContacts;

    private String laSecondPhone;

    private String laOtherContact;

    private String laRegisterTime;

    public Integer getLaId() {
        return laId;
    }

    public void setLaId(Integer laId) {
        this.laId = laId;
    }

    public Integer getLaUserId() {
        return laUserId;
    }

    public void setLaUserId(Integer laUserId) {
        this.laUserId = laUserId;
    }

    public Integer getLaDepartment() {
        return laDepartment;
    }

    public void setLaDepartment(Integer laDepartment) {
        this.laDepartment = laDepartment;
    }

    public Integer getLaStorefront() {
        return laStorefront;
    }

    public void setLaStorefront(Integer laStorefront) {
        this.laStorefront = laStorefront;
    }

    public Integer getLaPopulationId() {
        return laPopulationId;
    }

    public void setLaPopulationId(Integer laPopulationId) {
        this.laPopulationId = laPopulationId;
    }

    public String getLandlordOtherContact() {
        return landlordOtherContact;
    }

    public void setLandlordOtherContact(String landlordOtherContact) {
        this.landlordOtherContact = landlordOtherContact == null ? null : landlordOtherContact.trim();
    }

    public String getLaSecondContacts() {
        return laSecondContacts;
    }

    public void setLaSecondContacts(String laSecondContacts) {
        this.laSecondContacts = laSecondContacts == null ? null : laSecondContacts.trim();
    }

    public String getLaSecondPhone() {
        return laSecondPhone;
    }

    public void setLaSecondPhone(String laSecondPhone) {
        this.laSecondPhone = laSecondPhone == null ? null : laSecondPhone.trim();
    }

    public String getLaOtherContact() {
        return laOtherContact;
    }

    public void setLaOtherContact(String laOtherContact) {
        this.laOtherContact = laOtherContact == null ? null : laOtherContact.trim();
    }

    public String getLaRegisterTime() {
        return laRegisterTime;
    }

    public void setLaRegisterTime(String laRegisterTime) {
        this.laRegisterTime = laRegisterTime == null ? null : laRegisterTime.trim();
    }
}