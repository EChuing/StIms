package com.zz.po.sys;

/**
 * 权限信息表
 */
public class SysPurview {
    private Integer spId;

    private String spName;

    private String spHavePurview;
    
    private String spSpeedLeft;
    
    private String spNewPurview;
    
    private String id;
    private String storefrontName;
	private String departmentName;
	private String userName;
	
	public String getSpNewPurview() {
        return spNewPurview;
    }
    public void setSpNewPurview(String spNewPurview) {
        this.spNewPurview = spNewPurview;
    }
    public String getStorefrontName() {
		return storefrontName;
	}
	public void setStorefrontName(String storefrontName) {
		this.storefrontName = storefrontName;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getSpSpeedLeft() {
		return spSpeedLeft;
	}

	public void setSpSpeedLeft(String spSpeedLeft) {
		this.spSpeedLeft = spSpeedLeft;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public Integer getSpId() {
		return spId;
	}


	public void setSpId(Integer spId) {
		this.spId = spId;
	}

	public String getSpName() {
		return spName;
	}


	public void setSpName(String spName) {
		this.spName = spName;
	}


	public String getSpHavePurview() {
		return spHavePurview;
	}


	public void setSpHavePurview(String spHavePurview) {
		this.spHavePurview = spHavePurview;
	}


	@Override
	public String toString() {
		return "SysPurview [spId=" + spId +", spName=" + spName + ", spHavePurview=" + spHavePurview
				+ "]";
	}
    
}