$(function () {
    for (var i in _acountType) {
        $('.add_faPaymentType').append("<option value='" + i + "'>" + _acountType[i] + "</option>");
        $('#moveInfaType').append("<option value='" + _acountType[i] + "'>" + _acountType[i] + "</option>");
        $('#searchFaPaymentType').append("<option value='" + _acountType[i] + "'>" + _acountType[i] + "</option>");

    }
    for (var i in _acountState) {
        $('.add_faState').append("<option value='" + i + "'>" + _acountState[i] + "</option>");
        $('#searchFaState').append("<option value='" + i + "'>" + _acountState[i] + "</option>");
    }
    queryAccount(_pageNum[0], 0);

    $('#paymentInfoTable').datagrid({
        // 表格行单击事件
        onClickRow: function (rowIndex, rowData) {
            _accountSumIndex = rowIndex;
        },
        // 表格行双击事件
        onDblClickRow: function (rowIndex, rowData) {
            if (rowData) {
                readonlyDataToDb("readonlyPaymentInfoTable", "paymentInfoTable");
            }
        }
    });
    $('#accountDg').datagrid({
        // 表格行单击事件
        onClickRow: function (rowIndex, rowData) {
            _accountSumIndex = rowIndex;
        },
        // 表格行双击事件
        onDblClickRow: function (rowIndex, rowData) {
            $("#accountDbDlg").dialog({
                title: '相关收支详情',
                top: getTop(525),
                left: getLeft(1100),
                width: 1100,
                height: 525,
                closed: true,
                cache: false,
                modal: true,
                onClose: function () {

                }
            });
            $('#searchBillingDateFrom1').val("");
            $('#searchBillingDateTo1').val("");
            var row = $('#accountDg').datagrid('getSelected');
            var startTime = $('#searchBillingDateFrom1').val();
            var endTime = $('#searchBillingDateTo1').val();
            $.post("../selectFinancialTotal.action", {
                faId: row.faId,
                billingDateFrom: startTime,
                billingDateTo: endTime,
            }, function (data) {
                if (data.code < 0 || data.body == '' || data.body.length == 0) {
                    $("#summary").html(0);
                    $("#income").html(0);
                    $("#expenditure").html(0);
                    $("#strike").html(0);
                    //$("#startTime").html(startTime);
                    $("#endTime").html(endTime);
                } else {
                    $("#summary").html(data.body[0].financialSummary);
                    $("#income").html(data.body[0].income);
                    $("#expenditure").html(data.body[0].expenditure);
                    $("#strike").html(data.body[0].strike);
                    //$("#startTime").html(startTime);
                    $("#endTime").html(endTime);
                }
            }, "json");
            queryFinancial1(row, 1, 0);
            $("#accountDbDlg").dialog("open");
        }
    });
    $('#allCountSummary').html(0);

    $('#accountDg').datagrid({

        onCheck: function (rowIndex, rowData) {
            sum = mySum(sum,rowData.faTheBalanceOf);
            console.log(typeof rowData.faTheBalanceOf);
            $('#allCountSummary').html(sum);
        },
        onUncheck: function (rowIndex, rowData) {
            sum = mySub(sum,rowData.faTheBalanceOf);

            $('#allCountSummary').html(sum);
        },
        onCheckAll: function (rows) {
            sum = 0.00;
            for (var i=0;i< rows.length;i++) {
                sum = mySum(sum,rows[i].faTheBalanceOf);
            }

            $('#allCountSummary').html(sum);
        },
        onUncheckAll: function (rows) {
            sum = 0.00;
            $('#allCountSummary').html(0);
        }
    });
});

// 账户信息表导入信息
function queryAccount(page, type) {
    var startNum = (parseInt(page) - 1) * 15;
    var endNum = 15;
    var billingDateFrom = $("#searchBillingDateFrom").val();
    var billingDateTo = $("#searchBillingDateTo").val();
    var faState = $("#searchFaState").find("option:selected").text();
    var faPaymentType = $("#searchFaPaymentType").find("option:selected").text();
    var faRank = $("#searchPriority").find("option:selected").text();
    $.post("../selectFinancialSummary.action", {
        startNum: startNum,
        endNum: endNum,
        billingDateFrom: billingDateFrom,
        billingDateTo: billingDateTo,
        faState: faState,
        faPaymentType: faPaymentType,
        faRank: faRank,
    }, function (data) {
        if (data.code < 0) {
            sourcePage(0, 0, 0);
            $('#accountDg').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
            $('#paymentInfoTable').datagrid("loadData", []);
            sourcePage(0, 0, 1);
        } else {
            data = data.body;
            if (page == 1 && type == 0) {
                sourcePage(data[0].totalNum, page, 0);
            }
            //queryFinancial(data[_accountSumIndex],1,0);
            $("#accountDg").datagrid("loadData", data);
            $('#accountDg').datagrid("selectRow", _accountSumIndex);
        }
    }, "json");
    //统计全部账户余额
    $.post("../selectAllCountBalance.action", {
        faState: faState,
        faPaymentType: faPaymentType,
        faRank: faRank,
    }, function (data) {
        console.log(data.body);
        if (data.code < 0) {
            $('#allCountSummary').html('0.00');
        } else {
            $('#allCountSummary').html(data.body[0].faTheBalanceOf);
        }
    });
}

function sourcePage(totalNum, page, type) {
    var pageNum = Math.ceil(totalNum / 10);
    if (type == 0) {
        pageNum = Math.ceil(totalNum / 15);
        $("#accountPage").remove();
        $("#accountPageDiv")
            .append(
                "<div class='tcdPageCode' id='accountPage' style='text-align:center;'></div>");
        $("#accountPage").createPage({
            onePageNums: 15,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    _pageNum[0] = p;
                    _accountSumIndex = 0;
                    queryAccount(p, 1);
                }
            }
        });
    }
    if (type == 1) {
        pageNum = Math.ceil(totalNum / 15);
        $("#financialDetailPage").remove();
        $("#financialDetailPageDiv")
            .append(
                "<div class='tcdPageCode' id='financialDetailPage' style='text-align:center;'></div>");
        $("#financialDetailPage").createPage({
            onePageNums: 15,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    var row = $('#accountDg').datagrid('getSelected');
                    if (row) {
                        queryFinancial1(row, p, 1);
                    } else {
                        row = $('#accountDg').datagrid('getData').rows[_accountSumIndex];
                        queryFinancial1(row, p, 1);
                    }
                }
            }
        });
    }
}

function formatDate(date) {
    var year = date.getFullYear();       //年
    var month = date.getMonth() + 1;     //月
    var day = date.getDate();            //日

    var fmd = year + "-";

    if (month < 10) {
        fmd += "0";
    }
    fmd += month + "-";

    if (day < 10) {
        fmd += "0";
    }
    fmd += day;

    return (fmd);
}

function within1weeks() {
    var date = new Date();
    var billingDateTo = formatDate(date);
    date.setDate(date.getDate() - 6);
    var billingDateFrom = formatDate(date);
    $("#searchBillingDateFrom").val(billingDateFrom);
    $("#searchBillingDateTo").val(billingDateTo);
    queryAccount(_pageNum[0], 0);
    $('#oneWeek').addClass("choose-cur");
    $('#oneMonth').removeClass("choose-cur");
    $('#threeMonths').removeClass("choose-cur");
}

function within1months() {
    var date = new Date();
    var billingDateTo = formatDate(date);
    date.setMonth(date.getMonth() - 1);
    var billingDateFrom = formatDate(date);
    $("#searchBillingDateFrom").val(billingDateFrom);
    $("#searchBillingDateTo").val(billingDateTo);
    queryAccount(_pageNum[0], 0);
    $('#oneWeek').removeClass("choose-cur");
    $('#oneMonth').addClass("choose-cur");
    $('#threeMonths').removeClass("choose-cur");
}

function within3months() {
    var date = new Date();
    var billingDateTo = formatDate(date);
    date.setMonth(date.getMonth() - 3);
    var billingDateFrom = formatDate(date);
    $("#searchBillingDateFrom").val(billingDateFrom);
    $("#searchBillingDateTo").val(billingDateTo);
    queryAccount(_pageNum[0], 0);
    $('#oneWeek').removeClass("choose-cur");
    $('#oneMonth').removeClass("choose-cur");
    $('#threeMonths').addClass("choose-cur");
}

function query() {
    queryAccount(_pageNum[0], 0);
    $('#oneWeek').removeClass("choose-cur");
    $('#oneMonth').removeClass("choose-cur");
    $('#threeMonths').removeClass("choose-cur");
}

//收支记录表导入信息
function queryFinancial1(row, page, type) {
    var row = $('#accountDg').datagrid('getSelected');
    var startNum = (parseInt(page) - 1) * 15;
    var endNum = 15;
    var startTime = $('#searchBillingDateFrom1').val();
    var endTime = $('#searchBillingDateTo1').val();
    $("#startTime").html($("#searchBillingDateFrom").val());
    $("#endTime").html($("#searchBillingDateTo").val());
    var jfNatureOfThe = $('#searchNature').find("option:selected").text();
    $.post("../allNormalAndVirtualPayments.action", {
        startNum: startNum,
        endNum: endNum,
        startTime: startTime,
        endTime: endTime,
        jfAccountId: row.faId,
        jfNatureOfThe: jfNatureOfThe,
        //jfAuditState:'已复核',
    }, function (data) {
        if (data.code < 0) {
            sourcePage(0, 0, 1);
            $('#paymentInfoTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        } else {
            data = data.body;

            if (page == 1 && type == 0) {
                sourcePage(data[0].totalNum, page, 1);
            }
            $("#paymentInfoTable").datagrid("loadData", data);
        }
    }, "json");
}

//打开添加账户对话框
function addAccount() {
    $("#addAccountDlg").dialog({
        title: '添加账户',
        top: getTop(350),
        left: getLeft(330),
        width: 330,
        height: 350,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#updateAccountSave').show();
            $('#addAccountSave').hide();
            $("#addAccountDlg input").val('');
            $("#addAccountDlg select").val('');
            $("#addAccountDlg textarea").val('');
            $('#addAccountDlg [clear="clear"]').val('');
            $('#addAccountDlg [clear="clear"]').html('');
            $('#addAccountDlg [require="require"]').css('border', '1px solid #a9a9a9');
        }
    });
    $(".add_faRank").val(5);
    $("#add_faTheInitialAmount").removeAttr('disabled', 'disabled');
    $('#updateButtionDiv').hide();
    $('#updateAccountSave').hide();
    $('#addAccountSave').show();
    $('#add_faTheInitialAmount').val(0);
    $("#addAccountDlg").dialog('open');
}

// 执行添加账户
function doAddAccount() {
    var faPaymentType = $('.add_faPaymentType').find("option:selected").text();
    var faUserName = $('.add_faUserName').val();
    var faBelonging = $('.add_faBelonging').val();
    var faAccount = $('.add_faAccount').val();
    var faDescribe = $('.add_faDescribe').val();
    var faTheInitialAmount = $('#add_faTheInitialAmount').val();
    var faTheBalanceOf = accAdd(faTheInitialAmount, 0);
    var faRank = $('.add_faRank').find("option:selected").text();
    var checkFlag = 0;
    $("#addAccountDlg input[needs=1]").each(function () {
        if ($(this).val() == '' || $(this).val() == '') {
            $(this).css("border", "1px solid red");
            checkFlag++;
        } else {
            $(this).css("border", "1px solid #A9A9A9");
        }
    });
    $("#addAccountDlg select[needs=1]").each(function () {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).css("border", "1px solid red");
            checkFlag++;
        } else {
            $(this).css("border", "1px solid #A9A9A9");
        }
    });
    if (checkFlag != 0) {
        myTips("有必填项未填写!", "error");
        return;
    }

    $.post("../insertFinancialAccount.action", {
        faPaymentType: faPaymentType,
        faUserName: faUserName,
        faBelonging: faBelonging,
        faAccount: faAccount,
        faDescribe: faDescribe,
        faTheInitialAmount: faTheInitialAmount,
        faTheBalanceOf: faTheBalanceOf,
        faRank: faRank,
    }, function (data) {
        if (data.code < 0) {
            myTips(data.msg, "error");
            return;
        }
        queryAccount(1, 0);
        myTips("添加成功", "success");
        $("#addAccountDlg").dialog('close');
    });
}

// 打开修改账户对话框
function updateAccount() {
    $("#addAccountDlg").dialog({
        title: '修改账户',
        top: getTop(290),
        left: getLeft(330),
        width: 330,
        height: 400,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $('#updateAccountSave').hide();
            $('#addAccountSave').show();
            $("#addAccountDlg input").val('');
            $("#addAccountDlg select").val('');
            $("#addAccountDlg textarea").val('');
            $('#add_faState').hide();
            $('#add_faTheBalanceOf').hide();
        }
    });
    var row = $('#accountDg').datagrid('getSelected');
    $('.add_faId').val(row.faId);
    $('.add_faUserName').val(row.faUserName);
    $('.add_faBelonging').val(row.faBelonging);
    $('.add_faAccount').val(row.faAccount);
    $('.add_faDescribe').val(row.faDescribe);
    $('#add_faTheInitialAmount').val(row.faTheInitialAmount);
    $('.add_faTheBalanceOf').val(row.faTheBalanceOf.toFixed(2));
    $('.add_faRank').val(row.faRank);
    for (var i in _acountType) {
        if (_acountType[i] == row.faPaymentType) {
            $('.add_faPaymentType').val(i);
        }
    }
    for (var i in _acountState) {
        if (_acountState[i] == row.faState) {
            $('.add_faState').val(i);
        }
    }
    $("#add_faTheInitialAmount").attr('disabled', 'disabled');
    $('#updateButtionDiv').show();
    $('#add_faState').show();
    $('#add_faTheBalanceOf').show();
    $('#updateAccountSave').show();
    $('#addAccountSave').hide();
    $("#addAccountDlg").dialog('open');
}

// 执行修改账户
function doUpdateAccount() {
    var faId = $('.add_faId').val();
    var faPaymentType = $('.add_faPaymentType').find("option:selected").text();
    var faUserName = $('.add_faUserName').val();
    var faBelonging = $('.add_faBelonging').val();
    var faAccount = $('.add_faAccount').val();
    var faDescribe = $('.add_faDescribe').val();
    var faState = $('.add_faState').find("option:selected").text();
    var faTheInitialAmount = $('#add_faTheInitialAmount').val();
    var faRank = $('.add_faRank').find("option:selected").text();
    $.post("../updataFinancialAccount.action", {
        faId: faId,
        faPaymentType: faPaymentType,
        faUserName: faUserName,
        faBelonging: faBelonging,
        faAccount: faAccount,
        faDescribe: faDescribe,
        faState: faState,
        faTheInitialAmount: faTheInitialAmount,
        faRank: faRank,
    }, function (data) {
        if (data.code < 0) {
            myTips(data.msg, "error");
            return;
        }
        $.post("../uptheBalanceOf.action", {
            faId: faId,
            faTheInitialAmount: faTheInitialAmount,
        }, function (acountData) {
            if (acountData.code < 0) {
                myTips(acountData.msg, "error");
                return;
            } else {
                queryAccount(_pageNum[0], 0);
                myTips("修改成功", "success");
                $("#addAccountDlg").dialog('close');
            }
        });
    });
}

function reload() {
    showLoading();
    $.post("../statisticsAllAccountBalance.action", function (data) {
        hideLoading();
        if (data < 0 || data == '') {
            myTips("统计失败", "error");
            return;
        }
        myTips("统计成功", "success");
        query();
    });
}

function moveAccount() {
    var row = $('#accountDg').datagrid('getSelected');
    if (!row) {
        myTips("请选择一个账户进行资金调配！", "error");
        return;
    }
    if (row.faState == '注销') {
        myTips("此账号已注销，无法进行资金调配！", "error");
        return;
    }
    if (row.faState == '异常') {
        myTips("此账号状态异常，无法进行资金调配！", "error");
        return;
    }

    $("#moveAccountDlg").dialog({
        title: "资金调配",
        top: getTop(330),
        left: getLeft(700),
        width: 700,
        height: 330,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#moveAccountDlg input").val('');
            $("#moveAccountDlg select").val('');
        },
    });
    $('#moveOutfaId').val(row.faId);
    $('#moveOutfaName').val(row.faUserName);
    $('#moveOutfaBelong').val(row.faBelonging);
    $('#moveOutfaNum').val(row.faAccount);
    $('#moveOutfaMoney').val(row.faTheBalanceOf.toFixed(2));
    $('#moveOutfaType').val(row.faPaymentType);
    $('#moveOutfaChange').html(0.00);
    $('#moveInfaChange').html(0.00);

    $("#moveAccountDlg").dialog('open');
}

function changeMoney() {
    var changeMoney = $('#changeMoney').val();
    $('#moveOutfaChange').html(changeMoney);
    $('#moveInfaChange').html(changeMoney);
}

function getAccountName() {
    var faPaymentType = $('#moveInfaType').val();
    $('#moveInfaName').empty();
    $('#moveInfaNum').val('');
    $('#moveInfaBelong').val('');
    $('#moveInfaId').val('');
    $('#moveInfaMoney').val('');

    if (faPaymentType == '') {
        return;
    }
    $.post("../selectFinancialSummary.action", {
        faPaymentType: faPaymentType,
        faState: '正常',
    }, function (data) {
        $("#moveInfaName").append("<option></option>");
        for (var i in data.body) {
            $("#moveInfaName").append("<option value = '" + data.body[i].faId + "'>" + data.body[i].faUserName + "</option>");
        }
    });
}

function getAccountAll() {
    var faId = $('#moveInfaName').val();
    $('#moveInfaNum').val('');
    $('#moveInfaBelong').val('');
    $('#moveInfaId').val('');
    $('#moveInfaMoney').val('');

    if (faId == '') {
        return;
    }
    $.post("../selectFinancialSummary.action", {
        faId: faId
    }, function (data) {
        $('#moveInfaNum').val(data.body[0].faAccount);
        $('#moveInfaBelong').val(data.body[0].faBelonging);
        $('#moveInfaId').val(data.body[0].faId);
        $('#moveInfaMoney').val(data.body[0].financialSummary);
    });
}

function doMoveAccount() {
    var moveOutfaId = $('#moveOutfaId').val();
    var moveInfaId = $('#moveInfaId').val();
    var moveMoney = $('#changeMoney').val();
    if (moveInfaId == '') {
        myTips("请选择一个转入账户进行资金调配！", "error");
        return;
    }
    var jsonStrArry = '['
        + '{'
        + '"jfAccountingSpecies":"资金调配",'
        + '"jfBigType":"财务类",'
        + '"jfNatureOfThe":"支出",'
        + '"jfClosedWay":"转账",'
        + '"jfAccountId":"' + moveOutfaId + '",'
        + '"jfRenterId":"",'
        + '"jfLandlordId":"",'
        + '"jfIntendedId":"",'
        + '"jfHouse4rentId":"",'
        + '"jfHouse4storeId":"",'
        + '"jfHouseId":"1",'
        + '"jfTheCashierPeople":"' + _loginUserId + '",'
        + '"jfBillingDate":"' + formatTime(getNowFormatDate(), 2) + '",'
        + '"jfHandlers":"' + _loginUserId + '",'
        + '"jfTheReviewer":"",'
        + '"jfFinanReview":"",'
        + '"jfTheOwnershipType":"' + '非成本项目' + '",'
        + '"jfBelongingToTheName":"帐户资金调配",'
        + '"jfAuditState":"未审核",'
        + '"jfSumMoney":"' + moveMoney + '",'
        + '"jfFinanNote":"资金调配。从此账户调出' + moveMoney + '元到账户：' + $("#moveInfaType").find("option:selected").text() + ' ' + $("#moveInfaName").find("option:selected").text() + ' ' + $("#moveInfaNum").val() + ' ' + $("#moveInfaBelong").val() + ' ' + '",'
        + '"department":"' + _loginDepartment + '",'
        + '"storefront":"' + _loginStore + '",'
        + '"jfOperationRecords":"' + getNowFormatDate() + ',' + _loginUserName + '执行帐户资金调配<br>",'
        + '"jfFinancialCoding":"'
        + formatTime(getNowFormatDate(), 3)
        + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
        + Math.floor(Math.random() * 10) + '",'
        + '"jfStartCycle":"' + formatTime(getNowFormatDate(), 2) + '",'
        + '"jfEndCycle":"' + formatTime(getNowFormatDate(), 2) + '",'
        + '"jfAccountingWhy":""'
        + '}'
        + ',{'
        + '"jfAccountingSpecies":"资金调配",'
        + '"jfBigType":"财务类",'
        + '"jfNatureOfThe":"收入",'
        + '"jfClosedWay":"转账",'
        + '"jfAccountId":"' + moveInfaId + '",'
        + '"jfRenterId":"",'
        + '"jfLandlordId":"",'
        + '"jfIntendedId":"",'
        + '"jfHouse4rentId":"",'
        + '"jfHouse4storeId":"",'
        + '"jfHouseId":"1",'
        + '"jfTheCashierPeople":"' + _loginUserId + '",'
        + '"jfBillingDate":"' + formatTime(getNowFormatDate(), 2) + '",'
        + '"jfHandlers":"' + _loginUserId + '",'
        + '"jfTheReviewer":"",'
        + '"jfFinanReview":"",'
        + '"jfTheOwnershipType":"' + '非成本项目' + '",'
        + '"jfBelongingToTheName":"帐户资金调配",'
        + '"jfAuditState":"未审核",'
        + '"jfSumMoney":"' + moveMoney + '",'
        + '"jfFinanNote":"资金调配。从账户：' + $("#moveOutfaType").val() + ' ' + $("#moveOutfaName").val() + ' ' + $("#moveOutfaNum").val() + ' ' + $("#moveOutfaBelong").val() + ' 调入' + moveMoney + '元到此账户' + '",'
        + '"department":"' + _loginDepartment + '",'
        + '"storefront":"' + _loginStore + '",'
        + '"jfOperationRecords":"' + getNowFormatDate() + ',' + _loginUserName + '执行帐户资金调配<br>",'
        + '"jfFinancialCoding":"'
        + formatTime(getNowFormatDate(), 3)
        + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
        + Math.floor(Math.random() * 10) + '",'
        + '"jfStartCycle":"' + formatTime(getNowFormatDate(), 2) + '",'
        + '"jfEndCycle":"' + formatTime(getNowFormatDate(), 2) + '",'
        + '"jfAccountingWhy":""'
        + '}'
        + ']';
    showLoading();
    $.post("../insertFinancialAll.action", {
        jsonArray: jsonStrArry
    }, function (finaData) {
        hideLoading();
        if (finaData.code < 0 || finaData == '') {
            myTips("资金调配失败!", "error");
            return;
        }
        reload();
        $('#moveAccountDlg').dialog('close');
    });
}