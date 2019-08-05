package com.zz.po.journal;

/**
 * 到期分布
 */
public class DashRentCheckout {

    private Integer drcId;
    
    private String drcMonthlyNum;
    
    private String drcMonthlyMoney;
    
    private String drcGmtCreate;
    
    private String drcGmtModified;

    public Integer getDrcId() {
        return drcId;
    }

    public void setDrcId(Integer drcId) {
        this.drcId = drcId;
    }

    public String getDrcMonthlyNum() {
        return drcMonthlyNum;
    }

    public void setDrcMonthlyNum(String drcMonthlyNum) {
        this.drcMonthlyNum = drcMonthlyNum;
    }

    public String getDrcMonthlyMoney() {
        return drcMonthlyMoney;
    }

    public void setDrcMonthlyMoney(String drcMonthlyMoney) {
        this.drcMonthlyMoney = drcMonthlyMoney;
    }

    public String getDrcGmtCreate() {
        return drcGmtCreate;
    }

    public void setDrcGmtCreate(String drcGmtCreate) {
        this.drcGmtCreate = drcGmtCreate;
    }

    public String getDrcGmtModified() {
        return drcGmtModified;
    }

    public void setDrcGmtModified(String drcGmtModified) {
        this.drcGmtModified = drcGmtModified;
    }
}
