package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoPlanTable;
import com.zz.service.info.PlanTableService;

public class PlanTableAction extends BaseAction implements ModelDriven<InfoPlanTable>{
    private InfoPlanTable infoPlanTable;
	private PlanTableService planTableService;
	
	public void setPlanTableService(PlanTableService planTableService) {
		this.planTableService = planTableService;
	}
    
    @Override
    public InfoPlanTable getModel() {
        if(infoPlanTable == null){
            infoPlanTable = new InfoPlanTable();
        }
        return infoPlanTable;
    }
	
	//查询计费方案
	public String selectPlanTable(){
	    //计费方案 - 查询     E01b01
        int auth1 = Authority.authorize("E01b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看计费方案权限", null));
            return null;
        }
	    try {
            List<InfoPlanTable> list = planTableService.selectByPrimaryKey(infoPlanTable);
            if(list.size()!=0){
                String json = JSONUtil.serialize(list);
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
	
	//在已租未租里查询计费方案
	public String selectPlanTableRentStore(){
	    try {
            List<InfoPlanTable> list = planTableService.selectByPrimaryKey(infoPlanTable);
            if(list.size()!=0){
                String json = JSONUtil.serialize(list);
                
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//新增
	public String insertPlanTable(){
	    try {
            //首先获取方案的默认值与方案的类型
            String planDefault = infoPlanTable.getPlanDefault();
            String planType = infoPlanTable.getPlanType();
            //判断默认值是否是‘true’
            if(planDefault.equals("true")){
                //当默认值为‘true’时，查找数据库中是否已经有相同的方案类型,有则不插入返回 -3 、无则插入数据。
                InfoPlanTable jpt = new InfoPlanTable();
                jpt.setPlanDefault(planDefault);
                jpt.setPlanType(planType);
                List<InfoPlanTable> list = planTableService.selectByPrimaryKey(jpt);
                if(list.size() == 1){
                    printlnOfJson(CommonMethodClass.jsonData(-1, "已经有相同的方案类型", null));
                }else{
                    int result = planTableService.insertSelective(infoPlanTable);
                    if(result != 0){
                        printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
                    }else{
                        printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
                    }
                }
            }else{
                int result = planTableService.insertSelective(infoPlanTable);
                if(result != 0){
                    printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
                }else{
                    printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//修改
	public String updatePlanTable(){
	    try {
            int result = planTableService.updateByPrimaryKeySelective(infoPlanTable);
            
            if(result != 0){
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
	
	//删除
	public String deletePlanTable(){
	    try {
            int result = planTableService.deleteByPrimaryKey(infoPlanTable.getPlanId());
            if(result != 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
}
