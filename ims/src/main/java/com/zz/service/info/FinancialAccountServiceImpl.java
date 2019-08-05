package com.zz.service.info;

import java.math.BigDecimal;
import java.util.List;

import com.zz.mapper.info.InfoFinancialAccountMapper;
import com.zz.mapper.journal.JournalFinancialMapper;
import com.zz.po.info.InfoFinancialAccount;
import com.zz.po.journal.JournalFinancial;
import com.zz.po.journal.JournalFinancialExpand;

public class FinancialAccountServiceImpl implements FinancialAccountService {
	private InfoFinancialAccountMapper infoFinancialAccountMapper;
	private JournalFinancialMapper journalFinancialMapper;
	public void setInfoFinancialAccountMapper(
			InfoFinancialAccountMapper infoFinancialAccountMapper) {
		this.infoFinancialAccountMapper = infoFinancialAccountMapper;
	}

	public void setJournalFinancialMapper(
			JournalFinancialMapper journalFinancialMapper) {
		this.journalFinancialMapper = journalFinancialMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer faId) throws Exception {
		// TODO Auto-generated method stub
		return infoFinancialAccountMapper.deleteByPrimaryKey(faId);
	}

	@Override
	public int insertSelective(InfoFinancialAccount record) throws Exception {
		// TODO Auto-generated method stub
		return infoFinancialAccountMapper.insertSelective(record);
	}

	@Override
	public List<InfoFinancialAccount> selectByPrimaryKey(
			InfoFinancialAccount record) throws Exception {
		// TODO Auto-generated method stub
		return infoFinancialAccountMapper.selectByPrimaryKey(record);
	}
	
	@Override
	public List<InfoFinancialAccount> selectAllName() throws Exception {
		// TODO 自动生成的方法存根
		return infoFinancialAccountMapper.selectAllName();
	}

	@Override
	public int updateByPrimaryKeySelective(InfoFinancialAccount record)
			throws Exception {
		// TODO Auto-generated method stub
		return infoFinancialAccountMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateFaTheBalanceOf(InfoFinancialAccount record)
			throws Exception {
		// TODO Auto-generated method stub
		return infoFinancialAccountMapper.updateFaTheBalanceOf(record);
	}
	@Override
	public List<InfoFinancialAccount> selectNamePublic(
			InfoFinancialAccount record) throws Exception {
		// TODO Auto-generated method stub
		return infoFinancialAccountMapper.selectNamePublic(record);
	}

	@Override
	public void statisticsAllAccountBalance() throws Exception {
		List<InfoFinancialAccount> list = infoFinancialAccountMapper.selectByPrimaryKey(null);
		int numsflag = 0;
		for(InfoFinancialAccount item : list){
			// 账户编号
			int faid = item.getFaId();
			// 初始金额
			double initialAmount = item.getFaTheInitialAmount();
			// 校准金额
			double calibrationAmount = item.getFaCalibrationAmount();
			// 查询财务收支汇总
			JournalFinancialExpand journalFinancialExpand = new JournalFinancialExpand();
			journalFinancialExpand.setJfAccountId(faid);
			Double num = 0.00;
			Double amount = 0.00;
			List<JournalFinancial> flist = journalFinancialMapper.theBalanceOf(journalFinancialExpand);
			if (flist.size() > 0) {
				for (int j = 0; j < flist.size(); ++j) {
					String nature = flist.get(j).getJfNatureOfThe();
//					if (nature.equals("收入")) {
//						amount = amount + flist.get(j).getJfSumMoney();
//					} else if (nature.equals("支出")) {
//						amount = amount - flist.get(j).getJfSumMoney();
//					}else if (nature.equals("欠结")) {
//						if(flist.get(j).getJfAccountingSpecies().equals("租客补结")){
//							amount = amount + flist.get(j).getJfSumMoney();
//						}
//					}
					if (nature.equals("收入")) {
						if(	!flist.get(j).getJfAccountingSpecies().equals("待付房东款")){
							amount = amount + flist.get(j).getJfSumMoney();
							System.out.println(numsflag+"加："+nature+"-"+flist.get(j).getJfAccountingSpecies());
							numsflag++;
						}
					} else if (nature.equals("支出")) {
						if(	!flist.get(j).getJfAccountingSpecies().equals("租客欠结款")
						&&	!flist.get(j).getJfAccountingSpecies().equals("房东欠结款")
						&&	!flist.get(j).getJfAccountingSpecies().equals("充值优惠券")){
							amount = amount - flist.get(j).getJfSumMoney();
							System.out.println(numsflag+"减："+nature+"-"+flist.get(j).getJfAccountingSpecies());
							numsflag++;
						}
					}
				}
				num = initialAmount + amount + calibrationAmount;
			} else {
				num = initialAmount + calibrationAmount;
			}
			BigDecimal bg = new BigDecimal(num);  
	        double f1 = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
	        item.setFaTheBalanceOf(f1);
			int i = infoFinancialAccountMapper.updateByPrimaryKeySelective(item);
			if (i == 0) {
				throw new Exception("修改账户余额失败！");
			}
		}
		System.out.println("numsflag++;"+numsflag);
	}
	
	//单个余额统计与计算
	@Override
	public int statisticsOfSingleItem(InfoFinancialAccount record) throws Exception {
		System.out.println("到这里1");
		// TODO Auto-generated method stub
		// 账户编号
		int faid = record.getFaId();
		System.out.println("到这里2");
		// 初始金额
		double initialAmount = record.getFaTheInitialAmount();
		System.out.println("到这里3");
//		// 校准金额
//		double calibrationAmount = record.getFaCalibrationAmount();
		// 查询财务收支汇总
		System.out.println("到这里4");
		JournalFinancialExpand journalFinancialExpand = new JournalFinancialExpand();
		System.out.println("到这里5");
		journalFinancialExpand.setJfAccountId(faid);
		System.out.println("到这里6");
		Double num = 0.00;
		Double amount = 0.00;
		System.out.println("到这里7");
		List<JournalFinancial> flist = journalFinancialMapper.theBalanceOf(journalFinancialExpand);
		System.out.println("到这里8");
		if (flist.size() > 0) {
			for (int j = 0; j < flist.size(); ++j) {
				String nature = flist.get(j).getJfNatureOfThe();
//				if (nature.equals("收入")) {
//					amount = amount + flist.get(j).getJfSumMoney();
//				} else if (nature.equals("支出")) {
//					amount = amount - flist.get(j).getJfSumMoney();
//				}else if (nature.equals("欠结")) {
//					if(flist.get(j).getJfAccountingSpecies().equals("租客补结")){
//						amount = amount + flist.get(j).getJfSumMoney();
//					}
//				}
				if (nature.equals("收入")) {
					if(	!flist.get(j).getJfAccountingSpecies().equals("待付房东款")){
						amount = amount + flist.get(j).getJfSumMoney();
					}
				} else if (nature.equals("支出")) {
					if(	!flist.get(j).getJfAccountingSpecies().equals("租客欠结款")
					&&	!flist.get(j).getJfAccountingSpecies().equals("房东欠结款")
					&&	!flist.get(j).getJfAccountingSpecies().equals("充值优惠券")){
						amount = amount - flist.get(j).getJfSumMoney();
					}
				}
				
				
			}
//			num = initialAmount + amount + calibrationAmount;
			num = initialAmount + amount ;
		} else {
//			num = initialAmount + calibrationAmount;
			num = initialAmount;
		}
		BigDecimal bg = new BigDecimal(num);  
        double f1 = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
        record.setFaId(faid);
        record.setFaTheBalanceOf(f1);
        record.setFaTheInitialAmount(initialAmount);
       // record.setFaCalibrationAmount(calibrationAmount);
        System.out.println("改这里");
		int i = infoFinancialAccountMapper.updateByPrimaryKeySelective(record);
		 System.out.println("是多少："+i);
		return i;
	}
	
	//查询收支总额
	@Override
	public List<InfoFinancialAccount> totalQuery(InfoFinancialAccount record) throws Exception {
		List<InfoFinancialAccount> list = infoFinancialAccountMapper.selectByPrimaryKey(record);
		String billingDateFrom = record.getBillingDateFrom();
		String billingDateTo = record.getBillingDateTo();
		if(list.size() != 0){
			JournalFinancialExpand jF = new JournalFinancialExpand();
			for (int k = 0; k < list.size(); ++k) {
				Double summary = 0.00;
				int faid = list.get(k).getFaId();
				jF.setJfAccountId(faid);
				jF.setBillingDateFrom(billingDateFrom);
				jF.setBillingDateTo(billingDateTo);
				List<JournalFinancial> flist = journalFinancialMapper.balanceByBillingDate(jF);
				if (flist.size() > 0) {
					for (int j = 0; j < flist.size(); ++j) {
						String nature = flist.get(j).getJfNatureOfThe();
//						if (nature.equals("收入")) {
//							summary += flist.get(j).getJfSumMoney();
//						} else if (nature.equals("支出")) {
//							summary -= flist.get(j).getJfSumMoney();
//						}else if (nature.equals("欠结")) {
//							if(flist.get(j).getJfAccountingSpecies().equals("租客补结")){
//								summary = summary + flist.get(j).getJfSumMoney();
//							}
//						}
						if (nature.equals("收入")) {
							if(	!flist.get(j).getJfAccountingSpecies().equals("待付房东款")){
								summary = summary + flist.get(j).getJfSumMoney();
							}
						} else if (nature.equals("支出")) {
							if(	!flist.get(j).getJfAccountingSpecies().equals("租客欠结款")
							&&	!flist.get(j).getJfAccountingSpecies().equals("房东欠结款")
							&&	!flist.get(j).getJfAccountingSpecies().equals("充值优惠券")){
								summary = summary - flist.get(j).getJfSumMoney();
							}
						}
					}
				}
				BigDecimal bg = new BigDecimal(summary);  
	            double f1 = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
				list.get(k).setFinancialSummary(f1);;
			}
			return list;
		}
	    return list;
	}

	//查询总收入、总支出、总冲账
	@Override
	public InfoFinancialAccount revenueAndExpenditureLedger(InfoFinancialAccount record) throws Exception {
		Double income = 0.00;
		Double expenditure = 0.00;
		Double strike = 0.00;
		Double summary = 0.00;
		JournalFinancialExpand jF = new JournalFinancialExpand();
		jF.setJfAccountId(record.getFaId());
		jF.setBillingDateFrom(record.getBillingDateFrom());
		jF.setBillingDateTo(record.getBillingDateTo());
		List<JournalFinancial> flist = journalFinancialMapper.balanceByAccountId(jF);
		if (flist.size() > 0) {
			for (int j = 0; j < flist.size(); ++j) {
				String type = flist.get(j).getJfNatureOfThe();
				String status = flist.get(j).getJfStrikeABalanceStatus();
				if ((type.equals("收入") && status.equals("正常")) || (type.equals("欠结")&& status.equals("正常")) ){
					if(type.equals("收入")){
						income += flist.get(j).getJfSumMoney();	
					}else{
						if(flist.get(j).getJfAccountingSpecies().equals("租客补结")){
							income += flist.get(j).getJfSumMoney();
						}
					}
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
            record.setIncome(income);
            record.setExpenditure(expenditure);
            record.setStrike(strike);
            record.setFinancialSummary(summary);
            return record;
		}else{
			return null;
		}
	}
}
