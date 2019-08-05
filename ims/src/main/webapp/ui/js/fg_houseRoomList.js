$(function() {
    $('#virtualDataGrid').datagrid({
        onDblClickRow : function(rowIndex, rowData) {
            $('#operationWindow').tabs({
                plain : true,
                fit : true,
                border	: false,
                onSelect : function(title, index) {
                    // 获得点击选项卡的列数，调用表格初始化
                    initTable(title);
                }
            });
            $("#operationWindow").tabs("select", 0);
            doubleClickTheWindow(rowData);
        }
    });

    //智能设备
    $('#deviceInfoTable').datagrid({
        // 表格行单击事件
        onClickRow: function (rowIndex, rowData) {
            if (rowData.devBrandId == 20 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
                $("#deviceControl").attr("onclick","subDevice()");
            }else if (rowData.devBrandId == 23 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
                $("#deviceControl").attr("onclick", "mdElectricBoxDlg()");
            }  else {
                $("#deviceControl").attr("onclick","chooseOperateDlg()");
            }

        },
        onDblClickRow : function(rowIndex, rowData) {
            console.log(rowData)
            if (rowData.devBrandId == 20 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
                subDevice();
            } else if (rowData.devBrandId == 23 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
                mdElectricBoxDlg();
            } else if(rowData.devBrandId == 22 && rowData.devFirstType == 24 && rowData.devSecondType == 33){
                faceControl();
            }else {
                chooseOperateDlg();
            }
        }
    });

    for (var i in _loginCompanyRentDistrict) {
        $('#searchAddDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
    }

    queryHouseRoom(1);
})

//分页统计总条数
function gethouseRoomPageCount(page){
    var pageSize = 20;
    var hsAddDistrict = $('#searchAddDistrict').find("option:selected").text();
    var hsAddCommunity = $('#hsAddCommunity').val();
    var hsAddBuilding = $('#hsAddBuilding').val();
    var hsAddDoorplateno = $('#hsAddDoorplateno').val();
    $.ajax({
        type:'post',
        url:'../queryHouseStore.action',
        data:{
            hsAddDistrict   : hsAddDistrict,
            hsAddCommunity  : hsAddCommunity,
            hsAddBuilding   : hsAddBuilding,
            hsAddDoorplateno: hsAddDoorplateno,
        },
        dataType:'json',
        success: function(data) {
            if (data.code < 0 || data.body[0].totalNum == 0) {
                var countJson = {
                    totalNum: 0,
                };
                getCountData(0, countJson, pageSize, page, "houseRoom", 0);
            } else {
                data = data.body;
                var countJson = {
                    totalNum: data[0].totalNum,
                };
                getCountData(1, countJson, pageSize, page, "houseRoom", 0);
            }
        }
    });
}

//初始化
function initTable(title){
    console.log(title)
    if(title == '智能设备'){//智能设备
        queryOfficeInfo();
    }
}

//房间详细信息
function doubleClickTheWindow(data){
    $('#intelligentEquipment').dialog({
        title : '房间详细信息',
        top : getTop(400),
        left : getLeft(920),
        width : 1020,
        height : 600,
        closed : true,
        cache : false,
        modal : true,
        onBeforeClose : function(){
            $("#operationWindow").tabs("select",0);
        },
        onClose : function() {
            $('#deviceInfoTable').datagrid("loadData", []);
        },
    });
    queryOfficeInfo();
    $('#intelligentEquipment').dialog("open");
}

function queryHouseRoom(page){
    var startNum = (parseInt(page) - 1) * 20;
    var endNum = 20;

    var hsAddDistrict = $('#searchAddDistrict').find("option:selected").text();
    var hsAddCommunity = $('#hsAddCommunity').val();
    var hsAddBuilding = $('#hsAddBuilding').val();
    var hsAddDoorplateno = $('#hsAddDoorplateno').val();
    $.ajax({
        type:'post',
        url:'../queryHouseStore.action',
        data:{
            startNum 		: startNum,
            endNum 			: endNum,
            hsAddDistrict   : hsAddDistrict,
            hsAddCommunity  : hsAddCommunity,
            hsAddBuilding   : hsAddBuilding,
            hsAddDoorplateno: hsAddDoorplateno,
        },
        dataType:'json',
        success: function(data){
            if(data.code < 0){
                // sourcePage(0, 0, 1);
                $('#virtualDataGrid').datagrid({
                    data : [],
                    view : myview,
                    emptyMsg : data.msg
                });
                if(page==1){
                    notCountPage(0, 0 ,"queryHouseRoom","houseRoom");
                }else{
                    notCountPage(page, 0 ,"queryHouseRoom","houseRoom");
                }
            } else {
                data = data.body;
                // if (page == 1) {
                //     sourcePage(data[0].totalNum, page, 0);
                // }
                if(data.length<endNum){
                    notCountPage(page, 2 , "queryHouseRoom","houseRoom");
                }else{
                    notCountPage(page, 1 , "queryHouseRoom","houseRoom");
                }
                for(var i in data){
                    data[i].address = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
                }
                console.log(data)
                $('#virtualDataGrid').datagrid('loadData',data);
            }
        }
    })
}

// 分页操作
function sourcePage(totalNum, page, type) {
    var pageNum = Math.ceil(totalNum / 10);
    if (type == 0) {
        pageNum = Math.ceil(totalNum / 20);
        $("#houseRoomPage").remove();
        $("#houseRoomPageDiv").append("<div class='tcdPageCode' id='houseRoomPage' style='text-align:center;'></div>");
        $("#houseRoomPage").createPage({
            onePageNums: 20,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    _pageNum[0] = p;
                    _indexNum[0] = 0;
                    queryHouseRoom(p);
                }
            }
        });
    }
}

//批量添加
function batchAddHouseRoom() {
    $('#batchAddHouseRoomDlg').dialog({
        title : '批量添加房间',
        top : getTop(610),
        left : getLeft(1052),
        width : 1052,
        height : 610,
        closed : true,
        cache : false,
        modal : true,
        onClose : function(){
            $('#batchAddHouseRoomBill').attr("src","");
        }
    });
    $('#batchAddHouseRoomBill').attr('src','batchAddHouseRoom.jsp');
    $('#batchAddHouseRoomDlg').dialog('open');
}

