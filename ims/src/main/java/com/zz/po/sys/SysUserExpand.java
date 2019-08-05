package com.zz.po.sys;

public class SysUserExpand extends SysUser{
	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	private String spHavePurview;
    private String spNewPurview;
	private String spSpeedLeft;
	private String departmentName;
	private String spName;
	private Integer purviewId;
	private String storefrontName;

	private Integer storefrontId;

	public String getStudentPhone() {
		return studentPhone;
	}

	public void setStudentPhone(String studentPhone) {
		this.studentPhone = studentPhone;
	}

	public Integer getStorefrontId() {
		return storefrontId;
	}

	public void setStorefrontId(Integer storefrontId) {
		this.storefrontId = storefrontId;
	}

	private Integer staffOne;
	private Integer staffTwo;
	
	private Integer OneDepartment;
	private Integer TwoDepartment;
	private Integer OneStore;
	private Integer TwoStore;
	private String acode;
	private String bcode;
	private String ccode;

	public Integer getStudentId() {return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public Integer getStudentClassId() {
		return studentClassId;
	}

	public void setStudentClassId(Integer studentClassId) {
		this.studentClassId = studentClassId;
	}

	public String getStudentClass() {
		return studentClass;
	}

	public void setStudentClass(String studentClass) {
		this.studentClass = studentClass;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getStudentEmergencycontact() {
		return studentEmergencycontact;
	}

	public void setStudentEmergencycontact(String studentEmergencycontact) {
		this.studentEmergencycontact = studentEmergencycontact;
	}

	public String getStudentRelationship() {
		return studentRelationship;
	}

	public void setStudentRelationship(String studentRelationship) {
		this.studentRelationship = studentRelationship;
	}

	public Integer getStudentIdcard() {
		return studentIdcard;
	}

	public void setStudentIdcard(Integer studentIdcard) {
		this.studentIdcard = studentIdcard;
	}

	public String getStudentIdcardAddress() {
		return studentIdcardAddress;
	}

	public void setStudentIdcardAddress(String studentIdcardAddress) {
		this.studentIdcardAddress = studentIdcardAddress;
	}

	public String getStudentNowAddress() {
		return studentNowAddress;
	}

	public void setStudentNowAddress(String studentNowAddress) {
		this.studentNowAddress = studentNowAddress;
	}

	public String getStudentNativePlace() {
		return studentNativePlace;
	}

	public void setStudentNativePlace(String studentNativePlace) {
		this.studentNativePlace = studentNativePlace;
	}

	public String getStudentUserNation() {
		return studentUserNation;
	}

	public void setStudentUserNation(String studentUserNation) {
		this.studentUserNation = studentUserNation;
	}

	private int maxUserNum;
	private String state;
	private Integer studentId;
	private Integer studentClassId;
	private String studentClass;

	public String getStudentState() {
		return studentState;
	}

	public void setStudentState(String studentState) {
		this.studentState = studentState;
	}

	private String studentName;
	private String studentPhone;
	private String studentEmergencycontact;
	private String studentRelationship;
	private String studentState;
	private Integer studentIdcard;

	public Integer getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(Integer schoolId) {
		this.schoolId = schoolId;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	private String studentIdcardAddress;
	private String studentNowAddress;
	private String studentNativePlace;
	private String studentUserNation;
	private Integer schoolId;
	private String schoolName;


	private String newDiscountAuthPassword;//新折扣授权密码
	private String checkDiscountAuthPassword;//确认折扣密码

	public String getCheckDiscountAuthPassword() {
		return checkDiscountAuthPassword;
	}

	public void setCheckDiscountAuthPassword(String checkDiscountAuthPassword) {
		this.checkDiscountAuthPassword = checkDiscountAuthPassword;
	}

	public String getNewDiscountAuthPassword() {
		return newDiscountAuthPassword;
	}

	public void setNewDiscountAuthPassword(String newDiscountAuthPassword) {
		this.newDiscountAuthPassword = newDiscountAuthPassword;
	}

	public String getRegistrantName() {
		return registrantName;
	}
	public void setRegistrantName(String registrantName) {
		this.registrantName = registrantName;
	}
	private String registrantName;
	

	
	
	public String getSpNewPurview() {
        return spNewPurview;
    }
    public void setSpNewPurview(String spNewPurview) {
        this.spNewPurview = spNewPurview;
    }
    public String getAcode() {
		return acode;
	}
	public void setAcode(String acode) {
		this.acode = acode;
	}
	public String getBcode() {
		return bcode;
	}
	public void setBcode(String bcode) {
		this.bcode = bcode;
	}
	public String getCcode() {
		return ccode;
	}
	public void setCcode(String ccode) {
		this.ccode = ccode;
	}
	public String getSpSpeedLeft() {
		return spSpeedLeft;
	}
	public void setSpSpeedLeft(String spSpeedLeft) {
		this.spSpeedLeft = spSpeedLeft;
	}
	public Integer getOneDepartment() {
		return OneDepartment;
	}
	public void setOneDepartment(Integer oneDepartment) {
		OneDepartment = oneDepartment;
	}
	public Integer getTwoDepartment() {
		return TwoDepartment;
	}
	public void setTwoDepartment(Integer twoDepartment) {
		TwoDepartment = twoDepartment;
	}
	public Integer getOneStore() {
		return OneStore;
	}
	public void setOneStore(Integer oneStore) {
		OneStore = oneStore;
	}
	public Integer getTwoStore() {
		return TwoStore;
	}
	public void setTwoStore(Integer twoStore) {
		TwoStore = twoStore;
	}
	public Integer getStaffOne() {
		return staffOne;
	}
	public void setStaffOne(Integer staffOne) {
		this.staffOne = staffOne;
	}
	public Integer getStaffTwo() {
		return staffTwo;
	}
	public void setStaffTwo(Integer staffTwo) {
		this.staffTwo = staffTwo;
	}
	public String getStorefrontName() {
		return storefrontName;
	}
	public void setStorefrontName(String storefrontName) {
		this.storefrontName = storefrontName;
	}
	public Integer getPurviewId() {
		return purviewId;
	}
	public void setPurviewId(Integer purviewId) {
		this.purviewId = purviewId;
	}
	public String getSpName() {
		return spName;
	}
	public void setSpName(String spName) {
		this.spName = spName;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getSpHavePurview() {
		return spHavePurview;
	}
	public void setSpHavePurview(String spHavePurview) {
		this.spHavePurview = spHavePurview;
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
	public int getMaxUserNum() {
		return maxUserNum;
	}
	public void setMaxUserNum(int maxUserNum) {
		this.maxUserNum = maxUserNum;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	@Override
	public String toString() {
		return "SysUserExpand{" +
				"pageNumber='" + pageNumber + '\'' +
				", startNum='" + startNum + '\'' +
				", endNum='" + endNum + '\'' +
				", totalNum='" + totalNum + '\'' +
				", totalPage='" + totalPage + '\'' +
				", spHavePurview='" + spHavePurview + '\'' +
				", spNewPurview='" + spNewPurview + '\'' +
				", spSpeedLeft='" + spSpeedLeft + '\'' +
				", departmentName='" + departmentName + '\'' +
				", spName='" + spName + '\'' +
				", purviewId=" + purviewId +
				", storefrontName='" + storefrontName + '\'' +
				", staffOne=" + staffOne +
				", staffTwo=" + staffTwo +
				", OneDepartment=" + OneDepartment +
				", TwoDepartment=" + TwoDepartment +
				", OneStore=" + OneStore +
				", TwoStore=" + TwoStore +
				", acode='" + acode + '\'' +
				", bcode='" + bcode + '\'' +
				", ccode='" + ccode + '\'' +
				", maxUserNum=" + maxUserNum +
				", state='" + state + '\'' +
				", newDiscountAuthPassword='" + newDiscountAuthPassword + '\'' +
				", checkDiscountAuthPassword='" + checkDiscountAuthPassword + '\'' +
				", registrantName='" + registrantName + '\'' +
				"} ";
	}

}