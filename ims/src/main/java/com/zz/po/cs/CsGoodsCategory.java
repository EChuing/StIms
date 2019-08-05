package com.zz.po.cs;

public class CsGoodsCategory {
    private Integer id;

    private String cgcCategoryName;

    private Integer cgcNum;

    private String cgcRegistrationTime;
    
    private Integer cgsDeleteState;

    
    public Integer getCgsDeleteState() {
		return cgsDeleteState;
	}

	public void setCgsDeleteState(Integer cgsDeleteState) {
		this.cgsDeleteState = cgsDeleteState;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getCgcCategoryName() {
		return cgcCategoryName;
	}

	public void setCgcCategoryName(String cgcCategoryName) {
		this.cgcCategoryName = cgcCategoryName;
	}

	public Integer getCgcNum() {
        return cgcNum;
    }

    public void setCgcNum(Integer cgcNum) {
        this.cgcNum = cgcNum;
    }

	public String getCgcRegistrationTime() {
		return cgcRegistrationTime;
	}

	public void setCgcRegistrationTime(String cgcRegistrationTime) {
		this.cgcRegistrationTime = cgcRegistrationTime;
	}

	@Override
	public String toString() {
		return "CsGoodsCategory{" +
				"id=" + id +
				", cgcCategoryName='" + cgcCategoryName + '\'' +
				", cgcNum=" + cgcNum +
				", cgcRegistrationTime='" + cgcRegistrationTime + '\'' +
				", cgsDeleteState=" + cgsDeleteState +
				'}';
	}
}