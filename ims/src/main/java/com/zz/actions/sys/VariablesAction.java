package com.zz.actions.sys;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.PubUploadUtil;
import com.zz.other.Syslog;
import com.zz.po.sys.SysVariables;
import com.zz.service.sys.SysVariablesService;
import org.apache.struts2.json.JSONUtil;

import java.util.List;

public class VariablesAction extends BaseAction implements ModelDriven<SysVariables>{
	private SysVariables sysVariables;
	private SysVariablesService sysVariablesService;



	//查询变量
	public String selectSysVariables(){
		try {
			List<SysVariables> list = sysVariablesService.selectByPrimaryKey(sysVariables);
			if(list.size() != 0) {
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
	
	//修改
	public String  updateSysVariables(){
		try {
			System.out.println("000"+sysVariables);
			System.out.println(sysVariables.toString());
			int result = sysVariablesService.updateByPrimaryKeySelective(sysVariables);
			if(result==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	//指定变量恢复到初始版本
	public String recoveryFirstVariables(){
		try {
			int result = sysVariablesService.recoveryFirst(sysVariables);
			System.out.println(sysVariables);
			if(result==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "恢复失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	public void deleteVariablesPic() {
	    try {
            List<SysVariables> list = sysVariablesService.selectByPrimaryKey(sysVariables);
            if (list.isEmpty()) {
                printlnMsg("-1");
                return;
            }
            String oldPath = list.get(0).getImgPath();
            String delPath = sysVariables.getImgPath();
            String newPath = PubUploadUtil.getNewPath(oldPath, delPath);
            sysVariables.setImgPath(newPath);
            int result = sysVariablesService.updateByPrimaryKeySelective(sysVariables);
            if (result > 0) {
            	printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
            	printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
            }
        } catch (Exception e) {
        	e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
	
	/*这里是更新微信公众号公司名电话*/
	public String updatecompany(){
		try {
			 int result = sysVariablesService.updateByPrimaryKeySelective(sysVariables);
	            if (result > 0) {
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
	
	public void setSysVariables(SysVariables sysVariables) {
		this.sysVariables = sysVariables;
	}
	public void setSysVariablesService(SysVariablesService sysVariablesService) {
		this.sysVariablesService = sysVariablesService;
	}
	@Override
	public SysVariables getModel() {
		if(sysVariables == null){
			sysVariables = new SysVariables();
		}
		return sysVariables;
	}
}