package com.zz.service.sys;

import java.util.ArrayList;
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
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.github.wxpay.sdk.WXPayUtil;
import com.zz.actions.commons.ShieldingWords;
import com.zz.mapper.journal.JournalShortMessageAdministrativeMapper;
import com.zz.mapper.journal.JournalShortMessageMapper;
import com.zz.mapper.sys.SysSystemSettingMapper;
import com.zz.po.commons.Result;
import com.zz.po.journal.JournalShortMessage;
import com.zz.po.journal.JournalShortMessageAdministrative;
import com.zz.po.sys.SysSystemSetting;
import com.zz.util.SessionUtil;

public class SendShortMessageServiceImpl implements SendShortMessageService{
	@Autowired
	private SysSystemSettingMapper sysSystemSettingMapper;
	@Autowired
	private JournalShortMessageMapper journalShortMessageMapper;
	@Autowired
	private JournalShortMessageAdministrativeMapper journalShortMessageAdministrativeMapper;
	
	//编码格式。发送编码格式统一用UTF-8
	private static final String ENCODING = "UTF-8";
	
	private static final String Instant_SMS_URL = "http://hprpt2.eucp.b2m.cn:8080/sdkproxy/sendsms.action"; //发送即时短信的Http接口

	
	/**
	 * 发送短信的统一服务接口
	 * 调用此接口前必须自己判断是内部短信还是外部短信 并新增一条记录到数据库 然后把该记录id传进来
	 * @param phone 为短信接受人的手机号码
	 * @param message 为发送的短信内容
	 * @param seqid 为短信识别号
	 * @return 返回 num 发送短信数量  resultXmlStr 发送短信回来的值
	 * @throws Exception
	 */
	@Override
	public Result<String> sendMessage(String phone, String message,long seqid) throws Exception {
		ShieldingWords sw = new ShieldingWords();
		
		//获取短信key、单价、余额
		JSONObject keydata = smsInformation();
		
        //电话
  		String mobile = phone;
  		
  		Double smsPrice = Double.parseDouble(keydata.getString("smsPrice")); //  单价
  		Double smsBalance = Double.parseDouble(keydata.getString("smsBalance")); // 余额
  		String apiKey = keydata.getString("smsKey");
  		String password = keydata.getString("password");
  		//附加号（最长10位，未用置空）。
		String addserial = "";
		//短信优先级1-5
		String smspriority = "";
		
  		//查找屏蔽词，替换
		message = sw.matchedMaskWord(message);
		message = "【" +keydata.getString("autograph")+ "】" + message;
		
  		
  		//实际的发送条数
        int num = message.length();
        int a = (num-70)/67+1;
  		int b = (num-70)%67;
  		if(b > 0){
  			a+=1;
  		}
  		num = a;
  		//实际条数*单价=本次发送价格
  		Double product = a * smsPrice;
  		smsBalance = smsBalance - product; //扣除后的余额
  		if(smsBalance > 0){
  			/* params.put("cdkey", cdkey);      用户序列号
  			params.put("password", password); 	用户密码
  			params.put("phone", phone); 		手机号码
  			params.put("message" , message); 	短信内容
  			params.put("addserial" , addserial); 	加号（最长10位，可置空）。
  			params.put("seqid" , ""+seqid); 	长整型值企业内部必须保持唯一，获取状态报告使用
  			params.put("smspriority" , smspriority); 	短信优先级1-5			*/
  			System.out.println("发送前的数据，apiKey=" + apiKey + " password=" + password + " mobile="+mobile
					+" message=" + message +" addserial="+addserial +" seqid="+seqid +" smspriority="+smspriority);
  			String resultXmlStr = send(apiKey,password,mobile,message,addserial,seqid,smspriority);
  			Map<String,String> resultMap = WXPayUtil.xmlToMap(resultXmlStr);
  			
  			JSONObject obj = new JSONObject();
			obj.put("num", num);
			obj.put("resultXmlStr", resultXmlStr);
			
  			if("0".equals(resultMap.get("error"))){
  				return new Result<>(1,"发送成功",obj.toString());
  			}else if("-9013".equals(resultMap.get("error"))){
  				return new Result<>(-3,"手机号码格式不对",obj.toString());
  			}else{
  				return new Result<>(-2,resultMap.get("message"),obj.toString());
  			}
  		}else{
  			return new Result<>(-1,"发送失败，余额不足",null);
  		}
	}
	
	 /**
	 * 即时短信发送数据设置
	 * @return
	 */
	private String send(String cdkey, String password, String phone, String message, String addserial, long seqid, String smspriority){
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
	private String post(String url, Map<String, String> paramsMap) {
	      CloseableHttpClient client = HttpClients.createDefault();
	      String responseText = "";
	      CloseableHttpResponse response = null;
	      try {
	          HttpPost method = new HttpPost(url);
	          if (paramsMap != null) {
	              List<NameValuePair> paramList = new ArrayList<NameValuePair>();
	              for (Map.Entry<String, String> param : paramsMap.entrySet()) {
	                  NameValuePair pair = new BasicNameValuePair(param.getKey(), param.getValue());
	                  paramList.add(pair);
	              }
	              method.setEntity(new UrlEncodedFormEntity(paramList, ENCODING));
	          }
	          response = client.execute(method);
	          HttpEntity entity = response.getEntity();
			  System.out.println("00000000000"+entity);
	          if (entity != null) {
	              responseText = EntityUtils.toString(entity);
	              System.out.println("发送短信后回来的数据" + responseText);
	          }
	      } catch (Exception e) {
	          e.printStackTrace();
			  Syslog.writeErr(e);
	      } finally {
	          try {
	              response.close();
	          } catch (Exception e) {
	              e.printStackTrace();Syslog.writeErr(e);
	          }
	      }
	   return responseText;
	}

	/**
	  * 获取短信key( 用户序列号、密码 )、单价、余额
	  * @return
	  * @throws Exception
	  */
	 private JSONObject smsInformation() throws Exception{
		 SysSystemSetting sst = sysSystemSettingMapper.selectByPrimaryKey(1);
		 String smsKey = sst.getSsitShortMessageInterface();
		 String password = sst.getSsitPassword();
		 Double smsPrice = sst.getSsitSmsUnitPrice();
		 Double smsBalance = sst.getSsitSmsAccountBalance();
		 String autograph = sst.getSsitIdentification();
		 String wechatPublicNumber = sst.getSsitWechatPublicNumber();
		 JSONObject obj = new JSONObject();
		 obj.put("smsKey", smsKey);
		 obj.put("password", password);
		 obj.put("smsPrice", smsPrice);
		 obj.put("smsBalance", smsBalance);
		 obj.put("autograph", autograph);
		 obj.put("wechatPublicNumber", wechatPublicNumber);
		 return obj;
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
		}
		for(int k = 0; k < (temp2 - length2); ++k){
			datastr2 = "0" + datastr2;
		}
		String sumStr = "1" + datastr1 + datastr2;		
		return sumStr;
	}

	@Override
	public Result<String> sendMessage(String phone, String message,
			Object object, Integer inOutType) throws Exception {
		Result<String> result;
		String coId = SessionUtil.getSession("coId");
		if(inOutType==1){//内部短信
			JournalShortMessageAdministrative inSide = (JournalShortMessageAdministrative) object;
			journalShortMessageAdministrativeMapper.insertSelective(inSide);
			long seqid = Long.parseLong(repairDefault(coId, inSide.getSmId().toString())+2);
			result = sendMessage(phone, message, seqid);
			if(result.getCode()==1){
				JSONObject obj = JSON.parseObject(result.getBody());
				inSide.setSmState("推送成功");
				inSide.setSmCount(obj.getInteger("num"));
				inSide.setSmField(obj.getString("resultXmlStr"));
				journalShortMessageAdministrativeMapper.updateByPrimaryKeySelective(inSide);
				updateMessageBalance(obj.getInteger("num"));
			}else if(result.getCode()==-1){
				throw new Exception(result.getMsg());
			}else{
				JSONObject obj = JSON.parseObject(result.getBody());
				inSide.setSmState("推送失败");
				inSide.setSmCount(obj.getInteger("num"));
				inSide.setSmField(obj.getString("resultXmlStr"));
				journalShortMessageAdministrativeMapper.updateByPrimaryKeySelective(inSide);
			}
		}else{
			System.out.println("发出外部短信内容为"+message);
			JournalShortMessage outSide = (JournalShortMessage) object;
			journalShortMessageMapper.insertSelective(outSide);
			long seqid = Long.parseLong(repairDefault(coId, outSide.getSmId().toString())+1);
			result = sendMessage(phone, message, seqid);
			if(result.getCode()==1){
				JSONObject obj = JSON.parseObject(result.getBody());
				outSide.setSmState("推送成功");
				outSide.setSmCount(obj.getInteger("num"));
				outSide.setSmField(obj.getString("resultXmlStr"));
				journalShortMessageMapper.updateByPrimaryKeySelective(outSide);
				updateMessageBalance(obj.getInteger("num"));
			}else if(result.getCode()==-1){ 
				throw new Exception(result.getMsg());
			}else{
				JSONObject obj = JSON.parseObject(result.getBody());
				outSide.setSmState("推送失败");
				outSide.setSmCount(obj.getInteger("num"));
				outSide.setSmField(obj.getString("resultXmlStr"));
				journalShortMessageMapper.updateByPrimaryKeySelective(outSide);
			}
		}
		return result;
	}
	
	/**
	 * 修改公司短信余额
	 * @param messageNum
	 * @throws Exception 
	 */
	private void updateMessageBalance(Integer messageNum) throws Exception{
		SysSystemSetting sstResult = sysSystemSettingMapper.selectByPrimaryKey(1);
		Double messageMoney = messageNum * sstResult.getSsitSmsUnitPrice();
		Double balance = messageMoney + sstResult.getSsitSmsAccountBalance();
		
		SysSystemSetting sst = new SysSystemSetting();
		sst.setSsitId(1);
		sst.setSsitSmsAccountBalance(balance);
		int result3 = sysSystemSettingMapper.updateByPrimaryKeySelective(sst);
	}
}
