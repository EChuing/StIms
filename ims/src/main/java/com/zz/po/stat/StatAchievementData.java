package com.zz.po.stat;

/**
 * 用户绩效数据表
 */
public class StatAchievementData {
    private Integer adId;

    private String adDate;

    private Integer adOfficeId;

    private String adOfficeName;

    private Integer adDeptId;

    private String adDeptName;

    private Integer adEmpId;

    private String adEmpName;

    private Integer adHsNum;

    private Double adCost;

    private Double adForecastIncome;

    private Double adForecastDifference;

    private Double adRealIncome;

    private Double adRealDifference;

    private Double adRentLossValue;

    private Double adRentLossRate;

    private Integer adVacantDay;

    private Integer adTrustDay;

    private Double adVacantRate;
    
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

    public Integer getAdId() {
        return adId;
    }

    public void setAdId(Integer adId) {
        this.adId = adId;
    }

    public String getAdDate() {
        return adDate;
    }

    public void setAdDate(String adDate) {
        this.adDate = adDate == null ? null : adDate.trim();
    }

    public Integer getAdOfficeId() {
        return adOfficeId;
    }

    public void setAdOfficeId(Integer adOfficeId) {
        this.adOfficeId = adOfficeId;
    }

    public String getAdOfficeName() {
        return adOfficeName;
    }

    public void setAdOfficeName(String adOfficeName) {
        this.adOfficeName = adOfficeName == null ? null : adOfficeName.trim();
    }

    public Integer getAdDeptId() {
        return adDeptId;
    }

    public void setAdDeptId(Integer adDeptId) {
        this.adDeptId = adDeptId;
    }

    public String getAdDeptName() {
        return adDeptName;
    }

    public void setAdDeptName(String adDeptName) {
        this.adDeptName = adDeptName == null ? null : adDeptName.trim();
    }

    public Integer getAdEmpId() {
        return adEmpId;
    }

    public void setAdEmpId(Integer adEmpId) {
        this.adEmpId = adEmpId;
    }

    public String getAdEmpName() {
        return adEmpName;
    }

    public void setAdEmpName(String adEmpName) {
        this.adEmpName = adEmpName == null ? null : adEmpName.trim();
    }

    public Integer getAdHsNum() {
        return adHsNum;
    }

    public void setAdHsNum(Integer adHsNum) {
        this.adHsNum = adHsNum;
    }

    public Double getAdCost() {
        return adCost;
    }

    public void setAdCost(Double adCost) {
        this.adCost = adCost;
    }

    public Double getAdForecastIncome() {
        return adForecastIncome;
    }

    public void setAdForecastIncome(Double adForecastIncome) {
        this.adForecastIncome = adForecastIncome;
    }

    public Double getAdForecastDifference() {
        return adForecastDifference;
    }

    public void setAdForecastDifference(Double adForecastDifference) {
        this.adForecastDifference = adForecastDifference;
    }

    public Double getAdRealIncome() {
        return adRealIncome;
    }

    public void setAdRealIncome(Double adRealIncome) {
        this.adRealIncome = adRealIncome;
    }

    public Double getAdRealDifference() {
        return adRealDifference;
    }

    public void setAdRealDifference(Double adRealDifference) {
        this.adRealDifference = adRealDifference;
    }

    public Double getAdRentLossValue() {
        return adRentLossValue;
    }

    public void setAdRentLossValue(Double adRentLossValue) {
        this.adRentLossValue = adRentLossValue;
    }

    public Double getAdRentLossRate() {
        return adRentLossRate;
    }

    public void setAdRentLossRate(Double adRentLossRate) {
        this.adRentLossRate = adRentLossRate;
    }

    public Integer getAdVacantDay() {
        return adVacantDay;
    }

    public void setAdVacantDay(Integer adVacantDay) {
        this.adVacantDay = adVacantDay;
    }

    public Integer getAdTrustDay() {
        return adTrustDay;
    }

    public void setAdTrustDay(Integer adTrustDay) {
        this.adTrustDay = adTrustDay;
    }

    public Double getAdVacantRate() {
        return adVacantRate;
    }

    public void setAdVacantRate(Double adVacantRate) {
        this.adVacantRate = adVacantRate;
    }
}