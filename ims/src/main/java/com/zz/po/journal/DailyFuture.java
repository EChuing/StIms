package com.zz.po.journal;

/**
 * 每天计算未来30天相关数据（老板大日历）
 */
public class DailyFuture {
    private Integer dfId;

    private String dfDate;

    private Double dfWillIncome;

    private Double dfWillPay;

    private Integer dfLandlordCheckout;

    private Integer dfRenterCheckout;

    private String dfTime;

    public Integer getDfId() {
        return dfId;
    }

    public void setDfId(Integer dfId) {
        this.dfId = dfId;
    }

    public String getDfDate() {
        return dfDate;
    }

    public void setDfDate(String dfDate) {
        this.dfDate = dfDate == null ? null : dfDate.trim();
    }

    public Double getDfWillIncome() {
        return dfWillIncome;
    }

    public void setDfWillIncome(Double dfWillIncome) {
        this.dfWillIncome = dfWillIncome;
    }

    public Double getDfWillPay() {
        return dfWillPay;
    }

    public void setDfWillPay(Double dfWillPay) {
        this.dfWillPay = dfWillPay;
    }

    public Integer getDfLandlordCheckout() {
        return dfLandlordCheckout;
    }

    public void setDfLandlordCheckout(Integer dfLandlordCheckout) {
        this.dfLandlordCheckout = dfLandlordCheckout;
    }

    public Integer getDfRenterCheckout() {
        return dfRenterCheckout;
    }

    public void setDfRenterCheckout(Integer dfRenterCheckout) {
        this.dfRenterCheckout = dfRenterCheckout;
    }

    public String getDfTime() {
        return dfTime;
    }

    public void setDfTime(String dfTime) {
        this.dfTime = dfTime;
    }
    
    private String endDate;

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	@Override
	public String toString() {
		return "DailyFuture [dfId=" + dfId + ", dfDate=" + dfDate
				+ ", dfWillIncome=" + dfWillIncome + ", dfWillPay=" + dfWillPay
				+ ", dfLandlordCheckout=" + dfLandlordCheckout
				+ ", dfRenterCheckout=" + dfRenterCheckout + ", dfTime="
				+ dfTime + ", endDate=" + endDate + "]";
	}
    
}