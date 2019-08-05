package com.zz.po.sys;

/**
 * 凭证号表
 */
public class SysVoucherNo {
    private Integer vnId;

    private String vnTime;
    
    private String startTime;
    private String endTime;

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

	public Integer getVnId() {
        return vnId;
    }

    public void setVnId(Integer vnId) {
        this.vnId = vnId;
    }

    public String getVnTime() {
        return vnTime;
    }

    public void setVnTime(String vnTime) {
        this.vnTime = vnTime == null ? null : vnTime.trim();
    }
}