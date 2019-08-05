package com.zz.service.journal;

import com.zz.mapper.journal.JourEarnestMoneyMapper;
import com.zz.po.journal.JourEarnestMoneyExpand;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourEarnestMoneyServiceImpl implements JourEarnestMoneyService {
    @Autowired
    private JourEarnestMoneyMapper jourEarnestMoneyMapper;

    @Override
    public int insertRecord(JourEarnestMoneyExpand record) throws Exception {
        List<JourEarnestMoneyExpand> queryRecord= jourEarnestMoneyMapper.queryDeposit(record);
        int result =jourEarnestMoneyMapper.insertRecord(record);
        return result;
    }

    @Override
    public List<JourEarnestMoneyExpand> selectJourEarnestMoneyExpandList(JourEarnestMoneyExpand record) throws Exception{
        return jourEarnestMoneyMapper.selectJourEarnestMoneyExpandList(record);
    }

    @Override
    public int updateDepositState(Integer hsId,Integer type) throws  Exception {
        JourEarnestMoneyExpand record=new JourEarnestMoneyExpand();
        record.setJemHsId(hsId);
        List<JourEarnestMoneyExpand> jourEarnestMoneyExpand =jourEarnestMoneyMapper.queryDeposit(record);
        if(jourEarnestMoneyExpand.size()>0){
            if (type==1){
                record.setJemState("已取消");
                return jourEarnestMoneyMapper.updatEffectiveToCancleByHsId(record);
            }
            if (type==2){
                record.setJemState("无效");
            }
            if (type==3){
                record.setJemState("失效");
            }
            if (type==4){
                record.setJemState("已签");
            }
            return jourEarnestMoneyMapper.updateSateByHsId(record);
        }
        return 1;
    }

    @Override
    public List<JourEarnestMoneyExpand> queryDeposit(JourEarnestMoneyExpand record) {
        return jourEarnestMoneyMapper.queryDeposit(record);
    }


}
