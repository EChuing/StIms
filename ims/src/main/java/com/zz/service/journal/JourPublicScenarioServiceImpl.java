package com.zz.service.journal;

import com.alibaba.fastjson.JSON;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.journal.JourScenarioPatternDescriptionMapper;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourScenarioPatternDescription;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourPublicScenarioServiceImpl implements JourPublicScenarioService {

    @Autowired
    private JourScenarioPatternDescriptionMapper jourScenarioPatternDescriptionMapper;
    @Autowired
    private InfoHouse4storeMapper infoHouse4storeMapper;

    //查询情景名称
    @Override
   public Result<List<JourScenarioPatternDescription>> selectScenarioName() throws Exception{
       List<JourScenarioPatternDescription> list=jourScenarioPatternDescriptionMapper.selectScenarioName();
       if(list.size() > 0){
           return new Result<>(1,"成功",list);
       }else{
           return new Result<>(-1,"未查询到数据",null);
       }
   }
}
