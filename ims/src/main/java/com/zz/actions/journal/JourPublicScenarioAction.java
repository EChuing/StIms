package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoHouse4store;
import com.zz.po.journal.JourPricePlan;
import com.zz.po.journal.JourScenarioPatternDescription;
import com.zz.service.journal.JourPublicScenarioService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourPublicScenarioAction extends BaseAction implements ModelDriven<JourScenarioPatternDescription> {

    @Autowired
    private JourPublicScenarioService jourPublicScenarioService;
    private JourScenarioPatternDescription jourScenarioPatternDescription;

    @Override
    public JourScenarioPatternDescription getModel() {
        if (jourScenarioPatternDescription == null) {
            jourScenarioPatternDescription = new JourScenarioPatternDescription();
        }
        return jourScenarioPatternDescription;
    }

    //查询情景名称
    public void selectScenarioName(){
        try {
            Result<List<JourScenarioPatternDescription>> result = jourPublicScenarioService.selectScenarioName();
            String resultStr = JSON.toJSONString(result, SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
        }catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
    }
}
