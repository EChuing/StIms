package com.zz.actions.commons;


import com.alibaba.fastjson.JSON;
import com.google.gson.JsonObject;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.cs.CsGoods;
import com.zz.po.cs.CsGoodsSetUp;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoHouseExpand;
import com.zz.po.journal.*;
import com.zz.po.sys.SysVariables;
import com.zz.service.cs.CsGoodsService;
import com.zz.service.cs.CsGoodsSetUpService;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.info.HouseService;
import com.zz.service.journal.*;
import com.zz.service.sys.SysVariablesService;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class PubUploadAction extends BaseAction {
    private final String SUCCESS = "success";
    private final String ERROR = "error";
	private QrcodeService qrcodeService;
	private SysVariablesService sysVariablesService;
	private HouseForStoreService houseForStoreService;
	private AttachmentService attachmentService;
	private JourSubjectService jourSubjectService;
	private NoticeService noticeService;
	@Resource
	private CsGoodsService csGoodsService;
	@Resource
	private CsGoodsSetUpService csGoodsSetUpService;
	@Autowired
	private JourShortRentSetUpService jourShortRentSetUpService;

    @Resource(name="houseService")
    private HouseService houseService;

	private String filename;
	private String key;
	private String url;
	private String co;
	private String qr;
	private Integer variablesId;
    private Integer hsId;
    private Integer id;
    private Integer cgsuId;
    private Integer type;
    private String att;
    private String att2;
    private Integer jsrsuId;
    private String jsrsuRoomType;
    private Integer subId;
    private Integer dnId;
    private Integer houseCoding;

    public Integer getHouseCoding() {
        return houseCoding;
    }

    public void setHouseCoding(Integer houseCoding) {
        this.houseCoding = houseCoding;
    }

    public String getJsrsuRoomType() {
		return jsrsuRoomType;
	}

	public void setJsrsuRoomType(String jsrsuRoomType) {
		this.jsrsuRoomType = jsrsuRoomType;
	}

	public Integer getJsrsuId() {
		return jsrsuId;
	}

	public void setJsrsuId(Integer jsrsuId) {
		this.jsrsuId = jsrsuId;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getCgsuId() {
		return cgsuId;
	}

	public void setCgsuId(Integer cgsuId) {
		this.cgsuId = cgsuId;
	}
	
	public void setCsGoodsSetUpService(CsGoodsSetUpService csGoodsSetUpService) {
		this.csGoodsSetUpService = csGoodsSetUpService;
	}

	public void setQrcodeService(QrcodeService qrcodeService) {
		this.qrcodeService = qrcodeService;
	}

	public void setSysVariablesService(SysVariablesService sysVariablesService) {
        this.sysVariablesService = sysVariablesService;
    }

    public void setHouseForStoreService(HouseForStoreService houseForStoreService) {
        this.houseForStoreService = houseForStoreService;
    }

    public void setAttachmentService(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    public void setJourSubjectService(JourSubjectService jourSubjectService) {
        this.jourSubjectService = jourSubjectService;
    }

    public void setNoticeService(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getCo() {
		return co;
	}

	public void setCo(String co) {
		this.co = co;
	}

	public String getQr() {
		return qr;
	}

	public void setQr(String qr) {
		this.qr = qr;
	}

	public Integer getVariablesId() {
        return variablesId;
    }

    public void setVariablesId(Integer variablesId) {
        this.variablesId = variablesId;
    }

    public Integer getHsId() {
        return hsId;
    }

    public void setHsId(Integer hsId) {
        this.hsId = hsId;
    }

    public String getAtt() {
        return att;
    }

    public void setAtt(String att) {
        this.att = att;
    }

    public String getAtt2() {
		return att2;
	}

	public void setAtt2(String att2) {
		this.att2 = att2;
	}

    public Integer getSubId() { return subId; }

    public void setSubId(Integer subId) { this.subId = subId; }

    public Integer getDnId() { return dnId; }

    public void setDnId(Integer dnId) { this.dnId = dnId; }

    /**
	 * 获取上传凭证及公司名
	 */
	public void getUpTokenCallback(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String upToken = PubUploadUtil.getUpTokenCallback();
		String company = (String) request.getSession().getAttribute("company");
		printMsg(upToken+"#####"+company);
	}
	
	/**
	 * 生成手机访问的url
	 */
	public void getMobUploadUrl(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String company = (String) request.getSession().getAttribute("company");
		//手机上传凭证
		String upToken = PubUploadUtil.getUpTokenCallback();
		long qr = (long)((Math.random()*9+1)*1000000000);
		JournalQrcode qrcode = new JournalQrcode();
		qrcode.setToken(upToken);
		qrcode.setAtt(att);
		qrcode.setAtt2(att2);
		System.out.println("att2=---="+att2);
		qrcode.setCo(company); 
		qrcode.setQr(""+qr);
		qrcode.setVariablesId(variablesId);
        qrcode.setHsId(hsId);
        qrcode.setId(id);
        qrcode.setCgsuId(cgsuId);
        qrcode.setType(type);
        qrcode.setJsrsuId(jsrsuId);
        qrcode.setJsrsuRoomType(jsrsuRoomType);
        qrcode.setSubId(subId);
        qrcode.setDnId(dnId);
        qrcode.setHouseCoding(houseCoding);
		int result = qrcodeService.insertSelective(qrcode);
		if(result > 0){
			printMsg(PubUploadUtil.HOSTURL+"/upload/qrUpload.action?qr="+qr+"&co="+company);
		}
	}
	
	/**
	 * 上传回调
	 */
	public void callback() throws IOException{
		System.out.println("this is uploadcallback!");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		System.out.println("filename="+filename);
		System.out.println("key="+key);
		System.out.println("url="+url);
		System.out.println("co="+co);
        System.out.println("variablesId="+variablesId);
        System.out.println("hsId="+hsId);
        System.out.println("cgsuId="+cgsuId);
        System.out.println("jsrsuId="+jsrsuId);
        System.out.println("att="+att);
        System.out.println("att2="+att2);
        System.out.println("houseCoding="+houseCoding);
		
		if (variablesId != null) {
            System.out.println("this is variablesId");
            SysVariables sysVariables = new SysVariables();
            sysVariables.setVariablesId(variablesId);
            try {
                List<SysVariables> list = sysVariablesService.selectByPrimaryKey(sysVariables);
                if(!list.isEmpty()){
                    String path = list.get(0).getImgPath();
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }
                    sysVariables.setImgPath(path);
                    int result = sysVariablesService.updateByPrimaryKeySelective(sysVariables);
                    if(result == 0){
                        resMsg(out, ERROR);
                        return;
                    }
                }else{
                    resMsg(out, ERROR);
                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();
                Syslog.writeErr(e);
                resMsg(out, ERROR);
                return;
            }
        } else if(hsId != null) {
            System.out.println("this is hsId");
            InfoHouse4storeExpand houseForStore = new InfoHouse4storeExpand();
            try {
                List<InfoHouse4storeExpand> list = houseForStoreService.selectByPrimaryKey(hsId);
                if(list.size() > 0){
                    houseForStore = list.get(0);
                    String path = houseForStore.getHsOtherImg();
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }
                    houseForStore.setHsOtherImg(path);
                    int result = houseForStoreService.updateByPrimaryKeySelective(houseForStore);
                    if(result == 0){
                        resMsg(out, ERROR);
                        return;
                    }
                }else{
                    resMsg(out, ERROR);
                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                resMsg(out, ERROR);
                return;
            }
        }else if(id != null){
        	System.out.println("this is id");
        			
			try {
				CsGoods good = new CsGoods();
	        	good.setId(id);
                List<CsGoods> list = csGoodsService.listCsGoods(good);
                if(list.size() > 0){
                	good = list.get(0);
                    String path = good.getCgImgPath();
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }
                    good.setCgImgPath(path);
                    csGoodsService.updateCsGoods(good);
                }else{
                    resMsg(out, ERROR);
                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                resMsg(out, ERROR);
                return;
            }
        	
        }else if(cgsuId != null){
        	System.out.println("this is cgsuId");
        			
			try {
				CsGoodsSetUp csGoodsSetUp = new CsGoodsSetUp();
				csGoodsSetUp.setCgsuId(cgsuId);
				List<CsGoodsSetUp> list = csGoodsSetUpService.selectCsGoodsSetUp(csGoodsSetUp);
                if(list.size() > 0){
                	csGoodsSetUp = list.get(0);
                	String path = "";
                	if(type == 1){
                		path = csGoodsSetUp.getCgsuAdImgPath();
                	}else{
                		path = csGoodsSetUp.getCgsuLicenseImg();
                	}
                    
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\",\"title\":\"\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\",\"title\":\"\"}";
                    }
                    if(type == 1){
                    	csGoodsSetUp.setCgsuAdImgPath(path);
                	}else{
                		csGoodsSetUp.setCgsuLicenseImg(path);
                	}
                    
                    int result = csGoodsSetUpService.updateCsGoodsSetUp(csGoodsSetUp);
                    if(result == 0){
                        resMsg(out, ERROR);
                        return;
                    }
                }else{
                    resMsg(out, ERROR);
                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                resMsg(out, ERROR);
                return;
            }
        	
        }else if(jsrsuId != null){//酒店管理上传图片
            System.out.println("this is jsrsuId");
            JourShortRentSetUp jourShort = new JourShortRentSetUp();
            jourShort.setJsrsuId(jsrsuId);
            try {
                Result<String> list = jourShortRentSetUpService.getSetUpInfo(jourShort);
                String result=list.getBody();
                List<JourShortRentSetUp> lis = JSON.parseArray(result, JourShortRentSetUp.class);
                if(lis.size() > 0){
                	jourShort = lis.get(0);
                    String path = jourShort.getJsrsuAdImgs();
                    System.out.println("1111111111111111111111"+jsrsuRoomType);  
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\",\"roomType\":\"" + jsrsuRoomType + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\",\"roomType\":\"" + jsrsuRoomType + "\"}";
                    }
                    jourShort.setJsrsuAdImgs(path);
                    //jourShort.setNrcImgNum(UploadUtil.getImageNum(path));
                    Result<String> result1 = jourShortRentSetUpService.updateSetUp(jourShort);
                    if("0".equals(result1)){
                        resMsg(out, ERROR);
                        return;
                    }
                }else{
                    resMsg(out, ERROR);
                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                resMsg(out, ERROR);
                return;
            }
        }else if(subId != null && !subId.equals("")){
            try {
                JourSubject jourSubject=new JourSubject();
                jourSubject.setSubId(subId);
                List<JourSubject> list = jourSubjectService.selectAllSubject(jourSubject);
                if(list.size() > 0){
                    String path = list.get(0).getFileImgPath();
                    if(path == null || path.equals("")){
                        path = "[{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}]";
                    }else{
                        path = path.substring(0,path.length()-1) + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}]";
                    }
                    list.get(0).setFileImgPath(path);
                    list.get(0).setFileImgNum(PubUploadUtil.getImageNum2(path));
                    int result = jourSubjectService.updateSubject(list.get(0));
                    if(result == 0){
                        resMsg(out, ERROR);
                        return;
                    }
                }else{
                    resMsg(out, ERROR);
                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                resMsg(out, ERROR);
                return;
            }
        }else if(dnId != null && !dnId.equals("")){
                try {
                    DashNoticeExpand noticeExpand=new DashNoticeExpand();
                    noticeExpand.setDnId(dnId);
                    List<DashNoticeExpand> list = noticeService.queryNoticeAll(noticeExpand);
                    if(list.size() > 0){
                        String path = list.get(0).getFileImgPath();
                        if(path == null || path.equals("")){
                            path = "[{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}]";
                        }else{
                            path = path.substring(0,path.length()-1) + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}]";
                        }
                        list.get(0).setFileImgPath(path);
                        list.get(0).setFileImgNum(PubUploadUtil.getImageNum2(path));
                        int result = noticeService.updateNotice(list.get(0));
                        if(result == 0){
                            resMsg(out, ERROR);
                            return;
                        }
                    }else{
                        resMsg(out, ERROR);
                        return;
                    }
                } catch (Exception e) {
                    e.printStackTrace();Syslog.writeErr(e);
                    resMsg(out, ERROR);
                    return;
                }
            } else if(att != null && !att.equals("")&&type==null){
            System.out.println("this is att");
            try {
                JournalAttachment attachment = attachmentService.selectByAtt(att);
                if(attachment != null){
                    String path = attachment.getPath();
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }
                    attachment.setPath(path);
                    attachment.setNum(UploadUtil.getImageNum(path));
                    int result = attachmentService.updateByAtt(attachment);
                    if(result == 0){
                        resMsg(out, ERROR);
                        return;
                    }
                }else{
                    resMsg(out, ERROR);
                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                resMsg(out, ERROR);
                return;
            }
        } else if(att2 != null && !att2.equals("")&&type!=null){
            System.out.println("this is att2");
            try {
                JournalAttachment attachment = attachmentService.selectByAtt2(att2);
                if(attachment != null){
                    String path = attachment.getPath();
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }
                    attachment.setPath(path);
                    attachment.setNum(UploadUtil.getImageNum(path));
                    int result = attachmentService.updateByAtt2(attachment);
                    if(result == 0){
                        resMsg(out, ERROR);
                        return;
                    }
                }else{
                    resMsg(out, ERROR);
                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                resMsg(out, ERROR);
                return;
            }
        }else if(houseCoding!=null){
            System.out.println("this is houseCoding");
            try {
                InfoHouseExpand infoHouse;
                List<InfoHouseExpand> list = houseService.selectByPrimaryKey(houseCoding);
                if(list.size() > 0){
                    infoHouse = list.get(0);
                    String path = infoHouse.getHouseImgPath();
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }
                    infoHouse.setHouseImgPath(path);
                    int result = houseService.updateByPrimaryKeySelective(infoHouse);
                    if(result == 0){
                        resMsg(out, ERROR);
                        return;
                    }
                }else{
                    resMsg(out, ERROR);
                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                resMsg(out, ERROR);
                return;
            }
        } else {
            resMsg(out, ERROR);
            return;
        }
        
        //设置返回给七牛的json格式的数据
		resMsg(out, SUCCESS);
	}
    
    private void resMsg(PrintWriter out, String msg) {
        JsonObject json = new JsonObject();
        json.addProperty("response", msg);
        out.println(json.toString());
        out.flush();
        out.close();
    }
	
}
