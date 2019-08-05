package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JourUnlockRecord;
import com.zz.service.journal.JourUnlockRecordService;
import org.apache.struts2.convention.annotation.*;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Namespace("/")
@ParentPackage("json-default")
@Results({@Result(type="json")})
public class JourUnlockRecordAction extends BaseAction implements ModelDriven<JourUnlockRecord> {
    private JourUnlockRecord jourUnlockRecord;
    @Autowired
    private JourUnlockRecordService jourUnlockRecordService;
    @Override
    public JourUnlockRecord getModel() {
        if(jourUnlockRecord == null){
            jourUnlockRecord = new JourUnlockRecord();
        }
        return jourUnlockRecord;
    }
    @Action("selectUnlockRecord")
    public String selectUnlockRecord(){
        try {
            List<JourUnlockRecord> unlockRecords = jourUnlockRecordService.selectByPrimaryKey(jourUnlockRecord);
            if(unlockRecords.size()>0){
                String json = JSONUtil.serialize(unlockRecords);
                printlnOfJson(CommonMethodClass.jsonData(1,"成功！",json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1,"没有记录！",null));

            }
        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "参数错误！", null));
        }
        return null;
    }
}
