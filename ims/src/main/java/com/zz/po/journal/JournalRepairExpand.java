package com.zz.po.journal;

import java.util.List;

public class JournalRepairExpand extends JournalRepair {

    private String repUserName;

    private String repRepairman;

    private String renterName;

    private String renterPhone;

    private String secondContacts;

    private String secondPhone;

    private String keyAdministrator;

    private String pageNumber;
    private String totalPage;

    private String fromTime;
    private String toTime;
    private String LoginUser;
    private Integer number;

    private String att;

    private String addCity1;

    private Integer personal;
    //用于判断维保和任务类型
    private String type;
    //接收短租模块传来了批量添加维保的数据
    private String addRepairs;
    //排序方式
    private String theSortContrary;
    private String theSortTerm;

    //发送信息
    private boolean sendMsg;
    private Integer random;
    private Integer repRepairDetId;//负责人部门ID
    private Integer repRepairStoreId;//负责人区域ID

    private String searchType;
    
    private Integer repCocId;

    private List<Integer> repHsIdList;
    private Integer jsrcHsIdList;
	

	public Integer getJsrcHsIdList() {
		return jsrcHsIdList;
	}

	public void setJsrcHsIdList(Integer jsrcHsIdList) {
		this.jsrcHsIdList = jsrcHsIdList;
	}

	public List<Integer> getRepHsIdList() {
		return repHsIdList;
	}

	public void setRepHsIdList(List<Integer> list) {
		this.repHsIdList = list;
	}

	public Integer getRepCocId() {
		return repCocId;
	}

	public void setRepCocId(Integer repCocId) {
		this.repCocId = repCocId;
	}

	public Integer getRepRepairStoreId() {
        return repRepairStoreId;
    }

    public void setRepRepairStoreId(Integer repRepairStoreId) {
        this.repRepairStoreId = repRepairStoreId;
    }

    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
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

    public String getAddRepairs() {
        return addRepairs;
    }

    public void setAddRepairs(String addRepairs) {
        this.addRepairs = addRepairs;
    }

    public Integer getPersonal() {
        return personal;
    }

    public void setPersonal(Integer personal) {
        this.personal = personal;
    }

    public String getAddCity1() {
        return addCity1;
    }

    public void setAddCity1(String addCity1) {
        this.addCity1 = addCity1;
    }

    public String getAtt() {
        return att;
    }

    public void setAtt(String att) {
        this.att = att;
    }

    public String getKeyAdministrator() {
        return keyAdministrator;
    }

    public void setKeyAdministrator(String keyAdministrator) {
        this.keyAdministrator = keyAdministrator;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getLoginUser() {
        return LoginUser;
    }

    public void setLoginUser(String loginUser) {
        LoginUser = loginUser;
    }

    public String getFromTime() {
        return fromTime;
    }

    public void setFromTime(String fromTime) {
        this.fromTime = fromTime;
    }

    public String getToTime() {
        return toTime;
    }

    public void setToTime(String toTime) {
        this.toTime = toTime;
    }

    public String getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(String pageNumber) {
        this.pageNumber = pageNumber;
    }

    public String getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(String totalPage) {
        this.totalPage = totalPage;
    }

    public String getRepUserName() {
        return repUserName;
    }

    public void setRepUserName(String repUserName) {
        this.repUserName = repUserName;
    }

    public String getRepRepairman() {
        return repRepairman;
    }

    public void setRepRepairman(String repRepairman) {
        this.repRepairman = repRepairman;
    }

    public String getRenterName() {
        return renterName;
    }

    public void setRenterName(String renterName) {
        this.renterName = renterName;
    }

    public String getRenterPhone() {
        return renterPhone;
    }

    public void setRenterPhone(String renterPhone) {
        this.renterPhone = renterPhone;
    }

    public String getSecondContacts() {
        return secondContacts;
    }

    public void setSecondContacts(String secondContacts) {
        this.secondContacts = secondContacts;
    }

    public String getSecondPhone() {
        return secondPhone;
    }

    public void setSecondPhone(String secondPhone) {
        this.secondPhone = secondPhone;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public boolean isSendMsg() {
        return sendMsg;
    }

    public void setSendMsg(boolean sendMsg) {
        this.sendMsg = sendMsg;
    }

    public Integer getRandom() {
        return random;
    }

    public void setRandom(Integer random) {
        this.random = random;
    }

    public Integer getRepRepairDetId() {
        return repRepairDetId;
    }

    public void setRepRepairDetId(Integer repRepairDetId) {
        this.repRepairDetId = repRepairDetId;
    }

    @Override
	public String toString() {
		return "JournalRepairExpand [repUserName=" + repUserName + ", repRepairman=" + repRepairman + ", renterName="
				+ renterName + ", renterPhone=" + renterPhone + ", secondContacts=" + secondContacts + ", secondPhone="
				+ secondPhone + ", keyAdministrator=" + keyAdministrator + ", pageNumber=" + pageNumber + ", totalPage="
				+ totalPage + ", fromTime=" + fromTime + ", toTime=" + toTime + ", LoginUser=" + LoginUser + ", number="
				+ number + ", att=" + att + ", addCity1=" + addCity1 + ", personal=" + personal + ", type=" + type
				+ ", addRepairs=" + addRepairs + ", theSortContrary=" + theSortContrary + ", theSortTerm=" + theSortTerm
				+ ", sendMsg=" + sendMsg + ", random=" + random + ", repRepairDetId=" + repRepairDetId
				+ ", repRepairStoreId=" + repRepairStoreId + ", searchType=" + searchType + ", repCocId=" + repCocId
				+ ", repHsIdList=" + repHsIdList + ", jsrcHsIdList=" + jsrcHsIdList + "]";
	}
}