package com.zz.actions.sys;

import java.util.*;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.sys.SysPurview;
import com.zz.po.sys.SysPurviewExpand;
import com.zz.service.sys.PurviewService;

public class PurviewAction extends BaseAction implements ModelDriven<SysPurviewExpand> {
    private SysPurviewExpand sysPurview;
	private PurviewService purviewService;
    
    public void setPurviewService(PurviewService purviewService) {
        this.purviewService = purviewService;
    }

    @Override
    public SysPurviewExpand getModel() {
        if (sysPurview == null) {
            sysPurview = new SysPurviewExpand();
        }
        return sysPurview;
    }
	
	//根据权限ID修改
	public String updateLeftMenuPurview() {
		try {
			sysPurview.setSpName(null);
			sysPurview.setSpHavePurview(null);
			int result = purviewService.updateByPrimaryKeySelective(sysPurview);
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
	
	//查询权限
	public String selectPurvuceAll(){
	    //权限管理 - 查询     D02b01
        int auth1 = Authority.authorize("D02b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查询权限", null));
            return null;
        }
	    try {
            List<SysPurview> list = (List<SysPurview>) purviewService.selectByPrimaryKey(sysPurview);
            if (list.size() > 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	// 增加记录,新增用户权限
	public String insertPurview() {
	    try {
            String spHavePurview = 
                "{'A':'0','B':'0','C':'0','D':'0','E':'0','F':'0','G':'0','H':'0','I':'0','J':'0','K':'0','L':'0','M':'0'}";
            sysPurview.setSpName("未定义");
            sysPurview.setSpHavePurview(spHavePurview);
            int result = purviewService.insertSelective(sysPurview);
            int id = sysPurview.getSpId();
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            }else{
                List<SysPurview> list = new ArrayList<>();
                SysPurview sp = new SysPurview();
                sp.setSpId(id);
                list.add(sp);
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}

	//根据权限ID修改
	public String updatePurview() {
	    try {
            int result = purviewService.updateByPrimaryKeySelective(sysPurview);
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
	
	//根据用户ID修改
	public String updatespUsreId(){
	    try {
            int result = purviewService.updateSpUserId(sysPurview);
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
	//根据权限ID删除
	public String deletePurview(){
	    try {
            List<SysPurviewExpand> list = (List<SysPurviewExpand>) purviewService.selectIfUsed(sysPurview);
            if(list.size()>0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败，此权限有用户在使用中，请先更改这些用户的权限。", json));
            }else{
                int result = purviewService.deleteByPrimaryKey(sysPurview);
                if(result==0){
                    printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
                }else{
                    printlnOfJson(CommonMethodClass.jsonData(1, "删除成功", null));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//查询权限（不需要权限即可查询）
	public String selectAll(){
	    try {
            List<SysPurview> list = (List<SysPurview>) purviewService.selectByPrimaryKey(sysPurview);
            if (list.size() > 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	

}
