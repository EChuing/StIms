package com.zz.po.cs;

public class CsAccountReceipt {
	private Integer csUsersId;//用户ID
	private String csAccountName;//户名
	private String csBank;//银行
	private String csAccountUmber;//账号
	
	private String startNum;
	private String splitFlag;
	private String endNum;
	
	private String csSubordinateBranch;
	private String csAccountDescription;
	
	public String getCsSubordinateBranch() {
		return csSubordinateBranch;
	}
	public void setCsSubordinateBranch(String csSubordinateBranch) {
		this.csSubordinateBranch = csSubordinateBranch;
	}
	public String getCsAccountDescription() {
		return csAccountDescription;
	}
	public void setCsAccountDescription(String csAccountDescription) {
		this.csAccountDescription = csAccountDescription;
	}
	public String getStartNum() {
		return startNum;
	}
	public void setStartNum(String startNum) {
		this.startNum = startNum;
	}
	public String getSplitFlag() {
		return splitFlag;
	}
	public void setSplitFlag(String splitFlag) {
		this.splitFlag = splitFlag;
	}
	public String getEndNum() {
		return endNum;
	}
	public void setEndNum(String endNum) {
		this.endNum = endNum;
	}
	public Integer getCsUsersId() {
		return csUsersId;
	}
	public void setCsUsersId(Integer csUsersId) {
		this.csUsersId = csUsersId;
	}
	
	public String getCsAccountName() {
		return csAccountName;
	}
	public void setCsAccountName(String csAccountName) {
		this.csAccountName = csAccountName;
	}
	public String getCsBank() {
		return csBank;
	}
	public void setCsBank(String csBank) {
		this.csBank = csBank;
	}
	public String getCsAccountUmber() {
		return csAccountUmber;
	}
	public void setCsAccountUmber(String csAccountUmber) {
		this.csAccountUmber = csAccountUmber;
	}
	@Override
	public String toString() {
		return "CsAccountReceipt [csUsersId=" + csUsersId + ", csAccountName=" + csAccountName + ", csBank=" + csBank
				+ ", csAccountUmber=" + csAccountUmber + "]";
	}
}
