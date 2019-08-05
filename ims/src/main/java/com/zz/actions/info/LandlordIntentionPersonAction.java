package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoLandlordIntentionPerson;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.info.LandlordIntentionPersonService;
import com.zz.service.sys.UserService;

public class LandlordIntentionPersonAction extends BaseAction implements ModelDriven<InfoLandlordIntentionPerson>{
	private CommonMethodClass commonMethod;
	public void setCommonMethod(CommonMethodClass commonMethod) {
		this.commonMethod = commonMethod;
	}
	private InfoLandlordIntentionPerson infoLandlordIntentionPerson;
	private LandlordIntentionPersonService landlordIntentionPersonService;
	private UserService userService;
	public void setInfoLandlordIntentionPerson(
			InfoLandlordIntentionPerson infoLandlordIntentionPerson) {
		this.infoLandlordIntentionPerson = infoLandlordIntentionPerson;
	}
	public void setLandlordIntentionPersonService(
			LandlordIntentionPersonService landlordIntentionPersonService) {
		this.landlordIntentionPersonService = landlordIntentionPersonService;
	}
	public void setUserService(
			UserService userService) {
		this.userService = userService;
	}
	@Override
	public InfoLandlordIntentionPerson getModel() {
		if(infoLandlordIntentionPerson == null){
			infoLandlordIntentionPerson = new InfoLandlordIntentionPerson();
		}
		return infoLandlordIntentionPerson;
	}
	//盘源洗盘时查询业主信息
	public String queryLandlordIntentionPersonInHouse(){
		try {
			SysUserExpand sue = new SysUserExpand();
			if(infoLandlordIntentionPerson.getLipRegistrar()==null
				||infoLandlordIntentionPerson.getLipId()==null){
				printlnOfJson(CommonMethodClass.jsonData(-1, "数据缺失，查询失败", null));
				return null;
			}
			sue.setUserId(commonMethod.getSessionUserInfo().getUserId());
			List<SysUserExpand> uList = userService.selectByPrimaryKey(sue);
			if(uList.get(0).getSuChooseRoomToday()==uList.get(0).getSuChooseRoomLimit()
			||uList.get(0).getSuChooseRoomToday()>uList.get(0).getSuChooseRoomLimit()){
				printlnOfJson(CommonMethodClass.jsonData(-1, "今日洗盘数已达上限", null));
				return null;
			}
			sue.setSuChooseRoomToday(uList.get(0).getSuChooseRoomToday()+1);
			int result = userService.updateByPrimaryKeySelective(sue);
			
			InfoLandlordIntentionPerson ilip = new InfoLandlordIntentionPerson();
			ilip.setLipId(infoLandlordIntentionPerson.getLipId());
			List<InfoLandlordIntentionPerson> list = landlordIntentionPersonService.selectByPrimaryKey(ilip);
			
			if(list.size() != 0 && result!=0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		return null;
	}
	
	//查询
	public String selectLandlordIntentionPerson(){
		try {
			List<InfoLandlordIntentionPerson> list = landlordIntentionPersonService.selectByPrimaryKey(infoLandlordIntentionPerson);
			if(list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		return null;
	}
	
	//修改
	public String updataLandlordIntentionPerson(){
		try {
			int result = landlordIntentionPersonService.updateByPrimaryKeySelective(infoLandlordIntentionPerson);
			if(result != 0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		return null;
	}
	
	//新增
	public String insertLandlordIntentionPerson(){
		try {
			int result = landlordIntentionPersonService.insertSelective(infoLandlordIntentionPerson);
			if(result != 0){
                InfoLandlordIntentionPerson ilp = new InfoLandlordIntentionPerson();
				int id = infoLandlordIntentionPerson.getLipId();
				ilp.setLipId(id);
				String json = JSONUtil.serialize(ilp);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "业主意向客户新增失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		return null;
	}
	
	//删除
	public String deleteLandlordIntentionPerson(){
		try {
			int result = landlordIntentionPersonService.deleteByPrimaryKey(infoLandlordIntentionPerson.getLipId());
			if(result != 0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		return null;
	}

}
