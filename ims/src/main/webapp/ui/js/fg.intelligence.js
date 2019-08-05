$(function () {
    $('#deviceInfoTable').datagrid({
        // 表格行单击事件
        onClickRow: function (rowIndex, rowData) {
            _virtualIndex = rowIndex;
            var row = $('#deviceInfoTable').datagrid('getSelected');
            if (rowData.devBrandId == 20 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
                $("#deviceControl").attr("onclick", "subDevice()");
            } else if (rowData.devBrandId == 23 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
                $("#deviceControl").attr("onclick", "mdElectricBoxDlg()");
            } else if (rowData.devBrandId == 25) {
                $("#deviceControl").attr("onclick", "antDeviceOperation()");
            } else {
                $("#deviceControl").attr("onclick", "chooseOperateDlg()");
            }

        },
        // 表格行双击事件
        onDblClickRow: function (rowIndex, rowData) {
            console.log(rowData)
            if (rowData.devBrandId == 20 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
                subDevice();
            } else if (rowData.devBrandId == 23 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
                mdElectricBoxDlg();
            } else if (rowData.devBrandId == 22) {
                personInfomaction();
            } else if (rowData.devBrandId == 20 && rowData.devFirstType == 25) {
                if (rowData.devSecondType == 34) {
                    $('#dianyuanId').hide();
                    intelligentHanger();
                } else {
                    $('#dianyuanId').show();
                    intelligentHanger();
                }
            } else if (rowData.devBrandId == 21 && (rowData.devFirstType == 14 || rowData.devSecondType == 15)) {
                hydrometerDlg();
            } else if (rowData.devBrandId == 25) {
                antDeviceOperation();
            } else {
                chooseOperateDlg();
            }
        }
    });
    $("#queryDeviceTable").datagrid({
        // 表格行双击事件
        onDblClickRow: function (rowIndex, rowData) {
            $("#queryDevice").val(rowData.mac);
            $.ajax({
                type: "post",
                url: "http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus",
                data: {
                    projectCode: $("#projectCode").val(),
                    mac: rowData.mac
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        data = data.body;
                        var devRoad = "";
                        for (var i in data) {
                            console.log(data[i].addr);
                            devRoad += data[i].addr + ",";
                        }
                        devRoad = devRoad.substring(0, devRoad.length - 1);
                        $("#subDeviceNumer").val(devRoad);
                    }
                }
            });
            $("#queryDeviceDlg").dialog('close');
        }
    })
    $("#housePopulationTable").datagrid({
        // 表格行双击事件
        onDblClickRow: function (rowIndex, rowData) {
            $("#antUserName").val(rowData.popName);
            $("#antPhoneNumber").val(rowData.popTelephone);
            $("#popId").val(rowData.popId);
            $("#getHousePopulationDlg").dialog('close');
        }
    });
    $("#selectPasswordTable").datagrid({
        // 表格行双击事件
        onDblClickRow: function (rowIndex, rowData) {
            $("#antUserName").val(rowData.popName);
            $("#antPhoneNumber").val(rowData.popTelephone);
            $("#japId").val(rowData.japId);
            $("#japPasswordId").val(rowData.japPasswordId);
            $("#selectPasswordDlg").dialog('close');
        }
    });

    $("#personInfomationDivTable").datagrid({
        onDblClickRow: function (rowIndex, rowData) {
            var photo = rowData.jftiPhotoUrl;
            $("#personPhotoDiv").dialog({
                title: '照片 ',
                top: getTop(280),
                left: getLeft(650),
                width: 400,
                height: 533,
                closed: true,
                cache: false,
                modal: true,
                onClose: function () {
                    $("#img").val('');
                }
            });
            if (photo.length > 0) {
                $("#img").attr({src: photo});
                $("#al").attr({href: photo});
                $("#personPhotoDiv").dialog("open");
            } else {
                myTips("照片不存在！", "error");
            }
        }
    })
    queryDeviceInfo(1);
    for (var i in _loginCompanyRentDistrict) {

        $("#sourceDistrict").append(
            "<option value = '" + _loginCompanyRentDistrict[i] + "'>"
            + _loginCompanyRentDistrict[i] + "</option>");
        $('#choseDistrict').append(
            '<option value="' + _loginCompanyRentDistrict[i] + '">'
            + _loginCompanyRentDistrict[i] + '</option>');
    }
    selectAllPlace();
    selecetAllFistType();
});

function mouseout() {
    var Centigrade = $("#Centigrade").val();
    if (Centigrade < 25 || Centigrade > 99) {
        myTips("溫度在35-99之間", "error");
    }

}

// 导入全部设备信息
function queryDeviceInfo(page) {
    var pageSize = 15;
    var startPage = (parseInt(page) - 1) * pageSize;
    var devBrandId = $('#searchBrandGetBrandId').val();
    var devNickname = $('#searchDevNickname').val();
    var devType = $('#searchDevTypeGetDeviceName').val();
    var devFirstType = $("#searchDevTypeGetDeviceOneId").val();
    var devSecondType = $("#searchDevTypeGetDeviceTwoId").val();
    var deviceAddress = $("#searchDeviceAddress").val();//设备安装地址
    // var community = $("#searchCommunity").val();
    // var building = $("#searchBuilding").val();
    // var doorplateno = $("#searchDoorplateno").val();
    var devSn = $("#searchDevSnCode").val();
    $.post("../selectAllDevice.action", {
        startNum: startPage,
        endNum: pageSize,
        devBrandId: devBrandId,
        devType: devType,
        devFirstType: devFirstType,
        devSecondType: devSecondType,
        devSn: devSn,
        devNickname: devNickname,
        devAddress:deviceAddress,
        // hsAddCommunity: community,
        // hsAddBuilding: building,
        // hsAddDoorplateno: doorplateno,
        splitFlag: 1
    }, function (data) {
        console.log(data.body)
        if (data.code < 0) {
            $('#deviceInfoTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
            if (page == 1) {
                notCountPage(0, 0, "queryDeviceInfo", "deviceInfoTable");
            } else {
                notCountPage(page, 0, "queryDeviceInfo", "deviceInfoTable");
            }
        } else {
            data = data.body;
            if (data.length < pageSize) {
                notCountPage(page, 2, "queryDeviceInfo", "deviceInfoTable");
            } else {
                notCountPage(page, 1, "queryDeviceInfo", "deviceInfoTable");
            }
            var count = 0;

            for (var i in data) {
                data[i].detailedAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
                var devJson = data[i];
                var eleAmount;
                var cmdCount;
                var signalQuality;
                if (devJson.devBrandId == 22) {

                    $.post("http://www.fangzhizun.com/device/wo/DeviceFaceController", {
                        co: _loginCompany,
                        brandId: devJson.devBrandId,
                        instruction: "控制设备-人脸识别",

                    }, function (result) {
                        if (result.code == 0) {
                            var body = result.body
                            console.log(body)
                            for (var k in data) {
                                for (var j in body) {
                                    if (data[k].devSn == body[j].deviceKey){
                                        var tag = body[j].tag
                                        if (_loginCompany == tag.substring(0, tag.length - 2)) {
                                            var state = body[j].onlineState
                                            if (state == 1) {
                                                data[k].devState = "在线";
                                                $("#deviceInfoTable").datagrid("loadData", data);
                                            } else {
                                                data[k].devState = "离线";
                                                $("#deviceInfoTable").datagrid("loadData", data);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    })
                }
                //查询设备数据
                else if (devJson.devBrandId == 10 && devJson.devFirstType == 3 && devJson.devSecondType == 3) {
                    $.post("http://www.fangzhizun.com/device/api", {
                        brandId: devJson.devBrandId,
                        instruction: "读取状态",
                        appKey: devJson.devAuthId,
                        secret: devJson.devAuthSecret,
                        code: devJson.devSpare2,
                    }, function (data1) {
                        for (var j in data) {
                            if (data[j].devSpare2 == data1.body.code) {
                                if (data1.code == 1) {
                                    //电量
                                    eleAmount = JSON.parse(data1.body.eleAmount);
                                    //开门次数
                                    cmdCount = JSON.parse(data1.body.cmdCount);
                                    //信号质量
                                    signalQuality = JSON.parse(data1.body.signalQuality);

                                    data[j].devStatus = "<div style='float:left;margin:0 0 0 10px;'><img src='img/battery.png' width='18px' style='float:left;margin:0 0 0 10px;'><span style='float:left;'>" + eleAmount + "%</span></div>"
                                        + "<div style='float:left;margin:0 0 0 10px;'><img src='img/signal.png' width='18px' style='float:left; margin:0 0 0 10px;'><span style='float:left;'>" + signalQuality + "格</span></div>"
                                        + "<div style='float:left;margin:0 0 0 10px;'><img src='img/frequency.png' width='18px' style='float:left; margin:0 0 0 10px;'><span style='float:left;'>" + cmdCount + "次</span></div>";
                                    $("#deviceInfoTable").datagrid("loadData", data);
                                } else {
                                    data[j].devStatus = "暂无数据";
                                    $("#deviceInfoTable").datagrid("loadData", data);
                                }
                            }
                        }
                    });
                }
                //查询设备状态
                else if (devJson.devBrandId == 20) {//云海
                    showLoading();
                    $.post("../queryDeviceStatus.action", {
                        devId: devJson.id,
                        devAuthId: devJson.devAuthId,
                    }, function (data1) {
                        for (var j in data) {
                            if (data1.body == null || data1.body == '') {
                                continue;
                            }
                            if (data[j].devAuthId == data1.body[0].sn) {
                                count++;
                                if (data1.code == 1) {
                                    hideLoading();
                                    //状态码
                                    var online = data1.body[0].online;
                                    var devState = '';
                                    if (online) {
                                        devState = '在线';
                                    } else {
                                        devState = '离线';
                                    }
                                    var status = data1.body[0].status;
                                    var switchingState = "";
                                    if (data1.body[0].type == 35) {//插座
                                        var twoState = parseInt(status.slice(8, 12), 16).toString(2);
                                        if (twoState.length < 16) {
                                            twoState = "00" + twoState;
                                        }
                                        switchingCode = twoState.slice(0, 1);
                                        switchingState = switchingCode == 1 ? '通电' : '断电';
                                        switchingState = "：" + switchingState;
                                    } else if (data1.body[0].type == 1) {//插座
                                        switchingState = status == '8080' ? '通电' : '断电';
                                        switchingState = "：" + switchingState;
                                    } else if (data1.body[0].type == 16) {//窗帘
                                        switchingState = status == 'E080' ? '已开' : '已关';
                                        switchingState = "：" + switchingState;
                                    } else if (data1.body[0].type == 30) {//百分比窗帘
                                        switchingCode = status.slice(8, 12);
                                        switchingState = switchingCode == 'E040' ? '已关' : '已开';
                                        switchingState = "：" + switchingState;
                                    } else if (data1.body[0].type == 3) {//灯
                                        switchingState = status == '8080' ? '开灯' : '关灯';
                                        switchingState = "：" + switchingState;
                                    } else if (data1.body[0].type == 13) {//冷暖灯
                                        switchingCode = status.slice(0, 2);
                                        switchingState = switchingCode == '80' ? '开灯' : '关灯';
                                        console.log(parseInt(parseInt(status.slice(2, 4), 16)));
                                        var brightness = "";
                                        var colorTemperature = "";
                                        if (parseInt(parseInt(status.slice(2, 4), 16) * 6.6) == "0") {
                                            brightness = ' ; 亮度：' + '1%';
                                            colorTemperature = ' ; 色温：' + '1%';
                                        } else {
                                            brightness = ' ; 亮度：' + parseInt(parseInt(status.slice(2, 4), 16) * 6.6) + '%';
                                            colorTemperature = ' ; 色温：' + parseInt(parseInt(status.slice(4, 6), 16) / 1.27) + '%';
                                        }
                                        if (switchingState == '开灯') {
                                            switchingState = '：' + switchingState + brightness + colorTemperature;//总显示
                                        } else {
                                            switchingState = '：' + switchingState;//总显示
                                        }
                                    } else if (data1.body[0].type == 4) {//调节灯
                                        switchingCode = status.slice(0, 2);
                                        switchingState = switchingCode == '80' ? '开灯' : '关灯';
                                        var brightness = "";
                                        var colorTemperature = "";
                                        if (parseInt(parseInt(status.slice(2, 4), 16) * 6.6) == "0") {
                                            brightness = ' ; 亮度：' + '1%';
                                        } else {
                                            brightness = ' ; 亮度：' + parseInt(parseInt(status.slice(2, 4), 16) * 6.6) + '%';
                                        }
                                        if (switchingState == '开灯') {
                                            switchingState = '：' + switchingState + brightness;//总显示
                                        } else {
                                            switchingState = '：' + switchingState;//总显示
                                        }
                                    } else if (data1.body[0].type == 10) {//空调
                                        switchingCode = status.slice(26, 28);
                                        var mode = "";//模式
                                        var speed = "";//风速
                                        switchingState = switchingCode == '21' ? '开' : '关';
                                        var roomTemperature = ' ; 室温：' + parseInt(status.slice(0, 2), 16) + ' °c';//室温
                                        var temperature = ' ; 温度：' + parseInt(parseInt(status.slice(8, 10)) + parseInt(16)) + ' °c';//温度
                                        if (status.slice(6, 8) == '00') {
                                            mode = ' ; 模式：' + '自动';//自动模式
                                        } else if (status.slice(6, 8) == '01') {
                                            mode = ' ; 模式：' + '制冷';//制冷模式
                                        } else if (status.slice(6, 8) == "02") {
                                            mode = ' ; 模式：' + '除湿';//除湿模式
                                        } else if (status.slice(6, 8) == "03") {
                                            mode = ' ; 模式：' + '送分';//送分模式
                                        } else if (status.slice(6, 8) == "04") {
                                            mode = ' ; 模式：' + '制热';//制热模式
                                        }
                                        if (status.slice(10, 12) == '00') {
                                            speed = ' ; 风速：' + '自动';//自动风速
                                        } else if (status.slice(10, 12) == '01') {
                                            speed = ' ; 风速：' + '低';//低风速
                                        } else if (status.slice(10, 12) == '02') {
                                            speed = ' ; 风速：' + '中';//中风速
                                        } else if (status.slice(10, 12) == "03") {
                                            speed = " ; 风速：" + "高";//高风速
                                        }
                                        if (switchingState == '开') {
                                            switchingState = '：' + switchingState + roomTemperature + temperature + mode;//总显示
                                        } else {
                                            switchingState = '：' + switchingState + roomTemperature;//总显示
                                        }

                                    }
                                    if (devState == '在线') {
                                        data[j].devState = '状态' + switchingState;
                                        if (data[j].devState == '状态') {
                                            data[j].devState = '在线' + switchingState;
                                        }
                                    } else {
                                        data[j].devState = devState;
                                    }
                                    $("#deviceInfoTable").datagrid("loadData", data);
                                } else {
                                    data[j].devState = "离线";
                                    $("#deviceInfoTable").datagrid("loadData", data);
                                }
                            }
                        }
                    });
                    $("#deviceInfoTable").datagrid("loadData", data);
                } else if (devJson.devBrandId == 10 && devJson.devFirstType == 3 && devJson.devSecondType == 3) {
                    data[i].devState = "在线";
                    $("#deviceInfoTable").datagrid("loadData", data);
                } else if (devJson.devBrandId == 23 && devJson.devFirstType == 16 && devJson.devSecondType == 16) {
                    $.post("http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus", {
                        projectCode: devJson.devId,
                        mac: devJson.devSn,
                    }, function (data1) {
                        console.log(data1);
                        if (data1.code == 0) {
                            data1 = data1.body;
                            for (var k in data) {
                                for (var j in data1) {
                                    if (data1[j].mac == data[k].devSn && data1[j].addr == data[k].devRoad) {
                                        var devState = '';
                                        if (data1[j].online) {
                                            devState = '在线';
                                        } else {
                                            devState = '离线';
                                        }
                                        data[k].devState = devState;
                                        $("#deviceInfoTable").datagrid("loadData", data);
                                    }
                                }
                            }
                        }
                    });
                    $("#deviceInfoTable").datagrid("loadData", data);
                } else if (devJson.devBrandId == 21) {
                    $.post("http://www.fangzhizun.com/device/joy/QueryDeviceByMeterNo", {
                        meterNo: data[i].devSn,
                    }, function (result) {
                        var body = result.body
                        for (var k in data) {
                            var kdevSn = trimStr(data[k].devSn);
                            if (body.meterNo == kdevSn) {
                                console.log(result.status)
                                if (result.status == 1) {
                                    var net_state = body.net_state;
                                    var elec_state = body.elec_state;
                                    if (net_state == 1) {
                                        data[k].devState = "在线  ";
                                    } else {
                                        data[k].devState = "离线  ";
                                    }
                                    if (elec_state == 1) {
                                        if (data[k].devFirstType == 14) {
                                            data[k].devState += "开阀";
                                        } else {
                                            data[k].devState += "通电";
                                        }
                                    } else {
                                        if (data[k].devFirstType == 14) {
                                            data[k].devState += "开阀";
                                        } else {
                                            data[k].devState += "断电";
                                        }
                                    }
                                    $("#deviceInfoTable").datagrid("loadData", data);
                                } else {
                                    data[k].devState = "离线";
                                    data[k].devStatus = "暂无数据";
                                    $("#deviceInfoTable").datagrid("loadData", data);
                                }
                            }
                        }
                    })
                } else if (devJson.devBrandId == 25) {
                    var url = data[i].devSecondType == 3 ? 'DLGetInformation':'WEMQueryBasicInformation';
                    var type = data[i].devSecondType == 3 ? 1:data[i].devSecondType == 14 ? 1:2;
                    $.post('http://www.fangzhizun.com/device/ant/'+url,{
                        coId        : _loginCoId,
                        type        : type,
                        antDeviceId : data[i].devAntDeviceId
                    },function (result) {
                        var body = result.body;
                        for (var j in data){
                            if (result.code == 0){
                                if (data[j].devAntDeviceId == body.antDeviceId){
                                    data[j].devState = body.networkStatus == '3000000000001' ? '在线' : '离线';
                                }
                            }
                        }
                    });
                } else {
                    data[i].devState = "离线";
                    $("#deviceInfoTable").datagrid("loadData", data);
                }

            }
            $("#deviceInfoTable").datagrid("loadData", data);
        }
    });
}

function bindDevice1() {
    $("#bindDeviceDlg").dialog({
        title: '绑定设备',
        top: getTop(460),
        left: getLeft(650),
        width: 650,
        height: 460,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#bindDeviceDlg [clear="clear"]').val('');
            $('#bindDeviceDlg [choose="choose"]').val('');
            $("#subDevice").val('');
            $("#dobinddevice").hide();
            $("#dobindDevice1").show();
        }
    });

    if ($('#choseHouseTable').hasClass('datagrid-f')) {

    } else {
        $('#choseHouseTable').datagrid({
            columns: [[{
                field: 'hsAddDistrict',
                title: '城区',
                width: 15,
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
            }, {
                field: 'hsRegisterTime',
                title: '登记时间',
                width: 25,
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
        });
    }
    $("#bindDeviceDlg").dialog('open');
    $("#dobindDevice1").hide();
    query4StoreInfo(1, 0);

}

// 点击绑定设备
function bindDevice() {
    var row = $('#deviceInfoTable').datagrid('getSelected');
    if (row) {
        $("#bindDeviceDlg").dialog({
            title: '绑定设备',
            top: getTop(460),
            left: getLeft(650),
            width: 650,
            height: 460,
            closed: true,
            cache: false,
            modal: true,
            onClose: function () {
                $('#bindDeviceDlg [clear="clear"]').val('');
                $('#bindDeviceDlg [choose="choose"]').val('');
                $("#subDevice").val('');
            }
        });
    } else {
        myTips("请选择一条记录", "error");
        return;
    }

    if ($('#choseHouseTable').hasClass('datagrid-f')) {

    } else {
        $('#choseHouseTable').datagrid({
            columns: [[{
                field: 'hsAddDistrict',
                title: '城区',
                width: 15,
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
            }, {
                field: 'hsRegisterTime',
                title: '登记时间',
                width: 25,
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
        });
    }
    $("#bindDeviceDlg").dialog('open');
    query4StoreInfo(1, 0);
}

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
            $("#choseHouseTable").datagrid("loadData", data);

        }
    }, "json");
}

//电箱详情
function subDevice() {
    $('#subDeviceDlg').dialog({
        title: '电箱控制',
        top: getTop(150),
        left: getLeft(600),
        width: 600,
        height: 150,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#subDeviceDlg [require='require']").each(function () {
                $(this).removeClass('btn-success');
                $(this).addClass('btn-default');
            });
            $("#subDeviceDlg .btn").each(function () {
                $(this).removeAttr('disabled');
            });
            $("#moduleManagement").hide();
            $("#electricQuantity").html("");
        }
    });
    $("#moduleManagement").hide();
    var row = $("#deviceInfoTable").datagrid("getSelected");
    if (row.devRoad == null || row.devRoad == "") {
        $("#moduleManagement").show();
    }
    queryElectricBoxStatus();
    $('#subDeviceDlg').dialog("open")
}

//获取电箱状态
function queryElectricBoxStatus() {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var devRoad = row.devRoad;
    var type1 = devRoad == 1 ? 29 : devRoad == 2 ? 30 : devRoad == 3 ? 31 : devRoad == 4 ? 32 : devRoad == 5 ? 33 : devRoad == 6 ? 34 : devRoad == 7 ? 35 : devRoad == 8 ? 36 : 37;
    var type2 = devRoad == 1 ? 39 : devRoad == 2 ? 40 : devRoad == 3 ? 41 : devRoad == 4 ? 42 : devRoad == 5 ? 43 : devRoad == 6 ? 44 : devRoad == 7 ? 45 : devRoad == 8 ? 46 : 47;
    $("#open").attr("onclick", "operateDeviceDlg(" + type1 + ")");
    $("#off").attr("onclick", "operateDeviceDlg(" + type2 + ")");
    var index = $("#deviceInfoTable").datagrid("getRowIndex", row);
    $.post("../queryDeviceStatus.action", {
        devAuthId: row.devAuthId,
        devId: row.id
    }, function (data) {
        if (data.code == 1) {
            if (data.body[0].online) {
                var subDevice = parseInt(data.body[0].status.slice(4, 6));
                if (subDevice > 0) {
                    //状态码
                    var status = data.body[0].status.slice(6);
                    row.subStatus = status;
                    row.len = subDevice;
                    var devStatus = '';
                    var h = (devRoad - 1) * 10;
                    var num = 0.001 * parseInt(status.substring(h + 6, h + 10));
                    if (num || num >= 0) {
                        $("#electricQuantity").html("用电量：" + (Math.round(num * 1000) / 1000) + "kwh");
                    }
                    var subStatus = parseInt(status.slice(h, h + 2), 16).toString(2).slice(1, 2);
                    if (subStatus == 1) {
                        $("#open").removeClass('btn-default');
                        $("#open").addClass('btn-success');
                        $("#off").removeClass('btn-success');
                        $("#off").addClass('btn-default');
                    } else if (subStatus == 0) {
                        $("#off").removeClass('btn-default');
                        $("#off").addClass('btn-success');
                        $("#open").removeClass('btn-success');
                        $("#open").addClass('btn-default');
                    }
                    var rowData = {
                        index: index,
                        row: row
                    }
                    $("#deviceInfoTable").datagrid("updateRow", rowData);

                }
            } else {//设备不在线
                $("#electricQuantity").html('<span style="color: red;font-size: 18px">设备不在线！</span>');
            }
        } else {
            $("#electricQuantity").html('<span style="color: red;font-size: 18px">获取不到设备状态！</span>');
        }
    });
}

// 执行绑定设备
function dobindDevice() {
    var rows = $("#deviceInfoTable").datagrid("getSelected");
    var row = $("#choseHouseTable").datagrid("getSelected");
    var jhdDeviceIdJson = [];
    jhdDeviceIdJson.push({
        jhdHsId: row.hsId,
        jhdDeviceId: rows.id,
    });

    console.log(row)

    showLoading();
    $.post('../insertHsDevice.action', {
        jhdDeviceIdJson: JSON.stringify(jhdDeviceIdJson),
        co: _loginCompany + "/"
    }, function (data) {
        hideLoading();
        if (data.code < 0) {
            $.messager.alert('通知', '绑定失败！原因：' + data.msg, 'error');
            return;
        } else {
            $('#bindDeviceDlg').dialog('close');
            myTips('绑定成功！', 'success');
            queryDeviceInfo(1)
            // 调用queryDeviceInfo()因异步查询得不到想要的结果，使用替代方案更新表格数据
            /*
             * for (var i in row) { $('#deviceInfoTable').datagrid('insertRow', {
             * row : rows[i] }); }
             */
        }
    });
}


// 分页操作
function sourcePage(totalNum, page, type) {
    var pageNum = Math.ceil(totalNum / 10);
    if (type == 1) {
        pageNum = Math.ceil(totalNum / 10);
        $("#choseHousePage").remove();
        $("#choseHousePageDiv")
            .append("<div class='tcdPageCode' id='choseHousePage' style='text-align:center;'></div>");
        $("#choseHousePage").createPage({
            onePageNums: 10,
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
        $("#queryDeviceRecordPage").remove();
        $("#queryDeviceRecordPageDiv")
            .append(
                "<div class='tcdPageCode' id='queryDeviceRecordPage' style='text-align:center;'></div>");
        $("#queryDeviceRecordPage").createPage({
            onePageNums: 10,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryDeviceRecord(p, 1);
                }
            }
        });
    }
    if (type == 3) {
        pageNum = Math.ceil(totalNum / 15);
        $("#queryDeviceRecordPage").remove();
        $("#personInfomationFenYe")
            .append(
                "<div class='tcdPageCode' id='queryDeviceRecordPage' style='text-align:center;'></div>");
        $("#queryDeviceRecordPage").createPage({
            onePageNums: 15,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    selectIonInformation(p, 1);
                }
            }
        });
    }
    if (type == 4) {
        pageNum = Math.ceil(totalNum / 10);
        $("#queryDeviceRecordPage2").remove();
        $("#queryDeviceRecordPageDiv2")
            .append(
                "<div class='tcdPageCode' id='queryDeviceRecordPage2' style='text-align:center;'></div>");
        $("#queryDeviceRecordPage2").createPage({
            onePageNums: 10,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryDeviceRecord2(p, 1);
                }
            }
        });
    }

}

//打卡人脸识别记录

function openPersonInfomationDiv() {
    $('#personInfomationDiv').dialog({
        title: '识别记录',
        top: 30,
        left: 200,
        width: 750,
        height: 510,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#userName').val("");
            $('#searchFaceStart').val("");
            $('#searchFaceEnd').val('');
        }

    });
    selectIonInformation(1, 3);
    $('#personInfomationDiv').dialog("open");
}

//进制转换
function binary(num, m, n) {
    var s = num + '';
    var result = parseInt(s, m).toString(n);
    return result;
}
//晾衣架操作框
function intelligentHanger() {
    var row = $("#deviceInfoTable").datagrid('getSelected');
    if (!row) {
        myTips('请先选择一个设备', 'error');
        return;
    }
    $('#intelligentHangerDiv').dialog({
        title: '智能晾衣架',
        top: 80,
        left: 400,
        width: 470,
        height: 200,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
        }
    });
    var status;
    $.post("../queryDeviceStatus.action", {
        devAuthId: row.devAuthId,
        devId: row.id
    }, function (data) {
        data = data.body;
        console.log(data)
        if (data != null) {
            status = data[0].status;
        } else {
            status = '';
        }

        // console.log(status);

        var status1 = status.substring(10, 12);
        // console.log(status1);
        // status1 = 10;
        status1 = binary(status1, 16, 2);
        // console.log("==============");
        // console.log(status1);
        //得到设备状态
        if (status1.length < 8) {
            for (var i = 0; i < 8 - status1.length; i++) {
                status1 = "0" + status1;
                i--;
            }
        }
        if (status == '') {
            myTips('设备不在线！', 'error');
            return;
        } else {
            $('#intelligentHangerDiv').dialog("open");
        }
        //得到设备类型
        var status2 = status.substring(0, 4);
        // status2 = "0006";
        if (status2 == '0001') {
            $('#electricMachineryDiv').show();
            $('#clothesPoleDiv').show();
            $('#anionDiv').show();
            $('#dryDiv').show();
            if (status1.substring(5, 6) == 1) {
                $('#hunganTime').show();
            } else {
                $('#hunganTime').hide();
            }
            $('#hunganButton').show();
            $('#voiceDiv').show();
            $('#disinfectionDiv').show();
            if (status1.substring(3, 4) == 1) {
                $('#xiaotuTime').show();
            } else {
                $('#xiaotuTime').hide();
            }
            $('#xiaotuButton').show();
            $('#lightingDiv').show();
            $('#airDryingDiv').show();
            if (status1.substring(6, 7) == 1) {
                $('#fenganTime').show();
            } else {
                $('#fenganTime').hide();
            }
            $('#fenganButton').show();
            $('#dianyuanId').hide();
        } else if (status2 == '0002') {
            $('#electricMachineryDiv').show();
            $('#clothesPoleDiv').show();
            $('#anionDiv').hide();
            $('#dryDiv').hide();
            $('#hunganTime').hide();
            $('#hunganButton').hide();
            $('#voiceDiv').hide();
            $('#disinfectionDiv').hide();
            $('#xiaotuTime').hide();
            $('#xiaotuButton').hide();
            $('#lightingDiv').show();
            $('#airDryingDiv').hide();
            $('#fenganTime').hide();
            $('#fenganButton').hide();
            $('#dianyuanId').hide();
        } else if (status2 == '0003') {
            $('#electricMachineryDiv').show();
            $('#clothesPoleDiv').show();
            $('#anionDiv').hide();
            $('#dryDiv').hide();
            $('#hunganTime').hide();
            $('#hunganButton').hide();
            $('#voiceDiv').hide();
            $('#disinfectionDiv').hide();
            $('#xiaotuTime').hide();
            $('#xiaotuButton').hide();
            $('#lightingDiv').show();
            $('#airDryingDiv').show();
            if (status1.substring(6, 7) == 1) {
                $('#fenganTime').show();
            } else {
                $('#fenganTime').hide();
            }
            $('#fenganButton').show();
            $('#dianyuanId').hide();
        } else if (status2 == '0004') {
            $('#electricMachineryDiv').show();
            $('#clothesPoleDiv').show();
            $('#anionDiv').hide();
            $('#dryDiv').hide();
            $('#hunganTime').hide();
            $('#hunganButton').hide();
            $('#voiceDiv').hide();
            $('#disinfectionDiv').show();
            if (status1.substring(3, 4) == 1) {
                $('#xiaotuTime').show();
            } else {
                $('#xiaotuTime').hide();
            }
            $('#xiaotuButton').show();
            $('#lightingDiv').show();
            $('#airDryingDiv').show();
            if (status1.substring(6, 7) == 1) {
                $('#fenganTime').show();
            } else {
                $('#fenganTime').hide();
            }
            $('#fenganButton').show();
            $('#dianyuanId').hide();
        } else if (status2 == '0005') {
            $('#electricMachineryDiv').show();
            $('#clothesPoleDiv').show();
            $('#anionDiv').hide();
            $('#dryDiv').hide();
            $('#hunganTime').hide();
            $('#hunganButton').hide();
            $('#voiceDiv').hide();
            $('#disinfectionDiv').show();
            if (status1.substring(3, 4) == 1) {
                $('#xiaotuTime').show();
            } else {
                $('#xiaotuTime').hide();
            }
            $('#xiaotuButton').show();
            $('#lightingDiv').show();
            $('#airDryingDiv').show();
            if (status1.substring(6, 7) == 1) {
                $('#fenganTime').show();
            } else {
                $('#fenganTime').hide();
            }
            $('#fenganButton').show();
            $('#dianyuanId').show();
        } else if (status2 == '0006') {
            $('#electricMachineryDiv').show();
            $('#clothesPoleDiv').show();
            $('#anionDiv').hide();
            $('#dryDiv').show();
            if (status1.substring(5, 6) == 1) {
                $('#hunganTime').show();
            } else {
                $('#hunganTime').hide();
            }
            $('#hunganButton').show();
            $('#voiceDiv').hide();
            $('#disinfectionDiv').show();
            if (status1.substring(3, 4) == 1) {
                $('#xiaotuTime').show();
            } else {
                $('#xiaotuTime').hide();
            }
            $('#xiaotuButton').show();
            $('#lightingDiv').show();
            $('#airDryingDiv').hide();
            $('#fenganTime').hide();
            $('#fenganButton').hide();
            $('#dianyuanId').show();
        }
        //var zm = status1.substring(7,8);
        $("input[name='dianji'][value='" + status1.substring(0, 2) + "']").prop("checked", "checked");
        $("input[name='yuyin'][value='" + status1.substring(2, 3) + "']").prop("checked", "checked");
        $("input[name='xiaodu'][value='" + status1.substring(3, 4) + "']").prop("checked", "checked");//
        $("input[name='fulizi'][value='" + status1.substring(4, 5) + "']").prop("checked", "checked");
        $("input[name='honggan'][value='" + status1.substring(5, 6) + "']").prop("checked", "checked");//
        $("input[name='fengan'][value='" + status1.substring(6, 7) + "']").prop("checked", "checked");//
        $("input[name='zhaoming'][value='" + status1.substring(7, 8) + "']").prop("checked", "checked");
        $("input[name='yiganweizhi'][value='" + status.substring(18, 20) + "']").prop("checked", "checked");
        // console.log(status1);
        // $("#hunganTime input").val(status.substring(14,16));
        // $("#xiaotuTime input").val(status.substring(16,18));
        // $("#fenganTime input").val(status.substring(12,14));
        $('#intelligentHangerDiv').dialog("open");
    });
    // radioFunction();


}

function radioFunction() {
    var honggan = $("input[name='honggan']:checked").val();
    var xiaotu = $("input[name='xiaotu']:checked").val();
    var fengan = $("input[name='fengan']:checked").val();
    if (honggan == 1) {
        $("#hunganTime").show();
        // console.log(honggan);
    } else if (honggan != undefined) {
        $("#hunganTime").hide();
        // console.log(honggan);
    }
    if (xiaotu == 1) {
        $("#xiaotuTime").show();
        // console.log(xiaotu);
    } else if (xiaotu != undefined) {
        $("#xiaotuTime").hide();
        // console.log(xiaotu);
    }
    if (fengan == 1) {
        $("#fenganTime").show();
        // console.log(fengan);
    } else if (fengan != undefined) {
        $("#fenganTime").hide();
        // console.log(fengan);
    }
}

function openintelligentHanger() {
    $("#errorId").hide();
    var row = $("#deviceInfoTable").datagrid('getSelected');
    var rowIndex = $("#deviceInfoTable").datagrid('getRowIndex', row);
    // console.log("==============");
    // console.log(rowIndex);
    if (!row) {
        myTips('请先选择一个设备', 'error');
        return;
    }
    var yiganweizhi = $("input[name='yiganweizhi']:checked").val();
    var dianjia = $("input[name='dianji']:checked").val();
    var fulizi = $("input[name='fulizi']:checked").val();
    var honggan = $("input[name='honggan']:checked").val();
    var hongganTime = $("#hunganTime input").val();
    var yuyin = $("input[name='yuyin']:checked").val();
    var xiaodu = $("input[name='xiaotu']:checked").val();
    var xiaotuTime = $("#xiaotuTime input").val();
    var zhaoming = $("input[name='zhaoming']:checked").val();
    var fengan = $("input[name='fengan']:checked").val();
    var fenganTime = $("#fenganTime input").val();
    var dianyuan = $("input[name='dianyuan']:checked").val();
    var brandId = row.devBrandId;
    var coId = _loginCoId;
    var devId = row.id;

    // console.log(row);
    // console.log(coId);
    // console.log(yiganweizhi);
    // console.log(dianjia);
    // console.log(fulizi);
    // console.log(honggan);
    // console.log(hongganTime);
    // console.log(yuyin);
    // console.log(xiaodu);
    // console.log(xiaotuTime);
    // console.log(zhaoming);
    // console.log(fengan);
    // console.log(fenganTime);
    var reg = /^[1-9]\d*$|^0$/;
    if (reg.test(fenganTime) == true && reg.test(hongganTime) == true && reg.test(xiaotuTime) == true) {
        if (fenganTime < 0) {
            fenganTime = 0;
        } else if (fenganTime > 180) {
            fenganTime = 180;
        }
        if (hongganTime < 0) {
            hongganTime = 0;
        } else if (hongganTime > 180) {
            hongganTime = 180;
        }
        if (xiaotuTime < 0) {
            xiaotuTime = 0;
        } else if (xiaotuTime > 30) {
            xiaotuTime = 30;
        }
        postJson = {
            instruction: "控制衣架",
            brandId: brandId,
            coId: coId,
            devId: devId,
            yiganweizhi: yiganweizhi,
            dianjia: dianjia,
            fulizi: fulizi,
            honggan: honggan,
            hongganTime: hongganTime,
            yuyin: yuyin,
            xiaodu: xiaodu,
            xiaotuTime: xiaotuTime,
            zhaoming: zhaoming,
            fengan: fengan,
            fenganTime: fenganTime,
            dianyuan: dianyuan,
        }

        // var postUrl = "http://127.0.0.1:8080/device/api";
        var postUrl = "http://www.fangzhizun.com/device/api";
        $.post(postUrl, postJson, function (data) {
            // console.log(data)
            hideLoading();
            if (data.code < 0 || data.status == 500) {
                myTips(data.msg, "error");
                return;
            } else {
                myTips("控制成功！", "success");
                queryDeviceInfo(1);
                $('#intelligentHangerDiv').dialog("close");
            }
        });
    } else {
        $("#errorId").show();
    }
}

//人脸识别操作框
function personInfomaction() {
    var row = $("#deviceInfoTable").datagrid('getSelected');
    // console.log(row);row
    if (!row) {
        myTips('请先选择一个设备', 'error');
        return;
    }
    $('#FaceDeviceDlg').dialog({
        title: '人脸识别',
        top: 80,
        left: 400,
        width: 600,
        height: 200,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {

        }

    });
    var va = JSON.stringify(row);

    $('#value').val(va);
    $('#FaceDeviceDlg').show();
    $('#FaceDeviceDlg').dialog("open");
}

//插座温度设定
function Temperature() {
    $('#TemperatureDlg').dialog({
        title: '温度设置',
        top: 80,
        left: 400,
        width: 450,
        height: 200,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {

        }

    });
    $('#TemperatureDlg').dialog('open');

}

//解除设备绑定
function Unbound() {
    var row = $('#value').val();
    var value = JSON.parse(row)
    var devid = value.id;
    var hsId = value.jhdHsId;
    var hsAddCommunity = value.hsAddCommunity;
    var hsAddDistrict = value.hsAddDistrict;
    var hsAddDoorplateno = value.hsAddDoorplateno;

    if (hsAddDistrict == "" || hsAddDistrict == null || hsAddDoorplateno == "" || hsAddDoorplateno == null) {
        $.post("../queryHouseRentCommon.action", {
            hrHouse4storeId: hsId,
        }, function (result) {
            if (result.code == -1 && result.code != -2) {
                deleteFaceNotPerson(devid, hsId)
            } else {
                deleteDeviceAndPerson(devid, hsId)
            }
        })
    } else {
        $.post("../queryHouseStoreCommon.action", {
            hsAddCommunity: hsAddCommunity,
            hsAddDistrict: hsAddDistrict,
            hsAddDoorplateno: hsAddDoorplateno,
        }, function (data) {
            if (data.code == 1) {
                var result = data.body;
                var hsId = result[0].hsId;
            }

            $.post("../queryHouseRentCommon.action", {
                hrHouse4storeId: hsId,
            }, function (result) {
                if (result.code == -1 && result.code != -2) {
                    deleteFaceNotPerson(devid, hsId)
                } else {
                    deleteDeviceAndPerson(devid, hsId)
                }
            })
        })
    }
}

//沒有人员時候只刪除房间
function deleteFaceNotPerson(devid, hsId) {
    $.post("../deletetHsDevice.action", {
        jhdDeviceId: devid,
        jhdHsId: hsId,
    }, function (data) {
        if (data.code == 1) {
            myTips('删除成功 ', 'success');
            $('#FaceDeviceDlg').dialog("close");
            queryDeviceInfo(1)
        } else {
            myTips('删除失败 ', 'error');
        }

    })
}

//有人员時候刪除房间设备以及人员授权
function deleteDeviceAndPerson(devid, hsId) {
    $.post("../seleceGuidByHsId.action", {
        jhdDeviceId: devid,
        jhdHsId: hsId,
        hrLeaseState: "在租",
    }, function (result) {
        var data = result.body
        var Guid = data[0].ifpGuid
        if (Guid == null) {
            deleteFaceNotPerson(devid, hsId)
        }
        $.post("http://www.fanfzhizun.com/device/wo/DeletePerson", {
            guid: Guid,
        }, function (data) {
            var data1 = data.body;
            if (data.code == 1) {
                deleteFaceNotPerson(devid, hsId)
            }
        })
    })
}

//删除人脸设备
function deleteFace() {
    var row = $('#value').val();
    var value = JSON.parse(row)
    console.log(value)
    console.log(value.detailedAddress.length)
    if (value.detailedAddress.length > 2) {
        myTips('请先解绑设备安装地址', 'error')
        return;
    }
    console.log(value)
    $.post("../deleteDevice.action", {
        devSn: value.devSn,

    }, function (data) {
        console.log(data.code)
        if (data.code == 1) {
            myTips("刪除成功", "success")
        } else {
            myTips("刪除失败", "error")
        }
        $('#FaceDeviceDlg').dialog('close')
        queryDeviceInfo(1)
    })
}

//识别记录导入
function selectIonInformation(page, type) {
    var row = $('#value').val();
    var value = JSON.parse(row)
    console.log(value)
    var startNum = (parseInt(page) - 1) * 15;
    var endNum = 15;
    var userName = $("#userName").val();
    var startTime = $("#searchFaceStart").val();
    var endTime = $("#searchFaceEnd").val();
    var dataTime = new Date(endTime);
    dataTime = dataTime.setDate(dataTime.getDate() + 1);
    endTime = new Date(dataTime);
    // console.log(endTime);
    if (startTime == "") {
        var startTime = "2000-01-01"
        var endTime = new Date().format("yyyy-MM-dd HH:mm:ss").toString();
    }
    var row = $("#deviceInfoTable").datagrid('getSelected');
    $.post("../selectJourFaceRecognitionInformation.action", {
        startNum: startNum,
        endNum: endNum,
        id: value.id,
        jftiPersonName: userName,
        jftiUserId: '',
        startTime: startTime,
        endTime: endTime,
    }, function (data) {
        if (data.code < 0) {
            sourcePage(0, 0, 3);
        }
        data = data.body;
        if (data != null) {
            if (page == 1 && type == 3) {
                sourcePage(data[0].totalNum, page, 3);
            }
            for (var i in data) {
                data[i].detailedAddress = data[i].hsAddCommunity + " "
                    + data[i].hsAddBuilding + " "
                    + data[i].hsAddDoorplateno;
                if (data[i].jftiPersonName == "" || data[i].jftiPersonName == null) {
                    var name = "陌生人";
                    data[i].jftiPersonName = name;
                }
                if (data[i].jfriAliveType == 1) {
                    var live = "活体认证";
                    data[i].jfriAliveType = live;
                } else {
                    var die = "非活体认证";
                    data[i].jfriAliveType = die;
                }
                if (data[i].jftiRecMode == 1) {
                    data[i].jftiRecMode = '刷脸';
                } else if (data[i].jftiRecMode == 2) {
                    data[i].jftiRecMode = '刷卡';
                } else if (data[i].jftiRecMode == 3) {
                    data[i].jftiRecMode = '脸&卡双重认证';
                } else if (data[i].jftiRecMode == 4) {
                    data[i].jftiRecMode = '人证比对';
                } else if (data[i].jftiRecMode == 5) {
                    data[i].jftiRecMode = '一键开锁';
                }
                if (data[i].jftiPasernType == '') {
                    data[i].jftiPasernType = '用户'
                }
                if (data[i].jftiType == 1) {
                    data[i].jftiType = '成功'
                } else {
                    data[i].jftiType = '失败'
                }
            }
            $("#personInfomationDivTable").datagrid("loadData", data);
        } else {
            $("#personInfomationDivTable").datagrid("loadData", []);
        }
    });
}

function chooseOperateDlg() {
    var row = $("#deviceInfoTable").datagrid('getSelected');
    // console.log(row);
    if (!row) {
        myTips('请先选择一个设备 ', 'error');
        return;
    }
    $('#chooseOperateDlg').dialog({
        title: '选择操作',
        top: getTop(200),
        left: getLeft(600),
        width: 600,
        height: 200,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#chooseOperateDlg input').val("");
            $("#BrightnessDiv").hide();
            $("#ColorTemperatureDiv").hide();
            $("#adjustBrightnessDiv").hide();
        }
    });
    var devAuthId = row.devAuthId;
    $('#chooseOperateDlg a[data-brand]').each(
        function () {
            var brands = $(this).attr('data-brand').split(',');
            if (brands.indexOf(row.devBrandId.toString()) < 0) {
                $(this).hide();
            } else {
                $(this).show();
                if (row.devBrandId == 20) {
                    var brand = $(this).attr('data-brand').split(',');
                    if (brand.indexOf(row.devBrandId.toString()) != -1) {
                        if (typeof ($(this).attr('data-devSecondType')) != "undefined") {
                            var devSecondTypes = $(this).attr('data-devSecondType').split(',')
                            var devSecondType = row.devSecondType.toString();
                            if ($.inArray(devSecondType, devSecondTypes) < 0) {
                                $(this).hide();
                            } else {
                                // devId==3为灯
                                if (row.devFirstType == 1) {
                                    var csRoad;
                                    $.post("../queryCodeStorage.action", {
                                            devAuthId: devAuthId,
                                        },
                                        function (data) {
                                            $('#OnLampRoad1').hide();
                                            $('#OnLampRoad2').hide();
                                            $('#OnLampRoad3').hide();
                                            $('#OnLampRoad4').hide();
                                            $('#OnLampRoad5').hide();
                                            $('#OnLampRoad6').hide();
                                            $('#OnLampRoad7').hide();
                                            $('#OnLampRoad8').hide();

                                            $('#OffLampRoad1').hide();
                                            $('#OffLampRoad2').hide();
                                            $('#OffLampRoad3').hide();
                                            $('#OffLampRoad4').hide();
                                            $('#OffLampRoad5').hide();
                                            $('#OffLampRoad6').hide();
                                            $('#OffLampRoad7').hide();
                                            $('#OffLampRoad8').hide();
                                            if (data.code < 0) {
                                            } else {

                                                data = data.body;
                                                csRoad = data[0].csRoad;
                                                // 可以得到csRoad=2
                                                for (var i = 1; i <= csRoad; i++) {
                                                    for (var j = 1; j < 9; j++) {
                                                        if (i == $('#OffLampRoad' + j).attr('data-devRoad')) {
                                                            $('#OffLampRoad' + j).show()
                                                        }
                                                        if (i == $('#OnLampRoad' + j).attr('data-devRoad')) {
                                                            $('#OnLampRoad' + j).show()
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                } else if (row.devFirstType == 23 && row.devSecondType == 31) {
                                    //读取2.4G冷暖灯状态
                                    $.post("../queryDeviceStatus.action", {
                                            devId: row.id,
                                            devAuthId: devAuthId,
                                        },
                                        function (data) {
                                            if (data.code == 1) {
                                                console.log(data.body[0].status);
                                                $('#LightingStatus').val(data.body[0].status.slice(0, 2)); //读取2.4G冷暖灯开关状态
                                                var brightness = parseInt(parseInt(data.body[0].status.slice(2, 4), 16) * 6.6); //读取2.4G冷暖灯色温状态
                                                var colorTemperature = parseInt(parseInt(data.body[0].status.slice(4, 6), 16) / 1.27);  //读取2.4G冷暖灯色温状态
                                                $('#Brightness').slider(  //赋值亮度
                                                    'setValue', brightness
                                                );
                                                $('#ColorTemperature').slider(//赋值色温
                                                    'setValue', colorTemperature
                                                );
                                                //赋值亮度色温
                                                $("#LightingStatus").val(data.body[0].status.slice(0, 2));//开关
                                                $("#BrightnessStatus").val(data.body[0].status.slice(2, 4));//亮度
                                                $("#ColorTemperatureStatus").val(data.body[0].status.slice(4, 6));//色温
                                                $("#BrightnessDiv").css("display", "true");
                                                $("#ColorTemperatureDiv").css("display", "true");
                                            }
                                            $("#BrightnessDiv").show();
                                            $("#ColorTemperatureDiv").show();
                                        })
                                } else if (row.devFirstType == 23 && row.devSecondType == 36) { //读取调节灯状态
                                    $.post("../queryDeviceStatus.action", {
                                            devId: row.id,
                                            devAuthId: devAuthId,
                                        },
                                        function (data) {
                                            if (data.code == 1) {
                                                console.log(data.body[0].status);
                                                $('#adjustSwitchStatus').val(data.body[0].status.slice(0, 2));  //读取2.4G冷暖灯开关状态
                                                var adjustBrightness = parseInt(parseInt(data.body[0].status.slice(2, 4), 16) * 6.6);//读取2.4G冷暖灯色温状态
                                                $('#adjustBrightness').slider( //赋值亮度
                                                    'setValue', adjustBrightness
                                                );
                                                //赋值亮度色温
                                                $('#adjustSwitchStatus').val(data.body[0].status.slice(0, 2));//开关
                                                $("#adjustBrightnessStatus").val(data.body[0].status.slice(2, 4));//亮度
                                                $("#adjustBrightnessDiv").css("display", "true");
                                            }
                                            $("#adjustBrightnessDiv").show();
                                        })
                                } else if (row.devFirstType == 4 && row.devSecondType == 4) {
                                    $.post("../queryDeviceStatus.action", {
                                            devId: row.id,
                                            devAuthId: devAuthId,
                                        },
                                        function (data) {
                                            if (data.code == 1) {
                                                $("#airConditioningStatus").val(data.body[0].status);
                                            }
                                        });
                                } else if (row.devFirstType == 4 && row.devSecondType == 42) {
                                    $.post("../queryDeviceStatus.action", {
                                            devId: row.id,
                                            devAuthId: devAuthId,
                                        },
                                        function (data) {
                                            if (data.code == 1) {
                                                $("#IntelligentAirConditioningStatus").val(data.body[0].status);
                                            }
                                        });
                                } else {
                                    $(this).show();
                                }
                            }
                        }

                    } else {
                        $(this).show();
                    }
                }
            }
        });
    if (row.devBrandId == 20 && row.devFirstType == 25) {
        intelligentHanger();
    } else {
        $('#chooseOperateDlg').dialog("open");
    }
}


//新增人脸设备
//function addFace(){
//	$('#addFaceDlg').dialog({
//        title: '新增人脸设备',
//        top: getTop(300),
//        left: getLeft(600),
//        width: 600,
//        height: 300,
//        closed: true,
//        cache: false,
//        modal: true,
//        onClose: function () {
//           $('#DeviceKey').val('');
//           $('#Tag').val('');
//           $('#Name').val('');
//        }
//	})
//	$('#addFaceDlg').dialog("open");
//
//}
//function doAddFace(){
//	var deviceKey=$('#DeviceKey').val();
//	var Tag=co+"/1";
//	var Name=$('#Name').val();
//	if(deviceKey==""||Name==""){
//		myTips( "不能为空","error");
//		return;
//	}else{
//		 $.post("http://www.fangzhizun.com/device/wo/CreatNewFaceController", {
//			 DeviceKey	:deviceKey,
//			 Name 		:Name,
//			 Tag		:Tag,
//	     }, function (data){
//	    	 if(data.code==0){
//	    		 myTips( "新增成功","success");
//	    	 }else{
//	    		 myTips( "新增失败","error");
//	    	 }
//
//	     })
//	}
//
//}
//重启人脸设备
// function restart() {
//     $('#reStartDlg').dialog({
//         title: '重启人脸设备',
//         top: getTop(300),
//         left: getLeft(600),
//         width: 500,
//         height: 200,
//         closed: true,
//         cache: false,
//         modal: true,
//         onClose: function () {
//             $('#DeviceKey').val('');
//         }
//     })
//     $('#reStartDlg').dialog("open");
// }
// function RemoteOpenDlg(){
//     $('#RemoteOpenDlg').dialog({
//         title: '远程开门',
//         top: 80,
//         left: 400,
//         width: 450,
//         height: 200,
//         closed: true,
//         cache: false,
//         modal: true,
//
//     })
//     $("#RemoteOpenDlg").dialog("open");
//
// }
//一键开门
function doRemoteOpen() {
    var row = $('#value').val();
    var value = JSON.parse(row)
    var deviceKey = value.devSn
    $.post("http://www.fangzhizun.com/device/wo/RemoteOpen", {
        deviceKey: deviceKey,
    }, function (data) {
        if (data.code == 0) {
            $.post("../insertJourFaceInformation.action", {
                jfriDeviceKey: deviceKey,
            }, function (data) {
            });
            myTips("开门成功", "success");
        } else {
            myTips("开门失败", "error");
        }

    })
}

function doRestart() {
    var row = $('#value').val();
    var value = JSON.parse(row)
    var deviceKey = value.devSn
    console.log(deviceKey)
    $.post("http://www.fangzhizun.com/device/wo/DeviceFaceRestart", {
        deviceKey: deviceKey,
    }, function (data) {
        if (data.code == 0) {
            myTips("重启成功", "success");
        } else {
            myTips("重启失败", "error");
        }

    })

}

// 打开操作设备对话框
function operateDeviceDlg(type) {
    var row = $("#deviceInfoTable").datagrid('getSelected');
    $('#operateDeviceDlg').dialog({
        title: '操作设备',
        top: getTop(300),
        left: getLeft(600),
        width: 600,
        height: 300,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#operateDeviceDlg [clear="clear"]').val('');
            // $('#operateDeviceDlg [choose="choose"]').val('');
        }
    });

    switch (type) {
        case 1: // 设置限时密码
            if (row.devBrandId == "1") {
                $("#passwordType").hide();
                $("#passwordTime").show();
            }
            if (row.devBrandId == "2") {
                $("#passwordType").show();
                $("#passwordTime").hide();
            }
            break;
        case 2: // 获取密码列表
            $('#operateDeviceDlg').dialog({
                title: '密码列表 '
            });
            $('#brandAllDeviceDg').datagrid("loadData", []);
            operateDevice(type);
            break;
        case 3: // 清空密码
            $('#operateDeviceDlg').dialog({
                title: '清空密码 '
            });
            if (row.devBrandId == "1") {
                myTips("云猫门锁暂无此功能", "error");
                return;
            }
            operateDevice(type);
            break;
        case 4: // 获取开锁记录
            $('#operateDeviceDlg').dialog({
                title: '密码列表 '
            });
            $('#deviceOpenRecordDg').datagrid("loadData", []);
            break;
        case 5: // 远程开锁
            // 加一个验证登录密码的窗口
            operateDevice(type);
            return;// 加return之后不打开operateDeviceDlg
            break;
        case 6: // 设置随机密码
            break;
        case 7: // 设置自定义密码
            if ($('#limitTimePassword7').val() == 0) {
                var aRandom = parseInt(Math.random() * 100000000);
                $('#limitTimePassword7').val(aRandom);
            } else {
                $('#limitTimePassword7').val();
            }
            break;
        case 10: // 查询读数
            operateDevice(type);
            return;
            break;

        case 11: // 控制水电表断开
            operateDevice(type);
            return;
            break;

        case 12: // 控制水电表闭合
            operateDevice(type);
            return;
            break;

        case 13:// 控制新云海1路灯开
            operateDevice(type);
            return;
            break;

        case 14:// 控制新云海2路灯开
            operateDevice(type);
            return;
            break;

        case 15:// 控制新云海3路灯开
            operateDevice(type);
            return;
            break;

        case 16:// 控制新云海4路灯开
            operateDevice(type);
            return;
            break;

        case 17:// 控制新云海5路灯开
            operateDevice(type);
            return;
            break;

        case 18:// 控制新云海6路灯开
            operateDevice(type);
            return;
            break;

        case 19:// 控制新云海7路灯开
            operateDevice(type);
            return;
            break;

        case 20:// 控制新云海8路灯开
            operateDevice(type);
            return;
            break;

        case 21:// 控制新云海1路灯关
            operateDevice(type);
            return;
            break;

        case 22:// 控制新云海2路灯关
            operateDevice(type);
            return;
            break;

        case 23:// 控制新云海3路灯关
            operateDevice(type);
            return;
            break;

        case 24:// 控制新云海4路灯关
            operateDevice(type);
            return;
            break;

        case 25:// 控制新云海5路灯关
            operateDevice(type);
            return;
            break;

        case 26:// 控制新云海6路灯关
            operateDevice(type);
            return;
            break;

        case 27:// 控制新云海7路灯关
            operateDevice(type);
            return;
            break;

        case 28:// 控制新云海8路灯关
            operateDevice(type);
            return;
            break;
        case 29://控制新云海悠悠电箱1路开
            operateElectricBox(type);
            return;
            break;
        case 30://控制新云海悠悠电箱2路开
            operateElectricBox(type);
            return;
            break;
        case 31://控制新云海悠悠电箱3路开
            operateElectricBox(type);
            return;
            break;
        case 32://控制新云海悠悠电箱4路开
            operateElectricBox(type);
            return;
            break;
        case 33://控制新云海悠悠电箱5路开
            operateElectricBox(type);
            return;
            break;
        case 34://控制新云海悠悠电箱6路开
            operateElectricBox(type);
            return;
            break;
        case 35://控制新云海悠悠电箱7路开
            operateElectricBox(type);
            return;
            break;
        case 36://控制新云海悠悠电箱8路开
            operateElectricBox(type);
            return;
            break;
        case 37://控制新云海悠悠电箱9路开
            operateElectricBox(type);
            return;
            break;
        case 38://控制新云海悠悠电箱10路开
            operateElectricBox(type);
            return;
            break;
        case 39://控制新云海悠悠电箱1路关
            operateElectricBox(type);
            return;
            break;
        case 40://控制新云海悠悠电箱2路关
            operateElectricBox(type);
            return;
            break;
        case 41://控制新云海悠悠电箱3路关
            operateElectricBox(type);
            return;
            break;
        case 42://控制新云海悠悠电箱4路关
            operateElectricBox(type);
            return;
            break;
        case 43://控制新云海悠悠电箱5路关
            operateElectricBox(type);
            return;
            break;
        case 44://控制新云海悠悠电箱6路关
            operateElectricBox(type);
            return;
            break;
        case 45://控制新云海悠悠电箱7路关
            operateElectricBox(type);
            return;
            break;
        case 46://控制新云海悠悠电箱8路关
            operateElectricBox(type);
            return;
            break;
        case 47://控制新云海悠悠电箱9路关
            operateElectricBox(type);
            return;
            break;
        case 48://控制新云海悠悠电箱10路关
            operateElectricBox(type);
            return;
            break;
        case 50:// 控制超仪表开阀
            operateDevice(type);
            return;
            break;
        case 51:// 控制超仪表关阀
            operateDevice(type);
            return;
            break;
        case 52: //添加密码
            break;
        case 53: //清空密码
            operateDevice(type);
            return;
            break;
        case 54: //启用密码
            operateDevice(type);
            return;
            break;
        case 55: //禁用密码
            operateDevice(type);
            return;
            break;
        case 56: //获取开锁记录
            queryDeviceRecordDlg(type);
            return;
            break;
        case 57: //插座通电
            operateDevice(type);
            return;
            break;
        case 58: //插座断电
            operateDevice(type);
            return;
            break;
        case 577: //警报开
            operateDevice(type);
            return;
            break;
        case 588: //警报关
            operateDevice(type);
            return;
            break;
        case 589: //溫度设置
            operateDevice(type);
            return;
            break;
        case 59: //2.4G冷暖灯通电
            operateDevice(type);
            return;
            break;
        case 60: //2.4G冷暖灯短电
            operateDevice(type);
            return;
            break;
        case 61: //2.4G冷暖灯亮度
            operateDevice(type);
            return;
            break;
        case 62: //2.4G冷暖灯色温
            operateDevice(type);
            return;
            break;
        case 63: //窗帘开
            operateDevice(type);
            return;
            break;
        case 64: //窗帘关
            operateDevice(type);
            return;
            break;
        case 65: //外出布防
            operateDevice(type);
            return;
            break;
        case 66: //在家布防
            operateDevice(type);
            return;
            break;
        case 67: //撤防
            operateDevice(type);
            return;
            break;
        case 68: //百分比窗帘：开
            operateDevice(type);
            return;
            break;
        case 69: //百分比窗帘：关
            operateDevice(type);
            return;
            break;
        case 70: //2.4G插座：开
            operateDevice(type);
            return;
            break;
        case 71: //2.4G插座：关
            operateDevice(type);
            return;
            break;
        case 72: //空调插座：开
            operateDevice(type);
            return;
            break;
        case 73: //空调插座：关
            operateDevice(type);
            return;
            break;
        case 74: //调节灯：开
            operateDevice(type);
            return;
            break;
        case 75: //调节灯：关
            operateDevice(type);
            return;
            break;
        case 76: //调节灯:亮度
            operateDevice(type);
            return;
            break;
        case 77: //调节灯：关
            operateDevice(type);
            return;
            break;
        case 78: //调节灯:亮度
            operateDevice(type);
            return;
            break;
        case 79: //智能空调遥控器：开
            operateDevice(type);
            return;
            break;
        case 80: //智能空调遥控器：关
            operateDevice(type);
            return;
            break;
    }
    // 打开执行操作设备对话框
    $('#operateDeviceDlg div[operate]').hide();
    $('#operateDevice' + type).show();
    $('#operateDeviceDlg').dialog("open");
}

// 操作设备
function operateDevice(type) {
    // console.log("operateDevice");
    var row = $("#deviceInfoTable").datagrid('getSelected');
    console.log(row);
    var rowIndex = $("#deviceInfoTable").datagrid('getRowIndex', row);
    var devId = row.id;
    var brandId = row.devBrandId;
    var devFirstType = row.devFirstType;
    var devSecondType = row.devSecondType;
    var devUsername = row.devUsername;
    var devPassword = row.devPassword;
    var devAuthId = row.devAuthId;
    var devAuthSecret = row.devAuthSecret;
    var sn = "";
    var isNeedCache = "";
    var currentOn = "";
    var mac = "";
    var coId = _loginCoId;
    // console.log("coId="+coId);
    // console.log("devId="+devId);
    var postJson = {
        coId: coId,
        devId: devId,
        brandId: brandId,
        devUsername: devUsername,
        devPassword: devPassword,
        devAuthId: devAuthId,
        devAuthSecret: devAuthSecret,
    };
    var zz = {}//空调指令
    //     sn:devAuthId,
    //     mac:devAuthSecret,
    //     type:"10",
    //     code:"",
    //     isOn:true,
    //     temp :"",//温度
    //     mode :"",//模式
    //     speed :"",//风量（风速）
    //     codeType :0,
    // };
    switch (type) {
        case 1: // 设置限时密码
            var password = $("#limitTimePassword").val();
            var timeEnd = $("#limitTimeEnd").val();
            var passwordType = $("#limitPasswordType").val();
            if (brandId == 1) {
                postJson = '{';
                postJson += 'instruction:"限时密码",';
                postJson += 'brandId:"' + brandId + '",';
                postJson += 'userName:"' + devUsername + '",';
                postJson += 'hashedPassword:"' + devPassword + '",';
                postJson += 'devID:"' + devId + '",';
                postJson += 'keyPass:"' + password + '",';
                postJson += 'remark:"' + password + '",';
                postJson += 'timeEnd:"' + timeEnd + '"';
                postJson += '}';
            }
            if (brandId == 2) {
                postJson = '{';
                postJson += 'instruction:"限时密码",';
                postJson += 'brandId:"' + brandId + '",';
                postJson += 'authId:"' + devAuthId + '",';
                postJson += 'authToken:"' + devAuthSecret + '",';
                postJson += 'deviceId:"' + devId + '",';
                postJson += 'lockPwd:"' + password + '",';
                postJson += 'pwdIndex:"' + passwordType + '"';
                postJson += '}';
            }
            break;
        case 2: // 获取密码列表
            if (brandId == 1) {
                postJson = '{';
                postJson += 'instruction:"查询密码列表",';
                postJson += 'brandId:"' + brandId + '",';
                postJson += 'userName:"' + devUsername + '",';
                postJson += 'hashedPassword:"' + devPassword + '",';
                postJson += 'devID:"' + devId + '"';
                postJson += '}';
            }
            if (brandId == 2) {
                postJson = '{';
                postJson += 'instruction:"查询密码列表",';
                postJson += 'brandId:"' + brandId + '",';
                postJson += 'authId:"' + devAuthId + '",';
                postJson += 'authToken:"' + devAuthSecret + '",';
                postJson += 'deviceId:"' + devId + '"';
                postJson += ']';
            }
            break;
        case 3: // 清空密码
            if (brandId == "1") {
                myTips("云猫门锁暂无此功能", "error");
                return;
            }
            if (brandId == 2) {
                postJson = '{';
                postJson += 'instruction:"清空密码",';
                postJson += 'brandId:"' + brandId + '",';
                postJson += 'authId:"' + devAuthId + '",';
                postJson += 'authToken:"' + devAuthSecret + '",';
                postJson += 'deviceId:"' + devId + '"';
                postJson += '}';
            }
            break;
        case 4: // 获取开锁记录
            if (brandId == 1) {
                var startTime = $("#consoleTimeStart").val();
                postJson = '{';
                postJson += 'instruction:"查询开锁记录",';
                postJson += 'brandId:"' + brandId + '",';
                postJson += 'userName:"' + devUsername + '",';
                postJson += 'hashedPassword:"' + devPassword + '",';
                postJson += 'startTime:"' + startTime + '",';
                postJson += 'devID:"' + devId + '"';
                postJson += '}';
            }
            if (brandId == 2) {
                var startTime = $("#consoleTimeStart").val();
                postJson = '{';
                postJson += 'instruction:"查询开锁记录",';
                postJson += 'brandId:"' + brandId + '",';
                postJson += 'authId:"' + devAuthId + '",';
                postJson += 'authToken:"' + devAuthSecret + '",';
                postJson += 'startTime:"' + startTime + '",';
                postJson += 'deviceId:"' + devId + '"';
                postJson += '}';
            }
            break;
        case 5: // 远程开锁
            if (brandId == 2) {
                postJson = '{';
                postJson += 'instruction:"远程开锁",';
                postJson += 'brandId:"' + brandId + '",';
                postJson += 'authId:"' + devAuthId + '",';
                postJson += 'authToken:"' + devAuthSecret + '",';
                postJson += 'deviceId:"' + devId + '"';
                postJson += '}';
            } else if (brandId == 10 && devFirstType == 3 && devSecondType == 3) {
                if (devId == '') {
                    postJson = '{';
                    postJson += 'instruction:"远程开锁2",';
                    postJson += 'brandId:"' + brandId + '",';
                    postJson += 'devAuthId:"' + devAuthId + '",';
                    postJson += 'devSpare2:"' + row.devSpare2 + '",';
                    postJson += 'devAuthSecret:"' + row.devAuthSecret + '"';
                    postJson += '}';
                    break;
                } else {
                    postJson.instruction = "远程开锁";
                    postJson = JSON.stringify(postJson);
                }
            } else if (brandId == 20) {
                if (devFirstType == 3 && (devSecondType == 22 || devSecondType == 24)) {
                    postJson.sn = devAuthId;
                    postJson.mac = "";
                    postJson.isNeedCache = "false";
                    postJson.status = "开锁";
                    postJson.instruction = "控制设备-门锁";
                    postJson.brandId = brandId;
                    postJson = JSON.stringify(postJson);
                } else if (devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
                    postJson.sn = devAuthId;
                    postJson.mac = "";
                    postJson.isNeedCache = "false";
                    postJson.status = "开锁";
                    postJson.instruction = "控制设备-门锁";
                    postJson.brandId = brandId;
                    postJson = JSON.stringify(postJson);
                }
            }
            break;
        case 6: // 设置随机密码
            var startDate = $('#limitTimeStart6').val();
            var endDate = $('#limitTimeEnd6').val();
            var cardType = $('#limitPasswordType6').val();
            if (startDate == '' || endDate == '' || cardType == '') {
                myTips('信息填写不完整', 'error');
                return;
            }
            if (brandId == 10 && devFirstType == 3 && devSecondType == 3) {
                postJson.instruction = "单临密码";
                postJson.appKey = row.devAuthId;
                postJson.secret = row.devAuthSecret;
                postJson.code = row.devSpare2;
                postJson.startTime = startDate;
                postJson.endTime = endDate;
                postJson.pwdType = cardType;
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 7: // 设置自定义密码
            var startDate = $('#limitTimeStart7').val();
            var endDate = $('#limitTimeEnd7').val();
            var operateType = $('#limitOperateType7').val();
            var password = $('#limitTimePassword7').val();
            var cardType = 2;
            if (startDate == '' || endDate == '' || operateType == ''
                || password == '') {
                myTips('信息填写不完整', 'error');
                return;
            }
            if (brandId == 10 && devFirstType == 3 && devSecondType == 3) {
                if (devId == '') {
                    postJson.instruction = "添加门锁密码";
                    postJson.mobile = row.devUsername;
                    postJson.password = row.devPassword;
                    postJson.app_key = row.devAuthId;
                    postJson.secret = row.devAuthSecret;
                    postJson.pwdType = operateType;
                    postJson.pwd = password;
                    postJson.startTime = startDate;
                    postJson.endTime = endDate;
                    postJson.code = row.devSpare2;
                    postJson = JSON.stringify(postJson);
                } else {
                    postJson.instruction = "自定义密码";
                    postJson.operateType = operateType;
                    postJson.cardType = cardType;
                    postJson.password = password;
                    postJson.startDate = startDate;
                    postJson.endDate = endDate;
                    postJson = JSON.stringify(postJson);
                }
            }
            break;
        case 10: // 获取读数
            if (brandId == 3) {
                postJson = '{';
                postJson += 'instruction:"查询电表读数",';
                postJson += 'brandId:"' + brandId + '",';
                postJson += 'authId:"' + devAuthId + '",';
                postJson += 'authToken:"' + devAuthSecret + '",';
                postJson += 'deviceId:"' + devId + '"';
                postJson += '}';
            }
            if (brandId == 12 && devFirstType == 15 && devSecondType == 15) {
                postJson.instruction = "查询电表详情";
                postJson.code = row.devSpare2;
                postJson.app_key = row.devAuthId;
                postJson.secret = row.devAuthSecret;
                postJson = JSON.stringify(postJson);
            }
            if (brandId == 13 && devFirstType == 14 && devSecondType == 14) {
                postJson.instruction = "查询水表详情";
                postJson.code = row.devSpare2;
                postJson.app_key = row.devAuthId;
                postJson.secret = row.devAuthSecret;
                postJson = JSON.stringify(postJson);
            }
            if (brandId == 20 && row.devType == "智能云配电系统") {
                postJson.instruction = "查询设备详情";
                postJson.sns = row.devAuthId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 11: // 水电表断开
            if (brandId == 12 && devFirstType == 15 && devSecondType == 15) {
                postJson.instruction = "控制电表";
                postJson.state = 1;
                postJson.code = row.devSpare2;
                postJson.app_key = row.devAuthId;
                postJson.secret = row.devAuthSecret;
                postJson = JSON.stringify(postJson);
            }
            if (brandId == 13 && devFirstType == 14 && devSecondType == 14) {
                postJson.instruction = "控制水表";
                postJson.state = 1;
                postJson.code = row.devSpare2;
                postJson.app_key = row.devAuthId;
                postJson.secret = row.devAuthSecret;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 12: // 水电表闭合
            if (brandId == 12 && devFirstType == 15 && devSecondType == 15) {
                postJson.instruction = "控制电表";
                postJson.state = 2;
                postJson.code = row.devSpare2;
                postJson.app_key = row.devAuthId;
                postJson.secret = row.devAuthSecret;
                postJson = JSON.stringify(postJson);
            }
            if (brandId == 13 && devFirstType == 14 && devSecondType == 14) {
                postJson.instruction = "控制水表";
                postJson.state = 2;
                postJson.code = row.devSpare2;
                postJson.app_key = row.devAuthId;
                postJson.secret = row.devAuthSecret;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 13://控制新云海1路灯开
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 0;
                currentOn = "true";
            }
            break;

        case 14://控制新云海2路灯开
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 1;
                currentOn = "true";
            }
            break;

        case 15://控制新云海3路灯开
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 2;
                currentOn = "true";
            }
            break;

        case 16://控制新云海4路灯开
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 3;
                currentOn = "true";
            }
            break;

        case 17://控制新云海5路灯开
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 4;
                currentOn = "true";
            }
            break;

        case 18://控制新云海6路灯开
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 5;
                currentOn = "true";
            }
            break;

        case 19://控制新云海7路灯开
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 6;
                currentOn = "true";
            }
            break;

        case 20://控制新云海8路灯开
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 7;
                currentOn = "true";
            }
            break;

        case 21://控制新云海1路灯关
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 0;
                currentOn = "false";
            }
            break;

        case 22://控制新云海2路灯关
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 1;
                currentOn = "false";
            }
            break;

        case 23://控制新云海3路灯关
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 2;
                currentOn = "false";
            }
            break;

        case 24://控制新云海4路灯关
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 3;
                currentOn = "false";
            }
            break;

        case 25://控制新云海5路灯关
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 4;
                currentOn = "false";
            }
            break;

        case 26://控制新云海6路灯关
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 5;
                currentOn = "false";
            }
            break;

        case 27://控制新云海7路灯关
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 6;
                currentOn = "false";
            }
            break;

        case 28://控制新云海8路灯关
            if (brandId == 20) {
                brandId = brandId;
                sn = devAuthId;
                isNeedCache = "false";
                mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
                currentRoad = 7;
                currentOn = "false";
            }
            break;

        case 50://控制超仪表开阀
            if (brandId == 21) {
                action = 1;
                meterNo = devAuthId;
            }
            break;

        case 51://控制超仪表关阀
            if (brandId == 21) {
                action = 0;
                meterNo = devAuthId;
            }
            break;

        case 52://添加密码
            if (brandId == 20 && devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
                var psw = $('#password52').val();
                psw = psw.split('');
                var psw2 = '';
                for (var i = 0; i < psw.length; i++) {
                    psw[i] = Number(psw[i]);
                    psw2 += psw[i];
                }
                postJson.sn = devAuthId;
                postJson.mac = "";
                if (devSecondType == 23) {
                    postJson.isNeedCache = "true";
                } else if (devSecondType == 40) {
                    postJson.isNeedCache = "false";
                }
                console.log(psw2)
                postJson.password = psw2;
                postJson.status = "用户密码注册";
                postJson.instruction = "控制设备-门锁";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            } else {
                myTips('该门锁暂不支持密码功能', 'error');
                return;
            }
            break;
        case 53://清空密码
            if (brandId == 20 && devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
                postJson.sn = devAuthId;
                postJson.mac = "";
                if (devSecondType == 23) {
                    postJson.isNeedCache = "true";
                } else if (devSecondType == 40) {
                    postJson.isNeedCache = "false";
                }
                postJson.status = "注销所有用户密码";
                postJson.instruction = "控制设备-门锁";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            } else {
                myTips('该门锁暂不支持密码功能', 'error');
                return;
            }
            break;
        case 54://启用密码
            if (brandId == 20 && devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
                postJson.sn = devAuthId;
                postJson.mac = "";
                if (devSecondType == 23) {
                    postJson.isNeedCache = "true";
                } else if (devSecondType == 40) {
                    postJson.isNeedCache = "false";
                }
                postJson.status = "启用本地用户密码";
                postJson.instruction = "控制设备-门锁";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            } else {
                myTips('该门锁暂不支持密码功能', 'error');
                return;
            }
            break;
        case 55://禁用密码
            if (brandId == 20 && devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
                postJson.sn = devAuthId;
                postJson.mac = "";
                if (devSecondType == 23) {
                    postJson.isNeedCache = "true";
                } else if (devSecondType == 40) {
                    postJson.isNeedCache = "false";
                }
                postJson.status = "禁用本地用户密码";
                postJson.instruction = "控制设备-门锁";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            } else {
                myTips('该门锁暂不支持密码功能', 'error');
                return;
            }
            break;
        case 57://插座通电
            if (brandId == 20 && devFirstType == 2 && devSecondType == 25) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "开";
                postJson.instruction = "控制设备-插座";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 58://插座断电
            if (brandId == 20 && devFirstType == 2 && devSecondType == 25) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "关";
                postJson.instruction = "控制设备-插座";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 577://插座警报开
            if (brandId == 20 && devFirstType == 2 && devSecondType == 25) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "警报关";
                postJson.instruction = "控制设备-插座";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;

        case 588://插座警报关
            if (brandId == 20 && devFirstType == 2 && devSecondType == 25) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "警报关";
                postJson.instruction = "控制设备-插座";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 589://插座温度设置
            if (brandId == 20 && devFirstType == 2 && devSecondType == 25) {
                var Centigrade = $("#Centigrade").val();
                postJson.sn = devAuthId;
                postJson.devpassword = Centigrade;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "温度设置";
                postJson.instruction = "控制设备-插座";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 59://2.4G冷暖灯开灯
            if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
                // var BrightnessStatus = $("#BrightnessStatus").val();//当前的亮度
                // var ColorTemperatureStatus = $("#ColorTemperatureStatus").val();//当前的色温
                // status="80"+BrightnessStatus+ColorTemperatureStatus+"07";
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.brightness = "0e";
                postJson.color = "08";
                postJson.model = "07";
                postJson.status = "开灯";
                postJson.instruction = "控制设备-冷暖灯";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            $("#LightingStatus").val("80");
            break;
        case 60://2.4G冷暖灯关灯
            if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
                // var BrightnessStatus = $("#BrightnessStatus").val();//当前的亮度
                // var ColorTemperatureStatus = $("#ColorTemperatureStatus").val();//当前的色温
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.brightness = "0e";
                postJson.color = "08";
                postJson.model = "07";
                postJson.status = "关灯";
                postJson.instruction = "控制设备-冷暖灯";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            $("#LightingStatus").val("00");
            break;
        case 61://2.4G冷暖灯亮度
            var Brightness = $("#Brightness").val();
            Brightness = parseInt(Brightness / 6.6);
            Brightness = "0" + parseInt(Brightness).toString(16);//调节亮度
            var LightingStatus = $("#LightingStatus").val();
            var ColorTemperatureStatus = $("#ColorTemperatureStatus").val();//当前色温
            var status = "";
            if (LightingStatus == 80) {
                if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
                    postJson.sn = devAuthId;
                    postJson.mac = devAuthSecret;
                    postJson.isNeedCache = "false";
                    postJson.brightness = Brightness;
                    postJson.color = ColorTemperatureStatus;
                    postJson.model = "07";
                    postJson.status = "开灯";
                    postJson.instruction = "控制设备-冷暖灯";
                    postJson.brandId = brandId;
                    postJson = JSON.stringify(postJson);
                }
            } else {
                if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
                    postJson.sn = devAuthId;
                    postJson.mac = devAuthSecret;
                    postJson.isNeedCache = "false";
                    postJson.brightness = Brightness;
                    postJson.color = ColorTemperatureStatus;
                    postJson.model = "07";
                    postJson.status = "关灯";
                    postJson.instruction = "控制设备-冷暖灯";
                    postJson.brandId = brandId;
                    postJson = JSON.stringify(postJson);
                }
            }
            $("#BrightnessStatus").val(Brightness);
            break;
        case 62://2.4G冷暖灯色温
            var BrightnessStatus = $("#BrightnessStatus").val();//当前亮度
            var ColorTemperature = $("#ColorTemperature").val();//调节色温
            ColorTemperature = parseInt(ColorTemperature * 1.27);
            if (ColorTemperature < 16) {
                ColorTemperature = "0" + parseInt(ColorTemperature).toString(16);
            } else {
                ColorTemperature = parseInt(ColorTemperature).toString(16);
            }
            //灯光当前开关状态
            var LightingStatus = $("#LightingStatus").val();

            var status = "";
            if (LightingStatus == 80) {
                if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
                    // status="80"+BrightnessStatus+ColorTemperature+"07";
                    postJson.sn = devAuthId;
                    postJson.mac = devAuthSecret;
                    postJson.isNeedCache = "false";
                    postJson.brightness = BrightnessStatus;
                    postJson.color = ColorTemperature;
                    postJson.model = "07";
                    postJson.status = "开灯";
                    postJson.instruction = "控制设备-冷暖灯";
                    postJson.brandId = brandId;
                    postJson = JSON.stringify(postJson);
                }
            } else {
                if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
                    // status="00"+BrightnessStatus+ColorTemperature+"07";
                    postJson.sn = devAuthId;
                    postJson.mac = devAuthSecret;
                    postJson.isNeedCache = "false";
                    postJson.brightness = BrightnessStatus;
                    postJson.color = ColorTemperature;
                    postJson.model = "07";
                    postJson.status = "关灯";
                    postJson.instruction = "控制设备-冷暖灯";
                    postJson.brandId = brandId;
                    postJson = JSON.stringify(postJson);
                }
            }
            $("#ColorTemperatureStatus").val(ColorTemperature);
            break;
        case 63://开窗帘
            if (brandId == 20 && devFirstType == 6 && devSecondType == 6) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "开";
                postJson.instruction = "控制设备-窗帘";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 64://关窗帘
            if (brandId == 20 && devFirstType == 6 && devSecondType == 6) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "关";
                postJson.instruction = "控制设备-窗帘";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 65://外出布防
            if (brandId == 20 && devFirstType == 8 && devSecondType == 8) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "外出布防";
                postJson.instruction = "控制设备-安防网关";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 66://在家布防
            if (brandId == 20 && devFirstType == 8 && devSecondType == 8) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "在家布防";
                postJson.instruction = "控制设备-安防网关";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 67://撤防
            if (brandId == 20 && devFirstType == 8 && devSecondType == 8) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "撤防";
                postJson.instruction = "控制设备-安防网关";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 68://百分比窗帘：开
            if (brandId == 20 && devFirstType == 6 && devSecondType == 38) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "开";
                postJson.instruction = "控制设备-窗帘";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 69://百分比窗帘：关
            if (brandId == 20 && devFirstType == 6 && devSecondType == 38) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "关";
                postJson.instruction = "控制设备-窗帘";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 70://插座通电

            if (brandId == 20 && devFirstType == 2 && devSecondType == 37) {
                console.log(type)
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "开";
                postJson.instruction = "控制设备-插座";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 71://插座断电
            if (brandId == 20 && devFirstType == 2 && devSecondType == 37) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "关";
                postJson.instruction = "控制设备-插座";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 72://开空调
            if (brandId == 20 && devFirstType == 4 && devSecondType == 4) {
                var airConditioningStatus = $("#airConditioningStatus").val();
                zz.sn = devAuthId;
                zz.mac = devAuthSecret;
                zz.type = "10";
                zz.code = parseInt((airConditioningStatus.slice(4, 6) + airConditioningStatus.slice(2, 4)), 16);//码组号;
                console.log(parseInt((airConditioningStatus.slice(4, 6) + airConditioningStatus.slice(2, 4)), 16))
                zz.isOn = true;
                zz.temp = parseInt(airConditioningStatus.slice(8, 10), 16) + 16;//温度
                zz.mode = airConditioningStatus.slice(6, 8);//模式
                zz.speed = airConditioningStatus.slice(10, 12);//风量（风速）
                zz.codeType = "0";
                // zz = JSON.stringify(zz);
            }
            break;
        case 73://关空调
            if (brandId == 20 && devFirstType == 4 && devSecondType == 4) {
                var airConditioningStatus = $("#airConditioningStatus").val();
                zz.sn = devAuthId;
                zz.mac = devAuthSecret;
                zz.type = "10";
                zz.code = parseInt((airConditioningStatus.slice(4, 6) + airConditioningStatus.slice(2, 4)), 16);//码组号;
                zz.isOn = false;
                zz.temp = parseInt(airConditioningStatus.slice(8, 10), 16) + 16;//温度
                zz.mode = airConditioningStatus.slice(6, 8);//模式
                zz.speed = airConditioningStatus.slice(10, 12);//风量（风速）
                zz.codeType = "0";
                // zz = JSON.stringify(zz);
            }
            break;
        case 74://2.4G调节开灯
            if (brandId == 20 && devFirstType == 23 && devSecondType == 36) {
                // var adjustBrightnessStatus = $("#adjustBrightnessStatus").val();//当前的亮度
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.brightness = "0e";
                postJson.color = "07";
                postJson.model = "07";
                postJson.status = "开灯";
                postJson.instruction = "控制设备-冷暖灯";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            $("#adjustSwitchStatus").val("80");
            break;
        case 75://2.4G调节关灯
            if (brandId == 20 && devFirstType == 23 && devSecondType == 36) {
                // var adjustBrightnessStatus = $("#adjustBrightnessStatus").val();//当前的亮度
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.brightness = "0e";
                postJson.color = "07";
                postJson.model = "07";
                postJson.status = "关灯";
                postJson.instruction = "控制设备-冷暖灯";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            $("#adjustSwitchStatus").val("00");
            break;
        case 76://2.4G调节亮度
            var adjustBrightness = $("#adjustBrightness").val();
            adjustBrightness = parseInt(adjustBrightness / 6.6);
            adjustBrightness = "0" + parseInt(adjustBrightness).toString(16);//调节亮度
            var adjustSwitchStatus = $("#adjustSwitchStatus").val();
            var status = "";
            if (adjustSwitchStatus == 80) {
                if (brandId == 20 && devFirstType == 23 && devSecondType == 36) {
                    postJson.sn = devAuthId;
                    postJson.mac = devAuthSecret;
                    postJson.isNeedCache = "false";
                    postJson.brightness = adjustBrightness;
                    postJson.color = "07";
                    postJson.model = "07";
                    postJson.status = "开灯";
                    postJson.instruction = "控制设备-冷暖灯";
                    postJson.brandId = brandId;
                    postJson = JSON.stringify(postJson);
                }
            } else {
                if (brandId == 20 && devFirstType == 23 && devSecondType == 36) {
                    postJson.sn = devAuthId;
                    postJson.mac = devAuthSecret;
                    postJson.isNeedCache = "false";
                    postJson.brightness = adjustBrightness;
                    postJson.color = "07";
                    postJson.model = "07";
                    postJson.status = "关灯";
                    postJson.instruction = "控制设备-冷暖灯";
                    postJson.brandId = brandId;
                    postJson = JSON.stringify(postJson);
                }
            }
            $("#adjustBrightnessStatus").val(adjustBrightness);
            break;
        case 77://开电机正反控制盒
            if (brandId == 20 && devFirstType == 6 && devSecondType == 41) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "开";
                postJson.instruction = "控制设备-窗帘";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 78://关电机正反控制盒
            if (brandId == 20 && devFirstType == 6 && devSecondType == 41) {
                postJson.sn = devAuthId;
                postJson.mac = devAuthSecret;
                postJson.isNeedCache = "false";
                postJson.status = "关";
                postJson.instruction = "控制设备-窗帘";
                postJson.brandId = brandId;
                postJson = JSON.stringify(postJson);
            }
            break;
        case 79://智能空调遥控器：开
            if (brandId == 20 && devFirstType == 4 && devSecondType == 42) {
                var airConditioningStatus = $("#IntelligentAirConditioningStatus").val();
                console.log(airConditioningStatus)
                zz.sn = devAuthId;
                zz.mac = devAuthSecret;
                zz.type = "5";
                zz.code = parseInt((airConditioningStatus.slice(4, 6) + airConditioningStatus.slice(2, 4)), 16);//码组号;
                console.log(parseInt((airConditioningStatus.slice(4, 6) + airConditioningStatus.slice(2, 4)), 16))
                zz.isOn = true;
                zz.temp = parseInt(airConditioningStatus.slice(8, 10), 16) + 16;//温度
                zz.mode = airConditioningStatus.slice(6, 8);//模式
                zz.speed = airConditioningStatus.slice(10, 12);//风量（风速）
                zz.codeType = "0";
                // zz = JSON.stringify(zz);
                console.log(zz)
            }
            break;
        case 80://智能空调遥控器:关
            if (brandId == 20 && devFirstType == 4 && devSecondType == 42) {
                var airConditioningStatus = $("#IntelligentAirConditioningStatus").val();
                zz.sn = devAuthId;
                zz.mac = devAuthSecret;
                zz.type = "5";
                zz.code = parseInt((airConditioningStatus.slice(4, 6) + airConditioningStatus.slice(2, 4)), 16);//码组号;
                zz.isOn = false;
                zz.temp = parseInt(airConditioningStatus.slice(8, 10), 16) + 16;//温度
                zz.mode = airConditioningStatus.slice(6, 8);//模式
                zz.speed = airConditioningStatus.slice(10, 12);//风量（风速）
                zz.codeType = "0";
                // zz = JSON.stringify(zz);
            }
            break;
    }
    showLoading();

    var array = new Array(100);
    var n = 0;
    for (var m = 13; m < 29; m++) {
        array[m] = true;
    }

    if (array[type] == true) {
        $.post('http://www.fangzhizun.com/device/vanhi/RoadControl', {
            brandId: brandId,
            sn: sn,
            isNeedCache: isNeedCache,
            mac: mac,
            currentRoad: currentRoad,
            currentOn: currentOn
        }, function (data) {
            hideLoading();
            if (data.code < 0) {
                myTips(data.msg, "error");
                return;
            }
            switch (type) {
                case 13: // 1路灯开
                    myTips(data.msg, "success");
                    break;

                case 14: // 2路灯开
                    myTips(data.msg, "success");
                    break;

                case 15: // 3路灯开
                    myTips(data.msg, "success");
                    break;

                case 16: // 4路灯开
                    myTips(data.msg, "success");
                    break;

                case 17: // 5路灯开
                    myTips(data.msg, "success");
                    break;

                case 18: // 6路灯开
                    myTips(data.msg, "success");
                    break;

                case 19: // 7路灯开
                    myTips(data.msg, "success");
                    break;

                case 20: // 8路灯开
                    myTips(data.msg, "success");
                    break;

                case 21: // 1路灯关
                    myTips(data.msg, "success");
                    break;

                case 22: // 2路灯关
                    myTips(data.msg, "success");
                    break;

                case 23: // 3路灯关
                    myTips(data.msg, "success");
                    break;

                case 24: // 4路灯关
                    myTips(data.msg, "success");
                    break;

                case 25: // 5路灯关
                    myTips(data.msg, "success");
                    break;

                case 26: // 6路灯关
                    myTips(data.msg, "success");
                    break;

                case 27: // 7路灯关
                    myTips(data.msg, "success");
                    break;

                case 28: // 8路灯关
                    myTips(data.msg, "success");
                    break;
            }
        });

    } else {
        var meterNo = trimStr(row.devSn);
        if (type == 50) {
            $.post('http://www.fangzhizun.com/device/joy/ControlDeviceValve', {
                meterNo: meterNo,
                action: 1
            }, function (data) {
                hideLoading();
                if (data.status == 1) {
                    myTips(data.msg, "success");
                    $('#hydrometerDlg').dialog("close");
                    queryDeviceInfo(1);
                    return;
                } else {
                    myTips(data.body[0].resultMsg, "error");
                }
            })

        } else if (type == 51) {
            $.post('http://www.fangzhizun.com/device/joy/ControlDeviceValve', {
                /*brandId: brandId,
                instruction: "控制设备阀",*/
                meterNo: meterNo,
                action: 0
            }, function (data) {
                hideLoading();
                if (data.status == 1) {
                    myTips(data.msg, "success");
                    $('#hydrometerDlg').dialog("close");
                    queryDeviceInfo(1);
                    return;
                } else {
                    myTips(data.body[0].resultMsg, "error");
                }
            })
        } else if (type == 72 || type == 73 || type == 79 || type == 80) {
            console.log(zz)
            $.post('http://www.fangzhizun.com/device/vanhi/AirControl', zz, function (data) {
                if (data.code == 0 && data.body[0].resultCode == 0) {
                    hideLoading();
                    myTips(data.msg, "success");
                } else {
                    myTips(data.msg, "error");
                }
            });
        } else {
            // console.log("doDevicConsoleAll.action");
            console.log(postJson)
            $.post("../doDevicConsoleAll.action",
                {
                    postJson: postJson,
                },
                function (data) {
                    hideLoading();
                    console.log(data)
                    if (data.code < 0) {
                        myTips(data.msg, "error");
                        return;
                    }

                    if (data.code == 0 && (data.body[0].code == 0 || data.body[0].resultCode == 0 || data.body[0].resultCode == 128)) {
                        if (type != 61 && type != 62) {
                            myTips(data.msg, "success");
                        }
                    } else {
                        myTips(data.body[0].resultMsg, "error");
                    }
                });
            switch (type) {
                case 1: // 设置限时密码
                    myTips(data.msg, "success");
                    setTimeout(function () {
                        $('#operateDeviceDlg').dialog("close");
                    }, 2000);
                    break;
                case 2: // 获取密码列表
                    $('#brandAllDeviceDg').datagrid("loadData",
                        data.body.keys);
                    break;
                case 3: // 清空密码
                    myTips(data.msg, "success");
                    setTimeout(function () {
                        $('#operateDeviceDlg').dialog("close");
                    }, 2000);
                    break;
                case 4: // 获取开锁记录
                    $('#brandAllDeviceDg').datagrid("loadData",
                        data.body.records);
                    break;
                case 5: // 远程开锁
                    break;
                case 6: // 设置随机密码
                    // console.log(data.body);
                    // myTips(data.body,"success");
                    $.messager.alert('消息',
                        "<span style='font-size:18px;'>密码："
                        + data.body + '</span>',
                        'info');
                    setTimeout(function () {
                        $('#operateDeviceDlg').dialog("close");
                    }, 2000);
                    break;
                case 7: // 设置自定义密码
                    // console.log(data.body);
                    myTips(data.msg, "success");
                    setTimeout(function () {
                        $('#operateDeviceDlg').dialog("close");
                    }, 2000);
                    break;
                case 10: // 查询水单表详情
                    // console.log('这里是水表'+data.body.data.reading);
                    // console.log('这里是电表'+data.body.data.currentNumber);
                    if (data.body.data.reading != ''
                        && data.body.data.reading != undefined) {
                        // console.log(123);
                        $.messager
                            .alert(
                                "查询水表读数",
                                row.devFirstType
                                + "读数为："
                                + data.body.data.reading,
                                'info');
                    } else if (data.body.data.currentNumber != ''
                        && data.body.data.currentNumber != undefined) {
                        // console.log(234);
                        $.messager
                            .alert(
                                "查询电表读数",
                                row.devFirstType
                                + "当前读数为："
                                + data.body.data.currentNumber
                                + "<br>电压："
                                + data.body.data.voltage
                                + "<br>电流："
                                + data.body.data.intensity
                                + '<br><div style="margin-left: 42px;">功率：'
                                + data.body.data.power
                                + '</div>',
                                'info');
                    } else if (data.code == 0
                        && data.data != null) {
                        var arr = JSON.parse(data.data);
                        var status = arr[0].status;
                        var reading = status.substring(8, 16);
                        reading = parseInt(reading, 16);
                        $.messager.alert("查询电表读数",
                            row.devFirstType + "读数为："
                            + reading * 0.01,
                            'info');
                    } else if (data.body.data.currentNumber != ''
                        && data.body.data.currentNumber != undefined) {
                        // console.log(234);
                        $.messager
                            .alert(
                                "查询电表读数",
                                row.devFirstType
                                + "当前读数为："
                                + data.body.data.currentNumber
                                + "<br>电压："
                                + data.body.data.voltage
                                + "<br>电流："
                                + data.body.data.intensity
                                + '<br><div style="margin-left: 42px;">功率：'
                                + data.body.data.power
                                + '</div>',
                                'info');
                    } else if (data.code == 0
                        && data.data != null) {
                        var arr = JSON.parse(data.data);
                        var status = arr[0].status;
                        var reading = status.substring(8, 16);
                        reading = parseInt(reading, 16);
                        $.messager.alert("查询电表读数",
                            row.devFirstType + "读数为："
                            + reading * 0.01,
                            'info');
                    }
                    break;

                case 11: // 控制水电表断开
                    // $.messager.alert("",
                    // row.devFirstType+"读数为："+data.body.meterNum,
                    // 'info');
                    myTips(data.msg, "success");
                    break;

                case 12: // 控制水电表闭合
                    // $.messager.alert("查询读数",
                    // row.devFirstType+"读数为："+data.body.meterNum,
                    // 'info');
                    myTips(data.msg, "success");
                    break;
                default:
                    //         if (devFirstType!=6 && devSecondType==38){
                    //    myTips(data.msg, "success");
                    //   }
                    setTimeout(function () {
                        $('#operateDeviceDlg').dialog("close");
                    }, 2000);
            }
            //        });
        }
        return;
    }
}

// 分页统计总条数
function getdeviceInfoTablePageCount(page) {
    var pageSize = 15;
    var devBrandId = $('#searchBrandGetBrandId').val();
    var devNickname = $('#searchDevNickname').val();
    var devFirstType = $("#searchDevTypeGetDeviceOneId").val();
    var devSecondType = $("#searchDevTypeGetDeviceTwoId").val();
    var deviceAddress = $("#searchCommunity").val();
    // var community = $("#searchCommunity").val();
    // var building = $("#searchBuilding").val();
    // var doorplateno = $("#searchDoorplateno").val();
    var devSn = $("#searchDevSnCode").val();

    $.post("../selectAllDevice.action", {
        devBrandId: devBrandId,
        devNickname: devNickname,
        splitFlag: 0,
        devFirstType: devFirstType,
        devSecondType: devSecondType,
        devSn: devSn,
        devAddress:deviceAddress,
     //   hsState:"注销",
        // hsAddCommunity: community,
        // hsAddBuilding: building,
        // hsAddDoorplateno: doorplateno
    }, function (data) {
        if (data.code < 0 || data.body[0].totalNum == 0) {
            var countJson = {
                totalNum: 0,
            };
            getCountData(0, countJson, pageSize, page, "deviceInfoTable", 0);
        } else {
            data = data.body;
            var countJson = {
                totalNum: data[0].totalNum,
            };
            getCountData(1, countJson, pageSize, page, "deviceInfoTable", 0);
        }
    });
}

// 发卡
function pushCard() {
    $("#pushCardDlg").dialog({
        title: '发卡',
        top: getTop(140),
        left: getLeft(350),
        width: 350,
        height: 140,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#pushCardDlg input").val('');
            $("#pushCardDlg textarea").val('');
            $("#pushCardDlg select").val('');
        }
    });
    $("#pushCardDlg").dialog('open');
    var row = $('#deviceInfoTable').datagrid('getSelected');
}

// 执行发卡
function doPushingCard() {
    var cardId = $("#cardId").val();
    var cardNum = $("#cardNum").val();
    var date = new Date();
    var pushingTime = new Date(pushingTime).format("2037-12-31 23:59:59")
    var today = new Date().format("yyyy-MM-dd hh:mm:ss");
    var operatingRecording = {
        text: "给卡号" + cardNum + "，进行批量发卡",
        time: new Date().format("yyyy-MM-dd hh:mm:ss"),
        type: "系统跟进",
        registrantName: _loginUserName
    }
    var jdcOperatingRecording = "[" + JSON.stringify(operatingRecording) + "]";
    today = new Date(today);
    console.log(pushingTime);
    showLoading();
    $.ajax({
        type: "post",
        url: "../pushingCard.action",
        data: {
            jdcRegisteredTime: today,
            jdcPublishTime: today,
            userName: _loginUserName,
            jdcCardId: cardId,
            jdcCardNum: cardNum,
            jdcDeadlineTime: pushingTime,
            jdcOperatingRecording: jdcOperatingRecording,
            jdcState: "正常",
        },
        dataType: "json",
        success: function (result) {
            hideLoading();
            if (result.code == 1) {
                myTips("成功", "success");
                $("#pushCardDlg").dialog('close');
            } else {
                myTips(result.msg, "error");
            }
        }
    });
}

//设置情景
function setSence() {
    var row = $("#deviceInfoTable").datagrid("getChecked");
    for (var i in row) {
        console.log(row[i]);
    }
    if (row == null || row == '') {
        myTips("请选择需要添加情景的设备", "err");
        return;
    }
    $("#setSenceDlg").dialog({
        title: '设置安装位置',
        top: getTop(140),
        left: getLeft(350),
        width: 500,
        height: 200,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#setSenceDlg input").val('');
            $("#setSenceDlg textarea").val('');
            $("#setSenceDlg select").val('');
            $("#setPlace").empty();
            $("#ftDevType").empty();
            $("#setPlace").append("<option value=''></option>");
            $("#ftDevType").append("<option value=''></option>");
        }
    });
    selectAllPlace();
    selecetAllFistType();
    $("#setSenceDlg").dialog('open');
}

//查找所有安装位置
function selectAllPlace() {
    $("#setPlace").empty();
    $("#setPlace").append("<option value=''></option>");
    $.post("../queryDevPlace.action", {}, function (data) {
        if (data.code > 0) {
            data = data.body;
            // console.log(data);
            //////
            for (var i in data) {
                if ($("#Exist" + data[i].idpId))
                    $("#setPlace").append("<option id='Existdata[i].idpId' value='" + data[i].idpId + "'>" + data[i].idpPlace + "</option>");
            }

        }
    });
}

//查找所有设备类型
function selecetAllFistType() {
    $.post("../queryFtSceneType.action", {}, function (data) {
        if (data.code > 0) {
            data = data.body;
            // console.log(data);
            for (var i in data) {
                $("#ftDevType").append("<option value='" + data[i].idftId + "'>" + data[i].idftName + "</option>");
            }
        }
    });
}

//执行情境设置
function doSetSence() {
    var rows = $("#deviceInfoTable").datagrid("getChecked");
    var idpName = $("#setPlace option:selected").html();
    var idftId = $("#ftDevType").val();
    var idftName = $("#ftDevType option:selected").html();
    var idstName = idpName + idftName;
    var jhdDeviceIdJson = [];
    for (var i in rows) {
        if (rows[i].devIdstId == '') {
            jhdDeviceIdJson.push({
                idftId: idftId,
                idstName: idstName,
                id: rows[i].id,
            });
        } else {
            jhdDeviceIdJson.push({
                idftId: idftId,
                idstName: idstName,
                id: rows[i].id,
                devIdstId: rows[i].devIdstId,
            });
        }
    }
    for (var i in jhdDeviceIdJson) {
        console.log('jhdDeviceIdJson=' + jhdDeviceIdJson[i]);
    }
    $.post("../updateSceneType.action", {
        updateJson: JSON.stringify(jhdDeviceIdJson)
    }, function (data) {
        if (data.code < 0) {
            myTips(data.msg, "err");
        } else {
            myTips(data.msg, "success");
            queryDeviceInfo(1);
            $("#setSenceDlg").dialog('close');
        }

    });

}

// 添加新设备选择品牌显示不同的录入项
function changeBrandAddDevice() {
    var brandId = Number($('#addDeviceGetBrandId').val());
    console.log(brandId);
    var a1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var a2 = [10, 11];
    var a3 = [12, 13];
    var a4 = [19];
    var a5 = [20];
    var a6 = [22];
    var a7 = [23];
    var a8 = [25];
    $('#addDeviceDiv').show();
    if (a1.indexOf(brandId) > -1) {
        $('#deviceUserNameDiv').show();
        $('#devicePasswardDiv').show();
        $('#deviceAuthIdDiv').hide();
        $('#deviceAuthSecretDiv').hide();
        $('#deviceAuthIdDivOne').hide();
        $('#hsIdDiv').hide();
        $('#deviceAppkeyDiv').hide();
        $('#deviceSecretDiv').hide();
        $("#queryDeviceDiv").hide();
        $("#subDeviceNumerDiv").hide();
        $("#antQueryDeviceDiv").hide();
        $('#doAddDevice').show();
    } else if (a2.indexOf(brandId) > -1) {
        $('#deviceUserNameDiv').show();
        $('#devicePasswardDiv').show();
        $('#deviceAuthIdDiv').show();
        $('#deviceAuthSecretDiv').show();
        $('#deviceAuthIdDivOne').hide();
        $('#hsIdDiv').hide();
        $('#deviceAppkeyDiv').hide();
        $('#deviceSecretDiv').hide();
        $("#queryDeviceDiv").hide();
        $("#subDeviceNumerDiv").hide();
        $("#antQueryDeviceDiv").hide();
        $('#doAddDevice').show();
    } else if (a3.indexOf(brandId) > -1) {
        $('#deviceUserNameDiv').hide();
        $('#devicePasswardDiv').hide();
        $('#deviceAuthIdDiv').hide();
        $('#deviceAuthSecretDiv').hide();
        $('#deviceAuthIdDivOne').show();
        $('#hsIdDiv').hide();
        $('#deviceAppkeyDiv').hide();
        $('#deviceSecretDiv').hide();
        $("#queryDeviceDiv").hide();
        $("#subDeviceNumerDiv").hide();
        $("#antQueryDeviceDiv").hide();
        $('#doAddDevice').show();
    } else if (a4.indexOf(brandId) > -1) {
        $('#deviceUserNameDiv').show();
        $('#devicePasswardDiv').show();
        $('#deviceAppkeyDiv').show();
        $('#deviceSecretDiv').show();
        $('#hsIdDiv').hide();
        $('#deviceAuthIdDiv').hide();
        $('#deviceAuthSecretDiv').hide();
        $('#deviceAuthIdDivOne').hide();
        $("#queryDeviceDiv").hide();
        $("#subDeviceNumerDiv").hide();
        $("#antQueryDeviceDiv").hide();
        $('#doAddDevice').show();
    } else if (a5.indexOf(brandId) > -1) {
        $('#deviceUserNameDiv').show();
        $('#devicePasswardDiv').show();
        $('#deviceAppkeyDiv').hide();
        $('#deviceSecretDiv').hide();
        $('#deviceAuthIdDiv').hide();
        $('#deviceAuthSecretDiv').hide();
        $('#deviceAuthIdDivOne').hide();
        $('#hsIdDiv').hide();
        $("#queryDeviceDiv").hide();
        $("#subDeviceNumerDiv").hide();
        $("#antQueryDeviceDiv").hide();
        $('#doAddDevice').show();
    } else if (a6.indexOf(brandId) > -1) {
        $('#deviceUserNameDiv').hide();
        $('#devicePasswardDiv').hide();
        $('#deviceAppkeyDiv').hide();
        $('#deviceSecretDiv').hide();
        $('#deviceAuthIdDiv').hide();
        $('#deviceAuthSecretDiv').hide();
        $('#deviceAuthIdDivOne').hide();
        $('#hsIdDiv').hide();
        $("#queryDeviceDiv").hide();
        $("#subDeviceNumerDiv").hide();
        $("#antQueryDeviceDiv").hide();
        $('#doAddDevice').show();
    } else if (a7.indexOf(brandId) > -1) {
        $("#queryDeviceDiv").show();
        $("#subDeviceNumerDiv").show();
        $('#deviceUserNameDiv').hide();
        $('#devicePasswardDiv').hide();
        $('#deviceAuthIdDiv').hide();
        $('#deviceAuthSecretDiv').hide();
        $('#deviceAuthIdDivOne').hide();
        $('#hsIdDiv').hide();
        $('#deviceAppkeyDiv').hide();
        $('#deviceSecretDiv').hide();
        $("#antQueryDeviceDiv").hide();
        $('#doAddDevice').show();
    } else if (a8.indexOf(brandId) > -1) {
        $("#queryDeviceDiv").hide();
        $("#subDeviceNumerDiv").hide();
        $('#deviceUserNameDiv').hide();
        $('#devicePasswardDiv').hide();
        $('#deviceAuthIdDiv').hide();
        $('#deviceAuthSecretDiv').hide();
        $('#deviceAuthIdDivOne').hide();
        $('#hsIdDiv').hide();
        $('#deviceAppkeyDiv').hide();
        $('#deviceSecretDiv').hide();
        $('#doAddDevice').hide();
        $("#antQueryDeviceDiv").show();
    } else {
        $("#queryDeviceDiv").hide();
        $("#subDeviceNumerDiv").hide();
        $('#deviceUserNameDiv').hide();
        $('#devicePasswardDiv').hide();
        $('#deviceAuthIdDiv').hide();
        $('#deviceAuthSecretDiv').hide();
        $('#deviceAuthIdDivOne').hide();
        $('#hsIdDiv').hide();
        $('#deviceAppkeyDiv').hide();
        $('#deviceSecretDiv').hide();
        $("#antQueryDeviceDiv").hide();
        $('#doAddDevice').show();
    }
    $('#subDeviceNumerDiv').val('');
    $('#deviceUserName').val('');
    $('#devicePassward').val('');
    $('#deviceAuthId').val('');
    $('#deviceAuthSecret').val('');
}

// 打开添加新设备对话框
function addDeviceDlg() {
    $('#addDeviceDlg').dialog({
        title: '添加新设备',
        top: getTop(240),
        left: getLeft(540),
        width: 540,
        height: 240,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#addDeviceDlg input').val("");
            $('#addDeviceDiv').hide();
            $('#doAddDevice').show();
        }
    });
    $('#addDeviceDlg').dialog("open");
}

function dobindDevice3() {
    var row = $("#choseHouseTable").datagrid("getSelected");
    $("#bindDeviceDlg").dialog('close');
}

// 执行添加新设备
function doAddDevice() {
    var brandId = Number($('#addDeviceGetBrandId').val());
    var username = $('#deviceUserName').val();
    var password = $('#devicePassward').val();
    var authId = $('#deviceAuthId').val();
    var authId2 = $('#deviceAuthId2').val();
    var deviceAppkeyId = $('#deviceAppkeyId').val();
    var deviceSecretId = $('#deviceSecretId').val();
    var authSecret = $('#deviceAuthSecret').val();
    var DeviceName = $('#addDeviceGetBrandType').val();
    var hsId = 1;
    var queryDevice = $("#queryDevice").val();
    var subDeviceNumer = $("#subDeviceNumer").val();
    var projectCode = $("#projectCode").val();

    var postUrl = "http://www.fangzhizun.com/device/api";

    // var postUrl = "http://127.0.0.1:8080/device/api";
    var postJson = {};

    if (brandId == 0) {
        myTips('信息填写不完整', 'error');
        return;
    }

    switch (brandId) {
        /*
         * case 1: //云猫-门锁 if (username == '' || password == '') { myTips('信息填写不完整',
         * 'error'); return; } postJson = { coId : _loginCoId, brandId : brandId,
         * instruction : '查询设备列表', username : username, password : password, };
         * break; case 2://飞雪-门锁 if (authId == '' || authSecret == '') {
         * myTips('信息填写不完整', 'error'); return; } postJson = { coId : _loginCoId,
         * brandId : brandId, instruction : '查询设备列表', authId : authId, authSecret :
         * authSecret, }; break; case 9://云海物联-所有设备 if (username == '' || password ==
         * '') { myTips('信息填写不完整', 'error'); return; } postJson = { coId :
         * _loginCoId, brandId : brandId, instruction : '查询设备列表1', username :
         * username, password : password, authId : authId, authSecret : authSecret, };
         * break;
         */
        case 10:// 电易-门锁
            if (username == '' || password == '' || authId == ''
                || authSecret == '') {
                myTips('信息填写不完整', 'error');
                return;
            }
            postJson = {
                coId: _loginCoId,
                brandId: brandId,
                instruction: '查询设备列表',
                username: username,
                password: password,
                authId: authId,
                authSecret: authSecret,
            };
            break;
        case 11:// 电易-网关
            if (username == '' || password == '' || authId == ''
                || authSecret == '') {
                myTips('信息填写不完整', 'error');
                return;
            }
            postJson = {
                coId: _loginCoId,
                brandId: brandId,
                instruction: '查询设备列表',
                username: username,
                password: password,
                authId: authId,
                authSecret: authSecret,
            };
            break;
        case 12:// 电易-电表
            if (authId2 == '') {
                myTips('信息填写不完整', 'error');
                return;
            }
            postJson = {
                coId: _loginCoId,
                brandId: brandId,
                instruction: '查询电表列表',
                username: username,
                password: password,
                authId: authId2,
                authSecret: authSecret,
            };
            break;
        case 13:// 电易-水表
            if (authId == '') {
                myTips('信息填写不完整', 'error');
                return;
            }
            postJson = {
                coId: _loginCoId,
                brandId: brandId,
                instruction: '查询电表列表',
                username: username,
                password: password,
                authId: authId,
                authSecret: authSecret,
            };
            break;
        case 19:// 电易-通用批量
            if (hsId == '') {
                myTips('信息填写不完整', 'error');
                return;
            }
            postJson = {
                coId: _loginCoId,
                brandId: brandId,
                app_key: deviceAppkeyId,
                secret: deviceSecretId,
                mobile: username,
                password: password,
                instruction: "批量获取设备",
            };
            break;
        case 20:// 新云海-通用批量
            if (username == '' && password == '') {
                myTips('信息填写不完整', 'error');
                return;
            }
            postJson = {
                coid: _loginCoId,
                brandId: brandId,
                instruction: "批量获取设备",
                username: username,
                password: password,
                /* token : "_token", */
            };
            break;
        case 21:// 超仪
            $.post('../queryHouseStore.action', {}, function (data) {
                hideLoading();
                if (data.code < 0) {
                    $.messager.alert(data.msg, 'error');
                    return;
                } else {
                    data = data.body;
                    var json = JSON.stringify(data);
                    $.post('http://www.fangzhizun.com/device/joy/RegistRoomInfo', {
                        jsonStr: json,
                        coId: _loginCoId
                    }, function (data) {
                        hideLoading();
                    });

                }
            });
            break;
        case 22://宇泛智能-智能门锁
            postJson = {
                co: _loginCompany,
                brandId: brandId,
                instruction: "控制设备-人脸识别",
                DeviceName: DeviceName,
                hsId: hsId,
            }
            break;

        case 23:
            $.post("../insertDevice.action", {
                devBrandId: 23,
                devNickname: "智慧电箱",
                devSn: queryDevice,
                subDeviceNumer: subDeviceNumer,
                devId: projectCode,
                devFirstType: 16,
                devSecondType: 16,
            }, function (data) {
                if (data.code < 0) {
                    myTips(data.msg, 'error');
                    return;
                } else {
                    myTips("添加成功！", "success");
                    queryDeviceInfo(1);
                    $('#addDeviceDlg').dialog("close");
                }
            });
            return;
        case 25:
            var row = $('#toBeLockedDeviceTable').datagrid('getRows')
            $.post("../insertDeviceList.action", {
                postJson: JSON.stringify(row)
            }, function (data) {
                if (data.code < 0) {
                    myTips(data.msg, 'error');
                    return;
                } else {
                    var antDeviceIdList = [];
                    for (var i in row) {
                        antDeviceIdList.push(row[i].devAntDeviceId);
                    }
                    console.log(antDeviceIdList)
                    $.post('http://www.fangzhizun.com/device/ant/DeviceLockNotification', {
                        coId: _loginCoId,
                        brand: 25,
                        antDeviceIdList: JSON.stringify(antDeviceIdList)
                    }, function (data2) {
                        if (data2.code != 0) {
                            myTips(data2.msg, 'error');
                        } else {
                            for (var i in row) {
                                $.post('http://www.fangzhizun.com/device/ant/ReportingAuthority', {
                                    coId: _loginCoId,
                                    antDeviceId: row[i].devAntDeviceId,
                                    startTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
                                    endTime: new Date().format(new Date().getFullYear() + 100 + "-" + "MM-dd hh:mm:ss"),
                                }, function (data3) {
                                    if (data3.code != 0) {
                                        myTips(data2.msg, 'error');
                                        return;
                                    }
                                })
                            }
                        }
                    })
                    myTips("添加成功！", "success");
                    queryDeviceInfo(1);
                    $('#addDeviceDlg').dialog("close");
                    $('#antQueryDeviceDlg').dialog("close");
                }
            });
            return;
    }
    showLoading();
    // var postUrl = "http://www.fangzhizun.com/device/api";
    $.post(postUrl, postJson, function (data) {
        console.log(data)
        hideLoading();
        if (data.code < 0 || data.status == 500) {
            myTips(data.msg, "error");
            return;
        } else {
            myTips("添加成功！", "success");
            queryDeviceInfo(1);
            $('#addDeviceDlg').dialog("close");
        }
    });
}

//悠悠电箱控制
function operateElectricBox(type) {
    var row = $("#deviceInfoTable").datagrid('getSelected');
    var zz = {};
    zz.coId = _loginCoId;
    zz.devId = row.id;
    zz.brandId = row.devBrandId;
    zz.instruction = "控制设备-电箱";
    zz.number = row.devRoad;
    var status = '';
    $.post("../queryDeviceStatus.action", {
        devAuthId: row.devAuthId,
        devId: row.id
    }, function (data) {
        if (data.code == 1) {
            if (data.body[0].online) {
            } else {//设备不在线
                myTips("设备不在线！", "error");
                return;
            }
        } else {
            myTips("获取不到设备状态！", "error");
            return;
        }
    });

    if (29 <= type && type < 39) {
        $.messager.confirm('确认框', '在进行通电前请确保电路正常，没人在进行电路维修，是否继续通电操作？', function (r) {
            if (r) {
                status = '开';
                $("#open").removeClass('btn-default');
                $("#open").addClass('btn-success');
                $("#off").removeClass('btn-success');
                $("#off").addClass('btn-default');
                zz.status = status;
                $.post('http://www.fangzhizun.com/device/api', zz, function (data) {
                    if (data.code == 0 && data.body[0].resultCode == 0) {
                        myTips(data.body[0].resultMsg, 'success');
                    } else {
                        myTips(data.msg, 'error');
                    }
                });
            }
        });
    } else if (39 <= type && type < 49) {
        $.messager.confirm('确认框', '在断电前请确认没人在使用电器，否则可能会造成一定的影响，是否继续断电操作？', function (r) {
            if (r) {
                status = '关';
                $("#open").removeClass('btn-success');
                $("#open").addClass('btn-default');
                $("#off").removeClass('btn-default');
                $("#off").addClass('btn-success');
                zz.status = status;
                $.post('http://www.fangzhizun.com/device/api', zz, function (data) {
                    if (data.code == 0 && data.body[0].resultCode == 0) {
                        myTips(data.body[0].resultMsg, 'success');
                    } else {
                        myTips(data.msg, 'error');
                    }
                });
            }
        });
    }
}

//悠悠模块管理
function moduleManagementDlg() {
    $('#moduleManagementDlg').dialog({
        title: '模块管理',
        top: getTop(380),
        left: getLeft(640),
        width: 640,
        height: 380,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            var data = [];
            $('#moduleManagementTable').datagrid("loadData", data);
            $("#dobindDevice1").attr("onclick", "dobindDevice()");
        }
    });
    if ($('#moduleManagementTable').hasClass('datagrid-f')) {
    } else {
        $('#moduleManagementTable').datagrid(
            {
                columns: [[
                    {
                        field: 'devRoad',
                        title: '路数',
                        width: 10,
                        align: 'center'
                    },
                    {
                        field: 'room',
                        title: '房间',
                        width: 20,
                        align: 'center'
                    },
                    {
                        field: 'binding',
                        title: '绑定',
                        width: 15,
                        align: 'center',
                        formatter: function (value, row, index) {
                            return "<span style='color: #1E9FFF;cursor:pointer;' onclick='bindDevice()'> 绑定房间</span>";
                        }
                    }]],
                width: '100%',
                height: '80%',
                singleSelect: true,
                autoRowHeight: false,
                pagination: false,
                pageSize: 10,
                scrollbarSize: 0,
                showPageList: false,
                fitColumns: true,
            });
    }
    $("#dobindDevice1").attr("onclick", "bindDevice2()");
    $('#moduleManagementDlg').dialog("open");
}

//选中房间绑定电箱
function bindDevice2() {
    var row = $("#choseHouseTable").datagrid("getSelected");
    var rows = $("#moduleManagementTable").datagrid("getSelected");
    var index = $("#moduleManagementTable").datagrid("getRowIndex", rows);
    rows.room = row.hsAddCommunity + " " + row.hsAddBuilding + " " + row.hsAddDoorplateno;
    rows.hsId = row.hsId;
    $("#moduleManagementTable").datagrid("updateRow", {index: index, row: rows});
    $('#bindDeviceDlg').dialog('close');
}

//选择模块数量
function moduleManagement() {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    console.log(row)
    var numer = $("#numer").val();
    if (numer == 0) {
        $('#moduleManagementTable').datagrid("loadData", []);
    } else {
        var data = [];
        for (var i = 1; i <= numer; i++) {
            var obj = {};
            obj.devRoad = i;
            obj.devNickname = row.devNickname;
            obj.devSn = row.devSn;
            obj.devId = row.devId;
            obj.devAuthSecret = row.devAuthSecret;
            obj.devBrandId = row.devBrandId;
            obj.devFirstType = row.devFirstType;
            obj.devAuthId = row.devAuthId;
            obj.devSecondType = row.devSecondType;
            if (i == 1) {
                obj.room = row.detailedAddress;
                obj.id = row.id;
                obj.jhdHsId = row.jhdHsId;
                obj.jhdId = row.jhdId;
                obj.hsId = row.id;
            } else {
                obj.room = "";
                obj.jhdId = 0;
            }
            data.push(obj)
        }
        $('#moduleManagementTable').datagrid("loadData", data);
    }
}

//绑定电箱到房源
function doBindElectricBox() {
    var row = $("#moduleManagementTable").datagrid("getRows");
    for (var i in row) {
        console.log(row[i])
        if (row[i].hsId == undefined || row[i].hsId == "" || row[i].hsId == null) {
            myTips("有设备尚未绑定房间，请全部绑定房间后再试", "error");
            return;
        }
    }
    var brandDeviceJson = JSON.stringify(row);
    console.log(row)
    $.post("../dismantlingElectricBox.action", {
        brandDeviceJson: brandDeviceJson,
    }, function (data) {
        if (data.code < 0) {
            myTips(data.msg, 'error');
            return;
        } else {
            myTips("添加成功！", "success");
            queryDeviceInfo(1);
            $('#moduleManagementDlg').dialog("close");
            $('#subDeviceDlg').dialog("close");
        }
    });
}

function validate52() {
    var psw = $('#password52').val();
    if (isNaN(psw) || psw.length < 6 || psw.length > 10) {
        myTips('密码是6-10位数字', 'error');
        return false;
    }
    return true;
}

function queryDeviceRecordDlg(type) {
    $('#queryDeviceRecordDlg').dialog({
        title: '开锁记录',
        top: getTop(240),
        left: getLeft(540),
        width: 640,
        height: 340,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            var data = [];
            $('#queryDeviceRecordTable').datagrid("loadData", data)
        }
    });
    queryDeviceRecord(1, 0);
    $('#queryDeviceRecordDlg').dialog("open");
}

//获取开锁记录
function queryDeviceRecord(page, type) {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var startNum = (parseInt(page) - 1) * 10;
    var endNum = 10;
    $.post("../queryDeviceRecord.action", {
        startNum: startNum,
        endNum: endNum,
        jglrBrandId: row.devBrandId,
        jglrSn: row.devAuthId
    }, function (data) {
        if (data.code < 0) {
            sourcePage(0, 0, 2);
            $('#queryDeviceRecordTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        } else {
            data = data.body;
            if (page == 1 && type == 0) {
                sourcePage(data[0].totalNum, page, 2);
            }
            for (var i = 0; i < data.length; i++) {
                data[i].jglrBrand = data[i].jglrBrandId == 20 ? '云海物联' : '';
            }
            $("#queryDeviceRecordTable").datagrid("loadData", data);
        }
    })
}

function formatBrandType(value, row, index) {
    var devFirstJson = eval(_devFirstJson);
    for (var i in devFirstJson) {
        if (row.devFirstType == devFirstJson[i].dft_id) {
            return devFirstJson[i].dft_name;
        }
    }
}

function formatBrandType2(value, row, index) {
    var devSecondJson = eval(_devFirstJson2);
    for (var i in devSecondJson) {
        if (row.devSecondType == devSecondJson[i].dst_id) {
            return devSecondJson[i].dst_name;
        }
    }
}


/**
 * 修改设备类型
 */
function updateDev() {
    var row = $('#deviceInfoTable').datagrid('getChecked');
    if (row.length == 0) {
        row = $('#deviceInfoTable').datagrid('getSelected');
    }
    if (!row) {
        myTips('请先选择一条记录！', 'error');
        return;
    }
    addType();
    $('#updateDevTypeDlg').dialog({
        title: '修改设备类型',
        top: getTop(280),
        left: getLeft(650),
        width: 400,
        height: 260,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
        }
    });
    $('#updateDevTypeDlg').dialog('open');
}

/**
 * 执行修改设备类型
 */
function doUpdateDev() {
    var row = $('#deviceInfoTable').datagrid('getSelected');
    var row1 = $('#deviceInfoTable').datagrid('getChecked');
    if (!row) {
        myTips('请先选择一条记录！', 'error');
        return;
    }
    var mask = true;
    if (row1.length > 0) {
        var devFirstType = $('#update_dev_first').val();
        var devSecondType = $('#update_dev_second').val();
        showLoading();
        for (var i in row1) {
            $.post('../updateDevice.action', {
                id: row1[i].id,
                devFirstType: devFirstType,
                devSecondType: devSecondType
            }, function (data) {
                hideLoading();
                if (data.code < 0) {
                    $.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
                    return;
                } else {
                    $('#updateDevTypeDlg').dialog('close');
                    queryDeviceInfo(1);
                    if (mask) {
                        myTips('修改成功！', 'success');
                        mask = false;
                    }

                }
            });
        }
    } else {

        var devFirstType = $('#update_dev_first').val();
        var devSecondType = $('#update_dev_second').val();

        showLoading();
        $.post('../updateDevice.action', {
            id: row.id,
            devFirstType: devFirstType,
            devSecondType: devSecondType
        }, function (data) {
            hideLoading();
            if (data.code < 0) {
                $.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
                return;
            } else {
                $('#updateDevTypeDlg').dialog('close');
                myTips('修改成功！', 'success');
                queryDeviceInfo(1);
            }
        });
    }
}

//生成设备类型下拉框选项
function addType() {
    $('#update_dev_first').empty();
    $('#update_dev_second').empty();
    var row = $('#deviceInfoTable').datagrid('getChecked');
    if (row.length == 0) {
        row = $('#deviceInfoTable').datagrid('getSelected');
        var devFirstType = row.devFirstType;
        var devSecondType = row.devSecondType;
    } else {
        devFirstType = row[0].devFirstType;
        devSecondType = row[0].devSecondType;
    }
    var devFirstJson = eval(_devFirstJson);
    console.log(devFirstJson)
    var devFirstJson2 = eval(_devFirstJson2);
    for (var i in devFirstJson) {
        $('#update_dev_first').append("<option value=" + devFirstJson[i].dft_id + ">" + devFirstJson[i].dft_name + "</option>");
    }
    $('#update_dev_first').val(devFirstType);
    for (var i in devFirstJson2) {
        if (devFirstJson2[i].dst_dft_id == devFirstType) {
            $('#update_dev_second').append("<option value=" + devFirstJson2[i].dst_id + ">" + devFirstJson2[i].dst_name + "</option>");
            if (devFirstJson2[i].dst_id == devSecondType) {
                $('#update_dev_second').val(devSecondType);
            }
        }
    }
}

//修改设备类型-联动下拉框
function change() {
    $('#update_dev_second').empty();
    var id = $('#update_dev_first').val();
    $.ajax({
        url: '../devtypeDb.action',
        data: {dst_dft_id: id},
        type: "post",
        dataType: "json",
        success: function (result) {
            if (result.code == 1) {
                var data = result.body;
                for (var a in data) {
                    $('#update_dev_second').append("<option value=" + data[a].dst_id + ">" + data[a].dst_name + "</option>");
                }
            } else {
                alert(result.msg);
            }
        }
    })
}

//获取曼顿电箱
function queryDeviceDlg() {
    $("#queryDeviceDlg").dialog({
        title: '选择设备',
        top: getTop(460),
        left: getLeft(650),
        width: 650,
        height: 460,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
        }
    });
    queryDevice();
    $("#queryDeviceDlg").dialog("open");
}

function queryDevice() {
    console.log(_loginCompany)
    $.post('http://www.fangzhizun.com/device/mandun/MDRequestProject', {}, function (data) {
        if (data.code < 0) {
            $.messager.alert('通知', '获取项目失败！原因：' + data.msg, 'error');
            return;
        } else {
            data = data.body;
            console.log(data)
            var projectCode = "";
            for (var i in data) {
                var index = data[i].projectName.indexOf("/");
                var str = data[i].projectName.substring(index + 1);
                if (str == _loginCompany) {
                    projectCode = data[i].projectCode;
                    $("#projectCode").val(projectCode);
                }
            }
            $.post('http://www.fangzhizun.com/device/mandun/MDRequestProjectElectricBox', {
                projectCode: projectCode
            }, function (data2) {
                if (data2.code < 0) {
                    $.messager.alert('通知', '获取项目失败！原因：' + data.msg, 'error');
                    return;
                }
                data2 = data2.body;
                $('#queryDeviceTable').datagrid("loadData", data2)
            });
        }
    });
}

//获取领虎设备
function antQueryDeviceDlg() {
    $("#antQueryDeviceDlg").dialog({
        title: '选择设备',
        top: getTop(460),
        left: getLeft(650),
        width: 650,
        height: 460,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#antQueryDeviceTable').datagrid("loadData", []);
            $('#toBeLockedDeviceTable').datagrid("loadData", []);
        }
    });
    console.log('蚂蚁用户标识::'+_loginAntUserId);
    if (_loginAntUserId == null || _loginAntUserId == 'null' || _loginAntUserId == '' || _loginAntUserId == undefined){
        antReportingUserInformation();//蚂蚁用户上报
    } else {
        antQueryDevice();
    }
    $("#antQueryDeviceDlg").dialog("open");
}

function antReportingUserInformation() {
    $.post('http://www.fangzhizun.com/device/ant/ReportingUserInformation', {
        coId: _loginCoId,
    }, function (data) {
        if (data.code != 0){
            myTips('蚂蚁安全平台上报用户信息失败！','error');
        }else {
            antQueryDevice();
        }
    });
}

function antQueryDevice() {
    $.post('http://www.fangzhizun.com/device/ant/GetHousingInformation', {
        coId: _loginCoId,
        brand: 25
    }, function (data) {
        data = data.body;
        var houseInfoList = data.houseInfoList;
        var row = [];
        for (var i in houseInfoList) {
            console.log(houseInfoList[i])
            var publicDeviceInfoList = houseInfoList[i].publicDeviceInfoList;
            for (var j in publicDeviceInfoList) {
                var json = {
                    devAntDeviceId: publicDeviceInfoList[j].antDeviceId,
                    devId: publicDeviceInfoList[j].antDeviceType,
                    devNickname: publicDeviceInfoList[j].antDeviceType == '10000001' ? '门锁' : publicDeviceInfoList[j].antDeviceType == '10000002' ? '冷水表' : '电表',
                    devSn: publicDeviceInfoList[j].deviceInfo.deviceSn,
                    devBrandId: 25,
                }
                if (publicDeviceInfoList[j].antDeviceType == '10000001') {
                    json.devFirstType = 3;
                    json.devSecondType = 3;
                } else if (publicDeviceInfoList[j].antDeviceType == '10000002') {
                    json.devFirstType = 14;
                    json.devSecondType = 14;
                } else if (publicDeviceInfoList[j].antDeviceType == '10000003') {
                    json.devFirstType = 15;
                    json.devSecondType = 15;
                }
                row.push(json);
            }
        }
        $('#antQueryDeviceTable').datagrid("loadData", row);
    });
}

function antAddFormatter(value, row, index) {
    return "<span href='#' style='color:blue' onclick='addOneToNeedToDevice(" + index + ")'>添加</span>";
}

function antDeleteFormatter(value, row, index) {
    return "<span href='#' style='color:blue' onclick=\"myDeleteRows('" + row.id + "','antDeviceId','toBeLockedDeviceTable','0')\">删除</span>";
}

//添加一个设备到需要锁定的表格中
function addOneToNeedToDevice(index) {
    var row = $('#antQueryDeviceTable').datagrid('getData').rows[index];
    var rows = $('#toBeLockedDeviceTable').datagrid('getRows');
    for (var i in rows) {
        if (rows[i].devAntDeviceId == row.devAntDeviceId) {
            myTips('此设备已经添加到下方列表！', 'error');
            return;
        }
    }
    $.post('../getLingHuDevice.action', {}, function (data) {
        if (data.code < 0) {
            $.messager.alert('通知', '查询失败！原因：' + data.msg, 'error');
            return;
        } else {
            data = data.body;
            for (var i in data) {
                if (row.devAntDeviceId == data[i].devAntDeviceId) {
                    myTips('该设备绑定过，不能重复绑定！', 'error');
                    return;
                }
            }
            $('#toBeLockedDeviceTable').datagrid('insertRow', {
                index: 0,
                row: row
            });
        }
    });
}

//蚂蚁平台设备操作
function antDeviceOperation() {
    var row = $("#deviceInfoTable").datagrid('getSelected');
    if (!row) {

        myTips('请先选择一个设备 ', 'error');
        return;
    }
    $('#antOperateDlg').dialog({
        title: '选择操作',
        top: getTop(200),
        left: getLeft(600),
        width: 600,
        height: 200,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#chooseOperateDlg input').val("");
            $("#BrightnessDiv").hide();
            $("#ColorTemperatureDiv").hide();
            $("#adjustBrightnessDiv").hide();
        }
    });
    $('#antOperateDlg a[data-brand]').each(
        function () {
            var brands = $(this).attr('data-brand').split(',');
            if (brands.indexOf(row.devBrandId.toString()) < 0) {
                $(this).hide();
            } else {
                $(this).show();
                if (row.devBrandId == 25) {
                    if (typeof ($(this).attr('data-devSecondType')) != "undefined") {
                        var devSecondTypes = $(this).attr('data-devSecondType').split(',')
                        var devSecondType = row.devSecondType.toString();
                        if ($.inArray(devSecondType, devSecondTypes) < 0) {
                            $(this).hide();
                        } else {
                            $(this).show();
                        }
                    }
                }
            }
        });
    if (row.devSecondType == 15 || row.devSecondType == 14) {
        $.post('http://www.fangzhizun.com/device/ant/WEMQueryBasicInformation', {
            type: row.devSecondType == 15 ? 2 : 1,
            coId: _loginCoId,
            antDeviceId: row.devAntDeviceId,
        }, function (data) {
            if (data.code != 0) {
                data = data.body;
                myTips(data.message, "error");
            } else {
                data = data.body;
                $("#antReading").html('当前设备的读数：' + data.meterReading);
            }
        })
    }
    $('#antOperateDlg').dialog("open");
}

function antOperateDlg(type) {
    var width = 0;
    var height = 0;
    if (type == 1) {
        width = 900;
        height = 200;
    } else if (type == 2 || type == 9) {
        width = 700;
        height = 400;
    } else if (type == 3) {
        width = 1200;
        height = 500;
    } else {
        width = 600;
        height = 340;
    }
    $('#antOperateControlDlg').dialog({
        title: '设备控制',
        top: getTop(height),
        left: getLeft(width),
        width: width,
        height: height,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#antOperateControlDlg input").val('');
            $("#antDeviceInformation span").html('');
        }
    });
    $("#antDeviceInformation").hide();
    $("#antRecord").hide();
    $("#passwordList").hide();
    $("#createPassword").hide();
    $("#antReadingList").hide();
    var row = $("#deviceInfoTable").datagrid("getSelected");
    if (type == 1) {
        $("#antDeviceInformation").show();
        var operateType = 0;
        var url = '';
        if (row.devId == '10000001') {//门锁
            operateType = 1;
            url = 'DLGetInformation';
        } else if (row.devId == '10000003') {//电表
            operateType = 2;
            url = 'WEMQueryBasicInformation';
        } else if (row.devId == '10000002') {//水表
            operateType = 1;
            url = 'WEMQueryBasicInformation';
        }
        $.post("http://www.fangzhizun.com/device/ant/" + url, {
            type: operateType,
            coId: _loginCoId,
            antDeviceId: row.devAntDeviceId,
        }, function (data) {
            console.log(data);
            if (data.code == 0) {
                data = data.body;
                for (var i in data) {
                    if (i == 'networkStatus') {
                        $("#" + i).html(data[i] == '3000000000001' ? '在线' : '离线');
                    } else if (i == 'communicateMode') {
                        $("#" + i).html(data[i] == 1 ? 'WIFI' : data[i] == 2 ? '蓝牙' : data[i] == 3 ? 'ZIGBEE' : data[i] == 4 ? '电力线载波' : data[i] == 5 ? 'NB-IoT' : data[i] == 6 ? 'Lora' : data[i] == 7 ? 'Lora' : 'RS-485');
                    } else {
                        $("#" + i).html(data[i]);
                    }
                }
            } else {
                myTips("获取设备数据失败！", "error");
            }
        });
    } else if (type == 2) {
        $("#antRecord").show();
        $("#searchBillingDateFrom2").val(DecDays(1)+' 00:00:00');
        $("#searchBillingDateTo2").val(new Date().format("yyyy-MM-dd hh:mm:ss"));
        getoperationType();
    } else if (type == 3) {
        $("#passwordList").show();
        $.post("http://www.fangzhizun.com/device/ant/DLGetInformation", {
            type: 2,
            coId: _loginCoId,
            antDeviceId: row.devAntDeviceId,
        }, function (data) {
            console.log(data);
            if (data.code == 0) {
                data = data.body;
                var passwordList = data.passwordList;
                for (var i in passwordList) {
                    var passwordType = passwordList[i].passwordType;
                    passwordList[i].passwordType = passwordType == 1 ? '普通密码' : passwordType == 2 ? '激活码密码' : passwordType == 3 ? '离线密码' : passwordType == 4 ? '永久密码' : '一次性密码';
                    $.post('http://www.fangzhizun.com/device/ant/DLGetPasswordStatus',{
                        coId        : _loginCoId,
                        antDeviceId : row.devAntDeviceId,
                        passwordId  : passwordList[i].passwordId
                    },function (result) {
                        if (result.code == 0){
                            var result = result.body;
                            for (var j in passwordList){
                                if (passwordList[j].passwordId == result.passwordId){
                                    var passwordStatus = result.passwordStatus;
                                    passwordList[j].passwordStatus = passwordStatus == 1 ? '未激活' : passwordStatus == 2 ? '激活' : passwordStatus == 3 ? '冻结' : '失效';
                                    passwordList[j].latestOperationFlowId = result.latestOperationFlowId;
                                    passwordList[j].latestOperationType = result.latestOperationType;
                                    passwordList[j].latestOperationStatus = result.latestOperationStatus;
                                }
                            }
                            $("#passwordListTable").datagrid("loadData", passwordList);
                        }
                    });
                }
                $("#passwordListTable").datagrid("loadData", passwordList);
            } else {
                data = data.body;
                $("#passwordListTable").datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: data.message
                })
            }
        });
    } else if (type == 4) {
        $("#createPassword").show();
        $("#selectPassword").hide();
        $("#changePasswordType").hide();
        $("#managePasswordType").hide();
        $("#createPasswordType").show();
        $("#selectPopulation").show();
        $("#validStartTimeDlg").show();
        $("#validEndTimeDlg").show();
        $("#passwordDlg").hide();
        selectPasswordType();
        $("#antRoomName").val(row.detailedAddress);

        $("#antOperationButton").attr('onclick', 'antCreatePassword(1)');
    } else if (type == 5) {
        $("#createPassword").show();
        $("#selectPassword").show();
        $("#changePasswordType").show();
        $("#createPasswordType").hide();
        $("#managePasswordType").hide();
        $("#selectPopulation").hide();
        $("#antPasswordInput").show();
        selectModifyType();
        $("#antRoomName").val(row.detailedAddress);

        $("#antOperationButton").attr('onclick', 'antCreatePassword(2)');
    } else if (type == 6) {
        $("#createPassword").show();
        $("#selectPassword").show();
        $("#selectPopulation").hide();
        $("#validStartTimeDlg").hide();
        $("#validEndTimeDlg").hide();
        $("#passwordDlg").hide();
        $("#antPasswordInput").show();
        $("#changePasswordType").hide();
        $("#createPasswordType").hide();
        $("#managePasswordType").show();
        $("#antRoomName").val(row.detailedAddress);

        $("#antOperationButton").attr('onclick', 'antCreatePassword(3)');
    } else if (type == 7) {
        antElectricityMeter(1);
        return;
    } else if (type == 8) {
        antElectricityMeter(2);
        return;
    } else if (type == 9) {
        $("#antReadingList").show();
        $("#searchBillingDateTo3").val(new Date().format("yyyy-MM-dd hh:mm:ss"));
        queryAntReading();
    }
    $("#antOperateControlDlg").dialog("open")
}

//电表控制
function antElectricityMeter(type) {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    $.post('http://www.fangzhizun.com/device/ant/WEMOperationController', {
        coId: _loginCoId,
        type: type,
        antDeviceId: row.devAntDeviceId
    }, function (data) {
        if (data.code) {
            myTips(data.msg, 'error');
        } else {
            myTips('指令推送成功', 'success');
        }
    });

}

function queryType() {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var startTime = $("#searchBillingDateFrom3").val();
    var type = 0;
    if (row.devId == '10000003') {//电表
        if (startTime == '' || startTime == null) {//时间点读数
            type = 4;
        } else {//时间范围内读数
            type = 5;
        }
    } else {//水表
        if (startTime == '' || startTime == null) {
            type = 14;
        } else {
            type = 15;
        }
    }
    return type;
}

//获取水电表读数
function queryAntReading() {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var startTime = $("#searchBillingDateFrom3").val();
    var endTime = $("#searchBillingDateTo3").val();
    var type = queryType();

    $.post('http://www.fangzhizun.com/device/ant/WEMQueryRecord', {
        coId: _loginCoId,
        type: type,
        antDeviceId: row.devAntDeviceId,
        timePoint: endTime,
        startTime: startTime,
        endTime: endTime,
        offset: 0,
        limit: 1000,
    }, function (data) {
        if (data.code != 0) {
            myTips(data.msg, 'error');
        } else {
            data = data.body;
            if (type == 4 || type == 14) {
                var list = [];
                list.push(data);
                $("#antReadingListTable").datagrid('loadData', list);
            } else {
                var list = data.meterReadingList;
                $("#antReadingListTable").datagrid('loadData', list);

            }
        }
    })

}

//选择记录类型
function getoperationType() {
    var type = $("#operationType").val();
    if (type == '1') {
        $("#operationRecord").hide();
        $("#actionRecord").hide();
        $("#abnormalRecord").show();
        if ($('#abnormalRecordTable').hasClass('datagrid-f')) {
        } else {
            $('#abnormalRecordTable').datagrid({
                columns: [[{
                    field: 'errorType',
                    title: '错误类型',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'errorMsg',
                    title: '错误消息',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'fireTime',
                    title: '发生时间',
                    width: 20,
                    align: 'center'
                }]],
                width: '100%',
                height: '100%',
                singleSelect: true,
                rownumbers: true,
                autoRowHeight: false,
                pageSize: 10,
                scrollbarSize: 0,
                showPageList: false,
                fitColumns: true,
                onDblClickRow: function (rowIndex, rowData) {
                }
            });
        }
    } else if (type == '2') {
        $("#operationRecord").show();
        $("#abnormalRecord").hide();
        $("#actionRecord").hide();
        if ($('#operationRecordTable').hasClass('datagrid-f')) {
        } else {
            $('#operationRecordTable').datagrid({
                columns: [[{
                    field: 'operationFlowId',
                    title: '操作流水标识',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'operationStatus',
                    title: '操作状态',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'lastUpdateTime',
                    title: '最新更新时间',
                    width: 20,
                    align: 'center'
                }]],
                width: '100%',
                height: '100%',
                singleSelect: true,
                rownumbers: true,
                autoRowHeight: false,
                pageSize: 10,
                scrollbarSize: 0,
                showPageList: false,
                fitColumns: true,
                onDblClickRow: function (rowIndex, rowData) {
                }
            });
        }
    } else {
        $("#operationRecord").hide();
        $("#abnormalRecord").hide();
        $("#actionRecord").show();
        if ($('#actionRecordTable').hasClass('datagrid-f')) {
        } else {
            $('#actionRecordTable').datagrid({
                columns: [[{
                    field: 'actionType',
                    title: '操作流水标识',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'passwordId',
                    title: '密码标识',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'meterReading',
                    title: '读数',
                    width: 20,
                    align: 'center'
                }, {
                    field: 'fireTime',
                    title: '最新更新时间',
                    width: 20,
                    align: 'center'
                }]],
                width: '100%',
                height: '100%',
                singleSelect: true,
                rownumbers: true,
                autoRowHeight: false,
                pageSize: 10,
                scrollbarSize: 0,
                showPageList: false,
                fitColumns: true,
                onDblClickRow: function (rowIndex, rowData) {
                }
            });
        }
    }
    getAntRecord();
}

//获取蚂蚁记录
function getAntRecord() {
    var type = $("#operationType").val();
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var startTime = $("#searchBillingDateFrom2").val();
    var endTime = $("#searchBillingDateTo2").val();
    var operateType = 0;
    var url = '';
    if (row.devId == '10000001') {//门锁
        if (type == '1') {
            operateType = 1;
        } else if (type == '2') {
            operateType = 2;
        } else if (type == '3') {
            operateType = 3;
        }
        url = 'DLGetRecord';
    } else if (row.devId == '10000003') {//电表
        if (type == '1') {
            operateType = 2;
        } else if (type == '2') {
            operateType = 1;
        } else if (type == '3') {
            operateType = 3;
        }
        url = 'WEMQueryRecord';
    } else if (row.devId == '10000002') {//水表
        if (type == '1') {
            operateType = 12;
        } else if (type == '2') {
            operateType = 11;
        } else if (type == '3') {
            operateType = 13;
        }
        url = 'WEMQueryRecord';
    }

    $.post("http://www.fangzhizun.com/device/ant/" + url, {
        coId: _loginCoId,
        type: operateType,
        antDeviceId: row.devAntDeviceId,
        startTime: startTime,
        endTime: endTime,
        offset: 0,
        limit: 1000
    }, function (data) {
        if (data.code == 0) {
            data = data.body;
            if (type == '1') {
                var errorList = data.errorList;
                $("#abnormalRecordTable").datagrid("loadData", errorList);
            } else if (type == '2') {
                var recordList = data.recordList;
                $("#operationRecordTable").datagrid("loadData", recordList);
            } else if (type == '3') {
                var recordList = data.recordList;
                for (var i in recordList) {
                    var actionAttrValues = recordList[i].actionAttrValues;
                    if (recordList[i].actionType == '门锁打开') {
                        recordList[i].passwordId = actionAttrValues.passwordId;
                    } else if (recordList[i].actionType == '电量上报' || recordList[i].actionType == '水量上报') {
                        recordList[i].meterReading = actionAttrValues.meterReading;
                    }
                }
                $("#actionRecordTable").datagrid("loadData", recordList);
            }
        } else {
            if (type == '1') {
                $("#abnormalRecordTable").datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: data.msg
                })
            } else if (type == '2') {
                $("#operationRecordTable").datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: data.msg
                })
            } else if (type == '3') {
                $("#actionRecordTable").datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: data.msg
                })
            }
        }
    })
}

//蚂蚁门锁选择密码方式
function selectPasswordType() {
    var type = $("#antPasswordType").val();
    if (type == 3) {
        $("#antPasswordInput").hide();
    } else {
        $("#antPasswordInput").show();
    }
}

//选择修改密码类型
function selectModifyType() {
    var type = $("#antOperationType").val();
    if (type == 1) {
        $("#validStartTimeDlg").hide();
        $("#validEndTimeDlg").hide();
        $("#passwordDlg").show();
    } else {
        $("#validStartTimeDlg").show();
        $("#validEndTimeDlg").show();
        $("#passwordDlg").hide();
    }
}

//蚂蚁平台门锁创建密码
function antCreatePassword(operationType) {
    var passwordType = $("#antPasswordType").find("option:selected").text();
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var validStartTime = $("#validStartTime").val();
    var validEndTime = $("#validEndTime").val();
    var antUserName = $("#antUserName").val();
    var antPhoneNumber = $("#antPhoneNumber").val();
    var antRoomName = $("#antRoomName").val();
    var password = $("#password").val();
    var japPasswordId = $("#japPasswordId").val();

    var url = '';
    var type = '';
    if (operationType == 1) {
        url = 'DLCreatePassword';
        type = $("#antPasswordType").val();
    } else if (operationType == 2) {
        url = 'DLChangePassword';
        type = $("#antOperationType").val();
    } else if (operationType == 3) {
        url = 'DLPasswordValidity';
        type = $("#antManageType").val();
    }
    $.post('http://www.fangzhizun.com/device/ant/' + url, {
        coId: _loginCoId,
        type: type,
        antDeviceId: row.devAntDeviceId,
        startTime: validStartTime,
        endTime: validEndTime,
        userName: antUserName,
        phoneNumber: antPhoneNumber,
        roomName: antRoomName,
        password: password,
        passwordId: japPasswordId,
    }, function (data) {
        console.log(data)
        if (data.code != 0) {
            data = data.body;
            myTips(data.message, 'error')
        } else {
            data = data.body;
            if (operationType == 1) {
                $.post('../insertAntPasswordRecording.action', {
                    japHsId: row.jhdHsId,
                    japPopId: $("#popId").val(),
                    japUserId: _loginUserId,
                    japAntDeviceId: row.devAntDeviceId,
                    japPasswordId: data.passwordId,
                    japOperationFlowId: data.operationFlowId,
                    japOperationStatus: data.operationStatus == 1 ? '未执行' : data.operationStatus == 2 ? '执行中' : data.operationStatus == 3 ? '执行成功' : '执行失败',
                    japPasswordStatus: data.passwordStatus == 1 ? '未激活' : data.passwordStatus == 2 ? '激活' : data.passwordStatus == 3 ? '冻结' : '失效',
                    japPasswordType: passwordType,
                    japStartTime: validStartTime,
                    japEndTime: validEndTime
                }, function (result) {
                    if (result.code != 1) {
                        myTips(result.msg, 'error');
                    } else {
                        myTips(result.msg, 'success');
                        $("#antOperateControlDlg").dialog('close')
                    }
                });
            } else if (operationType == 2) {
                var data = {
                    japId: $("#japId").val(),
                    japOperationFlowId: data.operationFlowId,
                    japOperationStatus: data.operationStatus == 1 ? '未执行' : data.operationStatus == 2 ? '执行中' : data.operationStatus == 3 ? '执行成功' : '执行失败',
                    japPasswordStatus: data.passwordStatus == 1 ? '未激活' : data.passwordStatus == 2 ? '激活' : data.passwordStatus == 3 ? '冻结' : '失效',
                }
                if (type == 2) {
                    data.japStartTime = validStartTime;
                    data.japEndTime = validEndTime;
                }
                $.post('../updateAntPassword.action', data, function (result) {
                    if (result.code != 1) {
                        myTips(result.msg, 'error');
                    } else {
                        myTips(result.msg, 'success');
                        $("#antOperateControlDlg").dialog('close')
                    }
                });
            } else if (operationType == 3) {
                $.post('../updateAntPassword.action', {
                    japId: $("#japId").val(),
                    japOperationStatus: data.operationStatus == 1 ? '未执行' : data.operationStatus == 2 ? '执行中' : data.operationStatus == 3 ? '执行成功' : '执行失败',
                    japOperationFlowId: data.operationFlowId,
                    japPasswordStatus: data.passwordStatus == 1 ? '未激活' : data.passwordStatus == 2 ? '激活' : data.passwordStatus == 3 ? '冻结' : '失效',
                }, function (result) {
                    if (result.code != 1) {
                        myTips(result.msg, 'error');
                    } else {
                        myTips(result.msg, 'success');
                        $("#antOperateControlDlg").dialog('close')
                    }
                });
            }
        }
    });
}

//选择房屋人员
function getHousePopulationDlg() {
    $('#getHousePopulationDlg').dialog({
        title: '房屋人员（双击选择）',
        top: getTop(240),
        left: getLeft(540),
        width: 640,
        height: 340,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            var data = [];
            $('#housePopulationTable').datagrid("loadData", data)
        }
    });
    getHousePopulation();
    $('#getHousePopulationDlg').dialog("open");
}

function getHousePopulation() {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    console.log(row);
    if (row.jhdHsId == null || row.jhdHsId == '' || row.jhdHsId == undefined) {
        myTips('该设备没有绑定房间', 'error');
        return;
    }
    $.post('../getHousePopulation.action', {
        hsId: row.jhdHsId
    }, function (data) {
        if (data.code != 1) {
            $("#housePopulationTable").datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            })
        } else {
            data = data.body;
            $("#housePopulationTable").datagrid('loadData', data);
        }
    })
}

//选择密码
function selectPasswordDlg() {
    $('#selectPasswordDlg').dialog({
        title: '门锁密码列表（双击选择）',
        top: getTop(440),
        left: getLeft(740),
        width: 740,
        height: 440,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            var data = [];
            $('#selectPasswordTable').datagrid("loadData", data)
        }
    });
    selectPassword(1, 0);
    $('#selectPasswordDlg').dialog("open");
}

function selectPassword(page, type) {
    var startNum = (parseInt(page) - 1) * 10;
    var endNum = 10;
    var row = $("#deviceInfoTable").datagrid("getSelected");
    $.post('../selectPassword.action', {
        startNum: startNum,
        endNum: endNum,
        japAntDeviceId: row.devAntDeviceId
    }, function (data) {
        if (data.code != 1) {
            sourcePages(0, 0, 2);
            $("#selectPasswordTable").datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            })
        } else {
            data = data.body;
            if (page == 1 && type == 0) {
                sourcePages(data[0].totalNum, page, 2);
            }
            $("#selectPasswordTable").datagrid('loadData', data);
        }
    })
}

function hydrometerDlg() {
    $('#hydrometerDlg').dialog({
        title: '水电表控制',
        top: getTop(150),
        left: getLeft(600),
        width: 600,
        height: 150,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#hydrometerDlg [require='require']").each(function () {
                $(this).removeClass('btn-success');
                $(this).addClass('btn-default');
            });
            $("#hydrometerDlg .btn").each(function () {
                $(this).removeAttr('disabled');
            });
            $("#hydrometerStateDlg").html("")
        }
    });
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var str = row.devState
    if (str.indexOf("通电") != -1 || str.indexOf("开阀") != -1) {
        $("#joyOpen").removeClass('btn-default');
        $("#joyOpen").addClass('btn-success');
        $("#joyOff").removeClass('btn-success');
        $("#joyOff").addClass('btn-default');
    } else {
        $("#joyOff").removeClass('btn-default');
        $("#joyOff").addClass('btn-success');
        $("#joyOpen").removeClass('btn-success');
        $("#joyOpen").addClass('btn-default');
    }
    hydrometerStatus();
    $('#hydrometerDlg').dialog("open")
}

function hydrometerStatus() {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    console.log(row);
    var meterNo = trimStr(row.devSn);
    $.post("http://www.fangzhizun.com/device/joy/ReadoutServlet", {
        meterNo: meterNo
    }, function (data) {
        if (data.status == 1) {
            data = data.body;
            if (row.devFirstType == 14) {
                $("#joyOpen").html('开阀');
                $("#joyOff").html('关阀');
                $("#hydrometerStateDlg").html('<span style="color: #00c900;font-size: 18px">当前水量：' + data[0].this_read + ' m³</span>');
            } else {
                $("#joyOpen").html('通电');
                $("#joyOff").html('断电');
                $("#hydrometerStateDlg").html('<span style="color: #00c900;font-size: 18px">当前电量：' + data[0].this_read + ' KW•h</span>');
            }
        } else {
            $("#hydrometerStateDlg").html('<span style="color: red;font-size: 18px">获取不到设备读数！</span>');
        }
    });
}

function trimStr(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function mdElectricBoxDlg() {
    $('#mdElectricBoxDlg').dialog({
        title: '电箱控制',
        top: getTop(150),
        left: getLeft(600),
        width: 600,
        height: 150,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#mdElectricBoxDlg [require='require']").each(function () {
                $(this).removeClass('btn-success');
                $(this).addClass('btn-default');
            });
            $("#mdElectricBoxDlg .btn").each(function () {
                $(this).removeAttr('disabled');
            });
            $("#mdElectricQuantity").html("")
        }
    });
    MDRequestElectricBoxStatus();
    $('#mdElectricBoxDlg').dialog("open")
}

function MDRequestElectricBoxStatus() {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    $.post("http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus", {
        projectCode: row.devId,
        mac: row.devSn,
    }, function (data) {
        console.log(data);
        if (data.code == 0) {
            data = data.body;
            for (var i in data) {
                if (data[i].addr == row.devRoad) {
                    if (data[i].oc) {
                        $("#mdOpen").removeClass('btn-default');
                        $("#mdOpen").addClass('btn-success');
                        $("#mdOff").removeClass('btn-success');
                        $("#mdOff").addClass('btn-default');
                    } else {
                        $("#mdOff").removeClass('btn-default');
                        $("#mdOff").addClass('btn-success');
                        $("#mdOpen").removeClass('btn-success');
                        $("#mdOpen").addClass('btn-default');
                    }
                    $("#mdElectricQuantity").html('<span style="color: #00c900;font-size: 18px">当前电量：' + data[i].power + 'KWh</span>');
                }
            }
        } else {
            $("#mdElectricQuantity").html('<span style="color: red;font-size: 18px">获取不到设备状态！</span>');
        }
    });
}

//曼顿电箱控制
function MDElectricBoxControl(type) {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var url = "http://www.fangzhizun.com/device/mandun/MDEBControl";
    var zz = {};
    zz.projectCode = row.devId;
    zz.mac = row.devSn;
    var enableNetCtrl = true;

    $.ajax({
        type: "post",
        url: "http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus",
        data: {
            projectCode: row.devId,
            mac: row.devSn
        },
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.code == 0) {
                data = data.body;
                for (var i in data) {
                    if (data[i].addr == row.devRoad) {
                        enableNetCtrl = data[i].enableNetCtrl;
                    }
                }
            }
        }
    });

    switch (type) {
        case 1:
            if (enableNetCtrl) {
                $.messager.confirm('确认框', '在进行通电前请确保电路正常，没人在进行电路维修，是否继续通电操作？', function (r) {
                    if (r) {
                        zz.cmd = "OCSWITCH";
                        zz.value1 = "open";
                        zz.value2 = row.devRoad;
                        $.post(url, zz, function (data) {
                            if (data.code == 0) {
                                myTips(data.message, 'success');
                                $("#mdOpen").removeClass('btn-default');
                                $("#mdOpen").addClass('btn-success');
                                $("#mdOff").removeClass('btn-success');
                                $("#mdOff").addClass('btn-default');
                            } else {
                                myTips(data.message, 'error');
                            }
                        });
                    }
                });
            } else {
                myTips("当前电箱状态为不可远程控制，请检查开关是否被手动分闸了！", "error");
            }
            return;
        case 2:
            if (enableNetCtrl) {
                $.messager.confirm('确认框', '在断电前请确认没人在使用电器，否则可能会造成一定的影响，是否继续断电操作？', function (r) {
                    if (r) {
                        zz.cmd = "OCSWITCH";
                        zz.value1 = "close";
                        zz.value2 = row.devRoad;
                        $.post(url, zz, function (data) {
                            if (data.code == 0) {
                                myTips(data.message, 'success');
                                $("#mdOpen").removeClass('btn-success');
                                $("#mdOpen").addClass('btn-default');
                                $("#mdOff").removeClass('btn-default');
                                $("#mdOff").addClass('btn-success');
                            } else {
                                myTips(data.message, 'error');
                            }
                        });
                    }
                });
            } else {
                myTips("当前电箱状态为不可远程控制，请检查开关是否被手动分闸了！", "error");
            }
            return;
        case 3:
            zz.cmd = "SWITCHSET";
            zz.value1 = row.devRoad;
            zz.value2 = $("#lineName").val();
            zz.value4 = $("#maximumPower").val();
            zz.value5 = $("#overflowThreshold").val();
            break;
        case 4:
            zz.cmd = "SETAUTOLEAK";
            zz.value1 = $("#startUsing").prop("checked");
            zz.value2 = $("#day").val();
            zz.value3 = $("#hour").val();
            zz.value4 = $("#minute").val();
            break;
        case 5:
            zz.cmd = "SETLOGINPWD";
            zz.value1 = $("#usedPassword").val();
            zz.value2 = $("#newPassword").val();
            break;
        case 6:
            zz.cmd = "SETWIRELESS";
            zz.value1 = $("#used_ssid").val();
            zz.value2 = $("#used_ssidPassword").val();
            zz.value3 = $("#new_ssid").val();
            zz.value5 = $("#new_ssidPassword").val();
            break;
        case 9:
            $.post("http://www.fangzhizun.com/device/mandun/MDQueryTimingData", {
                projectCode: row.devId,
                mac: row.devSn,
                autoid: 0,
            }, function (data) {
                console.log(data)
                if (data.code < 0) {
                    $('#getCfgTimerTable').datagrid({
                        data: [],
                        view: myview,
                        emptyMsg: data.msg
                    });
                } else {
                    data = data.body;
                    $("#getCfgTimerTable").datagrid("loadData", data);
                }
            }, "json");
            return;
        case 10:
            $.post("http://www.fangzhizun.com/device/mandun/MDQueryLeakageSelfInspection", {
                projectCode: row.devId,
                mac: row.devSn,
            }, function (data) {
                if (data.code < 0) {
                    myTips(data.msg, "error");
                } else {
                    data = data.body;
                    for (var i in data) {
                        if (data[i] == true) {
                            data[i] = "已启用"
                        } else if (data[i] == false) {
                            data[i] = "未启用"
                        }
                        $("#" + i).html(data[i]);
                    }
                }
            }, "json");
            return;
    }
    showLoading();
    $.post(url, zz, function (data) {
        hideLoading();
        if (data.code == 0) {
            myTips(data.message, 'success');
        } else {
            myTips(data.message, 'error');
        }
    });
    $('#MDElectricBoxControlDlg').dialog('close');
}

function MDElectricBoxControlDlg(type) {
    var width = 0;
    var height = 0;
    if (type == 7 || type == 8 || type == 9 || type == 11 || type == 12) {
        width = 800;
        height = 450;
    } else {
        width = 600;
        height = 280;
    }
    $('#MDElectricBoxControlDlg').dialog({
        title: '电箱控制',
        top: getTop(height),
        left: getLeft(width),
        width: width,
        height: height,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#MDElectricBoxControlDlg input").val('');
        }
    });
    $("#submit").attr("onclick", "MDElectricBoxControl(" + type + ")");
    $("#SETLOGINPWDControl").hide();
    $("#SETAUTOLEAKControl").hide();
    $("#switchsetControl").hide();
    $("#SETWIRELESSControl").hide();
    $("#ElectricBoxStatus").hide();
    $("#GET_BOX_ALARM").hide();
    $("#GET_CFG_TIMER").hide();
    $("#GET_CFG_LKICHK").hide();
    $("#GET_BOX_ONLINE_HISTORY").hide();
    $("#statisticalElectricity").hide();
    $("#button").hide();

    var row = $("#deviceInfoTable").datagrid("getSelected");
    if (type == 3) {
        $("#lineName").val(row.detailedAddress);
        $("#switchsetControl").show();
        $("#button").show();
    } else if (type == 4) {
        $("#SETAUTOLEAKControl").show();
        $("#button").show();
        MDElectricBoxControl(10);
    } else if (type == 5) {
        $("#SETLOGINPWDControl").show();
        $("#button").show();
    } else if (type == 6) {
        $("#SETWIRELESSControl").show();
        $("#button").show();
    } else if (type == 7) {
        $("#ElectricBoxStatus").show();

        var row = $("#deviceInfoTable").datagrid("getSelected");
        $.post("http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus", {
            projectCode: row.devId,
            mac: row.devSn,
        }, function (data) {
            console.log(data);
            if (data.code == 0) {
                data = data.body;
                for (var i in data) {
                    if (data[i].addr == row.devRoad) {
                        for (var j in data[i]) {
                            if (j == "oc") {
                                $("#s" + j).html(data[i][j] == true ? "开" : "关");
                            } else if (j == "enableNetCtrl") {
                                $("#s" + j).html(data[i][j] == true ? "允许" : "不允许");
                            } else if (j == "validity") {
                                $("#s" + j).html(data[i][j] == true ? "有效" : "无效");
                            } else if (j == "online") {
                                $("#s" + j).html(data[i][j] == false ? "离线" : "在线");
                            } else if (j == "lineType") {
                                $("#s" + j).html(data[i][j] == "220" ? "单相" : "三相");
                            } else if (j == "alarm") {
                                $("#s" + j).html(data[i][j] == 0 || 128 ? "告警取消" : "存在告警");
                            } else if (j == "gatherAddr") {
                                $("#s" + j).html(data[i][j] == -1 ? "进线直连" : data[i][j]);
                            } else if (j == "control") {
                                $("#s" + j).html(data[i][j] == true ? "是" : "否");
                            } else if (j == "visibility") {
                                $("#s" + j).html(data[i][j] == true ? "是" : "否");
                            } else if (j == "mainLine") {
                                $("#s" + j).html(data[i][j] == "0" ? "非总线" : "总线");
                            } else {
                                $("#s" + j).html(data[i][j]);
                            }
                        }
                    }
                }
            } else {
                myTips("获取设备数据失败！", "error");
            }
        });
    } else if (type == 8) {
        $("#GET_BOX_ALARM").show();

        var data1 = new Date().format("yyyy-MM-dd") + " 00:00";
        var data2 = new Date().format("yyyy-MM-dd hh:mm");
        $("#searchBillingDateFrom").val(data1);
        $("#searchBillingDateTo").val(data2);
        getBoxAlarm(1, 0);
    } else if (type == 9) {
        $("#GET_CFG_TIMER").show();
        MDElectricBoxControl(9);
    } else if (type == 10) {
        $("#GET_CFG_LKICHK").show();
        MDElectricBoxControl(10);
    } else if (type == 11) {
        $("#GET_BOX_ONLINE_HISTORY").show();
        var data1 = new Date().format("yyyy-MM-dd") + " 00:00";
        var data2 = new Date().format("yyyy-MM-dd hh:mm");
        $("#startTime").val(data1);
        $("#endTime").val(data2);
        getBoxOnlineHistory(1, 0);
    } else if (type == 12) {
        $("#statisticalElectricity").show();
        var data1 = new Date().format("yyyy");
        $("#searchYear").val(data1);
        getstatisticalElectricity();
    }
    $('#MDElectricBoxControlDlg').dialog("open")
}

function getBoxAlarm(page, type) {
    var start = $("#searchBillingDateFrom").val();
    var end = $("#searchBillingDateTo").val();
    var pageSize = 10;
    var alarmType = "W";
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var projectCode = row.devId;
    var mac = row.devSn;

    $.post("http://www.fangzhizun.com/device/mandun/MDRequestEBWarning", {
        projectCode: projectCode,
        mac: mac,
        start: start,
        end: end,
        pageSize: pageSize,
        page: page,
        type: alarmType
    }, function (data) {
        console.log(data)
        if (data.code < 0) {
            sourcePages(0, 0, 0);
            $('#getBoxAlarmTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        } else {
            data = data.body;
            var datas = data.datas;
            if (page == 1 && type == 0) {
                sourcePages(data.total, page, 0);
            }
            $("#getBoxAlarmTable").datagrid("loadData", datas);
        }
    }, "json");
}

// 分页操作
function sourcePages(totalNum, page, type) {
    var pageNum = Math.ceil(totalNum / 10);
    if (type == 0) {
        pageNum = Math.ceil(totalNum / 10);
        $("#getBoxAlarmPage").remove();
        $("#getBoxAlarmPageDiv").append("<div class='tcdPageCode' id='getBoxAlarmPage' style='text-align:center;'></div>");
        $("#getBoxAlarmPage").createPage({
            onePageNums: 10,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    _pageNum[0] = p;
                    _indexNum[0] = 0;
                    getBoxAlarm(p, 1);
                }
            }
        });
    }
    if (type == 1) {
        pageNum = Math.ceil(totalNum / 10);
        $("#getBoxOnlineHistoryPage").remove();
        $("#getBoxOnlineHistoryPageDiv").append("<div class='tcdPageCode' id='getBoxOnlineHistoryPage' style='text-align:center;'></div>");
        $("#getBoxOnlineHistoryPage").createPage({
            onePageNums: 10,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    _pageNum[0] = p;
                    _indexNum[0] = 0;
                    getBoxAlarm(p, 1);
                }
            }
        });
    }
    if (type == 2) {
        pageNum = Math.ceil(totalNum / 10);
        $("#selectPasswordTablePage").remove();
        $("#selectPasswordTablePageDiv").append("<div class='tcdPageCode' id='selectPasswordTablePage' style='text-align:center;'></div>");
        $("#selectPasswordTablePage").createPage({
            onePageNums: 10,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    _pageNum[0] = p;
                    _indexNum[0] = 0;
                    selectPassword(p, 1);
                }
            }
        });
    }
}

function getBoxOnlineHistory(page, type) {
    var start = $("#startTime").val();
    var end = $("#endTime").val();
    var pageSize = 10;
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var projectCode = row.devId;
    var mac = row.devSn;

    $.post("http://www.fangzhizun.com/device/mandun/MDQueryOnlineRecording", {
        projectCode: projectCode,
        mac: mac,
        startTime: start,
        endTime: end,
        pageSize: pageSize,
        page: page,
    }, function (data) {
        console.log(data)
        if (data.code < 0) {
            sourcePages(0, 0, 1);
            $('#getBoxOnlineHistoryTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        } else {
            data = data.body;
            var datas = data.datas;
            for (var i in datas) {
                if (datas[i].onlineStatus == 1) {
                    datas[i].status = "在线";
                } else if (datas[i].onlineStatus == 0) {
                    datas[i].status = "离线";
                } else if (datas[i].onlineStatus == -1) {
                    datas[i].status = "脱线";
                }
            }
            if (page == 1 && type == 0) {
                sourcePages(data.total, page, 1);
            }
            $("#getBoxOnlineHistoryTable").datagrid("loadData", datas);
        }
    }, "json");
}

function getstatisticalElectricity() {
    var year = $("#searchYear").val();
    var month = $("#searchMonth").val();
    var day = $("#searchDay").val();
    var hour = $("#searchHour").val();
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var projectCode = row.devId;
    var mac = row.devSn;
    var url = "";
    var electricity = "";
    if (month != "" && month != null) {
        if (day != "" && day != null) {
            if (hour != "" && hour != null) {
                url = "http://www.fangzhizun.com/device/mandun/MDQueryHourElectricity";
                electricity = "小时的区间用电量/KWh";
            } else {
                url = "http://www.fangzhizun.com/device/mandun/MDQueryHourElectricity";
                electricity = "天的区间用电量/KWh";
            }
        } else {
            url = "http://www.fangzhizun.com/device/mandun/MDQueryDayElectricity";
            electricity = "月的区间用电量/KWh";
        }
    } else {
        url = "http://www.fangzhizun.com/device/mandun/MDQueryMonthElectricity";
        electricity = "月的区间用电量/KWh";
    }
    $('#monthElectricityTable').datagrid(
        {
            columns: [[
                {
                    field: 'addr',
                    title: '线路地址',
                    width: 10,
                    align: 'center'
                },
                {
                    field: 'electricity',
                    title: electricity,
                    width: 10,
                    align: 'center'
                },
                {
                    field: 'totalElectricity',
                    title: '统计时电量刻度/KWh',
                    width: 10,
                    align: 'center'
                }
            ]],
            width: '100%',
            height: '100%',
            singleSelect: true,
            autoRowHeight: false,
            pagination: false,
            pageSize: 10,
            scrollbarSize: 0,
            showPageList: false,
            fitColumns: true,
        });

    $.post(url, {
        projectCode: projectCode,
        mac: mac,
        year: year,
        month: month,
        day: day,
        hour: hour,
    }, function (data) {
        console.log(data)
        if (data.code < 0) {
            sourcePages(0, 0, 1);
            $('#getBoxOnlineHistoryTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        } else {
            data = data.body;

            //$("#getBoxOnlineHistoryTable").datagrid("loadData", datas);
        }
    }, "json");
}
//显示其他开锁记录
function queryDeviceRecordDlg2(){
    $('#queryDeviceRecordDlg2').dialog({
        title: '开锁记录',
        top: getTop(240),
        left: getLeft(540),
        width: 640,
        height: 340,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            var data = [];
            $('#queryDeviceRecordTable2').datagrid("loadData", data)
        }
    });
    queryDeviceRecord2(1, 0);
    $('#queryDeviceRecordDlg2').dialog("open");
}
//获取其他开锁记录
function queryDeviceRecord2(page, type) {
    var row = $("#deviceInfoTable").datagrid("getSelected");
    var startNum = (parseInt(page) - 1) * 10;
    var endNum = 10;
    $.post("../selectUnlockRecord.action", {
        startNum    : startNum,
        endNum      : endNum,
        jurDeviceId : row.id,
    }, function (data) {
        if (data.code < 0) {
            sourcePage(0, 0, 4);
            $('#queryDeviceRecordTable2').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        } else {
            data = data.body;
            if (page == 1 && type == 0) {
                sourcePage(data[0].totalNum, page, 4);
            }
            for (var i = 0; i < data.length; i++) {
                // data[i].jglrBrand = data[i].jglrBrandId == 20 ? '云海物联' : '';
                data[i].hsAddCommunity = data[i].hsAddCommunity + data[i].hsAddBuilding + data[i].hsAddDoorplateno;
                data[i].jurOpenTime = new Date(data[i].jurOpenTime).format('yyyy-MM-dd hh:mm:ss');
            }
            $("#queryDeviceRecordTable2").datagrid("loadData", data);
        }
    })
}

function DecDays(dayIn) {
    var date=new Date();
    var myDate=new Date(date.getTime()-dayIn*24*60*60*1000);
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1;
    var day=myDate.getDate();
    CurrentDate=year+"-";
    if(month>=10)
    {
        CurrentDate=CurrentDate+month+"-";
    }
    else
    {
        CurrentDate=CurrentDate+"0"+month+"-";
    }
    if(day>=10)
    {
        CurrentDate=CurrentDate+day;
    }
    else
    {
        CurrentDate=CurrentDate+"0"+day;
    }
    return CurrentDate;
}