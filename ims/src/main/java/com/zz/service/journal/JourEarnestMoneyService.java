package com.zz.service.journal;

import com.zz.po.journal.JourEarnestMoneyExpand;

import java.util.List;

public interface JourEarnestMoneyService {
    //添加下定
    public int insertRecord(JourEarnestMoneyExpand record) throws Exception;
    //查找下定
    public List<JourEarnestMoneyExpand> selectJourEarnestMoneyExpandList(JourEarnestMoneyExpand record) throws Exception;
    //更新下定状态
    public int updateDepositState(Integer jemHsId,Integer type) throws Exception;
    //查询下定
    public  List<JourEarnestMoneyExpand> queryDeposit(JourEarnestMoneyExpand record) throws Exception;

}
