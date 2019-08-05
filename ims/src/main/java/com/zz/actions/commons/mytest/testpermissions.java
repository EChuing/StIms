//package com.zz.actions.commons.mytest;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.apache.commons.codec.digest.DigestUtils;
//import org.apache.http.HttpEntity;
//import org.apache.http.NameValuePair;
//import org.apache.http.ParseException;
//import org.apache.http.client.entity.UrlEncodedFormEntity;
//import org.apache.http.client.methods.CloseableHttpResponse;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.message.BasicNameValuePair;
//import org.apache.http.util.EntityUtils;
//
//import com.alibaba.fastjson.JSON;
//import com.alibaba.fastjson.JSONArray;
//import com.alibaba.fastjson.JSONObject;
//
//public class testpermissions {
//    private static final String appId = "offline.zhizunyu.com";
//    private static final String appkey = "NGY5YzliNjhhOTNiZWVkMg==";
//    private static final String api = "http://offline.openapi.zufangzi.com/";
//
//	public static void main(String[] args) throws ParseException, IOException {
//	    //login接口
////	    String grantToken = getGrantToken();
//	    //verifyToken接口
////	    String accessToken = getAccessToken(grantToken);
//	    //获取品牌列表
////	    String brandList = getBrandList(accessToken);
//	    //房源状态回调注册接口
////	    registerCallback(accessToken);
//	    //发布房屋
//	    
//	    Map map = new HashMap();
//	    map.put("a", 1);
//	    Map map2 = null;
//	    map.putAll(map2);
//	    System.out.println(map.toString());
//    }
//	
//	public static String getGrantToken() throws ParseException, IOException {
//        String url = api + "user/login";
//        Map<String, String> map = new HashMap<String, String>();
//        map.put("appId", appId);
//        map.put("mt", String.valueOf(new Date().getTime()));
//        map.put("userName", "ZZYSJDJZY01391");
//        map.put("password", "6uvn1rvq");
//        map.put("signCode", sign(map, appkey));
//        String result = send(url, map,"utf-8");
//        System.out.println("响应结果：");
//        System.out.println(result);
//        JSONObject resultObj = JSON.parseObject(result);
//        int errorCode = (int) resultObj.get("errorCode");
//        String msg = (String) resultObj.get("msg");
//        if (errorCode != 200000) {
//            return "";
//        }
//        JSONObject data = resultObj.getJSONObject("data");
//        String grantToken = (String) data.get("grantToken");
//        System.out.println(grantToken);
//        return grantToken;
//    }
//	
//	public static String getAccessToken(String grantToken) throws ParseException, IOException {
//	    String url = api + "user/verifyToken";
//        Map<String, String> map = new HashMap<String, String>();
//        map.put("appId", appId);
//        map.put("mt", String.valueOf(new Date().getTime()));
//        map.put("grantToken", grantToken);
//        map.put("signCode", sign(map, appkey));
//        String result = send(url, map,"utf-8");
//        System.out.println("响应结果：");
//        System.out.println(result);
//        JSONObject resultObj = JSON.parseObject(result);
//        int errorCode = (int) resultObj.get("errorCode");
//        String msg = (String) resultObj.get("msg");
//        if (errorCode != 200000) {
//            return "";
//        }
//        JSONObject data = resultObj.getJSONObject("data");
//        String accessToken = (String) data.get("accessToken");
//        System.out.println(accessToken);
//        return accessToken;
//	}
//    
//    public static String getBrandList(String accessToken) throws ParseException, IOException {
//        String url = api + "user/getBrandList";
//        Map<String, String> map = new HashMap<String, String>();
//        map.put("appId", appId);
//        map.put("mt", String.valueOf(new Date().getTime()));
//        map.put("accessToken", accessToken);
//        map.put("signCode", sign(map, appkey));
//        String result = send(url, map,"utf-8");
//        System.out.println("响应结果：");
//        System.out.println(result);
//        JSONObject resultObj = JSON.parseObject(result);
//        int errorCode = (int) resultObj.get("errorCode");
//        String msg = (String) resultObj.get("msg");
//        if (errorCode != 200000) {
//            return "";
//        }
//        JSONArray data = (JSONArray) resultObj.get("data");
//        System.out.println(data);
//        return data.toString();
//    }
//    
//    public static String registerCallback(String accessToken) throws ParseException, IOException {
//        String url = api + "third/registerCallback";
//        Map<String, String> map = new HashMap<String, String>();
//        map.put("appId", appId);
//        map.put("mt", String.valueOf(new Date().getTime()));
//        map.put("accessToken", accessToken);
//        map.put("callbackUrl", "http://www.fangzhizun.com/beike/upload/?co=hz");
//        map.put("signCode", sign(map, appkey));
//        String result = send(url, map,"utf-8");
//        System.out.println("响应结果：");
//        System.out.println(result);
//        JSONObject resultObj = JSON.parseObject(result);
//        int errorCode = (int) resultObj.get("errorCode");
//        String msg = (String) resultObj.get("msg");
//        if (errorCode != 200000) {
//            return "";
//        }
//        return "success";
//    }
//    
//    
//	
//	public static String sign(Map<String, String> params,String appkey) {
//	    List<String> keys = new ArrayList<>(params.keySet());
//	    Collections.sort(keys);
//	    StringBuilder sb = new StringBuilder();
//	    keys.forEach(k->sb.append(k).append(params.get(k)));
//	    sb.append(appkey);
//	    return DigestUtils.sha256Hex(sb.toString());
//	}
//	
//	/**
//     * 模拟请求
//     * 
//     * @param url       资源地址
//     * @param map   参数列表
//     * @param encoding  编码
//     * @return
//     * @throws ParseException
//     * @throws IOException
//     */
//    public static String send(String url, Map<String,String> map,String encoding) throws ParseException, IOException{
//        String body = "";
// 
//        //创建httpclient对象
//        CloseableHttpClient client = HttpClients.createDefault();
//        //创建post方式请求对象
//        HttpPost httpPost = new HttpPost(url);
//        
//        //装填参数
//        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
//        if(map!=null){
//            for (Map.Entry<String, String> entry : map.entrySet()) {
//                nvps.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
//            }
//        }
//        //设置参数到请求对象中
//        httpPost.setEntity(new UrlEncodedFormEntity(nvps, encoding));
// 
//        System.out.println("请求地址："+url);
//        System.out.println("请求参数："+nvps.toString());
//        
//        //设置header信息
//        //指定报文头【Content-type】、【User-Agent】
//        httpPost.setHeader("Content-type", "application/x-www-form-urlencoded");
//        httpPost.setHeader("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
//        
//        //执行请求操作，并拿到结果（同步阻塞）
//        CloseableHttpResponse response = client.execute(httpPost);
//        //获取结果实体
//        HttpEntity entity = response.getEntity();
//        if (entity != null) {
//            //按指定编码转换结果实体为String类型
//            body = EntityUtils.toString(entity, encoding);
//        }
//        EntityUtils.consume(entity);
//        //释放链接
//        response.close();
//        return body;
//    }
//		
//}	
//	 
//	
//	