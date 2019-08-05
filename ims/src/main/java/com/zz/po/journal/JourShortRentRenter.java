package com.zz.po.journal;

import java.util.List;

import com.zz.po.info.InfoPopulation;

public class JourShortRentRenter {
    private Integer jsrrId;

    private Integer jsrrPopId;
    
    private Integer jsrrCheckInNum;
    
    private String jsrrType;

    private String jsrrName;

    private String jsrrPhone;

    private String jsrrOpenid;

    private String jsrrIdcard;

    private String jsrrRegisterTime;

    private String jsrrIdcardImg;
    
  	private String jsrrCustomerType;
    
  	private Integer jsrrVipLevel;
  	
    private Integer jsrrChannelId;
    
    private String jsrcState;
    private String jsrcActualOccupancyTime;
    
    private Integer jcuId;
    private String jcuGroupType;
    private String jcuType;
    
    private String popName;
    private String popTelephone;
    private String popIdcard;
    private Integer popUser;
    
    private String userName;
    
    private String startNum;
  	private String endNum;
  	private String totalNum;
  	private String startTime;
  	private String endTime;
  	private String  splitFlag;
  	
  	private String recentTime;
  	private InfoPopulation infoPopulation;
  	private List<JourShortRentContract> jsrcList;
  	
    public Integer getJcuId() {
		return jcuId;
	}

	public void setJcuId(Integer jcuId) {
		this.jcuId = jcuId;
	}

	public String getJcuGroupType() {
		return jcuGroupType;
	}

	public void setJcuGroupType(String jcuGroupType) {
		this.jcuGroupType = jcuGroupType;
	}

	public String getJcuType() {
		return jcuType;
	}

	public void setJcuType(String jcuType) {
		this.jcuType = jcuType;
	}

	public Integer getJsrrChannelId() {
		return jsrrChannelId;
	}

	public void setJsrrChannelId(Integer jsrrChannelId) {
		this.jsrrChannelId = jsrrChannelId;
	}

	public Integer getJsrrVipLevel() {
		return jsrrVipLevel;
	}

	public void setJsrrVipLevel(Integer jsrrVipLevel) {
		this.jsrrVipLevel = jsrrVipLevel;
	}

	public String getJsrcState() {
		return jsrcState;
	}

	public void setJsrcState(String jsrcState) {
		this.jsrcState = jsrcState;
	}

	public String getJsrrCustomerType() {
		return jsrrCustomerType;
	}

	public void setJsrrCustomerType(String jsrrCustomerType) {
		this.jsrrCustomerType = jsrrCustomerType;
	}

	public InfoPopulation getInfoPopulation() {
		return infoPopulation;
	}

	public void setInfoPopulation(InfoPopulation infoPopulation) {
		this.infoPopulation = infoPopulation;
	}

	public Integer getJsrrCheckInNum() {
		return jsrrCheckInNum;
	}

	public void setJsrrCheckInNum(Integer jsrrCheckInNum) {
		this.jsrrCheckInNum = jsrrCheckInNum;
	}

	public String getJsrrType() {
		return jsrrType;
	}

	public void setJsrrType(String jsrrType) {
		this.jsrrType = jsrrType;
	}

	public Integer getJsrrId() {
        return jsrrId;
    }

    public void setJsrrId(Integer jsrrId) {
        this.jsrrId = jsrrId;
    }

    public Integer getJsrrPopId() {
        return jsrrPopId;
    }

    public void setJsrrPopId(Integer jsrrPopId) {
        this.jsrrPopId = jsrrPopId;
    }

    public String getJsrrName() {
        return jsrrName;
    }

    public void setJsrrName(String jsrrName) {
        this.jsrrName = jsrrName == null ? null : jsrrName.trim();
    }

    public String getJsrrPhone() {
        return jsrrPhone;
    }

    public void setJsrrPhone(String jsrrPhone) {
        this.jsrrPhone = jsrrPhone == null ? null : jsrrPhone.trim();
    }

    public String getJsrrOpenid() {
        return jsrrOpenid;
    }

    public void setJsrrOpenid(String jsrrOpenid) {
        this.jsrrOpenid = jsrrOpenid == null ? null : jsrrOpenid.trim();
    }

    public String getJsrrIdcard() {
        return jsrrIdcard;
    }

    public void setJsrrIdcard(String jsrrIdcard) {
        this.jsrrIdcard = jsrrIdcard == null ? null : jsrrIdcard.trim();
    }

    public String getJsrrRegisterTime() {
        return jsrrRegisterTime;
    }

    public void setJsrrRegisterTime(String jsrrRegisterTime) {
        this.jsrrRegisterTime = jsrrRegisterTime == null ? null : jsrrRegisterTime.trim();
    }

    public String getJsrrIdcardImg() {
        return jsrrIdcardImg;
    }

    public void setJsrrIdcardImg(String jsrrIdcardImg) {
        this.jsrrIdcardImg = jsrrIdcardImg == null ? null : jsrrIdcardImg.trim();
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPopName() {
		return popName;
	}

	public void setPopName(String popName) {
		this.popName = popName;
	}

	public String getPopTelephone() {
		return popTelephone;
	}

	public void setPopTelephone(String popTelephone) {
		this.popTelephone = popTelephone;
	}

	public String getPopIdcard() {
		return popIdcard;
	}

	public void setPopIdcard(String popIdcard) {
		this.popIdcard = popIdcard;
	}

	public Integer getPopUser() {
		return popUser;
	}

	public void setPopUser(Integer popUser) {
		this.popUser = popUser;
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

	public String getJsrcActualOccupancyTime() {
		return jsrcActualOccupancyTime;
	}

	public void setJsrcActualOccupancyTime(String jsrcActualOccupancyTime) {
		this.jsrcActualOccupancyTime = jsrcActualOccupancyTime;
	}

	public List<JourShortRentContract> getJsrcList() {
		return jsrcList;
	}

	public void setJsrcList(List<JourShortRentContract> jsrcList2) {
		this.jsrcList = jsrcList2;
	}

	public String getRecentTime() {
		return recentTime;
	}

	public void setRecentTime(String recentTime) {
		this.recentTime = recentTime;
	}
    
	public String getSplitFlag() {
		return splitFlag;
	}

	public void setSplitFlag(String splitFlag) {
		this.splitFlag = splitFlag;
	}

	@Override
	public String toString() {
		return "JourShortRentRenter [jsrrId=" + jsrrId + ", jsrrPopId=" + jsrrPopId + ", jsrrCheckInNum="
				+ jsrrCheckInNum + ", jsrrType=" + jsrrType + ", jsrrName=" + jsrrName + ", jsrrPhone=" + jsrrPhone
				+ ", jsrrOpenid=" + jsrrOpenid + ", jsrrIdcard=" + jsrrIdcard + ", jsrrRegisterTime=" + jsrrRegisterTime
				+ ", jsrrIdcardImg=" + jsrrIdcardImg + ", jsrrCustomerType=" + jsrrCustomerType + ", jsrrVipLevel="
				+ jsrrVipLevel + ", jsrrChannelId=" + jsrrChannelId + ", jsrcState=" + jsrcState
				+ ", jsrcActualOccupancyTime=" + jsrcActualOccupancyTime + ", jcuId=" + jcuId + ", jcuGroupType="
				+ jcuGroupType + ", jcuType=" + jcuType + ", popName=" + popName + ", popTelephone=" + popTelephone
				+ ", popIdcard=" + popIdcard + ", popUser=" + popUser + ", userName=" + userName + ", startNum="
				+ startNum + ", endNum=" + endNum + ", totalNum=" + totalNum + ", startTime=" + startTime + ", endTime="
				+ endTime + ", splitFlag=" + splitFlag + ", recentTime=" + recentTime + ", infoPopulation="
				+ infoPopulation + ", jsrcList=" + jsrcList + "]";
	}

    
}