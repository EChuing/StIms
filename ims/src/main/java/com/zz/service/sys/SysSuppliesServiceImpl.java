package com.zz.service.sys;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.mapper.journal.JournalRepairProgressMapper;
import com.zz.mapper.sys.SysSuppliesMapper;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.journal.JournalRepairProgressExpand;
import com.zz.po.sys.SysSuppliesExpand;
import com.zz.util.DateUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class SysSuppliesServiceImpl implements SysSuppliesService {
    
    private SysSuppliesMapper sysSuppliesMapper;
    
    private JournalHousingFollowMapper journalHousingFollowMapper;
    
    private JournalRepairProgressMapper journalRepairProgressMapper;

    public void setSysSuppliesMapper(SysSuppliesMapper sysSuppliesMapper) {
        this.sysSuppliesMapper = sysSuppliesMapper;
    }

    public void setJournalHousingFollowMapper(JournalHousingFollowMapper journalHousingFollowMapper) {
        this.journalHousingFollowMapper = journalHousingFollowMapper;
    }

    public void setJournalRepairProgressMapper(
            JournalRepairProgressMapper journalRepairProgressMapper) {
        this.journalRepairProgressMapper = journalRepairProgressMapper;
    }

    @Override
    public List<SysSuppliesExpand> selectAll(SysSuppliesExpand record) throws Exception {
        return sysSuppliesMapper.selectAll(record);
    }

    /**
     * 添加耗材，同时在项目添加一条跟进
     */
    @Override
    public int insertSelective(SysSuppliesExpand record) throws Exception {
        if (record.getSupPrice() < 0 || record.getSupNum() < 0) {
            throw new Exception("参数错误");
        }
        int result = sysSuppliesMapper.insertSelective(record);
        String remark = "添加耗材：" + record.getSupName();
        if (record.getSupBrand() != null && !"".equals(record.getSupBrand())) {
            remark += " 品牌：" + record.getSupBrand();
        }
        if (record.getSupModel() != null && !"".equals(record.getSupModel())) {
            remark += " 型号：" + record.getSupModel();
        }
        if (record.getSupNum() != null && !"".equals(record.getSupNum())) {
            remark += " 数量：" + record.getSupNum();
        }
        JournalHousingFollowExpand follow = new JournalHousingFollowExpand();
        follow.setJhfHouseId(record.getSupHouseId());
        follow.setJhfUserId(record.getSupUserId());
        follow.setJhfDepartment(record.getSupDepartment());
        follow.setJhfStorefront(record.getSupStorefront());
        follow.setJhfFollowRemark(remark);
        follow.setJhfPaymentWay("系统跟进");
        follow.setJhfFollowResult("跟进成功");
        journalHousingFollowMapper.insertSelective(follow);
        return result;
    }

    /**
     * 修改耗材，同时写一条耗材跟进
     */
    @Override
    public int updateById(SysSuppliesExpand record) throws Exception {
        if ((record.getSupPrice() != null && record.getSupPrice() < 0)
            || (record.getSupNum() != null && record.getSupNum() < 0)) {
            throw new Exception("参数错误");
        }
        SysSuppliesExpand sysSupplies = new SysSuppliesExpand();
        sysSupplies.setSupId(record.getSupId());
        List<SysSuppliesExpand> list = sysSuppliesMapper.selectAll(sysSupplies);
        if (list.isEmpty()) {
            return 0;
        }
        Map<String, String> map = new HashMap<String, String>();
        map.put("supType", "类型");
        map.put("supName", "名称");
        map.put("supBrand", "品牌");
        map.put("supModel", "型号");
        map.put("supPrice", "价格");
        map.put("supNum", "数量");
        map.put("supRemark", "备注");
        map.put("supImgPath", "图片");
        StringBuffer followUp = new StringBuffer();
        followUp.append("修改耗材，");
        Field[] newAsset = record.getClass().getSuperclass().getDeclaredFields();
        for (Field field : newAsset) {
            field.setAccessible(true);
            if (map.containsKey(field.getName())
                && field.get(record) != null
                && !field.get(record).equals(field.get(list.get(0)))
                && !(field.get(record).equals("") && field.get(list.get(0)) == null)
            ) {
                if ("supImgPath".equals(field.getName())) {
                    followUp.append(map.get(field.getName()) + ";");
                } else {
                    Object old = field.get(list.get(0)) != null ? field.get(list.get(0)) : "";
                    followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(record) + ";");
                }
            }
        }
        JSONArray jsonArray = JSONArray.fromObject(list.get(0).getSupFollowUp() != null ? list.get(0).getSupFollowUp() : "[]");
        JSONObject obj = new JSONObject();
        obj.accumulate("type", "系统跟进");
        obj.accumulate("name", record.getUserName());
        obj.accumulate("text", followUp.toString());
        obj.accumulate("time", DateUtil.getCurDateTime());
        jsonArray.add(obj);
        record.setSupFollowUp(jsonArray.toString());
        int result = sysSuppliesMapper.updateById(record);
        return result;
    }

    /**
     * 迁移耗材，同时写一条耗材跟进，一条迁出跟进，一条迁入跟进
     * 1.修改原耗材数量，同时写跟进
     * 2.添加新耗材，同时写跟进
     * 3.迁出项目跟进
     * 4.迁入项目跟进
     */
    @Override
    public int moveById(SysSuppliesExpand record) throws Exception {
        SysSuppliesExpand sysSupplies = new SysSuppliesExpand();
        sysSupplies.setSupId(record.getSupId());
        List<SysSuppliesExpand> list = sysSuppliesMapper.selectAll(sysSupplies);
        if (list.isEmpty()) {
            throw new Exception("查询不到待迁移的耗材");
        }
        int beforeNum = list.get(0).getSupNum();
        int moveNum = record.getSupNum();
        int curNum = beforeNum - moveNum;
        if (curNum < 0 || moveNum <= 0) {
            throw new Exception("参数错误");
        }
        // 原耗材跟进
        String followUp = "迁移耗材，" + list.get(0).getSupName() + " 从 " + record.getSupMoveFrom() + " 迁移到 " + record.getSupMoveTo() + "，数量：" + moveNum;
        JSONArray jsonArray = JSONArray.fromObject(list.get(0).getSupFollowUp() != null ? list.get(0).getSupFollowUp() : "[]");
        JSONObject obj = new JSONObject();
        obj.accumulate("type", "迁移跟进");
        obj.accumulate("name", record.getUserName());
        obj.accumulate("text", followUp);
        obj.accumulate("time", DateUtil.getCurDateTime());
        jsonArray.add(obj);
        // 1.修改原耗材数量，同时写跟进
        SysSuppliesExpand moveFrom = new SysSuppliesExpand();
        moveFrom.setSupId(record.getSupId());
        moveFrom.setSupNum(curNum);
        moveFrom.setSupFollowUp(jsonArray.toString());
        sysSuppliesMapper.updateById(moveFrom);
        // 2.添加新耗材，同时写跟进
        // 新耗材跟进
        jsonArray = JSONArray.fromObject("[]");
        jsonArray.add(obj);
        SysSuppliesExpand moveTo = new SysSuppliesExpand();
        moveTo.setSupHouseId(record.getSupHouseId());
        moveTo.setSupDepartment(record.getSupDepartment());
        moveTo.setSupStorefront(record.getSupStorefront());
        moveTo.setSupUserId(record.getSupUserId());
        moveTo.setSupType(list.get(0).getSupType());
        moveTo.setSupName(list.get(0).getSupName());
        moveTo.setSupBrand(list.get(0).getSupBrand());
        moveTo.setSupModel(list.get(0).getSupModel());
        moveTo.setSupPrice(list.get(0).getSupPrice());
        moveTo.setSupNum(moveNum);
        moveTo.setSupImgPath(list.get(0).getSupImgPath());
        moveTo.setSupImgNum(list.get(0).getSupImgNum());
        moveTo.setSupFollowUp(jsonArray.toString());
        int result = sysSuppliesMapper.insertSelective(moveTo);
        // 迁入跟进
        JournalHousingFollowExpand follow = new JournalHousingFollowExpand();
        follow.setJhfHouseId(record.getSupHouseId());
        follow.setJhfUserId(record.getSupUserId());
        follow.setJhfDepartment(record.getSupDepartment());
        follow.setJhfStorefront(record.getSupStorefront());
        follow.setJhfFollowRemark(followUp);
        follow.setJhfPaymentWay("系统跟进");
        follow.setJhfFollowResult("跟进成功");
        journalHousingFollowMapper.insertSelective(follow);
        // 迁出跟进
        follow.setJhfHouseId(list.get(0).getSupHouseId() != null ? list.get(0).getSupHouseId() : null);
        journalHousingFollowMapper.insertSelective(follow);
        return result;
    }

    /**
     * 使用耗材
     * 修改耗材数量，同时写一条耗材跟进
     */
    @Override
    public int useById(SysSuppliesExpand record) throws Exception {
        SysSuppliesExpand sysSupplies = new SysSuppliesExpand();
        sysSupplies.setSupId(record.getSupId());
        List<SysSuppliesExpand> list = sysSuppliesMapper.selectAll(sysSupplies);
        if (list.isEmpty()) {
            throw new Exception("查询不到待使用的耗材");
        }
        int beforeNum = list.get(0).getSupNum();
        int useNum = record.getSupNum();
        int curNum = beforeNum - useNum;
        if (curNum < 0 || useNum <= 0) {
            throw new Exception("参数错误");
        }
        String followUp = "使用耗材，" + record.getUseAddress() + "使用" + list.get(0).getSupName() + "；数量：" + useNum + "；使用原因：" + record.getUseReason();
        JSONArray jsonArray = JSONArray.fromObject(list.get(0).getSupFollowUp() != null ? list.get(0).getSupFollowUp() : "[]");
        JSONObject obj = new JSONObject();
        obj.accumulate("type", "使用跟进");
        obj.accumulate("name", record.getUserName());
        obj.accumulate("text", followUp);
        obj.accumulate("time", DateUtil.getCurDateTime());
        jsonArray.add(obj);
        SysSuppliesExpand use = new SysSuppliesExpand();
        use.setSupId(record.getSupId());
        use.setSupNum(curNum);
        use.setSupFollowUp(jsonArray.toString());
        int result = sysSuppliesMapper.updateById(use);
        return result;
    }

    /**
     * 维修使用耗材
     * 修改耗材数量，同时写一条耗材跟进
     * 维修写一条进展
     */
    @Override
    public int repairUseById(SysSuppliesExpand record) throws Exception {
        SysSuppliesExpand sysSupplies = new SysSuppliesExpand();
        sysSupplies.setSupId(record.getSupId());
        List<SysSuppliesExpand> list = sysSuppliesMapper.selectAll(sysSupplies);
        if (list.isEmpty()) {
            throw new Exception("查询不到待使用的耗材");
        }
        int beforeNum = list.get(0).getSupNum();
        int useNum = record.getSupNum();
        int curNum = beforeNum - useNum;
        if (curNum < 0 || useNum <= 0) {
            throw new Exception("参数错误");
        }
        String followUp = "使用耗材，" + record.getUseAddress() + "使用" + list.get(0).getSupName() + "；数量：" + useNum + "；使用原因：" + record.getUseReason();
        JSONArray jsonArray = JSONArray.fromObject(list.get(0).getSupFollowUp() != null ? list.get(0).getSupFollowUp() : "[]");
        JSONObject obj = new JSONObject();
        obj.accumulate("type", "使用跟进");
        obj.accumulate("name", record.getUserName());
        obj.accumulate("text", followUp);
        obj.accumulate("time", DateUtil.getCurDateTime());
        jsonArray.add(obj);
        SysSuppliesExpand use = new SysSuppliesExpand();
        use.setSupId(record.getSupId());
        use.setSupNum(curNum);
        use.setSupFollowUp(jsonArray.toString());
        int result = sysSuppliesMapper.updateById(use);
        // 维修写一条进展
        JournalRepairProgressExpand progress = new JournalRepairProgressExpand();
        String followUp2 = "使用耗材：" + list.get(0).getSupName() + "；数量：" + useNum + "；使用原因：" + record.getUseReason();
        progress.setProRepairId(record.getProRepairId());
        progress.setProUserId(record.getProUserId());
        progress.setDepartment(record.getProDepartment());
        progress.setStorefront(record.getProStorefront());
        progress.setProState("未完成");
        progress.setProReceivableMoney("0");
        progress.setProBillingInfo("0");
        progress.setProRemark(followUp2);
        progress.setProManMoney(0.00);
        progress.setProUseMoney(0.00);
        progress.setProOtherMoney(0.00);
        journalRepairProgressMapper.insertSelective(progress);
        return result;
    }

    @Override
    public int purchaseById(SysSuppliesExpand record) throws Exception {
        if (record.getSupNum() == null || record.getSupNum() == 0) {
            throw new Exception("参数错误");
        }
        SysSuppliesExpand sysSupplies = new SysSuppliesExpand();
        sysSupplies.setSupId(record.getSupId());
        List<SysSuppliesExpand> list = sysSuppliesMapper.selectAll(sysSupplies);
        if (list.isEmpty()) {
            return 0;
        }
        int num = list.get(0).getSupNum() + record.getSupNum();
        if (num < 0) {
            throw new Exception("参数错误");
        }
        StringBuffer followUp = new StringBuffer();
        if (record.getSupNum() > 0) {
            followUp.append("增加数量");
        } else {
            followUp.append("减少数量");
        }
        followUp.append(Math.abs(record.getSupNum()));
        if (record.getSupRemark() != null && !"".equals(record.getSupRemark())) {
            followUp.append("；备注：" + record.getSupRemark());
        }
        JSONArray jsonArray = JSONArray.fromObject(list.get(0).getSupFollowUp() != null ? list.get(0).getSupFollowUp() : "[]");
        JSONObject obj = new JSONObject();
        obj.accumulate("type", "系统跟进");
        obj.accumulate("name", record.getUserName());
        obj.accumulate("text", followUp.toString());
        obj.accumulate("time", DateUtil.getCurDateTime());
        jsonArray.add(obj);
        record.setSupNum(num);
        record.setSupFollowUp(jsonArray.toString());
        int result = sysSuppliesMapper.updateById(record);
        return result;
    }

}
