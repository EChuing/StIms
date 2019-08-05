package com.zz.po.journal;

import com.zz.po.commons.CommonsPo;

/**
 * 跟进记录表
 */
public class JournalHousingFollow extends CommonsPo{
    private Integer jhfId;
    
    private Integer jhfHouseId;

    private Integer jhfHouse4rentId;

    private Integer jhfHouse4storeId;

    private Integer jhfUserId;

    private String jhfFollowTime;

    private String jhfFollowRemark;

    private String jhfPaymentWay;

    private String jhfFollowResult;
    
    private String jhfFollowBelong;
    
    private Integer jhfDepartment;
    private Integer jhfStorefront;
    
    private String jhfRemind;
    
    private String jhfImgPath;
    private String jhfImgNum;

    
    public String getJhfImgPath() {
		return jhfImgPath;
	}

	public void setJhfImgPath(String jhfImgPath) {
		this.jhfImgPath = jhfImgPath;
	}

	public String getJhfImgNum() {
		return jhfImgNum;
	}

	public void setJhfImgNum(String jhfImgNum) {
		this.jhfImgNum = jhfImgNum;
	}

	public String getJhfFollowBelong() {
		return jhfFollowBelong;
	}

	public void setJhfFollowBelong(String jhfFollowBelong) {
		this.jhfFollowBelong = jhfFollowBelong;
	}

	public String getJhfRemind() {
		return jhfRemind;
	}

	public void setJhfRemind(String jhfRemind) {
		this.jhfRemind = jhfRemind;
	}

	public Integer getJhfDepartment() {
		return jhfDepartment;
	}

	public void setJhfDepartment(Integer jhfDepartment) {
		this.jhfDepartment = jhfDepartment;
	}

	public Integer getJhfStorefront() {
		return jhfStorefront;
	}

	public void setJhfStorefront(Integer jhfStorefront) {
		this.jhfStorefront = jhfStorefront;
	}

	public Integer getJhfId() {
        return jhfId;
    }

	public Integer getJhfHouseId() {
        return jhfHouseId;
    }

    public void setJhfHouseId(Integer jhfHouseId) {
        this.jhfHouseId = jhfHouseId;
    }

    public void setJhfId(Integer jhfId) {
        this.jhfId = jhfId;
    }

    public Integer getJhfHouse4rentId() {
        return jhfHouse4rentId;
    }

    public void setJhfHouse4rentId(Integer jhfHouse4rentId) {
        this.jhfHouse4rentId = jhfHouse4rentId;
    }

    public Integer getJhfHouse4storeId() {
        return jhfHouse4storeId;
    }

    public void setJhfHouse4storeId(Integer jhfHouse4storeId) {
        this.jhfHouse4storeId = jhfHouse4storeId;
    }

    public Integer getJhfUserId() {
		return jhfUserId;
	}

	public void setJhfUserId(Integer jhfUserId) {
		this.jhfUserId = jhfUserId;
	}

	public String getJhfFollowTime() {
        return (jhfFollowTime != null && jhfFollowTime.length() > 19) ? jhfFollowTime.substring(0,19) : jhfFollowTime;
    }

    public void setJhfFollowTime(String jhfFollowTime) {
        this.jhfFollowTime = jhfFollowTime == null ? null : jhfFollowTime.trim();
    }

    public String getJhfFollowRemark() {
        return jhfFollowRemark;
    }

    public void setJhfFollowRemark(String jhfFollowRemark) {
        this.jhfFollowRemark = jhfFollowRemark == null ? null : jhfFollowRemark.trim();
    }

    public String getJhfPaymentWay() {
        return jhfPaymentWay;
    }

    public void setJhfPaymentWay(String jhfPaymentWay) {
        this.jhfPaymentWay = jhfPaymentWay == null ? null : jhfPaymentWay.trim();
    }

    public String getJhfFollowResult() {
        return jhfFollowResult;
    }

    public void setJhfFollowResult(String jhfFollowResult) {
        this.jhfFollowResult = jhfFollowResult == null ? null : jhfFollowResult.trim();
    }
    
	
}