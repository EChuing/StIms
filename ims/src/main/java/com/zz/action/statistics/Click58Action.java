package com.zz.action.statistics;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.statistics.Click58;
import com.zz.statistics.DButil;

public class Click58Action extends BaseAction implements ModelDriven<Click58>{
	private Click58 click58;

	public void setClick58(Click58 click58) {
		this.click58 = click58;
	}
	//	罗湖58点击数量添加
	public String insertClick58(){
		System.out.println("到这里来了没");
		String str = click58.getStr();
		System.out.println("获取的验证字符串："+str);
		
		if(str.equals("我们老大确实很帅！")){			
			try {
				DButil dbutil = new DButil();			
				String sql="insert into click_58(type_ff,type_condition,type_district,text,xaxis,type,identify,date,note) values(?,?,?,?,?,?,?,?,?)";  
			    int executeUpdate = dbutil.executeUpdate(sql,click58.getType_ff(),click58.getType_condition(),click58.getType_district(),click58.getText(),click58.getXaxis(),
			    		click58.getType(),click58.getIdentify(),click58.getDate(),click58.getNote());  
			    if(executeUpdate==1){  
			            dbutil.close();    
			     }else {  
			            dbutil.close();   
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
	public String queryClick58(){
		System.out.println("查询点击数量的数据>>>>>>>最后的");
		try {
			DButil dbutil = new DButil();
			String sql = "select * from click_58 where type_ff= ? and type_condition = ? and type_district = ? and type = ? and date = ? and note = ?";
			ResultSet  rs = dbutil.executeQuery(sql, click58.getType_ff(), click58.getType_condition(), click58.getType_district(),
					 click58.getType(), click58.getDate(), click58.getNote());
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
	           System.out.println("最后的查询list:" + list);
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

	//付费类型查询数据
	public String queryClick58TypeFf(){
		System.out.println("查询类型Ff数量的数据>>>>>>>到这里来了没");
		try {
			DButil dbutil = new DButil();
			String sql = "select * from click_58 group by (type_ff)";
			ResultSet  rs = dbutil.executeQuery(sql);

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
	           System.out.println("typeFf ===list:" + list);
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
	
	   //类型查询数据
	public String queryClick58TypeCondition(){
			System.out.println("查询点击condition数量的数据>>>>>>>到这里来了没");
			try {
				DButil dbutil = new DButil();
				String sql = "select * from click_58 group by (type_condition)";
				ResultSet  rs = dbutil.executeQuery(sql);
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
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();Syslog.writeErr(e);
			}
			
			return null;
		}
	   //付费类型查询数据
	public String queryClick58TypeDistrict(){
			System.out.println("查询点击type_district数量的数据>>>>>>>到这里来了没");
			try {
				DButil dbutil = new DButil();
				String sql = "select * from click_58 group by (type_district)";
				ResultSet  rs = dbutil.executeQuery(sql);
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
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();Syslog.writeErr(e);
			}
			
			return null;
		}
		
	    //付费时间类型查询数据
		public String queryClick58Type(){
			System.out.println("查询点击type数量的数据>>>>>>>到这里来了没");
			try {
				DButil dbutil = new DButil();
				String sql = "select * from click_58 group by (type)";
				ResultSet  rs = dbutil.executeQuery(sql);
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
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();Syslog.writeErr(e);
			}
			
			return null;
		}
	
	   //付费类型查询数据
		public String queryClick58Note(){
				System.out.println("note>>>>>>>到这里jiava");
				try {
					DButil dButil = new DButil();
					String sql = "select * from click_58 where type_district = ? and type = ? and date = ? order by type_condition DESC";
					ResultSet  rs = dButil.executeQuery(sql, click58.getType_district(), click58.getType(), click58.getDate());
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
			           System.out.println("len:" + list.size());
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

		public String queryClick58Year(){
			System.out.println("查询点击type数量的数据>>>>>>>到这里来了没");
			try {
				DButil dbutil = new DButil();
				String sql = "select * from click_58 where type = ? group by Year(`date`)";
				ResultSet  rs = dbutil.executeQuery(sql, click58.getType());
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
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();Syslog.writeErr(e);
			}
			
			return null;
		}
		
		public String queryClick58Quarter(){
			System.out.println("查询点击quarter数量的数据>>>>>>>到这里来了没");
			System.out.println("type:"+click58.getType()+"date:"+click58.getDate());
			try {
				DButil dbutil = new DButil();
				String sql = "select * from click_58 where type = ? and date like ? group by Quarter(`date`)";
				ResultSet  rs = dbutil.executeQuery(sql, click58.getType(), "%"+click58.getDate()+"%");
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
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();Syslog.writeErr(e);
			}
			
			return null;
		}

		public String queryClick58Month(){
			System.out.println("查询点击month数量的数据>>>>>>>到这里来了没");
			System.out.println("type:"+click58.getType()+"date:"+click58.getDate());
			try {
				DButil dbutil = new DButil();
				String sql = "select * from click_58 where type = ? and date like ? group by Month(`date`)";
				ResultSet  rs = dbutil.executeQuery(sql, click58.getType(), "%"+click58.getDate()+"%");
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
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();Syslog.writeErr(e);
			}
			
			return null;
		}

		public String queryClick58Date(){
			System.out.println("查询点击type数量的数据>>>>>>>到这里来了没");
			try {
				DButil dbutil = new DButil();
				String sql = "select * from click_58 where type = ? and date like '%${?}%' group by Month(`date`)";
				ResultSet  rs = dbutil.executeQuery(sql, click58.getType(), click58.getDate());
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
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();Syslog.writeErr(e);
			}
			
			return null;
		}
					
	@Override
	public Click58 getModel() {
		if(click58==null){
			click58 = new Click58();
		}
		return click58;
	}


}
