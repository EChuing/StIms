package com.zz.service.sys;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.mapper.journal.JournalRepairProgressMapper;
import com.zz.mapper.sys.SysAssetsMapper;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.journal.JournalRepairProgressExpand;
import com.zz.po.sys.SysAssetsExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.util.DateUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class SysAssetsServiceImpl implements SysAssetsService {
	private SysAssetsMapper sysAssetsMapper;
	private JournalHousingFollowMapper journalHousingFollowMapper;
	private JournalRepairProgressMapper journalRepairProgressMapper;

	public void setSysAssetsMapper(SysAssetsMapper sysAssetsMapper) {
		this.sysAssetsMapper = sysAssetsMapper;
	}
    public void setJournalHousingFollowMapper(
            JournalHousingFollowMapper journalHousingFollowMapper) {
        this.journalHousingFollowMapper = journalHousingFollowMapper;
    }
	public void setJournalRepairProgressMapper(
            JournalRepairProgressMapper journalRepairProgressMapper) {
        this.journalRepairProgressMapper = journalRepairProgressMapper;
    }
	//查询所有资产
    @Override
    public List<SysAssetsExpand> selectAll(SysAssetsExpand record) throws Exception {
        return sysAssetsMapper.selectAll(record); 
    }

    /**
     * 添加资产，同时在未租房或项目添加一条跟进
     */
    @Override
    public int insertList(List<SysAssetsExpand> recordList) throws Exception {
        for (SysAssetsExpand item : recordList) {
            if (item.getSaPrice() < 0) {
                throw new Exception("参数错误");
            }
        }
        int result = sysAssetsMapper.insertList(recordList);
        for (SysAssetsExpand item : recordList) {
            String remark = "添加资产：" + item.getSaName();
            if (item.getSaBrand() != null && !"".equals(item.getSaBrand())) {
                remark += " 品牌：" + item.getSaBrand();
            }
            if (item.getSaModel() != null && !"".equals(item.getSaModel())) {
                remark += " 型号：" + item.getSaModel();
            }
            JournalHousingFollowExpand follow = new JournalHousingFollowExpand();
            follow.setJhfHouseId(item.getSaHouseId());
            follow.setJhfHouse4storeId(item.getSaHouseStoreId());
            follow.setJhfUserId(item.getSaRegistrant());
            follow.setJhfDepartment(item.getDepartment());
            follow.setJhfStorefront(item.getStorefront());
            follow.setJhfFollowRemark(remark);
            follow.setJhfPaymentWay("系统跟进");
            follow.setJhfFollowResult("跟进成功");
            journalHousingFollowMapper.insertSelective(follow);
        }
        return result;
    }

    /**
     * 修改资产，同时写一条资产跟进
     */
    @Override
    public int updateById(SysAssetsExpand record) throws Exception {
        System.out.println(record);
    	if (record.getSaPrice() != null && record.getSaPrice() < 0) {
            throw new Exception("参数错误");
        }
        SysAssetsExpand sysAssets = new SysAssetsExpand();
        sysAssets.setSaId(record.getSaId());
        List<SysAssetsExpand> list = sysAssetsMapper.selectAll(sysAssets);
        if (list.isEmpty()) {
            return 0;
        }
        Map<String, String> map = new HashMap<String, String>();
        map.put("saType", "所属");
        map.put("saClassify", "类型");
        map.put("saUse", "使用情况");
        map.put("saStatus", "状态");
        map.put("saName", "名称");
        map.put("saBrand", "品牌");
        map.put("saModel", "型号");
        map.put("saPrice", "价格");
        map.put("saRemarks", "备注");
        map.put("saSupplier", "供应商");
        map.put("saPhotos", "图片");
        StringBuffer followUp = new StringBuffer();
        followUp.append("修改资产，");
        Field[] newAsset = record.getClass().getSuperclass().getDeclaredFields();
        for (Field field : newAsset) {
            field.setAccessible(true);
            if (map.containsKey(field.getName())
                && field.get(record) != null
                && !field.get(record).equals(field.get(list.get(0)))
                && !(field.get(record).equals("") && field.get(list.get(0)) == null)
            ) {
                if ("saSupplier".equals(field.getName())) {
                    String oldSupplierName = list.get(0).getSaSupplierName() != null ? list.get(0).getSaSupplierName() : "";
                    followUp.append(map.get(field.getName()) + "：" + oldSupplierName + " → " + record.getSaSupplierName() + ";");
                } else if ("saPhotos".equals(field.getName())) {
                    followUp.append(map.get(field.getName()) + ";");
                } else {
                    Object old = field.get(list.get(0)) != null ? field.get(list.get(0)) : "";
                    followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(record) + ";");
                }
            }
        }
        JSONArray jsonArray = JSONArray.fromObject(list.get(0).getSaFollowUp() != null ? list.get(0).getSaFollowUp() : "[]");
        JSONObject obj = new JSONObject();
        obj.accumulate("type", "系统跟进");
        obj.accumulate("registrantName", record.getRegistrantName());
        obj.accumulate("text", followUp.toString());
        obj.accumulate("time", DateUtil.getCurDateTime());
        jsonArray.add(obj);
        record.setSaFollowUp(jsonArray.toString());
        int result = sysAssetsMapper.updateById(record);
        return result;
    }

    /**
     * 迁移资产，同时写一条资产跟进，一条迁出跟进，一条迁入跟进
     */
    @Override
    public int moveById(SysAssetsExpand sysAssetsExpand) throws Exception {
        List<SysAssetsExpand> assets = new ArrayList<SysAssetsExpand>();
        String str = sysAssetsExpand.getJsonArray();
        JSONArray ja = JSONArray.fromObject(str);
        for (Object obj : ja) {
            JSONObject jsonObj = (JSONObject) obj;
            SysAssetsExpand sat = (SysAssetsExpand) JSONObject.toBean(jsonObj, SysAssetsExpand.class);
            assets.add(sat);
        }
        int result = 0;
        for (SysAssetsExpand record : assets) {
            SysAssetsExpand sysAssets = new SysAssetsExpand();
            sysAssets.setSaId(record.getSaId());
            List<SysAssetsExpand> list = sysAssetsMapper.selectAll(sysAssets);
            if (list.isEmpty()) {
                throw new Exception("查询不到待迁移的资产");
            }
            String followUp = "迁移资产，" + list.get(0).getSaName() +" 编号："+record.getSaNumber()+ " 从 " + record.getSaMoveFrom() + " 迁移到 " + record.getSaMoveTo();
            if (record.getMoveReason() != null && !"".equals(record.getMoveReason())) {
                followUp += "，迁移原因：" + record.getMoveReason();
            }
            JSONArray jsonArray = JSONArray.fromObject(list.get(0).getSaFollowUp() != null ? list.get(0).getSaFollowUp() : "[]");
            JSONObject obj = new JSONObject();
            obj.accumulate("type", "迁移跟进");
            obj.accumulate("registrantName", record.getRegistrantName());
            obj.accumulate("agentName", record.getAgentName());
            obj.accumulate("text", followUp);
            obj.accumulate("time", DateUtil.getCurDateTime());
            jsonArray.add(obj);
            record.setSaFollowUp(jsonArray.toString());
            result += sysAssetsMapper.moveById(record);
            // 迁入跟进
            JournalHousingFollowExpand follow = new JournalHousingFollowExpand();
            follow.setJhfHouseId(record.getSaHouseId());
            follow.setJhfHouse4storeId(record.getSaHouseStoreId());
            follow.setJhfUserId(record.getSaRegistrant());
            follow.setJhfDepartment(record.getDepartment());
            follow.setJhfStorefront(record.getStorefront());
            follow.setJhfFollowRemark(followUp);
            follow.setJhfPaymentWay("系统跟进");
            follow.setJhfFollowResult("跟进成功");
            journalHousingFollowMapper.insertSelective(follow);
            // 迁出跟进
            follow.setJhfHouseId(list.get(0).getSaHouseId() != null ? list.get(0).getSaHouseId() : null);
            follow.setJhfHouse4storeId(list.get(0).getSaHouseStoreId());
            journalHousingFollowMapper.insertSelective(follow);


        }
        return result;
    }

    /**
     * 维修迁移资产，同时写一条资产跟进，一条迁出跟进，一条迁入跟进，一条维修进展
     */
    @Override
    public int repairMoveById(SysAssetsExpand sysAssetsExpand) throws Exception {
        List<SysAssetsExpand> assets = new ArrayList<SysAssetsExpand>();
        String str = sysAssetsExpand.getJsonArray();
        JSONArray ja = JSONArray.fromObject(str);
        for (Object obj : ja) {
            JSONObject jsonObj = (JSONObject) obj;
            SysAssetsExpand sat = (SysAssetsExpand) JSONObject.toBean(jsonObj, SysAssetsExpand.class);
            assets.add(sat);
        }
        int result = 0;
        for (SysAssetsExpand record : assets) {
            SysAssetsExpand sysAssets = new SysAssetsExpand();
            sysAssets.setSaId(record.getSaId());
            List<SysAssetsExpand> list = sysAssetsMapper.selectAll(sysAssets);
            if (list.isEmpty()) {
                throw new Exception("查询不到待迁移的资产");
            }
            String followUp = "迁移资产，" + list.get(0).getSaName() + " 从 " + record.getSaMoveFrom() + " 迁移到 " + record.getSaMoveTo();
            if (record.getMoveReason() != null && !"".equals(record.getMoveReason())) {
                followUp += "，迁移原因：" + record.getMoveReason();
            }
            JSONArray jsonArray = JSONArray.fromObject(list.get(0).getSaFollowUp() != null ? list.get(0).getSaFollowUp() : "[]");
            JSONObject obj = new JSONObject();
            obj.accumulate("type", "迁移跟进");
            obj.accumulate("registrantName", record.getRegistrantName());
            obj.accumulate("agentName", record.getAgentName());
            obj.accumulate("text", followUp);
            obj.accumulate("time", DateUtil.getCurDateTime());
            jsonArray.add(obj);
            record.setSaFollowUp(jsonArray.toString());
            result += sysAssetsMapper.moveById(record);
            // 迁入跟进
            JournalHousingFollowExpand follow = new JournalHousingFollowExpand();
            follow.setJhfHouseId(record.getSaHouseId());
            follow.setJhfHouse4storeId(record.getSaHouseStoreId());
            follow.setJhfUserId(record.getSaRegistrant());
            follow.setJhfDepartment(record.getDepartment());
            follow.setJhfStorefront(record.getStorefront());
            follow.setJhfFollowRemark(followUp);
            follow.setJhfPaymentWay("系统跟进");
            follow.setJhfFollowResult("跟进成功");
            journalHousingFollowMapper.insertSelective(follow);
            // 迁出跟进
            follow.setJhfHouseId(list.get(0).getSaHouseId() != null ? list.get(0).getSaHouseId() : null);
            follow.setJhfHouse4storeId(list.get(0).getSaHouseStoreId());
            journalHousingFollowMapper.insertSelective(follow);
            // 维修进展
            JournalRepairProgressExpand progress = new JournalRepairProgressExpand();
            progress.setProRepairId(sysAssetsExpand.getProRepairId());
            progress.setProUserId(sysAssetsExpand.getProUserId());
            progress.setDepartment(sysAssetsExpand.getProDepartment());
            progress.setStorefront(sysAssetsExpand.getProStorefront());
            progress.setProState("未完成");
            progress.setProReceivableMoney("0");
            progress.setProBillingInfo("0");
            progress.setProRemark(followUp);
            progress.setProManMoney(0.00);
            progress.setProUseMoney(0.00);
            progress.setProOtherMoney(0.00);
            journalRepairProgressMapper.insertSelective(progress);
        }
        return result;
    }
    
	@Override
	public int followById(SysAssetsExpand record) {
		return sysAssetsMapper.followById(record);
	}

    
    //添加资产
	@Override
	public int insertAssets(SysAssetsExpand sysAssetsExpand) throws Exception {
		SysAssetsExpand sysAsset=new SysAssetsExpand();
		List<SysAssetsExpand> list = new ArrayList<SysAssetsExpand>();
        String jsonArray = sysAssetsExpand.getJsonArray();
        JSONArray ja = JSONArray.fromObject(jsonArray);
        int saNumbers = 0;
        for (Object obj : ja) {
            JSONObject jsonObj = (JSONObject) obj;
            SysAssetsExpand sat = (SysAssetsExpand) JSONObject.toBean(jsonObj, SysAssetsExpand.class);
            sat.setSaDepreciationPrice(sat.getSaPrice());
            long timeUnix =  System.currentTimeMillis()/1000;
            String typeFlag = "0";
            String numsFlag = "0"+saNumbers;
            if("公司".equals(sat.getSaType())){
            	typeFlag="1";
            }else  if("业主".equals(sat.getSaType())){
            	typeFlag="2";
            }else  if("租赁".equals(sat.getSaType())){
            	typeFlag="3";
            }
            if(numsFlag.length()==1){
            	numsFlag = "00"+numsFlag;
            }else if(numsFlag.length()==2){
            	numsFlag = "0"+numsFlag;
            }
            sat.setSaNumber(typeFlag+timeUnix+numsFlag);
            list.add(sat);
            saNumbers++;
        }
        int results = sysAssetsMapper.insertList(list);
        if (results > 0) {
        	return 1;
            
        } else {
            return -1;
        }
	}
}
