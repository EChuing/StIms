package com.zz.po.journal;

import java.util.Arrays;

public class JournalFinancialExpand extends JournalFinancial{
	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private Double totalMoney;
	private String totalPage;
	private String theSortTerm;
	private String theSortContrary;
	private String startTime;
	private String endTime;
	private String jsonArray;

	private String reviewOneName;
	private String handlersName;
	private String cashierPeopleName;
	private String personChargeAccountName;
	private String reviewerName;
	private String reviewPerson;
	private String managerUserName;

	private String addProvince;
	private String addCity;
	private String addDistrict;
	private String addZone;
	private String addStreet;
	private String addCommunity;
	private String addBuilding;
	private String addDoorplateno;

	private Double total;
	private Integer moneynumber;

	private Integer jmarId;
	private Integer jciId;
	private Integer repId;
	
	private Integer jcuId;
	private String jcuType;
	private String jcuGroupType;
	private Integer jppId;
	private String jppPlanName;
	
	private String jfOrderNum;
	private String wxpayBody;
    private String authCode;
    private Integer payType;
    
	public String getJfOrderNum() {
		return jfOrderNum;
	}
	public void setJfOrderNum(String jfOrderNum) {
		this.jfOrderNum = jfOrderNum;
	}
	public Integer getPayType() {
		return payType;
	}
	public void setPayType(Integer payType) {
		this.payType = payType;
	}
	public String getWxpayBody() {
		return wxpayBody;
	}
	public void setWxpayBody(String wxpayBody) {
		this.wxpayBody = wxpayBody;
	}
	public String getAuthCode() {
		return authCode;
	}
	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}
	public Integer getJppId() {
		return jppId;
	}
	public void setJppId(Integer jppId) {
		this.jppId = jppId;
	}
	public String getJppPlanName() {
		return jppPlanName;
	}
	public void setJppPlanName(String jppPlanName) {
		this.jppPlanName = jppPlanName;
	}
	private String keyAdministrator;

	private int[] hpIds;

	private String faBelonging;
	
	private Integer isBatchClearCredit;// 1为批量结算挂账

	public Integer getJcuId() {
		return jcuId;
	}
	public void setJcuId(Integer jcuId) {
		this.jcuId = jcuId;
	}
	public String getJcuType() {
		return jcuType;
	}
	public void setJcuType(String jcuType) {
		this.jcuType = jcuType;
	}
	public String getJcuGroupType() {
		return jcuGroupType;
	}
	public void setJcuGroupType(String jcuGroupType) {
		this.jcuGroupType = jcuGroupType;
	}
	public Integer getIsBatchClearCredit() {
		return isBatchClearCredit;
	}
	public void setIsBatchClearCredit(Integer isBatchClearCredit) {
		this.isBatchClearCredit = isBatchClearCredit;
	}
	public String getManagerUserName() {
		return managerUserName;
	}
	public void setManagerUserName(String managerUserName) {
		this.managerUserName = managerUserName;
	}
	public String getFaBelonging() {
		return faBelonging;
	}
	public void setFaBelonging(String faBelonging) {
		this.faBelonging = faBelonging;
	}
	public int[] getHpIds() {
		return hpIds;
	}
	public void setHpIds(int[] hpIds) {
		this.hpIds = hpIds;
	}
	public String getKeyAdministrator() {
		return keyAdministrator;
	}
	public void setKeyAdministrator(String keyAdministrator) {
		this.keyAdministrator = keyAdministrator;
	}
	public Double getTotalMoney() {
		return totalMoney;
	}
	public void setTotalMoney(Double totalMoney) {
		this.totalMoney = totalMoney;
	}
	public String getTheSortTerm() {
		return theSortTerm;
	}
	public void setTheSortTerm(String theSortTerm) {
		this.theSortTerm = theSortTerm;
	}
	public String getTheSortContrary() {
		return theSortContrary;
	}
	public void setTheSortContrary(String theSortContrary) {
		this.theSortContrary = theSortContrary;
	}
	public Integer getRepId() {
		return repId;
	}
	public void setRepId(Integer repId) {
		this.repId = repId;
	}
	public Integer getJmarId() {
		return jmarId;
	}
	public void setJmarId(Integer jmarId) {
		this.jmarId = jmarId;
	}
	public Integer getJciId() {
		return jciId;
	}
	public void setJciId(Integer jciId) {
		this.jciId = jciId;
	}
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}

	public Integer getMoneynumber() {
		return moneynumber;
	}
	public void setMoneynumber(Integer moneynumber) {
		this.moneynumber = moneynumber;
	}
	public String getAddProvince() {
		return addProvince;
	}
	public void setAddProvince(String addProvince) {
		this.addProvince = addProvince;
	}
	public String getAddCity() {
		return addCity;
	}
	public void setAddCity(String addCity) {
		this.addCity = addCity;
	}
	public String getAddDistrict() {
		return addDistrict;
	}
	public void setAddDistrict(String addDistrict) {
		this.addDistrict = addDistrict;
	}
	public String getAddZone() {
		return addZone;
	}
	public void setAddZone(String addZone) {
		this.addZone = addZone;
	}
	public String getAddStreet() {
		return addStreet;
	}
	public void setAddStreet(String addStreet) {
		this.addStreet = addStreet;
	}
	public String getAddCommunity() {
		return addCommunity;
	}
	public void setAddCommunity(String addCommunity) {
		this.addCommunity = addCommunity;
	}
	public String getAddBuilding() {
		return addBuilding;
	}
	public void setAddBuilding(String addBuilding) {
		this.addBuilding = addBuilding;
	}
	public String getAddDoorplateno() {
		return addDoorplateno;
	}
	public void setAddDoorplateno(String addDoorplateno) {
		this.addDoorplateno = addDoorplateno;
	}
	public String getReviewOneName() {
		return reviewOneName;
	}
	public void setReviewOneName(String reviewOneName) {
		this.reviewOneName = reviewOneName;
	}
	public String getHandlersName() {
		return handlersName;
	}
	public void setHandlersName(String handlersName) {
		this.handlersName = handlersName;
	}
	public String getCashierPeopleName() {
		return cashierPeopleName;
	}
	public void setCashierPeopleName(String cashierPeopleName) {
		this.cashierPeopleName = cashierPeopleName;
	}
	public String getPersonChargeAccountName() {
		return personChargeAccountName;
	}
	public void setPersonChargeAccountName(String personChargeAccountName) {
		this.personChargeAccountName = personChargeAccountName;
	}
	public String getReviewerName() {
		return reviewerName;
	}
	public void setReviewerName(String reviewerName) {
		this.reviewerName = reviewerName;
	}

	public String getReviewPerson() {
		return reviewPerson;
	}
	public void setReviewPerson(String reviewPerson) {
		this.reviewPerson = reviewPerson;
	}
	public String getJsonArray() {
		return jsonArray;
	}
	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
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
	public String getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(String totalNum) {
		this.totalNum = totalNum;
	}
	public String getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(String totalPage) {
		this.totalPage = totalPage;
	}
	@Override
	public String toString() {
		return "JournalFinancialExpand [pageNumber=" + pageNumber + ", startNum=" + startNum + ", endNum=" + endNum
				+ ", totalNum=" + totalNum + ", totalMoney=" + totalMoney + ", totalPage=" + totalPage
				+ ", theSortTerm=" + theSortTerm + ", theSortContrary=" + theSortContrary + ", startTime=" + startTime
				+ ", endTime=" + endTime + ", jsonArray=" + jsonArray + ", reviewOneName=" + reviewOneName
				+ ", handlersName=" + handlersName + ", cashierPeopleName=" + cashierPeopleName
				+ ", personChargeAccountName=" + personChargeAccountName + ", reviewerName=" + reviewerName
				+ ", reviewPerson=" + reviewPerson + ", managerUserName=" + managerUserName + ", addProvince="
				+ addProvince + ", addCity=" + addCity + ", addDistrict=" + addDistrict + ", addZone=" + addZone
				+ ", addStreet=" + addStreet + ", addCommunity=" + addCommunity + ", addBuilding=" + addBuilding
				+ ", addDoorplateno=" + addDoorplateno + ", total=" + total + ", moneynumber=" + moneynumber
				+ ", jmarId=" + jmarId + ", jciId=" + jciId + ", repId=" + repId + ", jcuId=" + jcuId + ", jcuType="
				+ jcuType + ", jcuGroupType=" + jcuGroupType + ", jppId=" + jppId + ", jppPlanName=" + jppPlanName
				+ ", jfOrderNum=" + jfOrderNum + ", wxpayBody=" + wxpayBody + ", authCode=" + authCode + ", payType="
				+ payType + ", keyAdministrator=" + keyAdministrator + ", hpIds=" + Arrays.toString(hpIds)
				+ ", faBelonging=" + faBelonging + ", isBatchClearCredit=" + isBatchClearCredit + "]";
	}

}