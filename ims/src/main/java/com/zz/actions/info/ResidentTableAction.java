package com.zz.actions.info;

import java.util.List;


import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoResidentTable;
import com.zz.service.info.ResidentTableService;

public class ResidentTableAction extends BaseAction implements ModelDriven<InfoResidentTable>{
	public InfoResidentTable infoResidentTable;
	public ResidentTableService residentTableService;
	
	public void setInfoResidentTable(InfoResidentTable infoResidentTable) {
		this.infoResidentTable = infoResidentTable;
	}
	public void setResidentTableService(ResidentTableService residentTableService) {
		this.residentTableService = residentTableService;
	}
	@Override
	public InfoResidentTable getModel() {
		if(infoResidentTable == null){
			infoResidentTable = new InfoResidentTable();
		}
		return infoResidentTable;
	}
	//已租双击查看住户
	public String residentInRentDb(){
	    try {
            List<InfoResidentTable> list = residentTableService.selectByPrimaryKey(infoResidentTable);
            if(list.size() > 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	//查询
	public String selectResidentTable(){
	    try {
            List<InfoResidentTable> list = residentTableService.selectByPrimaryKey(infoResidentTable);
            if(list.size() > 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//新增
	public void insertResidentTable(){
	    try {
            String[] result = residentTableService.insertResidentTable(infoResidentTable).split("###");
            if(Integer.parseInt(result[0]) == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else if(Integer.parseInt(result[0]) == -21){
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已经存在", result[1]));
            }else if(Integer.parseInt(result[0]) == -22){
                printlnOfJson(CommonMethodClass.jsonData(-22, "身份证不能为空", null));
            }else if(Integer.parseInt(result[0]) == -4){
                printlnOfJson(CommonMethodClass.jsonData(-4, "住户已经存在", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            }
        } catch (Exception e) {
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
            e.printStackTrace();Syslog.writeErr(e);
        }
		return;
	}
	
	//修改
	public String updateResidentTable(){
	    try {
            String[] result = residentTableService.updateResidentTable(infoResidentTable).split("###");
            if(Integer.parseInt(result[0]) == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else if(Integer.parseInt(result[0]) == -21){
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已经存在", result[1]));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//修改住户状态和入住房，同时写跟进
    public String updateResident(){
        try {
            int result = residentTableService.updateResident(infoResidentTable);
            if(result == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
	
}
