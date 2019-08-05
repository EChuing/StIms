var _flag = false;//ture为合约年度不完整价格在下，false为合约年度不完整价格在上
$(function () {
    initAddAsset();
    //加载下拉列表
    loadSelectList();
    //点击导航栏跳转
    $('#addHsDlg .process-bar .process').on('click', function () {
        if ($(this).hasClass('active')) {
            var step = $(this).attr('data-step');
            gotoStep('addHs', step);
            $('#centralizedApartmentParameterDg2').datagrid('loadData', []);
        }
    });
    $(document).click(function (e) {
        choseSelectHide('buildingNameDiv', 2);
        if ($(e.target).attr('id') == "buildingName") {
            choseSelectHide('buildingNameDiv', 1);
        }
    });
    //默认设置
    var today = new Date().format('yyyy-MM-dd');
    $('#addHsContractType').val('新签合同');
    $('#addHsInAdvancePay').val(0);//提前收租天数
    $('#addHsPaymentType').val('月付');//租金
    $('#outerFreeDaysBox').prop('checked', false);
    $('#outerFreeDays').hide();
    $('#addHsFreeDaysDecoration').val(0);
    _contractNumsArry = [];
    //城市
    $("#addNoTrusteeshipCity").append("<option value = '0'>" + _loginCompanyRentCity + "</option>");
    $("#addNoTrusteeshipCity").val(0);
    //业务员、房管员
    for (var j in _userInfoData) {
        if (_loginUserId == _userInfoData[j].userId) {
            $("#addHsManageGetUserId").val(_loginUserId);
            $("#addHsManageGetUserDetId").val(_loginDepartment);
            $("#addHsManageGetUserStoreId").val(_loginStore);
            $("#addHsManageShowUserInfo").val(_userInfoData[j].storefrontName + " " + _userInfoData[j].departmentName + " " + _userInfoData[j].suStaffName);
            $('#addHsSalesmanAllProfit').prop('checked', true);
            $("#addHsSalesmanGetUserId").val(_loginUserId);
            $("#addHsSalesmanGetUserDetId").val(_loginDepartment);
            $("#addHsSalesmanGetUserStoreId").val(_loginStore);
            $("#addHsSalesmanShowUserInfo").val(_userInfoData[j].storefrontName + " " + _userInfoData[j].departmentName + " " + _userInfoData[j].suStaffName);

        }
    }

    $('#outerFreeDaysBox').click(function () {
        if ($(this).prop('checked')) {
            $('#outerFreeDays').show();
        } else {
            $('#outerFreeDays').hide();
        }
        $('#addHsFreeDaysDecoration').val(0);
        $('#addHsFreeDaysHeader').val(0);
        $('#addHsFreeDaysFooter').val(0);
    });

    checkProfit('#addHsSalesmanAllProfit', 'addProfit', 'addHsSalesman');//收益人
    //显示第一步的界面
    gotoStep('addHs', 1);


    //房源信息隐藏
    $('#addHsDlg .chooseHouseButton').show();
    $('#addHsDlg .hsFieldset').hide();
    $('#priceLadder').hide();

    //添加未租添加集中房
    if ($('#action').val() == 'centralized') {//集中房
        $('#gotoStep4').hide();
        $('#gotoStep6').show();
        $('#gotoNav4').hide();
        $('#gotoNav5').hide();
        $('#gotoNav6').show();
        $('#gotoNav7').show();
        $('#saveStep3').hide();
        $('#gotoNav8').hide();
        $('#gotoNav9').hide();
        $('#gotoNav10').hide();
    } else {
        $('#gotoStep4').show();
        $('#gotoStep6').hide();
        $('#gotoNav4').show();
        $('#gotoNav5').show();
        $('#gotoNav6').hide();
        $('#gotoNav7').hide();
        $('#saveStep3').show();
        $('#gotoNav8').hide();
        $('#gotoNav9').hide();
        $('#gotoNav10').hide();
    }

});

//选择资料房
function chooseHousePaper() {
    $('#addHsHouseType').val(1);
    $('#choseHouse.input').val('');
    $('#searchAddDistrict').val('');
    $('#choseHouse').dialog({
        title: '选择房源',
        top: getTop(420),
        left: getLeft(750),
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
                field: 'addDistrict',
                title: '城区',
                width: 10,
                align: 'center'
            }, {
                field: 'addCommunity',
                title: '楼盘名称',
                width: 20,
                align: 'center'
            }, {
                field: 'addBuilding',
                title: '楼栋',
                width: 10,
                align: 'center'
            }, {
                field: 'addDoorplateno',
                title: '门牌号',
                width: 10,
                align: 'center'
            }, {
                field: 'houseState',
                title: '状态',
                width: 10,
                align: 'center'
            }]],
            width: '99%',
            height: '75%',
            singleSelect: true,
            autoRowHeight: false,
            pageSize: 10,
            scrollbarSize: 0,
            showPageList: false,
            fitColumns: true,

            onDblClickRow: function (rowIndex, rowData) {
                var row = rowData;
                // 将相应的值放到添加托管文本框里面
                // 房屋相关信息
                $("#addHsHouseId").val(row.houseCoding);
                $("#addHsHouseDictId").val(row.houseDictId);

                //映射房屋信息
                for (var i in row) {
                    $('#addHsDlg .' + i).val(row[i]);
                }
                $("#addHsDetailAddresss").val(row.addCommunity + ' ' + row.addBuilding + ' ' + row.addDoorplateno);
                //房东意向人
                if (row.houseLipId != null && row.houseLipId != '') {
                    $.post("../selectLandlordIntentionPerson.action", {
                        lipId: row.houseLipId
                    }, function (data) {
                        data = data.body;
//						sourcePage(data[0].totalNum,page,1);
                        $("#addHsLandlordName").val(data[0].lipLandlordName);
                        $("#addHsLandlordPhoneNum").val(data[0].lipLandlordPhone);
                        $("#addHsContacts").val(data[0].lipContactsPeople);
                        $("#addHsContactsPhone").val(data[0].lipContactInformation);
                    });
                }
                // $('#addHsDlg .chooseHouseButton').hide();
                $('#addHsDlg .hsFieldset').show();
                $('#addHsHasPaper').show();
                $('#addHsNoPaper').hide();
                $('#choseHouse').dialog('close');
            }
        });
    }
    // 选择房屋表取数据
    queryHouse(1, 0);
    $('#choseHouse').dialog('open');
}

//无资料房添加未租
function noHousePaper() {

    $('#addHsHouseType').val(2);
    // $('#addHsDlg .chooseHouseButton').hide();
    $('#addHsDlg .hsFieldset').show();
    $('#addHsHasPaper').hide();
    $('#addHsNoPaper').show();

}

//修改合同期限
function changeAddHsDate() {
    if ($('#addHsBegin').val() == '' || $('#addHsEnd').val() == '') {
        $('#priceLadder').hide();
        $('#addHsTerm').html('');
        return;
    }
    $('#priceLadder').show();
    $("#settingTips").html('');
    var begin = new Date($('#addHsBegin').val());
    var end = new Date($('#addHsEnd').val());
    var date = new Date(begin);
    date.setDate(date.getDate() - 1);
    var term = getYearMonthDay($('#addHsBegin').val(), $('#addHsEnd').val());
    $('#addHsTerm').html('（' + term[0] + '年' + term[1] + '月' + term[2] + '日' + '）');
    var year = 0;//合同期限
    var isWholeYear = 1;//1表示整年，0表示非整年
    while (date < end) {
        year++;
        date.setFullYear(date.getFullYear() + 1);
    }
    if (date.getTime() != end.getTime()) {
        isWholeYear = 0;
    }
    var beginTime = $("#addHsBegin").val();
    if ($('#annualMethod').find("option:selected").text() == "自然年度") {
        $('#priceLadderDiv').empty();
        for (var i = 1; i <= year; i++) {
            $('#priceLadderDiv').append(
                '<div style="margin:5px 0 0 0;"> ' +
                '<lable style="display:inline-block;width:90px;"><span class="require">*</span>第' + i + '年租金：</lable> ' +
                '<input class="updatePriceLadder" style="width:80px;" clear="clear" require="require">元/月 ' +
                '<lable style="display:inline-block;width:104px;margin: 0 0 0 24px;"><span class="require">*</span>年内免租期：头</lable> ' +
                '<input id="holidaySumBefor' + i + '" class="holidaySumBefor" style="width:30px;" clear="clear" type="number" onchange="changeRentFreeSegment(' + i + ',0)">天，尾 ' +
                '<input id="holidaySumAfter' + i + '" class="holidaySumAfter" style="width:30px;" clear="clear" type="number" onchange="changeRentFreeSegment(' + i + ',1)">天 ' +
                '<a class="easyui-linkbutton copy' + i + '" onclick="copyHolidaySum()">往下复用</a>' +
                '<div><input style="display:none;" type="text" id="holidaySettingA' + i + '" clear="clear" class="rentFreeSegmentIndex"> ' +
                '<input style="display:none;" type="text" id="holidaySettingB' + i + '" clear="clear"> ' +
                '<input style="display:none;" type="text" id="holidaySettingC' + i + '" clear="clear"> ' +
                '<input style="display:none;" type="text" id="holidaySettingD' + i + '" clear="clear"></div> ' +
                '</div> '
            );
            $('#holidaySettingA' + i).val(renewalDate(beginTime, i, 0));
            if (isWholeYear == 1 || i < year) {
                $('#holidaySettingD' + i).val(renewalDate(beginTime, i, 1));
            } else {
                $('#holidaySettingD' + i).val($('#addHsEnd').val());
            }
            if (year == 1 || i > 1) {
                $('.copy' + i).remove();
            }
        }
    } else if ($('#annualMethod').find("option:selected").text() == "合约年度") {
        $('#priceLadderDiv').empty();
        for (var i = 1; i <= year; i++) {
            $('#priceLadderDiv').append(
                '<div style="margin:5px 0 0 0;"> ' +
                '<lable style="display:inline-block;width:90px;"><span class="require">*</span>第' + i + '年租金：</lable> ' +
                '<input class="updatePriceLadder" style="width:80px;" clear="clear" require="require">元/月 ' +
                '<lable class="diffMethod' + i + '" style="display:inline-block;width:65px;margin: 0 0 0 24px;"><span class="require">*</span>免租期：</lable> ' +
                '<input value="0" id="holidaySumBefor' + i + '" class="holidaySumBefor diffMethod' + i + '" clear="clear" type="number" style="width: 80px" onchange="changeRentFreeSegment(' + i + ',0)"><span class="diffMethod' + i + '">天</span> ' +
                '<input value="0" id="holidaySumAfter' + i + '" class="holidaySumAfter" style="width:30px;display:none" clear="clear" type="number" onchange="changeRentFreeSegment(' + i + ',1)"><span style="display: none">天</span> ' +
                // '<a class="easyui-linkbutton copy' + i + '" onclick="copyHolidaySum()">往下复用</a>' +
                '<div><input  style="display:none;" type="text" id="holidaySettingA' + i + '" clear="clear" class="rentFreeSegmentIndex"> ' +
                '<input  style="display:none;" type="text" id="holidaySettingB' + i + '" clear="clear"> ' +
                '<input  style="display:none;" type="text" id="holidaySettingC' + i + '" clear="clear"> ' +
                '<input  style="display:none;" type="text" id="holidaySettingD' + i + '" clear="clear"></div> ' +
                '</div> ');
            $('#holidaySettingA' + i).val(renewalDate(beginTime, i, 0));
            if (isWholeYear == 1 || i < year) {
                $('#holidaySettingD' + i).val(renewalDate(beginTime, i, 1));
            } else {
                $('#holidaySettingD' + i).val($('#addHsEnd').val());
            }
            if (i > 1) {
                $('.diffMethod' + i).hide();
            }
            changeRentFreeSegment(i, 0);
            changeRentFreeSegment(i, 1);
        }
        $('#holidaySettingC').val($('#addHsEnd').val());
        $('#holidaySettingD').val($('#addHsEnd').val());

    }
    $.parser.parse($('#priceLadderDiv'));
}

//修改免租期
function changeRentFreeSegment(i, type) {
    if (type == 0) {//年前
        var beginTime = $("#holidaySettingA" + i).val();
        var days = $("#holidaySumBefor" + i).val();
        $("#holidaySettingB" + i).val(renewalDate(beginTime, days, 3));
    } else if (type == 1) {//年后
        var endTime = $("#holidaySettingD" + i).val();
        var days = $("#holidaySumAfter" + i).val();
        $("#holidaySettingC" + i).val(renewalDate(endTime, days, 4));
    }
}

//合同期内免租期往下复用
function copyHolidaySum() {
    $('.holidaySumBefor').val($('#holidaySumBefor1').val());
    $('.holidaySumAfter').val($('#holidaySumAfter1').val());
    $('.updatePriceLadder').val($('.updatePriceLadder:first').val());
    $('.holidaySumBefor').each(function (index) {
        changeRentFreeSegment(index + 1, 0);
        changeRentFreeSegment(index + 1, 1);
    });
}

//验证
function validateContract(t) {
    if ($('#outerFreeDaysBox').prop('checked')) {//装修免租期
        if ($('#addHsFreeDaysDecoration').val() == '') {
            $('#addHsFreeDaysDecoration').css("border", "1px solid red");
            myTips('请填写外置装修/免租期');
            return false;
        } else {
            $('#addHsFreeDaysDecoration').css("border", "1px solid #A9A9A9");
        }
    }
    if (_contractNums == 1) {
        if (_contractNumsArry.length == 0) {
            $('#contractNum').css("border", "1px solid red");
            myTips("合同编号未填写");
            return false;
        } else {
            $('#contractNum').css("border", "1px solid #A9A9A9");
        }
    }
    var begin = new Date($('#addHsBegin').val());//合约开始
    var end = new Date($('#addHsEnd').val());//合约结束
    var date = new Date(begin);
    date.setDate(date.getDate() - 1);
    var isWholeYear = 1;//1表示整年，0表示非整年
    while (date < end) {
        date.setFullYear(date.getFullYear() + 1);
    }
    if (date.getTime() != end.getTime()) {
        isWholeYear = 0;
    }
    var settingArrs = $('#priceLadder input');//年前，后免租期，租金
    var priceArrs = [];
    var holidayArrs = [];
    //settingArrs.length 是#priceLadder中所有input的个数
    for (var i = 0; i < settingArrs.length; i++) {
        if (settingArrs[i].className.indexOf('updatePriceLadder') > -1) {
            //获取租金阶梯价的input
            priceArrs.push(settingArrs[i]);
        } else if (settingArrs[i].id.indexOf('holidaySetting') > -1) {
            //获取id=holidaySettingA、B、C、D的input
            holidayArrs.push(settingArrs[i]);
        }
    }
    for (var i = 0; i < priceArrs.length; i++) {
        if (priceArrs[i].value == '') {
            if (t == 0) {
                myTips('第' + (parseInt(i) + 1) + '年租金设置错误！');
            }
            if (t == 1) {
                $("#settingNoTips").html('第' + (parseInt(i) + 1) + '年租金设置错误！');
            }
            return false;
        }
    }
    var number = holidayArrs.length / 4;
    for (var i = 0; i < number; i++) {
        var holidayNums = parseInt(i) + 1;
        var holidayA = $('#holidaySettingA' + holidayNums).val();
        var holidayB = $('#holidaySettingB' + holidayNums).val();
        var holidayC = $('#holidaySettingC' + holidayNums).val();
        var holidayD = $('#holidaySettingD' + holidayNums).val();
//		var holiday = $('#addHsHoliday').val();
        var sumBefor = $('#holidaySumBefor' + holidayNums).val();
        var sumAfter = $('#holidaySumAfter' + holidayNums).val();
        if (sumBefor == "" || sumAfter == "") {
            if (t == 0) {
                myTips('请设置第' + holidayNums + '年免租期天数', 'error');
            }
            if (t == 1) {
                $("#settingNoTips").html('请设置第' + holidayNums + '年免租期天数');
            }
            return false;
        }
        if (sumBefor < 0 || sumAfter < 0) {
            if (t == 0) {
                myTips('第' + holidayNums + '年免租期错误', 'error');
            }
            if (t == 1) {
                $("#settingNoTips").html('第' + holidayNums + '年免租期错误');
            }
            return false;
        }
        if ((sumBefor >= 1 && sumBefor < 2) || (sumAfter >= 1 && sumAfter < 2)) {
            if (t == 0) {
                myTips("第" + holidayNums + "年免租期错误，系统暂不支持年前1天或年后1天此特殊情况", 'error');
            }
            if (t == 1) {
                $("#settingNoTips").html("第" + holidayNums + "年免租期错误，系统暂不支持年前1天或年后1天此特殊情况");
            }
            return false;
        }
        /*if(isWholeYear == 1 || i < number-1){//整年每年验证    非整年的最后一年免验证
                if(parseInt(sumBefor)+parseInt(sumAfter)!=holiday){
                    if(t==0){
                        myTips('第' + holidayNums + '年免租期错误', 'error');
                    }
                    if(t==1){
                        $("#settingNoTips").html('第' + holidayNums + '年免租期错误');
                    }
                    return false;
                }
                if (renewalHolidaySum(holidayA, holidayB, holidayC, holidayD, holiday)) {
                    if(t==0){
                        myTips('第' + holidayNums + '年免租期年前加年后不等于' + holiday + '天！', 'error');
                    }
                    if(t==1){
                        $("#settingNoTips").html('第' + holidayNums + '年免租期年前加年后不等于' + holiday + '天！');
                    }
                    return false;
                }
            }*/
    }
    var i = 0;
    var updatePriceLadderArray = new Array();
    $(".updatePriceLadder").each(function () {
        updatePriceLadderArray[i] = parseFloat($(this).val());
        i++;
    });
    var updatePriceLadder = updatePriceLadderArray.join(",");
    var updateRentFreeSegmentArray = new Array();
    i = 0;
    $(".rentFreeSegmentIndex").each(function () {
        updateRentFreeSegmentArray[i] = $("#holidaySettingA" + (i + 1)).val() + "#" + $("#holidaySettingB" + (i + 1)).val() + "#" + $("#holidaySettingC" + (i + 1)).val() + "#" + $("#holidaySettingD" + (i + 1)).val();
        i++;
    });
    var updateRentFreeSegment = updateRentFreeSegmentArray.join(",");
    $(".jrlPriceLadder").val(updatePriceLadder);//价格
    $(".jrlRentFreeSegment").val(updateRentFreeSegment);//免租期
    return true;
}

//验证房源
function validateHsHouse() {
    var addHsHouseType = $('#addHsHouseType').val();
    if (addHsHouseType == '') {
        myTips("请选择房源", "error");
        return false;
    }
    if (addHsHouseType == 1) {//有资料房
        addHouseCoding = $("#addHsHouseId").val();
        addCity = $("#addHsDlg .addCity").val();
        addDistrict = $("#addHsDlg .addDistrict").val();
        addZone = $("#addHsDlg .addZone").val();
        addStreet = $("#addHsDlg .addStreet").val();
        addBuildingName = $("#addHsDlg .addCommunity").val();
        addAddBuilding = $("#addHsDlg .addBuilding").val();
        addAddDoorplateno = $("#addHsDlg .addDoorplateno").val();
    } else {//无资料房
        addHouseCoding = '';
        addCity = $("#addNoTrusteeshipCity").find("option:selected").text();
        addDistrict = $("#addNoTrusteeshipDistrict").find("option:selected").text();
        addZone = $("#addNoTrusteeshipZone").val();
        addStreet = $("#addNoTrusteeshipStreet").val();
        addBuildingName = $("#addNoTrusteeshipBuildingName").find("option:selected").text();
        if (addBuildingName == '') {
            $("#addNoTrusteeshipDistrict").css("border", "1px solid red");
            $("#buildingName").css("border", "1px solid red");
            $("#inputSelect").css("border", "1px solid red");
            $("#addHsLandlordName").css("border", "1px solid red");
            $("#addHsLandlordPhoneNum").css("border", "1px solid red");
            $("#addHsLandlordIdcard").css("border", "1px solid red");
            $("#addHsBankType").css("border", "1px solid red");
            $("#addHsBankName").css("border", "1px solid red");
            $("#addHsBankNum").css("border", "1px solid red");
            myTips('请选择楼盘', 'error');
            return false;
        } else {
            $("#buildingName").css("border", "1px solid #A9A9A9");
        }
        addAddBuilding = $("#inputSelect").val();
        addAddDoorplateno = $(".add_saveHouse_addDoorplateno2").val();
        if (!validateDoorno()) {
            myTips('门牌号不符合规则', 'error');
            return false;
        }
    }
    if (addCity == '' || addDistrict == '' || addBuildingName == '' || addAddBuilding == '' || addAddDoorplateno == '') {

        $("#searchAddDistrict").css("border", "1px solid red");


        myTips('房屋地址填写不完整！', 'error');
        return false;
    }
    return true;
}

//执行添加未租   121qq
function doAddTrusteeship(action) {
    console.log(parent._chargingPlan);

    var addHsHouseType = $('#addHsHouseType').val();
    if (addHsHouseType == '') {

        myTips("有必填项未填", "error");
        return;
    }
    var checkFlag = 0;

    $('#addHsDlg [require="require"]').each(function () {
        if ($(this).val() == '') {
            $(this).css('border', '1px solid red');
            checkFlag++;
        } else {
            $(this).css('border', '1px solid #a9a9a9');
        }
    });
    if (checkFlag != 0) {
        myTips("请填写业务员、房管员选项!", "error");
        return;
    }
    if (_contractNums == 1) {
        if (_contractNumsArry.length == 0) {
            $('#contractNum').css("border", "1px solid red");
            myTips("合同编号未填写");
            return;
        } else {
            $('#contractNum').css("border", "1px solid #A9A9A9");
        }
    }

    //字典
    var addHouseDicId = $("#addHsHouseDictId").val();

    // 地址
    var addHouseCoding;
    var addCity;
    var addDistrict;
    var addZone;
    var addStreet;
    var addBuildingName;
    var addAddBuilding;
    var addAddDoorplateno;

    if (addHsHouseType == 1) {//有资料房
        addHouseCoding = $("#addHsHouseId").val();
        addCity = $("#addHsDlg .addCity").val();
        addDistrict = $("#addHsDlg .addDistrict").val();
        addZone = $("#addHsDlg .addZone").val();
        addStreet = $("#addHsDlg .addStreet").val();
        addBuildingName = $("#addHsDlg .addCommunity").val();
        addAddBuilding = $("#addHsDlg .addBuilding").val();
        addAddDoorplateno = $("#addHsDlg .addDoorplateno").val();
        //addHsState=$("#addHsDlg ").val();
    } else {//无资料房
        addHouseCoding = '';
        addCity = $("#addNoTrusteeshipCity").find("option:selected").text();
        addDistrict = $("#addNoTrusteeshipDistrict").find("option:selected").text();
        addZone = $("#addNoTrusteeshipZone").val();
        addStreet = $("#addNoTrusteeshipStreet").val();
        addBuildingName = $("#addNoTrusteeshipBuildingName").find("option:selected").text();
        if (addBuildingName == '') {

            myTips('请选择楼盘', 'error');
            return;
        } else {
            $("#buildingName").css("border", "1px solid #A9A9A9");
        }
        addAddBuilding = $("#inputSelect").val();
        addAddDoorplateno = $(".add_saveHouse_addDoorplateno2").val();
        if (!validateDoorno()) {
            myTips('门牌号不符合规则', 'error');
            return;
        }
    }
    if (addCity == '' || addDistrict == '' || addBuildingName == '' || addAddBuilding == '' || addAddDoorplateno == '') {
        myTips('房屋地址填写不完整！', 'error');
        return;
    }

    // 户型、用途、朝向、面积
    var addSectionType = $("#addHsDlg .sectionType").find("option:selected").text();
    var addHouseOwner = $("#addHsDlg .houseOwner").find("option:selected").text();
    var addDirection = $('#addHsDlg .houseDirection').find("option:selected").text();
    var addSquare = $("#addHsDlg .storeSquare").val();
    // 水电气
    var addWater = $("#addHsWater").val();
    var addCtrit = $("#addHsElect").val();
    var addGas = $("#addHsGas").val();
    //tzl
    var addHotWater = $("#addHsHotWater").val();
    var addHotAir = $("#addHsHotAir").val();


    // 合同
    var addSourceBegin = $('#addHsBegin').val();
    var addEnd = $('#addHsEnd').val();
    var term = getYearMonthDay(addSourceBegin, addEnd);
    var addSourceTerm = term[0] + '年' + term[1] + '月' + term[2] + '日';
    var addSigned = $('#addHsSigned').val();
    var addDeposit = $('#addHsDeposit').val();
    var addContractType = $('#addHsContractType').find("option:selected").text();
    var addPaymentType = $('#addHsPaymentType').find("option:selected").text();
    var addFollowUserId = $('#addHsSalesmanGetUserId').val();
    var addhsHouseNote = $('#addHsHouseNote').val();
    var hsManagerUserId = $("#addHsManageGetUserId").val();
    var hsDepartment = $("#addHsManageGetUserDetId").val();
    var hsStorefront = $("#addHsManageGetUserStoreId").val();
    var inAdvancePay = $("#addHsInAdvancePay").val();
    var jrlRentFreeDays = $("#addHsHoliday").val();
    var jrlPaymentMethod = $("#addHsPaymentType").find("option:selected").text();
    var hsDecorationHoliday = $("#addHsFreeDaysDecoration").val();
    // 业主
    var landlordName = $("#addHsLandlordName").val();
    var landlordPhone = $("#addHsLandlordPhoneNum").val();
    var landlordIdcard = $("#addHsLandlordIdcard").val();
    var laSecondContacts = $("#addHsContacts").val();
    var laSecondPhone = $("#addHsContactsPhone").val();
    var hsBankType = $("#addHsBankType").find("option:selected").text();
    var hsBankNum = $("#addHsBankNum").val();
    var hsBankName = $("#addHsBankName").val();
    var popNameRemark = $('#addHrRenterNameRemark').val();
    //阶梯价及免租期
    var jrlPriceLadder = $(".jrlPriceLadder").val();
    var jrlRentFreeSegment = $(".jrlRentFreeSegment").val();
    // 合约相关
    if (_contractNumsArry.length > 0) {
        for (var i in _contractNumsArry) {
            _contractNumsArry[i].jcdHouseAddress = addBuildingName + " " + addAddBuilding + " " + addAddDoorplateno;
            _contractNumsArry[i].adminUser = addFollowUserId;
        }
    }
    var jrlRenewalCoding = JSON.stringify(_contractNumsArry);
    if (_contractNums != 1) {
        if (jrlRenewalCoding == "[]") {
            jrlRenewalCoding = "";
        }
    }
    var jcdIdjosn = jrlRenewalCoding;
    // 业绩受益人部分
    var profitData = getProfitData('addProfit', '存房');
    var assJson = '';
    if (profitData.code < 0) {
        myTips(profitData.msg, 'error');
        return;
    } else {
        assJson = profitData.body;
    }
    // 资产
    var assetRows = $('#addAssetTable').datagrid('getRows');

    var pgbData = $('#preGeneratingBillTable').datagrid('getRows');
    // console.log(pgbData);
    // var yesNo = 0;
    var notRentingJson = JSON.stringify(pgbData);

    if (action == undefined) {
        showLoading();
        $.post("../insertHouseForStore.action", {
            addHsHouseType: addHsHouseType,
            //添加未租部分 数据
            hsHouseId: addHouseCoding,
            hsSectionType: addSectionType,
            hsHouseOwner: addHouseOwner,
            hsAddCity: addCity,
            hsAddDistrict: addDistrict,
            hsAddZone: addZone,
            hsAddStreet: addStreet,
            hsAddCommunity: addBuildingName,
            hsHouseDictId: addHouseDicId,
            hsAddBuilding: addAddBuilding,
            hsAddDoorplateno: addAddDoorplateno,
            hsHouseSquare: addSquare,
            hsWaterVolFirst: addWater,
            hsElectritVolFirst: addCtrit,
            hsGasVolFirst: addGas,

            //tzl
            hsHotWaterVolFirst: addHotWater,
            hsHotAirVolFirst: addHotAir,

            hsBeginTime: addSourceBegin,
            hsTheTerm: addSourceTerm,
            hsEndTime: addEnd,
            hsHouseDeposit: addDeposit,
            hsPaymentType: addPaymentType,
            hsUserId: _loginUserId,
            hsAdminUserId: addFollowUserId,
            hsHouseDirection: addDirection,
            hsHouseNote: addhsHouseNote,
            hsStorefront: hsStorefront,
            hsDepartment: hsDepartment,
            hsBankType: hsBankType,
            hsBankNum: hsBankNum,
            hsBankName: hsBankName,
            hsManagerUserId: hsManagerUserId,
            hsDecorationHoliday: hsDecorationHoliday,
            //新增业主部分 数据
            laPopTelephone: landlordPhone,
            laPopName: landlordName,
            laPopIdcard: landlordIdcard,
            laSecondContacts: laSecondContacts,
            laSecondPhone: laSecondPhone,
            laDepartment: _loginDepartment,
            laStorefront: _loginStore,
            laUserId: _loginUserId,
            popNameRemark: popNameRemark,
            //新增未租合约部分 数据
            jrlSignedTime: addSigned,
            jrlBeginTime: addSourceBegin,
            jrlEndTime: addEnd,
            jrlUserId: _loginUserId,
            jrlDepartment: _loginDepartment,
            jrlStorefront: _loginStore,
            jrlContractType: addContractType,
            jrlTheTerm: addSourceTerm,
            jrlInAdvancePay: inAdvancePay,
            jrlRentFreeDays: jrlRentFreeDays,
            jrlPaymentMethod: jrlPaymentMethod,
            jrlRentFreeSegment: jrlRentFreeSegment,
            jrlPriceLadder: jrlPriceLadder,
            jrlRenewalCoding: jrlRenewalCoding,
            adminUser: addFollowUserId,
            jcdIdjosn: jcdIdjosn,
            notRentingJson: notRentingJson,
            //业绩受益人部分
            jsonArray: assJson,
            att: $("#att").val(),
            //资产
            addAsset: JSON.stringify(assetRows),
        }, function (data) {
            isSave = true;
            if (data.code < 0) {
                if (data.code < 0) {
                    myTips(data.msg, "error");
                }
                hideLoading();
                return;
            }
            parent.queryTrusteeship(_pageNum[0], 0);
            myTips('添加成功', 'success');
            hideLoading();
            setTimeout(function () {
                parent.$('#addHomeDlg').dialog('close');
            }, 1000);
        });
    } else if (action == 'centralized') {
        var rows = $('#centralizedApartmentRoomDg').datagrid('getRows');
        if (rows.length == 0) {
            myTips('请添加房间', 'error');
            return;
        }
        //总间数
        //var splitFlatShareNums = parseInt($('#setCentralizedApartmentRoomNums').val())*parseInt($('#setCentralizedApartmentBudilingNumsTo').val());
        var jsonArray = [];
        for (var i = 0; i < rows.length; i++) {
            /*var sfsdPriceLadder = $('#sfsdPriceLadder'+i).val();
			if (sfsdPriceLadder != '') {
				var priceLadderArray = sfsdPriceLadder.split(',');
				for (var j in priceLadderArray) {
					var price = parseFloat(priceLadderArray[j]);
					if (isNaN(price)) {
						myTips('第'+i+'间阶梯价有误', 'error');
						return;
					}
				}
			}*/
            jsonArray.push({
                hsAddCommunity: rows[i].community,
                hsAddBuilding: rows[i].building,
                hsSplitIdentifier: rows[i].doorplateno,
                hsSectionType: rows[i].sectionType,
                hsHouseDirection: rows[i].direction,
                hsHouseOwner: rows[i].state,
                hsHouseSquare: rows[i].square,
                hsGuidePrice: rows[i].guidePrice,
                //hsPriceLadder		:	rows[i].,
                hsWaterVolFirst: rows[i].water,
                hsElectritVolFirst: rows[i].elect,
                hsGasVolFirst: rows[i].gas,

                //tzl
                hsHotWaterVolFirst: rows[i].hotwater,
                hsHotAirVolFirst: rows[i].hotair,


                //hsVacancyDay		:	rows[i].,
                //hsHouseNote		:	rows[i].,
            });
        }
        jsonArray = JSON.stringify(jsonArray);
        var splitJson = jsonArray;
        var accumulation = 0;//0=拆分

        showLoading();
        $.post("../insertSplitHouseForStore.action", {
            addHsHouseType: addHsHouseType,
            //添加未租部分 数据
            hsHouseId: addHouseCoding,
            hsSectionType: addSectionType,
            hsHouseOwner: addHouseOwner,
            hsAddCity: addCity,
            hsAddDistrict: addDistrict,
            hsAddZone: addZone,
            hsAddStreet: addStreet,
            hsAddCommunity: addBuildingName,
            hsHouseDictId: addHouseDicId,
            hsAddBuilding: addAddBuilding,
            hsAddDoorplateno: addAddDoorplateno,
            hsHouseSquare: addSquare,
            hsWaterVolFirst: addWater,
            hsElectritVolFirst: addCtrit,
            hsGasVolFirst: addGas,
            //tzl
            hsHotWaterVolFirst: addHotWater,
            hsHotAirVolFirst: addHotAir,

            hsBeginTime: addSourceBegin,
            hsTheTerm: addSourceTerm,
            hsEndTime: addEnd,
            hsHouseDeposit: addDeposit,
            hsPaymentType: addPaymentType,
            hsUserId: _loginUserId,
            hsAdminUserId: addFollowUserId,
            hsHouseDirection: addDirection,
            hsHouseNote: addhsHouseNote,
            hsStorefront: hsStorefront,
            hsDepartment: hsDepartment,
            hsBankType: hsBankType,
            hsBankNum: hsBankNum,
            hsBankName: hsBankName,
            hsManagerUserId: hsManagerUserId,
            hsDecorationHoliday: hsDecorationHoliday,
            //新增业主部分 数据
            laPopTelephone: landlordPhone,
            laPopName: landlordName,
            laPopIdcard: landlordIdcard,
            laSecondContacts: laSecondContacts,
            laSecondPhone: laSecondPhone,
            laDepartment: _loginDepartment,
            laStorefront: _loginStore,
            laUserId: _loginUserId,
            popNameRemark: popNameRemark,
            //新增未租合约部分 数据
            jrlSignedTime: addSigned,
            jrlBeginTime: addSourceBegin,
            jrlEndTime: addEnd,
            jrlUserId: _loginUserId,
            jrlDepartment: _loginDepartment,
            jrlStorefront: _loginStore,
            jrlContractType: addContractType,
            jrlTheTerm: addSourceTerm,
            jrlInAdvancePay: inAdvancePay,
            jrlRentFreeDays: jrlRentFreeDays,
            jrlPaymentMethod: jrlPaymentMethod,
            jrlRentFreeSegment: jrlRentFreeSegment,
            jrlPriceLadder: jrlPriceLadder,
            jrlRenewalCoding: jrlRenewalCoding,
            adminUser: addFollowUserId,
            jcdIdjosn: jcdIdjosn,
            notRentingJson: notRentingJson,
            //业绩受益人部分
            jsonArray: assJson,
            att: $("#att").val(),
            //资产
            addAsset: JSON.stringify(assetRows),
            splitJson: splitJson,
            accumulation: accumulation,
        }, function (data) {
            hideLoading();
            isSave = true;
            if (data.code < 0) {
                myTips(data.msg, "error");
                return;
            }
            parent.queryTrusteeship(_pageNum[0], 0);
            myTips('添加成功', 'success');
            setTimeout(function () {
                parent.$('#addHomeDlg').dialog('close');
            }, 1000);
            //	$('#addHomeDlg').dialog('close');
        });
    }

}


//设置集散房-保存
function doSetCentralized() {
    var row = $('#trusteeshipDg').datagrid('getSelected');
    var rows = $('#centralizedApartmentRoomDg2').datagrid('getRows');
    if (rows.length == 0) {
        myTips('请添加房间', 'error');
        return;
    }
    var jsonArray = [];
    for (var i = 0; i < rows.length; i++) {
        jsonArray.push({
            hsAddCommunity: rows[i].community,
            hsAddBuilding: rows[i].building,
            hsSplitIdentifier: rows[i].doorplateno,
            hsSectionType: rows[i].sectionType,
            hsHouseDirection: rows[i].direction,
            hsHouseOwner: rows[i].state,
            hsHouseSquare: rows[i].square,
            hsGuidePrice: rows[i].guidePrice,
            hsWaterVolFirst: rows[i].water,
            hsElectritVolFirst: rows[i].elect,
            hsGasVolFirst: rows[i].gas,
        });
    }
    row.splitJson = JSON.stringify(jsonArray);
    showLoading();
    $.post("../centralizedSplitRent.action", row, function (data) {
        hideLoading();
        if (data.code < 0) {
            myTips(data.msg, "error");
            return;
        }
        parent.queryTrusteeship(_pageNum[0], 0);
        myTips('添加成功', 'success');
        $('#centralizedApartmentDlg').dialog('close');
    });
}

//验证门牌规则
function validateDoorno() {
    if (_doorplateno != 1) {
        return true;
    }
    var check = '';
    var hdDoorplatenoRelus = $('.hd_doorplateno_relus').val().split(',');
    if (hdDoorplatenoRelus.length == 3) {
        for (var i in hdDoorplatenoRelus) {
            check += _doorplatenoTypeRegular[hdDoorplatenoRelus[i]];
        }
    }
    if (check != '') {
        eval("var reg = \/^" + check + "\$\/;");
        var addDoorplateno = $('.add_saveHouse_addDoorplateno2').val();
        if (reg.test(addDoorplateno)) {
            $("#doornoMsg").html('');
            return true;
        } else {
            $("#doornoMsg").html('不符合门牌规则' + doorplatenoShow($('.hd_doorplateno_relus').val()));
            return false;
        }
    }
    return true;
}

//初始化添加资产列表
function initAddAsset() {
    $('#addAssetTable').datagrid({
        columns: [[
            {
                field: 'saName',
                title: '名称',
                width: "20%",
                align: 'center',
            },
            {
                field: 'saBrand',
                title: '品牌',
                width: "20%",
                align: 'center',
            },
            {
                field: 'saModel',
                title: '型号',
                width: "20%",
                align: 'center',
            },
            {
                field: 'saPrice',
                title: '价值',
                width: "20%",
                align: 'center',
            },
            {
                field: 'deleteAdd',
                title: '删除',
                width: "20%",
                align: 'center',
                formatter: function (value, row, index) {
                    return "<a href='#' onclick=\"myDeleteRows('" + row.random + "','random','addAssetTable',0);\">删除</a>";

                }
            }]],
        width: '100%',
        height: '202px',
        singleSelect: true,
        autoRowHeight: false,
        scrollbarSize: 0,
        showPageList: false,
        fitColumns: true,
        rowStyler: function (index, row) {
            return 'color:#000;';
        },
    });
    $.parser.parse($('#addHsDlg'));

}

/**
 * 添加资产到列表
 */

function addToDataGrid() {
    var saRegistrant = _loginUserId;
    var department = _loginDepartment;
    var storefront = _loginStore;
    var saType = $('#add_asset_type').val();
    var saClassify = $('#add_asset_classify').val();
    var saUse = $('#add_asset_use').val();
    var saStatus = $('#add_asset_status').val();
    var assetName = $('#add_asset_name').val();
    var assetBrand = $('#add_asset_brand').val();
    var assetModel = $('#add_asset_model').val();
    var assetPrice = $('#add_asset_price').val();
    var assetNumber = $('#add_asset_number').val();
    var saSupplierName = $('#assets_changeSupplier').val();
    var saSupplier = $('#assets_supplier_id').val();
    var assetRemarks = $('#add_asset_remark').val();


    var checkFlag = 0;

    $('#addHsDlg .addHsStep3 [must="must"]').each(function () {
        if ($(this).val() == '') {
            $(this).css('border-color', 'red');
            checkFlag++;
        } else {
            $(this).css('border-color', '#A9A9A9');
        }
    });
    if (checkFlag != 0) {
        myTips('有选项未填!', 'error');
        return;
    }


    for (var i = 0; i < assetNumber; i++) {
        var dataJson = {
            saRegistrant: saRegistrant,
            department: department,
            storefront: storefront,
            saType: saType,
            saClassify: saClassify,
            saUse: saUse,
            saStatus: saStatus,
            saName: assetName,
            saBrand: assetBrand,
            saModel: assetModel,
            saPrice: assetPrice,
            saSupplierName: saSupplierName,
            saSupplier: saSupplier,
            saRemarks: assetRemarks,
        };
        var random = parseInt((Math.random() * 9 + 1) * 10000000);
        dataJson.random = random;
        $('#addAssetTable').datagrid('insertRow', {
            index: 0,
            row: dataJson
        });
    }
}

/**
 * 清空添加资产input值
 */
function cleanDataGrid() {
    $('#addHsDlg .addHsStep4 [clear="clear"]').val('');
    $('#addHsDlg .addHsStep4 [choose="choose"]').val('');
}

//资产类型-名称联动
function changeAssetsType(prefix) {
    var assetsType = $("#" + prefix + "classify").val();
    $("#" + prefix + "name").empty();
    if (assetsType == "") {
        return;
    }
    for (var i in _assetsType) {
        if (assetsType == _assetsType[i].type) {
            for (var j in _assetsType[i].name) {
                $("#" + prefix + "name").append('<option value="' + _assetsType[i].name[j] + '">' + _assetsType[i].name[j] + '</option>');
            }
        }
    }
}

function energy(type) {
    //控制非选中能源项隐藏

    var chargingPlan = parent._chargingPlan;
    if (type == 1) {//空置集中式收房房间预览的能源项
        for (var i in chargingPlan) {
            if (!chargingPlan[i]["state"]) {
                $('#centralizedApartmentRoomDg').datagrid('hideColumn', i);
            }
        }
    } else {
        for (var i in chargingPlan) {
            if (!chargingPlan[i]["state"]) {
                $("." + i + " input").val(0);
                $("." + i).hide();
            }
        }
    }
}

function selectContract() {
    if ($("#oneOnOne").is(':checked')) {
        $("#details1").show();
        $("#details2").show();
    } else if ($("#oneToMany").is(':checked')) {
        $("#details1").hide();
        $("#details2").hide();
    }
}

function nextStep(step) {
    if (step == 2) {
        energy();

        if ($("#oneOnOne").is(':checked')) {
            if (validateHsHouse()) {
                if (validateStep('addHs', 2)) {
                    $('#meterReading').show();
                }
            }
        } else if ($("#oneToMany").is(':checked')) {
            $('#meterReading').hide();
            $('#gotoNav3').hide();
            $('#gotoNav4').hide();
            $('#gotoNav5').hide();
            $('#gotoNav6').hide();
            $('#gotoNav7').hide();
            $('#gotoNav8').show();
            $('#gotoNav9').show();
            $('#gotoNav10').show();
            validateStep('addHs', 2)
        }
    } else if (step == 3) {
        if (validateContract(0)) {
            var begin = $('#addHsBegin').val();
            var end = $('#addHsEnd').val();
            var everyYearHolidays = getEveryYearHolidays();
            var everyYearTotalDays = getEveryYearTotalDays(begin, end);
            console.log('年总天数' + everyYearTotalDays);
            console.log('年免租期总天数：' + everyYearHolidays);
            for (var i = 0; i < everyYearHolidays.length; i++) {
                if (everyYearTotalDays[i] < everyYearHolidays[i]) {
                    myTips('年免租期总天数不能超出年合约总天数', 'error');
                    return;
                }
            }
            if ($("#oneOnOne").is(':checked')) {
                if (validateStep('addHs', 3)) {
                    $.parser.parse($('#addHsDlg'));
                }
            } else if ($("#oneToMany").is(':checked')) {
                if (validateStep('addHs', 8)) {
                    var nameplan = [{
                        planId: 1,
                        plan: '数字楼层+数字房号'
                    }, {
                        planId: 2,
                        plan: '数字楼层+字母房号'
                    }, {
                        planId: 3,
                        plan: '楼层减一加A+数字房号'
                    }, {
                        planId: 4,
                        plan: '楼层减一加A+字母房号'
                    }, {
                        planId: 5,
                        plan: '楼层减一加A+数字房号减一加A'
                    }, {
                        planId: 6,
                        plan: '数字楼层+数字房号减一加A'
                    }];
                    if ($('#centralizedApartmentRuleDg2').hasClass('datagrid-f')) {

                    } else {
                        $('#centralizedApartmentRuleDg2').datagrid({
                            columns: [[
                                {
                                    field: 'community',
                                    title: '小区名',
                                    width: 20,
                                    align: 'center',
                                    editor: {
                                        type: 'textbox',
                                        options: {
                                            precision: 0,
                                            required: true,
                                        }
                                    }
                                },
                                {
                                    field: 'building',
                                    title: '栋/单元',
                                    width: 10,
                                    align: 'center',
                                    editor: {
                                        type: 'textbox',
                                        options: {
                                            precision: 0,
                                            required: true,
                                        }
                                    }
                                },
                                {
                                    field: 'beginFloor',
                                    title: '开始层数',
                                    width: 10,
                                    align: 'center',
                                    editor: {
                                        type: 'numberbox',
                                        options: {
                                            precision: 0,
                                            required: true,
                                        }
                                    }
                                },
                                {
                                    field: 'endFloor',
                                    title: '结束层数',
                                    width: 10,
                                    align: 'center',
                                    editor: {
                                        type: 'numberbox',
                                        options: {
                                            precision: 0,
                                            required: true,
                                        }
                                    }
                                },
                                {
                                    field: 'startRoomNum',
                                    title: '开始房间号',
                                    width: 10,
                                    align: 'center',
                                    editor: {
                                        type: 'numberbox',
                                        options: {
                                            precision: 0,
                                            required: true,
                                        }
                                    }
                                },
                                {
                                    field: 'endRoomNum',
                                    title: '结束房间号',
                                    width: 10,
                                    align: 'center',
                                    editor: {
                                        type: 'numberbox',
                                        options: {
                                            precision: 0,
                                            required: true,
                                        }
                                    }
                                },
                                {
                                    field: 'namePlan',
                                    title: '房号命名方案',
                                    width: 20,
                                    align: 'center',
                                    formatter: function (value) {
                                        for (var i = 0; i < nameplan.length; i++) {
                                            if (nameplan[i].planId == value) return nameplan[i].plan;
                                        }
                                        return value;
                                    },
                                    editor: {
                                        type: 'combobox',
                                        options: {
                                            valueField: 'planId',
                                            textField: 'plan',
                                            data: nameplan,
                                            required: true,
                                            editable: false
                                        }
                                    }
                                }, {
                                    field: 'floorNumPrefix',
                                    title: '楼层前缀',
                                    width: 10,
                                    align: 'center',
                                    editor: {
                                        type: 'textbox'
                                    }
                                }, {
                                    field: 'roomNumPrefix',
                                    title: '房号前缀',
                                    width: 10,
                                    align: 'center',
                                    editor: {
                                        type: 'textbox'
                                    }
                                }]],
                            width: '100%',
                            height: '306px',
                            singleSelect: true,
                            autoRowHeight: false,
                            scrollbarSize: 0,
                            showPageList: false,
                            fitColumns: true,
                            toolbar: '#centralizedApartmentRuleTB2',
                            onClickRow: onClickRow4
                        });
                    }
                }
            }
            preGeneratingBill();
        }
    } else if (step == 6) {
        if (!validateStep('addHs', 6)) {
            return;
        }
        var nameplan = [{
            planId: 1,
            plan: '数字楼层+数字房号'
        }, {
            planId: 2,
            plan: '数字楼层+字母房号'
        }, {
            planId: 3,
            plan: '楼层减一加A+数字房号'
        }, {
            planId: 4,
            plan: '楼层减一加A+字母房号'
        }, {
            planId: 5,
            plan: '楼层减一加A+数字房号减一加A'
        }, {
            planId: 6,
            plan: '数字楼层+数字房号减一加A'
        }];
        if ($('#centralizedApartmentRuleDg').hasClass('datagrid-f')) {

        } else {
            $('#centralizedApartmentRuleDg').datagrid({
                columns: [[
                    {
                        field: 'community',
                        title: '小区名',
                        width: '22%',
                        align: 'center',
                        editor: {
                            type: 'textbox',
                            options: {
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'building',
                        title: '栋/单元',
                        width: '9%',
                        align: 'center',
                        editor: {
                            type: 'textbox',
                            options: {
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'beginFloor',
                        title: '开始层数',
                        width: '10%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'endFloor',
                        title: '结束层数',
                        width: '10%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'startRoomNum',
                        title: '开始房间号',
                        width: '10%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'endRoomNum',
                        title: '结束房间号',
                        width: '10%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'namePlan',
                        title: '房号命名方案',
                        width: '19%',
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < nameplan.length; i++) {
                                if (nameplan[i].planId == value) return nameplan[i].plan;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'planId',
                                textField: 'plan',
                                data: nameplan,
                                required: true,
                                editable: false
                            }
                        }
                    }, {
                        field: 'roomNumPrefix',
                        title: '房号前缀',
                        width: '10%',
                        align: 'center',
                        editor: {
                            type: 'textbox'
                        }
                    }]],
                width: '100%',
                height: '306px',
                singleSelect: true,
                autoRowHeight: false,
                scrollbarSize: 0,
                showPageList: false,
                fitColumns: true,
                toolbar: '#centralizedApartmentRuleTB',
                onClickRow: onClickRow2
            });
        }
    } else if (step == 7) {
        var house = newCentralizedApartment('addCentralized');
        if (house == undefined || house == []) {
            return;
        }
        if (!validateStep('addHs', 7)) {
            return;
        }
        var sectionType = [{value: ''}];
        for (var i in _sectionType) {
            var item = {};
            item.value = _sectionType[i];
            sectionType.push(item);
        }
        var direction = [{value: ''}];
        for (var i in _direction) {
            var item = {};
            item.value = _direction[i];
            direction.push(item);
        }
        var state = [{value: ''}];
        for (var i in _househrState) {
            var item = {};
            item.value = _househrState[i];
            state.push(item);
        }
        if ($('#centralizedApartmentRoomDg').hasClass('datagrid-f')) {

        } else {
            $('#centralizedApartmentRoomDg').datagrid({
                columns: [[
                    {
                        field: 'ck',
                        checkbox: true
                    },
                    {
                        field: 'community',
                        title: '小区名',
                        width: '14%',
                        align: 'center',
                        editor: {
                            type: 'textbox',
                            options: {
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'building',
                        title: '栋/单元',
                        width: '10%',
                        align: 'center',
                        editor: {
                            type: 'textbox',
                            options: {
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'doorplateno',
                        title: '门牌号',
                        width: '10%',
                        align: 'center',
                        editor: {
                            type: 'textbox',
                            options: {
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'sectionType',
                        title: '户型',
                        width: '12%',
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < sectionType.length; i++) {
                                if (sectionType[i].value == value) return sectionType[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: sectionType,
//							required:true,
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'direction',
                        title: '朝向',
                        width: '10%',
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < direction.length; i++) {
                                if (direction[i].value == value) return direction[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: direction,
//							required:true,
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'state',
                        title: '用途',
                        width: '10%',
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < state.length; i++) {
                                if (state[i].value == value) return state[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: state,
//							required:true,
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'square',
                        title: '面积',
                        width: '8%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
//							required:true,
                            }
                        }
                    },
                    {
                        field: 'guidePrice',
                        title: '指导价',
                        width: '9%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 2,
//							required:true,
                            }
                        }
                    },
                    {
                        field: 'water',
                        title: '水底数',
                        width: '8%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
//							required:true,
                            }
                        }
                    },
                    {
                        field: 'elect',
                        title: '电底数',
                        width: '8%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
//							required:true,
                            }
                        }
                    },
                    {
                        field: 'gas',
                        title: '气底数',
                        width: '8%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
//							required:true,
                            }
                        }
                    },
                    {
                        field: 'hotwater',
                        title: '热水底数',
                        width: '8%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
//							required:true,
                            }
                        }
                    },
                    {
                        field: 'hotair',
                        title: '暖气底数',
                        width: '8%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
//							required:true,
                            }
                        }
                    },
                ]],
                width: '100%',
                height: '306px',
                singleSelect: true,
                autoRowHeight: false,
                scrollbarSize: 0,
                showPageList: false,
                fitColumns: true,
                selectOnCheck: false,
                checkOnSelect: false,
                toolbar: '#centralizedApartmentRoomTB',
                onClickRow: onClickRow3
            });
        }
        $('#centralizedApartmentRoomDg').datagrid('loadData', house);
        energy(1);

    } else if (step == 8) {
        var result = accept3();
        if (result == 'error') {
            return;
        }
        doAddTrusteeship('centralized');
    } else if (step == 9) {
        var house = newCentralizedApartment2('setCentralized');
        if (house == undefined || house == []) {
            return;
        }
        if (!validateStep('addHs', 9)) {
            return;
        }
        insertCentralized();
        var sectionType = [{value: ''}];
        for (var i in _sectionType) {
            var item = {};
            item.value = _sectionType[i];
            sectionType.push(item);
        }
        var direction = [{value: ''}];
        for (var i in _direction) {
            var item = {};
            item.value = _direction[i];
            direction.push(item);
        }
        var state = [{value: ''}];
        for (var i in _househrState) {
            var item = {};
            item.value = _househrState[i];
            state.push(item);
        }
        if ($('#centralizedApartmentParameterDg2').hasClass('datagrid-f')) {

        } else {
            $('#centralizedApartmentParameterDg2').datagrid({
                columns: [[
                    {
                        field: 'sectionType',
                        title: '户型',
                        width: 15,
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < sectionType.length; i++) {
                                if (sectionType[i].value == value) return sectionType[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: sectionType,
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'direction',
                        title: '朝向',
                        width: 15,
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < direction.length; i++) {
                                if (direction[i].value == value) return direction[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: direction,
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'state',
                        title: '用途',
                        width: 15,
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < state.length; i++) {
                                if (state[i].value == value) return state[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: state,
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'square',
                        title: '面积',
                        width: 15,
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
                            }
                        }
                    },
                    {
                        field: 'guidePrice',
                        title: '指导价',
                        width: 10,
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 2,
                            }
                        }
                    },
                    {
                        field: 'costPrice',
                        title: '成本价',
                        width: 15,
                        align: 'center',
                        formatter: function (value, row, index) {
                            if (row.costPriceVal) {
                                var data = row.costPriceVal;
                                if (data.length != 0) {
                                    return '<div style="width:100%;cursor: pointer;color: blue;" onclick="costPriceWindow(' + index + ',1)">' +
                                        '' + "设置" + '' +
                                        '</div>';
                                }
                            }
                            return '<div style="width:100%;cursor: pointer;color: red;" onclick="costPriceWindow(' + index + ',1)">' +
                                '' + value + '' +
                                '</div>';
                        },
                    },
                    {
                        field: 'relation',
                        title: '关联',
                        width: 15,
                        align: 'center',
                        formatter: function (value, row, index) {
                            if (row.relationRoom) {
                                var data = row.relationRoom;
                                if (data.length != 0) {
                                    return '<div style="width:100%;cursor: pointer;color: blue;" onclick="relationRoom(' + index + ')">' +
                                        '' + value + '' +
                                        '</div>';
                                }
                            }
                            return '<div style="width:100%;cursor: pointer;color: red;" onclick="relationRoom(' + index + ')">' +
                                '' + value + '' +
                                '</div>';
                        },
                    }
                ]],
                width: '100%',
                height: '306px',
                singleSelect: true,
                autoRowHeight: false,
                scrollbarSize: 0,
                showPageList: false,
                fitColumns: true,
                toolbar: '#centralizedApartmentParameterTB2',
                onClickRow: onClickRowParameter
            });
        }
    } else if (step == 10) {
        var row = $('#centralizedApartmentParameterDg2').datagrid('getRows');
        if (row == undefined || row == []) {
            $.messager.confirm('提示', '您没有添加任何关联规则，确定要下一步吗?', function (r) {
                if (r) {
                    //alert('ok');
                } else {
                    return;
                }
            });
        }
        if (!validateStep('addHs', 10)) {
            return;
        }
        updateCentralized();
        var sectionType = [{value: ''}];
        for (var i in _sectionType) {
            var item = {};
            item.value = _sectionType[i];
            sectionType.push(item);
        }
        var direction = [{value: ''}];
        for (var i in _direction) {
            var item = {};
            item.value = _direction[i];
            direction.push(item);
        }
        var state = [{value: ''}];
        for (var i in _househrState) {
            var item = {};
            item.value = _househrState[i];
            state.push(item);
        }
        if ($('#centralizedApartmentRoomDg2').hasClass('datagrid-f')) {

        } else {
            $('#centralizedApartmentRoomDg2').datagrid({
                columns: [[
                    {
                        field: 'ck',
                        checkbox: true
                    },
                    {
                        field: 'community',
                        title: '小区名',
                        width: 18,
                        align: 'center',
                        editor: {
                            type: 'textbox',
                            options: {

                                precision: 0,
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'building',
                        title: '栋/单元',
                        width: 11,
                        align: 'center',
                        editor: {
                            type: 'textbox',
                            options: {
                                precision: 0,
                                required: true,
                            }
                        }

                    },
                    {
                        field: 'floor',
                        title: '楼层',
                        width: 11,
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
                                required: true,
                            }
                        }

                    },
                    {
                        field: 'doorplateno',
                        title: '门牌号',
                        width: 11,
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
                                required: true,
                            }
                        }

                    },
                    {
                        field: 'sectionType',
                        title: '户型',
                        width: 14,
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < sectionType.length; i++) {
                                if (sectionType[i].value == value) return sectionType[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: sectionType,
                                editable: false,
                                required: true,
                            }
                        }

                    },
                    {
                        field: 'direction',
                        title: '朝向',
                        width: 11,
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < direction.length; i++) {
                                if (direction[i].value == value) return direction[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: direction,
                                editable: false,
                                required: true,
                            }
                        }

                    },
                    {
                        field: 'state',
                        title: '用途',
                        width: 11,
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < state.length; i++) {
                                if (state[i].value == value) return state[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: state,
                                editable: false,
                                required: true,
                            }
                        }

                    },
                    {
                        field: 'square',
                        title: '面积',
                        width: 11,
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'guidePrice',
                        title: '指导价',
                        width: 11,
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'costPrice',
                        title: '成本价',
                        width: 11,
                        align: 'center',

                        formatter: function (value, row, index) {
                            if (row.costPriceVal) {
                                var data = row.costPriceVal;
                                if (data.length != 0) {
                                    return '<div style="width:100%;cursor: pointer;color: blue;" onclick="costPriceWindow(' + index + ',2)">' +
                                        '' + "设置" + '' +
                                        '</div>';
                                }
                            }
                            return '<div style="width:100%;cursor: pointer;color: red;" onclick="costPriceWindow(' + index + ',2)">' +
                                '' + value + '' +
                                '</div>';
                        },
                    },
                ]],
                width: '100%',
                height: '306px',
                singleSelect: true,
                autoRowHeight: false,
                scrollbarSize: 0,
                showPageList: false,
                fitColumns: true,
                selectOnCheck: false,
                checkOnSelect: false,
                toolbar: '#centralizedApartmentRoomTB2',
                onClickRow: onClickRow5
            });
        }
    } else if (step == 11) {
        var result = accept5();
        if (result == 'error') {
            return;
        }
        oneToManyAddTrusteeship();
    }
}

function centralizedNextStep(step) {
    if (step == 2) {
        var house = newCentralizedApartment('setCentralized');
        if (house == undefined || house == []) {
            return;
        }
        if (!validateStep('centralizedApartment', 2)) {
            return;
        }
        var sectionType = [{value: ''}];
        for (var i in _sectionType) {
            var item = {};
            item.value = _sectionType[i];
            sectionType.push(item);
        }
        var direction = [{value: ''}];
        for (var i in _direction) {
            var item = {};
            item.value = _direction[i];
            direction.push(item);
        }
        var state = [{value: ''}];
        for (var i in _househrState) {
            var item = {};
            item.value = _househrState[i];
            state.push(item);
        }
        if ($('#centralizedApartmentRoomDg2').hasClass('datagrid-f')) {

        } else {
            $('#centralizedApartmentRoomDg2').datagrid({
                columns: [[
                    {
                        field: 'community',
                        title: '小区名',
                        width: '16%',
                        align: 'center',
                        editor: {
                            type: 'textbox',
                            options: {
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'building',
                        title: '栋/单元',
                        width: '10%',
                        align: 'center',
                        editor: {
                            type: 'textbox',
                            options: {
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'doorplateno',
                        title: '门牌号',
                        width: '10%',
                        align: 'center',
                        editor: {
                            type: 'textbox',
                            options: {
                                required: true,
                            }
                        }
                    },
                    {
                        field: 'sectionType',
                        title: '户型',
                        width: '13%',
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < sectionType.length; i++) {
                                if (sectionType[i].value == value) return sectionType[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: sectionType,
//							required:true,
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'direction',
                        title: '朝向',
                        width: '10%',
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < direction.length; i++) {
                                if (direction[i].value == value) return direction[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: direction,
//							required:true,
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'state',
                        title: '用途',
                        width: '10%',
                        align: 'center',
                        formatter: function (value) {
                            for (var i = 0; i < state.length; i++) {
                                if (state[i].value == value) return state[i].value;
                            }
                            return value;
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'value',
                                textField: 'value',
                                data: state,
//							required:true,
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'square',
                        title: '面积',
                        width: '8%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
//							required:true,
                            }
                        }
                    },
                    {
                        field: 'guidePrice',
                        title: '指导价',
                        width: '9%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 2,
//							required:true,
                            }
                        }
                    },
                    {
                        field: 'water',
                        title: '水底数',
                        width: '8%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
//							required:true,
                            }
                        }
                    },
                    {
                        field: 'elect',
                        title: '电底数',
                        width: '8%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
//							required:true,
                            }
                        }
                    },
                    {
                        field: 'gas',
                        title: '气底数',
                        width: '8%',
                        align: 'center',
                        editor: {
                            type: 'numberbox',
                            options: {
                                precision: 0,
//							required:true,
                            }
                        }
                    },
                ]],
                width: '100%',
                height: '306px',
                singleSelect: true,
                autoRowHeight: false,
                scrollbarSize: 0,
                showPageList: false,
                fitColumns: true,
                toolbar: '#centralizedApartmentRoomTB2',
                onClickRow: onClickRow5
            });
        }
        $('#centralizedApartmentRoomDg2').datagrid('loadData', house);
    } else if (step == 3) {
        var result = accept5();
        if (result == 'error') {
            return;
        }
        doSetCentralized();
    }
}

//选城区查楼盘
function noZoneLink() {
    $("#addNoTrusteeshipZone").empty();
    $("#addNoTrusteeshipBuildingName").empty('');
    $("#addNoTrusteeshipStreet").val('');
    $("#infoDoorplatenoRelus").text('');
    $("#addNoTrusteeshipBuildingId").val('');
    $("#addNoTrusteeshipZone").append("<option></option>");
    var cityText = '';
    var districtText = '';
    $("#addNoTrusteeshipBuildingName").empty('');
    $("#buildingName").val('');
    $("#addNoTrusteeshipCity").val(0);
    cityText = $("#addNoTrusteeshipCity").find("option:selected").text();
    districtText = $("#addNoTrusteeshipDistrict").find("option:selected").text();
    console.log(cityText)
    if (districtText == '') {
        filteroption("addNoTrusteeshipBuildingName");
        return;
    }
    $.post("../queryForHouseDictAddress.action", {
        hdCity: cityText,
        hdDistrict: districtText
    }, function (data) {
        if (data.code < 0) {
            $.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
            return;
        }
        data = data.body;
        $("#addNoTrusteeshipBuildingName").append("<option></option>");
        for (var i in data) {
            $("#addNoTrusteeshipBuildingName").append("<option value = '" + i + "'>" + data[i] + "</option>");
        }
        filteroption("addNoTrusteeshipBuildingName");
    });
}

//选楼盘查门牌规则
function noStreeLink() {
    $("#addNoTrusteeshipStreet").val('');
    $("#addNoTrusteeshipBuildingId").val('');
    $("#infoDoorplatenoRelus").text('');
    var cityText = '';
    var districtText = '';
    var zoneText = '';
    var buildNameText = '';
    cityText = $("#addNoTrusteeshipCity").find("option:selected").text();
    districtText = $("#addNoTrusteeshipDistrict").find("option:selected").text();
    zoneText = $("#addNoTrusteeshipZone").find("option:selected").text();
    buildNameText = $("#addNoTrusteeshipBuildingName").find("option:selected").text()
    if (buildNameText == '') {
        return;
    }
    choseSelectVal("buildingName", "addNoTrusteeshipBuildingName", "buildingNameDiv");
    $.post("../queryAllHouseDict.action", {
        hdCity: cityText,
        hdDistrict: districtText,
        hdZone: zoneText,
        hdCommunity: buildNameText
    }, function (data) {
        if (data.code < 0) {
            $.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
            return;
        }
        data = data.body;
        $("#addNoTrusteeshipStreet").val(data[0].hdRoad);
        $("#addNoTrusteeshipBuildingId").val(data[0].hdId);
        $("#addHsHouseDictId").val(data[0].hdId);
        $("#addNoTrusteeshipZone").val(data[0].hdZone);
        $(".hd_doorplateno_relus").val(data[0].hdDoorplatenoRelus);
        var relusVal = data[0].hdDoorplatenoRelus;
        if (_doorplateno == 1) {
            if (relusVal.split(',').length != 3) {//没有规则
                $("#doornoMsg").html('暂无门牌规则');
            }
        }
        doorplatenoRelusPush(relusVal, 0);
        $("#infoDoorplatenoRelus").text(doorplatenoShow(relusVal));
    });
}

//门牌规则显示
function doorplatenoShow(relus) {
    var doorRelus = '(';//该小区门牌号规则：
    var doorNums = relus.split(',');
    if (doorRelus == null || doorRelus == '' || doorNums.length != 3 || doorNums[0] == '' || doorNums[1] == ''
        || doorNums[2] == '') {
        doorRelus = "(暂无门牌规则，请在定义规则后再输入门牌号！)";
        $("#doorplatenoDlgButton").show();
    } else {
        $("#doorplatenoDlgButton").hide();
        var relusRuslt = '';
        for (var i in doorNums) {
            if (i != 0 && doorNums[i] != 0) {
                doorRelus += " + ";
            }
            if (doorNums[i] == 0) {

            }
            if (doorNums[i] == 1) {
                doorRelus += '一位数字';
            }
            if (doorNums[i] == 2) {
                doorRelus += '两位数字';
            }
            if (doorNums[i] == 3) {
                doorRelus += '三位数字';
            }
            if (doorNums[i] == 4) {
                doorRelus += '字母';
            }
            if (i == 0) {
                doorRelus += "楼层";
            }
            if (i == 1) {
                doorRelus += "房号";
            }
            if (i == 2) {
                doorRelus += ')';
            }
        }
    }
    return doorRelus;
}

//门牌规则赋值以及限制输入框输入
function doorplatenoRelusPush(relusVal, type) {
    var relusGroup = relusVal.split(',');
    var numsLength = 1;
    var inputId = '';
    if (type == 0) {
        inputId = 'addDoorplateno';
    } else {
        inputId = 'doorplatenoInput';
    }
    if (relusGroup.length == 3) {
        for (var i in relusGroup) {
            if (relusGroup[i] == 0) {
                numsLength = 0;
            }
            if (relusGroup[i] == 2) {
                numsLength = 2;
            }
            if (relusGroup[i] == 3) {
                numsLength = 3;
            }
            if (relusGroup[i] == 1 || relusGroup[i] == 4) {
                numsLength = 1;
            }
            $("#" + inputId + (parseInt(i) + 1)).attr({
                maxlength: numsLength
            });
            if (relusGroup[i] == 4) {
                $("#" + inputId + (parseInt(i) + 1)).unbind('keypress');
                $("#" + inputId + (parseInt(i) + 1)).onlyAlpha();
            } else {
                $("#" + inputId + (parseInt(i) + 1)).unbind('keypress');
                $("#" + inputId + (parseInt(i) + 1)).numeral();
            }
        }
    } else {
        $(".hd_doorplateno_relus").val('');
        $("#doorplatenoTypeSelect").val('');
    }
    $("#infoDoorplatenoRelus").text(doorplatenoShow(relusVal));
}

//单元格单击编辑
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

//查询房屋
function queryHouse(page, type) {
    var startNum = (parseInt(page) - 1) * 10;
    var endNum = 10;
    var qhAddCity = $("#searchAddCity").find("option:selected").text();
    var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
    var qhAddZone = $("#searchAddZone").find("option:selected").text();
    var qhAddCommunity = $("#searchAddCommunity").val();
    var qhAddBuilding = $("#searchAddBuilding").val();
    var qhAddDoorplateno = $("#searchAddDoorplateno").val();
    $.post("../queryHousePaperCommon.action", {
        startNum: startNum,
        endNum: endNum,
        addCity: qhAddCity,
        addDistrict: qhAddDistrict,
        addZone: qhAddZone,
        addCommunity: qhAddCommunity,
        addBuilding: qhAddBuilding,
        addDoorplateno: qhAddDoorplateno,
        houseSignedState: '未托管',
    }, function (data) {
        if (data.code < 0) {
            sourcePage(0, 0, 1);
            $('#choseHouseTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
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

//分页操作
function sourcePage(totalNum, page, type) {
    var pageNum = Math.ceil(totalNum / 10);
    if (type == 1) {
        pageNum = Math.ceil(totalNum / 10);
        $("#choseHousePage").remove();
        $("#choseHousePageDiv")
            .append(
                "<div class='tcdPageCode' id='choseHousePage' style='text-align:center;'></div>");
        $("#choseHousePage").createPage({
            onePageNums: 10,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryHouse(p, 1);
                }
            }
        });
    }
    if (type == 2) {
        pageNum = Math.ceil(totalNum / 5);
        $("#followPage").remove();
        $("#followPageDiv")
            .append(
                "<div class='tcdPageCode' id='followPage' style='text-align:center;'></div>");
        $("#followPage").createPage({
            onePageNums: 5,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    var row = $('#trusteeshipDg').datagrid('getSelected');
                    if (row) {
                        queryFollow(row, p, 1);
                    } else {
                        row = $('#trusteeshipDg').datagrid('getData').rows[_indexNum[0]];
                        queryFollow(row, p, 1);
                    }
                }
            }
        });
    }
    if (type == 3) {
        pageNum = Math.ceil(totalNum / 15);
        $("#financialPage").remove();
        $("#financialPageDiv")
            .append(
                "<div class='tcdPageCode' id='financialPage' style='text-align:center;'></div>");
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
        $("#payableInfoPage").remove();
        $("#payableInfoPageDiv")
            .append(
                "<div class='tcdPageCode' id='payableInfoPage' style='text-align:center;'></div>");
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
    if (type == 5) {
        pageNum = Math.ceil(totalNum / 15);
        $("#receivableInfoPage").remove();
        $("#receivableInfoPageDiv")
            .append(
                "<div class='tcdPageCode' id='receivableInfoPage' style='text-align:center;'></div>");
        $("#receivableInfoPage").createPage({
            onePageNums: 15,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    queryInstallment(p, 1);
                }
            }
        });
    }
    if (type == 6) {
        pageNum = Math.ceil(totalNum / 15);
        $("#assetsPage").remove();
        $("#assetsPageDiv")
            .append(
                "<div class='tcdPageCode' id='assetsPage' style='text-align:center;'></div>");
        $("#assetsPage").createPage({
            onePageNums: 15,
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
    if (type == 7) {
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
    if (type == 8) {
        pageNum = Math.ceil(totalNum / 4);
        $("#landlordContinuePag").remove();
        $("#landlordContinuePageDiv").append("<div class='tcdPageCode' id='landlordContinuePag' style='width:100%;text-align:center;'></div>");
        $("#landlordContinuePag").createPage({
            onePageNums: 4,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    landlordContract(p, 1);
                }
            }
        });
    }
    if (type == 9) {
        pageNum = Math.ceil(totalNum / 4);
        $("#rentHisContinuePage").remove();
        $("#rentHisContinuePageDiv").append("<div class='tcdPageCode' id='rentHisContinuePage' style='text-align:center;'></div>");
        $("#rentHisContinuePage").createPage({
            onePageNums: 4,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    rentHisContinue(p, 1);
                }
            }
        });
    }
    if (type == 10) {
        pageNum = Math.ceil(totalNum / 20);
        $("#sendMessagePage").remove();
        $("#sendMessagePageDiv")
            .append(
                "<div class='tcdPageCode' id='sendMessagePage' style='text-align:center;'></div>");
        $("#sendMessagePage").createPage({
            onePageNums: 20,
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
    if (type == 11) {
        pageNum = Math.ceil(totalNum / 5);
        $("#assetsListTablePage").remove();
        $("#assetsListTablePageDiv")
            .append(
                "<div class='tcdPageCode' id='assetsListTablePage' style='text-align:center;'></div>");
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
    if (type == 12) {
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
}

function contractNumCheckout(type) {
    if (_contractNums != 1) {
        return;
    }
    if (type == 0) {
        var detectionContract = $("#contractNum").val();
        for (var i in _contractNumsArry) {
            if (_contractNumsArry[i].number == detectionContract) {
                $("#contractNumTips").html("编号正确");
                $("#contractNumTips").css("color", "green");
                return;
            }
        }
        if (detectionContract == '') {
            $("#contractNumTips").html("");//编号不能为空！
            return;
        }
        $.post("../contractNumberdetection.action", {
            detectionContract: detectionContract,
        }, function (data) {
            if (data.code < 0) {
                $("#contractNumTips").html(data.msg);
                $("#contractNumTips").css("color", "red");
                return;
            } else {
                data = data.body;
                $("#contractNumTips").html("编号正确");
                $("#contractNumTips").css("color", "green");
                $("#usedContractNum").append('<div class="selectShow" onclick="deleteThisDiv(this.id,0)" id="contractNumsShow' + detectionContract + '"><div style="float: left;" >' + detectionContract
                    + '</div><div class="selectShow-x" style="float: right;"></div></div>');
                _contractNumsArry.push({
                    number: detectionContract,
                    jcdId: parseInt(data[0].jcdId),
                    jcdHouseAddress: "",
                    adminUser: ''
                });
            }
        });
    } else if (type == 1) {
        var detectionContract = $("#landlordRenewContractNum").val();
        for (var i in _contractNumsArry1) {
            if (_contractNumsArry1[i].number == detectionContract) {
                $("#landlordRenewContractNumTips").html("编号正确");
                $("#landlordRenewContractNumTips").css("color", "green");
                return;
            }
        }
        if (detectionContract == '') {
            $("#landlordRenewContractNumTips").html("");//编号不能为空！
            return;
        }
        $.post("../contractNumberdetection.action", {
            detectionContract: detectionContract,
        }, function (data) {
            if (data.code < 0) {
                $("#landlordRenewContractNumTips").html(data.msg);
                $("#landlordRenewContractNumTips").css("color", "red");
                return;
            } else {
                data = data.body;
                $("#landlordRenewContractNumTips").html("编号正确");
                $("#landlordRenewContractNumTips").css("color", "green");
                $("#landlordRenewUsedContractNum").append('<div class="selectShow" onclick="deleteThisDiv(this.id,1)" id="lrcontractNumsShow' + detectionContract + '"><div style="float: left;" >' + detectionContract
                    + '</div><div class="selectShow-x" style="float: right;"></div></div>');
                _contractNumsArry1.push({
                    number: detectionContract,
                    jcdId: parseInt(data[0].jcdId),
                    jcdHouseAddress: "",
                    adminUser: ''
                });
            }
        });
    }
}

function deleteThisDiv(id, type) {
    if (type == 0) {
        var nums = id.split("contractNumsShow")[1];
        for (var i in _contractNumsArry) {
            if (_contractNumsArry[i].number == nums) {
                _contractNumsArry.splice(i, 1);
            }
        }
        $("#contractNumsShow" + nums).remove();
        $("#contractNumTips").html("");
    } else {
        var nums = id.split("lrcontractNumsShow")[1];
        for (var i in _contractNumsArry1) {
            if (_contractNumsArry1[i].number == nums) {
                _contractNumsArry1.splice(i, 1);
            }
        }
        $("#lrcontractNumsShow" + nums).remove();
    }
}

function preGeneratingBill() {
    console.log("3");
    var addSigned = $('#addHsSigned').val();//签约时间
    var addSourceBegin = $('#addHsBegin').val();//合同开始
    var addEnd = $('#addHsEnd').val();//合同结束
    var addContractType = $('#addHsContractType').find("option:selected").text();//合同性质：新签合同
    var term = getYearMonthDay(addSourceBegin, addEnd);//计算之间有几年几月几日
    var addSourceTerm = term[0] + '年' + term[1] + '月' + term[2] + '日';
    var inAdvancePay = $("#addHsInAdvancePay").val();//提前交租天
//	var jrlRentFreeDays = $("#addHsHoliday").val();
    var jrlPaymentMethod = $("#addHsPaymentType").find("option:selected").text();//租付方式
    var jrlPriceLadder = $(".jrlPriceLadder").val();//价格
    var jrlRentFreeSegment = $(".jrlRentFreeSegment").val();//免租期
    var jrlAnnualMethod = $("#annualMethod").find("option:selected").text();//年度结算方式
    var reverseOrderFlag = _flag;
    $.post("../noRentedBillInformation.action", {
        //新增未租合约部分 数据
        jrlSignedTime: addSigned,
        jrlBeginTime: addSourceBegin,
        jrlEndTime: addEnd,
        jrlUserId: _loginUserId,
        jrlDepartment: _loginDepartment,
        jrlStorefront: _loginStore,
        jrlContractType: addContractType,
        jrlTheTerm: addSourceTerm,
        jrlInAdvancePay: inAdvancePay,
//		jrlRentFreeDays 		: jrlRentFreeDays,
        jrlPaymentMethod: jrlPaymentMethod,
        jrlRentFreeSegment: jrlRentFreeSegment,
        jrlPriceLadder: jrlPriceLadder,
        jrlAnnualMethod: jrlAnnualMethod,
        jrlReverseOrderFlag: reverseOrderFlag,
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
        for (var i in data) {
            if (i == 0) {
                data[i].jciAudit = data[0].jciAudit.getRealJsonStr();
            } else {
                data[i].jciAudit = '{' + data[0].jciAudit.getRealJsonStr() + '}';
            }
        }
        $("#preGeneratingBillTable").datagrid("loadData", data);
    });
}

function onClickRow2(index) {
    if (editIndex2 != index) {
        if (endEditing2()) {
            $('#centralizedApartmentRuleDg').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndex2 = index;
        } else {
            $('#centralizedApartmentRuleDg').datagrid('selectRow', editIndex2);
        }
    }
}

function queryAsset(page, type) {
    var startNum = (parseInt(page) - 1) * 15;
    var endNum = 15;
    var row = $('#trusteeshipDg').datagrid('getSelected');
    $.post('../queryAssetsCommon.action', {
        startNum: startNum,
        endNum: endNum,
        saHouseStoreId: row.hsId
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
            sourcePage(0, 0, 6);
            $('#assetsInfoTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        } else {
            if (page == 1 && type == 0) {
                sourcePage(data.body[0].totalNum, page, 6);
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
    if ($('#assetsListTable').hasClass('datagrid-f')) {

    } else {
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
    }

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
        $('#doMoveAddHrButton1').show();
        $('#doMoveAddHrButton2').hide();
    } else {
        $('#doMoveAddHrButton1').hide();
        $('#doMoveAddHrButton2').show();
    }
    $("#moveInAssetsDlg").dialog('open');
    queryAssetsList(1, 0);
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

    $.post("../queryAssetsCommon.action", {
//	$.post("../assetsInRentDb.action", {			//有区别
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
    var rows2 = $('#assetsInfoTable').datagrid('getRows');
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
        myTips('有选项未填!', 'error');
        return;
    }
    var agentName = $('#pickHsManagerinShowUserInfo').val().split(' ')[$('#pickHsManagerinShowUserInfo').val().split(' ').length - 1];//获取第三个的名字
    //var agentName = $('#move_in_asset_staff option:selected').text();
    var moveReason = $('#move_in_asset_reason').val();
    var row = $("#trusteeshipDg").datagrid("getSelected");
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
            saHouseStoreId: row.hsId,
            saHouseId: row.hsHouseId,
            saMoveFrom: rows[i].saDetailedAddress,
            saMoveTo: row.hsAddCommunity + " " + row.hsAddBuilding + " " + row.hsAddDoorplateno,
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
    var row2 = $('#trusteeshipDg').datagrid('getSelected');
    $('#move_from_assets_choseHouse').val(row2.detailedAddress);
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
        $('#doMoveOutAssetsButton1').show();
        $('#doMoveOutAssetsButton2').hide();
    } else {
        $('#doMoveOutAssetsButton1').hide();
        $('#doMoveOutAssetsButton2').show();
    }
    $('#moveOutAssetsDlg').dialog('open');
}

//添加
function append2() {
    if (endEditing2()) {
        var addCommunity = '';
        var addBuilding = '';
        if ($('#addHsHouseId').val() != '') {
            addCommunity = $("#addHsDlg .addCommunity").val();
            addBuilding = $("#addHsDlg .addBuilding").val();
        } else {
            addCommunity = $("#buildingName").val();
            addBuilding = $("#inputSelect").val();
        }
        $('#centralizedApartmentRuleDg').datagrid('appendRow', {community: addCommunity, building: addBuilding});
        editIndex2 = $('#centralizedApartmentRuleDg').datagrid('getRows').length - 1;
        $('#centralizedApartmentRuleDg').datagrid('selectRow', editIndex2).datagrid('beginEdit', editIndex2);
    } else {
        myTips('数据不完整', 'error');
    }
}

//删除
function removeit2() {
    if (editIndex2 == undefined) {
        myTips('请选择一条记录', 'error');
        return
    }
    $('#centralizedApartmentRuleDg').datagrid('cancelEdit', editIndex2).datagrid('deleteRow', editIndex2);
    editIndex2 = undefined;
}

//保存
function accept2() {
    if (endEditing2()) {
        $('#centralizedApartmentRuleDg').datagrid('acceptChanges');
        return 'success';
    } else {
        myTips('数据不完整', 'error');
        return 'error';
    }
}

/**
 * 执行迁出资产
 */
function doMoveOutAssetsButton(flag) {
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
    var agentName = $('#pickHsManagertShowUserInfo').val().split(' ')[$('#pickHsManagertShowUserInfo').val().split(' ').length - 1];
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
        myTips('有选项未填!', 'error');
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

//添加集中房，设置门牌规则
var editIndex2 = undefined;

function endEditing2() {
    if (editIndex2 == undefined) {
        return true;
    }
    if ($('#centralizedApartmentRuleDg').datagrid('validateRow', editIndex2)) {
        $('#centralizedApartmentRuleDg').datagrid('endEdit', editIndex2);
        editIndex2 = undefined;
        return true;
    } else {
        return false;
    }
}

//集中式公寓预生成
function newCentralizedApartment(type) {
    if (type == 'addCentralized') {
        var result = accept2();
        if (result == 'error') {
            return;
        }
        var rows = $('#centralizedApartmentRuleDg').datagrid('getRows');
        if (rows.length == 0) {
            myTips('请添加规则', 'error');
            return;
        }
    } else if (type == 'setCentralized') {
        var result = accept4();
        if (result == 'error') {
            return;
        }
        var rows = $('#centralizedApartmentRuleDg2').datagrid('getRows');
        if (rows.length == 0) {
            myTips('请添加规则', 'error');
            return;
        }
    }

    var house = [];
    for (var i in rows) {
        var community = rows[i].community;
        var building = rows[i].building;
        var floor = rows[i].beginFloor;
        var floorNums = rows[i].endFloor - rows[i].beginFloor + 1;
        var roomNums = rows[i].endRoomNum - rows[i].startRoomNum + 1;
        var namePlan = rows[i].namePlan;
        var roomNumPrefix = rows[i].roomNumPrefix;
        if (namePlan == 2 && roomNums > 26) {
            myTips('字母房号每层最多26间', 'error');
            return;
        }
        if (namePlan == 4 && roomNums > 26) {
            myTips('字母房号每层最多26间', 'error');
            return;
        }
        if (floorNums < 1) {
            myTips('楼层设置错误', 'error');
            return;
        }
        var room = rows[i].startRoomNum;
        var word = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var j = 1; j < parseInt(floorNums) * parseInt(roomNums) + 1; j++) {
            var item = {};
            item.community = community;
            item.building = building;
            item.floor = floor;
            item.room = room;
            if (namePlan == 1) {//数字楼层+数字房号
                var doorplateno = "";
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                if (floor < 10) {
                    doorplateno += "0" + floor;
                } else {
                    doorplateno += floor;
                }
                if (room < 10) {
                    doorplateno += "0" + room;
                } else {
                    doorplateno += room;
                }
                item.doorplateno = doorplateno;
            }
            if (namePlan == 2) {//数字楼层+字母房号
                var doorplateno = "";
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                if (floor < 10) {
                    doorplateno += "0" + floor;
                } else {
                    doorplateno += floor;
                }
                doorplateno += word[parseInt(room) - 1];
                item.doorplateno = doorplateno;
            }
            if (namePlan == 3) {//楼层减一加A，数字房号
                var doorplateno = "";
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                if (floor < 10) {
                    doorplateno += "0" + floor - 1 + "A";
                } else {
                    doorplateno += floor - 1 + "A";
                }
                if (room < 10) {
                    doorplateno += "0" + room;
                } else {
                    doorplateno += room;
                }
                item.doorplateno = doorplateno;
            }
            if (namePlan == 4) {//楼层减一加A，字母房号
                var doorplateno = "";
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                if (floor < 10) {
                    doorplateno += "0" + floor - 1 + "A";
                } else {
                    doorplateno += floor - 1 + "A";
                }
                doorplateno += word[parseInt(room) - 1];
                item.doorplateno = doorplateno;
            }
            if (namePlan == 5) {//楼层减一加A+数字房号减一加A
                var doorplateno = "";
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                if (floor < 10) {
                    doorplateno += "0" + floor - 1 + "A";
                } else {
                    doorplateno += floor - 1 + "A";
                }
                if (room < 10) {
                    doorplateno += "0" + room - 1 + "A";
                } else {
                    doorplateno += room - 1 + "A";
                }
                item.doorplateno = doorplateno;
            }
            if (namePlan == 6) {//数字楼层+数字房号减一加A
                var doorplateno = "";
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                if (floor < 10) {
                    doorplateno += "0" + floor;
                } else {
                    doorplateno += floor;
                }
                if (room < 10) {
                    doorplateno += "0" + room - 1 + "A";
                } else {
                    doorplateno += room - 1 + "A";
                }
                item.doorplateno = doorplateno;
            }
            house.push(item);
            room++;
            if (room > rows[i].endRoomNum) {
                room = rows[i].startRoomNum;
                floor++;
            }
        }
    }
    return house;
}

//点击一行触发
function onClickRow3(index) {
    if (editIndex3 != index) {
        if (endEditing3()) {
            $('#centralizedApartmentRoomDg').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndex3 = index;
        } else {
            $('#centralizedApartmentRoomDg').datagrid('selectRow', editIndex3);
        }
    }
}

//添加
function append3() {
    if (endEditing3()) {
        var addCommunity = '';
        var addBuilding = '';
        if ($('#addHsHouseId').val() != '') {
            addCommunity = $("#addHsDlg .addCommunity").val();
            addBuilding = $("#addHsDlg .addBuilding").val();
        } else {
            addCommunity = $("#buildingName").val();
            addBuilding = $("#inputSelect").val();
        }
        $('#centralizedApartmentRoomDg').datagrid('appendRow', {community: addCommunity, building: addBuilding});
        editIndex3 = $('#centralizedApartmentRoomDg').datagrid('getRows').length - 1;
        $('#centralizedApartmentRoomDg').datagrid('selectRow', editIndex3).datagrid('beginEdit', editIndex3);
    } else {
        myTips('数据不完整', 'error');
    }
}

//删除
function removeit3() {
    var row = $('#centralizedApartmentRoomDg').datagrid('getChecked');
    if (row.length == 0) {
        myTips('请选择一条记录', 'error');
        return
    }
    for (var i in row) {
        var index = $('#centralizedApartmentRoomDg').datagrid('getRowIndex', row[i]);
        $('#centralizedApartmentRoomDg').datagrid('cancelEdit', index).datagrid('deleteRow', index);
    }
}

//保存
function accept3() {
    if (endEditing3()) {
        $('#centralizedApartmentRoomDg').datagrid('acceptChanges');
        return 'success';
    } else {
        myTips('数据不完整', 'error');
        return 'error';
    }
}

//添加集中房，保存集中房
var editIndex3 = undefined;

function endEditing3() {
    if (editIndex3 == undefined) {
        return true;
    }
    if ($('#centralizedApartmentRoomDg').datagrid('validateRow', editIndex3)) {
        $('#centralizedApartmentRoomDg').datagrid('endEdit', editIndex3);
        editIndex3 = undefined;
        return true;
    } else {
        return false;
    }
}

function loadSelectList() {
    for (var i in _taskType) {
        $("#taskrepairTypeRp").append("<option value = '" + _taskType[i] + "'>" + _taskType[i] + "</option>");
        $("#repairTypeRp").append("<option value = '" + i + "'>" + _taskType[i] + "</option>");
    }
    $("#repairResponsibility").append("<option value = '负责人'>负责人</option>");
    for (var i in _loginCompanyRentDistrict) {
        $('#searchAddDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
        $('#addNoTrusteeshipDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
    }

    for (var i = 0; i < _househrState.length; i++) {//用途
        $(".add_trusteeship_state").append("<option value = '" + i + "'>" + _househrState[i] + "</option>");
        $("#addNoTrusteeshipUse").append("<option value = '" + i + "'>" + _househrState[i] + "</option>");
        $(".houseOwner").append("<option value = '" + _househrState[i] + "'>" + _househrState[i] + "</option>");
    }
    for (var i = 0; i < _sectionType.length; i++) {//户型
        $(".add_trusteeship_sectionType").append("<option value = '" + i + "'>" + _sectionType[i] + "</option>");
        $("#addNoTrusteeshipSection").append("<option value = '" + i + "'>" + _sectionType[i] + "</option>");
        $(".sectionType").append("<option value = '" + _sectionType[i] + "'>" + _sectionType[i] + "</option>");
    }
    for (var i = 0; i < _houseType.length; i++) {
        $(".add_trusteeship_houseType").append("<option value = '" + i + "'>" + _houseType[i] + "</option>");
    }
    for (var i = 0; i < _contractType.length; i++) {//合同性质
        $(".add_trusteeship_contract_type").append("<option value = '" + i + "'>" + _contractType[i] + "</option>");
        $(".contractType").append("<option value = '" + _contractType[i] + "'>" + _contractType[i] + "</option>");
        $("#addHrContractType").append("<option value = '" + _contractType[i] + "'>" + _contractType[i] + "</option>");
    }
    for (var i = 0; i < _hrPaymentType.length; i++) {//缴费方式
        $(".add_payment_type").append("<option value = '" + _hrPaymentType[i] + "'>" + _hrPaymentType[i] + "</option>");
        $(".paymentType").append("<option value = '" + _hrPaymentType[i] + "'>" + _hrPaymentType[i] + "</option>");
    }
    for (var i = 0; i < _followWay.length; i++) {
        $(".follow_way").append("<option value = '" + i + "'>" + _followWay[i] + "</option>");
    }
    for (var i = 0; i < _bankType.length; i++) {//银行名称
        $(".add_trusteeship_bank_type").append("<option value = '" + i + "'>" + _bankType[i] + "</option>");
        $(".bankType").append("<option value = '" + _bankType[i] + "'>" + _bankType[i] + "</option>");
    }
    for (var i = 0; i < _bankType.length; i++) {
        $(".add_la_bank_type").append("<option value = '" + i + "'>" + _bankType[i] + "</option>");
    }
    for (var i = 2; i < _saveHouseState.length; i++) {
        $("#searchHouseState").append("<option value = '" + _saveHouseState[i] + "'>" + _saveHouseState[i] + "</option>");
    }
    for (var i = 0; i < _direction.length; i++) {//朝向
        $(".add_trusteeship_direction").append("<option value = '" + i + "'>" + _direction[i] + "</option>");
        $(".houseDirection").append("<option value = '" + _direction[i] + "'>" + _direction[i] + "</option>");
    }
    for (var i in _acountType) {
        $('.add_financial_way').append("<option value='" + i + "'>" + _acountType[i] + "</option>");
    }
    for (var i = 0; i < _landlordCheckoutNature.length; i++) {
        $("#landlordCheckoutWhy").append("<option value = '" + _landlordCheckoutNature[i] + "'>" + _landlordCheckoutNature[i] + "</option>");
    }
    for (var i in _saType) {
        $('#searchSaType').append("<option value='" + _saType[i] + "'>" + _saType[i] + "</option>");
    }
    for (var i in _saClassify) {
        $('#searchClassify').append("<option value='" + _saClassify[i] + "'>" + _saClassify[i] + "</option>");
    }
    for (var i in _saUse) {
        $('#searchSaUse').append('<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
    }
    for (var i in _doorplatenoType) {
        if (i > 0) {
            $("#doorplatenoType1").append("<option value = '" + i + "'>" + _doorplatenoType[i] + "</option>");
        }
    }
    for (var i in _eventApprovalType) {
        $('.eventType').append("<option value='" + _eventApprovalType[i] + "'>" + _eventApprovalType[i] + "</option>");
        $('#searchEventType').append("<option value='" + _eventApprovalType[i] + "'>" + _eventApprovalType[i] + "</option>");
    }
    for (var i in _doorplatenoType) {
        $("#doorplatenoType2").append("<option value = '" + i + "'>" + _doorplatenoType[i] + "</option>");
        $("#doorplatenoType3").append("<option value = '" + i + "'>" + _doorplatenoType[i] + "</option>");
    }
    for (var i = 0; i < _repHopeTime.length; i++) {
        $(".repair_hope_select").append("<option value = '" + _repHopeTime[i] + "'>" + _repHopeTime[i] + "</option>");
    }
    for (var i = 0; i < _repResponsibility.length; i++) {
        $("#maRepairResponsibility").append("<option value = '" + _repResponsibility[i] + "'>" + _repResponsibility[i] + "</option>");
        $(".repair_responsibility").append("<option value = '" + i + "'>" + _repResponsibility[i] + "</option>");
    }
    for (var i = 0; i < _eventType.length; i++) {
        $(".repair_type_rp").append("<option value = '" + i + "'>" + _eventType[i] + "</option>");
        $("#marepairTypeRp").append("<option value = '" + _eventType[i] + "'>" + _eventType[i] + "</option>");
    }
    for (var i in _payType) {
        $('.financial_payType').append("<option value='" + _payType[i] + "'>" + _payType[i] + "</option>");
    }
    for (var i in _direction) {
        $(".orientation").append("<option value = '" + _direction[i] + "'>" + _direction[i] + "</option>");
    }
    for (var i = 0; i < _houseType.length; i++) {
        $(".renovation1").append("<option value = '" + _houseType[i] + "'>" + _houseType[i] + "</option>");
    }
    for (var i = 0; i < _sectionType.length; i++) {
        $(".apartment_layout").append("<option value = '" + _sectionType[i] + "'>" + _sectionType[i] + "</option>");
    }
    for (var i in _chargesPaid) {
        $(".charges_paid").append("<option value = '" + _chargesPaid[i] + "'>" + _chargesPaid[i] + "</option>");
    }
    for (var i in _brandSelect) {
        $("#deviceGetDeviceBrand").append("<option value = '" + _brandSelect[i].brandId + "'>"
            + _brandSelect[i].brandName + " " + _brandSelect[i].brandType + " " + _brandSelect[i].brandModel + "</option>");
    }
    for (var i in _saType) {
        $('#searchSaType').append('<option value="' + _saType[i] + '">' + _saType[i] + '</option>');
        $('#add_asset_type').append('<option value="' + _saType[i] + '">' + _saType[i] + '</option>');
        $('#update_asset_type').append('<option value="' + _saType[i] + '">' + _saType[i] + '</option>');
    }
    for (var i in _assetsType) {
        $('#searchSaClassify').append('<option value="' + _assetsType[i].type + '">' + _assetsType[i].type + '</option>');
        $('#add_asset_classify').append('<option value="' + _assetsType[i].type + '">' + _assetsType[i].type + '</option>');
        $('#update_asset_classify').append('<option value="' + _assetsType[i].type + '">' + _assetsType[i].type + '</option>');
    }
    for (var i in _saUse) {
        $('#searchSaUse').append('<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
        $('#add_asset_use').append('<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
        $('#update_asset_use').append('<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
    }
    for (var i in _saStatus) {
        $('#searchSaState').append('<option value="' + _saStatus[i] + '">' + _saStatus[i] + '</option>');
        $('#add_asset_status').append('<option value="' + _saStatus[i] + '">' + _saStatus[i] + '</option>');
        $('#update_asset_status').append('<option value="' + _saStatus[i] + '">' + _saStatus[i] + '</option>');
    }
    for (var i in _saType) {
        $('#add_asset_type2').append('<option value="' + _saType[i] + '">' + _saType[i] + '</option>');
    }
    for (var i in _assetsType) {
        $('#add_asset_classify2').append('<option value="' + _assetsType[i].type + '">' + _assetsType[i].type + '</option>');
    }
    for (var i in _saUse) {
        $('#add_asset_use2').append('<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
    }
    for (var i in _saStatus) {
        $('#add_asset_status2').append('<option value="' + _saStatus[i] + '">' + _saStatus[i] + '</option>');
    }
}

//设置集中房，设置门牌规则
var editIndex4 = undefined;

function endEditing4() {
    if (editIndex4 == undefined) {
        return true;
    }
    if ($('#centralizedApartmentRuleDg2').datagrid('validateRow', editIndex4)) {
        $('#centralizedApartmentRuleDg2').datagrid('endEdit', editIndex4);
        editIndex4 = undefined;
        return true;
    } else {
        return false;
    }
}

//点击一行触发
function onClickRow4(index) {
    if (editIndex4 != index) {
        if (endEditing4()) {
            $('#centralizedApartmentRuleDg2').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndex4 = index;
        } else {
            $('#centralizedApartmentRuleDg2').datagrid('selectRow', editIndex4);
        }
    }
}

//添加
function append4() {
    if (endEditing4()) {
        $('#centralizedApartmentRuleDg2').datagrid('appendRow', {});
        editIndex4 = $('#centralizedApartmentRuleDg2').datagrid('getRows').length - 1;
        $('#centralizedApartmentRuleDg2').datagrid('selectRow', editIndex4).datagrid('beginEdit', editIndex4);
    } else {
        myTips('数据不完整', 'error');
    }
}

//删除
function removeit4() {
    if (editIndex4 == undefined) {
        myTips('请选择一条记录', 'error');
        return
    }
    $('#centralizedApartmentRuleDg2').datagrid('cancelEdit', editIndex4).datagrid('deleteRow', editIndex4);
    editIndex4 = undefined;
}

//保存
function accept4() {
    if (endEditing4()) {
        $('#centralizedApartmentRuleDg2').datagrid('acceptChanges');
        return 'success';
    } else {
        myTips('数据不完整', 'error');
        return 'error';
    }
}

//集中式公寓预生成
var identifying;//标识
function newCentralizedApartment2(type) {
    if (type == 'addCentralized') {
        var result = accept2();
        if (result == 'error') {
            return;
        }
        var rows = $('#centralizedApartmentRuleDg').datagrid('getRows');
        if (rows.length == 0) {
            myTips('请添加规则', 'error');
            return;
        }
    } else if (type == 'setCentralized') {
        var result = accept4();
        if (result == 'error') {
            return;
        }
        var rows = $('#centralizedApartmentRuleDg2').datagrid('getRows');
        if (rows.length == 0) {
            myTips('请添加规则', 'error');
            return;
        }
    }

    var house = [];
    identifying = randomNumber();
    for (var i in rows) {
        var community = rows[i].community;
        var building = rows[i].building;
        var floor = rows[i].beginFloor;
        var floorNums = rows[i].endFloor - rows[i].beginFloor + 1;
        var roomNums = rows[i].endRoomNum - rows[i].startRoomNum + 1;
        var namePlan = rows[i].namePlan;
        var floorNumPrefix = rows[i].floorNumPrefix;
        var roomNumPrefix = rows[i].roomNumPrefix;
        if (namePlan == 2 && roomNums > 26) {
            myTips('字母房号每层最多26间', 'error');
            return;
        }
        if (namePlan == 4 && roomNums > 26) {
            myTips('字母房号每层最多26间', 'error');
            return;
        }
        if (floorNums < 1) {
            myTips('楼层设置错误', 'error');
            return;
        }
        var room = rows[i].startRoomNum;
        var word = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var j = 1; j < parseInt(floorNums) * parseInt(roomNums) + 1; j++) {
            var item = {};
            item.community = community;
            item.building = building;
            item.floor = floor;
            if (room < 10) {
                item.room = "0" + room;
            } else {
                item.room = room;
            }
            item.floorNumPrefix = floorNumPrefix;
            item.roomNumPrefix = roomNumPrefix;
            item.identifying = identifying;
            if (namePlan == 1) {//数字楼层+数字房号
                var doorplateno = "";
                if (floorNumPrefix != "" && floorNumPrefix != null) {
                    doorplateno += floorNumPrefix;
                }
                if (floor < 10) {
                    if ($("#ckFloor").prop("checked")) {//选择后楼层小于10不补0
                        doorplateno += floor;
                    } else {
                        doorplateno += "0" + floor;
                    }
                } else {
                    doorplateno += floor;
                }
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                if (room < 10) {
                    if ($("#ckRoom").prop("checked")) {//选择后房号小于10不补0
                        doorplateno += room;
                    } else {
                        doorplateno += "0" + room;
                    }
                } else {
                    doorplateno += room;
                }
                item.doorplateno = doorplateno;
            }
            if (namePlan == 2) {//数字楼层+字母房号
                var doorplateno = "";
                if (floorNumPrefix != "" && floorNumPrefix != null) {
                    doorplateno += floorNumPrefix;
                }
                if (floor < 10) {
                    if ($("#ckFloor").prop("checked")) {
                        doorplateno += floor;
                    } else {
                        doorplateno += "0" + floor;
                    }
                } else {
                    doorplateno += floor;
                }
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                doorplateno += word[parseInt(room) - 1];
                item.doorplateno = doorplateno;
            }
            if (namePlan == 3) {//楼层减一加A，数字房号
                var doorplateno = "";
                if (floorNumPrefix != "" && floorNumPrefix != null) {
                    doorplateno += floorNumPrefix;
                }
                var floor2 = floor - 1;
                if (floor2 < 10) {
                    if ($("#ckFloor").prop("checked")) {
                        doorplateno += floor2 + "A";
                    } else {
                        doorplateno += "0" + floor2 + "A";
                    }
                } else {
                    doorplateno += floor2 + "A";
                }
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                if (room < 10) {
                    if ($("#ckRoom").prop("checked")) {//选择后房号小于10不补0
                        doorplateno += room;
                    } else {
                        doorplateno += "0" + room;
                    }
                } else {
                    doorplateno += room;
                }
                item.doorplateno = doorplateno;
            }
            if (namePlan == 4) {//楼层减一加A，字母房号
                var doorplateno = "";
                if (floorNumPrefix != "" && floorNumPrefix != null) {
                    doorplateno += floorNumPrefix;
                }
                var floor2 = floor - 1;
                if (floor2 < 10) {
                    if ($("#ckFloor").prop("checked")) {
                        doorplateno += floor2 + "A";
                    } else {
                        doorplateno += "0" + floor2 + "A";
                    }
                } else {
                    doorplateno += floor2 + "A";
                }
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                doorplateno += word[parseInt(room) - 1];
                item.doorplateno = doorplateno;
            }
            if (namePlan == 5) {//楼层减一加A+数字房号减一加A
                var doorplateno = "";
                if (floorNumPrefix != "" && floorNumPrefix != null) {
                    doorplateno += floorNumPrefix;
                }
                var floor2 = floor - 1;
                if (floor2 < 10) {
                    if ($("#ckFloor").prop("checked")) {
                        doorplateno += floor2 + "A";
                    } else {
                        doorplateno += "0" + floor2 + "A";
                    }
                } else {
                    doorplateno += floor2 + "A";
                }
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                var room2 = room - 1;
                if (room2 < 10) {
                    if ($("#ckRoom").prop("checked")) {//选择后房号小于10不补0
                        doorplateno += room2 + "A";
                    } else {
                        doorplateno += "0" + room2 + "A";
                    }
                } else {
                    doorplateno += room2 + "A";
                }
                item.doorplateno = doorplateno;
            }
            if (namePlan == 6) {//数字楼层+数字房号减一加A
                var doorplateno = "";
                if (floorNumPrefix != "" && floorNumPrefix != null) {
                    doorplateno += floorNumPrefix;
                }
                if (floor < 10) {
                    if ($("#ckFloor").prop("checked")) {
                        doorplateno += floor;
                    } else {
                        doorplateno += "0" + floor;
                    }
                } else {
                    doorplateno += floor;
                }
                if (roomNumPrefix != "" && roomNumPrefix != null) {
                    doorplateno += roomNumPrefix;
                }
                var room2 = room - 1;
                if (room2 < 10) {
                    if ($("#ckRoom").prop("checked")) {//选择后房号小于10不补0
                        doorplateno += room2 + "A";
                    } else {
                        doorplateno += "0" + room2 + "A";
                    }
                } else {
                    doorplateno += room2 + "A";
                }
                item.doorplateno = doorplateno;
            }
            house.push(item);
            room++;
            if (room > rows[i].endRoomNum) {
                room = rows[i].startRoomNum;
                floor++;
            }
        }
    }
    return house;
}

//保存预生成房到临时数据库
function insertCentralized() {
    var rows = newCentralizedApartment2('setCentralized');
    // console.log(rows);
    if (rows.length == 0) {
        myTips('请添加房间', 'error');
        return;
    }
    var jsonArray = [];
    for (var i = 0; i < rows.length; i++) {
        jsonArray.push({
            community: rows[i].community,
            building: rows[i].building,
            doorplateno: rows[i].doorplateno,
            roomNumPrefix: rows[i].roomNumPrefix,
            floorNumPrefix: rows[i].floorNumPrefix,
            floor: rows[i].floor,
            identifying: rows[i].identifying,
            roomNumber: rows[i].room,
        });
    }
    var splitJson = JSON.stringify(jsonArray);
    showLoading();
    $.post("../insertCentralized.action", {splitJson: splitJson}, function (data) {
        hideLoading();
        if (data.code < 0) {
            myTips(data.msg, "error");
            return;
        }
    });
}

//设置集中房，设置门牌规则
var editParameter = undefined;

function parameter() {
    if (editParameter == undefined) {
        return true;
    }
    if ($('#centralizedApartmentParameterDg2').datagrid('validateRow', editParameter)) {
        $('#centralizedApartmentParameterDg2').datagrid('endEdit', editParameter);
        editParameter = undefined;
        return true;
    } else {
        return false;
    }
}

//添加
function appendParameter() {
    if (parameter()) {
        var relation = '关联';
        var costPrice = '设置';
        $('#centralizedApartmentParameterDg2').datagrid('appendRow', {relation: relation, costPrice: costPrice});
        editParameter = $('#centralizedApartmentParameterDg2').datagrid('getRows').length - 1;
        $('#centralizedApartmentParameterDg2').datagrid('selectRow', editParameter).datagrid('beginEdit', editParameter);
    } else {
        myTips('数据不完整', 'error');
    }
}

//删除
function removeitParameter() {
    if (editParameter == undefined) {
        myTips('请选择一条记录', 'error');
        return
    }
    $('#centralizedApartmentParameterDg2').datagrid('cancelEdit', editParameter).datagrid('deleteRow', editParameter);
    editParameter = undefined;
}

//保存
function acceptParameter() {
    if (parameter()) {
        $('#centralizedApartmentParameterDg2').datagrid('acceptChanges');
        return 'success';
    } else {
        myTips('数据不完整', 'error');
        return 'error';
    }
}

//点击一行触发
function onClickRowParameter(index) {
    if (editParameter != index) {
        if (parameter()) {
            $('#centralizedApartmentParameterDg2').datagrid('selectRow', index).datagrid('beginEdit', index);
            editParameter = index;
        } else {
            $('#centralizedApartmentParameterDg2').datagrid('selectRow', editParameter);
        }
    } else {
        $('#centralizedApartmentParameterDg2').datagrid('acceptChanges');
        editParameter = undefined;
    }
}

//保存参数规则到临时数据库
function updateCentralized() {
    var rows = $('#centralizedApartmentParameterDg2').datagrid('getRows');
    var jsonArray = [];
    var data = [];
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].relationRoom) {
            data = rows[i].relationRoom;
            for (var j in data) {
                jsonArray.push({
                    sectionType: rows[i].sectionType,
                    houseDirection: rows[i].direction,
                    houseState: rows[i].state,
                    houseSquare: rows[i].square,
                    guidePrice: rows[i].guidePrice,
                    costPrice: rows[i].costPrice,
                    jctCostPriceVal: rows[i].costPriceVal,
                    identifying: data[j].identifying,
                    id: data[j].id,
                });
            }
        }
    }
    var splitJson = JSON.stringify(jsonArray);
    showLoading();
    $.post("../updateCentralized.action", {splitJson: splitJson}, function (data) {
        hideLoading();
        if (data.code < 0) {
            myTips(data.msg, "error");
            return;
        }
        queryCentralized();
    });
}

//查询全部预生成集中房
function queryCentralized() {
    $.post("../selectCentralized.action", {
        identifying: identifying,
    }, function (data) {
        if (data.code < 0) {
            $('#centralizedApartmentRoomDg2').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
            return;
        }
        data = data.body;
        for (var i in data) {
            data[i].direction = data[i].houseDirection;
            data[i].square = data[i].houseSquare;
            data[i].state = data[i].houseState;
            data[i].costPrice = "设置";
        }
        $('#centralizedApartmentRoomDg2').datagrid('loadData', data);
    });
}

//添加集中房，保存集中房
var editIndex5 = undefined;

function endEditing5() {
    if (editIndex5 == undefined) {
        return true;
    }
    if ($('#centralizedApartmentRoomDg2').datagrid('validateRow', editIndex5)) {
        $('#centralizedApartmentRoomDg2').datagrid('endEdit', editIndex5);
        editIndex5 = undefined;
        return true;
    } else {
        return false;
    }
}

//点击一行触发
function onClickRow5(index) {
    if (editIndex5 != index) {
        if (endEditing5()) {
            $('#centralizedApartmentRoomDg2').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndex5 = index;
        } else {
            $('#centralizedApartmentRoomDg2').datagrid('selectRow', editIndex5);
        }
    }
}

//添加
function append5() {
    if (endEditing5()) {
        var data = {
            costPrice: "设置"
        }
        $('#centralizedApartmentRoomDg2').datagrid('appendRow', data);
        editIndex5 = $('#centralizedApartmentRoomDg2').datagrid('getRows').length - 1;
        $('#centralizedApartmentRoomDg2').datagrid('selectRow', editIndex5).datagrid('beginEdit', editIndex5);
    } else {
        myTips('数据不完整', 'error');
    }
}

//删除
function removeit5() {
    var row = $('#centralizedApartmentRoomDg2').datagrid('getChecked');
    if (row.length == 0) {
        myTips('请选择一条记录', 'error');
        return
    }
    for (var i in row) {
        var index = $('#centralizedApartmentRoomDg2').datagrid('getRowIndex', row[i]);
        $('#centralizedApartmentRoomDg2').datagrid('cancelEdit', index).datagrid('deleteRow', index);
    }
}

//保存
function accept5() {
    if (endEditing5()) {
        $('#centralizedApartmentRoomDg2').datagrid('acceptChanges');
        return 'success';
    } else {
        myTips('数据不完整', 'error');
        return 'error';
    }
}

//打开关联房间窗口
function relationRoom(index) {
    $("#relationIndex").val(index);
    $("#addRelationRoom").dialog({
        title: '添加关联房',
        top: getTop(500),
        left: getLeft(1000),
        width: 1000,
        height: 500,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#addRelationRoom input").val('');
            $("#addRelationRoom select").empty();
            $('#addRelationRoomDg').datagrid('loadData', []);
            $('#existingRelationRoomDg').datagrid('loadData', []);
        }
    });

    var row = $('#centralizedApartmentRuleDg2').datagrid('getRows');
    $("#searchCommunity2").append("<option value = ''></option>");
    $("#searchBuilding2").append("<option value = ''></option>");
    $("#searchFloorNumPrefix").append("<option value = ''></option>");
    $("#searchRoomNumPrefix").append("<option value = ''></option>");
    for (var i in row) {
        $("#searchCommunity2").append("<option value = '" + row[i].community + "'>" + row[i].community + "</option>");
        $("#searchBuilding2").append("<option value = '" + row[i].building + "'>" + row[i].building + "</option>");
        if (row[i].floorNumPrefix != null && row[i].floorNumPrefix != '') {
            $("#searchFloorNumPrefix").append("<option value = '" + row[i].floorNumPrefix + "'>" + row[i].floorNumPrefix + "</option>");
        }
        if (row[i].roomNumPrefix != null && row[i].roomNumPrefix != '') {
            $("#searchRoomNumPrefix").append("<option value = '" + row[i].roomNumPrefix + "'>" + row[i].roomNumPrefix + "</option>");
        }
    }
    queryCentralizedApartmentRoom();
    var parameter = $('#centralizedApartmentParameterDg2').datagrid('getRows');
    var data = [];
    if (parameter[index].relationRoom) {
        data = parameter[index].relationRoom;
    }
    $('#existingRelationRoomDg').datagrid('loadData', data);
    $("#addRelationRoom").dialog('open');

}

//打开设置成本价窗口
function costPriceWindow(index, type) {
    $("#costPriceIndex").val(index);
    $("#addCostPriceDlg").dialog({
        title: '设置成本价',
        top: getTop(200),
        left: getLeft(500),
        width: 500,
        height: 250,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
        }
    });

    //获取签约时间
    var begin = new Date($('#addHsBegin').val());
    var end = new Date($('#addHsEnd').val());
    var date = new Date(begin);
    date.setDate(date.getDate() - 1);
    var year = 0;//合同期限
    var isWholeYear = 1;//1表示整年，0表示非整年
    while (date < end) {
        year++;
        date.setFullYear(date.getFullYear() + 1);
    }
    if (date.getTime() != end.getTime()) {
        isWholeYear = 0;
    }
    var beginTime = $("#addHsBegin").val();

    $('#addCostPriceDiv').empty();
    for (var i = 1; i <= year; i++) {
        $('#addCostPriceDiv').append(
            '<div style="margin:5px 0 0 0;"> ' +
            '<lable style="display:inline-block;width:90px;"><span class="require">*</span>第' + i + '年租金：</lable> ' +
            '<input class="updateCostPrice"  id="updateCostPriceId' + i + '" style="width:80px;" clear="clear" require="require">元/月 ' +
            '<a class="easyui-linkbutton copy' + i + '" onclick="copyHolidaySum2()">往下复用</a>' +
            '</div> '
        );
        if (year == 1 || i > 1) {
            $('.copy' + i).remove();
        }
        if (type == 1) {
            $('#doAddCostPrice').show();
            $('#doUpdataCostPrice').hide();
            //将设置好的成本价赋值给窗口
            var row = $("#centralizedApartmentParameterDg2").datagrid("getRows");
            var costPriceVal = row[index].costPriceVal;
            if (costPriceVal != undefined) {
                $('#updateCostPriceId' + i).val(costPriceVal.split(',')[i-1]);
            }
        } else if (type == 2) {
            $('#doUpdataCostPrice').show();
            $('#doAddCostPrice').hide();
            //将设置好的成本价赋值给窗口
            var row = $("#centralizedApartmentRoomDg2").datagrid("getRows");
            var jctCostPriceVal = row[index].jctCostPriceVal;
            if (jctCostPriceVal != undefined) {
                $('#updateCostPriceId' + i).val(jctCostPriceVal.split(',')[i-1]);
            }
        }
    }
    $.parser.parse($('#addCostPriceDiv'));
    $("#addCostPriceDlg").dialog('open');
}

//子房设置合同期内成本价往下复用
function copyHolidaySum2() {
    $('.updateCostPrice').val($('.updateCostPrice:first').val());
}

//子房设置合同期内成本价验证
function validateContract2(t) {
    var begin = new Date($('#addHsBegin').val());//合约开始
    var end = new Date($('#addHsEnd').val());//合约结束
    var date = new Date(begin);
    date.setDate(date.getDate() - 1);
    var isWholeYear = 1;//1表示整年，0表示非整年
    while (date < end) {
        date.setFullYear(date.getFullYear() + 1);
    }
    if (date.getTime() != end.getTime()) {
        isWholeYear = 0;
    }
    var settingArrs = $('#addCostPrice input');//年前，后免租期，租金
    var priceArrs = [];
    //settingArrs.length 是#priceLadder中所有input的个数
    for (var i = 0; i < settingArrs.length; i++) {
        if (settingArrs[i].className.indexOf('updateCostPrice') > -1) {
            //获取租金阶梯价的input
            priceArrs.push(settingArrs[i]);
        }
    }
    for (var i = 0; i < priceArrs.length; i++) {
        if (priceArrs[i].value == '') {
            if (t == 0) {
                myTips('第' + (parseInt(i) + 1) + '年租金设置错误！');
            }
            if (t == 1) {
                $("#settingNoTips").html('第' + (parseInt(i) + 1) + '年租金设置错误！');
            }
            return false;
        }
    }
    var i = 0;
    var updateCostPriceArray = new Array();
    $(".updateCostPrice").each(function () {
        updateCostPriceArray[i] = parseFloat($(this).val());
        i++;
    });
    var updateCostPriceLadder = updateCostPriceArray.join(",");
    $(".jrlHsCostPrice").val(updateCostPriceLadder);//添加子房成本价格
    return true;
}

//保存成本价格设置
function doAddCostPrice() {
    var reType = validateContract2(0);
    var index = $("#costPriceIndex").val();
    var jrlHsCostPrice = $('.jrlHsCostPrice').val();
    var row = $("#centralizedApartmentParameterDg2").datagrid("getRows");
    row[index].costPriceVal = jrlHsCostPrice;
    $('#centralizedApartmentParameterDg2').datagrid('loadData', row);
    if (reType!= false) {
        $('#addCostPriceDlg').dialog('close');
    }
}

//修改成本价格设置
function doUpdataCostPrice() {
    var reType = validateContract2(0);
    if (reType !=false) {
        var index = $('#costPriceIndex').val();
        var row = $("#centralizedApartmentRoomDg2").datagrid("getRows");
        var jrlHsCostPrice = $('.jrlHsCostPrice').val();
        var jsonArray = [];
        jsonArray.push({
            jctCostPriceVal: jrlHsCostPrice,
            identifying: row[index].identifying,
            id: row[index].id,
        });
        var splitJson = JSON.stringify(jsonArray);
        $.post("../updateCentralized.action", {splitJson: splitJson}, function (data) {
            if (data.code < 0) {
                myTips(data.msg, "error");
                return;
            }
            queryCentralized();
            $('#addCostPriceDlg').dialog('close');
        });
    }
}

//查找预生成集中房
function queryCentralizedApartmentRoom() {
    var community = $("#searchCommunity2").val();
    var building = $("#searchBuilding2").val();
    var floor = $("#searchFloor2").val();
    var doorplateno = $("#searchDoorplateno2").val();//房间号,不是门牌号
    var roomNumPrefix = $("#searchRoomNumPrefix").val();
    var floorNumPrefix = $("#searchFloorNumPrefix").val();
    $.post("../selectCentralized.action", {
        identifying: identifying,
        community: community,
        building: building,
        floor: floor,
        roomNumber: doorplateno,
        roomNumPrefix: roomNumPrefix,
        floorNumPrefix: floorNumPrefix,
    }, function (data) {
        if (data.code < 0) {
            $('#addRelationRoomDg').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
            return;
        }
        data = data.body;

        var rows = $('#existingRelationRoomDg').datagrid("getRows");
        for (var i in rows) {
            for (var j in data) {
                if (rows[i].id == data[j].id) {
                    data.splice(j, 1);
                    j--;
                }
            }
        }
        var parameter = $('#centralizedApartmentParameterDg2').datagrid('getRows');
        var data1 = [];
        for (var i in parameter) {
            if (parameter[i].relationRoom) {
                data1 = parameter[i].relationRoom;
                for (var j in data1) {
                    for (var k in data) {
                        if (data1[j].id == data[k].id) {
                            data.splice(k, 1);
                            k--;
                        }
                    }
                }
            }
        }
        $('#addRelationRoomDg').datagrid('loadData', data);
    });

}

//执行保存关联房间
function doAddRelationRoom() {
    var index = $("#relationIndex").val();
    var rows = $("#existingRelationRoomDg").datagrid("getRows");
    var row = $("#centralizedApartmentParameterDg2").datagrid("getRows");

    row[index].relationRoom = rows;
    $('#centralizedApartmentParameterDg2').datagrid('loadData', row);
    $('#addRelationRoom').dialog('close');
}

//添加关联
function addRelation() {
    var row = $("#addRelationRoomDg").datagrid("getChecked");
    if (row.length == 0) {
        myTips("请选择要关联的房", "error");
        return;
    }
    var rows = $('#existingRelationRoomDg').datagrid("getRows");
    for (var i in rows) {
        for (var j in row) {
            if (rows[i].id == row[j].id) {
                $.messager.alert('Warning', row[j].community + "(小区 )" + row[j].building + "(栋/单元) " + row[j].floor + "(层) " + row[j].roomNumber + "(房间号) " + "  " + "已关联，请勿重复关联！");
                return;
            }
        }
    }
    var parameter = $('#centralizedApartmentParameterDg2').datagrid('getRows');
    var data = [];
    for (var i in parameter) {
        if (parameter[i].relationRoom) {
            data = parameter[i].relationRoom;
            for (var j in data) {
                for (var k in row) {
                    if (data[j].id == row[k].id) {
                        $.messager.alert('Warning', row[k].community + "(小区) " + row[k].building + "(栋/单元) " + row[k].floor + "(层) " + row[k].roomNumber + "(房间号) " + "  " + "已关联其它规则，请勿重复关联！");
                        return;
                    }
                }
            }
        }
    }
    for (var i in row) {
        $("#existingRelationRoomDg").datagrid('appendRow', row[i]);
        var index = $("#addRelationRoomDg").datagrid("getRowIndex", row[i]);
        $("#addRelationRoomDg").datagrid('deleteRow', index);
    }
    $("#addRelationRoomDg").datagrid('clearChecked');
}

//删除关联的房
function removeRelation() {
    var row = $("#existingRelationRoomDg").datagrid("getChecked");
    if (row.length == 0) {
        myTips("请选择要取消关联的房", "error");
        return;
    }
    for (var i in row) {
        var index = $("#existingRelationRoomDg").datagrid("getRowIndex", row[i]);
        $("#existingRelationRoomDg").datagrid('deleteRow', index);
        $("#addRelationRoomDg").datagrid('appendRow', row[i]);
    }
    $("#existingRelationRoomDg").datagrid('clearChecked');
}

function oneToManyAddTrusteeship() {
    var addHsHouseType = $('#addHsHouseType').val();
    if (addHsHouseType == '') {
        myTips("请选择房源", "error");
        return;
    }
    var checkFlag = 0;
    $('.addHsStep1 .addHsStep2 [require="require"]').each(function () {
        if ($(this).val() == '') {
            $(this).css('border', '1px solid red');
            checkFlag++;
        } else {
            $(this).css('border', '1px solid #a9a9a9');
        }
    });
    if (checkFlag != 0) {
        myTips("有选项未填!", "error");
        return;
    }
    if (_contractNums == 1) {
        if (_contractNumsArry.length == 0) {
            $('#contractNum').css("border", "1px solid red");
            myTips("合同编号未填写");
            return;
        } else {
            $('#contractNum').css("border", "1px solid #A9A9A9");
        }
    }

    //字典
    var addHouseDicId = $("#addHsHouseDictId").val();

    // 地址
    var addHouseCoding;
    var addCity;
    var addDistrict;
    var addZone;
    var addStreet;
    var addBuildingName;
    var addAddBuilding;
    var addAddDoorplateno;

    if (addHsHouseType == 1) {//有资料房
        addHouseCoding = $("#addHsHouseId").val();
        addCity = $("#addHsDlg .addCity").val();
        addDistrict = $("#addHsDlg .addDistrict").val();
        addZone = $("#addHsDlg .addZone").val();
        addStreet = $("#addHsDlg .addStreet").val();
        addBuildingName = $("#addHsDlg .addCommunity").val();
        addAddBuilding = $("#addHsDlg .addBuilding").val();
        addAddDoorplateno = $("#addHsDlg .addDoorplateno").val();
        //addHsState=$("#addHsDlg ").val();
    } else {//无资料房
        addHouseCoding = '';
        addCity = $("#addNoTrusteeshipCity").find("option:selected").text();
        addDistrict = $("#addNoTrusteeshipDistrict").find("option:selected").text();
        addZone = $("#addNoTrusteeshipZone").val();
        addStreet = $("#addNoTrusteeshipStreet").val();
        addBuildingName = $("#addNoTrusteeshipBuildingName").find("option:selected").text();
        if (addBuildingName == '') {

            myTips('请选择楼盘', 'error');
            return;
        } else {
            $("#buildingName").css("border", "1px solid #A9A9A9");
        }
        addAddBuilding = $("#inputSelect").val();
        addAddDoorplateno = $(".add_saveHouse_addDoorplateno2").val();
        if (!validateDoorno()) {
            myTips('门牌号不符合规则', 'error');
            return;
        }
    }
    if (addCity == '' || addDistrict == '' || addBuildingName == '' || addAddBuilding == '' || addAddDoorplateno == '') {
        myTips('房屋地址填写不完整！', 'error');
        return;
    }

    // 合同
    var addSourceBegin = $('#addHsBegin').val();
    var addEnd = $('#addHsEnd').val();
    var term = getYearMonthDay(addSourceBegin, addEnd);
    var addSourceTerm = term[0] + '年' + term[1] + '月' + term[2] + '日';
    var addSigned = $('#addHsSigned').val();
    var addDeposit = $('#addHsDeposit').val();
    var addContractType = $('#addHsContractType').find("option:selected").text();
    var addPaymentType = $('#addHsPaymentType').find("option:selected").text();
    var addFollowUserId = $('#addHsSalesmanGetUserId').val();
    var addhsHouseNote = $('#addHsHouseNote').val();
    var hsManagerUserId = $("#addHsManageGetUserId").val();
    var hsDepartment = $("#addHsManageGetUserDetId").val();
    var hsStorefront = $("#addHsManageGetUserStoreId").val();
    var inAdvancePay = $("#addHsInAdvancePay").val();
    var jrlRentFreeDays = $("#addHsHoliday").val();
    var jrlPaymentMethod = $("#addHsPaymentType").find("option:selected").text();
    var hsDecorationHoliday = $("#addHsFreeDaysDecoration").val();
    // 业主
    var landlordName = $("#addHsLandlordName").val();
    var landlordPhone = $("#addHsLandlordPhoneNum").val();
    var landlordIdcard = $("#addHsLandlordIdcard").val();
    var laSecondContacts = $("#addHsContacts").val();
    var laSecondPhone = $("#addHsContactsPhone").val();
    var hsBankType = $("#addHsBankType").find("option:selected").text();
    var hsBankNum = $("#addHsBankNum").val();
    var hsBankName = $("#addHsBankName").val();
    var popNameRemark = $('#addHrRenterNameRemark').val();
    //阶梯价及免租期
    var jrlPriceLadder = $(".jrlPriceLadder").val();
    var jrlRentFreeSegment = $(".jrlRentFreeSegment").val();
    // 合约相关
    if (_contractNumsArry.length > 0) {
        for (var i in _contractNumsArry) {
            _contractNumsArry[i].jcdHouseAddress = addBuildingName + " " + addAddBuilding + " " + addAddDoorplateno;
            _contractNumsArry[i].adminUser = addFollowUserId;
        }
    }
    var jrlRenewalCoding = JSON.stringify(_contractNumsArry);
    if (_contractNums != 1) {
        if (jrlRenewalCoding == "[]") {
            jrlRenewalCoding = "";
        }
    }
    var jcdIdjosn = jrlRenewalCoding;
    var pgbData = $('#preGeneratingBillTable').datagrid('getRows');
    var notRentingJson = JSON.stringify(pgbData);

    var rows = $('#centralizedApartmentRoomDg2').datagrid('getRows');
    console.log("aaaa:" + rows)
    if (rows.length == 0) {
        myTips('请添加房间', 'error');
        return;
    }
    var jsonArray = [];
    for (var i = 0; i < rows.length; i++) {
        jsonArray.push({
            hsAddCommunity: rows[i].community,
            hsAddBuilding: rows[i].building,
            hsAddDoorplateno: rows[i].doorplateno,
            hsSectionType: rows[i].sectionType,
            hsHouseDirection: rows[i].direction,
            hsHouseOwner: rows[i].state,
            hsHouseSquare: rows[i].square,
            hsGuidePrice: rows[i].guidePrice,
            hsInPrice: rows[i].costPrice,
            hsOvaryCostPrice: rows[i].jctCostPriceVal,
        });
    }
    var splitJson = JSON.stringify(jsonArray);

    showLoading();
    $.post("../oneToManyAddTrusteeship.action", {
        addHsHouseType: addHsHouseType,
        //添加未租部分 数据
        hsHouseId: addHouseCoding,
        hsAddCity: addCity,
        hsAddDistrict: addDistrict,
        hsAddZone: addZone,
        hsAddStreet: addStreet,
        hsAddCommunity: addBuildingName,
        hsHouseDictId: addHouseDicId,
        hsAddBuilding: addAddBuilding,
        hsAddDoorplateno: addAddDoorplateno,

        hsBeginTime: addSourceBegin,
        hsTheTerm: addSourceTerm,
        hsEndTime: addEnd,
        hsHouseDeposit: addDeposit,
        hsPaymentType: addPaymentType,
        hsUserId: _loginUserId,
        hsAdminUserId: addFollowUserId,
        hsHouseNote: addhsHouseNote,
        hsStorefront: hsStorefront,
        hsDepartment: hsDepartment,
        hsBankType: hsBankType,
        hsBankNum: hsBankNum,
        hsBankName: hsBankName,
        hsManagerUserId: hsManagerUserId,
        hsDecorationHoliday: hsDecorationHoliday,
        //新增业主部分 数据
        laPopTelephone: landlordPhone,
        laPopName: landlordName,
        laPopIdcard: landlordIdcard,
        laSecondContacts: laSecondContacts,
        laSecondPhone: laSecondPhone,
        laDepartment: _loginDepartment,
        laStorefront: _loginStore,
        laUserId: _loginUserId,
        popNameRemark: popNameRemark,
        //新增未租合约部分 数据
        jrlSignedTime: addSigned,
        jrlBeginTime: addSourceBegin,
        jrlEndTime: addEnd,
        jrlUserId: _loginUserId,
        jrlDepartment: _loginDepartment,
        jrlStorefront: _loginStore,
        jrlContractType: addContractType,
        jrlTheTerm: addSourceTerm,
        jrlInAdvancePay: inAdvancePay,
        jrlRentFreeDays: jrlRentFreeDays,
        jrlPaymentMethod: jrlPaymentMethod,
        jrlRentFreeSegment: jrlRentFreeSegment,
        jrlPriceLadder: jrlPriceLadder,
        jrlRenewalCoding: jrlRenewalCoding,
        adminUser: addFollowUserId,
        jcdIdjosn: jcdIdjosn,
        notRentingJson: notRentingJson,
        //业绩受益人部分
        //jsonArray           	: assJson,
        att: $("#att").val(),
        splitJson: splitJson,
    }, function (data) {
        isSave = true;
        if (data.code < 0) {
            if (data.code < 0) {
                myTips(data.msg, "error");
            }
            hideLoading();
            return;
        }
        parent.queryTrusteeship(_pageNum[0], 0);
        myTips('添加成功', 'success');
        hideLoading();
        setTimeout(function () {
            parent.$('#addHomeDlg').dialog('close');
        }, 1000);
    });
}

