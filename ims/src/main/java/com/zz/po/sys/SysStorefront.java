package com.zz.po.sys;

/**
 * 区域表
 */
public class SysStorefront extends SysStudent{
    private Integer storefrontId;

    private String storefrontName;


    private String storefrontAddress;

    private String storefrontNote;

    private String storefrontState;
    
    private Integer storefrontAccountId;


    @Override
    public String toString() {
        return "SysStorefront{" +
                "storefrontId=" + storefrontId +
                ", storefrontName='" + storefrontName + '\'' +
                ", storefrontAddress='" + storefrontAddress + '\'' +
                ", storefrontNote='" + storefrontNote + '\'' +
                ", storefrontState='" + storefrontState + '\'' +
                ", storefrontAccountId=" + storefrontAccountId +
                '}';
    }

    public Integer getStorefrontId() {
        return storefrontId;
    }

    public void setStorefrontId(Integer storefrontId) {
        this.storefrontId = storefrontId;
    }

    public String getStorefrontName() {
        return storefrontName;
    }

    public void setStorefrontName(String storefrontName) {
        this.storefrontName = storefrontName;
    }

    public String getStorefrontAddress() {
        return storefrontAddress;
    }

    public void setStorefrontAddress(String storefrontAddress) {
        this.storefrontAddress = storefrontAddress;
    }

    public String getStorefrontNote() {
        return storefrontNote;
    }

    public void setStorefrontNote(String storefrontNote) {
        this.storefrontNote = storefrontNote;
    }

    public String getStorefrontState() {
        return storefrontState;
    }

    public void setStorefrontState(String storefrontState) {
        this.storefrontState = storefrontState;
    }

    public Integer getStorefrontAccountId() {
        return storefrontAccountId;
    }

    public void setStorefrontAccountId(Integer storefrontAccountId) {
        this.storefrontAccountId = storefrontAccountId;
    }
}