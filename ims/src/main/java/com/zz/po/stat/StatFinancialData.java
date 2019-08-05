package com.zz.po.stat;

/**
 * 房屋财务数据表
 */
public class StatFinancialData {
    private Integer fdId;

    private String fdDate;

    private Integer fdOfficeId;

    private String fdOfficeName;

    private Integer fdDeptId;

    private String fdDeptName;

    private Integer fdEmpId;

    private String fdEmpName;

    private Integer fdHsId;

    private String fdAddCommunity;

    private String fdAddBuilding;

    private String fdAddDoorplateno;

    private String fdSplitIdentifier;

    private Double fdInPrice;

    private Double fdTransactionPrice;

    private Double fdDifference;

    private Double fdRentLossValue;

    private Double fdRentLossRate;

    private Integer fdVacantDay;

    private Integer fdTrustDay;

    private Double fdVacantRate;

    private Double fdForecastIncome;

    private Double fdRealIncome;

    private Double fdCost;
    
    private Integer year;
    
    private Integer month;

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getFdId() {
        return fdId;
    }

    public void setFdId(Integer fdId) {
        this.fdId = fdId;
    }

    public String getFdDate() {
        return fdDate;
    }

    public void setFdDate(String fdDate) {
        this.fdDate = fdDate == null ? null : fdDate.trim();
    }

    public Integer getFdOfficeId() {
        return fdOfficeId;
    }

    public void setFdOfficeId(Integer fdOfficeId) {
        this.fdOfficeId = fdOfficeId;
    }

    public String getFdOfficeName() {
        return fdOfficeName;
    }

    public void setFdOfficeName(String fdOfficeName) {
        this.fdOfficeName = fdOfficeName == null ? null : fdOfficeName.trim();
    }

    public Integer getFdDeptId() {
        return fdDeptId;
    }

    public void setFdDeptId(Integer fdDeptId) {
        this.fdDeptId = fdDeptId;
    }

    public String getFdDeptName() {
        return fdDeptName;
    }

    public void setFdDeptName(String fdDeptName) {
        this.fdDeptName = fdDeptName == null ? null : fdDeptName.trim();
    }

    public Integer getFdEmpId() {
        return fdEmpId;
    }

    public void setFdEmpId(Integer fdEmpId) {
        this.fdEmpId = fdEmpId;
    }

    public String getFdEmpName() {
        return fdEmpName;
    }

    public void setFdEmpName(String fdEmpName) {
        this.fdEmpName = fdEmpName == null ? null : fdEmpName.trim();
    }

    public Integer getFdHsId() {
        return fdHsId;
    }

    public void setFdHsId(Integer fdHsId) {
        this.fdHsId = fdHsId;
    }

    public String getFdAddCommunity() {
        return fdAddCommunity;
    }

    public void setFdAddCommunity(String fdAddCommunity) {
        this.fdAddCommunity = fdAddCommunity == null ? null : fdAddCommunity.trim();
    }

    public String getFdAddBuilding() {
        return fdAddBuilding;
    }

    public void setFdAddBuilding(String fdAddBuilding) {
        this.fdAddBuilding = fdAddBuilding == null ? null : fdAddBuilding.trim();
    }

    public String getFdAddDoorplateno() {
        return fdAddDoorplateno;
    }

    public void setFdAddDoorplateno(String fdAddDoorplateno) {
        this.fdAddDoorplateno = fdAddDoorplateno == null ? null : fdAddDoorplateno.trim();
    }

    public String getFdSplitIdentifier() {
        return fdSplitIdentifier;
    }

    public void setFdSplitIdentifier(String fdSplitIdentifier) {
        this.fdSplitIdentifier = fdSplitIdentifier == null ? null : fdSplitIdentifier.trim();
    }

    public Double getFdInPrice() {
        return fdInPrice;
    }

    public void setFdInPrice(Double fdInPrice) {
        this.fdInPrice = fdInPrice;
    }

    public Double getFdTransactionPrice() {
        return fdTransactionPrice;
    }

    public void setFdTransactionPrice(Double fdTransactionPrice) {
        this.fdTransactionPrice = fdTransactionPrice;
    }

    public Double getFdDifference() {
        return fdDifference;
    }

    public void setFdDifference(Double fdDifference) {
        this.fdDifference = fdDifference;
    }

    public Double getFdRentLossValue() {
        return fdRentLossValue;
    }

    public void setFdRentLossValue(Double fdRentLossValue) {
        this.fdRentLossValue = fdRentLossValue;
    }

    public Double getFdRentLossRate() {
        return fdRentLossRate;
    }

    public void setFdRentLossRate(Double fdRentLossRate) {
        this.fdRentLossRate = fdRentLossRate;
    }

    public Integer getFdVacantDay() {
        return fdVacantDay;
    }

    public void setFdVacantDay(Integer fdVacantDay) {
        this.fdVacantDay = fdVacantDay;
    }

    public Integer getFdTrustDay() {
        return fdTrustDay;
    }

    public void setFdTrustDay(Integer fdTrustDay) {
        this.fdTrustDay = fdTrustDay;
    }

    public Double getFdVacantRate() {
        return fdVacantRate;
    }

    public void setFdVacantRate(Double fdVacantRate) {
        this.fdVacantRate = fdVacantRate;
    }

    public Double getFdForecastIncome() {
        return fdForecastIncome;
    }

    public void setFdForecastIncome(Double fdForecastIncome) {
        this.fdForecastIncome = fdForecastIncome;
    }

    public Double getFdRealIncome() {
        return fdRealIncome;
    }

    public void setFdRealIncome(Double fdRealIncome) {
        this.fdRealIncome = fdRealIncome;
    }

    public Double getFdCost() {
        return fdCost;
    }

    public void setFdCost(Double fdCost) {
        this.fdCost = fdCost;
    }
}