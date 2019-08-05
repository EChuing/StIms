package com.zz.po.cs;

public class CsGoodsDeviceRelation {
    private Integer cgdrId;

    private Integer cgdrGoodsId;

    private String cgdrSn;

    private String cgdrRegisterTime;
    
    private Integer cgdrState;
    private Integer cgdrGoodsSellId;

    public Integer getCgdrGoodsSellId() {
		return cgdrGoodsSellId;
	}

	public void setCgdrGoodsSellId(Integer cgdrGoodsSellId) {
		this.cgdrGoodsSellId = cgdrGoodsSellId;
	}

	public Integer getCgdrState() {
		return cgdrState;
	}

	public void setCgdrState(Integer cgdrState) {
		this.cgdrState = cgdrState;
	}

	public Integer getCgdrId() {
        return cgdrId;
    }

    public void setCgdrId(Integer cgdrId) {
        this.cgdrId = cgdrId;
    }

    public Integer getCgdrGoodsId() {
        return cgdrGoodsId;
    }

    public void setCgdrGoodsId(Integer cgdrGoodsId) {
        this.cgdrGoodsId = cgdrGoodsId;
    }

    public String getCgdrSn() {
        return cgdrSn;
    }

    public void setCgdrSn(String cgdrSn) {
        this.cgdrSn = cgdrSn == null ? null : cgdrSn.trim();
    }

    public String getCgdrRegisterTime() {
        return cgdrRegisterTime;
    }

    public void setCgdrRegisterTime(String cgdrRegisterTime) {
        this.cgdrRegisterTime = cgdrRegisterTime == null ? null : cgdrRegisterTime.trim();
    }

	@Override
	public String toString() {
		return "CsGoodsDeviceRelation [cgdrId=" + cgdrId + ", cgdrGoodsId=" + cgdrGoodsId + ", cgdrSn=" + cgdrSn
				+ ", cgdrRegisterTime=" + cgdrRegisterTime + ", cgdrState=" + cgdrState + ", cgdrGoodsSellId="
				+ cgdrGoodsSellId + "]";
	}
    
    
}