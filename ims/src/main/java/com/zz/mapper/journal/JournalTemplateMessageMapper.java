package com.zz.mapper.journal;

import com.zz.po.journal.JournalTemplateMessageExpand;

public interface JournalTemplateMessageMapper {

    //根据公司获取模板消息id
    public JournalTemplateMessageExpand selectAppId(Integer companyId) throws  Exception;

    //查询模板情景
    public JournalTemplateMessageExpand selectTemplateMsgScene(JournalTemplateMessageExpand record) throws Exception;

    //获取取模板消息
    public JournalTemplateMessageExpand selectByTemplateMsg(JournalTemplateMessageExpand record) throws  Exception;

    //根据公司id获取token和最后一次token的时间
    public JournalTemplateMessageExpand selectAccessToken(Integer ssitId) throws  Exception;

    //更新token
    public void updateAccessToken(JournalTemplateMessageExpand journalTemplateMessageExpand) throws  Exception;

    //根据人口表查询openid
    public String selectOpenIdByPopId(Integer popId)throws  Exception;

}
