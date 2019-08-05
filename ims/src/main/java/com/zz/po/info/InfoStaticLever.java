package com.zz.po.info;

/**
 * 动态杠杆预测表
 */
public class InfoStaticLever {
    private Integer islId;

    private String islMonth;

    private Double islIncome;

    private Double islExpend;

    private Double islScale;

    private String islTime;

    public Integer getIslId() {
        return islId;
    }

    public void setIslId(Integer islId) {
        this.islId = islId;
    }

    public String getIslMonth() {
        return islMonth;
    }

    public void setIslMonth(String islMonth) {
        this.islMonth = islMonth == null ? null : islMonth.trim();
    }

    public Double getIslIncome() {
        return islIncome;
    }

    public void setIslIncome(Double islIncome) {
        this.islIncome = islIncome;
    }

    public Double getIslExpend() {
        return islExpend;
    }

    public void setIslExpend(Double islExpend) {
        this.islExpend = islExpend;
    }

    public Double getIslScale() {
        return islScale;
    }

    public void setIslScale(Double islScale) {
        this.islScale = islScale;
    }

    public String getIslTime() {
        return (islTime != null && islTime.length() > 19) ? islTime.substring(0,19) : islTime;
    }

    public void setIslTime(String islTime) {
        this.islTime = islTime == null ? null : islTime.trim();
    }
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
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
}