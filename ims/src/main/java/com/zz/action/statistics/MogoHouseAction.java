package com.zz.action.statistics;

import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zz.other.Syslog;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.statistics.Click58;
import com.zz.po.statistics.MogoHouse;
import com.zz.statistics.DButil;

public class MogoHouseAction  extends BaseAction implements ModelDriven<MogoHouse>{
	private MogoHouse mogoHouse;

	public void setMogoHouse(MogoHouse mogoHouse) {
		this.mogoHouse = mogoHouse;
	}
	
	public String insertMogoHouse(){
		System.out.println("到这里来了没");
		String str = mogoHouse.getStr();
		System.out.println("获取的验证字符串："+str);
		
		if(str.equals("我们老大确实很帅！")){			
			try {
				DButil dButil = new DButil();
				String sql="insert into mogo_house(name,text,xaxis,type,identify,date,note) values(?,?,?,?,?,?,?)";  
			    int executeUpdate = dButil.executeUpdate(sql,mogoHouse.getName(),mogoHouse.getText(),mogoHouse.getXaxis(),
			    						mogoHouse.getType(),mogoHouse.getIdentify(),mogoHouse.getDate(),mogoHouse.getNote());  
			    if(executeUpdate==1){  
			    	dButil.close();    
			     }else {  
			    	 dButil.close();   
			     }  
				printlnMsg("1");		
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				Syslog.writeErr(e);
			}
		}else{
			printlnMsg("-1");
		}
		return null;
	}
	//查询数据
	public String queryMogoHouse(){
		System.out.println("MOgo条件数据>>>>>>>到这里来了没");
		try {
			DButil dButil = new DButil();
			String sql = "select * from mogo_house where name = ? and date between ? and ? order by date ASC";
			ResultSet  rs = dButil.executeQuery(sql , mogoHouse.getName(), mogoHouse.getStartTime(), mogoHouse.getEndTime());
			
			 ResultSetMetaData md = rs.getMetaData(); //得到结果集(rs)的结构信息，比如字段数、字段名等   
	           int columnCount = md.getColumnCount(); //返回此 ResultSet 对象中的列数   
	           List list = new ArrayList();   
	           Map rowData = new HashMap();   
	           while (rs.next()) {   
		            rowData = new HashMap(columnCount);   
		            for (int i = 1; i <= columnCount; i++) {   
		                    rowData.put(md.getColumnName(i), rs.getObject(i));   
		            }   
		            list.add(rowData);   		           
	           }   
	           System.out.println("listzuihou:"+list.size());
	           String json = JSONUtil.serialize(list);
	           if(list.size() != 0){		
		           printlnOfJson(json);
	           }else{
	        	   printlnOfJson("-1");
	           }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();Syslog.writeErr(e);
		}
		
		return null;
	}
	
	
	//条件查询数据
	public String queryMogoHouseCondition(){
		System.out.println("MOgo条件查询的数据>>>>>>>到这里来了没");
		try {
			DButil dButil = new DButil();
			String sql = "select * from mogo_house group by (name)";
			ResultSet  rs = dButil.executeQuery(sql);  		
			 ResultSetMetaData md = rs.getMetaData(); //得到结果集(rs)的结构信息，比如字段数、字段名等   
	           int columnCount = md.getColumnCount(); //返回此 ResultSet 对象中的列数   
	           List list = new ArrayList();   
	           Map rowData = new HashMap();   
	           while (rs.next()) {   
		            rowData = new HashMap(columnCount);   
		            for (int i = 1; i <= columnCount; i++) {   
		                    rowData.put(md.getColumnName(i), rs.getObject(i));   
		            }   
		            list.add(rowData);   		           
	           }   
	           System.out.println("list: "+list.size());
	           String json = JSONUtil.serialize(list);
	           if(list.size() != 0){		
		           printlnOfJson(json);
	           }else{
	        	   printlnOfJson("-1");
	           }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();Syslog.writeErr(e);
		}
		
		return null;
	}

	@Override
	public MogoHouse getModel() {
		if(mogoHouse == null)
			mogoHouse = new MogoHouse();
		return mogoHouse;
	}

}
