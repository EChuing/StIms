package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JourCaTemporary;
import com.zz.service.journal.JourCaTemporaryService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourCaTemporaryAction extends BaseAction implements ModelDriven<JourCaTemporary> {
	private JourCaTemporary jourCaTemporary;
	@Autowired
	private JourCaTemporaryService jourCaTemporaryService;
	
	@Override
	public JourCaTemporary getModel() {
		if(jourCaTemporary == null){
			jourCaTemporary = new JourCaTemporary();
		}
		return jourCaTemporary;
	}
	/**
	 * 添加预生成的集中房到临时表
	 */
	public void insertCentralized(){
		try{
			JSONArray json = JSONArray.fromObject(jourCaTemporary.getSplitJson());
			for(Object a : json){
				JSONObject jsonObj = (JSONObject)a;
				JourCaTemporary cat = (JourCaTemporary) JSONObject.toBean(jsonObj, JourCaTemporary.class);
				int Result = jourCaTemporaryService.insertCentralized(cat);
				System.out.println(Result);
			}
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	/**
	 * 查询预生成集中房
	 */
	public void selectCentralized(){
		try{
			List<JourCaTemporary> caTemporary = jourCaTemporaryService.selectCentralized(jourCaTemporary);
			String json = JSONUtil.serialize(caTemporary);
			if(caTemporary.size() != 0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		}catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	/**
	 * 更新关联规则到临时表
	 */
	public void updateCentralized(){
		try{
			JSONArray json = JSONArray.fromObject(jourCaTemporary.getSplitJson());
			for(Object a : json){
				JSONObject jsonObj = (JSONObject)a;
				JourCaTemporary cat = (JourCaTemporary) JSONObject.toBean(jsonObj, JourCaTemporary.class);
				int Result = jourCaTemporaryService.updateCentralized(cat);
				System.out.println(Result);
			}
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
}
