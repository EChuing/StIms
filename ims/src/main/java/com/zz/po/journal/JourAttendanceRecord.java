package com.zz.po.journal;

public class JourAttendanceRecord {
	private String totalNum;
    public String getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(String totalNum) {
		this.totalNum = totalNum;
	}
	private String jarStartTime;
	private String jarEndTime;
	private Integer jarId;

    private Integer jarUserId;

    //交班标志
    private Integer jarStatus;

    private Integer jarDepartmentId;

    private Integer jarStoreId;

    private String jarWorkTime;

    private String jarWork1;

    private String jarOffwork1;

    private String jarWork2;

    private String jarOffwork2;

    private String jarWork3;

    private String jarOffwork3;

    private String jarWork4;

    private String jarOffwork4;

    private String jarSpare;
    //jar自定义
    private Integer jar;
    //
    private String jarName;
    
    private String jarDepartmentName;
    
    private String jarStoreName;
    //查询时间
    private String jarSelectTime;
    private String startNum;
    private String endNum;
    
    public String getJarStartTime() {
		return jarStartTime;
	}
	public void setJarStartTime(String jarStartTime) {
		this.jarStartTime = jarStartTime;
	}
	public String getJarEndTime() {
		return jarEndTime;
	}
	public void setJarEndTime(String jarEndTime) {
		this.jarEndTime = jarEndTime;
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
    public String getJarSelectTime() {
		return jarSelectTime;
	}

	public void setJarSelectTime(String jarSelectTime) {
		this.jarSelectTime = jarSelectTime;
	}

	public String getJarName() {
		return jarName;
	}

	public void setJarName(String jarName) {
		this.jarName = jarName;
	}

	public String getJarDepartmentName() {
		return jarDepartmentName;
	}

	public void setJarDepartmentName(String jarDepartmentName) {
		this.jarDepartmentName = jarDepartmentName;
	}

	public String getJarStoreName() {
		return jarStoreName;
	}

	public void setJarStoreName(String jarStoreName) {
		this.jarStoreName = jarStoreName;
	}

	public Integer getJar() {
		return jar;
	}

	public void setJar(Integer jar) {
		this.jar = jar;
	}

	public Integer getJarId() {
        return jarId;
    }

    public void setJarId(Integer jarId) {
        this.jarId = jarId;
    }

    public Integer getJarUserId() {
        return jarUserId;
    }

    public void setJarUserId(Integer jarUserId) {
        this.jarUserId = jarUserId;
    }

    public Integer getJarDepartmentId() {
        return jarDepartmentId;
    }

    public void setJarDepartmentId(Integer jarDepartmentId) {
        this.jarDepartmentId = jarDepartmentId;
    }

    public Integer getJarStoreId() {
        return jarStoreId;
    }

    public void setJarStoreId(Integer jarStoreId) {
        this.jarStoreId = jarStoreId;
    }

    public String getJarWorkTime() {
        return (jarWorkTime !=null && jarWorkTime.length() >10 )?jarWorkTime.substring(0,10):jarWorkTime;
    }

    public void setJarWorkTime(String jarWorkTime) {
        this.jarWorkTime = jarWorkTime == null ? null : jarWorkTime.trim();
    }

    public String getJarWork1() {
        return jarWork1;
    }

    public void setJarWork1(String jarWork1) {
        this.jarWork1 = jarWork1 == null ? null : jarWork1.trim();
    }

    public String getJarOffwork1() {
        return jarOffwork1;
    }

    public void setJarOffwork1(String jarOffwork1) {
        this.jarOffwork1 = jarOffwork1 == null ? null : jarOffwork1.trim();
    }

    public String getJarWork2() {
        return jarWork2;
    }

    public void setJarWork2(String jarWork2) {
        this.jarWork2 = jarWork2 == null ? null : jarWork2.trim();
    }

    public String getJarOffwork2() {
        return jarOffwork2;
    }

    public void setJarOffwork2(String jarOffwork2) {
        this.jarOffwork2 = jarOffwork2 == null ? null : jarOffwork2.trim();
    }

    public String getJarWork3() {
        return jarWork3;
    }

    public void setJarWork3(String jarWork3) {
        this.jarWork3 = jarWork3 == null ? null : jarWork3.trim();
    }

    public String getJarOffwork3() {
        return jarOffwork3;
    }

    public void setJarOffwork3(String jarOffwork3) {
        this.jarOffwork3 = jarOffwork3 == null ? null : jarOffwork3.trim();
    }

    public String getJarWork4() {
        return jarWork4;
    }

    public void setJarWork4(String jarWork4) {
        this.jarWork4 = jarWork4 == null ? null : jarWork4.trim();
    }

    public String getJarOffwork4() {
        return jarOffwork4;
    }

    public void setJarOffwork4(String jarOffwork4) {
        this.jarOffwork4 = jarOffwork4 == null ? null : jarOffwork4.trim();
    }

    public String getJarSpare() {
        return jarSpare;
    }

    public void setJarSpare(String jarSpare) {
        this.jarSpare = jarSpare == null ? null : jarSpare.trim();
    }

	@Override
	public String toString() {
		return "JourAttendanceRecord [jarId=" + jarId + ", jarUserId=" + jarUserId + ", jarDepartmentId="
				+ jarDepartmentId + ", jarStoreId=" + jarStoreId + ", jarWorkTime=" + jarWorkTime + ", jarWork1="
				+ jarWork1 + ", jarOffwork1=" + jarOffwork1 + ", jarWork2=" + jarWork2 + ", jarOffwork2=" + jarOffwork2
				+ ", jarWork3=" + jarWork3 + ", jarOffwork3=" + jarOffwork3 + ", jarWork4=" + jarWork4
				+ ", jarOffwork4=" + jarOffwork4 + ", jarSpare=" + jarSpare + ", jar=" + jar + ", jarName=" + jarName
				+ ", jarDepartmentName=" + jarDepartmentName + ",jarStatus="+jarStatus+",jarStoreName=" + jarStoreName + "]";
	}

    public Integer getJarStatus() {
        return jarStatus;
    }

    public void setJarStatus(Integer jarStatus) {
        this.jarStatus = jarStatus;
    }
}