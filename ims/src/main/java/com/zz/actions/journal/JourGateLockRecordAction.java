package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JourGateLockRecord;
import com.zz.service.journal.JourGateLockRecordService;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourGateLockRecordAction extends BaseAction implements ModelDriven<JourGateLockRecord> {
    private JourGateLockRecord jourGateLockRecord;
    @Autowired
    private JourGateLockRecordService jourGateLockRecordService;


    @Override
    public JourGateLockRecord getModel() {
        if(jourGateLockRecord == null){
            jourGateLockRecord = new JourGateLockRecord();
        }
        return jourGateLockRecord;
    }

    public void queryDeviceRecord(){
        try {
            List<JourGateLockRecord> list = jourGateLockRecordService.queryDeviceRecord(jourGateLockRecord);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有开锁记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
    }
}
