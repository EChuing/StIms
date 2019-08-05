package com.zz.actions.info;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.info.InfoPopulation;
import com.zz.service.info.PopulationService;
import net.sf.json.JSONObject;
import org.apache.struts2.convention.annotation.*;
import org.apache.struts2.json.JSONUtil;

import java.util.List;

@Namespace("/")
@ParentPackage("json-default")
@Results({@Result(type = "json")})
public class PopulationAction extends BaseAction implements ModelDriven<InfoPopulation>{
	private InfoPopulation infoPopulation;
	private PopulationService populationService;
	public void setInfoPopulation(InfoPopulation infoPopulation) {
		this.infoPopulation = infoPopulation;
	}
	public void setPopulationService(PopulationService populationService) {
		this.populationService = populationService;
	}
	@Override
	public InfoPopulation getModel() {
		if(infoPopulation == null){
			infoPopulation = new InfoPopulation();
		}
		return infoPopulation;
	}
    
    /**
     * 查询客户信息
     * @return
     */
    public String selectPopulation(){
        //客户信息 - 查看 A06b01
        int auth1 = Authority.authorize("A06b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看客户信息权限", null));
            return null;
        }
        try {
            List<InfoPopulation> list = populationService.selectByPrimaryKey(infoPopulation);
            if(list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }
    
    /**
     * 查询客户信息
     * @return
     */
    public String selectPopulationCommon(){
        try {
            List<InfoPopulation> list = populationService.selectByPrimaryKey(infoPopulation);
            if(list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }
    
    //查询房屋下所有的人头
    public String selectHousePopulation(){
        try {
            List<InfoPopulation> list = populationService.selectHousePopulation(infoPopulation);
            if(list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }
	
	//查询人头下所有的房屋
    public String selectPopulationHouse(){
        try {
            List<InfoPopulation> list = populationService.selectPopulationHouse(infoPopulation);
            if(list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }
	//查询所有租房人数
    public String selectPopulationAllUsers(){
        try {
            InfoPopulation infoPopulation = populationService.selectPopulationAllUsers();
            String json = JSONUtil.serialize(infoPopulation);
            printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }
	//用已租id查询
	public String selectPopulationByHrId(){
	    try {
            List<InfoPopulation> list = populationService.listHousePopulatinByHrId(infoPopulation);
            if(list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	//新增
	public String insertPopulation(){
	    try {
            InfoPopulation ip = new InfoPopulation();
            ip.setPopIdcard(infoPopulation.getPopIdcard());
            List<InfoPopulation> list = populationService.selectByPrimaryKey(ip);
            if(list.size()==0){
                infoPopulation.setPopPassword(infoPopulation.getPopTelephone());
                int result = populationService.insertSelective(infoPopulation);
                if(result == 0){
                    printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
                }else{
                    printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
                }
            }else{
                JSONObject jsonObj = new JSONObject();
                jsonObj.accumulate("name", list.get(0).getPopName());
                jsonObj.accumulate("tel",  list.get(0).getPopTelephone());
                jsonObj.accumulate("ID",  list.get(0).getPopIdcard());
                String json = jsonObj.toString();
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已经存在", json));
            }   
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	//修改
	public String updatePopulation(){
	    try {
            InfoPopulation ip = new InfoPopulation();
            ip.setPopIdcard(infoPopulation.getPopIdcard());
            List<InfoPopulation> list = populationService.selectByPrimaryKey(ip);
            if(list.size() == 0){
                int result = populationService.updateByPrimaryKeySelective2(infoPopulation);
                if(result == 0){
                    printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
                }else{
                    printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
                }
            }else{
                Integer popid = list.get(0).getPopId();
                if(popid.equals(infoPopulation.getPopId())){
                    int result = populationService.updateByPrimaryKeySelective2(infoPopulation);
                    if(result == 0){
                        printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
                    }else{
                        printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
                    }
                }else{
                    JSONObject jsonObj = new JSONObject();
                    jsonObj.accumulate("name", list.get(0).getPopName());
                    jsonObj.accumulate("tel",  list.get(0).getPopTelephone());
                    jsonObj.accumulate("ID",  list.get(0).getPopIdcard());
                    String json = jsonObj.toString();
                    printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已经存在", json));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}

	//未租查房屋所有有关人口
    @Action("getHousePopulation")
	public void getHousePopulation(){
        try {
            List<InfoPopulation> list = populationService.getHousePopulation(infoPopulation);
            if(list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
    }
}
