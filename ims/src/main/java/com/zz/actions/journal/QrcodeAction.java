package com.zz.actions.journal;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zz.other.Syslog;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.journal.JournalQrcode;
import com.zz.service.journal.QrcodeService;

public class QrcodeAction extends BaseAction implements ModelDriven<JournalQrcode> {
	private JournalQrcode journalQrcode;
	private QrcodeService qrcodeService;
	
	public void setQrcodeService(QrcodeService qrcodeService) {
		this.qrcodeService = qrcodeService;
	}

	@Override
	public JournalQrcode getModel() {
		if(journalQrcode==null){
			journalQrcode = new JournalQrcode();
		}
		return journalQrcode;
	}
	
	/**
	 * 验证qr及co,通过则跳转上传页，不通过则返回error
	 */
	public String qrUpload(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		JournalQrcode qrcode = qrcodeService.selectByQr(journalQrcode.getQr());
		System.out.println("111"+qrcode);
		if(qrcode != null){
			request.setAttribute("qrcode", qrcode);
			try {
				request.getRequestDispatcher("../ui/mobUpload.jsp").forward(request, response);
			} catch (ServletException | IOException e) {
				e.printStackTrace();
				Syslog.writeErr(e);
			}
		}else{
			System.out.println("1111111111111111111111111111测试");
			printMsg("二维码已过期");
		}
		return null;
	}
	
}
