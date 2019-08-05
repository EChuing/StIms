package com.zz.po.journal;

public class JournalElectronicContractExpansion extends JournalElectronicContract{
	private String zqid;

	private String no;

	private String user_code;

	private String sign_type;

	private String notify_url;

	private String return_url;

	private String sign_val;

	private String code;

	private String msg;

	private String wxKey;

	private String co;
	
	private Integer startNum;

	private Integer endNum;

	private String addCommunity;

	private String addBuilding;

	private String addDoorplateno;

	private Integer splitFlag;
	
	private boolean idcardType;
	
	private String operatingName;
	
	private Integer totalNum;
	//租客信息
	private String popIdcard;

	private String popName;

	private String PopTelephone;

	private Integer PopUser;

	private String PopNameRemark;

	private String PopPassword;

	private String PopIdcardJson;

	private String PopBirth;

	private String PopNation;

	private String PopIdcardAddress;

	private String PopSex;

	private Integer renterUserId;

	private Integer renterStorefront;

	private Integer renterDepartment;

	public Integer getRenterUserId() {
		return renterUserId;
	}

	public void setRenterUserId(Integer renterUserId) {
		this.renterUserId = renterUserId;
	}

	public Integer getRenterStorefront() {
		return renterStorefront;
	}

	public void setRenterStorefront(Integer renterStorefront) {
		this.renterStorefront = renterStorefront;
	}

	public Integer getRenterDepartment() {
		return renterDepartment;
	}

	public void setRenterDepartment(Integer renterDepartment) {
		this.renterDepartment = renterDepartment;
	}

	public String getPopName() {
		return popName;
	}

	public void setPopName(String popName) {
		this.popName = popName;
	}

	public String getPopTelephone() {
		return PopTelephone;
	}

	public void setPopTelephone(String popTelephone) {
		PopTelephone = popTelephone;
	}

	public Integer getPopUser() {
		return PopUser;
	}

	public void setPopUser(Integer popUser) {
		PopUser = popUser;
	}

	public String getPopNameRemark() {
		return PopNameRemark;
	}

	public void setPopNameRemark(String popNameRemark) {
		PopNameRemark = popNameRemark;
	}

	public String getPopPassword() {
		return PopPassword;
	}

	public void setPopPassword(String popPassword) {
		PopPassword = popPassword;
	}

	public String getPopIdcardJson() {
		return PopIdcardJson;
	}

	public void setPopIdcardJson(String popIdcardJson) {
		PopIdcardJson = popIdcardJson;
	}

	public String getPopBirth() {
		return PopBirth;
	}

	public void setPopBirth(String popBirth) {
		PopBirth = popBirth;
	}

	public String getPopNation() {
		return PopNation;
	}

	public void setPopNation(String popNation) {
		PopNation = popNation;
	}

	public String getPopIdcardAddress() {
		return PopIdcardAddress;
	}

	public void setPopIdcardAddress(String popIdcardAddress) {
		PopIdcardAddress = popIdcardAddress;
	}

	public String getPopSex() {
		return PopSex;
	}

	public void setPopSex(String popSex) {
		PopSex = popSex;
	}

	public String getPopIdcard() {
		return popIdcard;
	}

	public void setPopIdcard(String popIdcard) {
		this.popIdcard = popIdcard;
	}

	public boolean isIdcardType() {
		return idcardType;
	}
	public void setIdcardType(boolean idcardType) {
		this.idcardType = idcardType;
	}
	public String getOperatingName() {
		return operatingName;
	}
	public void setOperatingName(String operatingName) {
		this.operatingName = operatingName;
	}
	public Integer getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(Integer totalNum) {
		this.totalNum = totalNum;
	}
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
	public Integer getSplitFlag() {
		return splitFlag;
	}
	public void setSplitFlag(Integer splitFlag) {
		this.splitFlag = splitFlag;
	}
	public String getCo() {
		return co;
	}
	public void setCo(String co) {
		this.co = co;
	}
	public String getWxKey() {
		return wxKey;
	}
	public void setWxKey(String wxKey) {
		this.wxKey = wxKey;
	}
	public String getZqid() {
		return zqid;
	}
	public void setZqid(String zqid) {
		this.zqid = zqid;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getUser_code() {
		return user_code;
	}
	public void setUser_code(String user_code) {
		this.user_code = user_code;
	}
	public String getSign_type() {
		return sign_type;
	}
	public void setSign_type(String sign_type) {
		this.sign_type = sign_type;
	}
	public String getNotify_url() {
		return notify_url;
	}
	public void setNotify_url(String notify_url) {
		this.notify_url = notify_url;
	}
	public String getReturn_url() {
		return return_url;
	}
	public void setReturn_url(String return_url) {
		this.return_url = return_url;
	}
	public String getSign_val() {
		return sign_val;
	}
	public void setSign_val(String sign_val) {
		this.sign_val = sign_val;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}

	@Override
	public String toString() {
		return "JournalElectronicContractExpansion{" +
				"zqid='" + zqid + '\'' +
				", no='" + no + '\'' +
				", user_code='" + user_code + '\'' +
				", sign_type='" + sign_type + '\'' +
				", notify_url='" + notify_url + '\'' +
				", return_url='" + return_url + '\'' +
				", sign_val='" + sign_val + '\'' +
				", code='" + code + '\'' +
				", msg='" + msg + '\'' +
				", wxKey='" + wxKey + '\'' +
				", co='" + co + '\'' +
				", startNum=" + startNum +
				", endNum=" + endNum +
				", addCommunity='" + addCommunity + '\'' +
				", addBuilding='" + addBuilding + '\'' +
				", addDoorplateno='" + addDoorplateno + '\'' +
				", splitFlag=" + splitFlag +
				", idcardType=" + idcardType +
				", operatingName='" + operatingName + '\'' +
				", totalNum=" + totalNum +
				", popIdcard='" + popIdcard + '\'' +
				", popName='" + popName + '\'' +
				", PopTelephone='" + PopTelephone + '\'' +
				", PopUser=" + PopUser +
				", PopNameRemark='" + PopNameRemark + '\'' +
				", PopPassword='" + PopPassword + '\'' +
				", PopIdcardJson='" + PopIdcardJson + '\'' +
				", PopBirth='" + PopBirth + '\'' +
				", PopNation='" + PopNation + '\'' +
				", PopIdcardAddress='" + PopIdcardAddress + '\'' +
				", PopSex='" + PopSex + '\'' +
				", renterUserId=" + renterUserId +
				", renterStorefront=" + renterStorefront +
				", renterDepartment=" + renterDepartment +
				"} " + super.toString();
	}


}
