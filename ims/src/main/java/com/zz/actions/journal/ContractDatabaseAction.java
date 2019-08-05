package com.zz.actions.journal;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JournalContractDatabase;
import com.zz.service.journal.ContractDatabaseService;

public class ContractDatabaseAction extends BaseAction implements ModelDriven<JournalContractDatabase>{
	private JournalContractDatabase journalContractDatabase;
	private ContractDatabaseService contractDatabaseService;
	public void setJournalContractDatabase(
			JournalContractDatabase journalContractDatabase) {
		this.journalContractDatabase = journalContractDatabase;
	}
	public void setContractDatabaseService(
			ContractDatabaseService contractDatabaseService) {
		this.contractDatabaseService = contractDatabaseService;
	}
	@Override
	public JournalContractDatabase getModel() {
		if(journalContractDatabase == null){
			journalContractDatabase = new JournalContractDatabase();
		}
		return journalContractDatabase;
	}
	
	//合约编号的检测
	public String contractNumberdetection(){
		try {		
			int result = contractDatabaseService.contractNumberdetection(journalContractDatabase);
			if(result == -6){
				printlnOfJson(CommonMethodClass.jsonData(-1, "编号错误", null));
			}else if(result == -1){
				printlnOfJson(CommonMethodClass.jsonData(-1, "编号格式错误", null));
			}else if(result == -2){
				printlnOfJson(CommonMethodClass.jsonData(-1, "编号未使用", null));
			}else if(result == -3){
				printlnOfJson(CommonMethodClass.jsonData(-1, "编号已签约", null));
			}else if(result == -4){
				printlnOfJson(CommonMethodClass.jsonData(-1, "编号已注销", null));
			}else if(result == -5){
				printlnOfJson(CommonMethodClass.jsonData(-1, "编号不存在", null));
			}else{
				List<JournalContractDatabase> list = new ArrayList<>();
				JournalContractDatabase jcd = new JournalContractDatabase();
				jcd.setJcdId(result);
				list.add(jcd);
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "编号已领取", json));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	/**
	 * 查询合同票据
	 * @return
	 */
	public String selectContractDatabase(){
	    //合同票据 - 查询     B05b01
        int auth1 = Authority.authorize("B05b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看合同票据权限", null));
            return null;
        }
	    try {
            String strNum = null;
            String prefix = null;
            //分离前缀与数字编号
            String detectionNum = journalContractDatabase.getDetectionContract();
            if(detectionNum != null && !detectionNum.equals("")){
                for (int i = 0; i < detectionNum.length();++i){ 
                    if (Character.isDigit(detectionNum.charAt(i))){
                        strNum += detectionNum.charAt(i);
                    }else{
                        prefix += detectionNum.charAt(i);
                    }
                }
                journalContractDatabase.setJcdContractNumber(strNum);
                journalContractDatabase.setJcdContractPrefix(prefix);
            }
            List<JournalContractDatabase> cdList = contractDatabaseService.selectByPrimaryKey(journalContractDatabase);
            if(cdList.size() != 0){
                String json = JSONUtil.serialize(cdList);
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
	
	//领取合约编号
	public String getReceiveAContract(){
	    try {
            String result = contractDatabaseService.updataReceiveAContract(journalContractDatabase);
            if(result.equals("1")){
                System.out.println("成功："+result);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else if(result.equals("-2")){
                System.out.println("编号不能为空："+result);
                printlnOfJson(CommonMethodClass.jsonData(-1, "编号不能为空", null));
            }else if(result.equals("-3")){
                System.out.println("不存在或有缺失："+result);
                printlnOfJson(CommonMethodClass.jsonData(-1, "不存在或有缺失", null));
            }else if(result.equals("-4")){
                System.out.println("合约编号有误："+result);
                printlnOfJson(CommonMethodClass.jsonData(-1, "合约编号有误", null));
            }else if(result.equals("-1")){
                System.out.println("失败："+result);
                printlnOfJson(CommonMethodClass.jsonData(-1, "领取失败", null));
            }else{
                if(result != null){
                    System.out.println("存在已经领取、已签约、注销的："+result);
                    printlnOfJson(CommonMethodClass.jsonData(-7, "存在已经领取、已签约、注销的", result));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//修改状态
	public String updataContractDatabase(){
		JournalContractDatabase jcd = new JournalContractDatabase();
		jcd.setJcdId(journalContractDatabase.getJcdId());
		jcd.setJcdContractPerson(journalContractDatabase.getJcdContractPerson());
		jcd.setJcdSigningTime(journalContractDatabase.getJcdSigningTime());
		jcd.setJcdUseState(journalContractDatabase.getJcdUseState());
		jcd.setJcdCancellationReason(journalContractDatabase.getJcdCancellationReason());
		if(journalContractDatabase.getJcdUseState().equals("注销")){
			jcd.setJcdCancellationTime(getCurrentDate());
			jcd.setJcdCancellationPerson(journalContractDatabase.getJcdCancellationPerson());
		}
		try {
            int result = contractDatabaseService.updateByPrimaryKeySelective(jcd);
            if(result != 0){
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
	
	//新增
	public String insertContractDatabase(){
	    try {
            String result = contractDatabaseService.insertSelective(journalContractDatabase);
//            System.out.println(result);
            if(result.equals("1")){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else if(result.equals("-1")){
                //不能超过1000条
                printlnOfJson(CommonMethodClass.jsonData(-1, "不能超过1000条", null));
            }else{
                //返回用“##”隔开的合约编号（已有的）
                printlnOfJson(CommonMethodClass.jsonData(-7, "合约编号（已有的）", result));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 添加合约编号失败", null));
        }
		return null;
	}
	
	/**
	 * 获取系统当前日期时间
	 */
	private static String getCurrentDate(){
		Date d = new Date();  
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        String dateNowStr = sdf.format(d); 
		return dateNowStr;
	}
}
