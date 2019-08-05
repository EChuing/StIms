package com.zz.po.info;

import java.util.List;

public class DeviceMenu extends InfoHouse4store{

    private Integer idftId;             //一级设备类型ID
    private String idftName;            //一级设备名称

    private Integer idstId;             //二级设备类型ID
    private String idstName;            //二级设备名称
    private Integer idstIdftId;         //一级类型ID外键

    //设备一二级类型表
    private Integer dftId;             //一级设备类型ID
    private String dftName;            //一级设备名称

    private Integer dstId;             //二级设备类型ID
    private String dstName;            //二级设备名称
    private Integer dstDftId;         //一级类型ID外键

    private String detailedAddress;     //房间地址
    private String status;              //设备状态码

    private Integer spdId;              //情景名称ID
    private Integer spdNumber;          //公众号虚拟面板键值
    private String spdDescribe;         //情景模式描述
    private Integer spdPatternsAreVisible;//客户端控制首页模式可见(1：可见，2：不可见)

    private String  hsIdList;            //未租Id数组
    private Integer jsroId;             //情景Id
    private Integer jsroHsId;           //情景指令表未租Id
    private String  jsroInstruction;    //情景指令
    private String  jsroWxgzhState;     //情景开关状态
    private String  jsroImsState;       //情景开关状态
    private Integer jsroPatternId;      //情景模式Id

    //未租设备与设备对应关系
    private Integer  jhdId;
    private Integer jhdHsId;            //未租与设备关系表、未租Id
    private Integer jhdDeviceId;        //未租与设备关系表、设备Id

    //设备表
//    private  Integer Id;                //主键ID
    private  Integer id;                //主键ID
    private  String devId;              //设备ID
    private  Integer devBrandId;
    private  String devNickname;
    private  String devType;            //设备类型
    private  String devAuthId;          //SN
    private  String devAuthSecret;      //网关
    private String devStatus;           //设备在线状态
    private String switchingState;      //设备开关状态
    private Integer devIdftId;          //设备表一级菜单ID
    private Integer devIdstId;          //设备表二级菜单ID
    private Integer devFirstType;
    private Integer devSecondType;
    
    //情景面板
    private Integer cpId;               //情景面板ID
    private Integer cpScenarioId;       //情景指令ID
    private Integer cpKeyValue;         //面板按键值
    private Integer cpDeviceId;         //设备表ID

    //安装位置
    private Integer idpId;              //安装位置id
    private String idpPlace;            //安装位置

    private String  updateJson;         //更新json

    //分页
    private String splitFlag;
    private String startNum;
    private String endNum;
    private String totalNum;
    private String totalPage;
    private String pageNumber;

    private String address;
    private String leaseType;
    private String allSpdDescribe;         //一个房下所有的情景模式的名称
    private String situationalPatternsList;
    private Integer type;

    private List<Integer> list;

    public List<Integer> getList() {
        return list;
    }

    public void setList(List<Integer> list) {
        this.list = list;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getSituationalPatternsList() {
        return situationalPatternsList;
    }

    public void setSituationalPatternsList(String situationalPatternsList) {
        this.situationalPatternsList = situationalPatternsList;
    }

    public String getAllSpdDescribe() {
        return allSpdDescribe;
    }

    public void setAllSpdDescribe(String allSpdDescribe) {
        this.allSpdDescribe = allSpdDescribe;
    }

    public String getLeaseType() {
        return leaseType;
    }

    public void setLeaseType(String leaseType) {
        this.leaseType = leaseType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSplitFlag() {
        return splitFlag;
    }

    public void setSplitFlag(String splitFlag) {
        this.splitFlag = splitFlag;
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

    public String getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(String pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Integer getDevFirstType() {
		return devFirstType;
	}

	public void setDevFirstType(Integer devFirstType) {
		this.devFirstType = devFirstType;
	}

	public Integer getDevSecondType() {
		return devSecondType;
	}

	public void setDevSecondType(Integer devSecondType) {
		this.devSecondType = devSecondType;
	}

	public Integer getIdftId() {
        return idftId;
    }

    public void setIdftId(Integer idftId) {
        this.idftId = idftId;
    }

    public String getIdftName() {
        return idftName;
    }

    public void setIdftName(String idftName) {
        this.idftName = idftName;
    }

    public Integer getIdstId() {
        return idstId;
    }

    public void setIdstId(Integer idstId) {
        this.idstId = idstId;
    }

    public String getIdstName() {
        return idstName;
    }

    public void setIdstName(String idstName) {
        this.idstName = idstName;
    }

    public Integer getIdstIdftId() {
        return idstIdftId;
    }

    public void setIdstIdftId(Integer idstIdftId) {
        this.idstIdftId = idstIdftId;
    }

    public String getDetailedAddress() {
        return detailedAddress;
    }

    public void setDetailedAddress(String detailedAddress) {
        this.detailedAddress = detailedAddress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getSpdId() {
        return spdId;
    }

    public void setSpdId(Integer spdId) {
        this.spdId = spdId;
    }

    public Integer getSpdNumber() {
        return spdNumber;
    }

    public void setSpdNumber(Integer spdNumber) {
        this.spdNumber = spdNumber;
    }

    public String getSpdDescribe() {
        return spdDescribe;
    }

    public void setSpdDescribe(String spdDescribe) {
        this.spdDescribe = spdDescribe;
    }

    public Integer getSpdPatternsAreVisible() {
        return spdPatternsAreVisible;
    }

    public void setSpdPatternsAreVisible(Integer spdPatternsAreVisible) {
        this.spdPatternsAreVisible = spdPatternsAreVisible;
    }

    public String getHsIdList() {
        return hsIdList;
    }

    public void setHsIdList(String hsIdList) {
        this.hsIdList = hsIdList;
    }

    public Integer getJsroId() {
        return jsroId;
    }

    public void setJsroId(Integer jsroId) {
        this.jsroId = jsroId;
    }

    public Integer getJsroHsId() {
        return jsroHsId;
    }

    public void setJsroHsId(Integer jsroHsId) {
        this.jsroHsId = jsroHsId;
    }

    public String getJsroInstruction() {
        return jsroInstruction;
    }

    public void setJsroInstruction(String jsroInstruction) {
        this.jsroInstruction = jsroInstruction;
    }

    public String getJsroWxgzhState() {
        return jsroWxgzhState;
    }

    public void setJsroWxgzhState(String jsroWxgzhState) {
        this.jsroWxgzhState = jsroWxgzhState;
    }

    public String getJsroImsState() {
        return jsroImsState;
    }

    public void setJsroImsState(String jsroImsState) {
        this.jsroImsState = jsroImsState;
    }

    public Integer getJsroPatternId() {
        return jsroPatternId;
    }

    public void setJsroPatternId(Integer jsroPatternId) {
        this.jsroPatternId = jsroPatternId;
    }

    public Integer getJhdId() {
        return jhdId;
    }

    public void setJhdId(Integer jhdId) {
        this.jhdId = jhdId;
    }

    public Integer getJhdHsId() {
        return jhdHsId;
    }

    public void setJhdHsId(Integer jhdHsId) {
        this.jhdHsId = jhdHsId;
    }

    public Integer getJhdDeviceId() {
        return jhdDeviceId;
    }

    public void setJhdDeviceId(Integer jhdDeviceId) {
        this.jhdDeviceId = jhdDeviceId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDevId() {
        return devId;
    }

    public void setDevId(String devId) {
        this.devId = devId;
    }

    public Integer getDevBrandId() {
        return devBrandId;
    }

    public void setDevBrandId(Integer devBrandId) {
        this.devBrandId = devBrandId;
    }

    public String getDevNickname() {
        return devNickname;
    }

    public void setDevNickname(String devNickname) {
        this.devNickname = devNickname;
    }

    public String getDevType() {
        return devType;
    }

    public void setDevType(String devType) {
        this.devType = devType;
    }

    public String getDevAuthId() {
        return devAuthId;
    }

    public void setDevAuthId(String devAuthId) {
        this.devAuthId = devAuthId;
    }

    public String getDevAuthSecret() {
        return devAuthSecret;
    }

    public void setDevAuthSecret(String devAuthSecret) {
        this.devAuthSecret = devAuthSecret;
    }

    public String getDevStatus() {
        return devStatus;
    }

    public void setDevStatus(String devStatus) {
        this.devStatus = devStatus;
    }

    public String getSwitchingState() {
        return switchingState;
    }

    public void setSwitchingState(String switchingState) {
        this.switchingState = switchingState;
    }

    public Integer getDevIdftId() {
        return devIdftId;
    }

    public void setDevIdftId(Integer devIdftId) {
        this.devIdftId = devIdftId;
    }

    public Integer getDevIdstId() {
        return devIdstId;
    }

    public void setDevIdstId(Integer devIdstId) {
        this.devIdstId = devIdstId;
    }

    public Integer getCpId() {
        return cpId;
    }

    public void setCpId(Integer cpId) {
        this.cpId = cpId;
    }

    public Integer getCpScenarioId() {
        return cpScenarioId;
    }

    public void setCpScenarioId(Integer cpScenarioId) {
        this.cpScenarioId = cpScenarioId;
    }

    public Integer getCpKeyValue() {
        return cpKeyValue;
    }

    public void setCpKeyValue(Integer cpKeyValue) {
        this.cpKeyValue = cpKeyValue;
    }

    public Integer getCpDeviceId() {
        return cpDeviceId;
    }

    public void setCpDeviceId(Integer cpDeviceId) {
        this.cpDeviceId = cpDeviceId;
    }

    public Integer getIdpId() {
        return idpId;
    }

    public void setIdpId(Integer idpId) {
        this.idpId = idpId;
    }

    public String getIdpPlace() {
        return idpPlace;
    }

    public void setIdpPlace(String idpPlace) {
        this.idpPlace = idpPlace;
    }

    public String getUpdateJson() {
        return updateJson;
    }

    public void setUpdateJson(String updateJson) {
        this.updateJson = updateJson;
    }

    public Integer getDftId() {
        return dftId;
    }

    public void setDftId(Integer dftId) {
        this.dftId = dftId;
    }

    public String getDftName() {
        return dftName;
    }

    public void setDftName(String dftName) {
        this.dftName = dftName;
    }

    public Integer getDstId() {
        return dstId;
    }

    public void setDstId(Integer dstId) {
        this.dstId = dstId;
    }

    public String getDstName() {
        return dstName;
    }

    public void setDstName(String dstName) {
        this.dstName = dstName;
    }

    public Integer getDstDftId() {
        return dstDftId;
    }

    public void setDstDftId(Integer dstDftId) {
        this.dstDftId = dstDftId;
    }

    @Override
    public String toString() {
        return "DeviceMenu{" +
                "idftId=" + idftId +
                ", idftName='" + idftName + '\'' +
                ", idstId=" + idstId +
                ", idstName='" + idstName + '\'' +
                ", idstIdftId=" + idstIdftId +
                ", dftId=" + dftId +
                ", dftName='" + dftName + '\'' +
                ", dstId=" + dstId +
                ", dstName='" + dstName + '\'' +
                ", dstDftId=" + dstDftId +
                ", detailedAddress='" + detailedAddress + '\'' +
                ", status='" + status + '\'' +
                ", spdId=" + spdId +
                ", spdNumber=" + spdNumber +
                ", spdDescribe='" + spdDescribe + '\'' +
                ", spdPatternsAreVisible=" + spdPatternsAreVisible +
                ", hsIdList='" + hsIdList + '\'' +
                ", jsroId=" + jsroId +
                ", jsroHsId=" + jsroHsId +
                ", jsroInstruction='" + jsroInstruction + '\'' +
                ", jsroWxgzhState='" + jsroWxgzhState + '\'' +
                ", jsroImsState='" + jsroImsState + '\'' +
                ", jsroPatternId=" + jsroPatternId +
                ", jhdId=" + jhdId +
                ", jhdHsId=" + jhdHsId +
                ", jhdDeviceId=" + jhdDeviceId +
                ", id=" + id +
                ", devId='" + devId + '\'' +
                ", devBrandId=" + devBrandId +
                ", devNickname='" + devNickname + '\'' +
                ", devType='" + devType + '\'' +
                ", devAuthId='" + devAuthId + '\'' +
                ", devAuthSecret='" + devAuthSecret + '\'' +
                ", devStatus='" + devStatus + '\'' +
                ", switchingState='" + switchingState + '\'' +
                ", devIdftId=" + devIdftId +
                ", devIdstId=" + devIdstId +
                ", devFirstType=" + devFirstType +
                ", devSecondType=" + devSecondType +
                ", cpId=" + cpId +
                ", cpScenarioId=" + cpScenarioId +
                ", cpKeyValue=" + cpKeyValue +
                ", cpDeviceId=" + cpDeviceId +
                ", idpId=" + idpId +
                ", idpPlace='" + idpPlace + '\'' +
                ", updateJson='" + updateJson + '\'' +
                ", splitFlag='" + splitFlag + '\'' +
                ", startNum='" + startNum + '\'' +
                ", endNum='" + endNum + '\'' +
                ", totalNum='" + totalNum + '\'' +
                ", totalPage='" + totalPage + '\'' +
                ", pageNumber='" + pageNumber + '\'' +
                ", address='" + address + '\'' +
                ", leaseType='" + leaseType + '\'' +
                ", allSpdDescribe='" + allSpdDescribe + '\'' +
                ", situationalPatternsList='" + situationalPatternsList + '\'' +
                ", type=" + type +
                ", list=" + list +
                '}';
    }
}
