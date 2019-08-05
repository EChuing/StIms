package com.zz.po.journal;

public class JourScenarioPatternDescription {
    private Integer spdId;              //情景名称ID
    private Integer spdNumber;          //情景名称编号
    private String spdDescribe;         //情景名称

    public Integer getSpdId() {
        return spdId;
    }

    public void setSpdId(Integer spdId) {
        this.spdId = spdId;
    }

    public Integer getSpdNumber() {
        return spdNumber;
    }

    public void setSpdNumber(Integer spdNumber) {
        this.spdNumber = spdNumber;
    }

    public String getSpdDescribe() {
        return spdDescribe;
    }

    public void setSpdDescribe(String spdDescribe) {
        this.spdDescribe = spdDescribe;
    }

    @Override
    public String toString() {
        return "JourScenarioPatternDescription{" +
                "spdId=" + spdId +
                ", spdNumber=" + spdNumber +
                ", spdDescribe='" + spdDescribe + '\'' +
                '}';
    }
}
