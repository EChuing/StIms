package com.zz.actions.journal;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourUserDevice;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.journal.JourUserDeviceService;
import com.zz.service.sys.UserService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JourUserDeviceAction extends BaseAction implements ModelDriven<JourUserDevice>{
	/**
     * 添加用户和设备管理
     */
	private JourUserDevice jourUserDevice;
	@Resource
	private JourUserDeviceService jourUserDeviceService;
	@Resource
	private UserService userService;
	@Override
	public JourUserDevice getModel() {
		if(jourUserDevice==null){
			jourUserDevice = new JourUserDevice();
		}
		return jourUserDevice;
	}
	//查询办公区未关联设备
		public String selectNoRelationdevice(){
			try {
				System.out.println("jourUserDevice"+jourUserDevice);
				
				List<JourDevice> DeviceList=jourUserDeviceService.allDeviceExpand(jourUserDevice);
				System.out.println(DeviceList);
				if(DeviceList.size()>=0){
					String json = JSONUtil.serialize(DeviceList);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
				}else {
					printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
				}
			} catch (Exception e) {
				 e.printStackTrace();Syslog.writeErr(e);
				 printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
			}
			return null;
		}
	//查询未关联用户和
	public String selectUserPicDig(){
		try {
			System.out.println("jourUserDevice============="+jourUserDevice);
			List<SysUserExpand> usList = userService.selectUserPicDig(jourUserDevice);
			System.out.println("seze:"+usList.size());
			if(usList.size()>=0){
				String json = JSONUtil.serialize(usList);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
	//添加设备关联
	public String updateUnrelateddevices(){
    	List<JourUserDevice> list = new ArrayList<JourUserDevice>();
    	String jhoJson = jourUserDevice.getJhoIdJson();
    	JSONArray jsa =JSONArray.fromObject(jhoJson);
    	for(Object a : jsa){
			JSONObject jsonObj = (JSONObject)a;
			JourUserDevice jho = (JourUserDevice) JSONObject.toBean(jsonObj, JourUserDevice.class);
			list.add(jho);
		}
    	System.out.println("list:"+list);
    	try {
			int reuslt = jourUserDeviceService.updateUnrelateddevices(list);
			if(reuslt==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "更新成功", null));
            }
    	} catch (Exception e) {
    		e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
	}
    	return null;
    }
	//添加用户和设备的关联
	public String updateUserDevice(){
	    	List<JourUserDevice> list = new ArrayList<JourUserDevice>();
	    	String jhoJson = jourUserDevice.getJhoIdJson();
	    	JSONArray jsa =JSONArray.fromObject(jhoJson);
	    	for(Object a : jsa){
				JSONObject jsonObj = (JSONObject)a;
				JourUserDevice jho = (JourUserDevice) JSONObject.toBean(jsonObj, JourUserDevice.class);
				list.add(jho);
			}
	    	System.out.println("list:"+list);
	    	try {
				int reuslt = jourUserDeviceService.updateList(list);
				if(reuslt==0){
	                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
	            }else{
	                printlnOfJson(CommonMethodClass.jsonData(1, "更新成功", null));
	            }
	    	} catch (Exception e) {
	    		e.printStackTrace();Syslog.writeErr(e);
	            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
	    	return null;
	    }
	//查找已关联设备
	public String selectRelatedDevice(){
		try {
			System.out.println("selectRelatedUser!!"+jourUserDevice);
			System.out.println("查找已关联设备");
			List<JourDevice> usList = jourUserDeviceService.selectDevice(jourUserDevice);
			String json = JSONUtil.serialize(usList);
			System.out.println("usList"+usList);
			if(usList.size()<0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "更新成功", json));
            }
		} catch (Exception e) {
			
			e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));

		}
		return null;
	}
	//查找已关联用户
	public String selectRelatedUser(){
		try {
			System.out.println("selectRelatedUser!!");
			List<SysUserExpand> usList = jourUserDeviceService.selectUser(jourUserDevice);
			String json = JSONUtil.serialize(usList);
			System.out.println("usList"+usList);
			if(usList.size()<0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "更新成功", json));
            }
		} catch (Exception e) {
			
			e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));

		}
		return null;
	}
}
