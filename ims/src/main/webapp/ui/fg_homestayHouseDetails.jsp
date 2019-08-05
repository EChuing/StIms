<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 短租房间详情窗口 -->
    <div id="houseInfoDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
		<input id="hsStoreId" type="hidden" />
		<input id="oldHsDailyRent" type="hidden" />
		<input id="oldHsHotDailyRent" type="hidden" />
		<input id="oldHsRoomType" type="hidden" />
		<input id="oldHsFurnitureConfig" type="hidden" />
		<input id="jsrcState" type="hidden" />
		<div style="float:left;margin:10px 0 0 5px">
			日常价格：<input   id="hsDailyRent" cleartwo="cleartwo"  style="width:90px;"/>
		</div>
		<div style="float:left;margin:10px 0 0 10px">
			高峰价格：<input  id="hsHotDailyRent" cleartwo="cleartwo"  style="width:90px;"/>
		</div>
		<div style="float:left;margin:10px 0 0 10px">
			房间状态：<input  id="houseState" cleartwo="cleartwo"  style="width:120px;"/>
		</div>
		<div style="float:left;margin:10px 0 0 10px">
			发布状态：<select id="hsMicronetIdentification" cleartwo="cleartwo"  style="width:120px;">
				<option value="1">未发布</option>
				<option value="2">已发布</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div id="shortHouseTypeDiv" style="float:left;margin:10px 0 0 5px">
			房间房型：<select id="shortHouseType" style="width:90px;" cleartwo="cleartwo">
					</select>
		</div>
		<div style="float:left;margin:10px 0 0 10px">
			钟点价格：<input  id="hsTimePrice" cleartwo="cleartwo"  style="width:90px;"/>
		</div>
		<div style="float:left;margin:10px 0 0 10px">
			门店地址：<input   id="houseAddress" cleartwo="cleartwo"  style="width:310px;"/>
		</div>
		<div id="hsSectionTypeDiv" style="float:left;margin:10px 0 0 28px">
			户型：<select   id="hsSectionType" cleartwo="cleartwo"  style="width:90px;">
			    </select>
		</div>
		<div style="float:left;margin:10px 0 0 10px">
			客房标题：<input   id="hsHouseTitle" cleartwo="cleartwo"  style="width:470px;"/>
		</div>
		<div style="margin:5px 0 0 5px">
			 <a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="checkPic()">房间照片</a> 
		</div>
		<div>
			<button style="margin:7px 0 0 5px;background-color: #4CAF50;border: none;color: white;text-align: center;text-decoration: none;display: inline-block;-webkit-transition-duration: 0.4s;transition-duration: 0.4s;cursor: pointer;background-color: white;color: black;border: 2px solid #e7e7e7;" onclick="doorCardManagement(0)">门卡管理</button>
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 4px">
			客房详情：<input   id="hsHousingIntroduction" cleartwo="cleartwo"  style="width:630px;"/>
		</div>
			<!-- 房间配置 -->
			<input id="hsFurnitureConfig" type="hidden" />
			
		 <!-- <div style="float:left;margin:10px 0 0 5px">
			房屋配置：<textarea id="hsFurnitureConfig" style="height:25px;width:440px"></textarea>
		</div>  -->
		<div style="clear:both"></div>
		<div id="room_configuration" cleartwo="cleartwo" class="configuration">
			<div style="float:left;margin:10px 0 10px 4px;">客房配置：</div>
			<div style="clear:both"></div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="热水淋浴">热水淋浴</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="无线网络">无线网络</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="空调">空调</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电视">电视</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="门禁系统">门禁系统</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="停车位">停车位</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="热水壶">热水壶</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="有线网络">有线网络</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电脑">电脑</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="拖鞋">拖鞋</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="纸巾">纸巾</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="牙具">牙具</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="毛巾">毛巾</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="浴液">浴液</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="洗发水">洗发水</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="香皂">香皂</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="浴巾">浴巾</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="剃须刀">剃须刀</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="吹风筒">吹风筒</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜儿童">适宜儿童</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜老人">适宜老人</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜残疾人">适宜残疾人</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电梯">电梯</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="洗衣机">洗衣机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="冰箱">冰箱</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="浴缸">浴缸</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="暖气">暖气</button>
		</div>
		<!-- 跟进 -->
		<div style="clear:both;height:25px;"></div>
		<div style="padding:5px 0 0 0;width:98%;">
			<table id="followInfoTable"></table>
			<div id="followPageDiv" style="text-align:center;"></div>
		</div>
		<div style="clear:both"></div>
		<center style="margin:20px 0 0 0">
			<a class="easyui-linkbutton" id="cleanState" style="display:none" iconcls="icon-save" onclick="doCleanHouse()">清洁完成</a>
			<a class="easyui-linkbutton" id="repairState" style="display:none" iconcls="icon-save" onclick="doCleanHouse()">维保完成</a>
			<a class="easyui-linkbutton" id="renovateState" style="display:none" iconcls="icon-save" onclick="doCleanHouse()">装修完成</a>
			<a class="easyui-linkbutton" id="modifyButton" iconcls="icon-edit" onclick="modifyButton()">修改</a>
			<a class="easyui-linkbutton" id="addButton" style="display:none" iconcls="icon-save" onclick="addButton()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#houseInfoDlg').dialog('close')">关闭</a>
		</center>
		
		<div id="doorCardManagement" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
			<div id="management" style="float:left;margin:5px 0 0 5px;">
				<button style="background-color: #4CAF50;border: none;color: white;text-align: center;text-decoration: none;display: inline-block;-webkit-transition-duration: 0.4s;transition-duration: 0.4s;cursor: pointer;background-color: white;color: black;border: 2px solid #e7e7e7;" id="doorCardAuthorize" onclick="doorCardAuthorize()">门卡授权</button><!-- 0为房屋列表门卡 -->
				<button style="margin:0 0 0 30px;background-color: #4CAF50;border: none;color: white;text-align: center;text-decoration: none;display: inline-block;-webkit-transition-duration: 0.4s;transition-duration: 0.4s;cursor: pointer;background-color: white;color: black;border: 2px solid #e7e7e7;" onclick="logoutDoorCart(1)">注销门卡</button>
				<button style="margin:0 0 0 30px;background-color: #4CAF50;border: none;color: white;text-align: center;text-decoration: none;display: inline-block;-webkit-transition-duration: 0.4s;transition-duration: 0.4s;cursor: pointer;background-color: white;color: black;border: 2px solid #e7e7e7;" onclick="logoutDoorCart(2)">退房退卡</button>
			</div>
		
			<div style="clear:both"></div>
			<div class="doorCardHide" style="display:none">
				<div id="lockList" style="display:flex;margin:5px 0 0 5px">
				</div>
				<div style="clear:both"></div>
				<div style="float:left;margin:5px 0 0 5px">
					发给：<select id="selectPeople" clear="clear" style="width:80px;" >
					</select>
				</div>
				<div style="float:left;margin:5px 0 0 5px">
					卡号：<input id="cardNum" style="width:90px;" clear="clear" />
				</div>
				<div style="float:left;margin:5px 0 0 5px">
					授权码：<input id="cardId" style="width:90px;" type="text" onfocus="this.type='password'" clear="clear" />
				</div>
				<div style='margin:5px 0 0 5px;float:left;'>
					期限时间：<input id="hopeTime" style="width:100px" require="shouquan" clear="clear"
						onfocus="WdatePicker({minDate:'%y-%M-{%d}',dateFmt:'yyyy-MM-dd 23:59:59',autoPickDate:true,errDealMode:2})">
				</div>
				<div style="clear:both"></div>
				<center  style="margin:20px 0 0 0">
					<a class="easyui-linkbutton doorCardHide" id="saveAuthDoorCard" style="display:none" iconcls="icon-save" onclick="doSaveAuthDoorCard()">授权门卡</a>
				</center>
			</div>
			<div style="clear:both"></div>
			
			<div id="lockInfo" style="width:100%;height:240px;margin:10px 0 0 0">
				<table id="lockInfoDg" style="width:100%;height:240px;table-layout:fixed;"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
					<thead>
						<tr>
							<th field="devNickname" width="10" align="center">锁名</th>
							<th field="jdcCardNum" width="10" align="center">卡号</th>
							<th field="popName" width="10" align="center">使用者</th>
							<th field="jdcState" width="10" align="center">状态</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
	<div id="adImgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="padding:5px 0 0 10px;">
			<a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadPic()">上传</a>
			<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removePic()">选择删除</a>
			<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refresh()">刷新</a>
		</div>
		<div id="removePicture" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
		<div style="clear:both"></div>
		<left>
			<div id='doRemovePic' style='margin:10px 0 0 10px;display:none;'>
				<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemovePic()">删除</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel()">取消</a>
			</div>
		</left>
		<div id="imgWrapper" style="margin:10px 0 0 10px;"></div>
		
	</div>
	<div id="downFollowInfo" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<center>
			<!-- <div style="margin:0 0 5px 0; float:left;">
				<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="showFollowUpImg()" >查看跟进图片</a>
			</div> -->
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>跟进时间：</td>
						<td colspan="3"><span id="readDownFollowjhfFollowTime" clano="clano"></span></td>
					</tr>
					<tr>
						<td>跟进人：</td>
						<td><span id="readDownFollowjhfUserName" clano="clano"></span></td>
						<td>跟进类型：</td>
						<td><span id="readDownFollowjhfPaymentWay" clano="clano"></span></td>
					</tr>
					<tr>
						<td>跟进归属：</td>
						<td colspan="3"><span id="readDownFollowjhfFollowBelong" clano="clano"></span></td>
					</tr>
					<tr>
						<td>跟进内容：</td>
						<td colspan="3" style="text-align:left"><span id="readDownFollowjhfFollowRemark" clano="clano"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
		
	</div>
    <script src="js/fg_homestayHouseDetails.js"></script>

