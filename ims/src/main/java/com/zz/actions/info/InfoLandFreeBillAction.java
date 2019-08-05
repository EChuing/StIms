package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoLandFreeBill;
import com.zz.service.info.InfoLandFreeBillService;

public class InfoLandFreeBillAction extends BaseAction implements
		ModelDriven<InfoLandFreeBill> {
	private InfoLandFreeBill infoLandFreeBill;
	private InfoLandFreeBillService infoLandFreeBillService;

	public void setInfoLandFreeBillService(
			InfoLandFreeBillService infoLandFreeBillService) {
		this.infoLandFreeBillService = infoLandFreeBillService;
	}

	public String getLandFreeBill() {
		try {
			List<InfoLandFreeBill> list = infoLandFreeBillService.selectAll(infoLandFreeBill);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无免租期账单信息", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		return null;
	}

	@Override
	public InfoLandFreeBill getModel() {
		if (infoLandFreeBill == null) {
			infoLandFreeBill = new InfoLandFreeBill();
		}
		return infoLandFreeBill;
	}

}
