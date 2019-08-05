package com.zz.service.push;

import java.util.Map;

public interface PushBkApiService {
    // login接口
    public static final String login = "http://offline.openapi.zufangzi.com/user/login";
    // loginV2接口
    public static final String loginV2 = "http://offline.openapi.zufangzi.com/user/loginV2";
    // verifyToken接口
    public static final String verifyToken = "http://offline.openapi.zufangzi.com/user/verifyToken";
    // 获取品牌列表
    public static final String getBrandList = "http://offline.openapi.zufangzi.com/user/getBrandList";
    // 设置品牌
    public static final String setBrand = "http://offline.openapi.zufangzi.com/user/setBrand";
    // 小区对齐接口
    public static final String match = "http://offline.openapi.zufangzi.com/resblock/match";
    // 城区查询
    public static final String queryDistrict = "http://offline.openapi.zufangzi.com/common/queryDistrict";
    // 商圈查询接口
    public static final String queryBizcircle = "http://offline.openapi.zufangzi.com/common/queryBizcircle";
    // 发布房屋
    public static final String publishHouse = "http://offline.openapi.zufangzi.com/dcentral/house/publish";
    // 更新房屋
    public static final String editHouse = "http://offline.openapi.zufangzi.com/dcentral/house/edit";
    // 发布出租单元
    public static final String publishRentUnit = "http://offline.openapi.zufangzi.com/dcentral/rentUnit/publish";
    // 更新出租单元
    public static final String editRentUnit = "http://offline.openapi.zufangzi.com/dcentral/rentUnit/edit";
    // 更新价格接口
    public static final String editPayment = "http://offline.openapi.zufangzi.com/house/editPayment";
    // 上传图片
    public static final String uploadImage = "http://offline.openapi.zufangzi.com/image/upload";
    // 上下架出租单元
    public static final String onoffHouse = "http://offline.openapi.zufangzi.com/dcentral/house/onoff";
    // 房源状态回调注册接口
    public static final String registerCallback = "http://offline.openapi.zufangzi.com/third/registerCallback";
    
    public Map getAccessToken();
    public String sign(Map params,String appkey);
    public String post(Map map, String type);
    public String login();
}
