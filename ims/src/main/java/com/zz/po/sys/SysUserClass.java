package com.zz.po.sys;

public class SysUserClass{
    private String  studentName;
    private String  studentPhone;
    private String  studentId;
    private Integer sucId;
    private Integer sucUserId;
    private Integer sucClassId;

    private Integer hsId;

    private String hsAddCity;
    private String hsAddCommunity;
    private String hsState;

    private String startNum;
    private String endNum;
    private String totalNum;

    private Integer userId;
    private String jsonArray;
    private String type;



    public String getHsState() {
        return hsState;
    }

    public void setHsState(String hsState) {
        this.hsState = hsState;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getHsAddCity() {
        return hsAddCity;
    }

    public void setHsAddCity(String hsAddCity) {
        this.hsAddCity = hsAddCity;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentPhone() {
        return studentPhone;
    }

    public void setStudentPhone(String studentPhone) {
        this.studentPhone = studentPhone;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public Integer getSucId() {
        return sucId;
    }

    public void setSucId(Integer sucId) {
        this.sucId = sucId;
    }

    public Integer getSucUserId() {
        return sucUserId;
    }

    public void setSucUserId(Integer sucUserId) {
        this.sucUserId = sucUserId;
    }

    public Integer getSucClassId() {
        return sucClassId;
    }

    public void setSucClassId(Integer sucClassId) {
        this.sucClassId = sucClassId;
    }

    public Integer getHsId() {
        return hsId;
    }

    public void setHsId(Integer hsId) {
        this.hsId = hsId;
    }

    public String getHsAddCommunity() {
        return hsAddCommunity;
    }

    public void setHsAddCommunity(String hsAddCommunity) {
        this.hsAddCommunity = hsAddCommunity;
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

    public String getJsonArray() {
        return jsonArray;
    }

    public void setJsonArray(String jsonArray) {
        this.jsonArray = jsonArray;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "SysUserClass{" +
                "studentName='" + studentName + '\'' +
                ", studentPhone='" + studentPhone + '\'' +
                ", studentId='" + studentId + '\'' +
                ", sucId=" + sucId +
                ", sucUserId=" + sucUserId +
                ", sucClassId=" + sucClassId +
                ", hsId=" + hsId +
                ", hsAddCity='" + hsAddCity + '\'' +
                ", hsAddCommunity='" + hsAddCommunity + '\'' +
                ", hsState='" + hsState + '\'' +
                ", startNum='" + startNum + '\'' +
                ", endNum='" + endNum + '\'' +
                ", totalNum='" + totalNum + '\'' +
                ", userId=" + userId +
                ", jsonArray='" + jsonArray + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
