package com.zz.actions.journal;


import java.util.ArrayList;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.commons.Result;
import com.zz.po.journal.JournalHousingFollow;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.service.journal.HousingFollowService;

import net.sf.json.JSONObject;
/**
 * 
 * @author Administrator
 * 跟进记录C层
 *
 */
public class HousingFollowAction extends BaseAction implements ModelDriven<JournalHousingFollowExpand>{
	private JournalHousingFollowExpand JournalHousingFollowExpand;
	private HousingFollowService housingFollowService;
	
	//跟进图片查询
	public void followUpThePictureQuery(){
		try {
		    List<JournalHousingFollowExpand> list = housingFollowService.selectByPrimaryKey(JournalHousingFollowExpand.getJhfId());
			if(list.size() > 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无相关跟进", null));
			}
		} catch (Exception e) {
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
	
	//已租双击查看跟进
	public String housingFollowInRentDb(){
	    try {
            List<JournalHousingFollowExpand> housingFollow = housingFollowService.selectAll(JournalHousingFollowExpand);
            if(housingFollow.size()>0){
                String json = JSONUtil.serialize(housingFollow);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "暂无相关跟进", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//查找ALL 数据和统计分开
	public String selectHouseFollow(){
		try {
			List<JournalHousingFollowExpand> housingFollow = housingFollowService.selectAllHouseFollow(JournalHousingFollowExpand);
			if(housingFollow.size()!=0){
				String json = JSONUtil.serialize(housingFollow);
				
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无相关跟进", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	//查找ALL
	public String queryAllHousingFollow(){
		try {
			List<JournalHousingFollowExpand> housingFollow = housingFollowService.selectAll(JournalHousingFollowExpand);
			//System.out.println("内容："+housingFollow);
			if(housingFollow.size()>0){
				String json = JSONUtil.serialize(housingFollow);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无相关跟进", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//新的跟进查询
	public void remindFollow(){
		try {
			List<JournalHousingFollowExpand> list = housingFollowService.selectAll(JournalHousingFollowExpand);
			for(JournalHousingFollowExpand item : list){
			    String addr = item.getAddCommunity() + item.getAddBuilding() + item.getAddDoorplateno();
			    item.setAddCommunity(addr);
			}
			Integer total;
			if (list.size() > 0) {
                total = Integer.parseInt(list.get(0).getTotalNum());
            } else {
                total = 0;
            }
            JSONObject jsonObj = new JSONObject();
            jsonObj.accumulate("total", total);
            jsonObj.accumulate("rows", list);
            String json = jsonObj.toString();
            printlnOfJson(json);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//根据房东ID查找
	public String queryHousingFollowByHouse4rentId(){
		try {
			List<JournalHousingFollowExpand> housingFollow = housingFollowService.selectByHouse4rentId(JournalHousingFollowExpand.getJhfHouse4rentId());
			if(housingFollow.size()!=0){
				String json = JSONUtil.serialize(housingFollow);
				
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//增加记录
	public String insertHousingFollow(){
		try {
			int result = housingFollowService.insertSelective(JournalHousingFollowExpand);
			int id = JournalHousingFollowExpand.getJhfId();
			if(result==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "增加失败", null));
			}else{
				//printlnMsg("1");
				List<JournalHousingFollow> list = new ArrayList<>();
				JournalHousingFollow jhf = new JournalHousingFollow();
				jhf.setJhfId(id);
				list.add(jhf);
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	//更新记录
	public String updateHousingFollow(){
		try {
			int result = housingFollowService.updateByPrimaryKeySelective(JournalHousingFollowExpand);		
			if(result==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "更新失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	//根据房源ID更新记录
	public String updateHousingFollowByHouse4rentId(){
		try {
			int result = housingFollowService.updateByHouse4rentId(JournalHousingFollowExpand);
			if(result==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "更新失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	//根据ID删除
	public String deleteHousingFollowById(){
		try {
			int result = housingFollowService.deleteByPrimaryKey(1);
			if(result==0){
				printlnMsg("-1");
			}else{
				printlnMsg("1");
			}
		} catch (Exception e) {}
		return null;
	}
	
	
	public void setJournalHousingFollowExpand(JournalHousingFollowExpand JournalHousingFollowExpand) {
		this.JournalHousingFollowExpand = JournalHousingFollowExpand;
	}

	public void setHousingFollowService(HousingFollowService housingFollowService) {
		this.housingFollowService = housingFollowService;
	}

	@Override
	public JournalHousingFollowExpand getModel() {
		if( JournalHousingFollowExpand==null){
			JournalHousingFollowExpand = new JournalHousingFollowExpand();
		}
		return JournalHousingFollowExpand;
	}
	
}
