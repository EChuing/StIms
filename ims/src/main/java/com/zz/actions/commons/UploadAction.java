package com.zz.actions.commons;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.UploadUtil;
import com.zz.other.Syslog;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonObject;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.info.InfoFile;
import com.zz.po.info.InfoHaveRentCheckOut;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoNotRentCheckOut;
import com.zz.po.info.InfoRenewalLandlordExpand;
import com.zz.po.info.InfoRenewalRenterExpand;
import com.zz.po.journal.JourShortRentSetUp;
import com.zz.po.journal.JournalAttachment;
import com.zz.po.journal.JournalEventApproval;
import com.zz.po.journal.JournalQrcode;
import com.zz.po.journal.JournalRepairExpand;
import com.zz.po.journal.JournalRepairProgressExpand;
import com.zz.po.sys.SysAssetsExpand;
import com.zz.po.sys.SysSuppliesExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.info.ContractInstallmentService;
import com.zz.service.info.FileService;
import com.zz.service.info.HaveRentCheckOutService;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.info.NotRentCheckOutService;
import com.zz.service.info.RenewalLandlordService;
import com.zz.service.info.RenewalRenterService;
import com.zz.service.journal.AttachmentService;
import com.zz.service.journal.EventApprovalService;
import com.zz.service.journal.JourShortRentSetUpService;
import com.zz.service.journal.QrcodeService;
import com.zz.service.journal.RepairProgressService;
import com.zz.service.journal.RepairService;
import com.zz.service.sys.SysAssetsService;
import com.zz.service.sys.SysSuppliesService;
import com.zz.service.sys.UserService;

public class UploadAction extends BaseAction {
    private final String SUCCESS = "success";
    private final String ERROR = "error";
	private QrcodeService qrcodeService;
	private RenewalLandlordService renewalLandlordService;
	private RenewalRenterService renewalRenterService;
	private AttachmentService attachmentService;
	private EventApprovalService eventApprovalService;
	private SysAssetsService sysAssetsService;
	private HaveRentCheckOutService haveRentCheckOutService;
	private NotRentCheckOutService notRentCheckOutService;
	private RepairService repairService;
	private HouseForStoreService houseForStoreService;
	private SysSuppliesService sysSuppliesService;
	private FileService fileService;
	private ContractInstallmentService contractInstallmentService;
    private UserService userService;
    @Autowired
    private RepairProgressService repairProgressService;
    @Autowired
    private JourShortRentSetUpService jourShortRentSetUpService;

	private String filename;
	private String key;
	private String mimeType;
	private String url;
	private Integer jrlId;
	private Integer jrrId;
	private String co;
	private String qr;
	private String baseUrls;
	private String att;
	private String att2;
	private Integer eaId;
	private Integer saId;
	private Integer handlerId;
	private String handlerName;
	private Integer rcoId;
    private Integer nrcId;
	private Integer repId;
    private Integer hsId;
    private Integer supId;
    private String userName;
    private Integer userId;//用户管理使用
    private Integer fileId;
    private String fileTag;
    private Integer jciId;
    private Integer userCoding;//上传人
    private Integer type;


	public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void setContractInstallmentService(
            ContractInstallmentService contractInstallmentService) {
        this.contractInstallmentService = contractInstallmentService;
    }

    public void setFileService(FileService fileService) {
        this.fileService = fileService;
    }

    public void setSysSuppliesService(SysSuppliesService sysSuppliesService) {
        this.sysSuppliesService = sysSuppliesService;
    }

    public void setHouseForStoreService(HouseForStoreService houseForStoreService) {
        this.houseForStoreService = houseForStoreService;
    }

    public void setRepairService(RepairService repairService) {
		this.repairService = repairService;
	}

	public void setHaveRentCheckOutService(
			HaveRentCheckOutService haveRentCheckOutService) {
		this.haveRentCheckOutService = haveRentCheckOutService;
	}

	public void setNotRentCheckOutService(
            NotRentCheckOutService notRentCheckOutService) {
        this.notRentCheckOutService = notRentCheckOutService;
    }

    public void setSysAssetsService(SysAssetsService sysAssetsService) {
		this.sysAssetsService = sysAssetsService;
	}

	public void setRenewalLandlordService(
			RenewalLandlordService renewalLandlordService) {
		this.renewalLandlordService = renewalLandlordService;
	}

	public void setRenewalRenterService(RenewalRenterService renewalRenterService) {
		this.renewalRenterService = renewalRenterService;
	}

	public void setAttachmentService(AttachmentService attachmentService) {
		this.attachmentService = attachmentService;
	}

	public void setEventApprovalService(EventApprovalService eventApprovalService) {
		this.eventApprovalService = eventApprovalService;
	}

	public void setQrcodeService(QrcodeService qrcodeService) {
		this.qrcodeService = qrcodeService;
	}

	public Integer getSaId() {
		return saId;
	}

	public void setSaId(Integer saId) {
		this.saId = saId;
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

	public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getJrlId() {
		return jrlId;
	}

	public void setJrlId(Integer jrlId) {
		this.jrlId = jrlId;
	}

	public Integer getJrrId() {
		return jrrId;
	}

	public void setJrrId(Integer jrrId) {
		this.jrrId = jrrId;
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

	public String getBaseUrls() {
		return baseUrls;
	}

	public void setBaseUrls(String baseUrls) {
		this.baseUrls = baseUrls;
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

	public Integer getEaId() {
		return eaId;
	}

	public void setEaId(Integer eaId) {
		this.eaId = eaId;
	}

	public Integer getHandlerId() {
		return handlerId;
	}

	public void setHandlerId(Integer handlerId) {
		this.handlerId = handlerId;
	}

	public String getHandlerName() {
		return handlerName;
	}

	public void setHandlerName(String handlerName) {
		this.handlerName = handlerName;
	}

	public Integer getRcoId() {
		return rcoId;
	}

	public void setRcoId(Integer rcoId) {
		this.rcoId = rcoId;
	}

	public Integer getNrcId() {
        return nrcId;
    }

    public void setNrcId(Integer nrcId) {
        this.nrcId = nrcId;
    }

    public Integer getRepId() {
		return repId;
	}

	public void setRepId(Integer repId) {
		this.repId = repId;
	}

	public Integer getHsId() {
        return hsId;
    }

    public void setHsId(Integer hsId) {
        this.hsId = hsId;
    }

    public Integer getSupId() {
        return supId;
    }

    public void setSupId(Integer supId) {
        this.supId = supId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getFileId() {
        return fileId;
    }

    public void setFileId(Integer fileId) {
        this.fileId = fileId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFileTag() {
        return fileTag;
    }

    public void setFileTag(String fileTag) {
        this.fileTag = fileTag;
    }

    public Integer getJciId() {
        return jciId;
    }

    public void setJciId(Integer jciId) {
        this.jciId = jciId;
    }

    public Integer getUserCoding() {
        return userCoding;
    }

    public void setUserCoding(Integer userCoding) {
        this.userCoding = userCoding;
    }
    public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * 获取上传凭证及公司名
	 */
	public void getUpTokenCallback(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String upToken = UploadUtil.getUpTokenCallback();
		String company = (String) request.getSession().getAttribute("company");
		printMsg(upToken+"#####"+company);
	}

	/**
	 * 下载凭证
	 */
	public void getDownloadUrl(){
		StringBuffer sb = new StringBuffer();
		String[] urls = baseUrls.split(",");
		for(int i=0;i<urls.length;i++){
			if(i==0){
				sb.append(UploadUtil.getDownloadUrl(urls[i]));
			}else{
				sb.append(","+UploadUtil.getDownloadUrl(urls[i]));
			}
		}
		for(int i=0;i<urls.length;i++){
			sb.append(","+UploadUtil.getDownloadUrl(urls[i]+"?imageMogr2/thumbnail/150x200!"));
		}
		printMsg(sb.toString());
    }

	/**
	 * 生成手机访问的url
	 */
	public void getMobUploadUrl(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String company = (String) request.getSession().getAttribute("company");
		//手机上传凭证
		String upToken = UploadUtil.getUpTokenCallback();
		long qr = (long)((Math.random()*9+1)*1000000000);
		JournalQrcode qrcode = new JournalQrcode();
		qrcode.setToken(upToken);
		qrcode.setCo(company);
		qrcode.setQr(""+qr);
		qrcode.setJrlId(jrlId);
		qrcode.setJrrId(jrrId);
		qrcode.setAtt(att);
		qrcode.setAtt2(att2);
		qrcode.setEaId(eaId);
		qrcode.setSaId(saId);
		qrcode.setHandlerId(handlerId);
		qrcode.setHandlerName(handlerName);
		qrcode.setRcoId(rcoId);
        qrcode.setNrcId(nrcId);
		qrcode.setRepId(repId);
		qrcode.setHsId(hsId);
        qrcode.setSupId(supId);
        qrcode.setUserName(userName);
        qrcode.setUserId(userId);
        qrcode.setFileId(fileId);
        qrcode.setJciId(jciId);
        qrcode.setUserCoding(userCoding);
		System.out.println(qrcode);
        if(att2!=null&&att2!=""&&att==null&&att==""){
        	qrcode.setType(type);
        }
		int result = qrcodeService.insertSelective(qrcode);
		if(result > 0){
			printMsg(UploadUtil.HOSTURL+"/upload/qrUpload.action?qr="+qr+"&co="+company);
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
		System.out.println("jrlId="+jrlId);
		System.out.println("jrrId="+jrrId);
		System.out.println("co="+co);
		System.out.println("att="+att);
		System.out.println("att2="+att2);
		System.out.println("eaId="+eaId);
		System.out.println("saId="+saId);
		System.out.println("handlerId="+handlerId);
		System.out.println("handlerName="+handlerName);
		System.out.println("rcoId="+rcoId);
        System.out.println("nrcId="+nrcId);
		System.out.println("repId="+repId);
        System.out.println("hsId="+hsId);
        System.out.println("supId="+supId);
        System.out.println("userName="+userName);
        System.out.println("fileId="+fileId);
        System.out.println("jciId="+jciId);
        System.out.println("userCoding="+userCoding);
        System.out.println("type="+type);

        if(jrlId != null){
        	System.out.println("this is jrlId");
        	InfoRenewalLandlordExpand infoRenewalLandlordExpand = new InfoRenewalLandlordExpand();
        	infoRenewalLandlordExpand.setJrlId(jrlId);
        	try {
        		System.out.println("renewalLandlordService="+renewalLandlordService);
				List<InfoRenewalLandlordExpand> list = renewalLandlordService.selectAll(infoRenewalLandlordExpand);
				if(list.size() > 0){
					infoRenewalLandlordExpand = list.get(0);
					String path = infoRenewalLandlordExpand.getJrlImgPath();
					if(path == null || path.equals("")){
						path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}else{
						path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}
					infoRenewalLandlordExpand.setJrlImgPath(path);
					infoRenewalLandlordExpand.setJrlImgNum(UploadUtil.getImageNum(path));
					String result = renewalLandlordService.updateRenewalLandlord(infoRenewalLandlordExpand);
					if(!result.equals("1")){
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
        }else if(jrrId != null){
        	System.out.println("this is jrrId");
        	InfoRenewalRenterExpand infoRenewalRenterExpand = new InfoRenewalRenterExpand();
        	infoRenewalRenterExpand.setJrrId(jrrId);
        	try {
				List<InfoRenewalRenterExpand> list = renewalRenterService.selectAll(infoRenewalRenterExpand);
				if(list.size() > 0){
					infoRenewalRenterExpand = list.get(0);
					String path = infoRenewalRenterExpand.getJrrImgPath();
					if(path == null || path.equals("")){
						path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}else{
						path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}
					infoRenewalRenterExpand.setJrrImgPath(path);
					infoRenewalRenterExpand.setJrrImgNum(UploadUtil.getImageNum(path));
					int result = renewalRenterService.updateRenewalRenter(infoRenewalRenterExpand);
					if(result != 1){
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
        }else if(att != null && !att.equals("")&&type==null){
        	System.out.println("this is att");
        	System.out.println(" att type===="+type);
        	try {
        		System.out.println("att filename=="+filename);
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
        }else if(att2 != null && !att2.equals("")&&type!=null){
        	System.out.println("this is att2");
        	System.out.println("att2 type=="+type);
        	try {
        		JournalAttachment attachment = attachmentService.selectByAtt2(att2);
        		System.out.println(filename);
        		if(attachment != null){
        			String path = attachment.getPath();
        			if(path == null || path.equals("")){
						path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}else{
						path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}
        			attachment.setPath(path);
        			attachment.setNum(UploadUtil.getImageNum(path));
        			System.out.println(attachment.getPath());
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
        }else if(eaId != null){
        	System.out.println("this is eaId");
        	try {
        	    List<JournalEventApproval> list = eventApprovalService.selectById(eaId);
        		if(list.size() > 0){
        		    JournalEventApproval journalEventApproval = list.get(0);
        			String path = journalEventApproval.getEaImgPath();
        			String historicalProcess = journalEventApproval.getEaHistoricalProcess();
        			String treatmentOpinion = journalEventApproval.getEaTreatmentOpinion();
        			String handleAdvise = "上传了文件《" + filename + "》";
        			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        			String handleTime = sdf.format(new Date());
        			if(path == null || path.equals("")){
						path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}else{
						path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}
        			if(historicalProcess != null){
        				historicalProcess = historicalProcess + "," + handlerId;
        			}else{
        				historicalProcess = "" + handlerId;
        			}
        			if(treatmentOpinion != null){
        				treatmentOpinion = treatmentOpinion
        						+ ",{\"name\":\"" + handlerName + "\","
        						+ "\"id\":\"" + handlerId + "\","
        						+ "\"advise\":\"" + handleAdvise + "\","
        						+ "\"time\":\"" + handleTime + "\"}";
        			}else{
        				treatmentOpinion =
        						"{\"name\":\"" + handlerName + "\","
        						+ "\"id\":\"" + handlerId + "\","
        						+ "\"advise\":\"" + handleAdvise + "\","
        						+ "\"time\":\"" + handleTime + "\"}";
        			}
        			journalEventApproval.setEaImgPath(path);
        			journalEventApproval.setEaImgNum(UploadUtil.getImageNum(path));
        			journalEventApproval.setEaHistoricalProcess(historicalProcess);
        			journalEventApproval.setEaTreatmentOpinion(treatmentOpinion);
        			int result = eventApprovalService.updateByPrimaryKeySelective(journalEventApproval);
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
        }else if(saId != null){
        	System.out.println("this is saId");
        	try {
        		SysAssetsExpand sysAssetsExpand =new SysAssetsExpand();
        		sysAssetsExpand.setSaId(saId);
				List<SysAssetsExpand> list = sysAssetsService.selectAll(sysAssetsExpand);
				if(list.size() > 0){
					sysAssetsExpand = list.get(0);
	                sysAssetsExpand.setRegistrantName(userName);
					String path = sysAssetsExpand.getSaPhotos();
					if(path == null || path.equals("")){
						path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}else{
						path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}
					sysAssetsExpand.setSaPhotos(path);
					sysAssetsExpand.setSaPhotosNum(UploadUtil.getImageNum(path));
					int result = sysAssetsService.updateById(sysAssetsExpand);
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
        }else if(rcoId != null){
        	System.out.println("this is rcoId");
        	InfoHaveRentCheckOut infoHaveRentCheckOut = new InfoHaveRentCheckOut();
        	infoHaveRentCheckOut.setRcoId(rcoId);
        	try {
        		List<InfoHaveRentCheckOut> list = haveRentCheckOutService.selectByPrimaryKey(infoHaveRentCheckOut);
				if(list.size() > 0){
					infoHaveRentCheckOut = list.get(0);
					String path = infoHaveRentCheckOut.getRcoImgPath();
					if(path == null || path.equals("")){
						path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}else{
						path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}
					infoHaveRentCheckOut.setRcoImgPath(path);
					infoHaveRentCheckOut.setRcoImgNum(UploadUtil.getImageNum(path));
					int result = haveRentCheckOutService.updateByPrimaryKeySelective(infoHaveRentCheckOut);
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
        }else if(nrcId != null){
            System.out.println("this is nrcId");
            InfoNotRentCheckOut infoNotRentCheckOut = new InfoNotRentCheckOut();
            infoNotRentCheckOut.setNrcId(nrcId);
            try {
                List<InfoNotRentCheckOut> list = notRentCheckOutService.selectByPrimaryKey(infoNotRentCheckOut);
                if(list.size() > 0){
                    infoNotRentCheckOut = list.get(0);
                    String path = infoNotRentCheckOut.getNrcImgPath();
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }
                    infoNotRentCheckOut.setNrcImgPath(path);
                    infoNotRentCheckOut.setNrcImgNum(UploadUtil.getImageNum(path));
                    int result = notRentCheckOutService.updateByPrimaryKeySelective(infoNotRentCheckOut);
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
        }else if(repId != null){
        	System.out.println("this is repId");
            try {
                List<JournalRepairExpand> list = repairService.selectByPrimaryKey(repId);
				if(list.size() > 0){
				    JournalRepairExpand repair = list.get(0);
					String path = repair.getRepImgPath();
					if(path == null || path.equals("")){
						path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}else{
						path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
					}
					repair.setRepImgPath(path);
					repair.setRepImgNum(UploadUtil.getImageNum(path));
					int result = repairService.updateByPrimaryKeySelective(repair);
					if(result == 0){
                        resMsg(out, ERROR);
                        return;
					}
					SysUserExpand sysUser = new SysUserExpand();
					sysUser.setUserId(userId);
					List<SysUserExpand> userList = userService.selectByPrimaryKey(sysUser);
					SysUserExpand sysUserExpand = userList.get(0);
					Integer department = sysUserExpand.getSuDepartmentId();//部门
					Integer storefront = sysUserExpand.getSuStoreId();//区域
					Integer proRepairId = repair.getRepId();//维修主键

					String repState = repair.getRepState();
					String proState = "未完成";
					if (repState.equals("跟进中")){
						proState = "未完成";
					}else{
						proState = "已完成";
					}
					String proReceivableMoney = "0.00";
					String proBillingInfo = "无结算";
					String proRemark = "上传了文件《" + filename + "》";

					JournalRepairProgressExpand journalRepairProgressExpand = new JournalRepairProgressExpand();
					journalRepairProgressExpand.setProRepairId(proRepairId);
					journalRepairProgressExpand.setProUserId(userCoding);
					journalRepairProgressExpand.setDepartment(department);
					journalRepairProgressExpand.setStorefront(storefront);
					journalRepairProgressExpand.setProState(proState);
					journalRepairProgressExpand.setProReceivableMoney(proReceivableMoney);
					journalRepairProgressExpand.setProBillingInfo(proBillingInfo);
					journalRepairProgressExpand.setProRemark(proRemark);
					int repResult = repairProgressService.insertSelective(journalRepairProgressExpand);
					if(repResult == 0){
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
        }else if(hsId != null){
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
        }else if(supId != null){
            System.out.println("this is supId");
            try {
                SysSuppliesExpand sysSuppliesExpand = new SysSuppliesExpand();
                sysSuppliesExpand.setSupId(supId);
                List<SysSuppliesExpand> list = sysSuppliesService.selectAll(sysSuppliesExpand);
                if(list.size() > 0){
                    sysSuppliesExpand = list.get(0);
                    sysSuppliesExpand.setUserName(userName);
                    String path = sysSuppliesExpand.getSupImgPath();
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }
                    sysSuppliesExpand.setSupImgPath(path);
                    sysSuppliesExpand.setSupImgNum(UploadUtil.getImageNum(path));
                    int result = sysSuppliesService.updateById(sysSuppliesExpand);
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
        }else if(jciId != null){
            System.out.println("this is jciId");
            try {
                InfoContractInstallmentExpand infoContractInstallmentExpand = new InfoContractInstallmentExpand();
                infoContractInstallmentExpand.setJciId(jciId);
                List<InfoContractInstallmentExpand> list = contractInstallmentService.selectByPrimaryKey(jciId);
                if(list.size() > 0){
                    infoContractInstallmentExpand = list.get(0);
                    String path = infoContractInstallmentExpand.getJciImgPath();
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }
                    infoContractInstallmentExpand.setJciImgPath(path);
                    infoContractInstallmentExpand.setJciImgNum(UploadUtil.getImageNum(path));
                    int result = contractInstallmentService.updateByPrimaryKeySelective(infoContractInstallmentExpand);
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
        }else if(userId != null){
            System.out.println("this is userId");
            try {
                SysUserExpand sysUserExpand = new SysUserExpand();
                sysUserExpand.setUserId(userId);
                List<SysUserExpand> list = userService.selectByPrimaryKey(sysUserExpand);
                if(list.size() > 0){
                    sysUserExpand = list.get(0);
                    String path = sysUserExpand.getSuImgPath();
                    if(path == null || path.equals("")){
                        path = "{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }else{
                        path = path + ",{\"path\":\"" + url + "/" + key + "\",\"name\":\"" + filename + "\"}";
                    }
                    sysUserExpand = new SysUserExpand();//不new一个出来会报错，不知道原因
                    sysUserExpand.setUserId(userId);
                    sysUserExpand.setSuImgPath(path);
                    sysUserExpand.setSuImgNum(UploadUtil.getImageNum(path));
                    int result = userService.updateByPrimaryKeySelective(sysUserExpand);
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
        }else if(fileId != null){
            System.out.println("this is fileId");
            try {
                InfoFile infoFile = new InfoFile();
                infoFile.setFileName(filename);
                infoFile.setFileType(mimeType);
                infoFile.setFilePath(url + "/" + key);
                infoFile.setFileTag(fileTag);
                infoFile.setFileUser(userCoding);
                int result = fileService.insertSelective(infoFile);
                if(result == 0){
                    resMsg(out, ERROR);
                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
                resMsg(out, ERROR);
                return;
            }
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
