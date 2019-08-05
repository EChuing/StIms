package com.zz.statistics;

import com.zz.other.Syslog;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DButil1 {
	    private final String DBURL ="jdbc:mysql://172.18.88.14:3306/company?useUnicode=true&characterEncoding=UTF-8"; 
	    private final String DBUSER = "fangzhizun";
	    private final String DBPASSWORD = "!LaoDaLaoLai!"; 

	    private java.sql.Connection con = null;
	    private java.sql.PreparedStatement stmt = null;
	    private ResultSet rs = null;
	      
	    public DButil1(){  
	        try {  
	            Class.forName("com.mysql.jdbc.Driver");  
	            con = DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);  
	        } catch (ClassNotFoundException e) {  
	            e.printStackTrace();Syslog.writeErr(e);
	        } catch (SQLException e) {  
	            e.printStackTrace();
				Syslog.writeErr(e);
	        }  
	    }
	    
	    public ResultSet executeCompayQuery(String sql,Object... params){//可变参数  
	    	
	        try {  
	            stmt = con.prepareStatement(sql);  
	            for (int i = 0; i < params.length; i++) {  
	                this.stmt.setObject(i+1, params[i]); 
	            }  
	            rs = stmt.executeQuery(); 
	        } catch (SQLException e1) {  
	            e1.printStackTrace();  
	        } 
	        
	        return rs;  
	    }  
	    
	    public int updateCompany(String sql,Object... params){
	    	int result = -1;
	    	try {  
	            stmt = con.prepareStatement(sql);  
	            for (int i = 0; i < params.length; i++) {  
	                this.stmt.setObject(i+1, params[i]); 
	            }  
	            result = stmt.executeUpdate();
	        } catch (SQLException e1) {  
	            e1.printStackTrace();  
	        } 
			return result;
	    }
	    
	    public void close(){  
	        if(con!=null){  
	            try {  
	                con.close();  
	            } catch (SQLException e) {  
	                e.printStackTrace();Syslog.writeErr(e);
	            }  
	        }  
	        if(stmt!=null){  
	            try {  
	                stmt.close();  
	            } catch (SQLException e) {  
	                e.printStackTrace();Syslog.writeErr(e);
	            }  
	        }  
	        if(rs!=null){  
	            try {  
	                rs.close();  
	            } catch (SQLException e) {  
	                e.printStackTrace();Syslog.writeErr(e);
	            }  
	        }  
	    }  
	}  