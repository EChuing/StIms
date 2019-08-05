package com.zz.actions.info;

import java.util.ArrayList;
import java.util.List;

import com.zz.other.Syslog;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoTransactionAssistance;
import com.zz.po.info.InfoTransactionExpand;
import com.zz.service.info.InfoTransactionAssistanceService;

public class InfoTransactionAssistanceAction extends BaseAction implements ModelDriven<InfoTransactionExpand>{
	private InfoTransactionAssistanceService itaa;
	private InfoTransactionExpand assistModel;
	
	public void setItaa(InfoTransactionAssistanceService itaa) {
		this.itaa = itaa;
	}

	@Override
	public InfoTransactionExpand getModel() {
		if( assistModel==null){
			assistModel = new InfoTransactionExpand();
		}
		return assistModel;
	}
    
    /**
     * 查询收益归属
     * @return
     */
    public String queryAssistor(){
        //受益归属 - 查询     F08b01
        int auth1 = Authority.authorize("F08b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看收益归属权限", null));
            return null;
        }
        try {
            List<InfoTransactionExpand> list = itaa.selectAll(assistModel);
            if(list.size()>0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
                
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "暂无协助人信息", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }
	
	//查询ALL
	public String queryAllTransactionAssistance(){
	    try {
            List<InfoTransactionExpand> list = itaa.selectAll(assistModel);
            System.out.println(assistModel.getAssistType());
            if(list.size()>0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "暂无协助人信息", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	//在已租未租里查看业绩受益人
	public String queryAllTransactionAssistanceRentStore(){
	    try {
            List<InfoTransactionExpand> list = itaa.selectAll(assistModel);
            if(list.size()>=0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "暂无协助人信息", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	//修改 先删除再新增
	public String updateAssist(){
		try {//result = "1";
			String result = itaa.updateAssistance(assistModel);
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "新增失败或数据有误", null));
		}	
		return null;
	}
	
	//业绩管理的修改业绩受益人 先删除再新增
	public String upAchievementAssist(){
	    try {
            String result = itaa.updateAssistance(assistModel);
            printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "修改协助人失败或数据有误", null));
        }
		return null;
	}
	
	//单个新增
	public String insertSelectiveAss(){
		try {
			int i = itaa.insertSelective(assistModel);
			if(i==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		return null;
	}
	
	//业绩业绩受益人批量新增
	public String insertAssistList(){
	    List<InfoTransactionAssistance> recordList = new ArrayList<InfoTransactionAssistance>();
        int results = 0 ;
        String jsonArray = assistModel.getJsonArray();
        JSONArray ja =JSONArray.fromObject(jsonArray);
        for (Object a : ja) {
            JSONObject jsonObj = (JSONObject)a;
            InfoTransactionExpand jf = (InfoTransactionExpand) JSONObject.toBean(jsonObj, InfoTransactionExpand.class);
            recordList.add(jf);
        }
        try {
            results = itaa.insertTAList(recordList);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        if(results > 0){
            printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
        }else{
            printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
        }
		return null;
	}
	
	//批量新增
	public String insertTAList(){
		List<InfoTransactionAssistance> recordList = new ArrayList<InfoTransactionAssistance>();
		int results = 0 ;
		String jsonArray = assistModel.getJsonArray();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			InfoTransactionExpand jf = (InfoTransactionExpand) JSONObject.toBean(jsonObj, InfoTransactionExpand.class);
			recordList.add(jf);
		}
		try {
			results = itaa.insertTAList(recordList);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		if(results > 0){
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
		}else{
			printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
		}
		return null;
	}
	
}
