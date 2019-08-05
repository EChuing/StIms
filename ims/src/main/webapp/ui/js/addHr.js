homeState = $("#homeState").val();
$('#addHrGuidePrice').val(homeState.substr(20));
//未租添加出租，指导价格
$(function () {
    $('#addHrBegin').val(formatTime(getNowFormatDate(), 2));
    contractRiskControl();
    if (homeState.substr(0, 6) == 'noRent') {
        loadSelectList();
        $('#choseHome1').hide();
        var row = parent.$('#trusteeshipDg').datagrid('getSelected');

        //将选中房间数据在添加出租表中显示信息
        $('.hsAddCommunity').html(row.hsAddCommunity);
        $('.hsAddBuilding').html(row.hsAddBuilding);
        $('.hsAddDoorplateno').html(row.hsAddDoorplateno);
        $('.hsSectionType').html(row.hsSectionType);
        $('.hsHouseDirection').html(row.hsHouseDirection);
        $('.hsHouseSquare').html(row.hsHouseSquare);
        $('.hsHouseOwner').html(row.hsHouseOwner);
        $('.popName').html(row.popName);
        $('.popTelephone').html(row.popTelephone);
        //
        $("#att").val('');

        $('.attachmentNum').html('（图片0张    文件0个）');
        $(".inputHide").prop({disabled: true});
        $('#aShowHide').show();
        //点击导航栏跳转
        $('#addHrDlg .process-bar .process').on('click', function () {
            if ($(this).hasClass('active')) {		//检查运行时所在的对象是否拥有类：active
                var step = $(this).attr('data-step');
                gotoStep('addHr', step);
            }
        });

        //默认设置
        //合同开始日期为今天
        $('#addHrContractType').val('新签合同');
        $('#addHrInAdvancePay').val(1);//提前收租天数
        $('#addHrRentPaymentType').val('月付');//租金
        $('#addHrManagePayment').val('月付');//物管费
        $('#addHrServerPayment').val('月付');//服务费
        $('#addHrWifiChargePayment').val('月付');//网络费
        $('#addHrTvChargePayment').val('月付');//电视费
        $('#addHrOtherPayment').val('月付');//其他费
        $("#addHrManageCost").val(0);//物管费
        $("#addHrServerCost").val(0);//服务费
        $("#addHrWifiCharge").val(0);//网络费
        $("#addHrTvCharge").val(0);//电视费
        $("#addHrOtherPay").val(0);//其他费
        $("#addHrHouseDeposit").val(0);//房屋押金
        $("#addHrDoorDeposit").val(0);//门卡押金
        $("#addHrPowerDeposit").val(0);//水电押金
        $("#addHrOtherDeposit").val(0);//其他押金
        $("#refundDeposit").val(0);
        $("#totalFee").val(0);
        $('#addHrDoorTrendFee').val(0);
        $('#addHrComServiceFee').val(0);
        $('#addHrLockFee').val(0);
        $('#addHrOtherFee').val(0);
        $('#addHrDepositInfoDiv').hide();//定金
        $('.refundDeposit').show();
        if (row.hsManagerUserId != '' && row.hsManagerUserId != null) {
            for (var j in _userInfoData) {
                if (row.hsManagerUserId == _userInfoData[j].userId) {
                    $("#addHrManagerUserId").val(row.hsManagerUserId);
                    $("#addHrManagerUserDept").val(row.hsDepartment);
                    $("#addHrManagerUserStore").val(row.hsStorefront);
                }
            }
        } else {
            $("#addHrManagerUserId").val('');
            // alert(row.hsManagerUserId);
            $("#addHrManagerUserDept").val("");
            $("#addHrManagerUserStore").val("");
        }

        for (var j in _userInfoData) {//业务员
            if (_loginUserId == _userInfoData[j].userId) {
                $('#addHrSalesmanAllProfit').prop('checked', true);
                $("#addHrSalesmanGetUserId").val(_loginUserId);
                $("#addHrSalesmanGetUserDetId").val(_loginDepartment);
                $("#addHrSalesmanGetUserStoreId").val(_loginStore);
                $("#addHrSalesmanShowUserInfo").val(_userInfoData[j].storefrontName + " " + _userInfoData[j].departmentName + " " + _userInfoData[j].suStaffName);
            }
        }
        checkProfit('#addHrSalesmanAllProfit', 'addProfit', 'addHrSalesman');//收益人

        //意向人及定金
//	console.log(row.hsIntentionalId)
        if (row.hsIntentionalId != '' && row.hsIntentionalId != null) {
            $.post("../selectIntendedPerson.action", {
                ipId: row.hsIntentionalId
            }, function (data) {
                data = data.body;
                $("#addHrRenterName").val(data[0].ipName);
                $("#addHrDepositRenterName").val(data[0].ipName);
                $("#addHrIntendedRenterId").val(data[0].ipId);
                $("#addHrRenterPhone").val(data[0].ipTel);
            });
            $('#addHrDeposit').val(row.hsDepositAmount);
            $('#addHrDepositDateBegin').val(row.hsStartDate);
            $('#addHrDepositDateEnd').val(row.hsEndDate);
            $('#addHrDepositRenterId').val(row.hsIntentionalId);
            $("#depositPopId").val('');
            $('#addHrDepositFollowUserId').val(row.hsSalesmanId);

            $.post("../queryUserByDepartmentID.action", {
                userId: row.hsSalesmanId
            }, function (data) {
                if (data.code < 0) {
                    return;
                }
                data = data.body;
                $("#addHrDepositUserName").val(data[0].suStaffName);
            });
            $('#addHrDepositInfoDiv').show();
        } else if (row.hsPopId != '' && row.hsPopId != null) {
            //客户
            $.post("../selectPopulationCommon.action", {
                popId: row.hsPopId,
            }, function (data) {
                data = data.body;
                $("#addHrRenterName").val(data[0].popName);
                $("#addHrDepositRenterName").val(data[0].popName);
                $("#addHrDepositPopId").val(data[0].popId);
                $('#addHrIntendedRenterId').val('');
                $("#addHrRenterPhone").val(data[0].popTelephone);
                $("#addHrRenterIDCard").val(data[0].popIdcard);
            });
            $('#addHrDeposit').val(row.hsDepositAmount);
            $('#addHrDepositDateBegin').val(row.hsStartDate);
            $('#addHrDepositDateEnd').val(row.hsEndDate);
            $('#addHrDepositRenterId').val(row.hsIntentionalId);
            $('#addHrDepositFollowUserId').val(row.hsSalesmanId);
            $.post("../queryUserByDepartmentID.action", {
                userId: row.hsSalesmanId
            }, function (data) {
                if (data.code < 0) {
                    return;
                }
                data = data.body;
                $("#addHrDepositUserName").val(data[0].suStaffName);
            });
            $('#addHrDepositInfoDiv').show();
        } else {
            $('#addHrDeposit').val('');
            $('#addHrDepositDateBegin').val('');
            $('#addHrDepositDateEnd').val('');
            $('#addHrDepositUserName').val('');
            $('#addHrDepositInfoDiv').hide();
            $('.refundDeposit').hide();
        }

        //资产 - 每次选择房源会清除之前缓存的迁移数据
        _houseStoreCoding = row.hsId;
        _houseCoding = row.hsHouseId;
        _hrAddCommunity = row.hsAddCommunity;
        _hrAddBuilding = row.hsAddBuilding;
        _hrAddDoorplateno = row.hsAddDoorplateno;
        _moveSaId = 0;
        _moveAsset = [];
        $('#choseHouse').dialog('close');

        var jcdHouseAddress = row.hsAddCommunity + " " + row.hsAddBuilding + " " + row.hsAddDoorplateno;
        $("#addHrHsId").val(row.hsId);//未租id
        $("#hsDownDeposit").val(row.hsDownDeposit);//下定状态
        $("#addHrHouseId").val(row.hsHouseId);//盘源id
        $("#addHrHouseDictId").val(row.hsHouseDictId);//字典id
        $("#addHrLandlordId").val(row.hsLandlordId);//房东id
        $("#addHrLandlordCheckEnd").val(row.hsEndTime);//托管到期时间
        $("#addHrIdentifier").val(row.hsSplitIdentifier);//合租房门牌号前缀
        //0!='' 相当于  false！=false 返回false
        if (row.hsPrimitiveMother != '' && row.hsPrimitiveMother != null) {
            $("#addHrFlatShareLogo").val(1);//拆分标识0,1
        } else {
            $("#addHrFlatShareLogo").val(0);
        }

        //显示第一步的界面
        gotoStep('addHr', 1);

        //获取抄表数
        $("#addHrWater").val(row.hsWaterVolFirst);//水底数
        $("#addHrElect").val(row.hsElectritVolFirst);//电底数
        $("#addHrGas").val(row.hsGasVolFirst);//气底数
        $("#addHrHotWater").val(row.hsHotWaterVolFirst);//热水底数
        $("#addHrHotAir").val(row.hsHotAirVolFirst);//暖气底数
        //将房屋信息映射到表格中
        for (var i in row) {
            $('#addHrDlg table.hsInfo .' + i).html(row[i]);
        }
        //查计费方案
        $.post("../selectPlanTableRentStore.action", {
            planHdId: row.hsHouseDictId,
        }, function (data) {
            data = data.body;
            $("#addHrWaterPlan").empty();
            $("#addHrElectPlan").empty();
            $("#addHrGasPlan").empty();
            $("#addhrHotwaterPlan").empty();
            $("#addhrHotairPlan").empty();
            for (var i in data) {
                if (data[i].planType == '水') {
                    $("#addHrWaterPlan").append("<option value='" + data[i].planId + "'>" + data[i].planName + "</option>");
                } else if (data[i].planType == '电') {
                    $("#addHrElectPlan").append("<option value='" + data[i].planId + "'>" + data[i].planName + "</option>");
                } else if (data[i].planType == '气') {
                    $("#addHrGasPlan").append("<option value='" + data[i].planId + "'>" + data[i].planName + "</option>");
                } else if (data[i].planType == '热水') {
                    $("#addhrHotwaterPlan").append("<option value='" + data[i].planId + "'>" + data[i].planName + "</option>");
                } else if (data[i].planType == '暖气') {
                    $("#addhrHotairPlan").append("<option value='" + data[i].planId + "'>" + data[i].planName + "</option>");
                }


            }
            energy();
        });
    } else {
        loadSelectList();
        $("#att").val('');
        $('.attachmentNum').html('（图片0张    文件0个）');
        $(".inputHide").prop({disabled: true});
        $('#aShowHide').show();
        //点击导航栏跳转
        $('#addHrDlg .process-bar .process').on('click', function () {
            if ($(this).hasClass('active')) {
                var step = $(this).attr('data-step');
                gotoStep('addHr', step);
            }
        });

        //默认设置
        //合同开始日期为今天
        $('#addHrContractType').val('新签合同');
        $('#addHrInAdvancePay').val(1);//提前收租天数
        $('#addHrRentPaymentType').val('月付');//租金
        $('#addHrManagePayment').val('月付');//物管费
        $('#addHrServerPayment').val('月付');//服务费
        $('#addHrWifiChargePayment').val('月付');//网络费
        $('#addHrTvChargePayment').val('月付');//电视费
        $('#addHrOtherPayment').val('月付');//其他费
        $("#addHrManageCost").val(0);//物管费
        $("#addHrServerCost").val(0);//服务费
        $("#addHrWifiCharge").val(0);//网络费
        $("#addHrTvCharge").val(0);//电视费
        $("#addHrOtherPay").val(0);//其他费
        $("#addHrHouseDeposit").val(0);//房屋押金
        $("#addHrDoorDeposit").val(0);//门卡押金
        $("#addHrPowerDeposit").val(0);//水电押金
        $("#addHrOtherDeposit").val(0);//其他押金
        $("#refundDeposit").val(0);//退还定金
        $("#totalFee").val(0);//总金额
        $('#addHrDoorTrendFee').val(0);
        $('#addHrComServiceFee').val(0);
        $('#addHrLockFee').val(0);
        $('#addHrOtherFee').val(0);
        $('#addHrDepositInfoDiv').hide();//定金
        for (var j in _userInfoData) {//业务员
            if (_loginUserId == _userInfoData[j].userId) {
                $('#addHrSalesmanAllProfit').prop('checked', true);
                $("#addHrSalesmanGetUserId").val(_loginUserId);
                $("#addHrSalesmanGetUserDetId").val(_loginDepartment);
                $("#addHrSalesmanGetUserStoreId").val(_loginStore);
                $("#addHrSalesmanShowUserInfo").val(_userInfoData[j].storefrontName + " " + _userInfoData[j].departmentName + " " + _userInfoData[j].suStaffName);
            }
        }
        checkProfit('#addHrSalesmanAllProfit', 'addProfit', 'addHrSalesman');//收益人
        //第一步打开
        gotoStep('addHr', 1);
    }
});

function energy() {
    //控制非选中能源项隐藏
    var chargingPlan = parent._chargingPlan;
    for (var i in chargingPlan) {
        if (!chargingPlan[i]["state"]) {
            $("." + i + " input").val(0);
            $("." + i).hide();
        }
    }
}

//获取url中的参数，另一种方式是在jsp页面写一个input框<input id="homeState" type="hidden" value="${param.homeState}">
/*function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}*/

//添加已租-选择未租房
function chooseHouseForStore() {
    var chargingPlan = parent._chargingPlan;
    console.log(chargingPlan);
    //energy();
    $('#choseHouse').dialog({
        title: '选择房源',
        top: getTop(420),
        left: getLeft(600),
        width: 600,
        height: 420,
        closed: true,
        cache: false,
        modal: true
    });

    if ($('#choseHouseTable').hasClass('datagrid-f')) {

    } else {
        $('#choseHouseTable').datagrid({
            columns: [[{
                field: 'hsAddDistrict',
                title: '城区',
                width: 20,
                align: 'center'
            }, {
                field: 'hsAddCommunity',
                title: '楼盘名称',
                width: 26,
                align: 'center'
            }, {
                field: 'hsAddBuilding',
                title: '楼栋',
                width: 10,
                align: 'center'
            }, {
                field: 'hsAddDoorplateno',
                title: '门牌',
                width: 10,
                align: 'center'
            }, {
                field: 'hsSectionType',
                title: '房型',
                width: 15,
                align: 'center'
            }]],
            width: '100%',
            height: '277px',
            singleSelect: true,
            autoRowHeight: false,
            pageSize: 10,
            scrollbarSize: 0,
            showPageList: false,
            fitColumns: true,
            onDblClickRow: function (rowIndex, rowData) {
                var row = $('#choseHouseTable').datagrid('getSelected');
                if (row) {
                    $("#addHrHsId").val(row.hsId);//未租id
                    $("#hsDownDeposit").val(row.hsDownDeposit);//下定状态
                    $("#addHrHouseId").val(row.hsHouseId);//盘源id
                    $("#addHrHouseDictId").val(row.hsHouseDictId);//字典id
                    $("#addHrLandlordId").val(row.hsLandlordId);//房东id
                    $("#addHrLandlordCheckEnd").val(row.hsEndTime);//托管到期时间
                    $("#addHrGuidePrice").val(row.hsGuidePrice);//指导价格
                    $("#addHrIdentifier").val(row.hsSplitIdentifier);//合租房门牌号前缀
                    //0!='' 相当于  false！=false 返回false
                    if (row.hsPrimitiveMother != '' && row.hsPrimitiveMother != null) {
                        $("#addHrFlatShareLogo").val(1);//拆分标识0,1
                    } else {
                        $("#addHrFlatShareLogo").val(0);
                    }
                    $("#addHrWater").val(row.hsWaterVolFirst);//水底数
                    $("#addHrElect").val(row.hsElectritVolFirst);//电底数
                    $("#addHrGas").val(row.hsGasVolFirst);//气底数
                    $("#addHrHotWater").val(row.hsHotWaterVolFirst);
                    $("#addHrHotAir").val(row.hsHotAirVolFirst);
                    var jcdHouseAddress = row.hsAddCommunity + " " + row.hsAddBuilding + " " + row.hsAddDoorplateno;
                    energy();//隐藏能源项
                    //将房屋信息映射到表格中
                    for (var i in row) {
                        $('#addHrDlg table.hsInfo .' + i).html(row[i]);
                    }

                    //房管员
                    if (row.hsManagerUserId != '' && row.hsManagerUserId != null) {
                        for (var j in _userInfoData) {
                            if (row.hsManagerUserId == _userInfoData[j].userId) {
                                $("#addHrManagerUserId").val(row.hsManagerUserId);
                                $("#addHrManagerUserDept").val(row.hsDepartment);
                                $("#addHrManagerUserStore").val(row.hsStorefront);
                            }
                        }
                    } else {
                        $("#addHrManagerUserId").val('');
                        $("#addHrManagerUserDept").val("");
                        $("#addHrManagerUserStore").val("");
                    }

                    //查计费方案
                    $.post("../selectPlanTableRentStore.action", {
                        planHdId: row.hsHouseDictId,
                    }, function (data) {
                        data = data.body;
                        $("#addHrWaterPlan").empty();
                        $("#addHrElectPlan").empty();
                        $("#addHrGasPlan").empty();
                        $("#addhrHotwaterPlan").empty();
                        $("#addhrHotairPlan").empty();
                        for (var i in data) {
                            if (data[i].planType == '水') {
                                $("#addHrWaterPlan").append("<option value='" + data[i].planId + "'>" + data[i].planName + "</option>");
                            } else if (data[i].planType == '电') {
                                $("#addHrElectPlan").append("<option value='" + data[i].planId + "'>" + data[i].planName + "</option>");
                            } else if (data[i].planType == '气') {
                                $("#addHrGasPlan").append("<option value='" + data[i].planId + "'>" + data[i].planName + "</option>");
                            } else if (data[i].planType == '热水') {
                                $("#addhrHotwaterPlan").append("<option value='" + data[i].planId + "'>" + data[i].planName + "</option>");
                            } else if (data[i].planType == '暖气') {
                                $("#addhrHotairPlan").append("<option value='" + data[i].planId + "'>" + data[i].planName + "</option>");
                            }
                        }
                    });
                    //意向人及定金
                    if (row.hsIntentionalId != '' && row.hsIntentionalId != null) {
                        $.post("../selectIntendedPerson.action", {
                            ipId: row.hsIntentionalId
                        }, function (data) {
                            data = data.body;
                            $("#addHrRenterName").val(data[0].ipName);
                            $("#addHrDepositRenterName").val(data[0].ipName);
                            $("#addHrIntendedRenterId").val(data[0].ipId);
                            $("#addHrRenterPhone").val(data[0].ipTel);
                        });
                        $('#addHrDeposit').val(row.hsDepositAmount);
                        $('#addHrDepositDateBegin').val(row.hsStartDate);
                        $('#addHrDepositDateEnd').val(row.hsEndDate);
                        $('#addHrDepositRenterId').val(row.hsIntentionalId);
                        $("#depositPopId").val('');
                        $('#addHrDepositFollowUserId').val(row.hsSalesmanId);

                        $.post("../queryUserByDepartmentID.action", {
                            userId: row.hsSalesmanId
                        }, function (data) {
                            if (data.code < 0) {
                                return;
                            }
                            data = data.body;
                            $("#addHrDepositUserName").val(data[0].suStaffName);
                        });
                        $('#addHrDepositInfoDiv').show();
                        $('.refundDeposit').show();
                    } else if (row.hsPopId != '' && row.hsPopId != null) {
                        //客户
                        $.post("../selectPopulationCommon.action", {
                            popId: row.hsPopId,
                        }, function (data) {
                            data = data.body;
                            $("#addHrRenterName").val(data[0].popName);
                            $("#addHrDepositRenterName").val(data[0].popName);
                            $("#addHrDepositPopId").val(data[0].popId);
                            $('#addHrIntendedRenterId').val('');
                            $("#addHrRenterPhone").val(data[0].popTelephone);
                            $("#addHrRenterIDCard").val(data[0].popIdcard);
                        });
                        $('#addHrDeposit').val(row.hsDepositAmount);
                        $('#addHrDepositDateBegin').val(row.hsStartDate);
                        $('#addHrDepositDateEnd').val(row.hsEndDate);
                        $('#addHrDepositRenterId').val(row.hsIntentionalId);
                        $('#addHrDepositFollowUserId').val(row.hsSalesmanId);
                        $.post("../queryUserByDepartmentID.action", {
                            userId: row.hsSalesmanId
                        }, function (data) {
                            if (data.code < 0) {
                                return;
                            }
                            data = data.body;
                            $("#addHrDepositUserName").val(data[0].suStaffName);
                        });
                        $('#addHrDepositInfoDiv').show();
                        $('.refundDeposit').show();
                    } else {
                        $('#addHrDeposit').val('');
                        $('#addHrDepositDateBegin').val('');
                        $('#addHrDepositDateEnd').val('');
                        $('#addHrDepositUserName').val('');
                        $('#addHrDepositInfoDiv').hide();
                        $('.refundDeposit').hide();
                    }
                    //资产 - 每次选择房源会清除之前缓存的迁移数据
                    _houseStoreCoding = row.hsId;
                    _houseCoding = row.hsHouseId;
                    _hrAddCommunity = row.hsAddCommunity;
                    _hrAddBuilding = row.hsAddBuilding;
                    _hrAddDoorplateno = row.hsAddDoorplateno;
                    _moveSaId = 0;
                    _moveAsset = [];
                    $('#choseHouse').dialog('close');
                }
            }
        });
        query4StoreInfo(1, 0);
    }
    $('#choseHouse').dialog('open');
}

//选择托管房源表导入数据
function query4StoreInfo(page, type) {
    var startNum = (parseInt(page) - 1) * 10;
    var endNum = 10;
    var qCity = $("#choseCity").find("option:selected").text();
    var qDistrict = $("#choseDistrict").find("option:selected").text();
    var qZone = $("#choseZone").find("option:selected").text();
    var qCommunity = $("#choseCommunity").val();
    var qBuilding = $("#choseBuilding").val();
    var qDoorplateno = $("#choseDoorplateno").val();
    $.post("../queryHouseStoreCommon.action", {
        startNum: startNum,
        endNum: endNum,
        hsAddCity: qCity,
        hsAddDistrict: qDistrict,
        hsAddZone: qZone,
        hsAddCommunity: qCommunity,
        hsAddBuilding: qBuilding,
        hsAddDoorplateno: qDoorplateno,
        hsLeaseState: '所有未租',
        hsPrimitiveMother: 4,
    }, function (data) {
        if (data.code < 0) {
            sourcePage(0, 0, 1);
            $('#choseHouseTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: '没有查询到符合条件的记录！'
            });
        } else {
            data = data.body;
            if (page == 1 && type == 0) {
                sourcePage(data[0].totalNum, page, 1);
            }
            //判断该房间是否为短租房型，是的删除
            for (var i = 0; i < data.length; i++) {
                hsLeaseType = data[i].hsLeaseType;
                if (hsLeaseType == 1) {
                    data.splice(i, 1);
                    i--;
                }
            }
            $("#choseHouseTable").datagrid("loadData", data);
        }
    }, "json");
}
//选择租客或意向人
function chooseRenter() {
    $('#choseRenter').dialog({
        title: '选择租客',
        top: getTop(420),
        left: getLeft(640),
        width: 640,
        height: 420,
        closed: true,
        cache: false,
        modal: true
    });
    $('#choseRenter').dialog('open');
    if ($('#choseRenterTable').hasClass('datagrid-f')) {

    } else {
        $('#choseRenterTable').datagrid({
            columns: [[{
                field: 'ipName',
                title: '姓名',
                width: "20%",
                align: 'center'
            }, {
                field: 'ipTel',
                title: '电话',
                width: "30%",
                align: 'center'
            }, {
                field: 'ipFrom',
                title: '来源',
                width: "46%",
                align: 'center'
            }, {
                field: 'renterPopName',
                title: '姓名',
                width: "20%",
                align: 'center'
            }, {
                field: 'renterPopTelephone',
                title: '电话',
                width: "30%",
                align: 'center'
            }, {
                field: 'renterPopIdcard',
                title: '身份证',
                width: "46%",
                align: 'center'
            }]],
            width: '100%',
            height: '277px',
            singleSelect: true,
            autoRowHeight: false,
            pageSize: 10,
            scrollbarSize: 0,
            showPageList: false,
            fitColumns: true,
            onDblClickRow: function (rowIndex, rowData) {
                var row = $('#choseRenterTable').datagrid('getSelected');
                var searchRenterType = $('#searchRenterType').val();
                if (searchRenterType == '意向人') {
                    $("#addHrRenterName").val(row.ipName);
                    $("#addHrRenterPhone").val(row.ipTel);
                    $("#addHrIntendedRenterId").val(row.ipId);
                } else if (searchRenterType == '已有租客') {
                    $("#addHrRenterName").val(row.renterPopName);
                    $("#addHrRenterPhone").val(row.renterPopTelephone);
                    $("#addHrRenterIDCard").val(row.renterPopIdcard);
                    $("#addHrRenterNameRemark").val(row.popNameRemark);
                }
                $('#choseRenter').dialog('close');
            }
        });
    }
    queryRenter(1, 0);
}

//选择租客表导入数据
function queryRenter(page, type) {
    var startNum = (parseInt(page) - 1) * 10;
    var endNum = 10;
    var renterName = $("#searchRenterName").val();
    var renterPhone = $("#searchRenterPhone").val();
    var searchRenterType = $('#searchRenterType').val();
    if (searchRenterType == '意向人') {
        $('#choseRenterTable').datagrid('hideColumn', 'renterPopName');
        $('#choseRenterTable').datagrid('hideColumn', 'renterPopTelephone');
        $('#choseRenterTable').datagrid('hideColumn', 'renterPopIdcard');
        $('#choseRenterTable').datagrid('showColumn', 'ipName');
        $('#choseRenterTable').datagrid('showColumn', 'ipTel');
        $('#choseRenterTable').datagrid('showColumn', 'ipFrom');
        $.post("../selectIntendedPerson.action", {
            startNum: startNum,
            endNum: endNum,
            ipName: renterName,
            ipTel: renterPhone,
        }, function (data) {
            if (data.code < 0) {
                sourcePage(0, 0, 2);
                $('#choseRenterTable').datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: data.msg
                });
            } else {
                data = data.body;
                if (page == 1 && type == 0) {
                    sourcePage(data[0].totalNum, page, 2);
                }
                $("#choseRenterTable").datagrid("loadData", data);
            }
        }, "json");
    } else if (searchRenterType == '已有租客') {
        $('#choseRenterTable').datagrid('showColumn', 'renterPopName');
        $('#choseRenterTable').datagrid('showColumn', 'renterPopTelephone');
        $('#choseRenterTable').datagrid('showColumn', 'renterPopIdcard');
        $('#choseRenterTable').datagrid('hideColumn', 'ipName');
        $('#choseRenterTable').datagrid('hideColumn', 'ipTel');
        $('#choseRenterTable').datagrid('hideColumn', 'ipFrom');
        $.post("../selectHouseRentName.action", {
            startNum: startNum,
            endNum: endNum,
            renterPopName: renterName,
            renterPopTelephone: renterPhone,
        }, function (data) {
            if (data.code < 0) {
                sourcePage(0, 0, 2);
                $('#choseRenterTable').datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: data.msg
                });
            } else {
                data = data.body;
                if (page == 1 && type == 0) {
                    sourcePage(data[0].totalNum, page, 2);
                }
                $("#choseRenterTable").datagrid("loadData", data);
            }
        }, "json");
    }
}
//添加已租-保存
function doAddHr1() {
	var checkFlag = 0;
	$('#addHrDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if(checkFlag!=0){
		myTips("有选项未填!","error");
		return;
	}
	var jrrRenewalCoding = $('#addHrContractNum').val();
	var jcdId = $('#addHrContractNumCheckoutIf').val();
	if(_contractNums==1){
		if(jcdId==""){
			$('#addHrContractNum').css('border', '1px solid red');
			myTips("请填写合同编号!","error");
			return;
		}else{
			$('#addHrContractNum').css('border', '1px solid #a9a9a9');
		}
	}
	// 房屋基本信息
	var hsId=$("#addHrHsId").val();
	var hsMicronetIdentification=1;
	var addHouseId=$("#addHrHouseId").val();
	var addHouseDictId=$("#addHrHouseDictId").val();
	var addLandlordId = $("#addHrLandlordId").val();
	var intentionalId = $("#addHrIntendedRenterId").val();
	var addSectionType=$("#addHrDlg .hsSectionType").eq(0).html();
	var addHouseOwner = $("#addHrDlg .hsHouseOwner").eq(0).html();
	var addSquare=$("#addHrDlg .hsHouseSquare").eq(0).html();
	var addDirection=$('#addHrDlg .hsHouseDirection').eq(0).html();
	var hrSplitIdentifier=$("#addHrIdentifier").val();
	var hrFlatShareLogo =  $("#addHrFlatShareLogo").val();
	var addHrHouseNote=$('#addHrHouseNote').val();
	// 地址
	var addCity= $("#addHrDlg .hsAddCity").eq(0).html();
	var addDistrict=$("#addHrDlg .hsAddDistrict").eq(0).html();
	var addZone= $("#addHrDlg .hsAddZone").eq(0).html();
	var addSteet= $("#addHrDlg .hsAddStreet").eq(0).html();
	var addBuildingName=$("#addHrDlg .hsAddCommunity").eq(0).html();
	var addAddBuilding=$("#addHrDlg .hsAddBuilding").eq(0).html();
	var addAddDoorplateno=$("#addHrDlg .hsAddDoorplateno").eq(0).html();
	var jcdHouseAddress = addBuildingName+" "+addAddBuilding+" "+addAddDoorplateno;
	// 水电气
	var addWater=$("#addHrWater").val();
	var addCtrit=$("#addHrElect").val();
	var addGas=$("#addHrGas").val();
	var addHotWater=$("#addHrHotWater").val();
	var addHotAir=$("#addHrHotAir").val();
	
	var hrWaterPlan = $("#addHrWaterPlan").val();
	var hrElectritPlan = $("#addHrElectPlan").val();
	var hrGasPlan = $("#addHrGasPlan").val();
	var hrHotwaterPlan = $("#addhrHotwaterPlan").val();
	var hrHotairPlan = $("#addhrHotairPlan").val();
	
	// 合同
	var addSourceBegin=$('#addHrBegin').val();
	var addEnd=$('#addHrEnd').val();
	var term = getYearMonthDay(addSourceBegin, addEnd);
	var addSourceTerm = term[0]+'年'+term[1]+'月'+term[2]+'日';
	var addSigned=$('#addHrSigned').val();
	var inAdvancePay = $("#addHrInAdvancePay").val();
	var addContractType=$('#addHrContractType').find("option:selected").text();
	// 费用
	var addPrice=$('#addHrRentPrice').val();
	var jrrPaymentMethod = $("#addHrRentPaymentType").find("option:selected").text();
	var jrrManageCost=$('#addHrManageCost').val();
	var jrrManagePayment=$('#addHrManagePayment').find("option:selected").text();
	var jrrServerCost=$('#addHrServerCost').val();
	var jrrServerPayment=$('#addHrServerPayment').find("option:selected").text();
	var hrWifiCharge=$('#addHrWifiCharge').val();
	var hrTvCharge=$('#addHrTvCharge').val();
	var hrOtherPay=$('#addHrOtherPay').val();
	//押金
	var addDeposit = $('#addHrHouseDeposit').val();
	var hrDoorDeposit = $('#addHrDoorDeposit').val();
	var hrPowerDeposit = $('#addHrPowerDeposit').val();
	var hrOtherDeposit = $('#addHrOtherDeposit').val();
	var addHrDoorTrendFee=$('#addHrDoorTrendFee').val();
	var addHrComServiceFee=$('#addHrComServiceFee').val();
	var addHrLockFee=$('#addHrLockFee').val();
	var addHrOtherFee=$('#addHrOtherFee').val();
	//业务员
	var addFollowUserId = $('#addHrSalesmanGetUserId').val();
	var hrManagerUserId = $("#addHrManagerUserId").val();
	var hrDepartment =  $("#addHrManagerUserDept").val();
	var hrStorefront =  $("#addHrManagerUserStore").val();
	//租客
	var popIdcardJson = JSON.stringify(popIdcardJson1);
	var renterName = $("#addHrRenterName").val();
	var renterPhone = $("#addHrRenterPhone").val();
	var renterIdcard = $("#addHrRenterIDCard").val();
	var popNameRemark = $("#addHrRenterNameRemark").val();
	var renterBirth = $("#addHrRenterBirth").val();
	var renterSex = $("#addHrRenterSex").val();
	var renterNation = $("#addHrRenterNation").val();
	var renterIdcardAddress = $("#addHrRenterIdcardAddress").val();
    var ectUserCode = md5(renterIdcard);

	/*var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

	if(reg.test(renterIdcard) === false)
	{
		$('#addHrRenterIDCard').css('border', '1px solid red');
		myTips("身份证输入不合法!","error");
		return;
	}*/

    //身份证种类
    //var popIdcardType = 身份证json
//	var identityInformation= $("#identityInformation").val();
//	if(identityInformation!=''){
//		var popIdcardJson = identityInformation;
//	}
	//定金部分
	var hsDepositAmount = $('#addHrDeposit').val();
	var hsIntentionalId = $('#addHrDepositRenterId').val();
	var hsStartDate = $('#addHrDepositDateBegin').val();
	var hsEndDate = $('#addHrDepositDateEnd').val();
	var hsDespositAccount = $('#depositFinancialBankNums').val();
	var hsSalesmanId = $('#addHrDepositFollowUserId').val();
	var advanceMode = $('#advanceMode').val();
	//业绩受益人部分
	var profitData= getProfitData('addProfit', '出房');
	var assJson = '';
    var capitalAmount = convertCurrency(addPrice);
    var deliveryDay = addSourceBegin;
    var datas = $('#preGeneratingBillTable').datagrid('getRows');
    var inputArray = $('.setRenterNewFinancialDiv input');
	var jciBillJson = "";
	var paymentType = "";
	var jciMoneyTem = 0.00;
	var sendMessageNote = "";
	for (var i = 0; i < inputArray.length-1; i++) {
		if ($("#" + inputArray[i].id).val() == 0 || $("#" + inputArray[i].id).val() == null || $("#" + inputArray[i].id).val() == "") {
			continue;
		}
        if (inputArray[i].className.indexOf('payment') > -1) {
            paymentType = '"paymentType":"' + jrrPaymentMethod + '"';
            if($("#advanceMode").val() == 2) {
                jciMoneyTem = simpleCountBugMonth(addSourceBegin, parseFloat($("#" + inputArray[i].id).val()));
            }else{
                jciMoneyTem = parseFloat($("#" + inputArray[i].id).val());
            }
            var jciMoney = '"jciMoney":"' + jciMoneyTem + '"';//收支金额
        } else {
            paymentType = '"paymentType":"'+ jrrPaymentMethod +'"';
            jciMoneyTem = $("#" + inputArray[i].id).val();
            var jciMoney = '"jciMoney":"' + jciMoneyTem + '"';//收支金额
        }
        var classification = '"classification":"' + $("#" + inputArray[i].id).attr("bigType") + '"';//收支分类
        var species = '"species":"' + $("#" + inputArray[i].id).attr("mType") + '"';//收支种类
        var jciRegisterPeople = '"jciRegisterPeople":"' + parent._loginUserId + '"';//登记人id
        var jciDepartment = '"jciDepartment":"' + parent._loginDepartment + '"';//部门id
        var jciStorefront = '"jciStorefront":"' + parent._loginStore + '"';//门店id
        var jciHouse4storeId = '"jciHouse4storeId":"' + $("#addHrHsId").val() + '"';//未租id
        var jciLandlordId = '"jciLandlordId":"' + $("#addHrLandlordId").val() + '"';//业主id
        var jciRenterId = '"jciRenterId":"' + $('#addHrIntendedRenterId').val() + '"';//租客id
        var jciFukuanri = '"jciFukuanri":"' + $('#addHrBegin').val() + '"';//付款日
        var jciLabelType = '"jciLabelType":"3"';//临时账单分类
        var random = '"random":"' + parseInt((Math.random() * 9 + 1) * 10000000) + '"';//随机数

        if (inputArray[i].id == "refundDeposit") {
            var jciNature = '"jciNature":"应付"';//账单性质
            var jciType = '"jciType":"租客租金"';//账单类型
            var jciState = '"jciState":"待付"';//账单状态
            var nature = '"nature":"支出"';//收支性质
        } else {
            var jciNature = '"jciNature":"应收"';//账单性质
            var jciType = '"jciType":"租客租金"';//账单类型
            var jciState = '"jciState":"待收"';//账单状态
            var nature = '"nature":"收入"';//收支性质
        }
        strArray = jciRegisterPeople + "," + jciDepartment + "," + jciStorefront + ","
            + jciHouse4storeId + "," + jciLandlordId + "," + jciRenterId + "," + jciNature + ","
            + jciType + "," + jciMoney + "," + jciState + "," + jciFukuanri + "," + paymentType + ","
            + nature + "," + classification + "," + species + "," + jciLabelType + "," + random;
        jciBillJson += '{' + strArray + '},';
        sendMessageNote += $("#" + inputArray[i].id).attr("mType") + "、";
    }
    jciBillJson = '[' + jciBillJson.substring(0, jciBillJson.length - 1) + ']';
	console.log(000000000)
	console.log(jciBillJson)
    sendMessageNote = sendMessageNote.substring(0, sendMessageNote.length - 1) + "。";
    var wholeMonthFeeArray = [];
    wholeMonthFeeArray.push(addPrice,hrTvCharge,hrWifiCharge,jrrManageCost,jrrServerCost,hrOtherPay);
    if($("#advanceMode").val() == 2) {
        for(var i =0;i < wholeMonthFeeArray.length;i++){
            wholeMonthFeeArray[i] = simpleCountBugMonth(addSourceBegin,wholeMonthFeeArray[i]);
        }
    }
    console.log(wholeMonthFeeArray[3]);
    var jciMessageNote = {
        sys: {
            rent: wholeMonthFeeArray[0],
            water: 0.00,
            elect: 0.00,
            gas: 0.00,
            hotWater: 0.00,
            hotAir: 0.00,
            owe: 0.00,
            tv: wholeMonthFeeArray[1],
            wifi: wholeMonthFeeArray[2],
            manager: wholeMonthFeeArray[3],
            server: wholeMonthFeeArray[4],
            other: wholeMonthFeeArray[5],
            power: 0.00,
            damages: 0.00,
            total: "",
        },
        msg: {
            rent: wholeMonthFeeArray[0],
            water: 0.00,
            elect: 0.00,
            gas: 0.00,
            hotWater: 0.00,
            hotAir: 0.00,
            owe: 0.00,
            tv: wholeMonthFeeArray[1],
            wifi: wholeMonthFeeArray[2],
            manager: wholeMonthFeeArray[3],
            server: wholeMonthFeeArray[4],
            other: wholeMonthFeeArray[5],
            power: 0.00,
            damages: 0.00,
            total: 0.00,
        },
        note: sendMessageNote,
        waterThis: 0,
        electThis: 0,
        gasThis: 0,
        hotWaterThis: 0,
        hotAirThis: 0,
        waterLast: 0,
        electLast: 0,
        gasLast: 0,
        hotWaterLast: 0,
        hotAirLast: 0,
        waterDate: "",
        electDate: "",
        gasDate: "",
        hotWaterDate: "",
        hotAirDate: "",
    };
    jciMessageNote = JSON.stringify(jciMessageNote);
	if (profitData.code < 0) {
		myTips(profitData.msg, 'error');
		hideLoading();
		return;
	} else {
		assJson = profitData.body;
	}
	if(hsDepositAmount != '' && hsDespositAccount == ''){
		myTips('定金未设置退款账户', 'error');
		hideLoading();
		return;
	}
	var yesNo = 0;
	var taskTimeConsumingJson = JSON.stringify(datas);
	for(var i in datas){
		if(datas[i].jciMoney != addPrice){
			yesNo = 1;
			break
		}
	}
	var Truce1 = 1;
	var Truce2 = 0;
	var salesman = _loginUserName;
	console.log($('#shorContractMessage2').prop("checked"))
	if($('#shorContractMessage2').prop("checked")){//电子合同
        jciBillJson = JSON.parse(jciBillJson);
        jciBillJson = JSON.stringify(jciBillJson);
        console.log("交租");
        console.log(inAdvancePay);
        console.log(jrrServerCost);
        console.log(addHouseId);
        console.log($('#addHrDepositRenterName').val());
        console.log($('#depositFinancialWay').find('option:selected').text());
        var jsonStrArry = "[{"
            +'"jfPayType":"转账",'
            +'"jfAccountingSpecies":"定金",'
            +'"jfBigType":"押金类",'
            +'"jfNatureOfThe":"支出",'
            +'"jfClosedWay":"' + $('#depositFinancialWay').find('option:selected').text()+ '",'
            +'"jfAccountId":"'+  hsDespositAccount + '",'
            +'"jfRenterId":"",'
            +'"hrManagerUserId":"'+  hrManagerUserId + '",'
            +'"jfLandlordId":"' + addLandlordId + '",'
            +'"jfIntendedId":"' + hsIntentionalId+ '",'
            +'"jfHouse4rentId":"'+""+'",'
            +'"jfHouse4storeId":"' + hsId +'",'
            +'"jfHouseId":"' + addHouseId + '",'
            +'"jfTheCashierPeople":"' + _loginUserId + '",'
            +'"jfBillingDate":"' + formatTime(getNowFormatDate(), 2)+ '",'
            +'"jfHandlers":"' + hsSalesmanId + '",'
            +'"jfTheOwnershipType":"' + '意向人'+ '",'
            +'"jfBelongingToTheName":"' + $('#addHrDepositRenterName').val()+ '",'
            +'"jfSumMoney":"'+ hsDepositAmount + '",'
            +'"jfFinanNote":"'+ "" + '",'
            +'"department":"'+ _loginDepartment + '",'
            +'"storefront":"'+ _loginStore + '",'
            +'"jfOperationRecords":"(' + getNowFormatDate()+ ',添加收支记录)*",'
            +'"jfFinancialCoding":"'
            + formatTime(getNowFormatDate(), 3)
            + Math.floor(Math.random() * 10)
            + Math.floor(Math.random() * 10)
            + Math.floor(Math.random() * 10) + '",'
            +'"jfStartCycle":"'+ hsStartDate + '",'
            +'"jfEndCycle":"' + hsEndDate+ '",'
            +'"jfAccountingWhy":"'
            + addDistrict
            + addZone
            + addSteet
            + addBuildingName
            + addAddBuilding
            + addAddDoorplateno +'",'
            +'}]';
        console.log(jsonStrArry)
		if(yesNo == 1){
			$.messager.defaults = { ok: "继续添加", cancel: "返回检查" };
			$.messager.confirm("账单信息提示", "某期账单金额与租金不相等，继续添加或者返回检查？（当合同期限非整月时，最后一期账单金额与租金不等属正常情况）", function (dataMe) {
				$.messager.defaults = { ok: "确定", cancel: "取消" };
				if(dataMe){
					var insertData = {
                        jsonStrArry         :jsonStrArry,
                        hsDepositAmount     :hsDepositAmount,
                        advanceMode         :advanceMode,
                        jrrUserId   		: _loginUserId,
                        jrrDepartment   	: _loginDepartment,
                        jrrStorefront   	: _loginStore,
                        moveAsset			: JSON.stringify(_moveAsset),
                        jsonArray			: assJson,
                        taskTimeConsumingJson : taskTimeConsumingJson,
                        jciBillJson			:jciBillJson,
						jrrContractType 	: '新增合同',
						jrrHouse4storeId 	: hsId,
						jcdHouseAddress 	: jcdHouseAddress,//地址
						jcdId 				: jrrRenewalCoding,//合同编号
						jrrLandlordId 		: addLandlordId,//房东
						jrrSignedTime 		: addSigned,//签约时间
                        jrrBeginTime        : addSourceBegin,
						jrrEndTime 			: addEnd,//结束时间
						// jrrTheTerm 			: term,//合同期限
						jrrInAdvancePay 	: inAdvancePay,//提前缴租天数
						jrrPaymentMethod 	: jrrPaymentMethod,//收租方式
						jrrMoney 			: addPrice,
						jrrTheContract 		: "新签",
						adminUser 			: "",//主单人
						jrrManageCost 		: jrrManageCost,//物管费
						jrrServerCost 		: jrrServerCost,//租赁服务费
						jrrManagePayment 	: jrrManagePayment,//物管费缴费方式
						jrrServerPayment 	: jrrServerPayment,//租赁服务费缴费方式
						jrrTypeOfContract 	: 2,
						popName 			: renterName,
						popTelephone 		: renterPhone,
                        popIdcard           : renterIdcard,
                        /*已租信息*/
                        hrHouseId			:addHouseId,
                        hrHouseDictId 		:addHouseDictId,
                        hrStorefront		:hrStorefront,

                        hrLandlordId		:addLandlordId,
                        hrSectionType		:addSectionType,
                        hrHouseOwner		:addHouseOwner,
                        hrHouseSquare		:addSquare,
                        hrHouseDirection	:addDirection,
                        hrSplitIdentifier	:hrSplitIdentifier,
                        hrAddCity			:addCity,
                        hrAddDistrict 		:addDistrict,
                        hrAddZone			:addZone,
                        hrAddStreet			:addSteet,
                        hrAddCommunity		:addBuildingName,
                        hrAddBuilding 		:addAddBuilding,
                        hrAddDoorplateno 	:addAddDoorplateno,
                        hrWaterVolFirst		:addWater,
                        hrElectritVolFirst 	:addCtrit,
                        hrGasVolFirst 		:addGas,

                        //tzl
                        hrHotWaterVolFirst 	:addHotWater,
                        hrHotAirVolFirst 	:addHotAir,

                        hrBeginTime			:addSourceBegin,
                        hrTheTerm			:addSourceTerm,
                        hrEndTime			:addEnd,
                        hrHousePrice		:addPrice,
                        hrHouseDeposit		:addDeposit,
                        hrDoorDeposit 		:hrDoorDeposit,
                        hrPowerDeposit		:hrPowerDeposit,
                        hrOtherDeposit		:hrOtherDeposit,
                        hrDoorTrendFee		:addHrDoorTrendFee,
                        hrComServiceFee		:addHrComServiceFee,
                        hrPaymentType 		:jrrPaymentMethod,
                        hrUserId			:_loginUserId,
                        hrAdminUserId 		:addFollowUserId,
                        hrHouseNote			:addHrHouseNote,
                        hrDepartment		:hrDepartment,
                        hrWaterPlan			:hrWaterPlan,
                        hrElectritPlan		:hrElectritPlan,
                        hrGasPlan			:hrGasPlan,
                       /* addHrLockFee		:addHrLockFee,
                        addHrOtherFee		:addHrOtherFee,*/

                        //tzl
                        hrHotwaterPlan      :hrHotwaterPlan,
                        hrHotairPlan        :hrHotairPlan,

                        hrWifiCharge		:hrWifiCharge,
                        hrTvCharge			:hrTvCharge,
                        hrOtherPay			:hrOtherPay,
                        hrManagerUserId		:hrManagerUserId,//
                        hrFlatShareLogo		:hrFlatShareLogo,
					}
					console.log(insertData);
                    var insertDataStr = JSON.stringify(insertData);
					// 拼凑好合同数据
					var ectTemplateFillValue = '{"jsonVal":[{"contractNo":"","idcard":"'
						+ renterIdcard + '","renant":"' + renterName
						+ '","agent":"","mailingAddress":"","rentalAddress":"'
						+ jcdHouseAddress + '","capitalAmount":"' + capitalAmount
						+ '","telphone":"' + renterPhone + '","email":"","squareMeter":"'
						+ addSquare + '","houseType":"' + addSectionType
						+ '","beginDate":"' + addSourceBegin + '","endDate":"' + addEnd
						+ '","lowercaseAmount":"' + addPrice
						+ '","serviceFee":"' + jrrServerCost + '","rentType":"'
						+ jrrPaymentMethod + '","paymentDate":"' + inAdvancePay
						+ '","deliveryDay":"' + deliveryDay + '","Truce1":"' + Truce1
						+ '","Truce2":"' + Truce2 + '","waterNum":"' + addWater
						+ '","electricityNum":"' + addCtrit + '","gasNum":"'
						+ addGas + '","remark":"' + popNameRemark
						+ '","Signer1":"","salesman":"' + salesman
						+ '","signingDate":"' + addSigned
						+ '","Signer2":""}],"insertData":' + insertDataStr
						+ ',"lastHouseDeposit":""'
						+ ',"wxgzhImgPath":""}';
					$.post('../rentalContract.action',{
						/*租客信息*/
						renterUserId		: _loginUserId,
						renterDepartment	: _loginDepartment,
						renterStorefront	: _loginStore,
						popName 			: renterName,
						popTelephone 		: renterPhone,
						popIdcard 			: renterIdcard,
						userId				: _loginUserId,
                        popUser		    	: _loginUserId,
						popNameRemark       : popNameRemark,
						popBirth			: renterBirth,
						popNation			: renterNation,
						popIdcardAddress	: renterIdcardAddress,
						popSex				: renterSex,
						popIdcardJson		: popIdcardJson,
						/**/
						ectUserCode         : ectUserCode,
						ectIdCard           : renterIdcard,
						ectOperatingId      : _loginUserId,
						ectName             : renterName,
						ectTelphone         : renterPhone,
						ectTemplateFillValue: ectTemplateFillValue,
						ectHsId             : hsId,
					},function(data){
						console.log(data)
						var js = {"hsId":hsId,};
						var jsStr = JSON.stringify(js);
                        console.log(data.code)
						if(data.code == 1){
							/*var messageStr = '尊敬的'+renterName+"，您好！我们已接到您"+jcdHouseAddress+"的新签申请，请点击链接在线签署:"+data.body;
							$.post('http://www.fangzhizun.com/jiekou/campus/sendOut/ShortMessage',{
								co			: _loginCompany,
								coId		: _loginCoId,
								telephone	: renterPhone,
								messageStr	: messageStr,
								js			: jsStr,
								inOutType	: "2",
							},function(data){
								if(data.code > 0){
                                    myTips("发送短信成功，请注意查收！","success");
									setTimeout(function(){
									}, 1000);
                                }else{
                                    myTips("发送短信失败！","error");
                                }
                            })*/
                            myTips("发送短信成功，请注意查收！","success");
                            parent.$('#addRentDlg').dialog('close');
                        }else{
                            myTips("新增合同失败！","error");
                        }
                    })
				}
			});
		}else{
            var insertData = {
                jsonStrArry         :jsonStrArry,
                hsDepositAmount     :hsDepositAmount,
                advanceMode         :advanceMode,
                jrrUserId   		: _loginUserId,
                jrrDepartment   	: _loginDepartment,
                jrrStorefront   	: _loginStore,
                moveAsset			: JSON.stringify(_moveAsset),
                jsonArray			: assJson,
                taskTimeConsumingJson : taskTimeConsumingJson,
                jciBillJson			:jciBillJson,
                jrrContractType 	: '新增合同',
                jrrHouse4storeId 	: hsId,
                jcdHouseAddress 	: jcdHouseAddress,//地址
                jcdId 				: jrrRenewalCoding,//合同编号
                jrrLandlordId 		: addLandlordId,//房东
                jrrSignedTime 		: addSigned,//签约时间
                jrrBeginTime        : addSourceBegin,//开始时间
                jrrEndTime 			: addEnd,//结束时间
                /*jrrTheTerm 			: term,//合同期限*/
                jrrInAdvancePay 	: inAdvancePay,//提前缴租天数
                jrrPaymentMethod 	: jrrPaymentMethod,//收租方式
                jrrMoney 			: addPrice,
                jrrTheContract 		: "新签",
                adminUser 			: "",//主单人
                jrrManageCost 		: jrrManageCost,//物管费
                jrrServerCost 		: jrrServerCost,//租赁服务费
                jrrManagePayment 	: jrrManagePayment,//物管费缴费方式
                jrrServerPayment 	: jrrServerPayment,//租赁服务费缴费方式
                jrrTypeOfContract 	: 2,
                popName 			: renterName,
                popTelephone 		: renterPhone,
                popIdcard 			: renterIdcard,
                /*已租信息*/
                hrHouseId			:addHouseId,
                hrHouseDictId 		:addHouseDictId,
                hrStorefront		:hrStorefront,

                hrLandlordId		:addLandlordId,
                hrSectionType		:addSectionType,
                hrHouseOwner		:addHouseOwner,
                hrHouseSquare		:addSquare,
                hrHouseDirection	:addDirection,
                hrSplitIdentifier	:hrSplitIdentifier,
                hrAddCity			:addCity,
                hrAddDistrict 		:addDistrict,
                hrAddZone			:addZone,
                hrAddStreet			:addSteet,
                hrAddCommunity		:addBuildingName,
                hrAddBuilding 		:addAddBuilding,
                hrAddDoorplateno 	:addAddDoorplateno,
                hrWaterVolFirst		:addWater,
                hrElectritVolFirst 	:addCtrit,
                hrGasVolFirst 		:addGas,

                //tzl
                hrHotWaterVolFirst 	:addHotWater,
                hrHotAirVolFirst 	:addHotAir,

                hrBeginTime			:addSourceBegin,
                hrTheTerm			:addSourceTerm,
                hrEndTime			:addEnd,
                hrHousePrice		:addPrice,
                hrHouseDeposit		:addDeposit,
                hrDoorDeposit 		:hrDoorDeposit,
                hrPowerDeposit		:hrPowerDeposit,
                hrOtherDeposit		:hrOtherDeposit,
                hrDoorTrendFee		:addHrDoorTrendFee,
                hrComServiceFee		:addHrComServiceFee,
                hrPaymentType 		:jrrPaymentMethod,
                hrUserId			:_loginUserId,
                hrAdminUserId 		:addFollowUserId,
                hrHouseNote			:addHrHouseNote,
                hrDepartment		:hrDepartment,
                hrWaterPlan			:hrWaterPlan,
                hrElectritPlan		:hrElectritPlan,
                hrGasPlan			:hrGasPlan,
                addHrLockFee		:addHrLockFee,
                addHrOtherFee		:addHrOtherFee,

                //tzl
                hrHotwaterPlan      :hrHotwaterPlan,
                hrHotairPlan        :hrHotairPlan,

                hrWifiCharge		:hrWifiCharge,
                hrTvCharge			:hrTvCharge,
                hrOtherPay			:hrOtherPay,
                hrManagerUserId		:hrManagerUserId,//
                hrFlatShareLogo		:hrFlatShareLogo,
            }
            console.log(insertData);
            var insertDataStr = JSON.stringify(insertData);
            // 拼凑好合同数据
            var ectTemplateFillValue = '{"jsonVal":[{"contractNo":"","idcard":"'
                + renterIdcard + '","renant":"' + renterName
                + '","agent":"","mailingAddress":"","rentalAddress":"'
                + jcdHouseAddress + '","capitalAmount":"' + capitalAmount
                + '","telphone":"' + renterPhone + '","email":"","squareMeter":"'
                + addSquare + '","houseType":"' + addSectionType
                + '","beginDate":"' + addSourceBegin + '","endDate":"' + addEnd
                + '","lowercaseAmount":"' + addPrice
                + '","serviceFee":"' + jrrServerCost + '","rentType":"'
                + jrrPaymentMethod + '","paymentDate":"' + inAdvancePay
                + '","deliveryDay":"' + deliveryDay + '","Truce1":"' + Truce1
                + '","Truce2":"' + Truce2 + '","waterNum":"' + addWater
                + '","electricityNum":"' + addCtrit + '","gasNum":"'
                + addGas + '","remark":"' + popNameRemark
                + '","Signer1":"","salesman":"' + salesman
                + '","signingDate":"' + addSigned
                + '","Signer2":""}],"insertData":' + insertDataStr
                + ',"lastHouseDeposit":""'
                + ',"wxgzhImgPath":""}';
            $.post('../rentalContract.action',{
                /*租客信息*/
                renterUserId		: _loginUserId,
                renterDepartment	: _loginDepartment,
                renterStorefront	: _loginStore,
                popName 			: renterName,
                popTelephone 		: renterPhone,
                popIdcard 			: renterIdcard,
                userId				: _loginUserId,
                popNameRemark       : popNameRemark,
                popBirth			: renterBirth,
                popNation			: renterNation,
                popIdcardAddress	: renterIdcardAddress,
                popSex				: renterSex,
                popIdcardJson		: popIdcardJson,
                /**/
                ectUserCode         : ectUserCode,
                ectIdCard           : renterIdcard,
                ectOperatingId      : _loginUserId,
                ectName             : renterName,
                ectTelphone         : renterPhone,
                ectTemplateFillValue: ectTemplateFillValue,
                ectHsId             : hsId,
            },function(data){
                console.log(data)
                var js = {
                    "hsId":hsId,
                };
                var jsStr = JSON.stringify(js);
                console.log(data.code)
                if(data.code == 1){
                    /*var messageStr = '尊敬的'+renterName+"，您好！我们已接到您"+jcdHouseAddress+"的新签申请，请点击链接在线签署:"+data.body;
                    $.post('http://www.fangzhizun.com/jiekou/campus/sendOut/ShortMessage',{
                        co			: _loginCompany,
                        coId		: _loginCoId,
                        telephone	: renterPhone,
                        messageStr	: messageStr,
                        js			: jsStr,
                        inOutType	: "2",
                    },function(data){
                        if(data.code > 0){
                            myTips("发送短信成功，请注意查收！","success");
                            setTimeout(function(){
                            }, 1000);
                        }else{
                            myTips("发送短信失败！","error");
                        }
                    });*/

                    myTips("发送短信成功，请注意查收！","success");
                    parent.$('#addRentDlg').dialog('close');
                }else{
                    myTips("新增合同失败！","error");
                }
            })
		}
	}else{
        //remark:合同备注
        if(yesNo == 1){
            $.messager.defaults = { ok: "继续添加", cancel: "返回检查" };
            $.messager.confirm("账单信息提示", "某期账单金额与租金不相等，继续添加或者返回检查？（当合同期限非整月时，最后一期账单金额与租金不等属正常情况）", function (dataMe) {
                $.messager.defaults = { ok: "确定", cancel: "取消" };
                if(dataMe){
                    showLoading();
                    $.post("../insertHouseForRent.action", {
                        //新增已租部分 数据
                        jciMessageNote		:jciMessageNote,
                        jciBillJson			:jciBillJson,
                        hrHouse4storeId 	:hsId,
                        hsMicronetIdentification:hsMicronetIdentification,
                        hrHouseId			:addHouseId,
                        hrHouseDictId 		:addHouseDictId,
                        hrLandlordId		:addLandlordId,
                        hrSectionType		:addSectionType,
                        hrHouseOwner		:addHouseOwner,
                        hrHouseSquare		:addSquare,
                        hrHouseDirection	:addDirection,
                        hrSplitIdentifier	:hrSplitIdentifier,
                        hrAddCity			:addCity,
                        hrAddDistrict 		:addDistrict,
                        hrAddZone			:addZone,
                        hrAddStreet			:addSteet,
                        hrAddCommunity		:addBuildingName,
                        hrAddBuilding 		:addAddBuilding,
                        hrAddDoorplateno 	:addAddDoorplateno,
                        hrWaterVolFirst		:addWater,
                        hrElectritVolFirst 	:addCtrit,
                        hrGasVolFirst 		:addGas,

                        //tzl
                        hrHotWaterVolFirst 	:addHotWater,
                        hrHotAirVolFirst 	:addHotAir,

                        hrBeginTime			:addSourceBegin,
                        hrTheTerm			:addSourceTerm,
                        hrEndTime			:addEnd,
                        hrHousePrice		:addPrice,
                        hrHouseDeposit		:addDeposit,
                        hrDoorDeposit 		:hrDoorDeposit,
                        hrPowerDeposit		:hrPowerDeposit,
                        hrOtherDeposit		:hrOtherDeposit,
                        hrDoorTrendFee		:addHrDoorTrendFee,
                        hrComServiceFee		:addHrComServiceFee,
                        addHrLockFee		:addHrLockFee,
                        addHrOtherFee		:addHrOtherFee,
                        hrPaymentType 		:jrrPaymentMethod,
                        hrUserId			:_loginUserId,
                        hrAdminUserId 		:addFollowUserId,
                        hrHouseNote			:addHrHouseNote,
                        hrStorefront		:hrStorefront,
                        hrDepartment		:hrDepartment,
                        hrWaterPlan			:hrWaterPlan,
                        hrElectritPlan		:hrElectritPlan,
                        hrGasPlan			:hrGasPlan,

                        //tzl
                        hrHotwaterPlan      :hrHotwaterPlan,
                        hrHotairPlan        :hrHotairPlan,

                        hrWifiCharge		:hrWifiCharge,
                        hrTvCharge			:hrTvCharge,
                        hrOtherPay			:hrOtherPay,
                        hrManagerUserId		:hrManagerUserId,//
                        hrFlatShareLogo		:hrFlatShareLogo,
                        //新增租客部分 数据
                        renterPopName 		: renterName,
                        renterPopTelephone 	: renterPhone,
                        renterPopIdcard 	: renterIdcard,
                        renterUserId		: _loginUserId,
                        renterDepartment	: _loginDepartment,
                        renterStorefront	: _loginStore,
                        popNameRemark       : popNameRemark,
                        popBirth			: renterBirth,
                        popNation			: renterNation,
                        popIdcardAddress	: renterIdcardAddress,
                        popSex				: renterSex,
                        popIdcardJson		: popIdcardJson,
                        //新增租客合约部分 数据
                        jrrHouse4storeId	: hsId,
                        jrrLandlordId		: addLandlordId,
                        jrrSignedTime 		: addSigned,
                        jrrBeginTime 		: addSourceBegin,
                        jrrEndTime 			: addEnd,
                        jrrUserId 			: _loginUserId,
                        jrrDepartment		: _loginDepartment,
                        jrrStorefront		: _loginStore,
                        jrrContractType 	: addContractType,
                        jrrTheTerm 			: addSourceTerm,
                        jrrInAdvancePay 	: inAdvancePay,
                        jrrPaymentMethod 	: jrrPaymentMethod,
                        jrrMoney 			: addPrice,
                        jrrRenewalCoding	: jrrRenewalCoding,
                        jcdId				: jcdId,
                        adminUser			: addFollowUserId,
                        jrrManageCost		: jrrManageCost,
                        jrrServerCost		: jrrServerCost,
                        jrrManagePayment	: jrrManagePayment,
                        jrrServerPayment	: jrrServerPayment,
                        taskTimeConsumingJson : taskTimeConsumingJson,
                        advanceMode         : advanceMode,
                        jrrTypeOfContract	: 1,
                        //意向人修改
                        ipId				: intentionalId,
                        //已租房业绩受益人
                        jsonArray			: assJson,
                        //资产
                        moveSaId			: _moveSaId,
                        moveAsset			: JSON.stringify(_moveAsset),
                        att					: $("#att").val(),
                    },function(data){
                        if(data.code<0){
                            if(data.code < 0){
                                myTips(data.msg,"error");
                            }
                            hideLoading();
                            return;
                        }
                        isSave = true;
                        var houseforRentFollowRemark = "普通签约：已租房" + jcdHouseAddress+ "签约成功。";
                        $.post("../insertHousingFollow.action", {
                            jhfDepartment			:_loginDepartment,
                            jhfStorefront			:_loginStore,
                            jhfHouse4rentId 		: parseInt(data.body[0].hrId),
                            jhfHouse4storeId 		: hsId,
                            jhfHouseId				: addHouseId,
                            jhfFollowRemark 		: houseforRentFollowRemark,
                            jhfFollowResult 		: '签约成功',
                            jhfPaymentWay 			: '系统跟进',
                            jhfUserId 				: _loginUserId
                        },function(){
                            _indexNum[0] = 0;

                            if(homeState.substr(0,6) == 'noRent'){
                                parent.queryTrusteeship(1,0);
                            }else{
                                parent.querySourceInfo(1,0);
                            }
                            myTips("添加成功！","success");
                            hideLoading();
                            setTimeout(function(){
                                parent.$('#addRentDlg').dialog('close');
                            }, 1000);

                        });
                        if(hsDepositAmount!=''&&hsDepositAmount!=0){//0!=''  返回false
                            var jfFinanNote =  addBuildingName  + addAddBuilding + addAddDoorplateno
                                + "房进行出房操作,变为已租房。将租客意向人 "+ $('#addHrDepositRenterName').val() +"的定金 "+hsDepositAmount+"元进行退还。";

                            var jsonStrArry = "[{"
                                +'"jfPayType":"转账",'
                                +'"jfAccountingSpecies":"定金",'
                                +'"jfBigType":"押金类",'
                                +'"jfNatureOfThe":"支出",'
                                +'"jfClosedWay":"' + $('#depositFinancialWay').find('option:selected').text()+ '",'
                                +'"jfAccountId":"'+  hsDespositAccount + '",'
                                +'"jfRenterId":"",'
                                +'"hrManagerUserId":"'+  hrManagerUserId + '",'
                                +'"jfLandlordId":"' + addLandlordId + '",'
                                +'"jfIntendedId":"' + hsIntentionalId+ '",'
                                +'"jfHouse4rentId":"'+parseInt(data.body[0].hrId)+'",'
                                +'"jfHouse4storeId":"' + hsId +'",'
                                +'"jfHouseId":"' + addHouseId + '",'
                                +'"jfTheCashierPeople":"' + _loginUserId + '",'
                                +'"jfBillingDate":"' + formatTime(getNowFormatDate(), 2)+ '",'
                                +'"jfHandlers":"' + hsSalesmanId + '",'
                                +'"jfTheOwnershipType":"' + '意向人'+ '",'
                                +'"jfBelongingToTheName":"' + $('#addHrDepositRenterName').val()+ '",'
                                +'"jfSumMoney":"'+ hsDepositAmount + '",'
                                +'"jfFinanNote":"'+ jfFinanNote + '",'
                                +'"department":"'+ _loginDepartment + '",'
                                +'"storefront":"'+ _loginStore + '",'
                                +'"jfOperationRecords":"(' + getNowFormatDate()+ ',添加收支记录)*",'
                                +'"jfFinancialCoding":"'
                                + formatTime(getNowFormatDate(), 3)
                                + Math.floor(Math.random() * 10)
                                + Math.floor(Math.random() * 10)
                                + Math.floor(Math.random() * 10) + '",'
                                +'"jfStartCycle":"'+ hsStartDate + '",'
                                +'"jfEndCycle":"' + hsEndDate+ '",'
                                +'"jfAccountingWhy":"'
                                + addDistrict
                                + addZone
                                + addSteet
                                + addBuildingName
                                + addAddBuilding
                                + addAddDoorplateno +'",'
                                +'}]';
                            $.post("../insertFinancialDeposit.action",{
                                jsonArray : jsonStrArry
                            },function(finaData) {

                            });
                            $.post("../clearDeposit.action", {
                                hsId:hsId,
                                splitFlag:4
                            }, function(cdDataj) {

                            });
                        }
                    });
                }else {
                    hideLoading();
                    return;
                }
            });
        }else{
            showLoading();

            // return;
            $.post("../insertHouseForRent.action", {
                //新增已租部分 数据
                jciMessageNote		:jciMessageNote,
                hrHouse4storeId 	:hsId,
                hrHouseId			:addHouseId,
                hrHouseDictId 		:addHouseDictId,
                hrLandlordId		:addLandlordId,
                hrSectionType		:addSectionType,
                hrHouseOwner		:addHouseOwner,
                hrHouseSquare		:addSquare,
                hrHouseDirection	:addDirection,
                hrSplitIdentifier	:hrSplitIdentifier,
                hrAddCity			:addCity,
                hrAddDistrict 		:addDistrict,
                hrAddZone			:addZone,
                hrAddStreet			:addSteet,
                hrAddCommunity		:addBuildingName,
                hrAddBuilding 		:addAddBuilding,
                hrAddDoorplateno 	:addAddDoorplateno,
                hrWaterVolFirst		:addWater,
                hrElectritVolFirst 	:addCtrit,
                hrGasVolFirst 		:addGas,

                //tzl
                hrHotWaterVolFirst 	:addHotWater,
                hrHotAirVolFirst 	:addHotAir,


                hrBeginTime			:addSourceBegin,
                hrTheTerm			:addSourceTerm,
                hrEndTime			:addEnd,
                hrHousePrice		:addPrice,
                hrHouseDeposit		:addDeposit,
                hrDoorDeposit 		:hrDoorDeposit,
                hrPowerDeposit		:hrPowerDeposit,
                hrOtherDeposit		:hrOtherDeposit,
                hrDoorTrendFee		:addHrDoorTrendFee,
                hrComServiceFee		:addHrComServiceFee,
                addHrLockFee		:addHrLockFee,
                addHrOtherFee		:addHrOtherFee,
                hrPaymentType 		:jrrPaymentMethod,
                hrUserId			:_loginUserId,
                hrAdminUserId 		:addFollowUserId,
                hrHouseNote			:addHrHouseNote,
                hrStorefront		:hrStorefront,
                hrDepartment		:hrDepartment,
                hrWaterPlan			:hrWaterPlan,
                hrElectritPlan		:hrElectritPlan,
                hrGasPlan			:hrGasPlan,

                //tzl
                hrHotwaterPlan      :hrHotwaterPlan,
                hrHotairPlan        :hrHotairPlan,


                hrWifiCharge		:hrWifiCharge,
                hrTvCharge			:hrTvCharge,
                hrOtherPay			:hrOtherPay,
                hrManagerUserId		:hrManagerUserId,
                hrFlatShareLogo		:hrFlatShareLogo,
                //新增租客部分 数据
                renterPopName 		: renterName,
                renterPopTelephone 	: renterPhone,
                renterPopIdcard 	: renterIdcard,
                renterUserId		: _loginUserId,
                renterDepartment	: _loginDepartment,
                renterStorefront	: _loginStore,
                popNameRemark       : popNameRemark,
                popIdcardJson		: popIdcardJson,
                //新增租客合约部分 数据
                jrrHouse4storeId	: hsId,
                jrrLandlordId		: addLandlordId,
                jrrSignedTime 		: addSigned,
                jrrBeginTime 		: addSourceBegin,
                jrrEndTime 			: addEnd,
                jrrUserId 			: _loginUserId,
                jrrDepartment		: _loginDepartment,
                jrrStorefront		: _loginStore,
                jrrContractType 	: addContractType,
                jrrTheTerm 			: addSourceTerm,
                //jrrInAdvancePay 	: inAdvancePay,
                jrrPaymentMethod 	: jrrPaymentMethod,
                jrrMoney 			: addPrice,
                jrrRenewalCoding	: jrrRenewalCoding,
                jcdId				: jcdId,
                adminUser			: addFollowUserId,
                jrrManageCost		: jrrManageCost,
                jrrServerCost		: jrrServerCost,
                jrrManagePayment	: jrrManagePayment,
                jrrServerPayment	: jrrServerPayment,
                taskTimeConsumingJson : taskTimeConsumingJson,
                advanceMode         : advanceMode,
                jrrTypeOfContract	: 1,
                //意向人修改
                ipId				: intentionalId,
                //已租房业绩受益人
                jsonArray			: assJson,
                //资产
                moveSaId			: _moveSaId,
                moveAsset			: JSON.stringify(_moveAsset),
                att					: $("#att").val(),
                jciBillJson			:jciBillJson,
            },function(data){
                if(data.code<0){
                    if(data.code < 0){
                        myTips(data.msg,"error");
                    }
                    hideLoading();
                    return;
                }
                isSave = true;
                var houseforRentFollowRemark = "已租房房源编号为：" + parseInt(data.body[0].hrId)+ "签约租赁。";
                $.post("../insertHousingFollow.action", {
                    jhfDepartment			:_loginDepartment,
                    jhfStorefront			:_loginStore,
                    jhfHouse4rentId 		: parseInt(data.body[0].hrId),
                    jhfHouse4storeId 		: hsId,
                    jhfHouseId				: addHouseId,
                    jhfFollowRemark 		: houseforRentFollowRemark,
                    jhfFollowResult 		: '签约成功',
                    jhfPaymentWay 			: '系统跟进',
                    jhfUserId 				: _loginUserId
                },function(){
                    _indexNum[0] = 0;
                    if(homeState.substr(0,6)== 'noRent'){
                        parent.queryTrusteeship(1,0);
                    }else{
                        parent.querySourceInfo(1,0);
                    }
                    myTips("添加成功！","success");
                    hideLoading();
                    setTimeout(function(){
                        parent.$('#addRentDlg').dialog('close');
                    }, 1000);
                });

                if(hsDepositAmount!=''&&hsDepositAmount!=0){//0!=''  返回false
                    var jfFinanNote =  addBuildingName  + addAddBuilding + addAddDoorplateno
                        + "房进行出房操作,变为已租房。将租客意向人 "+ $('#addHrDepositRenterName').val() +"的定金 "+hsDepositAmount+"元进行退还。";

                    var jsonStrArry = "[{"
                        +'"jfPayType":"转账",'
                        +'"jfAccountingSpecies":"定金",'
                        +'"jfBigType":"押金类",'
                        +'"jfNatureOfThe":"支出",'
                        +'"jfClosedWay":"' + $('#depositFinancialWay').find('option:selected').text()+ '",'
                        +'"jfAccountId":"'+  hsDespositAccount + '",'
                        +'"jfRenterId":"",'
                        +'"jfLandlordId":"' + addLandlordId + '",'
                        +'"jfIntendedId":"' + hsIntentionalId+ '",'
                        +'"jfHouse4rentId":"'+parseInt(data.body[0].hrId)+'",'
                        +'"jfHouse4storeId":"' + hsId +'",'
                        +'"jfHouseId":"' + addHouseId + '",'
                        +'"jfTheCashierPeople":"' + _loginUserId + '",'
                        +'"jfBillingDate":"' + formatTime(getNowFormatDate(), 2)+ '",'
                        +'"jfHandlers":"' + hsSalesmanId + '",'
                        +'"jfTheOwnershipType":"' + '意向人'+ '",'
                        +'"jfBelongingToTheName":"' + $('#addHrDepositRenterName').val()+ '",'
                        +'"jfSumMoney":"'+ hsDepositAmount + '",'
                        +'"jfFinanNote":"'+ jfFinanNote + '",'
                        +'"department":"'+ _loginDepartment + '",'
                        +'"storefront":"'+ _loginStore + '",'
                        +'"jfOperationRecords":"(' + getNowFormatDate()+ ',添加收支记录)*",'
                        +'"jfFinancialCoding":"'
                        + formatTime(getNowFormatDate(), 3)
                        + Math.floor(Math.random() * 10)
                        + Math.floor(Math.random() * 10)
                        + Math.floor(Math.random() * 10) + '",'
                        +'"jfStartCycle":"'+ hsStartDate + '",'
                        +'"jfEndCycle":"' + hsEndDate+ '",'
                        +'"jfAccountingWhy":"'
                        + addDistrict
                        + addZone
                        + addSteet
                        + addBuildingName
                        + addAddBuilding
                        + addAddDoorplateno +'",'
                        +'}]';

                    $.post("../insertFinancialDeposit.action",{
                        jsonArray : jsonStrArry
                    },function(finaData) {

                    });
                    $.post("../clearDeposit.action", {
                        hsId:hsId,
                    }, function(cdData) {

                    });
                }
            });
        }
    }
}

function getCurrentMonthLast(date) {
    var currentMonth = date.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    var lastTime = new Date(nextMonthFirstDay - oneDay);
    var month = parseInt(lastTime.getMonth() + 1);
    var day = lastTime.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return new Date(date.getFullYear() + '-' + month + '-' + day);
}

//预生成账单
function preGeneratingBill() {
    // 合同
    var addSourceBegin = $('#addHrBegin').val();
    var addEnd = $('#addHrEnd').val();
    var term = getYearMonthDay(addSourceBegin, addEnd);
    var addSourceTerm = term[0] + '年' + term[1] + '月' + term[2] + '日';
    var addSigned = $('#addHrSigned').val();
    var inAdvancePay = $("#addHrInAdvancePay").val();//收款日期
    var addContractType = $('#addHrContractType').find("option:selected").text();
    // 费用
    var addPrice = $('#addHrRentPrice').val();//租金
    var jrrPaymentMethod = $("#addHrRentPaymentType").find("option:selected").text();
    var jrrManageCost = $('#addHrManageCost').val();//物管费
    var jrrManagePayment = $('#addHrManagePayment').find("option:selected").text();
    var jrrServerCost = $('#addHrServerCost').val();//服务费
    var jrrServerPayment = $('#addHrServerPayment').find("option:selected").text();
    var wifiCost = $('#addHrWifiCharge').val();//网络费
    var wifiPayment = $("#addHrWifiChargePayment").find("option:selected").text();
    var tvCost = $('#addHrTvCharge').val();//电视费
    var tvPayment = $("#addHrTvChargePayment").find("option:selected").text();
    var otherCost = $('#addHrOtherPay').val();//其他费
    var otherPayment = $("#addHrOtherPayment").find("option:selected").text();
    var hsId = $("#addHrHsId").val();//未租id
    var addLandlordId = $("#addHrLandlordId").val();//房东id
    var jrrRenewalCoding = $('#addHrContractNum').val();//合同编号
    var jcdId = $('#addHrContractNumCheckoutIf').val();
    //签约账单总金额
    var totalFee = $('#totalFee').val();
    if($("#advanceMode").val() == 2) {
        var exceptRentAndRefund = mySub(totalFee, countBugMonth(addSourceBegin, 3));//除租金其他费用
    }else{
        var exceptRentAndRefund = mySub(totalFee, addPrice);//除租金其他费用
    }
    //业务员
    var addFollowUserId = $('#addHrSalesmanGetUserId').val();
    var addBuildingName = $("#addHrDlg .hsAddCommunity").eq(0).html();
    var addAddBuilding = $("#addHrDlg .hsAddBuilding").eq(0).html();
    var addAddDoorplateno = $("#addHrDlg .hsAddDoorplateno").eq(0).html();
    var jcdHouseAddress = addBuildingName + " " + addAddBuilding + " " + addAddDoorplateno;
    //提前交租方式
    var advanceMode = $('#advanceMode').val();
    var numberMode = $('#numberMode').val();

    var refundDeposit = $('#refundDeposit').val() == '' ? 0 : parseFloat($('#refundDeposit').val());
    $.post("../preGeneratingBill.action", {
        jrrHouse4storeId: hsId,
        jrrLandlordId: addLandlordId,
        jrrSignedTime: addSigned,
        jrrBeginTime: addSourceBegin,
        jrrEndTime: addEnd,
        jrrUserId: _loginUserId,
        jrrDepartment: _loginDepartment,
        jrrStorefront: _loginStore,
        jrrContractType: addContractType,
        jrrTheTerm: addSourceTerm,
        jrrInAdvancePay: inAdvancePay, //收款日期
        jrrPaymentMethod: jrrPaymentMethod,
        jrrMoney: addPrice,
        jrrRenewalCoding: jrrRenewalCoding,
        //jcdId				: jcdId,
        //adminUser			: addFollowUserId,
        //jcdHouseAddress	: jcdHouseAddress,
        jrrManageCost: jrrManageCost,
        jrrServerCost: jrrServerCost,
        jrrManagePayment: jrrManagePayment,
        jrrServerPayment: jrrServerPayment,
        advanceMode: advanceMode,
        numberMode: numberMode,
        contractBillTotal: Math.abs(totalFee).toFixed(2),
        refundDeposit: refundDeposit,
        // totalMoney          : Math.abs(totalMoney).toFixed(2),
        exceptRentAndRefund: exceptRentAndRefund
    }, function (data) {
        if (data.code < 0) {
            $('#preGeneratingBillTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
            return;
        }
        data = data.body;
        $("#addHrManageCostHide").val(data[0].jciManageCost);
        $("#addHrServerCostHide").val(data[0].jciServerCost);
//		console.log(data);
        $("#preGeneratingBillTable").datagrid("loadData", data);
    });
}

//计算合同期限
function changeAddHrContDate() {
    var begin = $('#addHrBegin').val();
    var end = $('#addHrEnd').val();

    if (begin == '' || end == '') {
        $('#addHrTerm').html('');
    } else {
        var term = getYearMonthDay(begin, end);
        $('#addHrTerm').html('（' + term[0] + '年' + term[1] + '月' + term[2] + '日' + '）');
    }
}
//判断合同期限时间与托管时间
function wdateEnd() {
    var begin = $('#addHrBegin').val();
    var end = $('#addHrEnd').val();
    //判断合约结束期限是否大于托管到期时间
    var addHrLandlordCheckEnd = $('#addHrLandlordCheckEnd').val();	 //托管结束时间
    var contractRiskControl = $('#contractRiskControl').val();		//合同风控开关
    var now = new Date(addHrLandlordCheckEnd);
    var endTime = now.setMonth(now.getMonth() - 7);						//托管时间-半年时间
    var endData = new Date(endTime).format("yyyy-MM-dd");
    if (contractRiskControl == 1) {
        if (addHrLandlordCheckEnd == end || endData > end) {
            if (begin == '' || end == '') {
                $('#addHrTerm').html('');
            } else {
                var term = getYearMonthDay(begin, end);
                $('#addHrTerm').html('（' + term[0] + '年' + term[1] + '月' + term[2] + '日' + '）');
            }
        }
        if (addHrLandlordCheckEnd < end) {
            $('#addHrEnd').val("");
            $('#addHrTerm').html("");
            $.messager.alert("操作提示", "合约结束期限不能大于托管到期时间" + addHrLandlordCheckEnd + ",请重新选择时间");
            //	myTips("合约结束期限不能大于托管到期时间"+addHrLandlordCheckEnd+",请重新选择时间","error");

        }
        if (endData < end && addHrLandlordCheckEnd > end) {
            $('#addHrEnd').val("");
            $('#addHrTerm').html("");
            $.messager.alert("操作提示", "合约结束期限距离托管到期时间不足半年,请重新选择时间");
        }

    } else if (contractRiskControl == 2) {
        if (addHrLandlordCheckEnd == end || endData > end) {
            if (begin == '' || end == '') {
                $('#addHrTerm').html('');
            } else {
                var term = getYearMonthDay(begin, end);
                $('#addHrTerm').html('（' + term[0] + '年' + term[1] + '月' + term[2] + '日' + '）');
            }
        }
        if (addHrLandlordCheckEnd < end) {
            $.messager.confirm("操作提示", "合约结束期限不能大于托管到期时间" + addHrLandlordCheckEnd + ",是否继续执行？", function (data) {
                if (data) {
                    if (begin == '' || end == '') {
                        $('#addHrTerm').html('');
                    } else {
                        var term = getYearMonthDay(begin, end);
                        $('#addHrTerm').html('（' + term[0] + '年' + term[1] + '月' + term[2] + '日' + '）');
                    }
                } else {
                    $('#addHrEnd').val("");
                    $('#addHrTerm').html("");
                    return;
                }
            });
        }
        if (endData < end && addHrLandlordCheckEnd > end) {
            console.log(endData);
            $.messager.confirm("操作提示", "合约结束期限距离托管到期时间不足半年,是否继续执行？", function (data) {
                if (data) {
                    if (begin == '' || end == '') {
                        $('#addHrTerm').html('');
                    } else {
                        var term = getYearMonthDay(begin, end);
                        $('#addHrTerm').html('（' + term[0] + '年' + term[1] + '月' + term[2] + '日' + '）');
                    }
                } else {
                    $('#addHrEnd').val("");
                    $('#addHrTerm').html("");
                    return;
                }
            });
        }
    }
}
//查询变量设置
function contractRiskControl() {
    $.post("../selectSysVariables.action", {
        variablesId: 1
    }, function (data) {
        if (data.code < 0) {
            $.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
            return;
        }
        data = data.body;
        for (var i in data) {
            $('#contractRiskControl').val(data[i].contractRiskControl);
        }
    })
}
//判断成交价格是否低于指导价格
function numberRisk() {
    var contractRiskControl = $('#contractRiskControl').val();		//合同风控开关
    var addHrGuidePrice = $("#addHrGuidePrice").val();			   //指导价格
    var addHrRentPrice = $("#addHrRentPrice").val();					//租金价格

    console.log("指导价格" + addHrGuidePrice);
    console.log("租金价格" + addHrRentPrice);
    if (contractRiskControl == 1) {
        if (parseInt(addHrRentPrice) < parseInt(addHrGuidePrice)) {
            $("#addHrRentPrice").val("");
            $.messager.alert("操作提示", "租金价格不能低于指导价格：" + addHrGuidePrice + ",请重新输入");

        }
    } else if (contractRiskControl == 2) {
        if (parseInt(addHrRentPrice) < parseInt(addHrGuidePrice)) {
            $.messager.confirm("操作提示", "租客租金低于本房源当前的指导价格：" + addHrGuidePrice + ",是否继续操作？", function (data) {
                if (data) {
                } else {
                    $('#addHrRentPrice').val("");
                    return;
                }
            });
        }
    }
}
//控制时间范围
function timescope(type) {

    var timeOnAndOff = parent._timeOnAndOff;
    var timeScope = parent._timeScope;
    var v = $(type).val();
    var reg = /^[-+]?\d*$/;
    if (!reg.test(v)) {
        $(type).val("");
        return;
    } else {
        if (v > 31) {

            $(type).val("");
            return;
        }
    }
    if (timeOnAndOff == 1) {
        if (v < timeScope.daymin || v > timeScope.daymax) {
            $(type).val("");
            myTips("请输入正确的时间!", "error");
        }

    }
}

//获取交租日当月是多少号
function acquisitionOfRentDay(type) {
    var timeBegin, advanceMode, str;
    if (type == 1) {//新签
        timeBegin = $('#addHrBegin').val()
        advanceMode = $('#advanceMode').val();
        str = timeBegin.split('-')
        if (str != '') {
            if (advanceMode == 1) {
                $("#totalFee").val(countBugMonth(timeBegin, 1));
                $('#totalFeeDiv').show();
                $('#addHrInAdvancePay').val(str[2]);
            } else {
                $("#totalFee").val(countBugMonth(timeBegin, 2));
                $('#addHrInAdvancePay').val(1);
            }
        } else {
            $('#addHrInAdvancePay').val(1);
        }
    } else if (type == 2) {//续签
        timeBegin = $('#renterRenewBegin').val()
        advanceMode = $('#advanceMode1').val();
        str = timeBegin.split('-')
        if (str != '') {
            if (advanceMode == 1) {
                $('#totalFeeDiv').show();
                $('#renterRenewAdvancePay').val(str[2]);
            } else {
                $('#totalFeeDiv').hide();
                $('#renterRenewAdvancePay').val(1);
            }
        } else {
            $('#renterRenewAdvancePay').val(1);
        }
    }
}
//读卡操作
function readIDCard() {
    //获取这个id对应的父窗口
    var identityInformation = $("#id_card_reader_text_box", parent.document).val();
    //var identityInformation = '{"ret":0,"Certificate":{"Name":"王冲","Sex":"男","Nation":"汉","Birthday":"19910527","Address":"湖北省宜昌市伍家岗区中南一路9号14栋1单元1406室","IDNumber":"42058319910527003X","IDIssued":"宜昌市公安局伍家岗分局","IssuedData":"20180817","ValidDate":"20380817","Other":"","CardNumber":"","PhotoName":"C:/Program Files (x86)/ZKIDROnline/bin/zp.bmp","Base64Photo":"/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAB+AGYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD36iiikIOc0ySVIhlyAKz9e1u20DS5r25YbUUkD1OK+c/EvxP1nXLmSNJ2htQcKkZK/wD66LjSPcdY+JPh3Rbhre4uHaUA48tdw/MVy8/xw0qPf5drI5B43cA14HNPJcPulcufU1Xb2pXGe/2/xy0+UqJ7F4wTyUfOPzFdro/j3QtaZUtrrDkA/vAFHrXyWBleamguprUjymKkdCKAPtJJEkG6N1ceqnNOr5j8NfFDV9DkRZZDPB0KO3A/KvfPCviq18UaeLiD5Xx8y+lMR0FFFFAgooopgFB6UU122rSYHzp8W/Fk2o67NpdvM32a3ba3zcE9a8zFamvOLrxNqDDPzXDnn/eNT2miS3AGEzms3JI2jBvYxSRnFJjiurPhObK/uuSOeKf/AMIlcbtoiqfaxNFRkchR3rvLfwHcSgbogKtSfD1o1X5R05NL2qH7CR50RxXf/C3xNLpOuxWhmKwzHBGe/QVl6n4Tks0ZwDge1c9ZM1jrFtN/FHKrfkRVxmmZzpuJ9n0VFCS0KE9SOalrQwCiiiqAKbJypp1MbOCfapY0fJd3ahvFt8rdrmQD/vo16PoWmxLbq5HP0rmZdML+PdSgK8rdSce26uwe5WxxCqucdMLXJVep3UVpc2Etoz/AM+tTpaqHBIrItNXk3DdA+31Kmt+2uILhdwJz7iuex1JilNvSo2yRzViWSKIEsTj6VkXepoCREsp+iGiw+axS1mBZraRT0IrxzVrTy9VRAOS2P1r1uS+MzeW8TjPcqa43xFpiprtjIo+WSRcnH+0K2pOzsc9ZXVz6Uh/1YA7VJTIxtzT67UzzmFFJRVEi1S1S8Nlp8twqg7BnBq7WP4mIGhTj+98v51nLRGkEnJI8sWJrvxnNqXkrEZlJbb3OOtXby5itJfMZCzZwBjvS2MgeViOqnArR+xJcHc9cLk27nrezUVZGLFr93JrA057CMKULmTJx0z16d62rRoncMuMZI4qQ2KIMLUaosT89alsEi5dhGU88jmuW1PXbzTZYEtbNJ0kyM5OQe2cdO1dDJIsnBNPgtgreYOhoTBowjfvcXbJNHtyeNnI/Oqeraf8Aabm1KnHkyBlP0yR+uK6mezQgyDrWVO/lNluKXNZ3Gop6M7fwrq1xqdnIblsyxsFY+vFdHXHeBlBhvnHeUE/lXY16FJ3Vzy66Sm0hKKWitTAQ1na3B9p0mZCOgLfkK0qbIgkjZD0YYNRJXRUHaVzx+xQRH/aY5b610Fs3GKua14Yhs7aS7gkYFSCRgYxms21auGUHE9SFXnNJkGzcaw7maJbk+bLsGcDPStaSbERFYN0waTJYD8ajc2SLN1JBHCrBjkkA4q9pzs8ZRmyAcCsFmh6sc1padeQ42ocEdqQ2atxhYyBXN3+HJVunWt64fcpNO0PRYtWlmecnajYHHtTjHmZEpqC5mavgiExaS0mOZCGP5V1NVbGzjsLdYIhhFFWRXoU4uMbHk1Jqcm0LRRRVEBRRRQBXu7dbq1khYZDKRXn0iNZ3ckDjBRsc16PI6xoWdgqjuTXmHiDWYb/X7mKDbi2wrMD94nP+FYVlodOHb5rE1wWkhIVyue4rG+wTGTLOZB6k81oW9yjJtY8mrAX06VxK56dzNewUoeOaWysFgffuIJ7VrKgqGcrHk56Um2F7izz/ACbe5OBXZ+HrL7HpycYeQBn+teU65qE0GnzTwH5o1LKc9wMivUPB2sf214asbxmBleIbxnvXTQXU4sS3sb9FFFdpwBRRRSsBBNdwwIXkkUAds81iXniqCIlYV3e5BFcxNczXD5kYsfU1WlHBouVYs6rr11qAMJcrGTnaDxXEWChda1BfWUA/h/8Arroin7wMPWudk3WfiSdn4jmcsp9elYVdjoo7m48bxtvjHIoW+ul+8px7VdiIkjzUiQ4Occ1xnfYpHUrgjCq+fcGkBurk/vSQD2rVEZbqOaJTFbwF3OMVO49jl/EqJaaJL23cCrXgu9u9L8NWXlORlAcVmakZtfv1thzZhslh7Vvi2+ytbWsC/uY02/rXXRVkcdeXQ7Sw8VblAuU+pHNdBb6hbXSbopBj0Jwa4BYQo9qQM8T7omKsOhFdNzjsek5z0orh4Nevok2mQv7k0UXCxnYpjrkVLTcUizPlVkPA4qhqENtfwqo2/a4lJUMcZA5P863jErjBrEuYltb77RtDImcjvUyV0XTdpEOkXruNj5DA4INdJEpauZWSGW9juII9iyjdiuqteVrgnoz0Iu4TMsMRcnGK5HVr25vZvs8PMbHnntXV6qo+xyVzWmQLvlk77Sv5irpxTIqSaJPD6mJbiNLdRDGQolPBdhnP4DitaMlpA1VbOZvJgs/+WUYO0fXrWqtukacV1xVtDgnJuQrMTx2puMUmcGlJzViEooopAf/Z","ImageName":"","Base64Image":"(null)","fp_feature1":"QwEREgELSgAAAAAAAAAAAAAAABoBmmTMAP///////60flPwaI8j8hi2d/O43N/4bPRb8IFHP/FRNuvyiUEX+R1MI/FNfuvyLZZ38loSc/MSeOv43vfL8U8Xr/AvM/fxp2jD+K99G/EjjC/5f4xn+buwk/ljzHP7tAS7/dwly/ScVHP9XS3L9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABo=","fp_feature2":"QwEREgEQUwAAAAAAAAAAAAAAABYBmpjsAP///////4lpFPwhceT8dXDZ/GmLJfyZjRL8vrJU/om3FvyBziL8u9A+/kTaQvyP2hL8r904/p7yFP6a9QD+pvUi/qAFCP9PFQj/HiL2/Sw9/P1cSEz9OFVD/UZbO/0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACM="}}';
    if (identityInformation == '') {
        myTips("读卡器无数据，请检测读卡器是否连接!", "error");
    } else {
        identityInformation = JSON.parse(identityInformation);	//JSON.parse() 方法用于将一个 JSON 字符串转换为对象
        //姓名
        $("#addHrRenterName").val(identityInformation.Certificate.Name);
        $("#addHrRenterIDCard").val(identityInformation.Certificate.IDNumber);
    }
}

var editIndex = undefined;
function endEditing() {
    if (editIndex == undefined) {
        return true;
    }
    if ($('#preGeneratingBillTable').datagrid('validateRow', editIndex)) {
        $('#preGeneratingBillTable').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
function onClickCell(index, field) {
    if (endEditing()) {
        $('#preGeneratingBillTable').datagrid('selectRow', index).datagrid(
            'editCell', {
                index: index,
                field: field
            });
        editIndex = index;
    }
}

function nestStep2() {
    if ($('#addHrDeposit').val() != null) {
        $('#refundDeposit').val($('#addHrDeposit').val());
    }
    var renterName = $("#addHrRenterName").val();
    console.log(renterName.length);
    if (renterName.length < 2) {
        myTips("租客姓名至少为两个汉字", "error")
    } else {
        if (validateStep('addHr', 2)) {
            contractDetail();
        }
    }
}
function contractDetail() {
    var hsId = $("#addHrHsId").val();
    var hsDownDeposit = $("#hsDownDeposit").val();
    if (hsDownDeposit == "是") {
        $.post("../queryDeposit.action", {
            jemState: "有效",
            jemHsId: hsId
        }, function (data) {
            if (data.code > 0) {
                console.log("success" + data.msg);
                data = data.body;
                console.log(data)
                for (var i in data[0]) {
                    console.log(data[0][i]);
                }
                $("#addHrBegin").val(data[0].jemContractBegin);
                $("#addHrEnd").val(data[0].jemContractEnd);
                $("#addHrRentPrice").val(data[0].jemRent);
                $("#addHrManageCost").val(data[0].jemPropertyFee);
                $("#addHrWifiCharge").val(data[0].jemNetFee);
                $("#addHrTvCharge").val(data[0].jemTvFee);
                $("#addHrServerCost").val(data[0].jemServiceFee);
                $("#addHrOtherPay").val(data[0].jemOtherFee);
                $("#addHrHouseDeposit").val(data[0].jemHousingDeposit);
                $("#addHrDoorDeposit").val(data[0].jemDoorcardDeposit);
                $("#addHrPowerDeposit").val(data[0].jemHydropowerHeposit);
                $("#addHrOtherDeposit").val(data[0].jemOtherDeposit);

                //设置默认值未0
                if (data[0].jemRent == '') {
                    $("#addHrRentPrice").val('0.00');
                }
                if (data[0].jemPropertyFee == '') {
                    $("#addHrManageCost").val('0.00');
                }
                if (data[0].jemNetFee == '') {
                    $("#addHrWifiCharge").val('0.00');
                }
                if (data[0].jemTvFee == '') {
                    $("#addHrTvCharge").val('0.00');
                }
                if (data[0].jemServiceFee == '') {
                    $("#addHrServerCost").val('0.00');
                }
                if (data[0].jemOtherFee == '') {
                    $("#addHrOtherPay").val('0.00');
                }
                if (data[0].jemHousingDeposit == '') {
                    $("#addHrHouseDeposit").val('0.00');
                }
                if (data[0].jemDoorcardDeposit == '') {
                    $("#addHrDoorDeposit").val('0.00');
                }
                if (data[0].jemHydropowerHeposit == '') {
                    $("#addHrPowerDeposit").val('0.00');
                }
                if (data[0].jemOtherDeposit == '') {
                    $("#addHrOtherDeposit").val('0.00');
                }
                countTotalFee();
                acquisitionOfRentDay(1);
            }
        });
    }
}

function nextStep() {
    if (validateStep('addHr', 3)) {
        preGeneratingBill();
    }
}
//允许修改客户信息
function openUpdate() {
    $('#populationDetailedDlg input').attr('disabled', false);
    $('#populationDetailedDlg select').attr('disabled', false);
    $('#updateButton').hide();
    $('#doUpdateButton').show();
}
//执行修改客户信息
function doUpdatePopulation() {
    var row = $("#populationDg").datagrid("getSelected");
    var popName = $('#pop_name').val();
    var popTelephone = $('#pop_telephone').val();
    var popIdcardType = $('#pop_idcard_type').val();
    var popIdcard = $('#pop_idcard').val();
    var popSex = $('#pop_sex').val();
    var popNation = $('#pop_nation').val();
    var popMarriageState = $('#pop_marriage_state').val();
    var popIdcardAddress = $('#pop_idcard_address').val();
    var popOccupation = $('#pop_occupation').val();
    var popBirth = $('#pop_birth').val();
    var popDegreeEducation = $('#pop_degree_education').val();
    var popInnerCreditLevel = $('#pop_inner_credit_level').val();
    var popOuterCreditLevel = $('#pop_outer_credit_level').val();
    var popNameRemark = $('#pop_name_remark').val();
    showLoading();
    $.post("../updatePopulation.action", {
        popId: row.popId,
        popName: popName,
        popTelephone: popTelephone,
        popIdcardType: popIdcardType,
        popIdcard: popIdcard,
        popSex: popSex,
        popNation: popNation,
        popMarriageState: popMarriageState,
        popIdcardAddress: popIdcardAddress,
        popOccupation: popOccupation,
        popBirth: popBirth,
        popDegreeEducation: popDegreeEducation,
        popInnerCreditLevel: popInnerCreditLevel,
        popOuterCreditLevel: popOuterCreditLevel,
        popNameRemark: popNameRemark,
        registrantName: _loginUserName
    }, function (data) {
        hideLoading();
        if (data.code < 0) {
            if (data.code == -21) {
                myTips("身份证已存在，已存在身份证的人口姓名与本次填写的姓名不一致！", "error");
            } else {
                myTips(data.msg, "error");
            }
            return;
        }
        myTips("修改成功", "success");
        queryPopulation(_pageNum[0], 0);
        $('#populationDetailedDlg').dialog('close');
    });
}
//跟进详情
function followInfoDlg(row) {
    $('#followInfoDlg').dialog({
        title: '跟进详细信息',
        top: getTop(300),
        left: getLeft(500),
        width: 500,
        height: 300,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#followInfoDlg span').text('');
        },
    });
    console.log(row);
    for (var i in row) {
        $('#follow' + i).html(row[i]);
    }
    $('#followInfoDlg').dialog('open');
}
//查询住户信息
function queryResident() {
    var row = $("#populationDg").datagrid("getSelected");
    var rtPlId = row.popId;
    $.post("../selectResidentTable.action", {
        rtPlId: rtPlId,
    }, function (data) {
        if (data.code < 0) {
            myTips("未查询到相关住户信息！", "error");
            return;
        }
        data = data.body;
        $('#updateLivingMenHrAddressNew').val('' + data[0].addCommunity + data[0].addBuilding + data[0].addDoorplateno);
        $('#updateLivingMenHrAddressOld').val('' + data[0].addCommunity + data[0].addBuilding + data[0].addDoorplateno);
        $("#updateLivingMenRtId").val(data[0].rtId);
        $("#updateLivingMenRtHrIdNew").val(data[0].rtHrId);
        $("#updateLivingMenRtHrIdOld").val(data[0].rtHrId);
        $('#updateLivingMenRtTypeNew').val(data[0].rtType);
        $('#updateLivingMenRtTypeOld').val(data[0].rtType);
    });
}
//修改住户
function updateLivingMen() {
    $('#updateLivingMenDlg').dialog({
        title: '修改住户',
        top: getTop(200),
        left: getLeft(410),
        width: 410,
        height: 200,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#updateLivingMenDlg [clear="clear"]').val('');
            $('#updateLivingMenDlg [clear="clear"]').html('');
            $('#updateLivingMenDlg [choose="choose"]').val('');
            $('#updateLivingMenDlg [require="require"]').css('border', '1px solid #a9a9a9');
        }
    });
    queryResident();
    $('#updateLivingMenDlg').dialog("open");
}
//执行修改住户
function doUpdateLivingMen() {
    var row = $("#populationDg").datagrid("getSelected");
    var rtPlId = row.popId;
    var rtId = $("#updateLivingMenRtId").val();
    var rtTypeNew = $('#updateLivingMenRtTypeNew').val();
    var rtTypeOld = $('#updateLivingMenRtTypeOld').val();
    var rtHrIdNew = $("#updateLivingMenRtHrIdNew").val();
    var rtHrIdOld = $("#updateLivingMenRtHrIdOld").val();
    var hrAddressNew = $('#updateLivingMenHrAddressNew').val();
    var hrAddressOld = $('#updateLivingMenHrAddressOld').val();
    if (rtTypeNew == rtTypeOld && rtHrIdNew == rtHrIdOld) {
        $('#updateLivingMenDlg').dialog('close');
        return;
    }
    var checkFlag = 0;
    $('#updateLivingMenDlg [require="require"]').each(function () {
        if ($(this).val() == '') {
            $(this).css('border', '1px solid red');
            checkFlag++;
        } else {
            $(this).css('border', '1px solid #a9a9a9');
        }
    });
    if (checkFlag != 0) {
        myTips("有必填项未填写!", "error");
        return;
    }
    var follow = '修改住户，';
    if (rtTypeNew != rtTypeOld) {
        follow += '状态：' + rtTypeOld + ' → ' + rtTypeNew + ';';
    }
    if (rtHrIdNew != rtHrIdOld) {
        follow += '入住房：' + hrAddressOld + ' → ' + hrAddressNew + ';';
    }
    showLoading();
    $.post("../updateResident.action", {
        rtId: rtId,
        rtPlId: rtPlId,
        rtType: rtTypeNew,
        rtHrId: rtHrIdNew,
        popModifyTheRecord: follow,
        registrantName: _loginUserName,
    }, function (data) {
        hideLoading();
        if (data.code < 0) {
            myTips(data.msg, "error");
            return;
        }
        myTips("修改成功", "success");
        queryPopulation(_pageNum[0], 0);
        $('#updateLivingMenDlg').dialog('close');
        $('#populationDetailedDlg').dialog('close');
    });
}
//住户选择入住房
function relationDlg() {
    $('#relationDlg').dialog({
        title: '选择入住房',
        top: getTop(420),
        left: getLeft(750),
        width: 750,
        height: 420,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {

        }
    });
    relationDataGrid();
    $('#relationDlg').dialog('open');
}
//住户选择入住房-初始化已租列表
function relationDataGrid() {
//	cityLink();
    if ($('#choseSourceTable').hasClass('datagrid-f')) {
    } else {
        $('#choseSourceTable').datagrid({
            columns: [[{
                field: 'hrAddDistrict',
                title: '城区',
                width: 20,
                align: 'center'
            }, {
                field: 'hrAddZone',
                title: '片区',
                width: 20,
                align: 'center'
            }, {
                field: 'hrAddCommunity',
                title: '楼盘名称',
                width: 30,
                align: 'center'
            }, {
                field: 'hrAddBuilding',
                title: '楼栋',
                width: 10,
                align: 'center'
            }, {
                field: 'hrAddDoorplateno',
                title: '门牌',
                width: 10,
                align: 'center'
            }, {
                field: 'renterPopName',
                title: '承租人',
                width: 10,
                align: 'center'
            }]],
            width: '100%',
            height: '277px',
            singleSelect: true,
            autoRowHeight: false,
            pageSize: 10,
            scrollbarSize: 0,
            showPageList: false,
            fitColumns: true,
            onDblClickRow: function (rowIndex, rowData) {
                var row = $('#choseSourceTable').datagrid('getSelected');
                if (row) {
                    for (var i in row) {
                        if (row[i] == null) {
                            row[i] = '';
                        }
                    }
                    $("#updateLivingMenRtHrIdNew").val(row.hrId);
                    $("#updateLivingMenHrAddressNew").val('' + row.hrAddCommunity + row.hrAddBuilding + row.hrAddDoorplateno);
                    $('#relationDlg').dialog('close')
                }
            }
        });
    }
    relationDate(1, 0);
}
//住户选择入住房-查询已租列表
function relationDate(page, type) {
    var startNum = (parseInt(page) - 1) * 10;
    var endNum = 10;
    var qhAddCity = $("#searchAddCity").find("option:selected").text();
    var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
    var qhAddZone = $("#searchAddZone").find("option:selected").text();
    var qhAddCommunity = $("#searchAddCommunity").val();
    var qhAddBuilding = $("#searchAddBuilding").val();
    var qhAddDoorplateno = $("#searchAddDoorplateno").val();
    $.post("../queryHouseRentCommon.action", {
        startNum: startNum,
        endNum: endNum,
        hrAddCity: qhAddCity,
        hrAddDistrict: qhAddDistrict,
        hrAddZone: qhAddZone,
        hrAddCommunity: qhAddCommunity,
        hrAddBuilding: qhAddBuilding,
        hrAddDoorplateno: qhAddDoorplateno,
        hrLeaseState: "在租"
    }, function (data) {
        if (data.code < 0) {
            sourcePage(0, 0, 8);
            $('#choseSourceTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        } else {
            data = data.body;
            if (page == 1 && type == 0) {
                sourcePage(data[0].totalNum, page, 8);
            }
            $("#choseSourceTable").datagrid("loadData", data);
        }
    }, "json");
}


//分页
function sourcePage(totalNum, page, type) {
    var pageNum = Math.ceil(totalNum / 10);
    if (type == 1) {
        pageNum = Math.ceil(totalNum / 10);
        $("#choseHousePage").remove();
        $("#choseHousePageDiv").append("<div class='tcdPageCode' id='choseHousePage' style='text-align:center;'></div>");
        $("#choseHousePage").createPage({
            onePageNums: 5,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    query4StoreInfo(p, 1);
                }
            }
        });
    }
    if (type == 2) {
        pageNum = Math.ceil(totalNum / 10);
        $("#choseRenterPage").remove();
        $("#choseRenterPageDiv").append("<div class='tcdPageCode' id='choseRenterPage' style='text-align:center;'></div>");
        $("#choseRenterPage").createPage({
            onePageNums: 10,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryRenter(p, 1);
                }
            }
        });
    }
    if (type == 3) {
        pageNum = Math.ceil(totalNum / 6);
        $("#followPage").remove();
        $("#followPageDiv").append("<div class='tcdPageCode' id='followPage' style='text-align:center;'></div>");
        $("#followPage").createPage({
            onePageNums: 6,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    var row = $('#sourceInfoDg').datagrid('getSelected');
                    queryFollow(row, p, 1);
                }
            }
        });
    }
    if (type == 4) {
        pageNum = Math.ceil(totalNum / 7);
        $("#followPage1").remove();
        $("#followPageDiv1").append("<div class='tcdPageCode' id='followPage1' style='text-align:center;'></div>");
        $("#followPage1").createPage({
            onePageNums: 7,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    var row = $('#sourceInfoDg').datagrid('getSelected');
                    queryFollow1(row, p, 1);
                }
            }
        });
    }
    if (type == 7) {
        pageNum = Math.ceil(totalNum / 10);
        $("#choseRenterPage1").remove();
        $("#choseRenterPageDiv1").append("<div class='tcdPageCode' id='choseRenterPage1' style='text-align:center;'></div>");
        $("#choseRenterPage1").createPage({
            onePageNums: 10,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryRenter(p, 1);
                }
            }
        });
    }
    if (type == 8) {
        pageNum = Math.ceil(totalNum / 10);
        $("#choseSourcePage").remove();
        $("#choseSourcePageDiv").append("<div class='tcdPageCode' id='choseSourcePage' style='text-align:center;'></div>");
        $("#choseSourcePage").createPage({
            onePageNums: 10,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    relationDate(p, 1);
                }
            }
        });
    }

    if (type == 9) {
        pageNum = Math.ceil(totalNum / 10);
        $("#chosePopPage").remove();
        $("#chosePopPageDiv").append("<div class='tcdPageCode' id='chosePopPage' style='text-align:center;'></div>");
        $("#chosePopPage").createPage({
            onePageNums: 10,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryPop(p, 1);
                }
            }
        });
    }

}
//检测合同编号
function contractNumCheckout(numId, ifId, tipsId) {
    if (_contractNums != 1) {
        return;
    }
    var detectionContract = $("#" + numId).val();
    if (detectionContract == '') {
        $("#" + tipsId).html("");//编号不能为空！
        return;
    }
    $.post("../contractNumberdetection.action", {
        detectionContract: detectionContract,
    }, function (data) {
        if (data.code < 0) {
            $("#" + tipsId).html(data.msg);
            $("#" + tipsId).css("color", "red");
            return;
        } else {
            data = data.body;
            $("#" + tipsId).html("编号正确");
            $("#" + tipsId).css("color", "green");
            $("#" + ifId).val(data[0].jcdId);
        }
    });
}

//添加已租，资产列表信息导入
function queryAsset2(page, type) {

    var startNum = (parseInt(page) - 1) * 10;
    var endNum = 10;
    var rows = $("#assetsInfoTable2").datagrid("getRows");
    if (rows.length > 0) {
        return;
    }
    $.post('../assetsInRentDb.action', {
        startNum: startNum,
        endNum: endNum,
        saHouseStoreId: _houseStoreCoding
    }, function (data) {
        if (data.code < 0) {
            dbSourcePage(0, 0, 21);
            $('#assetsInfoTable2').datagrid('loadData', []);
        } else {
            if (page == 1 && type == 0) {
                dbSourcePage(data.body[0].totalNum, page, 21);
            }
            for (var i in data.body) {
                if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
                    data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
                } else {
                    data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
                }
            }
            $('#assetsInfoTable2').datagrid('loadData', data.body);
        }
    });
}
function dbSourcePage(totalNum, page, type) {
    var pageNum = 1;
    if (type == 3) {
        pageNum = Math.ceil(totalNum / 15);
        $("#financialPage").remove();
        $("#financialPageDiv").append("<div class='tcdPageCode' id='financialPage' style='text-align:center;'></div>");
        $("#financialPage").createPage({
            onePageNums: 15,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryFinancial(p, 1);
                }
            }
        });
    }
    if (type == 4) {
        pageNum = Math.ceil(totalNum / 15);
        $("#eventInfoPage").remove();
        $("#eventInfoPageDiv").append("<div class='tcdPageCode' id='eventInfoPage' style='text-align:center;'></div>");
        $("#eventInfoPage").createPage({
            onePageNums: 15,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryEvent(p, 1);
                }
            }
        });
    }
    if (type == 5) {
        pageNum = Math.ceil(totalNum / 14);
        $("#followDbPage").remove();
        $("#followDbPageDiv").append("<div class='tcdPageCode' id='followDbPage' style='text-align:center;'></div>");
        $("#followDbPage").createPage({
            onePageNums: 14,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryFollowDb(p, 1);
                }
            }
        });
    }
    if (type == 11) {
        pageNum = Math.ceil(totalNum / 15);
        $("#payableInfoPage").remove();
        $("#payableInfoPageDiv").append("<div class='tcdPageCode' id='payableInfoPage' style='text-align:center;'></div>");
        $("#payableInfoPage").createPage({
            onePageNums: 15,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryPayable(p, 1);
                }
            }
        });
    }
    if (type == 12) {
        pageNum = Math.ceil(totalNum / 15);
        $("#receivableInfoPage").remove();
        $("#receivableInfoPageDiv").append("<div class='tcdPageCode' id='receivableInfoPage' style='text-align:center;'></div>");
        $("#receivableInfoPage").createPage({
            onePageNums: 15,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    $('#monthlyBills_index').val(0);
                    queryInstallment(p, 1);
                }
            }
        });
    }
    if (type == 14) {
        pageNum = Math.ceil(totalNum / 12);
        $("#assetPage").remove();
        $("#assetsPageDiv").append("<div class='tcdPageCode' id='assetPage' style='text-align:center;'></div>");
        $("#assetPage").createPage({
            onePageNums: 12,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryAsset(p, 1);
                }
            }
        });
    }
    if (type == 15) {
        pageNum = Math.ceil(totalNum / 10);
        $("#accountReceivablePage").remove();
        $("#accountReceivablePageDiv").append("<div class='tcdPageCode' id='accountReceivablePage' style='text-align:center;'></div>");
        $("#accountReceivablePage").createPage({
            onePageNums: 15,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryAccountReceivable(p, 0);
                }
            }
        });
    }
    if (type == 16) {
        pageNum = Math.ceil(totalNum / 4);
        $("#RenterContinuePage").remove();
        $("#RenterContinuePageDiv").append("<div class='tcdPageCode' id='RenterContinuePage' style='text-align:center;'></div>");
        $("#RenterContinuePage").createPage({
            onePageNums: 4,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryRenterContinue(p, 0);
                }
            }
        });
    }
    if (type == 17) {
        pageNum = Math.ceil(totalNum / 4);
        $("#landlordContinuePage").remove();
        $("#landlordContinuePageDiv").append("<div class='tcdPageCode' id='landlordContinuePage' style='text-align:center;'></div>");
        $("#landlordContinuePage").createPage({
            onePageNums: 4,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryLandlordContinue(p, 0);
                }
            }
        });
    }
    if (type == 18) {
        pageNum = Math.ceil(totalNum / 4);
        $("#renterHisContinuePage").remove();
        $("#renterHisContinuePageDiv").append("<div class='tcdPageCode' id='renterHisContinuePage' style='text-align:center;'></div>");
        $("#renterHisContinuePage").createPage({
            onePageNums: 4,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryRenterHisContinue(p, 0);
                }
            }
        });
    }
    if (type == 19) {
        pageNum = Math.ceil(totalNum / 15);
        $("#sendMessagePage").remove();
        $("#sendMessagePageDiv").append("<div class='tcdPageCode' id='sendMessagePage' style='text-align:center;'></div>");
        $("#sendMessagePage").createPage({
            onePageNums: 15,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    querySendMessage(p, 0);
                }
            }
        });
    }
    if (type == 20) {
        pageNum = Math.ceil(totalNum / 5);
        $("#assetsListTablePage").remove();
        $("#assetsListTablePageDiv").append("<div class='tcdPageCode' id='assetsListTablePage' style='text-align:center;'></div>");
        $("#assetsListTablePage").createPage({
            onePageNums: 5,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryAssetsList(p, 0);
                }
            }
        });
    }
    if (type == 21) {
        pageNum = Math.ceil(totalNum / 10);
        $("#assetPage2").remove();
//		$("#assetsPageDiv2").append("<div class='tcdPageCode' id='assetPage2' style='text-align:center;'></div>");
        $("#assetPage2").createPage({
//			onePageNums:8,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryAsset2(p, 1);
                }
            }
        });
    }

}

//未租房，资产迁入
function moveInAssets(flag) {
    $("#moveInAssetsDlg").dialog({
        title: '迁入资产',
        top: getTop(670),
        left: getLeft(900),
        width: 900,
        height: 670,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#moveInAssetsDlg [clear="clear"]').val('');
            $('#moveInAssetsDlg [choose="choose"]').val('');
        }
    });
    $('#assetsListTable').datagrid({
        columns: [[
            {
                field: 'saDetailedAddress',
                title: '地址/项目',
                width: 30,
                align: 'center'
            },
            {
                field: 'saType',
                title: '所属',
                width: 10,
                align: 'center'
            },
            {
                field: 'saClassify',
                title: '类型',
                width: 10,
                align: 'center'
            },
            {
                field: 'saName',
                title: '名称',
                width: 20,
                align: 'center'
            },
            {
                field: 'saBrand',
                title: '品牌',
                width: 10,
                align: 'center'
            },
            {
                field: 'saModel',
                title: '型号',
                width: 10,
                align: 'center'
            },
            {
                field: 'saStatus',
                title: '状态',
                width: 10,
                align: 'center'
            },
            {
                field: 'saUse',
                title: '使用情况',
                width: 10,
                align: 'center'
            },
            {
                field: 'do',
                title: '添加',
                width: 10,
                align: 'center',
                formatter: function (value, row, index) {
                    return "<a href='#' style='color:blue' onclick=\"addOneToNeedTo(" + index + ", " + flag + ")\" >添加</a>";
                }
            }]],
        width: '100%',
        height: '152px',
        singleSelect: true,
        autoRowHeight: false,
        scrollbarSize: 0,
        showPageList: false,
        fitColumns: true,
        rowStyler: function (index, row) {
            return 'color:#000;';
        },
    });

    if ($('#assetsMoveInTable').hasClass('datagrid-f')) {

    } else {
        $('#assetsMoveInTable').datagrid({
            columns: [[
                {
                    field: 'saDetailedAddress',
                    title: '地址/项目',
                    width: 30,
                    align: 'center'
                },
                {
                    field: 'saType',
                    title: '所属',
                    width: 10,
                    align: 'center'
                },
                {
                    field: 'saClassify',
                    title: '类型',
                    width: 10,
                    align: 'center'
                },
                {
                    field: 'saName',
                    title: '名称',
                    width: 20,
                    align: 'center'
                },
                {
                    field: 'saBrand',
                    title: '品牌',
                    width: 10,
                    align: 'center'
                },
                {
                    field: 'saModel',
                    title: '型号',
                    width: 10,
                    align: 'center'
                },
                {
                    field: 'saStatus',
                    title: '状态',
                    width: 10,
                    align: 'center'
                },
                {
                    field: 'saUse',
                    title: '使用情况',
                    width: 10,
                    align: 'center'
                },
                {
                    field: 'do',
                    title: '取消',
                    width: 10,
                    align: 'center',
                    formatter: function (value, row, index) {
                        return "<a href='#' style='color:red' onclick=\"myDeleteRows('" + row.saId + "','saId','assetsMoveInTable','0')\">删除</a>";
                    }
                }]],
            width: '100%',
            height: '152px',
            singleSelect: true,
            autoRowHeight: false,
            scrollbarSize: 0,
            showPageList: false,
            fitColumns: true,
            rowStyler: function (index, row) {
                return 'color:#000;';
            },
        });
    }
    $("#assetsMoveInTable").datagrid("loadData", []);
    if (flag == 1) {
        $('#doMoveInAssetsButton1').show();
        $('#doMoveInAssetsButton2').hide();
    } else {
        $('#doMoveInAssetsButton1').hide();
        $('#doMoveInAssetsButton2').show();
    }
    $("#moveInAssetsDlg").dialog('open');
    queryAssetsList(1, 0);
}

//执行迁入资产
function doMoveInAssets(flag) {
    var rows = $("#assetsMoveInTable").datagrid('getRows');
    if (rows.length == 0) {
        myTips('请先将待迁入的资产添加到下方列表！', 'error');
        return;
    }
    var checkFlag = 0;
    $('#moveInAssetsDlg [must="must"]').each(function () {
        if ($(this).val() == '') {
            $(this).css('border-color', 'red');
            checkFlag++;
            return;
        } else {
            $(this).css('border-color', '#A9A9A9');
        }
    });
    if (checkFlag != 0) {
        myTips('有必填项未填写!', 'error');
        return;
    }

    var agentName = $('#pickHtManagerinShowUserInfo').val().split(' ')[$('#pickHtManagerinShowUserInfo').val().split(' ').length - 1];
//	var agentName = $('#move_in_asset_staff option:selected').text();
    var moveReason = $('#move_in_asset_reason').val();
    var jsonArray = [];
    for (var i in rows) {
        var jsonObject = {
            registrantName: _loginUserName,
            saRegistrant: _loginUserId,
            department: _loginDepartment,
            storefront: _loginStore,
            agentName: agentName,
            moveReason: moveReason,
            saId: rows[i].saId,
            saHouseStoreId: _houseStoreCoding,
            saHouseId: _houseCoding,
            saMoveFrom: rows[i].saDetailedAddress,
            saMoveTo: _hrAddCommunity + " " + _hrAddBuilding + " " + _hrAddDoorplateno,
            saNumber: rows[i].saNumber,
        };
        jsonArray[i] = jsonObject;
        if (flag == 2) {
            $('#assetsInfoTable2').datagrid('insertRow', {
                index: 0,
                row: rows[i]
            });
        }
    }
    if (flag == 1) {
        showLoading();
        $.post('../moveAssets.action', {
            saId: rows[0].saId,
            jsonArray: JSON.stringify(jsonArray),
        }, function (data) {
            hideLoading();
            if (data.code < 0) {
                $.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
                return;
            } else {
                console.log(data.body);
                $('#moveInAssetsDlg').dialog('close');
                myTips('迁移成功！', 'success');
                queryAsset(1, 0);
            }
        });
    } else {
        _moveSaId = rows[0].saId;
        _moveAsset = _moveAsset.concat(jsonArray);
        $('#moveInAssetsDlg').dialog('close');
    }
}

/**
 * 查看资产详情
 */
function openAssetInfo() {
    $('#assetInfoDlg').dialog({
        title: '资产详细信息',
        top: getTop(450),
        left: getLeft(850),
        width: 850,
        height: 450,
        closed: true,
        cache: false,
        modal: true,
        onBeforeClose: function () {
            $('#assetInfoTabs').tabs('select', 0);
        },
        onClose: function () {
            $('#assetInfoDlg [clear="clear"]').val('');
        },
    });
    seeAsset();
    $('#assetInfoDlg').dialog('open');
}
//家私电器信息导入
function queryAsset(page, type) {
    var startNum = (parseInt(page) - 1) * 12;
    var endNum = 12;
    $.post('../assetsInRentDb.action', {
        startNum: startNum,
        endNum: endNum,
        saHouseStoreId: _houseStoreCoding
    }, function (data) {
        $('#assetsInfoTable').datagrid({
            onDblClickRow: function (rowIndex, rowData) {
                $("#assetInfo_index").val(rowIndex);
                $('#assetInfoTabs').tabs({
                    plain: true,
                    fit: true,
                    border: false,
                    onSelect: function (title, index) {
                        // 获得点击选项卡的列数，调用表格初始化
                        initAssetTable(index);
                    }
                });
                $("#assetInfoTabs").tabs("select", 0);
                openAssetInfo();
                queryAssetFollow();
            }
        });
        if (data.code < 0) {
            dbSourcePage(0, 0, 14);
            $('#assetsInfoTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        } else {
            if (page == 1 && type == 0) {
                dbSourcePage(data.body[0].totalNum, page, 14);
            }
            for (var i in data.body) {
                if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
                    data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
                } else {
                    data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
                }
            }
            $('#assetsInfoTable').datagrid('loadData', data.body);
        }
    });
}

/**
 * 迁出资产
 */
function moveOutAssets(flag) {
    var row;
    if (flag == 1) {
        row = $('#assetsInfoTable').datagrid('getSelected');
    } else if (flag == 2) {
        row = $('#assetsInfoTable2').datagrid('getSelected');
    }
    if (!row) {
        myTips('请先选择一条记录！', 'error');
        return;
    }
    $('#move_from_assets_choseHouse').val(_hrAddCommunity + ' ' + _hrAddBuilding + ' ' + _hrAddDoorplateno);
    $('#moveOutAssetsDlg').dialog({
        title: '迁移资产',
        top: getTop(250),
        left: getLeft(540),
        width: 540,
        height: 250,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#moveOutAssetsDlg [clear="clear"]').val('');
            $('#moveOutAssetsDlg [choose="choose"]').val('');
        }
    });
    if (flag == 1) {
        $('#doMoveOutAssetsButton').show();
        $('#doMoveOutAssetsButton2').hide();
    } else {
        $('#doMoveOutAssetsButton').hide();
        $('#doMoveOutAssetsButton2').show();
    }
    $('#moveOutAssetsDlg').dialog('open');
}
/**
 * 执行迁出资产
 */
function doMoveOutAssets(flag) {

    var row;
    if (flag == 1) {
        row = $('#assetsInfoTable').datagrid('getSelected');
    } else if (flag == 2) {
        row = $('#assetsInfoTable2').datagrid('getSelected');
    }
    if (!row) {
        myTips('请先选择一条记录！', 'error');
        return;
    }
    var saHouseStoreId = $('#move_to_assets_houseStoreCoding').val();
    var saHouseId = $('#move_to_assets_houseCoding').val();
    var saMoveFrom = $('#move_from_assets_choseHouse').val();
    var saMoveTo = $('#move_to_assets_choseHouse').val();
    var agentName = $('#pickHtManagertShowUserInfo').val().split(' ')[$('#pickHtManagertShowUserInfo').val().split(' ').length - 1];
//	var agentName = $('#move_to_asset_staff option:selected').text();
    var moveReason = $('#move_to_asset_reason').val();
    var checkFlag = 0;
    $('#moveOutAssetsDlg [must="must"]').each(function () {
        if ($(this).val() == '') {
            $(this).css('border-color', 'red');
            checkFlag++;
            return;
        } else {
            $(this).css('border-color', '#A9A9A9');
        }
    });
    if (checkFlag != 0) {
        myTips('有必填项未填写!', 'error');
        return;
    }
    if (saHouseStoreId == row.saHouseStoreId && saHouseId == row.saHouseId) {
        myTips('该资产无须迁移', 'error');
        return;
    }

    var jsonArray = [];
    var jsonObject = {
        registrantName: _loginUserName,
        saRegistrant: _loginUserId,
        department: _loginDepartment,
        storefront: _loginStore,
        agentName: agentName,
        moveReason: moveReason,
        saId: row.saId,
        saHouseStoreId: saHouseStoreId,
        saHouseId: saHouseId,
        saMoveFrom: saMoveFrom,
        saMoveTo: saMoveTo,
        saNumber: row.saNumber,
    };
    jsonArray[0] = jsonObject;
    if (flag == 1) {
        showLoading();
        $.post('../moveAssets.action', {
            saId: row.saId,
            jsonArray: JSON.stringify(jsonArray),
        }, function (data) {
            hideLoading();
            if (data.code < 0) {
                $.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
                return;
            } else {
                $('#moveOutAssetsDlg').dialog('close');
                myTips('迁移成功！', 'success');
                queryAsset(1);
            }
        });
    } else {
        var rowIndex = $('#assetsInfoTable2').datagrid('getRowIndex', row);
        $('#assetsInfoTable2').datagrid('deleteRow', rowIndex);
        _moveSaId = row.saId;
        _moveAsset = _moveAsset.concat(jsonArray);
        $('#moveOutAssetsDlg').dialog('close');
    }
}

/**
 * 选择房源
 */
function choseHouseAsset() {

    $('#choseHouseAssetDlg').dialog({
        title: '选择房源',
        top: getTop(550),
        left: getLeft(750),
        width: 750,
        height: 420,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {

        }
    });
    relationDataGridAsset();
    $('#choseHouseAssetDlg').dialog('open');
}

/**
 * 选择房源-显示列表
 */
function relationDataGridAsset() {

    var relationType = $('#searchBelongTypeAsset').find('option:selected').text();
    if (relationType == '房源列表') {
        $('#choseHouseSelectAsset').show();
        $('#virtualRelationSelectAsset').hide();
        $('#choseTrusteeshipAsset').show();
        $('#choseVirtualHouseAsset').hide();
        if ($('#choseTrusteeshipAssetTable').hasClass('datagrid-f')) {

        } else {

            $('#choseTrusteeshipAssetTable').datagrid(
                {
                    columns: [[{
                        field: 'hsAddDistrict',
                        title: '城区',
                        width: 10,
                        align: 'center'
                    }, {
                        field: 'hsAddZone',
                        title: '片区',
                        width: 10,
                        align: 'center'
                    }, {
                        field: 'hsAddCommunity',
                        title: '楼盘名称',
                        width: 20,
                        align: 'center'
                    }, {
                        field: 'hsAddBuilding',
                        title: '楼栋',
                        width: 10,
                        align: 'center'
                    }, {
                        field: 'hsAddDoorplateno',
                        title: '门牌',
                        width: 10,
                        align: 'center'
                    }]],
                    width: '100%',
                    height: '84%',
                    singleSelect: true,
                    autoRowHeight: false,
                    pageSize: 10,
                    scrollbarSize: 0,
                    showPageList: false,
                    fitColumns: true,
                    onDblClickRow: function (rowIndex, rowData) {
                        var row = $('#choseTrusteeshipAssetTable').datagrid('getSelected');
                        if (row) {
                            for (var i in row) {
                                if (row[i] == null) {
                                    row[i] = '';
                                }
                            }
                            $('#move_to_assets_houseStoreCoding').val(row.hsId);
                            $('#move_to_assets_houseCoding').val(row.hsHouseId);
                            $('#move_to_assets_choseHouse').val(row.hsAddCommunity + ' ' + row.hsAddBuilding + ' ' + row.hsAddDoorplateno);
                            $('#choseHouseAssetDlg').dialog('close');
                        }
                    }
                });
        }
    }
    if (relationType == '项目列表') {
        $('#choseHouseSelectAsset').hide();
        $('#virtualRelationSelectAsset').show();
        $('#choseTrusteeshipAsset').hide();
        $('#choseVirtualHouseAsset').show();
        if ($('#choseVirtualHouseAssetTable').hasClass('datagrid-f')) {

        } else {
            $('#choseVirtualHouseAssetTable').datagrid(
                {
                    columns: [[ /*{
						field : 'houseCoding',
						title : '盘源编号',
						width : 10,
						align : 'center'
					}, */{
                        field: 'addCommunity',
                        title: '分类',
                        width: 10,
                        align: 'center'
                    }, {
                        field: 'keyAdministrator',
                        title: '名称',
                        width: 20,
                        align: 'center'
                    }, {
                        field: 'addDoorplateno',
                        title: '备注描述',
                        width: 10,
                        align: 'center'
                    }, {
                        field: 'keyNumber',
                        title: '联系人',
                        width: 10,
                        align: 'center'
                    }, {
                        field: 'houseEntrust4rent',
                        title: '联系电话',
                        width: 10,
                        align: 'center'
                    }]],
                    width: '100%',
                    height: '84%',
                    singleSelect: true,
                    autoRowHeight: false,
                    pageSize: 10,
                    scrollbarSize: 0,
                    showPageList: false,
                    fitColumns: true,
                    onDblClickRow: function (rowIndex, rowData) {
                        var row = $('#choseVirtualHouseAssetTable').datagrid('getSelected');
                        if (row) {
                            for (var i in row) {
                                if (row[i] == null) {
                                    row[i] = '';
                                }
                            }
                            $('#move_to_assets_houseStoreCoding').val('');
                            $('#move_to_assets_houseCoding').val(row.houseCoding);
                            $('#move_to_assets_choseHouse').val(row.keyAdministrator);
                            $('#choseHouseAssetDlg').dialog('close');
                        }
                    }
                });
        }
    }
    choseHouseDataAsset(1);
}
//修改读数
function readingsModification() {
    $.messager.confirm('交房抄表', '如果只是录入 合约 尚未 交房 ，则不需要填写读数！', function (r) {
        if (r) {
            $(".inputHide").prop({disabled: false});
            $('#aShowHide').hide();
        }
    });
}


//添加租客意向人
function addIntended() {
    $("#addIntendedDlg").dialog({
        title: '添加意向人',
        top: getTop(150),
        left: getLeft(600),
        width: 600,
        height: 150,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#addIntendedDlg input").val('');
        }
    });
    queryRenter(1, 0);
    $("#addIntendedDlg").dialog('open');

}
function doAddIntended() {
    var ipName = $("#intendedPopName").val();
    var ipTel = $("#intendedPopPhone").val();

    if (ipName == "" || ipTel == "") {
        myTips('内容不能为空！', 'error');
        return;
    }

    $.post("../insertIntendedPerson.action", {
        ipName: ipName,
        ipTel: ipTel,
        ipUserId: _loginUserId,
        ipDepartmentId: _loginDepartment,
        ipStorefrontId: _loginStore,
        ipState: '待定',
    }, function (data) {
        if (data.code < 0) {
            myTips(data.msg, "error");
        } else {

            myTips("添加成功！", "success");
            queryRenter(1, 0);
//			queryRenter1(1,0);
            $("#addIntendedDlg").dialog('close');
        }
    });
}
//查询意向人信息
function queryIntended(page, type) {
    var startNum = (parseInt(page) - 1) * 20;
    var endNum = 20;
    var ipName = $("#searchIntendedName").val();
    var ipTel = $("#searchIntendedPhone").val();
    var ipUserId = $("#searchRegisterGetUserId").val();
    var ipState = $("#searchIpState").val();
    var startTime = $('#searchTimeStart').val();
    var endTime = $('#searchTimeEnd').val();
    if (endTime != '') {
        endTime = new Date(endTime);
        endTime.setDate(endTime.getDate() + 1);
        endTime = formatDate(endTime);
    }
    // 意向人信息表导入数据
    $.post("../selectIntendedPerson.action", {
        startNum: startNum,
        endNum: endNum,
        ipName: ipName,
        ipTel: ipTel,
        ipUserId: ipUserId,
        ipState: ipState,
        startTime: startTime,
        endTime: endTime,
    }, function (data) {
        if (data.code < 0) {
            sourcePage(0, 0, 0);
            $('#intendedDg').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
            return;
        }
        data = data.body;
        for (var i in data) {
            for (var j in data[i]) {
                if (data[i][j] == null) {
                    data[i][j] = '';
                }
            }
        }
        if (page == 1 && type == 0) {
            sourcePage(data[0].totalNum, page, 0);
        }
        $("#intendedDg").datagrid("loadData", data);
        var indexNum = $('#intended_index').val();
        if (indexNum == '' || indexNum == null) {
            indexNum = 0;
        }
        $('#intendedDg').datagrid('selectRow', indexNum);
    });
}

//选择租客表导入数据
function queryRenters(page, type) {
    var startNum = (parseInt(page) - 1) * 10;
    var endNum = 10;
    var renterNames = $("#searchRenterNames").val();
    var renterPhones = $("#searchRenterPhones").val();
    var searchRenterTypes = $('#searchRenterTypes').val();
    if (searchRenterTypes == '意向人') {
        $('#choseRentersTable').datagrid('hideColumn', 'renterPopName');
        $('#choseRentersTable').datagrid('hideColumn', 'renterPopTelephone');
        $('#choseRentersTable').datagrid('hideColumn', 'renterPopIdcard');
        $('#choseRentersTable').datagrid('showColumn', 'ipName');
        $('#choseRentersTable').datagrid('showColumn', 'ipTel');
        $('#choseRentersTable').datagrid('showColumn', 'popIdcard');
        $.post("../selectIntendedPerson.action", {
            startNum: startNum,
            endNum: endNum,
            ipName: renterNames,
            ipTel: renterPhones,
        }, function (data) {
            if (data.code < 0) {
                sourcePage(0, 0, 2);
                $('#choseRentersTable').datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: data.msg
                });
            } else {
                data = data.body;
                if (page == 1 && type == 0) {
                    sourcePage(data[0].totalNum, page, 2);
                }
                $("#choseRentersTable").datagrid("loadData", data);
            }
        }, "json");
    } else if (searchRenterTypes == '已有租客') {
        $('#choseRentersTable').datagrid('showColumn', 'renterPopName');
        $('#choseRentersTable').datagrid('showColumn', 'renterPopTelephone');
        $('#choseRentersTable').datagrid('showColumn', 'renterPopIdcard');
        $('#choseRentersTable').datagrid('hideColumn', 'ipName');
        $('#choseRentersTable').datagrid('hideColumn', 'ipTel');
        $('#choseRentersTable').datagrid('hideColumn', 'popIdcard');
        $.post("../selectHouseRentName.action", {
            startNum: startNum,
            endNum: endNum,
            renterPopName: renterNames,
            renterPopTelephone: renterPhones,
        }, function (data) {
            if (data.code < 0) {
                sourcePage(0, 0, 2);
                $('#choseRentersTable').datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: data.msg
                });
            } else {
                data = data.body;
                if (page == 1 && type == 0) {
                    sourcePage(data[0].totalNum, page, 2);
                }
                $("#choseRentersTable").datagrid("loadData", data);
            }
        }, "json");
    }
}

/**
 * 选择房源-显示列表-查数据
 */
function choseHouseDataAsset(page) {
    var relation = $('#searchBelongTypeAsset').val();
    var startNum = (parseInt(page) - 1) * 10;
    var onePageNums = 10;
    var qhAddCity = $('#searchAddCity').find('option:selected').text();
    var qhAddDistrict = $('#searchAddDistrictAsset').find('option:selected').text();
    var qhAddZone = $('#searchAddZone').find('option:selected').text();
    var qhAddCommunity = $('#searchAddCommunityAsset').val();
    var qhAddBuilding = $('#searchAddBuildingAsset').val();
    var qhAddDoorplateno = $('#searchAddDoorplatenoAsset').val();
    var virtualType = $('#searchVirtualType2').val();
    var searchVirtualName = $('#searchVirtualName2').val();
    var searchVirtualContact = $('#searchVirtualContact2').val();
    if (relation == 1) {
        $.post('../queryHouseStoreCommon.action', {
            startNum: startNum,
            endNum: onePageNums,
            hsAddCity: qhAddCity,
            hsAddDistrict: qhAddDistrict,
            hsAddZone: qhAddZone,
            hsAddCommunity: qhAddCommunity,
            hsAddBuilding: qhAddBuilding,
            hsAddDoorplateno: qhAddDoorplateno,
        }, function (data) {
            if (data.code < 0) {
                initPage(0, onePageNums, 0);
                $('#choseTrusteeshipAssetTable').datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: data.msg
                });
            } else {
                data = data.body;
                if (page == 1) {
                    initPage(data[0].totalNum, onePageNums, 0);
                }
                $("#choseTrusteeshipAssetTable").datagrid("loadData", data);
            }
        });
    }
    if (relation == 2) {
        $.post("../virtualProperty.action", {
            startNum: startNum,
            endNum: onePageNums,
            virtualType: virtualType,
            keyAdministrator: searchVirtualName,
            keyNumber: searchVirtualContact,
        }, function (data) {
            if (data.code < 0) {
                initPage(0, onePageNums, 1);
                $('#choseVirtualHouseAssetTable').datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: data.msg
                });
            } else {
                if (page == 1) {
                    initPage(data.body[0].totalNum, onePageNums, 1);
                }
                $("#choseVirtualHouseAssetTable").datagrid("loadData", data.body);
            }
        });
    }
}

/**
 * 分页初始化
 */
function initPage(totalNum, onePageNums, type) {
    var pageCount = Math.ceil(totalNum / onePageNums);
    if (type == 0) {
        $("#choseTrusteeshipAssetPage").remove();
        $("#choseTrusteeshipAssetPageDiv").append("<div class='tcdPageCode' id='choseTrusteeshipAssetPage' style='text-align:center;'></div>");
        $("#choseTrusteeshipAssetPage").createPage({
            onePageNums: onePageNums,
            totalNum: totalNum,
            pageCount: pageCount,
            current: 1,
            backFn: function (p) {
                if (p <= pageCount) {
                    choseHouseDataAsset(p);
                }
            }
        });
    }
    if (type == 1) {
        $("#choseVirtualHouseAssetPage").remove();
        $("#choseVirtualHouseAssetPageDiv").append("<div class='tcdPageCode' id='choseVirtualHouseAssetPage' style='text-align:center;'></div>");
        $("#choseVirtualHouseAssetPage").createPage({
            onePageNums: onePageNums,
            totalNum: totalNum,
            pageCount: pageCount,
            current: 1,
            backFn: function (p) {
                if (p <= pageCount) {
                    choseHouseDataAsset(p);
                }
            }
        });
    }
}


//资产导入信息
function queryAssetsList(page, type) {
    var startNum = (parseInt(page) - 1) * 5;
    var endNum = 5;
    var searchCommunity = $('#searchCommunity_asset').val();
    var searchBuilding = $('#searchBuilding_asset').val();
    var searchDoorplateno = $('#searchDoorplateno_asset').val();
    var searchVirtualType = $('#searchVirtualType_asset').val();
    var searchVirtualName = $('#searchVirtualName_asset').val();
    var saType = $('#searchSaType').val();
//	var saUse = $('#searchSaUse').val();
    var saNumber = $('#searchSaNumber').val();
    var saName = $('#searchSaName').val();
    var saBrand = $('#searchSaBrand').val();
    var saModel = $('#searchSaModel').val();

    $.post("../assetsInRentDb.action", {
        startNum: startNum,
        endNum: endNum,
        addCommunity: searchCommunity,
        addBuilding: searchBuilding,
        addDoorplateno: searchDoorplateno,
        virtualType: searchVirtualType,
        keyAdministrator: searchVirtualName,
        saType: saType,
//		saUse: saUse,
        saNumber: saNumber,
        saName: saName,
        saBrand: saBrand,
        saModel: saModel,
    }, function (data) {
        if (data.code < 0) {
            dbSourcePage(0, 0, 20);
            $('#assetsListTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        } else {
            if (page == 1 && type == 0) {
                dbSourcePage(data.body[0].totalNum, page, 20);
            }
            for (var i in data.body) {
                if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1
                    || data.body[i].addCity == '库房' || data.body[i].addCity == '公区' || data.body[i].addCity == '供应商') {
                    data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
                } else {
                    data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
                }
            }
            $("#assetsListTable").datagrid("loadData", data.body);
        }
    });
}
//添加一条资产到需要迁入的资产列表里
function addOneToNeedTo(index, flag) {
    var row = $('#assetsListTable').datagrid('getData').rows[index];
    var rows = $('#assetsMoveInTable').datagrid('getRows');
    var rows2;
    if (flag == 1) {
        rows2 = $('#assetsInfoTable').datagrid('getRows');
    } else {
        rows2 = $('#assetsInfoTable2').datagrid('getRows');
    }
    for (var i in rows) {
        if (rows[i].saId == row.saId) {
            myTips('此条资产已经添加到下方列表！', 'error');
            return;
        }
    }
    for (var i in rows2) {
        if (rows2[i].saId == row.saId) {
            myTips('该资产已在该房内，无需迁移！', 'error');
            return;
        }
    }
    $('#assetsMoveInTable').datagrid('insertRow', {
        index: 0,
        row: row
    });
}

//账户类型和账号联动
function changeWay1(type) {
    var faPaymentType = $("#depositFinancialWay").find("option:selected").text();
    $("#depositFinancialBankNums").val('');
    $("#depositFinancialAccountNums").val('');
    $("#depositFinancialAccountBelong").val('');
    $("#depositAccountName").empty();
    $("#depositAccountName").append("<option></option>");
    if (faPaymentType == '') {
        return;
    }
    $.post("../selectNamePublic.action", {
        faPaymentType: faPaymentType,
    }, function (data) {
        $("#depositAccountName").empty();
        $("#depositAccountName").append("<option></option>");
        for (var i in data.body) {
            $("#depositAccountName").append(
                "<option value='" + data.body[i].faId + "*#*" + data.body[i].faBelonging + "*#*" + data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
        }
        if (type != 0) {
            for (var i in data.body) {
                if (data.body[i].faId == type) {
                    $("#depositAccountName").val(data.body[i].faId + "*#*" + data.body[i].faBelonging + "*#*" + data.body[i].faAccount);
                    getAccountId1();
                }
            }
        }
    });
}

function getAccountId1() {
    if ($("#depositAccountName").val() == '') {
        return;
    }
    $("#depositFinancialBankNums").val($("#depositAccountName").val().split("*#*")[0]);
    $("#depositFinancialAccountNums").val($("#depositAccountName").val().split("*#*")[2]);
    $("#depositFinancialAccountBelong").val($("#depositAccountName").val().split("*#*")[1]);
}

//以下为未租


function autoSendMsg(value, row, index) {

    if (row.hsAutoSendMsg == "1") {
        console.log(1111);
        return "<span style='text-decoration:none;color:green;'>自动发送<span>";
    } else {
        return "<span style='text-decoration:none;color:blue;'>手动发送<span>";
    }
}


//加载下拉列表
function loadSelectList() {
    for (var i in _loginCompanyRentDistrict) {
        $("#sourceDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
        $('#choseDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
    }
    $("#taskAffairsRepairResponsibility").append("<option value = '负责人'>负责人</option>");
    for (var i in _payType) {
        $('.financial_payType').append("<option value='" + _payType[i] + "'>" + _payType[i] + "</option>");
    }
    for (var i in _taskType) {
        $("#taskrepairTypeRp").append("<option value = '" + _taskType[i] + "'>" + _taskType[i] + "</option>");
        $("#repairTypeRp").append("<option value = '" + i + "'>" + _taskType[i] + "</option>");
    }
    $("#repairResponsibility").append("<option value = '负责人'>负责人</option>");
    for (var i = 0; i < _househrState.length; i++) {
        $(".add_source_state").append("<option value = '" + i + "'>" + _househrState[i] + "</option>");
        $(".add_trusteeship_state").append("<option value = '" + i + "'>" + _househrState[i] + "</option>");
    }
    for (var i = 0; i < _sectionType.length; i++) {
        $(".add_source_sectionType").append("<option value = '" + i + "'>" + _sectionType[i] + "</option>");
        $(".add_trusteeship_sectionType").append("<option value = '" + i + "'>" + _sectionType[i] + "</option>");
    }
    for (var i = 0; i < _houseType.length; i++) {
        $(".add_source_houseType").append("<option value = '" + i + "'>" + _houseType[i] + "</option>");
        $(".add_trusteeship_houseType").append("<option value = '" + i + "'>" + _houseType[i] + "</option>");
    }
    for (var i = 0; i < _contractType.length; i++) {
        $(".add_source_contract_type").append("<option value = '" + _contractType[i] + "'>" + _contractType[i] + "</option>");
        $(".add_trusteeship_contract_type").append("<option value = '" + _contractType[i] + "'>" + _contractType[i] + "</option>");
        $("#addHrContractType").append("<option value = '" + _contractType[i] + "'>" + _contractType[i] + "</option>");
    }
    for (var i = 0; i < _hrPaymentType.length; i++) {
        $(".add_payment_type").append("<option value = '" + _hrPaymentType[i] + "'>" + _hrPaymentType[i] + "</option>");
    }
    for (var i in _eventApprovalType) {
        $('.eventType').append("<option value='" + _eventApprovalType[i] + "'>" + _eventApprovalType[i] + "</option>");
        $('#searchEventType').append("<option value='" + _eventApprovalType[i] + "'>" + _eventApprovalType[i] + "</option>");
    }
    for (var i = 0; i < _bankType.length; i++) {
        $(".add_source_bank_type").append("<option value = '" + i + "'>" + _bankType[i] + "</option>");
        $(".add_trusteeship_bank_type").append("<option value = '" + i + "'>" + _bankType[i] + "</option>");
    }
    for (var i = 0; i < _repHopeTime.length; i++) {
        $(".repair_hope_select").append("<option value = '" + _repHopeTime[i] + "'>" + _repHopeTime[i] + "</option>");
    }
    for (var i = 0; i < _repResponsibility.length; i++) {
        $("#maRepairResponsibility").append("<option value = '" + _repResponsibility[i] + "'>" + _repResponsibility[i] + "</option>");
        $(".repair_responsibility").append("<option value = '" + i + "'>" + _repResponsibility[i] + "</option>");
    }
    for (var i = 0; i < _eventType.length; i++) {
        $("#marepairTypeRp").append("<option value = '" + _eventType[i] + "'>" + _eventType[i] + "</option>");
        $(".repair_type_rp").append("<option value = '" + i + "'>" + _eventType[i] + "</option>");
    }
    for (var i = 0; i < _renterCheckoutNature.length; i++) {
        $("#checkout_checkoutNature").append("<option value = '" + i + "'>" + _renterCheckoutNature[i] + "</option>");
        $("#renterCheckoutWhy").append("<option value = '" + i + "'>" + _renterCheckoutNature[i] + "</option>");
    }
    for (var i in _acountType) {
        $('.add_financial_way').append("<option value='" + i + "'>" + _acountType[i] + "</option>");
    }
    for (var i = 0; i < _direction.length; i++) {
        $(".add_trusteeship_direction").append("<option value = '" + i + "'>" + _direction[i] + "</option>");
    }
    for (var i = 0; i < _followWay.length; i++) {
        $(".follow_way").append("<option value = '" + i + "'>" + _followWay[i] + "</option>");
    }
    for (var i in _theOwnershipType) {
        $('#searchJfTheOwnershipType').append("<option value='" + i + "'>" + _theOwnershipType[i] + "</option>");
    }
    for (var i in _saUse) {
        $('#searchSaUse').append("<option value='" + i + "'>" + _saUse[i] + "</option>");
    }
    for (var i in _saType) {
        $('#searchSaType').append("<option value='" + _saType[i] + "'>" + _saType[i] + "</option>");
    }
    for (var i in _saType) {
        $('#add_asset_type').append('<option value="' + _saType[i] + '">' + _saType[i] + '</option>');
    }
    for (var i in _assetsType) {
        $('#add_asset_classify').append('<option value="' + _assetsType[i].type + '">' + _assetsType[i].type + '</option>');
    }
    for (var i in _saUse) {
        $('#add_asset_use').append('<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
    }
    for (var i in _saStatus) {
        $('#add_asset_status').append('<option value="' + _saStatus[i] + '">' + _saStatus[i] + '</option>');
    }
}
function countTotalFee() {
    var beginTime = $('#addHrBegin').val();
    var totalFee = 0.00;
    if ($("#advanceMode").val() == 2) {//整月
        totalFee = countBugMonth(beginTime, 2);
    } else {
        totalFee = countBugMonth(beginTime, 1);
    }
    $("#totalFee").val(totalFee);
}
function threeMonth() {
    var begin = new Date($('#addHrBegin').val());
    begin.setMonth(begin.getMonth() + 3);
    begin.setDate(begin.getDate() - 1);
    var end = formatDate(begin);
    $("#addHrEnd").val(end);
}
function halfYear() {
    var begin = new Date($('#addHrBegin').val());
    begin.setMonth(begin.getMonth() + 6);
    begin.setDate(begin.getDate() - 1);
    var end = formatDate(begin);
    $("#addHrEnd").val(end);
}
function oneYear() {
    var begin = new Date($('#addHrBegin').val());
    begin.setFullYear(begin.getFullYear() + 1);
    begin.setDate(begin.getDate() - 1);
    var end = formatDate(begin);
    $("#addHrEnd").val(end);
}
function countBugMonth(addSourceBegin, type) {//类型为3时，仅返回整月租金。为2时，返回整月费用总额。为1时，返回自然月费用总额
    var totalMoney = parseFloat($('#addHrRentPrice').val());
    var newDate = new Date(addSourceBegin);
    var lastDate = getCurrentMonthLast(newDate);
    lastDate = new Date(lastDate).format('yyyy-MM-dd hh:mm:ss')
    var days = (new Date(lastDate).getTime() - new Date(newDate).getTime()) / (1000 * 60 * 60 * 24) + 1;
    var totalDate = getCurrentMonthLast(newDate).getDate();
    if (type == 3) {
        return Math.abs((totalMoney / totalDate) * days).toFixed(2);
    }
    if (type == 2) {
        totalMoney = 0.00;
        var inputArray = $('.setRenterNewFinancialDiv input');
        for (var i = 0; i < inputArray.length - 2; i++) {
            if ($("#" + inputArray[i].id).val() == "") {
                continue;
            }
            if (inputArray[i].className.indexOf('payment') > -1) {
                var temporary = (parseFloat($('#' + inputArray[i].id).val()) / totalDate) * days;
                totalMoney = mySum(totalMoney, temporary);
            } else {
                totalMoney = mySum(totalMoney, parseFloat($("#" + inputArray[i].id).val()));
            }
        }
    }
    if (type == 1) {
        totalMoney = 0.00;
        var inputArray = $('.setRenterNewFinancialDiv input');
        console.log(inputArray.length);
        for (var i = 0; i < inputArray.length - 2; i++) {
            if ($("#" + inputArray[i].id).val() == "") {
                continue;
            }
            totalMoney = mySum(parseFloat(totalMoney), parseFloat($("#" + inputArray[i].id).val()));
        }
    }
    return Math.abs(totalMoney).toFixed(2);
}
function simpleCountBugMonth(addSourceBegin, value) {
    var newDate = new Date(addSourceBegin);
    var lastDate = getCurrentMonthLast(newDate);
    lastDate = new Date(lastDate).format('yyyy-MM-dd hh:mm:ss')
    var days = (new Date(lastDate).getTime() - new Date(newDate).getTime()) / (1000 * 60 * 60 * 24) + 1;
    var totalDate = getCurrentMonthLast(newDate).getDate();
    var totalMoney = (value / totalDate) * days;
    return Math.abs(totalMoney).toFixed(2);
}