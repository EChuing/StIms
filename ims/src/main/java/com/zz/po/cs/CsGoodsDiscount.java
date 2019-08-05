package com.zz.po.cs;

public class CsGoodsDiscount {
    private Integer cgdId;

    private Integer cgdCategoryId;

    private String cgdName;

    private String cgdType;

    private Integer cgdState;
    
    private String cgdDescribe;

    private String cgdMode;

    private String cgdRegisterTime;
    
    private String categoryName;

    public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCgdDescribe() {
		return cgdDescribe;
	}

	public void setCgdDescribe(String cgdDescribe) {
		this.cgdDescribe = cgdDescribe;
	}

	public String getCgdMode() {
		return cgdMode;
	}

	public void setCgdMode(String cgdMode) {
		this.cgdMode = cgdMode;
	}

	public Integer getCgdId() {
        return cgdId;
    }

    public void setCgdId(Integer cgdId) {
        this.cgdId = cgdId;
    }

    public Integer getCgdCategoryId() {
        return cgdCategoryId;
    }

    public void setCgdCategoryId(Integer cgdCategoryId) {
        this.cgdCategoryId = cgdCategoryId;
    }

    public String getCgdName() {
        return cgdName;
    }

    public void setCgdName(String cgdName) {
        this.cgdName = cgdName == null ? null : cgdName.trim();
    }

    public String getCgdType() {
        return cgdType;
    }

    public void setCgdType(String cgdType) {
        this.cgdType = cgdType == null ? null : cgdType.trim();
    }

    public Integer getCgdState() {
        return cgdState;
    }

    public void setCgdState(Integer cgdState) {
        this.cgdState = cgdState;
    }

    public String getCgdRegisterTime() {
        return cgdRegisterTime;
    }

    public void setCgdRegisterTime(String cgdRegisterTime) {
        this.cgdRegisterTime = cgdRegisterTime == null ? null : cgdRegisterTime.trim();
    }
}