package com.zz.action.statistics;

import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import com.zz.po.statistics.Pay58;
import com.zz.statistics.DButil;

public class Pay58Action extends BaseAction implements ModelDriven<Pay58>{
	private Pay58 pay58;
	
	public void setPay58(Pay58 pay58) {
		this.pay58 = pay58;
	}

	//	罗湖58添加数据
	public String insertPay58(){
		System.out.println("到这里来了没");
		String str = pay58.getStr();
		System.out.println("获取的验证字符串："+str);
		if(str.equals("我们老大确实很帅！")){			
			try {
				DButil dButil = new DButil();
				String sql="insert into pay_58(date,text,type,note) values(?,?,?,?)";  
			    int executeUpdate = dButil.executeUpdate(sql,pay58.getDate(),pay58.getText(),pay58.getType(),pay58.getNote());  
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
		public String queryPay58(){
			System.out.println("查询付费数量的数据>>>>>>>到这里来了没");
			try {
				DButil dButil = new DButil();
				String sql = "select * from pay_58 where date between ? and ? order by date ASC";
				ResultSet  rs = dButil.executeQuery(sql, pay58.getStartTime(), pay58.getEndTime());
				System.out.println("rs=="+rs);
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
		           System.out.println("list:" + list);
		           String json = JSONUtil.serialize(list);
		           if(list.size() != 0){		
			           printlnOfJson(json);
		           }else{
		        	   printlnOfJson("-1");
		           }
		           dButil.close();  
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();Syslog.writeErr(e);
			}
			
			return null;
		}
		

	@Override
	public Pay58 getModel() {
		if(pay58==null){
			pay58 = new Pay58();
		}
		return pay58;
	}

}
