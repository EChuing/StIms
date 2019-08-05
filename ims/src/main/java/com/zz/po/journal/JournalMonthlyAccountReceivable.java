package com.zz.po.journal;

/**
 * 历史能源账单表
 */
public class JournalMonthlyAccountReceivable {
    private Integer jmarId;

    private Integer jmarContId;

    private Double jmarWaterDiff;

    private Double jmarWaterMoney;

    private Double jmarElectricDiff;

    private Double jmarElectricMoney;

    private Double jmarGasDiff;

    private Double jmarGasMoney;
    
    //tzl
    private Double jmarHotWaterDiff;
    private Double jmarHotWaterMoney;
    private Double jmarHotAirDiff;
    private Double jmarHotAirMoney;
    
    
    
    private Double jmarManageCharge;
    private Double jmarServerCharge;
    private Double jmarWifiCharge;
    private Double jmarTvCharge;
    private Double jmarThisArrears;
    private Integer jmarRentId;

    private Double jmarLiquidatedDamages;

    private Double jmarCumulativeArrears;

    private String jmarBeginTime;

    private String jmarEndTime;

    private String jmarRegsiterTime;
    
    private String pageNumber;
	private String startNum;
	private String endNum;
	private String totalNum;
	private String totalPage;
	
	private String jsonArray;
	private Integer houseStoreId;
	
	private Integer jciId;

	public Integer getJmarId() {
		return jmarId;
	}

	public void setJmarId(Integer jmarId) {
		this.jmarId = jmarId;
	}

	public Integer getJmarContId() {
		return jmarContId;
	}

	public void setJmarContId(Integer jmarContId) {
		this.jmarContId = jmarContId;
	}

	public Double getJmarWaterDiff() {
		return jmarWaterDiff;
	}

	public void setJmarWaterDiff(Double jmarWaterDiff) {
		this.jmarWaterDiff = jmarWaterDiff;
	}

	public Double getJmarWaterMoney() {
		return jmarWaterMoney;
	}

	public void setJmarWaterMoney(Double jmarWaterMoney) {
		this.jmarWaterMoney = jmarWaterMoney;
	}

	public Double getJmarElectricDiff() {
		return jmarElectricDiff;
	}

	public void setJmarElectricDiff(Double jmarElectricDiff) {
		this.jmarElectricDiff = jmarElectricDiff;
	}

	public Double getJmarElectricMoney() {
		return jmarElectricMoney;
	}

	public void setJmarElectricMoney(Double jmarElectricMoney) {
		this.jmarElectricMoney = jmarElectricMoney;
	}

	public Double getJmarGasDiff() {
		return jmarGasDiff;
	}

	public void setJmarGasDiff(Double jmarGasDiff) {
		this.jmarGasDiff = jmarGasDiff;
	}

	public Double getJmarGasMoney() {
		return jmarGasMoney;
	}

	public void setJmarGasMoney(Double jmarGasMoney) {
		this.jmarGasMoney = jmarGasMoney;
	}

	public Double getJmarHotWaterDiff() {
		return jmarHotWaterDiff;
	}

	public void setJmarHotWaterDiff(Double jmarHotWaterDiff) {
		this.jmarHotWaterDiff = jmarHotWaterDiff;
	}

	public Double getJmarHotWaterMoney() {
		return jmarHotWaterMoney;
	}

	public void setJmarHotWaterMoney(Double jmarHotWaterMoney) {
		this.jmarHotWaterMoney = jmarHotWaterMoney;
	}

	public Double getJmarHotAirDiff() {
		return jmarHotAirDiff;
	}

	public void setJmarHotAirDiff(Double jmarHotAirDiff) {
		this.jmarHotAirDiff = jmarHotAirDiff;
	}

	public Double getJmarHotAirMoney() {
		return jmarHotAirMoney;
	}

	public void setJmarHotAirMoney(Double jmarHotAirMoney) {
		this.jmarHotAirMoney = jmarHotAirMoney;
	}

	public Double getJmarManageCharge() {
		return jmarManageCharge;
	}

	public void setJmarManageCharge(Double jmarManageCharge) {
		this.jmarManageCharge = jmarManageCharge;
	}

	public Double getJmarServerCharge() {
		return jmarServerCharge;
	}

	public void setJmarServerCharge(Double jmarServerCharge) {
		this.jmarServerCharge = jmarServerCharge;
	}

	public Double getJmarWifiCharge() {
		return jmarWifiCharge;
	}

	public void setJmarWifiCharge(Double jmarWifiCharge) {
		this.jmarWifiCharge = jmarWifiCharge;
	}

	public Double getJmarTvCharge() {
		return jmarTvCharge;
	}

	public void setJmarTvCharge(Double jmarTvCharge) {
		this.jmarTvCharge = jmarTvCharge;
	}

	public Double getJmarThisArrears() {
		return jmarThisArrears;
	}

	public void setJmarThisArrears(Double jmarThisArrears) {
		this.jmarThisArrears = jmarThisArrears;
	}

	public Integer getJmarRentId() {
		return jmarRentId;
	}

	public void setJmarRentId(Integer jmarRentId) {
		this.jmarRentId = jmarRentId;
	}

	public Double getJmarLiquidatedDamages() {
		return jmarLiquidatedDamages;
	}

	public void setJmarLiquidatedDamages(Double jmarLiquidatedDamages) {
		this.jmarLiquidatedDamages = jmarLiquidatedDamages;
	}

	public Double getJmarCumulativeArrears() {
		return jmarCumulativeArrears;
	}

	public void setJmarCumulativeArrears(Double jmarCumulativeArrears) {
		this.jmarCumulativeArrears = jmarCumulativeArrears;
	}

	public String getJmarBeginTime() {
		return jmarBeginTime;
	}

	public void setJmarBeginTime(String jmarBeginTime) {
		this.jmarBeginTime = jmarBeginTime;
	}

	public String getJmarEndTime() {
		return jmarEndTime;
	}

	public void setJmarEndTime(String jmarEndTime) {
		this.jmarEndTime = jmarEndTime;
	}

	public String getJmarRegsiterTime() {
		return jmarRegsiterTime;
	}

	public void setJmarRegsiterTime(String jmarRegsiterTime) {
		this.jmarRegsiterTime = jmarRegsiterTime;
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

	public String getJsonArray() {
		return jsonArray;
	}

	public void setJsonArray(String jsonArray) {
		this.jsonArray = jsonArray;
	}

	public Integer getHouseStoreId() {
		return houseStoreId;
	}

	public void setHouseStoreId(Integer houseStoreId) {
		this.houseStoreId = houseStoreId;
	}

	public Integer getJciId() {
		return jciId;
	}

	public void setJciId(Integer jciId) {
		this.jciId = jciId;
	}

	@Override
	public String toString() {
		return "JournalMonthlyAccountReceivable [jmarId=" + jmarId + ", jmarContId=" + jmarContId + ", jmarWaterDiff="
				+ jmarWaterDiff + ", jmarWaterMoney=" + jmarWaterMoney + ", jmarElectricDiff=" + jmarElectricDiff
				+ ", jmarElectricMoney=" + jmarElectricMoney + ", jmarGasDiff=" + jmarGasDiff + ", jmarGasMoney="
				+ jmarGasMoney + ", jmarHotWaterDiff=" + jmarHotWaterDiff + ", jmarHotWaterMoney=" + jmarHotWaterMoney
				+ ", jmarHotAirDiff=" + jmarHotAirDiff + ", jmarHotAirMoney=" + jmarHotAirMoney + ", jmarManageCharge="
				+ jmarManageCharge + ", jmarServerCharge=" + jmarServerCharge + ", jmarWifiCharge=" + jmarWifiCharge
				+ ", jmarTvCharge=" + jmarTvCharge + ", jmarThisArrears=" + jmarThisArrears + ", jmarRentId="
				+ jmarRentId + ", jmarLiquidatedDamages=" + jmarLiquidatedDamages + ", jmarCumulativeArrears="
				+ jmarCumulativeArrears + ", jmarBeginTime=" + jmarBeginTime + ", jmarEndTime=" + jmarEndTime
				+ ", jmarRegsiterTime=" + jmarRegsiterTime + ", pageNumber=" + pageNumber + ", startNum=" + startNum
				+ ", endNum=" + endNum + ", totalNum=" + totalNum + ", totalPage=" + totalPage + ", jsonArray="
				+ jsonArray + ", houseStoreId=" + houseStoreId + ", jciId=" + jciId + "]";
	}
	
	
}