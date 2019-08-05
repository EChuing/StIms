package com.zz.util;

//import com.alibaba.fastjson.JSON;
//import com.alibaba.fastjson.JSONObject;

import com.alibaba.fastjson.JSON;
import com.zz.other.Syslog;
import com.zz.po.journal.TemplateMessage;
import com.zz.po.journal.TemplateMsgData;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 这是个测试类，无效，可删除
 */
public class WxTemplateMessage {
    public static final String APPID = "wx3a3c75ffabba0845";

    public static final String APPSECRET = "f831c0c7da9197240bc4776ff055f86d";

    /**全局token 所有与微信有交互的前提 */
    public static String ACCESS_TOKEN;

    /**全局token上次获取事件 */
    public static long LASTTOKENTIME;

    /**
     * 获取全局token方法
     * 该方法通过使用HttpClient发送http请求，HttpGet()发送请求
     * 微信返回的json中access_token是我们的全局token
     */
    public static synchronized void getAccess_token(){
        if(ACCESS_TOKEN == null || System.currentTimeMillis() - LASTTOKENTIME > 7000*1000){
            try {
                //请求access_token地址
                String url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+APPID+"&secret="+APPSECRET;
                //创建提交方式
                HttpGet httpGet = new HttpGet(url);
                //获取到httpclien
                HttpClient httpClient = HttpClientBuilder.create().build();
                //发送请求并得到响应
                HttpResponse response = httpClient.execute(httpGet);
                //判断请求是否成功
                if(response.getStatusLine().getStatusCode() == HttpStatus.SC_OK){
                    //将得到的响应转为String类型
                    String str = EntityUtils.toString(response.getEntity(), "utf-8");
                    //字符串转json
                    JSONObject jsonObject = new JSONObject(str);
                    //输出access_token
                    System.out.println(jsonObject);
                }
            } catch (ClientProtocolException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                Syslog.writeErr(e);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
    }

    public static TemplateMessage msgEdit(){
        TemplateMessage templateMessage=new TemplateMessage();
        templateMessage.setTemplate_id("7v6Zjx9Wmw4xpN57RFz-G6hOV3q7TAa3dH7QZqsC89s");
        templateMessage.setTouser("oJ8HkviaKZFdMcmJL1ARobr2JSmA");
        templateMessage.setUrl("www.fangzhizun.com");

        Map<String , TemplateMsgData> mapData =new HashMap<>();
        TemplateMsgData first = new TemplateMsgData();
        first.setValue("您租住的麻布新村(八巷十栋)701房房租账单已产生，请及时交租！");
        first.setColor("#173177");
        mapData.put("first", first);

        TemplateMsgData keyword1 = new TemplateMsgData();
        keyword1.setValue("2015-06-01至2015-06-30");
        keyword1.setColor("#173177");
        mapData.put("keyword1",keyword1);
        TemplateMsgData keyword2 = new TemplateMsgData();
        keyword2.setValue("1500");
        keyword2.setColor("#173177");
        mapData.put("keyword2",keyword2);
        TemplateMsgData keyword3 = new TemplateMsgData();
        keyword3.setValue("2700");
        keyword3.setColor("#173177");
        mapData.put("keyword3",keyword3);
        TemplateMsgData keyword4 = new TemplateMsgData();
        keyword4.setValue("375.9");
        keyword4.setColor("#173177");
        mapData.put("keyword4",keyword4);
        TemplateMsgData keyword5 = new TemplateMsgData();
        keyword5.setValue("4575.9");
        keyword5.setColor("#173177");
        mapData.put("keyword5",keyword5);

        TemplateMsgData remark = new TemplateMsgData();
        remark.setValue("点击消息全文，微信在线交房租。");
        remark.setColor("#173177");
        mapData.put("remark", remark);

        templateMessage.setData(mapData);
        return templateMessage;
    }

    public static void sendMsg(String url,TemplateMessage templateMessage){
        try {
            HttpClient client =HttpClientBuilder.create().build();//构建一个Client
            HttpPost post = new HttpPost(url);//构建一个POST请求
            JSONObject json =new JSONObject(templateMessage);
            System.out.println(json);
            StringEntity s = new StringEntity(json.toString(), "UTF-8");
            s.setContentEncoding("UTF-8");
            s.setContentType("application/json; charset=UTF-8");
            post.setEntity(s);//设置编码，不然模板内容会乱码
            HttpResponse response = client.execute(post);//提交POST请求
            HttpEntity result = response.getEntity();//拿到返回的HttpResponse的"实体"
            String content = EntityUtils.toString(result);
            System.out.println(content);//打印返回的消息
            JSONObject res = new JSONObject(content);//转为json格式
        } catch (IOException e) {
            e.printStackTrace();Syslog.writeErr(e);
        }
    }

    /**
     * 获取用户openid
     * */
    public static String getOpenId() throws IOException {

        String code ="0711QzwG05GGbe2sRiyG0JqDwG01Qzwu";
        // 第二步：通过code换取网页授权access_token
        String getTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + APPID + "&secret="
                + APPSECRET + "&code=" + code + "&grant_type=authorization_code";
       System.out.println("获取token,getTokenUrl=" + getTokenUrl);
        com.alibaba.fastjson.JSONObject getTokenJson = doGetJson(getTokenUrl);
        /*
         * { "access_token":"ACCESS_TOKEN", "expires_in":7200,
         * "refresh_token":"REFRESH_TOKEN", "openid":"OPENID", "scope":"SCOPE" }
         */
       System.out.println("获取token,getTokenJson=" + getTokenJson.toJSONString());

        String openid = getTokenJson.getString("openid");
        String access_token = getTokenJson.getString("access_token");
        String refresh_token = getTokenJson.getString("refresh_token");

        // 第五步验证access_token是否失效；展示都不需要
        String vlidTokenUrl = "https://api.weixin.qq.com/sns/auth?access_token=" + access_token + "&openid=" + openid;
       System.out.println("验证token,vlidTokenUrl=" + vlidTokenUrl);
        com.alibaba.fastjson.JSONObject validTokenJson = doGetJson(vlidTokenUrl);
       System.out.println("验证token,validTokenJson=" + validTokenJson.toJSONString());
        if (!"0".equals(validTokenJson.getString("errcode"))) {
            // 第三步：刷新access_token（如果需要）-----暂时没有使用,参考文档https://mp.weixin.qq.com/wiki，
            String refreshTokenUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=" + openid
                    + "&grant_type=refresh_token&refresh_token=" + refresh_token;
            System.out.println("刷新token,refreshTokenUrl=" + refreshTokenUrl);
            com.alibaba.fastjson.JSONObject refreshTokenJson = doGetJson(refreshTokenUrl);
            /*
             * { "access_token":"ACCESS_TOKEN", "expires_in":7200,
             * "refresh_token":"REFRESH_TOKEN", "openid":"OPENID", "scope":"SCOPE" }
             */
            System.out.println("刷新token,refreshTokenJson=" + refreshTokenJson.toJSONString());
            access_token = refreshTokenJson.getString("access_token");
        }

        // 第四步：拉取用户信息(需scope为 snsapi_userinfo)
        String getUserInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openid
                + "&lang=zh_CN";
        System.out.println("获取用户信息，getUserInfoUrl=" + getUserInfoUrl);
        com.alibaba.fastjson.JSONObject getUserInfoJson = doGetJson(getUserInfoUrl);
        System.out.println("获取用户信息，getUserInfoJson=" + getUserInfoJson.toString());
        /*
         * end 获取微信用户基本信息
         */

        return getUserInfoJson.toString();
    }

    public static com.alibaba.fastjson.JSONObject doGetJson(String url )throws IOException {
        com.alibaba.fastjson.JSONObject jsonObject = null;
        HttpGet httpGet = new HttpGet(url);
        HttpClient client = HttpClientBuilder.create().build();
        HttpResponse response = client.execute(httpGet);
        HttpEntity entity = response.getEntity();
        if (entity != null) {
            // 把返回的结果转换为JSON对象
            String result = EntityUtils.toString(entity, "UTF-8");
            jsonObject = JSON.parseObject(result);
        }
        return jsonObject;
    }

    public  static String  getCode() throws Exception{
        String redirect_uri="http://www.fangzhizun.com/ims/ui/fg_wxAuthSuccess.jsp";
        String url="https://open.weixin.qq.com/connect/oauth2/authorize?" +
                "appid=" +APPID+
                "&redirect_uri=" +   URLEncoder.encode(redirect_uri,"utf-8")+
                "&response_type=code" +
                "&scope=snsapi_userinfo" +
                "&state=STATE" +
                "#wechat_redirect ";
        System.out.println("获取code, getCodeUrl=" + url);
        // response.sendRedirect(url);
        return  url;// 必须重定向，否则不能成功
    }

    
    public static void  getTemplate(){
        getAccess_token();
        String token="20_ztzafPnZl5UUO9hUn-m8U7wcmH5zhbVq6WAMcBAPtSZl77LBh-VmvjJYwmXE38IFn7YRzTN9WFCMZ2O6jhWA6MyXFXhYPVLVp_gJoReB2MAVfkybp4NSKV3b5RnOufd90rS4gJ8lvtfXRQDhCLVbAIAWFP";
        String url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token;
        TemplateMessage templateMessage= msgEdit();
//        sendMsg(url,templateMessage);

    }

    public static void main(String[] args) {
//        try {
////            getCode();
//            String url= "http://www.fangzhizun.com/about.html?code=011HDyNN1JXUc91IbGPN1WzBNN1HDyNK&state=STATE";
////            doGetJson(url);
//            getOpenId();
//        } catch (Exception e) {
//            e.printStackTrace();Syslog.writeErr(e);
//        }

// 按指定模式在字符串查找
        String co = "hz";
        String place = "hz/1";
        if (co != null || co != "") {// 判断该设备房子是否属于公司
            String pattern = "(.*)(\\/)";
            Pattern r = Pattern.compile(pattern);
            Matcher m = r.matcher(place);
            if (!m.find() || !m.group(1).equals(co)) {
                System.out.println("a");
            }
            System.out.println("Found value: " + m.group(1).equals(co));
        }
    }



}
