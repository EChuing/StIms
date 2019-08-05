package com.zz.service.journal;

import com.zz.mapper.journal.JournalTemplateMessageMapper;
import com.zz.mapper.journal.JournalTemplateSetupMapper;
import com.zz.mapper.sys.SysUserMapper;
import com.zz.other.Syslog;
import com.zz.po.journal.*;
import com.zz.po.sys.SysUserExpand;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.struts2.ServletActionContext;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JournalTemplateMessageServiceImpl implements JournalTemplateMessageService {

    @Autowired
    private JournalTemplateMessageMapper journalTemplateMessageMapper;
    @Autowired
    private SysUserMapper sysUserMapper;
    @Autowired
    private JournalTemplateSetupMapper journalTemplateSetupMapper;

    @Override
    public String getAccessToken(Integer companyId,Integer ssitId) throws Exception {
        JournalTemplateMessageExpand ssit = journalTemplateMessageMapper.selectAccessToken(ssitId);
        System.out.println("ssittoken   =  "+ssit.getGzhAccessToken());
        if (ssit.getGzhAccessToken()!=null&&ssit.getGzhAccessToken()!=""&&System.currentTimeMillis()-ssit.getGzhTokenLastTime()<3600*1000){
            System.out.println(System.currentTimeMillis()-ssit.getGzhTokenLastTime()<3600*1000);
            System.out.println("old");
            return ssit.getGzhAccessToken();
        }
        System.out.println("new");
        JournalTemplateMessageExpand company = journalTemplateMessageMapper.selectAppId(companyId);
        String accessToken="";
        String url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+company.getAppid()+"&secret="+company.getSecret();
        //创建提交方式
        HttpGet httpGet = new HttpGet(url);
        //获取到httpclient
        HttpClient httpClient = HttpClientBuilder.create().build();
        //发送请求并得到响应
        HttpResponse response = httpClient.execute(httpGet);
        //判断请求是否成功
        if(response.getStatusLine().getStatusCode() == HttpStatus.SC_OK){
            //将得到的响应转为String类型
            String str = EntityUtils.toString(response.getEntity(), "utf-8");
            //字符串转json
            JSONObject jsonObject = new JSONObject(str);
            System.out.println(jsonObject);
//            Integer errcode =(Integer) jsonObject.get("errcode");
            //输出access_token
            System.out.println(jsonObject);
            System.out.println("token    "+(String) jsonObject.get("access_token"));
            //给静态变量赋值，获取到access_token
            accessToken = (String) jsonObject.get("access_token");
            //更新数据库token
            JournalTemplateMessageExpand journalTemplateMessageExpand=new JournalTemplateMessageExpand();
            journalTemplateMessageExpand.setSsitId(ssitId);
            journalTemplateMessageExpand.setGzhAccessToken(accessToken);
            journalTemplateMessageExpand.setGzhTokenLastTime(System.currentTimeMillis());
            journalTemplateMessageMapper.updateAccessToken(journalTemplateMessageExpand);
        }
        return accessToken;
    }

    @Override
    public TemplateMessage editTemplateMsg(JournalTemplateMessageExpand record) throws Exception {
        System.out.println("datasourceName "+record.getDatasourceName());
        System.out.println("recordScene "+record.getScene());
//        JournalTemplateMessageExpand jtm=journalTemplateMessageMapper.selectByTemplateId(record.getTemplateId());
        JournalTemplateMessageExpand jtm=journalTemplateMessageMapper.selectByTemplateMsg(record);

        System.out.println(jtm.getScene());
        JournalTemplateSetup jts=journalTemplateSetupMapper.selectTemplateSetupByScene(jtm.getScene());
        if (jts==null){
            throw new Exception("不存在情景模板："+jtm.getScene());
        }
        System.out.println(record);
        System.out.println(record.getJtoId());
        System.out.println(jts);
        HttpSession session = ServletActionContext.getRequest().getSession();
        String co =(String)session.getAttribute("company");
        String contextPath = ServletActionContext.getRequest().getContextPath();
        System.out.println(contextPath);
        System.out.println("co ========="+co);
        if(record.getScene() ==3){
            jtm.setUrl("http://www.fangzhizun.com"+contextPath+"/discount.html?jtoId="+record.getJtoId()+"&co="+co);
        }

        TemplateMessage templateMessage=new TemplateMessage();
        templateMessage.setTemplate_id(jtm.getTemplateId());
        templateMessage.setUrl(jtm.getUrl());
        templateMessage.setTouser(getOpenIdByType(record));

        Map<String , TemplateMsgData> mapData =new HashMap<>();
        if(jts.getFirstName()!=null&&jts.getFirstName()!="") {
            TemplateMsgData first = new TemplateMsgData();
            first.setValue(record.getFirstValue());
            first.setColor(jts.getFirstColor());
            mapData.put("first", first);
        }
        if(jts.getRemarkName()!=null&&jts.getRemarkName()!="") {
            TemplateMsgData remark = new TemplateMsgData();
            remark.setValue(record.getRemarkValue());
            remark.setColor(jts.getRemarkColor());
            mapData.put("remark", remark);
        }
        if(jts.getKeyword1Name()!=null&&jts.getKeyword1Name()!=""){
            TemplateMsgData keyword1=new TemplateMsgData();
            keyword1.setValue(record.getKeyValue1());
            keyword1.setColor(jts.getKeyword1Color());
            mapData.put(jts.getKeyword1Name(),keyword1);
        }
        if(jts.getKeyword2Name()!=null&&jts.getKeyword2Name()!=""){
            TemplateMsgData keyword2=new TemplateMsgData();
            keyword2.setValue(record.getKeyValue2());
            keyword2.setColor(jts.getKeyword2Color());
            mapData.put(jts.getKeyword2Name(),keyword2);
        }
        if(jts.getKeyword3Name()!=null&&jts.getKeyword3Name()!=""){
            TemplateMsgData keyword3=new TemplateMsgData();
            keyword3.setValue(record.getKeyValue3());
            keyword3.setColor(jts.getKeyword3Color());
            mapData.put(jts.getKeyword3Name(),keyword3);
        }
        if(jts.getKeyword4Name()!=null&&jts.getKeyword4Name()!=""){
            TemplateMsgData keyword4=new TemplateMsgData();
            keyword4.setValue(record.getKeyValue4());
            keyword4.setColor(jts.getKeyword4Color());
            mapData.put(jts.getKeyword4Name(),keyword4);
        }
        if(jts.getKeyword5Name()!=null&&jts.getKeyword5Name()!=""){
            TemplateMsgData keyword5=new TemplateMsgData();
            keyword5.setValue(record.getKeyValue5());
            keyword5.setColor(jts.getKeyword5Color());
            mapData.put(jts.getKeyword5Name(),keyword5);
        }
        if(jts.getKeyword6Name()!=null&&jts.getKeyword6Name()!=""){
            TemplateMsgData keyword6=new TemplateMsgData();
            keyword6.setValue(record.getKeyValue6());
            keyword6.setColor(jts.getKeyword6Color());
            mapData.put(jts.getKeyword6Name(),keyword6);
        }
        templateMessage.setData(mapData);

        for (String key:mapData.keySet()) {
            System.out.println(mapData.get(key));
        }
        return templateMessage;
    }

    @Override
    public int sendTemplateMsg(TemplateMessage templateMessage, String accessToken) throws  Exception {
        try {
            String url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+accessToken;
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
            JSONObject jsonObject = new JSONObject(content);//转为json格式
            System.out.println(jsonObject);
            Integer errcode= (Integer) jsonObject.get("errcode");
            System.out.println("errcode="+errcode);
            if(errcode==40001){//accesstoken过期
                throw new Exception("access_token过期");
            }else if(errcode == 40003){
                throw new Exception("非法openid,请确认是否关注了公众号");
            }
            return  errcode;
        } catch (IOException e) {
            e.printStackTrace();
            Syslog.writeErr(e);
        }
        return -1;
    }

    @Override
    public String getCodeUrlByCompanyId(Integer companyId,Integer userId) throws Exception {
        JournalTemplateMessageExpand company = journalTemplateMessageMapper.selectAppId(companyId);
        System.out.println("getCodeUrlByCompanyId =="+companyId);
        //try测试版本uri
//      String redirect_uri="https://www.fangzhizun.com/try/wxAuth.html?coId="+companyId;
//      http://www.fangzhizun.com/ims/wxAuth.html?coId=1&code=081O1cky08bXQd1CrIjy0Vybky0O1ckv&state=75
        String redirect_uri="https://www.fangzhizun.com/ims/wxAuth.html?coId="+companyId;
        String codeUrl="https://open.weixin.qq.com/connect/oauth2/authorize?" +
                "appid=" +company.getAppid()+
                "&redirect_uri=" +   URLEncoder.encode(redirect_uri,"utf-8")+
                "&response_type=code"+
                "&scope=snsapi_base" +
                "&state=" +userId+
                "#wechat_redirect ";
        return codeUrl;
    }

    @Override
    public int getUserOpenId(Integer companyId, String code,Integer userId)throws  Exception {
        JournalTemplateMessageExpand company = journalTemplateMessageMapper.selectAppId(companyId);
        System.out.println("appId"+company.getAppid());
        String getTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + company.getAppid() + "&secret="
                + company.getSecret() + "&code=" + code + "&grant_type=authorization_code";
        System.out.println("url="+getTokenUrl);
        JSONObject jsonObject =doGetJson(getTokenUrl);
        System.out.println("json="+jsonObject);
        if (jsonObject!=null){
            String openId= (String) jsonObject.get("openid");
            SysUserExpand user=new SysUserExpand();
            user.setOpenid(openId);
            user.setUserId(userId);
            int result= sysUserMapper.updateByPrimaryKeySelective(user);
            if (result>=0){
                return 1;
            }else{
                return -1;
            }
        }
        return -1;
    }

    //公共请求方法
    public  JSONObject doGetJson(String url) throws  IOException {
        JSONObject jsonObject=null;
        HttpClient client = HttpClientBuilder.create().build();
        HttpGet httpGet = new HttpGet(url);
        HttpResponse response = client.execute(httpGet);
        HttpEntity entity = response.getEntity();
        if(response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
            //将得到的响应转为String类型
            String str = EntityUtils.toString(response.getEntity(), "utf-8");
            //字符串转json
            jsonObject = new JSONObject(str);
//            String result = EntityUtils.toString(entity, "UTF-8");
        }
        return jsonObject;
    }

    //据用户类型和openid获取openid
    public String getOpenIdByType(JournalTemplateMessageExpand record) throws Exception {
        System.out.println("toUserType==="+record.getToUserType());
        System.out.println("toUserId==="+record.getToUserId());
        String openId="";
        if (record.getToUserType().equals("task")||record.getToUserType().equals("repair")){
            SysUserExpand temp=new SysUserExpand();
            temp.setUserId(record.getToUserId());
            List<SysUserExpand> sysUserList=sysUserMapper.selectByPrimaryKey(temp);
            if (sysUserList.size()!=0){
                openId=sysUserList.get(0).getOpenid();
            }
            return openId;
        }
        System.out.println("toUserOpenId==="+record.getWxOpenid());
        System.out.println("toUserType2==="+record.getToUserType());
        if(record.getToUserType().equals("bill")){
                openId=journalTemplateMessageMapper.selectOpenIdByPopId(record.getToUserId());
                System.out.println(record.getToUserId()+"============"+openId);
                return openId;
        }
        System.out.println("==========end"+openId);
        return openId;
    }


}
