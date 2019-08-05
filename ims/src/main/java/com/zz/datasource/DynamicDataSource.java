package com.zz.datasource;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.zz.other.Syslog;
import org.apache.commons.dbcp.BasicDataSource;
import org.apache.ibatis.session.SqlSession;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import com.zz.util.MySqlSessionFactory;

public class DynamicDataSource extends AbstractRoutingDataSource {

	private Map<Object, Object> _targetDataSources = new HashMap<>();

	@Override
	protected Object determineCurrentLookupKey() {
		String dataSourceName = DataSourceContextHolder.getDbType();
        if(dataSourceName == null || dataSourceName.equals("db")){
        	dataSourceName = "db";
        }else{
        	selectDataSource(dataSourceName);
        }
        return dataSourceName;
	}
	
	/**
     * @param serverId
     * @throws IOException 
     * @describe 数据源存在时不做处理，不存在时创建新的数据源链接，并将新数据链接添加至缓存
     */
    public void selectDataSource(String dataSourceName) {
    	String name = DataSourceContextHolder.getDbType();
        if (name.equals("db")) {
        	DataSourceContextHolder.setDbType("db");
            return;
        }
        Object obj = _targetDataSources.get(dataSourceName);
        if (obj != null) {
            return;
        } else {
            BasicDataSource dataSource = getDataSource(dataSourceName);
            if (dataSource != null){
                setDataSource(dataSourceName, dataSource);
            }else{
            	DataSourceContextHolder.setDbType("db");
            }
        }
    }
    
    public BasicDataSource getDataSource(String dataSourceName) {
		BasicDataSource basicDataSource = null;
		try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
			MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
			MyDataSource dataSource = mapper.getDataSource(dataSourceName);
			if(dataSource != null && dataSource.getState() != 0){
				String driverClassName = dataSource.getDriver();
		    	String url = dataSource.getUrl();
		    	String userName = dataSource.getUsername();
		    	String password = dataSource.getPassword();
		    	basicDataSource = createDataSource(driverClassName, url, userName, password);
			}
		} catch (IOException e) {
			e.printStackTrace();
            Syslog.writeErr(e);
		}
        return basicDataSource;
    } 
    
    //加载数据源到dataSource中
    public BasicDataSource createDataSource(String driverClassName, String url, String username, String password) {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setInitialSize(5);
        dataSource.setMinIdle(5);
        dataSource.setMaxIdle(40);
        dataSource.setMaxActive(50);
        dataSource.setMaxWait(3000);
        dataSource.setValidationQuery("SELECT 1");
        dataSource.setValidationQueryTimeout(1);
        dataSource.setTestOnBorrow(false);
        dataSource.setTestOnReturn(false);
        dataSource.setTestWhileIdle(true);
        dataSource.setTimeBetweenEvictionRunsMillis(300000);
        dataSource.setMinEvictableIdleTimeMillis(1800000);
        dataSource.setNumTestsPerEvictionRun(5);
        dataSource.setRemoveAbandoned(true);
        dataSource.setRemoveAbandonedTimeout(600);
        return dataSource;
    }
    
    /**
     * @param serverId
     * @param dataSource
     * 把数据源添加进缓存，调用addTargetDataSource()方法设置xml配置的值
     */
    public void setDataSource(String serverId, BasicDataSource dataSource) {
    	DataSourceContextHolder.clearDbType();
        addTargetDataSource(serverId, dataSource);
        DataSourceContextHolder.setDbType(serverId);
    }
    
    //为_targetDataSources设值，并调用它的set方法
    public void addTargetDataSource(String key, BasicDataSource dataSource) {
        _targetDataSources.put(key, dataSource);
        setTargetDataSources(_targetDataSources);
    } 
    
    /*通过配置文件中的property的name=‘targetDataSources’设置要连接的数据源的值，用map键值对方式.
     *必须要重写它本身，并且要调用afterPropertiesSet()方法
     */
    public void setTargetDataSources(Map<Object, Object> targetDataSources) {
        this._targetDataSources = targetDataSources;
        super.setTargetDataSources(this._targetDataSources);
        /*afterPropertiesSet方法，初始化bean的时候执行，可以针对某个具体的bean进行配置。
         *afterPropertiesSet 必须实现 InitializingBean接口。
         *实现 InitializingBean接口必须实现afterPropertiesSet方法。*/
        afterPropertiesSet();
    }
	
}
