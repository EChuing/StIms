package com.zz.po.journal;

/**
 * 房源价格统计表
 */
public class DashHousePrice {
    private Integer dhpId;

    private String dhpStoreJson;

    private String dhpStorePrice;

    private String dhpRentJson;

    private String dhpRentPrice;

    private String dhpTime;

    public Integer getDhpId() {
        return dhpId;
    }

    public void setDhpId(Integer dhpId) {
        this.dhpId = dhpId;
    }

    public String getDhpStoreJson() {
        return dhpStoreJson;
    }

    public void setDhpStoreJson(String dhpStoreJson) {
        this.dhpStoreJson = dhpStoreJson == null ? null : dhpStoreJson.trim();
    }

    public String getDhpStorePrice() {
        return dhpStorePrice;
    }

    public void setDhpStorePrice(String dhpStorePrice) {
        this.dhpStorePrice = dhpStorePrice == null ? null : dhpStorePrice.trim();
    }

    public String getDhpRentJson() {
        return dhpRentJson;
    }

    public void setDhpRentJson(String dhpRentJson) {
        this.dhpRentJson = dhpRentJson == null ? null : dhpRentJson.trim();
    }

    public String getDhpRentPrice() {
        return dhpRentPrice;
    }

    public void setDhpRentPrice(String dhpRentPrice) {
        this.dhpRentPrice = dhpRentPrice == null ? null : dhpRentPrice.trim();
    }

    public String getDhpTime() {
        return dhpTime;
    }

    public void setDhpTime(String dhpTime) {
        this.dhpTime = dhpTime == null ? null : dhpTime.trim();
    }
}