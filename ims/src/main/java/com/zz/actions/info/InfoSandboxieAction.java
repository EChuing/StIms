package com.zz.actions.info;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.zz.other.Syslog;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.json.JSONException;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.info.InfoSandboxie;
import com.zz.service.info.InfoSandboxieService;

public class InfoSandboxieAction extends BaseAction implements ModelDriven<InfoSandboxie>{
	private InfoSandboxie infoSandboxie;
	private InfoSandboxieService infoSandboxieService;
	
	public void setInfoSandboxieService(InfoSandboxieService infoSandboxieService) {
		this.infoSandboxieService = infoSandboxieService;
	}

    public String getSandboxieBasicData(){
    	try {
    		InfoSandboxie is = infoSandboxieService.selectByPrimaryKey(1);
			if(is != null){
				String json = JSONUtil.serialize(is);
				//
				printlnOfJson(json);
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			Syslog.writeErr(e);
		}
		return null;
    }
	
    public String deduction(){
    	InfoSandboxie is = infoSandboxieService.selectByPrimaryKey(1);
    	infoSandboxie.setAverageBalance(infoSandboxie.getBalance());
    	infoSandboxie.setMiddleBalance(infoSandboxie.getBalance());
    	if(is != null){
    		JSONArray landlordContractArray=JSONArray.fromObject(is.getIsLandlordContract());
    		JSONObject start = new JSONObject();
    		start.put("month", 0);
    		start.put("averageBalance", infoSandboxie.getAverageBalance());
    		start.put("middleBalance", infoSandboxie.getMiddleBalance());
    		start.put("allHouseCount", landlordContractArray.size());
    		start.put("rentHouseCount", infoSandboxie.getRentHouseCount());
    		start.put("renterGiveDepositCount", 0);
    		start.put("renterNoDepositCount", 0);
        	start.put("renterSignCount", 0);
        	start.put("landlordGiveDepositCount", 0);
        	start.put("landlordNoDepositCount", 0);
        	start.put("landlordSignCount", 0);
        	//初始化结果集
    		List<JSONObject> deductionResult = new ArrayList<JSONObject>();
    		//插入初始化数据
    		deductionResult.add(start);
    		//对初始合约数组进行
    		JSONArray newRentArr = JSONArrayQuickSort(landlordContractArray);
        	int size = landlordContractArray.size();
        	landlordContractArray.clear();
        	landlordContractArray.addAll(newRentArr);
    		for(int i = 0; i < 36; i++){
    			List<String> oneMonth = deductionOnce(infoSandboxie, landlordContractArray, i+1);
    			JSONObject monthResult = JSONObject.fromObject(oneMonth.get(0));
    			landlordContractArray = JSONArray.fromObject(oneMonth.get(1));
    			infoSandboxie.setAverageBalance(monthResult.getDouble("averageBalance"));
    	    	infoSandboxie.setMiddleBalance(monthResult.getDouble("middleBalance"));
    	    	deductionResult.add(monthResult);
    		}
    		try {
				String json = JSONUtil.serialize(deductionResult);
				//
				printlnOfJson(json);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();Syslog.writeErr(e);
			}
		}else{
			printlnMsg("-1");
		}
    	return null;
    }
    
    /**
     * 推算一个月的经营状况
     * @param is 公司基础数据
     * @param landlordContractArray  当前房东合约数组(包含租客合约json信息)
     * @return
     */
    public List<String> deductionOnce(InfoSandboxie is, JSONArray landlordContractArray, int month){
    	int renterContractPeriod = is.getRenterContractPeriod();//租客合约周期
    	int landlordContractPeriod = is.getLandlordContractPeriod();//房东合约周期
    	
    	int renterDepositCount = is.getRenterDepositCount();//出房 压X付一
    	int landlordDepositCount = is.getLandlordDepositCount();//存房 压X付一
    	
    	int renterSignCount = is.getRenterSignCount();//每月出房数
    	int landlordSignCount = is.getLandlordSignCount();//每月收房数
    	
    	double middleRenterMoney = is.getMiddleRenterMoney();//租客中位租金
    	double averageRenterMoney = is.getAverageRenterMoney();//租客平均租金
    	
    	double middleLandlordMoney = is.getMiddleLandlordMoney();//房东中位租金
    	double averageLandlordMoney = is.getAverageLandlordMoney();//房东平均租金
    	
    	double renterNoDepositProportion = is.getRenterNoDepositProportion()/100;//租客退房不退押金比 小数
    	double renterDepositProportion = is.getRenterDepositProportion()/100;//租客退房退押金比 小数
    	double renterRenew = is.getRenterRenew()/100;//租客续签比 小数
    	
    	double landlordNoDepositProportion = is.getLandlordNoDepositProportion()/100;//房东退房不退押金比 小数
    	double landlordDepositProportion = is.getLandlordDepositProportion()/100;//房东退房退押金比 小数
    	double landlordRenew = is.getLandlordRenew()/100;//房东续签比 小数
    	
    	double middleBalance = is.getMiddleBalance();//手上现金数  平均价计算的
    	double averageBalance = is.getAverageBalance();//手上现金数  中位数计算的
    	
    	int renterMaturityCount = 0;//租客到期合约数量
    	int landlordMaturityCount = 0;//房东到期合约数量
    	
    	double monthlyAverageIncomeFromRenter = 0.00; //每月租客入金 平均值
    	double monthlyAveragePayForLandlord = 0.00; //每月房东出金 平均值
    	
    	double monthlyMiddleIncomeFromRenter = 0.00; //每月租客入金 中位数
    	double monthlyMiddlePayForLandlord = 0.00; //每月房东出金 中位数
    	//筛选过期合约 剔除
    	//房东
    	for(int i = 0; i < landlordContractArray.size(); i++){
    		JSONObject o = (JSONObject) landlordContractArray.get(i);
    		if(o.getInt("monthCount") == 0){
    			landlordMaturityCount++;
    			if(o.get("renterContract") != null){
    				renterMaturityCount++;
    			}
    			landlordContractArray.remove(i);
    			i--;
    		}else{
    			JSONObject newLandlordContract = new JSONObject();
    			newLandlordContract.put("monthCount", o.getInt("monthCount")-1);
    			if(o.get("renterContract") != null){
    				JSONObject oldRenterContract = (JSONObject)o.get("renterContract");
    				if(oldRenterContract.getInt("monthCount") > 0){
    					JSONObject newRenterContract = new JSONObject();
            			newRenterContract.put("monthCount", oldRenterContract.getInt("monthCount")-1);
            			newLandlordContract.put("renterContract", newRenterContract);
    				}else{
    					renterMaturityCount++;
    				}
    			}
    			landlordContractArray.set(i, newLandlordContract);
    		}
		}
    	//计算过期合约各类数量 退房不退押/退房退押/续签
    	//根据百分百计算对应合约数量
    	//租客
    	double renterNoDepositCount = renterMaturityCount * renterNoDepositProportion;
    	double renterGiveDepositCount = renterMaturityCount * renterDepositProportion;
    	double renterRenewCount = renterMaturityCount * renterRenew;
    	double[] renterMaturityArr = chooseInteger(renterNoDepositCount, renterGiveDepositCount, renterRenewCount);
    	renterNoDepositCount = renterMaturityArr[0];
    	renterGiveDepositCount = renterMaturityArr[1];
    	renterRenewCount = renterMaturityArr[2];
    	//房东
    	double landlordNoDepositCount = landlordMaturityCount * landlordNoDepositProportion;
    	double landlordGiveDepositCount = landlordMaturityCount * landlordDepositProportion;
    	double landlordRenewCount = landlordMaturityCount * landlordRenew;
    	double[] landlordMaturityArr = chooseInteger(landlordNoDepositCount, landlordGiveDepositCount, landlordRenewCount);
    	landlordNoDepositCount = landlordMaturityArr[0];
    	landlordGiveDepositCount = landlordMaturityArr[1];
    	landlordRenewCount = landlordMaturityArr[2];
    	
    	//新增合约数 = 续约数 + 新签租客/房东数
    	int newRenterContractCount = (int)renterRenewCount + renterSignCount;
    	int newLandlordContractCount = (int)landlordRenewCount + landlordSignCount;
    	int landlordStart = landlordContractArray.size() -1;
    	int addStartIndex = 0;
    	for(int i = landlordStart; i >= 0; i--){
    		JSONObject o = (JSONObject) landlordContractArray.get(i);
    		if(o.getInt("monthCount") <= 12){
    			addStartIndex = i;
    			break;
    		}
    	}
    	for(int i = 0; i < newLandlordContractCount; i++){
    		JSONObject o = new JSONObject();
    		o.put("monthCount", landlordContractPeriod);
    		landlordContractArray.add(addStartIndex, o);;
    		
    	}
    	
    	int realNewRenterContractCount = 0;
    	int renterCount = 0;
    	for(int i = landlordContractArray.size()-1; i >= 0; i--){
    		JSONObject o = (JSONObject) landlordContractArray.get(i);
    		if(o.get("renterContract") == null){
    			if(realNewRenterContractCount == newRenterContractCount){
    				continue;
    			}
    			JSONObject newLandlordContract = new JSONObject();
    			newLandlordContract.put("monthCount", o.getInt("monthCount"));
    			JSONObject renterContract = new JSONObject();
    			renterContract.put("monthCount", renterContractPeriod);
    			newLandlordContract.put("renterContract", renterContract);
    			landlordContractArray.set(i, newLandlordContract);
    			realNewRenterContractCount++;
    		}else{
    			renterCount++;
    		}
    	}
    	
    	if(newRenterContractCount > realNewRenterContractCount){
    		if((newRenterContractCount-realNewRenterContractCount) >= renterSignCount){
    			renterSignCount = 0;
    			renterGiveDepositCount += (newRenterContractCount-realNewRenterContractCount - renterSignCount);
    		}else{
    			renterSignCount -= (newRenterContractCount-realNewRenterContractCount);
    		}
    	}
    	renterCount += realNewRenterContractCount;
    	//每月租客入金计算   每月租客入金 = （已出房数 * 月均收入） - （租客退房退押事件数 * 租客压x付1） + （新租房事件数 * 租客压x付1）
    	//平均值计算
    	monthlyAverageIncomeFromRenter = averageRenterMoney * renterCount - averageRenterMoney * renterGiveDepositCount * renterDepositCount + averageRenterMoney * renterSignCount * renterDepositCount;
    	//中位值计算
    	monthlyMiddleIncomeFromRenter = middleRenterMoney * renterCount - middleRenterMoney * renterGiveDepositCount * renterDepositCount + middleRenterMoney * renterSignCount * renterDepositCount;
    	
    	//每月房东出金计算  每月房东出金 = （已收房数 * 月均成本） + （房东退房退押事件数 * 房东压y付1） - （新托管事件数 * 房东压y付1）
    	//平均值计算
    	monthlyAveragePayForLandlord = averageLandlordMoney * landlordContractArray.size() + averageLandlordMoney * landlordGiveDepositCount * landlordDepositCount - averageLandlordMoney * landlordSignCount * landlordDepositCount;
    	//中位值计算
    	monthlyMiddlePayForLandlord = middleLandlordMoney * landlordContractArray.size() + middleLandlordMoney * landlordGiveDepositCount * landlordDepositCount - middleLandlordMoney * landlordSignCount * landlordDepositCount;
    	
    	//手上现金/账户余额 
    	//平均
    	averageBalance = averageBalance + monthlyAverageIncomeFromRenter - monthlyAveragePayForLandlord;
    	//中位
    	middleBalance = middleBalance + monthlyMiddleIncomeFromRenter - monthlyMiddlePayForLandlord;
    	
    	BigDecimal averageBalanceBigDecimal = new BigDecimal(averageBalance);  
    	averageBalance = averageBalanceBigDecimal.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
    	
    	BigDecimal middleBalanceBigDecimal = new BigDecimal(middleBalance);  
    	middleBalance = middleBalanceBigDecimal.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
    	
    	JSONObject result = new JSONObject();
    	result.put("month", month);
    	result.put("averageBalance", averageBalance);
    	result.put("middleBalance", middleBalance);
    	result.put("allHouseCount", landlordContractArray.size());
    	result.put("rentHouseCount", renterCount);
    	result.put("renterGiveDepositCount", renterGiveDepositCount);
    	result.put("renterNoDepositCount", renterNoDepositCount);
    	result.put("renterSignCount", renterSignCount);
    	result.put("landlordGiveDepositCount", landlordGiveDepositCount);
    	result.put("landlordNoDepositCount", landlordNoDepositCount);
    	result.put("landlordSignCount", landlordSignCount);
    	
    	List<String> resultList = new ArrayList<String>();
    	resultList.add(result.toString());
    	resultList.add(landlordContractArray.toString());
    	return resultList;
    }
    
    //根据合约剩余月份快速排序合约数组 
    public JSONArray JSONArrayQuickSort(JSONArray arr){
    	if(arr.size()<=1){
    		return arr;
    	}
    	//定义参照点  取中间的
    	int pivotIndex = (int)Math.floor(arr.size() / 2);
    	JSONArray left = new JSONArray();//定义左侧数组
    	JSONArray right = new JSONArray();//定义右侧数组
    	JSONObject pobj = (JSONObject) arr.get(pivotIndex);
    	arr.remove(pivotIndex);
    	Date a = new Date();
    	for(int i= 0; i < arr.size(); i++){
    		JSONObject aobj = (JSONObject) arr.get(i);
    		if(aobj.getInt("monthCount") < pobj.getInt("monthCount")){
    			left.add(aobj);
    		}else{
    			right.add(aobj);
    		}
    	}
    	JSONArray qleft = JSONArrayQuickSort(left);
    	JSONArray qright = JSONArrayQuickSort(right);
    	qleft.add(pobj);
    	qleft.addAll(qright);
    	return qleft;
    }
    
    /**
     * 计算按比例分配的各类退房合约数量 对小数取整进行判断
     * @param A 退房不退押
     * @param B 退房退押
     * @param C 续签
     * @return
     */
    public double[] chooseInteger(double A, double B, double C){
    	//计算小数部分
    	double ADecimal = A - (int)A;
    	double BDecimal = B - (int)B;
    	double CDecimal = C - (int)C;
    	BigDecimal ADecimalDecimal = new BigDecimal(ADecimal);  
    	ADecimal = ADecimalDecimal.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
    	BigDecimal BDecimalDecimal = new BigDecimal(BDecimal);  
    	BDecimal = BDecimalDecimal.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
    	BigDecimal CDecimalDecimal = new BigDecimal(CDecimal);  
    	CDecimal = CDecimalDecimal.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
    	//取整判断
    	if((ADecimal+BDecimal+CDecimal) == 2){
    		//如果小数和等于2   小数最大的两个向上取整 剩下一个去掉小数部分  如果两个相等且小于第三个  假设向上取整优先级 B>C>A
    		if(ADecimal > BDecimal){
    			A = Math.ceil(A);
    			if(BDecimal >= CDecimal){
    				B = Math.ceil(B);
    				C = Math.floor(C);
    			}else{
    				C = Math.ceil(C);
    				B = Math.floor(B);
    			}
    		}else{
    			B = Math.ceil(B);
    			if(ADecimal > CDecimal){
    				A = Math.ceil(A);
    				C = Math.floor(C);
    			}else{
    				C = Math.ceil(C);
    				A = Math.floor(A);
    			}
    		}
    	}else if((ADecimal+BDecimal+CDecimal) == 1){
    		//如果小数和等于1   小数最大向上取整 剩下两个去掉小数部分   如果两个相等且大于第三个  假设向上取整优先级  B>C>A
    		if(ADecimal <= BDecimal){
    			A = Math.floor(A);
    			if(BDecimal < CDecimal){
    				B = Math.floor(B);
    				C = Math.ceil(C);
    			}else{
    				C = Math.floor(C);
    				B = Math.ceil(B);
    			}
    		}else{
    			B = Math.floor(B);
    			if(ADecimal <= CDecimal){
    				A = Math.floor(A);
    				C = Math.ceil(C);
    			}else{
    				C = Math.floor(C);
    				A = Math.ceil(A);
    			}
    		}
    	}else{
    		//最后一种情况刚好都是整数 不需要取整操作
    	}
    	double[] countArr = new double[3];
    	countArr[0] = A;
    	countArr[1] = B;
    	countArr[2] = C;
    	return countArr;
    }
    
    
	@Override
	public InfoSandboxie getModel() {
		// TODO Auto-generated method stub
		if(infoSandboxie==null){
			infoSandboxie = new InfoSandboxie();
		}
		return infoSandboxie;
	}
	
}
