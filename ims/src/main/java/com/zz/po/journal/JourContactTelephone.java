package com.zz.po.journal;

public class JourContactTelephone {
    private Integer jourId;

    private String jourContacts;

    private String jourTelephone;

    public Integer getJourId() {
        return jourId;
    }

    public void setJourId(Integer jourId) {
        this.jourId = jourId;
    }

    public String getJourContacts() {
        return jourContacts;
    }

    public void setJourContacts(String jourContacts) {
        this.jourContacts = jourContacts == null ? null : jourContacts.trim();
    }

    public String getJourTelephone() {
        return jourTelephone;
    }

    public void setJourTelephone(String jourTelephone) {
        this.jourTelephone = jourTelephone == null ? null : jourTelephone.trim();
    }

    @Override
    public String toString() {
        return "JourContactTelephone{" +
                "jourId=" + jourId +
                ", jourContacts='" + jourContacts + '\'' +
                ", jourTelephone='" + jourTelephone + '\'' +
                '}';
    }
}