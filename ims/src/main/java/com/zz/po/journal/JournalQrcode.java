package com.zz.po.journal;

/**
 * 二维码临时表
 */
public class JournalQrcode {
    private Integer jqId;

    private String qr;

    private String token;

    private String url;

    private String time;

    private String co;

    private Integer jrlId;

    private Integer jrrId;
    
    private String att;
    
    private String att2;
    
    private Integer eaId;
    
    private String fileTag;
    
    private String fileUser;
    
    private Integer saId;
    
    private Integer handlerId;
    
    private String  handlerName;
    
    private Integer rcoId;
    
    private Integer nrcId;
    
    private Integer repId;
    
    private Integer variablesId;
    
    private Integer hsId;
    
    private Integer supId;
    
    private String userName;
    
    private Integer userId;
    
    private Integer fileId;
    
    private Integer jciId;
    
    private Integer userCoding;
    
    private Integer id;
    
    private Integer cgsuId;
    
    private Integer type;
    
    private Integer jsrsuId;
    
    private String jsrsuRoomType;

    private Integer subId;

    private Integer houseCoding;

    private Integer dnId;

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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserCoding() {
        return userCoding;
    }

    public void setUserCoding(Integer userCoding) {
        this.userCoding = userCoding;
    }

    public Integer getJciId() {
        return jciId;
    }

    public void setJciId(Integer jciId) {
        this.jciId = jciId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFileId() {
        return fileId;
    }

    public void setFileId(Integer fileId) {
        this.fileId = fileId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getSupId() {
        return supId;
    }

    public void setSupId(Integer supId) {
        this.supId = supId;
    }

    public Integer getHsId() {
        return hsId;
    }

    public void setHsId(Integer hsId) {
        this.hsId = hsId;
    }

    public Integer getVariablesId() {
        return variablesId;
    }

    public void setVariablesId(Integer variablesId) {
        this.variablesId = variablesId;
    }

    public Integer getRepId() {
		return repId;
	}

	public void setRepId(Integer repId) {
		this.repId = repId;
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

	public Integer getSaId() {
		return saId;
	}

	public void setSaId(Integer saId) {
		this.saId = saId;
	}

    public Integer getJqId() {
		return jqId;
	}

	public void setJqId(Integer jqId) {
		this.jqId = jqId;
	}

	public String getQr() {
        return qr;
    }

    public void setQr(String qr) {
        this.qr = qr == null ? null : qr.trim();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token == null ? null : token.trim();
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time == null ? null : time.trim();
    }

    public String getCo() {
        return co;
    }

    public void setCo(String co) {
        this.co = co == null ? null : co.trim();
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

	public String getFileTag() {
		return fileTag;
	}

	public void setFileTag(String fileTag) {
		this.fileTag = fileTag;
	}

	public String getFileUser() {
		return fileUser;
	}

	public void setFileUser(String fileUser) {
		this.fileUser = fileUser;
	}

    public Integer getSubId() { return subId; }

    public void setSubId(Integer subId) { this.subId = subId; }

    public Integer getDnId() { return dnId; }

    public void setDnId(Integer dnId) { this.dnId = dnId; }
}