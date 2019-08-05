package com.zz.service.journal;
import com.alibaba.fastjson.JSON;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.*;
import com.zz.mapper.journal.JournalContractDatabaseMapper;
import com.zz.mapper.journal.JournalFinancialMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.mapper.sys.SysVoucherNoMapper;
import com.zz.other.Syslog;
import com.zz.pay.strategy.OrangeCheckOrder;
import com.zz.pay.strategy.OrangeQRCodePay;
import com.zz.pay.strategy.WxPay;
import com.zz.po.commons.Result;
import com.zz.po.info.*;
import com.zz.po.journal.JournalContractDatabase;
import com.zz.po.journal.JournalFinancial;
import com.zz.po.journal.JournalFinancialExpand;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.sys.SysVoucherNo;
import com.zz.service.sys.SysVariablesService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

public class FinancialServiceImpl implements FinancialService{
	private InfoHouse4rentMapper infoHouse4rentMapper;
	public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
		this.infoHouse4rentMapper = infoHouse4rentMapper;
	}
	private SysVoucherNoMapper sysVoucherNoMapper;
	public void setSysVoucherNoMapper(SysVoucherNoMapper sysVoucherNoMapper) {
		this.sysVoucherNoMapper = sysVoucherNoMapper;
	}
	private InfoHouse4storeMapper infoHouse4storeMapper;
	public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}
	private InfoHouseMapper infoHouseMapper;
	public void setInfoHouseMapper(InfoHouseMapper infoHouseMapper) {
		this.infoHouseMapper = infoHouseMapper;
	}
	private InfoFinancialAccountMapper infoFinancialAccountMapper;
	public void setInfoFinancialAccountMapper(
			InfoFinancialAccountMapper infoFinancialAccountMapper) {
		this.infoFinancialAccountMapper = infoFinancialAccountMapper;
	}
	private JournalFinancialMapper journalFinancialMapper;
	public void setJournalFinancialMapper(
			JournalFinancialMapper journalFinancialMapper) {
		this.journalFinancialMapper = journalFinancialMapper;
	}
	private InfoContractInstallmentMapper infoContractInstallmentMapper;
	public void setInfoContractInstallmentMapper(
			InfoContractInstallmentMapper infoContractInstallmentMapper) {
		this.infoContractInstallmentMapper = infoContractInstallmentMapper;
	}
	private SysVariablesService sysVariablesService;
	public void setSysVariablesService(SysVariablesService sysVariablesService) {
        this.sysVariablesService = sysVariablesService;
    }
	private ContractDatabaseService contractDatabaseService;
    public void setContractDatabaseService(
            ContractDatabaseService contractDatabaseService) {
        this.contractDatabaseService = contractDatabaseService;
    }
    private JournalContractDatabaseMapper journalContractDatabaseMapper;
    public void setJournalContractDatabaseMapper(
            JournalContractDatabaseMapper journalContractDatabaseMapper) {
        this.journalContractDatabaseMapper = journalContractDatabaseMapper;
    }
    private HistoryPrintService historyPrintService;
    public void setHistoryPrintService(HistoryPrintService historyPrintService) {
        this.historyPrintService = historyPrintService;
    }
    @Autowired
    private JournalHousingFollowMapper journalHousingFollowMapper;

    @Override
	public int deleteByPrimaryKey(Integer jfFinancialCoding) throws Exception {
		return journalFinancialMapper.deleteByPrimaryKey(jfFinancialCoding);
	}

	@Override
	// 1.录入外部买卖房财务信息 ；2.录入内部管理项目财务信息 ，房源编码绑定经理项目屋ID
	public int insertSelective(JournalFinancial record) throws Exception {
		//获取传入的银行账户id，金额
		Integer faId = null; //账户id
		Double expenditure = 0.0; //支出
		Double income = 0.0; //收入
		String jfNatureOfThe = null; //收支性质
		String jfBigType = null; //收支类别
		String jfAccountingSpecies = null; //收支种类
		
		jfNatureOfThe = record.getJfNatureOfThe();
		jfBigType = record.getJfBigType();
		jfAccountingSpecies = record.getJfAccountingSpecies();
		Double money = record.getJfSumMoney(); //金额
		faId = record.getJfAccountId(); //账户id
		//判断收支性质
		if("收入".equals(jfNatureOfThe)){
			if("欠结类".equals(jfBigType)){
				if("租客预存款".equals(jfAccountingSpecies)){
					income += money;
				}
				if("租客还欠结款".equals(jfAccountingSpecies)){
					income += money;
				}
				if("待付房东款".equals(jfAccountingSpecies)){
					//不动账
				}
				if("房东还欠结款".equals(jfAccountingSpecies)){
					income += money;
				}
			}else{
				income += money;
			}
		}else if("支出".equals(jfNatureOfThe)){
			if("欠结类".equals(jfBigType)){
				if("租客欠结款".equals(jfAccountingSpecies)){
					//不动账
				}
				if("还租客预存款".equals(jfAccountingSpecies)){
					expenditure += money;
				}
				if("支付房东待付款".equals(jfAccountingSpecies)){
					expenditure += money;
				}
				if("房东欠结款".equals(jfAccountingSpecies)){
					//不动账
				}
			}else{
				expenditure += money;
			}
		}
		//结算余额
		Double faTheBalanceOf = income - expenditure;
		InfoFinancialAccount fa = new InfoFinancialAccount();
		fa.setFaId(faId);
		fa.setFaTheBalanceOf(faTheBalanceOf);
		int result1 = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
		if(result1 == 0){
			throw new Exception("结算余额失败");
		}
		//查询最新余额
		List<InfoFinancialAccount> getJfNowBalance = infoFinancialAccountMapper.selectByPrimaryKey(fa);
		Double jfNowBalance = getJfNowBalance.get(0).getFaTheBalanceOf();
		//将最新余额设置到收支的jfNowBalance(银行账户余额)里
		record.setJfNowBalance(jfNowBalance);
		
		//新增收支记录
		int result = journalFinancialMapper.insertSelective(record);
		if(result == 0){
			throw new Exception("新增收支记录失败");
		}

		//获取返回ID
		int id = record.getJfId();
		return id;
	}

	@Override
	public List<JournalFinancialExpand> selectByHouse4rentId(Integer houseId)
			throws Exception {
		return journalFinancialMapper.selectByHouse4rentId(houseId);
	}

	@Override
	public List<JournalFinancialExpand> selectByPrimaryKey(Integer jfFinancialCoding)
			throws Exception {
		return journalFinancialMapper.selectByPrimaryKey(jfFinancialCoding);
	}

	@Override
	//处理财务审核。
	//根据财务ID修改
	public int updateByPrimaryKeySelective(JournalFinancialExpand record, Integer a)
			throws Exception {
		//判断是否是冲账审核
		String jfStrikeABalanceStatus = null; //冲帐状态
		String jfAuditState = null; //审核状态
		jfAuditState = record.getJfAuditState();
		jfStrikeABalanceStatus = record.getJfStrikeABalanceStatus();
		Integer faid = null;
		Double jfSumMoney = 0.0;
		Integer hrId = null;
		Integer hsId = null;
		//获取银行账号id，与金额
		List<JournalFinancialExpand> FinancialList = journalFinancialMapper.strikeBalanceInterface(record);
		if(FinancialList.size() == 0){
			throw new Exception("未查询到收支记录");
		}
		String waterElectricalIdentification = FinancialList.get(0).getWaterElectricalIdentification();//水电气标识
		String strikeABalanceStatus = record.getJfStrikeABalanceStatus();//冲账状态
		Integer house4storeId = FinancialList.get(0).getJfHouse4storeId();//未租房id
		Double sumMoney = FinancialList.get(0).getJfSumMoney();//金额
		hrId = FinancialList.get(0).getJfHouse4rentId(); //已租id
		hsId = FinancialList.get(0).getJfHouse4storeId(); //未租id
		if(jfAuditState.equals("审核不通过") || jfAuditState.equals("无效")){
			if(jfStrikeABalanceStatus.equals("冲账")){//冲账--审核不通过---还原
				Integer jfStrikeBalanceEncoding = FinancialList.get(0).getJfStrikeBalanceEncoding(); //获取被冲账的id
				//查询被冲账的收支种类
				JournalFinancialExpand jf = new JournalFinancialExpand();
				jf.setJfId(jfStrikeBalanceEncoding);
				List<JournalFinancialExpand> FaList = journalFinancialMapper.strikeBalanceInterface(jf);
				if(FaList.size() == 0){
					throw new Exception("查询账目信息失败-----");
				}
				//判断是否是租客欠结
				if(FaList.get(0).getJfAccountingSpecies().equals("租客欠结")){
					InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
					infoHouse4rentExpand.setHrId(hrId);
					infoHouse4rentExpand.setArithmeticBase(0 - sumMoney);
					int result = infoHouse4rentMapper.arithmetic(infoHouse4rentExpand);
					if(result == 0){
						throw new Exception("租客欠结金额增减失败");
					}
				}
				//判断是否是房东欠结
				else if(FaList.get(0).getJfAccountingSpecies().equals("房东欠结")){
					InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
					infoHouse4storeExpand.setHsId(hsId);
					infoHouse4storeExpand.setTempBase(0 - sumMoney);
					int result = infoHouse4storeMapper.modifyTheBase(infoHouse4storeExpand);
					if(result == 0){
						throw new Exception("房东欠结金额增减失败");
					}
				}else{
					faid = FinancialList.get(0).getJfAccountId();
					jfSumMoney = FinancialList.get(0).getJfSumMoney();
					//金额正负转换
					jfSumMoney = 0 - jfSumMoney;
					//修改账户余额
					Double faTheBalanceOf = jfSumMoney;
					InfoFinancialAccount fa = new InfoFinancialAccount();
					fa.setFaId(faid);
					fa.setFaTheBalanceOf(faTheBalanceOf);
					int result1 = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
					if(result1 == 0){
						throw new Exception("结算余额失败");
					}
				}
				//修改票据编号信息
		        if (sysVariablesService.checkBillNum()) {
		            for (int i = 0; i < FaList.size(); i++) {
		                if("收入".equals(FaList.get(i).getJfNatureOfThe()) 
		                    && !("欠结类".equals(FaList.get(i).getJfBigType()) && "待付房东款".equals(FaList.get(i).getJfAccountingSpecies()))
                            && !("欠结类".equals(FaList.get(i).getJfBigType()) && "房东还欠结款".equals(FaList.get(i).getJfAccountingSpecies()))
		                    && !("财务类".equals(FaList.get(i).getJfBigType()) && "资金调配".equals(FaList.get(i).getJfAccountingSpecies()))){
		                    if(FaList.get(i).getJfTicketNumber() != null){
		                        int jcdId = contractDatabaseService.getJcdId(FaList.get(i).getJfTicketNumber());
	                            JournalContractDatabase jcd = new JournalContractDatabase();
	                            jcd.setJcdId(jcdId);
	                            jcd.setJcdUseState("已使用");
	                            jcd.setJcdUsedType("票据");
	                            jcd.setJcdHouseAddress(FaList.get(i).getJfAccountingWhy());
	                            jcd.setJcdContractPerson(FaList.get(i).getJfTheCashierPeople());
	                            jcd.setJcdSigningTime(FaList.get(i).getJfBillingDate());
	                            int result3 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
		                    }
		                }
		            }
		        }
			}
		}else{
			if(strikeABalanceStatus.equals("冲账")){
		        //判断是否是水电气的冲账
				if(a == 2){
			        if(waterElectricalIdentification != null && !waterElectricalIdentification.equals("")){
						//历史读数
						String[] historicalReadings = FinancialList.get(0).getHistoricalReadings().split(",");
						Double lastReading = Double.parseDouble(historicalReadings[0]);
						Double thisReading = Double.parseDouble(historicalReadings[1]);
						//查询未租房水电气储存字段
						List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.selectByPrimaryKey(house4storeId);
						if(hsList.size() == 0){
							throw new Exception("查找不到未租房");
						}
						//第一次json转换
						JSONObject json = JSONObject.fromObject(hsList.get(0).getHsMeterReadingRecord());
						if(!json.has("hotwater")){
							json.put("hotwater", "{'lastReading': 0.0,'thisReading': []}");
						}
						if(!json.has("hotair")){
							json.put("hotair", "{'lastReading': 0.0,'thisReading': []}");
						}
						String waterData = json.getString("water");
						String electritData = json.getString("electrit");
						String gasData = json.getString("gas");
						String hotwaterData = json.getString("hotwater");
						String hotairData = json.getString("hotair");
						//第二次json转换
						JSONObject waterjson = JSONObject.fromObject(waterData);
						JSONObject electritjson = JSONObject.fromObject(electritData);
						JSONObject gasjson = JSONObject.fromObject(gasData);
						JSONObject hotwaterjson = JSONObject.fromObject(hotwaterData);
						JSONObject hotairjson = JSONObject.fromObject(hotairData);
						//第三次转为数组
						String waterThis = waterjson.getString("thisReading");
						String electritThis = electritjson.getString("thisReading");
						String gasThis = gasjson.getString("thisReading");
						String hotwaterThis = hotwaterjson.getString("thisReading");
						String hotairThis = hotairjson.getString("thisReading");

						JSONArray waterlist = JSONArray.fromObject(waterThis);
						JSONArray electritlist = JSONArray.fromObject(electritThis);
						JSONArray gaslist = JSONArray.fromObject(gasThis);
						JSONArray hotwaterlist = JSONArray.fromObject(hotwaterThis);
						JSONArray hotairlist = JSONArray.fromObject(hotairThis);
						
						String water = ""+waterjson;
						String electrit = ""+electritjson;
						String gas = ""+gasjson;
						String hotwater = ""+hotwaterjson;
						String hotair = ""+hotairjson;
						
						//判断是水、电、气、热水、暖气
						//拼接字段
						if(waterElectricalIdentification.equals("水")){
							waterlist.add(thisReading);
							water = "{'lastReading':"+lastReading+",'thisReading':"+waterlist+"}";
						}else if(waterElectricalIdentification.equals("电")){
							electritlist.add(thisReading);
							electrit = "{'lastReading':"+lastReading+",'thisReading':"+electritlist+"}";
						}else if(waterElectricalIdentification.equals("气")){
							gaslist.add(thisReading);
							gas = "{'lastReading':"+lastReading+",'thisReading':"+gaslist+"}";
						}else if(waterElectricalIdentification.equals("热水")){
							hotwaterlist.add(thisReading);
							hotwater = "{'lastReading':"+lastReading+",'thisReading':"+hotwaterlist+"}";
						}else if(waterElectricalIdentification.equals("暖气")){
							hotairlist.add(thisReading);
							hotair = "{'lastReading':"+lastReading+",'thisReading':"+hotairlist+"}";
						}
						String mrr = "{'water':"+water+",'electrit':"+electrit+",'gas':"+gas+",'hotwater':"+hotwater+",'hotair':"+hotair+"}";
						InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
						hs.setHsId(house4storeId);
						hs.setHsMeterReadingRecord(mrr);
						int result1 = infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
						if(result1 == 0){
							throw new Exception("未租房修改失败");
						}
					}
				}
			}
		}
		int result = journalFinancialMapper.updateByPrimaryKeySelective(record);
		if(result == 0){
			throw new Exception("审核失败");
		}
		return 1;
	}

	@Override
	public List<JournalFinancialExpand> selectAll(
			JournalFinancialExpand conditions) throws Exception {
		return journalFinancialMapper.selectAll(conditions);
	}

	@Override
	//根据房屋ID修改
	public int updateByHouse4rentId(JournalFinancial record) throws Exception {
		return journalFinancialMapper.updateByHouse4rentId(record);
	}

	@Override
	public String selectOfMaxNumber() throws Exception {
		return journalFinancialMapper.selectOfMaxNumber();
	}


	@Override
	//查询所有的财务信息、冲账和被冲账与分页,给条件则为条件查询
	public List<JournalFinancialExpand> selectInformationAll(
			JournalFinancialExpand str) throws Exception {
		return journalFinancialMapper.selectInformationAll(str);
	}
	
	@Override
	public List<JournalFinancialExpand> allNormalAndVirtualPayments(
			JournalFinancialExpand str) throws Exception {
		return journalFinancialMapper.allNormalAndVirtualPayments(str);
	}

	@Override
	public List<JournalFinancialExpand> strikeBalanceInterface(JournalFinancialExpand jf)
			throws Exception {
		return journalFinancialMapper.strikeBalanceInterface(jf);
	}

	@Override
	public List<JournalFinancial> balanceId(JournalFinancial jfStrikeBalanceEncoding)
			throws Exception {
		return journalFinancialMapper.balanceId(jfStrikeBalanceEncoding);
	}

	//财务收支录入
	@Override
	public int insertList(List<JournalFinancial> recordList, int number) throws Exception {
		//获取传入的银行账户id，金额
		Integer faId = null; //账户id
		Double expenditure = 0.0; //支出
		Double income = 0.0; //收入
		String jfNatureOfThe = null; //收支性质
		String jfBigType = null;//收支类别
		String jfAccountingSpecies = null; //收支种类（只用于判断欠结）
		
		Double tempMoney = 0.0; //租客欠结金额
		Double supplementAmount = 0.0; //租客补结金额
		
		Double landlordTempMoney = 0.0; //房东欠结金额
		Double landlordSupplementAmount = 0.0; //房东补结金额
		
		Integer hrId = null;//已租id
		Integer hsId = null;//未租id
		int temp = -1;
		recordList = setManagerUserId(recordList);
		System.out.println("insert recodList="+recordList);
		JSONArray jhfJsonArray = new JSONArray();
		for(int i = 0; i < recordList.size(); ++i){
			jfNatureOfThe = recordList.get(i).getJfNatureOfThe();
			jfBigType = recordList.get(i).getJfBigType();
			jfAccountingSpecies = recordList.get(i).getJfAccountingSpecies();
			Double money = recordList.get(i).getJfSumMoney(); //金额
			faId = recordList.get(i).getJfAccountId(); //账户id
			hrId = recordList.get(i).getJfHouse4rentId();
			hsId = recordList.get(i).getJfHouse4storeId();
			income = 0.00;
			expenditure = 0.00;
			//判断收支性质
			if("收入".equals(jfNatureOfThe)){
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("jhfDepartment", recordList.get(i).getDepartment());
				jsonObj.put("jhfStorefront", recordList.get(i).getStorefront());
				jsonObj.put("jhfHouse4rentId", recordList.get(i).getJfHouse4rentId());
				jsonObj.put("jhfHouse4storeId", recordList.get(i).getJfHouse4storeId());
				jsonObj.put("jhfHouseId", recordList.get(i).getJfHouseId());
				jsonObj.put("jhfFollowRemark", "生成收支："+recordList.get(i).getJfBigType()+"—"+recordList.get(i).getJfAccountingSpecies()+recordList.get(i).getJfSumMoney()+"元。");
				jsonObj.put("jhfFollowpResult", "跟进成功");
				jsonObj.put("jhfPaymentWay", "系统跟进");
				jsonObj.put("jhfUserId", recordList.get(i).getJfHandlers());
				jhfJsonArray.add(jsonObj);

				if("欠结类".equals(jfBigType)){

					
					if("租客预存款".equals(jfAccountingSpecies)){
						income += money;
						supplementAmount += money;
					}
					if("租客还欠结款".equals(jfAccountingSpecies)){
						income += money;
						supplementAmount += money;
					}
					if("租客优惠金".equals(jfAccountingSpecies)){
						//不动账
						supplementAmount += money;
					}
					if("待付房东款".equals(jfAccountingSpecies)){
						//不动账
						landlordSupplementAmount += money;
					}
					if("房东还欠结款".equals(jfAccountingSpecies)){
						income += money;
						landlordSupplementAmount += money;
					}
				}else{
					income += money;
				}
			}else if("支出".equals(jfNatureOfThe)){
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("jhfDepartment", recordList.get(i).getDepartment());
				jsonObj.put("jhfStorefront", recordList.get(i).getStorefront());
				jsonObj.put("jhfHouse4rentId", recordList.get(i).getJfHouse4rentId());
				jsonObj.put("jhfHouse4storeId", recordList.get(i).getJfHouse4storeId());
				jsonObj.put("jhfHouseId", recordList.get(i).getJfHouseId());
				jsonObj.put("jhfFollowRemark", "生成收支："+recordList.get(i).getJfBigType()+"—"+recordList.get(i).getJfAccountingSpecies()+recordList.get(i).getJfSumMoney()+"元。");
				jsonObj.put("jhfFollowpResult", "跟进成功");
				jsonObj.put("jhfPaymentWay", "系统跟进");
				jsonObj.put("jhfUserId", recordList.get(i).getJfHandlers());
				jhfJsonArray.add(jsonObj);

				if("欠结类".equals(jfBigType)){

					if("租客欠结款".equals(jfAccountingSpecies)){
						//不动账
						tempMoney += money;
					}
					if("还租客预存款".equals(jfAccountingSpecies)){
						expenditure += money;
						tempMoney += money;
					}
					if("支付房东待付款".equals(jfAccountingSpecies)){
						expenditure += money;
						landlordTempMoney += money;
					}
					if("房东欠结款".equals(jfAccountingSpecies)){
						//不动账
						landlordTempMoney += money;
					}
					if("充值优惠券".equals(jfAccountingSpecies)){
						//不动账
						supplementAmount += money;
					}
				}else{
					expenditure += money;
				}
			}
			//结算余额
			Double faTheBalanceOf = income - expenditure;
			//挂账
			if("挂账".equals(recordList.get(i).getJfSettlementMethod()) && recordList.get(i).getJfCreditSituation() == 1){
				faTheBalanceOf = 0.00;
			}
			InfoFinancialAccount fa = new InfoFinancialAccount();
			System.out.println(faId+",,"+faTheBalanceOf);
			fa.setFaId(faId);
			fa.setFaTheBalanceOf(faTheBalanceOf);
			if (faTheBalanceOf != 0) {
				int result1 = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
				if(result1 == 0){
					throw new Exception("结算余额失败");
				}
			}
			//查询最新余额
			List<InfoFinancialAccount> getJfNowBalance = infoFinancialAccountMapper.selectByPrimaryKey(fa);
			Double jfNowBalance = getJfNowBalance.get(0).getFaTheBalanceOf();
			//将最新余额设置到每一条收支的jfNowBalance(银行账户余额)里
			recordList.get(i).setJfNowBalance(jfNowBalance);
		}
		//新增收支记录
		System.out.println(recordList);
		int result = journalFinancialMapper.insertList(recordList);
		if(result == 0){
			throw new Exception("新增收支记录失败");
		}
			
		//租客欠结金额增减
		if(tempMoney != 0 || supplementAmount != 0){
			InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
			infoHouse4rentExpand.setHrId(hrId);
			infoHouse4rentExpand.setArithmeticBase(tempMoney - supplementAmount);
			int result2 = infoHouse4rentMapper.arithmetic(infoHouse4rentExpand);
			if(result2 == 0){
				throw new Exception("租客欠结金额增减失败");
			}
			temp = 1;
		}
		//房东欠结金额增减
		if(landlordTempMoney != 0 || landlordSupplementAmount != 0){
			InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
			infoHouse4storeExpand.setHsId(hsId);
			infoHouse4storeExpand.setTempBase(landlordTempMoney - landlordSupplementAmount);
			int result3 = infoHouse4storeMapper.modifyTheBase(infoHouse4storeExpand);
			if(result3 == 0){
				throw new Exception("房东欠结金额增减失败");
			}
			temp = 1;
		}
		 
		if(number == 1){
			//修改分期账单
			InfoContractInstallmentExpand ici = new InfoContractInstallmentExpand();
			ici.setJciHouse4rentId(recordList.get(0).getJfHouse4rentId());
			ici.setJciPeriods(1);
			List<InfoContractInstallmentExpand> listJci = infoContractInstallmentMapper.rentIdAll(ici);
			//取出第一期的分期账单id
			if(listJci.size() != 0){
				Integer jciId = listJci.get(0).getJciId();
				InfoContractInstallmentExpand ici1 = new InfoContractInstallmentExpand();
				ici1.setJciId(jciId);
				ici1.setJciState("已收");
				int reslut = infoContractInstallmentMapper.updateByPrimaryKeySelective(ici1);
			}
		}
		
		//修改票据编号信息
		if (sysVariablesService.checkBillNum()) {
		    for (int i = 0; i < recordList.size(); i++) {
		        if("收入".equals(recordList.get(i).getJfNatureOfThe()) 
		            && !("欠结类".equals(recordList.get(i).getJfBigType()) && "待付房东款".equals(recordList.get(i).getJfAccountingSpecies()))
                    && !("欠结类".equals(recordList.get(i).getJfBigType()) && "房东还欠结款".equals(recordList.get(i).getJfAccountingSpecies()))
		            && !("财务类".equals(recordList.get(i).getJfBigType()) && "资金调配".equals(recordList.get(i).getJfAccountingSpecies()))){
		            if(recordList.get(i).getJfTicketNumber() != null){
		                int jcdId = contractDatabaseService.getJcdId(recordList.get(i).getJfTicketNumber());
	                    JournalContractDatabase jcd = new JournalContractDatabase();
	                    jcd.setJcdId(jcdId);
	                    jcd.setJcdUseState("已使用");
	                    jcd.setJcdUsedType("票据");
	                    jcd.setJcdHouseAddress(recordList.get(i).getJfAccountingWhy());
	                    jcd.setJcdContractPerson(recordList.get(i).getJfTheCashierPeople());
	                    jcd.setJcdSigningTime(recordList.get(i).getJfBillingDate());
	                    int result3 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
		            }
	            }
		    }
		}
		System.out.println("12222222222222222:  "+jhfJsonArray.size());
		if(jhfJsonArray.size() != 0){
			List<JournalHousingFollowExpand> followList = JSON.parseArray(jhfJsonArray.toString(),JournalHousingFollowExpand.class);
			int result4 = journalHousingFollowMapper.financialInsertHousingFollow(followList);
			if(result4 == 0){
				throw new Exception("新增系统跟进失败");
			}
		}
		return 1;
	}
 
	@Override
	public List<JournalFinancial> theBalanceOf(JournalFinancialExpand datatime)
			throws Exception {
		return journalFinancialMapper.theBalanceOf(datatime);
	}
	
	@Override
	public List<JournalFinancial> balanceByBillingDate(
			JournalFinancialExpand datatime) throws Exception {
		return journalFinancialMapper.balanceByBillingDate(datatime);
	}
	
	@Override
	public List<JournalFinancial> balanceByAccountId(
			JournalFinancialExpand datatime) throws Exception {
		return journalFinancialMapper.balanceByAccountId(datatime);
	}


	@Override
	public List<JournalFinancialExpand> allvirtualPayments(
			JournalFinancialExpand str) throws Exception {
		return journalFinancialMapper.allvirtualPayments(str);
	}


	@Override
	public List<JournalFinancialExpand> documentQuery(JournalFinancialExpand str)
			throws Exception {
		return journalFinancialMapper.documentQuery(str);
	}


	@Override
	public List<JournalFinancialExpand> certificateDetails(
			JournalFinancialExpand str) throws Exception {
		return journalFinancialMapper.certificateDetails(str);
	}


	@Override
	public int rentEachPayment(JournalFinancialExpand journalFinancialExpand) throws Exception {
		int temp = -1;
		List<JournalFinancial> list = new ArrayList<JournalFinancial>();
		String jsonArray = journalFinancialExpand.getJsonArray();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		String strid = "";
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
			if("".equals(jf.getJfStartCycle())){
				jf.setJfStartCycle(CommonMethodClass.getCurrentDate());
			}
			if("".equals(jf.getJfEndCycle())){
				jf.setJfEndCycle(CommonMethodClass.getCurrentDate());
			}
			list.add(jf);
		}
		list = setManagerUserId(list);
		if(list.size() >0){
			//获取传入的银行账户id，金额
			Integer faId = null; //账户id
			Double expenditure = 0.0; //支出
			Double income = 0.0; //收入
			String jfNatureOfThe = null; //收支性质
			String jfBigType = null;//收支类别
			String jfAccountingSpecies = null; //收支种类（只用于判断欠结)
			Double tempMoney = 0.0; //欠结金额
			Double supplementAmount = 0.0; //补结金额
			Integer hrId = null;//已租id
			
			for(int i = 0; i < list.size(); ++i){
				jfNatureOfThe = list.get(i).getJfNatureOfThe();//此条收支的收支性质
				jfBigType = list.get(i).getJfBigType();//此条收支的收支类别
				jfAccountingSpecies = list.get(i).getJfAccountingSpecies();//此条收支的收支种类
				Double money = list.get(i).getJfSumMoney(); //此条收支的金额
				faId = list.get(i).getJfAccountId(); //账户id
				hrId = list.get(i).getJfHouse4rentId();//已租ID
				income = 0.0;
				expenditure = 0.0;
				// 判断收支性质
				if("收入".equals(jfNatureOfThe)){
					if("欠结类".equals(jfBigType)){
						if("租客预存款".equals(jfAccountingSpecies)){
							income += money;
							supplementAmount += money;
						}
						if("租客还欠结款".equals(jfAccountingSpecies)){
							income += money;
							supplementAmount += money;
						}
						if("租客优惠金".equals(jfAccountingSpecies)){
							//不动账
							supplementAmount += money;
						}
					}else{
						income += money;
					}
				}else if("支出".equals(jfNatureOfThe)){
					if("欠结类".equals(jfBigType)){
						if("租客欠结款".equals(jfAccountingSpecies)){
							//不动账
							tempMoney += money;
						}
						if("还租客预存款".equals(jfAccountingSpecies)){
							expenditure += money;
							tempMoney += money;
						}
					}else{
						expenditure += money;
					}
				}
				//结算余额
				Double faTheBalanceOf = income - expenditure;
				InfoFinancialAccount fa = new InfoFinancialAccount();
				fa.setFaId(faId);
				fa.setFaTheBalanceOf(faTheBalanceOf);
				int result2 = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
				if(result2 == 0){
					throw new Exception("结算余额失败");
				}
				//查询最新余额
				List<InfoFinancialAccount> getJfNowBalance = infoFinancialAccountMapper.selectByPrimaryKey(fa);
				Double jfNowBalance = getJfNowBalance.get(0).getFaTheBalanceOf();
				//将最新余额设置到每一条收支的jfNowBalance(银行账户余额)里
				list.get(i).setJfNowBalance(jfNowBalance);
			}
			journalFinancialMapper.insertList(list);
			//欠结金额增减
			if(tempMoney != 0 || supplementAmount != 0){
				InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
				infoHouse4rentExpand.setHrId(hrId);
				infoHouse4rentExpand.setArithmeticBase(tempMoney - supplementAmount);
				int result = infoHouse4rentMapper.arithmetic(infoHouse4rentExpand);
				System.out.println("应该加上去："+tempMoney);
				if(result == 0){
					throw new Exception("欠结金额增减失败");
				}
				temp = 1;
			}
			
			//修改分期账单状态
			if(journalFinancialExpand.getJciId() != null && !journalFinancialExpand.getJciId().equals("")){
				InfoContractInstallment ici = new InfoContractInstallment();
				ici.setJciId(journalFinancialExpand.getJciId());
				ici.setJciState("已收");
				infoContractInstallmentMapper.updateByPrimaryKeySelective(ici);
			}
			temp = 1;
		}
		return temp;
	}

	@Override
	public int financialAudit(JournalFinancialExpand record) throws Exception {
		return dealWithFinancialAudit(record);
	}
	
	//处理-财务收支复核审核
	private int dealWithFinancialAudit(JournalFinancialExpand journalFinancialExpand) throws Exception{
		//查询所需数据
		List<JournalFinancialExpand> faList = journalFinancialMapper.strikeBalanceInterface(journalFinancialExpand);
		if(faList.size() == 0){
			throw new Exception("没找到收支记录");
		}
		String waterElectricalIdentification = faList.get(0).getWaterElectricalIdentification();//水电气标识
		String strikeABalanceStatus = journalFinancialExpand.getJfStrikeABalanceStatus();//冲账状态
		String auditState = journalFinancialExpand.getJfAuditState();//审核状态
		Integer house4storeId = faList.get(0).getJfHouse4storeId();//未租房id
		Integer accountId = faList.get(0).getJfAccountId();//银行账号
		Double sumMoney = faList.get(0).getJfSumMoney();//金额
		String natureOfThe = faList.get(0).getJfNatureOfThe();//收支性质（收入、支出、欠结)
		String bigType = faList.get(0).getJfBigType();//收支类别
		String accountingSpecies = faList.get(0).getJfAccountingSpecies();//收入支出种类(只操作，租客补结)
		Double jfSumMoney = 0.00;
		Integer hrId = faList.get(0).getJfHouse4rentId(); // 已租id
		Integer hsId = faList.get(0).getJfHouse4storeId(); // 未租id
		int temp = -1;
		
		Double expenditure = 0.0; //支出
		Double income = 0.0; //收入
		Double tempMoney = 0.0; //租客欠结金额
		Double supplementAmount = 0.0; //租客补结金额
		
		Double landlordTempMoney = 0.0; //房东欠结金额
		Double landlordSupplementAmount = 0.0; //房东补结金额
		
		
		//复核是否通过，通过则执行下面判断
		if(auditState.equals("已复核")){
			if(strikeABalanceStatus.equals("冲账")){
		        //判断是否是水电气的冲账
		        if(waterElectricalIdentification != null && !waterElectricalIdentification.equals("")){
					//历史读数2365.0,54872.0
					String[] historicalReadings = faList.get(0).getHistoricalReadings().split(",");
					Double lastReading = Double.parseDouble(historicalReadings[0]);
					Double thisReading = Double.parseDouble(historicalReadings[1]);
					//查询未租房水电气储存字段
					InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
					List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.selectByPrimaryKey(house4storeId);
					if(hsList.size() == 0){
						throw new Exception("查找不到未租房");
					}
					//第一次json转换
					JSONObject json = JSONObject.fromObject(hsList.get(0).getHsMeterReadingRecord());
					if(!json.has("hotwater")){
						json.put("hotwater", "{'lastReading': 0.0,'thisReading': []}");
					}
					if(!json.has("hotair")){
						json.put("hotair", "{'lastReading': 0.0,'thisReading': []}");
					}
					String waterData = json.getString("water");
					String electritData = json.getString("electrit");
					String gasData = json.getString("gas");
					String hotwaterData = json.getString("hotwater");
					String hotairData = json.getString("hotair");
					//第二次json转换
					JSONObject waterjson = JSONObject.fromObject(waterData);
					JSONObject electritjson = JSONObject.fromObject(electritData);
					JSONObject gasjson = JSONObject.fromObject(gasData);
					JSONObject hotwaterjson = JSONObject.fromObject(hotwaterData);
					JSONObject hotairjson = JSONObject.fromObject(hotairData);
					//第三次转为数组
					String waterThis = waterjson.getString("thisReading");
					String electritThis = electritjson.getString("thisReading");
					String gasThis = gasjson.getString("thisReading");
					String hotwaterThis = hotwaterjson.getString("thisReading");
					String hotairThis = hotairjson.getString("thisReading");
					JSONArray waterlist = JSONArray.fromObject(waterThis);
					JSONArray electritlist = JSONArray.fromObject(electritThis);
					JSONArray gaslist = JSONArray.fromObject(gasThis);
					JSONArray hotwaterlist = JSONArray.fromObject(hotwaterThis);
					JSONArray hotairlist = JSONArray.fromObject(hotairThis);

					String water = ""+waterjson;
					String electrit = ""+electritjson;
					String gas = ""+gasjson;
					String hotwater = ""+hotwaterjson;
					String hotair = ""+hotairjson;
					//判断是水、电、气
					//拼接字段
					if(waterElectricalIdentification.equals("水")){
						waterlist.add(thisReading);
						water = "{'lastReading':"+lastReading+",'thisReading':"+waterlist+"}";
					}else if(waterElectricalIdentification.equals("电")){
						electritlist.add(thisReading);
						electrit = "{'lastReading':"+lastReading+",'thisReading':"+electritlist+"}";
					}else if(waterElectricalIdentification.equals("气")){
						gaslist.add(thisReading);
						gas = "{'lastReading':"+lastReading+",'thisReading':"+gaslist+"}";
					}else if(waterElectricalIdentification.equals("热水")){
						hotwaterlist.add(thisReading);
						hotwater = "{'lastReading':"+lastReading+",'thisReading':"+hotwaterlist+"}";
					}else if(waterElectricalIdentification.equals("暖气")){
						hotairlist.add(thisReading);
						hotair = "{'lastReading':"+lastReading+",'thisReading':"+hotairlist+"}";
					}
					String mrr = "{'water':"+water+",'electrit':"+electrit+",'gas':"+gas+",'hotwater':"+hotwater+",'hotair':"+hotair+"}";
					hs.setHsId(house4storeId);
					hs.setHsMeterReadingRecord(mrr);
					int result1 = infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
					if(result1 == 0){
						throw new Exception("未租房修改失败");
					}
				}
			}
		}else if(auditState.equals("复核不通过") || auditState.equals("无效")){
			if(strikeABalanceStatus.equals("冲账")){//冲账--复核不通过---还原
				Integer jfStrikeBalanceEncoding = faList.get(0).getJfStrikeBalanceEncoding(); //获取被冲账的id
				//查询被冲账的收支种类
				JournalFinancialExpand jf = new JournalFinancialExpand();
				jf.setJfId(jfStrikeBalanceEncoding);
				List<JournalFinancialExpand> FaList = journalFinancialMapper.strikeBalanceInterface(jf);
				if(FaList.size() == 0){
					throw new Exception("查询账目信息失败-----");
				}
				//判断是否需要动账
				if("收入".equals(natureOfThe)){
					if("欠结类".equals(bigType)){
						if("租客预存款".equals(accountingSpecies)){
							income += sumMoney;
							tempMoney += sumMoney;
						}
						if("租客还欠结款".equals(accountingSpecies)){
							income += sumMoney;
							tempMoney += sumMoney;
						}
						if("租客优惠金".equals(accountingSpecies)){
							//不动账
							tempMoney += sumMoney;
						}
						if("待付房东款".equals(accountingSpecies)){
							//不动账
							landlordTempMoney += sumMoney;
						}
						if("房东还欠结款".equals(accountingSpecies)){
							income += sumMoney;
							landlordTempMoney += sumMoney;
						}
					}else{
						income += sumMoney;
					}
				}else if("支出".equals(natureOfThe)){
					if("欠结类".equals(bigType)){
						if("租客欠结款".equals(accountingSpecies)){
							//不动账
							supplementAmount += sumMoney;
						}
						if("还租客预存款".equals(accountingSpecies)){
							expenditure += sumMoney;
							supplementAmount += sumMoney;
						}
						if("支付房东待付款".equals(accountingSpecies)){
							expenditure += sumMoney;
							landlordSupplementAmount += sumMoney;
						}
						if("房东欠结款".equals(accountingSpecies)){
							//不动账
							landlordSupplementAmount += sumMoney;
						}
					}else{
						expenditure += sumMoney;
					}
				}
				//结算余额
				Double faTheBalanceOf = income - expenditure;
				InfoFinancialAccount fa = new InfoFinancialAccount();
				fa.setFaId(faList.get(0).getJfAccountId());
				fa.setFaTheBalanceOf(faTheBalanceOf);
				int result1 = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
				if(result1 == 0){
					throw new Exception("结算余额失败");
				}
				//查询最新余额
				List<InfoFinancialAccount> getJfNowBalance = infoFinancialAccountMapper.selectByPrimaryKey(fa);
				Double jfNowBalance = getJfNowBalance.get(0).getFaTheBalanceOf();
				//将最新余额设置到每一条收支的jfNowBalance(银行账户余额)里
				journalFinancialExpand.setJfNowBalance(jfNowBalance);
				
				//租客欠结金额增减
				if(tempMoney != 0 || supplementAmount != 0){
					InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
					infoHouse4rentExpand.setHrId(hrId);
					infoHouse4rentExpand.setArithmeticBase(tempMoney - supplementAmount);
					int result2 = infoHouse4rentMapper.arithmetic(infoHouse4rentExpand);
					if(result2 == 0){
						throw new Exception("租客欠结金额增减失败");
					}
					temp = 1;
				}
				//房东欠结金额增减
				if(landlordTempMoney != 0 || landlordSupplementAmount != 0){
					InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
					infoHouse4storeExpand.setHsId(hsId);
					infoHouse4storeExpand.setTempBase(landlordTempMoney - landlordSupplementAmount);
					int result3 = infoHouse4storeMapper.modifyTheBase(infoHouse4storeExpand);
					if(result3 == 0){
						throw new Exception("房东欠结金额增减失败");
					}
					temp = 1;
				}
				//修改票据编号信息
                if (sysVariablesService.checkBillNum()) {
                    for (int i = 0; i < FaList.size(); i++) {
                        if("收入".equals(FaList.get(i).getJfNatureOfThe()) 
                            && !("欠结类".equals(FaList.get(i).getJfBigType()) && "待付房东款".equals(FaList.get(i).getJfAccountingSpecies()))
                            && !("欠结类".equals(FaList.get(i).getJfBigType()) && "房东还欠结款".equals(FaList.get(i).getJfAccountingSpecies()))
                            && !("财务类".equals(FaList.get(i).getJfBigType()) && "资金调配".equals(FaList.get(i).getJfAccountingSpecies()))){
                            if(FaList.get(i).getJfTicketNumber() != null){
                                int jcdId = contractDatabaseService.getJcdId(FaList.get(i).getJfTicketNumber());
                                JournalContractDatabase jcd = new JournalContractDatabase();
                                jcd.setJcdId(jcdId);
                                jcd.setJcdUseState("已使用");
                                jcd.setJcdUsedType("票据");
                                jcd.setJcdHouseAddress(FaList.get(i).getJfAccountingWhy());
                                jcd.setJcdContractPerson(FaList.get(i).getJfTheCashierPeople());
                                jcd.setJcdSigningTime(FaList.get(i).getJfBillingDate());
                                int result3 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
                            }
                        }
                    }
                }
			}
		}
		int result4 = journalFinancialMapper.updateByPrimaryKeySelective(journalFinancialExpand);
		if(result4 == 0){
			throw new Exception("不通过");
		}
		return 1;
	}

	@Override
	public List<JournalFinancial> theBalanceOfByHouseId(
			JournalFinancialExpand datatime) throws Exception {
		return journalFinancialMapper.theBalanceOfByHouseId(datatime);
	}

	@Override
	public int financialVirtualReview(JournalFinancialExpand journalFinancialExpand)
			throws Exception {
		return upVirtualReview(journalFinancialExpand);
	}
	
	//项目收支复核处理
	private int upVirtualReview(JournalFinancialExpand journalFinancialExpand) throws Exception{
		//查询所需数据
		List<JournalFinancialExpand> faList = journalFinancialMapper.strikeBalanceInterface(journalFinancialExpand);
		if(faList.size() == 0){
			throw new Exception("没找到收支记录");
		}
		String strikeABalanceStatus = journalFinancialExpand.getJfStrikeABalanceStatus();//冲账状态
		String auditState = journalFinancialExpand.getJfAuditState();//审核状态
		Integer house4storeId = faList.get(0).getJfHouse4storeId();//未租房id
		Integer accountId = faList.get(0).getJfAccountId();//银行账号
		Double sumMoney = faList.get(0).getJfSumMoney();//金额
		String natureOfThe = faList.get(0).getJfNatureOfThe();//收支性质（收入、支出、欠结)
		Integer hdId = faList.get(0).getJfHouseId();//盘源id
		Double jfSumMoney = 0.00;
		int faId = 0;
		//复核是否通过，通过则执行下面判断
		if(auditState.equals("已复核")){
			if(strikeABalanceStatus.equals("正常")){
				if(accountId != null){
					//判断收支性质，加减金额
					if(natureOfThe.equals("收入")){
						jfSumMoney += sumMoney;
					}else if(natureOfThe.equals("支出")){
						jfSumMoney -= sumMoney;
					}
					faId = accountId;
				}
				//四舍五入
				BigDecimal bg = new BigDecimal(jfSumMoney);  
		        double f1 = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
		        Double faTheBalanceOf = f1;
		        if(faId != 0){
		        	InfoFinancialAccount jfa = new InfoFinancialAccount();
		        	jfa.setFaId(faId);
		        	jfa.setFaTheBalanceOf(faTheBalanceOf);
		        	int result = infoFinancialAccountMapper.updateFaTheBalanceOf(jfa);
		        	if(result == 0){
		        		throw new Exception("账户余额加减失败");
		        	}
		        }
		        //项目余额的增减
		        Double unitPriceSell = f1;//项目余额
		        InfoHouseExpand item = new InfoHouseExpand();
	        	item.setHouseCoding(hdId);
	        	item.setUnitPriceSell(unitPriceSell);
	        	int result1 = infoHouseMapper.updateVirBalance(item);
	        	if(result1 == 0){
	        		throw new Exception("项目余额加减失败");
	        	}
			}	
		}
		int result4 = journalFinancialMapper.updateByPrimaryKeySelective(journalFinancialExpand);
		if(result4 == 0){
			throw new Exception("不通过");
		}
		return 1;
	}


	@Override
	public String documentNumber(JournalFinancialExpand str) throws Exception {
		return documentNum(str);
	}
	
	//凭证号生成处理
	private String documentNum(JournalFinancialExpand journalFinancialExpand) throws Exception{
		String jsonArray = journalFinancialExpand.getJsonArray();
		String[] strnum = jsonArray.split(",");//收支id
		String voucher = "";//返回的凭证号
		if(strnum.length <= 8 && strnum.length>0){
			voucher = voucherNo();
			//存入对应的收支记录中
			for(int i = 0; i < strnum.length; ++i){
				int jfId = Integer.parseInt(strnum[i]);
				JournalFinancialExpand jfList = new JournalFinancialExpand();
				jfList.setJfId(jfId);
				jfList.setJfCertificateNumber(voucher);
				int result = journalFinancialMapper.updateByPrimaryKeySelective(jfList);
				if(result == 0){
					throw new Exception("数据有误");
				}
			}
		}else{
			//返回凭证编号
			voucher = "-2";
		}
		return voucher;
	}
	//生成凭证的编码
	private String voucherNo(){
		//获取当前时间
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance(); 
		SysVoucherNo sysVoucherNo = new SysVoucherNo();
		
		String a = "";
		String str = "000000";
		//每调用一次新增加一条
		try {
			sysVoucherNo.setVnTime(CommonMethodClass.getCurrentDate());
			int result = sysVoucherNoMapper.insert(sysVoucherNo);
			a = ""+sysVoucherNo.getVnId();
			int leng = a.length();
			int poor = str.length()-leng;
			String zoer = "";
			for(int i=0;i<poor;++i){
				zoer += 0;
			}
			a = zoer+a;
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
		}
        String[] time = df.format(c.getTime()).split("-");
        String strtime = String.valueOf(time[0].charAt(2))+String.valueOf(time[0].charAt(3));
        String document = strtime+time[1]+time[2];
		return document+a;
	}
	@Override
	public List<JournalFinancialExpand> selectToDoPringt(
			JournalFinancialExpand str) throws Exception {
		return journalFinancialMapper.selectToDoPringt(str);
	}
	
	//财务冲账
	@Override
	public int financialCompensation(JournalFinancialExpand record) throws Exception {
		JournalFinancialExpand journalFinancialExpand = new JournalFinancialExpand();
		Integer faid = null;
		String jfNatureOfThe = null; //收支性质
		String jfBigType = null; //收支类别
		String jfAccountingSpecies = null; //收支种类（只用于判断欠结)
		Integer hrId = null; // 已租id
		Integer hsId = null; // 未租id
		// 查询账目信息
		List<JournalFinancialExpand> FinancialList = journalFinancialMapper.strikeBalanceInterface(record);
		if(FinancialList.size() == 0){
			throw new Exception("查询账目信息失败-----");
		}
		//获取被冲账收支的相关数据
		faid = FinancialList.get(0).getJfAccountId();
		jfNatureOfThe = FinancialList.get(0).getJfNatureOfThe();
		jfBigType = FinancialList.get(0).getJfBigType();
		jfAccountingSpecies = FinancialList.get(0).getJfAccountingSpecies();
		hrId = FinancialList.get(0).getJfHouse4rentId();
		hsId = FinancialList.get(0).getJfHouse4storeId();
		//获取传入的财务ID，与出纳人ID，财务流水号，冲帐原因
		int numid = record.getJfId();
		int theCashierPeople = record.getJfTheCashierPeople();
		String financialCoding = record.getJfFinancialCoding();
		String strikeAbalanceReason = record.getJfStrikeABalanceReason();
		String jfOperationRecords = record.getJfOperationRecords();
		String waterElectricalIdentification = record.getWaterElectricalIdentification();//水电气标识
		String historicalReadings = record.getHistoricalReadings();//历史读数
		//获取查询出来的信息
		String natureOfThe = FinancialList.get(0).getJfNatureOfThe();
		//金额正负转换
		Double sumMoney = FinancialList.get(0).getJfSumMoney();
		if("收入".equals(natureOfThe)){
			sumMoney -=sumMoney*2;
		}else if("支出".equals(natureOfThe)){
			sumMoney =sumMoney;
		}else{
			throw new Exception("收支性质有误！");
		}
		//修改冲帐的状态
		FinancialList.get(0).setJfSumMoney(sumMoney);
		FinancialList.get(0).setJfNatureOfThe("冲账");
		FinancialList.get(0).setJfStrikeABalanceStatus("冲账");
		FinancialList.get(0).setJfCheckInTime("");
		FinancialList.get(0).setJfStrikeBalanceEncoding(numid);
		FinancialList.get(0).setJfFinancialCoding(financialCoding);
		FinancialList.get(0).setJfTheCashierPeople(theCashierPeople);
		FinancialList.get(0).setJfStrikeABalanceReason(strikeAbalanceReason);
		FinancialList.get(0).setJfOperationRecords(jfOperationRecords);
		FinancialList.get(0).setJfAuditState("未审核");
		System.out.println("打印修改后的东西 "+FinancialList.toString());
		//修改完后作为一条新的财务数据存入
		String json = JSONUtil.serialize(FinancialList);
		JSONArray js = JSONArray.fromObject(json);
		System.out.println("映射失败了吗"+js.toString());
		for(Object jf : js){
			JSONObject jsonObj = (JSONObject)jf;
			journalFinancialExpand = (JournalFinancialExpand) JSONObject.toBean(jsonObj, JournalFinancialExpand.class);
		}
		System.out.println("所有的紧入------"+journalFinancialExpand.toString());
		
		//查询出它的财务ID
		int jfeid = journalFinancialExpand.getJfId();
		//把查出的新财务ID，当作第一条信息的冲帐编号，修改进去
		JournalFinancialExpand jf = new JournalFinancialExpand();
		jf.setJfId(numid);
		jf.setJfStrikeBalanceEncoding(jfeid);
		jf.setJfStrikeABalanceReason(strikeAbalanceReason);
		jf.setJfOperationRecords(jfOperationRecords);
		jf.setJfStrikeABalanceStatus("被冲账");
		jf.setJfAuditState("被冲账");
		System.out.println("有没财务ID："+jf.toString());
		int k = journalFinancialMapper.updateByPrimaryKeySelective(jf);	
		if(k == 0){
			throw new Exception("把查出的新财务ID，当作第一条信息的冲帐编号，修改进去失败-----");
		}
		
		InfoFinancialAccount fa = new InfoFinancialAccount();
		fa.setFaId(faid);
		if(		!"租客欠结款".equals(jfAccountingSpecies)
			&&  !"待付房东款".equals(jfAccountingSpecies)
			&&	!"房东欠结款".equals(jfAccountingSpecies)
			&&	!"租客优惠金".equals(jfAccountingSpecies)
		){
			//冲账完成后 从相应的账户中把金额进行加减 
			fa.setFaTheBalanceOf(sumMoney);
			int result2 = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
			if(result2 == 0){
				throw new Exception("结算余额失败");
			}
		}
		//查询最新余额
		List<InfoFinancialAccount> getJfNowBalance = infoFinancialAccountMapper.selectByPrimaryKey(fa);
		Double jfNowBalance = getJfNowBalance.get(0).getFaTheBalanceOf();
		//将最新余额设置到冲账收支的jfNowBalance(银行账户余额)里
		journalFinancialExpand.setJfNowBalance(jfNowBalance);
		System.out.println("最新余额是多少啊"+jfNowBalance);
		
		
		int ii = journalFinancialMapper.insertSelective(journalFinancialExpand);
		if(ii == 0){
			throw new Exception("修改完后作为一条新的财务数据存入失败-----");
		}
		System.out.println("有没有插入一条数据啊-- "+ii);
		// 欠结金额增减
		if("欠结类".equals(jfBigType)){
			int result = 0;
			if(		"租客预存款".equals(jfAccountingSpecies) 
				||  "租客还欠结款".equals(jfAccountingSpecies)
				||	"租客欠结款".equals(jfAccountingSpecies)
				||	"还租客预存款".equals(jfAccountingSpecies)
				||	"充值优惠券".equals(jfAccountingSpecies)
			){
				InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
				infoHouse4rentExpand.setHrId(hrId);
				if("租客欠结款".equals(jfAccountingSpecies) || "还租客预存款".equals(jfAccountingSpecies)){
					infoHouse4rentExpand.setArithmeticBase( 0 - FinancialList.get(0).getJfSumMoney());
				}
				if( "租客预存款".equals(jfAccountingSpecies)  || "租客还欠结款".equals(jfAccountingSpecies) || "充值优惠券".equals(jfAccountingSpecies)){
					infoHouse4rentExpand.setArithmeticBase( 0 - FinancialList.get(0).getJfSumMoney());
				}
				result = infoHouse4rentMapper.arithmetic(infoHouse4rentExpand);
			}
			if(		"待付房东款".equals(jfAccountingSpecies) 
				||  "房东还欠结款".equals(jfAccountingSpecies)
				||	"支付房东待付款".equals(jfAccountingSpecies)
				||	"房东欠结款".equals(jfAccountingSpecies)
			){
				InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
				infoHouse4storeExpand.setHsId(hsId);
				if("支付房东待付款".equals(jfAccountingSpecies) || "房东欠结款".equals(jfAccountingSpecies)){
					infoHouse4storeExpand.setTempBase( 0 - FinancialList.get(0).getJfSumMoney());
				}
				if( "待付房东款".equals(jfAccountingSpecies)  || "房东还欠结款".equals(jfAccountingSpecies) ){
					infoHouse4storeExpand.setTempBase( 0 - FinancialList.get(0).getJfSumMoney());
				}
				result = infoHouse4storeMapper.modifyTheBase(infoHouse4storeExpand);
			}
			if(result == 0){
				throw new Exception("欠结金额增减失败");
			}
		}
		
		//修改票据编号信息
        if (sysVariablesService.checkBillNum()) {
            List<JournalFinancialExpand> list = journalFinancialMapper.strikeBalanceInterface(record);
            for (int i = 0; i < list.size(); i++) {
                if("收入".equals(list.get(i).getJfNatureOfThe()) 
                    && !("欠结类".equals(list.get(i).getJfBigType()) && "待付房东款".equals(list.get(i).getJfAccountingSpecies()))
                    && !("欠结类".equals(list.get(i).getJfBigType()) && "房东还欠结款".equals(list.get(i).getJfAccountingSpecies()))
                    && !("财务类".equals(list.get(i).getJfBigType()) && "资金调配".equals(list.get(i).getJfAccountingSpecies()))){
                    if(list.get(i).getJfTicketNumber() != null){
                        int jcdId = contractDatabaseService.getJcdId(list.get(i).getJfTicketNumber());
                        JournalContractDatabase jcd = new JournalContractDatabase();
                        jcd.setJcdId(jcdId);
                        int result3 = journalContractDatabaseMapper.clearBillNum(jcd);
                    }
                }
            }
        }
		return 1;
	}

	@Override
	public List<JournalFinancialExpand> queryFinancial(JournalFinancialExpand str) throws Exception {
		return journalFinancialMapper.queryFinancial(str);
	}

	//公司成本统计
    @Override
    public List<JournalFinancialExpand> getCompanyCost(Map<String, Object> map) throws Exception {
        return journalFinancialMapper.getCompanyCost(map);
    }

    @Override
    public List<JournalFinancialExpand> queryFinancialCommon(
            JournalFinancialExpand str) throws Exception {
        return journalFinancialMapper.queryFinancialCommon(str);
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
					List<InfoHouse4rentExpand> hrList = infoHouse4rentMapper.selectById(hr);
					item.setJfManagerUserId(hrList.get(0).getHrManagerUserId());
				} else if (item.getJfHouse4storeId() != null) {
					List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.selectByPrimaryKey(item.getJfHouse4storeId());
					item.setJfManagerUserId(hsList.get(0).getHsManagerUserId());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
		return list;
	}

	@Override
	public int insertFinancialList(String jsonArray) throws Exception {
		List<JournalFinancial> recordList = new ArrayList<>();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		String strid = "";
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
			if("".equals(jf.getJfStartCycle())){
				jf.setJfStartCycle(CommonMethodClass.getCurrentDate());
			}
			if("".equals(jf.getJfEndCycle())){
				jf.setJfEndCycle(CommonMethodClass.getCurrentDate());
			}
			recordList.add(jf);
		}
		recordList = setManagerUserId(recordList);
		
		//获取传入的银行账户id，金额
		Integer faId = null; //账户id
		Double expenditure = 0.0; //支出
		Double income = 0.0; //收入
		String jfNatureOfThe = null; //收支性质
		String jfBigType = null;//收支类别
		String jfAccountingSpecies = null; //收支种类（只用于判断欠结）
		
		Double tempMoney = 0.0; //租客欠结金额
		Double supplementAmount = 0.0; //租客补结金额
		
		Double landlordTempMoney = 0.0; //房东欠结金额
		Double landlordSupplementAmount = 0.0; //房东补结金额
		
		Integer hrId = null;//已租id
		Integer hsId = null;//未租id
		int temp = -1;
		recordList = setManagerUserId(recordList);
		System.out.println(recordList);
		for(int i = 0; i < recordList.size(); ++i){
			jfNatureOfThe = recordList.get(i).getJfNatureOfThe();
			jfBigType = recordList.get(i).getJfBigType();
			jfAccountingSpecies = recordList.get(i).getJfAccountingSpecies();
			Double money = recordList.get(i).getJfSumMoney(); //金额
			faId = recordList.get(i).getJfAccountId(); //账户id
			hrId = recordList.get(i).getJfHouse4rentId();
			hsId = recordList.get(i).getJfHouse4storeId();
			income = 0.00;
			expenditure = 0.00;
			//判断收支性质
			if("收入".equals(jfNatureOfThe)){
				if("欠结类".equals(jfBigType)){
					if("租客预存款".equals(jfAccountingSpecies)){
						income += money;
						supplementAmount += money;
					}
					if("租客还欠结款".equals(jfAccountingSpecies)){
						income += money;
						supplementAmount += money;
					}
					if("租客优惠金".equals(jfAccountingSpecies)){
						//不动账
						supplementAmount += money;
					}
					if("待付房东款".equals(jfAccountingSpecies)){
						//不动账
						landlordSupplementAmount += money;
					}
					if("房东还欠结款".equals(jfAccountingSpecies)){
						income += money;
						landlordSupplementAmount += money;
					}
				}else{
					System.out.println("recordList.get(i).getJfSumMoney():"+money);
					income += money;
					System.out.println(income);
				}
			}else if("支出".equals(jfNatureOfThe)){
				if("欠结类".equals(jfBigType)){
					if("租客欠结款".equals(jfAccountingSpecies)){
						//不动账
						tempMoney += money;
					}
					if("还租客预存款".equals(jfAccountingSpecies)){
						expenditure += money;
						tempMoney += money;
					}
					if("支付房东待付款".equals(jfAccountingSpecies)){
						expenditure += money;
						landlordTempMoney += money;
					}
					if("房东欠结款".equals(jfAccountingSpecies)){
						//不动账
						landlordTempMoney += money;
					}
					if("充值优惠券".equals(jfAccountingSpecies)){
						//不动账
						supplementAmount += money;
					}
				}else{
					expenditure += money;
				}
			}
			//结算余额
			Double faTheBalanceOf = income - expenditure;
			InfoFinancialAccount fa = new InfoFinancialAccount();
			System.out.println(faId+",,"+faTheBalanceOf);
			fa.setFaId(faId);
			fa.setFaTheBalanceOf(faTheBalanceOf);
			int result1 = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
			if(result1 == 0){
				throw new Exception("结算余额失败");
			}
			//查询最新余额
			List<InfoFinancialAccount> getJfNowBalance = infoFinancialAccountMapper.selectByPrimaryKey(fa);
			Double jfNowBalance = getJfNowBalance.get(0).getFaTheBalanceOf();
			//将最新余额设置到每一条收支的jfNowBalance(银行账户余额)里
			recordList.get(i).setJfNowBalance(jfNowBalance);
		}
		//新增收支记录
		int result = journalFinancialMapper.insertList(recordList);
		if(result == 0){
			throw new Exception("新增收支记录失败");
		}
			
		//租客欠结金额增减
		if(tempMoney != 0 || supplementAmount != 0){
			InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
			infoHouse4rentExpand.setHrId(hrId);
			infoHouse4rentExpand.setArithmeticBase(tempMoney - supplementAmount);
			int result2 = infoHouse4rentMapper.arithmetic(infoHouse4rentExpand);
			if(result2 == 0){
				throw new Exception("租客欠结金额增减失败");
			}
			temp = 1;
		}
		//房东欠结金额增减
		if(landlordTempMoney != 0 || landlordSupplementAmount != 0){
			InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
			infoHouse4storeExpand.setHsId(hsId);
			infoHouse4storeExpand.setTempBase(landlordTempMoney - landlordSupplementAmount);
			int result3 = infoHouse4storeMapper.modifyTheBase(infoHouse4storeExpand);
			if(result3 == 0){
				throw new Exception("房东欠结金额增减失败");
			}
			temp = 1;
		}
		 
		//修改票据编号信息
		if (sysVariablesService.checkBillNum()) {
		    for (int i = 0; i < recordList.size(); i++) {
		        if("收入".equals(recordList.get(i).getJfNatureOfThe()) 
		            && !("欠结类".equals(recordList.get(i).getJfBigType()) && "待付房东款".equals(recordList.get(i).getJfAccountingSpecies()))
                    && !("欠结类".equals(recordList.get(i).getJfBigType()) && "房东还欠结款".equals(recordList.get(i).getJfAccountingSpecies()))
		            && !("财务类".equals(recordList.get(i).getJfBigType()) && "资金调配".equals(recordList.get(i).getJfAccountingSpecies()))){
		            if(recordList.get(i).getJfTicketNumber() != null){
		                int jcdId = contractDatabaseService.getJcdId(recordList.get(i).getJfTicketNumber());
	                    JournalContractDatabase jcd = new JournalContractDatabase();
	                    jcd.setJcdId(jcdId);
	                    jcd.setJcdUseState("已使用");
	                    jcd.setJcdUsedType("票据");
	                    jcd.setJcdHouseAddress(recordList.get(i).getJfAccountingWhy());
	                    jcd.setJcdContractPerson(recordList.get(i).getJfTheCashierPeople());
	                    jcd.setJcdSigningTime(recordList.get(i).getJfBillingDate());
	                    int result3 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
		            }
	            }
		    }
		}
		return 0;
	}

	//挂账结清
	public Result<String> clearCreditMoney(JournalFinancialExpand record) throws Exception {
		//结算余额
		InfoFinancialAccount fa = new InfoFinancialAccount();
		fa.setFaId(record.getJfAccountId());
		fa.setFaTheBalanceOf(record.getJfSumMoney());
		int result = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
		System.out.println("11111111111111111111==  "+record);
		if(result > 0){
			int result1 = journalFinancialMapper.updateByPrimaryKeySelective(record);
			if(result1 > 0){
				return new Result<String>(1,"挂账结算成功",null);
			}else{
				return new Result<String>(1,"挂账结算失败",null);
			}
		}else{
			return new Result<String>(1,"账户余额结算失败",null);
		}
	}

	@Override
	public Result<String> batchClearCredit(JournalFinancialExpand record) throws Exception {
		if(record.getPayType() == 2){
			String orderNum = createOrderNum();
			record.setJfOrderNum(orderNum);
			Result<String> payResult = qrCodePay(record);
			if(payResult.getCode() == -3){
				Result<String> checkOrderResult =  checkOrderThree(record);
				if(checkOrderResult.getCode() != 1){
					throw new Exception("查询订单6次仍未支付");
				}
			}else if(payResult.getCode() != 1){
				throw new Exception(payResult.getMsg());
			}
		}
		if(record.getPayType() == 3 || record.getPayType() == 2){
			record.setJfPayType("转账");
		}else{
			record.setJfPayType("现钞");
		}
		
		//添加一条新的收支记录
		record.setJfCreditSituation(0);
		int result = journalFinancialMapper.insertSelective(record);
		if(result == 0){
			return new Result<String>(1,"生成收支失败",null);
		}
		
		//结算余额
		InfoFinancialAccount fa = new InfoFinancialAccount();
		fa.setFaId(record.getJfAccountId());
		fa.setFaTheBalanceOf(record.getJfSumMoney());
		int result1 = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
		if(result1 == 0 ){
			return new Result<String>(-1,"账户余额结算失败",null);
		}
		
		//批量修改收支
		List<JournalFinancialExpand> list = JSON.parseArray(record.getJsonArray(),JournalFinancialExpand.class);
		int result2 = journalFinancialMapper.batchUpdateFinancial(list);
		if(result2 > 0){
			return new Result<String>(1,"挂账结算成功",null);
		}else{
			return new Result<String>(-1,"挂账结算失败",null);
		}
	}
	
	/**
	 * 调起微信二维码支付
	 * @param csGoodsBilling
	 * @throws Exception
	 */
	private Result<String> qrCodePay(JournalFinancialExpand jf) throws Exception{
		
		String key = CommonMethodClass.getSessionByKey("wxKey");
		String mch_id = CommonMethodClass.getSessionByKey("wxMerchantNumber");
		String total_fee = String.valueOf(jf.getJfSumMoney() * 100);
		total_fee = total_fee.substring(0,total_fee.indexOf("."));
		
		Map<String,String> sendMap = new HashMap<>();
		//商户号
		sendMap.put("mch_id", mch_id);
		//商品描述
		sendMap.put("body", jf.getWxpayBody());
		//总金额
		sendMap.put("total_fee", total_fee);
		//授权码
		sendMap.put("auth_code", jf.getAuthCode());
		//订单号
		sendMap.put("out_trade_no", jf.getJfOrderNum());
		//微信支付key
		sendMap.put("key", key);
		
		WxPay wxPay = new WxPay();
		//由桔橙二维码支付来实现二维码支付的接口
		wxPay.setQrCodePay(new OrangeQRCodePay());
		Result<String> result = wxPay.qrCodePay(sendMap);
		return result;
	}
	
	private String createOrderNum(){
		//生成订单
		Date date = new Date();
		SimpleDateFormat sdf4 = new SimpleDateFormat("yyyyMMddHHmmss");
		String orderNum = sdf4.format(date)+(int) (Math.random() * 10) + (int) (Math.random() * 10)+(int) (Math.random() * 10);
		return orderNum;
		
	}
	
	private Result<String> checkOrderThree(JournalFinancialExpand record) throws Exception{
		
		Integer cacheTime = 1000 * 10;
		Timer timer = new Timer();
		// (TimerTask task, long delay, long period)任务，延迟时间，多久执行
		
		boolean flag = false;
		for(int i = 0; i < 10;i++){
			Result<String> result = checkOrder(record);
			if(result.getCode() == 1){
				flag = true;
				break;
			}
			Thread.sleep(1000 * 3);
		}
		
		if(flag){
			return new Result<String>(1,"成功","");
		}else{
			return new Result<String>(-1,"付款失败","");
		}
	}
	
	private Result<String> checkOrder(JournalFinancialExpand record) throws Exception{
		
		String key = CommonMethodClass.getSessionByKey("wxKey");
		String mch_id = CommonMethodClass.getSessionByKey("wxMerchantNumber");
		
		Map<String,String> sendMap = new HashMap<>();
		//商户号
		sendMap.put("mch_id", mch_id);
		//订单号
		sendMap.put("out_trade_no", record.getJfOrderNum());
		//微信支付key
		sendMap.put("key", key);
		
		WxPay wxPay = new WxPay();
		wxPay.setCheckOrderStrategy(new OrangeCheckOrder());
		Result<String> result = wxPay.checkOrder(sendMap);
		return result;
	}
}
