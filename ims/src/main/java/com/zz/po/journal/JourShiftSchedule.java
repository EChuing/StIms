package com.zz.po.journal;

public class JourShiftSchedule {
    private Integer jssId;

    private String jssWork1;

    private String jssOffwork1;

    private String jssStatus1;

    private String jssWork2;

    private String jssOffwork2;

    private String jssStatus2;

    private String jssWork3;

    private String jssOffwork3;

    private String jssStatus3;

    private String jssWork4;

    private String jssOffwork4;

    private String jssStatus4;

    private String jssSpace;
    
    private String jssJson;
    
    public String getJssJson() {
		return jssJson;
	}

	public void setJssJson(String jssJson) {
		this.jssJson = jssJson;
	}

	public Integer getJssId() {
        return jssId;
    }

    public void setJssId(Integer jssId) {
        this.jssId = jssId;
    }

    public String getJssWork1() {
        return jssWork1;
    }

    public void setJssWork1(String jssWork1) {
        this.jssWork1 = jssWork1 == null ? null : jssWork1.trim();
    }

    public String getJssOffwork1() {
        return jssOffwork1;
    }

    public void setJssOffwork1(String jssOffwork1) {
        this.jssOffwork1 = jssOffwork1 == null ? null : jssOffwork1.trim();
    }

    public String getJssStatus1() {
        return jssStatus1;
    }

    public void setJssStatus1(String jssStatus1) {
        this.jssStatus1 = jssStatus1 == null ? null : jssStatus1.trim();
    }

    public String getJssWork2() {
        return jssWork2;
    }

    public void setJssWork2(String jssWork2) {
        this.jssWork2 = jssWork2 == null ? null : jssWork2.trim();
    }

    public String getJssOffwork2() {
        return jssOffwork2;
    }

    public void setJssOffwork2(String jssOffwork2) {
        this.jssOffwork2 = jssOffwork2 == null ? null : jssOffwork2.trim();
    }

    public String getJssStatus2() {
        return jssStatus2;
    }

    public void setJssStatus2(String jssStatus2) {
        this.jssStatus2 = jssStatus2 == null ? null : jssStatus2.trim();
    }

    public String getJssWork3() {
        return jssWork3;
    }

    public void setJssWork3(String jssWork3) {
        this.jssWork3 = jssWork3 == null ? null : jssWork3.trim();
    }

    public String getJssOffwork3() {
        return jssOffwork3;
    }

    public void setJssOffwork3(String jssOffwork3) {
        this.jssOffwork3 = jssOffwork3 == null ? null : jssOffwork3.trim();
    }

    public String getJssStatus3() {
        return jssStatus3;
    }

    public void setJssStatus3(String jssStatus3) {
        this.jssStatus3 = jssStatus3 == null ? null : jssStatus3.trim();
    }

    public String getJssWork4() {
        return jssWork4;
    }

    public void setJssWork4(String jssWork4) {
        this.jssWork4 = jssWork4 == null ? null : jssWork4.trim();
    }

    public String getJssOffwork4() {
        return jssOffwork4;
    }

    public void setJssOffwork4(String jssOffwork4) {
        this.jssOffwork4 = jssOffwork4 == null ? null : jssOffwork4.trim();
    }

    public String getJssStatus4() {
        return jssStatus4;
    }

    public void setJssStatus4(String jssStatus4) {
        this.jssStatus4 = jssStatus4 == null ? null : jssStatus4.trim();
    }

    public String getJssSpace() {
        return jssSpace;
    }

    public void setJssSpace(String jssSpace) {
        this.jssSpace = jssSpace == null ? null : jssSpace.trim();
    }

	@Override
	public String toString() {
		return "JourShiftSchedule [jssId=" + jssId + ", jssWork1=" + jssWork1 + ", jssOffwork1=" + jssOffwork1
				+ ", jssStatus1=" + jssStatus1 + ", jssWork2=" + jssWork2 + ", jssOffwork2=" + jssOffwork2
				+ ", jssStatus2=" + jssStatus2 + ", jssWork3=" + jssWork3 + ", jssOffwork3=" + jssOffwork3
				+ ", jssStatus3=" + jssStatus3 + ", jssWork4=" + jssWork4 + ", jssOffwork4=" + jssOffwork4
				+ ", jssStatus4=" + jssStatus4 + ", jssSpace=" + jssSpace + ", jssJson=" + jssJson + "]";
	}
    
}