package com.zz.service.journal;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoContractInstallmentMapper;
import com.zz.mapper.info.InfoFinancialAccountMapper;
import com.zz.mapper.info.InfoHouse4rentMapper;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.journal.JournalFinancialMapper;
import com.zz.mapper.journal.JournalMonthlyAccountReceivableMapper;
import com.zz.po.info.InfoContractInstallment;
import com.zz.po.info.InfoFinancialAccount;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JournalFinancial;
import com.zz.po.journal.JournalMonthlyAccountReceivable;

public class MonthlyAccountReceivableServiceImpl implements MonthlyAccountReceivableService {
	private InfoContractInstallmentMapper infoContractInstallmentMapper;

	public void setInfoContractInstallmentMapper(
			InfoContractInstallmentMapper infoContractInstallmentMapper) {
		this.infoContractInstallmentMapper = infoContractInstallmentMapper;
	}
	private InfoFinancialAccountMapper infoFinancialAccountMapper;
	public void setInfoFinancialAccountMapper(
			InfoFinancialAccountMapper infoFinancialAccountMapper) {
		this.infoFinancialAccountMapper = infoFinancialAccountMapper;
	}
	private InfoHouse4rentMapper infoHouse4rentMapper;
	public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
		this.infoHouse4rentMapper = infoHouse4rentMapper;
	}

	private JournalMonthlyAccountReceivableMapper journalMonthlyAccountReceivableMapper;
	private JournalFinancialMapper journalFinancialMapper;
	private InfoHouse4storeMapper infoHouse4storeMapper;
	
	public void setJournalFinancialMapper(
			JournalFinancialMapper journalFinancialMapper) {
		this.journalFinancialMapper = journalFinancialMapper;
	}

	public void setInfoHouse4storeMapper(
			InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}

	public void setJournalMonthlyAccountReceivableMapper(
			JournalMonthlyAccountReceivableMapper journalMonthlyAccountReceivableMapper) {
		this.journalMonthlyAccountReceivableMapper = journalMonthlyAccountReceivableMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer jmarId) throws Exception {
		// TODO Auto-generated method stub
		return journalMonthlyAccountReceivableMapper.deleteByPrimaryKey(jmarId);
	}

	@Override
	public int insertSelective(JournalMonthlyAccountReceivable record)
			throws Exception {
		// TODO Auto-generated method stub
		return journalMonthlyAccountReceivableMapper.insertSelective(record);
	}

	@Override
	public JournalMonthlyAccountReceivable selectByPrimaryKey(Integer jmarId)
			throws Exception {
		// TODO Auto-generated method stub
		return journalMonthlyAccountReceivableMapper.selectByPrimaryKey(jmarId);
	}

	@Override
	public int updateByPrimaryKeySelective(
			JournalMonthlyAccountReceivable record) throws Exception {
		// TODO Auto-generated method stub
		return journalMonthlyAccountReceivableMapper
				.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<JournalMonthlyAccountReceivable> selectByHrId(
			JournalMonthlyAccountReceivable record) throws Exception {
		// TODO Auto-generated method stub
		return journalMonthlyAccountReceivableMapper.selectByHrId(record);
	}

	@Override
	public int insertFinancialEnergyBill(JournalMonthlyAccountReceivable record)
			throws Exception {
		// TODO Auto-generated method stub
		return newFinancialEnergyBill(record);
	}

	// 处理-新增财务收支与历史能源账单、更新未租房能源字段
	private int newFinancialEnergyBill(JournalMonthlyAccountReceivable journalMonthlyAccountReceivable) throws Exception {
		// 新增财务收支
		List<JournalFinancial> list = new ArrayList<JournalFinancial>();
		String jsonArray = journalMonthlyAccountReceivable.getJsonArray();
		JSONArray ja = JSONArray.fromObject(jsonArray);
		System.out.println(ja);
		String strid = "";
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject) a;
			JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
			if ("".equals(jf.getJfStartCycle())) {
				jf.setJfStartCycle(CommonMethodClass.getCurrentDate());
			}
			if ("".equals(jf.getJfEndCycle())) {
				jf.setJfEndCycle(CommonMethodClass.getCurrentDate());
			}
			list.add(jf);
		}
		// 获取传入的银行账户id，金额
		Integer faId = null; // 账户id
		Double expenditure = 0.0; // 支出
		Double income = 0.0; // 收入
		String jfNatureOfThe = null; // 收支性质
		String jfBigType = null; //收支类别
		String jfAccountingSpecies = null; // 收支种类（只用于判断欠结)
		Double tempMoney = 0.0; // 欠结金额
		Double supplementAmount = 0.0; // 补结金额
		Integer hrId = null;// 已租id
		
		String[] waterArray = null;//初始化水读数数组
		String[] electritArray = null;//初始化电读数数组
		String[] gasArray = null;//初始化气读数数组
		String[] hotWaterArray = null;//初始化气读数数组
		String[] hotAirArray = null;//初始化气读数数组
		
		for (int i = 0; i < list.size(); ++i) {
			String wegFlag= list.get(i).getWaterElectricalIdentification();
			if("水".equals(wegFlag)){
				waterArray = list.get(i).getHistoricalReadings().split(",");
			}
			if("电".equals(wegFlag)){
				electritArray = list.get(i).getHistoricalReadings().split(",");			
			}
			if("气".equals(wegFlag)){
				gasArray = list.get(i).getHistoricalReadings().split(",");
			}
			if("热水".equals(wegFlag)){
				hotWaterArray = list.get(i).getHistoricalReadings().split(",");
			}
			if("暖气".equals(wegFlag)){
				hotAirArray = list.get(i).getHistoricalReadings().split(",");
			}
			
			jfNatureOfThe = list.get(i).getJfNatureOfThe();
			jfBigType = list.get(i).getJfBigType();
			jfAccountingSpecies = list.get(i).getJfAccountingSpecies();
			Double money = list.get(i).getJfSumMoney(); // 金额
			faId = list.get(i).getJfAccountId(); // 账户id
			hrId = list.get(i).getJfHouse4rentId();
			income = 0.00;
			expenditure = 0.00;
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
			// 结算余额
			Double faTheBalanceOf = income - expenditure;
			InfoFinancialAccount fa = new InfoFinancialAccount();
			fa.setFaId(faId);
			fa.setFaTheBalanceOf(faTheBalanceOf);
			int result2 = infoFinancialAccountMapper.updateFaTheBalanceOf(fa);
			if (result2 == 0) {
				throw new Exception("结算余额失败");
			}
			//查询最新余额
			List<InfoFinancialAccount> getJfNowBalance = infoFinancialAccountMapper.selectByPrimaryKey(fa);
			Double jfNowBalance = getJfNowBalance.get(0).getFaTheBalanceOf();
			//将最新余额设置到每一条收支的jfNowBalance(银行账户余额)里
			list.get(i).setJfNowBalance(jfNowBalance);
		}
		int result1 = journalFinancialMapper.insertList(list);
		if (result1 == 0) {
			throw new Exception("新增财务收支失败");
		}
		// 欠结金额增减
		if (tempMoney != 0 || supplementAmount != 0) {
			InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
			infoHouse4rentExpand.setHrId(hrId);
			infoHouse4rentExpand.setArithmeticBase(tempMoney - supplementAmount);
			int result = infoHouse4rentMapper.arithmetic(infoHouse4rentExpand);
			if (result == 0) {
				throw new Exception("欠结金额增减失败");
			}
		}
		// 修改分期账单状态
		if (journalMonthlyAccountReceivable.getJciId() != null
				&& !journalMonthlyAccountReceivable.getJciId().equals("")) {
			InfoContractInstallment ici = new InfoContractInstallment();
			ici.setJciId(journalMonthlyAccountReceivable.getJciId());
			ici.setJciState("已收");
			int result5 = infoContractInstallmentMapper.updateByPrimaryKeySelective(ici);
			if (result5 == 0) {
				throw new Exception("修改分期账单状态失败!");
			}
		}

		// 新增历史能源账单
		int result2 = journalMonthlyAccountReceivableMapper.insertSelective(journalMonthlyAccountReceivable);
		if (result2 == 0) {
			throw new Exception("新增历史能源账单失败");
		}
		
		// 未租房能源字段修改
		InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
		// 查询出水电气存储字段
		List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.selectByPrimaryKey(journalMonthlyAccountReceivable.getHouseStoreId());
		if (hsList.size() == 0) {
			throw new Exception("查找不到未租房");
		}
		
		// 第一次json转换
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
		
		// 第二次json转换
		JSONObject waterjson = JSONObject.fromObject(waterData);
		JSONObject electritjson = JSONObject.fromObject(electritData);
		JSONObject gasjson = JSONObject.fromObject(gasData);
		JSONObject hotwaterjson = JSONObject.fromObject(hotwaterData);
		JSONObject hotairjson = JSONObject.fromObject(hotairData);
		
		
		// 第三次转为数组
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
		
		//取出上次的结算读数
		String lastWater  = waterjson.getString("lastReading");
		String lastElectrit = electritjson.getString("lastReading");
		String lastGas = gasjson.getString("lastReading");
		String lastHotwater = hotwaterjson.getString("lastReading");
		String lastHotair = hotairjson.getString("lastReading");
		
		// 取出每个数组最后一个值
		Double waterLast = 0.0; 
		Double electritLast = 0.0;
		Double gasLast = 0.0;
		Double hotwaterLast = 0.0;
		Double hotairLast = 0.0;

		if(waterArray!=null){//当前台有水费收支的值，历史读数和最新结清读数传进来的时候。
			waterLast = Double.parseDouble(waterArray[1]);//最新的读数数组中，上次结清水读数(lastReading)为传进来的最新结清读数
			if (waterlist.size() != 0) {//当旧的读数数组中，数组长度不为零时，进行判断。
				Double waterNewest = waterlist.getDouble(waterlist.size() - 1);//获取最新的一次最新读数(thisReading)的值。
				if(waterLast<waterNewest){//判断，当 新数组中结清读数  小于  旧数组中最新读数 时，最新读数(thisReading)的值为旧数组中最新读数。
					waterlist.removeAll(waterlist);
					waterlist.add(0,waterNewest);
				}else{//当  新数组中结清读数  大于或等于  旧数组中最新读数 时，最新读数(thisReading)清空为空数组。
					waterlist.removeAll(waterlist);
				}
			}else{//数组长度为零时，最新读数数组中，最新读数(thisReading)清空为空数组。
				waterlist.removeAll(waterlist);
			}
		}
		if(waterLast == 0){
			waterLast = Double.parseDouble(lastWater);
		}
		if(electritArray!=null){
			electritLast = Double.parseDouble(electritArray[1]);
			if (electritlist.size() != 0) {
				Double electritNewest = electritlist.getDouble(electritlist.size() - 1);
				if(electritLast<electritNewest){
					electritlist.removeAll(electritlist);
					electritlist.add(0,electritNewest);
				}else{
					electritlist.removeAll(electritlist);
				}
			}else{
				electritlist.removeAll(electritlist);
			}
		}
		if(electritLast == 0){
			electritLast = Double.parseDouble(lastElectrit);
		}
		if(gasArray!=null){
			gasLast = Double.parseDouble(gasArray[1]);
			if (gaslist.size() != 0) {
				Double gasNewest = gaslist.getDouble(gaslist.size() - 1);
				if(gasLast<gasNewest){
					gaslist.removeAll(gaslist);
					gaslist.add(0,gasNewest);
				}else{
					gaslist.removeAll(gaslist);
				}
			}else{
				gaslist.removeAll(gaslist);
			}
		}
		if(gasLast == 0){
			gasLast = Double.parseDouble(lastGas);
		}
		if(hotWaterArray!=null){
			hotwaterLast = Double.parseDouble(hotWaterArray[1]);
			if (hotwaterlist.size() != 0) {
				Double hotwaterNewest = hotwaterlist.getDouble(hotwaterlist.size() - 1);
				if(hotwaterLast<hotwaterNewest){
					hotwaterlist.removeAll(hotwaterlist);
					hotwaterlist.add(0,hotwaterNewest);
				}else{
					hotwaterlist.removeAll(hotwaterlist);
				}
			}else{
				hotwaterlist.removeAll(hotwaterlist);
			}
		}
		if(hotwaterLast == 0){
			hotwaterLast = Double.parseDouble(lastHotwater);
		}
		
		if(hotAirArray!=null){
			hotairLast = Double.parseDouble(hotAirArray[1]);
			if (hotairlist.size() != 0) {
				Double hotairNewest = hotairlist.getDouble(hotairlist.size() - 1);
				if(gasLast<hotairNewest){
					hotairlist.removeAll(hotairlist);
					hotairlist.add(0,hotairNewest);
				}else{
					hotairlist.removeAll(hotairlist);
				}
			}else{
				hotairlist.removeAll(hotairlist);
			}
		}
		if(hotairLast == 0){
			hotairLast = Double.parseDouble(lastHotair);
		}

		// 拼接字段
		String water = "{'lastReading':" + waterLast + ",'thisReading':" + waterlist + "}";
		String electrit = "{'lastReading':" + electritLast + ",'thisReading':" + electritlist + "}";
		String gas = "{'lastReading':" + gasLast + ",'thisReading':" + gaslist + "}";
		String hotwater="{'lastReading':" + hotwaterLast + ",'thisReading':" + hotwaterlist + "}";
		String hotair="{'lastReading':" + hotairLast + ",'thisReading':" + hotairlist + "}";

		String mrr = "{'water':" + water + ",'electrit':" + electrit + ",'gas':" + gas +",'hotwater':" + hotwater + ",'hotair':" + hotair + "}";
		hs.setHsId(journalMonthlyAccountReceivable.getHouseStoreId());
		hs.setHsMeterReadingRecord(mrr);
		int result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
		if (result3 == 0) {
			throw new Exception("未租房修改失败");
		}
		return 1;
	}
}
