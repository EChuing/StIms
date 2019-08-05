package com.zz.actions.sys;

import java.util.ArrayList;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.sys.SysHouseDict;
import com.zz.po.sys.SysHouseDictExpand;
import com.zz.service.sys.HouseDictService;

public class HouseDictAction extends BaseAction implements ModelDriven<SysHouseDictExpand> {
	private SysHouseDictExpand sysHouseDictExpand;
	private HouseDictService houseDictService;

	public void setHouseDictService(HouseDictService houseDictService) {
		this.houseDictService = houseDictService;
	}
	
	//添加字典查询楼盘
	public  String queryHousePaperCommon() {
		try {
			List<String> list = houseDictService.selectForAddress(sysHouseDictExpand);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	@Override
	public SysHouseDictExpand getModel() {
		if(sysHouseDictExpand==null){
			sysHouseDictExpand = new SysHouseDictExpand();
		}
		return sysHouseDictExpand;
	}
    
    //查询房屋字典（有权限）
    public String queryHouseDict() {
        //房屋字典 - 查询     E00b01
        int auth1 = Authority.authorize("E00b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看房屋字典权限", null));
            return null;
        }
        try {
            List<SysHouseDictExpand> list = houseDictService.selectAll(sysHouseDictExpand);
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
	
	//查询房屋字典（无权限）
	public String queryAllHouseDict() {
		try {
			List<SysHouseDictExpand> list = houseDictService.selectAll(sysHouseDictExpand);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//查城市、城区、小区
	public String queryForHouseDictAddress() {
		try {
			List<String> list = houseDictService.selectForAddress(sysHouseDictExpand);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//添加字典
	public String insertHouseDict(){
		try {
			int result = houseDictService.insertSelective(sysHouseDictExpand);
			if(result==-1){
				printlnOfJson(CommonMethodClass.jsonData(-1, "楼盘已经存在！", null));
			}else{
				int id = sysHouseDictExpand.getHdId();
				List<SysHouseDict> list = new ArrayList<>();
				SysHouseDict shd = new SysHouseDict();
				shd.setHdId(id);
				list.add(shd);
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "楼盘添加成功！", json));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//修改字典
	public String updateHouseDict(){
		try{
			int result = houseDictService.updateByPrimaryKeySelective(sysHouseDictExpand);
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
