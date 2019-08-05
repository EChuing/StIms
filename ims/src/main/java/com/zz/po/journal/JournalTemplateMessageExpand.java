package com.zz.po.journal;

public class JournalTemplateMessageExpand extends JournalTemplateMessage {
    private Integer toUserId;   //接收人id
    private String toUserType; //接收人类型
    private Integer coId;  //公司ID
    private String code;//微信授权页面code
    private String wxOpenid;    //用户openid
    private String accessToken;    //公众号Token
    private long tokenLastTime;   //最近一次获取token的时间
    private String gzhAccessToken;    //公众号Token
    private long gzhTokenLastTime;   //最近一次获取token的时间
    private String secret; //微信秘钥
    private Integer ssitId ;
    private String firstValue;
    private String remarkValue;
    private String keyValue1;
    private String keyValue2;
    private String keyValue3;
    private String keyValue4;
    private String keyValue5;
    private String keyValue6;
    private Integer jtoId; //挂单id

    public Integer getJtoId() {
        return jtoId;
    }

    public void setJtoId(Integer jtoId) {
        this.jtoId = jtoId;
    }

    public Integer getSsitId() {
        return ssitId;
    }

    public void setSsitId(Integer ssitId) {
        this.ssitId = ssitId;
    }

    public String getFirstValue() {
        return firstValue;
    }
    public void setFirstValue(String firstValue) {
        this.firstValue = firstValue;
    }

    public String getRemarkValue() {
        return remarkValue;
    }

    public void setRemarkValue(String remarkValue) {
        this.remarkValue = remarkValue;
    }

    public Integer getToUserId() {
        return toUserId;
    }

    public void setToUserId(Integer toUserId) {
        this.toUserId = toUserId;
    }

    public String getToUserType() {
        return toUserType;
    }

    public void setToUserType(String toUserType) {
        this.toUserType = toUserType;
    }

    public Integer getCoId() {
        return coId;
    }

    public void setCoId(Integer coId) {
        this.coId = coId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getWxOpenid() {
        return wxOpenid;
    }

    public void setWxOpenid(String wxOpenid) {
        this.wxOpenid = wxOpenid;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public long getTokenLastTime() {
        return tokenLastTime;
    }

    public void setTokenLastTime(long tokenLastTime) {
        this.tokenLastTime = tokenLastTime;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public String getKeyValue1() {
        return keyValue1;
    }

    public void setKeyValue1(String keyValue1) {
        this.keyValue1 = keyValue1;
    }

    public String getKeyValue2() {
        return keyValue2;
    }

    public void setKeyValue2(String keyValue2) {
        this.keyValue2 = keyValue2;
    }

    public String getKeyValue3() {
        return keyValue3;
    }

    public void setKeyValue3(String keyValue3) {
        this.keyValue3 = keyValue3;
    }

    public String getKeyValue4() {
        return keyValue4;
    }

    public void setKeyValue4(String keyValue4) {
        this.keyValue4 = keyValue4;
    }

    public String getKeyValue5() {
        return keyValue5;
    }

    public void setKeyValue5(String keyValue5) {
        this.keyValue5 = keyValue5;
    }

    public String getKeyValue6() {
        return keyValue6;
    }

    public void setKeyValue6(String keyValue6) {
        this.keyValue6 = keyValue6;
    }

    public String getGzhAccessToken() {
        return gzhAccessToken;
    }

    public void setGzhAccessToken(String gzhAccessToken) {
        this.gzhAccessToken = gzhAccessToken;
    }

    public long getGzhTokenLastTime() {
        return gzhTokenLastTime;
    }

    public void setGzhTokenLastTime(long gzhTokenLastTime) {
        this.gzhTokenLastTime = gzhTokenLastTime;
    }

    @Override
    public String toString() {
        return "JournalTemplateMessageExpand{" +
                "toUserId=" + toUserId +
                ", toUserType='" + toUserType + '\'' +
                ", coId=" + coId +
                ", code='" + code + '\'' +
                ", wxOpenid='" + wxOpenid + '\'' +
                ", accessToken='" + accessToken + '\'' +
                ", tokenLastTime=" + tokenLastTime +
                ", gzhAccessToken='" + gzhAccessToken + '\'' +
                ", gzhTokenLastTime=" + gzhTokenLastTime +
                ", secret='" + secret + '\'' +
                ", ssitId=" + ssitId +
                ", firstValue='" + firstValue + '\'' +
                ", remarkValue='" + remarkValue + '\'' +
                ", keyValue1='" + keyValue1 + '\'' +
                ", keyValue2='" + keyValue2 + '\'' +
                ", keyValue3='" + keyValue3 + '\'' +
                ", keyValue4='" + keyValue4 + '\'' +
                ", keyValue5='" + keyValue5 + '\'' +
                ", keyValue6='" + keyValue6 + '\'' +
                '}';
    }
}
