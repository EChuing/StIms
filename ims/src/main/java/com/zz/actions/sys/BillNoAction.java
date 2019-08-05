package com.zz.actions.sys;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.sys.SysBillNo;
import com.zz.po.sys.SysVoucherNo;
import com.zz.service.sys.BillNoService;

public class BillNoAction extends BaseAction implements ModelDriven<SysBillNo>{
	private SysBillNo sysBillNo;
	private BillNoService billNoService;
	public void setSysBillNo(SysBillNo sysBillNo) {
		this.sysBillNo = sysBillNo;
	}
	public void setBillNoService(BillNoService billNoService) {
		this.billNoService = billNoService;
	}
	
	/**
	 * 生成6位数的票据编号，票据编号id前补0
	 * @return
	 */
	public String getBillNoWhenPrint(){
		try {
			//获取当前时间
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	        Calendar c = Calendar.getInstance(); 
	        sysBillNo.setBillId(null);
			sysBillNo.setBillTime(CommonMethodClass.getCurrentDate());
			int result = billNoService.insert(sysBillNo);
			if(result>0){
				String a = "";
				String str = "000000";
				a = ""+sysBillNo.getBillId();
				int leng = a.length();
				int poor = str.length()-leng;
				String zoer = "";
				for(int i=0;i<poor;++i){
					zoer += 0;	
				}
				a = zoer+a;
				String[] time = df.format(c.getTime()).split("-");
			    String strtime = String.valueOf(time[0].charAt(2))+String.valueOf(time[0].charAt(3));
			    String document = strtime+time[1]+time[2];
			    printlnOfJson(CommonMethodClass.jsonData(1, "成功", ""+document+a));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	@Override
	public SysBillNo getModel() {
		// TODO Auto-generated method stub
		if(sysBillNo==null){
			sysBillNo = new SysBillNo();
		}
		return sysBillNo;
	}
}
