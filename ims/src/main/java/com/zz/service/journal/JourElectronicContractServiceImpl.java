package com.zz.service.journal;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.mapper.info.*;
import com.zz.mapper.journal.*;
import com.zz.mapper.sys.SysVariablesMapper;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.info.*;
import com.zz.po.journal.*;
import com.zz.po.sys.SysAssetsExpand;
import com.zz.po.sys.SysVariables;
import com.zz.service.info.HouseForRentService;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.sys.SendShortMessageService;
import com.zz.service.sys.SysAssetsService;
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

public class JourElectronicContractServiceImpl implements JourElectronicContractService{
    private final static String POSTURL = "http://www.fangzhizun.com/device/api";
	String private_key = ZqsignManage.Key.PRIVATE_KEY;
	String zqid = ZqsignManage.Zqid.ZQID;
	EncryptData ed = new EncryptData();
    String meterReadingRecord = "";
	
	private InfoHouse4rentMapper infoHouse4rentMapper;
	
    private InfoHouse4storeMapper infoHouse4storeMapper;
	
	private JournalContractDatabaseMapper journalContractDatabaseMapper;
	
	private InfoContractInstallmentMapper infoContractInstallmentMapper;
	
	private InfoRenewalRenterMapper infoRenewalRenterMapper;
	
	private InfoPopulationMapper infoPopulationMapper;
	
	private SysVariablesMapper sysVariablesMapper;
	
	private JourElectronicContractMapper jourElectronicContractMapper;
	
	private JournalHousingFollowMapper journalHousingFollowMapper;
	@Autowired
	private InfoRenterMapper infoRenterMapper;
	@Autowired
    private JourDeviceMapper jourDeviceMapper;
	@Autowired
    private JourDoorCardService jourDoorCardService;
	@Autowired
    private SendShortMessageService sendShortMessageService;
	@Autowired
    private JournalWegReadingMapper journalWegReadingMapper;
	@Autowired
    private InfoIntendedPersonMapper infoIntendedPersonMapper;
	@Autowired
    private InfoTransactionAssistanceMapper itamMapper;
	@Autowired
    private SysAssetsService sysAssetsService;
	@Autowired
	private HouseForRentService houseForRentService;
	@Autowired
	private FinancialService financialService;
	@Autowired
	private HouseForStoreService houseForStoreService;
	@Autowired
	private JourEarnestMoneyService jourEarnestMoneyService;
	@Autowired
	private ShortMessageService shortMessageService;
	public void setJournalHousingFollowMapper(JournalHousingFollowMapper journalHousingFollowMapper) {
		this.journalHousingFollowMapper = journalHousingFollowMapper;
	}

	public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
		this.infoHouse4rentMapper = infoHouse4rentMapper;
	}

	public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}

	public void setJournalContractDatabaseMapper(JournalContractDatabaseMapper journalContractDatabaseMapper) {
		this.journalContractDatabaseMapper = journalContractDatabaseMapper;
	}

	
	public void setInfoContractInstallmentMapper(InfoContractInstallmentMapper infoContractInstallmentMapper) {
		this.infoContractInstallmentMapper = infoContractInstallmentMapper;
	}

	public void setInfoRenewalRenterMapper(InfoRenewalRenterMapper infoRenewalRenterMapper) {
		this.infoRenewalRenterMapper = infoRenewalRenterMapper;
	}

	public void setJourElectronicContractMapper(JourElectronicContractMapper jourElectronicContractMapper) {
		this.jourElectronicContractMapper = jourElectronicContractMapper;
	}

	public void setSysVariablesMapper(SysVariablesMapper sysVariablesMapper) {
		this.sysVariablesMapper = sysVariablesMapper;
	}

	public void setInfoPopulationMapper(InfoPopulationMapper infoPopulationMapper) {
		this.infoPopulationMapper = infoPopulationMapper;
	}
	@Override
	public String dealWithSignOut(JournalElectronicContractExpansion jece) throws Exception{
		Integer popID = null; //人口id
        Integer renterid = null; //租客id
		//查询人口表IC
		InfoPopulation ip = new InfoPopulation();
		ip.setPopIdcard(jece.getPopIdcard());
		List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(ip);
		//判断是否存在此人
		if(list.size()==0){
			//用传入的IC去人头表查，没有相应的数据则新增一条人头数据，并返回插入的ID
			ip.setPopName(jece.getPopName());
			ip.setPopIdcard(jece.getPopIdcard());
			ip.setPopTelephone(jece.getPopTelephone());
			ip.setPopUser(jece.getPopUser());
			ip.setPopNameRemark(jece.getPopNameRemark());
			ip.setPopInnerCreditLevel(80);
			ip.setPopOuterCreditLevel(80);
			ip.setPopRenter(1);
			ip.setPopPassword(jece.getPopPassword());
			ip.setPopIdcardJson(jece.getPopIdcardJson());
			ip.setPopBirth(jece.getPopBirth());
			ip.setPopNation(jece.getPopNation());
			ip.setPopIdcardAddress(jece.getPopIdcardAddress());
			ip.setPopSex(jece.getPopSex());
			int result = infoPopulationMapper.insertSelective(ip);
			if(result == 0){
				return "-1";
			}
            //添加租客
            InfoRenterExpand  ire = new InfoRenterExpand();
            ire.setRenterPopulationId(ip.getPopId());
            ire.setRenterPopName(jece.getPopName());
            ire.setRenterPopTelephone(jece.getPopTelephone());
            ire.setRenterPopIdcard(jece.getPopIdcardJson());
            ire.setRenterSecondPhone(jece.getPopTelephone());
            ire.setRenterUserId(jece.getRenterUserId());
            ire.setRenterDepartment(jece.getRenterDepartment());
            ire.setRenterStorefront(jece.getRenterStorefront());
            int result1 = infoRenterMapper.insertSelective(ire);
            if (result1 == 0) {
				return "-1";
            }
			popID = ip.getPopId();
			jece.setPopId(ip.getPopId());

		}else{
            popID = list.get(0).getPopId();
            jece.setPopId(list.get(0).getPopId());
            String name = jece.getPopName();
            String popname = list.get(0).getPopName();
            if(name.equals(popname)){
                InfoRenterExpand re = new InfoRenterExpand();
                re.setRenterPopulationId(popID);
                List<InfoRenterExpand> relist = infoRenterMapper.selectAll(re);
                if(relist.size() == 0){
                    re.setRenterPopulationId(popID);
                    re.setRenterPopName(jece.getPopName());
                    re.setRenterPopTelephone(jece.getPopTelephone());
                    re.setRenterPopIdcard(jece.getPopIdcardJson());
                    re.setRenterSecondPhone(jece.getPopTelephone());
                    re.setRenterUserId(jece.getRenterUserId());
                    re.setRenterDepartment(jece.getRenterDepartment());
                    re.setRenterStorefront(jece.getRenterStorefront());
                    int result = infoRenterMapper.insertSelective(re);
                    if (result == 0) {
						return "-1";
                    } else {
                        renterid = re.getRenterId();
                    }
                    //修改人口表租客标识
                    InfoPopulation ip2 = new InfoPopulation();
                    ip2.setPopId(popID);
                    ip2.setPopRenter(1);
                    int result4 = infoPopulationMapper.updateByPrimaryKeySelective(ip2);
                    if(result4==0){
						return "-1";
                    }
                }else{
                    renterid = relist.get(0).getRenterId();
                }
            }else{
                /*JSONObject jsonObj = new JSONObject();
                jsonObj.accumulate("name", list.get(0).getPopName());
                jsonObj.accumulate("tel", list.get(0).getPopTelephone());
                jsonObj.accumulate("ID", list.get(0).getPopIdcard());*/
                return "-1";
            }
			jece.setPopId(list.get(0).getPopId());
		}
		//查询这人有没有申请过数字签名
		int result0 = selectInfoPopulation(jece);
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
		jece.setEctContractNo(UUIDUtil.createUUID());
		System.out.println("生成的合同编号： "+jece.getEctContractNo());
		//创建合同
		String[] result2 = createContract(jece);
		String templateFillValue = result2[1];
		String tNo = result2[2];
		if("1".equals(result2[0])){
			System.out.println("创建合同成功");
		}else{
			System.out.println("创建合同失败");
		}

		jece.setEctContractTemplateNumber(tNo);
		jece.setEctTemplateFillValue(templateFillValue);
		jece.setEctStatus("未使用");
		//插入电子合同
		int result3 = insertJourElectronicContractTem(jece);
		System.out.println("插入后的id "+jece.getEctId());
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
			JSONObject jobj = JSONObject.fromObject(jece.getEctTemplateFillValue());
			JSONObject jobj2 = jobj.getJSONObject("insertData");
			String address = jobj2.getString("jcdHouseAddress");
			JournalShortMessage journalShortMessage = new JournalShortMessage();
			journalShortMessage.setMessageType(19);
			journalShortMessage.setUrl(url);
			journalShortMessage.setPopName(jece.getPopName());
			journalShortMessage.setPopTelephone(jece.getPopTelephone());
			journalShortMessage.setPopIdcard(jece.getPopIdcard());
			journalShortMessage.setCompanyAddress(address);
			journalShortMessage.setSmPopId(jece.getPopId());
			System.out.println(popID);
			journalShortMessage.setSmNotRentId(popID);
//			journalShortMessage.setSmRentId(journalElectronicContractExpansion.getEctHrId());
//			journalShortMessage.setSmUserId(journalElectronicContractExpansion.getHrUserId());
			Result<String> results = shortMessageService.sendOutsideMessage(journalShortMessage);
			System.out.println(results);

			return url;
		}else{
			return "-1";
		}
	}
	@Override
	public String dealWithSign(JournalElectronicContractExpansion jece) throws Exception{
		//查询这人有没有申请过数字签名
		int result0 = selectInfoPopulation(jece);
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
		jece.setEctContractNo(UUIDUtil.createUUID());
		System.out.println("生成的合同编号： "+jece.getEctContractNo());
		//创建合同
		String[] result2 = createContract(jece);
		String templateFillValue = result2[1];
		String tNo = result2[2];
		if("1".equals(result2[0])){
			System.out.println("创建合同成功");
		}else{
			System.out.println("创建合同失败");
		}
		
		jece.setEctContractTemplateNumber(tNo);
		jece.setEctTemplateFillValue(templateFillValue);
		jece.setEctStatus("未使用");
		
		int result3 = insertJourElectronicContractTem(jece);
		System.out.println("插入后的id "+jece.getEctId());
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
	private String createUrl(JournalElectronicContractExpansion jece) throws Exception{
		String company = SessionUtil.getSession("company");
		System.out.println("***********电子签约"+company);
		String url = ZqsignManage.Url.BASE_URL + "signShow.action?co="+company+"&ectId="+jece.getEctId();

		url = getShortUrl(url);
		
		jece.setEctSignUrl(url);
		jourElectronicContractMapper.updateByPrimaryKeySelective(jece);
		
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
	
	/*
	 * 插入数据到电子合同临时表
	 * 返回1成功 返回-1失败
	 * */
	private int insertJourElectronicContractTem(JournalElectronicContractExpansion jece) throws Exception{
		int result = jourElectronicContractMapper.insertElectronicContract(jece);
		if(result == 1){
			return 1;
		}else{
			return -1;
		}
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
	
	/*
	 * 用模板创建合同
	 * 成功返回1 错误则抛出错误
	 * */
	private String[] createContract(JournalElectronicContractExpansion jece) throws Exception{
		String request_url = ZqsignManage.Url.REQUEST_URL + "pdfTemplate";
		String contractKey = ZqsignManage.ContractKey.CONTRACTKEY;
		
		//取出合同模板编号
		String[] str = getContractTemplateNumber(contractKey);
		String t_no = str[0];
		String name = str[1];
		
		String[] coCodeAndJsonVal = getCompanyUserCode(jece);
		String companyUserCode = coCodeAndJsonVal[0];
		String jsonVal = coCodeAndJsonVal[1];
		String tenantUserCode = jece.getEctUserCode();
		
		//取出json字符串中的合同信息
		String json = jece.getEctTemplateFillValue();
		
		//这里移除其他数据 只发送给jsonVal 给众签
//		JSONObject obj2 = JSONObject.fromObject(json);
//		obj2.remove("insertData");
//		obj2.remove("idcardType");
//		obj2.remove("phoneType");
		String contract_val = jsonVal;
		
		//生成合同前缀
		String jcdContractPrefix = "EleCon";
		//生成合同编号
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
		map.put("no", jece.getEctContractNo());//自行创建合同编号，该值不可重复使用
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
	 * 获取公寓方唯一标识
	 * @param  jece 电子合同信息
	 * @return 返回值为user_code则成功，-1代表
	 * @throws Exception 
	 */
	private String[] getCompanyUserCode(JournalElectronicContractExpansion jece) throws Exception{
		String user_code = null;
		String name = null;
		String certificate = null;
		String address = null;
		String contact = null;
		String mobile = null;
		HttpServletRequest request = ServletActionContext.getRequest();
		
		//取出json字符串中的合同信息
        System.out.println(jece.getEctTemplateFillValue());
		String json = jece.getEctTemplateFillValue();
		JSONObject obj2 = JSONObject.fromObject(json);
		//这是移除其他无关的数据 只发送jsonval给众签
		obj2.remove("insertData");
		obj2.remove("idcardType");
		obj2.remove("phoneType");
		//这是第一次使用 存的是合同填充值 jsonVal
		String jsonVal = obj2.toString();
		
		DButil1 dButil1 = new DButil1();
		String company = (String) request.getSession().getAttribute("company");
        
        //用查出来的公司名字去查出公司唯一标识
	    String sql2 ="select contract_user_code,business_license_number,company_contact,company_tel,company_address,company_name from datasource where name = ?";  
		ResultSet  rs1 = dButil1.executeCompayQuery(sql2, company);
		while (rs1.next()) {   
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
	
	/*
	 * 注册个人签名
	 * 成功返回1 错误则抛出错误
	 * */
	private int regPerson(JournalElectronicContractExpansion jece) throws Exception{
		String request_url = null;
		boolean idcardType = jece.isIdcardType();
		if(idcardType){
			//如果身份证规范则走校验签署
			request_url = ZqsignManage.Url.REQUEST_URL + "personReg";
		}else{
			//如果身份证不规范则走不校验签署
			request_url = ZqsignManage.Url.REQUEST_URL + "personRegNV";
		}

		Map<String,String> map = new HashMap<String,String>();

		map.put("zqid", zqid);//商户的zqid,该值需要与private_key对应
	    map.put("user_code", jece.getEctUserCode());//用户唯一标示，该值不能重复
	    map.put("name", jece.getEctName());//平台方用户姓名
	    map.put("id_card_no", jece.getEctIdCard());//身份证号
	    map.put("mobile", jece.getEctTelphone());//联系电话（手机号码）

	    String sign_val = ed.encrptData(map,private_key);

		map.put("sign_val", sign_val); //请求参数的签名值
		System.out.println("个人签名注册:"+map);
		String response_str = HttpRequest.sendPost(request_url, map);//向服务端发送请求，并接收请求结果
		System.out.println("注册个人签名请求结果：" + response_str);//输出服务器响应结果
		JSONObject obj = JSONObject.fromObject(response_str);
		String code = obj.getString("code");
		String msg = obj.getString("msg");
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
	
	/*
	 * 查询人口表，看是否有user_code 由此判断是否申请过数字签名
	 * 返回结果 ：   0代表没有userCode 1代表有user_code的值 
	 * */
	private int selectInfoPopulation(JournalElectronicContractExpansion jece){
		InfoPopulation infoPopulation = new InfoPopulation();
		infoPopulation.setPopIdcard(jece.getEctIdCard());
		List<InfoPopulation> list = new ArrayList<>();
		try {
			list = infoPopulationMapper.newModifiedJudgmentQuery(infoPopulation);
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
		}
		
		if(list.size() == 0){
			return 0;
		}else if(list.get(0).getUserCode()==null || "".equals(list.get(0).getUserCode())){
			return 0;
		}else{
			return 1;
		}
	}
	
	/*
	 * 展示签署界面
	 * 返回html代码form表单字符串
	 * */
	@Override
	public String signShow(JournalElectronicContractExpansion jece) throws Exception {
		System.out.println("来这里查询了");
		JournalElectronicContractExpansion jece2 = jourElectronicContractMapper.selectElectronicContract(jece);
		if(jece2 != null){
			if("未使用".equals(jece2.getEctStatus())){
				String request_url = ZqsignManage.Url.REQUEST_URL + "mobileSignView";
				String sign_type = ZqsignManage.SignType.SIGNATURECODE;
				
				String return_url = ZqsignManage.Url.BASE_URL + "syncCallBack.action?co=" + jece.getCo();
				String notify_url = ZqsignManage.Url.BASE_URL + "asynCallBack.action?co=" + jece.getCo();
				
				System.out.println("同步回调的url" + return_url);

				Map<String, String> map = new HashMap<String, String>();
				
				map.put("zqid", zqid);//商户的zqid,该值需要与private_key对应
				map.put("no", jece2.getEctContractNo());//已存在的合同编号
				map.put("user_code", jece2.getEctUserCode());//签署人的user_code
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
	public String syncAddNoRent(JournalElectronicContractExpansion jece) throws Exception {
		JSONObject jobj = JSONObject.fromObject(jece.getEctTemplateFillValue());
		String result = insertData(jece);
		System.out.println("同步");
		System.out.println(result);
		return result;
	}
	
	/**
	 * 异步回馈访问的数据处理
	 */
	@Override
	public String asynAddNoRent(JournalElectronicContractExpansion jece) throws Exception {
		String result = insertData(jece);
		System.out.println("异步");
		System.out.println(result);
		return result;
	}
	/*
	 * 修改电子合同临时表的信息
	 * 
	 * */
	private int updateElectronicContract(JournalElectronicContractExpansion jece) throws Exception{
		jece.setEctStatus("已使用");
		System.out.println("合同编号 : "+jece.getNo() +"状态 ： " + jece.getEctStatus());
		int result = jourElectronicContractMapper.updateElectronicContract(jece);
		if(result == 1){
			return 1;
		}else{
			return -1;
		}
	}
	
	/*
	 * 查询合同是否生效
	 * */
	private int checkContractState(JournalElectronicContractExpansion jece) throws Exception{
		JournalElectronicContractExpansion jece2 = jourElectronicContractMapper.selectElectronicContract(jece);
		if("未使用".equals(jece2.getEctStatus())){
			return 1;
		}else if("已使用".equals(jece2.getEctStatus())){
			return 0;
		}else{
			return -1;
		}
	}
	
	/*
	 * 合同生效操作
	 * */
	private int completionContract(JournalElectronicContractExpansion jece) throws Exception{
        System.out.println("到了合同生效操作");
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
		if("0".equals(code) || "600017".equals(code)){
			return 1;
		}else{
			throw new Exception(msg);
		}
	}
	
	/**
	 * 插入数据到数据库
	 * @param
	 * @return 1代表成功 0代表这合同已经使用过了 -1 为失败
	 * @throws Exception 
	 */
	private String insertData(JournalElectronicContractExpansion jece) throws Exception{
		/*通过CO查询电子合同*/
		JournalElectronicContractExpansion jece2 = jourElectronicContractMapper.selectElectronicContract(jece);
		if("未使用".equals(jece2.getEctStatus())){
            System.out.println("合同未使用");
			String jsonStr = jece2.getEctTemplateFillValue();
			JSONObject json = JSONObject.fromObject(jsonStr);
//			获取insertData数据
			JSONObject json2 = json.getJSONObject("insertData");
			System.out.println("insertData");
			System.out.println(json2);
			InfoRenewalRenterExpand infoRenewalRenterExpand = (InfoRenewalRenterExpand) JSONObject.toBean(json2, InfoRenewalRenterExpand.class);
			System.out.println("NO的值是============"+jece.getNo());
			infoRenewalRenterExpand.setJrrElectronicContractNo(jece.getNo());
			infoRenewalRenterExpand.setTemplateFillValue(jsonStr);
			String[] resultStr = tenantRenewal(infoRenewalRenterExpand);
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
			
			jece.setEctTemplateFillValue(templateFillValue);
			int result2 = updateElectronicContract(jece);
			if(result2 == 0){
				throw new Exception("更新电子合同临时表失败");
			}else{
				System.out.println("更新电子合同临时表成功 修改条数 ： " + result2);
			}
			System.out.println(wxgzhImgPath);
			return wxgzhImgPath;
		}else{
			JSONObject jobj = JSONObject.fromObject(jece2.getEctTemplateFillValue());
			if(jobj.getString("wxgzhImgPath") != null && !"".equals(jobj.getString("wxgzhImgPath"))){
				System.out.println(jobj.getString("wxgzhImgPath"));
				return jobj.getString("wxgzhImgPath");
			}else{
				return "-1";
			}
		}
	}
	
	/**
	 * 获取合同图片路径
	 * @throws Exception 
	 */
	@Override
	public Result<String> getContractImg(JournalElectronicContractExpansion jece) throws Exception{
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
	
	/**
	 * 修改该租客的uerCode
	 * @param
	 * @return
	 * @throws Exception 
	 */
	private int updateUserCode(JournalElectronicContractExpansion jece) throws Exception{
		InfoPopulation infoPopulation = new InfoPopulation();
		infoPopulation.setPopIdcard(jece.getEctIdCard());
		List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(infoPopulation);
		InfoPopulation infoPopulation2 = list.get(0);
		if(jece.getUser_code() != null){
			infoPopulation2.setUserCode(jece.getUser_code());
		}else{
			infoPopulation2.setUserCode(jece.getEctUserCode());
		}
		
		int result = infoPopulationMapper.updateByPrimaryKeySelective(infoPopulation2);
		if(result != 1){
			throw new Exception("修改该租客的uercode出错了");
		}else{
            System.out.println("修改租客uercode成功");
        }
		return 1;
	}
	
	/**
	 * 后台自动给公寓方签署 
	 * @param
	 * @return 1代表成功
	 * @throws Exception
	 */
	private int signAuto(JournalElectronicContractExpansion jece) throws Exception{
		String request_url = ZqsignManage.Url.REQUEST_URL + "signAuto";
		
		String companyUserCode = getCompanyUserCode(jece)[0];

		Map<String, String> map = new HashMap<String, String>();
		
		map.put("zqid",zqid);//商户的zqid,该值需要与private_key对应
		map.put("no", jece.getEctContractNo());//已存在的合同编号
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
	
	/**
	 * @throws Exception 
	 * 续签合同的操作
	 * @param infoRenewalRenterExpand
	 * @return
	 * @throws
	 */
	private String[] tenantRenewal(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception{
        System.out.println("进入合同操作");
		//修改合约编号状态
        Integer renterid = null; //租客id
        SysVariables sysVar = new SysVariables();
        sysVar.setVariablesId(1);
        List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
        if(!sysVarList.isEmpty()){
            sysVar = sysVarList.get(0);
        }
        String wxgzhImgPath = sysVar.getWxgzhImgPath();
        
        JSONObject jobj2 = JSONObject.fromObject(infoRenewalRenterExpand.getTemplateFillValue());
        jobj2.put("wxgzhImgPath", wxgzhImgPath);
        
        
        System.out.println("图片的路径 ： " + wxgzhImgPath);
        if (sysVar.getContractNums() == 1) {
			Date date4 = new Date();
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String time4 = sdf2.format(date4);
			
			JournalContractDatabase jcd = new JournalContractDatabase();
			
			jcd.setJcdContractPrefix(infoRenewalRenterExpand.getJcdContractPrefix());
			jcd.setJcdContractNumber(infoRenewalRenterExpand.getJcdContractNumber());
			jcd.setJcdRecipient(infoRenewalRenterExpand.getJrrUserId());
			jcd.setJcdReceiveDepartment(infoRenewalRenterExpand.getJrrDepartment());
			jcd.setJcdReceiveStore(infoRenewalRenterExpand.getJrrStorefront());
	        jcd.setJcdUseState("已签约");
	        jcd.setJcdUsedType("出房");
	        jcd.setJcdHouseAddress(infoRenewalRenterExpand.getJcdHouseAddress());
	        jcd.setJcdContractPerson(infoRenewalRenterExpand.getJrrUserId());
	        jcd.setJcdGenerationTime(time4);
	        jcd.setJcdCollectionTime(infoRenewalRenterExpand.getJrrSignedTime());
	        jcd.setJcdSigningTime(infoRenewalRenterExpand.getJrrSignedTime());
	        
	        int result3 = journalContractDatabaseMapper.insertSelective(jcd);
	        if(result3 == 0){
	            throw new Exception("新增合约编号失败------------------------------");
	        }
	        
	        String jrrRenewalCoding = infoRenewalRenterExpand.getJcdContractPrefix() + infoRenewalRenterExpand.getJcdContractNumber();
	        infoRenewalRenterExpand.setJrrRenewalCoding(jrrRenewalCoding);
        }
        
		//添加合同

        System.out.println("合同类型"+infoRenewalRenterExpand.getJrrContractType());
		if("新增合同".equals(infoRenewalRenterExpand.getJrrContractType())){
            Integer hrId = null;
            //查询门锁信息
            int jhdHsId=infoRenewalRenterExpand.getJrrHouse4storeId();			//未租ID
            SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            String startTime=dfs.format(new Date());
            String endTime=infoRenewalRenterExpand.getJrrEndTime()+" "+"00:00:00";
            String name=infoRenewalRenterExpand.getPopName();
            List<JourDevice> devices=jourDeviceMapper.selectDeviceStatus(jhdHsId);
            Integer jdcDevcieId=null;
            Integer devFirstType;
            Integer devSecondType;
            for (int l=0;l<devices.size();l++) {
                jdcDevcieId=devices.get(l).getId();
                devFirstType=devices.get(l).getDevFirstType();
                devSecondType=devices.get(l).getDevSecondType();
                if ("".equals(devSecondType) || devSecondType==null){
                    System.out.println("000000000065423453454542532");
                    System.out.println("0000000000sdfsdf"+devSecondType);
                    continue;
                }
                String sn = devices.get(l).getDevAuthId();
                String mac = devices.get(l).getDevAuthSecret();
                int devBrandId = devices.get(l).getDevBrandId();
                Map<String, String> map = new HashMap<String, String>();
                String messageStr = "";
                String password="";
                //电易门锁
                if (devBrandId == 10) {
                    String devSpare2 = devices.get(l).getDevSpare2();
                    String devUsername=devices.get(l).getDevUsername();
                    System.out.println("00000000000000devUsername"+devUsername);
                    String devPassword=devices.get(l).getDevPassword();
                    System.out.println("00000000000000devUsername"+devPassword);
                    map.put("brandId", "10");
                    map.put("instruction", "单临密码");
                    map.put("appKey", sn);
                    map.put("secret", mac);
                    map.put("pwdType", "1");
                    map.put("startTime", startTime);
                    map.put("endTime", endTime);
                    map.put("code", devSpare2);
                    map.put("mobile",devUsername);
                    map.put("password",devPassword);
                    System.out.println("map*************************: " + map);
                    String responseText = HttpRequestUtil.post(POSTURL, map);
                    JSONObject jsonObj = new JSONObject();
                    jsonObj = JSONObject.fromObject(responseText);
                    System.out.println("jsonObj:************ " + jsonObj);
                    if (jsonObj.getInt("code") == 1) {
                        password = (String) jsonObj.get("body");
                        messageStr="系统自动向客户:"+name+"+授权开门固定密码为:"+password+",密码有效期至"+endTime;
                    }
                }
                if (devBrandId==20){
                    if (devFirstType==3 && devSecondType==22){
                        password = getCard();
                        messageStr="系统自动向客户:"+name+"+授权开门固定密码为:"+password+",密码有效期至"+endTime;
                    }
                    else if (devFirstType==3 && devSecondType==23) {
                        password = getPwd();
                        messageStr="系统自动向客户:"+name+"+授权开门固定密码为:"+password+",密码有效期至"+endTime;
                    }
                }
                if(!"".equals(messageStr)){
                    //插入门卡密码表
                    JourDoorCard jourDoorCard = new JourDoorCard();
                    jourDoorCard.setJdcHsId(jhdHsId);
                    jourDoorCard.setJdcDeviceId(jdcDevcieId);
                    jourDoorCard.setJdcState("未使用");
                    jourDoorCard.setJdcPassword(password);
                    jourDoorCard.setJdcDeadlineTime(endTime);
                    int numb = jourDoorCardService.insertOneDoorCard(jourDoorCard);
                    if(numb==1){
                        //短信发送
                        String message="系统自动向客户:"+name+"授权开门固定密码,密码有效期至"+endTime;
                        String phone=infoRenewalRenterExpand.getPopTelephone();
                        JournalShortMessage js = new JournalShortMessage();
                        js.setSmNotRentId(jhdHsId);
                        js.setSmState("推送成功");
                        js.setSmType("发送");
                        js.setSmNote(message);
                        js.setSmReceiveNumber(phone);
                        Result<String> result1 = sendShortMessageService.sendMessage(phone, messageStr, js, 2);
                        JSONObject jsonObj1 = new JSONObject();
                    }
                }
            }
            /*
             * 新增已租房
             */
            InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
            /*插入已租信息*/
            infoHouse4rentExpand.setHrSignTime(infoRenewalRenterExpand.getJrrSignedTime());
            infoHouse4rentExpand.setHrHouse4storeId(infoRenewalRenterExpand.getJrrHouse4storeId());
            infoHouse4rentExpand.setHrHouseId(infoRenewalRenterExpand.getHrHouseId());
            infoHouse4rentExpand.setHrHouseDictId(infoRenewalRenterExpand.getHrHouseDictId());
            infoHouse4rentExpand.setHrStorefront(infoRenewalRenterExpand.getJrrStorefront());
            infoHouse4rentExpand.setHrLandlordId(infoRenewalRenterExpand.getHrLandlordId());
            infoHouse4rentExpand.setHrSectionType(infoRenewalRenterExpand.getHrSectionType());
            infoHouse4rentExpand.setHrHouseOwner(infoRenewalRenterExpand.getHrHouseOwner());
            infoHouse4rentExpand.setHrHouseSquare(infoRenewalRenterExpand.getHrHouseSquare());
            infoHouse4rentExpand.setHrSplitIdentifier(infoRenewalRenterExpand.getHrSplitIdentifier());
            infoHouse4rentExpand.setHrAddCity(infoRenewalRenterExpand.getHrAddCity());
            infoHouse4rentExpand.setHrAddDistrict(infoRenewalRenterExpand.getHrAddDistrict());
            infoHouse4rentExpand.setHrAddZone(infoRenewalRenterExpand.getHrAddZone());
            infoHouse4rentExpand.setHrAddStreet(infoRenewalRenterExpand.getHrAddStreet());
            infoHouse4rentExpand.setHrAddCommunity(infoRenewalRenterExpand.getHrAddCommunity());
            infoHouse4rentExpand.setHrAddBuilding(infoRenewalRenterExpand.getHrAddBuilding());
            infoHouse4rentExpand.setHrAddDoorplateno(infoRenewalRenterExpand.getHrAddDoorplateno());
            infoHouse4rentExpand.setHrWaterVolFirst(infoRenewalRenterExpand.getHrWaterVolFirst());
            infoHouse4rentExpand.setHrElectritVolFirst(infoRenewalRenterExpand.getHrElectritVolFirst());
            infoHouse4rentExpand.setHrGasVolFirst(infoRenewalRenterExpand.getHrGasVolFirst());
            infoHouse4rentExpand.setHrHotWaterVolFirst(infoRenewalRenterExpand.getHrHotWaterVolFirst());
            infoHouse4rentExpand.setHrHotAirVolFirst(infoRenewalRenterExpand.getHrHotAirVolFirst());
            infoHouse4rentExpand.setHrBeginTime(infoRenewalRenterExpand.getHrBeginTime());
            infoHouse4rentExpand.setHrTheTerm(infoRenewalRenterExpand.getHrTheTerm());
            infoHouse4rentExpand.setHrEndTime(infoRenewalRenterExpand.getHrEndTime());
            infoHouse4rentExpand.setHrHousePrice(infoRenewalRenterExpand.getHrHousePrice());
            infoHouse4rentExpand.setHrHouseDeposit(infoRenewalRenterExpand.getHrHouseDeposit());
            infoHouse4rentExpand.setHrDoorDeposit(infoRenewalRenterExpand.getHrDoorDeposit());
            infoHouse4rentExpand.setHrPowerDeposit(infoRenewalRenterExpand.getHrPowerDeposit());
            infoHouse4rentExpand.setHrOtherDeposit(infoRenewalRenterExpand.getHrOtherDeposit());
            infoHouse4rentExpand.setHrDoorTrendFee(infoRenewalRenterExpand.getHrDoorTrendFee());
            infoHouse4rentExpand.setHrComServiceFee(infoRenewalRenterExpand.getHrComServiceFee());
            infoHouse4rentExpand.setHrPaymentType(infoRenewalRenterExpand.getHrPaymentType());
            infoHouse4rentExpand.setHrUserId(infoRenewalRenterExpand.getHrUserId());
            infoHouse4rentExpand.setHrAdminUserId(infoRenewalRenterExpand.getHrAdminUserId());
            infoHouse4rentExpand.setHrHouseNote(infoRenewalRenterExpand.getHrHouseNote());
            infoHouse4rentExpand.setHrDepartment(infoRenewalRenterExpand.getJrrDepartment());
            infoHouse4rentExpand.setHrWaterPlan(infoRenewalRenterExpand.getHrWaterPlan());
            infoHouse4rentExpand.setHrElectritPlan(infoRenewalRenterExpand.getHrElectritPlan());
            infoHouse4rentExpand.setHrGasPlan(infoRenewalRenterExpand.getHrGasPlan());
            infoHouse4rentExpand.setHrHotwaterPlan(infoRenewalRenterExpand.getHrHotwaterPlan());
            infoHouse4rentExpand.setHrHotairPlan(infoRenewalRenterExpand.getHrHotairPlan());
            infoHouse4rentExpand.setHrWifiCharge(infoRenewalRenterExpand.getHrWifiCharge());
            infoHouse4rentExpand.setHrTvCharge(infoRenewalRenterExpand.getHrTvCharge());
            infoHouse4rentExpand.setHrOtherPay(infoRenewalRenterExpand.getHrOtherPay());
            infoHouse4rentExpand.setHrManagerUserId(infoRenewalRenterExpand.getHrManagerUserId());
            infoHouse4rentExpand.setHrFlatShareLogo(infoRenewalRenterExpand.getHrFlatShareLogo());
			System.out.println(infoHouse4rentExpand);
            int value = infoHouse4rentMapper.insertSelective(infoHouse4rentExpand);
            hrId = infoHouse4rentExpand.getHrId(); //已租房id
            System.out.println(hrId);
			System.out.println(infoRenewalRenterExpand.getTemplateFillValue());
			JSONObject json = JSONObject.fromObject(infoRenewalRenterExpand.getTemplateFillValue());
			JSONObject jsonObject = json.getJSONObject("insertData");
			String jciBillJson1 = jsonObject.getString("jciBillJson");
			String billJson = jciBillJson1.replace("/", "");
			billJson = billJson.substring(1,billJson.length()-1);
			System.out.println(billJson);
			//拼接jciBillJson
            JSONArray jciBillJson= JSONArray.fromObject(billJson);
            for(int i=0;i<jciBillJson.size();i++){
                jciBillJson.getJSONObject(i).put("jciHouse4rentId",'"'+hrId+'"');
            }
            infoHouse4rentExpand.setJciBillJson(jciBillJson.toString());

            System.out.println(jciBillJson);
            //水电气读数
            Double waterVolFirst = infoRenewalRenterExpand.getHrWaterVolFirst();
            Double electritVolFirst = infoRenewalRenterExpand.getHrElectritVolFirst();
            Double gasVolFirst = infoRenewalRenterExpand.getHrGasVolFirst();
            //tzl
            Double hotWaterVolFirst = infoRenewalRenterExpand.getHrHotWaterVolFirst();
            Double hotAirVolFirst = infoRenewalRenterExpand.getHrHotAirVolFirst();

            //拼接json字段
            meterReadingRecord = "{'water':{'lastReading':'"+waterVolFirst+"','thisReading':[]},"
                    +"'electrit':{'lastReading':'"+electritVolFirst+"','thisReading':[]},"
                    + "'gas':{'lastReading':'"+gasVolFirst+"','thisReading':[]},"
                    + "'hotwater':{'lastReading':'"+hotWaterVolFirst+"','thisReading':[]},"
                    +"'hotair':{'lastReading':'"+hotAirVolFirst+"','thisReading':[]}}";
            boolean numType = false;
            if(waterVolFirst != null && waterVolFirst != 0 && !"".equals(waterVolFirst)){
                numType = true;
            }
            if(electritVolFirst != null && electritVolFirst != 0 && !"".equals(electritVolFirst)){
                numType = true;
            }
            if(gasVolFirst != null && gasVolFirst != 0 && !"".equals(gasVolFirst)){
                numType = true;
            }
            //tzl
            if(hotWaterVolFirst != null && hotWaterVolFirst != 0 && !"".equals(hotWaterVolFirst)){
                numType = true;
            }
            if(hotAirVolFirst != null && hotAirVolFirst != 0 && !"".equals(hotAirVolFirst)){
                numType = true;
            }

            if(value==0){
                throw new Exception("新增已租房失败-------------------------------");
            }else{
                /*
                 * 未租房修改
                 */
                if(numType == false){
                    meterReadingRecord = null;
                }
                InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
                hs.setHsMeterReadingRecord(meterReadingRecord);
                hs.setHsId(infoHouse4rentExpand.getHrHouse4storeId());
                hs.setHsLeaseState("已租");
                hs.setHsMicronetIdentification(1);
                hs.setHsTransactionPrice(infoHouse4rentExpand.getJrrMoney());
                int value1 = infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
                if(value1 == 0){
                    throw new Exception("未租房水电气存储字段数据添加失败--------------------------");
                }
                if(numType){
                    List<JournalWegReading> wegList = new ArrayList<>();
                    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
                    String today = df.format(new Date());
                    System.out.println(today+"**********************");
                    for(int i = 0; i<5;++i){
                        JournalWegReading jwr = new JournalWegReading();
                        //获取下已租单时的当前时间 存到抄表时间里
                        jwr.setWegrdMonth(today);
                        jwr.setWegrdRenterId(infoHouse4rentExpand.getHrRenterId());
                        jwr.setWegrdHouse4rentId(hrId);
                        jwr.setWegrdHouse4storeId(infoHouse4rentExpand.getHrHouse4storeId());
                        jwr.setWegrdUserId(infoHouse4rentExpand.getHrUserId());
                        jwr.setWegrdDoUserId(infoHouse4rentExpand.getHrUserId());
                        jwr.setWegrdDepartment(infoHouse4rentExpand.getHrDepartment());
                        jwr.setWegrdStorefront(infoHouse4rentExpand.getHrStorefront());
                        jwr.setWegrdNature("交房抄表");
                        if(i == 0){
                            jwr.setWegrdNums(waterVolFirst);
                            jwr.setWegrdCostWays(infoHouse4rentExpand.getHrWaterPlan());
                            jwr.setWegrdType("水表");
                        }else if(i == 1){
                            jwr.setWegrdNums(electritVolFirst);
                            jwr.setWegrdCostWays(infoHouse4rentExpand.getHrElectritPlan());
                            jwr.setWegrdType("电表");
                        }else if(i == 2){
                            jwr.setWegrdNums(gasVolFirst);
                            jwr.setWegrdCostWays(infoHouse4rentExpand.getHrGasPlan());
                            jwr.setWegrdType("燃气表");
                        }else if(i == 3){//tzl
                            jwr.setWegrdNums(hotWaterVolFirst);
                            jwr.setWegrdCostWays(infoHouse4rentExpand.getHrHotwaterPlan());
                            jwr.setWegrdType("热水表");
                        }else {
                            jwr.setWegrdNums(hotAirVolFirst);
                            jwr.setWegrdCostWays(infoHouse4rentExpand.getHrHotairPlan());
                            jwr.setWegrdType("暖气表");
                        }
                        wegList.add(jwr);
                    }
                    //未租房水电气存储字段数据添加
                    int result3 = journalWegReadingMapper.signingRentWegReading(wegList);
                    if(result3 == 0){
                        throw new Exception("抄表水电气数据添加失败-------------------------------");
                    }
                }
            }
            /*
             * 把租客ID写到已租房
             */
			InfoPopulation ip = new InfoPopulation();
			System.out.println(infoRenewalRenterExpand.getPopIdcard());
			ip.setPopIdcard(infoRenewalRenterExpand.getPopIdcard());
			List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(ip);
			InfoRenterExpand re = new InfoRenterExpand();
			re.setRenterPopulationId(list.get(0).getPopId());
			System.out.println(re);
			List<InfoRenterExpand> relist = infoRenterMapper.selectAll(re);
            InfoHouse4rentExpand hr = new InfoHouse4rentExpand();
            hr.setHrId(hrId);
			System.out.println(relist);
			System.out.println(relist.get(0).getRenterId());
            hr.setHrRenterId(relist.get(0).getRenterId());
            int result4 = infoHouse4rentMapper.updateByPrimaryKeySelective(hr);
            if(result4 == 0){
                throw new Exception("把租客ID写到已租房失败------------------------------");
            }
            //添加租客合约表
			infoRenewalRenterExpand.setJrrHouse4rentId(hrId);
            infoRenewalRenterExpand.setJrrRenterId(relist.get(0).getRenterId());
			//添加合同
			int result = infoRenewalRenterMapper.insertSelective(infoRenewalRenterExpand);
			if(result == 0){
				throw new Exception("新增0条续签合约");
			}
            Integer jrrId = infoRenewalRenterExpand.getJrrId();
            //新增分期账单
            List<InfoContractInstallment> ici = new ArrayList<InfoContractInstallment>();
			String taskTimeConsumingJson = jsonObject.getString("taskTimeConsumingJson");
			System.out.println(taskTimeConsumingJson);
			taskTimeConsumingJson = taskTimeConsumingJson.replace("/", "");
			taskTimeConsumingJson = taskTimeConsumingJson.substring(1,taskTimeConsumingJson.length()-1);
//            String taskTimeConsumingJson = infoRenewalRenterExpand.getTaskTimeConsumingJson();
            JSONArray tcJson =JSONArray.fromObject(taskTimeConsumingJson);
            for (Object a : tcJson) {
                JSONObject jsonObj = (JSONObject)a;
                InfoContractInstallment jf = (InfoContractInstallment) JSONObject.toBean(jsonObj, InfoContractInstallment.class);
				System.out.println(jf);
				System.out.println(hrId);
                jf.setJciHouse4rentId(hrId);
                jf.setJciRenterId(relist.get(0).getRenterId());
                jf.setJciRentContId(jrrId);
                jf.setJciMessageTime(null);
                jf.setJciType("租客租金");
                if(jf.getJciPeriods() == 1){
                    jf.setJciLabelType(3);
                    System.out.println(infoHouse4rentExpand.getJciBillJson());
                    jf.setJciBillJson(infoHouse4rentExpand.getJciBillJson());
                }
                ici.add(jf);
            }
            int result6 = infoContractInstallmentMapper.insertList(ici);
            if(result6 == 0){
                throw new Exception("新增分期账单失败--------------------");
            }
            //是否有租客意向人id传入
            Integer ipId = infoHouse4rentExpand.getIpId();
            if(ipId != null && !ipId.equals("")){
                InfoIntendedPerson infoIntended = new InfoIntendedPerson();
                infoIntended.setIpId(ipId);
                infoIntended.setIpState("我租");
                int result5 = infoIntendedPersonMapper.updateByPrimaryKeySelective(infoIntended);
                if(result5 == 0){
                    throw new Exception("是否有租客意向人id传入失败------------------------------");
                }
            }
            /*
             * 添加业绩受益人
             */
            List<InfoTransactionAssistance> recordList = new ArrayList<InfoTransactionAssistance>();
			String jsonArray = jsonObject.getString("jsonArray");
			System.out.println(jsonArray);
			System.out.println(jsonArray);
			jsonArray = jsonArray.replace("/", "");
			jsonArray = jsonArray.substring(1,jsonArray.length()-1);
//            String jsonArray = infoHouse4rentExpand.getJsonArray();
            JSONArray ja =JSONArray.fromObject(jsonArray);
            for (Object a : ja) {
                JSONObject jsonObj = (JSONObject)a;
                InfoTransactionExpand jf = (InfoTransactionExpand) JSONObject.toBean(jsonObj, InfoTransactionExpand.class);
                jf.setAssistHouse4rent(hrId);
                jf.setAssistHouse4store(infoHouse4rentExpand.getJrrHouse4storeId());
                recordList.add(jf);
            }
            if (recordList.size() > 0) {
                int result5 = itamMapper.insertTAList(recordList);
                if(result5 == 0){
                    throw new Exception("添加业绩受益人失败--------------------");
                }
            }
            //迁移资产
            SysAssetsExpand sysAssetsExpand = new SysAssetsExpand();
			String moveAsset = jsonObject.getString("moveAsset");
			System.out.println(moveAsset);
			moveAsset = moveAsset.replace("/", "");
			moveAsset = moveAsset.substring(1,moveAsset.length()-1);
            sysAssetsExpand.setJsonArray(moveAsset);
            sysAssetsService.moveById(sysAssetsExpand);

            JSONObject jsonObj = new JSONObject();
            jsonObj.accumulate("hrId", hrId);
            String str = jsonObj.toString();

			//下定金和退定金生成收支
			System.out.println(infoRenewalRenterExpand.getHsDepositAmount());
            if(null != infoRenewalRenterExpand.getHsDepositAmount() && !"".equals(infoRenewalRenterExpand.getHsDepositAmount()) && !"null".equals(infoRenewalRenterExpand.getHsDepositAmount()) && "0".equals(infoRenewalRenterExpand.getHsDepositAmount())){
                int results = 0;
                List<JournalFinancial> list2 = new ArrayList<JournalFinancial>();
                String strid = "";
                String jsonStrArry = jsonObject.getString("jsonStrArry");
                System.out.println(jsonStrArry);
                System.out.println(jsonStrArry);
                jsonStrArry = jsonStrArry.replace("/", "");
                jsonStrArry = jsonStrArry.substring(1,jsonStrArry.length()-1);
//            String jsonArray = infoHouse4rentExpand.getJsonArray();
                JSONArray jsa =JSONArray.fromObject(jsonStrArry);
                System.out.println("收支信息");
                System.out.println(jsa);
                for (Object a : jsa) {
                    JSONObject jsonObj2 = (JSONObject)a;
                    JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj2, JournalFinancial.class);
                    jf.setJfFinanNote(jf.getJfAccountingWhy()
                            + "房进行出房操作,变为已租房。将租客意向人 "+ jf.getJfBelongingToTheName() +"的定金 "+jf.getJfSumMoney()
                            +"元进行退还。");
                    jf.setJfHouse4rentId(hrId);
					System.out.println("输出收支信息：");
					System.out.println(jf);
                    if("".equals(jf.getJfStartCycle())){
                        jf.setJfStartCycle(CommonMethodClass.getCurrentDate());
                    }
                    if("".equals(jf.getJfEndCycle())){
                        jf.setJfEndCycle(CommonMethodClass.getCurrentDate());
                    }
                    list2.add(jf);
                }
                list2 = setManagerUserId(list2);
                try {
                    results = financialService.insertList(list2 , 0);
                    System.out.println("results:"+results);
                } catch (Exception e) {
                    e.printStackTrace();Syslog.writeErr(e);
                }
                InfoHouse4storeExpand hs2 = new InfoHouse4storeExpand();
                hs2.setHsId(infoRenewalRenterExpand.getJrrHouse4storeId());
                hs2.setHsDownDeposit("否");
                hs2.setHsDepositAmount(0.00);
                hs2.setHsIntentionalId(null);
                hs2.setHsSalesmanId(null);
                hs2.setHsStartDate(null);
                hs2.setHsEndDate(null);
                hs2.setHsDespositAccount(null);
                hs2.setHsPopId(null);
                try {
                    int resuslt2=0;
                    int result8 = houseForStoreService.clearDeposit(hs2);
                    InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
                    if(infoHouse4storeExpand.getSplitFlag()!=null){
                        resuslt2 = jourEarnestMoneyService.updateDepositState(infoRenewalRenterExpand.getJrrHouse4storeId(),infoHouse4storeExpand.getSplitFlag());
                    }else {
                        resuslt2 = jourEarnestMoneyService.updateDepositState(infoRenewalRenterExpand.getJrrHouse4storeId(),1);
                    }
                    if (resuslt2 <=0){
                        System.out.println("失败");
                    }
                    if (result8 == 0) {
                        System.out.println("失败");
                    } else {
                        System.out.println("成功");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    Syslog.writeErr(e);
                }
            }



            //写系统跟进
            String houseforRentFollowRemark = "电子签约：未租房" + hrId + "新签成功。";
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
            }

            String[] resultStr = new String[2];
            resultStr[0] = wxgzhImgPath;
            resultStr[1] = jobj2.toString();
            return resultStr;
        }else{
			//添加合同
			int result = infoRenewalRenterMapper.insertSelective(infoRenewalRenterExpand);
			if(result == 0){
				throw new Exception("新增0条续签合约");
			}
            System.out.println("进入续签");
            //添加账单
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
            }

            //更新已租表最新签约时间、租赁到期时间、房屋押金、租金
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
            }

            String[] resultStr = new String[2];
            resultStr[0] = wxgzhImgPath;
            resultStr[1] = jobj2.toString();
            return resultStr;
        }
	}
	
	/**
	 * 生成临时账单json串
	 * @return
	 */
	private String getBillJosn(InfoContractInstallment ici){
		JSONObject jobj = new JSONObject();
		jobj.accumulate("jciRegisterPeople", ici.getJciRegisterPeople());
		jobj.accumulate("jciHouse4rentId", ici.getJciHouse4rentId());
		jobj.accumulate("jciHouse4storeId", ici.getJciHouse4storeId());
		jobj.accumulate("jciDepartment", ici.getJciDepartment());
		jobj.accumulate("jciStorefront", ici.getJciStorefront());
		jobj.accumulate("jciLandlordId", ici.getJciLandlordId());
		jobj.accumulate("jciRenterId", ici.getJciRenterId());
		jobj.accumulate("jciFukuanri", ici.getJciFukuanri());
		jobj.accumulate("jciNature", "应收");
		jobj.accumulate("jciType", "租客租金");
		jobj.accumulate("jciMoney", ici.getJciMoney());
		jobj.accumulate("jciRemark", "");
		jobj.accumulate("jciLabelType", "1");
		jobj.accumulate("nature", "收入");
		jobj.accumulate("classification", "押金类");
		jobj.accumulate("species", "房屋押金");
		jobj.accumulate("random", (int)((Math.random()*9+1)*10000000));
		
		String billJson = "["+jobj.toString()+"]";
		
		return billJson;
	}
	
	/**
	 * 生成短信内容
	 */
	private String getMessageNote(Double houseDeposit){
		
		JSONObject sys = new JSONObject();
		sys.accumulate("rent", "");
		sys.accumulate("water", "");
		sys.accumulate("elect", "");
		sys.accumulate("gas", "");
		sys.accumulate("owe", "");
		sys.accumulate("tv", "");
		sys.accumulate("wifi", "");
		sys.accumulate("manager", "");
		sys.accumulate("server", "");
		sys.accumulate("other", "");
		sys.accumulate("power", "");
		sys.accumulate("damages", "");
		sys.accumulate("total", "");
		
		JSONObject msg = new JSONObject();
		msg.accumulate("rent", houseDeposit);
		msg.accumulate("water", "");
		msg.accumulate("elect", "");
		msg.accumulate("gas", "");
		msg.accumulate("owe", "");
		msg.accumulate("tv", "");
		msg.accumulate("wifi", "");
		msg.accumulate("manager", "");
		msg.accumulate("server", "");
		msg.accumulate("other", "");
		msg.accumulate("power", houseDeposit);
		msg.accumulate("damages", "");
		msg.accumulate("total", houseDeposit);
		
		JSONObject jciMessageNoteObject = new JSONObject();
		jciMessageNoteObject.accumulate("sys", sys);
		jciMessageNoteObject.accumulate("msg", msg);
		jciMessageNoteObject.accumulate("note", ""); //短信内容
		jciMessageNoteObject.accumulate("waterThis", "");
		jciMessageNoteObject.accumulate("electThis", "");
		jciMessageNoteObject.accumulate("gasThis", "");
		jciMessageNoteObject.accumulate("waterLast", "");
		jciMessageNoteObject.accumulate("electLast", "");
		jciMessageNoteObject.accumulate("gasLast", "");
		jciMessageNoteObject.accumulate("waterDate", "");
		jciMessageNoteObject.accumulate("electDate", "");
		jciMessageNoteObject.accumulate("gasDate", "");
		
		String jciMessageNote =  jciMessageNoteObject.toString();
		return jciMessageNote;
	}
	
	/**
	 * 获取当前时间 年月日格式
	 * @return
	 */
	private String getTime(){
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
		String time = sdf.format(date);
		return time;
	}

	@Override
	public int checkResult(JournalElectronicContractExpansion jece) throws Exception {
		int result = checkContractState(jece);
		return result;
	}

	@Override
	public List<JournalElectronicContractExpansion> listContract(JournalElectronicContractExpansion jece)
			throws Exception {
		System.out.println(jece);
		List<JournalElectronicContractExpansion> list = jourElectronicContractMapper.listContract(jece);
		return list;
	}

	@Override
	public Result<String> updateContract(JournalElectronicContractExpansion jece) throws Exception {
		int result = jourElectronicContractMapper.updateByPrimaryKeySelective(jece);
		if(result > 0){
			return new Result<>(1,"成功",null);
		}else{
			return new Result<>(-1,"注销失败",null);
		}
	}
    public static String getCard(){
        Random rand=new Random();//生成随机数
        String cardNnumer="";
        for(int a=0;a<8;a++){
            cardNnumer+=rand.nextInt(10);//生成8位数字
        }
        return cardNnumer;
    }

    public static String getPwd() {
        String password = getCard().substring(0,6);
        String arr[] = password.split("");
        String newpwd ="";
        for (int i = 0; i < arr.length; i++) {
            newpwd += Integer.parseInt(arr[i]) + 30;
        }
        return newpwd;
    }
	/**
	 * 给每条收支绑定房管员，有已租id的绑已租房管员，有未租id的绑未租房管员
	 * @param list
	 * @return
	 */
	private List<JournalFinancial> setManagerUserId(List<JournalFinancial> list){
		try {
			for (JournalFinancial item: list) {
				if (item.getJfHouse4rentId() != null) {
					InfoHouse4rentExpand hr = new InfoHouse4rentExpand();
					hr.setHrId(item.getJfHouse4rentId());
					List<InfoHouse4rentExpand> hrList = houseForRentService.queryHouseRentCommon(hr);
					item.setJfManagerUserId(hrList.get(0).getHrManagerUserId());
				} else if (item.getJfHouse4storeId() != null) {
					InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
					hs.setHsId(item.getJfHouse4storeId());
					List<InfoHouse4storeExpand> hsList = houseForStoreService.queryHouseStoreCommon(hs);
					item.setJfManagerUserId(hsList.get(0).getHsManagerUserId());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
		return list;
	}

}
