package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JourAntPassword;
import com.zz.service.journal.JourAntPasswordService;
import org.apache.struts2.convention.annotation.*;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Namespace("/")
@ParentPackage("json-default")
@Results({@Result(type = "json")})
public class JourAntPasswordAction extends BaseAction implements ModelDriven<JourAntPassword> {
    private JourAntPassword jourAntPassword;
    @Autowired
    private JourAntPasswordService jourAntPasswordService;

    @Override
    public JourAntPassword getModel() {
        if (jourAntPassword == null) {
            jourAntPassword = new JourAntPassword();
        }
        return jourAntPassword;
    }

    @Action("insertAntPasswordRecording")
    public void insertAntPasswordRecording(){
        try {
            int result = jourAntPasswordService.insertSelective(jourAntPassword);
            if (result == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加密码记录失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    @Action("selectPassword")
    public void selectPassword(){
        try {
            List<JourAntPassword> result = jourAntPasswordService.selectPassword(jourAntPassword);
            if (result.size() != 0){
                String json = JSONUtil.serialize(result);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "查询不到符合条件的记录", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    @Action("updateAntPassword")
    public void updateAntPassword(){
        try {
            int result = jourAntPasswordService.updateByPrimaryKeySelective(jourAntPassword);
            if (result == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加密码记录失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
}
