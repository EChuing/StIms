package com.zz.actions.cs;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.cs.CsOutsideCustomerExpansion;
import com.zz.po.journal.JournalShortMessage;
import com.zz.service.cs.CsSalesClientContractService;
import com.zz.service.journal.ShortMessageService;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class CsOutsideCustomerExpansionAction extends BaseAction implements ModelDriven<CsOutsideCustomerExpansion> {
	@Autowired
	private CsOutsideCustomerExpansion csOutsideCustomerExpansion;
	private CsSalesClientContractService csSalesClientContractService;
	private ShortMessageService shortMessageService;
	
	public void setCsSalesClientContractService(CsSalesClientContractService csSalesClientContractService) {
		this.csSalesClientContractService = csSalesClientContractService;
	}
	public void setShortMessageService(ShortMessageService shortMessageService) {
		this.shortMessageService = shortMessageService;
	}
	@Override
	public CsOutsideCustomerExpansion getModel() {
		if(csOutsideCustomerExpansion==null){
			csOutsideCustomerExpansion = new CsOutsideCustomerExpansion();
		}
		return csOutsideCustomerExpansion;
	}
	public void signContract1() throws Exception{
		try{
		String result = csSalesClientContractService.dealWithSign(csOutsideCustomerExpansion);
		if(!"-1".equals(result)){
			JSONObject jobj = JSONObject.fromObject(csOutsideCustomerExpansion.getCsTemplateFillValue());
			JSONObject jobj2 = jobj.getJSONObject("insertData");
			//String address = jobj2.getString("jcdHouseAddress");
			JournalShortMessage journalShortMessage = new JournalShortMessage();
			journalShortMessage.setMessageType(17);
			journalShortMessage.setUrl(result);
			journalShortMessage.setPopName(csOutsideCustomerExpansion.getCsName());
			journalShortMessage.setPopTelephone(csOutsideCustomerExpansion.getCsTelphone());
			//journalShortMessage.setPopCocId(csOutsideCustomerExpansion.getCsCocId());
			journalShortMessage.setCompanyAddress("");
	
			Result<String> result1 = shortMessageService.sendOutsideMessage(journalShortMessage);
			String resultStr = JSON.toJSONString(result1);
			printlnOfJson(resultStr);
		}else{
			printlnOfJson(CommonMethodClass.jsonData(-1, "创建合同失败", null));
			System.out.println("创建合同失败");
		} 
		}catch(Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
			System.out.println("系统异常");
		}
	}
	public String syncCallBackTwo() throws Exception{
		System.out.println("同步： " + csOutsideCustomerExpansion.toString());
		HttpServletRequest req = ServletActionContext.getRequest();
		if("0".equals(csOutsideCustomerExpansion.getCode())){
			System.out.println("999999999999999==================");
			String result = csSalesClientContractService.syncAddNoRent(csOutsideCustomerExpansion);
			req.setAttribute("url", result);
			req.setAttribute("result", "已签署成功,请长按二维码添加微信公众号");
		}else{
			req.setAttribute("result", "签署失败");
		}
		
		return "success";
	}
	public String signShowTwo() throws Exception {
		String result = csSalesClientContractService.signShow(csOutsideCustomerExpansion);
		if("-1".equals(result)){
			result = "查询不到这份合同";
		}
		if("-2".equals(result)){
			result = "合同已经使用过了";
		}
		
		HttpServletRequest request=ServletActionContext.getRequest();  
		request.setCharacterEncoding("UTF-8");
	    request.setAttribute("formString", result);
		return "sign";
	}
	public String asynCallBackTwo() throws Exception{
		System.out.println("异步： " + csOutsideCustomerExpansion.toString());
		HttpServletResponse response = ServletActionContext.getResponse();
        response.setContentType("text/html;charset=UTF-8");  
        PrintWriter out = response.getWriter();  
        if("0".equals(csOutsideCustomerExpansion.getCode())){
        String result = csSalesClientContractService.asynAddNoRent(csOutsideCustomerExpansion);
        }
        out.println("success");//返回的字符串数据  
           
        return null;
	}
	public void getCustomerImg(){
		try {
			System.out.println(csOutsideCustomerExpansion);
			Result<String> Result = csSalesClientContractService.getCustomerImg(csOutsideCustomerExpansion);
			JSONObject resultObj = JSONObject.fromObject(Result);
			String result = resultObj.toString();
			printlnMsg(result);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		
	}
	
}
