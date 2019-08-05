package com.zz.po.journal;

import com.zz.po.commons.CommonsPo;

/**
 * 各类票据打印历史存储表
 */
public class JournalHistoryPrint extends CommonsPo{
	private Integer jhpId;
	private Integer jhpHouse4rentId;
	private Integer jhpHouse4storeId;
	private Integer jhpHouseId;
	private Integer jhpRenterId;
	private Integer jhpLandlordId;
	private Integer jhpUserId;
	private Integer jhpCocId;

	private String jhpJson;
	private String jhpType;
	private String jhpTitle;
	private String jhpNote;
	private String jhpRegisterTime;
	private String jhpPrintAddress;
	private String jhpSpecialNumber;
	private String jhpVoucherNo;
	private Integer jciId;

	public Integer getJhpCocId() {
		return jhpCocId;
	}

	public void setJhpCocId(Integer jhpCocId) {
		this.jhpCocId = jhpCocId;
	}

	public Integer getJciId() {
		return jciId;
	}
	public void setJciId(Integer jciId) {
		this.jciId = jciId;
	}
	public String getJhpSpecialNumber() {
		return jhpSpecialNumber;
	}
	public void setJhpSpecialNumber(String jhpSpecialNumber) {
		this.jhpSpecialNumber = jhpSpecialNumber;
	}
	public String getJhpVoucherNo() {
		return jhpVoucherNo;
	}
	public void setJhpVoucherNo(String jhpVoucherNo) {
		this.jhpVoucherNo = jhpVoucherNo;
	}
	public String getJhpPrintAddress() {
		return jhpPrintAddress;
	}
	public void setJhpPrintAddress(String jhpPrintAddress) {
		this.jhpPrintAddress = jhpPrintAddress;
	}
	public Integer getJhpHouseId() {
		return jhpHouseId;
	}
	public void setJhpHouseId(Integer jhpHouseId) {
		this.jhpHouseId = jhpHouseId;
	}
	public Integer getJhpId() {
		return jhpId;
	}
	public void setJhpId(Integer jhpId) {
		this.jhpId = jhpId;
	}
	public Integer getJhpHouse4rentId() {
		return jhpHouse4rentId;
	}
	public void setJhpHouse4rentId(Integer jhpHouse4rentId) {
		this.jhpHouse4rentId = jhpHouse4rentId;
	}
	public Integer getJhpHouse4storeId() {
		return jhpHouse4storeId;
	}
	public void setJhpHouse4storeId(Integer jhpHouse4storeId) {
		this.jhpHouse4storeId = jhpHouse4storeId;
	}
	public Integer getJhpRenterId() {
		return jhpRenterId;
	}
	public void setJhpRenterId(Integer jhpRenterId) {
		this.jhpRenterId = jhpRenterId;
	}
	public Integer getJhpLandlordId() {
		return jhpLandlordId;
	}
	public void setJhpLandlordId(Integer jhpLandlordId) {
		this.jhpLandlordId = jhpLandlordId;
	}
	public Integer getJhpUserId() {
		return jhpUserId;
	}
	public void setJhpUserId(Integer jhpUserId) {
		this.jhpUserId = jhpUserId;
	}
	public String getJhpJson() {
		return jhpJson;
	}
	public void setJhpJson(String jhpJson) {
		this.jhpJson = jhpJson;
	}
	public String getJhpType() {
		return jhpType;
	}
	public void setJhpType(String jhpType) {
		this.jhpType = jhpType;
	}
	public String getJhpTitle() {
		return jhpTitle;
	}
	public void setJhpTitle(String jhpTitle) {
		this.jhpTitle = jhpTitle;
	}
	public String getJhpNote() {
		return jhpNote;
	}
	public void setJhpNote(String jhpNote) {
		this.jhpNote = jhpNote;
	}
	public String getJhpRegisterTime() {
		return jhpRegisterTime;
	}
	public void setJhpRegisterTime(String jhpRegisterTime) {
		this.jhpRegisterTime = jhpRegisterTime;
	}
	
	
	
}