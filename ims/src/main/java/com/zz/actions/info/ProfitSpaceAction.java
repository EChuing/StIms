package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.info.InfoProfitSpace;
import com.zz.service.info.ProfitSpaceService;

public class ProfitSpaceAction extends BaseAction implements
		ModelDriven<InfoProfitSpace> {
	private InfoProfitSpace infoProfitSpace;
	private ProfitSpaceService profitSpaceService;

	public void setProfitSpaceService(ProfitSpaceService profitSpaceService) {
		this.profitSpaceService = profitSpaceService;
	}

	public String getProfitSpace() {
		try {
			List<InfoProfitSpace> list = profitSpaceService
					.selectAll(infoProfitSpace);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(json);
			}else{
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
	public InfoProfitSpace getModel() {
		// TODO Auto-generated method stub
		if (infoProfitSpace == null) {
			infoProfitSpace = new InfoProfitSpace();
		}
		return infoProfitSpace;
	}

}
