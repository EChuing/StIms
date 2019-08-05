package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.journal.JournalRepairExpand;
import com.zz.po.journal.JournalRepairProgressExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.journal.RepairProgressService;
import com.zz.service.journal.RepairService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * 维保、任务
 * @author Administrator
 * 
 */
public class RepairAction extends BaseAction implements ModelDriven<JournalRepairExpand>{
	private JournalRepairExpand journalRepairExpand;
	private RepairService repairService;
	@Autowired
	private RepairProgressService repairProgressService;

	public void setRepairService(RepairService repairService) {
        this.repairService = repairService;
    }

    @Override
    public JournalRepairExpand getModel() {
        if( journalRepairExpand==null){
            journalRepairExpand = new JournalRepairExpand();
        }
        return journalRepairExpand;
    }
    
	//查询维保-数据和统计分开
	public String selectRepair(){
		//维保 - 查个人房     C01b01
        int auth1 = Authority.authorize("C01b01");
        //维保 - 查部门房     C01b02
        int auth2 = Authority.authorize("C01b02");
        //维保 - 查分店房     C01b03
        int auth3 = Authority.authorize("C01b03");
        //维保 - 查公司       C01b04
        int auth4 = Authority.authorize("C01b04");
        //用户信息
        SysUserExpand userInfo = (SysUserExpand)ActionContext.getContext().getSession().get("userinfo");
        int userid = userInfo.getUserId();
        int department = userInfo.getSuDepartmentId();
        int storefront = userInfo.getSuStoreId();
        if (auth1 == 0 && auth2 == 0 && auth3 == 0 && auth4 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看维保权限", null));
            return null;
        } else {
            if (auth4 == 1) {
                journalRepairExpand.setPersonal(2);
            } else if (auth3 == 1) {
                journalRepairExpand.setRepStorefront(storefront);
                journalRepairExpand.setPersonal(2);
            } else if (auth2 == 1) {
                journalRepairExpand.setRepDepartment(department);
                journalRepairExpand.setPersonal(2);
            } else if (auth1 == 1) {
                if (journalRepairExpand.getRepUserId() == null && journalRepairExpand.getRepRepairPeopleId() == null) {
                    journalRepairExpand.setRepUserId(userid);
                    journalRepairExpand.setPersonal(1);
                } else {
                    if ((journalRepairExpand.getRepUserId() != null && journalRepairExpand.getRepUserId() != userid) || 
                        (journalRepairExpand.getRepRepairPeopleId() != null && journalRepairExpand.getRepRepairPeopleId() != userid)){
                        printlnOfJson(CommonMethodClass.jsonData(-3, "无权限，仅可查看本人维保", null));
                        return null;
                    } else {
                        journalRepairExpand.setPersonal(2);
                    }
                }
            }
        }
		try {
            List<JournalRepairExpand> repair = repairService.selectAllRepair(journalRepairExpand);
            if(repair.size()>0){
                for(JournalRepairExpand one : repair){
                    if(null == one.getRepContacts() || "".equals(one.getRepContacts())){
                        one.setRepContacts(one.getRenterName());
                    }
                    if(null == one.getRepContactsPhone() || "".equals(one.getRepContactsPhone())){
                        one.setRepContactsPhone(one.getRenterPhone());
                    }
                    if(null == one.getRepUseTime() || "".equals(one.getRepUseTime())){
                        one.setRepUseTime(getCurrentDateSecond());
                    }
                }
                String json = JSONUtil.serialize(repair);
                
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//查询维保-数据和统计分开
    public String selectRepairCommon(){
        try {
            List<JournalRepairExpand> repair = repairService.selectAllRepair(journalRepairExpand);
            if(repair.size()>0){
                for(JournalRepairExpand one : repair){
                    if(null == one.getRepContacts() || "".equals(one.getRepContacts())){
                        one.setRepContacts(one.getRenterName());
                    }
                    if(null == one.getRepContactsPhone() || "".equals(one.getRepContactsPhone())){
                        one.setRepContactsPhone(one.getRenterPhone());
                    }
                    if(null == one.getRepUseTime() || "".equals(one.getRepUseTime())){
                        one.setRepUseTime(getCurrentDateSecond());
                    }
                }
                String json = JSONUtil.serialize(repair);
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
	
    //查询任务-数据和统计分开
    public String queryTask(){
        //任务 - 查个人房     C03b01
        int auth1 = Authority.authorize("C03b01");
        //任务 - 查部门房     C03b02
        int auth2 = Authority.authorize("C03b02");
        //任务 - 查分店房     C03b03
        int auth3 = Authority.authorize("C03b03");
        //任务 - 查公司       C03b04
        int auth4 = Authority.authorize("C03b04");
        //用户信息
        SysUserExpand userInfo = (SysUserExpand)ActionContext.getContext().getSession().get("userinfo");
        int userid = userInfo.getUserId();
        int department = userInfo.getSuDepartmentId();
        int storefront = userInfo.getSuStoreId();
        if (auth1 == 0 && auth2 == 0 && auth3 == 0 && auth4 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看任务权限", null));
            return null;
        } else {
            if (auth4 == 1) {
                journalRepairExpand.setPersonal(2);
            } else if (auth3 == 1) {
                if(journalRepairExpand.getRepRepairStoreId() != null && journalRepairExpand.getRepRepairStoreId() != storefront){
                    printlnOfJson(CommonMethodClass.jsonData(-3, "无权限，仅可查看本人所属区域", null));
                    return null;
                }
                journalRepairExpand.setRepRepairStoreId(storefront);
                journalRepairExpand.setPersonal(2);
            } else if (auth2 == 1) {
                if(journalRepairExpand.getRepRepairDetId() != null && journalRepairExpand.getRepRepairDetId() != department){
                    printlnOfJson(CommonMethodClass.jsonData(-3, "无权限，仅可查看本人所属部门", null));
                    return null;
                }
                journalRepairExpand.setRepRepairDetId(department);
                journalRepairExpand.setPersonal(2);
            } else if (auth1 == 1) {
                if (journalRepairExpand.getRepUserId() == null && journalRepairExpand.getRepRepairPeopleId() == null) {
                    journalRepairExpand.setRepUserId(userid);
                    journalRepairExpand.setPersonal(1);
                } else {
                    if ((journalRepairExpand.getRepUserId() != null && journalRepairExpand.getRepUserId() != userid) ||
                        (journalRepairExpand.getRepRepairPeopleId() != null && journalRepairExpand.getRepRepairPeopleId() != userid)){
                        printlnOfJson(CommonMethodClass.jsonData(-3, "无权限，仅可查看本人任务", null));
                        return null;
                    } else {
                        journalRepairExpand.setPersonal(2);
                    }
                }
            }
        }
        try {
            List<JournalRepairExpand> list = repairService.selectAllTask(journalRepairExpand);
            if(list.size() > 0){
                for(JournalRepairExpand one : list){
                    if(null == one.getRepContacts() || "".equals(one.getRepContacts())){
                        one.setRepContacts(one.getRenterName());
                    }
                    if(null == one.getRepContactsPhone() || "".equals(one.getRepContactsPhone())){
                        one.setRepContactsPhone(one.getRenterPhone());
                    }
                }
                String json = JSONUtil.serialize(list);

                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
	
	//查询任务-数据和统计分开
	public String queryTaskCommon(){
		try {
            List<JournalRepairExpand> list = repairService.selectAllTask(journalRepairExpand);


            if(list.size() > 0){
                for(JournalRepairExpand one : list){
                    if(null == one.getRepContacts() || "".equals(one.getRepContacts())){
                        one.setRepContacts(one.getRenterName());
                    }
                    if(null == one.getRepContactsPhone() || "".equals(one.getRepContactsPhone())){
                        one.setRepContactsPhone(one.getRenterPhone());
                    }
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//查询维保/任务
	public String queryRepairById(){
	    try {
	        List<JournalRepairExpand> list = repairService.selectByPrimaryKey(journalRepairExpand.getRepId());
            if(list.size() > 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	    return null;
	}
	
	//添加维保/任务
	public String insertRepair(){
	    try {
            int result = repairService.insertSelective(journalRepairExpand);
            if(result > 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//批量添加维保
	public String insertListRepair(){
		try {
            Result<String> result = repairService.insertListRepair(journalRepairExpand);
            String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//更新维保/任务
	public void updateRepair(){
	    try {
            if (journalRepairExpand.getRepState() != null && journalRepairExpand.getRepState().equals("事件完成")) {
                journalRepairExpand.setRepUseTime(getCurrentDateSecond());
            }
            int result = repairService.updateByPrimaryKeySelective(journalRepairExpand);
            if (result > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
	
    /**
     * 删除图片
     */
    public void deleteRepairPic() {
        try {
            List<JournalRepairExpand> repair = repairService.selectByPrimaryKey(journalRepairExpand.getRepId());
            if(repair.size() == 0){
                printlnMsg("-1");
                return;
            }
            String oldPath = repair.get(0).getRepImgPath();
            String delPath = journalRepairExpand.getRepImgPath();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
            journalRepairExpand.setRepImgPath(newPath);
            journalRepairExpand.setRepImgNum(UploadUtil.getImageNum(newPath));
            int result = repairService.updateByPrimaryKeySelective(journalRepairExpand);
            if (result > 0) {
                printlnMsg("1");
                List<JournalRepairExpand> list = repairService.selectByPrimaryKey(journalRepairExpand.getRepId());
                JournalRepairExpand repairList = list.get(0);
                String repState = repairList.getRepState();
                String proState = "未完成";
				if (repState.equals("跟进中")){
					proState = "未完成";
				}else{
					proState = "已完成";
				}
				String proReceivableMoney = "0.00";
				String proBillingInfo = "无结算";
				String imgName = "";
				
				JSONArray oldPaths = JSONArray.fromObject("[" + oldPath + "]");
		        String[] delPaths = delPath.split(",");
		        for (Object obj : oldPaths) {
		             JSONObject jsonObject = JSONObject.fromObject(obj.toString());
		             String url = (String) jsonObject.get("path");
		             for (String url2 : delPaths) {
		                 if(url.equals(url2)){
		                	 if (imgName.length() == 0){
		                		 imgName += (String) jsonObject.get("name");
		                	 }else{
		                	 imgName += "," + (String) jsonObject.get("name");
		                	 }
		                 }
		             }
		        }
				String proRemark = "删除了文件《" + imgName + "》";
				
				
				JournalRepairProgressExpand journalRepairProgressExpand = new JournalRepairProgressExpand();
				journalRepairProgressExpand.setProRepairId(journalRepairExpand.getRepId());
				journalRepairProgressExpand.setProUserId(journalRepairExpand.getRepUserId());
				journalRepairProgressExpand.setDepartment(journalRepairExpand.getRepDepartment());
				journalRepairProgressExpand.setStorefront(journalRepairExpand.getRepStorefront());
				journalRepairProgressExpand.setProState(proState);
				journalRepairProgressExpand.setProReceivableMoney(proReceivableMoney);
				journalRepairProgressExpand.setProBillingInfo(proBillingInfo);
				journalRepairProgressExpand.setProRemark(proRemark);
				int repResult = repairProgressService.insertSelective(journalRepairProgressExpand);
				if(repResult == 0){
					printlnMsg("-1");
                }
				
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        }
    }
	
	//获取当前时间
	private String getCurrentDateSecond() {
		Date d = new Date();  
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        String dateNowStr = sdf.format(d); 
		return dateNowStr;
	}
	
}
