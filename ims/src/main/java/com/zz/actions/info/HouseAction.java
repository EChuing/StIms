package com.zz.actions.info;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.zz.actions.commons.UploadUtil;
import com.zz.other.Syslog;
import com.zz.po.info.InfoHouse;
import com.zz.po.journal.JourDevice;
import com.zz.service.journal.JourHsDeviceService;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.json.JSONUtil;

import au.com.bytecode.opencsv.CSVReader;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoHouseExpand;
import com.zz.po.info.InfoLandlordIntentionPerson;
import com.zz.po.journal.JournalFinancial;
import com.zz.po.journal.JournalFinancialExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.info.HouseService;
import com.zz.service.info.HouseServiceImpl;
import com.zz.service.info.LandlordIntentionPersonService;
import com.zz.service.journal.FinancialService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 房源资料
 * @author Administrator
 *
 */
public class HouseAction extends BaseAction implements ModelDriven<InfoHouseExpand>{
	private InfoHouse4storeExpand infoHouse4storeExpand;
	private InfoHouseExpand infoHouseExpand;
	private HouseService houseService;
	private LandlordIntentionPersonService landlordIntentionPersonService;
	private FinancialService financialService;
	public void setHouseService(HouseService houseService) {
        this.houseService = houseService;
    }
	public void setLandlordIntentionPersonService(
			LandlordIntentionPersonService landlordIntentionPersonService) {
		this.landlordIntentionPersonService = landlordIntentionPersonService;
	}
	public void setFinancialService(FinancialService financialService) {
		this.financialService = financialService;
	}
	@Autowired
	private JourHsDeviceService jourHsDeviceService;

    @Override
    public InfoHouseExpand getModel() {
        if( infoHouseExpand==null){
            infoHouseExpand = new InfoHouseExpand();
        }
        return infoHouseExpand;
    }
	
	/**
	 * 查询房源资料
	 * @return
	 */
    public String queryHousePaper(){
        //房源资料 - 查看 A00b01
        int auth1 = Authority.authorize("A00b01");
        //房源资料 - 可查看已托管 A00b02
        int auth2 = Authority.authorize("A00b02");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看房源资料权限", null));
            return null;
        } else {
            if (auth2 == 0 && ("已托管".equals(infoHouseExpand.getHouseSignedState()) || "全部".equals(infoHouseExpand.getHouseSignedState()))) {
                printlnOfJson(CommonMethodClass.jsonData(-3, "无查看房源资料已托管房源权限", null));
                return null;
            }
        }
        try {
            List<InfoHouseExpand> listCustom = houseService.queryHousePaper(infoHouseExpand);
            if(listCustom.size() > 0){
                String json = JSONUtil.serialize(listCustom);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }   
        return null;
    }
    
    /**
     * 无权限通用查询房源资料
     * @return
     */
    public String queryHousePaperCommon(){
        try {
            List<InfoHouseExpand> listCustom = houseService.queryHousePaperCommon(infoHouseExpand);
            if(listCustom.size() > 0){
                String json = JSONUtil.serialize(listCustom);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }   
        return null;
    }
	
	//设置私盘
	public String updateStateOwned(){
		try {
			InfoHouseExpand ihe = new InfoHouseExpand();
			if(!infoHouseExpand.getStateOwned().equals("公盘")&&!infoHouseExpand.getStateOwned().equals("私盘")){
				printlnOfJson(CommonMethodClass.jsonData(-1, "设置失败,(已经设置了私盘或公盘)", null));
				return null;
			}
			ihe.setHouseCoding(infoHouseExpand.getHouseCoding());
			ihe.setStateOwned(infoHouseExpand.getStateOwned());
			int result = houseService.updateHouse(ihe);
			if(result == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "设置私盘失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}
	
	//设置私盘关注
	public String firstFollowOfMine(){
		try {
			if(infoHouseExpand.getHouseCoding()==null 
				||infoHouseExpand.getHouseCoding().equals("")
				||infoHouseExpand.getFirstFollow()==null 
				||infoHouseExpand.getFirstFollow().equals("")){
				printlnOfJson(CommonMethodClass.jsonData(-1, "设置私盘关注失败,(盘源、跟进不能为空)", null));
				return null;
			}
			InfoHouseExpand ihe = new InfoHouseExpand();
			ihe.setHouseCoding(infoHouseExpand.getHouseCoding());
			ihe.setFirstFollow(infoHouseExpand.getFirstFollow());
			int result = houseService.updateHouse(ihe);
			if(result == 0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "设置私盘关注失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}
	
	//财务收支，项目查询
	public String queryVirtualFinancial(){
		try {
			List<InfoHouseExpand> list = houseService.virtualProperty(infoHouseExpand);
			if(list.size() != 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}
	
	//事务管理，项目查询
	public String queryVirtualThings(){
		try {
			List<InfoHouseExpand> list = houseService.virtualProperty(infoHouseExpand);
			if(list.size() != 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}
	
	//查询项目源
	public String virtualProperty(){
	    try {
            List<InfoHouseExpand> list = houseService.virtualProperty(infoHouseExpand);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
		return null;
	}
	
	//查询项目
    public String queryProject(){
        if ("项目".equals(infoHouseExpand.getAddCity())) {
            //项目 - 查询         C04b01
            int auth1 = Authority.authorize("C04b01");
            if (auth1 == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-3, "无查看项目权限", null));
                return null;
            }
        } else if ("库房".equals(infoHouseExpand.getAddCity())) {
            //库房 - 查询         C08b01
            int auth1 = Authority.authorize("C08b01");
            if (auth1 == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-3, "无查看库房权限", null));
                return null;
            }
        } else if ("供应商".equals(infoHouseExpand.getAddCity())) {
            //商家 - 查询         C09b01
            int auth1 = Authority.authorize("C09b01");
            if (auth1 == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-3, "无查看商家权限", null));
                return null;
            }
        } else if ("公区".equals(infoHouseExpand.getAddCity())) {
            //公区 - 查询       C10b01
            int auth1 = Authority.authorize("C10b01");
            if (auth1 == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-3, "无查看公区权限", null));
                return null;
            }
        } else {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无权限", null));
            return null;
        }
        try {
            List<InfoHouseExpand> list = houseService.virtualRoomVendorQuery(infoHouseExpand);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
        return null;
    }
    
    //查询办公区
    public String queryOffice(){
        try {
            List<InfoHouseExpand> list = houseService.queryOffice(infoHouseExpand);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
        return null;
    }
	
	//增加项目
	public String addOffice(){
	    try {
            int result = houseService.addOffice(infoHouseExpand);
            if(result == 0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "增加失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
		return null;
	}
	
	//项目修改
	public String updateOffice(){
	    try {
            int result = houseService.updateOffice(infoHouseExpand);
            if(result == 0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "项目修改失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
		return null;
	}
    
    //查询项目
    public String queryProjectCommon(){
        try {
            List<InfoHouseExpand> list = houseService.virtualRoomVendorQuery(infoHouseExpand);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
        return null;
    }
	
	//增加项目
	public String AddingVirtual(){
	    try {
            int result = houseService.insertSelective(infoHouseExpand);
            if(result == 0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "增加失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
		return null;
	}
	
	//项目修改
	public String updateVirtual(){
	    try {
            int result = houseService.updateHouse(infoHouseExpand);
            if(result == 0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "项目修改失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
		return null;
	}
	
	//项目收支总额、总收入、总支出、总冲账
	public String selectVirtualFinancialTotal(){
		try {
			Double income = 0.00;
			Double expenditure = 0.00;
			Double strike = 0.00;
			Double summary = 0.00;
			JournalFinancialExpand jF = new JournalFinancialExpand();
			jF.setJfHouseId(infoHouseExpand.getHouseCoding());
			jF.setBillingDateFrom(infoHouseExpand.getBillingDateFrom());
			jF.setBillingDateTo(infoHouseExpand.getBillingDateTo());
			List<JournalFinancial> flist = financialService.balanceByAccountId(jF);
			if (flist.size() > 0) {
				for (int j = 0; j < flist.size(); ++j) {
					String type = flist.get(j).getJfNatureOfThe();
					String status = flist.get(j).getJfStrikeABalanceStatus();
					if (type.equals("收入") && status.equals("正常")) {
						income += flist.get(j).getJfSumMoney();
					} else if (type.equals("支出") && status.equals("正常")) {
						expenditure += flist.get(j).getJfSumMoney();
					} else if (status.equals("被冲账")){
						strike += flist.get(j).getJfSumMoney();
					}
				}
				summary = income - expenditure;
				BigDecimal income1 = new BigDecimal(income);
				BigDecimal expenditure1 = new BigDecimal(expenditure);
				BigDecimal strike1 = new BigDecimal(strike);
				BigDecimal summary1 = new BigDecimal(summary);
	            income = income1.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
	            expenditure = expenditure1.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
	            strike = strike1.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
	            summary = summary1.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
	            infoHouseExpand.setIncome(income);
	            infoHouseExpand.setExpenditure(expenditure);
	            infoHouseExpand.setStrike(strike);
	            infoHouseExpand.setSummary(summary);
				String json = JSONUtil.serialize(infoHouseExpand);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "收支查询失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}
	
	//单个计算项目余额
	public String calBalanceOfVirtual() {
		// 未租房id
		int hId = infoHouseExpand.getHouseCoding();
		// 初始金额
		double initialAmount = infoHouseExpand.getHouseSellingPrice();
		// 校准金额
		double calibrationAmount = infoHouseExpand.getUnitPriceRent();
		// 查询财务收支汇总
		JournalFinancialExpand journalFinancialExpand = new JournalFinancialExpand();
		journalFinancialExpand.setJfHouseId(hId);
		try {
			Double num = 0.00;
			Double amount = 0.00;
			List<JournalFinancial> flist = financialService.theBalanceOfByHouseId(journalFinancialExpand);
			if (flist.size() > 0) {
				for (int j = 0; j < flist.size(); ++j) {
					String nature = flist.get(j).getJfNatureOfThe();
					if (nature.equals("收入")) {
						amount = amount + flist.get(j).getJfSumMoney();
					} else if (nature.equals("支出")) {
						amount = amount - flist.get(j).getJfSumMoney();
					}
				}
				num = initialAmount + amount + calibrationAmount;
			} else {
				num = initialAmount + calibrationAmount;
			}
			BigDecimal bg = new BigDecimal(num);  
            double f1 = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
            infoHouseExpand.setUnitPriceSell(f1);
			int i = houseService.updateByPrimaryKeySelective(infoHouseExpand);
			if (i == 1) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "单个计算项目余额失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}
	
	//统计gezi所有余额
	public String statisticsAllVirtualBalance(){
		try {
			int result = houseService.statisticsAllAccountBalance(infoHouseExpand);
			if(result == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "统计所有项目余额失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}
	
	//查找最大编号数
	public String queryHouseOfMaxNumber(){
		try {
			String result = houseService.selectOfMaxNumber();
			if(result!=null){
				int i=Integer.valueOf(result)+1;
				StringBuffer sb=new StringBuffer();
				String num=String.valueOf(i);
				for (int j = 0; j < 6-num.length(); j++) {
					sb.append("0");
				}
				if(num.length()<=6){
					result=sb.toString()+num;
					printlnMsg(result);
				}
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
			
		}
		return SUCCESS;
	}
	
	//增加记录
	public String insertHouse(){
	    try {
            System.out.println("======前台参数数据："+infoHouseExpand);
            //通过判断“小区名”、“楼栋号”、“门牌号”。如果已存在，前台需提醒“已存在”。后台不允许重复录入
            InfoHouseExpand he = new InfoHouseExpand();
            he.setAddCommunity(infoHouseExpand.getAddCommunity());
            he.setAddBuilding(infoHouseExpand.getAddBuilding());
            he.setAddDoorplateno(infoHouseExpand.getAddDoorplateno());

            //用“小区名”、“楼栋号”、“门牌号”去查询是否已存在此房源。
            List<InfoHouseExpand> addlist = houseService.queryHousePaperCommon(he);
            if(addlist.size() == 0){
                int result = houseService.insertSelective(infoHouseExpand);
                int id = infoHouseExpand.getHouseCoding();
                System.out.println("resultresultresultresult:"+result);
                if(result==0){
                    printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
                }else{
                    List<InfoHouseExpand> list = new ArrayList<InfoHouseExpand>();
                    InfoHouseExpand ihe = new InfoHouseExpand();
                    ihe.setHouseCoding(id);
                    list.add(ihe);
                    String  json = JSONUtil.serialize(list);
                    printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
                }
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-5, "已存在此房源", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
		return null;
	}
	
	//批量增加记录
	public String insertMany(){
		List<InfoHouseExpand> list = new ArrayList<>();
		List<InfoLandlordIntentionPerson>lipList = new ArrayList<>();
		String province = null;
		String street = null;
		String city = null;
		String district = null;
		String zone = null;
		String community = null;
		if(infoHouseExpand.getAddProvince() != null){
			province = infoHouseExpand.getAddProvince();
		}
		if(infoHouseExpand.getAddStreet() != null){
			street = infoHouseExpand.getAddStreet();
		}
		if(infoHouseExpand.getAddCity() != null){
			city = infoHouseExpand.getAddCity();
		}
		if(infoHouseExpand.getAddDistrict() != null){
			district = infoHouseExpand.getAddDistrict();
		}
		if(infoHouseExpand.getAddZone() != null){
			zone = infoHouseExpand.getAddZone();
		}
		if(infoHouseExpand.getAddCommunity() != null){
			community = infoHouseExpand.getAddCommunity();
		}
		int results = 0 ;
		CSVReader csvReader = null;
		BufferedReader bufferdReader = null;
		int row = 0;//标记文件行数
		int finallyrow = 0;//统计插入数据的数量 
		StringBuffer msg = new StringBuffer();
		try { 
			bufferdReader = new BufferedReader(new InputStreamReader(new FileInputStream(infoHouseExpand.getMyFile()),"gb2312"));//读取文件流
	        csvReader = new CSVReader(bufferdReader,',');
	        if(csvReader != null){
	            String[] csvRow = csvReader.readNext();//读取第一行“文件头” 
				//用户ID
	            SysUserExpand userInfo = (SysUserExpand)ActionContext.getContext().getSession().get("userinfo");
	            int department = userInfo.getSuDepartmentId();
	    		int storefront = userInfo.getSuStoreId();
				
	            while ((csvRow = csvReader.readNext()) != null){//从第二行开始录入数据
	            	//房东意向人
	            	InfoLandlordIntentionPerson lip = new InfoLandlordIntentionPerson();
	            	lip.setLipRegistrar(infoHouseExpand.getUserId());
	            	//盘源
	            	InfoHouseExpand oneInfo = new InfoHouseExpand();
	            	oneInfo.setHouseDictId(infoHouseExpand.getHouseDictId());
	            	oneInfo.setUserId(infoHouseExpand.getUserId());
	            	oneInfo.setAddProvince(province);
	            	oneInfo.setAddStreet(street);
	        		oneInfo.setAddCity(city);
	            	oneInfo.setAddDistrict(district);
	            	oneInfo.setAddZone(zone);
	            	oneInfo.setAddCommunity(community);
	            	oneInfo.setDepartment(department);
	            	oneInfo.setStorefront(storefront);
	            	if(!"".equals(csvRow)){
	            		int mark = 0;//标记列
	            		row++;//标记行数
	            		StringBuffer content = new StringBuffer();
	            		
	            		while(csvRow.length!=4){ //若行长度不为4或该行4个数据段加起来的值为空，则跳过该行，并记录该行数
	            			msg.append(row+"-");
	            			csvRow = csvReader.readNext();
	            			row++;//行数加1
	            		}
		                for (int i =0; i<4; i++){  
		                    String temp = csvRow[i];
		                    switch (i) {  
		                        case 0:  
		                        	if(!"".equals(temp)&& !temp.equals(null)){
		                        		oneInfo.setAddBuilding(temp);
		                        		System.out.print("第"+row+"行,第"+i+"个数据："+temp+"-");
		                        		mark++;
		                        	}
		                            break;  
		                        case 1:  
		                        	if(!"".equals(temp)&& !temp.equals(null)){
		                        		oneInfo.setAddDoorplateno(temp);
		                        		System.out.print(temp+"-");
		                        		mark++;
		                        	}
		                            break;
		                        case 2:  
		                        	if(!"".equals(temp)&& !temp.equals(null)){
		                        		lip.setLipLandlordName(temp);
		                        		System.out.print(temp+"-");
		                        		mark++;
		                        	}
		                            break;
		                        case 3:  
		                        	if(!"".equals(temp)&& !temp.equals(null)){
		                        		lip.setLipLandlordPhone(temp);
		                        		System.out.print(temp+"-");	
		                        	}
		                            break;
		                        default:  
		                            break;  
		                    } 
		                } 
		                //本条数据插入数据库
		                if(mark == 3){
		                	System.out.println("插入信息："+oneInfo.toString());
		                	//新增一个房东意向人，获取返回的id
		                	if(lip != null){
			                	int lipnum = landlordIntentionPersonService.insertSelective(lip);
			                	int lipId = lip.getLipId();
			                	oneInfo.setHouseLipId(lipId);
		                	}
		                	//放入盘源po类			        
							list.add(oneInfo);
		                	finallyrow++;//统计成功插入数据的数量
		                }else{
	                    	msg.append(row+"-");
		                }
	            	}
	            }
	        }
	        csvReader.close();
	    	bufferdReader.close();
	    	results = houseService.insertList(list);
	    } catch (Exception e) {  
	        e.printStackTrace();Syslog.writeErr(e);
	    }
		if(finallyrow<=0){
			printlnMsg("-1");
		}else{
			String fmsg =finallyrow+"-"+msg.toString();
			printlnMsg(fmsg);
		}
		return null;
	}
	
	//更新记录
	public String updateHouse(){
		try { 
			//获取地址
			/*String city = infoHouseExpand.getAddCity();
			String district = infoHouseExpand.getAddDistrict();
			String zone = infoHouseExpand.getAddZone();
			String community = infoHouseExpand.getAddCommunity();
			String building = infoHouseExpand.getAddBuilding();
			String doorplateno = infoHouseExpand.getAddDoorplateno();
			InfoHouseExpand he = new InfoHouseExpand();
			he.setAddCity(city);
			he.setAddDistrict(district);
			he.setAddZone(zone);
			he.setAddCommunity(community);
			he.setAddBuilding(building);
			he.setAddDoorplateno(doorplateno);
			//查询是否已经存在
			List<InfoHouseExpand> heList = houseService.queryHousePaperCommon(he);
			if(heList.size() != 0 && !heList.get(0).getHouseCoding().equals(infoHouseExpand.getHouseCoding()) ){
				//已经存在相同的地址
				printlnOfJson(CommonMethodClass.jsonData(-1, "已经存在相同的地址", null));
				return null;
			}		*/
			int result = houseService.updateHouse(infoHouseExpand);
			if(result==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "更新记录失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
    
    //公司成本统计
    public void getCompanyCost() {
        //公司成本 - 查询     F03b01
        int auth1 = Authority.authorize("F03b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看公司成本权限", null));
            return;
        }
        try {
            List<JournalFinancialExpand> list = houseService.getCompanyCost(infoHouseExpand);
            if (list.size() > 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
    }
    //查询办公区设备
    public void queryOfficeAreaDevice(){
      
    	SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
    	int userid = userInfo.getUserId();
    	System.out.println("user:"+userid);
        try {
			JourDevice jourDevice = new JourDevice();
			jourDevice.setDeviceType(infoHouseExpand.getDeviceType());
			jourDevice.setHsAddCity(infoHouseExpand.getHsAddCity());
			jourDevice.setHsAddCommunity(infoHouseExpand.getHsAddCommunity());
			jourDevice.setHsAddBuilding(infoHouseExpand.getHsAddBuilding());
			jourDevice.setHsAddDoorplateno(infoHouseExpand.getHsAddDoorplateno());
			jourDevice.setHsState(infoHouseExpand.getHsState());
			jourDevice.setHsLeaseState(infoHouseExpand.getHsLeaseState());
			jourDevice.setDevUserId(userid);
			jourDevice.setType(infoHouseExpand.getType());
            List<JourDevice> list= jourHsDeviceService.queryOfficeAreaDevice(jourDevice);
			System.out.println("============================"+list+"==========="+jourDevice);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
    }

    public void deleteHousePaperPic(){
		try {
			List<InfoHouseExpand> list = houseService.selectByPrimaryKey(infoHouseExpand.getHouseCoding());
			if (list.size() == 0) {
				printlnMsg("-1");
				return;
			}
			String oldPath = list.get(0).getHouseImgPath();
			String delPath = infoHouseExpand.getHouseImgPath();
			String newPath = UploadUtil.getNewPath(oldPath, delPath);
			infoHouseExpand.setHouseImgPath(newPath);
			int result = houseService.updateByPrimaryKeySelective(infoHouseExpand);
			if (result > 0) {
				printlnMsg("1");
			} else {
				printlnMsg("-1");
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
}
