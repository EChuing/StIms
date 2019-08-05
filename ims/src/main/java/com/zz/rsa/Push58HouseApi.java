package com.zz.rsa;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.zz.other.Syslog;
import org.apache.http.client.ClientProtocolException;

import com.alibaba.fastjson.JSON;
import com.zz.actions.commons.HttpRequestUtil;

public class Push58HouseApi {
	public static final String privateKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJIIkG76p8gLwucLnDaC9Th7KPyuDMvM0okbjolnOGl9VRr4R5JJJZqngukd2PAZizF3/aTp7ko6zdc3Zo5ZPBRiSJos01w3t54RAP/wuQBBw8oyWvUs4y6V+lK0w5iIMdcVp2cd2WT7Xs2XPFCfq8j55urshXwvRE0KM3JL4PZXAgMBAAECgYBnmcfN0+mAFEf7XdM/IP0TStyzFk9hrjeWqYQfmqj8vbvI3Gb6MwaIh1pqQ5CKFbUYLUY23vb8lmc9zcHmLwxdXwmBaEk7ad2My/zTGVm+5wB5KjM5y+OjzZutF2LGDDHL14+Z6qr8FtbiqM5ycrw7chZk2SumSkTtiVOjKkr+8QJBAMsB9cIUgmf0lPSIT1Eo4CTKmXdQ6jib0RkbwOV0mgaIrzl+l6xKozAo93lnFPV0HEG4WicpZo3kR6GRwUM8p3sCQQC4J0nEEp9A+QN8jgO4XmdyJ++lHKGgrW1+GwtpUIcph/yhNt1fXE5aqReyGxONVCxWeMV6Q9Pgi5NJxN9q28fVAkAduLS9bHlHNQTV5FsQe9aNLGhZkqwoC5AKiAiuz2p5iGt3FHSqUecgdu78hD4KTayRZqc0UphkL8bY/dj4uhmfAkAZdHzS2Iwg7AraVbsX6hy8f961YQ7Kag6fhtd9+D6mtABsvGu/OcAu8f6vhOSf/YmfblRFwUhxWnnCka8cU0L9AkEAgOgpVkg6mz99CkKzcGXGzRutzijnTptsNvyGoH3PZXcm5sfoAA5cE20SSGpfD2BB9Jshgfifqa1oSMAih6CqCw==";
	public static final String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSCJBu+qfIC8LnC5w2gvU4eyj8rgzLzNKJG46JZzhpfVUa+EeSSSWap4LpHdjwGYsxd/2k6e5KOs3XN2aOWTwUYkiaLNNcN7eeEQD/8LkAQcPKMlr1LOMulfpStMOYiDHXFadnHdlk+17NlzxQn6vI+ebq7IV8L0RNCjNyS+D2VwIDAQAB";
	
	//1.    新增房源接口
    public static final String api_house_add = "http://openapi.gongyu.58.com/house/api_house_add";
	public static final String test_api_house_add = "http://developer.gongyu.58v5.cn/house/api_house_add";
	//2.    房源状态修改接口
    public static final String api_house_status_modify = "http://openapi.gongyu.58.com/house/api_house_status_modify";
    public static final String test_api_house_status_modify = "http://developer.gongyu.58v5.cn/house/api_house_status_modify";
	//3.    房源删除接口
    public static final String api_house_del = "http://openapi.gongyu.58.com/house/api_house_del";
	public static final String test_api_house_del = "http://developer.gongyu.58v5.cn/house/api_house_del";
    //4.    修改房源接口（修改后直接转为已发布状态）
    public static final String api_house_modify = "http://openapi.gongyu.58.com/house/api_house_modify";
    public static final String test_api_house_modify = "http://developer.gongyu.58v5.cn/house/api_house_modify";
    //5.    房源信息获取接口
    public static final String api_house_info_get = "http://openapi.gongyu.58.com/house/api_house_info_get";
    public static final String test_api_house_info_get = "http://developer.gongyu.58v5.cn/house/api_house_info_get";
    //6.    预约信息获取接口
    public static final String api_order_info_get = "http://openapi.gongyu.58.com/order/api_order_info_get";
    public static final String test_api_order_info_get = "http://developer.gongyu.58v5.cn/order/api_order_info_get";
    //7.    商业信息获取接口
    public static final String api_get_biz_info = "http://openapi.gongyu.58.com/biz/api_get_biz_info";
    public static final String test_api_get_biz_info = "http://developer.gongyu.58v5.cn/biz/api_get_biz_info";
    //8.    数据统计获取接口
    public static final String api_get_biz_statistics = "http://openapi.gongyu.58.com/biz/api_get_biz_statistics";
    public static final String test_api_get_biz_statistics = "http://developer.gongyu.58v5.cn/biz/api_get_biz_statistics";
    //9.    电话列表获取接口
    public static final String api_biz_call_list = "http://openapi.gongyu.58.com/biz/api_biz_call_list";
    public static final String test_api_biz_call_list = "http://developer.gongyu.58v5.cn/biz/api_biz_call_list";
    //1.    新增门店接口
    //public static final String  = "";
    public static final String test_api_apartment_add = "http://developer.gongyu.58v5.cn/apartment/api_apartment_add";
    //2.    门店修改接口
    //public static final String  = "";
    public static final String test_api_apartment_update = "http://developer.gongyu.58v5.cn/apartment/api_apartment_update";
    //3.    门店删除接口（门店下属房型一起删除）
    //public static final String  = "";
    public static final String test_api_apartment_delete = "http://developer.gongyu.58v5.cn/apartment/api_apartment_delete";
    //4.    发布房型接口（发布完成后进入审核）
    //public static final String  = "";
    public static final String test_api_layout_add = "http://developer.gongyu.58v5.cn/apartment/api_layout_add";
    //5.    修改房型接口（修改完成后进入审核，正在审核的房型不可修改）
    //public static final String  = "";
    public static final String test_api_layout_update = "http://developer.gongyu.58v5.cn/apartment/api_layout_update";
    //6.    房型删除接口
    //public static final String  = "";
    public static final String test_api_layout_delete = "http://developer.gongyu.58v5.cn/apartment/api_layout_delete";
    //7.    房间添加接口（添加房间并绑定到现有的房型上）
    //public static final String  = "";
    public static final String test_api_apartmentroom_add = "http://developer.gongyu.58v5.cn/apartment/api_apartmentroom_add";
    //8.    房间修改接口（审核中房型不可将下属房间从 待出租状态修改至已出租状态）
    //public static final String  = "";
    public static final String test_api_apartmentroom_update = "http://developer.gongyu.58v5.cn/apartment/api_apartmentroom_update";
    //9.    房间删除接口（审核中房型 不可删除待出租状态下的下属房间）
    //public static final String  = "";
    public static final String test_api_apartmentroom_delete = "http://developer.gongyu.58v5.cn/apartment/api_apartmentroom_delete";
    //10.   上传图片接口（单张上传）
    //public static final String  = "";
    public static final String test_api_upload_attachment = "http://developer.gongyu.58v5.cn/util/api_upload_attachment";
    //11.   房源信息获取接口
    public static final String Api_house_info_get = "http://openapi.gongyu.58.com/house/Api_house_info_get";
    public static final String test_Api_house_info_get = "http://developer.gongyu.58v5.cn/house/Api_house_info_get";
    //12.   积分信息获取接口
    public static final String api_credit_info_get = "http://openapi.gongyu.58.com/house/api_credit_info_get";
    public static final String test_api_credit_info_get = "http://developer.gongyu.58v5.cn/house/api_credit_info_get";
    
    //58RSA加密后发送post请求
    public static String post(String json, int type){
        System.out.println("info=" + json);
        String en = ThirdRSACoder.encrypt(json, privateKey);
        System.out.println("en=" + en);
        String de = ThirdRSACoder.decrypt(en, publicKey);
        System.out.println("de=" + de);
        Map<String, String> map = new HashMap<String, String>();
        map.put("data", en);
        String url = "";
        switch (type) {
            case  1: url = api_house_add; break;
            case  2: url = api_house_status_modify; break;
            case  3: url = api_house_del; break;
            case  4: url = api_house_modify; break;
            case  5: url = api_house_info_get; break;
            case  6: url = api_order_info_get; break;
            case  7: url = api_get_biz_info; break;
            case  8: url = api_get_biz_statistics; break;
            case  9: url = api_biz_call_list; break;
            case 10: url = test_api_apartment_add; break;
            case 11: url = test_api_apartment_update; break;
            case 12: url = test_api_apartment_delete; break;
            case 13: url = test_api_layout_add; break;
            case 14: url = test_api_layout_update; break;
            case 15: url = test_api_layout_delete; break;
            case 16: url = test_api_apartmentroom_add; break;
            case 17: url = test_api_apartmentroom_update; break;
            case 18: url = test_api_apartmentroom_delete; break;
            case 19: url = test_api_upload_attachment; break;
            case 20: url = test_Api_house_info_get; break;
            case 21: url = test_api_credit_info_get; break;
        }
        try {
            String resultStr = ThirdHttpUtil.postResponse(url, map);
            Object result = JSON.parse(resultStr);
            System.out.println("http post result=" + result);
            return resultStr;
        } catch (ClientProtocolException e) {
            e.printStackTrace();Syslog.writeErr(e);
            return "error";
        } catch (IOException e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            return "error";
        }
    }
    
    //58字典查询
    public static String queryDict(String pid) {
        String url = "http://dict.58.com/api/local/getLocalList/?pid=" + pid + "&uid=test&token=595b8bd43587307f89ce194169bb4542&token_time=2015072915011";
        String result = HttpRequestUtil.get(url);
        return result;
    }
}
