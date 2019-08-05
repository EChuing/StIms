package com.zz.po.journal;

public class JourEmergencyCall {
    private Integer jourId;

    private String jourPoliceStation;

    private String jourFireAlarm;

    private String jourFirstAid;

    private String jourElevatorCompany;

    private String jourHydropower;

    public Integer getJourId() {
        return jourId;
    }

    public void setJourId(Integer jourId) {
        this.jourId = jourId;
    }

    public String getJourPoliceStation() {
        return jourPoliceStation;
    }

    public void setJourPoliceStation(String jourPoliceStation) {
        this.jourPoliceStation = jourPoliceStation == null ? null : jourPoliceStation.trim();
    }

    public String getJourFireAlarm() {
        return jourFireAlarm;
    }

    public void setJourFireAlarm(String jourFireAlarm) {
        this.jourFireAlarm = jourFireAlarm == null ? null : jourFireAlarm.trim();
    }

    public String getJourFirstAid() {
        return jourFirstAid;
    }

    public void setJourFirstAid(String jourFirstAid) {
        this.jourFirstAid = jourFirstAid == null ? null : jourFirstAid.trim();
    }

    public String getJourElevatorCompany() {
        return jourElevatorCompany;
    }

    public void setJourElevatorCompany(String jourElevatorCompany) {
        this.jourElevatorCompany = jourElevatorCompany == null ? null : jourElevatorCompany.trim();
    }

    public String getJourHydropower() {
        return jourHydropower;
    }

    public void setJourHydropower(String jourHydropower) {
        this.jourHydropower = jourHydropower == null ? null : jourHydropower.trim();
    }

    @Override
    public String
    toString() {
        return "JourEmergencyCall{" +
                "jourId=" + jourId +
                ", jourPoliceStation='" + jourPoliceStation + '\'' +
                ", jourFireAlarm='" + jourFireAlarm + '\'' +
                ", jourFirstAid='" + jourFirstAid + '\'' +
                ", jourElevatorCompany='" + jourElevatorCompany + '\'' +
                ", jourHydropower='" + jourHydropower + '\'' +
                '}';
    }
}