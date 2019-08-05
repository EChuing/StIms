package com.zz.service.journal;

import com.zz.po.journal.JournalTemplateMessageExpand;
import com.zz.po.journal.TemplateMessage;

public interface JournalTemplateMessageService {
    //获取token
    public String getAccessToken(Integer companyId,Integer ssitId) throws  Exception;
    //编辑模板信息
    public TemplateMessage editTemplateMsg(JournalTemplateMessageExpand record) throws  Exception;
    //发送模板消息
    public int sendTemplateMsg(TemplateMessage templateMessage,String accessToken) throws  Exception;
    //获取codeurl
    public String getCodeUrlByCompanyId(Integer companyId,Integer userId) throws  Exception;
    //获取openid
    public  int getUserOpenId(Integer companyid,String code,Integer userId) throws  Exception;
}
