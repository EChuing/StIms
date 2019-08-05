package com.zz.po.journal;

public class JourEarnestMoneyExpand extends JourEarnestMoney {
    private Integer startNum;
    private Integer endNum;
    private String jemJson;
    private Integer splitFlag;
    private Integer theSortTerm;
    private Integer theSortContrary;
    private Integer totalNum;
    private Integer type;

    //未租
    private Integer hsId;
    private String hsDownDeposit  ;
    private Double hsDepositAmount  ;
    private Integer hsIntentionalId;
    private Integer hsPopId;
    private Integer hsSalesmanId;
    private Integer hsDespositAccount;
    private String hsStartDate;
    private String hsEndDate;

    public Integer getStartNum() {
        return startNum;
    }

    public void setStartNum(Integer startNum) {
        this.startNum = startNum;
    }

    public Integer getEndNum() {
        return endNum;
    }

    public void setEndNum(Integer endNum) {
        this.endNum = endNum;
    }

    public String getJemJson() {
        return jemJson;
    }

    public void setJemJson(String jemJson) {
        this.jemJson = jemJson;
    }

    public Integer getSplitFlag() {
        return splitFlag;
    }

    public void setSplitFlag(Integer splitFlag) {
        this.splitFlag = splitFlag;
    }

    public Integer getTheSortTerm() {
        return theSortTerm;
    }

    public void setTheSortTerm(Integer theSortTerm) {
        this.theSortTerm = theSortTerm;
    }

    public Integer getTheSortContrary() {
        return theSortContrary;
    }

    public void setTheSortContrary(Integer theSortContrary) {
        this.theSortContrary = theSortContrary;
    }

    public Integer getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(Integer totalNum) {
        this.totalNum = totalNum;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getHsId() {
        return hsId;
    }

    public void setHsId(Integer hsId) {
        this.hsId = hsId;
    }

    public String getHsDownDeposit() {
        return hsDownDeposit;
    }

    public void setHsDownDeposit(String hsDownDeposit) {
        this.hsDownDeposit = hsDownDeposit;
    }

    public Double getHsDepositAmount() {
        return hsDepositAmount;
    }

    public void setHsDepositAmount(Double hsDepositAmount) {
        this.hsDepositAmount = hsDepositAmount;
    }

    public Integer getHsIntentionalId() {
        return hsIntentionalId;
    }

    public void setHsIntentionalId(Integer hsIntentionalId) {
        this.hsIntentionalId = hsIntentionalId;
    }

    public Integer getHsPopId() {
        return hsPopId;
    }

    public void setHsPopId(Integer hsPopId) {
        this.hsPopId = hsPopId;
    }

    public Integer getHsSalesmanId() {
        return hsSalesmanId;
    }

    public void setHsSalesmanId(Integer hsSalesmanId) {
        this.hsSalesmanId = hsSalesmanId;
    }

    public Integer getHsDespositAccount() {
        return hsDespositAccount;
    }

    public void setHsDespositAccount(Integer hsDespositAccount) {
        this.hsDespositAccount = hsDespositAccount;
    }

    public String getHsStartDate() {
        return hsStartDate;
    }

    public void setHsStartDate(String hsStartDate) {
        this.hsStartDate = hsStartDate;
    }

    public String getHsEndDate() {
        return hsEndDate;
    }

    public void setHsEndDate(String hsEndDate) {
        this.hsEndDate = hsEndDate;
    }

    @Override
    public String toString() {
        return "JourEarnestMoneyExpand{" +
                "startNum=" + startNum +
                ", endNum=" + endNum +
                ", jemJson='" + jemJson + '\'' +
                ", splitFlag=" + splitFlag +
                ", theSortTerm=" + theSortTerm +
                ", theSortContrary=" + theSortContrary +
                ", totalNum=" + totalNum +
                ", type=" + type +
                '}';
    }
}
