package com.zz.po.journal;

/**
 * 月度业绩统计表
 */
public class DashMonthlyPerformanceStatistics {
    private Integer mpsId;

    private Integer mpsStaffId;

    private Integer mpsIntentionalNumber;

    private Integer mpsFollowUpNumber;

    private Integer mpsWithGuestHouseNumber;

    private Integer mpsLookNumberRoom;

    private Integer mpsHouseNumber;

    private Integer mpsRoomNumber;
    
    private String mpsDate;
    
    private String mpsMd5;
    
    private String mpsType;
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private Integer totalNum;
	private String totalPage;
	
	private String StaffName;

	private Integer mpsChooseRoomNumber;
	
	private Integer dept;
	
    public Integer getDept() {
        return dept;
    }

    public void setDept(Integer dept) {
        this.dept = dept;
    }

    public Integer getMpsChooseRoomNumber() {
		return mpsChooseRoomNumber;
	}

	public void setMpsChooseRoomNumber(Integer mpsChooseRoomNumber) {
		this.mpsChooseRoomNumber = mpsChooseRoomNumber;
	}

	public String getMpsDate() {
		return mpsDate;
	}

	public void setMpsDate(String mpsDate) {
		this.mpsDate = mpsDate;
	}

	public String getMpsMd5() {
		return mpsMd5;
	}

	public void setMpsMd5(String mpsMd5) {
		this.mpsMd5 = mpsMd5;
	}

	public String getStaffName() {
		return StaffName;
	}

	public void setStaffName(String staffName) {
		StaffName = staffName;
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

	public Integer getMpsId() {
        return mpsId;
    }

    public void setMpsId(Integer mpsId) {
        this.mpsId = mpsId;
    }

    public Integer getMpsStaffId() {
        return mpsStaffId;
    }

    public void setMpsStaffId(Integer mpsStaffId) {
        this.mpsStaffId = mpsStaffId;
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

	public String getMpsType() {
		return mpsType;
	}

	public void setMpsType(String mpsType) {
		this.mpsType = mpsType;
	}
    
}