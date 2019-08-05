package com.zz.actions.info;

import java.util.ArrayList;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoRenterExpand;
import com.zz.service.info.RenterService;

/**
 * 租客信息
 * @author Administrator 
 * 
 */
public class RenterAction extends BaseAction implements ModelDriven<InfoRenterExpand> {
	private InfoRenterExpand infoRenterExpand;
	private RenterService renterService;

    public void setRenterService(RenterService renterService) {
        this.renterService = renterService;
    }

    @Override
    public InfoRenterExpand getModel() {
        if (infoRenterExpand == null) {
            infoRenterExpand = new InfoRenterExpand();
        }
        return infoRenterExpand;
    }

	// 专用查询租客姓名
	public String selectHouseRentName() {
		try {
			List<InfoRenterExpand> list = renterService.selectHouseRentName(infoRenterExpand);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
            Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 查找全部
	public String queryAllRenter() {
	    try {
            List<InfoRenterExpand> list = renterService.selectAll(infoRenterExpand);
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}

	// 根据已租房源ID查找租客信息
	public String queryByHouse4rentId() {
	    try {
            List<InfoRenterExpand> renterList = renterService.selectByHouse4rentId(infoRenterExpand.getRenterId());
            if (renterList.size() != 0) {
                String json = JSONUtil.serialize(renterList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}

	// 增加记录
	public String insertRenter() {
	    try {
            int result = renterService.insertRenter(infoRenterExpand);
            if(result == -3){
                printlnOfJson(CommonMethodClass.jsonData(-1, "身份证为空", null));
            }else{
                List<InfoRenterExpand> list = new ArrayList<>();
                InfoRenterExpand ire = new InfoRenterExpand();
                ire.setRenterId(result);
                list.add(ire);
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }       
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 新增失败", null));
        }
		return null;
	}
	// 在添加已租的时候 增加租客记录
	public String insertRenterInAddRent() {
	    try {
            int result = renterService.insertRenter(infoRenterExpand);
            if(result == -3){
                printlnOfJson(CommonMethodClass.jsonData(-1, "身份证为空", null));
            }else{
                List<InfoRenterExpand> list = new ArrayList<>();
                InfoRenterExpand ire = new InfoRenterExpand();
                ire.setRenterId(result);
                list.add(ire);
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 新增失败", null));
        }
		return null;
	}

	// 根据主键更新记录
	public String updateRenter() {
	    try {
            String[] result = renterService.updateRenter(infoRenterExpand).split("###");
            if(Integer.parseInt(result[0]) == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else if(Integer.parseInt(result[0]) == -21){
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已经存在", result[1]));
            }else if(Integer.parseInt(result[0]) == -22){
                printlnOfJson(CommonMethodClass.jsonData(-22, "身份证不能为空", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "更新失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统错误 或 数据更新失败", null));
        }
		return null;
	}

	// 根据写跟进
	public String followRenter() {
		try {
			int result = renterService.updateByPrimaryKeySelective(infoRenterExpand);
			if (result == 0) {
				printlnOfJson(CommonMethodClass.jsonData(-1, "写跟进失败", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}	
		return null;
	}

}
