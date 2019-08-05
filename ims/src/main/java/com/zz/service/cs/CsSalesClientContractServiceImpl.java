package com.zz.service.cs;

import com.zz.actions.commons.HttpRequestUtil;
import com.zz.mapper.cs.CsOutsideCustomerMapper;
import com.zz.mapper.cs.CsSalesClientContractMapper;
import com.zz.mapper.info.InfoPopulationMapper;
import com.zz.mapper.journal.JournalAttachmentMapper;
import com.zz.mapper.journal.JournalContractDatabaseMapper;
import com.zz.mapper.sys.SysVariablesMapper;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.cs.CsOutsideCustomer;
import com.zz.po.cs.CsOutsideCustomerExpansion;
import com.zz.po.cs.CsSalesClientContract;
import com.zz.po.journal.JournalAttachment;
import com.zz.po.sys.SysVariables;
import com.zz.statistics.DButil1;
import com.zz.util.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.*;

public class CsSalesClientContractServiceImpl implements CsSalesClientContractService {
	String private_key = ZqsignManage.Key.PRIVATE_KEY;
	String zqid = ZqsignManage.Zqid.ZQID;
	EncryptData ed = new EncryptData();
	@Autowired
	private CsSalesClientContractMapper csSalesClientContractMapper;
	private JournalAttachmentMapper journalAttachmentMapper;
	private InfoPopulationMapper infoPopulationMapper;
	private SysVariablesMapper sysVariablesMapper;
	private CsOutsideCustomerMapper csOutsideCustomerMapper;
	private JournalContractDatabaseMapper journalContractDatabaseMapper;
	public void setJournalContractDatabaseMapper(JournalContractDatabaseMapper journalContractDatabaseMapper) {
		this.journalContractDatabaseMapper = journalContractDatabaseMapper;
	}
	public void setCsOutsideCustomerMapper(CsOutsideCustomerMapper csOutsideCustomerMapper) {
		this.csOutsideCustomerMapper = csOutsideCustomerMapper;
	}
	public void setSysVariablesMapper(SysVariablesMapper sysVariablesMapper) {
		this.sysVariablesMapper = sysVariablesMapper;
	}
	public void setJournalAttachmentMapper(JournalAttachmentMapper journalAttachmentMapper) {
		this.journalAttachmentMapper = journalAttachmentMapper;
	}
	public void setInfoPopulationMapper(InfoPopulationMapper infoPopulationMapper) {
		this.infoPopulationMapper = infoPopulationMapper;
	}
	@Override
	public int insertCsSalesClientContract(CsSalesClientContract record) throws Exception {
		String att = record.getAtt();
		String path = null;
        String num = null;
        if(att != null){
            JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
            if(attachment != null){
                path = attachment.getPath();
                num = attachment.getNum();
                int result6 = journalAttachmentMapper.deleteByAtt(att);
                if(result6 == 0){
                    throw new Exception("从附件表删除记录失败");
                }
            }
        }
		System.out.println("CsContractNo"+record.getCsContractNo());
        record.setCsImgPath(path);
        record.setCsImgNum(num);
		int i = csSalesClientContractMapper.insertSelective(record);
		if(i>0){

		}
		return i;
	}

	
	@Override
	public String dealWithSign(CsOutsideCustomerExpansion jece) throws Exception {
		//查询这人有没有申请过数字签名2
		int result0 = selectInfoPopulation1(jece);
		//int result0 = 1;
		int result1 = -1;
		if(result0 == 0){
			System.out.println("这人没有userCode");
			//注册个人签名
			result1 = regPerson(jece);
			if(result1 == 1){
				System.out.println("注册个人签名成功");
			}else{
				System.out.println("注册个人签名失败");
			}
		}else if(result0 == 1){
			System.out.println("这人有userCode");
			result1 = 1;
		}
		//使用UUID创建合同编号
			jece.setCsContractNo(UUIDUtil.createUUID());
			System.out.println("生成的合同编号： "+jece.getCsContractNo());
			//创建合同
			String[] result2 = createContract(jece);
			System.out.println("eee");
			String templateFillValue = result2[1];
			String tNo = result2[2];
			if("1".equals(result2[0])){
				System.out.println("创建合同成功");
			}else{
				System.out.println("创建合同失败");
			}
			
				jece.setCsContractTemplateNumber(tNo);//设置合同编号
				jece.setCsTemplateFillValue(templateFillValue);
				jece.setCsStatus("未使用");
				
				int result3 = insertJourElectronicContractTem(jece);
				System.out.println("插入后的id "+jece.getCsContractId());
				if(result3 == 1){
					System.out.println("插入电子合同临时表成功");
				}else{
					throw new Exception("插入电子合同临时表失败");
				}
				int result4 = signAuto(jece);
				if(result4 == 1){
					System.out.println("后台自动签署公寓方成功");
				}
				
				if(result1 == 1 && "1".equals(result2[0]) && result3 == 1){
					String url = createUrl(jece);
					return url;
				}else{
					return "-1";
				}
	}
	/**
	 * 创建短信签署url 更新到数据库
	 * @param //ectId
	 * @return
	 * @throws Exception 
	 */
	private String createUrl(CsOutsideCustomerExpansion jece) throws Exception{
		String company = SessionUtil.getSession("company");
		String url = ZqsignManage.Url.BASE_URL + "signShowTwo.action?co="+company+"&csContractId="+jece.getCsContractId();
		System.out.println(url);
		url = getShortUrl(url);
		System.out.println(url);
		
		jece.setCsSignUrl(url);
		csSalesClientContractMapper.updateCsSalesClientContract(jece);
		
		return url;
	}
	/**
	 * 生成短连接
	 * @param url_long
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	private String getShortUrl(String url_long) throws UnsupportedEncodingException {
		@SuppressWarnings("rawtypes")
		Map paramsMap = new HashMap();
		String url_head = "http://api.t.sina.com.cn/short_url/shorten.json?source=1386187158&url_long=";
		String url_encode = java.net.URLEncoder.encode(url_long,"utf-8");
		String url = url_head + url_encode;
		@SuppressWarnings("unchecked")
		String result = HttpRequestUtil.get(url, paramsMap);
		JSONArray jobjArray = JSONArray.fromObject(result);
		JSONObject jobj = jobjArray.getJSONObject(0);
		String url_short = jobj.getString("url_short");
		return url_short;
	}
	/**
	 * 后台自动给公寓方签署 
	 * @param
	 * @return 1代表成功
	 * @throws Exception
	 */
	private int signAuto(CsOutsideCustomerExpansion jece) throws Exception{
		String request_url = ZqsignManage.Url.REQUEST_URL + "signAuto";
		
		String companyUserCode = getCompanyUserCode(jece)[0];
		System.out.println("companyUserCode"+companyUserCode);
		Map<String, String> map = new HashMap<String, String>();
		
		map.put("zqid",zqid);//商户的zqid,该值需要与private_key对应
		map.put("no", jece.getCsContractNo());//已存在的合同编号
		map.put("signers", companyUserCode);//签署人user_code
		

	    String sign_val = ed.encrptData(map,private_key);

		map.put("sign_val", sign_val); //请求参数的签名值
		System.out.println("后台自动签署map的数据" + map);
		String response_str = HttpRequest.sendPost(request_url, map);//向服务端发送请求，并接收请求结果
		JSONObject obj = JSONObject.fromObject(response_str);
		String code = obj.getString("code");
		String msg = obj.getString("msg");
		if("0".equals(code)){
			return 1;
		}else{
			throw new Exception(msg);
		}
	}
	/*
	 * 插入数据到电子合同临时表
	 * 返回1成功 返回-1失败
	 * */
	private int insertJourElectronicContractTem(CsOutsideCustomerExpansion jece) throws Exception{
		int result = csSalesClientContractMapper.insertSelective(jece);
		if(result == 1){
			return 1;
		}else{
			return -1;
		}
	}
	/*
	 * 查询销售外部顾客表表，看是否有user_code 由此判断是否申请过数字签名
	 * 返回结果 ：   0代表没有userCode 1代表有user_code的值 
	 * */
	private int selectInfoPopulation1(CsOutsideCustomerExpansion jece){
		CsOutsideCustomer csOutsideCustomer = new CsOutsideCustomer();
		csOutsideCustomer.setCocId(jece.getCsCocId());
		List<CsOutsideCustomer> list = new ArrayList<>();
		try {
			list = csOutsideCustomerMapper.selectByPrimaryKey(csOutsideCustomer.getCocId());
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
		}
		
		if(list.size() == 0){
			return 0;
		}else if(list.get(0).getCocUserCode()==null || "".equals(list.get(0).getCocUserCode())){
			return 0;
		}else{
			return 1;
		}
	}
	private int regPerson(CsOutsideCustomerExpansion jece) throws Exception{
		System.out.println("333");
		String request_url = null;
		//签署
		request_url = ZqsignManage.Url.REQUEST_URL + "personReg";
		Map<String,String> map = new HashMap<String,String>();

		map.put("zqid", zqid);//商户的zqid,该值需要与private_key对应
	    map.put("user_code", jece.getCsUserCode());//用户唯一标示，该值不能重复
	    map.put("name", jece.getCsName());//平台方用户姓名
	    map.put("id_card_no", jece.getCsIdCardNo());//身份证号
	    map.put("mobile", jece.getCsTelphone());//联系电话（手机号码）

	    String sign_val = ed.encrptData(map,private_key);

		map.put("sign_val", sign_val); //请求参数的签名值
		System.out.println("个人签名注册:"+map);
		System.out.println("request_url"+request_url);
		String response_str = HttpRequest.sendPost(request_url, map);//向服务端发送请求，并接收请求结果
		System.out.println("注册个人签名请求结果：" + response_str);//输出服务器响应结果
		JSONObject obj = JSONObject.fromObject(response_str);
		System.out.println(obj);
		String code = obj.getString("code");
		String msg = obj.getString("msg");
		System.out.println("code:"+code);
		if("0".equals(code)){
			return 1;
		}else if("120000".equals(code)){
			//usercode 已经存在 修改数据库usercode
			updateUserCode(jece);
			return 1;
		}else{
			throw new Exception(msg);
		}
	}
	/**
	 * 修改该商超外部客户表的uerCode
	 * @param
	 * @return
	 * @throws Exception 
	 */
	private int updateUserCode(CsOutsideCustomerExpansion jece) throws Exception{
//		InfoPopulation infoPopulation = new InfoPopulation();
//		infoPopulation.setPopCocId(jece.getCsCocId());
//		List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(infoPopulation);
		CsOutsideCustomer csOutsideCustomer = new CsOutsideCustomer();
		csOutsideCustomer.setCocId(jece.getCsCocId());
		List<CsOutsideCustomer> list = csOutsideCustomerMapper.selectByPrimaryKey(csOutsideCustomer.getCocId());
		CsOutsideCustomer csOutsideCustomer2 = list.get(0);
		System.out.println(csOutsideCustomer2.getCocId());
		System.out.println(jece.getUser_code());
		if(jece.getUser_code() != null){
			csOutsideCustomer2.setCocUserCode(jece.getUser_code());
		}else{
			csOutsideCustomer2.setCocUserCode(jece.getCsUserCode());
		}
		
		int result = csOutsideCustomerMapper.updateByPrimaryKeySelective(csOutsideCustomer2);
		System.out.println("result:"+result);
		if(result != 1){
			throw new Exception("修改该销售客户的uercode出错了");
		}
		return 1;
	}
	private String[] createContract(CsOutsideCustomerExpansion jece) throws Exception{
		String request_url = ZqsignManage.Url.REQUEST_URL + "pdfTemplate";
		String contractKey = ZqsignManage.ContractKey.CONTRACTKEY;
		//取出合同模板编号
		String[] str = getContractTemplateNumber(contractKey);
		System.out.println(str);
		String t_no = str[0];
		System.out.println("str[0]"+str[0]);
		System.out.println("str[1]"+str[1]);
		String name = str[1];
		String[] coCodeAndJsonVal = getCompanyUserCode(jece);
		String companyUserCode = coCodeAndJsonVal[0];
		String jsonVal = coCodeAndJsonVal[1];
		String tenantUserCode = jece.getCsUserCode();

		//取出json字符串中的合同信息
		String json = jece.getCsTemplateFillValue();
		String contract_val = jsonVal;
		//生成合同前缀
		String jcdContractPrefix = "EleCon";
		Date date4 = new Date();
		SimpleDateFormat sdf4 = new SimpleDateFormat("yyyyMMddHHmmss");
		String jcdContractNumber = sdf4.format(date4)+(int) (Math.random() * 10) + (int) (Math.random() * 10)+(int) (Math.random() * 10);
		String contractNo = jcdContractPrefix + jcdContractNumber;
		//公寓方的赋值
				String key = "Signer1";
				contract_val = dealWithJson(key,companyUserCode,contract_val);
				//租客的赋值
				key = "Signer2";
				contract_val = dealWithJson(key,tenantUserCode,contract_val);
				//合同编号
				key = "contractNo";
				contract_val = dealWithJson(key,contractNo,contract_val);

				contract_val = changeDateFormat(contract_val);

				JSONObject obj3 = JSONObject.fromObject(json);
				JSONObject obj4 = obj3.getJSONObject("insertData");

				obj4.accumulate("jcdContractPrefix", jcdContractPrefix);
				obj4.accumulate("jcdContractNumber", jcdContractNumber);

				//把修改后的合同信息填充进json字符串 以便后来插入数据库
				obj3.put("jsonVal", JSONObject.fromObject(contract_val).get("jsonVal"));
				obj3.put("insertData", obj4);

				String templateFillValue =  obj3.toString();

				Map<String, String> map = new HashMap<String, String>();
				map.put("zqid", zqid);//众签提供给开发者的应用标识码,该值需要与private_key对应
				map.put("no", jece.getCsContractNo());//自行创建合同编号，该值不可重复使用
				map.put("name", name);//商户平台合同名称
				map.put("t_no", t_no);//商户平台存储在众签平台的合同模板编号
				map.put("contract_val", contract_val);//表单的json串

				String sign_val = ed.encrptData(map,private_key);//对请求进行签名加密

				map.put("sign_val", sign_val); //请求参数的签名值
				String response_str = HttpRequest.sendPost(request_url, map);//向服务端发送请求，并接收请求结果
				System.out.println("创建合同请求结果：" + response_str);//输出服务器响应结果

				JSONObject obj = JSONObject.fromObject(response_str);
				String code = obj.getString("code");
				String msg = obj.getString("msg");

				if("0".equals(code)){
					String[] result = new String[3];
					result[0] = "1";
					result[1] = templateFillValue;
					result[2] = t_no;
					return result;
				}else{
					throw new Exception(msg);
				}
	}
	/**
	 * 格式化合同时间
	 * @param contract_val
	 * @return
	 */
	private String changeDateFormat(String contract_val){
		
		JSONObject obj = JSONObject.fromObject(contract_val);
		JSONArray jsonArray = JSONArray.fromObject(obj.get("jsonVal"));
		JSONObject josn = jsonArray.getJSONObject(0);
		
		String beginDate = dateFormat(josn.getString("beginDate"));
		String endDate = dateFormat(josn.getString("endDate"));
		String signingDate = dateFormat(josn.getString("signingDate"));
		String deliveryDay = dateFormat(josn.getString("deliveryDay"));
		josn.put("beginDate", beginDate);
		josn.put("endDate", endDate);
		josn.put("signingDate", signingDate);
		josn.put("deliveryDay", deliveryDay);
		jsonArray.clear();
		jsonArray.add(josn);
		obj.put("jsonVal", jsonArray);
		String result = obj.toString();
		
		
		return result;
	}
	/**
	 * 将2018-12-10 这样的日期 格式化为 2018年12月10日
	 * @param date
	 * @return
	 */
	private  String dateFormat(String date){
		date = date.replaceFirst("-", "年");
		date = date.replaceFirst("-", "月");
		date = date + "日";
		return date;
	}
	/**
	 * 数据库里面取出合同模板,公寓名称
	 * @param
	 * @return 返回值为String数组 String[0]为合同模板  String[1]为公寓名称
	 * @throws Exception
	 */
	private String[] getContractTemplateNumber(String name) throws Exception {
		String str[] = new String[2];
		SysVariables sysVariables = new SysVariables();
		//默认取第一条
		sysVariables.setVariablesId(1);
		List<SysVariables> list  = sysVariablesMapper.selectByPrimaryKey(sysVariables);
		String jsonStr = list.get(0).getContractTemplateNumber();
		System.out.println(jsonStr);
		JSONArray jsonArray = JSONArray.fromObject(jsonStr);
		String t_no = null;
		for(int i = 0; i< jsonArray.size();i++){
			JSONObject json = jsonArray.getJSONObject(i);
			@SuppressWarnings("unchecked")
			Iterator<String> iterator = json.keys();
			while(iterator.hasNext()){
				String key = iterator.next();
				if(name.equals(key)){
					str[0] = json.getString(key);
					str[1] = json.getString("name");
				}
			}
		}
		return str;
	}
	/**
	 * 获取销售客户唯一标识
	 * @param  jece 电子合同信息
	 * @return 返回值为user_code则成功，-1代表
	 * @throws Exception 
	 */
	private String[] getCompanyUserCode(CsOutsideCustomerExpansion jece) throws Exception{
		String user_code = null;
		String name = null;
		String certificate = null;
		String address = null;
		String contact = null;
		String mobile = null;
		HttpServletRequest request = ServletActionContext.getRequest();
		//取出json字符串中的合同信息
		System.out.println(request);
		String json = jece.getCsTemplateFillValue();
		JSONObject obj2 = JSONObject.fromObject(json);
		System.out.println(obj2);
		//这是移除其他无关的数据 只发送jsonval给众签
		obj2.remove("insertData");
		
		//这是第一次使用 存的是合同填充值 jsonVal
		String jsonVal = obj2.toString();
		
		DButil1 dButil1 = new DButil1();
		String company = (String) request.getSession().getAttribute("company");
		System.out.println("company"+company);
		//用查出来的公司名字去查出公司唯一标识
		 String sql2 ="select contract_user_code,business_license_number,company_contact,company_tel,company_address,company_name from datasource where name = ?";  
			ResultSet  rs1 = dButil1.executeCompayQuery(sql2, company);
			while (rs1.next()) {   
				System.out.println(rs1.getString("company_name"));
				user_code = rs1.getString("contract_user_code");
				name = rs1.getString("company_name");
				certificate = rs1.getString("business_license_number");
				address = rs1.getString("company_address");
				contact = rs1.getString("company_contact");
				mobile = rs1.getString("company_tel");
		    }
		// 在这里是jsonVal 在填充公司信息进去
				//公寓方的赋值
				String key = "company_name";
				jsonVal = dealWithJson(key,name,jsonVal);
				
				key = "business_license_number";
				jsonVal = dealWithJson(key,certificate,jsonVal);
				
				key = "company_address";
				jsonVal = dealWithJson(key,address,jsonVal);
				
				key = "company_tel";
				jsonVal = dealWithJson(key,mobile,jsonVal);
				// 如果这个公司标识为空 则没有注册过 执行注册操作
				if(user_code == null || "".equals(user_code)){
					String request_url = ZqsignManage.Url.REQUEST_URL + "entpReg";
					user_code = UUIDUtil.createUUID();
					
					Map<String,String> map = new HashMap<String,String>();
					
					map.put("zqid", zqid);//商户的zqid,该值需要与private_key对应
				    map.put("user_code", user_code);//用户唯一标示，该值不能重复
				    map.put("name", name);//企业名称
				    map.put("certificate", certificate);//营业执照号或社会统一代码
				    map.put("address", address); //企业注册地址
				    map.put("contact", contact);//联系人
				    map.put("mobile", mobile);//联系电话（手机号码）
				
				    String sign_val = ed.encrptData(map,private_key);
				
					map.put("sign_val", sign_val); //请求参数的签名值
					System.out.println("企业注册的资料" + map);
					String response_str = HttpRequest.sendPost(request_url, map);//向服务端发送请求，并接收请求结果
					System.out.println("注册企业签名请求结果：" + response_str);//输出服务器响应结果
					JSONObject obj = JSONObject.fromObject(response_str);
					String code = obj.getString("code");
					String msg = obj.getString("msg");
					if("0".equals(code)){
						System.out.println("企业注册成功");
						//更新company库里面的公司唯一标识
						String sql3 = "UPDATE datasource SET contract_user_code=? WHERE name=?";
						int result = dButil1.updateCompany(sql3, user_code,company);
						if(result == -1){
							throw new Exception("公司唯一标识修改失败");
						}else{
							System.out.println("公司唯一标识修改成功");
						}
					}else{
						throw new Exception(msg);
					}
				}
				dButil1.close();
				
				String[] result = new String[2];
				result[0] = user_code;
				result[1] = jsonVal;
				return result;
	}
	/**
	 * 将公寓方的唯一标识插入json字符串中
	 * @param key 即将插入的key 
	 * @param value 插入的值，
	 * @param json 插入到模板的JSON字符串 
	 * @return 插入好的JSON字符串
	 */
	private String dealWithJson(String key,String value,String json){
		JSONObject obj = JSONObject.fromObject(json);
		JSONArray jsonArray = JSONArray.fromObject(obj.get("jsonVal"));
		JSONObject josn = jsonArray.getJSONObject(0);
		josn.put(key, value);
		jsonArray.clear();
		jsonArray.add(josn);
		obj.put("jsonVal", jsonArray);
		String result = obj.toString();
		return result;
	}
	@Override
	public String signShow(CsOutsideCustomerExpansion jece) throws Exception {
		System.out.println("来这里查询了");
		CsOutsideCustomerExpansion jece2 =csSalesClientContractMapper.queryCsSalesClientContract(jece);
		System.out.println(jece2);
		if(jece2 != null){
			if("未使用".equals(jece2.getCsStatus())){
				String request_url = ZqsignManage.Url.REQUEST_URL + "mobileSignView";
				String sign_type = ZqsignManage.SignType.SIGNATURECODE;
				
				String return_url = ZqsignManage.Url.BASE_URL + "syncCallBackTwo.action?co=" + jece.getCo();
				String notify_url = ZqsignManage.Url.BASE_URL + "asynCallBackTwo.action?co=" + jece.getCo();
				
				System.out.println("同步回调的url" + return_url);

				Map<String, String> map = new HashMap<String, String>();
				
				map.put("zqid", zqid);//商户的zqid,该值需要与private_key对应
				map.put("no", jece2.getCsContractNo());//已存在的合同编号
				System.out.println(jece2.getCsUserCode());
				map.put("user_code", jece2.getCsUserCode());//签署人的user_code
				map.put("sign_type", sign_type);//签章验证签署
				map.put("return_url", return_url);//同步回调地址:签署成功后,服务器会主动调用该地址,并将请求结果一并返回，若关闭该页面，请求通知结果也会关闭。
				map.put("notify_url", notify_url);//异步回调地址:若用户关闭同步通知调用该页面，后台每三分钟向后台发送请求直到用户拿到success结果。

				String sign_val = ed.encrptData(map,private_key);//对请求进行签名加密
				
				map.put("sign_val", sign_val);//添加签名值
				String requestHtmlText = ZqSubmit.buildRequest(map,request_url, private_key);//向服务端发送请求，并接收请求结果
				return requestHtmlText;
			}else{
				return "-2";
			}
		}else{
			return "-1";
		}
	}
	/**
	 * 同步回馈访问的数据处理
	 */
	@Override
	public String syncAddNoRent(CsOutsideCustomerExpansion jece) throws Exception {
		System.out.println("88888888888888========");
		JSONObject jobj = JSONObject.fromObject(jece.getCsTemplateFillValue());
		String result = insertData(jece);
		return result;
	}
	/**
	 * 插入数据到数据库
	 * @param
	 * @return 1代表成功 0代表这合同已经使用过了 -1 为失败
	 * @throws Exception 
	 */
	private String insertData(CsOutsideCustomerExpansion jece) throws Exception{
		CsOutsideCustomerExpansion jece2 = csSalesClientContractMapper.queryCsSalesClientContract(jece);
		System.out.println("777777777::::"+jece2);
		if("未使用".equals(jece2.getCsStatus())){
			
			String jsonStr = jece2.getCsTemplateFillValue();
			JSONObject json = JSONObject.fromObject(jsonStr);
			JSONObject json2 = json.getJSONObject("insertData");
			System.out.println(json2);
			
			CsOutsideCustomerExpansion csOutsideCustomerExpansion = (CsOutsideCustomerExpansion) JSONObject.toBean(json2, CsOutsideCustomerExpansion.class);
			csOutsideCustomerExpansion.setCsContractNo(jece.getNo());
			csOutsideCustomerExpansion.setTemplateFillValue(jsonStr);
			String[] resultStr = tenantRenewal(csOutsideCustomerExpansion);
			
			String wxgzhImgPath = resultStr[0];
			String templateFillValue = resultStr[1];
			
			int result4 = updateUserCode(jece);
			if(result4 == 1){
				System.out.println("修改租客usercode成功!");
			}
			
			int result = completionContract(jece);
			if(result == 1){
				System.out.println("合同生效成功!");
			}
			
			jece.setCsTemplateFillValue(templateFillValue);
			int result2 = updateElectronicContract(jece);
			if(result2 == 0){
				throw new Exception("更新电子合同临时表失败");
			}else{
				System.out.println("更新电子合同临时表成功 修改条数 ： " + result2);
			}
			System.out.println(wxgzhImgPath);
			return wxgzhImgPath;
		}else{
			JSONObject jobj = JSONObject.fromObject(jece2.getCsTemplateFillValue());
			if(jobj.getString("wxgzhImgPath") != null && !"".equals(jobj.getString("wxgzhImgPath"))){
				return jobj.getString("wxgzhImgPath");
			}else{
				return "-1";
			}
		}
	}
	/**
	 * @throws Exception 
	 * 修改合约标号状态操作
	 * @param //infoRenewalRenterExpand
	 * @return
	 * @throws
	 */
	private String[] tenantRenewal(CsOutsideCustomerExpansion csOutsideCustomerExpansion) throws Exception{
		//修改合约编号状态
        SysVariables sysVar = new SysVariables();
        sysVar.setVariablesId(1);
        List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
        if(!sysVarList.isEmpty()){
            sysVar = sysVarList.get(0);
        }
        String wxgzhImgPath = sysVar.getWxgzhImgPath();
        
        JSONObject jobj2 = JSONObject.fromObject(csOutsideCustomerExpansion.getTemplateFillValue());
        jobj2.put("wxgzhImgPath", wxgzhImgPath);
        
        
        System.out.println("图片的路径 ： " + wxgzhImgPath);
        if (sysVar.getContractNums() == 1) {
			Date date4 = new Date();
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String time4 = sdf2.format(date4);
			
			/*JournalContractDatabase jcd = new JournalContractDatabase();
			
			jcd.setJcdContractPrefix(csOutsideCustomerExpansion.getJcdContractPrefix());
			jcd.setJcdContractNumber(csOutsideCustomerExpansion.getJcdContractNumber());
			jcd.setJcdRecipient(csOutsideCustomerExpansion.getJrrUserId());
			jcd.setJcdReceiveDepartment(csOutsideCustomerExpansion.getJrrDepartment());
			//jcd.setJcdReceiveStore(csOutsideCustomerExpansion.getJrrStorefront());
	        jcd.setJcdUseState("已签约");
	        jcd.setJcdUsedType("销售");
	        //jcd.setJcdHouseAddress(csOutsideCustomerExpansion.getJcdHouseAddress());
	        jcd.setJcdContractPerson(csOutsideCustomerExpansion.getJrrUserId());
	        jcd.setJcdGenerationTime(time4);
	        jcd.setJcdCollectionTime(csOutsideCustomerExpansion.getJrrSignedTime());
	        jcd.setJcdSigningTime(csOutsideCustomerExpansion.getJrrSignedTime());
	        
	        int result3 = journalContractDatabaseMapper.insertSelective(jcd);
	        if(result3 == 0){
	            throw new Exception("新增合约编号失败------------------------------");
	        }*/
	        
	        String jrrRenewalCoding = csOutsideCustomerExpansion.getJcdContractPrefix() + csOutsideCustomerExpansion.getJcdContractNumber();
	        csOutsideCustomerExpansion.setJrrRenewalCoding(jrrRenewalCoding);
        }
        
		//添加合同
        //这里要改
		/*int result = csSalesClientContractMapper.insertSelective(csOutsideCustomerExpansion);
		if(result == 0){
			throw new Exception("新增0条续签合约");
		}*/
		/*//添加账单
		List<InfoContractInstallment> list = CommonMethodClass.rentContractInstallment(infoRenewalRenterExpand);
		if(list.size() == 0){
			throw new Exception("生成0条新分期账单！");
		}
		System.out.println("生成的续签分期账单："+ list.toString());
		
		Double thisHrHouserDeposit = infoRenewalRenterExpand.getHrHouseDeposit();
		
		JSONObject jobj = JSONObject.fromObject(infoRenewalRenterExpand.getTemplateFillValue());
		
		Double lastHrHouserDeposit = jobj.getDouble("lastHouseDeposit");
		//如果新押金多于以前的押金 则生成一条临时账单
		if(thisHrHouserDeposit > lastHrHouserDeposit){
			String time = getTime();
			Double difference = thisHrHouserDeposit - lastHrHouserDeposit;
			String jciMessageNote = getMessageNote(difference);
			
			InfoContractInstallment infoContractInstallment = new InfoContractInstallment();
			InfoContractInstallment ici = list.get(0);
			
			infoContractInstallment.setJciRegisterPeople(ici.getJciRegisterPeople());
			infoContractInstallment.setJciHouse4rentId(ici.getJciHouse4rentId());
			infoContractInstallment.setJciHouse4storeId(ici.getJciHouse4storeId());
			infoContractInstallment.setJciDepartment(ici.getJciDepartment());
			infoContractInstallment.setJciStorefront(ici.getJciStorefront());
			infoContractInstallment.setJciLandlordId(ici.getJciLandlordId());
			infoContractInstallment.setJciRenterId(ici.getJciRenterId());
			infoContractInstallment.setJciFukuanri(time);
			infoContractInstallment.setJciBeginPeriods(time);
			infoContractInstallment.setJciEndPeriods(time);
			infoContractInstallment.setJciNature("应收");
			infoContractInstallment.setJciType("租客租金");
			infoContractInstallment.setJciMoney(difference);
			infoContractInstallment.setJciState("待收");
			infoContractInstallment.setJciLabelType(1);
			infoContractInstallment.setJciMessageNote(jciMessageNote);
			
			String billJson = getBillJosn(infoContractInstallment);
			
			infoContractInstallment.setJciBillJson(billJson);
			infoContractInstallmentMapper.insertSelective(infoContractInstallment);
		}
		
		int result2 = infoContractInstallmentMapper.insertList(list);
		if(result2 == 0){
			throw new Exception("数据库新增0条新账单！");
		}*/
        
		/*//更新已租表最新签约时间、租赁到期时间、房屋押金、租金
        Integer hrId = infoRenewalRenterExpand.getJrrHouse4rentId();
        InfoRenewalRenterExpand endCont = infoRenewalRenterMapper.selectEndTime(hrId);
        if(endCont == null){
            throw new Exception("查询合约失败！");
        }
        String beginTime = infoRenewalRenterExpand.getJrrBeginTime();
        String endTime = endCont.getJrrEndTime();
        Double hrHouseDeposit = infoRenewalRenterExpand.getHrHouseDeposit();
        InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
        infoHouse4rentExpand.setHrId(hrId);
        infoHouse4rentExpand.setHrSignTime(beginTime);
        infoHouse4rentExpand.setHrEndTime(endTime);
        infoHouse4rentExpand.setHrHouseDeposit(hrHouseDeposit);
        infoHouse4rentExpand.setHrHousePrice(infoRenewalRenterExpand.getJrrMoney());
        System.out.println("修改已租房的押金     "+ hrHouseDeposit);
        int result3 = infoHouse4rentMapper.updateByPrimaryKeySelective(infoHouse4rentExpand);
        if(result3 == 0){
            throw new Exception("更新已租表最新签约时间、租赁到期时间、房屋押金失败");
        }
        //更新未租表最新成交价
        InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
        infoHouse4storeExpand.setHsId(infoRenewalRenterExpand.getJrrHouse4storeId());
        infoHouse4storeExpand.setHsTransactionPrice(infoRenewalRenterExpand.getJrrMoney());
        int result4 = infoHouse4storeMapper.updateByPrimaryKeySelective(infoHouse4storeExpand);
        if(result4 == 0){
            throw new Exception("更新未租表最新成交价失败");
        }
        
        //写系统跟进
  		String houseforRentFollowRemark = "电子签约：已租房" + hrId + "续约成功。";
  		JournalHousingFollowExpand record = new JournalHousingFollowExpand();
  		record.setJhfDepartment(infoRenewalRenterExpand.getJrrDepartment());
  		record.setJhfStorefront(infoRenewalRenterExpand.getJrrStorefront());
  		record.setJhfHouse4rentId(hrId);
  		record.setJhfHouse4storeId(infoRenewalRenterExpand.getJrrHouse4storeId());
  		record.setJhfHouseId(infoRenewalRenterExpand.getHouseId());
  		record.setJhfFollowRemark(houseforRentFollowRemark);
  		record.setJhfFollowResult("签约成功");
  		record.setJhfPaymentWay("系统跟进");
  		record.setJhfUserId(infoRenewalRenterExpand.getJrrUserId());
  		
  		int result10 = journalHousingFollowMapper.insertSelective(record);
  		if(result10 == 0){
  			throw new Exception("添加系统跟进失败--------------------");
  		}*/
        
  		String[] resultStr = new String[2];
  		resultStr[0] = wxgzhImgPath;
  		resultStr[1] = jobj2.toString();
		return resultStr;
	}
	/*
	 * 合同生效操作
	 * */
	private int completionContract(CsOutsideCustomerExpansion jece) throws Exception{
		String request_url = ZqsignManage.Url.REQUEST_URL + "completionContract";
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("zqid", zqid);//众签提供给开发者的应用标识码,该值需要与private_key对应
		map.put("no", jece.getNo());//自行创建合同编号，该值不可重复使用
		
		String sign_val = ed.encrptData(map,private_key);//对请求进行签名加密
		
		map.put("sign_val", sign_val); //请求参数的签名值
		String response_str = HttpRequest.sendPost(request_url, map);//向服务端发送请求，并接收请求结果
		JSONObject obj = JSONObject.fromObject(response_str);
		String code = obj.getString("code");
		String msg = obj.getString("msg");
		if("0".equals(code)){
			return 1;
		}else{
			throw new Exception(msg);
		}
	}
	/*
	 * 修改电子合同临时表的信息
	 * 
	 * */
	private int updateElectronicContract(CsOutsideCustomerExpansion jece) throws Exception{
		jece.setCsStatus("已使用");
		System.out.println("合同编号 : "+jece.getNo() +"状态 ： " + jece.getCsStatus());
		int result = csSalesClientContractMapper.updateCsSalesClientContract(jece);
		if(result == 1){
			return 1;
		}else{
			return -1;
		}
	}
	@Override
	public List<CsSalesClientContract> selectCsSalesClientContract(CsSalesClientContract csSalesClientContract)throws Exception {
		return csSalesClientContractMapper.selectCsSalesClientContract(csSalesClientContract);
	}
	@Override
	public String asynAddNoRent(CsOutsideCustomerExpansion jece) throws Exception {
		String result = insertData(jece);
		return result;
	}
	@Override
	public Result<String> getCustomerImg(CsOutsideCustomerExpansion jece) throws Exception {
		String request_url = ZqsignManage.Url.REQUEST_URL + "getImg";
		System.out.println(request_url);
		
		String ContractNum = jece.getNo();
		System.out.println(ContractNum);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("zqid", zqid);//商户的zqid,该值需要与private_key对应
		map.put("no", ContractNum);//已存在的合同编号
        System.out.println(map);
		String sign_val = ed.encrptData(map,private_key);//对请求进行签名加密
		
		map.put("sign_val", sign_val);//添加签名值
		String response_str = HttpRequest.sendPost(request_url, map);//向服务端发送请求，并接收请求结果
		System.out.println("--------++++"+response_str);
		JSONObject obj = JSONObject.fromObject(response_str);
		String code = obj.getString("code");
		String msg = obj.getString("msg");
		String imgList = obj.getString("imgList");
		System.out.println("++++"+imgList);
		if("0".equals(code)){
			return new Result<String>(Integer.valueOf(code),msg,imgList);
		}else{
			throw new Exception(msg);
		}
	}
	@Override
	public CsSalesClientContract queryCsSalesClientContract2(
			CsSalesClientContract csSalesClientContract) throws Exception {
		
		return csSalesClientContractMapper.queryCsSalesClientContract2(csSalesClientContract);
	}
	@Override
	public int updateCsSalesClientContract2(CsSalesClientContract csSalesClientContract) throws Exception {
		
		return csSalesClientContractMapper.updateCsSalesClientContract2(csSalesClientContract);
	}
}
