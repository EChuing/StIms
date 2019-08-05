package com.zz.deviceevents;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.zz.other.Syslog;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoHouseExpand;
import com.zz.po.journal.JourDevice;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.journal.DeviceService;
import com.zz.util.MySqlSessionFactory;

public class CodeStorageAction extends BaseAction implements ModelDriven<JourDevice> {
	private JourDevice jourDevice;
	@Autowired
	private DeviceService deviceService;

	@Override
	public JourDevice getModel() {
		if (jourDevice == null) {
			jourDevice = new JourDevice();
		}
		return jourDevice;
	}

	/**
	 * 查询code_storage表中cs_road字段的值
	 * @return
	 * @throws IOException
	 */
	public Integer queryCodeStorage(){
		String Sn = jourDevice.getDevAuthId();
		System.out.println("Sn="+Sn); 
		String company =  (String)ActionContext.getContext().getSession().get("company");
		System.out.println("company="+company);

		CodeStorage codeStorage = new CodeStorage();
		codeStorage.setCsCoId(company);
		codeStorage.setCsSn(Sn);
		
		
		try (SqlSession sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession()) {
			CodeStorageMapper mapper = sqlSession.getMapper(CodeStorageMapper.class);
			List<CodeStorage> ListCode = mapper.queryCodeStorage(codeStorage);
			if(ListCode.size() > 0){
                String json = JSONUtil.serialize(ListCode);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-1, "系统异常", null));
		}
		
		
		
		return null;
		
	}
}
