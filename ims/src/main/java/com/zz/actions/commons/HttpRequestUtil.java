package com.zz.actions.commons;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.zz.other.Syslog;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class HttpRequestUtil {
    
    private static final String ENCODING = "UTF-8";

    /**
     * post请求
     * @param url
     * @param paramsMap
     * @return
     */
    public static String post(String url, Map<String, String> paramsMap) {
        CloseableHttpClient client = HttpClients.createDefault();
        String responseText = "";
        CloseableHttpResponse response = null;
        try {
            HttpPost method = new HttpPost(url);
            if (paramsMap != null) {
                List<NameValuePair> paramList = new ArrayList<NameValuePair>();
                for (Map.Entry<String, String> param : paramsMap.entrySet()) {
                    NameValuePair pair = new BasicNameValuePair(param.getKey(), param.getValue());
                    paramList.add(pair);
                }
                method.setEntity(new UrlEncodedFormEntity(paramList, ENCODING));
            }
            response = client.execute(method);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                responseText = EntityUtils.toString(entity);
            }
            System.out.println("post请求返回1  ："+responseText);
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
        } finally {
            try {
                response.close();
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
        return responseText;
    }
    
    /**
     * post请求，json格式，携带header参数
     * @param url
     * @param paramsMap
     * @return
     */
    public static String post(String url, String params, Map<String, String> header) {
        CloseableHttpClient client = HttpClients.createDefault();
        String responseText = "";
        CloseableHttpResponse response = null;
        try {
            HttpPost method = new HttpPost(url);
            Set set = header.keySet();
            Iterator it = set.iterator();
            while(it.hasNext()){
                String key = (String) it.next();
                String value = header.get(key);
                method.setHeader(key, value);
            }
            if (params != null) {
                method.setEntity(new StringEntity(params, ENCODING));
            }
            response = client.execute(method);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                responseText = EntityUtils.toString(entity);
            }
            System.out.println("post请求返回2 ："+responseText);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        } finally {
            try {
                response.close();
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
        return responseText;
    }
    
    /**
     * get请求
     * @param url
     * @return
     */
    public static String get(String url) {
        CloseableHttpClient client = HttpClients.createDefault();
        String responseText = "";
        CloseableHttpResponse response = null;
        try {
            HttpGet method = new HttpGet(url);
            response = client.execute(method);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                responseText = EntityUtils.toString(entity);
            }
            System.out.println("get请求返回2 ："+responseText);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        } finally {
            try {
                response.close();
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
        return responseText;
    }
    
    /**
     * get请求，携带header参数
     * @param url
     * @param header
     * @return
     */
    public static String get(String url, Map<String, String> header) {
        CloseableHttpClient client = HttpClients.createDefault();
        String responseText = "";
        CloseableHttpResponse response = null;
        try {
            HttpGet method = new HttpGet(url);
            Set set = header.keySet();
            Iterator it = set.iterator();
            while(it.hasNext()){
                String key = (String) it.next();
                String value = header.get(key);
                method.setHeader(key, value);
            }
            response = client.execute(method);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                responseText = EntityUtils.toString(entity);
            }
            System.out.println("get请求返回2 ："+responseText);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        } finally {
            try {
                response.close();
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
        return responseText;
    }
    
    /**
     * post请求,form格式
     * 
     * @param url   资源地址
     * @param map   参数列表
     * @param encoding  编码
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public static String send(String url, Map<String,String> map,String encoding) throws ParseException, IOException{
        String body = "";
 
        //创建httpclient对象
        CloseableHttpClient client = HttpClients.createDefault();
        //创建post方式请求对象
        HttpPost httpPost = new HttpPost(url);
        
        //装填参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        if(map!=null){
            for (Map.Entry<String, String> entry : map.entrySet()) {
            	System.out.println("entry.getKey():"+entry.getKey()+"|||entry.getValue() : "+entry.getValue());
                nvps.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }
        }
        //设置参数到请求对象中
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, encoding));
 
        System.out.println("请求地址："+url);
        System.out.println("请求参数："+nvps.toString());
        
        //设置header信息
        //指定报文头【Content-type】、【User-Agent】
        httpPost.setHeader("Content-type", "application/x-www-form-urlencoded");
        httpPost.setHeader("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
        
        //执行请求操作，并拿到结果（同步阻塞）
        CloseableHttpResponse response = client.execute(httpPost);
        //获取结果实体
        HttpEntity entity = response.getEntity();
        if (entity != null) {
            //按指定编码转换结果实体为String类型
            body = EntityUtils.toString(entity, encoding);
        }
        EntityUtils.consume(entity);
        //释放链接
        response.close();
        return body;
    }
}
