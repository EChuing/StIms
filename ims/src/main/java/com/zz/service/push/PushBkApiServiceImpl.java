package com.zz.service.push;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zz.other.Syslog;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.http.ParseException;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.ActionContext;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.po.sys.SysSystemSetting;
import com.zz.service.sys.SysSystemSettingService;

public class PushBkApiServiceImpl implements PushBkApiService {
    private SysSystemSettingService sysSystemSettingService;

    public void setSysSystemSettingService( SysSystemSettingService sysSystemSettingService) {
        this.sysSystemSettingService = sysSystemSettingService;
    }

    /**
     * 获取授权码
     * 通过查询品牌列表来判定授权码是否有效
     * 有效直接返回
     * 无效重新登录，获取新的并更新数据库
     * @return
     */
    @Override
    public Map getAccessToken() {
        try {
            SysSystemSetting sst = sysSystemSettingService.selectByPrimaryKey(1);
            String appId = sst.getSsitBkAppId();
            String appKey = sst.getSsitBkAppKey();
            String userName = sst.getSsitBkUserName();
            String password = sst.getSsitBkPassword();
            String accessToken = sst.getSsitBkAccessToken();
            if(accessToken != null && !"".equals(accessToken)){
                Map<String, String> map = new HashMap<String, String>();
                map.put("appId", appId);
                map.put("mt", String.valueOf(new Date().getTime()));
                map.put("accessToken", accessToken);
                map.put("signCode", sign(map, appKey));
                String result = post(map, "getBrandList");
                JSONObject resultObj = JSON.parseObject(result);
                int errorCode = (int) resultObj.get("errorCode");
                if (errorCode != 200000) {
                    accessToken = login();
                }
            }else {
                accessToken = login();
            }
            if("error".equals(accessToken)){
                return null;
            }
            Map<String, String> map = new HashMap<String, String>();
            map.put("appId", appId);
            map.put("mt", String.valueOf(new Date().getTime()));
            map.put("accessToken", accessToken);
            map.put("appKey", appKey);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            return null;
        }
    }

    @Override
    public String sign(Map params, String appkey) {
        List<String> keys = new ArrayList<>(params.keySet());
        Collections.sort(keys);
        StringBuilder sb = new StringBuilder();
        keys.forEach(k->sb.append(k).append(params.get(k)));
        sb.append(appkey);
        return DigestUtils.sha256Hex(sb.toString());
    }

    //贝壳form提交
    @Override
    public String post(Map map, String type) {
        String url = "";
        switch (type) {
            case "login": url = login; break;
            case "loginV2": url = loginV2; break;
            case "verifyToken": url = verifyToken; break;
            case "getBrandList": url = getBrandList; break;
            case "setBrand": url = setBrand; break;
            case "match": url = match; break;
            case "queryDistrict": url = queryDistrict; break;
            case "queryBizcircle": url = queryBizcircle; break;
            case "publishHouse": url = publishHouse; break;
            case "editHouse": url = editHouse; break;
            case "publishRentUnit": url = publishRentUnit; break;
            case "editRentUnit": url = editRentUnit; break;
            case "editPayment": url = editPayment; break;
            case "uploadImage": url = uploadImage; break;
            case "onoffHouse": url = onoffHouse; break;
            case "registerCallback": url = registerCallback; break;
        }
        String resultStr;
        try {
            resultStr = HttpRequestUtil.send(url, map, "utf-8");
        } catch (ParseException | IOException e) {
            e.printStackTrace();Syslog.writeErr(e);
            return "error";
        }
        Object result = JSON.parse(resultStr);
        System.out.println("请求返回：" + result);
        return resultStr;
    }

    //登录并返回accessToken,登录之后设置房源状态回调接口
    @Override
    public String login() {
        try {
            //1.grantToken
            SysSystemSetting sst = sysSystemSettingService.selectByPrimaryKey(1);
            String appId = sst.getSsitBkAppId();
            String appKey = sst.getSsitBkAppKey();
            String userName = sst.getSsitBkUserName();
            String password = sst.getSsitBkPassword();
            Map<String, String> map = new HashMap<String, String>();
            map.put("appId", appId);
            map.put("mt", String.valueOf(new Date().getTime()));
            map.put("userName", userName);
            map.put("password", password);
            map.put("signCode", sign(map, appKey));
            String result = post(map, "login");
            JSONObject resultObj = JSON.parseObject(result);
            int errorCode = (int) resultObj.get("errorCode");
            if (errorCode != 200000) {
                return "error";
            }
            JSONObject data = resultObj.getJSONObject("data");
            String grantToken = (String) data.get("grantToken");
            //2.accessToken
            Map<String, String> map2 = new HashMap<String, String>();
            map2.put("appId", appId);
            map2.put("mt", String.valueOf(new Date().getTime()));
            map2.put("grantToken", grantToken);
            map2.put("signCode", sign(map2, appKey));
            String result2 = post(map2, "verifyToken");
            JSONObject resultObj2 = JSON.parseObject(result2);
            int errorCode2 = (int) resultObj2.get("errorCode");
            if (errorCode2 != 200000) {
                return "error";
            }
            JSONObject data2 = resultObj2.getJSONObject("data");
            String accessToken = (String) data2.get("accessToken");
            //3.更新数据库
            SysSystemSetting sysSystemSetting = new SysSystemSetting();
            sysSystemSetting.setSsitId(1);
            sysSystemSetting.setSsitBkAccessToken(accessToken);
            sysSystemSettingService.updateByPrimaryKeySelective(sysSystemSetting);
            //4.设置房源状态回调接口
            String coId = (String) ActionContext.getContext().getSession().get("coId");
            Map<String, String> map3 = new HashMap<String, String>();
            map3.put("appId", appId);
            map3.put("mt", String.valueOf(new Date().getTime()));
            map3.put("accessToken", accessToken);
            map3.put("callbackUrl", "http://www.fangzhizun.com/beike/houseStatus/?coId=" + coId);
            map3.put("signCode", sign(map3, appKey));
            String result3 = post(map3, "registerCallback");
            JSONObject resultObj3 = JSON.parseObject(result3);
            int errorCode3 = (int) resultObj3.get("errorCode");
            if (errorCode3 != 200000) {
                return "error";
            }
            return accessToken;
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            return "error";
        }
    }

}
