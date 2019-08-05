package com.zz.service.info;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zz.other.Syslog;
import org.springframework.beans.factory.annotation.Autowired;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.mysql.fabric.xmlrpc.base.Data;
import com.opensymphony.xwork2.ActionContext;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.info.InfoRenewalLandlordMapper;
import com.zz.mapper.journal.JournalContractDatabaseMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.mapper.sys.SysVariablesMapper;
import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoRenewalLandlord;
import com.zz.po.info.InfoRenewalLandlordExpand;
import com.zz.po.info.InfoContractInstallment;
import com.zz.po.journal.JournalContractDatabase;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.po.sys.SysVariables;


public class RenewalLandlordServiceImpl implements RenewalLandlordService{
	
	private InfoRenewalLandlordMapper infoRenewalLandlordMapper;
	private ContractInstallmentService contractInstallmentService;
	private JournalContractDatabaseMapper journalContractDatabaseMapper;
	private InfoHouse4storeMapper infoHouse4storeMapper;
	private SysVariablesMapper sysVariablesMapper;
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;
	
	public void setSysVariablesMapper(SysVariablesMapper sysVariablesMapper) {
        this.sysVariablesMapper = sysVariablesMapper;
    }
    public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}
	public void setJournalContractDatabaseMapper(
			JournalContractDatabaseMapper journalContractDatabaseMapper) {
		this.journalContractDatabaseMapper = journalContractDatabaseMapper;
	}
	public void setInfoRenewalLandlordMapper(
			InfoRenewalLandlordMapper infoRenewalLandlordMapper) {
		this.infoRenewalLandlordMapper = infoRenewalLandlordMapper;
	}
	public void setContractInstallmentService(
			ContractInstallmentService contractInstallmentService) {
		this.contractInstallmentService = contractInstallmentService;
	}

	@Override
	public List<InfoRenewalLandlordExpand> selectAll(
			InfoRenewalLandlordExpand conditions) throws Exception {
		return infoRenewalLandlordMapper.selectAll(conditions);
	}

	@Override
	public int deleteByPrimaryKey(Integer jrlId) throws Exception {
		return infoRenewalLandlordMapper.deleteByPrimaryKey(jrlId);
	}

	@Override
	public int insertSelective(InfoRenewalLandlord record) throws Exception {
		return infoRenewalLandlordMapper.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoRenewalLandlord record)
			throws Exception {
		return infoRenewalLandlordMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<InfoRenewalLandlordExpand> selectByPrimaryKey(
			InfoRenewalLandlordExpand conditions) throws Exception {
		return infoRenewalLandlordMapper.selectByPrimaryKey(conditions);
	}

	/**
	 * 新增合约
	 * 返回值为新增的房东合约id
	 */
	@Override
	public String insertRenewalLandlord(InfoRenewalLandlordExpand infoRenewalLandlordExpand) throws Exception {
		String id = "";
		//验证免租期
//		if(!validateFreePeriod(infoRenewalLandlordExpand)){
//			return null;
//		}
		//添加合同
		int result = insertSelective(infoRenewalLandlordExpand);
		id = ""+infoRenewalLandlordExpand.getJrlId();
		if(result==0){
			throw new Exception("新增0条合约");
		}
		//添加账单
		List<InfoContractInstallment> list = CommonMethodClass.landContractInstallment(infoRenewalLandlordExpand);
		if(list.size() == 0){
			throw new Exception("生成0条新分期账单！");
		}
		int result2 = contractInstallmentService.insertList(list);
		if(result2 == 0){
			throw new Exception("数据库新增0条新账单！");
		}
		//修改合同编号状态
		SysVariables sysVar = new SysVariables();
		sysVar.setVariablesId(1);
		List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
		if(!sysVarList.isEmpty()){
		    sysVar = sysVarList.get(0);
		}
		if (sysVar.getContractNums() == 1) {
		    if(infoRenewalLandlordExpand.getJrlRenewalCoding() != null && !infoRenewalLandlordExpand.getJrlRenewalCoding().equals("")){
	            JournalContractDatabase jcd = new JournalContractDatabase();
	            JSONArray json = JSONArray.fromObject(infoRenewalLandlordExpand.getJrlRenewalCoding());
	            for(int i=0; i<json.size();++i){
	                JSONObject jcdjs = JSONObject.fromObject(json.get(i));
	                String tempid = jcdjs.get("jcdId").toString();
	                jcd.setJcdId(Integer.parseInt(tempid));
	                jcd.setJcdUseState("已签约");
	                jcd.setJcdUsedType("存房");
	                jcd.setJcdHouseAddress(jcdjs.getString("jcdHouseAddress"));
	                jcd.setJcdContractPerson(infoRenewalLandlordExpand.getAdminUser());
	                jcd.setJcdSigningTime(infoRenewalLandlordExpand.getJrlSignedTime());
	                int result1 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
	                if(result1 == 0){
	                    throw new Exception("修改合同编号状态失败");
	                }
	            }   
	        }
		}
		
		//更新未租表托管到期时间、房屋押金
		Integer hsId = infoRenewalLandlordExpand.getJrlHouse4storeId();
        InfoRenewalLandlordExpand endCont = infoRenewalLandlordMapper.selectEndTime(hsId);
        if(endCont == null){
            throw new Exception("没有合约！！！");
        }
        String tempTime = endCont.getJrlEndTime();
        Double hsHouseDeposit = infoRenewalLandlordExpand.getHsHouseDeposit();
        InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
        infoHouse4storeExpand.setHsId(hsId);
        infoHouse4storeExpand.setHsEndTime(tempTime);
        infoHouse4storeExpand.setHsHouseDeposit(hsHouseDeposit);
        int result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(infoHouse4storeExpand);
        if(result3 == 0){
            throw new Exception("更新未租表托管到期时间、房屋押金失败!");
        }
		return id;
	}
	
	@Override
	public String updateRenewalLandlord(InfoRenewalLandlordExpand infoRenewalLandlordExpand) throws Exception {
		System.out.println(infoRenewalLandlordExpand.getHsHouseId()+"**********************");
		long day3,day4,day5,day6;
		InfoRenewalLandlordExpand infoRenewal=new InfoRenewalLandlordExpand();
		infoRenewal.setJrlId(infoRenewalLandlordExpand.getJrlId());
		List<InfoRenewalLandlordExpand> list1=infoRenewalLandlordMapper.selectAll(infoRenewal);
		if (list1.isEmpty()) {
			return "系统异常";
		 }
		SimpleDateFormat myFormatter = new SimpleDateFormat( "yyyy-MM-dd");
		StringBuffer followUp = new StringBuffer();
		infoRenewal.setJrlTheTerm(infoRenewalLandlordExpand.getJrlTheTerm());
		infoRenewal.setJrlEndTime(infoRenewalLandlordExpand.getJrlEndTime());
		infoRenewal.setJrlSignedTime(infoRenewalLandlordExpand.getJrlSignedTime());
		infoRenewal.setJrlPaymentMethod(infoRenewalLandlordExpand.getJrlPaymentMethod());
		infoRenewal.setJrlInAdvancePay(infoRenewalLandlordExpand.getJrlInAdvancePay());
		infoRenewal.setJrlPriceLadder(infoRenewalLandlordExpand.getJrlPriceLadder());
		infoRenewal.setJrlRentFreeSegment(infoRenewalLandlordExpand.getJrlRentFreeSegment());
		List<String> list2 = new ArrayList<String>();
		list2.add(infoRenewalLandlordExpand.getJrlRentFreeSegment());
		List<String> list3 = new ArrayList<String>();
		list3.add(infoRenewalLandlordExpand.getJrlPriceLadder());
		
		
		Map<String, String> map = new HashMap<String, String>();
	    map.put("jrlTheTerm", "合同期限");
	    map.put("jrlEndTime", "到期时间");
	    map.put("jrlPaymentMethod", "租金缴费方式");
	    map.put("jrlSignedTime", "签约时间");
	    map.put("jrlInAdvancePay", "提前缴租时间");
	    map.put("jrlPriceLadder", "租金设置");
	    map.put("jrlRentFreeSegment", "免租期设置");
	    
	    Field[] newNotRent = infoRenewal.getClass().getSuperclass().getDeclaredFields();
	    
	    for (Field field : newNotRent) {
			field.setAccessible(true);
			if (map.containsKey(field.getName()) && field.get(infoRenewal) != null
				&& !field.get(infoRenewal).equals(field.get(list1.get(0)))
				&& !(field.get(infoRenewal).equals("") && field.get(list1.get(0)) == null)) {
				if ("jrlPriceLadder".equals(field.getName())) {
					followUp.append(map.get(field.getName())+"：") ;
					for(int i3=0;i3<list1.size();i3++) {
						String price=list1.get(i3).getJrlPriceLadder();
						String[] data7=price.split(",");
						for(int i2=0;i2<data7.length;i2++) {
							Object old = field.get(list1.get(0)) != null ? field.get(list1.get(0)) : "";
			                followUp.append("第"+(i2+1)+"年租金："+data7[i2]+"元  ");
						}
					}
					followUp.append(" → "+map.get(field.getName())+"：");
					for(int h=0;h<list3.size();h++) {
						String price1=list3.get(h);
						String[] data6=price1.split(",");
						for(int k=0;k<data6.length;k++) {
							Object old = field.get(list1.get(0)) != null ? field.get(list1.get(0)) : "";
			                followUp.append("第"+(k+1)+"年租金："+data6[k]+"元  ");
						}
					}
				}
				else if("jrlRentFreeSegment".equals(field.getName())) {
					followUp.append(map.get(field.getName())+"：");
					for(int i=0;i<list1.size();i++) {
						String year=list1.get(i).getJrlRentFreeSegment();
						String[] data=year.split(",");
						for(int i1=0;i1<data.length;i1++) {
							String data1=data[i1];
							String data2[]=data1.split("#");
							//未修改换算时间
							Date date= myFormatter.parse(data2[1]);
							Date mydate= myFormatter.parse(data2[0]);
							Date date1= myFormatter.parse(data2[3]);
							Date mydate1= myFormatter.parse(data2[2]);
							day3=(date.getTime()-mydate.getTime())/(24*60*60*1000);
							day4=(date1.getTime()-mydate1.getTime())/(24*60*60*1000);
							Object old = field.get(list1.get(0)) != null ? field.get(list1.get(0)) : "";
							if(day3==0){day3=-1;}
							if(day4==0){day4=-1;}
							System.out.println("第"+(i1+1)+"年:年前免租期："+(day3+1)+"天，  年后免租期："+(day4+1)+"天  ");
			                followUp.append("第"+(i1+1)+"年:年前免租期："+(day3+1)+"天，  年后免租期："+(day4+1)+"天  ") ;
						}
					}

					followUp.append(" → "+map.get(field.getName())+"：");
					for(int j=0;j<list2.size();j++) {
						String year1=list2.get(j);
						String[] data3=year1.split(",");
						for(int j1=0;j1<data3.length;j1++) {
							String data4=data3[j1];
							String data5[]=data4.split("#");
							//修改的换算时间
							Date date= myFormatter.parse(data5[1]);
							Date mydate= myFormatter.parse(data5[0]);
							Date date1= myFormatter.parse(data5[3]);
							Date mydate1= myFormatter.parse(data5[2]);
							day5=(date.getTime()-mydate.getTime())/(24*60*60*1000);
							day6=(date1.getTime()-mydate1.getTime())/(24*60*60*1000);
							Object old = field.get(list1.get(0)) != null ? field.get(list1.get(0)) : "";
							if(day5==0){day5=-1;}
							if(day6==0){day6=-1;}
							System.out.println("第"+(j1+1)+"年:修改年前免租期"+(day5+1)+"天，  年后免租期"+(day6+1)+"天  " );
							followUp.append("第"+(j1+1)+"年:修改年前免租期"+(day5+1)+"天，  年后免租期"+(day6+1)+"天  " );
						}
					}
				}else {
				Object old = field.get(list1.get(0)) != null ? field.get(list1.get(0)) : "";
                followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(infoRenewal) + ";");
				}
			}
	    }
	    
		int result = infoRenewalLandlordMapper.updateByPrimaryKeySelective(infoRenewalLandlordExpand);
		if(result==0){
			throw new Exception("更新0条合约");
		}
		Integer flag = infoRenewalLandlordExpand.getUpdateFlag();
		if(flag == null || flag == 0){
			return "1";
		}
		List<InfoContractInstallment> list = CommonMethodClass.landContractInstallment(infoRenewalLandlordExpand);
		// 从旧账单中恢复数据
		InfoContractInstallmentExpand param = new InfoContractInstallmentExpand();
        param.setContractType("landlord");
        param.setJciLandContId(infoRenewalLandlordExpand.getJrlId());
        List<InfoContractInstallmentExpand> old = contractInstallmentService.selectAll(param);
        for (InfoContractInstallment item : list) {
            for (InfoContractInstallmentExpand item2 : old) {
                if (item.getJciPeriods() == item2.getJciPeriods()) {
                    item.setJciState(item2.getJciState());
                    item.setJciRemark(item2.getJciRemark());
                    item.setJciMessageTime(item2.getJciMessageTime());
                    item.setJciMessageNote(item2.getJciMessageNote());
                    item.setJciPaymentVoucher(item2.getJciPaymentVoucher());
                    item.setJciRead(item2.getJciRead());
                    item.setJciAudit(item2.getJciAudit());
                    item.setJciIfPrint(item2.getJciIfPrint());
                    item.setJciSpecialNumber(item2.getJciSpecialNumber());
                    item.setJciImgPath(item2.getJciImgPath());
                    item.setJciImgNum(item2.getJciImgNum());
                }
            }
        }
		if(list.size() == 0){
			throw new Exception("生成0条新分期账单！");
		}
		InfoContractInstallmentExpand condition = new InfoContractInstallmentExpand();
		condition.setJciLandContId(infoRenewalLandlordExpand.getJrlId());
		int result1 = contractInstallmentService.deleteByPrimaryKey(condition);
		int result2 = contractInstallmentService.insertList(list);
		if(result2 == 0){
			throw new Exception("更新0条新账单！");
		}
		//更新未租表托管到期时间
        Integer hsId = infoRenewalLandlordExpand.getJrlHouse4storeId(); 
		InfoRenewalLandlordExpand endCont = infoRenewalLandlordMapper.selectEndTime(hsId);
		if(endCont == null){
			throw new Exception("没有合约！！！");
		}
		String tempTime = endCont.getJrlEndTime();
		InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
		infoHouse4storeExpand.setHsId(hsId);
		infoHouse4storeExpand.setHsEndTime(tempTime);
		int result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(infoHouse4storeExpand);
		if(result3 == 0){
			throw new Exception("更新未租表托管到期时间失败!");
		}
		SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
        JournalHousingFollowExpand jnl = new JournalHousingFollowExpand();
        jnl.setJhfHouse4storeId(infoRenewalLandlordExpand.getJrlHouse4storeId());
        jnl.setJhfUserId(userInfo.getUserId());
        jnl.setJhfHouseId(infoRenewalLandlordExpand.getHsHouseId());
        jnl.setJhfDepartment(userInfo.getSuDepartmentId());
        jnl.setJhfStorefront(userInfo.getSuStoreId());
        jnl.setJhfPaymentWay("系统跟进");
        jnl.setJhfFollowResult("跟进成功");
        jnl.setJhfFollowRemark("修改业主合约："+followUp.toString());
        journalHousingFollowMapper.insertSelective(jnl);
		return "1";
	}
	
	/**
	 * 免租期时段验证
	 */
	private boolean validateFreePeriod(InfoRenewalLandlordExpand infoRenewalLandlordExpand){
		try{
			String[] rentFreeSegment = infoRenewalLandlordExpand.getJrlRentFreeSegment().split(",");//免租期
			System.out.println("rentFreeSegment.length:"+rentFreeSegment.length);
			//判断免租期段是否有值
			if(rentFreeSegment.length==0){
				System.out.println("免租期验证："+"没有免租期");
				return false;
			}
			for(int i=0;i<rentFreeSegment.length;i++){
				String[] one = rentFreeSegment[i].split("#");
				//判断传来的时间字符串格式是否正确
				for(int j = 0;j<one.length;j++){
					System.out.println("one[j]:"+one[j]);
					if(!CommonMethodClass.juDate(one[j])){
						System.out.println("免租期验证："+"免租期格式不正确");
						return false;
					}
				}
				//判断时间字符串是否符合实际
				int before = 0;
				int after = 0;
				if(!one[0].equals(one[1])){
					//获取天数差
					before = CommonMethodClass.getDayDiff(one[0],one[1])+1;
				}
				if(!one[2].equals(one[3])){
					//获取天数差
					after = CommonMethodClass.getDayDiff(one[2],one[3])+1;
				}
				//两个时间段（开始~结束）的差（%）以12是否等与0，等于0则为一整年，不等于0则用 flag 标记
				int flag = 0;//整年标记
				int[] rs = CommonMethodClass.getYearMonthDay(infoRenewalLandlordExpand.getJrlBeginTime(),infoRenewalLandlordExpand.getJrlEndTime());
                if (rs[1] > 0 || rs[2] > 0) {
                    flag = 1;
                }
				//判断免租期天数是否正确
				for(int k=0;i<rentFreeSegment.length;++i){
					//非最后一年免租期天数判断
					if(i<rentFreeSegment.length-1){
						if((before+after) != infoRenewalLandlordExpand.getJrlRentFreeDays()){
							System.out.println("免租期验证："+"天数错误，年前加年尾不等于总免租天数");
							return false;
						}
					}
					//最后一年，整年的判断，非整年的不判断
					if(i==rentFreeSegment.length-1 && flag == 0){
						if((before+after) != infoRenewalLandlordExpand.getJrlRentFreeDays()){
							System.out.println("免租期验证："+"天数错误，年前加年尾不等于总免租天数");
							return false;
						}
					}
				}
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			return false;
		}
	}

	@Override
	public List<InfoRenewalLandlordExpand> adSelect(
			InfoRenewalLandlordExpand conditions) throws Exception {
		return infoRenewalLandlordMapper.adSelect(conditions);
	}

	@Override
	public int querySignedNum(
	        InfoRenewalLandlordExpand conditions) throws Exception {
		return infoRenewalLandlordMapper.querySignedNum(conditions);
	}
	@Override
	public List<InfoRenewalLandlordExpand> selectAllRenewalLandlord(
	        InfoRenewalLandlordExpand conditions) throws Exception {
		return infoRenewalLandlordMapper.selectAllRenewalLandlord(conditions);
	}
    @Override
    public int abrogateLandlordContract(InfoRenewalLandlordExpand infoRenewalLandlordExpand) throws Exception {
        //更新合约状态
        infoRenewalLandlordExpand.setJrlRentalType("作废");
        int result1 = infoRenewalLandlordMapper.updateByPrimaryKeySelective(infoRenewalLandlordExpand);
        if (result1 == 0) {
            throw new Exception("更新合约状态失败");
        }
        //删除分期账单
        InfoContractInstallmentExpand condition = new InfoContractInstallmentExpand();
        condition.setJciLandContId(infoRenewalLandlordExpand.getJrlId());
        int result2 = contractInstallmentService.deleteByPrimaryKey(condition);
        if (result2 == 0) {
            throw new Exception("删除分期账单失败");
        }
        //更新未租表托管到期时间
        Integer hsId = infoRenewalLandlordExpand.getJrlHouse4storeId();
        InfoRenewalLandlordExpand endCont = infoRenewalLandlordMapper.selectEndTime(hsId);
        if(endCont != null){
            String tempTime = endCont.getJrlEndTime();
            InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
            infoHouse4storeExpand.setHsId(hsId);
            infoHouse4storeExpand.setHsEndTime(tempTime);
            int result3 = infoHouse4storeMapper.updateByPrimaryKeySelective(infoHouse4storeExpand);
            if(result3 == 0){
                throw new Exception("更新未租表托管到期时间失败!");
            }
        }
        return 1;
    }

}
