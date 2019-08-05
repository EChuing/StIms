package com.zz.po.cs;

public class CsOutsideCustomerExpansion extends CsSalesClientContract {
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
	
	private String addCommunity;
	private String addBuilding;
	private String addDoorplateno;
	private Integer splitFlag;
	
	private boolean idcardType;
	private String operatingName;
	
	private Integer startNum;
	private Integer endNum;
	private Integer totalNum;
	//insertdata
	private String templateFillValue;
	private String jcdContractPrefix;
	private String jcdContractNumber;
	

	private Integer jrrUserId;
	private Integer jrrDepartment;
	private String jrrStorefront;
	private String jrrSignedTime;
	private String jrrRenewalCoding;
	
	
	
	
	public String getJrrRenewalCoding() {
		return jrrRenewalCoding;
	}

	public void setJrrRenewalCoding(String jrrRenewalCoding) {
		this.jrrRenewalCoding = jrrRenewalCoding;
	}

	public Integer getJrrUserId() {
		return jrrUserId;
	}

	public void setJrrUserId(Integer jrrUserId) {
		this.jrrUserId = jrrUserId;
	}

	public Integer getJrrDepartment() {
		return jrrDepartment;
	}

	public void setJrrDepartment(Integer jrrDepartment) {
		this.jrrDepartment = jrrDepartment;
	}

	public String getJcdContractNumber() {
		return jcdContractNumber;
	}

	public void setJcdContractNumber(String jcdContractNumber) {
		this.jcdContractNumber = jcdContractNumber;
	}
	
	public String getJcdContractPrefix() {
		return jcdContractPrefix;
	}

	public void setJcdContractPrefix(String jcdContractPrefix) {
		this.jcdContractPrefix = jcdContractPrefix;
	}


	public String getJrrStorefront() {
		return jrrStorefront;
	}

	public void setJrrStorefront(String jrrStorefront) {
		this.jrrStorefront = jrrStorefront;
	}

	public String getJrrSignedTime() {
		return jrrSignedTime;
	}

	public void setJrrSignedTime(String jrrSignedTime) {
		this.jrrSignedTime = jrrSignedTime;
	}

	public String getTemplateFillValue() {
		return templateFillValue;
	}

	public void setTemplateFillValue(String templateFillValue) {
		this.templateFillValue = templateFillValue;
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

	public Integer getTotalNum() {
		return totalNum;
	}

	public void setTotalNum(Integer totalNum) {
		this.totalNum = totalNum;
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

	public String getWxKey() {
		return wxKey;
	}

	public void setWxKey(String wxKey) {
		this.wxKey = wxKey;
	}

	public String getCo() {
		return co;
	}

	public void setCo(String co) {
		this.co = co;
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

	@Override
	public String toString() {
		return "CsOutsideCustomerExpansion [zqid=" + zqid + ", no=" + no + ", user_code=" + user_code + ", sign_type="
				+ sign_type + ", notify_url=" + notify_url + ", return_url=" + return_url + ", sign_val=" + sign_val
				+ ", code=" + code + ", msg=" + msg + ", wxKey=" + wxKey + ", co=" + co + ", addCommunity="
				+ addCommunity + ", addBuilding=" + addBuilding + ", addDoorplateno=" + addDoorplateno + ", splitFlag="
				+ splitFlag + ", idcardType=" + idcardType + ", operatingName=" + operatingName + "]";
	}

	
}
