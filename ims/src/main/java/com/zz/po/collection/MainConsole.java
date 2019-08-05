package com.zz.po.collection;

public class MainConsole {
	private Integer userId;
	
	private Integer dnId;
	
	private Integer dnUserId;
	
	private String dnType;
	
	private String dnTitle;
	
	private String dnContent;
	 
	private String dnTime;
	
	private String suStaffName;
	
	private String countNum1;
	private String countNum2;
	private String countNum3;
	private String countNum4;
	private String countNum5;
	private String countNum6;
    private String countNum7;
    private String countNum8;
	
	private Integer mpsIntentionalNumber;

    private Integer mpsFollowUpNumber;

    private Integer mpsWithGuestHouseNumber;

    private Integer mpsLookNumberRoom;

    private Integer mpsHouseNumber;

    private Integer mpsRoomNumber;
    
    private Integer mpsChooseRoomNumber;
    
    private String mpsDate;
	
    public Integer getMpsChooseRoomNumber() {
		return mpsChooseRoomNumber;
	}

	public void setMpsChooseRoomNumber(Integer mpsChooseRoomNumber) {
		this.mpsChooseRoomNumber = mpsChooseRoomNumber;
	}
    
	public Integer getMpsIntentionalNumber() {
		return mpsIntentionalNumber;
	}

	public void setMpsIntentionalNumber(Integer mpsIntentionalNumber) {
		this.mpsIntentionalNumber = mpsIntentionalNumber;
	}

	public Integer getMpsFollowUpNumber() {
		return mpsFollowUpNumber;
	}

	public void setMpsFollowUpNumber(Integer mpsFollowUpNumber) {
		this.mpsFollowUpNumber = mpsFollowUpNumber;
	}

	public Integer getMpsWithGuestHouseNumber() {
		return mpsWithGuestHouseNumber;
	}

	public void setMpsWithGuestHouseNumber(Integer mpsWithGuestHouseNumber) {
		this.mpsWithGuestHouseNumber = mpsWithGuestHouseNumber;
	}

	public Integer getMpsLookNumberRoom() {
		return mpsLookNumberRoom;
	}

	public void setMpsLookNumberRoom(Integer mpsLookNumberRoom) {
		this.mpsLookNumberRoom = mpsLookNumberRoom;
	}

	public Integer getMpsHouseNumber() {
		return mpsHouseNumber;
	}

	public void setMpsHouseNumber(Integer mpsHouseNumber) {
		this.mpsHouseNumber = mpsHouseNumber;
	}

	public Integer getMpsRoomNumber() {
		return mpsRoomNumber;
	}

	public void setMpsRoomNumber(Integer mpsRoomNumber) {
		this.mpsRoomNumber = mpsRoomNumber;
	}

	public String getMpsDate() {
		return mpsDate;
	}

	public void setMpsDate(String mpsDate) {
		this.mpsDate = mpsDate;
	}

	public String getCountNum1() {
		return countNum1;
	}

	public void setCountNum1(String countNum1) {
		this.countNum1 = countNum1;
	}

	public String getCountNum2() {
		return countNum2;
	}

	public void setCountNum2(String countNum2) {
		this.countNum2 = countNum2;
	}

	public String getCountNum3() {
		return countNum3;
	}

	public void setCountNum3(String countNum3) {
		this.countNum3 = countNum3;
	}

	public String getCountNum4() {
		return countNum4;
	}

	public void setCountNum4(String countNum4) {
		this.countNum4 = countNum4;
	}

	public String getCountNum5() {
		return countNum5;
	}

	public void setCountNum5(String countNum5) {
		this.countNum5 = countNum5;
	}

	public String getCountNum6() {
		return countNum6;
	}

	public void setCountNum6(String countNum6) {
		this.countNum6 = countNum6;
	}

	public String getCountNum7() {
        return countNum7;
    }

    public void setCountNum7(String countNum7) {
        this.countNum7 = countNum7;
    }

    public String getCountNum8() {
        return countNum8;
    }

    public void setCountNum8(String countNum8) {
        this.countNum8 = countNum8;
    }

    public String getSuStaffName() {
		return suStaffName;
	}

	public void setSuStaffName(String suStaffName) {
		this.suStaffName = suStaffName;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getDnId() {
		return dnId;
	}

	public void setDnId(Integer dnId) {
		this.dnId = dnId;
	}

	public Integer getDnUserId() {
		return dnUserId;
	}

	public void setDnUserId(Integer dnUserId) {
		this.dnUserId = dnUserId;
	}

	public String getDnType() {
		return dnType;
	}

	public void setDnType(String dnType) {
		this.dnType = dnType;
	}

	public String getDnTitle() {
		return dnTitle;
	}

	public void setDnTitle(String dnTitle) {
		this.dnTitle = dnTitle;
	}

	public String getDnContent() {
		return dnContent;
	}

	public void setDnContent(String dnContent) {
		this.dnContent = dnContent;
	}

	public String getDnTime() {
	    return (dnTime != null && dnTime.length() > 19) ? dnTime.substring(0,19) : dnTime;
	}

	public void setDnTime(String dnTime) {
		this.dnTime = dnTime;
	}
}