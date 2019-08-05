package com.zz.po.stat;

public class StatFinancialDailyData {
    private Integer fddId;

    private String fddDate;

    private Double fddIncome;

    private Double fddExpenditure;

    private Double fddDifference;

    private String fddDetail;
    
    private String pageNumber;
    private String startNum;
    private String endNum;
    private Integer totalNum;
    private String totalPage;
    
    private String startTime;
    
    private String endTime;

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

    public Integer getFddId() {
        return fddId;
    }

    public void setFddId(Integer fddId) {
        this.fddId = fddId;
    }

    public String getFddDate() {
        return fddDate;
    }

    public void setFddDate(String fddDate) {
        this.fddDate = fddDate == null ? null : fddDate.trim();
    }

    public Double getFddIncome() {
        return fddIncome;
    }

    public void setFddIncome(Double fddIncome) {
        this.fddIncome = fddIncome;
    }

    public Double getFddExpenditure() {
        return fddExpenditure;
    }

    public void setFddExpenditure(Double fddExpenditure) {
        this.fddExpenditure = fddExpenditure;
    }

    public Double getFddDifference() {
        return fddDifference;
    }

    public void setFddDifference(Double fddDifference) {
        this.fddDifference = fddDifference;
    }

    public String getFddDetail() {
        return fddDetail;
    }

    public void setFddDetail(String fddDetail) {
        this.fddDetail = fddDetail == null ? null : fddDetail.trim();
    }
}