package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JourSmsTemplate;
import com.zz.service.journal.JourSmsTemplateService;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourSmsTemplateAction extends BaseAction implements ModelDriven<JourSmsTemplate> {
    private JourSmsTemplate jourSmsTemplate;
    @Autowired
    private JourSmsTemplateService jourSmsTemplateService;

    @Override
    public JourSmsTemplate getModel() {
        if(jourSmsTemplate == null){
            jourSmsTemplate = new JourSmsTemplate();
        }
        return jourSmsTemplate;
    }

    public void queryShortMessageTemplate(){
        try {
            List<JourSmsTemplate> list = jourSmsTemplateService.queryShortMessageTemplate(jourSmsTemplate);
            if(list.size()>0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
    }
}
