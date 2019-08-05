package com.zz.actions.commons;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import au.com.bytecode.opencsv.CSVReader;
import com.opensymphony.xwork2.ActionContext;
import com.zz.other.Syslog;
import com.zz.po.commons.ImportAttr;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoHouseExpand;
import com.zz.po.info.InfoIntendedPerson;
import com.zz.po.info.InfoLandlordExpand;
import com.zz.po.info.InfoLandlordIntentionPerson;
import com.zz.po.info.InfoPopulation;
import com.zz.po.info.InfoRenewalLandlordExpand;
import com.zz.po.info.InfoRenterExpand;
import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.info.InfoContractInstallment;
import com.zz.po.info.InfoRenewalRenterExpand;
import com.zz.po.info.InfoRenter;
import com.zz.po.journal.JournalContractDatabase;
import com.zz.po.sys.SysHouseDict;
import com.zz.po.sys.SysHouseDictExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.info.ContractInstallmentService;
import com.zz.service.info.HouseForRentService;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.info.HouseService;
import com.zz.service.info.IntendedPersonService;
import com.zz.service.info.LandlordIntentionPersonService;
import com.zz.service.info.LandlordService;
import com.zz.service.info.PopulationService;
import com.zz.service.info.RenterService;
import com.zz.service.info.RenewalLandlordService;
import com.zz.service.info.RenewalRenterService;
import com.zz.service.journal.ContractDatabaseService;
import com.zz.service.sys.HouseDictService;
import com.zz.service.sys.UserService;


public class CsvUploadAction extends BaseAction {
	private ImportAttr importAttr;
	private HouseService houseService;
	private HouseForRentService houseForRentService;
	private HouseForStoreService houseForStoreService;
	private LandlordService landlordService;
	private RenterService renterService;
	private RenewalLandlordService renewalLandlordService;
	private RenewalRenterService renewalRenterService;
	private HouseDictService houseDictService;
	private ContractInstallmentService contractInstallmentService;
	private LandlordIntentionPersonService landlordIntentionPersonService;
	private PopulationService populationService;
	private UserService userService;
	private IntendedPersonService intendedPersonService;
	private ContractDatabaseService contractDatabaseService;
	private String renewalNum;
	
	public void setContractDatabaseService(
			ContractDatabaseService contractDatabaseService) {
		this.contractDatabaseService = contractDatabaseService;
	}
	public void setIntendedPersonService(IntendedPersonService intendedPersonService) {
		this.intendedPersonService = intendedPersonService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	public void setPopulationService(PopulationService populationService) {
		this.populationService = populationService;
	}
	public void setLandlordIntentionPersonService(
			LandlordIntentionPersonService landlordIntentionPersonService) {
		this.landlordIntentionPersonService = landlordIntentionPersonService;
	}
	
	//方法
	public String execute() throws Exception {
		System.out.println("laikkkkkkkkk");
		//String[] sum = aja.resources().split(",");
		//用户ID、所属部门、所属分店
//		int userId = Integer.parseInt(sum[0]);
//		int department = Integer.parseInt(sum[1]);
//		int storefront = Integer.parseInt(sum[2]);
		int userId = 1;
		int department = 1;
		int storefront = 1;
		
//		int userId = 6;
//		if(importAttr.getUserId() != null){
//			userId = importAttr.getUserId();
//		}
//		int storefront = 1;
//		if(importAttr.getStorefront() != null){
//			storefront = importAttr.getStorefront();
//		}
//		int department = 5;
//		if(importAttr.getDepartment() != null){
//			department = importAttr.getDepartment();
//		}
		System.out.println("登记人 ："+userId+"==="+department+"==="+storefront);
		CSVReader csvReader = null;
		BufferedReader bufferdReader = null;
		//标记文件行数
		int row = 0;
		//统计插入数据的数量 
		int finallyrow = 0;
		//记录出错的行数
		StringBuffer msg = new StringBuffer();
		try { 
			//读取文件流
			bufferdReader = new BufferedReader(
				new InputStreamReader(new FileInputStream(importAttr.getMyFile()),"GB2312"));
		} catch (IOException e) {
	        e.printStackTrace();
			Syslog.writeErr(e);
	    }
        csvReader = new CSVReader(bufferdReader,',');
        if(csvReader != null){
        	//读取头一行
            String[] csvRow = csvReader.readNext();
            let_continue://标记
            //开始读取数据，确定接收值的返回变量，生成所需的po类
            while ((csvRow = csvReader.readNext()) != null){
            	//楼盘字典id
                Integer hdId = null;
            	String Sdate = "", Edate = "", strJcdId = "";
            	Integer houseId = null, landlordId = null, renterId = null, jrrid = null;
            	Integer house4storeId = null, house4rentId = null, jrlid = null;
        		int result1 = 0, result2 = 0, result8 = 0, result3 = 0, result4 = 0, result5 = 0, result6 = 0, result7 = 0, result9 = 0, result10=0, result11=0;
        		Integer popId = null, lipId = null, ipId = null;
        		Integer laPopId = null, rePopId = null, jcdId = null;
        		Integer housingDepartment = null, storeStore = null, houseOwnerId = null; //存房人部门、区域、id
        		Integer outDepartment = null, outStore = null, outHouseManId = null;//出房人部门、区域、id
            	InfoHouseExpand infoHouse = new InfoHouseExpand();//盘源表
        		InfoHouse4rentExpand infoHouse4rent = new InfoHouse4rentExpand();//已租表
        		InfoHouse4storeExpand infoHouse4store = new InfoHouse4storeExpand();//未租表
        		InfoRenterExpand infoRenter = new InfoRenterExpand();//租客表
        		InfoLandlordExpand infoLandlord = new InfoLandlordExpand();//房东表
        		InfoRenewalRenterExpand journalRenewalRenter = new InfoRenewalRenterExpand();//租客合约
        		InfoRenewalLandlordExpand infoRenewalLandlord = new InfoRenewalLandlordExpand();//房东合约
        		SysHouseDictExpand sysHouseDict = new SysHouseDictExpand();//楼盘字典
        		InfoLandlordIntentionPerson infoLandlordIntentionPerson = new InfoLandlordIntentionPerson();//房东意向人
        		InfoIntendedPerson infoIntendedPerson = new InfoIntendedPerson();//租客意向人
        		InfoPopulation landInfoPopulation = new InfoPopulation();//房东人口表
        		InfoPopulation rentInfoPopulation = new InfoPopulation();//租客人口表
        		SysUserExpand sysUserExpand = new SysUserExpand();//用户表
        		InfoContractInstallmentExpand ice = new InfoContractInstallmentExpand();//分期账单表
        		
            	//System.out.println("csvRow.length:"+csvRow.length+"\n"+csvRow[csvRow.length-1]);
            	//判断读取的行，值是否为空
            	if(!"".equals(csvRow)){
            		System.out.println("进来了11111");
            		//记录列数
            		int mark = 0;
            		row++;
            		//值的长度是否是制定的长度，不等于则值的格式有误，记录当前的行数。继续读取下一行
            		//System.out.println("列len:"+csvRow.length);
            		while(csvRow.length != 29){
            			msg.append(row+"-");
            			csvRow = csvReader.readNext();
            			row++;
            		}
            		//取值放入po类中
	                for (int i =0; i<csvRow.length; i++){
	                    String csvData = csvRow[i];
	                    switch (i) {
	                        case 0:  
	                        	//楼盘字典ID	                 
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print("第"+row+"行的第"+(i+1)+"值："+csvData+"--");
	                        		try{
	                        			infoHouse.setHouseDictId(Integer.parseInt(csvData));//盘源
		                        		infoHouse4store.setHsHouseDictId(Integer.parseInt(csvData));//未租
		    		                    infoHouse4rent.setHrHouseDictId(Integer.parseInt(csvData));//已租
		                        		hdId = Integer.parseInt(csvData);//楼盘字典
	                        		}catch(NumberFormatException ne){
	                        			ne.getStackTrace();
	                        			msg.append(row+"-");
	                        			continue let_continue;
	                        		}
	                        		mark++;
	                        	}else{
	                        		msg.append(row+"-");
                        			continue let_continue;
	                        	}
	                            break;  
	                        case 1:  
	                        	//楼栋
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		infoHouse.setAddBuilding(csvData);//盘源
	                        		infoHouse4store.setHsAddBuilding(csvData);//未租
	                        		infoHouse4rent.setHrAddBuilding(csvData);//已租
	                        		mark++;
	                        	}
	                            break;
	                        case 2:  
	                        	//门牌号
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		infoHouse.setAddDoorplateno(csvData);//盘源
	                        		infoHouse4store.setHsAddDoorplateno(csvData);//未租
	                        		infoHouse4rent.setHrAddDoorplateno(csvData);//已租
	                        		mark++;
	                        	}
	                            break;
	                        case 3:  
	                        	//房东姓名
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		landInfoPopulation.setPopName(csvData);//房东人口表
	                        		infoLandlordIntentionPerson.setLipLandlordName(csvData);//房东意向人
	                        		mark++;
	                        	}
	                            break;
	                        case 4:  
	                        	//身份证
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		landInfoPopulation.setPopIdcard(csvData);//房东人口表
	                        		mark++;
	                        	}
	                            break;  
	                        case 5:  
	                        	//房东电话
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		landInfoPopulation.setPopTelephone(csvData);//房东人口表
	                        		infoLandlordIntentionPerson.setLipLandlordPhone(csvData);//房东意向人
	                        		mark++;
	                        	}
	                            break;
	                        case 6:  
	                        	//*银行名称
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		infoHouse4store.setHsBankType(csvData);//未租
	                        		mark++;
	                        	}
	                            break;
	                        case 7:  
	                        	//银行卡号
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		infoHouse4store.setHsBankNum(csvData);//未租
	                        		mark++;
	                        	}
	                            break;
	                        case 8:  
	                        	//转款人姓名
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		infoHouse4store.setHsBankName(csvData);//未租
	                        		mark++;
	                        	}
	                            break;
	                        case 9:  
	                        	//房东合约开始时间
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		//时间格式转化
	                        		String btime = CommonMethodClass.changeDateFormat(csvData);
	                        		infoRenewalLandlord.setJrlBeginTime(btime);//房东合约
	                        		infoHouse4store.setHsBeginTime(btime);//未租
	                        		Sdate = btime;
	                        		mark++;
	                        	}
	                            break;
	                        case 10:  
	                        	//房东合约结束时间
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		//时间格式转化
	                        		String etime = CommonMethodClass.changeDateFormat(csvData);
	                        		infoRenewalLandlord.setJrlEndTime(etime);//房东合约
	                        		infoHouse4store.setHsEndTime(etime);//未租
	                        		Edate = etime;
	                        		mark++;
	                        	}
	                            break;                         
	                        case 11:  
	                        	//存房人
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		sysUserExpand.setSuStaffName(csvData);
	                        		int name = 1;
	                        		List<SysUserExpand> userlise = userService.selectByPrimaryKey(sysUserExpand);
	                        		if(userlise.size() != 0){
	                        			name = userlise.get(0).getUserId();
	                        			houseOwnerId = name;
	                        			housingDepartment = userlise.get(0).getSuDepartmentId();
	                        			storeStore = userlise.get(0).getSuStoreId();
	                        		}                        
	                        		infoHouse4store.setHsAdminUserId(name);//未租
	                        		mark++;
	                        	}
	                            break;
	                        case 12:  
	                        	//房东合同编号
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		infoRenewalLandlord.setJrlRenewalCoding(csvData);//房东合约
	                        		mark++;
	                        	}
	                            break;
	                        case 13:  
	                        	//合同性质
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		infoRenewalLandlord.setJrlContractType(csvData);//房东合约
	                        		mark++;
	                        	}
	                            break;
	                        case 14:  
	                        	//托管价格
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		Double money = Double.valueOf(csvData);
	                        		mark++;
	                        	}
	                            break;
	                        case 15:  
	                        	//免租天数
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		int daynum = Integer.parseInt(csvData);
	                        		infoRenewalLandlord.setJrlRentFreeDays(daynum);//房东合约
	                        		infoHouse4store.setHsRentHoliday(daynum);//未租
	                        		mark++;
	                        	}
	                            break;
	                        case 16:
	                        	//免租期时段
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		//System.out.println("我要的值："+Sdate+"---"+Edate+"---"+csvData);
	                        		String str = CommonMethodClass.rentFreeTime(Sdate, Edate, csvData);
	                        		System.out.println("我要的值："+str);
	                        		if(!str.equals("")){
		                        		infoRenewalLandlord.setJrlRentFreeSegment(str);//房东合约
		                        		mark++;
	                        		}
	                        	}
	                            break;
	                        case 17:  
	                        	//阶梯价格
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		String[] str = csvData.split(",");
	                        		String priceladder = "";
	                        		for(int k = 0; k < str.length; ++k){
	                        			if(k != str.length-1){
	                        				priceladder += str[k]+",";
	                        			}else{
	                        				priceladder += str[k];
	                        			}
	                        		}
	                        		infoRenewalLandlord.setJrlPriceLadder(priceladder);//房东合约
	                        		mark++;
	                        	}
	                            break;
	                        case 18:  
	                        	//房东缴费方式
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		infoRenewalLandlord.setJrlPaymentMethod(csvData);//房东合约
	                        		infoHouse4store.setHsPaymentType(csvData);//未租
	                        		mark++;
	                        	}
	                            break;	                        
	                        case 19:  
	                        	//租客姓名
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		rentInfoPopulation.setPopName(csvData);//租客人口表
	                        		mark++;
	                        	}
	                            break;
	                        case 20:  
	                        	//身份证
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		rentInfoPopulation.setPopIdcard(csvData);//租客人口表
	                        		mark++;
	                        	}
                            break;
                            case 21:  
                            	//电话
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		rentInfoPopulation.setPopTelephone(csvData);//租客人口表
	                        		mark++;
	                        	}
	                            break;
                           case 22:  
	                        	//租客合约编号
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		journalRenewalRenter.setJrrRenewalCoding(csvData);//租客合约
	                        		mark++;
	                        	}
	                            break;
	                        case 23:  
	                        	//租客合约开始时间
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		//时间格式转化
	                        		String bt = CommonMethodClass.changeDateFormat(csvData);
	                        		journalRenewalRenter.setJrrBeginTime(bt);//租客合约
	                        		infoHouse4rent.setHrBeginTime(bt);//已租
	                        		mark++;
	                        	}
	                            break;
	                        case 24:  
	                        	//租客合约结束时间
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		//时间格式转化
	                        		String et = CommonMethodClass.changeDateFormat(csvData);
	                        		journalRenewalRenter.setJrrEndTime(et);//租客合约
	                        		infoHouse4rent.setHrEndTime(et);//已租
	                        		mark++;
	                        	}
	                            break;
	                        case 25:  
	                        	//租金
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"--");
	                        		try{
	                        			Double numrmoney = Double.parseDouble(csvData);
	                        			journalRenewalRenter.setJrrMoney(numrmoney);//租客合约
	                        			infoHouse4rent.setHrHousePrice(numrmoney);//已租
	                        		}catch(NumberFormatException ne){
	                        			ne.getStackTrace();
	                        			msg.append(row+"-");
	                        			continue let_continue; 
	                        		}
	                        		mark++;
	                        	}
	                            break;  
	                        case 26:  
	                        	//缴费方式
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"-- \n");
	                        		journalRenewalRenter.setJrrPaymentMethod(csvData);//租客合约
	                        		infoHouse4rent.setHrPaymentType(csvData);//已租
	                        		mark++;
	                        	}
	                            break;
	                        case 27:  
	                        	//租客合同性质
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"-- \n");
	                        		journalRenewalRenter.setJrrContractType(csvData);//租客合约	                        
	                        		mark++;
	                        	}
	                            break;
	                        case 28:  
	                        	//租客出房人
	                        	if(!"".equals(csvData)&& !csvData.equals(null)){
	                        		//System.out.print(csvData+"-- \n");
	                        		sysUserExpand.setSuStaffName(csvData);
	                        		int name = 0;
	                        		List<SysUserExpand> userlise = userService.selectByPrimaryKey(sysUserExpand);
	                        		if(userlise.size() != 0){
	                        			name = userlise.get(0).getUserId();
	                        			outHouseManId = name;
	                        			outDepartment = userlise.get(0).getSuDepartmentId();
	                        			outStore = userlise.get(0).getSuStoreId();
	                        		}	                        		
	                        		infoHouse4rent.setHrAdminUserId(name);//已租
	                        		mark++;
	                        	}
	                            break;
	                        default:  
	                            break;  
	                    } 
	                } 
	                //System.out.println("-------------------数据验证结束");
	                //放入登记人id、部门、区域
	                infoHouse.setStorefront(storefront);
	                infoHouse.setDepartment(department);
	                infoHouse.setUserId(userId);
	                
	                infoHouse4rent.setHrUserId(userId);
	                infoHouse4rent.setHrStorefront(storefront);
	                infoHouse4rent.setHrDepartment(department);
	                infoHouse4rent.setHrWaterPlan(1);
	                infoHouse4rent.setHrElectritPlan(2);
	                infoHouse4rent.setHrGasPlan(3);
	                
	                infoHouse4store.setHsUserId(userId);
	                infoHouse4store.setHsStorefront(storefront);
	                infoHouse4store.setHsDepartment(department);
	                
	                infoRenter.setRenterStorefront(storefront);
	                infoRenter.setRenterDepartment(department);
	                infoRenter.setRenterUserId(userId);
	                
	                infoLandlord.setLaUserId(userId);
	                infoLandlord.setLaDepartment(department);
	                infoLandlord.setLaStorefront(storefront);
	                
	                infoLandlordIntentionPerson.setLipRegistrar(userId);
	                
	                infoIntendedPerson.setIpDepartmentId(department);
	                infoIntendedPerson.setIpUserId(userId);
	                infoIntendedPerson.setIpStorefrontId(storefront);
	                
	                journalRenewalRenter.setJrrUserId(userId);
	                journalRenewalRenter.setJrrDepartment(department);
	                journalRenewalRenter.setJrrStorefront(storefront);             
	                journalRenewalRenter.setJrrSignedTime(journalRenewalRenter.getJrrBeginTime());
	                journalRenewalRenter.setJrrTheTerm("0年0月0日");
	                //租客的合约期限
	                if(journalRenewalRenter.getJrrBeginTime()!=null && journalRenewalRenter.getJrrEndTime()!=null
	                		&& !journalRenewalRenter.getJrrBeginTime().equals("") && !journalRenewalRenter.getJrrEndTime().equals("")){
	                	int[] rs = CommonMethodClass.getYearMonthDay(journalRenewalRenter.getJrrBeginTime(), journalRenewalRenter.getJrrEndTime());
		                journalRenewalRenter.setJrrTheTerm(rs[0]+"年"+rs[1]+"月"+rs[2]+"日");
		                infoHouse4rent.setHrTheTerm(rs[0]+"年"+rs[1]+"月"+rs[2]+"日");
	                }
	                
	                infoRenewalLandlord.setJrlUserId(userId);
	                infoRenewalLandlord.setJrlDepartment(department);
	                infoRenewalLandlord.setJrlStorefront(storefront);	              
	                infoRenewalLandlord.setJrlSignedTime(infoRenewalLandlord.getJrlBeginTime());
	                infoRenewalLandlord.setJrlTheTerm("0年0月0日");
	                //房东的合约期限
	                if(infoRenewalLandlord.getJrlBeginTime()!=null && infoRenewalLandlord.getJrlEndTime()!=null
	                		&& !infoRenewalLandlord.getJrlBeginTime().equals("") && !infoRenewalLandlord.getJrlEndTime().equals("")){
	                    int[] rs = CommonMethodClass.getYearMonthDay(infoRenewalLandlord.getJrlBeginTime(), infoRenewalLandlord.getJrlEndTime());
		                infoRenewalLandlord.setJrlTheTerm(rs[0]+"年"+rs[1]+"月"+rs[2]+"日");
		                infoHouse4store.setHsTheTerm(rs[0]+"年"+rs[1]+"月"+rs[2]+"日");
	                }
	                //本条数据插入数据库
	                if(mark != 0){
	                	//用hdId查询楼盘字典是否有值存在，不存在则结束当前循坏，并记录该行
	                	System.out.println("查询楼盘字典1：");
	                	List<SysHouseDictExpand> houseDictList = houseDictService.selectByPrimaryKey(hdId);
	                	if(houseDictList.size()==0){
	                		msg.append(row+"-");
	                		System.out.println("楼盘字典不存在：");
	                    	continue;
	                	}
                        sysHouseDict = houseDictList.get(0);
	                	//放入地址	 
	                	infoHouse.setAddCity(sysHouseDict.getHdCity());
	                	infoHouse.setAddDistrict(sysHouseDict.getHdDistrict());
	                	infoHouse.setAddZone(sysHouseDict.getHdZone());
	                	infoHouse.setAddStreet(sysHouseDict.getHdRoad());
	                	infoHouse.setAddCommunity(sysHouseDict.getHdCommunity());
	                	
	                	infoHouse4store.setHsAddCity(sysHouseDict.getHdCity());
	                	infoHouse4store.setHsAddDistrict(sysHouseDict.getHdDistrict());
	                	infoHouse4store.setHsAddZone(sysHouseDict.getHdZone());
	                	infoHouse4store.setHsAddStreet(sysHouseDict.getHdRoad());
	                	infoHouse4store.setHsAddCommunity(sysHouseDict.getHdCommunity());
	                	
	                	infoHouse4rent.setHrAddCity(sysHouseDict.getHdCity());
	                	infoHouse4rent.setHrAddDistrict(sysHouseDict.getHdDistrict());
	                	infoHouse4rent.setHrAddZone(sysHouseDict.getHdZone());
	                	infoHouse4rent.setHrAddStreet(sysHouseDict.getHdRoad());
	                	infoHouse4rent.setHrAddCommunity(sysHouseDict.getHdCommunity());
	                	
	                	if(landInfoPopulation.getPopIdcard() != null && !"".equals(landInfoPopulation.getPopIdcard())){
		                	infoHouse.setHouseState("可租");
	                		infoHouse.setHouseSignedState("已托管");
                		}
	                	//根据是否有租客名字判断盘源、未租房的房屋状态               
	                	if(rentInfoPopulation.getPopName() == null){
							infoHouse4store.setHsLeaseState("空置未租");
						}else{
							infoHouse4store.setHsLeaseState("已租");
							infoHouse.setHouseState("已租");
							infoHouse.setHouseSignedState("已托管");
						}
	                    try{
	                    	System.out.println("数据库盘源导入2");                    	
	                    	//增加房东意向人  
                    		List<InfoLandlordIntentionPerson>landList1 = landlordIntentionPersonService.selectByPrimaryKey(infoLandlordIntentionPerson);
                    		//System.out.println("房东意向人查询："+landList.size());
                    		if(landList1.size() == 0){
                    			result1 = landlordIntentionPersonService.insertSelective(infoLandlordIntentionPerson);
                    			if(result1 == 0){
        	                		msg.append(row+"-");
        	                		System.out.println("房东意向人新增失败：");
                        			//Thread.sleep(20000);
        	                    	continue;
        	                	}
                    			lipId = infoLandlordIntentionPerson.getLipId();
                    			//房东意向人id
                        		infoHouse.setHouseLipId(lipId);
                    		}else{
                    			lipId =landList1.get(0).getLipId();
                    			//房东意向人id
                        		infoHouse.setHouseLipId(lipId);
                    		}
                    		//System.out.println("房东意向人--id："+lipId);
                    		InfoPopulation ip = new InfoPopulation();
	                		ip.setPopIdcard(landInfoPopulation.getPopIdcard());
	                		//System.out.println("tianjiarenkoushuju-----------------"+ip.toString());  
	                    	//判断是否有业主身份证,根据房东身份证判断盘源、未租房的房屋状态
	                    	if(!"".equals(landInfoPopulation.getPopIdcard()) && landInfoPopulation.getPopIdcard() != null){
		                		//增加房东人口表
		                		//查询人口表是否已经存在此人,存在则获取人口id，没有则新增一条。
		                		List<InfoPopulation> laList3 = populationService.selectIdcardKey(ip);
		                		System.out.println("房东人口biao查询："+laList3.size()+"-----"+landInfoPopulation.getPopIdcard());
		                		if(laList3.size() == 0){
		                		    System.out.println("aaaaaaaaaaaaaaaaaaaa");
		                			landInfoPopulation.setPopLandlord(1);
		                			landInfoPopulation.setPopUser(userId);
		                			landInfoPopulation.setPopPassword(landInfoPopulation.getPopTelephone());
		                			result2 = populationService.insertSelective(landInfoPopulation);
		                			if(result2 == 0){
		                			    System.out.println("bbbbbbbbbbbbbbbbbbbb");
		                				msg.append(row+"-");
	        	                		System.out.println("房东人口新增失败：");
	        	                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
	        	                    	continue;
		                			}
		                			laPopId = landInfoPopulation.getPopId();
		                			infoLandlord.setLaPopulationId(laPopId);
		                		}else{
		                		    System.out.println("cccccccccccccccccccccc");
		                			laPopId = laList3.get(0).getPopId();
		                			infoLandlord.setLaPopulationId(laPopId);
		                		} 
		                		System.out.println("------房东人口-----id-："+laPopId);   
		                		//增加房东表,根据人口id查看是否存在，存在则获取房东id，没有则新增一条。
		                		Integer landnum   = landlordService.isExist(laPopId);
		                		System.out.println("----------房东查出来什么---："+landnum+"-------"+laPopId);
		                		if( landnum == null){
		                			infoLandlord.setLaPopulationId(laPopId);
		                			result3 = landlordService.insertSelective(infoLandlord);
		                			if(result3 == 0){
		                				msg.append(row+"-");
	        	                		System.out.println("房东新增失败：");
	        	                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
	        	                		//populationService.deleteByPrimaryKey(laPopId);
	        	                    	continue;
		                			}
		                			landlordId = infoLandlord.getLandlordId();
		                			infoHouse.setLandlordId(landlordId);
		                		}else{
		                			landlordId = landnum;
		                			infoHouse.setLandlordId(landlordId);
		                		}
		                		System.out.println("----------房东id----- ："+landlordId);                                                                                                                                                                                                                                                                                                                                                                  
		                		//查询此楼盘是否已存在
		                		InfoHouseExpand hd = new InfoHouseExpand();
		                		hd.setAddCity(infoHouse.getAddCity());
			                	hd.setAddDistrict(infoHouse.getAddDistrict());
			                	hd.setAddZone(infoHouse.getAddZone());
			                	hd.setAddStreet(infoHouse.getAddStreet());
			                	hd.setAddCommunity(infoHouse.getAddCommunity());
			                	hd.setAddBuilding(infoHouse.getAddBuilding());
			                	hd.setAddDoorplateno(infoHouse.getAddDoorplateno());
			                	
			                	List<InfoHouseExpand> hdList = houseService.selectData(hd);
			                	//System.out.println("查询此楼盘 ："+hdList.size()+"----"+hdList);
			                	if(hdList.size() == 0){
			                		result4 = houseService.insertSelective(infoHouse);
			                		if(result4 == 0){
		                    			msg.append(row+"-");
	        	                		System.out.println("盘源添加失败：");
	        	                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
	        	                		//populationService.deleteByPrimaryKey(laPopId);
	        	                		//landlordService.deleteByPrimaryKey(landlordId);
	        	                		continue;
		                    		}
		                    		houseId = infoHouse.getHouseCoding();
			                	}else{                
			                		houseId = hdList.get(0).getHouseCoding();
			                		//landlordId = hdList.get(0).getLandlordId();
			                	}
			                	System.out.println("查询此楼盘 ："+hdList.size()+"----"+hdList);
	                    	}else{
	                    		//没有业主身份证，则只是盘源添加，并结束当前循环。
	                    		infoHouse.setHouseState("传闻"); 
		                		infoHouse.setHouseSignedState("未托管");
	                    		result4 = houseService.insertSelective(infoHouse);
	                    		if(result4 == 0){
	                    			msg.append(row+"-"); 
        	                		System.out.println("盘源添加失败：");
        	                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
        	                		//populationService.deleteByPrimaryKey(laPopId);
        	                		//landlordService.deleteByPrimaryKey(landlordId);
        	                		continue;
	                    		}
	                    		finallyrow++;
                    			continue;
	                    	}      	                      	
	                    }catch (Exception e) { 
	            	        e.printStackTrace();Syslog.writeErr(e);
	            	        msg.append(row+"-");
	            	        landlordIntentionPersonService.deleteByPrimaryKey(lipId);
	                		//populationService.deleteByPrimaryKey(laPopId);
	                		//landlordService.deleteByPrimaryKey(landlordId);
	                    	continue;
	                    }
	                    //查询未租房是否已经存在
	                    InfoHouse4storeExpand conditions = new InfoHouse4storeExpand();
	                    conditions.setHsHouseId(houseId);
	                    List<InfoHouse4storeExpand> hsList7 = houseForStoreService.selectStoreData(conditions);
	                    if(hsList7.size() != 0){
	                		msg.append(row+"-");
	                		System.out.println("未租房已经存在！！");
                			//Thread.sleep(20000);
	                    	continue;
	                	}
		                //补充未租、已租房的--盘源id 、房东id ; 未租合约、已租合约的房东id
	                	infoHouse4store.setHsHouseId(houseId);
	                	infoHouse4store.setHsLandlordId(landlordId);
	                	
	            		infoHouse4rent.setHrHouseId(houseId);
	            		infoHouse4rent.setHrLandlordId(landlordId);
	            		
	            		infoRenewalLandlord.setJrlLandlordId(landlordId);
	            		journalRenewalRenter.setJrrLandlordId(landlordId);
	                	System.out.println("盘源id ："+houseId+"房东id ："+landlordId);
	                	//System.out.println("HsLeaseState :"+infoHouse4store.getHsLeaseState()+"---"+infoHouse4store.getHsLandlordId()+"\n"+infoHouse4store.toString());
//	                	
	                	//未租房的数据导入
	                	//租赁状态
	            		try{
		                	if(rentInfoPopulation.getPopName() == null){
		                		infoHouse4store.setHsLeaseState("空置未租");
		                	}else{
		                		infoHouse4store.setHsLeaseState("已租");
		                	}
	                		//添加未租房数据
		                	int result = houseForStoreService.insertSelective(infoHouse4store);
	                		if(result == 0){
	                			msg.append(row+"-");
		                		System.out.println("未租房添加失败：");
		                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
		                		//populationService.deleteByPrimaryKey(laPopId);
		                		//landlordService.deleteByPrimaryKey(landlordId);
		                		houseService.deleteByPrimaryKey(houseId);
		                		continue;
	                		}
	                		house4storeId = infoHouse4store.getHsId();
	                		infoRenewalLandlord.setJrlHouse4storeId(house4storeId);
	                		infoHouse4rent.setHrHouse4storeId(house4storeId);
	                		journalRenewalRenter.setJrrHouse4storeId(house4storeId);
	                		//System.out.println("-------------是否已经到了这里------: "+house4storeId);
	                		/*
	                		 * 房东合约编号增加
	                		 */
	                		JournalContractDatabase jcd = new JournalContractDatabase();
	                		String jrlRenewalCoding = "";
	                		if( !"".equals(infoRenewalLandlord.getJrlRenewalCoding()) && infoRenewalLandlord.getJrlRenewalCoding() != null){
		                		String[] contractNumber = infoRenewalLandlord.getJrlRenewalCoding().split("#");
		                		//获取 区、栋、门牌号
		                		String area = infoHouse4store.getHsAddCommunity();
		                		String building = infoHouse4store.getHsAddBuilding();
		                		String number = infoHouse4store.getHsAddDoorplateno();
		                		String strSum = area+" "+building+" "+number;
		                		//合约编号生成所需信息
		                		jcd.setJcdBornAdult(1);
		                		//判断领取人、签约人是否为空，如果为空则全用管理员信息
		                		if(houseOwnerId == null || houseOwnerId.equals("")){
		                			jcd.setJcdRecipient(1);
			                		jcd.setJcdReceiveDepartment(1);
			                		jcd.setJcdReceiveStore(1);
			                		jcd.setJcdContractPerson(1);
		                		}else{
			                		jcd.setJcdRecipient(houseOwnerId);
			                		jcd.setJcdReceiveDepartment(housingDepartment);
			                		jcd.setJcdReceiveStore(storeStore);
			                		jcd.setJcdContractPerson(houseOwnerId);
		                		}
		                		jcd.setJcdUseState("已签约");
		                		jcd.setJcdCollectionTime(infoRenewalLandlord.getJrlBeginTime());
		                		//jcd.setJcdGenerationTime(infoRenewalLandlord.getJrlBeginTime());
		                		jcd.setJcdSigningTime(infoRenewalLandlord.getJrlBeginTime());
		                		jcd.setJcdHouseAddress(strSum);
		                		jcd.setJcdUsedType("存房");
		                		//分离前缀与数字编号
		                		for(int k = 0; k < contractNumber.length; ++k){
		                			String strNum = "";// 数字
			                		String prefix = "";// 前缀
		                			String start = contractNumber[k];
				               		for (int i = 0; i < start.length();++i){
				               			if (Character.isDigit(start.charAt(i))){
				               				strNum += start.charAt(i);
				               				//System.out.println("strNum数字： "+i+"------"+start.charAt(i));
				               			}else{
				               				prefix += start.charAt(i);
				               				//System.out.println("prefix前缀： "+i+"------"+start.charAt(i));
				               			}
				               		}
				               		jcd.setJcdContractPrefix(prefix);
				               		jcd.setJcdContractNumber(strNum);
				               		System.out.println("789"+jcd.getJcdContractNumber());
				               		int result12 = contractDatabaseService.contractDatabaseInsert(jcd);
				               		if(result12 == 0){
				               			msg.append(row+"-");
				                		System.out.println("房东合约编号添加失败：");
				                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
				                		//populationService.deleteByPrimaryKey(laPopId);
				                		//landlordService.deleteByPrimaryKey(landlordId);
				                		houseService.deleteByPrimaryKey(houseId);
				                		houseForStoreService.deleteByPrimaryKey(house4storeId);
				                		continue;
				               		}
				               		//System.out.println("```````````生成了么``````："+jcd.getJcdId());
				               		//获取返回的合约编号id
				               		if(k < contractNumber.length - 1){
				               			strJcdId += jcd.getJcdId()+",";
				               			//放入房东合约表的合约编号josn数组 [{"number":"TG1601272","jcdId":270,"jcdHouseAddress":"花园大厦 B座 2026"}]
				               			jrlRenewalCoding += "{'number':'"+start+"','jcdId':"+jcd.getJcdId()+",'jcdHouseAddress':'"+strSum+"'},";
				               		}else{
				               			strJcdId += jcd.getJcdId();
				               			jrlRenewalCoding += "{'number':'"+start+"','jcdId':"+jcd.getJcdId()+",'jcdHouseAddress':'"+strSum+"'}";
				               		}
		                		}
	                		}
	                		//System.out.println("---------有没有合约编号ID-----："+strJcdId);
	                		//添加房东合约
	                		//合约的必须条件
	                		infoRenewalLandlord.setJrlRenewalCoding("["+jrlRenewalCoding+"]");
	                		String jrlBeginTime = infoRenewalLandlord.getJrlBeginTime(); // 开始时间
	                		String jrlEndTime = infoRenewalLandlord.getJrlEndTime(); // 结束时间
	                		String jrlPriceLadder = infoRenewalLandlord.getJrlPriceLadder(); // 阶梯价
	                		Integer jrlRentFreeDays = infoRenewalLandlord.getJrlRentFreeDays(); // 免租天数
	                		String jrlRentFreeSegment = infoRenewalLandlord.getJrlRentFreeSegment(); // 免租时段
	                		String jrlPaymentMethod = infoRenewalLandlord.getJrlPaymentMethod(); // 缴费方式
	                		//System.out.println("-----------------合约数据--："+infoRenewalLandlord.toString());
	                		//判断合约的必要条件是否为空111
	                		if(jrlBeginTime != null && !jrlBeginTime.equals("") && jrlEndTime != null && !jrlEndTime.equals("")
	                				 && jrlPriceLadder != null && !jrlPriceLadder.equals("") && jrlRentFreeDays != null && jrlRentFreeSegment != null && !jrlRentFreeSegment.equals("")
	                				 && jrlPaymentMethod != null && !jrlPaymentMethod.equals("")){
		                		result5 =renewalLandlordService.insertSelective(infoRenewalLandlord);
		                		if(result5 == 0){
		                			msg.append(row+"-");
			                		System.out.println("房东合约添加失败：");
			                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
			                		//populationService.deleteByPrimaryKey(laPopId);
			                		//landlordService.deleteByPrimaryKey(landlordId);
			                		houseService.deleteByPrimaryKey(houseId);
			                		houseForStoreService.deleteByPrimaryKey(house4storeId);
			                		if(!"".equals(strJcdId)){
			                			String[] str = strJcdId.split(",");
				                		for(int i = 0; i < str.length; ++i){
				                			Integer jcdid = Integer.parseInt(str[i]);
				                			contractDatabaseService.deleteByPrimaryKey(jcdid);
				                		}
			                		}
			                		continue;
		                		}
		                		jrlid = infoRenewalLandlord.getJrlId();
		                		//System.out.println("---------有没有合约ID----："+jrlid);
		                		//生成房东分期账单
		                		infoRenewalLandlord.setJrlId(jrlid);
		                		ice.setJciLandContId(jrlid);
		                		//System.out.println("--------房东分期账单的数据---："+infoRenewalLandlord.toString());
		                		List<InfoContractInstallment> iciList = CommonMethodClass.landContractInstallment(infoRenewalLandlord);
		                		if(iciList.size() == 0){
		                			msg.append(row+"-");
			                		System.out.println("房东分期账单生成失败：");
			                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
			                		//populationService.deleteByPrimaryKey(laPopId);
			                		//landlordService.deleteByPrimaryKey(landlordId);
			                		houseService.deleteByPrimaryKey(houseId);
			                		houseForStoreService.deleteByPrimaryKey(house4storeId);
			                		renewalLandlordService.deleteByPrimaryKey(jrlid);
			                		if(!"".equals(strJcdId)){
			                			String[] str = strJcdId.split(",");
				                		for(int i = 0; i < str.length; ++i){
				                			Integer jcdid = Integer.parseInt(str[i]);
				                			contractDatabaseService.deleteByPrimaryKey(jcdid);
				                		}
			                		}
			                		continue;
		        				}
		                		//新增分期账单
		                		result6 = contractInstallmentService.insertList(iciList);
		                		if(result6 == 0){
		                			msg.append(row+"-");
			                		System.out.println("分期账单添加失败：");
			                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
			                		//populationService.deleteByPrimaryKey(laPopId);
			                		//landlordService.deleteByPrimaryKey(landlordId);
			                		houseService.deleteByPrimaryKey(houseId);
			                		houseForStoreService.deleteByPrimaryKey(house4storeId);
			                		renewalLandlordService.deleteByPrimaryKey(jrlid);
			                		if(!"".equals(strJcdId)){
			                			String[] str = strJcdId.split(",");
				                		for(int i = 0; i < str.length; ++i){
				                			Integer jcdid = Integer.parseInt(str[i]);
				                			contractDatabaseService.deleteByPrimaryKey(jcdid);
				                		}
			                		}
			                		continue;
		                		}
		                		
		                		//判断是否是未租房
		                		if(("".equals(rentInfoPopulation.getPopName()) || rentInfoPopulation.getPopName() == null) &&
		                				(rentInfoPopulation.getPopIdcard() == null) || rentInfoPopulation.getPopIdcard().equals("")){
			                		finallyrow++;
		                			continue;
			                	}
	                		}else{
	                			msg.append(row+"-");
		                		System.out.println("房东合约数据有误：");
		                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
		                		//populationService.deleteByPrimaryKey(laPopId);
		                		//landlordService.deleteByPrimaryKey(landlordId);
		                		houseService.deleteByPrimaryKey(houseId);
		                		houseForStoreService.deleteByPrimaryKey(house4storeId);
		                		if(!"".equals(strJcdId)){
		                			String[] str = strJcdId.split(",");
			                		for(int i = 0; i < str.length; ++i){
			                			Integer jcdid = Integer.parseInt(str[i]);
			                			contractDatabaseService.deleteByPrimaryKey(jcdid);
			                		}
		                		}
		                		continue;
	                		}
	            		}catch (Exception e) {
	            	        e.printStackTrace();Syslog.writeErr(e);
	            	        msg.append(row+"-");
	            	        landlordIntentionPersonService.deleteByPrimaryKey(lipId);
	                		//populationService.deleteByPrimaryKey(laPopId);
	                		//landlordService.deleteByPrimaryKey(landlordId);
	                		houseService.deleteByPrimaryKey(houseId);
	                		houseForStoreService.deleteByPrimaryKey(house4storeId);
	                		if(jrlid != null){
		                		ice.setJciLandContId(jrlid);
		                		contractInstallmentService.deleteByPrimaryKey(ice);
	                		}
	                		renewalLandlordService.deleteByPrimaryKey(jrlid);
	                		if(!"".equals(strJcdId)){
	                			String[] str = strJcdId.split(",");
		                		for(int i = 0; i < str.length; ++i){
		                			Integer jcdid = Integer.parseInt(str[i]);
		                			contractDatabaseService.deleteByPrimaryKey(jcdid);
		                		}
	                		}
	                    	continue;
	                    }

                		/*
                		 * 添加租客
                		 */
                		//增加租客人口
	            		try{
	                		rentInfoPopulation.setPopRenter(1);
	                		rentInfoPopulation.setPopUser(userId);
	                		rentInfoPopulation.setPopPassword(rentInfoPopulation.getPopTelephone());
	                		String ic = rentInfoPopulation.getPopIdcard(); //租客身份证
	                		InfoPopulation reip1 = new InfoPopulation();
	                		reip1.setPopIdcard(ic);
	                		//用租客身份证查询人口表中是否存在此人，没有则新增，有则取出人口id
	                		List<InfoPopulation> relist = populationService.selectIdcardKey(reip1);
	                		System.out.println("-----------我需要的人口数据----"+relist.toString());
	                		if(relist.size() == 0){
	                			result7 = populationService.insertSelective(rentInfoPopulation);
	                			System.out.println("-----------这里报错了----: "+result7);
	                    		if(result7 == 0){
	                    			msg.append(row+"-");
	    	                		System.out.println("租客人口添加失败：");
	    	                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
	    	                		//populationService.deleteByPrimaryKey(laPopId);
	    	                		//landlordService.deleteByPrimaryKey(landlordId);
	    	                		houseService.deleteByPrimaryKey(houseId);
	    	                		houseForStoreService.deleteByPrimaryKey(house4storeId);
	    	                		if(jrlid != null){
	    		                		ice.setJciLandContId(jrlid);
	    		                		contractInstallmentService.deleteByPrimaryKey(ice);
	    	                		}
	    	                		renewalLandlordService.deleteByPrimaryKey(jrlid);
	    	                		if(!"".equals(strJcdId)){
			                			String[] str = strJcdId.split(",");
				                		for(int i = 0; i < str.length; ++i){
				                			Integer jcdid = Integer.parseInt(str[i]);
				                			contractDatabaseService.deleteByPrimaryKey(jcdid);
				                		}
			                		}
	    	                		continue;
	                    		}
	                    		rePopId = rentInfoPopulation.getPopId();
	                		}else{
	                			rePopId = relist.get(0).getPopId();
	                		}
	                		infoIntendedPerson.setIpPopulationId(rePopId);
                            infoIntendedPerson.setIpName(rentInfoPopulation.getPopName());
                            infoIntendedPerson.setIpTel(rentInfoPopulation.getPopTelephone());
                            infoIntendedPerson.setIpState("我租");
	                		infoRenter.setRenterPopulationId(rePopId);
	                		System.out.println("------------人口ID--："+rePopId);
	                		//查看意向人是否存在
	                		List<InfoIntendedPerson> ipsList = intendedPersonService.dataImportQuery(rePopId);
	                		if(ipsList.size() == 0){
		                		//添加租客意向人             		
		                		result8 = intendedPersonService.insertSelective(infoIntendedPerson);
		                		if(result8 == 0){
		                			msg.append(row+"-");
			                		System.out.println("租客意向人添加失败：");
			                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
			                		//populationService.deleteByPrimaryKey(laPopId);
			                		//landlordService.deleteByPrimaryKey(landlordId);
			                		houseService.deleteByPrimaryKey(houseId);
			                		houseForStoreService.deleteByPrimaryKey(house4storeId);
			                		if(jrlid != null){
				                		ice.setJciLandContId(jrlid);
				                		contractInstallmentService.deleteByPrimaryKey(ice);
			                		}
			                		renewalLandlordService.deleteByPrimaryKey(jrlid);
			                		if(!"".equals(strJcdId)){
			                			String[] str = strJcdId.split(",");
				                		for(int i = 0; i < str.length; ++i){
				                			Integer jcdid = Integer.parseInt(str[i]);
				                			contractDatabaseService.deleteByPrimaryKey(jcdid);
				                		}
			                		}
			                		continue;
		                		}
		                		ipId = infoIntendedPerson.getIpId();
	                		}else{
	                			ipId = ipsList.get(0).getIpId();
	                		}
	                		System.out.println("------------租客意向人ID--"+ipId);
	                		
	                		//查询住客是否存在
	                		List<InfoRenter> ireList = renterService.tenantDataImportQuery(rePopId);
	                		if(ireList.size() == 0){
		                		//添加租客
		                		result9 = renterService.insertSelective(infoRenter);
		                		if(result9 == 0){
		                			msg.append(row+"-");
			                		System.out.println("租客添加失败：");
			                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
			                		//populationService.deleteByPrimaryKey(laPopId);
			                		//landlordService.deleteByPrimaryKey(landlordId);
			                		houseService.deleteByPrimaryKey(houseId);
			                		houseForStoreService.deleteByPrimaryKey(house4storeId);			                
			                		//populationService.deleteByPrimaryKey(rePopId);
			                		intendedPersonService.deleteByPrimaryKey(ipId);;
			                		if(jrlid != null){
				                		ice.setJciLandContId(jrlid);
				                		contractInstallmentService.deleteByPrimaryKey(ice);
			                		}
			                		renewalLandlordService.deleteByPrimaryKey(jrlid);
			                		if(!"".equals(strJcdId)){
			                			String[] str = strJcdId.split(",");
				                		for(int i = 0; i < str.length; ++i){
				                			Integer jcdid = Integer.parseInt(str[i]);
				                			contractDatabaseService.deleteByPrimaryKey(jcdid);
				                		}
			                		}
			                		continue;
		                		}
		                		renterId = infoRenter.getRenterId();
	                		}else{
	                			renterId = ireList.get(0).getRenterId();
	                		}
	                		journalRenewalRenter.setJrrRenterId(renterId);
	                		infoHouse4rent.setHrRenterId(renterId);
	                		System.out.println("------------租客ID--"+renterId);
	                		
	                		//增加已租房             		
	                		result10 = houseForRentService.insertSelective(infoHouse4rent);
	                		if(result10 == 0){
	                			msg.append(row+"-");
		                		System.out.println("已租房添加失败：");
		                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
		                		//populationService.deleteByPrimaryKey(laPopId);
		                		//landlordService.deleteByPrimaryKey(landlordId);
		                		houseService.deleteByPrimaryKey(houseId);
		                		houseForStoreService.deleteByPrimaryKey(house4storeId);
		                		//populationService.deleteByPrimaryKey(rePopId);
		                		intendedPersonService.deleteByPrimaryKey(ipId);
		                		//renterService.deleteByPrimaryKey(renterId);
		                		if(jrlid != null){
			                		ice.setJciLandContId(jrlid);
			                		contractInstallmentService.deleteByPrimaryKey(ice);
		                		}
		                		renewalLandlordService.deleteByPrimaryKey(jrlid);
		                		if(!"".equals(strJcdId)){
		                			String[] str = strJcdId.split(",");
			                		for(int i = 0; i < str.length; ++i){
			                			Integer jcdid = Integer.parseInt(str[i]);
			                			contractDatabaseService.deleteByPrimaryKey(jcdid);
			                		}
		                		}
		                		continue;
	                		}
	                		house4rentId = infoHouse4rent.getHrId();
	                		journalRenewalRenter.setJrrHouse4rentId(house4rentId);
	                		        		
	                		renewalNum = journalRenewalRenter.getJrrRenewalCoding();
	                		if(!"".equals(renewalNum) && renewalNum != null){
	                			JournalContractDatabase jcd = new JournalContractDatabase();
		                		//获取 区、栋、门牌号
		                		String area = infoHouse4rent.getHrAddCommunity();
		                		String building = infoHouse4rent.getHrAddBuilding();
		                		String number = infoHouse4rent.getHrAddDoorplateno();
		                		String strSum = area+" "+building+" "+number;
		                		//获取合约编号信息
		                		jcd.setJcdBornAdult(1);
		                		//判断领取人、签约人是否为空，如果为空则全用管理员信息 outHouseManId outDepartment outStore
		                		if(outHouseManId == null || "".equals(outHouseManId)){
		                			jcd.setJcdRecipient(1);
			                		jcd.setJcdReceiveDepartment(1);
			                		jcd.setJcdReceiveStore(1);
			                		jcd.setJcdContractPerson(1);
		                		}else{
			                		jcd.setJcdRecipient(outHouseManId);
			                		jcd.setJcdReceiveDepartment(outDepartment);
			                		jcd.setJcdReceiveStore(outStore);
			                		jcd.setJcdContractPerson(outHouseManId);
		                		}
		                		jcd.setJcdUseState("已签约");
		                		jcd.setJcdCollectionTime(journalRenewalRenter.getJrrBeginTime());
		                		//jcd.setJcdGenerationTime(journalRenewalRenter.getJrrBeginTime());
		                		jcd.setJcdSigningTime(journalRenewalRenter.getJrrBeginTime());
		                		jcd.setJcdHouseAddress(strSum);
		                		jcd.setJcdUsedType("出房");
		                		//分离前缀与数字编号
		                		String strNum = "";// 数字
		                		String prefix = "";// 前缀
			               		for (int i = 0; i < renewalNum.length();++i){
			               			if (Character.isDigit(renewalNum.charAt(i))){
			               				strNum += renewalNum.charAt(i);
			               				System.out.println("strNum数字： "+i+"------"+renewalNum.charAt(i));
			               			}else{
			               				prefix += renewalNum.charAt(i);
			               				System.out.println("prefix前缀： "+i+"------"+renewalNum.charAt(i));
			               			}
			               		}
			               		jcd.setJcdContractPrefix(prefix);
			               		jcd.setJcdContractNumber(strNum);
			               		int result12 = contractDatabaseService.contractDatabaseInsert(jcd);
			               		if(result12 == 0){
			               			msg.append(row+"-");
			                		System.out.println("已租房添加失败：");
			                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
			                		//populationService.deleteByPrimaryKey(laPopId);
			                		//landlordService.deleteByPrimaryKey(landlordId);
			                		houseService.deleteByPrimaryKey(houseId);
			                		houseForStoreService.deleteByPrimaryKey(house4storeId);
			                		//populationService.deleteByPrimaryKey(rePopId);
			                		intendedPersonService.deleteByPrimaryKey(ipId);
			                		//renterService.deleteByPrimaryKey(renterId);
			                		houseForRentService.deleteByPrimaryKey(house4rentId);
			                		if(jrlid != null){
				                		ice.setJciLandContId(jrlid);
				                		contractInstallmentService.deleteByPrimaryKey(ice);
			                		}
			                		renewalLandlordService.deleteByPrimaryKey(jrlid);
			                		if(!"".equals(strJcdId)){
			                			String[] str = strJcdId.split(",");
				                		for(int i = 0; i < str.length; ++i){
				                			Integer jcdid = Integer.parseInt(str[i]);
				                			contractDatabaseService.deleteByPrimaryKey(jcdid);
				                		}
			                		}
			                		continue;
			               		}
			               		jcdId = jcd.getJcdId(); 
	                		}
	                		
	                		/*
	                		 * 租客合约
	                		 */
	                		journalRenewalRenter.setJrrRenewalCoding(renewalNum);
	                		System.out.println("租客合约的数据："+journalRenewalRenter.toString());
	                		//租客合约必要条件
	                		String jrrBeginTime = journalRenewalRenter.getJrrBeginTime(); //开始时间
	                		String jrrEndTime = journalRenewalRenter.getJrrEndTime(); //结束时间
	                		Double jrrMoney = journalRenewalRenter.getJrrMoney(); //租价
	                		String jrrPaymentMethod = journalRenewalRenter.getJrrPaymentMethod(); //缴费方式
	                		if(jrrBeginTime != null && !jrrBeginTime.equals("") && jrrEndTime != null && !jrrEndTime.equals("") 
	                				&& jrrPaymentMethod != null && !jrrPaymentMethod.equals("") && jrrMoney != null){
	                			System.out.println("到这里嘛1"+journalRenewalRenter.toString());
		                		result10 = renewalRenterService.insertSelective(journalRenewalRenter);
		                		System.out.println("到这里嘛2:"+result10);
		                		if(result10 == 0){
		                			msg.append(row+"-");
			                		System.out.println("已租房添加失败：");
			                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
			                		//populationService.deleteByPrimaryKey(laPopId);
			                		//landlordService.deleteByPrimaryKey(landlordId);
			                		houseService.deleteByPrimaryKey(houseId);
			                		houseForStoreService.deleteByPrimaryKey(house4storeId);
			                		//populationService.deleteByPrimaryKey(rePopId);
			                		intendedPersonService.deleteByPrimaryKey(ipId);
			                		//renterService.deleteByPrimaryKey(renterId);
			                		houseForRentService.deleteByPrimaryKey(house4rentId);
			                		if(jrlid != null){
				                		ice.setJciLandContId(jrlid);
				                		contractInstallmentService.deleteByPrimaryKey(ice);
			                		}
			                		renewalLandlordService.deleteByPrimaryKey(jrlid);
			                		if(!"".equals(strJcdId)){
			                			String[] str = strJcdId.split(",");
				                		for(int i = 0; i < str.length; ++i){
				                			Integer jcdid = Integer.parseInt(str[i]);
				                			contractDatabaseService.deleteByPrimaryKey(jcdid);
				                		}
			                		}
			                		if(jcdId != null){
			                			contractDatabaseService.deleteByPrimaryKey(jcdId);
			                		}
			                		continue;
		                		}
		                		jrrid = journalRenewalRenter.getJrrId();
		                		journalRenewalRenter.setJrrId(jrrid);
		                		//生成租客分期账单
		                		List<InfoContractInstallment> rentList = CommonMethodClass.rentContractInstallment(journalRenewalRenter);
		                		if(rentList == null || rentList.size() == 0){
		                			msg.append(row+"-");
			                		System.out.println("生成租客分期账单失败：");
			                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
			                		//populationService.deleteByPrimaryKey(laPopId);
			                		//landlordService.deleteByPrimaryKey(landlordId);
			                		houseService.deleteByPrimaryKey(houseId);
			                		houseForStoreService.deleteByPrimaryKey(house4storeId);
			                		//populationService.deleteByPrimaryKey(rePopId);
			                		intendedPersonService.deleteByPrimaryKey(ipId);
			                		//renterService.deleteByPrimaryKey(renterId);
			                		houseForRentService.deleteByPrimaryKey(house4rentId);
			                		renewalRenterService.deleteByPrimaryKey(jrrid);
			                		if(jrlid != null){
				                		ice.setJciLandContId(jrlid);
				                		contractInstallmentService.deleteByPrimaryKey(ice);
			                		}
			                		renewalLandlordService.deleteByPrimaryKey(jrlid);
			                		if(!"".equals(strJcdId)){
			                			String[] str = strJcdId.split(",");
				                		for(int i = 0; i < str.length; ++i){
				                			Integer jcdid = Integer.parseInt(str[i]);
				                			contractDatabaseService.deleteByPrimaryKey(jcdid);
				                		}
			                		}
			                		if(jcdId != null){
			                			contractDatabaseService.deleteByPrimaryKey(jcdId);
			                		}
			                		continue;
		                		}
		                		
		                		//添加分期账单
			                	int result12 = contractInstallmentService.insertList(rentList);//已租
			                	if(result12 == 0 ){
			                		msg.append(row+"-");
			                		System.out.println("添加分期账单失败：");
			                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
			                		//populationService.deleteByPrimaryKey(laPopId);
			                		//landlordService.deleteByPrimaryKey(landlordId);
			                		houseService.deleteByPrimaryKey(houseId);
			                		houseForStoreService.deleteByPrimaryKey(house4storeId);
			                		//populationService.deleteByPrimaryKey(rePopId);
			                		intendedPersonService.deleteByPrimaryKey(ipId);
			                		//renterService.deleteByPrimaryKey(renterId);
			                		houseForRentService.deleteByPrimaryKey(house4rentId);
			                		renewalRenterService.deleteByPrimaryKey(jrrid);
			                		if(jrlid != null){
				                		ice.setJciLandContId(jrlid);
				                		contractInstallmentService.deleteByPrimaryKey(ice);
			                		}
			                		renewalLandlordService.deleteByPrimaryKey(jrlid);
			                		if(!"".equals(strJcdId)){
			                			String[] str = strJcdId.split(",");
				                		for(int i = 0; i < str.length; ++i){
				                			Integer jcdid = Integer.parseInt(str[i]);
				                			contractDatabaseService.deleteByPrimaryKey(jcdid);
				                		}
			                		}
			                		if(jcdId != null){
			                			contractDatabaseService.deleteByPrimaryKey(jcdId);
			                		}
			                		continue;
			                	}
			                	finallyrow++;//统计成功插入数据的数量
	                		}else{
	                			msg.append(row+"-");
		                		System.out.println("租客合约数据有误：");
		                		landlordIntentionPersonService.deleteByPrimaryKey(lipId);
		                		//populationService.deleteByPrimaryKey(laPopId);
		                		//landlordService.deleteByPrimaryKey(landlordId);
		                		houseService.deleteByPrimaryKey(houseId);
		                		houseForStoreService.deleteByPrimaryKey(house4storeId);
		                		//populationService.deleteByPrimaryKey(rePopId);
		                		intendedPersonService.deleteByPrimaryKey(ipId);
		                		//renterService.deleteByPrimaryKey(renterId);
		                		houseForRentService.deleteByPrimaryKey(house4rentId);
		                		renewalRenterService.deleteByPrimaryKey(jrrid);
		                		if(jrlid != null){
			                		ice.setJciLandContId(jrlid);
			                		contractInstallmentService.deleteByPrimaryKey(ice);
		                		}
		                		renewalLandlordService.deleteByPrimaryKey(jrlid);
		                		if(!"".equals(strJcdId)){
		                			String[] str = strJcdId.split(",");
			                		for(int i = 0; i < str.length; ++i){
			                			Integer jcdid = Integer.parseInt(str[i]);
			                			contractDatabaseService.deleteByPrimaryKey(jcdid);
			                		}
		                		}
		                		if(jcdId != null){
		                			contractDatabaseService.deleteByPrimaryKey(jcdId);
		                		}
		                		continue;
	                		}
	            			
	            		}catch (Exception e) {  
	            	        e.printStackTrace();Syslog.writeErr(e);
	            	        msg.append(row+"-");
	            	        landlordIntentionPersonService.deleteByPrimaryKey(lipId);
	                		//populationService.deleteByPrimaryKey(laPopId);
	                		//landlordService.deleteByPrimaryKey(landlordId);
	                		houseService.deleteByPrimaryKey(houseId);
	                		houseForStoreService.deleteByPrimaryKey(house4storeId);
	                		//populationService.deleteByPrimaryKey(rePopId);
	                		intendedPersonService.deleteByPrimaryKey(ipId);
	                		//renterService.deleteByPrimaryKey(renterId);
	                		houseForRentService.deleteByPrimaryKey(house4rentId);
	                		if(jrlid != null){
		                		ice.setJciLandContId(jrlid);
		                		contractInstallmentService.deleteByPrimaryKey(ice);
	                		}
	                		renewalLandlordService.deleteByPrimaryKey(jrlid);
	                		if(jrrid != null){
		                		ice.setJciLandContId(null);
		                		ice.setJciRentContId(jrrid);
		                		contractInstallmentService.deleteByPrimaryKey(ice);
	                		}
	                		renewalRenterService.deleteByPrimaryKey(jrrid);
	                		if(!"".equals(strJcdId)){
	                			String[] str = strJcdId.split(",");
		                		for(int i = 0; i < str.length; ++i){
		                			Integer jcdid = Integer.parseInt(str[i]);
		                			contractDatabaseService.deleteByPrimaryKey(jcdid);
		                		}
	                		}
	                		if(jcdId != null){
	                			contractDatabaseService.deleteByPrimaryKey(jcdId);
	                		}
	                    	continue;
	                    }                              
	                }else{
                    	msg.append(row+"-");
                    	//System.out.println("9");
            			//Thread.sleep(20000);
                    }       
            	}
            }
        }
        csvReader.close();
    	bufferdReader.close();
    	String respMsg = "";
		if(finallyrow<=0){
			printlnMsg("-1");
		}else{
			respMsg =finallyrow+"-"+msg.toString();
			//System.out.println(fmsg);
			printlnMsg(respMsg);
		}
		System.out.println("数据导入结束："+respMsg);
		ActionContext.getContext().getSession().put("mesg","成功!");
		return null;
	}
	
	public ImportAttr getImportAttr() {
		return importAttr;
	}

	public void setImportAttr(ImportAttr importAttr) {
		this.importAttr = importAttr;
	}
	
	public void setHouseService(HouseService houseService) {
		this.houseService = houseService;
	}

	public void setHouseForRentService(HouseForRentService houseForRentService) {
		this.houseForRentService = houseForRentService;
	}

	public void setHouseForStoreService(HouseForStoreService houseForStoreService) {
		this.houseForStoreService = houseForStoreService;
	}

	public void setLandlordService(LandlordService landlordService) {
		this.landlordService = landlordService;
	}

	public void setRenterService(RenterService renterService) {
		this.renterService = renterService;
	}

	public void setRenewalLandlordService(
			RenewalLandlordService renewalLandlordService) {
		this.renewalLandlordService = renewalLandlordService;
	}

	public void setRenewalRenterService(RenewalRenterService renewalRenterService) {
		this.renewalRenterService = renewalRenterService;
	}

	public void setHouseDictService(HouseDictService houseDictService) {
		this.houseDictService = houseDictService;
	}

	public void setContractInstallmentService(
			ContractInstallmentService contractInstallmentService) {
		this.contractInstallmentService = contractInstallmentService;
	}
	
}