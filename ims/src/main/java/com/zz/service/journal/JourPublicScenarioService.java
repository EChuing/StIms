package com.zz.service.journal;

import com.zz.po.commons.Result;
import com.zz.po.journal.JourScenarioPatternDescription;

import java.util.List;

public interface JourPublicScenarioService {

    //查询情景名称
    Result<List<JourScenarioPatternDescription>> selectScenarioName() throws Exception;

}
