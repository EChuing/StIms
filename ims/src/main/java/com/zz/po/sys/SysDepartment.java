package com.zz.po.sys;

/**
 * 部门表
 */
public class SysDepartment {
    private Integer departmentId;

    private Integer departmentStorefrontId;

    private String departmentName;

    private String departmentNote;
    
    private String departmentState;

    private Integer departmentDistinguishId;

    private Integer departmentClassId;

    @Override
    public String toString() {
        return "SysDepartment{" +
                "departmentId=" + departmentId +
                ", departmentStorefrontId=" + departmentStorefrontId +
                ", departmentName='" + departmentName + '\'' +
                ", departmentNote='" + departmentNote + '\'' +
                ", departmentState='" + departmentState + '\'' +
                ", departmentDistinguishId=" + departmentDistinguishId +
                ", departmentClassId=" + departmentClassId +
                '}';
    }

    public Integer getDepartmentDistinguishId() {
        return departmentDistinguishId;
    }

    public void setDepartmentDistinguishId(Integer departmentDistinguishId) {
        this.departmentDistinguishId = departmentDistinguishId;
    }

    public Integer getDepartmentClassId() {
        return departmentClassId;
    }

    public void setDepartmentClassId(Integer departmentClassId) {
        this.departmentClassId = departmentClassId;
    }

    public String getDepartmentState() {
		return departmentState;
	}

	public void setDepartmentState(String departmentState) {
		this.departmentState = departmentState;
	}

	public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public Integer getDepartmentStorefrontId() {
        return departmentStorefrontId;
    }

    public void setDepartmentStorefrontId(Integer departmentStorefrontId) {
        this.departmentStorefrontId = departmentStorefrontId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName == null ? null : departmentName.trim();
    }

    public String getDepartmentNote() {
        return departmentNote;
    }

    public void setDepartmentNote(String departmentNote) {
        this.departmentNote = departmentNote == null ? null : departmentNote.trim();
    }
}