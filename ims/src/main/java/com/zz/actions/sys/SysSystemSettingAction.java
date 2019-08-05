package com.zz.actions.sys;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.sys.SysSystemSetting;
import com.zz.service.sys.SysSystemSettingService;

public class SysSystemSettingAction extends BaseAction implements ModelDriven<SysSystemSetting>{
	private SysSystemSetting sysSystemSetting;
	private SysSystemSettingService sysSystemSettingService;
	public void setSysSuperSystemInternalTable(
			SysSystemSetting sysSystemSetting) {
		this.sysSystemSetting = sysSystemSetting;
	}
	public void setSysSystemSettingService(
			SysSystemSettingService sysSystemSettingService) {
		this.sysSystemSettingService = sysSystemSettingService;
	}
	@Override
	public SysSystemSetting getModel() {
	    if (sysSystemSetting == null) {
	        sysSystemSetting = new SysSystemSetting();
	    }
		return sysSystemSetting;
	}
	
	//查询配置
	public String querySystemSetting (){
		SysSystemSetting sst = new SysSystemSetting();
		try {
			sst = sysSystemSettingService.selectByPrimaryKey(1);
			if(sst != null){
				String json = JSONUtil.serialize(sst);
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
    
    //修改配置
    public String updateSystemSetting (){
        try {
            int result = sysSystemSettingService.updateByPrimaryKeySelective(sysSystemSetting);
            if(result != 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "修改成功", null));
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
