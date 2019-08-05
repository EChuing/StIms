package com.zz.actions.journal;

import java.util.List;

import com.zz.other.Syslog;
import net.sf.json.JSONObject;

import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.JavaSmsApi;
import com.zz.actions.commons.ShieldingWords;
import com.zz.po.commons.Result;
import com.zz.po.journal.JournalShortMessageAdministrative;
import com.zz.po.sys.SysSystemSetting;
import com.zz.service.journal.ShortMessageAdministrativeService;
import com.zz.service.sys.SendShortMessageService;
import com.zz.service.sys.SysSystemSettingService;
import com.zz.util.SessionUtil;

public class ShortMessageAdministrativeAction extends BaseAction implements
		ModelDriven<JournalShortMessageAdministrative> {
	ShieldingWords sw = new ShieldingWords();
	private JournalShortMessageAdministrative journalShortMessageAdministrative;
	private ShortMessageAdministrativeService shortMessageAdministrativeService;
    private SysSystemSettingService sysSystemSettingService;
    @Autowired
    private SendShortMessageService sendShortMessageService;
	
	public void setJournalShortMessageAdministrative(
			JournalShortMessageAdministrative journalShortMessageAdministrative) {
		this.journalShortMessageAdministrative = journalShortMessageAdministrative;
	}	
	
	public void setShortMessageAdministrativeService(
			ShortMessageAdministrativeService shortMessageAdministrativeService) {
		this.shortMessageAdministrativeService = shortMessageAdministrativeService;
	}
	
	public void setSysSystemSettingService(
			SysSystemSettingService sysSystemSettingService) {
		this.sysSystemSettingService = sysSystemSettingService;
	}
	
	@Override
	public JournalShortMessageAdministrative getModel() {
		if (journalShortMessageAdministrative == null) {
			journalShortMessageAdministrative = new JournalShortMessageAdministrative();
		}
		return journalShortMessageAdministrative;
	}
	
	//查询-数据和统计分开
	public String selectShortMessageAdministrativeSplit(){
	  //短信记录 - 查询     F07b01
        int auth1 = Authority.authorize("F07b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看短信权限", null));
            return null;
        }
		try {
			List<JournalShortMessageAdministrative> list = shortMessageAdministrativeService.selectAllShortMessage(journalShortMessageAdministrative);
			String json = JSONUtil.serialize(list);
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	// 维修事务短信提醒
	public String sRepair() {
		try {
	        JournalShortMessageAdministrative jsm = new JournalShortMessageAdministrative();
            //新增一条短信
            System.out.println("jour========"+journalShortMessageAdministrative);
            int smUserId = journalShortMessageAdministrative.getSmUserId();
            System.out.println("id:"+smUserId);
            List<JournalShortMessageAdministrative> list = shortMessageAdministrativeService.getUser(smUserId);
            String smUserContacts = list.get(0).getSmUserContacts();
            System.out.println("电话："+smUserContacts);
            journalShortMessageAdministrative.setSmUserId(smUserId);
            journalShortMessageAdministrative.setSmUserContacts(smUserContacts);
            journalShortMessageAdministrative.setSmType("发送");
            journalShortMessageAdministrative.setSmContent("维修事务提醒");
            int result1 = shortMessageAdministrativeService.insertSelective(journalShortMessageAdministrative);
            int smId = journalShortMessageAdministrative.getSmId();
            System.out.println("维修短信id: "+smId);
            journalShortMessageAdministrative.setSmId(smId);
            //短信发送处理
            String[] strnum = smsRepair(journalShortMessageAdministrative).split("###");
            if(Integer.parseInt(strnum[0]) == 0){
                System.out.println("推送成功");
                jsm.setSmId(journalShortMessageAdministrative.getSmId());
                jsm.setSmCount(Integer.parseInt(strnum[1]));
                jsm.setSmContent(strnum[2]);
                jsm.setSmState("推送成功");
                int result = shortMessageAdministrativeService.updateByPrimaryKeySelective(jsm);
                
                SysSystemSetting sst = new SysSystemSetting();
                sst.setSsitId(1);
                sst.setSsitSmsAccountBalance(Double.parseDouble(strnum[3]));
                int result2 = sysSystemSettingService.updateByPrimaryKeySelective(sst);
                printlnMsg("1");
            }else if(Integer.parseInt(strnum[0]) == 9999){
                System.out.println("推送失败");
                jsm.setSmId(journalShortMessageAdministrative.getSmId());
                jsm.setSmCount(0);
                jsm.setSmContent(strnum[2]);
                jsm.setSmState("余额不足");
                int result = shortMessageAdministrativeService.updateByPrimaryKeySelective(jsm);
                printlnMsg("-2");
            }else{
                System.out.println("推送失败");
                jsm.setSmId(journalShortMessageAdministrative.getSmId());
                jsm.setSmCount(0);
                jsm.setSmContent(strnum[2]);
                jsm.setSmState("推送失败");
                int result = shortMessageAdministrativeService.updateByPrimaryKeySelective(jsm);
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
		return null;
	}
	
	// 维修事务短信提醒
	private String smsRepair(JournalShortMessageAdministrative journalShortMessageAdministrative) throws Exception {
		String data = "";
		String company = "";
		String mobile = "";
		String evenType = "";
		String houseAddress = "";
		String popName = "";
		String popTelephone = "";
		String hopeTime = "";
		String repairDescribe = "";
		String uid = "";
		String coId = "";
		Double smsBalance = 0.0;
		// 获取公司名
        company = SessionUtil.getSession("company");
        coId = SessionUtil.getSession("coId");
		//获取短信key、单价、余额
		String keydate = smsInformation();
		
		// 获取姓名，手机号码
		try {
			mobile = journalShortMessageAdministrative.getSmUserContacts();
	        System.out.println("维修人员电话："+mobile);
	     // 获取事件类型、楼盘名称、客户名、客户电话、期望时间、事件描述
	        evenType = journalShortMessageAdministrative.getRepairEvenType();
	        houseAddress = journalShortMessageAdministrative.getAddCommunity();
	        popName = journalShortMessageAdministrative.getPopName();
	        popTelephone = journalShortMessageAdministrative.getPopTelephone();
	        hopeTime = journalShortMessageAdministrative.getHopeTime();
	        repairDescribe = journalShortMessageAdministrative.getRepairDescribe();
	        
	       //业务id
	        uid = company+"_FD_"+journalShortMessageAdministrative.getSmId();	       
        	
        	data = mobile+"###"+evenType+"###"+houseAddress+"###"+popName+"###"+popTelephone+"###"+hopeTime+"###"
        				+repairDescribe+"###"+uid+"###"+company+"###"+journalShortMessageAdministrative.getSmId()+"###"+coId+keydate;
        	//查找屏蔽词，替换
            data = sw.matchedMaskWord(data);
        	//执行
        	System.out.println("data:"+data);
        	String smsDate = JavaSmsApi.repair(data);
 	       //获取发送后的返回值
        	String[] sdata = smsDate.split("###");
    		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
    		String strnum = jsStr.getString("code");
    		String count = "0";
    		
    		String[] temp = keydate.split("###");
			smsBalance = Double.parseDouble(temp[3]);
	        if(strnum.equals("0")){ 
	     		count = sdata[1];
	     		smsBalance = Double.parseDouble(sdata[3]);
	     		strnum +="###"+count+"###"+sdata[2]+"###"+smsBalance;
	         	System.out.println(sdata[1]+"---- "+count);
	        }else{
	        	strnum = strnum+"###"+count+"###"+sdata[2]+"###"+smsBalance;
	        }
    		System.out.println("--我要查的东西-" + strnum);
    		return strnum;
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
		return null;
	}

	// 事务审批短信提醒
	public String sEvenApproval() {
	    try {
            JournalShortMessageAdministrative jsm = new JournalShortMessageAdministrative();
            //新增一条短信
            int smUserId = journalShortMessageAdministrative.getSmUserId();
            List<JournalShortMessageAdministrative> list = shortMessageAdministrativeService.getUser(smUserId);
            String smUserContacts = list.get(0).getSmUserContacts();
            System.out.println("电话："+smUserContacts);
            journalShortMessageAdministrative.setSmUserId(smUserId);
            journalShortMessageAdministrative.setSmUserContacts(smUserContacts);
            journalShortMessageAdministrative.setSmType("发送");
            journalShortMessageAdministrative.setSmContent("事务审批提醒");
            int result1 = shortMessageAdministrativeService.insertSelective(journalShortMessageAdministrative);
            int smId = journalShortMessageAdministrative.getSmId();
            System.out.println("审批短信id: "+smId);
            journalShortMessageAdministrative.setSmId(smId);
            //短信发送处理
            String[] strnum = smsEvenApproval(journalShortMessageAdministrative).split("###");
            System.out.println("短信发送结果："+ strnum[0]+" --- "+ strnum[1]+" --- "+strnum[2]);
            if(Integer.parseInt(strnum[0]) == 0){
                System.out.println("推送成功");
                jsm.setSmId(journalShortMessageAdministrative.getSmId());
                jsm.setSmCount(Integer.parseInt(strnum[1]));
                jsm.setSmContent(strnum[2]);
                jsm.setSmState("推送成功");
                int result = shortMessageAdministrativeService.updateByPrimaryKeySelective(jsm);
                
                SysSystemSetting sst = new SysSystemSetting();
                sst.setSsitId(1);
                sst.setSsitSmsAccountBalance(Double.parseDouble(strnum[3]));
                int result2 = sysSystemSettingService.updateByPrimaryKeySelective(sst);
                printlnMsg("1");
            }else if(Integer.parseInt(strnum[0]) == 9999){
                System.out.println("推送失败");
                jsm.setSmId(journalShortMessageAdministrative.getSmId());
                jsm.setSmCount(0);
                jsm.setSmContent(strnum[2]);
                jsm.setSmState("余额不足");
                int result = shortMessageAdministrativeService.updateByPrimaryKeySelective(jsm);
                printlnMsg("-2");
            }else{
                System.out.println("推送失败");
                jsm.setSmId(journalShortMessageAdministrative.getSmId());
                jsm.setSmCount(0);
                jsm.setSmContent(strnum[2]);
                jsm.setSmState("推送失败");
                int result = shortMessageAdministrativeService.updateByPrimaryKeySelective(jsm);
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
		return null;
	}
	
	// 事务审批短信提醒
	private String smsEvenApproval(JournalShortMessageAdministrative journalShortMessageAdministrative) throws Exception {
		String handleStatus = "";
		String handleOpinion = "";
		String data = "";
		String company = "";
		String mobile = "";
		String evenType = "";
		String houseAddress = "";
		String houseType = "";
		Double smMoney = 0.00;
		String repairDescribe = "";
		String uid = "";
		String coId = "";
		Double smsBalance = 0.0;
		// 获取公司名
        company = SessionUtil.getSession("company");
        coId = SessionUtil.getSession("coId");
		
		//获取短信key、单价、余额
		String keydate = smsInformation();
				
		// 获取姓名，手机号码
		try {
			//处理状态、处理意见、下一个要发送短信认的id
			handleStatus = journalShortMessageAdministrative.getHandleStatus();
			handleOpinion = journalShortMessageAdministrative.getHandleOpinion();
			mobile = journalShortMessageAdministrative.getSmUserContacts();
			// 获取事件类型、房屋地址、地址类型、涉及的金额、事件描述、
	        evenType = journalShortMessageAdministrative.getEvenType();
	        houseAddress = journalShortMessageAdministrative.getAddCommunity();
	        houseType = journalShortMessageAdministrative.getHouseType();
	        smMoney = journalShortMessageAdministrative.getSmMoney();
	        repairDescribe = journalShortMessageAdministrative.getRepairDescribe();
	        //业务id
	        uid = company+"_FD_"+journalShortMessageAdministrative.getSmId(); 
        	System.out.println("coId:"+coId);
        	data = mobile+"###"+evenType+"###"+repairDescribe+"###"+houseAddress+"###"
        				+houseType+"###"+smMoney+"###"+uid+"###"+company+"###"+journalShortMessageAdministrative.getSmId()+"###"
        				+coId+"###"+handleStatus+"###"+handleOpinion+keydate;
        	//查找屏蔽词，替换
            data = sw.matchedMaskWord(data);
			System.out.println("到这里来了没"+22222222);
        	//执行
        	System.out.println("data:"+data);
        	String smsDate = JavaSmsApi.evenApproval(data);
 	       //获取发送后的返回值
        	String[] sdata = smsDate.split("###");
        	System.out.println("sdata[0]:"+sdata);
    		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
    		String strnum = jsStr.getString("code");
    		String count = "0";
    		
    		String[] temp = keydate.split("###");
			smsBalance = Double.parseDouble(temp[3]);
			if(strnum.equals("0")){ 
	     		count = sdata[1];
	     		smsBalance = Double.parseDouble(sdata[3]);
	     		strnum +="###"+count+"###"+sdata[2]+"###"+smsBalance;
	         	System.out.println(sdata[1]+"---- "+count);
	        }else{
	        	strnum = strnum+"###"+count+"###"+sdata[2]+"###"+smsBalance;
	        }
    		System.out.println("--我要查的东西-" + strnum);
    		return strnum;
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
		return null;
	}

	//内部事务短信查询
	public String internalSelectShortMessage() {
			try {
				List<JournalShortMessageAdministrative> list = shortMessageAdministrativeService.selectByPrimaryKey(journalShortMessageAdministrative);
				String date = "";
				if (list.size() != 0) {
					for(int i=0;i<list.size();i++){
						date = list.get(i).getSmDataTime().substring(0,19);
						list.get(i).setSmDataTime(date);
					}
					String json = JSONUtil.serialize(list);
					
					printlnOfJson(json);
				} else {
					printlnMsg("-1");
				}
			} catch (Exception e) {}
		return null;
	}
	//内部事务短信修改
	public String internalUpdateShortMessage() {
		try {
			JournalShortMessageAdministrative jsm = new JournalShortMessageAdministrative();
			jsm.setSmId(journalShortMessageAdministrative.getSmId());
			int result = shortMessageAdministrativeService.updateByPrimaryKeySelective(jsm);
			if (result == 0) {
				printlnMsg("-1");
			} else {
				printlnMsg("1");
			}
		} catch (Exception e) {
		}
		return null;
	}
	
	//获取短信key、单价、余额
	private String smsInformation() throws Exception{
		 SysSystemSetting sst = sysSystemSettingService.selectByPrimaryKey(1);
		 String smsKey = sst.getSsitShortMessageInterface();
		 String password = sst.getSsitPassword();
		 Double smsPrice = sst.getSsitSmsUnitPrice();
		 Double smsBalance = sst.getSsitSmsAccountBalance();
		 String autograph = sst.getSsitIdentification();
		 String temp = "###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph + "###" + password;
		 System.out.println("获取短信key、单价、余额:"+smsKey+" ### "+smsPrice+" ### "+smsBalance+"###"+autograph+ "###" + password);
		 return temp;
	}
	
	//发送维修短信
	public void sendRepairMsg(){
		try {
			int smUserId = journalShortMessageAdministrative.getSmUserId();
			List<JournalShortMessageAdministrative> list = shortMessageAdministrativeService.getUser(smUserId);
			String smUserContacts = list.get(0).getSmUserContacts();
			journalShortMessageAdministrative.setSmUserId(smUserId);
			journalShortMessageAdministrative.setSmUserContacts(smUserContacts);
			journalShortMessageAdministrative.setSmType("发送");
			String message = createRepairMsg();
			journalShortMessageAdministrative.setSmContent(message);
			Result<String> result = sendShortMessageService.sendMessage(smUserContacts, message, journalShortMessageAdministrative, 1);
			printlnOfJson(CommonMethodClass.jsonData(result.getCode(), result.getMsg(), result.getBody()));
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
	}
	
	//创建维修短信拼接
	public String createRepairMsg(){
		String message = null;
		String evenType =journalShortMessageAdministrative.getRepairEvenType(); //事件
		String repairDescribe = journalShortMessageAdministrative.getRepairDescribe();
		String hopeTime = journalShortMessageAdministrative.getHopeTime(); //期望时间
		String houseAddress = journalShortMessageAdministrative.getAddCommunity();//地址
		String popName= journalShortMessageAdministrative.getPopName();//名字
		String popTelephone = journalShortMessageAdministrative.getPopTelephone();//电话
		message = "您有一个新的"+evenType+"需要处理："+repairDescribe+"，期望处理时间："+hopeTime+"。地址："+houseAddress+"，客户名："+popName+"，电话："+popTelephone+"。";
		return message;
	}
	
	//发送审批短信
	public void sendEventApprovalMsg(){
		try{
			int smUserId = journalShortMessageAdministrative.getSmUserId();
			//查询手机号
	        List<JournalShortMessageAdministrative> list = shortMessageAdministrativeService.getUser(smUserId);
	        String smUserContacts = list.get(0).getSmUserContacts();
	        journalShortMessageAdministrative.setSmUserId(smUserId);
	        journalShortMessageAdministrative.setSmUserContacts(smUserContacts);
	        journalShortMessageAdministrative.setSmType("发送");
	        String message = createEventApprovalMsg();
	        journalShortMessageAdministrative.setSmContent(message);
	        Result<String> result = sendShortMessageService.sendMessage(smUserContacts, message, journalShortMessageAdministrative, 1);
	        printlnOfJson(CommonMethodClass.jsonData(result.getCode(), result.getMsg(), result.getBody()));
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
		
	}
	
	//生成审批短信内容
	public String createEventApprovalMsg(){
		String message;
		String handleStatus = journalShortMessageAdministrative.getHandleStatus();//处理状态
		String handleOpinion = journalShortMessageAdministrative.getHandleOpinion();//处理意见
		String evenType = journalShortMessageAdministrative.getEvenType();//事件类型
		String houseAddress = journalShortMessageAdministrative.getAddCommunity();//房屋地址
		String houseType = journalShortMessageAdministrative.getHouseType();//地址类型
		Double smMoney = journalShortMessageAdministrative.getSmMoney();//涉及的金额
		String repairDescribe = journalShortMessageAdministrative.getRepairDescribe();//事件描述
		if(repairDescribe.length() > 100){
			repairDescribe = repairDescribe.substring(0, 100);
        }
		if(handleStatus.equals("已完成")){
        	message = "您有一个"+evenType+"事务，已经处理完成。处理意见："+handleOpinion+"。";
        }else{
        	message = "您有一个新的"+evenType+"需要处理："+repairDescribe+"。地址："+houseAddress+"，类型："+houseType+"，金额："+smMoney+"。";
        }
		return message;
	}
	
}
