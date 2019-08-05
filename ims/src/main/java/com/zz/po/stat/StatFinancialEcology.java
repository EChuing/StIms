package com.zz.po.stat;

public class StatFinancialEcology {
    private Integer feId;

    private String feDate;

    private Integer feHsId;

    private String feHsAddCity;

    private String feHsAddDistrict;

    private String feHsAddZone;

    private String feHsAddStreet;

    private String feHsAddCommunity;

    private String feHsAddBuilding;

    private String feHsAddDoorplateno;

    private Integer feIsVacancy;

    private Double feHsVacancyCost;

    private Double feHsTransactionPrice;

    private Double feHsInPrice;

    private Double feHsOutPrice;

    private Double feLandlordDeposit;

    private Double feRenterDeposit;

    private Double feIncome;

    private Double feExpenditure;

    private Double feDifference;

    private String feEcology;
    
    private String pageNumber;
    private String startNum;
    private String endNum;
    private Integer totalNum;
    private String totalPage;
    
    private String startTime;
    
    private String endTime;
    
    private Integer totalVacancyDay;
    
    private Double totalVacancyCost;
    
    private Double totalIncome;
    
    private Double totalExpenditure;
    
    private Double totalDifference;
    
    private Integer totalHouseNum;
    
    private Double avgInPrice;
    
    private Double avgOutPrice;
    
    private Integer avgVacancyDay;
    
    private Integer minVacancyDay;
    
    private Integer maxVacancyDay;
    
    private Double avgVacancyCost;
    
    private Double minVacancyCost;
    
    private Double maxVacancyCost;
    
    private Double totalLandlordDeposit;
    
    private Double totalRenterDeposit;

    public Integer getTotalHouseNum() {
        return totalHouseNum;
    }

    public void setTotalHouseNum(Integer totalHouseNum) {
        this.totalHouseNum = totalHouseNum;
    }

    public Double getAvgInPrice() {
        return avgInPrice;
    }

    public void setAvgInPrice(Double avgInPrice) {
        this.avgInPrice = avgInPrice;
    }

    public Double getAvgOutPrice() {
        return avgOutPrice;
    }

    public void setAvgOutPrice(Double avgOutPrice) {
        this.avgOutPrice = avgOutPrice;
    }

    public Integer getAvgVacancyDay() {
        return avgVacancyDay;
    }

    public void setAvgVacancyDay(Integer avgVacancyDay) {
        this.avgVacancyDay = avgVacancyDay;
    }

    public Integer getMinVacancyDay() {
        return minVacancyDay;
    }

    public void setMinVacancyDay(Integer minVacancyDay) {
        this.minVacancyDay = minVacancyDay;
    }

    public Integer getMaxVacancyDay() {
        return maxVacancyDay;
    }

    public void setMaxVacancyDay(Integer maxVacancyDay) {
        this.maxVacancyDay = maxVacancyDay;
    }

    public Double getAvgVacancyCost() {
        return avgVacancyCost;
    }

    public void setAvgVacancyCost(Double avgVacancyCost) {
        this.avgVacancyCost = avgVacancyCost;
    }

    public Double getMinVacancyCost() {
        return minVacancyCost;
    }

    public void setMinVacancyCost(Double minVacancyCost) {
        this.minVacancyCost = minVacancyCost;
    }

    public Double getMaxVacancyCost() {
        return maxVacancyCost;
    }

    public void setMaxVacancyCost(Double maxVacancyCost) {
        this.maxVacancyCost = maxVacancyCost;
    }

    public Double getTotalLandlordDeposit() {
        return totalLandlordDeposit;
    }

    public void setTotalLandlordDeposit(Double totalLandlordDeposit) {
        this.totalLandlordDeposit = totalLandlordDeposit;
    }

    public Double getTotalRenterDeposit() {
        return totalRenterDeposit;
    }

    public void setTotalRenterDeposit(Double totalRenterDeposit) {
        this.totalRenterDeposit = totalRenterDeposit;
    }

    public Integer getTotalVacancyDay() {
        return totalVacancyDay;
    }

    public void setTotalVacancyDay(Integer totalVacancyDay) {
        this.totalVacancyDay = totalVacancyDay;
    }

    public Double getTotalVacancyCost() {
        return totalVacancyCost;
    }

    public void setTotalVacancyCost(Double totalVacancyCost) {
        this.totalVacancyCost = totalVacancyCost;
    }

    public Double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Double getTotalExpenditure() {
        return totalExpenditure;
    }

    public void setTotalExpenditure(Double totalExpenditure) {
        this.totalExpenditure = totalExpenditure;
    }

    public Double getTotalDifference() {
        return totalDifference;
    }

    public void setTotalDifference(Double totalDifference) {
        this.totalDifference = totalDifference;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getFeId() {
        return feId;
    }

    public void setFeId(Integer feId) {
        this.feId = feId;
    }

    public String getFeDate() {
        return feDate;
    }

    public void setFeDate(String feDate) {
        this.feDate = feDate == null ? null : feDate.trim();
    }

    public Integer getFeHsId() {
        return feHsId;
    }

    public void setFeHsId(Integer feHsId) {
        this.feHsId = feHsId;
    }

    public String getFeHsAddCity() {
        return feHsAddCity;
    }

    public void setFeHsAddCity(String feHsAddCity) {
        this.feHsAddCity = feHsAddCity == null ? null : feHsAddCity.trim();
    }

    public String getFeHsAddDistrict() {
        return feHsAddDistrict;
    }

    public void setFeHsAddDistrict(String feHsAddDistrict) {
        this.feHsAddDistrict = feHsAddDistrict == null ? null : feHsAddDistrict.trim();
    }

    public String getFeHsAddZone() {
        return feHsAddZone;
    }

    public void setFeHsAddZone(String feHsAddZone) {
        this.feHsAddZone = feHsAddZone == null ? null : feHsAddZone.trim();
    }

    public String getFeHsAddStreet() {
        return feHsAddStreet;
    }

    public void setFeHsAddStreet(String feHsAddStreet) {
        this.feHsAddStreet = feHsAddStreet == null ? null : feHsAddStreet.trim();
    }

    public String getFeHsAddCommunity() {
        return feHsAddCommunity;
    }

    public void setFeHsAddCommunity(String feHsAddCommunity) {
        this.feHsAddCommunity = feHsAddCommunity == null ? null : feHsAddCommunity.trim();
    }

    public String getFeHsAddBuilding() {
        return feHsAddBuilding;
    }

    public void setFeHsAddBuilding(String feHsAddBuilding) {
        this.feHsAddBuilding = feHsAddBuilding == null ? null : feHsAddBuilding.trim();
    }

    public String getFeHsAddDoorplateno() {
        return feHsAddDoorplateno;
    }

    public void setFeHsAddDoorplateno(String feHsAddDoorplateno) {
        this.feHsAddDoorplateno = feHsAddDoorplateno == null ? null : feHsAddDoorplateno.trim();
    }

    public Integer getFeIsVacancy() {
        return feIsVacancy;
    }

    public void setFeIsVacancy(Integer feIsVacancy) {
        this.feIsVacancy = feIsVacancy;
    }

    public Double getFeHsVacancyCost() {
        return feHsVacancyCost;
    }

    public void setFeHsVacancyCost(Double feHsVacancyCost) {
        this.feHsVacancyCost = feHsVacancyCost;
    }

    public Double getFeHsTransactionPrice() {
        return feHsTransactionPrice;
    }

    public void setFeHsTransactionPrice(Double feHsTransactionPrice) {
        this.feHsTransactionPrice = feHsTransactionPrice;
    }

    public Double getFeHsInPrice() {
        return feHsInPrice;
    }

    public void setFeHsInPrice(Double feHsInPrice) {
        this.feHsInPrice = feHsInPrice;
    }

    public Double getFeHsOutPrice() {
        return feHsOutPrice;
    }

    public void setFeHsOutPrice(Double feHsOutPrice) {
        this.feHsOutPrice = feHsOutPrice;
    }

    public Double getFeLandlordDeposit() {
        return feLandlordDeposit;
    }

    public void setFeLandlordDeposit(Double feLandlordDeposit) {
        this.feLandlordDeposit = feLandlordDeposit;
    }

    public Double getFeRenterDeposit() {
        return feRenterDeposit;
    }

    public void setFeRenterDeposit(Double feRenterDeposit) {
        this.feRenterDeposit = feRenterDeposit;
    }

    public Double getFeIncome() {
        return feIncome;
    }

    public void setFeIncome(Double feIncome) {
        this.feIncome = feIncome;
    }

    public Double getFeExpenditure() {
        return feExpenditure;
    }

    public void setFeExpenditure(Double feExpenditure) {
        this.feExpenditure = feExpenditure;
    }

    public Double getFeDifference() {
        return feDifference;
    }

    public void setFeDifference(Double feDifference) {
        this.feDifference = feDifference;
    }

    public String getFeEcology() {
        return feEcology;
    }

    public void setFeEcology(String feEcology) {
        this.feEcology = feEcology == null ? null : feEcology.trim();
    }

    public String getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(String pageNumber) {
        this.pageNumber = pageNumber;
    }

    public String getStartNum() {
        return startNum;
    }

    public void setStartNum(String startNum) {
        this.startNum = startNum;
    }

    public String getEndNum() {
        return endNum;
    }

    public void setEndNum(String endNum) {
        this.endNum = endNum;
    }

    public Integer getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(Integer totalNum) {
        this.totalNum = totalNum;
    }

    public String getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(String totalPage) {
        this.totalPage = totalPage;
    }
}