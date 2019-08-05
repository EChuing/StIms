package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.info.InfoStaticLever;
import com.zz.service.info.InfoStaticLeverService;

public class InfoStaticLeverAction extends BaseAction implements
ModelDriven<InfoStaticLever> {
	private InfoStaticLever infoStaticLever;
	private InfoStaticLeverService infoStaticLeverService;

	public void setInfoStaticLeverService(
			InfoStaticLeverService infoStaticLeverService) {
		this.infoStaticLeverService = infoStaticLeverService;
	}
	
	public String getStaticLever() {
		try {
			List<InfoStaticLever> list = infoStaticLeverService.selectAll(infoStaticLever);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				// 
				printlnOfJson(json);
			} else {
				printlnMsg("-1");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			Syslog.writeErr(e);
		}
		return null;
	}
	
	@Override
	public InfoStaticLever getModel() {
		// TODO Auto-generated method stub
		if (infoStaticLever == null) {
			infoStaticLever = new InfoStaticLever();
		}
		return infoStaticLever;
	}

}
