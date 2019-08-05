package com.zz.actions.commons;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zz.other.Syslog;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;


public class JavaSmsApi {
	//编码格式。发送编码格式统一用UTF-8
	private static final String ENCODING = "UTF-8";
	
	private static final String Instant_SMS_URL = "http://hprpt2.eucp.b2m.cn:8080/sdkproxy/sendsms.action"; //发送即时短信的Http接口
	
	private static final String Timing_SMS_URL = "http://hprpt2.eucp.b2m.cn:8080/sdkproxy/sendtimesms.action"; //发送定时短信的Http接口
	
	private static final String  Upstream_SMS_URL = "http://hprpt2.eucp.b2m.cn:8080/sdkproxy/getmo.action"; //获取上行短信的Http接口
	
	private static final String  CTB_SMS_URL = "http://hprpt2.eucp.b2m.cn:8080/sdkproxy/querybalance.action"; //查询余额的Http接口
	
	private static final String  GSR_SMS_URL = "http://hprpt2.eucp.b2m.cn:8080/sdkproxy/getreport.action"; //获取状态报告的Http接口
	
	private static final String  REI_SMS_URL = "http://hprpt2.eucp.b2m.cn:8080/sdkproxy/registdetailinfo.action"; //注册企业信息的Http接口
    
    //房至尊服务地址
    private static String url = "http://www.fangzhizun.com/ims";
    
    //自定义群发短信
    public static String sendMsgBySet(String smsDate) throws IOException, URISyntaxException{
    	/**
    	 * mobile+"###"+uid+"###"+company+"###"+journalShortMessage.getSmId()+"###"+coId+
    	 * ###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password
    	 */
    	String[] data = smsDate.split("###");
    	//群发内容
    	String note = data[0];
    	//您要发送的手机号  
        String mobile = data[1];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = data[2];
        //公司名
        String co = data[3];
        //短信ID
        String sm_id = data[4];
        //自定义参数（公司ID）
        String extend = data[5];
        //用户公司的唯一标识
        String apikey = data[6];  // key公司序列号
        Double smsPrice = Double.parseDouble(data[7]); //  单价
		Double smsBalance = Double.parseDouble(data[8]); // 余额
		String autograph = data[9]; // 公司标签
        String password = data[10]; //密码
        String wechatPublicNumber = data[11];//微信公众号
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //短信发送内容
        String message = "";
        message = "【"+autograph+"】"+note;
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
        
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请您充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str = str+"###"+a+"###"+message+"###"+smsBalance;
        System.out.println("我需要的：："+str+"\n"+message);
        return str;
    }
    //租客优惠券以及每期收支结算短信发送
    public static String sendMsgToRenter(String smsDate,int msgType) throws IOException, URISyntaxException{
    	/**
    	 * mobile+"###"+uid+"###"+company+"###"+journalShortMessage.getSmId()+"###"+coId+
    	 * ###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password
    	 */
    	String[] data = smsDate.split("###");
    	//租客姓名
        String userName = data[0];
    	//您要发送的手机号  
        String mobile = data[1];
        //您要发送的手机号  
        String address = data[2];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = data[3];
        //金额
        String money = data[4];
        //公司名
        String co = data[5];
        //短信ID
        String sm_id = data[6];
        //自定义参数（公司ID）
        String extend = data[7];
        //用户公司的唯一标识
        String apikey = data[8];  // key公司序列号
        Double smsPrice = Double.parseDouble(data[9]); //  单价
		Double smsBalance = Double.parseDouble(data[10]); // 余额
		String autograph = data[11]; // 公司标签
        String password = data[12]; //密码
        String wechatPublicNumber = data[13];//微信公众号
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //短信发送内容
        String message = "";
        if(msgType==0){
        	 message = "【"+autograph+"】尊敬的  "+userName+" 租户，您好！您的推荐补贴 "+money+" 元已入账至 "+address+" 账单余额，感谢您的信任与支持！";
        }
        if(msgType==1){
        	 message = "【"+autograph+"】尊敬的  "+userName+" 租户，您好！您的租房 "+address+" 本期实收 "+money+" 元已到账，感谢您的信任与支持！";
        }
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
        
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请您充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str = str+"###"+a+"###"+message+"###"+smsBalance;
        System.out.println("我需要的：："+str+"\n"+message);
        return str;
    }
    
  //续签合同签署短信发送
    public static String sendContractSms(String smsDate) throws IOException, URISyntaxException{
    	/**
    	 * mobile+"###"+uid+"###"+company+"###"+journalShortMessage.getSmId()+"###"+coId+
    	 * ###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password
    	 */
    	String[] data = smsDate.split("###");
    	System.out.println("smsDate" + smsDate);
    	//您要发送的手机号  
        String mobile = data[0];
        //发送的url
        String url = data[1];
        //租客名字
        String name = data[2];
        //公司名
        String co = data[3];
        //短信ID
        String sm_id = data[4];
        //自定义参数（公司ID）
        String extend = data[5];
        //用户公司的唯一标识
        String apikey = data[6];  // key公司序列号
        Double smsPrice = Double.parseDouble(data[7]); //  单价
		Double smsBalance = Double.parseDouble(data[8]); // 余额
		String autograph = data[9]; // 公司标签
        String password = data[10]; //密码
//      String wechatPublicNumber = data[11];//微信公众号
        String address = data[12]; //地址

        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //短信发送内容
        String message = "【"+autograph+"】"+"尊敬的 "+name+"客户，您好！我们已接到您"+address+"的续租申请，请点击链接在线签署:"+url;
    	
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
        
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请您充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str = str+"###"+a+"###"+message+"###"+smsBalance;
        System.out.println("我需要的：："+str+"\n"+message);
        return str;
    }
    
    //提醒类短信发送
    public static String sendReminderSms(String smsDate) throws IOException, URISyntaxException{
    	/**
    	 * mobile+"###"+uid+"###"+company+"###"+journalShortMessage.getSmId()+"###"+coId+
    	 * ###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password
    	 */
    	String[] data = smsDate.split("###");
    	//您要发送的手机号  
        String mobile = data[0];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = data[1];
        //公司名
        String co = data[2];
        //短信ID
        String sm_id = data[3];
        //自定义参数（公司ID）
        String extend = data[4];
        //用户公司的唯一标识
        String apikey = data[5];  // key公司序列号
        Double smsPrice = Double.parseDouble(data[6]); //  单价
		Double smsBalance = Double.parseDouble(data[7]); // 余额
		String autograph = data[8]; // 公司标签
        String password = data[9]; //密码
        String wechatPublicNumber = data[10];//微信公众号
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //短信发送内容
        String message = "【"+autograph+"】尊敬的客户，您可通过搜索微信公众号："+wechatPublicNumber+"或扫描租赁合同头部二维码，"
        		+ "添加我司公众号后点击底部“用户中心”即可操作：微信缴费、费用查询、自助报修等！首次登陆需输入身份证、手机号码进行验证。";
    	
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
        
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请您充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str = str+"###"+a+"###"+message+"###"+smsBalance;
        System.out.println("我需要的：："+str+"\n"+message);
        return str;
    }
    
    
    //房屋租金交租短信提醒(1)
    public static String payRentSms(String smsDate) throws IOException, URISyntaxException {
        //模板id
        long tpl_id = 1606888;
        /*************以上为固定值
         * name + "," + mobile + "," + money + ", " + houseAddress
				+ " ," + uid + "," + note + "," + time+","+company+","+journalShortMessage.getSmId()+","+coId+"###"+smsKey+"###"+smsPrice
				+"###"+smsBalance+"###"+autograph+"###"+password+"###"+variableParameter;
         * ****************/
        String[] data = smsDate.split("###");
        //租客、房东姓名
        String userName = data[0];
        //您要发送的手机号  
        String mobile = data[1];
        //租金
        Double money = Double.parseDouble(data[2]);
        //房屋地址
        String add = data[3];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = data[4];
        //备注
        String note = data[5];
        //交租时间
        String date = data[6];
        //公司名
        String co = data[7];
        //短信ID
        String sm_id = data[8];
        //自定义参数（公司ID）
        String extend = data[9];
        //用户公司的唯一标识
        String apikey = data[10];  // key公司序列号
        Double smsPrice = Double.parseDouble(data[11]); //  单价
		Double smsBalance = Double.parseDouble(data[12]); // 余额
		String autograph = data[13]; // 公司标签
        String password = data[14]; //密码
        Integer variableParameter;
        if("null".equals(data[16])){//临时账单标识
        	variableParameter = 0;
        }else{
        	variableParameter = Integer.parseInt(data[16]);
        }
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //短信发送内容
        String message = "";
        if(variableParameter == 1){
        	message = "【"+autograph+"】尊敬的 "+userName+" 客户，您好！您租赁的"+add+"，本次临时账单费用为"+money+"（包含："+note+"）"
            		+ "，付款日为"+date+"，请您按时缴纳，超时将产生相关费用，感谢支持。";
        }else{
        	message = "【"+autograph+"】尊敬的 "+userName+" 客户，您好！您租赁的"+add+"，本期总费用为"+money+"（包含："+note+"）"
            		+ "，交租日为"+date+"，请您按时缴纳，超时将产生相关费用，感谢支持。";
        }
        
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请您充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str = str+"###"+a+"###"+message+"###"+smsBalance;
        System.out.println("我需要的：："+str+"\n"+message);
        return str;
	}
    
    //合同到期提醒(1)
    public static String expirationOfContract(String smsDate) throws IOException{
        //模板id
        long tpl_id = 1606964;
        /*************以上为固定值
         * name+","+mobile+", "+houseAddress+" ,"+uid+","+time+","+serviceTelephone+","+companyAddress+","+money+","
         * 	+company+","+journalShortMessage.getSmId()+","+coId+"###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * ***************/
        String[] sms = smsDate.split("###");
        //用户名（租客、房东）
        String company = sms[0];
        //您要发送的手机号
        String mobile = sms[1];
        //房屋地址
        String add = sms[2];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = sms[3];
        //合同到期时间
        String date = sms[4];
        //客服电话
        String tel = sms[5];
        //公司名
        String co = sms[8];
        //短信id
        String sm_id = sms[9];
        //公司id
        String extend = sms[10];
        String apikey = sms[11];  // key公司序列号
		Double smsPrice = Double.parseDouble(sms[12]); //  单价
		Double smsBalance = Double.parseDouble(sms[13]); // 余额
        String autograph = sms[14]; // 公司标签
        String password = sms[15]; //密码
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //发送内容 
        String message = "【"+autograph+"】尊敬的 "+company+" 客户，您好！您租赁的"+add+"，本期合同将于"+date+"到期，续租详情请尽快联系客服，电话"+tel+"，谢谢配合！";        
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str +="###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    //合同过期续签提醒(1)
    public static String contractExpirationReminder(String smsDate)throws IOException{     
        //模板id
        long tpl_id = 12584; 
        /*************以上为固定值
         * name+","+mobile+", "+houseAddress+" ,"+uid+","+time+","+serviceTelephone+","+companyAddress+","+money+","
         * +company+","+journalShortMessage.getSmId()+","+coId+"###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * ****************/
        String[] sms = smsDate.split("###");
        //用户名（租客、房东）
        String company = sms[0];
        //您要发送的手机号
        String mobile = sms[1];
        //房屋地址
        String add = sms[2];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = sms[3];
        //客服电话
        String tel = sms[5];
        //公司地址
        String companyadd =sms[6];
        //公司名
        String co = sms[8];
        //短信ID
        String sm_id = sms[9];
        //公司ID
        String extend = sms[10];
        String apikey = sms[11];  // key公司序列号
		Double smsPrice = Double.parseDouble(sms[12]); //  单价
		Double smsBalance = Double.parseDouble(sms[13]); // 余额
        String autograph = sms[14]; // 公司标签
        String password = sms[15]; //密码
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //发送内容
        String message = "【"+autograph+"】尊敬的 "+company+" 客户，您好！您租赁的"+add+"，本期合同已结束，请尽快办理续签手续，地址："+companyadd+"，客服："+tel+"，感谢支持！";

      //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    //合同续签提醒短信(1)
    public static String contractRenewal(String smsDate) throws IOException{   
        //模板id
        long tpl_id = 1606972;
        /*************以上为固定值
         * name+","+mobile+", "+houseAddress+" ,"+uid+","+time+","+serviceTelephone+","+companyAddress+","+money+","+company+","+journalShortMessage.getSmId()+","
         * +coId+"###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * ****************/  
        String[] sms = smsDate.split("###");
        //用户名（租客、房东）
        String company = sms[0];
        //您要发送的手机号
        String mobile = sms[1];
        //房屋地址
        String add = sms[2];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = sms[3];
        //客服电话
        String tel = sms[5];
        //公司地址
        String companyadd =sms[6];
        //公司名
        String co = sms[8];
        //短信id
        String sm_id = sms[9];
        //公司ID
        String extend = sms[10];
        String apikey = sms[11];  // key用户序列号
		Double smsPrice = Double.parseDouble(sms[12]); //  单价
		Double smsBalance = Double.parseDouble(sms[13]); // 余额
        String autograph = sms[14]; // 公司标签
        String password = sms[15]; //密码
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //发送内容
        String message = "【"+autograph+"】尊敬的 "+company+" 客户，您好！您租赁的"+add+"，本期合同即将到期，请尽快办理续签手续，我司办公地址："+companyadd+"，客服："+tel+"，感谢支持！";

        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
    	}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    //合同到期不做出租(1)
    public static String doNotRent(String smsDate) throws IOException{
        //模板id
        long tpl_id = 1606974;
        /*************以上为固定值
         * name+","+mobile+", "+houseAddress+" ,"+uid+","+time+","+serviceTelephone+","+companyAddress+","+money+","+company+","+sm_id+","
         * +coId+"###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * *****************/
        String[] sms = smsDate.split("###");
        //用户名（租客、房东）
        String company = sms[0];
        //您要发送的手机号
        String mobile = sms[1];
        //房屋地址
        String add = sms[2];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = sms[3];
        //合同到期时间
        String date = sms[4];
        //公司名
        String co = sms[8];
        //短信ID
        String sm_id = sms[9];
        //公司ID
        String extend = sms[10];
        String apikey = sms[11];  // key
		Double smsPrice = Double.parseDouble(sms[12]); //  单价
		Double smsBalance = Double.parseDouble(sms[13]); // 余额
		String password = sms[15]; //密码
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        String autograph = sms[14]; // 公司标签
        
        //发送内容
        String message = "【"+autograph+"】尊敬的 "+company+" 客户，您好！您租赁的"+add+"，合同将于"+date+"期满，期满后我们公司暂不作出租安排，请您准时搬离并做退房手续！";

      //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    //续约确认短信(1)
    public static String renewConfirm(String smsDate) throws IOException{
        //模板id
        long tpl_id = 1606968;
        /*************以上为固定值
         *  name+","+mobile+", "+houseAddress+" ,"+uid+","+time+","+serviceTelephone+","+companyAddress+","+money+","+company+","+sm_id+","
         *  +coId+"###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * *****************/
        String[] sms = smsDate.split("###");
        //用户名（租客、房东）
        String company = sms[0];
        //您要发送的手机号
        String mobile = sms[1];
        //房屋地址
        String add = sms[2];
      //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = sms[3];
        //合同到期时间
        String date = sms[4];
        //租金
        Double money = Double.parseDouble(sms[7]);
        //公司名
        String co = sms[8];
        //短信ID
        String sm_id = sms[9];
        //公司ID
        String extend = sms[10];
        
        String apikey = sms[11];  // key
		Double smsPrice = Double.parseDouble(sms[12]); //  单价
		Double smsBalance = Double.parseDouble(sms[13]); // 余额
        String autograph = sms[14]; // 公司标签
        //密码
        String password = sms[15];
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //发送内容
        String message = "【"+autograph+"】尊敬的 "+company+" 客户，您好！您租赁的"+add+"，本期合同将于"+date+"到期，续签租金"+money+"，如确认以上续租信息，请务必回复“是”。谢谢！";

      //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    //未结清款项提醒(1)
    public static String uncleared(String smsDate) throws IOException{
        //模板id
        long tpl_id = 1606952;
        /*************以上为固定值
         * name+","+mobile+", "+houseAddress+" ,"+uid+","+money+","+note+","+time+","+company+","+sm_id+","+coId+"###"
         * +smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * *****************/
        String[] sms = smsDate.split("###");
        //用户名（租客、房东）
        String company = sms[0];
        //您要发送的手机号
        String mobile =  sms[1];
        //房屋地址
        String add =  sms[2];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid =  sms[3];
        //租金
        Double money =  Double.parseDouble(sms[4]);
        //备注
        String note =  sms[5];
        //公司名
        String co = sms[7];
        //短信ID
        String sm_id = sms[8];
        //公司id 
        String extend = sms[9];
        String apikey = sms[10];  // key
		Double smsPrice = Double.parseDouble(sms[11]); //  单价
		Double smsBalance = Double.parseDouble(sms[12]); // 余额
        String autograph = sms[13]; // 公司标签
        //密码
        String password = sms[14];
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //发送内容
        String message = "【"+autograph+"】尊敬的 "+company+" 客户，您好！您租赁的"+add+"，本期费用有"+money+"尚未结清（包含："+note+"），请及时缴纳，感谢支持。";
        
      //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    //欠款提醒(1)
    public static String arrearsReminder(String smsDate) throws IOException{     
        //模板id
        long tpl_id = 1606962;
        /*************以上为固定值
         * name+","+mobile+", "+houseAddress+" ,"+uid+","+money+","+note+","+time+","+company+","
         * +sm_id+","+coId+"###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * *****************/   
        String[] sms = smsDate.split("###");
        //用户名（租客、房东）
        String company = sms[0];
        //您要发送的手机号
        String mobile = sms[1];
        //房屋地址
        String add = sms[2];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = sms[3];
        //交款最后期限时间
        String date = sms[6];
        //公司名
        String co = sms[7];
        //短信ID
        String sm_id = sms[8];
        //公司ID
        String extend = sms[9];
        String apikey = sms[10];  // key
		Double smsPrice = Double.parseDouble(sms[11]); //  单价
		Double smsBalance = Double.parseDouble(sms[12]); // 余额
        String autograph = sms[13]; // 公司标签
        //密码
        String password = sms[14];
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //发送内容
        String message = "	【"+autograph+"】尊敬的 "+company+" 客户，您好！您租赁的"+add+"欠费已久，请在"+date+"前交清相关费用，超过将按合同条款进行收房处理！谢谢配合。";

      //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    //逾期将产生滞纳金(1)
    public static String overdueFines (String smsDate) throws IOException{
        //模板id
        long tpl_id = 1606958;
        /*************以上为固定值***
         * +"###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password
         * **************/ 
        String[] sms = smsDate.split("###");
        //用户名（租客、房东）
        String company = "";
        //您要发送的手机号
        String mobile = "";
        //房屋地址
        String add = "";
        //滞纳金
        Double money = 0.00;
        //截止时间
        String date = "";
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = "";
        String co = "";
        String sm_id = "";
        String extend = "";
        String apikey = sms[10];  // key
		Double smsPrice = Double.parseDouble(sms[11]); //  单价
		Double smsBalance = Double.parseDouble(sms[12]); // 余额
        String autograph = sms[13]; // 公司标签
        //密码
        String password = sms[14];
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";

        
        //发送内容
        String message = "【"+autograph+"】尊敬的 "+company+" 客户，您好！您租赁的"+add+"，本期欠费已产生滞纳金（每日1%），截止"+date+"共计欠款"+money+"。请及时缴纳！";           
        
      //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    //定金失效(1)
    public static String depositFailure (String smsDate) throws IOException{
        //模板id
        long tpl_id = 1610124;
        /*************以上为固定值
         * name+","+mobile+", "+houseAddress+" ,"+uid+","+time+","+company+","+journalShortMessage.getSmId()+","+coId
         * +"###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * *****************/
        String[] sms = smsDate.split("###");
        //用户名（租客、房东）
        String company = sms[0];
        //您要发送的手机号
        String mobile = sms[1];
        //房屋地址
        String add = sms[2];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = sms[3];
        //截止时间
        String date = sms[4];
        String co = sms[5];
        String sm_id = sms[6];
        String extend = sms[7];
        String apikey = sms[8];  // key
		Double smsPrice = Double.parseDouble(sms[9]); //  单价
		Double smsBalance = Double.parseDouble(sms[10]); // 余额
        String autograph = sms[11]; // 公司标签
        //密码
        String password = sms[12];
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //发送内容
        String message = "【"+autograph+"】尊敬的 "+company+" 客户，您好！您租赁的 "+add+" 物业，定金有效期到"+date+"。";
        
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
 
    //维修事务短信提醒(2)
    public static String repair (String smsDate) throws IOException{
        //模板id
        long tpl_id = 1639722;
        /*************以上为固定值
         * name+","+mobile+", "+houseAddress+" ,"+uid+","+time+","+company+","+journalShortMessage.getSmId()+","+coId
         * +"###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * *****************/
        String[] sms = smsDate.split("###");
        //您要发送的手机号
        String mobile = sms[0];
        //维修类型
        String evenType = sms[1];
        //楼盘名称
        String add = sms[2];
        //客户名
        String name = sms[3];
        //客户电话
        String tel = sms[4];
        //期望事时间
        String time = sms[5];
        //事件描述
        String describe = sms[6];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = sms[7];
        //公司名
        String co = sms[8];
        //短信ID
        String sm_id = sms[9];
        //公司ID
        String extend = sms[10];
        String apikey = sms[11];  // key
		Double smsPrice = Double.parseDouble(sms[12]); //  单价
		Double smsBalance = Double.parseDouble(sms[13]); // 余额
        String autograph = sms[14]; // 公司标签
        //密码
        String password = sms[15];
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+2);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //发送内容
        String message = "【"+autograph+"】您有一个新的"+evenType+"需要处理："+describe+"，期望处理时间："+time+"。地址："+add+"，客户名："+name+"，电话："+tel+"。";
           
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    private static String getRadom(int length){
    	//获取一个随机数
    	double rand = Math.random();
    	//将随机数转换为字符串
    	String str = String.valueOf(rand).replace("0.", "");
    	//截取字符串
    	String newStr = str.substring(0, length);
    	return newStr;
    }
    
    //发送门锁密码
    public static String sendLockPassword (String smsDate) throws IOException{
      
    	System.out.println("Api "+ smsDate);
    	
        String[] sms = smsDate.split("###");
        //您要发送的手机号
        String mobile = sms[0];
        //锁的密码
        String lockPassword = sms[1];
        //楼盘名称
        String add = sms[2];
        //公司名
        String co = sms[3];
        //短信ID
        String sm_id = getRadom(11);
        //公司ID
        String extend = sms[4];
        String apikey = sms[5];  // key
		Double smsPrice = Double.parseDouble(sms[6]); //  单价
		Double smsBalance = Double.parseDouble(sms[7]); // 余额
        String autograph = sms[8]; // 公司标签
        //密码
        String password = sms[9];
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+2);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //发送内容
        String message = "【"+autograph+"】"+add+"，本次授权码为"+lockPassword+"，60分钟内有效，请扫描门锁周边二维码开门";
           
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    //这里是自主看房的短信
    public static String roomMessage(String smsDate){
		//System.out.println("smsDate: "+smsDate);
    	//hz###单志虎###13177776161###田贝花园E座16D###35980681###18287###1###8SDK-EMY-6699-SERRP###0.05###579.4###华兆资产###626009###hz4000616414
		String[] sms = smsDate.split("###");
		//电话
		String mobile = sms[2];
		//公司名
		String companyName = sms[10];
		//地址
		String houseAddress = sms[3];
		//开锁密码
		String roomPassword = sms[4];
		//
		String name = sms[1];
		//
		Double smsPrice = Double.parseDouble(sms[8]); //  单价
		Double smsBalance = Double.parseDouble(sms[9]); // 余额
		String apiKey = sms[7];
		String password = sms[11];
		//附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
		
        String coid = sms[6];
        String sm_id = sms[5];
        long seqid = Long.parseLong(repairDefault(coid, sm_id)+2);
		
		String message ="【"+companyName+"】"+houseAddress+"本次看房:"+roomPassword+".祝您看房愉快。";
		
		//实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			/* params.put("cdkey", cdkey);      用户序列号
			params.put("password", password); 	用户密码
			params.put("phone", phone); 		手机号码
			params.put("message" , message); 	短信内容
			params.put("addserial" , addserial); 	加号（最长10位，可置空）。
			params.put("seqid" , ""+seqid); 	长整型值企业内部必须保持唯一，获取状态报告使用
			params.put("smspriority" , smspriority); 	短信优先级1-5			*/
			String temp = demo(apiKey,password,mobile,message,addserial,seqid,smspriority);
			//System.out.println("temp:"+temp);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
		
		str += "###"+a+"###"+message+"###"+smsBalance;
        //System.out.println(str+"\n"+message);
    	return str;
		//return "";
    }
    
	//事务审批短信提醒(2)
    public static String evenApproval(String smsDate) throws IOException{
        //模板id
        long tpl_id = 1643648;
        /*************以上为固定值****************/
        /**
         * data = mobile+", "+evenType+" ,"+repairDescribe+" ,"+houseAddress+" ,"+houseType+","+smMoney+" ,"+uid+","
         * +company+","+journalShortMessage.getSmId()+","+coId+"###"
         * +smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         */
		
        String[] sms = smsDate.split("###");
        //您要发送的手机号
        String mobile = sms[0];
        //维修类型
        String evenType = sms[1];
        //事件描述
        String describe = sms[2];
        if(describe.length() > 100){
        	describe = describe.substring(0, 100);
        }
        //地址
        String houseAddress = sms[3];
        //地址类型
        String houseType = sms[4];
        //涉及金额
        String smMoney = sms[5];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = sms[6];
        String co = sms[7];
        String sm_id = sms[8];
        //发送内容
        String message = "";
        String extend = sms[9];       
        String handleStatus = sms[10];
        String handleOpinion = sms[11];
        String apikey = sms[12];  // key
		Double smsPrice = Double.parseDouble(sms[13]); //  单价
		Double smsBalance = Double.parseDouble(sms[14]); // 余额
        String autograph = sms[15]; // 公司标签
        //密码
        String password = sms[16];
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+2);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
   	
        if(handleStatus.equals("已完成")){
        	message = "【"+autograph+"】您有一个"+evenType+"事务，已经处理完成。处理意见："+handleOpinion+"。";
        }else{
        	message = "【"+autograph+"】您有一个新的"+evenType+"需要处理："+describe+"。地址："+houseAddress+"，类型："+houseType+"，金额："+smMoney+"。";
        }
        
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
        //短信发送
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
    	return str;
    }
    
    //房东账单短信提醒(1)
    public static String payableToLandlord(String smsDate) throws IOException, URISyntaxException {
        //模板id
        long tpl_id = 1648716;
        /*************以上为固定值
         * mobile + "###" + houseAddress + "###" + money + "###" + bankName + "###" + bankNum+
         *  "###" + name + "###" + uid+"###"+company+"###"+journalShortMessage.getSmId()+"###"+coId+
         *  "###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * ****************/
        String[] data = smsDate.split("###");
        //您要发送的手机号  
        String mobile = data[0];
        //物业
        String add = data[1];
        //租金
        Double money = Double.parseDouble(data[2]);
        //银行名称
        String bankName = data[3];
        //银行账号
        String bankNum = data[4];
        //收款人
        String name = data[5];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = data[6];
        //公司名
        String co = data[7];
        String sm_id = data[8];
        //自定义参数
        String extend = data[9];
        
        String apikey = data[10];  // key
		Double smsPrice = Double.parseDouble(data[11]); //  单价
		Double smsBalance = Double.parseDouble(data[12]); // 余额
        String autograph = data[13]; // 公司标签
        //密码
        String password = data[14];
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
             
        //发送的内容 , 如：【房至尊】亲爱的#name#，您的#card#于#time#消费#money#，感谢支持
        String message = "【"+autograph+"】尊敬的业主您好！您："+add+"，本月租金"+money+"，已提交到您"+bankName+"账户"+bankNum+"，收款人"+name+"，请注意查收！";
        
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str = str+"###"+a+"###"+message+"###"+smsBalance;
        System.out.println("我需要的：："+str+"\n"+message);
        return str;
	}
    
    //房东免租期账单短信提醒(1)
    public static String landlordFreePeriod(String smsDate) throws IOException, URISyntaxException {
        //模板id
        long tpl_id = 1648716;
        /*************以上为固定值
         * mobile + "###" + houseAddress + "###"+ uid + "###" + company+"###"+journalShortMessage.getSmId()+"###"+coId
         * +"###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         * ****************/
        String[] data = smsDate.split("###");
        //您要发送的手机号  
        String mobile = data[0];
        //物业
        String add = data[1];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = data[2];
        //公司名
        String co = data[3];
        String sm_id = data[4];
        //自定义参数
        String extend = data[5];
        String apikey = data[6];  // key
		Double smsPrice = Double.parseDouble(data[7]); //  单价
		Double smsBalance = Double.parseDouble(data[8]); // 余额    
        String autograph = data[9]; // 公司标签
        //密码
        String password = data[10];
        
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+1);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        
        //发送的内容 , 如：【房至尊】亲爱的#name#，您的#card#于#time#消费#money#，感谢支持
        String message = "【"+autograph+"】尊敬的业主您好！您："+add+"，本月为免租期。感谢您对我们的大力支持。";
        
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
		int b = (num-70)%67;
		if(b > 0){
			a+=1;
		}
		
		//实际条数*单价=本次发送价格
		Double product = a * smsPrice;
		smsBalance = smsBalance - product; //扣除后的余额
		
		String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
		if(smsBalance > 0){
			String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
			String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
			str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
		}
        str = str+"###"+a+"###"+message+"###"+smsBalance;
        System.out.println("我需要的：："+str+"\n"+message);
        return str;
	}
    /**
	 * 即时短信发送数据设置
	 * @return
	 */
	private static String demo(String cdkey, String password, String phone, String message, String addserial, long seqid, String smspriority){
		Map<String, String> params = new HashMap<String, String>();
		params.put("cdkey", cdkey); //用户序列号
		params.put("password", password); //用户密码
		params.put("phone", phone); //手机号码
		params.put("message" , message); //短信内容
		params.put("addserial" , addserial); //附加号（最长10位，可置空）。
		params.put("seqid" , ""+seqid); //长整型值企业内部必须保持唯一，获取状态报告使用
		params.put("smspriority" , smspriority); //短信优先级1-5
		
		String str = post(Instant_SMS_URL, params);
		System.out.print("返回值："+str);
		return str;
	}
	
	/**
	 * post请求
	 * @param url
	 * @param paramsMap
	 * @return
	 */
	private static String post(String url, Map<String, String> paramsMap) {
	      CloseableHttpClient client = HttpClients.createDefault();
	      String responseText = "";
	      CloseableHttpResponse response = null;
	      try {
	          HttpPost method = new HttpPost(url);
	          if (paramsMap != null) {
	              List<NameValuePair> paramList = new ArrayList<NameValuePair>();
	              for (Map.Entry<String, String> param : paramsMap.entrySet()) {
	                  NameValuePair pair = new BasicNameValuePair(param.getKey(), param.getValue());
	                  //System.out.println("---："+pair);
	                  paramList.add(pair);
	              }
	              method.setEntity(new UrlEncodedFormEntity(paramList, ENCODING));
	          }
	          response = client.execute(method);
	          //System.out.println("打印："+response);
	          HttpEntity entity = response.getEntity();
	          if (entity != null) {
	              responseText = EntityUtils.toString(entity);
	              char a = '<';
	              char b = '>';
	              int num1 = count(responseText, a)[0];
	              int num2 = count(responseText, b)[count(responseText, b).length-1]+1;
	              responseText = responseText.substring(num1, num2);
	          }
	          //System.out.println("我要的东西 ："+responseText);
	      } catch (Exception e) {
	          e.printStackTrace();Syslog.writeErr(e);
	      } finally {
	          try {
	              response.close();
	          } catch (Exception e) {
	              e.printStackTrace();
                  Syslog.writeErr(e);
	          }
	      }
	   return responseText;
	}
	
	/**
	 * 计算某个字符在字符串出现的位置
	 * @param str
	 * @param key
	 * @return
	 */
	private static int[] count(String str, char key) {
		int[] count = {};
		for (int i = 0; i < str.length(); i++) {
			char c = str.charAt(i);
			if (c == key) {
				// 扩展数组,
				count = Arrays.copyOf(count, count.length + 1);
				// 添加序号 i
				count[count.length - 1] = i;
			}
		}
		return count;
	}
	
	/**
	 * 补充缺省值
	 * @param str1
	 * @param str2
	 * @return
	 */
	private static String repairDefault(String str1, String str2){
		int temp1 = 5; //公司ID长度为5位
		int temp2 = 11; //短信ID长度为 6 位
		String datastr1 = str1;
		String datastr2 = str2;
		int length1 = datastr1.length();
		int length2 = datastr2.length();		
		for(int i = 0; i < (temp1 - length1); ++i){
			datastr1 = "0"+ datastr1;
			System.out.println("----:  "+datastr1);
		}		
		for(int k = 0; k < (temp2 - length2); ++k){
			datastr2 = "0" + datastr2;
			System.out.println("----:  "+datastr2);
		}		
		String sumStr = "1" + datastr1 + datastr2;		
		return sumStr;
	}
	
	//
    public static String goToDoorPsw(String smsDate) throws IOException{
        //模板id
        long tpl_id = 1643648;
        /*************以上为固定值****************/
        /**
         * data = mobile+", "+houseAddress+" ,"+doorPsw+","+uid+","
         * +company+","+journalShortMessage.getSmId()+","+coId+"###"
         * +smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph+"###"+password;
         */
        
        String[] sms = smsDate.split("###");
        //您要发送的手机号
        String mobile = sms[0];
        System.out.println("手机号码："+mobile);
        //地址
        String houseAddress = sms[1];
        //带看密码
        String doorPsw = sms[2];
        //该条短信在您业务系统内的ID，比如订单号或者短信发送记录的流水号
        String uid = sms[3];
        String co = sms[4];
        String sm_id = sms[5];
        String extend = sms[6];
        String apikey = sms[7];  // key
        Double smsPrice = Double.parseDouble(sms[8]); //  单价
        Double smsBalance = Double.parseDouble(sms[9]); // 余额
        String autograph = sms[10]; // 公司标签
        //密码
        String password = sms[11];
        //发送内容
        String message = "【"+autograph+"】"+houseAddress+" 带看密码： "+doorPsw;
        //有19位数（第一位 1 为补充值 ，1后面 5位是公司ID，在后面 11 位是短信ID， 即：1 00024 00000023564 ）
        long seqid = Long.parseLong(repairDefault(extend, sm_id)+2);
        //附加号（最长10位，未用置空）。
        String addserial = "";
        //短信优先级1-5
        String smspriority = "";
        //实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
        int b = (num-70)%67;
        if(b > 0){
            a+=1;
        }
        //实际条数*单价=本次发送价格
        Double product = a * smsPrice;
        smsBalance = smsBalance - product; //扣除后的余额
        
        //短信发送
        String str = "{'code':9999,'msg':'请求参数格式错误','detail':'账户余额不足，请你充值！！'}";
        if(smsBalance > 0){
            String temp = demo(apikey, password, mobile, message, addserial, seqid, smspriority);
            String[] xmlData = DocXmlAnalysis.xmlElements(temp).split("###");
            str = "{'code':"+xmlData[0]+",'msg':'"+xmlData[1]+"'}";
        }
        str += "###"+a+"###"+message+"###"+smsBalance;
        System.out.println(str+"\n"+message);
        return str;
    }
	
}
