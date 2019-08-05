package com.zz.po.journal;

public class JourTemporaryOrder {
    private Integer jtoId;

    private Integer jtoOrderId;

    private String jtoApplicant;

    private String jtoAddress;

    private String jtoRoomType;

    private Double jtoTotalHousingPrice;

    private Double jtoDayPrice;

    private Double jtoDiscount;

    private Double jtoDiscountPrice;

    private Double jtoAveragePrice;

    private String jtoRemark;

    private String jtoStatus;

    private Integer jtoTakingStatus;

    private String jtoShortInfo;

    private String jtoTime;

    private String jtoAuthorizedPerson;

    private String jtoAuthTime;

    public String getJtoAuthTime() {
        return jtoAuthTime;
    }

    public void setJtoAuthTime(String jtoAuthTime) {
        this.jtoAuthTime = jtoAuthTime;
    }

    public String getJtoAuthorizedPerson() {
        return jtoAuthorizedPerson;
    }

    public void setJtoAuthorizedPerson(String jtoAuthorizedPerson) {
        this.jtoAuthorizedPerson = jtoAuthorizedPerson;
    }

    public String getJtoTime() {
        return jtoTime;
    }

    public void setJtoTime(String jtoTime) {
        this.jtoTime = jtoTime;
    }

    public String getJtoShortInfo() {
        return jtoShortInfo;
    }

    public void setJtoShortInfo(String jtoShortInfo) {
        this.jtoShortInfo = jtoShortInfo;
    }

    public Integer getJtoId() {
        return jtoId;
    }

    public void setJtoId(Integer jtoId) {
        this.jtoId = jtoId;
    }

    public Integer getJtoOrderId() {
        return jtoOrderId;
    }

    public void setJtoOrderId(Integer jtoOrderId) {
        this.jtoOrderId = jtoOrderId;
    }

    public String getJtoApplicant() {
        return jtoApplicant;
    }

    public void setJtoApplicant(String jtoApplicant) {
        this.jtoApplicant = jtoApplicant;
    }

    public String getJtoAddress() {
        return jtoAddress;
    }

    public void setJtoAddress(String jtoAddress) {
        this.jtoAddress = jtoAddress;
    }

    public String getJtoRoomType() {
        return jtoRoomType;
    }

    public void setJtoRoomType(String jtoRoomType) {
        this.jtoRoomType = jtoRoomType;
    }

    public Double getJtoTotalHousingPrice() {
        return jtoTotalHousingPrice;
    }

    public void setJtoTotalHousingPrice(Double jtoTotalHousingPrice) {
        this.jtoTotalHousingPrice = jtoTotalHousingPrice;
    }

    public Double getJtoDayPrice() {
        return jtoDayPrice;
    }

    public void setJtoDayPrice(Double jtoDayPrice) {
        this.jtoDayPrice = jtoDayPrice;
    }

    public Double getJtoDiscount() {
        return jtoDiscount;
    }

    public void setJtoDiscount(Double jtoDiscount) {
        this.jtoDiscount = jtoDiscount;
    }

    public Double getJtoDiscountPrice() {
        return jtoDiscountPrice;
    }

    public void setJtoDiscountPrice(Double jtoDiscountPrice) {
        this.jtoDiscountPrice = jtoDiscountPrice;
    }

    public Double getJtoAveragePrice() {
        return jtoAveragePrice;
    }

    public void setJtoAveragePrice(Double jtoAveragePrice) {
        this.jtoAveragePrice = jtoAveragePrice;
    }

    public String getJtoRemark() {
        return jtoRemark;
    }

    public void setJtoRemark(String jtoRemark) {
        this.jtoRemark = jtoRemark;
    }

    public String getJtoStatus() {
        return jtoStatus;
    }

    public void setJtoStatus(String jtoStatus) {
        this.jtoStatus = jtoStatus;
    }

    public Integer getJtoTakingStatus() {
        return jtoTakingStatus;
    }

    public void setJtoTakingStatus(Integer jtoTakingStatus) {
        this.jtoTakingStatus = jtoTakingStatus;
    }

    @Override
    public String toString() {
        return "JourTemporaryOrder{" +
                "jtoId=" + jtoId +
                ", jtoOrderId=" + jtoOrderId +
                ", jtoApplicant='" + jtoApplicant + '\'' +
                ", jtoAddress='" + jtoAddress + '\'' +
                ", jtoRoomType='" + jtoRoomType + '\'' +
                ", jtoTotalHousingPrice=" + jtoTotalHousingPrice +
                ", jtoDayPrice=" + jtoDayPrice +
                ", jtoDiscount=" + jtoDiscount +
                ", jtoDiscountPrice=" + jtoDiscountPrice +
                ", jtoAveragePrice=" + jtoAveragePrice +
                ", jtoRemark=" + jtoRemark +
                ", jtoStatus='" + jtoStatus + '\'' +
                ", jtoTakingStatus='" + jtoTakingStatus + '\'' +
                '}';
    }
}