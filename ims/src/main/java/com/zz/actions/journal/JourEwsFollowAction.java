package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JourEwsFollow;
import com.zz.service.journal.JourEwsFollowService;
import net.sf.json.JSONObject;
import org.apache.struts2.convention.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Namespace("/")
@ParentPackage("json-default")
@Results({@Result(type="json")})
public class JourEwsFollowAction extends BaseAction implements ModelDriven<JourEwsFollow> {
    private JourEwsFollow jourEwsFollow;
    @Autowired
    private JourEwsFollowService jourEwsFollowService;
    @Override
    public JourEwsFollow getModel() {
        if(jourEwsFollow == null){
            jourEwsFollow = new JourEwsFollow();
        }
        return jourEwsFollow;
    }
    @Action("insertJourEws")
    public String insertJourEws(){
        System.out.println("进来了！");
        int i = 0;
        try {
            i = jourEwsFollowService.insertSelective(jourEwsFollow);
            if(i == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加进展失败！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "数据参数有误 ！", null));

        }

        return null;

    }
    @Action("selectJourEws")
    public String selectJourEws(){
        try {
            List<JourEwsFollow> listJour = jourEwsFollowService.selectByPrimaryKey(jourEwsFollow);
            if(listJour.size()>0){
                JSONObject obj=new JSONObject();
                Integer total=listJour.get(0).getTotalNum();
                obj.accumulate("total", total);
                obj.accumulate("rows", listJour);
                String json=obj.toString();
                printlnOfJson(json);
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "数据参数有误 ！", null));
        }
        return null;
    }
}
