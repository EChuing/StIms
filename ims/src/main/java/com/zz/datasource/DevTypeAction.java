package com.zz.datasource;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.util.MySqlSessionFactory;

public class DevTypeAction extends BaseAction implements ModelDriven<DevSecondType> {
	private DevSecondType devSecondType;
	@Override
	public DevSecondType getModel() {
		if(devSecondType==null){
			devSecondType = new DevSecondType();
        }
        return devSecondType;
	}
	
	
	 /**
	  * 查询所有信息，给出条件则为条件查询
     */
    public String devtypeDb() {
        try {
        	SqlSession sqlSession = MySqlSessionFactory.newSqlSessionFactory().openSession();
        	MyDataSourceMapper mapper = sqlSession.getMapper(MyDataSourceMapper.class);
			BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);
			DevSecondTypeMapper devMapper = sqlSession.getMapper(DevSecondTypeMapper.class);
			List<DevSecondType> list = devMapper.selectAll(devSecondType);
			System.out.println("size:"+list.size());
			if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

}
