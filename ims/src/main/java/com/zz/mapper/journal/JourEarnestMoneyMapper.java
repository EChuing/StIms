package com.zz.mapper.journal;


import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourEarnestMoney;
import com.zz.po.journal.JourEarnestMoneyExpand;

import java.util.List;

public interface JourEarnestMoneyMapper {

    public int insertRecord(JourEarnestMoneyExpand record);

    public List<JourEarnestMoneyExpand> selectJourEarnestMoneyExpandList(JourEarnestMoneyExpand record);

    public int updateSateByHsId(JourEarnestMoneyExpand record);

    public List<JourEarnestMoneyExpand> queryDeposit(JourEarnestMoneyExpand record);

    public int updatEffectiveToCancleByHsId(JourEarnestMoneyExpand record);


}
