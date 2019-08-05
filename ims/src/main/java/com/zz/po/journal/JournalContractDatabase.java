package com.zz.po.journal;

/**
 * 合约库
 */
public class JournalContractDatabase {
    private Integer jcdId;

    private Integer jcdBornAdult;

    private Integer jcdRecipient;

    private Integer jcdContractPerson;

    private Integer jcdCancellationPerson;

    private String jcdUseState;

    private String jcdGenerationTime;

    private String jcdCollectionTime;
    
    private String jcdCancellationReason;

    private String jcdSigningTime;

    private String jcdCancellationTime;
    
    private Integer jcdReceiveDepartment;
    private Integer jcdReceiveStore;
    private String jcdContractNumber;
	private String jcdContractPrefix;
	private String jcdUsedType;
	private String jcdHouseAddress;
	private String numtype;

	private String  startEndNumber;

	private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;

	private String bornAdultName;
	private String recipientName;
	private String contractName;
	private String cancellationName;

	private String startNumber;
	private String endNumber;

	private Integer contractLength;

	private String detectionContract;
	
	private String PrefixStartNum;
	private String PrefixEndNum;
	
	private Integer startNumbers;
	private Integer endNumbers;
	
	private String jcdNote;
	
	private String jsonArray;
	
	public String getJcdCancellationReason() {
		return jcdCancellationReason;
	}

	public void setJcdCancellationReason(String jcdCancellationReason) {
		this.jcdCancellationReason = jcdCancellationReason;
	}

	public String getJsonArray() {
		return jsonArray;
	}

	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}

	public String getJcdNote() {
		return jcdNote;
	}

	public void setJcdNote(String jcdNote) {
		this.jcdNote = jcdNote;
	}

	public String getNumtype() {
		return numtype;
	}

	public void setNumtype(String numtype) {
		this.numtype = numtype;
	}
	
	 public String getJcdUsedType() {
		return jcdUsedType;
	}

	public void setJcdUsedType(String jcdUsedType) {
		this.jcdUsedType = jcdUsedType;
	}
	
	public String getJcdHouseAddress() {
		return jcdHouseAddress;
	}

	public void setJcdHouseAddress(String jcdHouseAddress) {
		this.jcdHouseAddress = jcdHouseAddress;
	}

	public Integer getStartNumbers() {
		return startNumbers;
	}

	public void setStartNumbers(Integer startNumbers) {
		this.startNumbers = startNumbers;
	}

	public Integer getEndNumbers() {
		return endNumbers;
	}

	public void setEndNumbers(Integer endNumbers) {
		this.endNumbers = endNumbers;
	}

	public String getStartEndNumber() {
		return startEndNumber;
	}

	public void setStartEndNumber(String startEndNumber) {
		this.startEndNumber = startEndNumber;
	}

	public String getPrefixStartNum() {
		return PrefixStartNum;
	}

	public void setPrefixStartNum(String prefixStartNum) {
		PrefixStartNum = prefixStartNum;
	}

	public String getPrefixEndNum() {
		return PrefixEndNum;
	}

	public void setPrefixEndNum(String prefixEndNum) {
		PrefixEndNum = prefixEndNum;
	}

	public String getDetectionContract() {
		return detectionContract;
	}

	public void setDetectionContract(String detectionContract) {
		this.detectionContract = detectionContract;
	}

	public String getJcdContractPrefix() {
		return jcdContractPrefix;
	}

	public void setJcdContractPrefix(String jcdContractPrefix) {
		this.jcdContractPrefix = jcdContractPrefix;
	}

	public Integer getContractLength() {
		return contractLength;
	}

	public void setContractLength(Integer contractLength) {
		this.contractLength = contractLength;
	}

	public String getStartNumber() {
		return startNumber;
	}

	public void setStartNumber(String startNumber) {
		this.startNumber = startNumber;
	}

	public String getEndNumber() {
		return endNumber;
	}

	public void setEndNumber(String endNumber) {
		this.endNumber = endNumber;
	}

	public String getJcdContractNumber() {
		return jcdContractNumber;
	}

	public void setJcdContractNumber(String jcdContractNumber) {
		this.jcdContractNumber = jcdContractNumber;
	}

	public String getBornAdultName() {
		return bornAdultName;
	}

	public void setBornAdultName(String bornAdultName) {
		this.bornAdultName = bornAdultName;
	}

	public String getRecipientName() {
		return recipientName;
	}

	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}

	public String getContractName() {
		return contractName;
	}

	public void setContractName(String contractName) {
		this.contractName = contractName;
	}

	public String getCancellationName() {
		return cancellationName;
	}

	public void setCancellationName(String cancellationName) {
		this.cancellationName = cancellationName;
	}

	public Integer getJcdReceiveDepartment() {
		return jcdReceiveDepartment;
	}

	public void setJcdReceiveDepartment(Integer jcdReceiveDepartment) {
		this.jcdReceiveDepartment = jcdReceiveDepartment;
	}

	public Integer getJcdReceiveStore() {
		return jcdReceiveStore;
	}

	public void setJcdReceiveStore(Integer jcdReceiveStore) {
		this.jcdReceiveStore = jcdReceiveStore;
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

	public Integer getJcdId() {
        return jcdId;
    }

    public void setJcdId(Integer jcdId) {
        this.jcdId = jcdId;
    }

    public Integer getJcdBornAdult() {
        return jcdBornAdult;
    }

    public void setJcdBornAdult(Integer jcdBornAdult) {
        this.jcdBornAdult = jcdBornAdult;
    }

    public Integer getJcdRecipient() {
        return jcdRecipient;
    }

    public void setJcdRecipient(Integer jcdRecipient) {
        this.jcdRecipient = jcdRecipient;
    }

    public Integer getJcdContractPerson() {
        return jcdContractPerson;
    }

    public void setJcdContractPerson(Integer jcdContractPerson) {
        this.jcdContractPerson = jcdContractPerson;
    }

    public Integer getJcdCancellationPerson() {
        return jcdCancellationPerson;
    }

    public void setJcdCancellationPerson(Integer jcdCancellationPerson) {
        this.jcdCancellationPerson = jcdCancellationPerson;
    }

    public String getJcdUseState() {
        return jcdUseState;
    }

    public void setJcdUseState(String jcdUseState) {
        this.jcdUseState = jcdUseState == null ? null : jcdUseState.trim();
    }

    public String getJcdGenerationTime() {
        return (jcdGenerationTime != null && jcdGenerationTime.length() > 19) ? jcdGenerationTime.substring(0,19) : jcdGenerationTime;
    }

    public void setJcdGenerationTime(String jcdGenerationTime) {
        this.jcdGenerationTime = jcdGenerationTime == null ? null : jcdGenerationTime.trim();
    }

    public String getJcdCollectionTime() {
        return jcdCollectionTime;
    }

    public void setJcdCollectionTime(String jcdCollectionTime) {
        this.jcdCollectionTime = jcdCollectionTime == null ? null : jcdCollectionTime.trim();
    }

    public String getJcdSigningTime() {
        return jcdSigningTime;
    }

    public void setJcdSigningTime(String jcdSigningTime) {
        this.jcdSigningTime = jcdSigningTime == null ? null : jcdSigningTime.trim();
    }

    public String getJcdCancellationTime() {
        return jcdCancellationTime;
    }

    public void setJcdCancellationTime(String jcdCancellationTime) {
        this.jcdCancellationTime = jcdCancellationTime == null ? null : jcdCancellationTime.trim();
    }

	@Override
	public String toString() {
		return "JournalContractDatabase [jcdId=" + jcdId + ", jcdBornAdult=" + jcdBornAdult + ", jcdRecipient="
				+ jcdRecipient + ", jcdContractPerson=" + jcdContractPerson + ", jcdCancellationPerson="
				+ jcdCancellationPerson + ", jcdUseState=" + jcdUseState + ", jcdGenerationTime=" + jcdGenerationTime
				+ ", jcdCollectionTime=" + jcdCollectionTime + ", jcdCancellationReason=" + jcdCancellationReason
				+ ", jcdSigningTime=" + jcdSigningTime + ", jcdCancellationTime=" + jcdCancellationTime
				+ ", jcdReceiveDepartment=" + jcdReceiveDepartment + ", jcdReceiveStore=" + jcdReceiveStore
				+ ", jcdContractNumber=" + jcdContractNumber + ", jcdUsedType=" + jcdUsedType + ", jcdHouseAddress="
				+ jcdHouseAddress + ", numtype=" + numtype + ", startEndNumber=" + startEndNumber + ", pageNumber="
				+ pageNumber + ", startNum=" + startNum + ", endNum=" + endNum + ", totalNum=" + totalNum
				+ ", totalPage=" + totalPage + ", bornAdultName=" + bornAdultName + ", recipientName=" + recipientName
				+ ", contractName=" + contractName + ", cancellationName=" + cancellationName + ", startNumber="
				+ startNumber + ", endNumber=" + endNumber + ", contractLength=" + contractLength
				+ ", jcdContractPrefix=" + jcdContractPrefix + ", detectionContract=" + detectionContract
				+ ", PrefixStartNum=" + PrefixStartNum + ", PrefixEndNum=" + PrefixEndNum + ", startNumbers="
				+ startNumbers + ", endNumbers=" + endNumbers + ", jcdNote=" + jcdNote + ", jsonArray=" + jsonArray
				+ "]";
	} 
}