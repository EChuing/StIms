package com.zz.po.sys;

/**
 * 用户信息表
 */
public class SysUser {
    private Integer userId;

    private Integer suDepartmentId;

    private Integer suStoreId;

    private Integer suPermissionsId;

    private String suStaffId;

    private String suType;

    private String suPassword;

    private String suName;

    private String suStaffName;

    private String suDeptStaff;

    private String suIdcard;

    private String suContact;

    private String suBankType;

    private String suBankCardNum;

    private String suTheStore;

    private String suState;

    private Integer suFrozen;

    private String suWhetherGoOut;
    
    private Double suBasePay;
    private Double suMeritPay;
    private Double suPerformanceSalary;
    private Double suWageLosses;
    
    private Integer suChooseRoomLimit;
    private Integer suChooseRoomToday;
    
    private String suMd5Check;
    private Integer suMd5CheckType;
    
    private String oldPassword;
    private String newPassword;
    private String checkNewPassword;



    private Integer suFollowupValue;

    private String suImgPath;
    
    private String suImgNum;

    private String suIdInformation;	//身份证全部信息
    
    private String sustaffgender; 			//身份证性别
    private String sustaffbirthday;			//身份证出生日期
    private String sustaffcertnumber;		//身份证证件号码
    private String sustaffnation;			//身份证民族
    private String sustaffidissued;			//身份证签发机关
    private String sustaffaddress;			//身份证住址
    private String sustaffissuedvaliddate;	//身份证有效期
    private String sustaffidimgpers;		//身份证照片
	private Integer suPopId;				//人口表id
  
    private String   currentAddress;
	private String	 servicememotextnull;
	private String	 remark;
	private String 	 nativeplace;
	private String 	 marriage;
	private String	 linkman;
	private String	 linkmanphone;
	private String 	 linkmanrelation;
    
    private String suSuperior;
    private String openid;
    private Integer suAppAuth;

	private String suDiscountAuthPassword;

	private String suCardNumber;


	public String getSuCardNumber() {
		return suCardNumber;
	}

	public void setSuCardNumber(String suCardNumber) {
		this.suCardNumber = suCardNumber;
	}

	public Integer getSuAppAuth() {return suAppAuth;}

	public void setSuAppAuth(Integer suAppAuth) {this.suAppAuth = suAppAuth;}


	public String getSuDiscountAuthPassword() {
		return suDiscountAuthPassword;
	}

	public void setSuDiscountAuthPassword(String suDiscountAuthPassword) {
		this.suDiscountAuthPassword = suDiscountAuthPassword;
	}



	public Integer getSuFollowupValue() {
		return suFollowupValue;
	}

	public void setSuFollowupValue(Integer suFollowupValue) {
		this.suFollowupValue = suFollowupValue;
	}

	public String getCurrentAddress() {
		return currentAddress;
	}

	public void setCurrentAddress(String currentAddress) {
		this.currentAddress = currentAddress;
	}

	public String getServicememotextnull() {
		return servicememotextnull;
	}

	public void setServicememotextnull(String servicememotextnull) {
		this.servicememotextnull = servicememotextnull;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getNativeplace() {
		return nativeplace;
	}

	public void setNativeplace(String nativeplace) {
		this.nativeplace = nativeplace;
	}

	public String getMarriage() {
		return marriage;
	}

	public void setMarriage(String marriage) {
		this.marriage = marriage;
	}

	public String getLinkman() {
		return linkman;
	}

	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}

	public String getLinkmanphone() {
		return linkmanphone;
	}

	public void setLinkmanphone(String linkmanphone) {
		this.linkmanphone = linkmanphone;
	}

	public String getLinkmanrelation() {
		return linkmanrelation;
	}

	public void setLinkmanrelation(String linkmanrelation) {
		this.linkmanrelation = linkmanrelation;
	}

	public String getSustaffgender() {
		return sustaffgender;
	}

	public void setSustaffgender(String sustaffgender) {
		this.sustaffgender = sustaffgender;
	}

	public String getSustaffbirthday() {
		return sustaffbirthday;
	}

	public void setSustaffbirthday(String sustaffbirthday) {
		this.sustaffbirthday = sustaffbirthday;
	}

	public String getSustaffcertnumber() {
		return sustaffcertnumber;
	}

	public void setSustaffcertnumber(String sustaffcertnumber) {
		this.sustaffcertnumber = sustaffcertnumber;
	}

	public String getSustaffnation() {
		return sustaffnation;
	}

	public void setSustaffnation(String sustaffnation) {
		this.sustaffnation = sustaffnation;
	}

	public String getSustaffidissued() {
		return sustaffidissued;
	}

	public void setSustaffidissued(String sustaffidissued) {
		this.sustaffidissued = sustaffidissued;
	}

	public String getSustaffaddress() {
		return sustaffaddress;
	}

	public void setSustaffaddress(String sustaffaddress) {
		this.sustaffaddress = sustaffaddress;
	}

	public String getSustaffissuedvaliddate() {
		return sustaffissuedvaliddate;
	}

	public void setSustaffissuedvaliddate(String sustaffissuedvaliddate) {
		this.sustaffissuedvaliddate = sustaffissuedvaliddate;
	}

	public String getSustaffidimgpers() {
		return sustaffidimgpers;
	}

	public void setSustaffidimgpers(String sustaffidimgpers) {
		this.sustaffidimgpers = sustaffidimgpers;
	}

	//跟进
    private String sufollow;
    
    public String getSufollow() {
		return sufollow;
	}

	public void setSufollow(String sufollow) {
		this.sufollow = sufollow;
	}

	public String getSuSuperior() {
        return suSuperior;
    }

    public void setSuSuperior(String suSuperior) {
        this.suSuperior = suSuperior;
    }

    public String getSuImgPath() {
        return suImgPath;
    }

    public void setSuImgPath(String suImgPath) {
        this.suImgPath = suImgPath;
    }

    public String getSuImgNum() {
        return suImgNum;
    }

    public void setSuImgNum(String suImgNum) {
        this.suImgNum = suImgNum;
    }

    public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getCheckNewPassword() {
		return checkNewPassword;
	}

	public void setCheckNewPassword(String checkNewPassword) {
		this.checkNewPassword = checkNewPassword;
	}

	public String getSuMd5Check() {
		return suMd5Check;
	}

	public void setSuMd5Check(String suMd5Check) {
		this.suMd5Check = suMd5Check;
	}

	public Integer getSuMd5CheckType() {
		return suMd5CheckType;
	}

	public void setSuMd5CheckType(Integer suMd5CheckType) {
		this.suMd5CheckType = suMd5CheckType;
	}

	public Integer getSuChooseRoomLimit() {
		return suChooseRoomLimit;
	}
	
	public void setSuChooseRoomLimit(Integer suChooseRoomLimit) {
		this.suChooseRoomLimit = suChooseRoomLimit;
	}

	public Integer getSuChooseRoomToday() {
		return suChooseRoomToday;
	}

	public void setSuChooseRoomToday(Integer suChooseRoomToday) {
		this.suChooseRoomToday = suChooseRoomToday;
	}

	public Double getSuBasePay() {
		return suBasePay;
	}

	public void setSuBasePay(Double suBasePay) {
		this.suBasePay = suBasePay;
	}

	public Double getSuMeritPay() {
		return suMeritPay;
	}

	public void setSuMeritPay(Double suMeritPay) {
		this.suMeritPay = suMeritPay;
	}

	public Double getSuPerformanceSalary() {
		return suPerformanceSalary;
	}

	public void setSuPerformanceSalary(Double suPerformanceSalary) {
		this.suPerformanceSalary = suPerformanceSalary;
	}

	public Double getSuWageLosses() {
		return suWageLosses;
	}

	public void setSuWageLosses(Double suWageLosses) {
		this.suWageLosses = suWageLosses;
	}

	public String getSuWhetherGoOut() {
		return suWhetherGoOut;
	}

	public void setSuWhetherGoOut(String suWhetherGoOut) {
		this.suWhetherGoOut = suWhetherGoOut;
	}

	public String getSuState() {
		return suState;
	}

	public void setSuState(String suState) {
		this.suState = suState;
	}

	public Integer getSuDepartmentId() {
        return suDepartmentId;
    }

    public void setSuDepartmentId(Integer suDepartmentId) {
        this.suDepartmentId = suDepartmentId;
    }

    public Integer getSuStoreId() {
        return suStoreId;
    }

    public void setSuStoreId(Integer suStoreId) {
        this.suStoreId = suStoreId;
    }

    public Integer getSuPermissionsId() {
        return suPermissionsId;
    }

    public void setSuPermissionsId(Integer suPermissionsId) {
        this.suPermissionsId = suPermissionsId;
    }

    public String getSuStaffId() {
        return suStaffId;
    }

    public void setSuStaffId(String suStaffId) {
        this.suStaffId = suStaffId == null ? null : suStaffId.trim();
    }

    public String getSuType() {
        return suType;
    }

    public void setSuType(String suType) {
        this.suType = suType == null ? null : suType.trim();
    }



	public String getSuPassword() {
        return suPassword;
    }

    public void setSuPassword(String suPassword) {
        this.suPassword = suPassword == null ? null : suPassword.trim();
    }

    public String getSuName() {
        return suName;
    }

    public void setSuName(String suName) {
        this.suName = suName == null ? null : suName.trim();
    }

    public String getSuStaffName() {
        return suStaffName;
    }

    public void setSuStaffName(String suStaffName) {
        this.suStaffName = suStaffName == null ? null : suStaffName.trim();
    }

    public String getSuDeptStaff() {
        return suDeptStaff;
    }

    public void setSuDeptStaff(String suDeptStaff) {
        this.suDeptStaff = suDeptStaff == null ? null : suDeptStaff.trim();
    }

    public String getSuIdcard() {
        return suIdcard;
    }

    public void setSuIdcard(String suIdcard) {
        this.suIdcard = suIdcard == null ? null : suIdcard.trim();
    }

    public String getSuContact() {
        return suContact;
    }

    public void setSuContact(String suContact) {
        this.suContact = suContact == null ? null : suContact.trim();
    }

    public String getSuBankType() {
        return suBankType;
    }

    public void setSuBankType(String suBankType) {
        this.suBankType = suBankType == null ? null : suBankType.trim();
    }

    public String getSuBankCardNum() {
        return suBankCardNum;
    }

    public void setSuBankCardNum(String suBankCardNum) {
        this.suBankCardNum = suBankCardNum == null ? null : suBankCardNum.trim();
    }

    public String getSuTheStore() {
        return suTheStore;
    }

    public void setSuTheStore(String suTheStore) {
        this.suTheStore = suTheStore == null ? null : suTheStore.trim();
    }

	public String getSuIdInformation() {
		return suIdInformation;
	}

	public void setSuIdInformation(String suIdInformation) {
		this.suIdInformation = suIdInformation;
	}

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

	public Integer getSuPopId() {
		return suPopId;
	}

	public void setSuPopId(Integer suPopId) {
		this.suPopId = suPopId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}


	public Integer getSuFrozen() {
		return suFrozen;
	}

	public void setSuFrozen(Integer suFrozen) {
		this.suFrozen = suFrozen;
	}

    @Override
    public String toString() {
        return "SysUser{" +
                "userId=" + userId +
                ", suDepartmentId=" + suDepartmentId +
                ", suStoreId=" + suStoreId +
                ", suPermissionsId=" + suPermissionsId +
                ", suStaffId='" + suStaffId + '\'' +
                ", suType='" + suType + '\'' +
                ", suPassword='" + suPassword + '\'' +
                ", suName='" + suName + '\'' +
                ", suStaffName='" + suStaffName + '\'' +
                ", suDeptStaff='" + suDeptStaff + '\'' +
                ", suIdcard='" + suIdcard + '\'' +
                ", suContact='" + suContact + '\'' +
                ", suBankType='" + suBankType + '\'' +
                ", suBankCardNum='" + suBankCardNum + '\'' +
                ", suTheStore='" + suTheStore + '\'' +
                ", suState='" + suState + '\'' +
                ", suFrozen=" + suFrozen +
                ", suWhetherGoOut='" + suWhetherGoOut + '\'' +
                ", suBasePay=" + suBasePay +
                ", suMeritPay=" + suMeritPay +
                ", suPerformanceSalary=" + suPerformanceSalary +
                ", suWageLosses=" + suWageLosses +
                ", suChooseRoomLimit=" + suChooseRoomLimit +
                ", suChooseRoomToday=" + suChooseRoomToday +
                ", suMd5Check='" + suMd5Check + '\'' +
                ", suMd5CheckType=" + suMd5CheckType +
                ", oldPassword='" + oldPassword + '\'' +
                ", newPassword='" + newPassword + '\'' +
                ", checkNewPassword='" + checkNewPassword + '\'' +
                ", suFollowupValue=" + suFollowupValue +
                ", suImgPath='" + suImgPath + '\'' +
                ", suImgNum='" + suImgNum + '\'' +
                ", suIdInformation='" + suIdInformation + '\'' +
                ", sustaffgender='" + sustaffgender + '\'' +
                ", sustaffbirthday='" + sustaffbirthday + '\'' +
                ", sustaffcertnumber='" + sustaffcertnumber + '\'' +
                ", sustaffnation='" + sustaffnation + '\'' +
                ", sustaffidissued='" + sustaffidissued + '\'' +
                ", sustaffaddress='" + sustaffaddress + '\'' +
                ", sustaffissuedvaliddate='" + sustaffissuedvaliddate + '\'' +
                ", sustaffidimgpers='" + sustaffidimgpers + '\'' +
                ", suPopId=" + suPopId +
                ", currentAddress='" + currentAddress + '\'' +
                ", servicememotextnull='" + servicememotextnull + '\'' +
                ", remark='" + remark + '\'' +
                ", nativeplace='" + nativeplace + '\'' +
                ", marriage='" + marriage + '\'' +
                ", linkman='" + linkman + '\'' +
                ", linkmanphone='" + linkmanphone + '\'' +
                ", linkmanrelation='" + linkmanrelation + '\'' +
                ", suSuperior='" + suSuperior + '\'' +
                ", openid='" + openid + '\'' +
                ", suAppAuth=" + suAppAuth +
                ", suDiscountAuthPassword='" + suDiscountAuthPassword + '\'' +
                ", suCardNumber='" + suCardNumber + '\'' +
                ", sufollow='" + sufollow + '\'' +
                '}';
    }
}