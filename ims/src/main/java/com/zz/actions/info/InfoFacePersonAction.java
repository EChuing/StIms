package com.zz.actions.info;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoFacePersonMapper;
import com.zz.po.info.InfoFacePerson;

import javax.annotation.Resource;

public class InfoFacePersonAction extends BaseAction implements ModelDriven<InfoFacePerson>{
	private InfoFacePerson infoFacePerson;
	
	@Resource
	private InfoFacePersonMapper infoFacePersonMapper;
	
	
	public void selectGuid() {
		int popId=infoFacePerson.getPopId();
		
		try {
			InfoFacePerson infoFacePerson = infoFacePersonMapper.selectByPrimaryKey(popId);
			String Guid=infoFacePerson.getIfpGuid();
			
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", Guid));
		}catch (Exception e) {
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	@Override
	public InfoFacePerson getModel() {
		if(infoFacePerson==null){
			infoFacePerson = new InfoFacePerson();
		}
		return infoFacePerson;
	}
	public void selectPersonPopId(){
		int popId=infoFacePerson.getPopId();
		try {
			InfoFacePerson infoFacePerson = infoFacePersonMapper.selectByPrimaryKey(popId);
			if(null != infoFacePerson){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", infoFacePerson.toString()));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有数据", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			printlnOfJson(CommonMethodClass.jsonData(-2, "参数有误", null));
		}

	}
}
