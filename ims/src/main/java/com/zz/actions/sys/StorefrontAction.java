package com.zz.actions.sys;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.sys.SysStorefront;
import com.zz.po.sys.SysStudent;
import com.zz.service.sys.StorefrontService;
import org.apache.struts2.json.JSONUtil;

import java.util.ArrayList;
import java.util.List;


public class StorefrontAction extends BaseAction implements ModelDriven<SysStorefront> {
	private StorefrontService storefrontService;
	private SysStorefront sysStorefront;

    public void setStorefrontService(StorefrontService storefrontService) {
        this.storefrontService = storefrontService;
    }
    @Override
    public SysStorefront getModel() {
        if(sysStorefront==null){
            sysStorefront = new SysStorefront();
        }
        return sysStorefront;
    }
    //查教室
	public  String querySchool(){
		try {
			List<SysStudent> sysStudent = storefrontService.selectSchool(sysStorefront);
			if(sysStudent.size() != 0) {
				String json = JSONUtil.serialize(sysStudent);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	// 查询所有用户信息，给出条件则为条件查询
	public String queryStorefront() {
		try {
			List<SysStorefront> storefront = storefrontService.selectByPrimaryKey(sysStorefront);
			if(storefront.size() != 0) {
				String json = JSONUtil.serialize(storefront);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	//增加
	public String insertStorefront(){
	    try {
            int result = storefrontService.insertSelective(sysStorefront);
            int id = sysStorefront.getStorefrontId();
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            }else{
                List<SysStorefront> list = new ArrayList<>();
                SysStorefront ssf = new SysStorefront();
                ssf.setStorefrontId(id);
                list.add(ssf);
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//修改
	public String updateStorefront(){
		try {
			int result = storefrontService.updateByPrimaryKeySelective(sysStorefront);
			if(result==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	// 删除
	public String deleteStorefront() {
		try {
			int result = storefrontService.deleteByPrimaryKey(sysStorefront.getStorefrontId());
			if (result == 0) {
				printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
}
