package com.zz.po.info;

/**
 * 计费方案表
 */
public class InfoPlanTable {
    private Integer planId;

    private String planPackage;

    private String planType;

    private String planComment;

    private String planDefault;
    
    private Integer planHdId;
    private String planName;
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private String city;
	private String district;
	private String zone;
	private String road;
	private String community;
	private String building;

    public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getZone() {
		return zone;
	}

	public void setZone(String zone) {
		this.zone = zone;
	}

	public String getRoad() {
		return road;
	}

	public void setRoad(String road) {
		this.road = road;
	}

	public String getCommunity() {
		return community;
	}

	public void setCommunity(String community) {
		this.community = community;
	}

	public String getBuilding() {
		return building;
	}

	public void setBuilding(String building) {
		this.building = building;
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

	public Integer getPlanHdId() {
		return planHdId;
	}

	public void setPlanHdId(Integer planHdId) {
		this.planHdId = planHdId;
	}

	public String getPlanName() {
		return planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

    public String getPlanPackage() {
        return planPackage;
    }

    public void setPlanPackage(String planPackage) {
        this.planPackage = planPackage == null ? null : planPackage.trim();
    }

    public String getPlanType() {
        return planType;
    }

    public void setPlanType(String planType) {
        this.planType = planType == null ? null : planType.trim();
    }

    public String getPlanComment() {
        return planComment;
    }

    public void setPlanComment(String planComment) {
        this.planComment = planComment == null ? null : planComment.trim();
    }

    public String getPlanDefault() {
        return planDefault;
    }

    public void setPlanDefault(String planDefault) {
        this.planDefault = planDefault == null ? null : planDefault.trim();
    }
}