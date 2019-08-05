package com.zz.po.cs;

public class CsGoodsInventory {
    private Integer cgiId;

    private Integer cgiGoodsId;

    private Integer cgiOperationId;

    private Integer cgiBeforeNum;

    private Integer cgiUpdateNum;

    private String cgiRemark;

    private String cgiRegisterTime;
    
    private String startNum;
   	private String endNum;
   	private String totalNum;
   	private String splitFlag;
   	
   	private String suStaffName;
   	
   	private String cgName;
   	private String cgCode;
   	
   	private String startTime;
   	private String endTime;
   	
   	

    public String getCgCode() {
		return cgCode;
	}

	public void setCgCode(String cgCode) {
		this.cgCode = cgCode;
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

	public String getSplitFlag() {
		return splitFlag;
	}

	public void setSplitFlag(String splitFlag) {
		this.splitFlag = splitFlag;
	}

	public String getSuStaffName() {
		return suStaffName;
	}

	public void setSuStaffName(String suStaffName) {
		this.suStaffName = suStaffName;
	}

	public String getCgName() {
		return cgName;
	}

	public void setCgName(String cgName) {
		this.cgName = cgName;
	}

	public Integer getCgiId() {
        return cgiId;
    }

    public void setCgiId(Integer cgiId) {
        this.cgiId = cgiId;
    }

    public Integer getCgiGoodsId() {
        return cgiGoodsId;
    }

    public void setCgiGoodsId(Integer cgiGoodsId) {
        this.cgiGoodsId = cgiGoodsId;
    }

    public Integer getCgiOperationId() {
        return cgiOperationId;
    }

    public void setCgiOperationId(Integer cgiOperationId) {
        this.cgiOperationId = cgiOperationId;
    }

    public Integer getCgiBeforeNum() {
        return cgiBeforeNum;
    }

    public void setCgiBeforeNum(Integer cgiBeforeNum) {
        this.cgiBeforeNum = cgiBeforeNum;
    }

    public Integer getCgiUpdateNum() {
        return cgiUpdateNum;
    }

    public void setCgiUpdateNum(Integer cgiUpdateNum) {
        this.cgiUpdateNum = cgiUpdateNum;
    }

    public String getCgiRemark() {
        return cgiRemark;
    }

    public void setCgiRemark(String cgiRemark) {
        this.cgiRemark = cgiRemark == null ? null : cgiRemark.trim();
    }

    public String getCgiRegisterTime() {
        return (cgiRegisterTime != null && cgiRegisterTime.length() > 19) ? cgiRegisterTime.substring(0,19) : cgiRegisterTime;
    }

    public void setCgiRegisterTime(String cgiRegisterTime) {
        this.cgiRegisterTime = cgiRegisterTime == null ? null : cgiRegisterTime.trim();
    }
}