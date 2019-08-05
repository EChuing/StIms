package com.zz.actions.journal;

import java.util.Collections;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.DailyBase;
import com.zz.po.journal.DailyFuture;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.journal.DailyBaseService;
import com.zz.service.journal.DailyFutureService;

/**
 * 空置成本表 数据日历action
 * @author Administrator
 * 
 */
public class DailyBaseAction extends BaseAction implements
		ModelDriven<DailyBase> {
	private DailyBase dailyBase;
	private DailyBaseService dailyBaseService;
	private DailyFutureService dailyFutureService;
	private HouseForStoreService houseForStoreService;
	
	public void setDailyBaseService(DailyBaseService dailyBaseService) {
		this.dailyBaseService = dailyBaseService;
	}

	public void setDailyFutureService(DailyFutureService dailyFutureService) {
		this.dailyFutureService = dailyFutureService;
	}

	public void setHouseForStoreService(HouseForStoreService houseForStoreService) {
        this.houseForStoreService = houseForStoreService;
    }

    // 查询空置状况
	public String vacantCost() {
	    //空置状况 - 查询     F06b01
        int auth1 = Authority.authorize("F06b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看空置状况权限", null));
            return null;
        }
		try {
			List<DailyBase> dbList = dailyBaseService.selectAll(dailyBase);
			if (dbList.size() != 0) {
			    Collections.reverse(dbList);
				String json = JSONUtil.serialize(dbList);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
			    printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
		    e.printStackTrace();
			Syslog.writeErr(e);
		    printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}

	// 按日期查询历史数据
	public String selectBaseByDate() {
		try {
			List<DailyBase> dbList = dailyBaseService.selectByDate(dailyBase);
			if (dbList.size() != 0) {
				String json = JSONUtil.serialize(dbList);
				return json;
			} else {
				return "";
			}
		} catch (Exception e) {
		    e.printStackTrace();Syslog.writeErr(e);
		}
		return null;
	}

	// 按日期查询未来数据 从今日至endDate的
	public String selectFutureByDate() {
		DailyFuture df = new DailyFuture();
		df.setEndDate(dailyBase.getEndDate());
		try {
			List<DailyFuture> dfList = dailyFutureService.selectByDate(df);
			if (dfList.size() != 0) {
				String json = JSONUtil.serialize(dfList);
				return json;
			} else {
				return "";
			}
		} catch (Exception e) {
		}
		return null;
	}
	
	//查询今天的数据：空置未租、正在转租、到期不续、毁约待租、即将空置数、未来空置率=即将空置数/总房数
	private String selectToday(){
	    String[] states = {"空置未租","正在转租","到期不续","毁约待租","全部房源"};
	    int[] nums = new int[6];
	    for(int i=0;i<states.length;i++){
	        nums[i] = houseForStoreService.countVacantHouse(states[i]);
	        if (i != 4) {
	            //nums[5] = "空置未租"+"正在转租"+"到期不续"+"毁约待租";
	            nums[5] += nums[i];
	        }
	    }
	    double vacancyRate = 1;
	    if (nums[4] != 0) {
	        vacancyRate = (double)nums[5] / (double)nums[4];
	    }
	    String kongzhiweizu = "\"kongzhiweizu\":" + nums[0] + ",";
        String zhengzaizhuanzu = "\"zhengzaizhuanzu\":" + nums[1] + ",";
        String daoqibuxu = "\"daoqibuxu\":" + nums[2] + ",";
        String huiyuedaizu = "\"huiyuedaizu\":" + nums[3] + ",";
        String jijiangkongzhishu = "\"jijiangkongzhishu\":" + nums[5] + ",";
        String weilaikongzhilv = "\"weilaikongzhilv\":" + vacancyRate + ",";
        StringBuffer sb = new StringBuffer();
        sb.append(kongzhiweizu);
        sb.append(zhengzaizhuanzu);
        sb.append(daoqibuxu);
        sb.append(huiyuedaizu);
        sb.append(jijiangkongzhishu);
        sb.append(weilaikongzhilv);
	    return sb.toString();
	}
	/**
	 * 查询数据日历
	 */
	public void selectCalendar(){
	    //数据日历 - 查询     F11b01
        int auth1 = Authority.authorize("F11b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看数据日历权限", null));
            return;
        }
        System.out.println("无数据日历权限");
		String historyString = selectBaseByDate();
        String today = selectToday();
		String futureString = selectFutureByDate();
        StringBuffer sb = new StringBuffer(futureString);
        if(sb.length() > 2){
            sb.insert(2, today);
        }
        futureString = sb.toString();
		String result = "[";
		if(!historyString.equals("")){
			result += historyString.substring(1, historyString.length()-1);
		}
		if(!historyString.equals("") && !futureString.equals("")){
			result += ",";
		}
		if(!futureString.equals("")){
			result += futureString.substring(1, futureString.length()-1);
		}
		result += "]";
		printlnOfJson(result);
	}

	@Override
	public DailyBase getModel() {
		if (dailyBase == null) {
			dailyBase = new DailyBase();
		}
		return dailyBase;
	}
}
