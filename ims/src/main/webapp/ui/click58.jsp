<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
<link href="http://pic-static.fangzhizun.com/chosen/chosen.min.css" rel="stylesheet">
<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">

<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
<script src="http://pic-static.fangzhizun.com/chosen/chosen.jquery.min.js"></script>
<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>

	<script type="text/javascript" src="js/highcharts.js"></script>
	<script type="text/javascript" src="js/config.js"></script>
	<script type="text/javascript" src="js/fg.public.js"></script>
	<script type="text/javascript" src="js/click58.js"></script>
	<script type="text/javascript" src="js/pay58.js"></script>

  </head>
  
  <body>
 <div>
	<legend>
		58浏览量数据统计
	</legend>
  	<div style="width:100%;min-height:800px;border:1px #336699 solid;float:left;margin:0 0 10px 0;overflow:hidden;">
		<div style="margin:5px 0 5px 10px;color:black;font-size:13px;float:left;">
		      行政区域:<select id="typeDistrict" style="width:60px"
		           	onchange='load()' >
				 </select>
		</div>
		<div style="margin:5px 0 5px 10px;color:black;font-size:13px;float:left;">
		       时间类型:<select id="typeTime" style="width:40px;" onchange='load()'>
		       		<option value='日'>日</option>
		       		<option value='月' selected='selected'>月</option>
		       		<option value='季'>季</option>
		       		<option value='年'>年</option>
			   </select>
  		</div>
  		<div id="yeaMonthDiv" style="margin:5px 0 5px 10px;color:black;font-size:13px;float:left;display:none;">
		      年份:<select id="yearMonth" style="width:60px;" onchange='dateMonthy()'>    
			   </select>
  		</div>
  		<div id="yeaQuarterDiv" style="margin:5px 0 5px 10px;color:black;font-size:13px;float:left;display:none;">
		      年份:<select id="yearQuarter" style="width:60px;" onchange='quarter()'>    
			   </select>
  		</div>
  		<div id="yearDiv" style="margin:5px 0 5px 10px;color:black;font-size:13px;float:left;display:none;">
		         年份:<select id="year" style="width:60px;" onchange='dateYear()'>    
			   </select>
  		</div>
  		<div id="quarterDiv" style="margin:5px 0 5px 10px;color:black;font-size:13px;float:left;display:none;">
		         季度:<select id="quarter" style="width:90px;" onchange='quarterLink()'>    
			   </select>
  		</div>
  		<div id="monthyDiv" style="margin:5px 0 5px 10px;color:black;font-size:13px;float:left;display:none;">
		         月份:<select id="monthy" style="width:90px;" onchange='monthyLink()'>    
			   </select>
  		</div>
		<div id="dateDiv" style="margin:5px 0 5px 10px;color:black;font-size:13px;float:left;">
		          日期:<input id="date" style="width:90px;" 
		          onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:load()})">    
			   </input>
  		</div>
	  	<div style="clear:both;"></div>
	 	<div id='main' style="text-align:center;width:100%;height:auto;"></div>
		<div style="clear:both;"></div>
		<div id="zhexian" style="width:99%;height:auto;float:left;display:none;">
		</div>		
  	</div>
  	<legend>
		58付费发帖量总计
	</legend>
  	<div style="width:100%;border:1px #336699 solid;float:left;overflow:hidden;" >
		<div style="margin:5px 0 5px 15px;font-size:13px;width:100%">
			选择时间区域：<input id="startTime" style="width:80px" class="Wdate"
				type="text"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:showPay58()})">&nbsp;到
				&nbsp;<input id="endTime" style="width:80px" class="Wdate"
				type="text"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:showPay58()})" >
		</div>
		<div id="container" style="width:99%;height:400px;"></div>
  	</div>
 </div>
  </body>
</html>
