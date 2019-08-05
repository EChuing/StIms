package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JournalTemplateMessageExpand;
import com.zz.po.journal.TemplateMessage;
import com.zz.service.journal.JournalTemplateMessageService;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpSession;

public class JournalTemplateMessageActions extends BaseAction implements ModelDriven<JournalTemplateMessageExpand> {
    private JournalTemplateMessageExpand journalTemplateMessageExpand;
    @Autowired
    private JournalTemplateMessageService journalTemplateMessageService;

    @Override
    public JournalTemplateMessageExpand getModel() {
        if( journalTemplateMessageExpand==null){
            journalTemplateMessageExpand = new JournalTemplateMessageExpand();
        }
        return journalTemplateMessageExpand;
    }

    public String sendTemplateMessage(){

        System.out.println("===================send==============");
        HttpSession session = ServletActionContext.getRequest().getSession();
        Integer companyId= Integer.valueOf((String)session.getAttribute("coId"));
        String  company=(String)session.getAttribute("company");
        System.out.println("companyId======="+companyId);
        if(companyId!=null){
            journalTemplateMessageExpand.setCoId(companyId);
            journalTemplateMessageExpand.setDatasourceName(company);
            journalTemplateMessageExpand.setSsitId(1);
            try {
                System.out.println("send template msg");
                System.out.println(journalTemplateMessageExpand.getJtoId());
                String accessToken= journalTemplateMessageService.getAccessToken(companyId,1);
                System.out.println("accessToken="+accessToken);
                TemplateMessage templateMessage=journalTemplateMessageService.editTemplateMsg(journalTemplateMessageExpand);
                int result = journalTemplateMessageService.sendTemplateMsg(templateMessage,accessToken);
                if(result==0){
                    printlnOfJson(CommonMethodClass.jsonData(1, "微信模板消息发送成功", null));
                }else{
                    printlnOfJson(CommonMethodClass.jsonData(-1, "微信模板消息息发送失败", null));
                }
            } catch (Exception e) {
                e.printStackTrace();
                Syslog.writeErr(e);
                printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
            }
        }
        return  null;
    }

    public String getCodeUrl(){
        HttpSession session = ServletActionContext.getRequest().getSession();
        Integer companyId= Integer.valueOf((String)session.getAttribute("coId"));
        if(companyId!=null) {
            try {
                String codeurl=journalTemplateMessageService.getCodeUrlByCompanyId(companyId,journalTemplateMessageExpand.getToUserId());
                printlnOfJson(CommonMethodClass.jsonData(1,"获取codeurl成功", codeurl));
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
            }
        }
        return "";
    }

    public String getOpenIdByCode(){
        Integer userId=journalTemplateMessageExpand.getToUserId();
        Integer companyId =journalTemplateMessageExpand.getCoId();
        String code =journalTemplateMessageExpand.getCode();
        System.out.println("userId="+userId);
        System.out.println("companyId"+companyId);
        System.out.println("code="+code);

        HttpSession session = ServletActionContext.getRequest().getSession();
        session.setAttribute("coId",companyId.toString());
        if(code!=""&&code!=null){
            try {
                System.out.println("update openId");
                 int result= journalTemplateMessageService.getUserOpenId(companyId,code,userId);
                 if (result>0){
                     System.out.println("dispatcher");
                     //try测试版本
//                     String url="http://www.fangzhizun.com/try/wxAuthSuccess.html;";
                     String url="http://www.fangzhizun.com/ims/wxAuthSuccess.html";
                     printlnOfJson(CommonMethodClass.jsonData(1,"openId添加成功", url));
                 }else {
                     printlnOfJson(CommonMethodClass.jsonData(-1,"openId添加失败", null));
                 }
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
            }
        }
        return  "";
    }

}
