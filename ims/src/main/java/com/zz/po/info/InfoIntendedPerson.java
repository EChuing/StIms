package com.zz.po.info;

/**
 * 租客意向人表
 */
public class InfoIntendedPerson {
    private Integer ipId;

    private Integer ipUserId;

    private Integer ipDepartmentId;

    private Integer ipStorefrontId;
    
    private String ipFrom;

    private String ipInNature;

    private String ipDoorModel;

    private String ipArea;

    private String ipLocation;

    private String ipDecorateConfiguration;

    private String ipOther;

    private String ipDate;

    private String ipNote;
    
    private String ipState;
    
    private String ipName;
    private String ipTel;
    
    private String ipFurnitureConfig;
    private String ipFloorDemand;
    private String ipPriceRange;
    
    private Integer ipPopulationId;
    
    private String ipGotoJosn;
    
    private String registrantName;
    
    private String ipNoteDate;
    
    public String getIpNoteDate() {
        return ipNoteDate;
    }
    public void setIpNoteDate(String ipNoteDate) {
        this.ipNoteDate = ipNoteDate;
    }
    public String getRegistrantName() {
        return registrantName;
    }
    public void setRegistrantName(String registrantName) {
        this.registrantName = registrantName;
    }
    public String getIpGotoJosn() {
		return ipGotoJosn;
	}
	public void setIpGotoJosn(String ipGotoJosn) {
		this.ipGotoJosn = ipGotoJosn;
	}
	public String getIpFurnitureConfig() {
		return ipFurnitureConfig;
	}
	public void setIpFurnitureConfig(String ipFurnitureConfig) {
		this.ipFurnitureConfig = ipFurnitureConfig;
	}
	public String getIpFloorDemand() {
		return ipFloorDemand;
	}
	public void setIpFloorDemand(String ipFloorDemand) {
		this.ipFloorDemand = ipFloorDemand;
	}
	public String getIpPriceRange() {
		return ipPriceRange;
	}
	public void setIpPriceRange(String ipPriceRange) {
		this.ipPriceRange = ipPriceRange;
	}
	public Integer getIpPopulationId() {
		return ipPopulationId;
	}
	public void setIpPopulationId(Integer ipPopulationId) {
		this.ipPopulationId = ipPopulationId;
	}

	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	private String startTime;
	private String endTime;
	
	private String popName;
	private String popTelephone;
	private String popIdcard;
	private String username;

    public String getIpName() {
		return ipName;
	}

	public void setIpName(String ipName) {
		this.ipName = ipName;
	}

	public String getIpTel() {
		return ipTel;
	}

	public void setIpTel(String ipTel) {
		this.ipTel = ipTel;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public Integer getIpId() {
        return ipId;
    }

    public void setIpId(Integer ipId) {
        this.ipId = ipId;
    }

    public Integer getIpUserId() {
        return ipUserId;
    }

    public void setIpUserId(Integer ipUserId) {
        this.ipUserId = ipUserId;
    }

    public Integer getIpDepartmentId() {
        return ipDepartmentId;
    }

    public void setIpDepartmentId(Integer ipDepartmentId) {
        this.ipDepartmentId = ipDepartmentId;
    }

    public Integer getIpStorefrontId() {
        return ipStorefrontId;
    }

    public void setIpStorefrontId(Integer ipStorefrontId) {
        this.ipStorefrontId = ipStorefrontId;
    }

    public String getIpInNature() {
        return ipInNature;
    }

    public void setIpInNature(String ipInNature) {
        this.ipInNature = ipInNature == null ? null : ipInNature.trim();
    }

    public String getIpDoorModel() {
        return ipDoorModel;
    }

    public void setIpDoorModel(String ipDoorModel) {
        this.ipDoorModel = ipDoorModel == null ? null : ipDoorModel.trim();
    }

    public String getIpArea() {
        return ipArea;
    }

    public void setIpArea(String ipArea) {
        this.ipArea = ipArea == null ? null : ipArea.trim();
    }

    public String getIpLocation() {
        return ipLocation;
    }

    public void setIpLocation(String ipLocation) {
        this.ipLocation = ipLocation == null ? null : ipLocation.trim();
    }

    public String getIpDecorateConfiguration() {
        return ipDecorateConfiguration;
    }

    public void setIpDecorateConfiguration(String ipDecorateConfiguration) {
        this.ipDecorateConfiguration = ipDecorateConfiguration == null ? null : ipDecorateConfiguration.trim();
    }

    public String getIpOther() {
        return ipOther;
    }

    public void setIpOther(String ipOther) {
        this.ipOther = ipOther == null ? null : ipOther.trim();
    }

    public String getIpDate() {
        return (ipDate != null && ipDate.length() > 19) ? ipDate.substring(0,19) : ipDate;
    }

    public void setIpDate(String ipDate) {
        this.ipDate = ipDate == null ? null : ipDate.trim();
    }

    public String getIpNote() {
        return ipNote;
    }

    public void setIpNote(String ipNote) {
        this.ipNote = ipNote == null ? null : ipNote.trim();
    }
    
    
	public String getIpState() {
		return ipState;
	}

	public void setIpState(String ipState) {
		this.ipState = ipState == null ? null : ipState.trim();
	}

	public String getIpFrom() {
		return ipFrom;
	}

	public void setIpFrom(String ipFrom) {
		this.ipFrom = ipFrom;
	}
	@Override
	public String toString() {
		return "InfoIntendedPerson [ipId=" + ipId + ", ipUserId=" + ipUserId + ", ipDepartmentId=" + ipDepartmentId
				+ ", ipStorefrontId=" + ipStorefrontId + ", ipFrom=" + ipFrom + ", ipInNature=" + ipInNature
				+ ", ipDoorModel=" + ipDoorModel + ", ipArea=" + ipArea + ", ipLocation=" + ipLocation
				+ ", ipDecorateConfiguration=" + ipDecorateConfiguration + ", ipOther=" + ipOther + ", ipDate=" + ipDate
				+ ", ipNote=" + ipNote + ", ipState=" + ipState + ", ipName=" + ipName + ", ipTel=" + ipTel
				+ ", ipFurnitureConfig=" + ipFurnitureConfig + ", ipFloorDemand=" + ipFloorDemand + ", ipPriceRange="
				+ ipPriceRange + ", ipPopulationId=" + ipPopulationId + ", ipGotoJosn=" + ipGotoJosn
				+ ", registrantName=" + registrantName + ", ipNoteDate=" + ipNoteDate + ", pageNumber=" + pageNumber
				+ ", startNum=" + startNum + ", endNum=" + endNum + ", totalNum=" + totalNum + ", totalPage="
				+ totalPage + ", startTime=" + startTime + ", endTime=" + endTime + ", popName=" + popName
				+ ", popTelephone=" + popTelephone + ", popIdcard=" + popIdcard + ", username=" + username + "]";
	}
	
}