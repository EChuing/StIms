package com.zz.po.sys;

public class SysStudent {
    @Override
    public String toString() {
        return "SysStudent{" +
                "id=" + id +
                ", studentNativePlace='" + studentNativePlace + '\'' +
                ", studentId=" + studentId +
                ", studentName='" + studentName + '\'' +
                ", studentPhone='" + studentPhone + '\'' +
                ", studentEmergencycontact='" + studentEmergencycontact + '\'' +
                ", studentRelationship='" + studentRelationship + '\'' +
                ", studentState='" + studentState + '\'' +
                ", studentClass='" + studentClass + '\'' +
                ", studentIdcard='" + studentIdcard + '\'' +
                ", studentIdcardAddress='" + studentIdcardAddress + '\'' +
                ", studentNowAddress='" + studentNowAddress + '\'' +
                ", studentClassId=" + studentClassId +
                ", studentUserNation='" + studentUserNation + '\'' +
                ", schoolId=" + schoolId +
                ", schoolName='" + schoolName + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStudentNativePlace() {
        return studentNativePlace;
    }

    public void setStudentNativePlace(String studentNativePlace) {
        this.studentNativePlace = studentNativePlace;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
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

    public String getStudentEmergencycontact() {
        return studentEmergencycontact;
    }

    public void setStudentEmergencycontact(String studentEmergencycontact) {
        this.studentEmergencycontact = studentEmergencycontact;
    }

    public String getStudentRelationship() {
        return studentRelationship;
    }

    public void setStudentRelationship(String studentRelationship) {
        this.studentRelationship = studentRelationship;
    }

    public String getStudentState() {
        return studentState;
    }

    public void setStudentState(String studentState) {
        this.studentState = studentState;
    }

    public String getStudentClass() {
        return studentClass;
    }

    public void setStudentClass(String studentClass) {
        this.studentClass = studentClass;
    }

    public String getStudentIdcard() {
        return studentIdcard;
    }

    public void setStudentIdcard(String studentIdcard) {
        this.studentIdcard = studentIdcard;
    }

    public String getStudentIdcardAddress() {
        return studentIdcardAddress;
    }

    public void setStudentIdcardAddress(String studentIdcardAddress) {
        this.studentIdcardAddress = studentIdcardAddress;
    }

    public String getStudentNowAddress() {
        return studentNowAddress;
    }

    public void setStudentNowAddress(String studentNowAddress) {
        this.studentNowAddress = studentNowAddress;
    }

    public Integer getStudentClassId() {
        return studentClassId;
    }

    public void setStudentClassId(Integer studentClassId) {
        this.studentClassId = studentClassId;
    }

    public String getStudentUserNation() {
        return studentUserNation;
    }

    public void setStudentUserNation(String studentUserNation) {
        this.studentUserNation = studentUserNation;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
        this.schoolId = schoolId;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    private Integer id;

    private String studentNativePlace;

    private Integer studentId;

    private String studentName;

    private String studentPhone;

    private String studentEmergencycontact;

    private String studentRelationship;

    private String studentState;

    private String studentClass;

    private String studentIdcard;

    private String studentIdcardAddress;

    private String studentNowAddress;

    private Integer studentClassId;

    private String studentUserNation;

    private Integer schoolId;

    private String schoolName;
}
