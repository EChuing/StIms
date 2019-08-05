<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="purviewSecond" style="width:97%;height:95%;padding:0px 10px 10px 10px;">
	<span id="bodyTopA"></span>
	<div style="height:81px;width:100%;"></div>
	<fieldset auth="A">
		<legend style='font-size: 18px;'>业务管理</legend>
		<div style="padding-left:20px" auth="A00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="A00">
			<span class="second-menu">房源资料</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A0000" value="A00">
				全选
			</div>
			<div class="dataPurview">
				<div style="float:left;" auth="A00b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A00b01">
					<div class="checkBoxName">查看</div>
				</div>
				<div style="float:left;" auth="A00b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A00b02">
					<div class="checkBoxName">可查看已托管</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="A00c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A00c01">
					<div class="checkBoxName">添加房源资料</div>
				</div>
				<div style="float:left;" auth="A00c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A00c02">
					<div class="checkBoxName">修改房源资料</div>
				</div>
				<div style="float:left;" auth="A00c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A00c03">
					<div class="checkBoxName">锁盘、解锁</div>
				</div>
				<div style="float:left;" auth="A00c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A00c04">
					<div class="checkBoxName">关注房源</div>
				</div>
				<div style="float:left;" auth="A00c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A00c05">
					<div class="checkBoxName">写跟进</div>
				</div>
				<div style="float:left;" auth="A00c06">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A00c06">
					<div class="checkBoxName">查看业主联系方式</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="A01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="A01">
			<span class="second-menu">未租房间</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A0100" value="A01">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="A01b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b01">
					<div class="checkBoxName">查个人</div>
				</div>
				<div style="float:left;" auth="A01b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b02">
					<div class="checkBoxName">查部门</div>
				</div>
				<div style="float:left;" auth="A01b03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b03">
					<div class="checkBoxName">查分店</div>
				</div>
				<div style="float:left;" auth="A01b04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b04">
					<div class="checkBoxName">查公司</div>
				</div>
				<div style="float:left;" auth="A01b05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b05">
					<div class="checkBoxName">隐私查看</div>
				</div>
				<div style="float:left;" auth="A01b06">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b06">
					<div class="checkBoxName">查看业主信息</div>
				</div>
				<div style="float:left;" auth="A01b07">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b07">
					<div class="checkBoxName">查看房屋收支</div>
				</div>
				<div style="float:left;" auth="A01b08">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b08">
					<div class="checkBoxName">查看业主账单</div>
				</div>
				<div style="float:left;" auth="A01b09">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b09">
					<div class="checkBoxName">查看家私电器</div>
				</div>
				<div style="float:left;" auth="A01b10">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b10">
					<div class="checkBoxName">查看合约记录</div>
				</div>
				<div style="float:left;" auth="A01b11">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b11">
					<div class="checkBoxName">查看短信记录</div>
				</div>
				<div style="float:left;" auth="A01b12">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b12">
					<div class="checkBoxName">查看房间照片</div>
				</div>
				<div style="float:left;" auth="A01b13">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b13">
					<div class="checkBoxName">查看能源卡号</div>
				</div>
				<div style="float:left;" auth="A01b14">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b14">
					<div class="checkBoxName">查看维保记录</div>
				</div>
				<div style="float:left;" auth="A01b15">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b15">
					<div class="checkBoxName">查看审批记录</div>
				</div>
				<div style="float:left;" auth="A01b16">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b16">
					<div class="checkBoxName">查看任务记录</div>
				</div>
				<div style="float:left;" auth="A01b17">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b17">
					<div class="checkBoxName">查看设备管理</div>
				</div>
				<div style="float:left;" auth="A01b18">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b18">
					<div class="checkBoxName">授权管理</div>
				</div>
				<div style="float:left;" auth="A01b19">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01b19">
					<div class="checkBoxName">能源读数</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="A01c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c01">
					<div class="checkBoxName">添加房间</div>
				</div>
				<div style="float:left;" auth="A01c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c02">
					<div class="checkBoxName">集中设置</div>
				</div>
				<div style="float:left;" auth="A01c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c03">
					<div class="checkBoxName">合租设置</div>
				</div>
				<div style="float:left;" auth="A01c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c04">
					<div class="checkBoxName">业主续签</div>
				</div>
				<div style="float:left;" auth="A01c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c05">
					<div class="checkBoxName">业主退房</div>
				</div>
				<div style="float:left;" auth="A01c06">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c06">
					<div class="checkBoxName">设置房管员</div>
				</div>
				<div style="float:left;" auth="A01c07">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c07">
					<div class="checkBoxName">设置指导价</div>
				</div>
				<div style="float:left;" auth="A01c08">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c08">
					<div class="checkBoxName">客户下定</div>
				</div>
				<div style="float:left;" auth="A01c09">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c09">
					<div class="checkBoxName">发送短信</div>
				</div>
				<div style="float:left;" auth="A01c10">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c10">
					<div class="checkBoxName">设置日租房</div>
				</div>
				<div style="float:left;" auth="A01c11">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c11">
					<div class="checkBoxName">打印二维码</div>
				</div>
				<div style="float:left;" auth="A01c12">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A01c12">
					<div class="checkBoxName">批量添加房间</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="A02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="A02">
			<span class="second-menu">已租房间</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A0200" value="A02">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="A02b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b01">
					<div class="checkBoxName">查个人</div>
				</div>
				<div style="float:left;" auth="A02b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b02">
					<div class="checkBoxName">查部门</div>
				</div>
				<div style="float:left;" auth="A02b03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b03">
					<div class="checkBoxName">查分店</div>
				</div>
				<div style="float:left;" auth="A02b04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b04">
					<div class="checkBoxName">查公司</div>
				</div>
				<div style="float:left;" auth="A02b05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b05">
					<div class="checkBoxName">隐私查看</div>
				</div>
				<div style="float:left;" auth="A02b06">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b06">
					<div class="checkBoxName">查看租客信息</div>
				</div>
				<div style="float:left;" auth="A02b07">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b07">
					<div class="checkBoxName">查看业主信息</div>
				</div>
				<div style="float:left;" auth="A02b08">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b08">
					<div class="checkBoxName">查看房屋收支</div>
				</div>
				<div style="float:left;" auth="A02b09">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b09">
					<div class="checkBoxName">查看业主账单</div>
				</div>
				<div style="float:left;" auth="A02b10">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b10">
					<div class="checkBoxName">查看租客账单</div>
				</div>
				<div style="float:left;" auth="A02b11">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b11">
					<div class="checkBoxName">查看客户信息</div>
				</div>
				<div style="float:left;" auth="A02b12">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b12">
					<div class="checkBoxName">查看家私电器</div>
				</div>
				<div style="float:left;" auth="A02b13">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b13">
					<div class="checkBoxName">查看合约记录</div>
				</div>
				<div style="float:left;" auth="A02b14">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b14">
					<div class="checkBoxName">查看短信记录</div>
				</div>
				<div style="float:left;" auth="A02b15">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b15">
					<div class="checkBoxName">查看房间照片</div>
				</div>
				<div style="float:left;" auth="A02b16">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b16">
					<div class="checkBoxName">查看能源卡号</div>
				</div>
				<div style="float:left;" auth="A02b17">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b17">
					<div class="checkBoxName">查看维保记录</div>
				</div>
				<div style="float:left;" auth="A02b18">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b18">
					<div class="checkBoxName">查看审批记录</div>
				</div>
				<div style="float:left;" auth="A02b19">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b19">
					<div class="checkBoxName">查看任务记录</div>
				</div>
				<div style="float:left;" auth="A02b20">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02b20">
					<div class="checkBoxName">门卡管理</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="A02c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02c01">
					<div class="checkBoxName">添加出租</div>
				</div>
				<div style="float:left;" auth="A02c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02c02">
					<div class="checkBoxName">业主续签</div>
				</div>
				<div style="float:left;" auth="A02c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02c03">
					<div class="checkBoxName">租客续签</div>
				</div>
				<div style="float:left;" auth="A02c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02c04">
					<div class="checkBoxName">租客退房</div>
				</div>
				<div style="float:left;" auth="A02c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02c05">
					<div class="checkBoxName">设置房管员</div>
				</div>
				<div style="float:left;" auth="A02c06">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02c06">
					<div class="checkBoxName">发送短信</div>
				</div>
				<div style="float:left;" auth="A02c07">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A02c07">
					<div class="checkBoxName">添加临时账单</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="A03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="A03">
			<span class="second-menu">退房办理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A0300" value="A03">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="A03b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A03b01">
					<div class="checkBoxName">租客退房</div>
				</div>
				<div style="float:left;" auth="A03b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A03b02">
					<div class="checkBoxName">业主退房</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="A03c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A03c01">
					<div class="checkBoxName">审核</div>
				</div>
				<div style="float:left;" auth="A03c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A03c02">
					<div class="checkBoxName">复核</div>
				</div>
				<div style="float:left;" auth="A03c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A03c03">
					<div class="checkBoxName">出账</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="A04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="A04">
			<span class="second-menu">外出登记</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A0400" value="A04">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="A04b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A04b01">
					<div class="checkBoxName">查个人</div>
				</div>
				<div style="float:left;" auth="A04b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A04b02">
					<div class="checkBoxName">查部门</div>
				</div>
				<div style="float:left;" auth="A04b03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A04b03">
					<div class="checkBoxName">查分店</div>
				</div>
				<div style="float:left;" auth="A04b04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A04b04">
					<div class="checkBoxName">查公司</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="A04c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A04c01">
					<div class="checkBoxName">外出登记</div>
				</div>
				<div style="float:left;" auth="A04c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A04c02">
					<div class="checkBoxName">回来签到</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="A05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="A05">
			<span class="second-menu">意向客户</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A0500" value="A05">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="A05b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A05b01">
					<div class="checkBoxName">查个人客</div>
				</div>
				<div style="float:left;" auth="A05b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A05b02">
					<div class="checkBoxName">查部门客</div>
				</div>
				<div style="float:left;" auth="A05b03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A05b03">
					<div class="checkBoxName">查分店客</div>
				</div>
				<div style="float:left;" auth="A05b04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A05b04">
					<div class="checkBoxName">查公司</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="A05c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A05c01">
					<div class="checkBoxName">添加意向客户</div>
				</div>
				<div style="float:left;" auth="A05c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A05c02">
					<div class="checkBoxName">带客看房</div>
				</div>
				<div style="float:left;" auth="A05c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A05c03">
					<div class="checkBoxName">写跟进</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="A06">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="A06">
			<span class="second-menu">客户信息</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A0600" value="A06">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="A06b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A06b01">
					<div class="checkBoxName">查看</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="A06c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="A06c01">
					<div class="checkBoxName">修改</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px;display:none;" auth="A07">
			<input type="checkbox" class="second-menu-select"  onclick="checkedbox()" id="A07">
			<span class="second-menu">短租房间</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A0700" value="A07">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px;display:none;" auth="A08">
			<input type="checkbox" class="second-menu-select"  onclick="checkedbox()" id="A08">
			<span class="second-menu">短租订单</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A0800" value="A08">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="A09">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="A09">
			<span class="second-menu">合同管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A0900" value="A09">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="A10">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="A10">
			<span class="second-menu">定金管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="A1000" value="A10">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopB"></span>
	<fieldset auth="B">
		<legend style='font-size: 18px;'>财务管理</legend>
		<div style="padding-left:20px" auth="B00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="B00">
			<span class="second-menu">收支管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="B0000" value="B00">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="B00b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B00b01">
					<div class="checkBoxName">查账</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="B00c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B00c01">
					<div class="checkBoxName">新增收支</div>
				</div>
				<div style="float:left;" auth="B00c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B00c02">
					<div class="checkBoxName">新增欠结补结</div>
				</div>
				<div style="float:left;" auth="B00c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B00c03">
					<div class="checkBoxName">账单收款</div>
				</div>
				<div style="float:left;" auth="B00c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B00c04">
					<div class="checkBoxName">新签收款</div>
				</div>
				<div style="float:left;" auth="B00c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B00c05">
					<div class="checkBoxName">凭证管理</div>
				</div>
				<div style="float:left;" auth="B00c06">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B00c06">
					<div class="checkBoxName">冲账</div>
				</div>
				<div style="float:left;" auth="B00c07">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B00c07">
					<div class="checkBoxName">审核</div>
				</div>
				<div style="float:left;" auth="B00c08">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B00c08">
					<div class="checkBoxName">复核</div>
				</div>
				<div style="float:left;" auth="B00c09">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B00c09">
					<div class="checkBoxName">收款账户</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="B01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="B01">
			<span class="second-menu">收款账户</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="B0100" value="B01">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="B01b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B01b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="B02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="B02">
			<span class="second-menu">业主账单</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="B0200" value="B02">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="B02b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B02b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="B02c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B02c01">
					<div class="checkBoxName">审核</div>
				</div>
				<div style="float:left;" auth="B02c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B02c02">
					<div class="checkBoxName">复核</div>
				</div>
				<div style="float:left;" auth="B02c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B02c03">
					<div class="checkBoxName">付款</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="B03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="B03">
			<span class="second-menu">租客账单</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="B0300" value="B03">
				全选
			</div>
			<div style="clear:both"></div><div class="dataPurview">
				<div style="float:left;" auth="B03b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B03b01">
					<div class="checkBoxName">查询账单</div>
				</div>
				<div style="float:left;" auth="B03b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B03b02">
					<div class="checkBoxName">查询微信账单</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="B03c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B03c01">
					<div class="checkBoxName">保存账单</div>
				</div>
				<div style="float:left;" auth="B03c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B03c02">
					<div class="checkBoxName">保存并通知租客</div>
				</div>
				<div style="float:left;" auth="B03c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B03c03">
					<div class="checkBoxName">查看付款凭证</div>
				</div>
				<div style="float:left;" auth="B03c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B03c04">
					<div class="checkBoxName">查看微信付款凭证</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="B04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="B04">
			<span class="second-menu">历史打印</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="B0400" value="B04">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="B04b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B04b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="B04c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B04c01">
					<div class="checkBoxName">打印</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="B05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="B05">
			<span class="second-menu">合同票据</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="B0500" value="B05">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="B05b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B05b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="B05c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B05c01">
					<div class="checkBoxName">生成</div>
				</div>
				<div style="float:left;" auth="B05c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B05c02">
					<div class="checkBoxName">领用</div>
				</div>
				<div style="float:left;" auth="B05c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B05c03">
					<div class="checkBoxName">注销</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="B06">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="B06">
			<span class="second-menu">综合修改</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="B0600" value="B06">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="B06b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06b01">
					<div class="checkBoxName">查看</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="B06c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06c01">
					<div class="checkBoxName">已租信息</div>
				</div>
				<div style="float:left;" auth="B06c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06c02">
					<div class="checkBoxName">未租信息</div>
				</div>
				<div style="float:left;" auth="B06c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06c03">
					<div class="checkBoxName">租客账单</div>
				</div>
				<div style="float:left;" auth="B06c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06c04">
					<div class="checkBoxName">业主账单</div>
				</div>
				<div style="float:left;" auth="B06c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06c05">
					<div class="checkBoxName">合约记录</div>
				</div>
				<div style="float:left;" auth="B06c06">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06c06">
					<div class="checkBoxName">客户信息</div>
				</div>
				<div style="float:left;display:none;" auth="B06c07">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06c07">
					<div class="checkBoxName">业主信息</div>
				</div>
				<div style="float:left;" auth="B06c08">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06c08">
					<div class="checkBoxName">能源卡号</div>
				</div>
				<div style="float:left;" auth="B06c09">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06c09">
					<div class="checkBoxName">自动发送短信</div>
				</div>
				<div style="float:left;" auth="B06c10">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="B06c10">
					<div class="checkBoxName">手动发送短信</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopC"></span>
	<fieldset auth="C">
		<legend style='font-size: 18px;'>行政管理</legend>
		<span id="C"></span>
		<div style="padding-left:20px" auth="C00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C00">
			<span class="second-menu">资产</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C0000" value="C00">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C00b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C00b01">
					<div class="checkBoxName">分店查询</div>
				</div>
				<div style="float:left;" auth="C00b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C00b02">
					<div class="checkBoxName">公司查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C00c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C00c01">
					<div class="checkBoxName">添加资产</div>
				</div>
				<div style="float:left;" auth="C00c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C00c02">
					<div class="checkBoxName">修改资产</div>
				</div>
				<div style="float:left;" auth="C00c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C00c03">
					<div class="checkBoxName">迁移资产</div>
				</div>
				<div style="float:left;" auth="C00c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C00c04">
					<div class="checkBoxName">打印资产标示卡</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C01">
			<span class="second-menu">维保</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C0100" value="C01">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C01b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C01b01">
					<div class="checkBoxName">查个人</div>
				</div>
				<div style="float:left;" auth="C01b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C01b02">
					<div class="checkBoxName">查部门</div>
				</div>
				<div style="float:left;" auth="C01b03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C01b03">
					<div class="checkBoxName">查分店</div>
				</div>
				<div style="float:left;" auth="C01b04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C01b04">
					<div class="checkBoxName">查公司</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C01c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C01c01">
					<div class="checkBoxName">添加维保</div>
				</div>
				<div style="float:left;" auth="C01c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C01c02">
					<div class="checkBoxName">添加进展</div>
				</div>
				<div style="float:left;" auth="C01c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C01c03">
					<div class="checkBoxName">领取维保任务</div>
				</div>
				<div style="float:left;" auth="C01c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C01c04">
					<div class="checkBoxName">修改负责人</div>
				</div>
				<div style="float:left;" auth="C01c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C01c05">
					<div class="checkBoxName">添加回访</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C02">
			<span class="second-menu">审批</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C0200" value="C02">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C02b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C02b01">
					<div class="checkBoxName">查个人</div>
				</div>
				<div style="float:left;" auth="C02b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C02b02">
					<div class="checkBoxName">查部门</div>
				</div>
				<div style="float:left;" auth="C02b03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C02b03">
					<div class="checkBoxName">查分店</div>
				</div>
				<div style="float:left;" auth="C02b04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C02b04">
					<div class="checkBoxName">查公司</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C02c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C02c01">
					<div class="checkBoxName">审批</div>
				</div>
				<div style="float:left;" auth="C02c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C02c02">
					<div class="checkBoxName">增加</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C03">
			<span class="second-menu">任务</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C0300" value="C03">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C03b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C03b01">
					<div class="checkBoxName">查个人</div>
				</div>
				<div style="float:left;" auth="C03b02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C03b02">
					<div class="checkBoxName">查部门</div>
				</div>
				<div style="float:left;" auth="C03b03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C03b03">
					<div class="checkBoxName">查分店</div>
				</div>
				<div style="float:left;" auth="C03b04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C03b04">
					<div class="checkBoxName">查公司</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C03c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C03c01">
					<div class="checkBoxName">添加任务</div>
				</div>
				<div style="float:left;" auth="C03c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C03c02">
					<div class="checkBoxName">添加进展</div>
				</div>
				<div style="float:left;" auth="C03c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C03c03">
					<div class="checkBoxName">领取任务</div>
				</div>
				<div style="float:left;" auth="C03c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C03c04">
					<div class="checkBoxName">修改负责人</div>
				</div>
				<div style="float:left;" auth="C03c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C03c05">
					<div class="checkBoxName">复核</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C04">
			<span class="second-menu">项目</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C0400" value="C04">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C04b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C04b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C04c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C04c01">
					<div class="checkBoxName">录入项目</div>
				</div>
				<div style="float:left;" auth="C04c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C04c02">
					<div class="checkBoxName">修改项目</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C05">
			<span class="second-menu">抄表</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C0500" value="C05">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C05b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C05b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C05c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C05c01">
					<div class="checkBoxName">添加抄表</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C06">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C06">
			<span class="second-menu">公告</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C0600" value="C06">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C06b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C06b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C06c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C06c01">
					<div class="checkBoxName">添加公告</div>
				</div>
				<div style="float:left;" auth="C06c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C06c02">
					<div class="checkBoxName">修改公告</div>
				</div>
				<div style="float:left;" auth="C06c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C06c03">
					<div class="checkBoxName">删除公告</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C07">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C07">
			<span class="second-menu">文件</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C0700" value="C07">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C07b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C07b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C07c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C07c01">
					<div class="checkBoxName">上传文件</div>
				</div>
				<div style="float:left;" auth="C07c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C07c02">
					<div class="checkBoxName">修改文件</div>
				</div>
				<div style="float:left;" auth="C07c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C07c03">
					<div class="checkBoxName">删除文件</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C08">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C08">
			<span class="second-menu">库房</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C0800" value="C08">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C08b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C08b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C08c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C08c01">
					<div class="checkBoxName">添加库房</div>
				</div>
				<div style="float:left;" auth="C08c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C08c02">
					<div class="checkBoxName">修改库房</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C09">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C09">
			<span class="second-menu">商家</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C0900" value="C09">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C09b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C09b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C09c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C09c01">
					<div class="checkBoxName">添加商家</div>
				</div>
				<div style="float:left;" auth="C09c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C09c02">
					<div class="checkBoxName">修改商家</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C10">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C10">
			<span class="second-menu">公区</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C1000" value="C10">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="C10b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C10b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="C10c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C10c01">
					<div class="checkBoxName">添加公区</div>
				</div>
				<div style="float:left;" auth="C10c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="C10c02">
					<div class="checkBoxName">修改公区</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="C11">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="C11">
			<span class="second-menu">专题</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="C1100" value="C11">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopD"></span>
	<fieldset auth="D">
		<legend style='font-size: 18px;'>人事管理</legend>
		<div style="padding-left:20px" auth="D00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="D00">
			<span class="second-menu">用户管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="D0000" value="D00">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="D00b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D00b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="D00c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D00c01">
					<div class="checkBoxName">新增区域</div>
				</div>
				<div style="float:left;" auth="D00c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D00c02">
					<div class="checkBoxName">新增部门</div>
				</div>
				<div style="float:left;" auth="D00c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D00c03">
					<div class="checkBoxName">新增用户</div>
				</div>
				<div style="float:left;" auth="D00c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D00c04">
					<div class="checkBoxName">用户离职</div>
				</div>
				<div style="float:left;" auth="D00c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D00c05">
					<div class="checkBoxName">业务员离职交接</div>
				</div>
				<div style="float:left;" auth="D00c06">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D00c06">
					<div class="checkBoxName">部门调换</div>
				</div>
				<div style="float:left;" auth="D00c07">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D00c07">
					<div class="checkBoxName">修改用户资料</div>
				</div>
				<div style="float: left" auth="D00c08">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D00c08">
					<div class="checkBoxName">折扣权限</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>

		<div style="padding-left:20px;display:none;" auth="D01"><!-- 作废了的权限不能直接删除，只能隐藏或者替换 -->
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="D01">
			<span class="second-menu">旧权限管理（作废）</span>
		</div>
		<div style="padding-left:20px" auth="D02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="D02">
			<span class="second-menu">权限管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="D0200" value="D02">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="D02b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D02b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="D02c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D02c01">
					<div class="checkBoxName">增加</div>
				</div>
				<div style="float:left;" auth="D02c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="D02c02">
					<div class="checkBoxName">修改</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="D03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="D03">
			<span class="second-menu">考勤管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="D0300" value="D03">
				全选
			</div>
			<div style="clear:both"></div>
		</div>

		<div style="padding-left:20px" auth="D04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="D04">
			<span class="second-menu">教师管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="D0400" value="D04">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="D05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="D05">
			<span class="second-menu">学生管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="D0500" value="D05">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopE"></span>
	<fieldset auth="E">
		<legend style='font-size: 18px;'>系统设置</legend>
		<div style="padding-left:20px" auth="E00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="E00">
			<span class="second-menu">房屋字典</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="E0000" value="E00">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="E00b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E00b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="E00c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E00c01">
					<div class="checkBoxName">增加</div>
				</div>
				<div style="float:left;" auth="E00c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E00c02">
					<div class="checkBoxName">修改</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="E01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="E01">
			<span class="second-menu">计费方案</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="E0100" value="E01">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="E01b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E01b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="E01c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E01c01">
					<div class="checkBoxName">增加</div>
				</div>
				<div style="float:left;" auth="E01c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E01c02">
					<div class="checkBoxName">修改</div>
				</div>
				<div style="float:left;" auth="E01c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E01c03">
					<div class="checkBoxName">删除</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="E02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="E02">
			<span class="second-menu">初始设置</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="E0200" value="E02">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview"></div>
			<div class="operatePurview">
				<div style="float:left;" auth="E02c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E02c01">
					<div class="checkBoxName">修改</div>
				</div>
				<div style="float:left;" auth="E02c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E02c02">
                    <div class="checkBoxName">基础设置</div>
				</div>
				<div style="float:left;" auth="E02c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E02c03">
                    <div class="checkBoxName">公寓设置</div>
				</div>
				<div style="float:left;" auth="E02c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E02c04">					
                    <div class="checkBoxName">旅业设置</div>
				</div>
				<div style="float:left;" auth="E02c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E02c05">
					<div class="checkBoxName">企业设置</div>
				</div>
				<div style="float:left;" auth="E02c06">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E02c06">
					<div class="checkBoxName">设备设置</div>
				</div>
				<div style="float:left;" auth="E02c07">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E02c07">
					<div class="checkBoxName">商超设置</div>
				</div>
				<div style="float:left;" auth="E02c08">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E02c08">
					<div class="checkBoxName">酒店设置</div>
				</div>
				<div style="float:left;" auth="E02c09">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E02c09">
					<div class="checkBoxName">民宿设置</div>
				</div>
				<div style="float:left;" auth="E02c10">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="E02c10">
					<div class="checkBoxName">校园设置</div>
				</div>
			</div> 
			<div style="clear:both"></div>
		</div>
			<div style="clear:both"></div>
		<div style="padding-left:20px" auth="E03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="E03">
			<span class="second-menu">个人设置</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="E0300" value="E03">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopF"></span>
	<fieldset auth="F">
		<legend style='font-size: 18px;'>报表管理</legend>
		<span id="F"></span>
		<div style="padding-left:20px" auth="F00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F00">
			<span class="second-menu">绩效统计</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F0000" value="F00">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F00b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F00b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F01">
			<span class="second-menu">房屋生态</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F0100" value="F01">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F01b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F01b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F02">
			<span class="second-menu">企业盈亏</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F0200" value="F02">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F02b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F02b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F03">
			<span class="second-menu">公司成本</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F0300" value="F03">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F03b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F03b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F04">
			<span class="second-menu">租价分布</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F0400" value="F04">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F04b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F04b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F05">
			<span class="second-menu">免租收益</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F0500" value="F05">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F05b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F05b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F06">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F06">
			<span class="second-menu">空置状况</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F0600" value="F06">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F06b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F06b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F07">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F07">
			<span class="second-menu">短信记录</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F0700" value="F07">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F07b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F07b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F08">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F08">
			<span class="second-menu">受益归属</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F0800" value="F08">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F08b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F08b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="F08c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F08c01">
					<div class="checkBoxName">添加受益人</div>
				</div>
				<div style="float:left;" auth="F08c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F08c02">
					<div class="checkBoxName">修改受益人</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F09">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F09">
			<span class="second-menu">客户来源</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F0900" value="F09">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F09b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F09b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F10">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F10">
			<span class="second-menu">到期分布</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F1000" value="F10">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F10b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F10b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="F11">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="F11">
			<span class="second-menu">数据日历</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="F1100" value="F11">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="dataPurview">
				<div style="float:left;" auth="F11b01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="F11b01">
					<div class="checkBoxName">查询</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopG"></span>
	<fieldset auth="G">
		<legend style='font-size: 18px;'>任务面板</legend>
		<div style="padding-left:20px" auth="G00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="G00">
			<span class="second-menu">工作台</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="G0000" value="G00">
				全选
			</div>
			<div style="clear:both"></div>
			<div class="operatePurview">
				<div style="float:left;" auth="G00c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="G00c01">
					<div class="checkBoxName">老板工作台</div>
				</div>
				<div style="float:left;" auth="G00c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="G00c02">
					<div class="checkBoxName">业务任务版</div>
				</div>
				<div style="float:left;" auth="G00c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="G00c03">
					<div class="checkBoxName">综合任务版</div>
				</div>
				<div style="float:left;" auth="G00c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="G00c04">
					<div class="checkBoxName">新增公告</div>
				</div>
				<div style="float:left;" auth="G00c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="G00c05">
					<div class="checkBoxName">编辑公告</div>
				</div>
				<div style="float:left;" auth="G00c06">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="G00c06">
					<div class="checkBoxName">商超工作台</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="G01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="G01">
			<span class="second-menu">数据日历</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="G0100" value="G01">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopH"></span>
	<fieldset auth="H">
		<legend style='font-size: 18px;'>发布管理</legend>
		<div style="padding-left:20px" auth="H00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="H00">
			<span class="second-menu">58分散式发布</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="H0000" value="H00">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="H01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="H01">
			<span class="second-menu">58集中式发布</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="H0100" value="H01">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="H02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="H02">
			<span class="second-menu">贝壳分散式发布</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="H0200" value="H02">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="H03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="H03">
			<span class="second-menu">贝壳集中式发布</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="H0300" value="H03">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="H04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="H04">
			<span class="second-menu">京东租房</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="H0400" value="H04">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="H05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="H05">
			<span class="second-menu">保真房源发布</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="H0500" value="H05">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="H06">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="H06">
			<span class="second-menu">至尊寓分散式发布</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="H0600" value="H06">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="H07">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="H07">
			<span class="second-menu">网络门店</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="H0700" value="H07">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopI"></span>
	<fieldset auth="I">
		<legend style='font-size: 18px;'>增值服务</legend>
		<div style="padding-left:20px" auth="I00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="I00">
			<span class="second-menu">货物管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="I0000" value="I00">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="I01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="I01">
			<span class="second-menu">订单管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="I0100" value="I01">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="I02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="I02">
			<span class="second-menu">历史订单</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="I0200" value="I02">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		
		<div style="padding-left:20px" auth="I03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="I03">
			<span class="second-menu">货物流水</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="I0300" value="I03">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopJ"></span>
	<fieldset auth="J">
		<legend style='font-size: 18px;'>设备管理</legend>
		<div style="padding-left:20px" auth="J00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="J00">
			<span class="second-menu">设备预警</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="J0000" value="J00">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="J01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="J01">
			<span class="second-menu">设备管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="J0100" value="J01">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="J02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="J02">
			<span class="second-menu">能源信息</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="J0200" value="J02">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="J03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="J03">
			<span class="second-menu">集控设置</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="J0300" value="J03">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="J04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="J04">
			<span class="second-menu">公区集控</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="J0400" value="J04">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="J05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="J05">
			<span class="second-menu">公寓集控</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="J0500" value="J05">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="J06">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="J06">
			<span class="second-menu">酒店集控</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="J0600" value="J06">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="J07">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="J07">
			<span class="second-menu">设备集控</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="J0700" value="J07   ">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="J08">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="J08">
			<span class="second-menu">定时集控</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="J0800" value="J08">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="J09">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="J09">
			<span class="second-menu">房间列表</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="J0900" value="J09">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopK"></span>
	<fieldset auth="K">
		<legend style='font-size: 18px;'>客房管理</legend>
		<div style="padding-left:20px" auth="K00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="K00">
			<span class="second-menu">营业房态</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="K0000" value="K00">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="K01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="K01">
			<span class="second-menu">订单查询</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="K0100" value="K01">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="K02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="K02">
			<span class="second-menu">客账查询</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="K0200" value="K02">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="K04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="K04">
			<span class="second-menu">房态图</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="K0400" value="K04">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="K03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="K03">
			<span class="second-menu">客人管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="K0300" value="K03">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="K05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="K05">
			<span class="second-menu">房间管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="K0500" value="K05">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="K06">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="K06">
			<span class="second-menu">交班交接</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="K0600" value="K06">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="K07">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="K07">
			<span class="second-menu">渠道管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="K0700" value="K07">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="K08">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="K08">
			<span class="second-menu">挂账管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="K0800" value="K08">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopL"></span>
	<fieldset auth="L">
		<legend style='font-size: 18px;'>服务</legend>
		<div style="padding-left:20px" auth="L00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="L00">
			<span class="second-menu">服务</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="L0000" value="L00">
				全选
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="L00c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="L00c01">
					<div class="checkBoxName">视频帮助</div>
				</div>
				<div style="float:left;" auth="L00c02">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="L00c02">
					<div class="checkBoxName">旗舰版</div>
				</div>
				<div style="float:left;" auth="L00c03">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="L00c03">
					<div class="checkBoxName">尊享版</div>
				</div>
				<div style="float:left;" auth="L00c04">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="L00c04">
					<div class="checkBoxName">基础版</div>
				</div>
				<div style="float:left;" auth="L00c05">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="L00c05">
					<div class="checkBoxName">资料下载</div>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopM"></span>
	<fieldset auth="M">
		<legend style='font-size: 18px;'>无业主模式</legend>
		<div style="padding-left:20px" auth="M00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="M00">
			<span class="second-menu">无业主模式</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="M0000" value="M00">
				全选
			</div>
			<div class="operatePurview">
				<div style="float:left;" auth="M00c01">
					<input class="checkBoxInput" type="checkbox" onclick="checkedbox()" id="M00c01">
					<div class="checkBoxName">开启无业主模式</div>
				</div>
				</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopQ"></span>
	<fieldset auth="Q">
		<legend style='font-size: 18px;'>销售管理</legend>
		<div style="padding-left:20px" auth="Q00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="Q00">
			<span class="second-menu">客户管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="Q0000" value="Q00">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="Q01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="Q01">
			<span class="second-menu">线上订单</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="Q0100" value="Q01">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="Q02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="Q02">
			<span class="second-menu">销售开单</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="Q0200" value="Q02">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="Q03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="Q03">
			<span class="second-menu">销售记录</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="Q0300" value="Q03">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="Q04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="Q04">
			<span class="second-menu">客户关怀</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="Q0400" value="Q04">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="Q05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="Q05">
			<span class="second-menu">库存管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="Q0500" value="Q05">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopR"></span>
	<fieldset auth="R">
		<legend style='font-size: 18px;'>客栈管理</legend>
		<div style="padding-left:20px" auth="R00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="R00">
			<span class="second-menu">客栈房态</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="R0000" value="R00">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="R01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="R01">
			<span class="second-menu">客栈订单</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="R0100" value="R01">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="R02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="R02">
			<span class="second-menu">客栈客账</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="R0200" value="R02">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="R03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="R03">
			<span class="second-menu">客栈会员</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="R0300" value="R03">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="R04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="R04">
			<span class="second-menu">客栈客房</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="R0400" value="R04">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="R05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="R05">
			<span class="second-menu">客栈房间</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="R0500" value="R05">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="R06">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="R06">
			<span class="second-menu">客栈交班</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="R0600" value="R06">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
	<span class="target-fix" id="bodyTopS"></span>
	<fieldset auth="S">
		<legend style='font-size: 18px;'>校园管理</legend>
		<div style="padding-left:20px" auth="S00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="S00">
			<span class="second-menu">教室管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="S0000" value="S00">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="S01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="S01">
			<span class="second-menu">办公室管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="S0100" value="S01">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="S02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="S02">
			<span class="second-menu">公区管理</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="S0200" value="S02">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>

	<span class="target-fix" id="bodyTopT"></span>
	<fieldset auth="T">
		<legend style='font-size: 18px;'>民宿管理</legend>
		<div style="padding-left:20px" auth="T00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="T00">
			<span class="second-menu">民宿房态</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="T0000" value="T00">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="T01">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="T01">
			<span class="second-menu">民宿订单</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="T0100" value="T01">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="T02">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="T02">
			<span class="second-menu">民宿客账</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="T0200" value="T02">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="T03">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="T03">
			<span class="second-menu">民宿会员</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="T0300" value="T03">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="T04">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="T04">
			<span class="second-menu">民宿房态图</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="T0400" value="T04">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="T05">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="T05">
			<span class="second-menu">民宿房间</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="T0500" value="T05">
				全选
			</div>
			<div style="clear:both"></div>
		</div>

		<%--<div style="padding-left:20px" auth="T06">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="T06">
			<span class="second-menu">民宿交班</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="T0600" value="T06">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="T07">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="T07">
			<span class="second-menu">民宿渠道</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="T0700" value="T07">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="padding-left:20px" auth="T08">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="T08">
			<span class="second-menu">民宿挂账</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="T0800" value="T08">
				全选
			</div>
			<div style="clear:both"></div>
		</div>--%>
	</fieldset>
	<span class="target-fix" id="bodyTopU"></span>
	<fieldset auth="U">
		<legend style='font-size: 18px;'>品牌模式</legend>
		<div style="padding-left:20px" auth="U00">
			<input type="checkbox" class="second-menu-select" onclick="checkedbox()" id="U00">
			<span class="second-menu">品牌模式</span>
			<div class="checkBoxAll">
				<input type="checkbox" class="second-menu-select-all" onclick="checkedAll(this.value)" id="U0000" value="U00">
				全选
			</div>
			<div style="clear:both"></div>
		</div>
	</fieldset>
</div>