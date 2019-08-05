package com.zz.util;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MySqlSessionFactory {
    private static SqlSessionFactory sqlSessionFactory;

    public static SqlSessionFactory newSqlSessionFactory() throws IOException{
        String resource = "/mybatis-config.xml";  
        InputStream inputStream = Resources.getResourceAsStream(resource);
        if(sqlSessionFactory==null){
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        }
        return sqlSessionFactory;
    }
    
    public static SqlSessionFactory newSqlSessionFactory2() throws IOException{
    	String resource = "/mybatis-config2.xml";  
    	InputStream inputStream = Resources.getResourceAsStream(resource);
    	return new SqlSessionFactoryBuilder().build(inputStream);
    }
    
}
