package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoIntendedPerson;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.info.IntendedPersonService;
import com.zz.util.DateUtil;

public class IntendedPersonAction extends BaseAction implements ModelDriven<InfoIntendedPerson> {
	private InfoIntendedPerson infoIntendedPerson;
	private IntendedPersonService intendedPersonService;
	public void setInfoIntendedPerson(InfoIntendedPerson infoIntendedPerson) {
		this.infoIntendedPerson = infoIntendedPerson;
	}
	public void setIntendedPersonService(IntendedPersonService intendedPersonService) {
		this.intendedPersonService = intendedPersonService;
	}
	@Override
	public InfoIntendedPerson getModel() {
		if(infoIntendedPerson == null){
			infoIntendedPerson = new InfoIntendedPerson();
		}
		return infoIntendedPerson;
	}
	
	/**
	 * 查询意向客户
	 * @return
	 */
	public String selectIntendedPerson(){
		//意向客户 - 查个人客 A05b01
        int auth1 = Authority.authorize("A05b01");
        //意向客户 - 查部门客 A05b02
        int auth2 = Authority.authorize("A05b02");
        //意向客户 - 查分店客 A05b03
        int auth3 = Authority.authorize("A05b03");
        //意向客户 - 查公司   A05b04
        int auth4 = Authority.authorize("A05b04");
        //用户信息
        SysUserExpand userInfo = (SysUserExpand)ActionContext.getContext().getSession().get("userinfo");
        int userid = userInfo.getUserId();
        int department = userInfo.getSuDepartmentId();
        int storefront = userInfo.getSuStoreId();
        if (auth1 == 0 && auth2 == 0 && auth3 == 0 && auth4 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看意向客户权限", null));
            return null;
        } else {
            if (auth4 == 1) {
                
            } else if (auth3 == 1) {
                infoIntendedPerson.setIpStorefrontId(storefront);
            } else if (auth2 == 1) {
                infoIntendedPerson.setIpDepartmentId(department);
            } else if (auth1 == 1) {
                infoIntendedPerson.setIpUserId(userid);
            }
        }
		try {
            List<InfoIntendedPerson> list = intendedPersonService.selectByPrimaryKey(infoIntendedPerson);
            if(list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
		return null;
	}
	
	//新增
	public String insertIntendedPerson(){
	    try {
            int result = intendedPersonService.insertSelective(infoIntendedPerson);
            if(result == 0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	//修改
	public String updateIntendedPerson(){
	    try {             
            int result = intendedPersonService.updateById(infoIntendedPerson);
            if(result == 0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	//修改意向人状态
	public String intendedChangeRent(){
		try {
			int result;
			int id = infoIntendedPerson.getIpId();
			InfoIntendedPerson infoIntended = new InfoIntendedPerson();
			infoIntended.setIpId(id);
			infoIntended.setIpState(infoIntendedPerson.getIpState());
			result = intendedPersonService.updateByPrimaryKeySelective(infoIntended);
			if(result == 0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		return null;
	}
	
	//写跟进
	public String intendedFollow(){
		try {
			int result;
			int id = infoIntendedPerson.getIpId();
			String note = infoIntendedPerson.getIpNote();
			InfoIntendedPerson infoIntended = new InfoIntendedPerson();
			infoIntended.setIpId(id);
			infoIntended.setIpNote(note);
			infoIntended.setIpNoteDate(DateUtil.getCurDateTime());
			result = intendedPersonService.updateByPrimaryKeySelective(infoIntended);
			if(result == 0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "写跟进失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		return null;
	}
}

