package com.zz.actions.sys;

import java.util.ArrayList;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.sys.SysDepartment;
import com.zz.po.sys.SysDepartmentExpand;
import com.zz.service.sys.DepartmentService;

public class DepartmentAction extends BaseAction implements ModelDriven<SysDepartmentExpand> {
    private SysDepartmentExpand sysDepartmentExpand;
	private DepartmentService departmentService;
    
    public void setDepartmentService(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }
    @Override
    public SysDepartmentExpand getModel() {
        if(sysDepartmentExpand==null){
            sysDepartmentExpand = new SysDepartmentExpand();
        }
        return sysDepartmentExpand;
    }

	// 查询所有用户信息，给出条件则为条件查询
	public String queryDepartment() {
		try {
			List<SysDepartment> department = departmentService.selectByPrimaryKey(sysDepartmentExpand);
			if(department.size() != 0) {
				String json = JSONUtil.serialize(department);
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
	public String insertDepartment(){
	    try {
            int result = departmentService.insertSelective(sysDepartmentExpand);
            int id = sysDepartmentExpand.getDepartmentId();
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            }else{
                List<SysDepartment> list = new ArrayList<>();
                SysDepartment sd = new SysDepartment();
                sd.setDepartmentId(id);
                list.add(sd);
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
	public String updateDepartment(){
		try {
			int result = departmentService.updateByPrimaryKeySelective(sysDepartmentExpand);
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

}
