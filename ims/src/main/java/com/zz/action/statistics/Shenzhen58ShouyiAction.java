package com.zz.action.statistics;

import java.io.PrintWriter;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.statistics.Shenzhen58Shouyi;
import com.zz.statistics.DButil;

public class Shenzhen58ShouyiAction extends BaseAction implements ModelDriven<Shenzhen58Shouyi>{
	private Shenzhen58Shouyi shenzhen58Shouyi;
	
	public void setShenzhen58Shouyi(Shenzhen58Shouyi shenzhen58Shouyi) {
		this.shenzhen58Shouyi = shenzhen58Shouyi;
	}


//	罗湖58点击数量添加
	public String insertShenzhen58Shouyi(){
		System.out.println("点击数量添加，到这里来了没");
		try {

			String str= shenzhen58Shouyi.getStr();
			System.out.println("str:"+str);
			if(str.equals("我们老大确实很帅！")){
		
				printlnMsg("1");
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
	//查询数据
	public String queryshenzhen58Shouyi(){
		System.out.println("查询点击数量的数据>>>>>>>到这里来了没");
		try {			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();Syslog.writeErr(e);
		}
		
		return null;
	}

	@Override
	public Shenzhen58Shouyi getModel() {
		if(shenzhen58Shouyi==null){
			shenzhen58Shouyi = new Shenzhen58Shouyi();
		}
		return shenzhen58Shouyi;
	}

}
