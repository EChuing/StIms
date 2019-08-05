<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.zz.po.sys.SysUserExpand" %>
<%SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo");%>
<!DOCTYPE html>
<html lang="zh-cn" style="height:100%;width:100%;overflow:hidden;">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=9;IE=8;chrome=1"/>
    <title>设备预警平台</title>
    <link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.css">
    <link href="./css/tab.css" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

    <link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.SuperSlide.2.1.2.js"></script>
    <script src="js/fg_management2.js"></script>
    <script src="http://pic-static.fangzhizun.com/bootstrap/3.3.7/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous"></script>
    <script src="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table-zh-CN.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
            integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
            crossorigin="anonymous"></script>
    <script src="http://echarts.baidu.com/build/dist/echarts.js"></script>
    <style>
        .tWidth {
            width: 15%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    </style>
    <script type="text/javascript" src="js/vue1.min.js"></script>
    <style>
        p {
            margin: 0;
            padding: 0;
        }


        #clock {
            /*font-family: 'Share Tech Mono', monospace;*/
            color: #ffffff;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            color: #daf6ff;
            text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
        }

        #clock .time {
            letter-spacing: 0.05em;
            font-size: 80px;
            padding: 5px 0;
            font-family: "Conv_Digit";

        }

        #clock .date {
            letter-spacing: 0.1em;
            font-size: 24px;
            font-family: "Conv_Digit";
        }

        #clock .text {
            letter-spacing: 0.1em;
            font-size: 12px;
            padding: 20px 0 0;
        }
    </style>
    <script src="js/config.js"></script>
</head>
<body background="images/bg.jpg" style="height:100%;width:100%;padding:0;margin: 0;">
<div class="headerDivCss" id="returnLogin1"
     style="width:50px;float:right;margin:0 20px 0 0;padding-top:1px;font-size:1px;"
     onclick="window.top.location.href = '../userLogout.action';">
    <input id="loginUserName" type="text" value="<%=user.getSuStaffName()%>" style="display: none">
    <div style="width:30px; position: absolute;    width: 25px; position: absolute;height: 20px;top: 5px;right: 15px;">
        <img style="height:26px;width:26px" src="img/power.png"></img><br>
    </div>
</div>
<audio src="video/warningTone.mp3" id="music" controls="controls" loop="loop" style="display: none;"></audio>
<input id="userInfomation" type="text" style="display: none" value='<%=user%>'>
<div id="total" style="height:100%;width:100%;padding:0;margin-top: 2%;">
    <div id="left" style="width: 20%; height: 100%; float: left;  margin-left: 1%; ">
        <div style="height:100%;width: 100%;">
            <div id="left-top" class="commonDiv" style="width: 100%; height:22%;">
                <div class="headDiv" style="height: 16%;border-block-end: 1px solid #9ED9F6;">实有人数</div>
                <div style="clear: both;"></div>
                <div class="contentDiv" style="height: 80%;">
                    <div id="actualPopNum" class="actualPopNum" style="text-align:center;width: 90%;height: 100%"></div>
                </div>
            </div>
            <div id="left-center" class="commonDiv" style="width: 100%; height: 40%; margin-top: 5%;">
                <div class="headDiv" style="height: 7.5%;border-block-end: 1px solid #9ED9F6;">近期预警信息
                </div>
                <div style="clear:both; height:3%; background:#001221;"></div>
                <div id="contentDivInfofaction" class="contentDiv"
                     style="height: 86%;text-align:left;font-size: 1vw;overflow-y: auto;">
                </div>
            </div>
            <div id="left-buttm" class="commonDiv" style="width: 100%; height: 25%; margin-top:5%; ">
                <div class="headDiv" style="border-block-end: 1px solid #9ED9F6;">主体信息</div>
                <div style="height: 5%; background-color:#001221;"></div>
                <div id="mainstay" class="contentDiv" style="height: 81%;">
                    <div>
                        <div class="commonTitle">项目名称：</div>
                        <div id="projectName" class="commonContent"
                             style="text-align:left"><%=session.getAttribute("systemType")%>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                    <div>
                        <div class="commonTitle">责任企业：</div>
                        <div id="repCompany" class="commonContent"
                             style="text-align:left"><%=session.getAttribute("companyName")%>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                    <div>
                        <div class="commonTitle"> 负 责 人 ：</div>
                        <div id="charge" class="commonContent"
                             style="text-align:left"><%=session.getAttribute("companyContact")%>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                    <div>
                        <div class="commonTitle">联系电话：</div>
                        <div id="chargePhone" class="commonContent"
                             style="text-align:left"><%=session.getAttribute("companyTel")%>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                    <div>
                        <div class="commonTitle">值班人员：</div>
                        <div id="watchman" class="commonContent"
                             style="margin-top: 8%;text-align:left"><%=user.getSuStaffName()%>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                    <div>
                        <div class="commonTitle">值班电话：</div>
                        <div id="watchmanPhone" class="commonContent" style="text-align:left"><%=user.getSuContact()%>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                </div>
            </div>
        </div>
    </div>

    <div id="middle" class="" style="width:54%; height: 100%; float: left; margin-left: 2%;">
        <div id="middle-top" class="commonDiv" style="width: 100%;height:60%;">
            <div class="tab-contain" style="height: 95%;">
                <!-- tab栏 -->
                <ul id="tabs" style="border-block-end: 1px solid #9ED9F6;">
                    <li>
                        <div title="tab1" style="cursor:pointer;width: 100%;height: 100%">近七天预警</div>
                    </li>
                    <li class="current">
                        <div title="tab2" style="cursor:pointer;width: 100%;height: 100%">智慧预警平台</div>
                    </li>
                    <li>
                        <div title="tab3" style="cursor:pointer;width: 100%;height: auto">近30天预警</div>
                    </li>
                </ul>
                <!-- 对应显示内容 -->
                <div id="content" style="height: 100%;width: 100%;">
                    <div id="tab1" class="item" style="width: 98%; height: 92%; margin-left: 1%;">
                        <!-- 这边写第一页的内容 -->
                        <div style="clear: both; height:5%;"></div>
                        <div id="weekEchart"
                             style="height:98%; width: 96%; margin-left: 2%;   border-radius:  20px 20px 20px;"></div>
                    </div>
                    <div id="tab2" class="item show contentDiv" style="height: 92%;">
                        <!-- 这边写第二页的内容 -->
                        <div style="clear: both; height:5%;"></div>
                        <div id="alertDg" class="alertDg1" style="width: 96%; margin-left: 2%; overflow:hidden;">

                        </div>
                    </div>
                    <div id="tab3" class="item" style="width: 98%; height: 92%; margin-left: 1%;">
                        <!-- 这边写第一页的内容 -->
                        <div style="clear: both; height:5%;"></div>
                        <div id="monthEchart"
                             style="height:98%; width: 96%; margin-left: 2%;   border-radius:  20px 20px 20px;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="middle-buttom" class="commonDiv" style="width: 100%; height: 28%; margin-top: 3%;">
            <div class="headDiv" style="height: 11%; background-color: #0C1F38;border-block-end: 1px solid #9ED9F6;">
                实时设备情况
            </div>
            <div style="clear: both; height:5%; background-color: #0C1F38;"></div>
            <div class="contentDiv" style=" height: 84%;
                    width: 100%; background-color: #0C1F38;">
				<div style="width:4%;height:100%; margin-left: 2%; margin-right: 1%; float: left; border: 0px;">
					<button id="left_btn" style="height: 90%;width: 100%;background-color: #0C1F38; border:none; outline: none;"> <img src="img/trun-left.png" alt="" style="width: 100%;height: 30%; background-color: #0C1F38;"></button>
				</div>
				<div id="box" style="float: left;width:85%">
					<div id="boxWrapperId" class="wrapper" style="float: left;width: 1550px;height: 100%">
					</div>
				</div>
				<div style="width:4%;height:100%; margin-left: 2%; margin-right: 1%; float: left; background-color: #0C1F38;">
					<button id="right_btn" style="height: 90%;width: 100%; background-color: #0C1F38;border:none;outline: none;"> <img src="img/trun-right.png" alt="" style="width: 100%;height: 30%;background-color: #0C1F38; "></button>
				</div>
				<div style="clear: both;"></div>
			</div>
		</div>
	</div>

	<div id="right" class="" style="width:20%; height: 100%; float: left; margin-left: 2%;">
		<div id="right-top"  class="commonDiv" style="width: 100%; height: 25%;">
			<div class="headDiv" style="border-block-end: 1px solid #9ED9F6;">紧急联系电话
                <a style="float: right;font-size: 1px;margin-top: 7.1px;margin-right: 2px;"data-toggle="modal" data-target="#addJourCallDlg"onclick="addJourCallDlg1()">修改</a>
            </div>
            <div id="contentDivId1" class="contentDiv"
                 style="height: 85%;width:100%;text-align: left;overflow-y: auto;">
                <div id="contentDiv1" style="width: 35%;float: left;Ymargin: 0 0 0 5%">

                </div>
                <div id="contentDiv2" style="width: 50%;float:left;margin: 0 0 0 0">

                </div>
            </div>
        </div>

        <div id="right-buttom" class="commonDiv" style="width: 100%; height: 65%; margin-top: 5%;">
            <div class="headDiv" style="border-block-end: 1px solid #9ED9F6;">待处理预警信息</div>
            <div id="contentDivId" class="contentDiv" style="height:95%;overflow-y: auto;">
            </div>
        </div>
    </div>
</div>
</div>
<%--添加报警信息窗口--%>

<div id="addJourCallDlg" style="padding:6px" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"  >
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				修改紧急联系人
				<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×            </button>
			</div>
			<div class="modal-body" id="addJourCallDlgDiv" style="border-top:0px solid #e5e5e5;">
				<div style='margin:5px 0 0 0;float: left;'>
					紧急联系人：<input id="addJourCallDivid1" placeholder="输入联系人" style="margin:0 0 0 0;width:90px">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					联系电话：<input id="addJourCallDivid2" placeholder="输入联系电话" style="margin:0 0 0 0;width:90px">
				</div>
				<div style="margin:5px 0 0 0;float: left;">
					<a class="easyui-linkbutton" id="saveId" iconcls="" onclick="insertJourTellphone()" style="margin:0 0 0 5px;height: 20px;">保存</a>
					<a class="easyui-linkbutton" id="resourceId" iconcls="" class="close" data-dismiss="modal" style="margin:0 0 0 0;height: 20px;">取消</a>
				</div>
				<div id="rightTopdiv" style='margin:5px 0 0 0;float: left;'>
				<div style="clear: both"></div>
			</div>
			<div class="modal-footer" style="border-top:0px solid #e5e5e5;">

			</div>
			</div>

		</div>
	</div>


	</div>
</div>


<!-- 添加进展对话框 -->
<div id="addProgressDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true" >
	<div style='margin:5px 0 0 0;float: left;'>
		进展时间：<input readonly='readonly' class="add_pro_time" style="width:246px">
	</div>
	<div style="clear:both"></div>
	<div style='margin:5px 0 0 0;float: left;'>进展描述：</div>
	<div style='margin:5px 0 0 0;float: left;'>
		<textarea class="add_pro_mark" style="width:246px;height:60px" require="require"></textarea>
	</div>
	<div style="clear:both"></div>
	<div style="margin:5px 0 0 0;text-align: center;">
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addProgressDlg')){doAddProgress()}">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addProgressDlg').dialog('close')">取消</a>
	</div>
</div>
<div id="handleAlarmDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <input id="index" hidden="hidden">
    <div style='margin:0 0 5px 10px;float: left;'>
        <a class="easyui-linkbutton" iconcls="icon-follow-up" plain="true" id="writeProgress" onclick="addProgress()">写进展</a>
    </div>
    <div style="clear:both"></div>
    <div style='margin:10px 0 0 5px;width:99%;height:260px;'>
        <table id="showProgressTable" class="easyui-datagrid"
               style="width:100%;height:250px;table-layout:fixed;overflow:hidden;"
               data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <th width="20" align="center" field="jourProTime">进展时间</th>
                <th width="20" align="center" field="jourProUserName">跟进人</th>
                <th width="40" align="center" field="jourProMark">跟进内容</th>
            </tr>
            </thead>
        </table>
    </div>
</div>


<div id="handleAlarmDlg2" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <button id="form-performance" class="btn btn-default" data-toggle="modal"
                        onclick="javascript:$('#addProgressDlg2').modal('show');$('.add_pro_time').val(getNowFormatDate());">
                    <span style="color: #198D19" class=""></span>写进展
                </button>
                <table id="table" data-toggle="table" style="table-layout:fixed;overflow: auto;height: 300px">
                    <thead>
                    <th data-class="tWidth" data-field="jourProTime" data-halign="center">进展时间</th>
                    <th data-class="tWidth" data-field="jourProUserName" data-halign="center">跟进人</th>
                    <th data-class="tWidth" data-field="jourProMark" data-halign="center">跟进内容</th>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>

<div id="addProgressDlg2" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert alert-warning alert-dismissible fade in noticeAlert" role="alert" style="display: none;text-align: center">
                    <span class="alert-content">提示：内容不能为空！</span>
                </div>
                <form id="form" class="form-horizontal" style="">
                    <div class="form-group">
                        <label class="col-sm-2 control-label"> 进展时间:</label>
                        <div class="col-sm-9">
                            <input id="progressTime" type="text" class="form-control add_pro_time" name="time" readonly="readonly"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label"> 进展描述:</label>
                        <div class="col-sm-8">
                            <textarea id="progressDescribe" class="add_pro_mark" name="content" style="width:420px;height:80px"></textarea>
                        </div>
                    </div>
            <div style="clear:both"></div>
            </form>
            </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal"
                    onclick="$('#addProgressDlg2').modal('hide')">关闭
            </button>
            <button type="submit" class="btn btn-primary" onclick="valid()">
                保存
            </button>
        </div>
    </div>

</div>
</div>
<script>

</script>
<script src="bootstrapvalidator-master/dist/js/bootstrapValidator.min.js"></script>
<script src="js/fg.public.js"></script>
</body>
</html>