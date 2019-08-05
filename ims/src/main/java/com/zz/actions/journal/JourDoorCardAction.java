package com.zz.actions.journal;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourDoorCard;
import com.zz.service.journal.JourDoorCardService;

import java.util.List;


public class JourDoorCardAction  extends BaseAction implements ModelDriven<JourDoorCard>{
	private JourDoorCard jourDoorCard;
	
	private JourDoorCardService jourDoorCardService;
	
	
	public void setJourDoorCardService(JourDoorCardService jourDoorCardService) {
		this.jourDoorCardService = jourDoorCardService;
	}

	public void pushingCard(){
		try {
			String result = jourDoorCardService.pushingCard(jourDoorCard);
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}

	//新增密码锁
	public void insertJustDoorCard(){
		try {
			System.out.println("jourDoorCard");
			System.out.println(jourDoorCard);
			Integer result = jourDoorCardService.insertJustDoorCard(jourDoorCard);
			System.out.println(result+"**********");
			if(result==1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}


	public void inseartDoorCard(){
		try {
			System.out.println("jourDoorCard");
			System.out.println(jourDoorCard);
			String result = jourDoorCardService.insertDoorCard(jourDoorCard);
			System.out.println(result+"**********");
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else if ("-1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(-3, "下发门卡失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, result, null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	public void insertFacePower(){
		try {
			System.out.println("insertFacePower");
			System.out.println(jourDoorCard);
			String result = jourDoorCardService.insertFacePower(jourDoorCard);
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, result, null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	
	public void listDoorCard(){
		try {
			List<JourDoorCard> list = jourDoorCardService.listDoorCard(jourDoorCard);
			String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
			if(list.size() > 0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "查询不到数据", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void updateDoorCard(){
		System.out.println("=========================更新状态了");
		try {
			String result = jourDoorCardService.updateDoorCard(jourDoorCard);
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, result, null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	public void deleteDoorCard(){
		System.out.println("=========================删除授权");
		try {
			String result = jourDoorCardService.deleteDoorCard(jourDoorCard);
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, result, null));
			}

		} catch (Exception e) {
			e.printStackTrace();
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	public void deletePower(){
		System.out.println("=========================删除人脸授权");
		try {
			String result = jourDoorCardService.deletePower(jourDoorCard);
			if("1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, result, null));
			}

		} catch (Exception e) {
			e.printStackTrace();
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	public void selectLock(){
		try {
			String result = jourDoorCardService.inputLockPassword(jourDoorCard);
			if("-1".equals(result)){
				printlnOfJson(CommonMethodClass.jsonData(-1, "该房间没有智能设备", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", result));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	public void checkLockPassword(){
		try {
			Result<String> result = jourDoorCardService.checkLockPassword(jourDoorCard);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
			/*if(result == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else if(result == -1){
				printlnOfJson(CommonMethodClass.jsonData(-1, "密码错误", null));
			}else if(result == -2){
				printlnOfJson(CommonMethodClass.jsonData(-2, "没有授权无法开锁", null));
			}else if(result == -3){
				printlnOfJson(CommonMethodClass.jsonData(-3, "错误次数过多，原密码失效", null));
			}else if(result == -4){
				printlnOfJson(CommonMethodClass.jsonData(-4, "超过期限，", null));
			}
			*/
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}


	@Override
	public JourDoorCard getModel() {
		if(jourDoorCard==null){
			jourDoorCard = new JourDoorCard();
		}
		return jourDoorCard;
	}
	
}
