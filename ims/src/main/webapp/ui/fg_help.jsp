<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>帮助教程</title>
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.css">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.css">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/css/webuploader.css">
	<link rel="stylesheet" href="css/upload.css">
    <style>
    	::-webkit-scrollbar{width:6px;height:6px}
		::-webkit-scrollbar-thumb{border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;background-color:#c3c3c3}
		::-webkit-scrollbar-track{background-color:transparent}
		
		.helpboard {
			margin-top: 20px;
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<div class ="container-fluid" style="padding-top: 15px;" id="app">
		<ul class="nav nav-tabs" role="tablist" id="firstNav">
			<li id="tab1" role="presentation" class="active"><a href="#ttab1" aria-controls="ttab1" role="tab" data-toggle="tab">视频帮助</a></li>
			<li id="tab2" role="presentation"><a href="#ttab2" aria-controls="ttab2" role="tab" data-toggle="tab">旗舰版</a></li>
			<li id="tab4" role="presentation"><a href="#ttab4" aria-controls="ttab4" role="tab" data-toggle="tab">尊享版</a></li>
			<li id="tab5" role="presentation"><a href="#ttab5" aria-controls="ttab5" role="tab" data-toggle="tab">基础版</a></li>
			<li id="tab3" role="presentation"><a href="#ttab3" aria-controls="ttab3" role="tab" data-toggle="tab">资料下载</a></li>
		</ul>
		<div class="tab-content helpboard " style="margin:20px;">
			<!-- 视频帮助 -->
			<div role="tabpanel" class="tab-pane active" id="ttab1">
				<div class="row">
					<div class="col-xs-12 col-sm-3">
						<div class="nav nav-pills list-group" role="tablist">
							<a v-bind:href="key" v-for="(value, key) in menu" class="list-group-item" v-bind:class="{active: value.isActive}" v-bind:aria-controls="key" role="tab" data-toggle="pill" v-on:click="checkMenu(key)">
								<h4 class="list-group-item-heading">{{value.title}}</h4>
								<p class="list-group-item-text">{{value.describe}}</p>
							</a>
						</div>
					</div>
					<div class="col-xs-12 col-sm-9">
						<div class="row">
							<div class="tab-content">
								<div role="tabpanel" class="tab-pane" v-bind:class="{active: value.isActive}" v-bind:id="key" v-for="(value, key) in menu">
									<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="item in value.video">
										<a href="#video" class="thumbnail" data-toggle="modal" v-on:click="showVideo(item.video,item.title)">
											<img style="height:180px;width:100%;display:block;" v-bind:src="item.poster">
											<div class="caption">
												<h4 class="text-center">{{item.title}}</h4>
											</div>
										</a>
									</div>
								</div>
							</div>
					    </div>
					</div>
				</div>
			</div>
			<!--文档帮助 -->
			<div role="tabpanel" class="tab-pane" id="ttab2">
				<iframe src="http://office.fzz1.cn/web/#/1" style="width:100%;height:1000px" ></iframe>
			</div>
			<!--文档帮助 -->
			<div role="tabpanel" class="tab-pane" id="ttab4">
				<iframe src="http://office.fzz1.cn/web/#/4" style="width:100%;height:1000px" ></iframe>
			</div>
			<!--文档帮助 -->
			<div role="tabpanel" class="tab-pane" id="ttab5">
				<iframe src="http://office.fzz1.cn/web/#/5" style="width:100%;height:1000px" ></iframe>
			</div>
			<!-- 资料下载 -->
			<div role="tabpanel" class="tab-pane" id="ttab3">
				<div>
					<img class="pull-left" src="http://pic-gongkai.fangzhizun.com/%E6%AD%A5%E8%81%94%E7%A7%91%E6%8A%80%E8%BA%AB%E4%BB%BD%E8%AF%81%E8%AF%BB%E5%8D%A1%E5%99%A8.png" style="width:400px;height:215px;padding:0 20px;">	
					<div class="col-xs-12 col-sm-6 pull-left">	
					<h3>【步联科技】身份证读卡器驱动和云客户端</h3><br/>
					<p>具有阅读身份证信息，验证身份证真伪等功能，它采用国际上先进的Type B非接触IC卡阅读技术，通过内嵌的专用身份证安全控制模块（SAM）以无限传输方式与第二代具名身份证内的专用芯片进行安全核检认证后，将芯片内的个人信息资料解读和对应输出</p>
					<br />
					<p>更新时间：2019-3-5</p>
					<br/>
					<a class="btn btn-info" href="http://pic-gongkai.fangzhizun.com/%E3%80%90%E6%AD%A5%E8%81%94%E7%A7%91%E6%8A%80%E3%80%91%E8%BA%AB%E4%BB%BD%E8%AF%81%E8%AF%BB%E5%8D%A1%E5%99%A8%E9%A9%B1%E5%8A%A8%E5%92%8C%E4%BA%91%E5%AE%A2%E6%88%B7%E7%AB%AF.zip">本地下载</a>
					</div>
				</div>

				<div style="clear: both;"></div>
				<hr style="background-color:black;height: 1px;border: none;width:70%;padding:0 10% 0 10%"/>
					
				<div>
					<img class="pull-left" src="http://pic-gongkai.fangzhizun.com/%E8%AF%BB%E5%8D%A1%E5%99%A8%E8%AE%BE%E7%BD%AE%E6%A0%BC%E5%BC%8F.png" style="width:400px;height:215px;padding:0 20px;">	
					<div class="col-xs-12 col-sm-6 pull-left">	
					<h3>【公寓门锁】GK201门锁读卡器进制设置软件</h3><br/>
					<p>用于修改读卡方式，如WG26、WG34、十进制、十六进制等</p>
					<br />
					<p>更新时间：2019-3-5</p>
					<br/>
					<a class="btn btn-info" href="http://pic-gongkai.fangzhizun.com/USB%E8%AF%BB%E5%8D%A1%E5%99%A8%E8%BE%93%E5%87%BA%E8%AE%BE%E7%BD%AE%E6%A0%BC%E5%BC%8F%E8%BD%AF%E4%BB%B6.rar">本地下载</a>
					</div>
				</div>

				<div style="clear: both;"></div>
				<hr style="background-color:black;height: 1px;border: none;width:70%;padding:0 10% 0 10%"/>

				<div>
					<img class="pull-left" src="http://pic-gongkai.fangzhizun.com/xt800_20190428203603.png" style="width:400px;height:215px;padding:0 20px;">
					<div class="col-xs-12 col-sm-6 pull-left">
						<h3>【远程控制】XT800远程服务平台</h3><br/>
						<p>售后远程技术支持软件，安装完成后，运行【XT800个人版】并截图提供给工作人员，工作人员凭该授权码【单次】远程控制您的电脑。</p>
						<br />
						<p>更新时间：2019-4-28</p>
						<br/>
						<a class="btn btn-info" href="http://files.xt800.cn/v4.6.3/XT800Setup_p.exe">本地下载</a>
					</div>
				</div>

				<div style="clear: both;"></div>
				<hr style="background-color:black;height: 1px;border: none;width:70%;padding:0 10% 0 10%"/>

				<div>
					<img class="pull-left" src="http://pic-gongkai.fangzhizun.com/chrome_20190428203610.png" style="width:400px;height:215px;padding:0 20px;">
					<div class="col-xs-12 col-sm-6 pull-left">
						<h3>【兼容系统】谷歌浏览器 稳定版</h3><br/>
						<p>Google Chrome基于更强大的JavaScript V8引擎，兼容【星辰科技】所有版本系统。</p>
						<br />
						<p>更新时间：2019-4-28</p>
						<br/>
						<a class="btn btn-info" href="https://dl.softmgr.qq.com/original/Browser/73.0.3683.86_chrome_installer.exe">本地下载</a>
					</div>
				</div>
			</div>
			<div class="modal" id="video" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="video" aria-hidden="true">
			  <div class="modal-dialog modal-lg" role="document" style="width:90%;">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title">{{modalTitle}}</h4>
			      </div>
			      <div class="modal-body">
			        <video id="player" v-bind:src="source" controls="controls" style="width:100%;height:100%;">
						浏览器不支持此播放器
					</video>
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
		</div>
	</div>
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<script src="http://pic-static.fangzhizun.com/vue/2.2.6/vue.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/html5media/1.1.8/html5media.min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.help.js"></script>
</body>
</html>