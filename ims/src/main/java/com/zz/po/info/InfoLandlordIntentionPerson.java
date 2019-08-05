package com.zz.po.info;

/**
 * 房东意向人
 */
public class InfoLandlordIntentionPerson {
    private Integer lipId;

    private Integer lipRegistrar;

    private String lipLandlordName;

    private String lipLandlordPhone;

    private String lipLandlordOtherContact;

    private String lipContactsPeople;

    private String lipContactInformation;

    private String lipOtherContactInfo;

    private String lipTheAgent;

    private String lipAgentPhone;

    private String lipAgentOtherContact;

    private String lipRegistrationTime;
    
    private String lipNote;
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
    public String getLipNote() {
		return lipNote;
	}

	public void setLipNote(String lipNote) {
		this.lipNote = lipNote;
	}

	public String getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
	}

	public String getStartNum() {
		return startNum;
	}

	public void setStartNum(String startNum) {
		this.startNum = startNum;
	}

	public String getEndNum() {
		return endNum;
	}

	public void setEndNum(String endNum) {
		this.endNum = endNum;
	}

	public String getTotalNum() {
		return totalNum;
	}

	public void setTotalNum(String totalNum) {
		this.totalNum = totalNum;
	}

	public String getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(String totalPage) {
		this.totalPage = totalPage;
	}

	public Integer getLipId() {
        return lipId;
    }

    public void setLipId(Integer lipId) {
        this.lipId = lipId;
    }

    public Integer getLipRegistrar() {
        return lipRegistrar;
    }

    public void setLipRegistrar(Integer lipRegistrar) {
        this.lipRegistrar = lipRegistrar;
    }

    public String getLipLandlordName() {
        return lipLandlordName;
    }

    public void setLipLandlordName(String lipLandlordName) {
        this.lipLandlordName = lipLandlordName == null ? null : lipLandlordName.trim();
    }

    public String getLipLandlordPhone() {
        return lipLandlordPhone;
    }

    public void setLipLandlordPhone(String lipLandlordPhone) {
        this.lipLandlordPhone = lipLandlordPhone == null ? null : lipLandlordPhone.trim();
    }

    public String getLipLandlordOtherContact() {
        return lipLandlordOtherContact;
    }

    public void setLipLandlordOtherContact(String lipLandlordOtherContact) {
        this.lipLandlordOtherContact = lipLandlordOtherContact == null ? null : lipLandlordOtherContact.trim();
    }

    public String getLipContactsPeople() {
        return lipContactsPeople;
    }

    public void setLipContactsPeople(String lipContactsPeople) {
        this.lipContactsPeople = lipContactsPeople == null ? null : lipContactsPeople.trim();
    }

    public String getLipContactInformation() {
        return lipContactInformation;
    }

    public void setLipContactInformation(String lipContactInformation) {
        this.lipContactInformation = lipContactInformation == null ? null : lipContactInformation.trim();
    }

    public String getLipOtherContactInfo() {
        return lipOtherContactInfo;
    }

    public void setLipOtherContactInfo(String lipOtherContactInfo) {
        this.lipOtherContactInfo = lipOtherContactInfo == null ? null : lipOtherContactInfo.trim();
    }

    public String getLipTheAgent() {
        return lipTheAgent;
    }

    public void setLipTheAgent(String lipTheAgent) {
        this.lipTheAgent = lipTheAgent == null ? null : lipTheAgent.trim();
    }

    public String getLipAgentPhone() {
        return lipAgentPhone;
    }

    public void setLipAgentPhone(String lipAgentPhone) {
        this.lipAgentPhone = lipAgentPhone == null ? null : lipAgentPhone.trim();
    }

    public String getLipAgentOtherContact() {
        return lipAgentOtherContact;
    }

    public void setLipAgentOtherContact(String lipAgentOtherContact) {
        this.lipAgentOtherContact = lipAgentOtherContact == null ? null : lipAgentOtherContact.trim();
    }

    public String getLipRegistrationTime() {
        return (lipRegistrationTime != null && lipRegistrationTime.length() > 19) ? lipRegistrationTime.substring(0,19) : lipRegistrationTime;
    }

    public void setLipRegistrationTime(String lipRegistrationTime) {
        this.lipRegistrationTime = lipRegistrationTime == null ? null : lipRegistrationTime.trim();
    }
}