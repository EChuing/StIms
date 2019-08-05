package com.zz.po.info;

/**
 * 客户来源表
 */
public class InfoCustomerSourceStatistics {
    private Integer icssId;

    private String icssAllJson;

    private String icssSortJson;

    private String icssType;

    private String icssTime;

    public Integer getIcssId() {
        return icssId;
    }

    public void setIcssId(Integer icssId) {
        this.icssId = icssId;
    }

    public String getIcssAllJson() {
        return icssAllJson;
    }

    public void setIcssAllJson(String icssAllJson) {
        this.icssAllJson = icssAllJson == null ? null : icssAllJson.trim();
    }

    public String getIcssSortJson() {
        return icssSortJson;
    }

    public void setIcssSortJson(String icssSortJson) {
        this.icssSortJson = icssSortJson == null ? null : icssSortJson.trim();
    }

    public String getIcssType() {
        return icssType;
    }

    public void setIcssType(String icssType) {
        this.icssType = icssType == null ? null : icssType.trim();
    }

    public String getIcssTime() {
        return (icssTime != null && icssTime.length() > 19) ? icssTime.substring(0,19) : icssTime;
    }

    public void setIcssTime(String icssTime) {
        this.icssTime = icssTime == null ? null : icssTime.trim();
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